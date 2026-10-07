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
  // How each service reads inside a sentence
  var phrase={
    'Moving & Heavy Lifting':'moving and heavy lifting',
    'Furniture Assembly':'furniture assembly',
    'Junk Removal / Hauling':'junk removal and hauling',
    'General Repairs':'general repairs',
    'Mounting & Installation':'mounting and installation',
    'Light Electrical':'light electrical work',
    'Light Plumbing':'light plumbing work',
    'Window & Screen Repair':'window and screen repair',
    'Deep Cleaning Help':'deep cleaning help',
    'Landscaping & Yard Maintenance':'landscaping and yard maintenance',
    'Tree & Shrub Trimming / Removal':'tree and shrub trimming or removal',
    'Weeding, Mulching, Planting, Lawn Care':'weeding, mulching, planting or lawn care',
    'Pressure Washing':'pressure washing',
    'Hauling & Disposal':'hauling and disposal',
    'Fence & Gate Repair or Installation':'fence and gate repair or installation',
    'Deck Repairs & Painting/Staining':'deck repairs, painting or staining',
    'Outdoor Furniture Assembly':'outdoor furniture assembly',
    'Interior & Exterior Painting':'interior or exterior painting',
    'Trim, Molding & Touch-ups':'trim, molding and touch-ups',
    'Drywall Patching & Texturing':'drywall patching and texturing'
  };
  function sentence(t){return /[.!?\u2026]$/.test(t)?t:t+'.'}
  function build(){
    var f=form.elements,name=f.name.value.trim(),svc=f.service.value,town=f.town.value,det=f.details.value.trim();
    var where=town?(' in '+town):' in Sonoma County';
    var what=svc?(phrase[svc]||svc.toLowerCase()):'a project';
    var lines=['Hi Carlos,',''];
    lines.push('I’d like a free estimate for '+what+where+'.');
    lines.push(timing[f.timing.value]);
    if(det){lines.push('');lines.push('Details: '+sentence(det))}
    lines.push('');lines.push(name?('Thanks, '+name):'Thanks!');
    return {subject:'Free estimate request: '+(svc||'A project')+where,body:lines.join('\n')};
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();var m=build();
    window.location.href='mailto:sonomacountycarlos@gmail.com?subject='+encodeURIComponent(m.subject)+'&body='+encodeURIComponent(m.body);
  });
  document.getElementById('text-instead').addEventListener('click',function(){
    var m=build();window.location.href='sms:+17076237700?&body='+encodeURIComponent(m.body);
  });
})();
