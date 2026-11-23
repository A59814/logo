'use strict';
/* ============ 1. CONSTANTS ============ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const EASE='cubic-bezier(0.16,1,0.3,1)';
const COL=[['#C58BFF','#7B3FE4','#4A1FA8'],['#FF9CC8','#F2549B','#B0256E'],['#8FE8FF','#2CB8E8','#1670A8'],['#9CF5B6','#35C76A','#16833F'],['#FFC48A','#FF8A33','#C25A12'],['#FFE9A8','#FFC64D','#E09B1B']];
const SYM=['●','▲','■','◆','★','♥'];
const ln=(n,v)=>Array.from({length:n},(_,i)=>v?[i,0]:[0,i]);
const SH=[[[[0,0]],2],[ln(2),3],[ln(3),3],[ln(4),2],[ln(5),1],[ln(2,1),3],[ln(3,1),3],[ln(4,1),2],[ln(5,1),1],
 [[[0,0],[0,1],[1,0],[1,1]],3],[[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],1],
 [[[0,0],[1,0],[2,0],[2,1]],2],[[[0,1],[1,1],[2,1],[2,0]],2],[[[0,0],[0,1],[0,2],[1,1]],2],
 [[[0,1],[0,2],[1,0],[1,1]],2],[[[0,0],[0,1],[1,1],[1,2]],2],
 [[[0,0],[1,0],[1,1]],2],[[[0,0],[0,1],[1,0]],2],[[[0,1],[1,0],[1,1]],2],[[[0,0],[0,1],[1,1]],2]];
const SW=SH.reduce((a,b)=>a+b[1],0);
const LG=[['ar','العربية'],['en','English'],['es','Español'],['pt','Português'],['fr','Français'],['id','Bahasa Indonesia']];

/* ============ 2. i18n (index order is shared by every language) ============ */
const TX={
en:"Challenge|Endless|Daily|Zen|Settings|A luxurious block puzzle.|Chapter|Back|Score|Best|Game Over|Play Again|Menu|Language|Reduce motion|High contrast|Colorblind mode|Font size|Small/Medium/Large|Sound|Music|Show points|Contact|Made with ❤️|Goal reached!|Finish|Level complete!|Next|Retry|One more chance?|Tap to revive|PERFECT!|COMBO|CANDY RAIN|Reach {n} points|Clear {n} lines|Clear {n} lines in {m} moves|Reach combo ×{n}|Make {n} moves|Attempts|days|Moves|No attempts left today|Daily complete!|Level|Vibration|Great!/Awesome!/Amazing!/Unreal!",
ar:"التحدي|لا نهائي|اليومي|زن|الإعدادات|لغز المكعبات الفاخر.|الفصل|رجوع|النقاط|الأفضل|انتهت اللعبة|العب مجدداً|القائمة|اللغة|تقليل الحركة|تباين عالٍ|وضع عمى الألوان|حجم الخط|صغير/متوسط/كبير|الصوت|الموسيقى|إظهار النقاط|تواصل معنا|صُنعت بـ ❤️|تم بلوغ الهدف!|إنهاء|اكتمل المستوى!|التالي|إعادة|فرصة أخرى؟|اضغط للإحياء|مثالي!|كومبو|مطر الحلوى|اجمع {n} نقطة|امسح {n} خطوط|امسح {n} خطوط في {m} حركة|حقق كومبو ×{n}|نفّذ {n} حركة|المحاولات|أيام|الحركات|لا محاولات اليوم|اكتمل التحدي اليومي!|المستوى|الاهتزاز|رائع!/مذهل!/خرافي!/أسطوري!",
es:"Desafío|Infinito|Diario|Zen|Ajustes|Un lujoso puzzle de bloques.|Capítulo|Atrás|Puntos|Mejor|Fin del juego|Jugar de nuevo|Menú|Idioma|Reducir movimiento|Alto contraste|Modo daltónico|Tamaño de fuente|Pequeño/Mediano/Grande|Sonido|Música|Mostrar puntos|Contacto|Hecho con ❤️|¡Objetivo logrado!|Terminar|¡Nivel completado!|Siguiente|Reintentar|¿Una oportunidad más?|Toca para revivir|¡PERFECTO!|COMBO|LLUVIA DE DULCES|Logra {n} puntos|Limpia {n} líneas|Limpia {n} líneas en {m} movimientos|Logra combo ×{n}|Haz {n} movimientos|Intentos|días|Movimientos|Sin intentos hoy|¡Reto diario completado!|Nivel|Vibración|¡Genial!/¡Increíble!/¡Asombroso!/¡Imparable!",
pt:"Desafio|Infinito|Diário|Zen|Configurações|Um luxuoso quebra-cabeça de blocos.|Capítulo|Voltar|Pontos|Melhor|Fim de jogo|Jogar de novo|Menu|Idioma|Reduzir movimento|Alto contraste|Modo daltônico|Tamanho da fonte|Pequeno/Médio/Grande|Som|Música|Mostrar pontos|Contato|Feito com ❤️|Meta alcançada!|Finalizar|Nível concluído!|Próximo|Tentar de novo|Mais uma chance?|Toque para reviver|PERFEITO!|COMBO|CHUVA DE DOCES|Alcance {n} pontos|Limpe {n} linhas|Limpe {n} linhas em {m} jogadas|Alcance combo ×{n}|Faça {n} jogadas|Tentativas|dias|Jogadas|Sem tentativas hoje|Desafio diário concluído!|Nível|Vibração|Ótimo!/Incrível!/Demais!/Imparável!",
fr:"Défi|Infini|Quotidien|Zen|Paramètres|Un luxueux puzzle de blocs.|Chapitre|Retour|Score|Record|Partie terminée|Rejouer|Menu|Langue|Réduire les animations|Contraste élevé|Mode daltonien|Taille du texte|Petit/Moyen/Grand|Son|Musique|Afficher les points|Contact|Fait avec ❤️|Objectif atteint !|Terminer|Niveau terminé !|Suivant|Réessayer|Une chance de plus ?|Touchez pour revivre|PARFAIT !|COMBO|PLUIE DE BONBONS|Atteignez {n} points|Éliminez {n} lignes|Éliminez {n} lignes en {m} coups|Atteignez un combo ×{n}|Jouez {n} coups|Essais|jours|Coups|Plus d'essais aujourd'hui|Défi quotidien terminé !|Niveau|Vibration|Super !/Génial !/Incroyable !/Imbattable !",
id:"Tantangan|Tanpa Batas|Harian|Zen|Pengaturan|Teka-teki blok yang mewah.|Bab|Kembali|Skor|Terbaik|Permainan Berakhir|Main Lagi|Menu|Bahasa|Kurangi gerakan|Kontras tinggi|Mode buta warna|Ukuran font|Kecil/Sedang/Besar|Suara|Musik|Tampilkan poin|Kontak|Dibuat dengan ❤️|Target tercapai!|Selesai|Level selesai!|Berikutnya|Ulangi|Satu kesempatan lagi?|Ketuk untuk hidup lagi|SEMPURNA!|KOMBO|HUJAN PERMEN|Capai {n} poin|Hapus {n} baris|Hapus {n} baris dalam {m} langkah|Capai kombo ×{n}|Lakukan {n} langkah|Percobaan|hari|Langkah|Tidak ada percobaan hari ini|Tantangan harian selesai!|Level|Getar|Hebat!/Keren!/Luar biasa!/Tak terkalahkan!"};
const TT={};for(const k in TX)TT[k]=TX[k].split('|');

/* ============ 3. STATE ============ */
let S={lang:'en',set:{rm:0,hc:0,cb:0,fs:1,snd:1,mus:1,hap:1,pts:0},stars:{},best:{},streak:0,lastDaily:'',daily:{d:'',att:3},mode:'',c:1,l:1};
let G={grid:[],tray:[],pop:{},texts:[],waves:[],clr:null,drag:null,shake:null,over:0,score:0,moves:0,lines:0,streak:0,goalMet:0,R:Math.random,goal:null};
let scr='intro',prevScr='menu',AC,MS=1,revived=0,ovOn=0,DT=1,last=0,W=0,H=0,cs=40,bx=0,by=0,trayTop=0,trayH=0,dpr=1,ctx;
const t=(i,o)=>{let s=TT[S.lang][i];if(o)for(const k in o)s=s.replace('{'+k+'}',o[k]);return s};
const mul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let x=Math.imul(a^a>>>15,1|a);x=x+Math.imul(x^x>>>7,61|x)^x;return((x^x>>>14)>>>0)/4294967296};
const hash=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const dstr=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dstr(new Date()),yest=()=>dstr(new Date(Date.now()-864e5));

/* ============ 4. SAVE / LOAD ============ */
const starsIn=c=>{let n=0;for(let l=1;l<=35;l++)n+=S.stars[c+'-'+l]||0;return n};
const doneIn=c=>{let n=0;for(let l=1;l<=35;l++)if(S.stars[c+'-'+l])n++;return n};
const chOpen=k=>k===1||(k<=10&&doneIn(k-1)>=20);
const openCount=()=>{let n=1;while(n<10&&chOpen(n+1))n++;return n};
const totalStars=()=>{let n=0;for(let c=1;c<=10;c++)n+=starsIn(c);return n};
const streakNow=()=>(S.lastDaily===today()||S.lastDaily===yest())?S.streak:0;
function load(){try{const a=JSON.parse(localStorage.getItem('blockOzak_save')||'{}'),b=JSON.parse(localStorage.getItem('blockOzak_settings')||'{}');
 Object.assign(S.set,a.settings||{});const{lang,...rest}=b;Object.assign(S.set,rest);
 S.stars=a.stars||{};S.best=a.bestScores||{};S.streak=a.streak||0;S.lastDaily=a.lastDaily||'';S.daily=a.daily||S.daily;
 const nl=(navigator.language||'en').slice(0,2);S.lang=lang||a.lang||(TT[nl]?nl:'en')}catch(e){const nl=(navigator.language||'en').slice(0,2);S.lang=TT[nl]?nl:'en'}
 if(!TT[S.lang])S.lang='en'}
function save(){try{const st={...S.set};localStorage.setItem('blockOzak_settings',JSON.stringify({lang:S.lang,...st}));
 localStorage.setItem('blockOzak_save',JSON.stringify({chapters:openCount(),stars:S.stars,bestScores:S.best,streak:S.streak,lastDaily:S.lastDaily,daily:S.daily,settings:st,lang:S.lang}))}catch(e){}}

/* ============ 5. SOUND ENGINE (Web Audio, no files) ============ */
const au=()=>{if(!AC)try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}if(AC&&AC.state==='suspended')AC.resume();return AC};
function tone(f0,f1,d,ty='sine',v=.18,w=0,kind){if(!(kind==='m'?S.set.mus:S.set.snd))return;const a=au();if(!a)return;const o=a.createOscillator(),g=a.createGain(),T=a.currentTime+w;
 o.type=ty;o.frequency.setValueAtTime(f0,T);o.frequency.exponentialRampToValueAtTime(f1,T+d);g.gain.setValueAtTime(.0001,T);g.gain.linearRampToValueAtTime(v,T+.008);g.gain.exponentialRampToValueAtTime(.0001,T+d);
 o.connect(g);g.connect(a.destination);o.start(T);o.stop(T+d+.03)}
const buzz=ms=>{if(S.set.hap&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}};
const sfx={place:()=>tone(440,550,.08,'sine',.2),click:()=>tone(600,600,.04,'square',.06),
 clear:L=>{const k=1+Math.min(G.streak,8)*.06;tone(660*k,880*k,.15,'triangle',.2);if(L>1)tone([0,0,880,1100,1320][Math.min(L,4)],[0,0,880,1100,1320][Math.min(L,4)],.2,'triangle',.18,.08)},
 perfect:()=>[523,659,784,1046].forEach((f,i)=>tone(f,f,.12,'triangle',.22,i*.1)),
 chime:()=>[523,784,1046].forEach((f,i)=>tone(f,f,.22,'sine',.2,i*.2))};
let mus;function music(){clearInterval(mus);mus=setInterval(()=>{if(!AC||AC.state!=='running'||document.hidden)return;const z=S.mode==='zen'&&scr==='game',f=[261.6,293.7,329.6,392,440,523.3][Math.random()*6|0]*(z?.5:1)*MS;tone(f,f,z?2.6:1.7,'sine',.04,0,'m')},1200)}

/* ============ 6. PARTICLES (pool of 80) ============ */
const PP=Array.from({length:80},()=>({a:0}));
function spawn(x,y,c,n,o={}){if(S.set.rm)return;let k=0;for(const p of PP){if(p.a)continue;if(k++>=n)break;const an=Math.random()*6.283,sp=(o.sp||2.4)*(.4+Math.random());Object.assign(p,{a:1,x,y,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp-(o.up||0),l:0,m:o.m||50,c,s:o.s||2+Math.random()*3,sq:0,st:Math.random()<.5,r:Math.random()*6.28,vr:(Math.random()-.5)*.35,g:o.g??.12})}}
function rain(n){if(S.set.rm)return;let k=0;for(const p of PP){if(p.a)continue;if(k++>=n)break;Object.assign(p,{a:1,x:Math.random()*W,y:-12,vx:(Math.random()-.5)*.8,vy:2+Math.random()*2.5,l:0,m:130,c:COL[Math.random()*6|0][0],s:6+Math.random()*5,sq:1,st:0,r:0,vr:0,g:.04})}}
function updP(){for(const p of PP){if(!p.a)continue;p.vy+=p.g*DT;p.x+=p.vx*DT;p.y+=p.vy*DT;p.r+=p.vr*DT;p.l+=DT;if(p.l>p.m)p.a=0}}

/* ============ 7. RENDERING ============ */
const gc=$('#gc'),cw=$('#cw');ctx=gc.getContext('2d');
function rr(x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else{ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}}
function cell(x,y,s,ci,o={}){const[a,b,c]=COL[ci],g=s*.06,hc=S.set.hc;ctx.save();ctx.globalAlpha=o.al??1;ctx.translate(x+s/2,y+s/2);if(o.rot)ctx.rotate(o.rot);ctx.scale(o.sx||1,o.sy||1);ctx.translate(-s/2,-s/2);
 if(!hc){ctx.shadowColor=o.glow?'#FFE9A8':'rgba(0,0,0,.45)';ctx.shadowBlur=o.glow?s*.7:s*.16;ctx.shadowOffsetY=o.glow?0:s*.06}
 const gr=ctx.createLinearGradient(0,0,s,s);gr.addColorStop(0,a);gr.addColorStop(.5,b);gr.addColorStop(1,c);ctx.fillStyle=gr;rr(g,g,s-2*g,s-2*g,s*.24);ctx.fill();ctx.shadowColor='transparent';
 ctx.strokeStyle=hc?'#fff':'rgba(255,255,255,.3)';ctx.lineWidth=hc?2:1;ctx.stroke();
 if(S.mode==='zen'){ctx.fillStyle='rgba(255,255,255,.2)';rr(g,g,s-2*g,s-2*g,s*.24);ctx.fill()}
 if(o.glow){ctx.fillStyle='rgba(255,255,255,.35)';rr(g,g,s-2*g,s-2*g,s*.24);ctx.fill()}
 const hg=ctx.createLinearGradient(0,0,0,s*.45);hg.addColorStop(0,'rgba(255,255,255,.7)');hg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=hg;rr(s*.16,s*.1,s*.68,s*.27,s*.14);ctx.fill();
 if(S.set.cb){ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`700 ${s*.42}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(SYM[ci],s/2,s*.6)}
 ctx.restore()}
const dims=sh=>[Math.max(...sh.map(a=>a[1]))+1,Math.max(...sh.map(a=>a[0]))+1];
function drawPiece(sh,ci,x,y,s,al){for(const[a,b]of sh)cell(x+b*s,y+a*s,s,ci,{al})}
const jelly=e=>e>=1?1:e<.4?1-.1*(e/.4):e<.75?.9+.15*((e-.4)/.35):1.05-.05*((e-.75)/.25);
function layout(){dpr=Math.min(devicePixelRatio||1,2);W=cw.clientWidth;H=cw.clientHeight;gc.width=W*dpr;gc.height=H*dpr;gc.style.width=W+'px';gc.style.height=H+'px';
 cs=Math.max(20,Math.floor(Math.min((W-28)/8,(H-20)*.62/8)));bx=(W-8*cs)/2;by=Math.max(12,(H-8*cs-cs*3.6)/3);trayTop=by+8*cs+cs*.6;trayH=Math.max(60,H-trayTop-6)}
const tcsz=()=>Math.min(cs*.66,(W/3-16)/5.2,trayH/5.2);
function preview(d){const p=G.tray[d.i],[w,h]=dims(p.sh),gr=Math.round((d.y-d.off-h*cs/2-by)/cs),gcc=Math.round((d.x-w*cs/2-bx)/cs);return{gr,gc:gcc,ok:fits(p.sh,gr,gcc),p}}
function draw(now){
 updP();ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 if(G.shake&&!S.set.rm){const e=now-G.shake.t0;if(e<280){const k=(1-e/280)*G.shake.a;ctx.translate((Math.random()-.5)*2*k,(Math.random()-.5)*2*k)}}
 ctx.fillStyle='rgba(255,255,255,.06)';ctx.strokeStyle='rgba(255,198,77,.35)';ctx.lineWidth=1.5;rr(bx-10,by-10,8*cs+20,8*cs+20,22);ctx.fill();ctx.stroke();
 ctx.fillStyle='rgba(0,0,0,.24)';for(let r=0;r<8;r++)for(let c=0;c<8;c++){rr(bx+c*cs+2,by+r*cs+2,cs-4,cs-4,cs*.2);ctx.fill()}
 const d=G.drag;let pv=null;if(d&&!d.ret)pv=preview(d);
 if(pv&&pv.ok){const tmp=G.grid.map(r=>r.slice());pv.p.sh.forEach(([a,b])=>tmp[pv.gr+a][pv.gc+b]=pv.p.ci);const f=fullLines(tmp);ctx.fillStyle='rgba(255,233,168,.24)';
  f.rows.forEach(r=>{rr(bx,by+r*cs,8*cs,cs,cs*.2);ctx.fill()});f.cols.forEach(c=>{rr(bx+c*cs,by,cs,8*cs,cs*.2);ctx.fill()})}
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const v=G.grid[r][c];if(v<0)continue;const k=r*8+c,o={};
  if(G.clr&&G.clr.set.has(k)){const e=now-G.clr.t0;o.glow=1;if(e>120&&!S.set.rm)o.rot=Math.sin((e-120)*.06)*.09;if(G.clr.zen)o.al=Math.max(0,1-e/260)}
  const pt=G.pop[k];if(pt){const e=(now-pt)/150;if(e>=1)delete G.pop[k];else{const sy=jelly(Math.max(0,e));o.sy=sy;o.sx=2-sy}}
  cell(bx+c*cs,by+r*cs,cs,v,o)}
 if(pv){const{p,gr,gc:gx,ok}=pv;for(const[a,b]of p.sh){const y=gr+a,x=gx+b;if(y<0||y>7||x<0||x>7)continue;
   if(ok){cell(bx+x*cs,by+y*cs,cs,p.ci,{al:.5});ctx.strokeStyle='rgba(90,255,140,.9)';ctx.lineWidth=2;rr(bx+x*cs+3,by+y*cs+3,cs-6,cs-6,cs*.2);ctx.stroke()}
   else{ctx.strokeStyle='rgba(255,90,110,.6)';ctx.lineWidth=2;rr(bx+x*cs+3,by+y*cs+3,cs-6,cs-6,cs*.2);ctx.stroke()}}}
 const ts=tcsz();G.tray.forEach((p,i)=>{if(p.used)return;const[w,h]=dims(p.sh),cx=(i+.5)*W/3,ee=Math.min(1,Math.max(0,(now-(G.dealT||0)-i*90)/480)),eo=1-Math.pow(1-ee,3),cy=trayTop+trayH/2+(1-eo)*cs*2.6+(S.set.rm?0:Math.sin(now/650+i*2)*1.6);
  if(d&&d.i===i){ctx.fillStyle='rgba(255,255,255,.05)';rr(cx-w*ts/2,cy-h*ts/2,w*ts,h*ts,ts*.3);ctx.fill();return}
  drawPiece(p.sh,p.ci,cx-w*ts/2,cy-h*ts/2,ts,(canFit(p.sh)?1:.4)*eo)});
 for(const w of G.waves){const e=(now-w.t0)/480;if(e>=1||S.set.rm)continue;ctx.strokeStyle=`rgba(255,198,77,${1-e})`;ctx.lineWidth=3;ctx.beginPath();ctx.arc(w.x,w.y,cs*.5+e*cs*5,0,6.283);ctx.stroke()}
 for(const p of PP){if(!p.a)continue;const k=Math.max(0,1-p.l/p.m);ctx.globalAlpha=k;ctx.fillStyle=p.c;if(p.sq)ctx.fillRect(p.x,p.y,p.s,p.s);else if(p.st){const s=p.s*1.7*(.4+k*.6);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.beginPath();ctx.moveTo(0,-s);ctx.quadraticCurveTo(0,0,s,0);ctx.quadraticCurveTo(0,0,0,s);ctx.quadraticCurveTo(0,0,-s,0);ctx.quadraticCurveTo(0,0,0,-s);ctx.fill();ctx.restore()}else{ctx.beginPath();ctx.arc(p.x,p.y,p.s*(.4+k*.6),0,6.283);ctx.fill()}}ctx.globalAlpha=1;
 if(d){const p=G.tray[d.i],[w,h]=dims(p.sh),tx=d.x,ty=d.y-d.off;
  if(d.ret){const ccx=(d.i+.5)*W/3,ccy=trayTop+trayH/2;d.cx+=(ccx-d.cx)*Math.min(1,.3*DT);d.cy+=(ccy-d.cy)*Math.min(1,.3*DT);d.k=Math.max(0,d.k-.1*DT);if(d.k<=0&&Math.hypot(ccx-d.cx,ccy-d.cy)<4)G.drag=null}
  else{d.cx+=(tx-d.cx)*Math.min(1,.4*DT);d.cy+=(ty-d.cy)*Math.min(1,.4*DT);d.k=Math.min(1,d.k+.12*DT)}
  if(G.drag){const e=1-Math.pow(1-d.k,3),sz=ts+(cs*1.08-ts)*e;ctx.save();ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=18;drawPiece(p.sh,p.ci,d.cx-w*sz/2,d.cy-h*sz/2,sz,1);ctx.restore()}}
 for(let i=G.texts.length-1;i>=0;i--){const x=G.texts[i],e=(now-x.t0)/950;if(e>=1){G.texts.splice(i,1);continue}ctx.globalAlpha=1-e*e;ctx.font=`800 ${cs*.78}px "Baloo 2",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.lineWidth=5;ctx.strokeStyle='rgba(59,30,110,.85)';ctx.strokeText(x.s,x.x,x.y-e*cs*1.3);ctx.fillStyle='#FFE9A8';ctx.fillText(x.s,x.x,x.y-e*cs*1.3)}ctx.globalAlpha=1}

/* ============ 8. PIECES & BOARD LOGIC ============ */
const fits=(sh,r,c)=>sh.every(([a,b])=>{const y=r+a,x=c+b;return y>=0&&y<8&&x>=0&&x<8&&G.grid[y][x]<0});
const canFit=sh=>{for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(fits(sh,r,c))return true;return false};
function fullLines(g){const rows=[],cols=[];for(let r=0;r<8;r++)if(g[r].every(v=>v>=0))rows.push(r);for(let c=0;c<8;c++)if(g.every(row=>row[c]>=0))cols.push(c);return{rows,cols}}
function pick(){let x=G.R()*SW;for(const[sh,w]of SH){x-=w;if(x<=0)return sh}return SH[0][0]}
function deal(){G.dealT=performance.now();for(let i=0;i<40;i++){const tr=[0,1,2].map(()=>({sh:pick(),ci:G.R()*6|0,used:0}));if(tr.some(p=>canFit(p.sh))||i===39){if(i===39)tr[0].sh=[[0,0]];G.tray=tr;return}}}

/* ============ 9. INPUT (pointer = mouse + touch) ============ */
const pt=e=>{const r=gc.getBoundingClientRect(),k=W/(r.width||1);return{x:(e.clientX-r.left)*k,y:(e.clientY-r.top)*k}};
gc.addEventListener('pointerdown',e=>{if(scr!=='game'||G.clr||G.over||ovOn||G.drag)return;const p=pt(e),i=Math.floor(p.x/(W/3));if(p.y<trayTop-cs*.5||i<0||i>2)return;const pc=G.tray[i];if(!pc||pc.used)return;
 au();try{gc.setPointerCapture(e.pointerId)}catch(_){}sfx.click();const tch=e.pointerType==='touch';G.drag={i,x:p.x,y:p.y,cx:(i+.5)*W/3,cy:trayTop+trayH/2,k:0,ret:0,off:tch?cs*2.4:cs*.8};e.preventDefault()});
gc.addEventListener('pointermove',e=>{if(!G.drag||G.drag.ret)return;const p=pt(e);G.drag.x=p.x;G.drag.y=p.y});
gc.addEventListener('pointerup',()=>{const d=G.drag;if(!d||d.ret)return;const pv=preview(d);if(pv.ok){G.drag=null;place(d.i,pv.gr,pv.gc)}else d.ret=1});
gc.addEventListener('pointercancel',()=>{if(G.drag)G.drag.ret=1});

/* ============ 10. GAME LOOP ============ */
const bgc=$('#bg'),bctx=bgc.getContext('2d');let BW=0,BH=0;
const BP=Array.from({length:72},(_,i)=>{const z=i<36?0:i<62?1:2;return{x:Math.random(),y:Math.random(),z,r:[.8,1.4,2.4][z],v:[.00018,.00034,.0006][z]*(.7+Math.random()*.6),a:[.25,.4,.6][z],g:Math.random()<.5,ph:Math.random()*6.28,sp:z===2&&Math.random()<.5}});
const NB=[[.2,.3,'123,63,228'],[.8,.7,'176,107,255'],[.5,1,'255,198,77']];let BOOST=0;
function bgResize(){BW=bgc.width=innerWidth;BH=bgc.height=innerHeight}
function bgDraw(now){bctx.clearRect(0,0,BW,BH);if(S.set.rm)return;
 for(let i=0;i<3;i++){const[x,y,c]=NB[i],r=Math.max(BW,BH)*.55,cx=(x+Math.sin(now/9000+i*2)*.08)*BW,cy=(y+Math.cos(now/11000+i)*.06)*BH,g=bctx.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,`rgba(${c},${i===2?.09:.16})`);g.addColorStop(1,`rgba(${c},0)`);bctx.fillStyle=g;bctx.fillRect(0,0,BW,BH)}
 BOOST*=Math.pow(.97,DT);const k=1+BOOST*5;
 for(const p of BP){p.y-=p.v*DT*k;if(p.y<-.03){p.y=1.03;p.x=Math.random()}bctx.globalAlpha=p.a*(.65+.35*Math.sin(now/700+p.ph));bctx.fillStyle=p.g?'#FFE9A8':'#FFFFFF';const x=(p.x+Math.sin(now/5000+p.ph)*.01*(p.z+1))*BW,y=p.y*BH;
  if(p.sp){const s=p.r*2.6;bctx.beginPath();bctx.moveTo(x,y-s);bctx.quadraticCurveTo(x,y,x+s,y);bctx.quadraticCurveTo(x,y,x,y+s);bctx.quadraticCurveTo(x,y,x-s,y);bctx.quadraticCurveTo(x,y,x,y-s);bctx.fill()}
  else{bctx.beginPath();bctx.arc(x,y,p.r,0,6.283);bctx.fill()}}
 bctx.globalAlpha=1}
let dsp=0;function rollScore(){if(S.mode==='zen'&&!S.set.pts)return;const e=$('#hScore');if(dsp!==G.score){dsp=Math.abs(G.score-dsp)<2?G.score:Math.min(G.score,dsp+Math.ceil((G.score-dsp)*.18*DT));e.textContent=dsp;if(!S.set.rm)e.style.transform='scale(1.18)'}else e.style.transform=''}
function frame(now){requestAnimationFrame(frame);DT=Math.min(3,(now-last)/16.67||1);last=now;bgDraw(now);
 if(scr==='game'){if(G.clr&&now-G.clr.t0>=260)finishClear(now);rollScore();draw(now)}}

/* ============ 11. SCORING & COMBO LOGIC ============ */
function place(i,r,c){const p=G.tray[i],now=performance.now();p.used=1;p.sh.forEach(([a,b],i)=>{G.grid[r+a][c+b]=p.ci;G.pop[(r+a)*8+c+b]=now+i*18});
 G.score+=p.sh.length;sfx.place();buzz(30);
 const f=fullLines(G.grid),set=new Set();f.rows.forEach(rw=>{for(let k=0;k<8;k++)set.add(rw*8+k)});f.cols.forEach(cl=>{for(let k=0;k<8;k++)set.add(k*8+cl)});
 const L=f.rows.length+f.cols.length;
 if(L){G.streak++;G.lines+=L;const pts=10*L*L+5*G.streak;G.score+=pts;G.clr={set,L,pts,f,t0:now,cells:[...set].map(k=>({r:k>>3,c:k&7,ci:G.grid[k>>3][k&7]}))};
  sfx.clear(L);buzz(50);if(L>=2){flash();}}
 else{G.streak=0;after()}
 hud()}
function finishClear(now){const C=G.clr;G.clr=null;
 for(const q of C.cells){G.grid[q.r][q.c]=-1}
 BOOST=1;const per=Math.max(2,Math.min(15,Math.floor(80/C.cells.length)));
 for(const q of C.cells)spawn(bx+(q.c+.5)*cs,by+(q.r+.5)*cs,COL[q.ci][0],per,{sp:3.2});
 if(C.zen){after(true);return}
 const mx=C.cells.reduce((a,q)=>a+q.c,0)/C.cells.length,my=C.cells.reduce((a,q)=>a+q.r,0)/C.cells.length;
 G.texts.push({x:bx+(mx+.5)*cs,y:by+(my+.5)*cs,s:'+'+C.pts,t0:now});
 C.f.rows.forEach(r=>G.waves.push({x:bx+4*cs,y:by+(r+.5)*cs,t0:now}));C.f.cols.forEach(c=>G.waves.push({x:bx+(c+.5)*cs,y:by+4*cs,t0:now}));
 if(C.L===2)G.shake={t0:now,a:3};
 if(C.L>=2)comboPop(C.L);else if(G.streak>=3)comboPop(0);if(C.L===3)rain(30);
 if(C.L>=4){G.shake={t0:now,a:6};banner(t(33));rain(45);MS=1.26;setTimeout(()=>MS=1,7000)}
 if(G.grid.every(r=>r.every(v=>v<0))){G.score+=100;banner(t(31));spawn(W/2,H/2,'#FFE9A8',50,{sp:5,m:70});sfx.perfect()}
 after();hud()}
function after(zenOnly){if(!zenOnly)G.moves++;if(!G.nb&&bestNow()>0&&G.score>bestNow()&&S.mode!=='zen'){G.nb=1;toast('🏆 '+t(9)+'!');sfx.chime()}
 if(S.mode==='daily'&&!G.goalMet&&G.score>=600){G.goalMet=1;if(S.lastDaily!==today()){S.streak=S.lastDaily===yest()?S.streak+1:1;S.lastDaily=today()}save();toast(t(43));sfx.perfect()}
 if(S.mode==='challenge')checkGoal();
 if(G.tray.every(p=>p.used))deal();
 if(S.mode==='challenge'&&!G.goalMet&&G.goal.ty==='linesMoves'&&G.moves>=G.goal.m&&G.lines<G.goal.n){return gameOver(true)}
 if(!G.tray.filter(p=>!p.used).some(p=>canFit(p.sh)))stuck();
 hud()}
function checkGoal(){const g=G.goal;if(G.goalMet)return;let ok=0;
 if(g.ty==='score')ok=G.score>=g.n;else if(g.ty==='lines')ok=G.lines>=g.n;else if(g.ty==='linesMoves')ok=G.lines>=g.n&&G.moves<=g.m;else if(g.ty==='combo')ok=G.streak>=g.n;else ok=G.moves>=g.n;
 if(ok){G.goalMet=1;toast(t(24));$('#bFin').hidden=false;sfx.chime()}}
function stuck(){
 if(S.mode==='zen'){const set=new Set(),cells=[];G.grid.forEach((row,r)=>row.forEach((v,c)=>{if(v>=0){set.add(r*8+c);cells.push({r,c,ci:v})}}));G.clr={set,cells,zen:1,t0:performance.now(),L:0,pts:0};return}
 if(S.mode==='challenge'&&G.goalMet)return win();
 if(S.mode==='endless'&&!revived){revived=1;return reviveOv()}
 gameOver(S.mode==='challenge')}
function banner(s){const b=$('#bn');b.textContent=s;b.classList.remove('on');void b.offsetWidth;b.classList.add('on')}
function comboPop(L){const e=$('#cp'),b=e.firstElementChild,s=e.lastElementChild;b.textContent=L?t(32)+' x'+L+'!':'🔥 x'+G.streak;s.textContent=L?t(46).split('/')[Math.min(L-2,3)]:'';
 e.getAnimations().forEach(a=>a.cancel());const T='translate(-50%,-50%)';
 e.animate(S.set.rm?[{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.7},{opacity:0}]:[{transform:T+' scale(0)',opacity:0,easing:'cubic-bezier(.2,.9,.3,1.25)'},{transform:T+' scale(1.2)',opacity:1,offset:.3,easing:'ease-out'},{transform:T+' scale(1)',opacity:1,offset:.55},{transform:'translate(-50%,-58%) scale(1)',opacity:1,offset:.75},{transform:'translate(-50%,-66%) scale(1)',opacity:0}],{duration:800,easing:'linear'})}
function flash(){if(S.set.rm)return;const f=$('#fl');f.classList.add('on');setTimeout(()=>f.classList.remove('on'),100)}
let tt;function toast(s){const e=$('#toast');e.textContent=s;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2200)}

/* ============ 12. MODES ============ */
function goalOf(c,l){const ty=['score','lines','linesMoves','combo','survive'][(l-1)%5],ref=Math.round(120+c*60+l*14);
 if(ty==='score'){const n=Math.round(120+c*70+l*20);return{ty,n,m:0,ref:n}}
 if(ty==='lines')return{ty,n:3+Math.ceil(l/4)+c,m:0,ref};
 if(ty==='linesMoves'){const n=3+Math.ceil(l/7)+(c>>1);return{ty,n,m:n*4+6,ref}}
 if(ty==='combo')return{ty,n:2+(l/12|0)+(c>>2),m:0,ref};
 return{ty,n:10+l+c*2,m:0,ref}}
const goalTxt=g=>g.ty==='score'?t(34,{n:g.n}):g.ty==='lines'?t(35,{n:g.n}):g.ty==='linesMoves'?t(36,{n:g.n,m:g.m}):g.ty==='combo'?t(37,{n:g.n}):t(38,{n:g.n});
const progTxt=g=>{const ok=G.goalMet?' ✓':'';return(g.ty==='score'?G.score+'/'+g.n:g.ty==='lines'?G.lines+'/'+g.n:g.ty==='linesMoves'?G.lines+'/'+g.n+' · '+G.moves+'/'+g.m:g.ty==='combo'?G.streak+'/'+g.n:G.moves+'/'+g.n)+ok};
const bestKey=()=>S.mode==='challenge'?S.c+'-'+S.l:S.mode;
const bestNow=()=>S.best[bestKey()]||0;
function updBest(){if(G.score>bestNow()){S.best[bestKey()]=G.score}save()}
function start(mode,c=1,l=1){au();
 if(mode==='daily'){const d=today();if(S.daily.d!==d)S.daily={d,att:3};if(S.daily.att<=0){toast(t(42));return}S.daily.att--;save()}
 S.mode=mode;S.c=c;S.l=l;ovHide();dsp=0;
 G={grid:Array.from({length:8},()=>Array(8).fill(-1)),tray:[],pop:{},texts:[],waves:[],clr:null,drag:null,shake:null,over:0,score:0,moves:0,lines:0,streak:0,goalMet:0,R:Math.random,goal:null};
 let pre=0;if(mode==='challenge'){G.R=mul(c*1000+l);G.goal=goalOf(c,l);pre=Math.min(18,(c-1)*2+(l>>2))}else if(mode==='daily'){G.R=mul(hash(today()));pre=10}
 for(let i=0;i<pre;i++){const r=G.R()*8|0,cc=G.R()*8|0;G.grid[r][cc]=G.R()*6|0}
 const f=fullLines(G.grid);f.rows.forEach(r=>G.grid[r][0]=-1);f.cols.forEach(cc=>G.grid[0][cc]=-1);
 if(mode==='endless')revived=0;
 deal();document.body.classList.toggle('zen',mode==='zen');$('#bFin').hidden=true;go('game');layout();hud()}
function hud(){const z=S.mode==='zen'&&!S.set.pts;if(z)$('#hScore').textContent='';$('#hBest').textContent=z?'':t(9)+' '+bestNow();let g,p;
 if(S.mode==='challenge'){g=t(44)+' '+S.l+' · '+goalTxt(G.goal);p=progTxt(G.goal)}
 else if(S.mode==='daily'){g=t(2)+' · '+t(39)+' '+S.daily.att;p=t(41)+' '+G.moves+(G.goalMet?' ✓':'')}
 else{g=t(S.mode==='zen'?3:1);p=t(41)+' '+G.moves}
 $('#hGoal').textContent=g;$('#hProg').textContent=p}
function revive(){ovHide();G.over=0;for(let r=2;r<5;r++)for(let c=0;c<8;c++){if(G.grid[r][c]>=0)spawn(bx+(c+.5)*cs,by+(r+.5)*cs,COL[G.grid[r][c]][0],3);G.grid[r][c]=-1}deal();sfx.chime();hud()}
function reviveOv(){G.over=1;ov({h:t(29),b:[{t:t(30)+' (5)',d:1,f:revive},{t:t(10),f:()=>gameOver(false,1)}]});let n=5;const iv=setInterval(()=>{const b=$('[data-ob="0"]');if(!b||!ovOn){clearInterval(iv);return}n--;if(n<=0){b.disabled=false;b.textContent=t(30);clearInterval(iv)}else b.textContent=t(30)+' ('+n+')'},1000)}
function gameOver(fail){G.over=1;updBest();sfx.clear(1);
 ov({h:t(10),b:[{t:t(fail?28:11),f:()=>start(S.mode,S.c,S.l)},{t:t(12),f:exitGame}]})}
function win(){G.over=1;const g=G.goal,k=S.c+'-'+S.l,ref=g.ref;let st=1;if(G.score>=ref*1.25)st=2;if(G.score>=ref*1.6||(g.ty==='linesMoves'&&G.moves<=Math.ceil(g.m*.7)))st=3;
 if((S.stars[k]||0)<st)S.stars[k]=st;updBest();sfx.perfect();spawn(W/2,H/3,'#FFE9A8',50,{sp:5,m:70});$('#bFin').hidden=true;
 const b=[];if(S.l<35)b.push({t:t(27),f:()=>start('challenge',S.c,S.l+1)});b.push({t:t(28),f:()=>start('challenge',S.c,S.l)},{t:t(12),f:exitGame});ov({h:t(26),st,b})}
$('#bFin').addEventListener('click',()=>{if(S.mode==='challenge'&&G.goalMet&&!G.over&&!G.clr)win()});
function exitGame(){ovHide();if(G.score)updBest();G.over=1;if(S.mode==='challenge')openLevels(S.c);else go('menu')}

/* ============ 13. UI SCREENS ============ */
function go(id){if(id==='settings'&&scr!=='settings')prevScr=scr;scr=id;$$('.scr').forEach(e=>e.classList.toggle('on',e.id===id));document.body.classList.toggle('zen',id==='game'&&S.mode==='zen');
 if(id==='menu')refresh();if(id==='chapters')buildCh();if(id==='settings')buildSet();if(id==='game')requestAnimationFrame(layout)}
function refresh(){$('#avl').textContent=1+Math.floor(totalStars()/10);$('#lvTxt').textContent=t(44)+' '+(1+Math.floor(totalStars()/10));$('#stT').textContent='⭐ '+totalStars();
 const n=openCount();$('#prog').textContent=t(6)+' '+n+' — '+starsIn(n)+'/105 ⭐';const s=streakNow();$('#strk').textContent=s?'🔥 '+s+' '+t(40):''}
function buildCh(){let h='';for(let k=1;k<=10;k++)h+=chOpen(k)?`<button class="tile glass" data-ch="${k}"><b>${k}</b><small>${starsIn(k)}/105 ⭐</small></button>`:`<div class="tile lock glass" aria-hidden="true"><b>?</b></div>`;$('#chGrid').innerHTML=h}
function openLevels(c){S.c=c;$('#lvTitle').textContent=t(6)+' '+c+' — '+starsIn(c)+'/105 ⭐';let h='';
 for(let l=1;l<=35;l++){const s=S.stars[c+'-'+l]||0,ok=l===1||S.stars[c+'-'+(l-1)];h+=`<button class="tile glass ${ok?'':'off'}" data-lv="${l}" ${ok?'':'disabled'}><b>${ok?l:'🔒'}</b><small>${s?'★'.repeat(s):''}</small></button>`}
 $('#lvGrid').innerHTML=h;go('levels')}
function buildSet(){const s=S.set,row=(k,lab)=>`<label class="row glass"><span>${lab}</span><input type="checkbox" data-k="${k}" ${s[k]?'checked':''}><i class="sw"></i></label>`;
 $('#sbody').innerHTML=`<div class="row glass"><span>${t(13)}</span><select id="lsel" aria-label="${t(13)}">${LG.map(l=>`<option value="${l[0]}" ${S.lang===l[0]?'selected':''}>${l[1]}</option>`).join('')}</select></div>`
 +row('rm',t(14))+row('hc',t(15))+row('cb',t(16))+`<div class="row glass"><span>${t(17)}</span><div class="seg">${t(18).split('/').map((x,i)=>`<button class="btn ${s.fs===i?'on':''}" data-fs="${i}">${x}</button>`).join('')}</div></div>`+row('snd',t(19))+row('mus',t(20))+row('hap',t(45))+row('pts',t(21))}
function ov(o){const e=$('#ov');ovOn=1;
 e.innerHTML=`<div class="card glass"><h2>${o.h}</h2>${o.st!==undefined?`<div class="stars">${[1,2,3].map(i=>i<=o.st?'★':'<span class="mu">☆</span>').join('')}</div>`:''}<div><div class="mu">${t(8)}</div><b class="sc">${G.score}</b></div><div class="mu">${t(9)}: ${bestNow()}</div><div class="btns">${o.b.map((b,i)=>`<button class="btn" data-ob="${i}" ${b.d?'disabled':''}>${b.t}</button>`).join('')}</div></div>`;e._b=o.b;e.classList.add('on')}
function ovHide(){ovOn=0;$('#ov').classList.remove('on')}
function back(){sfx.click();if(scr==='chapters')go('menu');else if(scr==='levels')go('chapters');else if(scr==='settings')go(prevScr);else if(scr==='game')exitGame()}
document.addEventListener('click',e=>{const x=e.target.closest('[data-go],[data-mode],[data-ch],[data-lv],[data-back],[data-ob],[data-fs]');if(!x)return;au();const D=x.dataset;
 if('back' in D)return back();sfx.click();
 if(D.go)go(D.go);else if(D.mode)start(D.mode);else if(D.ch)openLevels(+D.ch);else if(D.lv)start('challenge',S.c,+D.lv);
 else if(D.ob!==undefined){const f=$('#ov')._b[+D.ob].f;f&&f()}else if(D.fs!==undefined){S.set.fs=+D.fs;save();applyAll();buildSet()}});
document.addEventListener('change',e=>{const k=e.target.dataset&&e.target.dataset.k;if(k){S.set[k]=e.target.checked?1:0;save();applyAll();if(scr==='game')hud()}
 if(e.target.id==='lsel'){S.lang=e.target.value;save();applyAll();buildSet()}});

/* ============ 14. INTRO (exactly 3.0 s) ============ */
function intro(){const el=$('#intro'),io=$('#io'),T=[],at=(ms,f)=>T.push(setTimeout(f,ms));let done=0;
 const pos=[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]],DIR=[[0,-1],[0,-1],[1,0],[-1,0],[1,0],[-1,0],[0,1],[0,1]];
 io.innerHTML=pos.map(([r,c])=>`<div class="jb" style="grid-row:${r+1};grid-column:${c+1}"><i class="sh"></i>${r===0&&c===2?'<i class="gd"></i>':''}</div>`).join('')
  +'<svg class="sp" viewBox="0 0 40 40"><path d="M20 2L24 16 38 20 24 24 20 38 16 24 2 20 16 16Z" fill="#fff"/></svg>';
 const bl=$$('#io .jb'),sp=$('.sp'),gd=$('.gd'),t1=$('#t1'),t2=$('#t2');
 const fin=()=>{if(done)return;done=1;T.forEach(clearTimeout);sessionStorage.setItem('bo_s','1');try{localStorage.setItem('blockOzak_introSeen','true')}catch(e){}
  if(scr==='intro')go('menu')};
 el.addEventListener('pointerdown',()=>{el.style.transitionDuration='.01s';fin()},{once:true});
 if(sessionStorage.getItem('bo_s')){gd.style.opacity=1;sp.style.opacity=1;t1.style.opacity=t2.style.opacity=1;at(500,fin);return}
 bl.forEach((b,i)=>{const W_=innerWidth,H_=innerHeight,[dx,dy]=DIR[i];b.animate([{transform:`translate(${dx*W_}px,${dy*H_}px) rotate(${(i%2?1:-1)*(80+i*28)}deg) scale(.6)`,opacity:0},{transform:'none',opacity:1}],{duration:520,delay:i*10,easing:EASE,fill:'both'})});
 at(600,()=>{sfx.chime();bl.forEach((b,i)=>b.querySelector('.sh').animate([{transform:'translateX(-170%) skewX(-20deg)'},{transform:'translateX(330%) skewX(-20deg)'}],{duration:200,delay:pos[i][1]*100,easing:'ease-out'}))});
 at(1200,()=>{gd.animate([{opacity:0},{opacity:1}],{duration:260,fill:'both',easing:EASE});bl[2].classList.add('glow');bl[2].animate([{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:400,easing:EASE});
  sp.animate([{opacity:0,transform:'scale(0) rotate(0)'},{opacity:1,transform:'scale(1.1) rotate(45deg)'},{opacity:.95,transform:'scale(1) rotate(90deg)'}],{duration:480,delay:150,fill:'both',easing:EASE})});
 at(1800,()=>{t1.animate([{transform:'translateY(40px)',opacity:0},{transform:'none',opacity:1}],{duration:500,fill:'both',easing:EASE});t2.animate([{transform:'translateY(40px)',opacity:0},{transform:'none',opacity:1}],{duration:500,delay:100,fill:'both',easing:EASE})});
 at(2400,()=>{if(!S.set.rm)for(let i=0;i<20;i++){const p=document.createElement('i');p.className='pt';$('#ig').appendChild(p);const x=(Math.random()-.5)*220,y=-(70+Math.random()*170);
   p.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}],{duration:600,easing:EASE,fill:'forwards',delay:Math.random()*80})}
  $('#ig').animate([{filter:'drop-shadow(0 0 0 rgba(255,198,77,0))'},{filter:'drop-shadow(0 0 26px rgba(255,198,77,.85))'}],{duration:500,fill:'forwards',easing:EASE})});
 at(2600,()=>{go('menu')});at(3000,()=>{done=1;sessionStorage.setItem('bo_s','1');try{localStorage.setItem('blockOzak_introSeen','true')}catch(e){}})}

/* ============ 15. LANGUAGE / SETTINGS APPLY ============ */
function applyAll(){const rtl=S.lang==='ar';document.documentElement.lang=S.lang;document.documentElement.dir=rtl?'rtl':'ltr';
 document.documentElement.className='f'+S.set.fs;document.body.classList.toggle('rm',!!S.set.rm);document.body.classList.toggle('hc',!!S.set.hc);
 $$('[data-t]').forEach(e=>e.textContent=t(+e.dataset.t));$('#tag').textContent=t(5);refresh();if(scr==='levels')openLevels(S.c)}

/* ============ 16. INITIALIZE ============ */
load();bgResize();addEventListener('resize',()=>{bgResize();if(scr==='game')layout()});
addEventListener('blur',()=>{if(G.drag)G.drag.ret=1});
document.addEventListener('pointerdown',()=>au(),{once:true});
applyAll();music();requestAnimationFrame(frame);intro();
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
