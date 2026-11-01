import {test} from 'node:test';
import assert from 'node:assert/strict';
import '../standalone/firm-engine.js';
const E=globalThis.FirmEngine;
const act=(g,a,v)=>E.act(g,a,v,1793491200000).game;
function finish(g,id='consult',team=[]){g=act(g,'start',{id,team});const uid=g.jobs.at(-1).uid;for(let stage=0;stage<5;stage++)g=act(g,'choose',{uid,stage,choice:0});return act(g,'collect',{uid})}
test('legacy balances, staff and unfinished cases migrate once',()=>{
 const old={funds:1234,reputation:77,level:4,staff:['assistant','lawyer','partner'],current:{id:'trial',bonus:10,finish:0},casesDone:3};
 let g=E.read(old);assert.equal(g.funds,1234);assert.equal(g.members.length,4);assert.equal(g.level,4);assert.equal(g.jobs.length,0);
 g=act(g,'legacy');assert.equal(g.funds,1564);assert.equal(g.casesDone,4);assert.throws(()=>act(g,'legacy'));assert.deepEqual(E.read(g),g);assert.ok(old.current);
});
test('case decisions, member assignment and rewards are applied once',()=>{
 let g=E.fresh();g=act(g,'start',{id:'labor',team:['lin']});const uid=g.jobs[0].uid;assert.equal(g.members[0].energy,85);
 assert.throws(()=>act(g,'start',{id:'consult',team:['lin']}));
 assert.throws(()=>act(g,'collect',{uid}));g=act(g,'choose',{uid,stage:0,choice:0});assert.throws(()=>act(g,'choose',{uid,stage:0,choice:0}));
 for(let stage=1;stage<5;stage++)g=act(g,'choose',{uid,stage,choice:0});const before=g.funds;g=act(g,'collect',{uid});assert.ok(g.funds>before);assert.equal(g.jobs.length,0);assert.equal(g.members[0].xp,35);assert.throws(()=>act(g,'collect',{uid}));assert.equal(g.history.length,1);
});
test('salary only runs on explicit eligible operating day, arrears do not block basic cases',()=>{
 let g=E.fresh();assert.throws(()=>act(g,'settle'));g=finish(g);const balance=g.funds;g=act(g,'settle');assert.equal(g.funds,balance-E.payroll(g));assert.equal(g.day,2);assert.throws(()=>act(g,'settle'));
 g=finish(g);g.funds=0;g=act(g,'settle');assert.equal(g.arrears,8);assert.equal(g.funds,0);assert.throws(()=>act(g,'hire',{id:'chen',channel:'campus'}));g=finish(g);g=act(g,'arrears');assert.equal(g.arrears,0);
});
test('S talent eligibility, slots, evidence hint and non-stacking',()=>{
 let g=E.fresh();g.level=8;g.funds=30000;g.reputation=100;
 for(const id of ['shen','gu','wen','ye','tang','bai']){
  for(let i=0;i<10&&!E.market(g,'headhunt').some(p=>p.id===id);i++)g=act(g,'refresh',{channel:'headhunt'});
  g=act(g,'hire',{id,channel:'headhunt'});
 }
 assert.throws(()=>act(g,'manage',{id:'lin'}));g=act(g,'manage',{id:'shen'});g=act(g,'manage',{id:'tang'});g=act(g,'manage',{id:'bai'});assert.throws(()=>act(g,'manage',{id:'gu'}));assert.ok(E.has(g,'fame'));
 g=act(g,'start',{id:'consult',team:['gu','ye']});let uid=g.jobs[0].uid;g=act(g,'choose',{uid,stage:0,choice:0});g=act(g,'hint',{uid});assert.throws(()=>act(g,'hint',{uid}));for(let stage=1;stage<5;stage++)g=act(g,'choose',{uid,stage,choice:0});g=act(g,'collect',{uid});assert.equal(g.members.find(m=>m.id==='ye').xp,39);
});
test('training, promotions, facilities, candidate refresh and story',()=>{
 let g=E.fresh();g.funds=10000;g.level=5;assert.throws(()=>act(g,'train',{id:'lin',stat:0}));g=act(g,'facility',{id:'library'});g=act(g,'train',{id:'lin',stat:0});assert.equal(g.members[0].training[0],3);assert.throws(()=>act(g,'promote',{id:'lin'}));g.members[0].level=3;g=act(g,'promote',{id:'lin'});assert.equal(g.members[0].promotion,1);assert.equal(E.salary(g.members[0]),20);
 const before=g.funds;g=act(g,'refresh',{channel:'social'});assert.equal(g.funds,before);g=act(g,'refresh',{channel:'social'});assert.equal(g.funds,before-30);
 g=act(g,'facility',{id:'archive'});assert.equal(E.capacity(g),2);g=act(g,'start',{id:'consult',team:[]});g=act(g,'start',{id:'labor',team:[]});assert.throws(()=>act(g,'start',{id:'contract',team:[]}));
 g.members[0].bond=20;g=act(g,'story',{id:'lin'});assert.throws(()=>act(g,'story',{id:'lin'}));
});
test('decisions affect result, weekly rollovers, income never mutates learning points',()=>{
 let good=E.fresh(),bad=E.fresh();good=finish(good);bad=act(bad,'start',{id:'consult',team:[]});let uid=bad.jobs[0].uid;for(let stage=0;stage<5;stage++)bad=act(bad,'choose',{uid,stage,choice:1});bad=act(bad,'collect',{uid});assert.ok(good.funds>bad.funds);assert.ok(good.satisfaction>bad.satisfaction);assert.equal(good.points,undefined);assert.ok(good.weekly.charity>0);E.weekly(good,1794096000000);assert.equal(good.weekly.charity,0);
});
