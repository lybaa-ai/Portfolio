const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');reveal.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(x=>reveal.observe(x));

const bars=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('.bar',e.target).forEach(b=>b.style.setProperty('--p',b.dataset.value+'%'));bars.unobserve(e.target)}}),{threshold:.2});
const skillSection=$('#skills'); if(skillSection) bars.observe(skillSection);

$$('[data-count]').forEach(el=>{
  const target=Number(el.dataset.count);
  const obs=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      let start=0; const timer=setInterval(()=>{start+=Math.ceil(target/35);if(start>=target){start=target;clearInterval(timer)}el.textContent=start+(target<100?'+':'');},35);obs.disconnect();
    }
  }),{threshold:.7}); obs.observe(el);
});

const cursor=$('.cursor');
addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});

$$('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<800)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*3.2}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

$$('.magnetic').forEach(btn=>{
  btn.addEventListener('pointermove',e=>{
    if(innerWidth<800)return;
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.08}px,${(e.clientY-(r.top+r.height/2))*.08}px)`;
  });
  btn.addEventListener('pointerleave',()=>btn.style.transform='');
});

const hamb=$('#hamb'),nav=$('#nav');
hamb?.addEventListener('click',()=>{nav.classList.toggle('open');hamb.setAttribute('aria-expanded',nav.classList.contains('open'))});
$$('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const hero=$('#heroVisual');
addEventListener('scroll',()=>{if(hero&&innerWidth>800)hero.style.transform=`translateY(${Math.min(scrollY*.025,18)}px)`});
