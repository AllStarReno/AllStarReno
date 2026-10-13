(function(){
  window.openSwivlModal=function(url,title){var m=document.getElementById('swivl-modal');if(!m){location.href=url;return;}
    document.getElementById('swivl-modal-title').textContent=title||'Instant Estimate & Scheduler';
    document.getElementById('swivl-iframe').src=url;m.classList.remove('hidden');m.classList.add('flex');document.body.style.overflow='hidden';};
  window.closeSwivlModal=function(){var m=document.getElementById('swivl-modal');m.classList.add('hidden');m.classList.remove('flex');document.getElementById('swivl-iframe').src='';document.body.style.overflow='';};
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-swivl]');
    if(a&&!e.metaKey&&!e.ctrlKey){e.preventDefault();var k=a.getAttribute('data-swivl');
      openSwivlModal(a.href,k==='scheduler'?'Schedule Your Free Consultation':k==='chat'?'Chat With All-Star Renovations':'Free Instant Quote');
      var p=document.getElementById('asr-mnav-panel');if(p)p.classList.add('hidden');}
    if(e.target.id==='swivl-modal')closeSwivlModal();
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.getElementById('swivl-modal'))closeSwivlModal();});
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('asr-mnav-btn'),p=document.getElementById('asr-mnav-panel'),c=document.getElementById('asr-mnav-close');
    if(b&&p){b.addEventListener('click',function(){p.classList.remove('hidden');b.setAttribute('aria-expanded','true');});
      c.addEventListener('click',function(){p.classList.add('hidden');b.setAttribute('aria-expanded','false');});}
  });
})();
