<<<<<<< HEAD
const state = {property:'', zones:0, areas:[], ptz:'', storage:''};
const steps = [...document.querySelectorAll('.q-step')];
const progress = document.querySelector('.progress span');
const back = document.querySelector('[data-back]');
const next = document.querySelector('[data-next]');
const result = document.querySelector('.quote-result');
let index = 0;

function renderStep(){
  steps.forEach((s,i)=>s.classList.toggle('active',i===index));
  progress.style.width = `${((index+1)/steps.length)*100}%`;
  back.style.visibility = index===0?'hidden':'visible';
  next.textContent = index===steps.length-1?'Ver mi recomendación':'Continuar';
  result.classList.remove('show');
}

function setSingle(step,key,value,button){
  state[key]=value;
  step.querySelectorAll('.option').forEach(o=>o.classList.remove('selected'));
  button.classList.add('selected');
}

document.querySelectorAll('.q-step').forEach(step=>{
  step.addEventListener('click',e=>{
    const btn=e.target.closest('.option'); if(!btn) return;
    const key=btn.dataset.key, value=btn.dataset.value;
    if(key==='areas'){
      btn.classList.toggle('selected');
      state.areas=[...step.querySelectorAll('.option.selected')].map(x=>x.dataset.value);
    }else if(key==='zones'){
      setSingle(step,key,Number(value),btn);
    }else{
      setSingle(step,key,value,btn);
    }
  });
});

function valid(){
  const s=steps[index];
  if(index===0) return !!state.property;
  if(index===1) return state.zones>0;
  if(index===2) return state.areas.length>0;
  if(index===3) return !!state.ptz;
  if(index===4) return !!state.storage;
  return true;
}

function recommend(){
  const ext = state.areas.some(a=>['cochera','patio','perimetro','fachada'].includes(a));
  let pack={name:'FORTRESS ESSENTIAL DOMO',price:4990,cameras:'1 cámara domo 4 MP',desc:'Un punto clave con acceso desde celular y grabación local.'};
  if(state.zones===1 && ext) pack={name:'FORTRESS EXTERIOR PROTECT',price:5190,cameras:'1 cámara bala 4 MP',desc:'Protección para fachada, cochera, patio o acceso exterior.'};
  if(state.zones===2 && state.ptz==='si') pack={name:'FORTRESS SMART DÚO',price:8490,cameras:'Domo + cámara PT 4 MP',desc:'Cobertura fija más movimiento y autoseguimiento.'};
  else if(state.zones===2) pack={name:'FORTRESS DÚO HOGAR',price:8490,cameras:'Domo + bala 4 MP',desc:'Cobertura interior y exterior equilibrada.'};
  if(state.zones===3) pack={name:'FORTRESS 360',price:11990,cameras:'Domo + PT + bala',desc:'Cobertura interior, dinámica y perímetro exterior.'};
  if(state.zones>=4) pack={name:'FORTRESS CASA / NEGOCIO 4',price:15490,cameras:'2 domos + 2 balas',desc:'Cobertura de cuatro puntos clave con posibilidad de crecer a NVR.'};

  let addon=0, addonText='';
  if(state.storage==='nvr' && pack.name!=='FORTRESS NEGOCIO PRO 4'){
    addon=7990; addonText=' + NVR + HDD 1 TB desde $7,990';
  }
  const total=pack.price+addon;
  document.querySelector('[data-result-name]').textContent=pack.name;
  document.querySelector('[data-result-desc]').textContent=pack.desc;
  document.querySelector('[data-result-price]').textContent=`Desde $${total.toLocaleString('es-MX')} MXN`;
  document.querySelector('[data-result-cameras]').textContent=pack.cameras;
  document.querySelector('[data-result-storage]').textContent=state.storage==='nvr'?'Grabación centralizada con NVR':'Grabación local en microSD 128 GB por cámara';
  document.querySelector('[data-result-addon]').textContent=addonText;

  const summary = `Hola Fortress. Realicé el cotizador de su página.\n\nPropiedad: ${state.property}\nZonas a proteger: ${state.zones}\nÁreas: ${state.areas.join(', ')}\nCámara con movimiento/PT: ${state.ptz}\nGrabación: ${state.storage}\nRecomendación: ${pack.name}\nEstimado: $${total.toLocaleString('es-MX')} MXN\n\nQuiero solicitar una cotización/visita.`;
  const wa=`https://wa.me/529983377518?text=${encodeURIComponent(summary)}`;
  document.querySelector('[data-whatsapp-result]').href=wa;
  result.classList.add('show');
  result.scrollIntoView({behavior:'smooth',block:'center'});
}

next.addEventListener('click',()=>{
  if(!valid()){
    const current=steps[index];
    current.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(0)'}],{duration:240});
    return;
  }
  if(index<steps.length-1){index++;renderStep();}else recommend();
});
back.addEventListener('click',()=>{if(index>0){index--;renderStep();}});
renderStep();
=======
const steps=[...document.querySelectorAll('.q-step')];
const nextBtn=document.querySelector('[data-next]');
const backBtn=document.querySelector('[data-back]');
const progress=document.querySelector('.progress span');
const resultBox=document.querySelector('.quote-result');
const state={property:'',zones:'',areas:[],ptz:'',storage:''};
let current=0;
function updateStep(){steps.forEach((s,i)=>s.classList.toggle('active',i===current));const total=steps.length;progress.style.width=`${((current+1)/total)*100}%`;backBtn.style.visibility=current===0?'hidden':'visible';nextBtn.textContent=current===total-1?'Ver resultado':'Continuar';}
function selectedForStep(stepIndex){const key=['property','zones','areas','ptz','storage'][stepIndex];return key==='areas'?state.areas.length>0:!!state[key];}
document.querySelectorAll('.option').forEach(btn=>{btn.addEventListener('click',()=>{const key=btn.dataset.key;const val=btn.dataset.value;if(key==='areas'){if(state.areas.includes(val)){state.areas=state.areas.filter(v=>v!==val);btn.classList.remove('selected');}else{state.areas.push(val);btn.classList.add('selected');}}else{state[key]=val;btn.closest('.option-grid').querySelectorAll(`.option[data-key="${key}"]`).forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');}})});
function computeResult(){const zones=parseInt(state.zones)||1;const wantsPT=state.ptz==='si'||state.ptz==='no estoy seguro';const wantsNVR=state.storage==='nvr';let name='Essential Domo',price='$4,990 MXN',desc='Una solución sencilla para un punto principal en tu propiedad.',cameras='1 cámara domo 4 MP con microSD 128 GB',storage='Grabación local en microSD';
if(zones===1&&!wantsPT&&!wantsNVR){name='Essential Domo';price='$4,990 MXN';desc='Ideal para entrada, recepción o interior.';cameras='1 cámara domo 4 MP';storage='Grabación local en microSD 128 GB';}
else if(zones===1&&state.areas.includes('fachada')){name='Exterior Protect';price='$5,190 MXN';desc='Pensada para fachada, cochera o exterior principal.';cameras='1 cámara exterior 4 MP';storage='Grabación local en microSD 128 GB';}
else if(zones<=2&&wantsPT){name='Smart Dúo';price='$8,490 MXN';desc='Cobertura fija más una cámara con movimiento para seguimiento y mayor control.';cameras='1 domo + 1 PT';storage=wantsNVR?'Preparado para crecer a NVR central':'Grabación local en microSD por cámara';}
else if(zones<=2){name='Dúo Hogar';price='$8,490 MXN';desc='Una cámara interior y otra exterior para una cobertura residencial práctica.';cameras='1 domo + 1 bala';storage=wantsNVR?'Escalable a NVR central':'Grabación local en microSD por cámara';}
else if(zones===3||zones===4&&wantsPT){name='Fortress 360';price='$11,990 MXN';desc='Cobertura más completa para interior, exterior y seguimiento dinámico.';cameras='1 domo + 1 PT + 1 bala';storage=wantsNVR?'Preparado para NVR central':'Grabación local en microSD por cámara';}
else if(zones>=4&&!wantsNVR){name='Casa / Negocio 4';price='$15,490 MXN';desc='Recomendación para viviendas amplias o pequeños negocios con varios puntos a vigilar.';cameras='4 cámaras (2 domos + 2 balas)';storage='Grabación local en microSD por cámara';}
else {name='Negocio Pro 4';price='$25,990 MXN';desc='Solución con grabación centralizada para un pequeño negocio o proyecto más robusto.';cameras='4 cámaras + NVR + HDD';storage='Grabación centralizada con NVR';}
const addon='El precio es estimado y puede variar según canalización, cableado, cajas, alturas, obra civil y adecuaciones eléctricas.';
document.querySelector('[data-result-name]').textContent=name;document.querySelector('[data-result-desc]').textContent=desc;document.querySelector('[data-result-price]').textContent=price;document.querySelector('[data-result-cameras]').textContent=cameras;document.querySelector('[data-result-storage]').textContent=storage;document.querySelector('[data-result-addon]').textContent=addon;const msg=`Hola Fortress. Realicé el cotizador de su página.%0APropiedad: ${state.property}%0AZonas: ${state.zones}%0AÁreas: ${state.areas.join(', ')||'No especificadas'}%0ACámara con movimiento: ${state.ptz}%0AAlmacenamiento: ${state.storage}%0ARecomendación: ${name} (${price}).%0AQuiero solicitar más información o una visita.`;document.querySelector('[data-whatsapp-result]').href=`https://wa.me/529983377518?text=${msg}`;resultBox.classList.add('show');resultBox.scrollIntoView({behavior:'smooth',block:'start'});
}
nextBtn?.addEventListener('click',()=>{if(current<steps.length-1){if(!selectedForStep(current)){return;}current++;updateStep();}else{if(!selectedForStep(current)){return;}computeResult();}});backBtn?.addEventListener('click',()=>{if(current>0){current--;updateStep();}});updateStep();
>>>>>>> f0b6291 (Actualización de logos)
