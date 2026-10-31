(function(){
  'use strict';
  let current='level',sequence=0;
  async function draw(type){
    current=type;const body=document.getElementById('lexRankList'),n=++sequence;if(!body)return;
    document.querySelectorAll('[data-lex-rank]').forEach(b=>{b.classList.toggle('selected',b.dataset.lexRank===type);b.setAttribute('aria-pressed',String(b.dataset.lexRank===type))});
    body.textContent='正在加载排行榜…';
    try{const entries=await window.lexLeaderboard(type);if(n!==sequence)return;if(!entries.length){body.textContent='暂时还没有排行数据';return}
      body.innerHTML=entries.map((e,i)=>'<div class="lr-row"><span class="lr-rank">'+(i+1)+'</span><div class="lr-name"><b>'+escHtml(e.nickname||'法律人')+'</b><small>ID '+escHtml(e.id)+'</small></div><div class="lr-value">'+(type==='level'?'Lv.'+(getLevelInfo(e.totalPoints).index+1)+' · '+escHtml(getLevelInfo(e.totalPoints).name):e.points+' 积分')+'</div></div>').join('');
    }catch(e){if(n===sequence)body.textContent=e.message||'排行榜暂时无法加载';}
  }
  window.lexShowRanking=function(type){document.getElementById('lexRankPanel').hidden=false;draw(type||current)};
  window.lexHideRanking=function(){sequence++;document.getElementById('lexRankPanel').hidden=true};
})();
