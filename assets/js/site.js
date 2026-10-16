(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
/* reveal */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -5% 0px'});$$('.reveal').forEach(function(el){io.observe(el)})}else{$$('.reveal').forEach(function(el){el.classList.add('in')})}
/* mega menu: click/tap + keyboard, hover handled in CSS */
var dds=$$('.asr-dd');
function closeAll(except){dds.forEach(function(d){if(d!==except){d.classList.remove('open');var t=$('.asr-dd-t',d);if(t)t.setAttribute('aria-expanded','false')}})}
dds.forEach(function(d){var t=$('.asr-dd-t',d);
 t.addEventListener('click',function(e){if(window.matchMedia('(hover:none)').matches||e.detail===0){e.preventDefault()}
  if(window.matchMedia('(hover:none)').matches||e.detail===0){var o=d.classList.toggle('open');t.setAttribute('aria-expanded',o);closeAll(d)}});
 t.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();d.classList.add('open');t.setAttribute('aria-expanded','true');var a=$('.asr-dd-p a',d);if(a)a.focus()}});
 d.addEventListener('mouseenter',function(){closeAll(d)})});
document.addEventListener('click',function(e){if(!e.target.closest('.asr-dd'))closeAll()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeAll();var p=$('#asr-mnav-panel');if(p&&!p.classList.contains('hidden')){p.classList.add('hidden');document.body.classList.remove('noscroll');var b=$('#asr-mnav-btn');if(b)b.focus()}}});
/* mobile drawer: lock body scroll */
var mb=$('#asr-mnav-btn'),mp=$('#asr-mnav-panel');
if(mb&&mp){mb.addEventListener('click',function(){document.body.classList.add('noscroll')});$('#asr-mnav-close').addEventListener('click',function(){document.body.classList.remove('noscroll')});
 mp.addEventListener('click',function(e){if(e.target.closest('a'))document.body.classList.remove('noscroll')})}
/* tabs */
$$('[data-tabs]').forEach(function(root){var tabs=$$('[role=tab]',root),panels=$$('[data-panel]',root);
 function sel(id){tabs.forEach(function(t){var on=t.getAttribute('data-tab')===id;t.setAttribute('aria-selected',on);t.classList.toggle('bg-orange-700',on);t.classList.toggle('text-white',on);t.classList.toggle('bg-white/10',!on);t.classList.toggle('text-slate-200',!on);t.tabIndex=on?0:-1});
  panels.forEach(function(p){p.classList.toggle('hidden',p.getAttribute('data-panel')!==id)})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t.getAttribute('data-tab'))});t.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:null;if(n===null)return;e.preventDefault();var x=tabs[(n+tabs.length)%tabs.length];x.focus();sel(x.getAttribute('data-tab'))})});
 sel(tabs[0].getAttribute('data-tab'))});
/* generic filter list: [data-filter-root] with chips [data-chip=group:value], search [data-search], sort [data-sort-select], items [data-item] */
$$('[data-filter-root]').forEach(function(root){
 var items=$$('[data-item]',root),state={},q='',count=$('[data-count]',root),empty=$('[data-empty]',root),box=items.length?items[0].parentNode:null;
 function run(){var n=0,t=q.trim().toLowerCase();items.forEach(function(it){var ok=true;Object.keys(state).forEach(function(g){var v=state[g];if(v!=='all'){var have=(it.getAttribute('data-'+g)||'').split('|');if(have.indexOf(v)<0)ok=false}});
  if(ok&&t&&(it.getAttribute('data-text')||it.textContent).toLowerCase().indexOf(t)<0)ok=false;it.classList.toggle('hidden',!ok);if(ok)n++});
  if(count)count.textContent=n;if(empty)empty.classList.toggle('hidden',n>0)}
 $$('[data-chip]',root).forEach(function(c){var p=c.getAttribute('data-chip').split(':');if(!(p[0] in state))state[p[0]]='all';
  c.addEventListener('click',function(){state[p[0]]=p[1];$$('[data-chip^="'+p[0]+':"]',root).forEach(function(x){var on=x===c;x.setAttribute('aria-pressed',on);x.classList.toggle('bg-orange-700',on);x.classList.toggle('text-white',on);x.classList.toggle('bg-white/10',!on);x.classList.toggle('text-slate-200',!on)});run()})});
 var s=$('[data-search]',root);if(s)s.addEventListener('input',function(){q=s.value;run()});
 var so=$('[data-sort-select]',root);if(so&&box)so.addEventListener('change',function(){var k=so.value;var arr=items.slice();if(k!=='default')arr.sort(function(a,b){var x=a.getAttribute('data-'+k)||'',y=b.getAttribute('data-'+k)||'';return isNaN(+x)||isNaN(+y)?x.localeCompare(y):(+x)-(+y)});else arr.sort(function(a,b){return (+a.getAttribute('data-i'))-(+b.getAttribute('data-i'))});arr.forEach(function(a){box.appendChild(a)})});
 var rs=$('[data-reset]',root);if(rs)rs.addEventListener('click',function(){q='';if(s)s.value='';Object.keys(state).forEach(function(g){var c=$('[data-chip="'+g+':all"]',root);if(c)c.click()});run()});
 run()});
/* portfolio lightbox over visible cards */
var lb=$('#pl');if(lb){var cards=$$('.pf'),cur=0,last=null;
 function vis(){return cards.filter(function(c){return !c.classList.contains('hidden')})}
 function show(i){var v=vis();if(!v.length)return;cur=(i+v.length)%v.length;var g=v[cur];$('#pl-img').src=g.getAttribute('data-img');$('#pl-img').alt=g.getAttribute('data-alt');$('#pl-t').textContent=g.getAttribute('data-title');$('#pl-loc').textContent=g.getAttribute('data-loc');$('#pl-d').textContent=g.getAttribute('data-desc');$('#pl-c').textContent=(cur+1)+' / '+v.length;
  var ul=$('#pl-s');ul.innerHTML='';g.getAttribute('data-specs').split('|').forEach(function(t){var l=document.createElement('li');l.textContent='\u2713 '+t;ul.appendChild(l)})}
 function open(c){last=document.activeElement;var v=vis();show(v.indexOf(c));lb.classList.remove('hidden');lb.classList.add('flex');document.body.classList.add('noscroll');$('#pl-x').focus()}
 function close(){lb.classList.add('hidden');lb.classList.remove('flex');document.body.classList.remove('noscroll');if(last)last.focus()}
 cards.forEach(function(c){c.addEventListener('click',function(){open(c)})});
 $('#pl-x').addEventListener('click',close);$('#pl-p').addEventListener('click',function(){show(cur-1)});$('#pl-n').addEventListener('click',function(){show(cur+1)});
 lb.addEventListener('click',function(e){if(e.target===lb)close()});
 document.addEventListener('keydown',function(e){if(lb.classList.contains('hidden'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
 var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(tx===null)return;var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>60)show(cur+(dx<0?1:-1));tx=null},{passive:true})}
/* before/after sliders (portfolio page) */
$$('.ba2').forEach(function(ba){var af=$('.ba2-after',ba),hd=$('.ba2-handle',ba),rg=ba.parentNode.querySelector('input[type=range]');
 function setPos(p){p=Math.max(0,Math.min(100,p));af.style.clipPath='inset(0 '+(100-p)+'% 0 0)';hd.style.left=p+'%';if(rg)rg.value=p}
 var drag=false;function fx(x){var r=ba.getBoundingClientRect();setPos((x-r.left)/r.width*100)}
 ba.addEventListener('pointerdown',function(e){drag=true;if(e.pointerType!=='touch')fx(e.clientX);try{ba.setPointerCapture(e.pointerId)}catch(_){}});
 ba.addEventListener('pointermove',function(e){if(drag)fx(e.clientX)});['pointerup','pointercancel','lostpointercapture'].forEach(function(n){ba.addEventListener(n,function(){drag=false})});
 if(rg)rg.addEventListener('input',function(){setPos(+rg.value)})});
/* coverage mini-map on county pages: click a marker to highlight card */
$$('[data-mapwrap]').forEach(function(w){var ms=$$('[data-mk]',w),cs=$$('[data-mc]',w);function sel(id){ms.forEach(function(m){m.classList.toggle('ring-4',m.getAttribute('data-mk')===id);m.classList.toggle('ring-orange-400',m.getAttribute('data-mk')===id)});cs.forEach(function(c){var on=c.getAttribute('data-mc')===id;c.classList.toggle('border-orange-500',on);c.classList.toggle('border-white/10',!on)})}
 ms.forEach(function(m){m.addEventListener('click',function(){sel(m.getAttribute('data-mk'))})});cs.forEach(function(c){c.addEventListener('click',function(e){if(!e.target.closest('a'))sel(c.getAttribute('data-mc'))})})});
})();
