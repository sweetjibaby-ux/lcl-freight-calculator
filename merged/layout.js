(function(){
let step=0;
const panels=[...document.querySelectorAll('[data-panel]')],buttons=[...document.querySelectorAll('[data-step]')];
function syncAges(){const target=document.getElementById('ageMirrors');if(!target)return;target.replaceChildren();document.querySelectorAll('.package-card').forEach((row,i)=>{const source=row.querySelector('[data-pack="days"]'),label=document.createElement('label'),input=document.createElement('input');label.textContent='包装 '+(i+1)+' · 仓龄（天）';input.type='number';input.min='0';input.step='1';input.value=source.value;input.dataset.ageMirror=i;input.addEventListener('input',()=>{source.value=input.value;mergeCalculate()});label.append(input);target.append(label)})}
function showStep(value){step=Math.max(0,Math.min(2,value));panels.forEach((p,i)=>p.hidden=i!==step);buttons.forEach((b,i)=>b.setAttribute('aria-selected',String(i===step)));document.getElementById('previousStep').hidden=step===0;document.getElementById('nextStep').hidden=step===2;document.getElementById('stepHint').textContent=['下一步：计算头程费用','下一步：确认仓储与出库','已完成填写，可在右侧查看合计并导出'][step];document.getElementById('nextStep').textContent=step===0?'头程费用 →':'仓储出库 →';if(step===2)syncAges();}
buttons.forEach(b=>b.onclick=()=>showStep(Number(b.dataset.step)));
document.getElementById('nextStep').onclick=()=>showStep(step+1);document.getElementById('previousStep').onclick=()=>showStep(step-1);
const demo=document.getElementById('loadExample').onclick;document.getElementById('loadExample').onclick=()=>{demo();showStep(0)};
const reset=document.getElementById('resetCombined').onclick;document.getElementById('resetCombined').onclick=()=>{reset();showStep(0)};
showStep(0);
})();
