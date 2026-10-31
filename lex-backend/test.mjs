import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';

test('independent account and AI permission',async()=>{
 process.env.LEX_DB_PATH=join(mkdtempSync(join(tmpdir(),'lex-test-')),'test.sqlite');
 process.env.LEX_ORIGIN='https://lex.lvheng.me';process.env.LEX_NO_LISTEN='1';delete process.env.DEEPSEEK_API_KEY;
 const {server}=await import('./server.mjs');server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
 const post=(path,data,cookie,origin='https://lex.lvheng.me')=>fetch(base+path,{method:'POST',headers:{origin,'content-type':'application/json',...(cookie?{cookie}:{})},body:JSON.stringify(data)});
 try{
  assert.equal((await post('/api/lex/chat',{messages:[{role:'user',content:'你好'}]})).status,401);
  assert.equal((await post('/api/lex/register',{username:'hello',password:'validpassword'},null,'https://bad.example')).status,403);
  const reg=await post('/api/lex/register',{username:'hello',password:'validpassword'});assert.equal(reg.status,200);const cookie=reg.headers.get('set-cookie').split(';')[0];assert.match(reg.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Strict/);
  assert.equal((await post('/api/lex/register',{username:'hello',password:'validpassword'})).status,409);
  assert.equal((await post('/api/lex/login',{username:'hello',password:'bad'})).status,401);
  assert.equal((await post('/api/lex/chat',{messages:[{role:'user',content:'你好'}]},cookie)).status,503);
  assert.equal((await fetch(base+'/api/lex/me',{headers:{cookie}})).status,200);
  assert.equal((await post('/api/lex/logout',{},cookie)).status,200);
  assert.equal((await fetch(base+'/api/lex/me',{headers:{cookie}})).status,401);
 }finally{await new Promise(resolve=>server.close(resolve))}
});
