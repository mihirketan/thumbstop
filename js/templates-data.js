import {scene,layer,project} from './state.js';
export const templates=[
 {id:'pulse-launch',name:'Pulse Launch',style:'Futuristic',industry:'Technology',duration:12,engine:'pulse',tags:['product','launch','reel'],dna:['Pattern interrupt','Product reveal','Benefit','CTA']},
 {id:'flip-finance',name:'Flip Finance',style:'Corporate',industry:'Finance',duration:15,engine:'flip',tags:['fintech','explainer','reel'],dna:['Hook','Problem','Proof','CTA']},
 {id:'burst-sale',name:'Burst Sale',style:'Neon',industry:'Ecommerce',duration:10,engine:'burst',tags:['sale','offer','story'],dna:['Offer','Urgency','CTA']},
 {id:'kinetic-story',name:'Kinetic Story',style:'Editorial',industry:'Creator',duration:14,engine:'kinetic',tags:['type','hook','short'],dna:['Hot take','Insight','Follow CTA']},
 {id:'spotlight-luxe',name:'Spotlight Luxe',style:'Luxury',industry:'Fashion',duration:15,engine:'spotlight',tags:['premium','product','ad'],dna:['Reveal','Desire','Proof','CTA']}
];
export function templateProject(t){let dur=t.duration/3;return project({name:t.name,metadata:{templateId:t.id,dna:t.dna,objective:'Template remix'},scenes:t.dna.slice(0,4).map((n,i)=>scene({name:n,duration:dur,background:['#171126','#102235','#301629','#19151f'][i],layers:[layer('text',{text:i===0?'Stop the scroll.':n,x:9,y:32,w:82,h:22,fontSize:10,animation:t.engine,end:dur}),layer('text',{text:i===3?'Start creating →':'Your story, made editable.',x:17,y:68,w:66,h:10,fontSize:4,color:'#ffc857',animation:'pulse',end:dur})]}))})}
