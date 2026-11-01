(function(root){
 'use strict';
 const stats=['法律知识','调查取证','文书写作','谈判沟通','庭审应对'];
 const grades={D:{base:18,cost:80,salary:8},C:{base:28,cost:180,salary:16},B:{base:40,cost:420,salary:28},A:{base:55,cost:900,salary:45},S:{base:68,cost:1800,salary:65}};
 const people=[
 ['lin','林知夏','D','劳动',1,'assistant','从案卷整理开始，认真记录每一个事实。'],
 ['chen','陈书言','C','合同',2,'lawyer','擅长把复杂条款整理成清晰的意见。'],
 ['xu','许清和','C','家事',3,'assistant','先倾听，再寻找双方都能接受的路径。'],
 ['zhou','周砚','B','劳动',1,'lawyer','坚持从原始记录中还原争议。'],
 ['lu','陆明川','B','合同',4,'lawyer','以充分准备应对每一次质证。'],
 ['su','苏晚晴','A','行政',0,'partner','擅长梳理行政程序与救济路径。'],
 ['shen','沈临川','S','合同',3,'partner','从复杂争议中寻找稳妥的解决方案。','fame'],
 ['gu','顾星澜','S','刑事',1,'partner','耐心检验证据链中的每一处细节。','evidence'],
 ['wen','温予安','S','家事',3,'partner','把每一次谈判视为重建信任的机会。','negotiation'],
 ['ye','叶知衡','S','劳动',0,'partner','愿意把办案经验传给年轻的同行。','mentor'],
 ['tang','唐景行','S','合同',2,'partner','让专业服务与稳健经营形成良性循环。','finance'],
 ['bai','白鹿宁','S','公益',0,'partner','让法律服务抵达更需要它的人。','charity']
 ].map(x=>({id:x[0],name:x[1],grade:x[2],specialty:x[3],focus:x[4],art:x[5],story:x[6],talent:x[7]||''}));
 const talents={fame:['律界名望','管理席位：所有委托结案声望 +5%'],finance:['精细经营','管理席位：委托基础资金收益 +5%'],evidence:['证据洞察','参战：每案可使用一次关键证据提示'],negotiation:['谈判专家','参战：谈判阶段团队有效能力 +10%'],mentor:['薪火相传','参战：同组成员办案经验 +10%'],charity:['公益之心','参战：公益委托声望 +15%']};
 const facilities={reception:['接待区','提升客户信任，每级结案满意度 +2',100],library:['法律图书室','每级增加方案阶段能力，解锁培训',140],meeting:['会议室','每级增加庭审与谈判阶段能力',160],archive:['档案室','2级可同时承办2案，3级可承办3案',200],lounge:['休息区','每日额外恢复团队精力',120]};
 // Each dossier has a concrete question and a legally grounded explanation at every stage.
 const cases=[
 {id:'consult',name:'社区公益咨询',kind:'公益',level:1,fee:65,rep:3,need:15,brief:'老人收到陌生催款信息，希望确认自己是否负有还款义务。',steps:[
 ['接待','老人情绪焦虑，你先做什么？','核实身份、借款事实与诉求','先承诺一定不用还款','律师应先核实事实，不宜对结果作保证。'],
 ['调查','对方只提供了一张转账截图。','核对原始流水与双方沟通记录','仅凭截图确定借贷关系','转账事实不当然等于借贷关系，需要结合其他证据。'],
 ['方案','下一步如何建议？','列明争议与材料清单，说明救济路径','建议立即公开对方个人信息','依法维权并保护个人信息，避免制造新的侵权风险。'],
 ['谈判','催款人要求立即现金结清。','核实主体和金额，保留协商记录','让老人先交钱再说','履行前应核实债权和收款主体，保留凭证。'],
 ['结案','咨询结束，如何跟进？','交付书面建议并说明后续求助渠道','口头说完便销毁全部材料','清晰的书面建议有助于当事人理解和执行。']]},
 {id:'contract',name:'供货合同争议',kind:'合同',level:2,fee:180,rep:7,need:30,brief:'商家收到部分瑕疵货物，供应商却要求支付全部尾款。',steps:[
 ['接待','客户要求立即起诉。','先核对合同、交付和付款情况','承诺肯定胜诉','争议判断需要先厘清合同义务与实际履行。'],
 ['调查','货物存在质量争议。','及时固定验收记录、瑕疵照片和检测材料','直接丢弃争议货物','质量证据及检验期限会影响后续主张。'],
 ['方案','发现合同存在争议解决条款。','核查条款效力及管辖或仲裁约定','忽略条款直接任意起诉','有效仲裁约定或管辖约定可能影响程序选择。'],
 ['谈判','供应商愿意折价。','量化损失并形成明确的书面和解条款','只接受口头退款承诺','书面协议应明确金额、期限和违约处理。'],
 ['结案','尾款争议解决。','确认履行情况并归档协议与凭证','签完协议即认定全部履行','达成协议与实际履行是两个不同节点。']]},
 {id:'labor',name:'劳动报酬追索',kind:'劳动',level:1,fee:105,rep:5,need:23,brief:'员工离职后被拖欠工资，希望尽快拿回应得报酬。',steps:[
 ['接待','客户只有口头陈述。','梳理用工主体、工作期间和欠薪明细','按客户估计直接确定全部欠薪','应区分事实、主张和已有证据。'],
 ['调查','公司否认劳动关系。','收集考勤、工资流水和工作指令','只寻找一份书面合同','劳动关系可以结合多类实际用工证据认定。'],
 ['方案','准备采取法律程序。','核对仲裁时效、管辖和请求项目','直接跳过程序一律向法院起诉','劳动争议通常需先行仲裁，并核查法定例外。'],
 ['谈判','公司提出分期支付。','核实履行能力并明确金额、日期与责任','劝客户无条件接受所有方案','和解应基于知情选择，条款需要可执行。'],
 ['结案','客户已收到部分款项。','对账并跟进剩余履行','把部分付款记为全部完成','服务记录应准确反映实际回款。']]},
 {id:'family',name:'家事协商',kind:'家事',level:3,fee:260,rep:9,need:40,brief:'家庭成员对未成年子女照护安排存在分歧。',steps:[
 ['接待','双方争执激烈。','分别了解诉求并关注未成年人利益','只听先到场一方的说法','家事处理应充分了解事实并关注未成年人的保护。'],
 ['调查','双方对照护情况说法不同。','核查生活、教育和照护记录','把传闻直接当作证据','事实核实应尊重隐私，避免以传闻替代证明。'],
 ['方案','如何设计安排？','结合实际照护条件与子女需要','只按双方收入高低决定','子女利益需要综合评估，收入不是唯一因素。'],
 ['谈判','双方愿意讨论具体安排。','细化探望、费用和沟通机制','要求一方放弃全部权利','协议应明确、合法，并关注持续履行。'],
 ['结案','协商形成初步方案。','说明法律效力与必要的确认程序','保证私下协议解决所有身份事项','不同事项的法律效力与所需程序不同。']]},
 {id:'criminal',name:'刑事辩护准备',kind:'刑事',level:5,fee:410,rep:13,need:53,brief:'家属希望了解案件进度并依法委托辩护。',steps:[
 ['接待','家属要求保证释放。','说明辩护职责、程序与结果的不确定性','收取费用并承诺马上释放','律师应依法履职，不对案件结果作不当承诺。'],
 ['调查','证人愿意配合。','依法核查材料并遵守调查取证规则','引导证人统一口径','不得妨碍作证或诱导虚假陈述。'],
 ['方案','准备辩护意见。','区分证据能力、证明力与事实争点','只寻找有利材料忽略全部不利证据','有效辩护需要全面分析证据与法律。'],
 ['庭审','关键证据存在矛盾。','围绕合法性、关联性和真实性质证','以情绪化指责替代质证','质证应围绕证据和待证事实展开。'],
 ['结案','阶段性工作完成。','向委托人说明进展与后续救济事项','把阶段结束等同最终结案','应准确说明程序状态，避免误导委托人。']]},
 {id:'admin',name:'行政救济评估',kind:'行政',level:4,fee:330,rep:11,need:46,brief:'经营者对行政处罚决定存在异议，希望依法寻求救济。',steps:[
 ['接待','决定书刚刚送达。','记录送达时间并核对主体和文书','先放置数月再讨论','救济期限应尽早核实，不能因等待而遗漏。'],
 ['调查','争议集中在执法程序。','核对告知、陈述申辩和听证等记录','只看罚款金额','程序合法性也是审查的重要内容。'],
 ['方案','客户询问复议还是诉讼。','核查是否复议前置及各自期限','认为所有案件都能任意选择','部分事项存在复议前置要求，应具体核实。'],
 ['谈判','机关提出沟通。','记录沟通内容并继续关注法定期限','默认沟通必然中止救济期限','沟通不当然中止或延长法定期限。'],
 ['结案','救济路径已确定。','交付材料清单和期限提醒','只口头告知不做记录','期限管理与明确交付有助于保障救济权利。']]}
 ];
 const costs=[0,180,480,1000,1800,3000,4800,7200,10500,15000];
 const rooms=['租来的小办公室','双人工作室','街角事务所','独立办公层','精品律师事务所','城市专业律所','区域联合办公室','城市总部','全国合伙人中心','律所总部大楼'];
 function num(n,min=0,max=1000000000){return Math.min(max,Math.max(min,Math.floor(Number(n)||0)))}
 function member(id){const p=people.find(x=>x.id===id);if(!p)throw Error('未找到人才');return {id,level:1,xp:0,training:[0,0,0,0,0],energy:100,promotion:0,raise:0,bond:0,storyClaimed:false}}
 function fresh(){return {version:2,name:'知行法律事务所',funds:200,reputation:0,level:1,casesDone:0,staff:[],members:[member('lin')],jobs:[],facilities:{reception:1,library:0,meeting:0,archive:1,lounge:0},day:1,dayDone:0,dayIncome:0,dayExpenses:0,totalIncome:0,totalWages:0,arrears:0,history:[],management:[],route:'general',decor:'walnut',lastDaily:'',log:[],market:{},eventDone:0,satisfaction:80,weekly:{key:'',charity:0,satisfied:0,count:0}}}
 function read(raw){const g=Object.assign(fresh(),JSON.parse(JSON.stringify(raw||{})));g.level=num(g.level,1,10);g.funds=num(g.funds);g.reputation=Math.round(Math.min(1000000000,Math.max(0,Number(g.reputation)||0))*100)/100;g.facilities=Object.assign(fresh().facilities,raw&&raw.facilities||{});
  if(!raw||raw.version!==2){g.members=[member('lin')];(g.staff||[]).forEach(id=>{const mid={assistant:'chen',lawyer:'zhou',partner:'su'}[id];if(mid&&!g.members.some(m=>m.id===mid))g.members.push(member(mid))});g.migratedCurrent=g.current||null;g.current=null;g.version=2;g.log=['团队与办公室已升级，旧资金、声望和员工已保留。'].concat(g.log||[]).slice(0,20)}
  return g;
 }
 function person(m){return people.find(p=>p.id===m.id)}
 function ability(m){const p=person(m),b=grades[p.grade].base;return stats.map((s,i)=>b+(p.focus===i?15:0)+(m.level-1)*2+(m.training[i]||0)+m.promotion*3)}
 function salary(m){return grades[person(m).grade].salary+(m.level-1)*2+m.promotion*8+(m.raise||0)}
 function payroll(g){return g.members.reduce((a,m)=>a+salary(m),0)}
 function seats(g){return g.level>=8?3:g.level>=5?2:1}
 function has(g,t,team){return (team||g.management).some(id=>{const m=g.members.find(x=>x.id===id);return m&&person(m).talent===t})}
 function capacity(g){return Math.max(1,Math.min(3,g.facilities.archive||1))}
 function busy(g,id){return g.jobs.some(j=>j.team.includes(id))}
 function log(g,s){g.log=[s].concat(g.log||[]).slice(0,20)}
 function pay(g,n){if(g.funds<n)throw Error('经营资金不足');g.funds-=n;g.dayExpenses+=n}
 function weekly(g,now){const date=new Date(now);const day=(date.getUTCDay()+6)%7;date.setUTCDate(date.getUTCDate()-day);const key=date.toISOString().slice(0,10);if(g.weekly.key!==key)g.weekly={key,charity:0,satisfied:0,count:0};return g.weekly}
 function market(g,channel){const owned=g.members.map(m=>m.id);const pool=people.filter(p=>!owned.includes(p.id)&&({campus:['D','C'],social:['C','B','A'],headhunt:['A','S']}[channel]||[]).includes(p.grade));const offset=g.market[channel]||0;return pool.slice(offset%Math.max(1,pool.length)).concat(pool.slice(0,offset%Math.max(1,pool.length))).slice(0,3)}
 function act(g,action,v={},now=Date.now()){
  // All changes apply to a clone; a failed action never consumes money or progress.
  g=read(g);let message='';
  if(action==='hire'){const p=people.find(p=>p.id===v.id);if(!p||!market(g,v.channel).some(p=>p.id===v.id))throw Error('候选人已变化，请刷新');if(g.arrears)throw Error('请先补发薪资');if(g.members.length>=g.level+2)throw Error('团队工位不足，请升级律所');if(v.channel==='headhunt'&&(g.level<4||g.reputation<30))throw Error('猎头招聘需要律所4级、30声望');pay(g,grades[p.grade].cost);g.members.push(member(p.id));message=p.name+'已签约入职'}
  else if(action==='refresh'){if(!['campus','social','headhunt'].includes(v.channel))throw Error('请选择招聘渠道');const key='free-'+v.channel;if(g.market[key]!==g.day){g.market[key]=g.day}else pay(g,30);g.market[v.channel]=(g.market[v.channel]||0)+1;message='人才市场已更新'}
  else if(action==='train'){const m=g.members.find(m=>m.id===v.id);if(!m||busy(g,m.id))throw Error('成员正在办案或不存在');if(g.arrears)throw Error('请先补发薪资');if(!g.facilities.library)throw Error('请先建造法律图书室');const i=num(v.stat,0,4);if(m.training[i]>=30)throw Error('该能力已完成全部专项训练');if(m.energy<10)throw Error('精力不足，结算经营日后恢复');pay(g,20+m.level*5);m.training[i]+=3;m.energy-=10;message=person(m).name+'的'+stats[i]+'提升3点'}
  else if(action==='promote'){const m=g.members.find(m=>m.id===v.id);if(!m||busy(g,m.id))throw Error('请在成员空闲时晋升');if(g.arrears)throw Error('请先补发薪资');if(m.promotion>=4||m.level<(m.promotion+1)*3)throw Error('未达到下一职位的等级要求');pay(g,100*(m.promotion+1));m.promotion++;message='职位晋升，全部能力提升，经营日薪资增加8'}
  else if(action==='raise'){const m=g.members.find(m=>m.id===v.id);if(!m||g.arrears)throw Error('请先核对成员及待付薪资');if((m.raise||0)>=20)throw Error('已达到当前调薪上限');m.raise=(m.raise||0)+5;m.bond=Math.min(100,m.bond+8);message='经营日薪资增加5，信任提升8'}
  else if(action==='manage'){const m=g.members.find(m=>m.id===v.id);if(!m||person(m).grade!=='S')throw Error('管理席位需要S级成员');if(g.management.includes(m.id))g.management=g.management.filter(id=>id!==m.id);else{if(g.management.length>=seats(g))throw Error('管理席位已满，请先撤下其他成员');g.management.push(m.id)}message='管理席位已调整'}
  else if(action==='facility'){if(!facilities[v.id])throw Error('设施不存在');const lv=g.facilities[v.id]||0;if(lv>=3)throw Error('设施已满级');if(g.arrears)throw Error('请先补发薪资');if(lv>=g.level)throw Error('请先提升律所等级');pay(g,facilities[v.id][2]*(lv+1));g.facilities[v.id]=lv+1;message=facilities[v.id][0]+'升级至'+(lv+1)+'级'}
  else if(action==='upgrade'){if(g.level>=10)throw Error('律所已满级');if(g.arrears)throw Error('请先补发薪资');if(g.reputation<g.level*8)throw Error('声望不足');pay(g,costs[g.level]);g.level++;message='搬入'+rooms[g.level-1]}
  else if(action==='decor'){if(!['walnut','mint','night'].includes(v.id))throw Error('风格不存在');g.decor=v.id;message='装修风格已切换'}
  else if(action==='layout'){if(!facilities[v.id]||!Number.isFinite(v.x)||!Number.isFinite(v.y))throw Error('请选择设施和摆放位置');g.layout=Object.assign({},g.layout||{},{[v.id]:[Math.round(Math.min(92,Math.max(8,v.x))),Math.round(Math.min(80,Math.max(25,v.y)))]});message=facilities[v.id][0]+'的摆放位置已保存'}
  else if(action==='route'){if(!['general','commercial','community','litigation'].includes(v.id))throw Error('路线不存在');if(g.level<3)throw Error('3级解锁专业路线');if(g.routeDay===g.day)throw Error('每个经营日只能调整一次路线');g.route=v.id;g.routeDay=g.day;message='律所专业方向已调整'}
  else if(action==='start'){const c=cases.find(c=>c.id===v.id);if(!c||c.level>g.level)throw Error('律所等级不足');if(g.jobs.length>=capacity(g))throw Error('在办案件已满，升级档案室可增加容量');if(g.jobs.some(j=>j.id===c.id))throw Error('该委托已在办理');const team=[...new Set(v.team||[])];if(team.length>2)throw Error('每个案件最多安排两名成员');team.forEach(id=>{const m=g.members.find(m=>m.id===id);if(!m||busy(g,id)||m.energy<15)throw Error('成员忙碌或精力不足')});team.forEach(id=>g.members.find(m=>m.id===id).energy-=15);g.serial=(g.serial||0)+1;g.jobs.push({uid:'case-'+g.serial,id:c.id,team,stage:0,score:0,choices:[],hintUsed:false,started:now});message='已接受'+c.name+(team.length?'':'，由所长亲自承办')}
  else if(action==='hint'){const j=g.jobs.find(j=>j.uid===v.uid);if(!j||j.stage!==1||j.hintUsed||!has(g,'evidence',j.team))throw Error('此阶段没有可用的天赋提示');j.hintUsed=true;j.score+=5;message='证据洞察：优先核查原始材料、来源与完整性，不要以单一截图或传闻替代证明。'}
  else if(action==='choose'){const j=g.jobs.find(j=>j.uid===v.uid);if(!j||j.stage>=5)throw Error('案件阶段已变化');if(v.stage!==j.stage)throw Error('该阶段已经处理');if(v.choice!==0&&v.choice!==1)throw Error('请选择处理方案');const c=cases.find(c=>c.id===j.id),idx=[3,1,0,c.steps[j.stage][0]==='庭审'?4:3,2][j.stage];let power=18+j.team.reduce((a,id)=>{const m=g.members.find(m=>m.id===id);return a+ability(m)[idx]+(person(m).specialty===c.kind?8:0)},0);if(j.stage===2)power+=g.facilities.library*4;if(j.stage===3){power+=g.facilities.meeting*4;if(has(g,'negotiation',j.team)&&c.steps[3][0]==='谈判')power*=1.1}j.score+=(v.choice===0?14:3)+Math.min(6,Math.floor(power/c.need*3));j.choices.push(v.choice);message=c.steps[j.stage][4];j.stage++;if(j.stage===5)j.finished=now}
  else if(action==='collect'){const j=g.jobs.find(j=>j.uid===v.uid);if(!j||j.stage!==5)throw Error('请先完成全部办案阶段');const c=cases.find(c=>c.id===j.id),quality=Math.min(100,j.score);const routeBonus=(g.route==='commercial'&&c.kind==='合同')||(g.route==='community'&&c.kind==='公益')||(g.route==='litigation'&&['刑事','行政'].includes(c.kind));const fee=Math.round(c.fee*(.7+quality/200)*(has(g,'finance')?1.05:1)*(routeBonus?1.1:1));const rep=Math.round(c.rep*(.6+quality/150)*(has(g,'fame')?1.05:1)*(c.kind==='公益'&&has(g,'charity',j.team)?1.15:1)*100)/100;const sat=Math.min(100,quality+g.facilities.reception*2);g.funds+=fee;g.dayIncome+=fee;g.totalIncome+=fee;g.reputation=Math.round((g.reputation+rep)*100)/100;g.casesDone++;g.dayDone++;g.satisfaction=Math.round((g.satisfaction*3+sat)/4);const xp=Math.round(35*(has(g,'mentor',j.team)?1.1:1));j.team.forEach(id=>{const m=g.members.find(m=>m.id===id);m.xp+=xp;m.bond=Math.min(100,m.bond+2);while(m.level<30&&m.xp>=m.level*40){m.xp-=m.level*40;m.level++}});weekly(g,now);g.weekly.count++;g.weekly.satisfied+=sat;if(c.kind==='公益')g.weekly.charity+=rep;g.history.unshift({name:c.name,quality,fee,rep,sat,at:now});g.history=g.history.slice(0,15);g.jobs=g.jobs.filter(x=>x.uid!==j.uid);message='结案评价 '+quality+' · 资金 +'+fee+' · 声望 +'+rep}
  else if(action==='settle'){if(g.jobs.length)throw Error('请先完成在办案件');if(!g.dayDone)throw Error('至少完成一件委托再结束经营日');const wages=payroll(g),due=wages+g.arrears,paid=Math.min(g.funds,due);g.funds-=paid;g.arrears=due-paid;g.totalWages+=paid;g.lastStatement={day:g.day,income:g.dayIncome,expenses:g.dayExpenses,wages,paid,arrears:g.arrears,profit:g.dayIncome-g.dayExpenses-wages};g.members.forEach(m=>m.energy=Math.min(100,m.energy+35+g.facilities.lounge*10));g.day++;g.dayDone=0;g.dayIncome=0;g.dayExpenses=0;message=g.arrears?'经营日已结算，待补发薪资 '+g.arrears:'经营日已结算，团队精力已恢复'}
  else if(action==='arrears'){if(!g.arrears)throw Error('暂无待发薪资');const n=Math.min(g.funds,g.arrears);g.funds-=n;g.arrears-=n;g.totalWages+=n;message='已补发薪资 '+n}
  else if(action==='daily'){const day=new Date(now+8*3600000).toISOString().slice(0,10);if(g.lastDaily===day)throw Error('今日补贴已领取');g.lastDaily=day;g.funds+=100;message='运营补贴 +100'}
  else if(action==='event'){if(g.eventDone===g.day)throw Error('本经营日事件已处理');if(v.choice!==0&&v.choice!==1)throw Error('请选择处理方式');const type=g.day%3;if(type===1){if(v.choice===0){pay(g,20);g.reputation+=2;g.satisfaction=Math.min(100,g.satisfaction+3);message='主动回访并完善交付，声望 +2'}else{g.reputation+=1;message='记录反馈并解释办理进度，声望 +1'}}else if(type===2){g.members.forEach(m=>{if(v.choice===0)m.bond=Math.min(100,m.bond+3);else m.energy=Math.min(100,m.energy+5)});message=v.choice===0?'开展团队讨论，团队信任 +3':'安排弹性休息，团队精力 +5'}else{if(v.choice===0){g.reputation+=2;weekly(g,now);g.weekly.charity+=2;message='参加社区普法，声望与本周公益贡献 +2'}else{g.funds+=30;g.dayIncome+=30;message='整理服务手册，节约运营资金 +30'}}g.eventDone=g.day}
  else if(action==='story'){const m=g.members.find(m=>m.id===v.id);if(!m||m.bond<20||m.storyClaimed)throw Error('信任达到20可领取一次个人故事奖励');m.storyClaimed=true;m.training[person(m).focus]+=5;g.reputation+=3;message=person(m).name+'完成个人成长篇章，专长 +5，声望 +3'}
  else if(action==='legacy'){if(!g.migratedCurrent)throw Error('暂无旧版在办委托');if(now<g.migratedCurrent.finish)throw Error('旧委托仍在办理');const c={consult:[60,2],contract:[150,5],trial:[320,10]}[g.migratedCurrent.id]||[60,2];g.funds+=c[0]+num(g.migratedCurrent.bonus);g.reputation+=c[1];g.casesDone++;g.migratedCurrent=null;message='旧版委托已结算'}
  else throw Error('操作不存在');
  log(g,message);return {game:g,message};
 }
 root.FirmEngine={stats,grades,people,talents,facilities,cases,costs,rooms,fresh,read,member,person,ability,salary,payroll,seats,has,capacity,busy,market,weekly,act};
})(typeof window!=='undefined'?window:globalThis);
