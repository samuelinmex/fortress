document.documentElement.classList.remove('no-js');

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function onScroll(){
  if(header) header.classList.toggle('scrolled', window.scrollY > 28);
}
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

if(navToggle && navLinks){
  navToggle.addEventListener('click',()=>{
    const open = navLinks.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    navLinks.classList.remove('open'); document.body.classList.remove('nav-open');
  }));
}

const reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='none';
        io.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  reveals.forEach(el=>{
    el.style.transition='opacity .7s ease, transform .7s cubic-bezier(.2,.75,.2,1)';
    io.observe(el);
  });
}else{
  reveals.forEach(el=>{el.style.opacity='1';el.style.transform='none'});
}

// Optional GSAP enhancement. The site still works without the CDN.
window.addEventListener('load',()=>{
  if(window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-copy > *',{opacity:0,y:26,duration:.85,stagger:.09,ease:'power3.out'});
    gsap.from('.hero-visual',{opacity:0,scale:.92,duration:1.15,ease:'power3.out',delay:.2});
    gsap.utils.toArray('.tech-step').forEach((step,i)=>{
      gsap.from(step,{scrollTrigger:{trigger:step,start:'top 88%'},opacity:0,x:28,duration:.6,delay:i*.03,ease:'power2.out'});
    });
  }
});
