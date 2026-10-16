(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
/* reveal on scroll */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -60px 0px'});$$('.reveal').forEach(function(el){io.observe(el)})}else{$$('.reveal').forEach(function(el){el.classList.add('in')})}
/* project planner: builds a non-priced summary of the selections */
var SV={shower:'Shower Replacement',conversion:'Tub-to-Shower Conversion',walkin:'Walk-In Safety Tub',full_remodel:'Full Bathroom Remodel'},MT={standard:'Classic Durability',deluxe:'Signature Textures',premium:'Luxury Custom Spa'};
var plan={service:'shower',size:60,material:'standard'};
function summary(){return SV[plan.service]+', about '+plan.size+' sq. ft., '+MT[plan.material]+' materials'}
function upd(){var o=$('#plan-size-out');if(!o)return;o.textContent=plan.size;var e=$('#est-summary');if(e)e.textContent=SV[plan.service];$('#plan-service-line').textContent=summary();
$('#plan-sms').href='sms:5015043398?&body='+encodeURIComponent("Hi! I used the Project Planner for a "+summary()+". I'd love to schedule a free in-home consultation.")}
$$('.plan-opt').forEach(function(b){b.addEventListener('click',function(){var g=b.getAttribute('data-group');plan[g]=b.getAttribute('data-value');$$('.plan-opt[data-group="'+g+'"]').forEach(function(x){var on=x===b;x.setAttribute('aria-checked',on);x.classList.toggle('border-orange-500',on);x.classList.toggle('border-white/10',!on);var d=$('.plan-dot',x);d.classList.toggle('border-orange-500',on);d.classList.toggle('bg-orange-600',on);d.classList.toggle('border-white/30',!on)});upd()})});
var ps=$('#plan-size');if(ps)ps.addEventListener('input',function(){plan.size=+ps.value;upd()});
var sc=$('#plan-sched');if(sc)sc.addEventListener('click',function(){var t='Project summary: '+summary();try{navigator.clipboard.writeText(t)}catch(e){}$('#plan-note').textContent='Your selections: '+summary()+'. Copied so you can paste them in the scheduler.'});upd();
/* before/after slider: pointer events with touch-action:pan-y so vertical swipes still scroll the page */
var ba=$('#ba');if(ba){var af=$('#ba-after'),hd=$('#ba-handle'),rg=$('#ba-range');
function setPos(p){p=Math.max(0,Math.min(100,p));af.style.clipPath='inset(0 '+(100-p)+'% 0 0)';hd.style.left=p+'%';rg.value=p}
function fromX(x){var r=ba.getBoundingClientRect();setPos((x-r.left)/r.width*100)}
var drag=false;ba.addEventListener('pointerdown',function(e){drag=true;if(e.pointerType!=='touch')fromX(e.clientX);try{ba.setPointerCapture(e.pointerId)}catch(_){}});
ba.addEventListener('pointermove',function(e){if(drag)fromX(e.clientX)});
['pointerup','pointercancel','lostpointercapture'].forEach(function(n){ba.addEventListener(n,function(){drag=false})});
rg.addEventListener('input',function(){setPos(+rg.value)})}
/* gallery lightbox */
var gal=$$('.gal'),lb=$('#lb'),li=0,last=null;
function show(i){li=(i+gal.length)%gal.length;var g=gal[li];$('#lb-img').src=g.getAttribute('data-img');$('#lb-img').alt=g.getAttribute('data-alt');$('#lb-t').textContent=g.getAttribute('data-title');$('#lb-loc').textContent=g.getAttribute('data-loc');$('#lb-d').textContent=g.getAttribute('data-desc');$('#lb-c').textContent=(li+1)+' / '+gal.length;
var ul=$('#lb-s');ul.innerHTML='';g.getAttribute('data-specs').split('|').forEach(function(t){var l=document.createElement('li');l.textContent='\u2713 '+t;ul.appendChild(l)})}
function open(i){last=document.activeElement;show(i);lb.classList.remove('hidden');lb.classList.add('flex');$('#lb-x').focus()}
function close(){lb.classList.add('hidden');lb.classList.remove('flex');if(last)last.focus()}
if(lb){gal.forEach(function(g,i){g.addEventListener('click',function(){open(i)})});var ga=$('#gal-all');if(ga)ga.addEventListener('click',function(){open(0)});$('#lb-x').addEventListener('click',close);$('#lb-p').addEventListener('click',function(){show(li-1)});$('#lb-n').addEventListener('click',function(){show(li+1)});
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(lb.classList.contains('hidden'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)})}
/* coverage */
var cards=$$('.ccard'),marks=$$('.cmark'),region='all',sort='distance',q='',cur='conway',grid=$('#cgrid');
function select(id){cur=id;var c=cards.filter(function(x){return x.getAttribute('data-city')===id})[0];if(!c)return;var nm=c.getAttribute('data-name');
$('#sp-name').textContent=nm+', AR';$('#sp-county').textContent=c.getAttribute('data-county');var d=+c.getAttribute('data-dist');$('#sp-dist').textContent=d===0?'0 mi':d+' miles';$('#sp-win').textContent=c.getAttribute('data-consult');$('#sp-spec').textContent=c.getAttribute('data-specialty');$('#sp-zip').textContent=c.getAttribute('data-zip');
$('#sp-book').textContent='Book in '+nm;var lk=$('#sp-link');if(c.getAttribute('data-page')==='1'){lk.href='/service-areas/'+id;lk.textContent='Local Page \u2192'}else{lk.href='/service-areas/other-areas';lk.textContent='Other Areas \u2192'}
cards.forEach(function(x){var on=x===c;x.classList.toggle('border-orange-500',on);x.classList.toggle('border-white/10',!on)});
marks.forEach(function(m){var on=m.getAttribute('data-city')===id,hq=m.getAttribute('data-city')==='conway',dot=$('.dot',m);dot.classList.toggle('scale-125',on);dot.classList.toggle('ring-2',on);dot.classList.toggle('ring-white',on);if(!hq){dot.classList.toggle('bg-orange-600',on);dot.classList.toggle('bg-slate-700',!on)}})}
function render(){var n=0,t=q.trim().toLowerCase();var list=cards.slice().sort(function(a,b){return sort==='name'?a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')):(+a.getAttribute('data-dist'))-(+b.getAttribute('data-dist'))});
list.forEach(function(c,i){var ok=(region==='all'||c.getAttribute('data-region')===region)&&(!t||(c.getAttribute('data-name')+' '+c.getAttribute('data-county')+' '+c.getAttribute('data-zip')+' '+c.getAttribute('data-specialty')).toLowerCase().indexOf(t)>-1);c.classList.toggle('hidden',!ok);c.style.order=i;if(ok)n++});
$('#ccount').textContent=n;$('#cempty').classList.toggle('hidden',n>0)}
cards.forEach(function(c){c.addEventListener('click',function(e){if(e.target.closest('a'))return;select(c.getAttribute('data-city'))})});
marks.forEach(function(m){m.addEventListener('click',function(){select(m.getAttribute('data-city'))})});
$$('.chip').forEach(function(b){b.addEventListener('click',function(){region=b.getAttribute('data-region');$$('.chip').forEach(function(x){var on=x===b;x.setAttribute('aria-pressed',on);x.classList.toggle('bg-white',on);x.classList.toggle('text-slate-900',on);x.classList.toggle('font-semibold',on);x.classList.toggle('bg-white/5',!on);x.classList.toggle('text-slate-200',!on)});render()})});
$$('.sortb').forEach(function(b){b.addEventListener('click',function(){sort=b.getAttribute('data-sort');$$('.sortb').forEach(function(x){var on=x===b;x.setAttribute('aria-pressed',on);x.classList.toggle('bg-orange-700',on);x.classList.toggle('text-white',on);x.classList.toggle('bg-white/5',!on);x.classList.toggle('text-slate-200',!on)});render()})});
var cs=$('#cs');if(cs)cs.addEventListener('input',function(){q=cs.value;render()});
if(cards.length){render();select('conway',false)}
/* hub and home: reliable taps, visible feedback */
if(marks.length){var _sel=select,mapEl=marks[0].parentElement,panel=$('#sp-name').closest('[aria-live]');
panel.style.scrollMarginTop='112px';panel.style.scrollMarginBottom='84px';
marks.forEach(function(m){m.setAttribute('aria-pressed','false')});
select=function(id,fromTap){_sel(id);marks.forEach(function(m){m.setAttribute('aria-pressed',m.getAttribute('data-city')===id?'true':'false')});
if(fromTap===false)return;var c=cards.filter(function(x){return x.getAttribute('data-city')===id})[0];
if(c&&grid&&grid.scrollTo&&grid.scrollHeight>grid.clientHeight)grid.scrollTo({top:Math.max(0,c.offsetTop-grid.offsetTop-8),behavior:'smooth'});
var r=panel.getBoundingClientRect();if(r.top<112||r.bottom>window.innerHeight-84)panel.scrollIntoView({block:'nearest',behavior:'smooth'})};
marks.forEach(function(m){m.addEventListener('click',function(){select(m.getAttribute('data-city'))})});
mapEl.addEventListener('click',function(e){if(!e.detail&&!e.clientX)return;var best=null,bd=1e9;marks.forEach(function(m){var r=m.querySelector('.dot').getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));if(d<bd){bd=d;best=m}});if(best&&bd<30&&best.getAttribute('data-city')!==cur)select(best.getAttribute('data-city'))});select(cur||'conway',false)}

/* reviews */
var rb=$('#rev-btn');if(rb)rb.addEventListener('click',function(){var m=$('#more-rev'),open=m.classList.toggle('hidden')===false;rb.setAttribute('aria-expanded',open);rb.textContent=open?'Show fewer reviews':'Show more reviews';$$('.reveal',m).forEach(function(x){x.classList.add('in')})})
})();
