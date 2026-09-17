// Canvas render engines retained as named, reusable template engines.
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const wrap=(ctx,text,max)=>{let words=(text||'').split(/\s+/),lines=[],line='';words.forEach(w=>{let t=(line+' '+w).trim();if(ctx.measureText(t).width>max&&line){lines.push(line);line=w}else line=t});return [...lines,line]};
function text(ctx,l,t,w,h){ctx.save();ctx.globalAlpha=l.opacity??1;ctx.translate((l.x+l.w/2)*w/100,(l.y+l.h/2)*h/100);ctx.rotate((l.rotation||0)*Math.PI/180);ctx.fillStyle=l.color||'#fff';ctx.font=`800 ${Math.max(13,l.fontSize*h/100)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';let lines=wrap(ctx,l.text,l.w*w/100);lines.forEach((line,i)=>ctx.fillText(line,0,(i-(lines.length-1)/2)*(l.fontSize*h/100*1.1)));ctx.restore()}
export const engines={
 pulse:(ctx,l,t,w,h)=>{let s=1+.05*Math.sin(t*5);ctx.save();ctx.translate(w/2,h/2);ctx.scale(s,s);ctx.translate(-w/2,-h/2);text(ctx,l,t,w,h);ctx.restore()},
 flip:(ctx,l,t,w,h)=>{let s=Math.abs(Math.cos(t*2.6));ctx.save();ctx.translate(w/2,h/2);ctx.scale(Math.max(.05,s),1);ctx.translate(-w/2,-h/2);text(ctx,l,t,w,h);ctx.restore()},
 burst:(ctx,l,t,w,h)=>{ctx.save();ctx.globalAlpha=clamp(t*2,0,1);text(ctx,{...l,x:l.x+(1-clamp(t*2,0,1))*8},t,w,h);ctx.restore()},
 kinetic:(ctx,l,t,w,h)=>{let chars=[...l.text];let x=(l.x+l.w/2)*w/100;ctx.save();ctx.fillStyle=l.color||'#fff';ctx.font=`800 ${Math.max(13,l.fontSize*h/100)}px system-ui`;ctx.textAlign='center';let total=ctx.measureText(l.text).width;let pos=x-total/2;chars.forEach((c,i)=>{let yy=(l.y+l.h/2)*h/100+(1-clamp(t*5-i*.11,0,1))*h*.1;ctx.fillText(c,pos+ctx.measureText(c).width/2,yy);pos+=ctx.measureText(c).width});ctx.restore()},
 spotlight:(ctx,l,t,w,h)=>{ctx.save();let g=ctx.createRadialGradient(w*(.2+.6*((t*.2)%1)),h*.4,0,w*.5,h*.5,w*.7);g.addColorStop(0,'rgba(255,200,87,.4)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);ctx.restore();text(ctx,l,t,w,h)}
};
export function render(ctx,sc,t=0){let {width:w,height:h}=ctx.canvas;ctx.clearRect(0,0,w,h);ctx.fillStyle=sc.background||'#151120';ctx.fillRect(0,0,w,h);sc.layers.filter(l=>l.visible&&t>=l.start&&t<=l.end).sort((a,b)=>a.z-b.z).forEach(l=>{if(l.type==='shape'){ctx.fillStyle=l.color;ctx.fillRect(l.x*w/100,l.y*h/100,l.w*w/100,l.h*h/100)}else (engines[l.animation]||text)(ctx,l,t-l.start,w,h)})}
