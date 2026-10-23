// Native click-to-call & click-to-SMS helpers (All-Star Renovations, (501) 504-3398)
(function(){
  var TEL='tel:5015043398', SMS='sms:5015043398';
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('[data-contact]');
    if(!a)return;
    var k=a.getAttribute('data-contact');
    if(a.tagName!=='A'){e.preventDefault();location.href=k==='sms'?SMS:TEL;}
    if(window.dataLayer)window.dataLayer.push({event:k==='sms'?'click_to_text':'click_to_call'});
  });
})();
