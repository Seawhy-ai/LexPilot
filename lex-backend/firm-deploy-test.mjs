import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {DatabaseSync} from 'node:sqlite';
const script=readFileSync(new URL('../deploy-firm-v2.sh',import.meta.url),'utf8');
test('deployment adds valid resource tags once and preserves existing skin integration',()=>{
 const stage=mkdtempSync(join(tmpdir(),'lex-deploy-html-'));const path=join(stage,'law.html');
 writeFileSync(path,'<html><head></head><body><script src="skin-motion.js?v=1"></script></body></html>');
 const line=script.split('\n').find(x=>x.startsWith("node -e 'const fs=require(\"fs\"),p="));
 for(let i=0;i<2;i++){const r=spawnSync('bash',['-c',line],{env:{...process.env,stage}});assert.equal(r.status,0,r.stderr.toString())}
 const html=readFileSync(path,'utf8');assert.equal(html.match(/src="firm-engine.js\?v=1"/g).length,1);assert.equal(html.match(/src="firm-v2.js\?v=1"/g).length,1);assert.equal(html.match(/href="firm-v2.css\?v=1"/g).length,1);assert.ok(html.includes('src="skin-motion.js?v=1"'));
});
test('deployment backs up WAL database consistently without altering original records',()=>{
 const backup=mkdtempSync(join(tmpdir(),'lex-deploy-db-'));const path=join(backup,'source.sqlite');const db=new DatabaseSync(path);db.exec('PRAGMA journal_mode=WAL;CREATE TABLE sample(value TEXT);INSERT INTO sample VALUES(\'preserve\')');
 const line=script.split('\n').find(x=>x.startsWith('node --input-type=module'));
 const result=spawnSync('bash',['-c',line],{env:{...process.env,db:path,backup}});assert.equal(result.status,0,result.stderr.toString());
 const copied=new DatabaseSync(join(backup,'users.sqlite'));assert.equal(copied.prepare('SELECT value FROM sample').get().value,'preserve');assert.equal(db.prepare('SELECT COUNT(*) AS n FROM sample').get().n,1);copied.close();db.close();
});
