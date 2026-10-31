import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash, randomUUID } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt=promisify(scryptCallback), db=new DatabaseSync(process.env.LEX_DB_PATH||'/var/lib/seawhy-lex/users.sqlite');
db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, salt TEXT NOT NULL, password_hash TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
CREATE TABLE IF NOT EXISTS ai_usage (user_id TEXT NOT NULL REFERENCES users(id),day TEXT NOT NULL,requests INTEGER NOT NULL,PRIMARY KEY(user_id,day));
CREATE TABLE IF NOT EXISTS user_profiles (user_id TEXT PRIMARY KEY REFERENCES users(id),profile_json TEXT NOT NULL,version INTEGER NOT NULL,updated_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS public_user_ids (number INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL UNIQUE REFERENCES users(id));`);
db.exec('PRAGMA foreign_keys=ON');
db.exec('INSERT OR IGNORE INTO public_user_ids(user_id) SELECT id FROM users WHERE NOT EXISTS (SELECT 1 FROM public_user_ids WHERE user_id=users.id) ORDER BY created_at,id');
const hash=s=>createHash('sha256').update(s).digest('hex');
const allowedOrigin=process.env.LEX_ORIGIN||'https://lex.lvheng.me';
const key=process.env.DEEPSEEK_API_KEY;
const json=(res,status,data)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(data))};
async function body(req){let chunks=[],size=0;for await(const chunk of req){size+=chunk.length;if(size>131072)throw Object.assign(Error('请求过大'),{status:413});chunks.push(chunk)}let data;try{data=JSON.parse(Buffer.concat(chunks).toString())}catch{throw Object.assign(Error('请求格式错误'),{status:400})}if(!data||typeof data!=='object'||Array.isArray(data))throw Object.assign(Error('请求格式错误'),{status:400});return data}
function cookie(req){const m=(req.headers.cookie||'').match(/(?:^|;\s*)lex_session=([A-Za-z0-9_-]+)/);return m?.[1]}
function publicId(id){let row=db.prepare('SELECT number FROM public_user_ids WHERE user_id=?').get(id);if(!row){db.prepare('INSERT OR IGNORE INTO public_user_ids(user_id) VALUES(?)').run(id);row=db.prepare('SELECT number FROM public_user_ids WHERE user_id=?').get(id)}return String(100000+row.number)}
function user(req){const token=cookie(req);const row=token&&db.prepare('SELECT users.id,users.username FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token_hash=? AND sessions.expires_at>?').get(hash(token),Date.now());return row?{...row,publicId:publicId(row.id)}:null}
function loginSession(res,u){const token=randomBytes(32).toString('base64url'),expires=Date.now()+7*86400000;const publicUserId=publicId(u.id);db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(hash(token),u.id,expires);res.setHeader('Set-Cookie',`lex_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`);return json(res,200,{user:{id:u.id,username:u.username,publicId:publicUserId}})}
export const server=createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');if(req.headers.origin&&req.headers.origin!==allowedOrigin)return json(res,403,{error:'来源不被允许'});
 if(url.pathname==='/api/lex/health'&&req.method==='GET')return json(res,200,{ok:true});
 if(req.method==='POST'&&req.headers.origin!==allowedOrigin)return json(res,403,{error:'来源不被允许'});
 if(url.pathname==='/api/lex/register'&&req.method==='POST'){
  const v=await body(req),name=typeof v.username==='string'?v.username.trim():'',password=typeof v.password==='string'?v.password:'';
  if(!/^[\p{L}\p{N}_-]{3,32}$/u.test(name)||password.length<8||password.length>128)return json(res,400,{error:'账号需3至32位字母、数字或下划线；密码需8至128位'});
  const salt=randomBytes(16).toString('hex'),pwd=(await scrypt(password,salt,64)).toString('hex'),u={id:randomUUID(),username:name};
  try{db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').run(u.id,name,salt,pwd,Date.now())}catch(e){if(e.code?.startsWith('SQLITE_CONSTRAINT')||String(e.message).includes('UNIQUE'))return json(res,409,{error:'该账号已存在'});throw e}return loginSession(res,u);
 }
 if(url.pathname==='/api/lex/login'&&req.method==='POST'){
  const v=await body(req),name=typeof v.username==='string'?v.username.trim():'',password=typeof v.password==='string'?v.password:'';
  if(name.length>32||password.length>128)return json(res,401,{error:'账号或密码错误'});
  const u=db.prepare('SELECT * FROM users WHERE username=?').get(name),salt=u?.salt||'00000000000000000000000000000000',derived=await scrypt(password,salt,64),expected=u?Buffer.from(u.password_hash,'hex'):Buffer.alloc(64);
  if(!timingSafeEqual(derived,expected)||!u)return json(res,401,{error:'账号或密码错误'});return loginSession(res,u);
 }
 if(url.pathname==='/api/lex/me'&&req.method==='GET'){const u=user(req);return u?json(res,200,{user:u}):json(res,401,{error:'请先登录'})}
 if(url.pathname==='/api/lex/profile'&&req.method==='GET'){
  const u=user(req);if(!u)return json(res,401,{error:'请先登录'});
  const row=db.prepare('SELECT profile_json,version FROM user_profiles WHERE user_id=?').get(u.id);
  return json(res,200,{profile:row?JSON.parse(row.profile_json):null,version:row?.version||0});
 }
 if(url.pathname==='/api/lex/profile'&&req.method==='POST'){
  const u=user(req);if(!u)return json(res,401,{error:'请先登录'});
  const v=await body(req),p=v.profile;
  if(!p||typeof p!=='object'||Array.isArray(p)||!Number.isSafeInteger(v.version)||v.version<0)return json(res,400,{error:'档案格式错误'});
  if(p.avatarDataUrl && (typeof p.avatarDataUrl!=='string'||!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.avatarDataUrl)))return json(res,400,{error:'头像格式不支持'});
  if(JSON.stringify(p).length>110000)return json(res,413,{error:'档案过大，请更换小于80KB的头像'});
  let changed;
  if(v.version===0)changed=db.prepare('INSERT OR IGNORE INTO user_profiles VALUES(?,?,1,?)').run(u.id,JSON.stringify(p),Date.now()).changes;
  else changed=db.prepare('UPDATE user_profiles SET profile_json=?,version=version+1,updated_at=? WHERE user_id=? AND version=?').run(JSON.stringify(p),Date.now(),u.id,v.version).changes;
  return changed?json(res,200,{version:v.version+1}):json(res,409,{error:'档案已在其他设备更新，请先刷新并核对'});
 }
 if(url.pathname==='/api/lex/logout'&&req.method==='POST'){const token=cookie(req);if(token)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(hash(token));res.setHeader('Set-Cookie','lex_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');return json(res,200,{ok:true})}
 if(url.pathname==='/api/lex/chat'&&req.method==='POST'){
  const caller=user(req);if(!caller)return json(res,401,{error:'请先登录'});if(!key)return json(res,503,{error:'AI 服务尚未配置'});
  const v=await body(req);if(!Array.isArray(v.messages)||!v.messages.length||v.messages.length>30||v.messages.some(m=>!m||!['system','user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>12000))return json(res,400,{error:'对话内容格式错误或过长'});
  const day=new Date().toISOString().slice(0,10),limit=Number(process.env.LEX_DAILY_AI_LIMIT||30);
  if(!Number.isInteger(limit)||limit<1||limit>10000)return json(res,503,{error:'AI 服务配置有误'});
  const use=db.prepare('INSERT INTO ai_usage(user_id,day,requests) VALUES(?,?,1) ON CONFLICT(user_id,day) DO UPDATE SET requests=requests+1 WHERE requests<?').run(caller.id,day,limit);
  if(!use.changes)return json(res,429,{error:'今天的 AI 使用次数已达上限，请明天再试'});
  const upstream=await fetch('https://api.deepseek.com/chat/completions',{method:'POST',headers:{authorization:'Bearer '+key,'content-type':'application/json'},body:JSON.stringify({model:process.env.DEEPSEEK_MODEL||'deepseek-chat',messages:v.messages,stream:v.stream===true,max_tokens:2048,temperature:0.3}),signal:AbortSignal.timeout(90000)});
  if(!upstream.ok)return json(res,502,{error:'AI 服务暂时不可用，请稍后重试'});
  res.writeHead(200,{'content-type':v.stream?'text/event-stream; charset=utf-8':'application/json; charset=utf-8','cache-control':'no-store','x-accel-buffering':'no'});
  for await(const chunk of upstream.body){if(res.destroyed)break;if(!res.write(chunk))await new Promise(resolve=>res.once('drain',resolve))}return res.end();
 }
 return json(res,404,{error:'接口不存在'});
 }catch(e){if(!res.headersSent)json(res,e.status||500,{error:e.status?e.message:'服务暂时不可用'});else res.destroy()}});
if(process.env.LEX_NO_LISTEN!=='1')server.listen(Number(process.env.LEX_PORT||3100),'127.0.0.1',()=>console.log('SeaWhy Lex backend ready'));
