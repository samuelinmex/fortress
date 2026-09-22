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
