(function(root){
'use strict';
const rates=[
['Bin - Single Pick',.02,.26,12.57,.15,null,null,null,null,0,Infinity],
['Bin - Small',.02,.45,12.35,.17,19,12,6,null,0,25],
['Bin - Large',.09,.91,15.10,.17,26,17,14,null,0,25],
['Bin - Heavy',.12,1.81,15.42,.17,26,17,14,null,25,50],
['Standard - Small',.33,3.15,17.05,.20,48,30,30,105,0,50],
['Standard - Medium',.54,3.88,23.78,.24,96,null,null,130,0,110],
['Standard - Large',.77,4.49,49.83,.31,108,null,null,165,0,120],
['Standard - Oversize',.57,4.80,52.43,.34,108,null,null,165,0,150],
['Large - Standard',2.55,8.08,null,null,null,null,null,null,0,250],
['Large - Heavy',4.96,12,null,null,144,null,null,null,250,800],
['Rugs - Small Rug',.04,1.47,16.91,.22,24,null,null,null,0,25],
['Rugs - Medium Rug',.17,3,36.13,.24,96,null,null,null,0,150],
['Rugs - Large Rug',.37,4.20,51.10,.30,108,null,null,null,0,150]
].map(([key,unload,fulfill,base,lb,L,M,S,girth,min,max])=>({key,unload,fulfill,base,lb,L,M,S,girth,min,max}));
const bands=[[1,90,0,0],[91,120,.44,.35],[121,180,.70,.56],[181,270,1.05,.84],[271,365,1.40,1.12],[366,Infinity,4.20,3.36]];
function dims(b){let [L,M,S]=[b.l,b.w,b.h].map(Number).sort((a,b)=>b-a).map(x=>x/2.54);return {L,M,S,girth:L+2*(M+S),lbs:Number(b.kg)/.45359237,volume:L*M*S,cbm:b.l*b.w*b.h/1e6,cuft:b.l*b.w*b.h/28316.846592};}
function fits(r,d){return (d.lbs>r.min || r.min===0)&&d.lbs<=r.max+1e-9&&(!r.L||d.L<=r.L+1e-9)&&(!r.M||d.M<=r.M+1e-9)&&(!r.S||d.S<=r.S+1e-9)&&(!r.girth||d.girth<=r.girth+1e-9);}
function classify(b){const d=dims(b);let r;
if(b.category&&b.category!=='auto') {r=rates.find(r=>r.key===b.category);if(!r||!fits(r,d))throw Error('手选类别不符合已知尺寸或重量上限');}
else if(b.kind==='single') {r=rates[0];if(!fits(r,d))throw Error('Single Pick 重量超出表内范围，请确认分类');}
else if(b.kind==='rug')r=rates.find(r=>r.key.startsWith('Rugs')&&fits(r,d));
else {r=rates.find(r=>!r.key.includes('Single')&&!r.key.startsWith('Large')&&!r.key.startsWith('Rugs')&&(r.key!=='Standard - Oversize'||b.nonconveyable)&&fits(r,d)&&!(r.key==='Standard - Small'&&d.volume>10368)&&!(r.key==='Standard - Medium'&&d.volume>17280));}
if(!r)throw Error('超出自动分类范围，请确认 Large 类别或取得报价');
if(r.key==='Standard - Oversize'&&!b.nonconveyable)throw Error('Oversize 需要确认包装不适合传送带');
if((r.key==='Standard - Small'&&d.volume>10368)||(r.key==='Standard - Medium'&&d.volume>17280))throw Error('体积超过该类别上限，请选择更高类别');
return {r,d};}
function storage(cuft,days,key,multi){const large=key.startsWith('Large -');let segments=[],total=0;
for(const [a,b,s,l] of bands){let n=Math.max(0,Math.min(days,b)-a+1);let rate=large?l:s;if(multi&&a===1)rate=large?.35:.44;if(key==='Bin - Single Pick')rate=Math.min(rate,.44);if(n){let cost=cuft*n*rate/30;segments.push({from:a,to:Math.min(days,b),days:n,rate,cost});total+=cost;}}
return {total,segments};}
function calculateBox(b,c){for(const k of ['l','w','h','kg'])if(!Number.isFinite(+b[k])||+b[k]<=0)throw Error('尺寸和毛重必须大于0');if(!Number.isInteger(+b.n)||b.n<1)throw Error('每套箱数必须为正整数');if(!Number.isInteger(+b.days)||b.days<0)throw Error('仓龄必须为非负整数');let {r,d}=classify(b);let storageKey=b.storage&&b.storage!=='auto'?b.storage:r.key;if(!rates.some(r=>r.key===storageKey))throw Error('仓储类别无效');const st=storage(d.cuft,+b.days,storageKey,c.multiOnly);let base=r.base,lb=r.lb;
if(r.key==='Bin - Single Pick'){let i=Math.min(5,c.singleCount||1)-1;base=[12.57,7.70,6.07,5.61,4.98][i];lb=[.15,.15,.15,.17,.17][i];}
let weight=c.ceil?Math.ceil(d.lbs):d.lbs;let outbound=c.channel==='wayfair'?r.fulfill:(base==null?null:base+lb*Math.max(0,weight-1));if(c.channel==='multi'&&outbound===null)throw Error('Large类多渠道价卡未提供，不能套用Standard价格');
let vanity=c.vanity&&r.key==='Large - Standard'&&d.L>=48?.30:0;
return {name:b.name,n:+b.n,r,d,storageKey,storage:st,outbound:outbound+vanity,unload:r.unload,weight,manual:b.category!=='auto',base,lb};}
const api={rates,bands,dims,fits,classify,storage,calculateBox};root.CG=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
