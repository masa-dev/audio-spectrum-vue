(function(){"use strict";var e={7121:function(e,t,i){var a=i(8935),n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("BasicAudioVisualiser")],1)},o=[],r=i(3796),s=(i(8675),i(3462),i(7380),i(1118),i(6164)),l=i(6166),u=i.n(l),c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"canvas-wrapper"},[i("canvas",{attrs:{id:"basic-visualiser",width:"500",height:"200"}}),i("div",[e._v(" "+e._s(e.mediaUrl)+" "),i("button",{on:{click:function(t){return e.play()}}},[e._v("start")]),i("button",{on:{click:function(t){return e.playOrPause()}}},[e._v(e._s(e.btnText))])])])},d=[],f=function(e,t,i,a){var n,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let h=class extends s.w3{constructor(...e){super(...e),(0,r.Z)(this,"mediaUrl",void 0),(0,r.Z)(this,"canvasEl",null),(0,r.Z)(this,"canvasCtx",null),(0,r.Z)(this,"audioCtx",new AudioContext),(0,r.Z)(this,"analyserNode",this.audioCtx.createAnalyser()),(0,r.Z)(this,"gainNode",new GainNode(this.audioCtx)),(0,r.Z)(this,"sourceNode",this.audioCtx.createBufferSource()),(0,r.Z)(this,"mediaBuffer",null),(0,r.Z)(this,"isFirstPlay",!0),(0,r.Z)(this,"isPlaying",!1),(0,r.Z)(this,"btnText","start")}async getAudioArrayBuffer(e){let t=u()(e,{responseType:"arraybuffer",method:"GET"});return t}init(){this.audioCtx=new AudioContext,this.analyserNode=this.audioCtx.createAnalyser(),this.gainNode=new GainNode(this.audioCtx),this.sourceNode=this.audioCtx.createBufferSource(),this.gainNode.gain.value=.3,console.log("initted")}async play(){this.isFirstPlay||this.sourceNode.stop(),this.mediaBuffer?(this.mediaBuffer=(await this.getAudioArrayBuffer(this.mediaUrl)).data,this.init(),await this.audioCtx.decodeAudioData(this.mediaBuffer,(e=>{const t=500,i=200;this.sourceNode.buffer=e;new Uint8Array(this.analyserNode.frequencyBinCount);this.analyserNode.fftSize=256,this.sourceNode.connect(this.analyserNode),this.sourceNode.connect(this.gainNode).connect(this.audioCtx.destination),this.sourceNode.start(0),this.isPlaying=!1,this.analyserNode.fftSize=128;let a=this.analyserNode.frequencyBinCount;console.log(a);let n=new Uint8Array(a);console.log(n),this.canvasCtx.clearRect(0,0,t,i);let o=0,r=this.analyserNode,s=this.canvasCtx;function l(){o=requestAnimationFrame(l),r.getByteFrequencyData(n),s.fillStyle="rgb(0, 0, 0)",s.clearRect(0,0,t,i),s.fillStyle="rgb(0, 0, 0, 0)",s.fillRect(0,0,t,i);let e,u=t/a*1.3,c=0;for(let t=0;t<a;t++)e=1.5*n[t],s.fillStyle="rgb("+(e+100)+",50,50)",s.fillRect(c,i-e/2,u,e),c+=u+1}l(),this.sourceNode.onended=()=>{this.audioCtx.close(),this.isFirstPlay=!0,this.isPlaying=!1}}))):setTimeout((()=>{this.play()}),500)}playOrPause(){this.isPlaying?(this.audioCtx.suspend(),this.isPlaying=!1,this.btnText="start"):(this.audioCtx.resume(),this.isPlaying=!0,this.btnText="stop")}async mounted(){this.canvasEl=document.getElementById("basic-visualiser"),this.canvasCtx=this.canvasEl.getContext("2d"),this.mediaBuffer=(await this.getAudioArrayBuffer(this.mediaUrl)).data,this.gainNode.gain.value=.2}};f([(0,s.fI)({type:String,default:""})],h.prototype,"mediaUrl",void 0),h=f([s.wA],h);var v=h,p=v,y=i(1001),g=(0,y.Z)(p,c,d,!1,null,null,null),m=g.exports,b=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("canvas",{attrs:{id:"visualiser-canvas",width:e.visualWidth,height:e.visualHeight}}),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isDisplayControlPanel,expression:"isDisplayControlPanel"}],attrs:{id:"audio-control-panel"}},[i("div",{staticClass:"d-flex justify-content-center"},[i("div",{staticClass:"flex-column-center"},[i("button",{on:{click:e.play}},[i("b-icon-play-fill")],1)]),i("div",{staticClass:"flex-column-center"},[i("input",{attrs:{type:"file",id:"audio-input",accept:"audio/*"},on:{change:e.inputAudioFile}})]),i("div",{staticClass:"flex-column-center"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.visualiserType,expression:"visualiserType"}],attrs:{id:""},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.visualiserType=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"simple-bar",selected:""}},[e._v("Simple Bar")]),i("option",{attrs:{value:"bold-bar"}},[e._v("Bold Bar")]),i("option",{attrs:{value:"line-bar"}},[e._v("Line Bar")])])]),i("div",{staticClass:"flex-column-center"},[i("b-icon-volume-down-fill")],1),i("div",{staticClass:"flex-column-center"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.volume,expression:"volume"}],attrs:{type:"range",id:"volume-controller",min:"0",max:"1",step:"0.05"},domProps:{value:e.volume},on:{input:e.inputVolume,__r:function(t){e.volume=t.target.value}}})]),i("div",{staticClass:"flex-column-center"},[i("b-icon-volume-up-fill")],1),e._m(0)]),i("div",[i("input",{attrs:{type:"file",id:"background-image",accept:"image/*"},on:{change:e.inputBackgroundImage}})]),i("div",[i("label",{attrs:{for:""}},[e._v("遅延")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.delayToPlay,expression:"delayToPlay"}],attrs:{type:"number",value:"0"},domProps:{value:e.delayToPlay},on:{input:function(t){t.target.composing||(e.delayToPlay=t.target.value)}}})])]),i("div",{directives:[{name:"show",rawName:"v-show",value:!1===e.isDisplayControlPanel,expression:"isDisplayControlPanel === false"}],staticClass:"show-control-icon",on:{click:function(t){return e.openControlPanel()}}},[i("b-icon-caret-up-square-fill")],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!0===e.isDisplayControlPanel,expression:"isDisplayControlPanel === true"}],staticClass:"show-control-icon",on:{click:function(t){return e.closeControlPanel()}}},[i("b-icon-caret-down-square-fill")],1),i("BackgroundImage",{attrs:{imageUrl:e.backgroundImageUrl}})],1)},C=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"flex-column-center"},[i("div",{attrs:{id:"color-picker"}})])}];function x(e,t,i){let a=0;for(let n=t;n<=i;n++)a+=e[n];return a/(i-t+1)}function w(e,t,i,a,n,o,r){t.getByteFrequencyData(a),e.fillStyle="rgb(0, 0, 0)",e.clearRect(0,0,n,o),e.fillStyle="rgb(0, 0, 0, 0)",e.fillRect(0,0,n,o);const s=n/i*1.1;let l,u=0;for(let c=0;c<i;c++)l=a[c]/128*o*.9,e.fillStyle=r,e.fillRect(u,o-l/2,s,l),u+=s}function N(e,t,i,a,n,o,r){t.getByteFrequencyData(a),e.fillStyle="rgb(0, 0, 0)",e.clearRect(0,0,n,o),e.fillStyle="rgb(0, 0, 0, 0)",e.fillRect(0,0,n,o);const s=32,l=n/s*.9,u=i/s;let c=0;for(let d=0;d<s;d++){const t=x(a,d*u,(d+1)*u),i=t/128*o*.9;e.fillStyle=r,e.fillRect(c,o-i/2,l,i),c+=l+1}}function P(e,t,i,a,n,o,r){t.getByteFrequencyData(a),e.fillStyle="rgb(0, 0, 0)",e.clearRect(0,0,n,o),e.fillStyle="rgb(0, 0, 0, 0)",e.fillRect(0,0,n,o);const s=16,l=n/s*.9,u=i/s;let c=0;for(let d=0;d<s;d++){const t=x(a,d*u,(d+1)*u),i=Math.floor(t/10);for(let a=0;a<i;a++){const t=o-20*a+10;e.beginPath(),e.moveTo(c,t),e.lineTo(c+l,t),e.strokeStyle=r,e.lineWidth=10,e.stroke()}c+=l+10}}var A=i(4638),B=i.n(A),Z=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"image-wrapper",style:e.backgroundStyle})},k=[],S=function(e,t,i,a){var n,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let T=class extends a["default"]{constructor(...e){super(...e),(0,r.Z)(this,"imageUrl",void 0)}get getImageUrl(){const e="/audio-spectrum-vue/img/party.png";return this.imageUrl?this.imageUrl:e}get backgroundStyle(){const e={"background-image":`url("${this.getImageUrl}")`};return e}};S([(0,s.fI)({type:String,default:"/audio-spectrum-vue/img/party.png"})],T.prototype,"imageUrl",void 0),T=S([s.wA],T);var R=T,_=R,O=(0,y.Z)(_,Z,k,!1,null,null,null),D=O.exports,j=function(e,t,i,a){var n,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};const E={el:"#color-picker",theme:"classic",swatches:["rgba(244, 67, 54, 0.6)","rgba(103, 58, 183, 0.85)","rgba(63, 81, 181, 0.8)","rgba(0, 188, 212, 0.7)","rgba(76, 175, 80, 0.8)"],default:"#F5732499",components:{preview:!0,opacity:!0,hue:!0,interaction:{hex:!0,rgba:!0,input:!0,save:!0}}};let F=class extends s.w3{constructor(...e){super(...e),(0,r.Z)(this,"visualWidth",100),(0,r.Z)(this,"visualHeight",100),(0,r.Z)(this,"canvasEl",null),(0,r.Z)(this,"canvasCtx",null),(0,r.Z)(this,"audioFile",null),(0,r.Z)(this,"audioCtx",new AudioContext),(0,r.Z)(this,"analyserNode",this.audioCtx.createAnalyser()),(0,r.Z)(this,"gainNode",new GainNode(this.audioCtx)),(0,r.Z)(this,"sourceNode",this.audioCtx.createBufferSource()),(0,r.Z)(this,"audioBuffer",null),(0,r.Z)(this,"volume",.2),(0,r.Z)(this,"pickr",null),(0,r.Z)(this,"barColor","#F5732499"),(0,r.Z)(this,"savedColor","#F5732499"),(0,r.Z)(this,"visualiserType","simple-bar"),(0,r.Z)(this,"backgroundImageUrl",""),(0,r.Z)(this,"isDisplayControlPanel",!0),(0,r.Z)(this,"delayToPlay",0)}mounted(){this.canvasEl=document.getElementById("visualiser-canvas"),this.canvasCtx=this.canvasEl.getContext("2d"),this.gainNode.gain.value=this.volume,this.resizeCanvas(),window.onresize=()=>{this.resizeCanvas()},this.pickr=B().create(E),this.pickr.on("save",(e=>{this.barColor=e.toRGBA().toString(),this.savedColor=e.toRGBA().toString(),this.pickr.hide()})),this.pickr.on("change",(e=>{this.barColor=e.toRGBA().toString()})),this.pickr.on("cancel",(()=>{this.barColor=this.savedColor})),this.pickr.on("hide",(()=>{this.barColor=this.savedColor}))}resizeCanvas(){this.visualWidth=window.innerWidth,this.visualHeight=window.innerHeight-150}async inputAudioFile(e){const t=e.target;this.audioFile=t.files[0]}inputBackgroundImage(e){const t=new FileReader,i=e.target,a=i.files[0];a?(t.readAsDataURL(a),t.onload=()=>{this.backgroundImageUrl=t.result}):this.backgroundImageUrl=""}inputVolume(e){const t=e.target;this.volume=parseFloat(t.value),this.gainNode.gain.value=this.volume}closeControlPanel(){this.isDisplayControlPanel=!1}openControlPanel(){this.isDisplayControlPanel=!0}initAudioInstances(){const e=this.gainNode.gain.value;this.audioCtx=new AudioContext,this.analyserNode=this.audioCtx.createAnalyser(),this.sourceNode=this.audioCtx.createBufferSource(),this.gainNode=this.audioCtx.createGain(),this.gainNode.gain.value=e}async play(){if(null===this.audioFile)return void alert("音声ファイルが入力されていません");const e=this;this.initAudioInstances();const t=document.getElementById("audio-input");this.audioBuffer=null,this.audioBuffer=await this.audioCtx.decodeAudioData(await t.files[0].arrayBuffer()),this.sourceNode.buffer=this.audioBuffer,this.sourceNode.connect(this.analyserNode),this.sourceNode.connect(this.gainNode).connect(this.audioCtx.destination);let i=0;this.sourceNode.start(this.delayToPlay),console.log("started"),this.sourceNode.onended=()=>{console.log("ended"),cancelAnimationFrame(i)},this.analyserNode.fftSize=1024;const a=this.analyserNode.frequencyBinCount,n=new Uint8Array(a),o=this.canvasCtx,r=this.analyserNode;function s(){i=requestAnimationFrame(s),"simple-bar"===e.visualiserType?w(o,r,a,n,e.visualWidth,e.visualHeight,e.barColor):"bold-bar"===e.visualiserType?N(o,r,a,n,e.visualWidth,e.visualHeight,e.barColor):"line-bar"===e.visualiserType&&P(o,r,a,n,e.visualWidth,e.visualHeight,e.barColor)}this.canvasCtx.clearRect(0,0,this.visualWidth,this.visualHeight),s()}};F=j([(0,s.wA)({components:{BackgroundImage:D}})],F);var U=F,I=U,q=(0,y.Z)(I,b,C,!1,null,null,null),G=q.exports,W=function(e,t,i,a){var n,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let H=class extends s.w3{constructor(...e){super(...e),(0,r.Z)(this,"canvasEl",null)}async getAudioArrayBuffer(e){let t=u()(e,{responseType:"arraybuffer",method:"GET"});return t}async click(){this.canvasEl=document.getElementById("my-canvas");const e=this.canvasEl.getContext("2d"),t=new AudioContext,i=t.createAnalyser(),a=(await this.getAudioArrayBuffer("/music/季節は次々死んでいく.mp3")).data;t.decodeAudioData(a,(function(a){const n=t.createBufferSource();n.buffer=a;const o=t.createGain();o.gain.value=.3;const r=new Uint8Array(i.frequencyBinCount);n.connect(i),n.connect(o).connect(t.destination),n.start(0),setInterval((()=>{i.getByteTimeDomainData(r),e.fillStyle="rgb(200, 200, 200)",e.fillRect(0,0,200,200),e.lineWidth=2,e.strokeStyle="rgb(0, 0, 0)",e.beginPath();let t=200/r.length,a=0;for(let i=0;i<r.length;i++){let o=r[i]/128;var n=200*o/2;0===i?e.moveTo(a,n):e.lineTo(a,n),a+=t}e.lineTo(200,100),e.stroke()}),10)}))}};H=W([(0,s.wA)({components:{BasicAudioVisualiserTest:m,BasicAudioVisualiser:G}})],H);var z=H,$=z,V=(0,y.Z)($,n,o,!1,null,"970f6120",null),M=V.exports,L=i(4665);a["default"].use(L.ZP);var X=new L.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),J=i(8262),K=i(3266);i(44);a["default"].use(J.XG7),a["default"].use(K.A7),a["default"].config.productionTip=!1,new a["default"]({store:X,render:e=>e(M)}).$mount("#app")}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,i),o.exports}i.m=e,function(){var e=[];i.O=function(t,a,n,o){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],n=e[c][1],o=e[c][2];for(var s=!0,l=0;l<a.length;l++)(!1&o||r>=o)&&Object.keys(i.O).every((function(e){return i.O[e](a[l])}))?a.splice(l--,1):(s=!1,o<r&&(r=o));if(s){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,n,o]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,o,r=a[0],s=a[1],l=a[2],u=0;if(r.some((function(t){return 0!==e[t]}))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(l)var c=l(i)}for(t&&t(a);u<r.length;u++)o=r[u],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},a=self["webpackChunkaudio_spectrum"]=self["webpackChunkaudio_spectrum"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(7121)}));a=i.O(a)})();
//# sourceMappingURL=app.bc0ea504.js.map