function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequire716c;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,n){r[e]=n},n.parcelRequire716c=o),o.register("kyEFX",(function(n,t){var r,o;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return o}),(function(e){return o=e}));var l={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)l[n[t]]=e[n[t]]},o=function(e){var n=l[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),o("kyEFX").register(JSON.parse('{"l53ZJ":"index.bdb65eac.js","c8GOh":"SoundHelix-Song-1.3a87d076.mp3","1Axcj":"SoundHelix-Song-2.2c8899eb.mp3","gyL46":"SoundHelix-Song-3.0f2a5557.mp3"}'));var l;l=new URL(o("kyEFX").resolve("c8GOh"),import.meta.url).toString();var u;u=new URL(o("kyEFX").resolve("1Axcj"),import.meta.url).toString();var i;i=new URL(o("kyEFX").resolve("gyL46"),import.meta.url).toString(),window.onload=function(){const e=new Audio,n=["Enter","Space"];let t=0;const r=document.querySelector("form"),o=document.querySelector("em"),c=document.querySelector("select"),a=document.querySelector("canvas"),s=document.querySelector("#play-icon"),d=document.querySelector("#pause-icon");function p(e){return null==r?void 0:r.querySelector("#"+e)}function y(e){return null==r?void 0:r.querySelector("#"+e)}const f=p("play"),m=p("anterior"),S=p("proxima"),g=y("tempo"),v=y("volume"),x=[{url:new URL(l).pathname,artist:"SoundHelix Song 1"},{url:new URL(u).pathname,artist:"SoundHelix Song 2"},{url:new URL(i).pathname,artist:"SoundHelix Song 3"}];function w(){const n=+c.value;e.src=x[n].url,e.play(),t=n}x.forEach(((e,n)=>{c.add(new Option(e.artist,`${n}`))})),e.ontimeupdate=()=>{if(g){g.value=e.currentTime.toString();const n=g.valueAsNumber%60|0,t=g.valueAsNumber/60%60|0;g.nextElementSibling.textContent=`${t<10?"0":""}${t}:${n<10?"0":""}${n}`}},g.oninput=()=>{e.currentTime=g.valueAsNumber},v.oninput=()=>{e.volume=v.valueAsNumber/100,v.nextElementSibling.textContent=`${v.valueAsNumber}%`},e.onplay=()=>{_(),g.max=`${e.duration}`,s.style.display="none",d.style.display="block",o.textContent=x[t].artist},e.onpause=()=>{s.style.display="block",d.style.display="none"},f.onclick=()=>{c.value||(c.value="0",x[+c.value].url),e.paused?e.play():e.pause()},m.onclick=()=>{t>0?t--:t=x.length-1,c.value=`${t}`,e.src=x[t].url,e.play()},S.onclick=()=>{t<x.length-1?t++:t=0,c.value=`${t}`,e.src=x[t].url,e.play()},c.ondblclick=()=>w(),c.onkeydown=e=>{n.includes(e.code)&&w()};const b=new AudioContext,h=a.getContext("2d");e.src=x[0].url,e.crossOrigin="anonymous";const E=b.createMediaElementSource(e),A=b.createAnalyser(),H=A.frequencyBinCount,R=new Uint8Array(H);let k,q,F,O;E.connect(A),A.connect(b.destination);let _=()=>{requestAnimationFrame(_),A.getByteFrequencyData(R),(()=>{h.clearRect(0,0,a.width,a.height),h.fillStyle="rgba(0, 132, 255, 0.466)",k=280;for(let e=0;e<280;e++)F=a.width/280,q=e*(F+2),O=-R[e]/1.6,h.fillRect(q,a.height,F,O)})()}};
//# sourceMappingURL=index.bdb65eac.js.map