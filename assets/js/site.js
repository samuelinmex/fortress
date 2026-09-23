document.documentElement.classList.remove('no-js');
const header=document.querySelector('.site-header');
const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');}));}
const onScroll=()=>{if(header){header.classList.toggle('scrolled',window.scrollY>18)}};onScroll();window.addEventListener('scroll',onScroll,{passive:true});
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}}),{threshold:.12}});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
