(function(){
  var nav=document.querySelector('.nav'),btn=document.querySelector('.menu-btn'),menu=document.getElementById('site-menu'),txt=btn.querySelector('.menu-btn__text');
  function setOpen(open,focusBtn){
    nav.classList.toggle('is-open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    txt.textContent=open?'Close menu':'Menu';
    if(!open&&focusBtn)btn.focus();
  }
  btn.addEventListener('click',function(){setOpen(btn.getAttribute('aria-expanded')!=='true',false)});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false,false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){setOpen(false,true)}});
  window.matchMedia('(min-width:1080px)').addEventListener('change',function(m){if(m.matches)setOpen(false,false)});

  var form=document.getElementById('quote-form');
  var timing={asap:'I’d like to get it done as soon as possible.',week:'I’d like to get it done this week.',month:'I’d like to get it done in the next few weeks.',flex:'My timing is flexible.'};
  function build(){
    var f=form.elements,name=f.name.value.trim(),svc=f.service.value,town=f.town.value,det=f.details.value.trim();
    var where=town?(' in '+town):' in Sonoma County';
    var lines=['Hi Carlos,',''];
    lines.push(svc?('I’d like a free estimate for '+svc+where+'.'):('I’d like a free estimate for a project'+where+'.'));
    lines.push(timing[f.timing.value]);
    if(det){lines.push('');lines.push('Details: '+det)}
    lines.push('');lines.push(name?('Thanks, '+name):'Thanks');
    return {subject:'Free estimate request'+(svc?': '+svc:''),body:lines.join('\n')};
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();var m=build();
    window.location.href='mailto:sonomacountycarlos@gmail.com?subject='+encodeURIComponent(m.subject)+'&body='+encodeURIComponent(m.body);
  });
  document.getElementById('text-instead').addEventListener('click',function(){
    var m=build();window.location.href='sms:+17076237700?&body='+encodeURIComponent(m.body);
  });
})();
