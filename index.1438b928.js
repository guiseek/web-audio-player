!function(){function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequire716c;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){r[e]=n},n.parcelRequire716c=o),o.register("iE7OH",(function(n,t){var r,o;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return o}),(function(e){return o=e}));var u={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)u[n[t]]=e[n[t]]},o=function(e){var n=u[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),o.register("aNJCr",(function(n,t){var r;e(n.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var o={};function u(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var n=o[e];return n||(n=function(){try{throw new Error}catch(n){var e=(""+n.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return u(e[2])}return"/"}(),o[e]=n),n}})),o("iE7OH").register(JSON.parse('{"7o1Gz":"index.1438b928.js","3qVCT":"SoundHelix-Song-1.3a87d076.mp3","3GS9P":"SoundHelix-Song-2.2c8899eb.mp3","g3TQm":"SoundHelix-Song-3.0f2a5557.mp3"}'));var u,i=!1;u=o("aNJCr").getBundleURL("7o1Gz")+o("iE7OH").resolve("3qVCT");var c;c=o("aNJCr").getBundleURL("7o1Gz")+o("iE7OH").resolve("3GS9P");var l;function a(){var e=0,n=new Audio,t=document.querySelector("form"),r=document.querySelector("em"),o=document.querySelector("select"),i=document.querySelector("canvas"),a=document.querySelector("#play-icon"),f=document.querySelector("#pause-icon");function s(e){return null==t?void 0:t.querySelector("#"+e)}function d(e){return null==t?void 0:t.querySelector("#"+e)}var p=s("play"),v=s("anterior"),y=s("proxima"),m=d("tempo"),g=d("volume"),S=[{url:new URL(u).pathname,artist:"SoundHelix Song 1"},{url:new URL(c).pathname,artist:"SoundHelix Song 2"},{url:new URL(l).pathname,artist:"SoundHelix Song 3"}];function h(){var t=+o.value;n.src=S[t].url,n.play(),e=t}S.forEach((function(e,n){o.add(new Option(e.artist,"".concat(n)))})),n.ontimeupdate=function(){if(m){m.value=n.currentTime.toString();var e=m.valueAsNumber%60|0,t=m.valueAsNumber/60%60|0;m.nextElementSibling.textContent="".concat(t<10?"0":"").concat(t,":").concat(e<10?"0":"").concat(e)}},m.oninput=function(){n.currentTime=m.valueAsNumber},g.oninput=function(){n.volume=g.valueAsNumber/100,g.nextElementSibling.textContent="".concat(g.valueAsNumber,"%")},n.onplay=function(){O(),a.style.display="none",f.style.display="block",r.textContent=S[e].artist},n.onpause=function(){a.style.display="block",f.style.display="none"},p.onclick=function(){o.value||(o.value="0",S[+o.value].url),n.paused?n.play():n.pause()},v.onclick=function(){e>0?e--:e=S.length-1,o.value="".concat(e),n.src=S[e].url,n.play()},y.onclick=function(){e<S.length-1?e++:e=0,o.value="".concat(e),n.src=S[e].url,n.play()},o.ondblclick=function(){return h()},o.onkeydown=function(e){"Enter"===e.key&&h()};var b=new AudioContext,x=i.getContext("2d");n.src=S[0].url,n.crossOrigin="anonymous";var w,H,E,q=b.createMediaElementSource(n),R=b.createAnalyser(),A=R.frequencyBinCount,C=new Uint8Array(A);q.connect(R),R.connect(b.destination),i.width=280,i.height=200;var O=function(){requestAnimationFrame(O),R.getByteFrequencyData(C),function(){x.clearRect(0,0,i.width,i.height),x.fillStyle="rgba(0, 132, 255, 0.466)",280;for(var e=0;e<280;e++)H=i.width/280,w=e*(H+2),E=-C[e]/1.6,x.fillRect(w,i.height,H,E)}()}}l=o("aNJCr").getBundleURL("7o1Gz")+o("iE7OH").resolve("g3TQm"),document.onclick=function(){i||(a(),i=!0)}}();
//# sourceMappingURL=index.1438b928.js.map
