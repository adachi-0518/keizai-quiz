#!/usr/bin/env node
/*
 * デジタル庁デザインシステム（DADS）の考え方を、単体HTML群へ共通適用する。
 * 外部依存は追加せず、各科目固有の配色と出題形式は維持する。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = [
  'index.html',
  'ginko/index.html',
  'shakai/index.html',
  'jinteki/index.html',
  'soshiki/index.html',
  'soshiki-read/index.html',
  'kinyu/index.html',
  'bizmodel/index.html',
  'seiyo/index.html',
  'seiyo-card/index.html',
];

const css = `<!-- DADS-ENHANCEMENT:START -->
<style id="dads-enhancement">
/* Digital Agency Design System v2.18.0 を参照した共通スタイル */
:root{
  --dads-link:#0017c1;
  --dads-visited:#551a8b;
  --dads-focus:#ffd43b;
  --dads-neutral-900:#1a1a1a;
  --dads-neutral-700:#4d4d4d;
  --dads-radius-s:8px;
  --dads-radius-m:12px;
  --dads-space-1:4px;
  --dads-space-2:8px;
  --dads-space-3:12px;
  --dads-space-4:16px;
  --dads-space-6:24px;
  --dads-space-8:32px;
}
@media(prefers-color-scheme:dark){:root{
  --dads-link:#9db7ff;
  --dads-visited:#d9b7ff;
  --dads-neutral-900:#f5f5f5;
  --dads-neutral-700:#c7c7c7;
}}
html{scroll-behavior:smooth}
body{font-size:16px;line-height:1.75;font-feature-settings:normal}
.wrap{max-width:48rem;padding:var(--dads-space-8) var(--dads-space-6) 64px}
h1{font-size:clamp(1.5rem,1.25rem + 1vw,2rem);font-weight:700;line-height:1.4;margin-bottom:var(--dads-space-3)}
.lead{font-size:1rem;line-height:1.8;margin-bottom:var(--dads-space-2)}
.meta{font-size:.875rem;line-height:1.6;margin-bottom:var(--dads-space-8)}
.modehint,.hud,.ask,.src,.foot,.item .ex,.doc .why{font-size:.875rem}

/* キーボード利用者の現在位置を、DADS準拠の黄＋黒の二重線で示す */
:where(a,button,summary,[tabindex]):focus-visible{
  outline:2px solid #000!important;
  outline-offset:2px!important;
  box-shadow:0 0 0 5px var(--dads-focus)!important;
  position:relative;
  z-index:10;
}
:where(button,[role="button"]){min-height:44px}
button{touch-action:manipulation}
button:disabled{cursor:not-allowed}

/* リンクは色だけに依存させない */
.foot a,.about a,.lead a,.doc a,.note a{
  color:var(--dads-link);
  text-decoration:underline;
  text-decoration-thickness:1px;
  text-underline-offset:.2em;
}
.foot a:visited,.about a:visited,.lead a:visited,.doc a:visited,.note a:visited{color:var(--dads-visited)}

/* スキップリンク */
.dads-skip{
  position:fixed;left:var(--dads-space-4);top:var(--dads-space-4);z-index:9999;
  padding:10px 16px;border:2px solid #000;border-radius:var(--dads-radius-s);
  background:#fff;color:#000;font-weight:700;text-decoration:underline;
  transform:translateY(-160%);
}
.dads-skip:focus{transform:none}

/* コンポーネントの役割と操作面積を揃える */
.chip{min-height:44px;padding:9px 16px;border-radius:999px;font-size:.875rem}
.seg{border-radius:var(--dads-radius-s);margin-bottom:var(--dads-space-4)}
.seg button{min-height:48px;padding:10px 20px;font-size:1rem;border-bottom:3px solid transparent}
.seg button.on{border-bottom-color:currentColor}
.ch{min-height:52px;padding:14px 16px;border-radius:var(--dads-radius-s);font-size:1rem}
.btn{min-height:48px;border-radius:var(--dads-radius-s);font-size:1rem}
.nav button,.foot .tools button{min-height:44px;padding:10px 16px;border-radius:var(--dads-radius-s);font-size:.875rem}
.card,.doc,.item,.done{border-radius:var(--dads-radius-m)}
.qtext{font-size:1.125rem;line-height:1.85}
.track{height:8px}
details.note>summary{min-height:44px;display:flex;align-items:center;font-size:1rem}
.empty{font-size:1rem}

/* トップページのカード：主題・補足・遷移先を一つの塊として読む */
a.card{border-radius:var(--dads-radius-m);padding:20px 22px;margin-bottom:var(--dads-space-3)}
a.card .ct{font-size:1.125rem;font-weight:700;text-decoration:underline;text-underline-offset:.2em}
a.card .cm{font-size:1rem;line-height:1.8}
a.card:hover .ct,a.card:focus-visible .ct{text-decoration-thickness:2px}
a.card::after{content:"この学習ツールを開く →";display:block;margin-top:var(--dads-space-3);font-size:.875rem;font-weight:700;color:var(--accent)}
.about{border-radius:var(--dads-radius-m);font-size:1rem}

/* 正誤は色だけでなく、記号・枠線・文言でも判別できる */
.verdict{font-size:.875rem;border:1px solid currentColor}
.ch.correct{border-width:2px}.ch.miss{border-width:2px}

@media(max-width:560px){
  .wrap{padding:var(--dads-space-6) var(--dads-space-4) 52px}
  h1{font-size:1.5rem}
  .lead{font-size:1rem}
  .card{padding:var(--dads-space-4)}
  .qtext{font-size:1.0625rem}
  .ch{font-size:1rem;padding:13px 14px}
  .seg{display:flex;width:100%}
  .seg button{flex:1;padding-inline:10px;white-space:normal}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}
}
</style>
<!-- DADS-ENHANCEMENT:END -->`;

const js = `<!-- DADS-A11Y:START -->
<script id="dads-a11y">
(function(){
  'use strict';
  function all(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
  function setButtonTypes(root){all('button',root).forEach(function(b){if(!b.hasAttribute('type'))b.type='button';});}
  function enhance(){
    var main=document.querySelector('.wrap')||document.body;
    if(!main.id)main.id='main-content';
    main.setAttribute('role','main');
    if(!document.querySelector('.dads-skip')){
      var skip=document.createElement('a');skip.className='dads-skip';skip.href='#'+main.id;skip.textContent='本文へ移動';
      document.body.insertBefore(skip,document.body.firstChild);
    }
    var h1=document.querySelector('h1');
    if(h1){if(!h1.id)h1.id='page-title';main.setAttribute('aria-labelledby',h1.id);}

    var modes=document.getElementById('modes');
    if(modes){
      modes.setAttribute('role','tablist');modes.setAttribute('aria-label','学習モード');
      all('button',modes).forEach(function(b,i){
        b.setAttribute('role','tab');b.setAttribute('aria-controls','stage');
        var on=b.classList.contains('on');b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1;
      });
    }
    var chips=document.getElementById('chips');
    if(chips){chips.setAttribute('role','group');chips.setAttribute('aria-label','出題範囲');
      all('button',chips).forEach(function(b){b.setAttribute('aria-pressed',b.classList.contains('on')?'true':'false');});}
    var tools=document.getElementById('tools');
    if(tools){tools.setAttribute('role','group');tools.setAttribute('aria-label','表示と復習の設定');
      all('button.on',tools).forEach(function(b){b.setAttribute('aria-pressed','true');});}
    var hud=document.getElementById('hud');if(hud){hud.setAttribute('role','status');hud.setAttribute('aria-live','polite');}
    var stage=document.getElementById('stage');if(stage){stage.setAttribute('role','region');stage.setAttribute('aria-label','問題と解答');}
    var nav=document.getElementById('nav');if(nav){nav.setAttribute('aria-label','問題の移動');}
    var track=document.getElementById('track');
    if(track){
      var bar=track.querySelector('i'),pct=bar?parseFloat(bar.style.width)||0:0;
      track.setAttribute('role','progressbar');track.setAttribute('aria-label','学習の進捗');
      track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax','100');track.setAttribute('aria-valuenow',String(Math.round(pct)));
    }
    all('.choices').forEach(function(c){c.setAttribute('role','group');c.setAttribute('aria-label','解答の選択肢');});
    all('.ch').forEach(function(b){
      b.setAttribute('aria-pressed',b.classList.contains('pick')?'true':'false');
      if(b.classList.contains('correct'))b.setAttribute('aria-label','正解: '+b.textContent.trim());
      if(b.classList.contains('miss'))b.setAttribute('aria-label','選択した不正解: '+b.textContent.trim());
    });
    all('details.note').forEach(function(d){var s=d.querySelector('summary');if(s)s.setAttribute('aria-label',(s.textContent||'要点ノート')+'を開閉');});
    setButtonTypes(document);
  }
  var queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;enhance();});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){enhance();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','open']});});
  else{enhance();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','open']});}
})();
</script>
<!-- DADS-A11Y:END -->`;

function stripBlock(html, start, end) {
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}\\s*`, 'g');
  return html.replace(pattern, '');
}

for (const rel of files) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = stripBlock(html, '<!-- DADS-ENHANCEMENT:START -->', '<!-- DADS-ENHANCEMENT:END -->');
  html = stripBlock(html, '<!-- DADS-A11Y:START -->', '<!-- DADS-A11Y:END -->');
  if (!html.includes('</head>') || !html.includes('</body>')) throw new Error(`HTML構造を確認できません: ${rel}`);
  html = html.replace('</head>', `${css}\n</head>`);
  html = html.replace('</body>', `${js}\n</body>`);
  fs.writeFileSync(file, html);
  console.log(`更新: ${rel}`);
}
