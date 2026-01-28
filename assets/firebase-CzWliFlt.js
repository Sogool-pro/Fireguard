const Ug=()=>{};var oh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vf={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=function(n,e){if(!n)throw gi(e)},gi=function(n){return new Error("Firebase Database ("+vf.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Bg=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],l=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Cl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,l=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,f=r>>2,p=(r&3)<<4|l>>4;let m=(l&15)<<2|h>>6,T=h&63;c||(T=64,o||(m=64)),i.push(t[f],t[p],t[m],t[T])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ef(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Bg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||l==null||h==null||p==null)throw new qg;const m=r<<2|l>>4;if(i.push(m),h!==64){const T=l<<4&240|h>>2;if(i.push(T),p!==64){const R=h<<6&192|p;i.push(R)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class qg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Tf=function(n){const e=Ef(n);return Cl.encodeByteArray(e,!0)},Nr=function(n){return Tf(n).replace(/\./g,"")},Dr=function(n){try{return Cl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jg(n){return If(void 0,n)}function If(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Wg(t)||(n[t]=If(n[t],e[t]));return n}function Wg(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg=()=>$g().__FIREBASE_DEFAULTS__,zg=()=>{if(typeof process>"u"||typeof oh>"u")return;const n=oh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Gg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Dr(n[1]);return e&&JSON.parse(e)},ho=()=>{try{return Ug()||Hg()||zg()||Gg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},wf=n=>{var e,t;return(t=(e=ho())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Af=n=>{const e=wf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Cf=()=>{var n;return(n=ho())===null||n===void 0?void 0:n.config},Rf=n=>{var e;return(e=ho())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Rl(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Nr(JSON.stringify(t)),Nr(JSON.stringify(o)),""].join(".")}const ns={};function Kg(){const n={prod:[],emulator:[]};for(const e of Object.keys(ns))ns[e]?n.emulator.push(e):n.prod.push(e);return n}function Qg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let ah=!1;function Sl(n,e){if(typeof window>"u"||typeof document>"u"||!hn(window.location.host)||ns[n]===e||ns[n]||ah)return;ns[n]=e;function t(m){return`__firebase__banner__${m}`}const i="__firebase__banner",r=Kg().prod.length>0;function o(){const m=document.getElementById(i);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,T){m.setAttribute("width","24"),m.setAttribute("id",T),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{ah=!0,o()},m}function f(m,T){m.setAttribute("id",T),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=Qg(i),T=t("text"),R=document.getElementById(T)||document.createElement("span"),N=t("learnmore"),k=document.getElementById(N)||document.createElement("a"),W=t("preprendIcon"),B=document.getElementById(W)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const $=m.element;l($),f(k,N);const ae=h();c(B,W),$.append(B,R,k,ae),document.body.appendChild($)}r?(R.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Fe())}function Yg(){var n;const e=(n=ho())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Xg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Jg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Pf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Zg(){const n=Fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ey(){return vf.NODE_ADMIN===!0}function ty(){return!Yg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ny(){try{return typeof indexedDB=="object"}catch{return!1}}function iy(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy="FirebaseError";class Vt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=sy,Object.setPrototypeOf(this,Vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ns.prototype.create)}}class Ns{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?ry(r,i):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Vt(s,l,i)}}function ry(n,e){return n.replace(oy,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const oy=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(n){return JSON.parse(n)}function Ae(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=fs(Dr(r[0])||""),t=fs(Dr(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},ay=function(n){const e=bf(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ly=function(n){const e=bf(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ri(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function xa(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Or(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Zt(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(lh(r)&&lh(o)){if(!Zt(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function lh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Qi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function Yi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)i[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)i[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=i[p-3]^i[p-8]^i[p-14]^i[p-16];i[p]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],c=this.chain_[4],h,f;for(let p=0;p<80;p++){p<40?p<20?(h=l^r&(o^l),f=1518500249):(h=r^o^l,f=1859775393):p<60?(h=r&o|l&(r|o),f=2400959708):(h=r^o^l,f=3395469782);const m=(s<<5|s>>>27)+h+c+f+i[p]&4294967295;c=l,l=o,o=(r<<30|r>>>2)&4294967295,r=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function uy(n,e){const t=new hy(n,e);return t.subscribe.bind(t)}class hy{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");dy(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ya),s.error===void 0&&(s.error=ya),s.complete===void 0&&(s.complete=ya);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ya(){}function fo(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,D(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},po=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n){return n&&n._delegate?n._delegate:n}class en{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ks;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(my(e))try{this.getOrInitializeService({instanceIdentifier:vn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=vn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=vn){return this.instances.has(e)}getOptions(e=vn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:_y(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=vn){return this.component?this.component.multipleInstances?e:vn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _y(n){return n===vn?void 0:n}function my(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new py(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const yy={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},vy=K.INFO,Ey={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Ty=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ey[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _o{constructor(e){this.name=e,this._logLevel=vy,this._logHandler=Ty,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?yy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const Iy=(n,e)=>e.some(t=>n instanceof t);let ch,uh;function wy(){return ch||(ch=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ay(){return uh||(uh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kf=new WeakMap,La=new WeakMap,Nf=new WeakMap,va=new WeakMap,bl=new WeakMap;function Cy(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Gt(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&kf.set(t,n)}).catch(()=>{}),bl.set(e,n),e}function Ry(n){if(La.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});La.set(n,e)}let Fa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return La.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Nf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Gt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Sy(n){Fa=n(Fa)}function Py(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Ea(this),e,...t);return Nf.set(i,e.sort?e.sort():[e]),Gt(i)}:Ay().includes(n)?function(...e){return n.apply(Ea(this),e),Gt(kf.get(this))}:function(...e){return Gt(n.apply(Ea(this),e))}}function by(n){return typeof n=="function"?Py(n):(n instanceof IDBTransaction&&Ry(n),Iy(n,wy())?new Proxy(n,Fa):n)}function Gt(n){if(n instanceof IDBRequest)return Cy(n);if(va.has(n))return va.get(n);const e=by(n);return e!==n&&(va.set(n,e),bl.set(e,n)),e}const Ea=n=>bl.get(n);function ky(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),l=Gt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Gt(o.result),c.oldVersion,c.newVersion,Gt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Ny=["get","getKey","getAll","getAllKeys","count"],Dy=["put","add","delete","clear"],Ta=new Map;function hh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ta.get(e))return Ta.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Dy.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ny.includes(t)))return;const r=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return i&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return Ta.set(e,r),r}Sy(n=>({...n,get:(e,t,i)=>hh(e,t)||n.get(e,t,i),has:(e,t)=>!!hh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Vy(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Vy(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ua="@firebase/app",dh="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt=new _o("@firebase/app"),My="@firebase/app-compat",xy="@firebase/analytics-compat",Ly="@firebase/analytics",Fy="@firebase/app-check-compat",Uy="@firebase/app-check",By="@firebase/auth",qy="@firebase/auth-compat",jy="@firebase/database",Wy="@firebase/data-connect",$y="@firebase/database-compat",Hy="@firebase/functions",zy="@firebase/functions-compat",Gy="@firebase/installations",Ky="@firebase/installations-compat",Qy="@firebase/messaging",Yy="@firebase/messaging-compat",Xy="@firebase/performance",Jy="@firebase/performance-compat",Zy="@firebase/remote-config",ev="@firebase/remote-config-compat",tv="@firebase/storage",nv="@firebase/storage-compat",iv="@firebase/firestore",sv="@firebase/ai",rv="@firebase/firestore-compat",ov="firebase",av="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="[DEFAULT]",lv={[Ua]:"fire-core",[My]:"fire-core-compat",[Ly]:"fire-analytics",[xy]:"fire-analytics-compat",[Uy]:"fire-app-check",[Fy]:"fire-app-check-compat",[By]:"fire-auth",[qy]:"fire-auth-compat",[jy]:"fire-rtdb",[Wy]:"fire-data-connect",[$y]:"fire-rtdb-compat",[Hy]:"fire-fn",[zy]:"fire-fn-compat",[Gy]:"fire-iid",[Ky]:"fire-iid-compat",[Qy]:"fire-fcm",[Yy]:"fire-fcm-compat",[Xy]:"fire-perf",[Jy]:"fire-perf-compat",[Zy]:"fire-rc",[ev]:"fire-rc-compat",[tv]:"fire-gcs",[nv]:"fire-gcs-compat",[iv]:"fire-fst",[rv]:"fire-fst-compat",[sv]:"fire-vertex","fire-js":"fire-js",[ov]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Map,cv=new Map,qa=new Map;function fh(n,e){try{n.container.addComponent(e)}catch(t){bt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function An(n){const e=n.name;if(qa.has(e))return bt.debug(`There were multiple attempts to register component ${e}.`),!1;qa.set(e,n);for(const t of Vr.values())fh(t,n);for(const t of cv.values())fh(t,n);return!0}function mo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ge(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new Ns("app","Firebase",uv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new en("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=av;function dv(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Ba,automaticDataCollectionEnabled:!0},e),s=i.name;if(typeof s!="string"||!s)throw Kt.create("bad-app-name",{appName:String(s)});if(t||(t=Cf()),!t)throw Kt.create("no-options");const r=Vr.get(s);if(r){if(Zt(t,r.options)&&Zt(i,r.config))return r;throw Kt.create("duplicate-app",{appName:s})}const o=new gy(s);for(const c of qa.values())o.addComponent(c);const l=new hv(t,i,o);return Vr.set(s,l),l}function kl(n=Ba){const e=Vr.get(n);if(!e&&n===Ba&&Cf())return dv();if(!e)throw Kt.create("no-app",{appName:n});return e}function ct(n,e,t){var i;let s=(i=lv[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${s}" with version "${e}":`];r&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),bt.warn(l.join(" "));return}An(new en(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fv="firebase-heartbeat-database",pv=1,ps="firebase-heartbeat-store";let Ia=null;function Df(){return Ia||(Ia=ky(fv,pv,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ps)}catch(t){console.warn(t)}}}}).catch(n=>{throw Kt.create("idb-open",{originalErrorMessage:n.message})})),Ia}async function _v(n){try{const t=(await Df()).transaction(ps),i=await t.objectStore(ps).get(Of(n));return await t.done,i}catch(e){if(e instanceof Vt)bt.warn(e.message);else{const t=Kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});bt.warn(t.message)}}}async function ph(n,e){try{const i=(await Df()).transaction(ps,"readwrite");await i.objectStore(ps).put(e,Of(n)),await i.done}catch(t){if(t instanceof Vt)bt.warn(t.message);else{const i=Kt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});bt.warn(i.message)}}}function Of(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mv=1024,gv=30;class yv{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ev(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=_h();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>gv){const o=Tv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){bt.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=_h(),{heartbeatsToSend:i,unsentEntries:s}=vv(this._heartbeatsCache.heartbeats),r=Nr(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return bt.warn(t),""}}}function _h(){return new Date().toISOString().substring(0,10)}function vv(n,e=mv){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),mh(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),mh(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Ev{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ny()?iy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _v(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ph(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return ph(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function mh(n){return Nr(JSON.stringify({version:2,heartbeats:n})).length}function Tv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iv(n){An(new en("platform-logger",e=>new Oy(e),"PRIVATE")),An(new en("heartbeat",e=>new yv(e),"PRIVATE")),ct(Ua,dh,n),ct(Ua,dh,"esm2017"),ct("fire-js","")}Iv("");var wv="firebase",Av="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ct(wv,Av,"app");function Nl(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Vf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Cv=Vf,Mf=new Ns("auth","Firebase",Vf());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=new _o("@firebase/auth");function Rv(n,...e){Mr.logLevel<=K.WARN&&Mr.warn(`Auth (${Vn}): ${n}`,...e)}function vr(n,...e){Mr.logLevel<=K.ERROR&&Mr.error(`Auth (${Vn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw Dl(n,...e)}function ut(n,...e){return Dl(n,...e)}function xf(n,e,t){const i=Object.assign(Object.assign({},Cv()),{[e]:t});return new Ns("auth","Firebase",i).create(e,{appName:n.name})}function St(n){return xf(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Dl(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Mf.create(n,...e)}function x(n,e,...t){if(!n)throw Dl(e,...t)}function At(n){const e="INTERNAL ASSERTION FAILED: "+n;throw vr(e),new Error(e)}function kt(n,e){n||At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Sv(){return gh()==="http:"||gh()==="https:"}function gh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Sv()||Jg()||"connection"in navigator)?navigator.onLine:!0}function bv(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t){this.shortDelay=e,this.longDelay=t,kt(t>e,"Short delay should be less than long delay!"),this.isMobile=Pl()||Pf()}get(){return Pv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(n,e){kt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dv=new Ds(3e4,6e4);function Et(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ze(n,e,t,i,s={}){return Ff(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const l=yi(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},r);return Xg()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&hn(n.emulatorConfig.host)&&(h.credentials="include"),Lf.fetch()(await Uf(n,n.config.apiHost,t,l),h)})}async function Ff(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},kv),e);try{const s=new Vv(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw hr(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const l=r.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw hr(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw hr(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw hr(n,"user-disabled",o);const f=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw xf(n,f,h);Je(n,f)}}catch(s){if(s instanceof Vt)throw s;Je(n,"network-request-failed",{message:String(s)})}}async function Os(n,e,t,i,s={}){const r=await Ze(n,e,t,i,s);return"mfaPendingCredential"in r&&Je(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Uf(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Ol(n.config,s):`${n.config.apiScheme}://${s}`;return Nv.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}function Ov(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Vv{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ut(this.auth,"network-request-failed")),Dv.get())})}}function hr(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ut(n,e,i);return s.customData._tokenResponse=t,s}function yh(n){return n!==void 0&&n.enterprise!==void 0}class Mv{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Ov(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function xv(n,e){return Ze(n,"GET","/v2/recaptchaConfig",Et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lv(n,e){return Ze(n,"POST","/v1/accounts:delete",e)}async function xr(n,e){return Ze(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fv(n,e=!1){const t=te(n),i=await t.getIdToken(e),s=Vl(i);x(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:is(wa(s.auth_time)),issuedAtTime:is(wa(s.iat)),expirationTime:is(wa(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function wa(n){return Number(n)*1e3}function Vl(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return vr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Dr(t);return s?JSON.parse(s):(vr("Failed to decode base64 JWT payload"),null)}catch(s){return vr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function vh(n){const e=Vl(n);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Vt&&Uv(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Uv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=is(this.lastLoginAt),this.creationTime=is(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lr(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Cn(n,xr(t,{idToken:i}));x(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Bf(r.providerUserInfo):[],l=jv(n.providerData,o),c=n.isAnonymous,h=!(n.email&&r.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,p={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:l,metadata:new Wa(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function qv(n){const e=te(n);await Lr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jv(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Bf(n){return n.map(e=>{var{providerId:t}=e,i=Nl(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wv(n,e){const t=await Ff(n,{},async()=>{const i=yi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Uf(n,s,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:i};return n.emulatorConfig&&hn(n.emulatorConfig.host)&&(c.credentials="include"),Lf.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function $v(n,e){return Ze(n,"POST","/v2/accounts:revokeToken",Et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):vh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");const t=vh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Wv(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Xn;return i&&(x(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(x(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(x(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xn,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n,e){x(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class nt{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Nl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Bv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Wa(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Cn(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Fv(this,e)}reload(){return qv(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Lr(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(St(this.auth));const e=await this.getIdToken();return await Cn(this,Lv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,l,c,h,f;const p=(i=t.displayName)!==null&&i!==void 0?i:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,T=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,R=(o=t.photoURL)!==null&&o!==void 0?o:void 0,N=(l=t.tenantId)!==null&&l!==void 0?l:void 0,k=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,W=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:$,emailVerified:ae,isAnonymous:Qe,providerData:_e,stsTokenManager:I}=t;x($&&I,e,"internal-error");const g=Xn.fromJSON(this.name,I);x(typeof $=="string",e,"internal-error"),Bt(p,e.name),Bt(m,e.name),x(typeof ae=="boolean",e,"internal-error"),x(typeof Qe=="boolean",e,"internal-error"),Bt(T,e.name),Bt(R,e.name),Bt(N,e.name),Bt(k,e.name),Bt(W,e.name),Bt(B,e.name);const v=new nt({uid:$,auth:e,email:m,emailVerified:ae,displayName:p,isAnonymous:Qe,photoURL:R,phoneNumber:T,tenantId:N,stsTokenManager:g,createdAt:W,lastLoginAt:B});return _e&&Array.isArray(_e)&&(v.providerData=_e.map(E=>Object.assign({},E))),k&&(v._redirectEventId=k),v}static async _fromIdTokenResponse(e,t,i=!1){const s=new Xn;s.updateFromServerResponse(t);const r=new nt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Lr(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];x(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Bf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),l=new Xn;l.updateFromIdToken(i);const c=new nt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Wa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=new Map;function Ct(n){kt(n instanceof Function,"Expected a class definition");let e=Eh.get(n);return e?(kt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Eh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}qf.type="NONE";const Th=qf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(n,e,t){return`firebase:${n}:${e}:${t}`}class Jn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Er(this.userKey,s.apiKey,r),this.fullPersistenceKey=Er("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await xr(this.auth,{idToken:e}).catch(()=>{});return t?nt._fromGetAccountInfoResponse(this.auth,t,e):null}return nt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Jn(Ct(Th),e,i);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let r=s[0]||Ct(Th);const o=Er(i,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const m=await xr(e,{idToken:f}).catch(()=>{});if(!m)break;p=await nt._fromGetAccountInfoResponse(e,m,f)}else p=nt._fromJSON(e,f);h!==r&&(l=p),r=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Jn(r,e,i):(r=c[0],l&&await r._set(o,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==r)try{await h._remove(o)}catch{}})),new Jn(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Hf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gf(e))return"Blackberry";if(Kf(e))return"Webos";if(Wf(e))return"Safari";if((e.includes("chrome/")||$f(e))&&!e.includes("edge/"))return"Chrome";if(zf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function jf(n=Fe()){return/firefox\//i.test(n)}function Wf(n=Fe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $f(n=Fe()){return/crios\//i.test(n)}function Hf(n=Fe()){return/iemobile/i.test(n)}function zf(n=Fe()){return/android/i.test(n)}function Gf(n=Fe()){return/blackberry/i.test(n)}function Kf(n=Fe()){return/webos/i.test(n)}function Ml(n=Fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Hv(n=Fe()){var e;return Ml(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function zv(){return Zg()&&document.documentMode===10}function Qf(n=Fe()){return Ml(n)||zf(n)||Kf(n)||Gf(n)||/windows phone/i.test(n)||Hf(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yf(n,e=[]){let t;switch(n){case"Browser":t=Ih(Fe());break;case"Worker":t=`${Ih(Fe())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vn}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,l)=>{try{const c=e(r);o(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kv(n,e={}){return Ze(n,"GET","/v2/passwordPolicy",Et(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qv=6;class Yv{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Qv,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsUppercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new wh(this),this.idTokenSubscription=new wh(this),this.beforeStateQueue=new Gv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Mf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ct(t)),this._initializationPromise=this.queue(async()=>{var i,s,r;if(!this._deleted&&(this.persistenceManager=await Jn.create(this,e),(i=this._resolvePersistenceManagerAvailable)===null||i===void 0||i.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await xr(this,{idToken:e}),i=await nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ge(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Lr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=bv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(St(this));const t=e?te(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(St(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(St(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Kv(this),t=new Yv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ns("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await $v(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ct(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await Jn.create(this,[Ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(l,this,"internal-error"),l.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Rv(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Mt(n){return te(n)}class wh{constructor(e){this.auth=e,this.observer=null,this.addObserver=uy(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let go={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Jv(n){go=n}function Xf(n){return go.loadJS(n)}function Zv(){return go.recaptchaEnterpriseScript}function eE(){return go.gapiScript}function tE(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class nE{constructor(){this.enterprise=new iE}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class iE{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const sE="recaptcha-enterprise",Jf="NO_RECAPTCHA";class rE{constructor(e){this.type=sE,this.auth=Mt(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,l)=>{xv(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new Mv(c);return r.tenantId==null?r._agentRecaptchaConfig=h:r._tenantRecaptchaConfigs[r.tenantId]=h,o(h.siteKey)}}).catch(c=>{l(c)})})}function s(r,o,l){const c=window.grecaptcha;yh(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:e}).then(h=>{o(h)}).catch(()=>{o(Jf)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new nE().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{i(this.auth).then(l=>{if(!t&&yh(window.grecaptcha))s(l,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Zv();c.length!==0&&(c+=l),Xf(c).then(()=>{s(l,r,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function Ah(n,e,t,i=!1,s=!1){const r=new rE(n);let o;if(s)o=Jf;else try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const l=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,h=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return i?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Fr(n,e,t,i,s){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ah(n,e,t,t==="getOobCode");return i(n,o)}else return i(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Ah(n,e,t,t==="getOobCode");return i(n,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(n,e){const t=mo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Zt(r,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function aE(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ct);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function lE(n,e,t){const i=Mt(n);x(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Zf(e),{host:o,port:l}=cE(e),c=l===null?"":`:${l}`,h={url:`${r}//${o}${c}/`},f=Object.freeze({host:o,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){x(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),x(Zt(h,i.config.emulator)&&Zt(f,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=h,i.emulatorConfig=f,i.settings.appVerificationDisabledForTesting=!0,hn(o)?(Rl(`${r}//${o}${c}`),Sl("Auth",!0)):uE()}function Zf(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function cE(n){const e=Zf(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Ch(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Ch(o)}}}function Ch(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function uE(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,t){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ep(n,e){return Ze(n,"POST","/v1/accounts:resetPassword",Et(n,e))}async function hE(n,e){return Ze(n,"POST","/v1/accounts:update",e)}async function dE(n,e){return Ze(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fE(n,e){return Os(n,"POST","/v1/accounts:signInWithPassword",Et(n,e))}async function pE(n,e){return Ze(n,"POST","/v1/accounts:sendOobCode",Et(n,e))}async function _E(n,e){return pE(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mE(n,e){return Os(n,"POST","/v1/accounts:signInWithEmailLink",Et(n,e))}async function gE(n,e){return Os(n,"POST","/v1/accounts:signInWithEmailLink",Et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends xl{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new _s(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new _s(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fr(e,t,"signInWithPassword",fE);case"emailLink":return mE(e,{email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fr(e,i,"signUpPassword",dE);case"emailLink":return gE(e,{idToken:t,email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zn(n,e){return Os(n,"POST","/v1/accounts:signInWithIdp",Et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE="http://localhost";class Rn extends xl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Rn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Nl(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new Rn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Zn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Zn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zn(e,t)}buildRequest(){const e={requestUri:yE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=yi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vE(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function EE(n){const e=Qi(Yi(n)).link,t=e?Qi(Yi(e)).deep_link_id:null,i=Qi(Yi(n)).deep_link_id;return(i?Qi(Yi(i)).link:null)||i||t||e||n}class Ll{constructor(e){var t,i,s,r,o,l;const c=Qi(Yi(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(i=c.oobCode)!==null&&i!==void 0?i:null,p=vE((s=c.mode)!==null&&s!==void 0?s:null);x(h&&f&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=f,this.continueUrl=(r=c.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=c.lang)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=EE(e);try{return new Ll(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(){this.providerId=vi.PROVIDER_ID}static credential(e,t){return _s._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Ll.parseLink(t);return x(i,"argument-error"),_s._fromEmailAndCode(e,i.code,i.tenantId)}}vi.PROVIDER_ID="password";vi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";vi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs extends tp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Vs{constructor(){super("facebook.com")}static credential(e){return Rn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Vs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Rn._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return jt.credential(t,i)}catch{return null}}}jt.GOOGLE_SIGN_IN_METHOD="google.com";jt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends Vs{constructor(){super("github.com")}static credential(e){return Rn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.GITHUB_SIGN_IN_METHOD="github.com";Wt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends Vs{constructor(){super("twitter.com")}static credential(e,t){return Rn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return $t.credential(t,i)}catch{return null}}}$t.TWITTER_SIGN_IN_METHOD="twitter.com";$t.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TE(n,e){return Os(n,"POST","/v1/accounts:signUp",Et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await nt._fromIdTokenResponse(e,i,s),o=Rh(i);return new Sn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Rh(i);return new Sn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Rh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends Vt{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Ur.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Ur(e,t,i,s)}}function np(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Ur._fromErrorAndOperation(n,r,e,i):r})}async function IE(n,e,t=!1){const i=await Cn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Sn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ip(n,e,t=!1){const{auth:i}=n;if(Ge(i.app))return Promise.reject(St(i));const s="reauthenticate";try{const r=await Cn(n,np(i,s,e,n),t);x(r.idToken,i,"internal-error");const o=Vl(r.idToken);x(o,i,"internal-error");const{sub:l}=o;return x(n.uid===l,i,"user-mismatch"),Sn._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Je(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sp(n,e,t=!1){if(Ge(n.app))return Promise.reject(St(n));const i="signIn",s=await np(n,i,e),r=await Sn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function wE(n,e){return sp(Mt(n),e)}async function lP(n,e){return ip(te(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Ul._fromServerResponse(e,t):"totpInfo"in t?Bl._fromServerResponse(e,t):Je(e,"internal-error")}}class Ul extends Fl{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Ul(t)}}class Bl extends Fl{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new Bl(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(n,e,t){var i;x(((i=t.url)===null||i===void 0?void 0:i.length)>0,n,"invalid-continue-uri"),x(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),x(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(x(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(x(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ql(n){const e=Mt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function cP(n,e,t){const i=Mt(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&AE(i,s,t),await Fr(i,s,"getOobCode",_E)}async function uP(n,e,t){await ep(te(n),{oobCode:e,newPassword:t}).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&ql(n),i})}async function CE(n,e){const t=te(n),i=await ep(t,{oobCode:e}),s=i.requestType;switch(x(s,t,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":x(i.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":x(i.mfaInfo,t,"internal-error");default:x(i.email,t,"internal-error")}let r=null;return i.mfaInfo&&(r=Fl._fromServerResponse(Mt(t),i.mfaInfo)),{data:{email:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.newEmail:i.email)||null,previousEmail:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.email:i.newEmail)||null,multiFactorInfo:r},operation:s}}async function hP(n,e){const{data:t}=await CE(te(n),e);return t.email}async function dP(n,e,t){if(Ge(n.app))return Promise.reject(St(n));const i=Mt(n),o=await Fr(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",TE).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&ql(n),c}),l=await Sn._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(l.user),l}function fP(n,e,t){return Ge(n.app)?Promise.reject(St(n)):wE(te(n),vi.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&ql(n),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RE(n,e){return Ze(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pP(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=te(n),r={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Cn(i,RE(i.auth,r));i.displayName=o.displayName||null,i.photoURL=o.photoUrl||null;const l=i.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=i.displayName,l.photoURL=i.photoURL),await i._updateTokensIfNecessary(o)}function _P(n,e){return SE(te(n),null,e)}async function SE(n,e,t){const{auth:i}=n,r={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(r.password=t);const o=await Cn(n,hE(i,r));await n._updateTokensIfNecessary(o,!0)}function PE(n,e,t,i){return te(n).onIdTokenChanged(e,t,i)}function bE(n,e,t){return te(n).beforeAuthStateChanged(e,t)}function mP(n,e,t,i){return te(n).onAuthStateChanged(e,t,i)}function gP(n){return te(n).signOut()}const Br="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Br,"1"),this.storage.removeItem(Br),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE=1e3,NE=10;class op extends rp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Qf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);zv()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,NE):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},kE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}op.type="LOCAL";const DE=op;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap extends rp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ap.type="SESSION";const lp=ap;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OE(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new yo(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(o).map(async h=>h(t.origin,r)),c=await OE(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((l,c)=>{const h=jl("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(m.data.response);break;default:clearTimeout(f),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return window}function ME(n){ht().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(){return typeof ht().WorkerGlobalScope<"u"&&typeof ht().importScripts=="function"}async function xE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function LE(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function FE(){return cp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const up="firebaseLocalStorageDb",UE=1,qr="firebaseLocalStorage",hp="fbase_key";class Ms{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vo(n,e){return n.transaction([qr],e?"readwrite":"readonly").objectStore(qr)}function BE(){const n=indexedDB.deleteDatabase(up);return new Ms(n).toPromise()}function $a(){const n=indexedDB.open(up,UE);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(qr,{keyPath:hp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(qr)?e(i):(i.close(),await BE(),e(await $a()))})})}async function Sh(n,e,t){const i=vo(n,!0).put({[hp]:e,value:t});return new Ms(i).toPromise()}async function qE(n,e){const t=vo(n,!1).get(e),i=await new Ms(t).toPromise();return i===void 0?null:i.value}function Ph(n,e){const t=vo(n,!0).delete(e);return new Ms(t).toPromise()}const jE=800,WE=3;class dp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $a(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>WE)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yo._getInstance(FE()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await xE(),!this.activeServiceWorker)return;this.sender=new VE(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||LE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $a();return await Sh(e,Br,"1"),await Ph(e,Br),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Sh(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>qE(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ph(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=vo(s,!1).getAll();return new Ms(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),jE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dp.type="LOCAL";const $E=dp;new Ds(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(n,e){return e?Ct(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl extends xl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zE(n){return sp(n.auth,new Wl(n),n.bypassAuthState)}function GE(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),ip(t,new Wl(n),n.bypassAuthState)}async function KE(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),IE(t,new Wl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zE;case"linkViaPopup":case"linkViaRedirect":return KE;case"reauthViaPopup":case"reauthViaRedirect":return GE;default:Je(this.auth,"internal-error")}}resolve(e){kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QE=new Ds(2e3,1e4);class Qn extends fp{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Qn.currentPopupAction&&Qn.currentPopupAction.cancel(),Qn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){kt(this.filter.length===1,"Popup operations only handle one event");const e=jl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,QE.get())};e()}}Qn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YE="pendingRedirect",Tr=new Map;class XE extends fp{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Tr.get(this.auth._key());if(!e){try{const i=await JE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Tr.set(this.auth._key(),e)}return this.bypassAuthState||Tr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function JE(n,e){const t=tT(e),i=eT(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function ZE(n,e){Tr.set(n._key(),e)}function eT(n){return Ct(n._redirectPersistence)}function tT(n){return Er(YE,n.config.apiKey,n.name)}async function nT(n,e,t=!1){if(Ge(n.app))return Promise.reject(St(n));const i=Mt(n),s=HE(i,e),o=await new XE(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iT=10*60*1e3;class sT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!rT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!pp(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(ut(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=iT&&this.cachedEventUids.clear(),this.cachedEventUids.has(bh(e))}saveEventToCache(e){this.cachedEventUids.add(bh(e)),this.lastProcessedEventTime=Date.now()}}function bh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function pp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function rT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oT(n,e={}){return Ze(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lT=/^https?/;async function cT(n){if(n.config.emulator)return;const{authorizedDomains:e}=await oT(n);for(const t of e)try{if(uT(t))return}catch{}Je(n,"unauthorized-domain")}function uT(n){const e=ja(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!lT.test(t))return!1;if(aT.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT=new Ds(3e4,6e4);function kh(){const n=ht().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function dT(n){return new Promise((e,t)=>{var i,s,r;function o(){kh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{kh(),t(ut(n,"network-request-failed"))},timeout:hT.get()})}if(!((s=(i=ht().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=ht().gapi)===null||r===void 0)&&r.load)o();else{const l=tE("iframefcb");return ht()[l]=()=>{gapi.load?o():t(ut(n,"network-request-failed"))},Xf(`${eE()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Ir=null,e})}let Ir=null;function fT(n){return Ir=Ir||dT(n),Ir}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=new Ds(5e3,15e3),_T="__/auth/iframe",mT="emulator/auth/iframe",gT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},yT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vT(n){const e=n.config;x(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ol(e,mT):`https://${n.config.authDomain}/${_T}`,i={apiKey:e.apiKey,appName:n.name,v:Vn},s=yT.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${yi(i).slice(1)}`}async function ET(n){const e=await fT(n),t=ht().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:vT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gT,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ut(n,"network-request-failed"),l=ht().setTimeout(()=>{r(o)},pT.get());function c(){ht().clearTimeout(l),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},IT=500,wT=600,AT="_blank",CT="http://localhost";class Nh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function RT(n,e,t,i=IT,s=wT){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c=Object.assign(Object.assign({},TT),{width:i.toString(),height:s.toString(),top:r,left:o}),h=Fe().toLowerCase();t&&(l=$f(h)?AT:t),jf(h)&&(e=e||CT,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[T,R])=>`${m}${T}=${R},`,"");if(Hv(h)&&l!=="_self")return ST(e||"",l),new Nh(null);const p=window.open(e||"",l,f);x(p,n,"popup-blocked");try{p.focus()}catch{}return new Nh(p)}function ST(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PT="__/auth/handler",bT="emulator/auth/handler",kT=encodeURIComponent("fac");async function Dh(n,e,t,i,s,r){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Vn,eventId:s};if(e instanceof tp){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",xa(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Vs){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${kT}=${encodeURIComponent(c)}`:"";return`${NT(n)}?${yi(l).slice(1)}${h}`}function NT({config:n}){return n.emulator?Ol(n,bT):`https://${n.authDomain}/${PT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa="webStorageSupport";class DT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lp,this._completeRedirectFn=nT,this._overrideRedirectResult=ZE}async _openPopup(e,t,i,s){var r;kt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Dh(e,t,i,ja(),s);return RT(e,o,jl())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Dh(e,t,i,ja(),s);return ME(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(kt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await ET(e),i=new sT(e);return t.register("authEvent",s=>(x(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Aa,{type:Aa},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Aa];o!==void 0&&t(!!o),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=cT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Qf()||Wf()||Ml()}}const OT=DT;var Oh="@firebase/auth",Vh="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MT(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function xT(n){An(new en("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;x(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yf(n)},h=new Xv(i,s,r,c);return aE(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),An(new en("auth-internal",e=>{const t=Mt(e.getProvider("auth").getImmediate());return(i=>new VT(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ct(Oh,Vh,MT(n)),ct(Oh,Vh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT=5*60,FT=Rf("authIdTokenMaxAge")||LT;let Mh=null;const UT=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>FT)return;const s=t==null?void 0:t.token;Mh!==s&&(Mh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function yP(n=kl()){const e=mo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=oE(n,{popupRedirectResolver:OT,persistence:[$E,DE,lp]}),i=Rf("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=UT(r.toString());bE(t,o,()=>o(t.currentUser)),PE(t,l=>o(l))}}const s=wf("auth");return s&&lE(t,`http://${s}`),t}function BT(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Jv({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ut("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",BT().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});xT("Browser");var xh={};const Lh="@firebase/database",Fh="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _p="";function qT(n){_p=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ae(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:fs(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return vt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new jT(e)}}catch{}return new WT},Tn=mp("localStorage"),$T=mp("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=new _o("@firebase/database"),HT=function(){let n=1;return function(){return n++}}(),gp=function(n){const e=fy(n),t=new cy;t.update(e);const i=t.digest();return Cl.encodeByteArray(i)},xs=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=xs.apply(null,i):typeof i=="object"?e+=Ae(i):e+=i,e+=" "}return e};let ss=null,Uh=!0;const zT=function(n,e){D(!0,"Can't turn on custom loggers persistently."),ei.logLevel=K.VERBOSE,ss=ei.log.bind(ei)},Se=function(...n){if(Uh===!0&&(Uh=!1,ss===null&&$T.get("logging_enabled")===!0&&zT()),ss){const e=xs.apply(null,n);ss(e)}},Ls=function(n){return function(...e){Se(n,...e)}},Ha=function(...n){const e="FIREBASE INTERNAL ERROR: "+xs(...n);ei.error(e)},Nt=function(...n){const e=`FIREBASE FATAL ERROR: ${xs(...n)}`;throw ei.error(e),new Error(e)},qe=function(...n){const e="FIREBASE WARNING: "+xs(...n);ei.warn(e)},GT=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&qe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},$l=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},KT=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},oi="[MIN_NAME]",Pn="[MAX_NAME]",Mn=function(n,e){if(n===e)return 0;if(n===oi||e===Pn)return-1;if(e===oi||n===Pn)return 1;{const t=Bh(n),i=Bh(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},QT=function(n,e){return n===e?0:n<e?-1:1},Hi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Ae(e))},Hl=function(n){if(typeof n!="object"||n===null)return Ae(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Ae(e[i]),t+=":",t+=Hl(n[e[i]]);return t+="}",t},yp=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function be(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const vp=function(n){D(!$l(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,l,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,o=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const h=[];for(c=t;c;c-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(s?1:0),h.reverse();const f=h.join("");let p="";for(c=0;c<64;c+=8){let m=parseInt(f.substr(c,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},YT=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},XT=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function JT(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const ZT=new RegExp("^-?(0*)\\d{1,10}$"),eI=-2147483648,tI=2147483647,Bh=function(n){if(ZT.test(n)){const e=Number(n);if(e>=eI&&e<=tI)return e}return null},Ei=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw qe("Exception was thrown by user callback.",t),e},Math.floor(0))}},nI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},rs=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ge(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){qe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',qe(e)}}class wr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}wr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl="5",Ep="v",Tp="s",Ip="r",wp="f",Ap=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Cp="ls",Rp="p",za="ac",Sp="websocket",Pp="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,t,i,s,r=!1,o="",l=!1,c=!1,h=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this.emulatorOptions=h,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Tn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Tn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function rI(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function kp(n,e,t){D(typeof e=="string","typeof type must == string"),D(typeof t=="object","typeof params must == object");let i;if(e===Sp)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Pp)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);rI(n)&&(t.ns=n.namespace);const s=[];return be(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(){this.counters_={}}incrementCounter(e,t=1){vt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return jg(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca={},Ra={};function Gl(n){const e=n.toString();return Ca[e]||(Ca[e]=new oI),Ca[e]}function aI(n,e){const t=n.toString();return Ra[t]||(Ra[t]=e()),Ra[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ei(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh="start",cI="close",uI="pLPCommand",hI="pRTLPCB",Np="id",Dp="pw",Op="ser",dI="cb",fI="seg",pI="ts",_I="d",mI="dframe",Vp=1870,Mp=30,gI=Vp-Mp,yI=25e3,vI=3e4;class Yn{constructor(e,t,i,s,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ls(e),this.stats_=Gl(t),this.urlFn=c=>(this.appCheckToken&&(c[za]=this.appCheckToken),kp(t,Pp,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new lI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(vI)),KT(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Kl((...r)=>{const[o,l,c,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===qh)this.id=l,this.password=c;else if(o===cI)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[qh]="t",i[Op]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[dI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ep]=zl,this.transportSessionId&&(i[Tp]=this.transportSessionId),this.lastSessionId&&(i[Cp]=this.lastSessionId),this.applicationId&&(i[Rp]=this.applicationId),this.appCheckToken&&(i[za]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ap.test(location.hostname)&&(i[Ip]=wp);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Yn.forceAllow_=!0}static forceDisallow(){Yn.forceDisallow_=!0}static isAvailable(){return Yn.forceAllow_?!0:!Yn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!YT()&&!XT()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Ae(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Tf(t),s=yp(i,gI);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[mI]="t",i[Np]=e,i[Dp]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Ae(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Kl{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=HT(),window[uI+this.uniqueCallbackIdentifier]=e,window[hI+this.uniqueCallbackIdentifier]=t,this.myIFrame=Kl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Se("frame writing exception"),l.stack&&Se(l.stack),Se(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Se("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Np]=this.myID,e[Dp]=this.myPW,e[Op]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Mp+i.length<=Vp;){const o=this.pendingSegs.shift();i=i+"&"+fI+s+"="+o.seg+"&"+pI+s+"="+o.ts+"&"+_I+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(yI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const EI=16384,TI=45e3;let jr=null;typeof MozWebSocket<"u"?jr=MozWebSocket:typeof WebSocket<"u"&&(jr=WebSocket);class tt{constructor(e,t,i,s,r,o,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ls(this.connId),this.stats_=Gl(t),this.connURL=tt.connectionURL_(t,o,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Ep]=zl,typeof location<"u"&&location.hostname&&Ap.test(location.hostname)&&(o[Ip]=wp),t&&(o[Tp]=t),i&&(o[Cp]=i),s&&(o[za]=s),r&&(o[Rp]=r),kp(e,Sp,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Tn.set("previous_websocket_failure",!0);try{let i;ey(),this.mySock=new jr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){tt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&jr!==null&&!tt.forceDisallow_}static previouslyFailed(){return Tn.isInMemoryStorage||Tn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Tn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=fs(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Ae(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=yp(t,EI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(TI))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}tt.responsesRequiredToBeHealthy=2;tt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{static get ALL_TRANSPORTS(){return[Yn,tt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=tt&&tt.isAvailable();let i=t&&!tt.previouslyFailed();if(e.webSocketOnly&&(t||qe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[tt];else{const s=this.transports_=[];for(const r of ms.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ms.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ms.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II=6e4,wI=5e3,AI=10*1024,CI=100*1024,Sa="t",jh="d",RI="s",Wh="r",SI="e",$h="o",Hh="a",zh="n",Gh="p",PI="h";class bI{constructor(e,t,i,s,r,o,l,c,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ls("c:"+this.id+":"),this.transportManager_=new ms(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=rs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>CI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>AI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Sa in e){const t=e[Sa];t===Hh?this.upgradeIfSecondaryHealthy_():t===Wh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===$h&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Hi("t",e),i=Hi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Gh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Hh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:zh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Hi("t",e),i=Hi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Hi(Sa,e);if(jh in e){const i=e[jh];if(t===PI){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===zh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===RI?this.onConnectionShutdown_(i):t===Wh?this.onReset_(i):t===SI?Ha("Server Error: "+i):t===$h?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ha("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),zl!==i&&qe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),rs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(II))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):rs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(wI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Gh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Tn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){D(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr extends Lp{static getInstance(){return new Wr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Pl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=32,Qh=768;class ne{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function Z(){return new ne("")}function z(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function tn(n){return n.pieces_.length-n.pieceNum_}function re(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new ne(n.pieces_,e)}function Ql(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function kI(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function gs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Fp(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new ne(e,0)}function de(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof ne)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new ne(t,0)}function Q(n){return n.pieceNum_>=n.pieces_.length}function $e(n,e){const t=z(n),i=z(e);if(t===null)return e;if(t===i)return $e(re(n),re(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function NI(n,e){const t=gs(n,0),i=gs(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Mn(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Yl(n,e){if(tn(n)!==tn(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Xe(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(tn(n)>tn(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class DI{constructor(e,t){this.errorPrefix_=t,this.parts_=gs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=po(this.parts_[i]);Up(this)}}function OI(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=po(e),Up(n)}function VI(n){const e=n.parts_.pop();n.byteLength_-=po(e),n.parts_.length>0&&(n.byteLength_-=1)}function Up(n){if(n.byteLength_>Qh)throw new Error(n.errorPrefix_+"has a key path longer than "+Qh+" bytes ("+n.byteLength_+").");if(n.parts_.length>Kh)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Kh+") or object contains a cycle "+En(n))}function En(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl extends Lp{static getInstance(){return new Xl}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=1e3,MI=60*5*1e3,Yh=30*1e3,xI=1.3,LI=3e4,FI="server_kill",Xh=3;class Pt extends xp{constructor(e,t,i,s,r,o,l,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=Pt.nextPersistentConnectionId_++,this.log_=Ls("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=zi,this.maxReconnectDelay_=MI,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Xl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Wr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Ae(r)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ks,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const c=l.d,h=l.s;Pt.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&vt(e,"w")){const i=ri(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();qe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ly(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Yh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ay(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ae(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ha("Unrecognized action received from server: "+Ae(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=zi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=zi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>LI&&(this.reconnectDelay_=zi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*xI)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Pt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const c=function(){l?l.close():(o=!0,i())},h=function(p){D(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:c,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Se("getToken() completed but was canceled"):(Se("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,l=new bI(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,T=>{qe(T+" ("+this.repoInfo_.toString()+")"),this.interrupt(FI)},r))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&qe(p),c())}}}interrupt(e){Se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],xa(this.interruptReasons_)&&(this.reconnectDelay_=zi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Hl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new ne(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Se("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Xh&&(this.reconnectDelay_=Yh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Se("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Xh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+_p.replace(/\./g,"-")]=1,Pl()?e["framework.cordova"]=1:Pf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Wr.getInstance().currentlyOnline();return xa(this.interruptReasons_)&&e}}Pt.nextPersistentConnectionId_=0;Pt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new G(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new G(oi,e),s=new G(oi,t);return this.compare(i,s)!==0}minPost(){return G.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dr;class Bp extends Eo{static get __EMPTY_NODE(){return dr}static set __EMPTY_NODE(e){dr=e}compare(e,t){return Mn(e.name,t.name)}isDefinedOn(e){throw gi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return G.MIN}maxPost(){return new G(Pn,dr)}makePost(e,t){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new G(e,dr)}toString(){return".key"}}const ti=new Bp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fr=class{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},ze=class Xi{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Xi.RED,this.left=s??lt.EMPTY_NODE,this.right=r??lt.EMPTY_NODE}copy(e,t,i,s,r){return new Xi(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return lt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return lt.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Xi.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Xi.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}};ze.RED=!0;ze.BLACK=!1;class UI{copy(e,t,i,s,r){return this}insert(e,t,i){return new ze(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}let lt=class Ar{constructor(e,t=Ar.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Ar(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ze.BLACK,null,null))}remove(e){return new Ar(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ze.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new fr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new fr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new fr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new fr(this.root_,null,this.comparator_,!0,e)}};lt.EMPTY_NODE=new UI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(n,e){return Mn(n.name,e.name)}function Jl(n,e){return Mn(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ga;function qI(n){Ga=n}const qp=function(n){return typeof n=="number"?"number:"+vp(n):"string:"+n},jp=function(n){if(n.isLeafNode()){const e=n.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&vt(e,".sv"),"Priority must be a string or number.")}else D(n===Ga||n.isEmpty(),"priority of unexpected type.");D(n===Ga||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jh;class Te{static set __childrenNodeConstructor(e){Jh=e}static get __childrenNodeConstructor(){return Jh}constructor(e,t=Te.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),jp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Te(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Q(e)?this:z(e)===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Te.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=z(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(D(i!==".priority"||tn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Te.__childrenNodeConstructor.EMPTY_NODE.updateChild(re(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+qp(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=vp(this.value_):e+=this.value_,this.lazyHash_=gp(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Te.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Te.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Te.VALUE_TYPE_ORDER.indexOf(t),r=Te.VALUE_TYPE_ORDER.indexOf(i);return D(s>=0,"Unknown leaf type: "+t),D(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Te.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wp,$p;function jI(n){Wp=n}function WI(n){$p=n}class $I extends Eo{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Mn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return G.MIN}maxPost(){return new G(Pn,new Te("[PRIORITY-POST]",$p))}makePost(e,t){const i=Wp(e);return new G(t,new Te("[PRIORITY-POST]",i))}toString(){return".priority"}}const fe=new $I;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI=Math.log(2);class zI{constructor(e){const t=r=>parseInt(Math.log(r)/HI,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $r=function(n,e,t,i){n.sort(e);const s=function(c,h){const f=h-c;let p,m;if(f===0)return null;if(f===1)return p=n[c],m=t?t(p):p,new ze(m,p.node,ze.BLACK,null,null);{const T=parseInt(f/2,10)+c,R=s(c,T),N=s(T+1,h);return p=n[T],m=t?t(p):p,new ze(m,p.node,ze.BLACK,R,N)}},r=function(c){let h=null,f=null,p=n.length;const m=function(R,N){const k=p-R,W=p;p-=R;const B=s(k+1,W),$=n[k],ae=t?t($):$;T(new ze(ae,$.node,N,null,B))},T=function(R){h?(h.left=R,h=R):(f=R,h=R)};for(let R=0;R<c.count;++R){const N=c.nextBitIsOne(),k=Math.pow(2,c.count-(R+1));N?m(k,ze.BLACK):(m(k,ze.BLACK),m(k,ze.RED))}return f},o=new zI(n.length),l=r(o);return new lt(i||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pa;const $n={};class Rt{static get Default(){return D($n&&fe,"ChildrenNode.ts has not been loaded"),Pa=Pa||new Rt({".priority":$n},{".priority":fe}),Pa}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ri(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof lt?t:null}hasIndex(e){return vt(this.indexSet_,e.toString())}addIndex(e,t){D(e!==ti,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(G.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let l;s?l=$r(i,e.getCompare()):l=$n;const c=e.toString(),h=Object.assign({},this.indexSet_);h[c]=e;const f=Object.assign({},this.indexes_);return f[c]=l,new Rt(f,h)}addToIndexes(e,t){const i=Or(this.indexes_,(s,r)=>{const o=ri(this.indexSet_,r);if(D(o,"Missing index implementation for "+r),s===$n)if(o.isDefinedOn(e.node)){const l=[],c=t.getIterator(G.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&l.push(h),h=c.getNext();return l.push(e),$r(l,o.getCompare())}else return $n;else{const l=t.get(e.name);let c=s;return l&&(c=c.remove(new G(e.name,l))),c.insert(e,e.node)}});return new Rt(i,this.indexSet_)}removeFromIndexes(e,t){const i=Or(this.indexes_,s=>{if(s===$n)return s;{const r=t.get(e.name);return r?s.remove(new G(e.name,r)):s}});return new Rt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gi;class U{static get EMPTY_NODE(){return Gi||(Gi=new U(new lt(Jl),null,Rt.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&jp(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Gi}updatePriority(e){return this.children_.isEmpty()?this:new U(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Gi:t}}getChild(e){const t=z(e);return t===null?this:this.getImmediateChild(t).getChild(re(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(D(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new G(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Gi:this.priorityNode_;return new U(s,o,r)}}updateChild(e,t){const i=z(e);if(i===null)return t;{D(z(e)!==".priority"||tn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(re(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(fe,(o,l)=>{t[o]=l.val(e),i++,r&&U.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+qp(this.getPriority().val())+":"),this.forEachChild(fe,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":gp(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new G(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new G(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new G(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,G.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,G.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Fs?-1:0}withIndex(e){if(e===ti||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new U(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ti||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(fe),s=t.getIterator(fe);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ti?null:this.indexMap_.get(e.toString())}}U.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class GI extends U{constructor(){super(new lt(Jl),U.EMPTY_NODE,Rt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return U.EMPTY_NODE}isEmpty(){return!1}}const Fs=new GI;Object.defineProperties(G,{MIN:{value:new G(oi,U.EMPTY_NODE)},MAX:{value:new G(Pn,Fs)}});Bp.__EMPTY_NODE=U.EMPTY_NODE;Te.__childrenNodeConstructor=U;qI(Fs);WI(Fs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KI=!0;function we(n,e=null){if(n===null)return U.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Te(t,we(e))}if(!(n instanceof Array)&&KI){const t=[];let i=!1;if(be(n,(o,l)=>{if(o.substring(0,1)!=="."){const c=we(l);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new G(o,c)))}}),t.length===0)return U.EMPTY_NODE;const r=$r(t,BI,o=>o.name,Jl);if(i){const o=$r(t,fe.getCompare());return new U(r,we(e),new Rt({".priority":o},{".priority":fe}))}else return new U(r,we(e),Rt.Default)}else{let t=U.EMPTY_NODE;return be(n,(i,s)=>{if(vt(n,i)&&i.substring(0,1)!=="."){const r=we(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(we(e))}}jI(we);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI extends Eo{constructor(e){super(),this.indexPath_=e,D(!Q(e)&&z(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Mn(e.name,t.name):r}makePost(e,t){const i=we(e),s=U.EMPTY_NODE.updateChild(this.indexPath_,i);return new G(t,s)}maxPost(){const e=U.EMPTY_NODE.updateChild(this.indexPath_,Fs);return new G(Pn,e)}toString(){return gs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI extends Eo{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Mn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return G.MIN}maxPost(){return G.MAX}makePost(e,t){const i=we(e);return new G(t,i)}toString(){return".value"}}const XI=new YI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n){return{type:"value",snapshotNode:n}}function ai(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ys(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function vs(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function JI(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(ys(t,l)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(ai(t,i)):o.trackChildChange(vs(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(fe,(s,r)=>{t.hasChild(s)||i.trackChildChange(ys(s,r))}),t.isLeafNode()||t.forEachChild(fe,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(vs(s,r,o))}else i.trackChildChange(ai(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?U.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e){this.indexedFilter_=new Zl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Es.getStartPost_(e),this.endPost_=Es.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new G(t,i))||(i=U.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=U.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(U.EMPTY_NODE);const r=this;return t.forEachChild(fe,(o,l)=>{r.matches(new G(o,l))||(s=s.updateImmediateChild(o,U.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Es(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new G(t,i))||(i=U.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=U.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=U.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(U.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,U.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,T)=>p(T,m)}else o=this.index_.getCompare();const l=e;D(l.numChildren()===this.limit_,"");const c=new G(t,i),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(c);if(l.hasChild(t)){const p=l.getImmediateChild(t);let m=s.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const T=m==null?1:o(m,c);if(f&&!i.isEmpty()&&T>=0)return r!=null&&r.trackChildChange(vs(t,i,p)),l.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(ys(t,p));const N=l.updateImmediateChild(t,U.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(ai(m.name,m.node)),N.updateImmediateChild(m.name,m.node)):N}}else return i.isEmpty()?e:f&&o(h,c)>=0?(r!=null&&(r.trackChildChange(ys(h.name,h.node)),r.trackChildChange(ai(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(h.name,U.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=fe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:oi}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Pn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===fe}copy(){const e=new ec;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ew(n){return n.loadsAllData()?new Zl(n.getIndex()):n.hasLimit()?new ZI(n):new Es(n)}function Zh(n){const e={};if(n.isDefault())return e;let t;if(n.index_===fe?t="$priority":n.index_===XI?t="$value":n.index_===ti?t="$key":(D(n.index_ instanceof QI,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Ae(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Ae(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Ae(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Ae(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Ae(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function ed(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==fe&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr extends xp{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ls("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Hr.getListenId_(e,i),l={};this.listens_[o]=l;const c=Zh(e._queryParams);this.restRequest_(r+".json",c,(h,f)=>{let p=f;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(r,p,!1,i),ri(this.listens_,o)===l){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",s(m,null)}})}unlisten(e,t){const i=Hr.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Zh(e._queryParams),i=e._path.toString(),s=new ks;return this.restRequest_(i+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+yi(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=fs(l.responseText)}catch{qe("Failed to parse JSON response for "+o+": "+l.responseText)}i(null,c)}else l.status!==401&&l.status!==404&&qe("Got unsuccessful REST response for "+o+" Status: "+l.status),i(l.status);i=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(){this.rootNode_=U.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(){return{value:null,children:new Map}}function zp(n,e,t){if(Q(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=z(e);n.children.has(i)||n.children.set(i,zr());const s=n.children.get(i);e=re(e),zp(s,e,t)}}function Ka(n,e,t){n.value!==null?t(e,n.value):nw(n,(i,s)=>{const r=new ne(e.toString()+"/"+i);Ka(s,r,t)})}function nw(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&be(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td=10*1e3,sw=30*1e3,rw=5*60*1e3;class ow{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new iw(e);const i=td+(sw-td)*Math.random();rs(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;be(e,(s,r)=>{r>0&&vt(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),rs(this.reportStats_.bind(this),Math.floor(Math.random()*2*rw))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(it||(it={}));function tc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function nc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ic(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=it.ACK_USER_WRITE,this.source=tc()}operationForChild(e){if(Q(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ne(e));return new Gr(Z(),t,this.revert)}}else return D(z(this.path)===e,"operationForChild called for unrelated child."),new Gr(re(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t){this.source=e,this.path=t,this.type=it.LISTEN_COMPLETE}operationForChild(e){return Q(this.path)?new Ts(this.source,Z()):new Ts(this.source,re(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=it.OVERWRITE}operationForChild(e){return Q(this.path)?new bn(this.source,Z(),this.snap.getImmediateChild(e)):new bn(this.source,re(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=it.MERGE}operationForChild(e){if(Q(this.path)){const t=this.children.subtree(new ne(e));return t.isEmpty()?null:t.value?new bn(this.source,Z(),t.value):new li(this.source,Z(),t)}else return D(z(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new li(this.source,re(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Q(e))return this.isFullyInitialized()&&!this.filtered_;const t=z(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function lw(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(JI(o.childName,o.snapshotNode))}),Ki(n,s,"child_removed",e,i,t),Ki(n,s,"child_added",e,i,t),Ki(n,s,"child_moved",r,i,t),Ki(n,s,"child_changed",e,i,t),Ki(n,s,"value",e,i,t),s}function Ki(n,e,t,i,s,r){const o=i.filter(l=>l.type===t);o.sort((l,c)=>uw(n,l,c)),o.forEach(l=>{const c=cw(n,l,r);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(c,n.query_))})})}function cw(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function uw(n,e,t){if(e.childName==null||t.childName==null)throw gi("Should only compare child_ events.");const i=new G(e.childName,e.snapshotNode),s=new G(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(n,e){return{eventCache:n,serverCache:e}}function os(n,e,t,i){return To(new kn(e,t,i),n.serverCache)}function Gp(n,e,t,i){return To(n.eventCache,new kn(e,t,i))}function Qa(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Nn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ba;const hw=()=>(ba||(ba=new lt(QT)),ba);class se{static fromObject(e){let t=new se(null);return be(e,(i,s)=>{t=t.set(new ne(i),s)}),t}constructor(e,t=hw()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Z(),value:this.value};if(Q(e))return null;{const i=z(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(re(e),t);return r!=null?{path:de(new ne(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Q(e))return this;{const t=z(e),i=this.children.get(t);return i!==null?i.subtree(re(e)):new se(null)}}set(e,t){if(Q(e))return new se(t,this.children);{const i=z(e),r=(this.children.get(i)||new se(null)).set(re(e),t),o=this.children.insert(i,r);return new se(this.value,o)}}remove(e){if(Q(e))return this.children.isEmpty()?new se(null):new se(null,this.children);{const t=z(e),i=this.children.get(t);if(i){const s=i.remove(re(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new se(null):new se(this.value,r)}else return this}}get(e){if(Q(e))return this.value;{const t=z(e),i=this.children.get(t);return i?i.get(re(e)):null}}setTree(e,t){if(Q(e))return t;{const i=z(e),r=(this.children.get(i)||new se(null)).setTree(re(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new se(this.value,o)}}fold(e){return this.fold_(Z(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(de(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,Z(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(Q(e))return null;{const r=z(e),o=this.children.get(r);return o?o.findOnPath_(re(e),de(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Z(),t)}foreachOnPath_(e,t,i){if(Q(e))return this;{this.value&&i(t,this.value);const s=z(e),r=this.children.get(s);return r?r.foreachOnPath_(re(e),de(t,s),i):new se(null)}}foreach(e){this.foreach_(Z(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(de(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.writeTree_=e}static empty(){return new st(new se(null))}}function as(n,e,t){if(Q(e))return new st(new se(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=$e(s,e);return r=r.updateChild(o,t),new st(n.writeTree_.set(s,r))}else{const s=new se(t),r=n.writeTree_.setTree(e,s);return new st(r)}}}function Ya(n,e,t){let i=n;return be(t,(s,r)=>{i=as(i,de(e,s),r)}),i}function nd(n,e){if(Q(e))return st.empty();{const t=n.writeTree_.setTree(e,new se(null));return new st(t)}}function Xa(n,e){return xn(n,e)!=null}function xn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild($e(t.path,e)):null}function id(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(fe,(i,s)=>{e.push(new G(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new G(i,s.value))}),e}function Qt(n,e){if(Q(e))return n;{const t=xn(n,e);return t!=null?new st(new se(t)):new st(n.writeTree_.subtree(e))}}function Ja(n){return n.writeTree_.isEmpty()}function ci(n,e){return Kp(Z(),n.writeTree_,e)}function Kp(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(D(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Kp(de(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(de(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sc(n,e){return Jp(e,n)}function dw(n,e,t,i,s){D(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=as(n.visibleWrites,e,t)),n.lastWriteId=i}function fw(n,e,t,i){D(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Ya(n.visibleWrites,e,t),n.lastWriteId=i}function pw(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function _w(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);D(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const l=n.allWrites[o];l.visible&&(o>=t&&mw(l,i.path)?s=!1:Xe(i.path,l.path)&&(r=!0)),o--}if(s){if(r)return gw(n),!0;if(i.snap)n.visibleWrites=nd(n.visibleWrites,i.path);else{const l=i.children;be(l,c=>{n.visibleWrites=nd(n.visibleWrites,de(i.path,c))})}return!0}else return!1}function mw(n,e){if(n.snap)return Xe(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Xe(de(n.path,t),e))return!0;return!1}function gw(n){n.visibleWrites=Qp(n.allWrites,yw,Z()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function yw(n){return n.visible}function Qp(n,e,t){let i=st.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let l;if(r.snap)Xe(t,o)?(l=$e(t,o),i=as(i,l,r.snap)):Xe(o,t)&&(l=$e(o,t),i=as(i,Z(),r.snap.getChild(l)));else if(r.children){if(Xe(t,o))l=$e(t,o),i=Ya(i,l,r.children);else if(Xe(o,t))if(l=$e(o,t),Q(l))i=Ya(i,Z(),r.children);else{const c=ri(r.children,z(l));if(c){const h=c.getChild(re(l));i=as(i,Z(),h)}}}else throw gi("WriteRecord should have .snap or .children")}}return i}function Yp(n,e,t,i,s){if(!i&&!s){const r=xn(n.visibleWrites,e);if(r!=null)return r;{const o=Qt(n.visibleWrites,e);if(Ja(o))return t;if(t==null&&!Xa(o,Z()))return null;{const l=t||U.EMPTY_NODE;return ci(o,l)}}}else{const r=Qt(n.visibleWrites,e);if(!s&&Ja(r))return t;if(!s&&t==null&&!Xa(r,Z()))return null;{const o=function(h){return(h.visible||s)&&(!i||!~i.indexOf(h.writeId))&&(Xe(h.path,e)||Xe(e,h.path))},l=Qp(n.allWrites,o,e),c=t||U.EMPTY_NODE;return ci(l,c)}}}function vw(n,e,t){let i=U.EMPTY_NODE;const s=xn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(fe,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Qt(n.visibleWrites,e);return t.forEachChild(fe,(o,l)=>{const c=ci(Qt(r,new ne(o)),l);i=i.updateImmediateChild(o,c)}),id(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Qt(n.visibleWrites,e);return id(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Ew(n,e,t,i,s){D(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=de(e,t);if(Xa(n.visibleWrites,r))return null;{const o=Qt(n.visibleWrites,r);return Ja(o)?s.getChild(t):ci(o,s.getChild(t))}}function Tw(n,e,t,i){const s=de(e,t),r=xn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Qt(n.visibleWrites,s);return ci(o,i.getNode().getImmediateChild(t))}else return null}function Iw(n,e){return xn(n.visibleWrites,e)}function ww(n,e,t,i,s,r,o){let l;const c=Qt(n.visibleWrites,e),h=xn(c,Z());if(h!=null)l=h;else if(t!=null)l=ci(c,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],p=o.getCompare(),m=r?l.getReverseIteratorFrom(i,o):l.getIteratorFrom(i,o);let T=m.getNext();for(;T&&f.length<s;)p(T,i)!==0&&f.push(T),T=m.getNext();return f}else return[]}function Aw(){return{visibleWrites:st.empty(),allWrites:[],lastWriteId:-1}}function Kr(n,e,t,i){return Yp(n.writeTree,n.treePath,e,t,i)}function rc(n,e){return vw(n.writeTree,n.treePath,e)}function sd(n,e,t,i){return Ew(n.writeTree,n.treePath,e,t,i)}function Qr(n,e){return Iw(n.writeTree,de(n.treePath,e))}function Cw(n,e,t,i,s,r){return ww(n.writeTree,n.treePath,e,t,i,s,r)}function oc(n,e,t){return Tw(n.writeTree,n.treePath,e,t)}function Xp(n,e){return Jp(de(n.treePath,e),n.writeTree)}function Jp(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;D(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),D(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,vs(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,ys(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ai(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,vs(i,e.snapshotNode,s.oldSnap));else throw gi("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sw{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Zp=new Sw;class ac{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new kn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return oc(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Nn(this.viewCache_),r=Cw(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(n){return{filter:n}}function bw(n,e){D(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function kw(n,e,t,i,s){const r=new Rw;let o,l;if(t.type===it.OVERWRITE){const h=t;h.source.fromUser?o=Za(n,e,h.path,h.snap,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!Q(h.path),o=Yr(n,e,h.path,h.snap,i,s,l,r))}else if(t.type===it.MERGE){const h=t;h.source.fromUser?o=Dw(n,e,h.path,h.children,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=el(n,e,h.path,h.children,i,s,l,r))}else if(t.type===it.ACK_USER_WRITE){const h=t;h.revert?o=Mw(n,e,h.path,i,s,r):o=Ow(n,e,h.path,h.affectedTree,i,s,r)}else if(t.type===it.LISTEN_COMPLETE)o=Vw(n,e,t.path,i,r);else throw gi("Unknown operation type: "+t.type);const c=r.getChanges();return Nw(e,o,c),{viewCache:o,changes:c}}function Nw(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Qa(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Hp(Qa(e)))}}function e_(n,e,t,i,s,r){const o=e.eventCache;if(Qr(i,t)!=null)return e;{let l,c;if(Q(t))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Nn(e),f=h instanceof U?h:U.EMPTY_NODE,p=rc(i,f);l=n.filter.updateFullNode(e.eventCache.getNode(),p,r)}else{const h=Kr(i,Nn(e));l=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=z(t);if(h===".priority"){D(tn(t)===1,"Can't have a priority with additional path components");const f=o.getNode();c=e.serverCache.getNode();const p=sd(i,t,f,c);p!=null?l=n.filter.updatePriority(f,p):l=o.getNode()}else{const f=re(t);let p;if(o.isCompleteForChild(h)){c=e.serverCache.getNode();const m=sd(i,t,o.getNode(),c);m!=null?p=o.getNode().getImmediateChild(h).updateChild(f,m):p=o.getNode().getImmediateChild(h)}else p=oc(i,h,e.serverCache);p!=null?l=n.filter.updateChild(o.getNode(),h,p,f,s,r):l=o.getNode()}}return os(e,l,o.isFullyInitialized()||Q(t),n.filter.filtersNodes())}}function Yr(n,e,t,i,s,r,o,l){const c=e.serverCache;let h;const f=o?n.filter:n.filter.getIndexedFilter();if(Q(t))h=f.updateFullNode(c.getNode(),i,null);else if(f.filtersNodes()&&!c.isFiltered()){const T=c.getNode().updateChild(t,i);h=f.updateFullNode(c.getNode(),T,null)}else{const T=z(t);if(!c.isCompleteForPath(t)&&tn(t)>1)return e;const R=re(t),k=c.getNode().getImmediateChild(T).updateChild(R,i);T===".priority"?h=f.updatePriority(c.getNode(),k):h=f.updateChild(c.getNode(),T,k,R,Zp,null)}const p=Gp(e,h,c.isFullyInitialized()||Q(t),f.filtersNodes()),m=new ac(s,p,r);return e_(n,p,t,s,m,l)}function Za(n,e,t,i,s,r,o){const l=e.eventCache;let c,h;const f=new ac(s,e,r);if(Q(t))h=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=os(e,h,!0,n.filter.filtersNodes());else{const p=z(t);if(p===".priority")h=n.filter.updatePriority(e.eventCache.getNode(),i),c=os(e,h,l.isFullyInitialized(),l.isFiltered());else{const m=re(t),T=l.getNode().getImmediateChild(p);let R;if(Q(m))R=i;else{const N=f.getCompleteChild(p);N!=null?Ql(m)===".priority"&&N.getChild(Fp(m)).isEmpty()?R=N:R=N.updateChild(m,i):R=U.EMPTY_NODE}if(T.equals(R))c=e;else{const N=n.filter.updateChild(l.getNode(),p,R,m,f,o);c=os(e,N,l.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function rd(n,e){return n.eventCache.isCompleteForChild(e)}function Dw(n,e,t,i,s,r,o){let l=e;return i.foreach((c,h)=>{const f=de(t,c);rd(e,z(f))&&(l=Za(n,l,f,h,s,r,o))}),i.foreach((c,h)=>{const f=de(t,c);rd(e,z(f))||(l=Za(n,l,f,h,s,r,o))}),l}function od(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function el(n,e,t,i,s,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;Q(t)?h=i:h=new se(null).setTree(t,i);const f=e.serverCache.getNode();return h.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){const T=e.serverCache.getNode().getImmediateChild(p),R=od(n,T,m);c=Yr(n,c,new ne(p),R,s,r,o,l)}}),h.children.inorderTraversal((p,m)=>{const T=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!T){const R=e.serverCache.getNode().getImmediateChild(p),N=od(n,R,m);c=Yr(n,c,new ne(p),N,s,r,o,l)}}),c}function Ow(n,e,t,i,s,r,o){if(Qr(s,t)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(Q(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Yr(n,e,t,c.getNode().getChild(t),s,r,l,o);if(Q(t)){let h=new se(null);return c.getNode().forEachChild(ti,(f,p)=>{h=h.set(new ne(f),p)}),el(n,e,t,h,s,r,l,o)}else return e}else{let h=new se(null);return i.foreach((f,p)=>{const m=de(t,f);c.isCompleteForPath(m)&&(h=h.set(f,c.getNode().getChild(m)))}),el(n,e,t,h,s,r,l,o)}}function Vw(n,e,t,i,s){const r=e.serverCache,o=Gp(e,r.getNode(),r.isFullyInitialized()||Q(t),r.isFiltered());return e_(n,o,t,i,Zp,s)}function Mw(n,e,t,i,s,r){let o;if(Qr(i,t)!=null)return e;{const l=new ac(i,e,s),c=e.eventCache.getNode();let h;if(Q(t)||z(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Kr(i,Nn(e));else{const p=e.serverCache.getNode();D(p instanceof U,"serverChildren would be complete if leaf node"),f=rc(i,p)}f=f,h=n.filter.updateFullNode(c,f,r)}else{const f=z(t);let p=oc(i,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=c.getImmediateChild(f)),p!=null?h=n.filter.updateChild(c,f,p,re(t),l,r):e.eventCache.getNode().hasChild(f)?h=n.filter.updateChild(c,f,U.EMPTY_NODE,re(t),l,r):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Kr(i,Nn(e)),o.isLeafNode()&&(h=n.filter.updateFullNode(h,o,r)))}return o=e.serverCache.isFullyInitialized()||Qr(i,Z())!=null,os(e,h,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Zl(i.getIndex()),r=ew(i);this.processor_=Pw(r);const o=t.serverCache,l=t.eventCache,c=s.updateFullNode(U.EMPTY_NODE,o.getNode(),null),h=r.updateFullNode(U.EMPTY_NODE,l.getNode(),null),f=new kn(c,o.isFullyInitialized(),s.filtersNodes()),p=new kn(h,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=To(p,f),this.eventGenerator_=new aw(this.query_)}get query(){return this.query_}}function Lw(n){return n.viewCache_.serverCache.getNode()}function Fw(n,e){const t=Nn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!Q(e)&&!t.getImmediateChild(z(e)).isEmpty())?t.getChild(e):null}function ad(n){return n.eventRegistrations_.length===0}function Uw(n,e){n.eventRegistrations_.push(e)}function ld(n,e,t){const i=[];if(t){D(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function cd(n,e,t,i){e.type===it.MERGE&&e.source.queryId!==null&&(D(Nn(n.viewCache_),"We should always have a full cache before handling merges"),D(Qa(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=kw(n.processor_,s,e,t,i);return bw(n.processor_,r.viewCache),D(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,t_(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Bw(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(fe,(r,o)=>{i.push(ai(r,o))}),t.isFullyInitialized()&&i.push(Hp(t.getNode())),t_(n,i,t.getNode(),e)}function t_(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return lw(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xr;class qw{constructor(){this.views=new Map}}function jw(n){D(!Xr,"__referenceConstructor has already been defined"),Xr=n}function Ww(){return D(Xr,"Reference.ts has not been loaded"),Xr}function $w(n){return n.views.size===0}function lc(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return D(r!=null,"SyncTree gave us an op for an invalid query."),cd(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(cd(o,e,t,i));return r}}function Hw(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let l=Kr(t,s?i:null),c=!1;l?c=!0:i instanceof U?(l=rc(t,i),c=!1):(l=U.EMPTY_NODE,c=!1);const h=To(new kn(l,c,!1),new kn(i,s,!1));return new xw(e,h)}return o}function zw(n,e,t,i,s,r){const o=Hw(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Uw(o,t),Bw(o,t)}function Gw(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const l=nn(n);if(s==="default")for(const[c,h]of n.views.entries())o=o.concat(ld(h,t,i)),ad(h)&&(n.views.delete(c),h.query._queryParams.loadsAllData()||r.push(h.query));else{const c=n.views.get(s);c&&(o=o.concat(ld(c,t,i)),ad(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return l&&!nn(n)&&r.push(new(Ww())(e._repo,e._path)),{removed:r,events:o}}function n_(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ni(n,e){let t=null;for(const i of n.views.values())t=t||Fw(i,e);return t}function i_(n,e){if(e._queryParams.loadsAllData())return Io(n);{const i=e._queryIdentifier;return n.views.get(i)}}function s_(n,e){return i_(n,e)!=null}function nn(n){return Io(n)!=null}function Io(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jr;function Kw(n){D(!Jr,"__referenceConstructor has already been defined"),Jr=n}function Qw(){return D(Jr,"Reference.ts has not been loaded"),Jr}let Yw=1;class ud{constructor(e){this.listenProvider_=e,this.syncPointTree_=new se(null),this.pendingWriteTree_=Aw(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function r_(n,e,t,i,s){return dw(n.pendingWriteTree_,e,t,i,s),s?Ti(n,new bn(tc(),e,t)):[]}function Xw(n,e,t,i){fw(n.pendingWriteTree_,e,t,i);const s=se.fromObject(t);return Ti(n,new li(tc(),e,s))}function Ht(n,e,t=!1){const i=pw(n.pendingWriteTree_,e);if(_w(n.pendingWriteTree_,e)){let r=new se(null);return i.snap!=null?r=r.set(Z(),!0):be(i.children,o=>{r=r.set(new ne(o),!0)}),Ti(n,new Gr(i.path,r,t))}else return[]}function wo(n,e,t){return Ti(n,new bn(nc(),e,t))}function Jw(n,e,t){const i=se.fromObject(t);return Ti(n,new li(nc(),e,i))}function Zw(n,e){return Ti(n,new Ts(nc(),e))}function eA(n,e,t){const i=uc(n,t);if(i){const s=hc(i),r=s.path,o=s.queryId,l=$e(r,e),c=new Ts(ic(o),l);return dc(n,r,c)}else return[]}function tl(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||s_(o,e))){const c=Gw(o,e,t,i);$w(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const h=c.removed;if(l=c.events,!s){const f=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(r,(m,T)=>nn(T));if(f&&!p){const m=n.syncPointTree_.subtree(r);if(!m.isEmpty()){const T=iA(m);for(let R=0;R<T.length;++R){const N=T[R],k=N.query,W=l_(n,N);n.listenProvider_.startListening(ls(k),Zr(n,k),W.hashFn,W.onComplete)}}}!p&&h.length>0&&!i&&(f?n.listenProvider_.stopListening(ls(e),null):h.forEach(m=>{const T=n.queryToTagMap.get(Ao(m));n.listenProvider_.stopListening(ls(m),T)}))}sA(n,h)}return l}function tA(n,e,t,i){const s=uc(n,i);if(s!=null){const r=hc(s),o=r.path,l=r.queryId,c=$e(o,e),h=new bn(ic(l),c,t);return dc(n,o,h)}else return[]}function nA(n,e,t,i){const s=uc(n,i);if(s){const r=hc(s),o=r.path,l=r.queryId,c=$e(o,e),h=se.fromObject(t),f=new li(ic(l),c,h);return dc(n,o,f)}else return[]}function hd(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(m,T)=>{const R=$e(m,s);r=r||ni(T,R),o=o||nn(T)});let l=n.syncPointTree_.get(s);l?(o=o||nn(l),r=r||ni(l,Z())):(l=new qw,n.syncPointTree_=n.syncPointTree_.set(s,l));let c;r!=null?c=!0:(c=!1,r=U.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((T,R)=>{const N=ni(R,Z());N&&(r=r.updateImmediateChild(T,N))}));const h=s_(l,e);if(!h&&!e._queryParams.loadsAllData()){const m=Ao(e);D(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const T=rA();n.queryToTagMap.set(m,T),n.tagToQueryMap.set(T,m)}const f=sc(n.pendingWriteTree_,s);let p=zw(l,e,t,f,r,c);if(!h&&!o&&!i){const m=i_(l,e);p=p.concat(oA(n,e,m))}return p}function cc(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,l)=>{const c=$e(o,e),h=ni(l,c);if(h)return h});return Yp(s,e,r,t,!0)}function Ti(n,e){return o_(e,n.syncPointTree_,null,sc(n.pendingWriteTree_,Z()))}function o_(n,e,t,i){if(Q(n.path))return a_(n,e,t,i);{const s=e.get(Z());t==null&&s!=null&&(t=ni(s,Z()));let r=[];const o=z(n.path),l=n.operationForChild(o),c=e.children.get(o);if(c&&l){const h=t?t.getImmediateChild(o):null,f=Xp(i,o);r=r.concat(o_(l,c,h,f))}return s&&(r=r.concat(lc(s,n,i,t))),r}}function a_(n,e,t,i){const s=e.get(Z());t==null&&s!=null&&(t=ni(s,Z()));let r=[];return e.children.inorderTraversal((o,l)=>{const c=t?t.getImmediateChild(o):null,h=Xp(i,o),f=n.operationForChild(o);f&&(r=r.concat(a_(f,l,c,h)))}),s&&(r=r.concat(lc(s,n,i,t))),r}function l_(n,e){const t=e.query,i=Zr(n,t);return{hashFn:()=>(Lw(e)||U.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?eA(n,t._path,i):Zw(n,t._path);{const r=JT(s,t);return tl(n,t,null,r)}}}}function Zr(n,e){const t=Ao(e);return n.queryToTagMap.get(t)}function Ao(n){return n._path.toString()+"$"+n._queryIdentifier}function uc(n,e){return n.tagToQueryMap.get(e)}function hc(n){const e=n.indexOf("$");return D(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new ne(n.substr(0,e))}}function dc(n,e,t){const i=n.syncPointTree_.get(e);D(i,"Missing sync point for query tag that we're tracking");const s=sc(n.pendingWriteTree_,e);return lc(i,t,s,null)}function iA(n){return n.fold((e,t,i)=>{if(t&&nn(t))return[Io(t)];{let s=[];return t&&(s=n_(t)),be(i,(r,o)=>{s=s.concat(o)}),s}})}function ls(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Qw())(n._repo,n._path):n}function sA(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Ao(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function rA(){return Yw++}function oA(n,e,t){const i=e._path,s=Zr(n,e),r=l_(n,t),o=n.listenProvider_.startListening(ls(e),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)D(!nn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((h,f,p)=>{if(!Q(h)&&f&&nn(f))return[Io(f).query];{let m=[];return f&&(m=m.concat(n_(f).map(T=>T.query))),be(p,(T,R)=>{m=m.concat(R)}),m}});for(let h=0;h<c.length;++h){const f=c[h];n.listenProvider_.stopListening(ls(f),Zr(n,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new fc(t)}node(){return this.node_}}class pc{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=de(this.path_,e);return new pc(this.syncTree_,t)}node(){return cc(this.syncTree_,this.path_)}}const aA=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},dd=function(n,e,t){if(!n||typeof n!="object")return n;if(D(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return lA(n[".sv"],e,t);if(typeof n[".sv"]=="object")return cA(n[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},lA=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:D(!1,"Unexpected server value: "+n)}},cA=function(n,e,t){n.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&D(!1,"Unexpected increment value: "+i);const s=e.node();if(D(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},c_=function(n,e,t,i){return _c(e,new pc(t,n),i)},u_=function(n,e,t){return _c(n,new fc(e),t)};function _c(n,e,t){const i=n.getPriority().val(),s=dd(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,l=dd(o.getValue(),e,t);return l!==o.getValue()||s!==o.getPriority().val()?new Te(l,we(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new Te(s))),o.forEachChild(fe,(l,c)=>{const h=_c(c,e.getImmediateChild(l),t);h!==c&&(r=r.updateImmediateChild(l,h))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function gc(n,e){let t=e instanceof ne?e:new ne(e),i=n,s=z(t);for(;s!==null;){const r=ri(i.node.children,s)||{children:{},childCount:0};i=new mc(s,i,r),t=re(t),s=z(t)}return i}function Ii(n){return n.node.value}function h_(n,e){n.node.value=e,nl(n)}function d_(n){return n.node.childCount>0}function uA(n){return Ii(n)===void 0&&!d_(n)}function Co(n,e){be(n.node.children,(t,i)=>{e(new mc(t,n,i))})}function f_(n,e,t,i){t&&e(n),Co(n,s=>{f_(s,e,!0)})}function hA(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Us(n){return new ne(n.parent===null?n.name:Us(n.parent)+"/"+n.name)}function nl(n){n.parent!==null&&dA(n.parent,n.name,n)}function dA(n,e,t){const i=uA(t),s=vt(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,nl(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,nl(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fA=/[\[\].#$\/\u0000-\u001F\u007F]/,pA=/[\[\].#$\u0000-\u001F\u007F]/,ka=10*1024*1024,yc=function(n){return typeof n=="string"&&n.length!==0&&!fA.test(n)},p_=function(n){return typeof n=="string"&&n.length!==0&&!pA.test(n)},_A=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),p_(n)},mA=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!$l(n)||n&&typeof n=="object"&&vt(n,".sv")},gA=function(n,e,t,i){Ro(fo(n,"value"),e,t)},Ro=function(n,e,t){const i=t instanceof ne?new DI(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+En(i));if(typeof e=="function")throw new Error(n+"contains a function "+En(i)+" with contents = "+e.toString());if($l(e))throw new Error(n+"contains "+e.toString()+" "+En(i));if(typeof e=="string"&&e.length>ka/3&&po(e)>ka)throw new Error(n+"contains a string greater than "+ka+" utf8 bytes "+En(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(be(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!yc(o)))throw new Error(n+" contains an invalid key ("+o+") "+En(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);OI(i,o),Ro(n,l,i),VI(i)}),s&&r)throw new Error(n+' contains ".value" child '+En(i)+" in addition to actual children.")}},yA=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=gs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!yc(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(NI);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Xe(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},vA=function(n,e,t,i){const s=fo(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];be(e,(o,l)=>{const c=new ne(o);if(Ro(s,l,de(t,c)),Ql(c)===".priority"&&!mA(l))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),yA(s,r)},__=function(n,e,t,i){if(!p_(t))throw new Error(fo(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},EA=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),__(n,e,t)},m_=function(n,e){if(z(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},TA=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!yc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!_A(t))throw new Error(fo(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function So(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Yl(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function g_(n,e,t){So(n,t),y_(n,i=>Yl(i,e))}function rt(n,e,t){So(n,t),y_(n,i=>Xe(i,e)||Xe(e,i))}function y_(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(wA(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function wA(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ss&&Se("event: "+t.toString()),Ei(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AA="repo_interrupt",CA=25;class RA{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new IA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=zr(),this.transactionQueueTree_=new mc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function SA(n,e,t){if(n.stats_=Gl(n.repoInfo_),n.forceRestClient_||nI())n.server_=new Hr(n.repoInfo_,(i,s,r,o)=>{fd(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>pd(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ae(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Pt(n.repoInfo_,e,(i,s,r,o)=>{fd(n,i,s,r,o)},i=>{pd(n,i)},i=>{bA(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=aI(n.repoInfo_,()=>new ow(n.stats_,n.server_)),n.infoData_=new tw,n.infoSyncTree_=new ud({startListening:(i,s,r,o)=>{let l=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(l=wo(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),vc(n,"connected",!1),n.serverSyncTree_=new ud({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(l,c)=>{const h=o(l,c);rt(n.eventQueue_,i._path,h)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function PA(n){const t=n.infoData_.getNode(new ne(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Po(n){return aA({timestamp:PA(n)})}function fd(n,e,t,i,s){n.dataUpdateCount++;const r=new ne(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Or(t,h=>we(h));o=nA(n.serverSyncTree_,r,c,s)}else{const c=we(t);o=tA(n.serverSyncTree_,r,c,s)}else if(i){const c=Or(t,h=>we(h));o=Jw(n.serverSyncTree_,r,c)}else{const c=we(t);o=wo(n.serverSyncTree_,r,c)}let l=r;o.length>0&&(l=ui(n,r)),rt(n.eventQueue_,l,o)}function pd(n,e){vc(n,"connected",e),e===!1&&DA(n)}function bA(n,e){be(e,(t,i)=>{vc(n,t,i)})}function vc(n,e,t){const i=new ne("/.info/"+e),s=we(t);n.infoData_.updateSnapshot(i,s);const r=wo(n.infoSyncTree_,i,s);rt(n.eventQueue_,i,r)}function Ec(n){return n.nextWriteId_++}function kA(n,e,t,i,s){bo(n,"set",{path:e.toString(),value:t,priority:i});const r=Po(n),o=we(t,i),l=cc(n.serverSyncTree_,e),c=u_(o,l,r),h=Ec(n),f=r_(n.serverSyncTree_,e,c,h,!0);So(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(m,T)=>{const R=m==="ok";R||qe("set at "+e+" failed: "+m);const N=Ht(n.serverSyncTree_,h,!R);rt(n.eventQueue_,e,N),il(n,s,m,T)});const p=Ic(n,e);ui(n,p),rt(n.eventQueue_,p,[])}function NA(n,e,t,i){bo(n,"update",{path:e.toString(),value:t});let s=!0;const r=Po(n),o={};if(be(t,(l,c)=>{s=!1,o[l]=c_(de(e,l),we(c),n.serverSyncTree_,r)}),s)Se("update() called with empty data.  Don't do anything."),il(n,i,"ok",void 0);else{const l=Ec(n),c=Xw(n.serverSyncTree_,e,o,l);So(n.eventQueue_,c),n.server_.merge(e.toString(),t,(h,f)=>{const p=h==="ok";p||qe("update at "+e+" failed: "+h);const m=Ht(n.serverSyncTree_,l,!p),T=m.length>0?ui(n,e):e;rt(n.eventQueue_,T,m),il(n,i,h,f)}),be(t,h=>{const f=Ic(n,de(e,h));ui(n,f)}),rt(n.eventQueue_,e,[])}}function DA(n){bo(n,"onDisconnectEvents");const e=Po(n),t=zr();Ka(n.onDisconnect_,Z(),(s,r)=>{const o=c_(s,r,n.serverSyncTree_,e);zp(t,s,o)});let i=[];Ka(t,Z(),(s,r)=>{i=i.concat(wo(n.serverSyncTree_,s,r));const o=Ic(n,s);ui(n,o)}),n.onDisconnect_=zr(),rt(n.eventQueue_,Z(),i)}function OA(n,e,t){let i;z(e._path)===".info"?i=hd(n.infoSyncTree_,e,t):i=hd(n.serverSyncTree_,e,t),g_(n.eventQueue_,e._path,i)}function _d(n,e,t){let i;z(e._path)===".info"?i=tl(n.infoSyncTree_,e,t):i=tl(n.serverSyncTree_,e,t),g_(n.eventQueue_,e._path,i)}function VA(n){n.persistentConnection_&&n.persistentConnection_.interrupt(AA)}function bo(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Se(t,...e)}function il(n,e,t,i){e&&Ei(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function v_(n,e,t){return cc(n.serverSyncTree_,e,t)||U.EMPTY_NODE}function Tc(n,e=n.transactionQueueTree_){if(e||ko(n,e),Ii(e)){const t=T_(n,e);D(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&MA(n,Us(e),t)}else d_(e)&&Co(e,t=>{Tc(n,t)})}function MA(n,e,t){const i=t.map(h=>h.currentWriteId),s=v_(n,e,i);let r=s;const o=s.hash();for(let h=0;h<t.length;h++){const f=t[h];D(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=$e(e,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const l=r.val(!0),c=e;n.server_.put(c.toString(),l,h=>{bo(n,"transaction put response",{path:c.toString(),status:h});let f=[];if(h==="ok"){const p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(Ht(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();ko(n,gc(n.transactionQueueTree_,e)),Tc(n,n.transactionQueueTree_),rt(n.eventQueue_,e,f);for(let m=0;m<p.length;m++)Ei(p[m])}else{if(h==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{qe("transaction at "+c.toString()+" failed: "+h);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=h}ui(n,e)}},o)}function ui(n,e){const t=E_(n,e),i=Us(t),s=T_(n,t);return xA(n,s,i),i}function xA(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],h=$e(t,c.path);let f=!1,p;if(D(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)f=!0,p=c.abortReason,s=s.concat(Ht(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=CA)f=!0,p="maxretry",s=s.concat(Ht(n.serverSyncTree_,c.currentWriteId,!0));else{const m=v_(n,c.path,o);c.currentInputSnapshot=m;const T=e[l].update(m.val());if(T!==void 0){Ro("transaction failed: Data returned ",T,c.path);let R=we(T);typeof T=="object"&&T!=null&&vt(T,".priority")||(R=R.updatePriority(m.getPriority()));const k=c.currentWriteId,W=Po(n),B=u_(R,m,W);c.currentOutputSnapshotRaw=R,c.currentOutputSnapshotResolved=B,c.currentWriteId=Ec(n),o.splice(o.indexOf(k),1),s=s.concat(r_(n.serverSyncTree_,c.path,B,c.currentWriteId,c.applyLocally)),s=s.concat(Ht(n.serverSyncTree_,k,!0))}else f=!0,p="nodata",s=s.concat(Ht(n.serverSyncTree_,c.currentWriteId,!0))}rt(n.eventQueue_,t,s),s=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(p),!1,null))))}ko(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)Ei(i[l]);Tc(n,n.transactionQueueTree_)}function E_(n,e){let t,i=n.transactionQueueTree_;for(t=z(e);t!==null&&Ii(i)===void 0;)i=gc(i,t),e=re(e),t=z(e);return i}function T_(n,e){const t=[];return I_(n,e,t),t.sort((i,s)=>i.order-s.order),t}function I_(n,e,t){const i=Ii(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Co(e,s=>{I_(n,s,t)})}function ko(n,e){const t=Ii(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,h_(e,t.length>0?t:void 0)}Co(e,i=>{ko(n,i)})}function Ic(n,e){const t=Us(E_(n,e)),i=gc(n.transactionQueueTree_,e);return hA(i,s=>{Na(n,s)}),Na(n,i),f_(i,s=>{Na(n,s)}),t}function Na(n,e){const t=Ii(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(D(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(D(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ht(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?h_(e,void 0):t.length=r+1,rt(n.eventQueue_,Us(e),s);for(let o=0;o<i.length;o++)Ei(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LA(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function FA(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):qe(`Invalid query segment '${t}' in query '${n}'`)}return e}const md=function(n,e){const t=UA(n),i=t.namespace;t.domain==="firebase.com"&&Nt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Nt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||GT();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new bp(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new ne(t.pathString)}},UA=function(n){let e="",t="",i="",s="",r="",o=!0,l="https",c=443;if(typeof n=="string"){let h=n.indexOf("//");h>=0&&(l=n.substring(0,h-1),n=n.substring(h+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(s=LA(n.substring(f,p)));const m=FA(n.substring(Math.min(n.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const T=e.slice(0,h);if(T.toLowerCase()==="localhost")t="localhost";else if(T.split(".").length<=2)t=T;else{const R=e.indexOf(".");i=e.substring(0,R).toLowerCase(),t=e.substring(R+1),r=i}"ns"in m&&(r=m.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:l,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ae(this.snapshot.exportVal())}}class qA{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return Q(this._path)?null:Ql(this._path)}get ref(){return new dn(this._repo,this._path)}get _queryIdentifier(){const e=ed(this._queryParams),t=Hl(e);return t==="{}"?"default":t}get _queryObject(){return ed(this._queryParams)}isEqual(e){if(e=te(e),!(e instanceof wc))return!1;const t=this._repo===e._repo,i=Yl(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+kI(this._path)}}class dn extends wc{constructor(e,t){super(e,t,new ec,!1)}get parent(){const e=Fp(this._path);return e===null?null:new dn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class eo{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ne(e),i=sl(this.ref,e);return new eo(this._node.getChild(t),i,fe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new eo(s,sl(this.ref,i),fe)))}hasChild(e){const t=new ne(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function EP(n,e){return n=te(n),n._checkNotDeleted("ref"),e!==void 0?sl(n._root,e):n._root}function sl(n,e){return n=te(n),z(n._path)===null?EA("child","path",e):__("child","path",e),new dn(n._repo,de(n._path,e))}function TP(n){return m_("remove",n._path),WA(n,null)}function WA(n,e){n=te(n),m_("set",n._path),gA("set",e,n._path);const t=new ks;return kA(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function IP(n,e){vA("update",e,n._path);const t=new ks;return NA(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}class Ac{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new BA("value",this,new eo(e.snapshotNode,new dn(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new qA(this,e,t):null}matches(e){return e instanceof Ac?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function $A(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const c=t,h=(f,p)=>{_d(n._repo,n,l),c(f,p)};h.userCallback=t.userCallback,h.context=t.context,t=h}const o=new jA(t,r||void 0),l=new Ac(o);return OA(n._repo,n,l),()=>_d(n._repo,n,l)}function wP(n,e,t,i){return $A(n,"value",e,t,i)}jw(dn);Kw(dn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA="FIREBASE_DATABASE_EMULATOR_HOST",rl={};let zA=!1;function GA(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=hn(r);n.repoInfo_=new bp(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function KA(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Nt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Se("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=md(r,s),l=o.repoInfo,c;typeof process<"u"&&xh&&(c=xh[HA]),c?(r=`http://${c}?ns=${l.namespace}`,o=md(r,s),l=o.repoInfo):o.repoInfo.secure;const h=new sI(n.name,n.options,e);TA("Invalid Firebase Database URL",o),Q(o.path)||Nt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=YA(l,n,h,new iI(n,t));return new XA(f,n)}function QA(n,e){const t=rl[e];(!t||t[n.key]!==n)&&Nt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),VA(n),delete t[n.key]}function YA(n,e,t,i){let s=rl[e.name];s||(s={},rl[e.name]=s);let r=s[n.toURLString()];return r&&Nt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new RA(n,zA,t,i),s[n.toURLString()]=r,r}class XA{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(SA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new dn(this._repo,Z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(QA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Nt("Cannot call "+e+" on a deleted database.")}}function AP(n=kl(),e){const t=mo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Af("database");i&&JA(t,...i)}return t}function JA(n,e,t,i={}){n=te(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Zt(i,r.repoInfo_.emulatorOptions))return;Nt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Nt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new wr(wr.OWNER);else if(i.mockUserToken){const l=typeof i.mockUserToken=="string"?i.mockUserToken:Sf(i.mockUserToken,n.app.options.projectId);o=new wr(l)}hn(e)&&(Rl(e),Sl("Database",!0)),GA(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZA(n){qT(Vn),An(new en("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return KA(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ct(Lh,Fh,n),ct(Lh,Fh,"esm2017")}Pt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Pt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};ZA();var gd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,w_;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function v(){}v.prototype=g.prototype,I.D=g.prototype,I.prototype=new v,I.prototype.constructor=I,I.C=function(E,w,C){for(var y=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)y[Tt-2]=arguments[Tt];return g.prototype[w].apply(E,y)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,v){v||(v=0);var E=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)E[w]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(w=0;16>w;++w)E[w]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=I.g[0],v=I.g[1],w=I.g[2];var C=I.g[3],y=g+(C^v&(w^C))+E[0]+3614090360&4294967295;g=v+(y<<7&4294967295|y>>>25),y=C+(w^g&(v^w))+E[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(v^C&(g^v))+E[2]+606105819&4294967295,w=C+(y<<17&4294967295|y>>>15),y=v+(g^w&(C^g))+E[3]+3250441966&4294967295,v=w+(y<<22&4294967295|y>>>10),y=g+(C^v&(w^C))+E[4]+4118548399&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(w^g&(v^w))+E[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(v^C&(g^v))+E[6]+2821735955&4294967295,w=C+(y<<17&4294967295|y>>>15),y=v+(g^w&(C^g))+E[7]+4249261313&4294967295,v=w+(y<<22&4294967295|y>>>10),y=g+(C^v&(w^C))+E[8]+1770035416&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(w^g&(v^w))+E[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(v^C&(g^v))+E[10]+4294925233&4294967295,w=C+(y<<17&4294967295|y>>>15),y=v+(g^w&(C^g))+E[11]+2304563134&4294967295,v=w+(y<<22&4294967295|y>>>10),y=g+(C^v&(w^C))+E[12]+1804603682&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(w^g&(v^w))+E[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(v^C&(g^v))+E[14]+2792965006&4294967295,w=C+(y<<17&4294967295|y>>>15),y=v+(g^w&(C^g))+E[15]+1236535329&4294967295,v=w+(y<<22&4294967295|y>>>10),y=g+(w^C&(v^w))+E[1]+4129170786&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^w&(g^v))+E[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^v&(C^g))+E[11]+643717713&4294967295,w=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(w^C))+E[0]+3921069994&4294967295,v=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(v^w))+E[5]+3593408605&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^w&(g^v))+E[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^v&(C^g))+E[15]+3634488961&4294967295,w=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(w^C))+E[4]+3889429448&4294967295,v=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(v^w))+E[9]+568446438&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^w&(g^v))+E[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^v&(C^g))+E[3]+4107603335&4294967295,w=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(w^C))+E[8]+1163531501&4294967295,v=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(v^w))+E[13]+2850285829&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^w&(g^v))+E[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^v&(C^g))+E[7]+1735328473&4294967295,w=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(w^C))+E[12]+2368359562&4294967295,v=w+(y<<20&4294967295|y>>>12),y=g+(v^w^C)+E[5]+4294588738&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^w)+E[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^v)+E[11]+1839030562&4294967295,w=C+(y<<16&4294967295|y>>>16),y=v+(w^C^g)+E[14]+4259657740&4294967295,v=w+(y<<23&4294967295|y>>>9),y=g+(v^w^C)+E[1]+2763975236&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^w)+E[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^v)+E[7]+4139469664&4294967295,w=C+(y<<16&4294967295|y>>>16),y=v+(w^C^g)+E[10]+3200236656&4294967295,v=w+(y<<23&4294967295|y>>>9),y=g+(v^w^C)+E[13]+681279174&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^w)+E[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^v)+E[3]+3572445317&4294967295,w=C+(y<<16&4294967295|y>>>16),y=v+(w^C^g)+E[6]+76029189&4294967295,v=w+(y<<23&4294967295|y>>>9),y=g+(v^w^C)+E[9]+3654602809&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^w)+E[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^v)+E[15]+530742520&4294967295,w=C+(y<<16&4294967295|y>>>16),y=v+(w^C^g)+E[2]+3299628645&4294967295,v=w+(y<<23&4294967295|y>>>9),y=g+(w^(v|~C))+E[0]+4096336452&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~w))+E[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~v))+E[14]+2878612391&4294967295,w=C+(y<<15&4294967295|y>>>17),y=v+(C^(w|~g))+E[5]+4237533241&4294967295,v=w+(y<<21&4294967295|y>>>11),y=g+(w^(v|~C))+E[12]+1700485571&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~w))+E[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~v))+E[10]+4293915773&4294967295,w=C+(y<<15&4294967295|y>>>17),y=v+(C^(w|~g))+E[1]+2240044497&4294967295,v=w+(y<<21&4294967295|y>>>11),y=g+(w^(v|~C))+E[8]+1873313359&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~w))+E[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~v))+E[6]+2734768916&4294967295,w=C+(y<<15&4294967295|y>>>17),y=v+(C^(w|~g))+E[13]+1309151649&4294967295,v=w+(y<<21&4294967295|y>>>11),y=g+(w^(v|~C))+E[4]+4149444226&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~w))+E[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~v))+E[2]+718787259&4294967295,w=C+(y<<15&4294967295|y>>>17),y=v+(C^(w|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+C&4294967295}i.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var v=g-this.blockSize,E=this.B,w=this.h,C=0;C<g;){if(w==0)for(;C<=v;)s(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<g;)if(E[w++]=I.charCodeAt(C++),w==this.blockSize){s(this,E),w=0;break}}else for(;C<g;)if(E[w++]=I[C++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=g},i.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var v=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=v&255,v/=256;for(this.u(I),I=Array(16),g=v=0;4>g;++g)for(var E=0;32>E;E+=8)I[v++]=this.g[g]>>>E&255;return I};function r(I,g){var v=l;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=g(I)}function o(I,g){this.h=g;for(var v=[],E=!0,w=I.length-1;0<=w;w--){var C=I[w]|0;E&&C==g||(v[w]=C,E=!1)}this.g=v}var l={};function c(I){return-128<=I&&128>I?r(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return k(h(-I));for(var g=[],v=1,E=0;I>=v;E++)g[E]=I/v|0,v*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),E=p,w=0;w<I.length;w+=8){var C=Math.min(8,I.length-w),y=parseInt(I.substring(w,w+C),g);8>C?(C=h(Math.pow(g,C)),E=E.j(C).add(h(y))):(E=E.j(v),E=E.add(h(y)))}return E}var p=c(0),m=c(1),T=c(16777216);n=o.prototype,n.m=function(){if(N(this))return-k(this).m();for(var I=0,g=1,v=0;v<this.g.length;v++){var E=this.i(v);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(R(this))return"0";if(N(this))return"-"+k(this).toString(I);for(var g=h(Math.pow(I,6)),v=this,E="";;){var w=ae(v,g).g;v=W(v,w.j(g));var C=((0<v.g.length?v.g[0]:v.h)>>>0).toString(I);if(v=w,R(v))return C+E;for(;6>C.length;)C="0"+C;E=C+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function R(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function N(I){return I.h==-1}n.l=function(I){return I=W(this,I),N(I)?-1:R(I)?0:1};function k(I){for(var g=I.g.length,v=[],E=0;E<g;E++)v[E]=~I.g[E];return new o(v,~I.h).add(m)}n.abs=function(){return N(this)?k(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0,w=0;w<=g;w++){var C=E+(this.i(w)&65535)+(I.i(w)&65535),y=(C>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);E=y>>>16,C&=65535,y&=65535,v[w]=y<<16|C}return new o(v,v[v.length-1]&-2147483648?-1:0)};function W(I,g){return I.add(k(g))}n.j=function(I){if(R(this)||R(I))return p;if(N(this))return N(I)?k(this).j(k(I)):k(k(this).j(I));if(N(I))return k(this.j(k(I)));if(0>this.l(T)&&0>I.l(T))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,v=[],E=0;E<2*g;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var w=0;w<I.g.length;w++){var C=this.i(E)>>>16,y=this.i(E)&65535,Tt=I.i(w)>>>16,Pi=I.i(w)&65535;v[2*E+2*w]+=y*Pi,B(v,2*E+2*w),v[2*E+2*w+1]+=C*Pi,B(v,2*E+2*w+1),v[2*E+2*w+1]+=y*Tt,B(v,2*E+2*w+1),v[2*E+2*w+2]+=C*Tt,B(v,2*E+2*w+2)}for(E=0;E<g;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=g;E<2*g;E++)v[E]=0;return new o(v,0)};function B(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function $(I,g){this.g=I,this.h=g}function ae(I,g){if(R(g))throw Error("division by zero");if(R(I))return new $(p,p);if(N(I))return g=ae(k(I),g),new $(k(g.g),k(g.h));if(N(g))return g=ae(I,k(g)),new $(k(g.g),g.h);if(30<I.g.length){if(N(I)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var v=m,E=g;0>=E.l(I);)v=Qe(v),E=Qe(E);var w=_e(v,1),C=_e(E,1);for(E=_e(E,2),v=_e(v,2);!R(E);){var y=C.add(E);0>=y.l(I)&&(w=w.add(v),C=y),E=_e(E,1),v=_e(v,1)}return g=W(I,w.j(g)),new $(w,g)}for(w=p;0<=I.l(g);){for(v=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),C=h(v),y=C.j(g);N(y)||0<y.l(I);)v-=E,C=h(v),y=C.j(g);R(C)&&(C=m),w=w.add(C),I=W(I,y)}return new $(w,I)}n.A=function(I){return ae(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)&I.i(E);return new o(v,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)|I.i(E);return new o(v,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)^I.i(E);return new o(v,this.h^I.h)};function Qe(I){for(var g=I.g.length+1,v=[],E=0;E<g;E++)v[E]=I.i(E)<<1|I.i(E-1)>>>31;return new o(v,I.h)}function _e(I,g){var v=g>>5;g%=32;for(var E=I.g.length-v,w=[],C=0;C<E;C++)w[C]=0<g?I.i(C+v)>>>g|I.i(C+v+1)<<32-g:I.i(C+v);return new o(w,I.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,w_=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Yt=o}).apply(typeof gd<"u"?gd:typeof self<"u"?self:typeof window<"u"?window:{});var pr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var A_,Ji,C_,Cr,ol,R_,S_,P_;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof pr=="object"&&pr];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var i=t(this);function s(a,u){if(u)e:{var d=i;a=a.split(".");for(var _=0;_<a.length-1;_++){var A=a[_];if(!(A in d))break e;d=d[A]}a=a[a.length-1],_=d[a],u=u(_),u!=_&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function r(a,u){a instanceof String&&(a+="");var d=0,_=!1,A={next:function(){if(!_&&d<a.length){var S=d++;return{value:u(S,a[S]),done:!1}}return _=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(a){return a||function(){return r(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function f(a,u,d){return a.call.apply(a.bind,arguments)}function p(a,u,d){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,_),a.apply(u,A)}}return function(){return a.apply(u,arguments)}}function m(a,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function T(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function R(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(_,A,S){for(var O=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)O[ie-2]=arguments[ie];return u.prototype[A].apply(_,O)}}function N(a){const u=a.length;if(0<u){const d=Array(u);for(let _=0;_<u;_++)d[_]=a[_];return d}return[]}function k(a,u){for(let d=1;d<arguments.length;d++){const _=arguments[d];if(c(_)){const A=a.length||0,S=_.length||0;a.length=A+S;for(let O=0;O<S;O++)a[A+O]=_[O]}else a.push(_)}}class W{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function B(a){return/^[\s\xa0]*$/.test(a)}function $(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function ae(a){return ae[" "](a),a}ae[" "]=function(){};var Qe=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function _e(a,u,d){for(const _ in a)u.call(d,a[_],_,a)}function I(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function g(a){const u={};for(const d in a)u[d]=a[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,u){let d,_;for(let A=1;A<arguments.length;A++){_=arguments[A];for(d in _)a[d]=_[d];for(let S=0;S<v.length;S++)d=v[S],Object.prototype.hasOwnProperty.call(_,d)&&(a[d]=_[d])}}function w(a){var u=1;a=a.split(":");const d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function C(a){l.setTimeout(()=>{throw a},0)}function y(){var a=Ko;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class Tt{constructor(){this.h=this.g=null}add(u,d){const _=Pi.get();_.set(u,d),this.h?this.h.next=_:this.g=_,this.h=_}}var Pi=new W(()=>new sg,a=>a.reset());class sg{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let bi,ki=!1,Ko=new Tt,ou=()=>{const a=l.Promise.resolve(void 0);bi=()=>{a.then(rg)}};var rg=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){C(d)}var u=Pi;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ki=!1};function xt(){this.s=this.s,this.C=this.C}xt.prototype.s=!1,xt.prototype.ma=function(){this.s||(this.s=!0,this.N())},xt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ne(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Ne.prototype.h=function(){this.defaultPrevented=!0};var og=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return a}();function Ni(a,u){if(Ne.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(Qe){e:{try{ae(u.nodeName);var A=!0;break e}catch{}A=!1}A||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:ag[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ni.aa.h.call(this)}}R(Ni,Ne);var ag={2:"touch",3:"pen",4:"mouse"};Ni.prototype.h=function(){Ni.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var zs="closure_listenable_"+(1e6*Math.random()|0),lg=0;function cg(a,u,d,_,A){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!_,this.ha=A,this.key=++lg,this.da=this.fa=!1}function Gs(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ks(a){this.src=a,this.g={},this.h=0}Ks.prototype.add=function(a,u,d,_,A){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var O=Yo(a,u,_,A);return-1<O?(u=a[O],d||(u.fa=!1)):(u=new cg(u,this.src,S,!!_,A),u.fa=d,a.push(u)),u};function Qo(a,u){var d=u.type;if(d in a.g){var _=a.g[d],A=Array.prototype.indexOf.call(_,u,void 0),S;(S=0<=A)&&Array.prototype.splice.call(_,A,1),S&&(Gs(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Yo(a,u,d,_){for(var A=0;A<a.length;++A){var S=a[A];if(!S.da&&S.listener==u&&S.capture==!!d&&S.ha==_)return A}return-1}var Xo="closure_lm_"+(1e6*Math.random()|0),Jo={};function au(a,u,d,_,A){if(Array.isArray(u)){for(var S=0;S<u.length;S++)au(a,u[S],d,_,A);return null}return d=uu(d),a&&a[zs]?a.K(u,d,h(_)?!!_.capture:!1,A):ug(a,u,d,!1,_,A)}function ug(a,u,d,_,A,S){if(!u)throw Error("Invalid event type");var O=h(A)?!!A.capture:!!A,ie=ea(a);if(ie||(a[Xo]=ie=new Ks(a)),d=ie.add(u,d,_,O,S),d.proxy)return d;if(_=hg(),d.proxy=_,_.src=a,_.listener=d,a.addEventListener)og||(A=O),A===void 0&&(A=!1),a.addEventListener(u.toString(),_,A);else if(a.attachEvent)a.attachEvent(cu(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function hg(){function a(d){return u.call(a.src,a.listener,d)}const u=dg;return a}function lu(a,u,d,_,A){if(Array.isArray(u))for(var S=0;S<u.length;S++)lu(a,u[S],d,_,A);else _=h(_)?!!_.capture:!!_,d=uu(d),a&&a[zs]?(a=a.i,u=String(u).toString(),u in a.g&&(S=a.g[u],d=Yo(S,d,_,A),-1<d&&(Gs(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[u],a.h--)))):a&&(a=ea(a))&&(u=a.g[u.toString()],a=-1,u&&(a=Yo(u,d,_,A)),(d=-1<a?u[a]:null)&&Zo(d))}function Zo(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[zs])Qo(u.i,a);else{var d=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(d,_,a.capture):u.detachEvent?u.detachEvent(cu(d),_):u.addListener&&u.removeListener&&u.removeListener(_),(d=ea(u))?(Qo(d,a),d.h==0&&(d.src=null,u[Xo]=null)):Gs(a)}}}function cu(a){return a in Jo?Jo[a]:Jo[a]="on"+a}function dg(a,u){if(a.da)a=!0;else{u=new Ni(u,this);var d=a.listener,_=a.ha||a.src;a.fa&&Zo(a),a=d.call(_,u)}return a}function ea(a){return a=a[Xo],a instanceof Ks?a:null}var ta="__closure_events_fn_"+(1e9*Math.random()>>>0);function uu(a){return typeof a=="function"?a:(a[ta]||(a[ta]=function(u){return a.handleEvent(u)}),a[ta])}function De(){xt.call(this),this.i=new Ks(this),this.M=this,this.F=null}R(De,xt),De.prototype[zs]=!0,De.prototype.removeEventListener=function(a,u,d,_){lu(this,a,u,d,_)};function Ue(a,u){var d,_=a.F;if(_)for(d=[];_;_=_.F)d.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new Ne(u,a);else if(u instanceof Ne)u.target=u.target||a;else{var A=u;u=new Ne(_,a),E(u,A)}if(A=!0,d)for(var S=d.length-1;0<=S;S--){var O=u.g=d[S];A=Qs(O,_,!0,u)&&A}if(O=u.g=a,A=Qs(O,_,!0,u)&&A,A=Qs(O,_,!1,u)&&A,d)for(S=0;S<d.length;S++)O=u.g=d[S],A=Qs(O,_,!1,u)&&A}De.prototype.N=function(){if(De.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],_=0;_<d.length;_++)Gs(d[_]);delete a.g[u],a.h--}}this.F=null},De.prototype.K=function(a,u,d,_){return this.i.add(String(a),u,!1,d,_)},De.prototype.L=function(a,u,d,_){return this.i.add(String(a),u,!0,d,_)};function Qs(a,u,d,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var A=!0,S=0;S<u.length;++S){var O=u[S];if(O&&!O.da&&O.capture==d){var ie=O.listener,Ce=O.ha||O.src;O.fa&&Qo(a.i,O),A=ie.call(Ce,_)!==!1&&A}}return A&&!_.defaultPrevented}function hu(a,u,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function du(a){a.g=hu(()=>{a.g=null,a.i&&(a.i=!1,du(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class fg extends xt{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:du(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Di(a){xt.call(this),this.h=a,this.g={}}R(Di,xt);var fu=[];function pu(a){_e(a.g,function(u,d){this.g.hasOwnProperty(d)&&Zo(u)},a),a.g={}}Di.prototype.N=function(){Di.aa.N.call(this),pu(this)},Di.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var na=l.JSON.stringify,pg=l.JSON.parse,_g=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function ia(){}ia.prototype.h=null;function _u(a){return a.h||(a.h=a.i())}function mu(){}var Oi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function sa(){Ne.call(this,"d")}R(sa,Ne);function ra(){Ne.call(this,"c")}R(ra,Ne);var _n={},gu=null;function Ys(){return gu=gu||new De}_n.La="serverreachability";function yu(a){Ne.call(this,_n.La,a)}R(yu,Ne);function Vi(a){const u=Ys();Ue(u,new yu(u))}_n.STAT_EVENT="statevent";function vu(a,u){Ne.call(this,_n.STAT_EVENT,a),this.stat=u}R(vu,Ne);function Be(a){const u=Ys();Ue(u,new vu(u,a))}_n.Ma="timingevent";function Eu(a,u){Ne.call(this,_n.Ma,a),this.size=u}R(Eu,Ne);function Mi(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function xi(){this.g=!0}xi.prototype.xa=function(){this.g=!1};function mg(a,u,d,_,A,S){a.info(function(){if(a.g)if(S)for(var O="",ie=S.split("&"),Ce=0;Ce<ie.length;Ce++){var J=ie[Ce].split("=");if(1<J.length){var Oe=J[0];J=J[1];var Ve=Oe.split("_");O=2<=Ve.length&&Ve[1]=="type"?O+(Oe+"="+J+"&"):O+(Oe+"=redacted&")}}else O=null;else O=S;return"XMLHTTP REQ ("+_+") [attempt "+A+"]: "+u+`
`+d+`
`+O})}function gg(a,u,d,_,A,S,O){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+A+"]: "+u+`
`+d+`
`+S+" "+O})}function Bn(a,u,d,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+vg(a,d)+(_?" "+_:"")})}function yg(a,u){a.info(function(){return"TIMEOUT: "+u})}xi.prototype.info=function(){};function vg(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var _=d[a];if(!(2>_.length)){var A=_[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var O=1;O<A.length;O++)A[O]=""}}}}return na(d)}catch{return u}}var Xs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Tu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},oa;function Js(){}R(Js,ia),Js.prototype.g=function(){return new XMLHttpRequest},Js.prototype.i=function(){return{}},oa=new Js;function Lt(a,u,d,_){this.j=a,this.i=u,this.l=d,this.R=_||1,this.U=new Di(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Iu}function Iu(){this.i=null,this.g="",this.h=!1}var wu={},aa={};function la(a,u,d){a.L=1,a.v=nr(It(u)),a.m=d,a.P=!0,Au(a,null)}function Au(a,u){a.F=Date.now(),Zs(a),a.A=It(a.v);var d=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Fu(d.i,"t",_),a.C=0,d=a.j.J,a.h=new Iu,a.g=nh(a.j,d?u:null,!a.m),0<a.O&&(a.M=new fg(m(a.Y,a,a.g),a.O)),u=a.U,d=a.g,_=a.ca;var A="readystatechange";Array.isArray(A)||(A&&(fu[0]=A.toString()),A=fu);for(var S=0;S<A.length;S++){var O=au(d,A[S],_||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Vi(),mg(a.i,a.u,a.A,a.l,a.R,a.m)}Lt.prototype.ca=function(a){a=a.target;const u=this.M;u&&wt(a)==3?u.j():this.Y(a)},Lt.prototype.Y=function(a){try{if(a==this.g)e:{const Ve=wt(this.g);var u=this.g.Ba();const Wn=this.g.Z();if(!(3>Ve)&&(Ve!=3||this.g&&(this.h.h||this.g.oa()||Hu(this.g)))){this.J||Ve!=4||u==7||(u==8||0>=Wn?Vi(3):Vi(2)),ca(this);var d=this.g.Z();this.X=d;t:if(Cu(this)){var _=Hu(this.g);a="";var A=_.length,S=wt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){mn(this),Li(this);var O="";break t}this.h.i=new l.TextDecoder}for(u=0;u<A;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(S&&u==A-1)});_.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,gg(this.i,this.u,this.A,this.l,this.R,Ve,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Ce=this.g;if((ie=Ce.g?Ce.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(ie)){var J=ie;break t}}J=null}if(d=J)Bn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ua(this,d);else{this.o=!1,this.s=3,Be(12),mn(this),Li(this);break e}}if(this.P){d=!0;let et;for(;!this.J&&this.C<O.length;)if(et=Eg(this,O),et==aa){Ve==4&&(this.s=4,Be(14),d=!1),Bn(this.i,this.l,null,"[Incomplete Response]");break}else if(et==wu){this.s=4,Be(15),Bn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Bn(this.i,this.l,et,null),ua(this,et);if(Cu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ve!=4||O.length!=0||this.h.h||(this.s=1,Be(16),d=!1),this.o=this.o&&d,!d)Bn(this.i,this.l,O,"[Invalid Chunked Response]"),mn(this),Li(this);else if(0<O.length&&!this.W){this.W=!0;var Oe=this.j;Oe.g==this&&Oe.ba&&!Oe.M&&(Oe.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),ma(Oe),Oe.M=!0,Be(11))}}else Bn(this.i,this.l,O,null),ua(this,O);Ve==4&&mn(this),this.o&&!this.J&&(Ve==4?Ju(this.j,this):(this.o=!1,Zs(this)))}else Lg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Be(12)):(this.s=0,Be(13)),mn(this),Li(this)}}}catch{}finally{}};function Cu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Eg(a,u){var d=a.C,_=u.indexOf(`
`,d);return _==-1?aa:(d=Number(u.substring(d,_)),isNaN(d)?wu:(_+=1,_+d>u.length?aa:(u=u.slice(_,_+d),a.C=_+d,u)))}Lt.prototype.cancel=function(){this.J=!0,mn(this)};function Zs(a){a.S=Date.now()+a.I,Ru(a,a.I)}function Ru(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Mi(m(a.ba,a),u)}function ca(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Lt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(yg(this.i,this.A),this.L!=2&&(Vi(),Be(17)),mn(this),this.s=2,Li(this)):Ru(this,this.S-a)};function Li(a){a.j.G==0||a.J||Ju(a.j,a)}function mn(a){ca(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,pu(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function ua(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||ha(d.h,a))){if(!a.K&&ha(d.h,a)&&d.G==3){try{var _=d.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var A=_;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)lr(d),or(d);else break e;_a(d),Be(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Mi(m(d.Za,d),6e3));if(1>=bu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else yn(d,11)}else if((a.K||d.g==a)&&lr(d),!B(u))for(A=d.Da.g.parse(u),u=0;u<A.length;u++){let J=A[u];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const Oe=J[3];Oe!=null&&(d.la=Oe,d.j.info("VER="+d.la));const Ve=J[4];Ve!=null&&(d.Aa=Ve,d.j.info("SVER="+d.Aa));const Wn=J[5];Wn!=null&&typeof Wn=="number"&&0<Wn&&(_=1.5*Wn,d.L=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const et=a.g;if(et){const ur=et.g?et.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ur){var S=_.h;S.g||ur.indexOf("spdy")==-1&&ur.indexOf("quic")==-1&&ur.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(da(S,S.h),S.h=null))}if(_.D){const ga=et.g?et.g.getResponseHeader("X-HTTP-Session-Id"):null;ga&&(_.ya=ga,le(_.I,_.D,ga))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),_=d;var O=a;if(_.qa=th(_,_.J?_.ia:null,_.W),O.K){ku(_.h,O);var ie=O,Ce=_.L;Ce&&(ie.I=Ce),ie.B&&(ca(ie),Zs(ie)),_.g=O}else Yu(_);0<d.i.length&&ar(d)}else J[0]!="stop"&&J[0]!="close"||yn(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?yn(d,7):pa(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}Vi(4)}catch{}}var Tg=class{constructor(a,u){this.g=a,this.map=u}};function Su(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Pu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function bu(a){return a.h?1:a.g?a.g.size:0}function ha(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function da(a,u){a.g?a.g.add(u):a.h=u}function ku(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Su.prototype.cancel=function(){if(this.i=Nu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Nu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.D);return u}return N(a.i)}function Ig(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],d=a.length,_=0;_<d;_++)u.push(a[_]);return u}u=[],d=0;for(_ in a)u[d++]=a[_];return u}function wg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(const _ in a)u[d++]=_;return u}}}function Du(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=wg(a),_=Ig(a),A=_.length,S=0;S<A;S++)u.call(void 0,_[S],d&&d[S],a)}var Ou=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ag(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var _=a[d].indexOf("="),A=null;if(0<=_){var S=a[d].substring(0,_);A=a[d].substring(_+1)}else S=a[d];u(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function gn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof gn){this.h=a.h,er(this,a.j),this.o=a.o,this.g=a.g,tr(this,a.s),this.l=a.l;var u=a.i,d=new Bi;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),Vu(this,d),this.m=a.m}else a&&(u=String(a).match(Ou))?(this.h=!1,er(this,u[1]||"",!0),this.o=Fi(u[2]||""),this.g=Fi(u[3]||"",!0),tr(this,u[4]),this.l=Fi(u[5]||"",!0),Vu(this,u[6]||"",!0),this.m=Fi(u[7]||"")):(this.h=!1,this.i=new Bi(null,this.h))}gn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Ui(u,Mu,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Ui(u,Mu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ui(d,d.charAt(0)=="/"?Sg:Rg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ui(d,bg)),a.join("")};function It(a){return new gn(a)}function er(a,u,d){a.j=d?Fi(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function tr(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Vu(a,u,d){u instanceof Bi?(a.i=u,kg(a.i,a.h)):(d||(u=Ui(u,Pg)),a.i=new Bi(u,a.h))}function le(a,u,d){a.i.set(u,d)}function nr(a){return le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Fi(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ui(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,Cg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Cg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Mu=/[#\/\?@]/g,Rg=/[#\?:]/g,Sg=/[#\?]/g,Pg=/[#\?@]/g,bg=/#/g;function Bi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Ft(a){a.g||(a.g=new Map,a.h=0,a.i&&Ag(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Bi.prototype,n.add=function(a,u){Ft(this),this.i=null,a=qn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function xu(a,u){Ft(a),u=qn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Lu(a,u){return Ft(a),u=qn(a,u),a.g.has(u)}n.forEach=function(a,u){Ft(this),this.g.forEach(function(d,_){d.forEach(function(A){a.call(u,A,_,this)},this)},this)},n.na=function(){Ft(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let _=0;_<u.length;_++){const A=a[_];for(let S=0;S<A.length;S++)d.push(u[_])}return d},n.V=function(a){Ft(this);let u=[];if(typeof a=="string")Lu(this,a)&&(u=u.concat(this.g.get(qn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return Ft(this),this.i=null,a=qn(this,a),Lu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Fu(a,u,d){xu(a,u),0<d.length&&(a.i=null,a.g.set(qn(a,u),N(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var _=u[d];const S=encodeURIComponent(String(_)),O=this.V(_);for(_=0;_<O.length;_++){var A=S;O[_]!==""&&(A+="="+encodeURIComponent(String(O[_]))),a.push(A)}}return this.i=a.join("&")};function qn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function kg(a,u){u&&!a.j&&(Ft(a),a.i=null,a.g.forEach(function(d,_){var A=_.toLowerCase();_!=A&&(xu(this,_),Fu(this,A,d))},a)),a.j=u}function Ng(a,u){const d=new xi;if(l.Image){const _=new Image;_.onload=T(Ut,d,"TestLoadImage: loaded",!0,u,_),_.onerror=T(Ut,d,"TestLoadImage: error",!1,u,_),_.onabort=T(Ut,d,"TestLoadImage: abort",!1,u,_),_.ontimeout=T(Ut,d,"TestLoadImage: timeout",!1,u,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function Dg(a,u){const d=new xi,_=new AbortController,A=setTimeout(()=>{_.abort(),Ut(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(S=>{clearTimeout(A),S.ok?Ut(d,"TestPingServer: ok",!0,u):Ut(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(A),Ut(d,"TestPingServer: error",!1,u)})}function Ut(a,u,d,_,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),_(d)}catch{}}function Og(){this.g=new _g}function Vg(a,u,d){const _=d||"";try{Du(a,function(A,S){let O=A;h(A)&&(O=na(A)),u.push(_+S+"="+encodeURIComponent(O))})}catch(A){throw u.push(_+"type="+encodeURIComponent("_badmap")),A}}function ir(a){this.l=a.Ub||null,this.j=a.eb||!1}R(ir,ia),ir.prototype.g=function(){return new sr(this.l,this.j)},ir.prototype.i=function(a){return function(){return a}}({});function sr(a,u){De.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(sr,De),n=sr.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,ji(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,qi(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ji(this)),this.g&&(this.readyState=3,ji(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Uu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Uu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?qi(this):ji(this),this.readyState==3&&Uu(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,qi(this))},n.Qa=function(a){this.g&&(this.response=a,qi(this))},n.ga=function(){this.g&&qi(this)};function qi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ji(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function ji(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(sr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Bu(a){let u="";return _e(a,function(d,_){u+=_,u+=":",u+=d,u+=`\r
`}),u}function fa(a,u,d){e:{for(_ in d){var _=!1;break e}_=!0}_||(d=Bu(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):le(a,u,d))}function he(a){De.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(he,De);var Mg=/^https?$/i,xg=["POST","PUT"];n=he.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():oa.g(),this.v=this.o?_u(this.o):_u(oa),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(S){qu(this,S);return}if(a=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var A in _)d.set(A,_[A]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const S of _.keys())d.set(S,_.get(S));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(xg,u,void 0))||_||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$u(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){qu(this,S)}};function qu(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,ju(a),rr(a)}function ju(a){a.A||(a.A=!0,Ue(a,"complete"),Ue(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ue(this,"complete"),Ue(this,"abort"),rr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),rr(this,!0)),he.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Wu(this):this.bb())},n.bb=function(){Wu(this)};function Wu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||wt(a)!=4||a.Z()!=2)){if(a.u&&wt(a)==4)hu(a.Ea,0,a);else if(Ue(a,"readystatechange"),wt(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var _;if(_=O===0){var A=String(a.D).match(Ou)[1]||null;!A&&l.self&&l.self.location&&(A=l.self.location.protocol.slice(0,-1)),_=!Mg.test(A?A.toLowerCase():"")}d=_}if(d)Ue(a,"complete"),Ue(a,"success");else{a.m=6;try{var S=2<wt(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",ju(a)}}finally{rr(a)}}}}function rr(a,u){if(a.g){$u(a);const d=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Ue(a,"ready");try{d.onreadystatechange=_}catch{}}}function $u(a){a.I&&(l.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function wt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<wt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),pg(u)}};function Hu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Lg(a){const u={};a=(a.g&&2<=wt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(B(a[_]))continue;var d=w(a[_]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=u[A]||[];u[A]=S,S.push(d)}I(u,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Wi(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function zu(a){this.Aa=0,this.i=[],this.j=new xi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Wi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Wi("baseRetryDelayMs",5e3,a),this.cb=Wi("retryDelaySeedMs",1e4,a),this.Wa=Wi("forwardChannelMaxRetries",2,a),this.wa=Wi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Su(a&&a.concurrentRequestLimit),this.Da=new Og,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=zu.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,_){Be(0),this.W=a,this.H=u||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.I=th(this,null,this.W),ar(this)};function pa(a){if(Gu(a),a.G==3){var u=a.U++,d=It(a.I);if(le(d,"SID",a.K),le(d,"RID",u),le(d,"TYPE","terminate"),$i(a,d),u=new Lt(a,a.j,u),u.L=2,u.v=nr(It(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=nh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Zs(u)}eh(a)}function or(a){a.g&&(ma(a),a.g.cancel(),a.g=null)}function Gu(a){or(a),a.u&&(l.clearTimeout(a.u),a.u=null),lr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ar(a){if(!Pu(a.h)&&!a.s){a.s=!0;var u=a.Ga;bi||ou(),ki||(bi(),ki=!0),Ko.add(u,a),a.B=0}}function Fg(a,u){return bu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Mi(m(a.Ga,a,u),Zu(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const A=new Lt(this,this.j,a);let S=this.o;if(this.S&&(S?(S=g(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Qu(this,A,u),d=It(this.I),le(d,"RID",a),le(d,"CVER",22),this.D&&le(d,"X-HTTP-Session-Id",this.D),$i(this,d),S&&(this.O?u="headers="+encodeURIComponent(String(Bu(S)))+"&"+u:this.m&&fa(d,this.m,S)),da(this.h,A),this.Ua&&le(d,"TYPE","init"),this.P?(le(d,"$req",u),le(d,"SID","null"),A.T=!0,la(A,d,null)):la(A,d,u),this.G=2}}else this.G==3&&(a?Ku(this,a):this.i.length==0||Pu(this.h)||Ku(this))};function Ku(a,u){var d;u?d=u.l:d=a.U++;const _=It(a.I);le(_,"SID",a.K),le(_,"RID",d),le(_,"AID",a.T),$i(a,_),a.m&&a.o&&fa(_,a.m,a.o),d=new Lt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Qu(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),da(a.h,d),la(d,_,u)}function $i(a,u){a.H&&_e(a.H,function(d,_){le(u,_,d)}),a.l&&Du({},function(d,_){le(u,_,d)})}function Qu(a,u,d){d=Math.min(a.i.length,d);var _=a.l?m(a.l.Na,a.l,a):null;e:{var A=a.i;let S=-1;for(;;){const O=["count="+d];S==-1?0<d?(S=A[0].g,O.push("ofs="+S)):S=0:O.push("ofs="+S);let ie=!0;for(let Ce=0;Ce<d;Ce++){let J=A[Ce].g;const Oe=A[Ce].map;if(J-=S,0>J)S=Math.max(0,A[Ce].g-100),ie=!1;else try{Vg(Oe,O,"req"+J+"_")}catch{_&&_(Oe)}}if(ie){_=O.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,_}function Yu(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;bi||ou(),ki||(bi(),ki=!0),Ko.add(u,a),a.v=0}}function _a(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Mi(m(a.Fa,a),Zu(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,Xu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Mi(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Be(10),or(this),Xu(this))};function ma(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Xu(a){a.g=new Lt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=It(a.qa);le(u,"RID","rpc"),le(u,"SID",a.K),le(u,"AID",a.T),le(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&le(u,"TO",a.ja),le(u,"TYPE","xmlhttp"),$i(a,u),a.m&&a.o&&fa(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=nr(It(u)),d.m=null,d.P=!0,Au(d,a)}n.Za=function(){this.C!=null&&(this.C=null,or(this),_a(this),Be(19))};function lr(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Ju(a,u){var d=null;if(a.g==u){lr(a),ma(a),a.g=null;var _=2}else if(ha(a.h,u))d=u.D,ku(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var A=a.B;_=Ys(),Ue(_,new Eu(_,d)),ar(a)}else Yu(a);else if(A=u.s,A==3||A==0&&0<u.X||!(_==1&&Fg(a,u)||_==2&&_a(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),A){case 1:yn(a,5);break;case 4:yn(a,10);break;case 3:yn(a,6);break;default:yn(a,2)}}}function Zu(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function yn(a,u){if(a.j.info("Error code "+u),u==2){var d=m(a.fb,a),_=a.Xa;const A=!_;_=new gn(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||er(_,"https"),nr(_),A?Ng(_.toString(),d):Dg(_.toString(),d)}else Be(2);a.G=0,a.l&&a.l.sa(u),eh(a),Gu(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Be(2)):(this.j.info("Failed to ping google.com"),Be(1))};function eh(a){if(a.G=0,a.ka=[],a.l){const u=Nu(a.h);(u.length!=0||a.i.length!=0)&&(k(a.ka,u),k(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function th(a,u,d){var _=d instanceof gn?It(d):new gn(d);if(_.g!="")u&&(_.g=u+"."+_.g),tr(_,_.s);else{var A=l.location;_=A.protocol,u=u?u+"."+A.hostname:A.hostname,A=+A.port;var S=new gn(null);_&&er(S,_),u&&(S.g=u),A&&tr(S,A),d&&(S.l=d),_=S}return d=a.D,u=a.ya,d&&u&&le(_,d,u),le(_,"VER",a.la),$i(a,_),_}function nh(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new he(new ir({eb:d})):new he(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ih(){}n=ih.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function cr(){}cr.prototype.g=function(a,u){return new He(a,u)};function He(a,u){De.call(this),this.g=new zu(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!B(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!B(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new jn(this)}R(He,De),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){pa(this.g)},He.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=na(a),a=d);u.i.push(new Tg(u.Ya++,a)),u.G==3&&ar(u)},He.prototype.N=function(){this.g.l=null,delete this.j,pa(this.g),delete this.g,He.aa.N.call(this)};function sh(a){sa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}R(sh,sa);function rh(){ra.call(this),this.status=1}R(rh,ra);function jn(a){this.g=a}R(jn,ih),jn.prototype.ua=function(){Ue(this.g,"a")},jn.prototype.ta=function(a){Ue(this.g,new sh(a))},jn.prototype.sa=function(a){Ue(this.g,new rh)},jn.prototype.ra=function(){Ue(this.g,"b")},cr.prototype.createWebChannel=cr.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,P_=function(){return new cr},S_=function(){return Ys()},R_=_n,ol={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Xs.NO_ERROR=0,Xs.TIMEOUT=8,Xs.HTTP_ERROR=6,Cr=Xs,Tu.COMPLETE="complete",C_=Tu,mu.EventType=Oi,Oi.OPEN="a",Oi.CLOSE="b",Oi.ERROR="c",Oi.MESSAGE="d",De.prototype.listen=De.prototype.K,Ji=mu,he.prototype.listenOnce=he.prototype.L,he.prototype.getLastError=he.prototype.Ka,he.prototype.getLastErrorCode=he.prototype.Ba,he.prototype.getStatus=he.prototype.Z,he.prototype.getResponseJson=he.prototype.Oa,he.prototype.getResponseText=he.prototype.oa,he.prototype.send=he.prototype.ea,he.prototype.setWithCredentials=he.prototype.Ha,A_=he}).apply(typeof pr<"u"?pr:typeof self<"u"?self:typeof window<"u"?window:{});const yd="@firebase/firestore",vd="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}xe.UNAUTHENTICATED=new xe(null),xe.GOOGLE_CREDENTIALS=new xe("google-credentials-uid"),xe.FIRST_PARTY=new xe("first-party-uid"),xe.MOCK_USER=new xe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wi="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=new _o("@firebase/firestore");function Hn(){return Dn.logLevel}function M(n,...e){if(Dn.logLevel<=K.DEBUG){const t=e.map(Cc);Dn.debug(`Firestore (${wi}): ${n}`,...t)}}function Dt(n,...e){if(Dn.logLevel<=K.ERROR){const t=e.map(Cc);Dn.error(`Firestore (${wi}): ${n}`,...t)}}function sn(n,...e){if(Dn.logLevel<=K.WARN){const t=e.map(Cc);Dn.warn(`Firestore (${wi}): ${n}`,...t)}}function Cc(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,b_(n,i,t)}function b_(n,e,t){let i=`FIRESTORE (${wi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw Dt(i),new Error(i)}function ee(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||b_(e,s,i)}function j(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class eC{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(xe.UNAUTHENTICATED))}shutdown(){}}class tC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class nC{constructor(e){this.t=e,this.currentUser=xe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ee(this.o===void 0,42304);let i=this.i;const s=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let r=new Xt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Xt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=r;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Xt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ee(typeof i.accessToken=="string",31837,{l:i}),new k_(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ee(e===null||typeof e=="string",2055,{h:e}),new xe(e)}}class iC{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=xe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class sC{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new iC(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(xe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ed{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rC{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ge(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ee(this.o===void 0,3512);const i=r=>{r.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>i(r))};const s=r=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?s(r):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ed(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ee(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ed(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=oC(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%62))}return i}}function H(n,e){return n<e?-1:n>e?1:0}function al(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=n.codePointAt(t),s=e.codePointAt(t);if(i!==s){if(i<128&&s<128)return H(i,s);{const r=N_(),o=aC(r.encode(Td(n,t)),r.encode(Td(e,t)));return o!==0?o:H(i,s)}}t+=i>65535?2:1}return H(n.length,e.length)}function Td(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function aC(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return H(n[t],e[t]);return H(n.length,e.length)}function hi(n,e,t){return n.length===e.length&&n.every((i,s)=>t(i,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="__name__";class at{constructor(e,t,i){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&F(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return at.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof at?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const r=at.compareSegments(e.get(s),t.get(s));if(r!==0)return r}return H(e.length,t.length)}static compareSegments(e,t){const i=at.isNumericId(e),s=at.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?at.extractNumericId(e).compare(at.extractNumericId(t)):al(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Yt.fromString(e.substring(4,e.length-2))}}class oe extends at{construct(e,t,i){return new oe(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new oe(t)}static emptyPath(){return new oe([])}}const lC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pe extends at{construct(e,t,i){return new Pe(e,t,i)}static isValidIdentifier(e){return lC.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Id}static keyField(){return new Pe([Id])}static fromServerFormat(e){const t=[];let i="",s=0;const r=()=>{if(i.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(i+=l,s++):(r(),s++)}if(r(),o)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pe(t)}static emptyPath(){return new Pe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(oe.fromString(e))}static fromName(e){return new L(oe.fromString(e).popFirst(5))}static empty(){return new L(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new oe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function cC(n,e,t,i){if(e===!0&&i===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function wd(n){if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ad(n){if(L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function O_(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function No(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function dt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=No(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(n,e){const t={typeString:n};return e&&(t.value=e),t}function Bs(n,e){if(!O_(n))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const s=e[i].typeString,r="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const o=n[i];if(s&&typeof o!==s){t=`JSON field '${i}' must be a ${s}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${i}' field to equal '${r.value}'`;break}}if(t)throw new V(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cd=-62135596800,Rd=1e6;class ce{static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Rd);return new ce(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Cd)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Rd}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ce._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Bs(e,ce._jsonSchema))return new ce(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Cd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ce._jsonSchemaVersion="firestore/timestamp/1.0",ce._jsonSchema={type:ve("string",ce._jsonSchemaVersion),seconds:ve("number"),nanoseconds:ve("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(e){return new q(e)}static min(){return new q(new ce(0,0))}static max(){return new q(new ce(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=-1;function uC(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=q.fromTimestamp(i===1e9?new ce(t+1,0):new ce(t,i));return new rn(s,L.empty(),e)}function hC(n){return new rn(n.readTime,n.key,Is)}class rn{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new rn(q.min(),L.empty(),Is)}static max(){return new rn(q.max(),L.empty(),Is)}}function dC(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ai(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==fC)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):b.reject(t)}static resolve(e){return new b((t,i)=>{t(e)})}static reject(e){return new b((t,i)=>{i(e)})}static waitFor(e){return new b((t,i)=>{let s=0,r=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++r,o&&r===s&&t()},c=>i(c))}),o=!0,r===s&&t()})}static or(e){let t=b.resolve(!1);for(const i of e)t=t.next(s=>s?b.resolve(s):i());return t}static forEach(e,t){const i=[];return e.forEach((s,r)=>{i.push(t.call(this,s,r))}),this.waitFor(i)}static mapArray(e,t){return new b((i,s)=>{const r=e.length,o=new Array(r);let l=0;for(let c=0;c<r;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++l,l===r&&i(o)},f=>s(f))}})}static doWhile(e,t){return new b((i,s)=>{const r=()=>{e()===!0?t().next(()=>{r()},s):i()};r()})}}function _C(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ci(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this._e(i),this.ae=i=>t.writeSequenceNumber(i))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Do.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc=-1;function Oo(n){return n==null}function to(n){return n===0&&1/n==-1/0}function mC(n){return typeof n=="number"&&Number.isInteger(n)&&!to(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_="";function gC(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Sd(e)),e=yC(n.get(t),e);return Sd(e)}function yC(n,e){let t=e;const i=n.length;for(let s=0;s<i;s++){const r=n.charAt(s);switch(r){case"\0":t+="";break;case V_:t+="";break;default:t+=r}}return t}function Sd(n){return n+V_+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function fn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function M_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t){this.comparator=e,this.root=t||Re.EMPTY}insert(e,t){return new ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Re.BLACK,null,null))}remove(e){return new ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Re.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _r(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _r(this.root,e,this.comparator,!1)}getReverseIterator(){return new _r(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _r(this.root,e,this.comparator,!0)}}class _r{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Re{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Re.RED,this.left=s??Re.EMPTY,this.right=r??Re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new Re(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Re.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}}Re.EMPTY=null,Re.RED=!0,Re.BLACK=!1;Re.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,i,s,r){return this}insert(e,t,i){return new Re(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new bd(this.data.getIterator())}getIteratorFrom(e){return new bd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class bd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.fields=e,e.sort(Pe.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new Ee(Pe.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return hi(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new x_("Invalid base64 string: "+r):r}}(e);return new ke(t)}static fromUint8Array(e){const t=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(e);return new ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ke.EMPTY_BYTE_STRING=new ke("");const vC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function on(n){if(ee(!!n,39018),typeof n=="string"){let e=0;const t=vC.exec(n);if(ee(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:me(n.seconds),nanos:me(n.nanos)}}function me(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function an(n){return typeof n=="string"?ke.fromBase64String(n):ke.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L_="server_timestamp",F_="__type__",U_="__previous_value__",B_="__local_write_time__";function Pc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[F_])===null||t===void 0?void 0:t.stringValue)===L_}function Vo(n){const e=n.mapValue.fields[U_];return Pc(e)?Vo(e):e}function ws(n){const e=on(n.mapValue.fields[B_].timestampValue);return new ce(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e,t,i,s,r,o,l,c,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f}}const no="(default)";class As{constructor(e,t){this.projectId=e,this.database=t||no}static empty(){return new As("","")}get isDefaultDatabase(){return this.database===no}isEqual(e){return e instanceof As&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_="__type__",TC="__max__",mr={mapValue:{}},j_="__vector__",io="value";function ln(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Pc(n)?4:wC(n)?9007199254740991:IC(n)?10:11:F(28295,{value:n})}function yt(n,e){if(n===e)return!0;const t=ln(n);if(t!==ln(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ws(n).isEqual(ws(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const o=on(s.timestampValue),l=on(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,r){return an(s.bytesValue).isEqual(an(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,r){return me(s.geoPointValue.latitude)===me(r.geoPointValue.latitude)&&me(s.geoPointValue.longitude)===me(r.geoPointValue.longitude)}(n,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return me(s.integerValue)===me(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const o=me(s.doubleValue),l=me(r.doubleValue);return o===l?to(o)===to(l):isNaN(o)&&isNaN(l)}return!1}(n,e);case 9:return hi(n.arrayValue.values||[],e.arrayValue.values||[],yt);case 10:case 11:return function(s,r){const o=s.mapValue.fields||{},l=r.mapValue.fields||{};if(Pd(o)!==Pd(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!yt(o[c],l[c])))return!1;return!0}(n,e);default:return F(52216,{left:n})}}function Cs(n,e){return(n.values||[]).find(t=>yt(t,e))!==void 0}function di(n,e){if(n===e)return 0;const t=ln(n),i=ln(e);if(t!==i)return H(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(r,o){const l=me(r.integerValue||r.doubleValue),c=me(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return kd(n.timestampValue,e.timestampValue);case 4:return kd(ws(n),ws(e));case 5:return al(n.stringValue,e.stringValue);case 6:return function(r,o){const l=an(r),c=an(o);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=H(l[h],c[h]);if(f!==0)return f}return H(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const l=H(me(r.latitude),me(o.latitude));return l!==0?l:H(me(r.longitude),me(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Nd(n.arrayValue,e.arrayValue);case 10:return function(r,o){var l,c,h,f;const p=r.fields||{},m=o.fields||{},T=(l=p[io])===null||l===void 0?void 0:l.arrayValue,R=(c=m[io])===null||c===void 0?void 0:c.arrayValue,N=H(((h=T==null?void 0:T.values)===null||h===void 0?void 0:h.length)||0,((f=R==null?void 0:R.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Nd(T,R)}(n.mapValue,e.mapValue);case 11:return function(r,o){if(r===mr.mapValue&&o===mr.mapValue)return 0;if(r===mr.mapValue)return 1;if(o===mr.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const m=al(c[p],f[p]);if(m!==0)return m;const T=di(l[c[p]],h[f[p]]);if(T!==0)return T}return H(c.length,f.length)}(n.mapValue,e.mapValue);default:throw F(23264,{le:t})}}function kd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=on(n),i=on(e),s=H(t.seconds,i.seconds);return s!==0?s:H(t.nanos,i.nanos)}function Nd(n,e){const t=n.values||[],i=e.values||[];for(let s=0;s<t.length&&s<i.length;++s){const r=di(t[s],i[s]);if(r)return r}return H(t.length,i.length)}function fi(n){return ll(n)}function ll(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=on(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return an(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",s=!0;for(const r of t.values||[])s?s=!1:i+=",",i+=ll(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const o of i)r?r=!1:s+=",",s+=`${o}:${ll(t.fields[o])}`;return s+"}"}(n.mapValue):F(61005,{value:n})}function Rr(n){switch(ln(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Vo(n);return e?16+Rr(e):16;case 5:return 2*n.stringValue.length;case 6:return an(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((s,r)=>s+Rr(r),0)}(n.arrayValue);case 10:case 11:return function(i){let s=0;return fn(i.fields,(r,o)=>{s+=r.length+Rr(o)}),s}(n.mapValue);default:throw F(13486,{value:n})}}function Dd(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cl(n){return!!n&&"integerValue"in n}function bc(n){return!!n&&"arrayValue"in n}function Od(n){return!!n&&"nullValue"in n}function Vd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Sr(n){return!!n&&"mapValue"in n}function IC(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[q_])===null||t===void 0?void 0:t.stringValue)===j_}function cs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return fn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=cs(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=cs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function wC(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===TC}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.value=e}static empty(){return new We({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Sr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=cs(t)}setAll(e){let t=Pe.emptyPath(),i={},s=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,s),i={},s=[],t=l.popLast()}o?i[l.lastSegment()]=cs(o):s.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){const t=this.field(e.popLast());Sr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];Sr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){fn(t,(s,r)=>e[s]=r);for(const s of i)delete e[s]}clone(){return new We(cs(this.value))}}function W_(n){const e=[];return fn(n.fields,(t,i)=>{const s=new Pe([t]);if(Sr(i)){const r=W_(i.mapValue).fields;if(r.length===0)e.push(s);else for(const o of r)e.push(s.child(o))}else e.push(s)}),new Ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,t,i,s,r,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Le(e,0,q.min(),q.min(),q.min(),We.empty(),0)}static newFoundDocument(e,t,i,s){return new Le(e,1,t,q.min(),i,s,0)}static newNoDocument(e,t){return new Le(e,2,t,q.min(),q.min(),We.empty(),0)}static newUnknownDocument(e,t){return new Le(e,3,t,q.min(),q.min(),We.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=We.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=We.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t){this.position=e,this.inclusive=t}}function Md(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){const r=e[s],o=n.position[s];if(r.field.isKeyField()?i=L.comparator(L.fromName(o.referenceValue),t.key):i=di(o,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function xd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!yt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t="asc"){this.field=e,this.dir=t}}function AC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{}class ye extends $_{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new RC(e,t,i):t==="array-contains"?new bC(e,i):t==="in"?new kC(e,i):t==="not-in"?new NC(e,i):t==="array-contains-any"?new DC(e,i):new ye(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new SC(e,i):new PC(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(di(t,this.value)):t!==null&&ln(this.value)===ln(t)&&this.matchesComparison(di(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ot extends $_{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ot(e,t)}matches(e){return H_(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function H_(n){return n.op==="and"}function z_(n){return CC(n)&&H_(n)}function CC(n){for(const e of n.filters)if(e instanceof ot)return!1;return!0}function ul(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+fi(n.value);if(z_(n))return n.filters.map(e=>ul(e)).join(",");{const e=n.filters.map(t=>ul(t)).join(",");return`${n.op}(${e})`}}function G_(n,e){return n instanceof ye?function(i,s){return s instanceof ye&&i.op===s.op&&i.field.isEqual(s.field)&&yt(i.value,s.value)}(n,e):n instanceof ot?function(i,s){return s instanceof ot&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,o,l)=>r&&G_(o,s.filters[l]),!0):!1}(n,e):void F(19439)}function K_(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${fi(t.value)}`}(n):n instanceof ot?function(t){return t.op.toString()+" {"+t.getFilters().map(K_).join(" ,")+"}"}(n):"Filter"}class RC extends ye{constructor(e,t,i){super(e,t,i),this.key=L.fromName(i.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class SC extends ye{constructor(e,t){super(e,"in",t),this.keys=Q_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class PC extends ye{constructor(e,t){super(e,"not-in",t),this.keys=Q_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Q_(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>L.fromName(i.referenceValue))}class bC extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return bc(t)&&Cs(t.arrayValue,this.value)}}class kC extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Cs(this.value.arrayValue,t)}}class NC extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(Cs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Cs(this.value.arrayValue,t)}}class DC extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!bc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Cs(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OC{constructor(e,t=null,i=[],s=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=l,this.Pe=null}}function Ld(n,e=null,t=[],i=[],s=null,r=null,o=null){return new OC(n,e,t,i,s,r,o)}function kc(n){const e=j(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>ul(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),Oo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>fi(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>fi(i)).join(",")),e.Pe=t}return e.Pe}function Nc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!AC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!G_(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!xd(n.startAt,e.startAt)&&xd(n.endAt,e.endAt)}function hl(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t=null,i=[],s=[],r=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=c,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function VC(n,e,t,i,s,r,o,l){return new Ri(n,e,t,i,s,r,o,l)}function Mo(n){return new Ri(n)}function Fd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Y_(n){return n.collectionGroup!==null}function us(n){const e=j(n);if(e.Te===null){e.Te=[];const t=new Set;for(const r of e.explicitOrderBy)e.Te.push(r),t.add(r.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ee(Pe.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Te.push(new Rs(r,i))}),t.has(Pe.keyField().canonicalString())||e.Te.push(new Rs(Pe.keyField(),i))}return e.Te}function ft(n){const e=j(n);return e.Ie||(e.Ie=MC(e,us(n))),e.Ie}function MC(n,e){if(n.limitType==="F")return Ld(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new Rs(s.field,r)});const t=n.endAt?new so(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new so(n.startAt.position,n.startAt.inclusive):null;return Ld(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function dl(n,e){const t=n.filters.concat([e]);return new Ri(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function fl(n,e,t){return new Ri(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function xo(n,e){return Nc(ft(n),ft(e))&&n.limitType===e.limitType}function X_(n){return`${kc(ft(n))}|lt:${n.limitType}`}function zn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(s=>K_(s)).join(", ")}]`),Oo(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(s=>fi(s)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(s=>fi(s)).join(",")),`Target(${i})`}(ft(n))}; limitType=${n.limitType})`}function Lo(n,e){return e.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):L.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,e)&&function(i,s){for(const r of us(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,e)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,e)&&function(i,s){return!(i.startAt&&!function(o,l,c){const h=Md(o,l,c);return o.inclusive?h<=0:h<0}(i.startAt,us(i),s)||i.endAt&&!function(o,l,c){const h=Md(o,l,c);return o.inclusive?h>=0:h>0}(i.endAt,us(i),s))}(n,e)}function xC(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function J_(n){return(e,t)=>{let i=!1;for(const s of us(n)){const r=LC(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function LC(n,e,t){const i=n.field.isKeyField()?L.comparator(e.key,t.key):function(r,o,l){const c=o.data.field(r),h=l.data.field(r);return c!==null&&h!==null?di(c,h):F(42886)}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){fn(this.inner,(t,i)=>{for(const[s,r]of i)e(s,r)})}isEmpty(){return M_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FC=new ue(L.comparator);function Ot(){return FC}const Z_=new ue(L.comparator);function Zi(...n){let e=Z_;for(const t of n)e=e.insert(t.key,t);return e}function em(n){let e=Z_;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function In(){return hs()}function tm(){return hs()}function hs(){return new Ln(n=>n.toString(),(n,e)=>n.isEqual(e))}const UC=new ue(L.comparator),BC=new Ee(L.comparator);function Y(...n){let e=BC;for(const t of n)e=e.add(t);return e}const qC=new Ee(H);function jC(){return qC}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:to(e)?"-0":e}}function nm(n){return{integerValue:""+n}}function WC(n,e){return mC(e)?nm(e):Dc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(){this._=void 0}}function $C(n,e,t){return n instanceof Ss?function(s,r){const o={fields:{[F_]:{stringValue:L_},[B_]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Pc(r)&&(r=Vo(r)),r&&(o.fields[U_]=r),{mapValue:o}}(t,e):n instanceof Ps?sm(n,e):n instanceof bs?rm(n,e):function(s,r){const o=im(s,r),l=Ud(o)+Ud(s.Ee);return cl(o)&&cl(s.Ee)?nm(l):Dc(s.serializer,l)}(n,e)}function HC(n,e,t){return n instanceof Ps?sm(n,e):n instanceof bs?rm(n,e):t}function im(n,e){return n instanceof ro?function(i){return cl(i)||function(r){return!!r&&"doubleValue"in r}(i)}(e)?e:{integerValue:0}:null}class Ss extends Fo{}class Ps extends Fo{constructor(e){super(),this.elements=e}}function sm(n,e){const t=om(e);for(const i of n.elements)t.some(s=>yt(s,i))||t.push(i);return{arrayValue:{values:t}}}class bs extends Fo{constructor(e){super(),this.elements=e}}function rm(n,e){let t=om(e);for(const i of n.elements)t=t.filter(s=>!yt(s,i));return{arrayValue:{values:t}}}class ro extends Fo{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Ud(n){return me(n.integerValue||n.doubleValue)}function om(n){return bc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{constructor(e,t){this.field=e,this.transform=t}}function GC(n,e){return n.field.isEqual(e.field)&&function(i,s){return i instanceof Ps&&s instanceof Ps||i instanceof bs&&s instanceof bs?hi(i.elements,s.elements,yt):i instanceof ro&&s instanceof ro?yt(i.Ee,s.Ee):i instanceof Ss&&s instanceof Ss}(n.transform,e.transform)}class KC{constructor(e,t){this.version=e,this.transformResults=t}}class pt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pt}static exists(e){return new pt(void 0,e)}static updateTime(e){return new pt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Pr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Uo{}function am(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new cm(n.key,pt.none()):new qs(n.key,n.data,pt.none());{const t=n.data,i=We.empty();let s=new Ee(Pe.comparator);for(let r of e.fields)if(!s.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new pn(n.key,i,new Ke(s.toArray()),pt.none())}}function QC(n,e,t){n instanceof qs?function(s,r,o){const l=s.value.clone(),c=qd(s.fieldTransforms,r,o.transformResults);l.setAll(c),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):n instanceof pn?function(s,r,o){if(!Pr(s.precondition,r))return void r.convertToUnknownDocument(o.version);const l=qd(s.fieldTransforms,r,o.transformResults),c=r.data;c.setAll(lm(s)),c.setAll(l),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(s,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ds(n,e,t,i){return n instanceof qs?function(r,o,l,c){if(!Pr(r.precondition,o))return l;const h=r.value.clone(),f=jd(r.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,i):n instanceof pn?function(r,o,l,c){if(!Pr(r.precondition,o))return l;const h=jd(r.fieldTransforms,c,o),f=o.data;return f.setAll(lm(r)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(n,e,t,i):function(r,o,l){return Pr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(n,e,t)}function YC(n,e){let t=null;for(const i of n.fieldTransforms){const s=e.data.field(i.field),r=im(i.transform,s||null);r!=null&&(t===null&&(t=We.empty()),t.set(i.field,r))}return t||null}function Bd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&hi(i,s,(r,o)=>GC(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class qs extends Uo{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class pn extends Uo{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function lm(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function qd(n,e,t){const i=new Map;ee(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let s=0;s<t.length;s++){const r=n[s],o=r.transform,l=e.data.field(r.field);i.set(r.field,HC(o,l,t[s]))}return i}function jd(n,e,t){const i=new Map;for(const s of n){const r=s.transform,o=t.data.field(s.field);i.set(s.field,$C(r,o,e))}return i}class cm extends Uo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class XC extends Uo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JC{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&QC(r,e,i[s])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=ds(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=ds(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=tm();return this.mutations.forEach(s=>{const r=e.get(s.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(s.key)?null:l;const c=am(o,l);c!==null&&i.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(q.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&hi(this.mutations,e.mutations,(t,i)=>Bd(t,i))&&hi(this.baseMutations,e.baseMutations,(t,i)=>Bd(t,i))}}class Oc{constructor(e,t,i,s){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=s}static from(e,t,i){ee(e.mutations.length===i.length,58842,{Ve:e.mutations.length,me:i.length});let s=function(){return UC}();const r=e.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new Oc(e,t,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZC{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge,X;function tR(n){switch(n){case P.OK:return F(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function um(n){if(n===void 0)return Dt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ge.OK:return P.OK;case ge.CANCELLED:return P.CANCELLED;case ge.UNKNOWN:return P.UNKNOWN;case ge.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ge.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ge.INTERNAL:return P.INTERNAL;case ge.UNAVAILABLE:return P.UNAVAILABLE;case ge.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ge.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ge.NOT_FOUND:return P.NOT_FOUND;case ge.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ge.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ge.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ge.ABORTED:return P.ABORTED;case ge.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ge.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ge.DATA_LOSS:return P.DATA_LOSS;default:return F(39323,{code:n})}}(X=ge||(ge={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nR=new Yt([4294967295,4294967295],0);function Wd(n){const e=N_().encode(n),t=new w_;return t.update(e),new Uint8Array(t.digest())}function $d(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Yt([t,i],0),new Yt([s,r],0)]}class Vc{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new es(`Invalid padding: ${t}`);if(i<0)throw new es(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new es(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new es(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Yt.fromNumber(this.fe)}pe(e,t,i){let s=e.add(t.multiply(Yt.fromNumber(i)));return s.compare(nR)===1&&(s=new Yt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Wd(e),[i,s]=$d(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(i,s,r);if(!this.ye(o))return!1}return!0}static create(e,t,i){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Vc(r,s,t);return i.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const t=Wd(e),[i,s]=$d(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(i,s,r);this.we(o)}}we(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class es extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const s=new Map;return s.set(e,js.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new Bo(q.min(),s,new ue(H),Ot(),Y())}}class js{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new js(i,t,Y(),Y(),Y())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,i,s){this.Se=e,this.removedTargetIds=t,this.key=i,this.be=s}}class hm{constructor(e,t){this.targetId=e,this.De=t}}class dm{constructor(e,t,i=ke.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}}class Hd{constructor(){this.ve=0,this.Ce=zd(),this.Fe=ke.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Y(),t=Y(),i=Y();return this.Ce.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:F(38017,{changeType:r})}}),new js(this.Fe,this.Me,e,t,i)}ke(){this.xe=!1,this.Ce=zd()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,ee(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class iR{constructor(e){this.We=e,this.Ge=new Map,this.ze=Ot(),this.je=gr(),this.Je=gr(),this.He=new ue(H)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const i=this.tt(t);switch(e.state){case 0:this.nt(t)&&i.Be(e.resumeToken);break;case 1:i.Ue(),i.Oe||i.ke(),i.Be(e.resumeToken);break;case 2:i.Ue(),i.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(i.Ke(),i.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),i.Be(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((i,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,i=e.De.count,s=this.st(t);if(s){const r=s.target;if(hl(r))if(i===0){const o=new L(r.path);this.Xe(t,o,Le.newNoDocument(o,q.min()))}else ee(i===1,20013,{expectedCount:i});else{const o=this.ot(t);if(o!==i){const l=this._t(e),c=l?this.ut(l,e,o):1;if(c!==0){this.rt(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=t;let o,l;try{o=an(i).toUint8Array()}catch(c){if(c instanceof x_)return sn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Vc(o,s,r)}catch(c){return sn(c instanceof es?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.fe===0?null:l}ut(e,t,i){return t.De.count===i-this.ht(e,t.targetId)?0:2}ht(e,t){const i=this.We.getRemoteKeysForTarget(t);let s=0;return i.forEach(r=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,r,null),s++)}),s}Pt(e){const t=new Map;this.Ge.forEach((r,o)=>{const l=this.st(o);if(l){if(r.current&&hl(l.target)){const c=new L(l.target.path);this.Tt(c).has(o)||this.It(o,c)||this.Xe(o,c,Le.newNoDocument(c,e))}r.Ne&&(t.set(o,r.Le()),r.ke())}});let i=Y();this.Je.forEach((r,o)=>{let l=!0;o.forEachWhile(c=>{const h=this.st(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(r))}),this.ze.forEach((r,o)=>o.setReadTime(e));const s=new Bo(e,t,this.He,this.ze,i);return this.ze=Ot(),this.je=gr(),this.Je=gr(),this.He=new ue(H),s}Ze(e,t){if(!this.nt(e))return;const i=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,i),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,i){if(!this.nt(e))return;const s=this.tt(e);this.It(e,t)?s.qe(t,1):s.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),i&&(this.ze=this.ze.insert(t,i))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Hd,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ee(H),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ee(H),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Hd),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function gr(){return new ue(L.comparator)}function zd(){return new ue(L.comparator)}const sR={asc:"ASCENDING",desc:"DESCENDING"},rR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},oR={and:"AND",or:"OR"};class aR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function pl(n,e){return n.useProto3Json||Oo(e)?e:{value:e}}function oo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function fm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function lR(n,e){return oo(n,e.toTimestamp())}function _t(n){return ee(!!n,49232),q.fromTimestamp(function(t){const i=on(t);return new ce(i.seconds,i.nanos)}(n))}function Mc(n,e){return _l(n,e).canonicalString()}function _l(n,e){const t=function(s){return new oe(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function pm(n){const e=oe.fromString(n);return ee(vm(e),10190,{key:e.toString()}),e}function ml(n,e){return Mc(n.databaseId,e.path)}function Da(n,e){const t=pm(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(mm(t))}function _m(n,e){return Mc(n.databaseId,e)}function cR(n){const e=pm(n);return e.length===4?oe.emptyPath():mm(e)}function gl(n){return new oe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function mm(n){return ee(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Gd(n,e,t){return{name:ml(n,e),fields:t.value.mapValue.fields}}function uR(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(ee(f===void 0||typeof f=="string",58123),ke.fromBase64String(f||"")):(ee(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ke.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?P.UNKNOWN:um(h.code);return new V(f,h.message||"")}(o);t=new dm(i,s,r,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=Da(n,i.document.name),r=_t(i.document.updateTime),o=i.document.createTime?_t(i.document.createTime):q.min(),l=new We({mapValue:{fields:i.document.fields}}),c=Le.newFoundDocument(s,r,o,l),h=i.targetIds||[],f=i.removedTargetIds||[];t=new br(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=Da(n,i.document),r=i.readTime?_t(i.readTime):q.min(),o=Le.newNoDocument(s,r),l=i.removedTargetIds||[];t=new br([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=Da(n,i.document),r=i.removedTargetIds||[];t=new br([],r,s,null)}else{if(!("filter"in e))return F(11601,{At:e});{e.filter;const i=e.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,o=new eR(s,r),l=i.targetId;t=new hm(l,o)}}return t}function hR(n,e){let t;if(e instanceof qs)t={update:Gd(n,e.key,e.value)};else if(e instanceof cm)t={delete:ml(n,e.key)};else if(e instanceof pn)t={update:Gd(n,e.key,e.data),updateMask:ER(e.fieldMask)};else{if(!(e instanceof XC))return F(16599,{Rt:e.type});t={verify:ml(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(r,o){const l=o.transform;if(l instanceof Ss)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ps)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof bs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ro)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw F(20930,{transform:o.transform})}(0,i))),e.precondition.isNone||(t.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:lR(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F(27497)}(n,e.precondition)),t}function dR(n,e){return n&&n.length>0?(ee(e!==void 0,14353),n.map(t=>function(s,r){let o=s.updateTime?_t(s.updateTime):_t(r);return o.isEqual(q.min())&&(o=_t(r)),new KC(o,s.transformResults||[])}(t,e))):[]}function fR(n,e){return{documents:[_m(n,e.path)]}}function pR(n,e){const t={structuredQuery:{}},i=e.path;let s;e.collectionGroup!==null?(s=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=_m(n,s);const r=function(h){if(h.length!==0)return ym(ot.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:Gn(m.field),direction:gR(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=pl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:s}}function _R(n){let e=cR(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let s=null;if(i>0){ee(i===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(p){const m=gm(p);return m instanceof ot&&z_(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(R){return new Rs(Kn(R.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,Oo(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(p){const m=!!p.before,T=p.values||[];return new so(T,m)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const m=!p.before,T=p.values||[];return new so(T,m)}(t.endAt)),VC(e,s,o,r,l,"F",c,h)}function mR(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function gm(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Kn(t.unaryFilter.field);return ye.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=Kn(t.unaryFilter.field);return ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Kn(t.unaryFilter.field);return ye.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Kn(t.unaryFilter.field);return ye.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(n):n.fieldFilter!==void 0?function(t){return ye.create(Kn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ot.create(t.compositeFilter.filters.map(i=>gm(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(n):F(30097,{filter:n})}function gR(n){return sR[n]}function yR(n){return rR[n]}function vR(n){return oR[n]}function Gn(n){return{fieldPath:n.canonicalString()}}function Kn(n){return Pe.fromServerFormat(n.fieldPath)}function ym(n){return n instanceof ye?function(t){if(t.op==="=="){if(Vd(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NAN"}};if(Od(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Vd(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NAN"}};if(Od(t.value))return{unaryFilter:{field:Gn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gn(t.field),op:yR(t.op),value:t.value}}}(n):n instanceof ot?function(t){const i=t.getFilters().map(s=>ym(s));return i.length===1?i[0]:{compositeFilter:{op:vR(t.op),filters:i}}}(n):F(54877,{filter:n})}function ER(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function vm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t,i,s,r=q.min(),o=q.min(),l=ke.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new zt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TR{constructor(e){this.gt=e}}function IR(n){const e=_R({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(){this.Dn=new AR}addToCollectionParentIndex(e,t){return this.Dn.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(rn.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(rn.min())}updateCollectionGroup(e,t,i){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class AR{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new Ee(oe.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new Ee(oe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Em=41943040;class je{static withCacheSize(e){return new je(e,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je.DEFAULT_COLLECTION_PERCENTILE=10,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,je.DEFAULT=new je(Em,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),je.DISABLED=new je(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new pi(0)}static ur(){return new pi(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd="LruGarbageCollector",CR=1048576;function Yd([n,e],[t,i]){const s=H(n,t);return s===0?H(e,i):s}class RR{constructor(e){this.Tr=e,this.buffer=new Ee(Yd),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();Yd(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class SR{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){M(Qd,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ci(t)?M(Qd,"Ignoring IndexedDB error during garbage collection: ",t):await Ai(t)}await this.Rr(3e5)})}}class PR{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(i=>Math.floor(t/100*i))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Do.ue);const i=new RR(t);return this.Vr.forEachTarget(e,s=>i.Er(s.sequenceNumber)).next(()=>this.Vr.gr(e,s=>i.Er(s))).next(()=>i.maxValue)}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(M("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(Kd)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(M("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Kd):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let i,s,r,o,l,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(M("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(i=p,l=Date.now(),this.removeTargets(e,i,t))).next(p=>(r=p,c=Date.now(),this.removeOrphanedDocuments(e,i))).next(p=>(h=Date.now(),Hn()<=K.DEBUG&&M("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${r} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:p})))}}function bR(n,e){return new PR(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kR{constructor(){this.changes=new Ln(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?b.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NR{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DR{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(i!==null&&ds(i.mutation,s,Ke.empty(),ce.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,Y()).next(()=>i))}getLocalViewOfDocuments(e,t,i=Y()){const s=In();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,i).next(r=>{let o=Zi();return r.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const i=In();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,Y()))}populateOverlays(e,t,i){const s=[];return i.forEach(r=>{t.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(e,s).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,i,s){let r=Ot();const o=hs(),l=function(){return hs()}();return t.forEach((c,h)=>{const f=i.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof pn)?r=r.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ds(f.mutation,h,f.mutation.getFieldMask(),ce.now())):o.set(h.key,Ke.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new NR(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const i=hs();let s=new ue((o,l)=>o-l),r=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=i.get(c)||Ke.empty();f=l.applyToLocalView(h,f),i.set(c,f);const p=(s.get(l.batchId)||Y()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,p=tm();f.forEach(m=>{if(!r.has(m)){const T=am(t.get(m),i.get(m));T!==null&&p.set(m,T),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return b.waitFor(o)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,s){return function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Y_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,s):this.getDocumentsMatchingCollectionQuery(e,t,i,s)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next(r=>{const o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):b.resolve(In());let l=Is,c=r;return o.next(h=>b.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),r.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,c,h,Y())).next(f=>({batchId:l,changes:em(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(i=>{let s=Zi();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,i,s){const r=t.collectionGroup;let o=Zi();return this.indexManager.getCollectionParents(e,r).next(l=>b.forEach(l,c=>{const h=function(p,m){return new Ri(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,i,s).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,r,s))).next(o=>{r.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Le.newInvalidDocument(f)))});let l=Zi();return o.forEach((c,h)=>{const f=r.get(c);f!==void 0&&ds(f.mutation,h,Ke.empty(),ce.now()),Lo(t,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OR{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return b.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(s){return{id:s.id,version:s.version,createTime:_t(s.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(s){return{name:s.name,query:IR(s.bundledQuery),readTime:_t(s.readTime)}}(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VR{constructor(){this.overlays=new ue(L.comparator),this.kr=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const i=In();return b.forEach(t,s=>this.getOverlay(e,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((s,r)=>{this.wt(e,t,r)}),b.resolve()}removeOverlaysForBatchId(e,t,i){const s=this.kr.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.kr.delete(i)),b.resolve()}getOverlaysForCollection(e,t,i){const s=In(),r=t.length+1,o=new L(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return b.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new ue((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>i){let f=r.get(h.largestBatchId);f===null&&(f=In(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=In(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return b.resolve(l)}wt(e,t,i){const s=this.overlays.get(i.key);if(s!==null){const o=this.kr.get(s.largestBatchId).delete(i.key);this.kr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new ZC(t,i));let r=this.kr.get(t);r===void 0&&(r=Y(),this.kr.set(t,r)),this.kr.set(t,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MR{constructor(){this.sessionToken=ke.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(){this.qr=new Ee(Ie.Qr),this.$r=new Ee(Ie.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const i=new Ie(e,t);this.qr=this.qr.add(i),this.$r=this.$r.add(i)}Kr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Wr(new Ie(e,t))}Gr(e,t){e.forEach(i=>this.removeReference(i,t))}zr(e){const t=new L(new oe([])),i=new Ie(t,e),s=new Ie(t,e+1),r=[];return this.$r.forEachInRange([i,s],o=>{this.Wr(o),r.push(o.key)}),r}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new L(new oe([])),i=new Ie(t,e),s=new Ie(t,e+1);let r=Y();return this.$r.forEachInRange([i,s],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Ie(e,0),i=this.qr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class Ie{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return L.comparator(e.key,t.key)||H(e.Hr,t.Hr)}static Ur(e,t){return H(e.Hr,t.Hr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ee(Ie.Qr)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){const r=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new JC(r,t,i,s);this.mutationQueue.push(o);for(const l of s)this.Yr=this.Yr.add(new Ie(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,s=this.Xr(i),r=s<0?0:s;return b.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?Sc:this.er-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new Ie(t,0),s=new Ie(t,Number.POSITIVE_INFINITY),r=[];return this.Yr.forEachInRange([i,s],o=>{const l=this.Zr(o.Hr);r.push(l)}),b.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new Ee(H);return t.forEach(s=>{const r=new Ie(s,0),o=new Ie(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([r,o],l=>{i=i.add(l.Hr)})}),b.resolve(this.ei(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,s=i.length+1;let r=i;L.isDocumentKey(r)||(r=r.child(""));const o=new Ie(new L(r),0);let l=new Ee(H);return this.Yr.forEachWhile(c=>{const h=c.key.path;return!!i.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.Hr)),!0)},o),b.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(i=>{const s=this.Zr(i);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ee(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Yr;return b.forEach(t.mutations,s=>{const r=new Ie(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Yr=i})}rr(e){}containsKey(e,t){const i=new Ie(t,0),s=this.Yr.firstAfterOrEqual(i);return b.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(e){this.ni=e,this.docs=function(){return new ue(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,s=this.docs.get(i),r=s?s.size:0,o=this.ni(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return b.resolve(i?i.document.mutableCopy():Le.newInvalidDocument(t))}getEntries(e,t){let i=Ot();return t.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Le.newInvalidDocument(s))}),b.resolve(i)}getDocumentsMatchingQuery(e,t,i,s){let r=Ot();const o=t.path,l=new L(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||dC(hC(f),i)<=0||(s.has(f.key)||Lo(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return b.resolve(r)}getAllFromCollectionGroup(e,t,i,s){F(9500)}ri(e,t){return b.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new FR(this)}getSize(e){return b.resolve(this.size)}}class FR extends kR{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?t.push(this.Or.addEntry(e,s)):this.Or.removeEntry(i)}),b.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e){this.persistence=e,this.ii=new Ln(t=>kc(t),Nc),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new xc,this.targetCount=0,this._i=pi.ar()}forEachTarget(e,t){return this.ii.forEach((i,s)=>t(s)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.si&&(this.si=t),b.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new pi(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.hr(t),b.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,i){let s=0;const r=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.ii.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),b.waitFor(r).next(()=>s)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const i=this.ii.get(t)||null;return b.resolve(i)}addMatchingKeys(e,t,i){return this.oi.Kr(t,i),b.resolve()}removeMatchingKeys(e,t,i){this.oi.Gr(t,i);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(o=>{r.push(s.markPotentiallyOrphaned(e,o))}),b.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const i=this.oi.Jr(t);return b.resolve(i)}containsKey(e,t){return b.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(e,t){this.ai={},this.overlays={},this.ui=new Do(0),this.ci=!1,this.ci=!0,this.li=new MR,this.referenceDelegate=e(this),this.hi=new UR(this),this.indexManager=new wR,this.remoteDocumentCache=function(s){return new LR(s)}(i=>this.referenceDelegate.Pi(i)),this.serializer=new TR(t),this.Ti=new OR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new VR,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.ai[e.toKey()];return i||(i=new xR(t,this.referenceDelegate),this.ai[e.toKey()]=i),i}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,i){M("MemoryPersistence","Starting transaction:",e);const s=new BR(this.ui.next());return this.referenceDelegate.Ii(),i(s).next(r=>this.referenceDelegate.di(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Ei(e,t){return b.or(Object.values(this.ai).map(i=>()=>i.containsKey(e,t)))}}class BR extends pC{constructor(e){super(),this.currentSequenceNumber=e}}class Lc{constructor(e){this.persistence=e,this.Ai=new xc,this.Ri=null}static Vi(e){return new Lc(e)}get mi(){if(this.Ri)return this.Ri;throw F(60996)}addReference(e,t,i){return this.Ai.addReference(i,t),this.mi.delete(i.toString()),b.resolve()}removeReference(e,t,i){return this.Ai.removeReference(i,t),this.mi.add(i.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),b.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(s=>this.mi.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(r=>this.mi.add(r.toString()))}).next(()=>i.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.mi,i=>{const s=L.fromPath(i);return this.fi(e,s).next(r=>{r||t.removeEntry(s,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(i=>{i?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return b.or([()=>b.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class ao{constructor(e,t){this.persistence=e,this.gi=new Ln(i=>gC(i.path),(i,s)=>i.isEqual(s)),this.garbageCollector=bR(this,t)}static Vi(e,t){return new ao(e,t)}Ii(){}di(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>t.next(s=>i+s))}yr(e){let t=0;return this.gr(e,i=>{t++}).next(()=>t)}gr(e,t){return b.forEach(this.gi,(i,s)=>this.Sr(e,i,s).next(r=>r?b.resolve():t(s)))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.ri(e,o=>this.Sr(e,o,t).next(l=>{l||(i++,r.removeEntry(o,q.min()))})).next(()=>r.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.gi.set(i,e.currentSequenceNumber),b.resolve()}removeReference(e,t,i){return this.gi.set(i,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),b.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Rr(e.data.value)),t}Sr(e,t,i){return b.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.gi.get(t);return b.resolve(s!==void 0&&s>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.Is=i,this.ds=s}static Es(e,t){let i=Y(),s=Y();for(const r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Fc(e,t.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jR{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return ty()?8:_C(Fe())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,i,s){const r={result:null};return this.ps(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ys(e,t,s,i).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new qR;return this.ws(e,t,o).next(l=>{if(r.result=l,this.Rs)return this.Ss(e,t,o,l.size)})}).next(()=>r.result)}Ss(e,t,i,s){return i.documentReadCount<this.Vs?(Hn()<=K.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",zn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(Hn()<=K.DEBUG&&M("QueryEngine","Query:",zn(t),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.fs*s?(Hn()<=K.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",zn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ft(t))):b.resolve())}ps(e,t){if(Fd(t))return b.resolve(null);let i=ft(t);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=fl(t,null,"F"),i=ft(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(r=>{const o=Y(...r);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,i).next(c=>{const h=this.bs(t,l);return this.Ds(t,h,o,c.readTime)?this.ps(e,fl(t,null,"F")):this.vs(e,h,t,c)}))})))}ys(e,t,i,s){return Fd(t)||s.isEqual(q.min())?b.resolve(null):this.gs.getDocuments(e,i).next(r=>{const o=this.bs(t,r);return this.Ds(t,o,i,s)?b.resolve(null):(Hn()<=K.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),zn(t)),this.vs(e,o,t,uC(s,Is)).next(l=>l))})}bs(e,t){let i=new Ee(J_(e));return t.forEach((s,r)=>{Lo(e,r)&&(i=i.add(r))}),i}Ds(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}ws(e,t,i){return Hn()<=K.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",zn(t)),this.gs.getDocumentsMatchingQuery(e,t,rn.min(),i)}vs(e,t,i,s){return this.gs.getDocumentsMatchingQuery(e,i,s).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="LocalStore",WR=3e8;class $R{constructor(e,t,i,s){this.persistence=e,this.Cs=t,this.serializer=s,this.Fs=new ue(H),this.Ms=new Ln(r=>kc(r),Nc),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(i)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new DR(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function HR(n,e,t,i){return new $R(n,e,t,i)}async function Im(n,e){const t=j(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,t.Ns(e),t.mutationQueue.getAllMutationBatches(i))).next(r=>{const o=[],l=[];let c=Y();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of r){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(i,c).next(h=>({Bs:h,removedBatchIds:o,addedBatchIds:l}))})})}function zR(n,e){const t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=e.batch.keys(),r=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,c,h,f){const p=h.batch,m=p.keys();let T=b.resolve();return m.forEach(R=>{T=T.next(()=>f.getEntry(c,R)).next(N=>{const k=h.docVersions.get(R);ee(k!==null,48541),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),T.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(t,i,e,r).next(()=>r.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let c=Y();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(i,s))})}function wm(n){const e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function GR(n,e){const t=j(n),i=e.snapshotVersion;let s=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});s=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const m=s.get(p);if(!m)return;l.push(t.hi.removeMatchingKeys(r,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(r,f.addedDocuments,p)));let T=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?T=T.withResumeToken(ke.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,i)),s=s.insert(p,T),function(N,k,W){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=WR?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(m,T,f)&&l.push(t.hi.updateTargetData(r,T))});let c=Ot(),h=Y();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(KR(r,o,e.documentUpdates).next(f=>{c=f.Ls,h=f.ks})),!i.isEqual(q.min())){const f=t.hi.getLastRemoteSnapshotVersion(r).next(p=>t.hi.setTargetsMetadata(r,r.currentSequenceNumber,i));l.push(f)}return b.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,h)).next(()=>c)}).then(r=>(t.Fs=s,r))}function KR(n,e,t){let i=Y(),s=Y();return t.forEach(r=>i=i.add(r)),e.getEntries(n,i).next(r=>{let o=Ot();return t.forEach((l,c)=>{const h=r.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(q.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):M(Uc,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ls:o,ks:s}})}function QR(n,e){const t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=Sc),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function YR(n,e){const t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return t.hi.getTargetData(i,e).next(r=>r?(s=r,b.resolve(s)):t.hi.allocateTargetId(i).next(o=>(s=new zt(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.hi.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=t.Fs.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(i.targetId,i),t.Ms.set(e,i.targetId)),i})}async function yl(n,e,t){const i=j(n),s=i.Fs.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,o=>i.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ci(o))throw o;M(Uc,`Failed to update sequence numbers for target ${e}: ${o}`)}i.Fs=i.Fs.remove(e),i.Ms.delete(s.target)}function Xd(n,e,t){const i=j(n);let s=q.min(),r=Y();return i.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=j(c),m=p.Ms.get(f);return m!==void 0?b.resolve(p.Fs.get(m)):p.hi.getTargetData(h,f)}(i,o,ft(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.hi.getMatchingKeysForTargetId(o,l.targetId).next(c=>{r=c})}).next(()=>i.Cs.getDocumentsMatchingQuery(o,e,t?s:q.min(),t?r:Y())).next(l=>(XR(i,xC(e),l),{documents:l,qs:r})))}function XR(n,e,t){let i=n.xs.get(e)||q.min();t.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.xs.set(e,i)}class Jd{constructor(){this.activeTargetIds=jC()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class JR{constructor(){this.Fo=new Jd,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,i){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Jd,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd="ConnectivityMonitor";class ef{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){M(Zd,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){M(Zd,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr=null;function vl(){return yr===null?yr=function(){return 268435456+Math.round(2147483648*Math.random())}():yr++,"0x"+yr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa="RestConnection",eS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class tS{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${i}/databases/${s}`,this.Ko=this.databaseId.database===no?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Wo(e,t,i,s,r){const o=vl(),l=this.Go(e,t.toUriEncodedString());M(Oa,`Sending RPC '${e}' ${o}:`,l,i);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(c,s,r);const{host:h}=new URL(l),f=hn(h);return this.jo(e,l,c,i,f).then(p=>(M(Oa,`Received RPC '${e}' ${o}: `,p),p),p=>{throw sn(Oa,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",i),p})}Jo(e,t,i,s,r,o){return this.Wo(e,t,i,s,r)}zo(e,t,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+wi}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,r)=>e[r]=s),i&&i.headers.forEach((s,r)=>e[r]=s)}Go(e,t){const i=eS[e];return`${this.$o}/v1/${t}:${i}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="WebChannelConnection";class iS extends tS{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,i,s,r){const o=vl();return new Promise((l,c)=>{const h=new A_;h.setWithCredentials(!0),h.listenOnce(C_.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Cr.NO_ERROR:const p=h.getResponseJson();M(Me,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Cr.TIMEOUT:M(Me,`RPC '${e}' ${o} timed out`),c(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case Cr.HTTP_ERROR:const m=h.getStatus();if(M(Me,`RPC '${e}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let T=h.getResponseJson();Array.isArray(T)&&(T=T[0]);const R=T==null?void 0:T.error;if(R&&R.status&&R.message){const N=function(W){const B=W.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN}(R.status);c(new V(N,R.message))}else c(new V(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new V(P.UNAVAILABLE,"Connection failed."));break;default:F(9055,{c_:e,streamId:o,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{M(Me,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);M(Me,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,i,15)})}P_(e,t,i){const s=vl(),r=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=P_(),l=S_(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.zo(c.initMessageHeaders,t,i),c.encodeInitMessageHeaders=!0;const f=r.join("");M(Me,`Creating RPC '${e}' stream ${s}: ${f}`,c);const p=o.createWebChannel(f,c);this.T_(p);let m=!1,T=!1;const R=new nS({Ho:k=>{T?M(Me,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(m||(M(Me,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),M(Me,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},Yo:()=>p.close()}),N=(k,W,B)=>{k.listen(W,$=>{try{B($)}catch(ae){setTimeout(()=>{throw ae},0)}})};return N(p,Ji.EventType.OPEN,()=>{T||(M(Me,`RPC '${e}' stream ${s} transport opened.`),R.s_())}),N(p,Ji.EventType.CLOSE,()=>{T||(T=!0,M(Me,`RPC '${e}' stream ${s} transport closed`),R.__(),this.I_(p))}),N(p,Ji.EventType.ERROR,k=>{T||(T=!0,sn(Me,`RPC '${e}' stream ${s} transport errored. Name:`,k.name,"Message:",k.message),R.__(new V(P.UNAVAILABLE,"The operation could not be completed")))}),N(p,Ji.EventType.MESSAGE,k=>{var W;if(!T){const B=k.data[0];ee(!!B,16349);const $=B,ae=($==null?void 0:$.error)||((W=$[0])===null||W===void 0?void 0:W.error);if(ae){M(Me,`RPC '${e}' stream ${s} received error:`,ae);const Qe=ae.status;let _e=function(v){const E=ge[v];if(E!==void 0)return um(E)}(Qe),I=ae.message;_e===void 0&&(_e=P.INTERNAL,I="Unknown error status: "+Qe+" with message "+ae.message),T=!0,R.__(new V(_e,I)),p.close()}else M(Me,`RPC '${e}' stream ${s} received:`,B),R.a_(B)}}),N(l,R_.STAT_EVENT,k=>{k.stat===ol.PROXY?M(Me,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ol.NOPROXY&&M(Me,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.o_()},0),R}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Va(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(n){return new aR(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e,t,i=1e3,s=1.5,r=6e4){this.Fi=e,this.timerId=t,this.d_=i,this.E_=s,this.A_=r,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),i=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-i);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="PersistentStream";class Cm{constructor(e,t,i,s,r,o,l,c){this.Fi=e,this.w_=i,this.S_=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Am(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Dt(t.toString()),Dt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.b_===t&&this.W_(i,s)},i=>{e(()=>{const s=new V(P.UNKNOWN,"Fetching auth token failed: "+i.message);return this.G_(s)})})}W_(e,t){const i=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{i(()=>this.listener.Zo())}),this.stream.e_(()=>{i(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{i(()=>this.G_(s))}),this.stream.onMessage(s=>{i(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return M(tf,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(M(tf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class sS extends Cm{constructor(e,t,i,s,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=uR(this.serializer,e),i=function(r){if(!("targetChange"in r))return q.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?_t(o.readTime):q.min()}(e);return this.listener.J_(t,i)}H_(e){const t={};t.database=gl(this.serializer),t.addTarget=function(r,o){let l;const c=o.target;if(l=hl(c)?{documents:fR(r,c)}:{query:pR(r,c).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=fm(r,o.resumeToken);const h=pl(r,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){l.readTime=oo(r,o.snapshotVersion.toTimestamp());const h=pl(r,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const i=mR(this.serializer,e);i&&(t.labels=i),this.k_(t)}Y_(e){const t={};t.database=gl(this.serializer),t.removeTarget=e,this.k_(t)}}class rS extends Cm{constructor(e,t,i,s,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return ee(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ee(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ee(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=dR(e.writeResults,e.commitTime),i=_t(e.commitTime);return this.listener.ta(i,t)}na(){const e={};e.database=gl(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>hR(this.serializer,i))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{}class aS extends oS{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Wo(e,_l(t,i),s,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new V(P.UNKNOWN,r.toString())})}Jo(e,t,i,s,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,_l(t,i),s,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class lS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Dt(t),this._a=!1):M("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On="RemoteStore";class cS{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=r,this.Ea.xo(o=>{i.enqueueAndForget(async()=>{Fn(this)&&(M(On,"Restarting streams for network reachability change."),await async function(c){const h=j(c);h.Ia.add(4),await Ws(h),h.Aa.set("Unknown"),h.Ia.delete(4),await jo(h)}(this))})}),this.Aa=new lS(i,s)}}async function jo(n){if(Fn(n))for(const e of n.da)await e(!0)}async function Ws(n){for(const e of n.da)await e(!1)}function Rm(n,e){const t=j(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Wc(t)?jc(t):Si(t).x_()&&qc(t,e))}function Bc(n,e){const t=j(n),i=Si(t);t.Ta.delete(e),i.x_()&&Sm(t,e),t.Ta.size===0&&(i.x_()?i.B_():Fn(t)&&t.Aa.set("Unknown"))}function qc(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Si(n).H_(e)}function Sm(n,e){n.Ra.$e(e),Si(n).Y_(e)}function jc(n){n.Ra=new iR({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),Si(n).start(),n.Aa.aa()}function Wc(n){return Fn(n)&&!Si(n).M_()&&n.Ta.size>0}function Fn(n){return j(n).Ia.size===0}function Pm(n){n.Ra=void 0}async function uS(n){n.Aa.set("Online")}async function hS(n){n.Ta.forEach((e,t)=>{qc(n,e)})}async function dS(n,e){Pm(n),Wc(n)?(n.Aa.la(e),jc(n)):n.Aa.set("Unknown")}async function fS(n,e,t){if(n.Aa.set("Online"),e instanceof dm&&e.state===2&&e.cause)try{await async function(s,r){const o=r.cause;for(const l of r.targetIds)s.Ta.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.Ta.delete(l),s.Ra.removeTarget(l))}(n,e)}catch(i){M(On,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await lo(n,i)}else if(e instanceof br?n.Ra.Ye(e):e instanceof hm?n.Ra.it(e):n.Ra.et(e),!t.isEqual(q.min()))try{const i=await wm(n.localStore);t.compareTo(i)>=0&&await function(r,o){const l=r.Ra.Pt(o);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=r.Ta.get(h);f&&r.Ta.set(h,f.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,h)=>{const f=r.Ta.get(c);if(!f)return;r.Ta.set(c,f.withResumeToken(ke.EMPTY_BYTE_STRING,f.snapshotVersion)),Sm(r,c);const p=new zt(f.target,c,h,f.sequenceNumber);qc(r,p)}),r.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(i){M(On,"Failed to raise snapshot:",i),await lo(n,i)}}async function lo(n,e,t){if(!Ci(e))throw e;n.Ia.add(1),await Ws(n),n.Aa.set("Offline"),t||(t=()=>wm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M(On,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await jo(n)})}function bm(n,e){return e().catch(t=>lo(n,t,e))}async function Wo(n){const e=j(n),t=cn(e);let i=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Sc;for(;pS(e);)try{const s=await QR(e.localStore,i);if(s===null){e.Pa.length===0&&t.B_();break}i=s.batchId,_S(e,s)}catch(s){await lo(e,s)}km(e)&&Nm(e)}function pS(n){return Fn(n)&&n.Pa.length<10}function _S(n,e){n.Pa.push(e);const t=cn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function km(n){return Fn(n)&&!cn(n).M_()&&n.Pa.length>0}function Nm(n){cn(n).start()}async function mS(n){cn(n).na()}async function gS(n){const e=cn(n);for(const t of n.Pa)e.X_(t.mutations)}async function yS(n,e,t){const i=n.Pa.shift(),s=Oc.from(i,e,t);await bm(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Wo(n)}async function vS(n,e){e&&cn(n).Z_&&await async function(i,s){if(function(o){return tR(o)&&o!==P.ABORTED}(s.code)){const r=i.Pa.shift();cn(i).N_(),await bm(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await Wo(i)}}(n,e),km(n)&&Nm(n)}async function nf(n,e){const t=j(n);t.asyncQueue.verifyOperationInProgress(),M(On,"RemoteStore received new credentials");const i=Fn(t);t.Ia.add(3),await Ws(t),i&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await jo(t)}async function ES(n,e){const t=j(n);e?(t.Ia.delete(2),await jo(t)):e||(t.Ia.add(2),await Ws(t),t.Aa.set("Unknown"))}function Si(n){return n.Va||(n.Va=function(t,i,s){const r=j(t);return r.ia(),new sS(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Zo:uS.bind(null,n),e_:hS.bind(null,n),n_:dS.bind(null,n),J_:fS.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Wc(n)?jc(n):n.Aa.set("Unknown")):(await n.Va.stop(),Pm(n))})),n.Va}function cn(n){return n.ma||(n.ma=function(t,i,s){const r=j(t);return r.ia(),new rS(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:mS.bind(null,n),n_:vS.bind(null,n),ea:gS.bind(null,n),ta:yS.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Wo(n)):(await n.ma.stop(),n.Pa.length>0&&(M(On,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new Xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,r){const o=Date.now()+i,l=new $c(e,t,o,s,r);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Hc(n,e){if(Dt("AsyncQueue",`${e}: ${n}`),Ci(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{static emptySet(e){return new ii(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||L.comparator(t.key,i.key):(t,i)=>L.comparator(t.key,i.key),this.keyedMap=Zi(),this.sortedSet=new ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ii)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new ii;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(){this.fa=new ue(L.comparator)}track(e){const t=e.doc.key,i=this.fa.get(t);i?e.type!==0&&i.type===3?this.fa=this.fa.insert(t,e):e.type===3&&i.type!==1?this.fa=this.fa.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.fa=this.fa.remove(t):e.type===1&&i.type===2?this.fa=this.fa.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):F(63341,{At:e,ga:i}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,i)=>{e.push(i)}),e}}class _i{constructor(e,t,i,s,r,o,l,c,h){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,i,s,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new _i(e,t,ii.emptySet(t),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class IS{constructor(){this.queries=rf(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,i){const s=j(t),r=s.queries;s.queries=rf(),r.forEach((o,l)=>{for(const c of l.wa)c.onError(i)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function rf(){return new Ln(n=>X_(n),xo)}async function Dm(n,e){const t=j(n);let i=3;const s=e.query;let r=t.queries.get(s);r?!r.Sa()&&e.ba()&&(i=2):(r=new TS,i=e.ba()?0:1);try{switch(i){case 0:r.ya=await t.onListen(s,!0);break;case 1:r.ya=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const l=Hc(o,`Initialization of query '${zn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,r),r.wa.push(e),e.va(t.onlineState),r.ya&&e.Ca(r.ya)&&zc(t)}async function Om(n,e){const t=j(n),i=e.query;let s=3;const r=t.queries.get(i);if(r){const o=r.wa.indexOf(e);o>=0&&(r.wa.splice(o,1),r.wa.length===0?s=e.ba()?0:1:!r.Sa()&&e.ba()&&(s=2))}switch(s){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function wS(n,e){const t=j(n);let i=!1;for(const s of e){const r=s.query,o=t.queries.get(r);if(o){for(const l of o.wa)l.Ca(s)&&(i=!0);o.ya=s}}i&&zc(t)}function AS(n,e,t){const i=j(n),s=i.queries.get(e);if(s)for(const r of s.wa)r.onError(t);i.queries.delete(e)}function zc(n){n.Da.forEach(e=>{e.next()})}var El,of;(of=El||(El={})).Fa="default",of.Cache="cache";class Vm{constructor(e,t,i){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=i||{}}Ca(e){if(!this.options.includeMetadataChanges){const i=[];for(const s of e.docChanges)s.type!==3&&i.push(s);e=new _i(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const i=t!=="Offline";return(!this.options.ka||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=_i.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==El.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e){this.key=e}}class xm{constructor(e){this.key=e}}class CS{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Y(),this.mutatedKeys=Y(),this.Xa=J_(e),this.eu=new ii(this.Xa)}get tu(){return this.Ha}nu(e,t){const i=t?t.ru:new sf,s=t?t.eu:this.eu;let r=t?t.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const m=s.get(f),T=Lo(this.query,p)?p:null,R=!!m&&this.mutatedKeys.has(m.key),N=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let k=!1;m&&T?m.data.isEqual(T.data)?R!==N&&(i.track({type:3,doc:T}),k=!0):this.iu(m,T)||(i.track({type:2,doc:T}),k=!0,(c&&this.Xa(T,c)>0||h&&this.Xa(T,h)<0)&&(l=!0)):!m&&T?(i.track({type:0,doc:T}),k=!0):m&&!T&&(i.track({type:1,doc:m}),k=!0,(c||h)&&(l=!0)),k&&(T?(o=o.add(T),r=N?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),i.track({type:1,doc:f})}return{eu:o,ru:i,Ds:l,mutatedKeys:r}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,s){const r=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,p)=>function(T,R){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{At:k})}};return N(T)-N(R)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(i),s=s!=null&&s;const l=t&&!s?this.ou():[],c=this.Za.size===0&&this.current&&!s?1:0,h=c!==this.Ya;return this.Ya=c,o.length!==0||h?{snapshot:new _i(this.query,e.eu,r,o,e.mutatedKeys,c===0,h,!1,!!i&&i.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new sf,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=Y(),this.eu.forEach(i=>{this.au(i.key)&&(this.Za=this.Za.add(i.key))});const t=[];return e.forEach(i=>{this.Za.has(i)||t.push(new xm(i))}),this.Za.forEach(i=>{e.has(i)||t.push(new Mm(i))}),t}uu(e){this.Ha=e.qs,this.Za=Y();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return _i.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Gc="SyncEngine";class RS{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class SS{constructor(e){this.key=e,this.lu=!1}}class PS{constructor(e,t,i,s,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new Ln(l=>X_(l),xo),this.Tu=new Map,this.Iu=new Set,this.du=new ue(L.comparator),this.Eu=new Map,this.Au=new xc,this.Ru={},this.Vu=new Map,this.mu=pi.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function bS(n,e,t=!0){const i=jm(n);let s;const r=i.Pu.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.cu()):s=await Lm(i,e,t,!0),s}async function kS(n,e){const t=jm(n);await Lm(t,e,!0,!1)}async function Lm(n,e,t,i){const s=await YR(n.localStore,ft(e)),r=s.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let l;return i&&(l=await NS(n,e,r,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&Rm(n.remoteStore,s),l}async function NS(n,e,t,i,s){n.gu=(p,m,T)=>async function(N,k,W,B){let $=k.view.nu(W);$.Ds&&($=await Xd(N.localStore,k.query,!1).then(({documents:I})=>k.view.nu(I,$)));const ae=B&&B.targetChanges.get(k.targetId),Qe=B&&B.targetMismatches.get(k.targetId)!=null,_e=k.view.applyChanges($,N.isPrimaryClient,ae,Qe);return lf(N,k.targetId,_e._u),_e.snapshot}(n,p,m,T);const r=await Xd(n.localStore,e,!0),o=new CS(e,r.qs),l=o.nu(r.documents),c=js.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),h=o.applyChanges(l,n.isPrimaryClient,c);lf(n,t,h._u);const f=new RS(e,t,o);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function DS(n,e,t){const i=j(n),s=i.Pu.get(e),r=i.Tu.get(s.targetId);if(r.length>1)return i.Tu.set(s.targetId,r.filter(o=>!xo(o,e))),void i.Pu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await yl(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),t&&Bc(i.remoteStore,s.targetId),Tl(i,s.targetId)}).catch(Ai)):(Tl(i,s.targetId),await yl(i.localStore,s.targetId,!0))}async function OS(n,e){const t=j(n),i=t.Pu.get(e),s=t.Tu.get(i.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Bc(t.remoteStore,i.targetId))}async function VS(n,e,t){const i=qS(n);try{const s=await function(o,l){const c=j(o),h=ce.now(),f=l.reduce((T,R)=>T.add(R.key),Y());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",T=>{let R=Ot(),N=Y();return c.Os.getEntries(T,f).next(k=>{R=k,R.forEach((W,B)=>{B.isValidDocument()||(N=N.add(W))})}).next(()=>c.localDocuments.getOverlayedDocuments(T,R)).next(k=>{p=k;const W=[];for(const B of l){const $=YC(B,p.get(B.key).overlayedDocument);$!=null&&W.push(new pn(B.key,$,W_($.value.mapValue),pt.exists(!0)))}return c.mutationQueue.addMutationBatch(T,h,W,l)}).next(k=>{m=k;const W=k.applyToLocalDocumentSet(p,N);return c.documentOverlayCache.saveOverlays(T,k.batchId,W)})}).then(()=>({batchId:m.batchId,changes:em(p)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let h=o.Ru[o.currentUser.toKey()];h||(h=new ue(H)),h=h.insert(l,c),o.Ru[o.currentUser.toKey()]=h}(i,s.batchId,t),await $s(i,s.changes),await Wo(i.remoteStore)}catch(s){const r=Hc(s,"Failed to persist write");t.reject(r)}}async function Fm(n,e){const t=j(n);try{const i=await GR(t.localStore,e);e.targetChanges.forEach((s,r)=>{const o=t.Eu.get(r);o&&(ee(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.lu=!0:s.modifiedDocuments.size>0?ee(o.lu,14607):s.removedDocuments.size>0&&(ee(o.lu,42227),o.lu=!1))}),await $s(t,i,e)}catch(i){await Ai(i)}}function af(n,e,t){const i=j(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const s=[];i.Pu.forEach((r,o)=>{const l=o.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=j(o);c.onlineState=l;let h=!1;c.queries.forEach((f,p)=>{for(const m of p.wa)m.va(l)&&(h=!0)}),h&&zc(c)}(i.eventManager,e),s.length&&i.hu.J_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function MS(n,e,t){const i=j(n);i.sharedClientState.updateQueryState(e,"rejected",t);const s=i.Eu.get(e),r=s&&s.key;if(r){let o=new ue(L.comparator);o=o.insert(r,Le.newNoDocument(r,q.min()));const l=Y().add(r),c=new Bo(q.min(),new Map,new ue(H),o,l);await Fm(i,c),i.du=i.du.remove(r),i.Eu.delete(e),Kc(i)}else await yl(i.localStore,e,!1).then(()=>Tl(i,e,t)).catch(Ai)}async function xS(n,e){const t=j(n),i=e.batch.batchId;try{const s=await zR(t.localStore,e);Bm(t,i,null),Um(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await $s(t,s)}catch(s){await Ai(s)}}async function LS(n,e,t){const i=j(n);try{const s=await function(o,l){const c=j(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(ee(p!==null,37113),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(i.localStore,e);Bm(i,e,t),Um(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await $s(i,s)}catch(s){await Ai(s)}}function Um(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Bm(n,e,t){const i=j(n);let s=i.Ru[i.currentUser.toKey()];if(s){const r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),i.Ru[i.currentUser.toKey()]=s}}function Tl(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Tu.get(e))n.Pu.delete(i),t&&n.hu.pu(i,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(i=>{n.Au.containsKey(i)||qm(n,i)})}function qm(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Bc(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Kc(n))}function lf(n,e,t){for(const i of t)i instanceof Mm?(n.Au.addReference(i.key,e),FS(n,i)):i instanceof xm?(M(Gc,"Document no longer in limbo: "+i.key),n.Au.removeReference(i.key,e),n.Au.containsKey(i.key)||qm(n,i.key)):F(19791,{yu:i})}function FS(n,e){const t=e.key,i=t.path.canonicalString();n.du.get(t)||n.Iu.has(i)||(M(Gc,"New document in limbo: "+t),n.Iu.add(i),Kc(n))}function Kc(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(oe.fromString(e)),i=n.mu.next();n.Eu.set(i,new SS(t)),n.du=n.du.insert(t,i),Rm(n.remoteStore,new zt(ft(Mo(t.path)),i,"TargetPurposeLimboResolution",Do.ue))}}async function $s(n,e,t){const i=j(n),s=[],r=[],o=[];i.Pu.isEmpty()||(i.Pu.forEach((l,c)=>{o.push(i.gu(c,e,t).then(h=>{var f;if((h||t)&&i.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;i.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=Fc.Es(c.targetId,h);r.push(p)}}))}),await Promise.all(o),i.hu.J_(s),await async function(c,h){const f=j(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>b.forEach(h,m=>b.forEach(m.Is,T=>f.persistence.referenceDelegate.addReference(p,m.targetId,T)).next(()=>b.forEach(m.ds,T=>f.persistence.referenceDelegate.removeReference(p,m.targetId,T)))))}catch(p){if(!Ci(p))throw p;M(Uc,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const T=f.Fs.get(m),R=T.snapshotVersion,N=T.withLastLimboFreeSnapshotVersion(R);f.Fs=f.Fs.insert(m,N)}}}(i.localStore,r))}async function US(n,e){const t=j(n);if(!t.currentUser.isEqual(e)){M(Gc,"User change. New user:",e.toKey());const i=await Im(t.localStore,e);t.currentUser=e,function(r,o){r.Vu.forEach(l=>{l.forEach(c=>{c.reject(new V(P.CANCELLED,o))})}),r.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await $s(t,i.Bs)}}function BS(n,e){const t=j(n),i=t.Eu.get(e);if(i&&i.lu)return Y().add(i.key);{let s=Y();const r=t.Tu.get(e);if(!r)return s;for(const o of r){const l=t.Pu.get(o);s=s.unionWith(l.view.tu)}return s}}function jm(n){const e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Fm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=BS.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=MS.bind(null,e),e.hu.J_=wS.bind(null,e.eventManager),e.hu.pu=AS.bind(null,e.eventManager),e}function qS(n){const e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=xS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=LS.bind(null,e),e}class co{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=qo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return HR(this.persistence,new jR,e.initialUser,this.serializer)}Du(e){return new Tm(Lc.Vi,this.serializer)}bu(e){return new JR}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}co.provider={build:()=>new co};class jS extends co{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){ee(this.persistence.referenceDelegate instanceof ao,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new SR(i,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new Tm(i=>ao.Vi(i,t),this.serializer)}}class Il{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>af(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=US.bind(null,this.syncEngine),await ES(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new IS}()}createDatastore(e){const t=qo(e.databaseInfo.databaseId),i=function(r){return new iS(r)}(e.databaseInfo);return function(r,o,l,c){return new aS(r,o,l,c)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,s,r,o,l){return new cS(i,s,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>af(this.syncEngine,t,0),function(){return ef.C()?new ef:new ZR}())}createSyncEngine(e,t){return function(s,r,o,l,c,h,f){const p=new PS(s,r,o,l,c,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const r=j(s);M(On,"RemoteStore shutting down."),r.Ia.add(5),await Ws(r),r.Ea.shutdown(),r.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Il.provider={build:()=>new Il};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Dt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="FirestoreClient";class WS{constructor(e,t,i,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=s,this.user=xe.UNAUTHENTICATED,this.clientId=Rc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async o=>{M(un,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(i,o=>(M(un,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Xt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Hc(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function Ma(n,e){n.asyncQueue.verifyOperationInProgress(),M(un,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await Im(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>{sn("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{M("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{sn("Terminating Firestore due to IndexedDb database deletion failed",s)})}),n._offlineComponents=e}async function cf(n,e){n.asyncQueue.verifyOperationInProgress();const t=await $S(n);M(un,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>nf(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>nf(e.remoteStore,s)),n._onlineComponents=e}async function $S(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M(un,"Using user provided OfflineComponentProvider");try{await Ma(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;sn("Error using user provided cache. Falling back to memory cache: "+t),await Ma(n,new co)}}else M(un,"Using default OfflineComponentProvider"),await Ma(n,new jS(void 0));return n._offlineComponents}async function $m(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M(un,"Using user provided OnlineComponentProvider"),await cf(n,n._uninitializedComponentsProvider._online)):(M(un,"Using default OnlineComponentProvider"),await cf(n,new Il))),n._onlineComponents}function HS(n){return $m(n).then(e=>e.syncEngine)}async function wl(n){const e=await $m(n),t=e.eventManager;return t.onListen=bS.bind(null,e.syncEngine),t.onUnlisten=DS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=kS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=OS.bind(null,e.syncEngine),t}function zS(n,e,t={}){const i=new Xt;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,h){const f=new Wm({next:m=>{f.Ou(),o.enqueueAndForget(()=>Om(r,p));const T=m.docs.has(l);!T&&m.fromCache?h.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&m.fromCache&&c&&c.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new Vm(Mo(l.path),f,{includeMetadataChanges:!0,ka:!0});return Dm(r,p)}(await wl(n),n.asyncQueue,e,t,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hm(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm="firestore.googleapis.com",hf=!0;class df{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zm,this.ssl=hf}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:hf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Em;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<CR)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}cC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hm((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class $o{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new df({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new df(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new eC;switch(i.type){case"firstParty":return new sC(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=uf.get(t);i&&(M("ComponentProvider","Removing Datastore"),uf.delete(t),i.terminate())}(this),Promise.resolve()}}function GS(n,e,t,i={}){var s;n=dt(n,$o);const r=hn(e),o=n._getSettings(),l=Object.assign(Object.assign({},o),{emulatorOptions:n._getEmulatorOptions()}),c=`${e}:${t}`;r&&(Rl(`https://${c}`),Sl("Firestore",!0)),o.host!==zm&&o.host!==c&&sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:c,ssl:r,emulatorOptions:i});if(!Zt(h,l)&&(n._setSettings(h),i.mockUserToken)){let f,p;if(typeof i.mockUserToken=="string")f=i.mockUserToken,p=xe.MOCK_USER;else{f=Sf(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const m=i.mockUserToken.sub||i.mockUserToken.user_id;if(!m)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new xe(m)}n._authCredentials=new tC(new k_(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Un(this.firestore,e,this._query)}}class pe{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new pe(this.firestore,e,this._key)}toJSON(){return{type:pe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(Bs(t,pe._jsonSchema))return new pe(e,i||null,new L(oe.fromString(t.referencePath)))}}pe._jsonSchemaVersion="firestore/documentReference/1.0",pe._jsonSchema={type:ve("string",pe._jsonSchemaVersion),referencePath:ve("string")};class Jt extends Un{constructor(e,t,i){super(e,t,Mo(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new pe(this.firestore,null,new L(e))}withConverter(e){return new Jt(this.firestore,e,this._path)}}function RP(n,e,...t){if(n=te(n),D_("collection","path",e),n instanceof $o){const i=oe.fromString(e,...t);return Ad(i),new Jt(n,null,i)}{if(!(n instanceof pe||n instanceof Jt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(oe.fromString(e,...t));return Ad(i),new Jt(n.firestore,null,i)}}function SP(n,e,...t){if(n=te(n),arguments.length===1&&(e=Rc.newId()),D_("doc","path",e),n instanceof $o){const i=oe.fromString(e,...t);return wd(i),new pe(n,null,new L(i))}{if(!(n instanceof pe||n instanceof Jt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(oe.fromString(e,...t));return wd(i),new pe(n.firestore,n instanceof Jt?n.converter:null,new L(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="AsyncQueue";class pf{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Am(this,"async_queue_retry"),this.oc=()=>{const i=Va();i&&M(ff,"Visibility state changed to "+i.visibilityState),this.F_.y_()},this._c=e;const t=Va();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Va();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Xt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Ci(e))throw e;M(ff,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(i=>{throw this.tc=i,this.nc=!1,Dt("INTERNAL UNHANDLED ERROR: ",_f(i)),i}).then(i=>(this.nc=!1,i))));return this._c=t,t}enqueueAfterDelay(e,t,i){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=$c.createAndSchedule(this,e,t,i,r=>this.lc(r));return this.ec.push(s),s}ac(){this.tc&&F(47125,{hc:_f(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function _f(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(n){return function(t,i){if(typeof t!="object"||t===null)return!1;const s=t;for(const r of i)if(r in s&&typeof s[r]=="function")return!0;return!1}(n,["next","error","complete"])}class mi extends $o{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new pf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pf(e),this._firestoreClient=void 0,await e}}}function PP(n,e){const t=typeof n=="object"?n:kl(),i=typeof n=="string"?n:no,s=mo(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=Af("firestore");r&&GS(s,...r)}return s}function Qc(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||KS(n),n._firestoreClient}function KS(n){var e,t,i;const s=n._freezeSettings(),r=function(l,c,h,f){return new EC(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Hm(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new WS(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ye(ke.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ye(ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ye._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Bs(e,Ye._jsonSchema))return Ye.fromBase64String(e.bytes)}}Ye._jsonSchemaVersion="firestore/bytes/1.0",Ye._jsonSchema={type:ve("string",Ye._jsonSchemaVersion),bytes:ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mt._jsonSchemaVersion}}static fromJSON(e){if(Bs(e,mt._jsonSchema))return new mt(e.latitude,e.longitude)}}mt._jsonSchemaVersion="firestore/geoPoint/1.0",mt._jsonSchema={type:ve("string",mt._jsonSchemaVersion),latitude:ve("number"),longitude:ve("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:gt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Bs(e,gt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new gt(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}gt._jsonSchemaVersion="firestore/vectorValue/1.0",gt._jsonSchema={type:ve("string",gt._jsonSchemaVersion),vectorValues:ve("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS=/^__.*__$/;class YS{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new pn(e,this.data,this.fieldMask,t,this.fieldTransforms):new qs(e,this.data,t,this.fieldTransforms)}}class Gm{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new pn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Km(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ec:n})}}class Yc{constructor(e,t,i,s,r,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.Ac(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Yc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:i,mc:!1});return s.fc(e),s}gc(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Rc({path:i,mc:!1});return s.Ac(),s}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return uo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Km(this.Ec)&&QS.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class XS{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||qo(e)}Dc(e,t,i,s=!1){return new Yc({Ec:e,methodName:t,bc:i,path:Pe.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Xc(n){const e=n._freezeSettings(),t=qo(n._databaseId);return new XS(n._databaseId,!!e.ignoreUndefinedProperties,t)}function JS(n,e,t,i,s,r={}){const o=n.Dc(r.merge||r.mergeFields?2:0,e,t,s);Zc("Data must be an object, but it was:",o,i);const l=Qm(i,o);let c,h;if(r.merge)c=new Ke(o.fieldMask),h=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const m=Al(e,p,t);if(!o.contains(m))throw new V(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Xm(f,m)||f.push(m)}c=new Ke(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new YS(new We(l),c,h)}class Go extends zo{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Go}}class Jc extends zo{_toFieldTransform(e){return new zC(e.path,new Ss)}isEqual(e){return e instanceof Jc}}function ZS(n,e,t,i){const s=n.Dc(1,e,t);Zc("Data must be an object, but it was:",s,i);const r=[],o=We.empty();fn(i,(c,h)=>{const f=eu(e,c,t);h=te(h);const p=s.gc(f);if(h instanceof Go)r.push(f);else{const m=Hs(h,p);m!=null&&(r.push(f),o.set(f,m))}});const l=new Ke(r);return new Gm(o,l,s.fieldTransforms)}function eP(n,e,t,i,s,r){const o=n.Dc(1,e,t),l=[Al(e,i,t)],c=[s];if(r.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(Al(e,r[m])),c.push(r[m+1]);const h=[],f=We.empty();for(let m=l.length-1;m>=0;--m)if(!Xm(h,l[m])){const T=l[m];let R=c[m];R=te(R);const N=o.gc(T);if(R instanceof Go)h.push(T);else{const k=Hs(R,N);k!=null&&(h.push(T),f.set(T,k))}}const p=new Ke(h);return new Gm(f,p,o.fieldTransforms)}function tP(n,e,t,i=!1){return Hs(t,n.Dc(i?4:3,e))}function Hs(n,e){if(Ym(n=te(n)))return Zc("Unsupported field value:",e,n),Qm(n,e);if(n instanceof zo)return function(i,s){if(!Km(s.Ec))throw s.wc(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(i,s){const r=[];let o=0;for(const l of i){let c=Hs(l,s.yc(o));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),o++}return{arrayValue:{values:r}}}(n,e)}return function(i,s){if((i=te(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return WC(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=ce.fromDate(i);return{timestampValue:oo(s.serializer,r)}}if(i instanceof ce){const r=new ce(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:oo(s.serializer,r)}}if(i instanceof mt)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Ye)return{bytesValue:fm(s.serializer,i._byteString)};if(i instanceof pe){const r=s.databaseId,o=i.firestore._databaseId;if(!o.isEqual(r))throw s.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Mc(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof gt)return function(o,l){return{mapValue:{fields:{[q_]:{stringValue:j_},[io]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return Dc(l.serializer,h)})}}}}}}(i,s);throw s.wc(`Unsupported field value: ${No(i)}`)}(n,e)}function Qm(n,e){const t={};return M_(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):fn(n,(i,s)=>{const r=Hs(s,e.Vc(i));r!=null&&(t[i]=r)}),{mapValue:{fields:t}}}function Ym(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof mt||n instanceof Ye||n instanceof pe||n instanceof zo||n instanceof gt)}function Zc(n,e,t){if(!Ym(t)||!O_(t)){const i=No(t);throw i==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+i)}}function Al(n,e,t){if((e=te(e))instanceof Ho)return e._internalPath;if(typeof e=="string")return eu(n,e);throw uo("Field path arguments must be of type string or ",n,!1,void 0,t)}const nP=new RegExp("[~\\*/\\[\\]]");function eu(n,e,t){if(e.search(nP)>=0)throw uo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ho(...e.split("."))._internalPath}catch{throw uo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function uo(n,e,t,i,s){const r=i&&!i.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${i}`),o&&(c+=` in document ${s}`),c+=")"),new V(P.INVALID_ARGUMENT,l+n+c)}function Xm(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new pe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new iP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(tu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class iP extends Jm{data(){return super.data()}}function tu(n,e){return typeof e=="string"?eu(n,e):e instanceof Ho?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sP(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class nu{}class Zm extends nu{}function bP(n,e,...t){let i=[];e instanceof nu&&i.push(e),i=i.concat(t),function(r){const o=r.filter(c=>c instanceof su).length,l=r.filter(c=>c instanceof iu).length;if(o>1||o>0&&l>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)n=s._apply(n);return n}class iu extends Zm{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new iu(e,t,i)}_apply(e){const t=this._parse(e);return eg(e._query,t),new Un(e.firestore,e.converter,dl(e._query,t))}_parse(e){const t=Xc(e.firestore);return function(r,o,l,c,h,f,p){let m;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){yf(p,f);const R=[];for(const N of p)R.push(gf(c,r,N));m={arrayValue:{values:R}}}else m=gf(c,r,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||yf(p,f),m=tP(l,o,p,f==="in"||f==="not-in");return ye.create(h,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class su extends nu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new su(e,t)}_parse(e){const t=this._queryConstraints.map(i=>i._parse(e)).filter(i=>i.getFilters().length>0);return t.length===1?t[0]:ot.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,r){let o=s;const l=r.getFlattenedFilters();for(const c of l)eg(o,c),o=dl(o,c)}(e._query,t),new Un(e.firestore,e.converter,dl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ru extends Zm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ru(e,t)}_apply(e){const t=function(s,r,o){if(s.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Rs(r,o)}(e._query,this._field,this._direction);return new Un(e.firestore,e.converter,function(s,r){const o=s.explicitOrderBy.concat([r]);return new Ri(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function kP(n,e="asc"){const t=e,i=tu("orderBy",n);return ru._create(i,t)}function gf(n,e,t){if(typeof(t=te(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Y_(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(oe.fromString(t));if(!L.isDocumentKey(i))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Dd(n,new L(i))}if(t instanceof pe)return Dd(n,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${No(t)}.`)}function yf(n,e){if(!Array.isArray(n)||n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function eg(n,e){const t=function(s,r){for(const o of s)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class rP{convertValue(e,t="none"){switch(ln(e)){case 0:return null;case 1:return e.booleanValue;case 2:return me(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(an(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return fn(e,(s,r)=>{i[s]=this.convertValue(r,t)}),i}convertVectorValue(e){var t,i,s;const r=(s=(i=(t=e.fields)===null||t===void 0?void 0:t[io].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(o=>me(o.doubleValue));return new gt(r)}convertGeoPoint(e){return new mt(me(e.latitude),me(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=Vo(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(ws(e));default:return null}}convertTimestamp(e){const t=on(e);return new ce(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=oe.fromString(e);ee(vm(i),9688,{name:e});const s=new As(i.get(1),i.get(3)),r=new L(i.popFirst(5));return s.isEqual(t)||Dt(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oP(n,e,t){let i;return i=n?n.toFirestore(e):e,i}class ts{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wn extends Jm{constructor(e,t,i,s,r,o){super(e,t,i,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new kr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(tu("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=wn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}wn._jsonSchemaVersion="firestore/documentSnapshot/1.0",wn._jsonSchema={type:ve("string",wn._jsonSchemaVersion),bundleSource:ve("string","DocumentSnapshot"),bundleName:ve("string"),bundle:ve("string")};class kr extends wn{data(e={}){return super.data(e)}}class si{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ts(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new kr(this._firestore,this._userDataWriter,i.key,i,new ts(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new kr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ts(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const c=new kr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ts(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:aP(l.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=si._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Rc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],s=[];return this.docs.forEach(r=>{r._document!==null&&(t.push(r._document),i.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),s.push(r.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function aP(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NP(n){n=dt(n,pe);const e=dt(n.firestore,mi);return zS(Qc(e),n._key).then(t=>ig(e,n,t))}si._jsonSchemaVersion="firestore/querySnapshot/1.0",si._jsonSchema={type:ve("string",si._jsonSchemaVersion),bundleSource:ve("string","QuerySnapshot"),bundleName:ve("string"),bundle:ve("string")};class tg extends rP{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ye(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new pe(this.firestore,null,t)}}function DP(n,e,t){n=dt(n,pe);const i=dt(n.firestore,mi),s=oP(n.converter,e);return ng(i,[JS(Xc(i),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,pt.none())])}function OP(n,e,t,...i){n=dt(n,pe);const s=dt(n.firestore,mi),r=Xc(s);let o;return o=typeof(e=te(e))=="string"||e instanceof Ho?eP(r,"updateDoc",n._key,e,t,i):ZS(r,"updateDoc",n._key,e),ng(s,[o.toMutation(n._key,pt.exists(!0))])}function VP(n,...e){var t,i,s;n=te(n);let r={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||mf(e[o])||(r=e[o++]);const l={includeMetadataChanges:r.includeMetadataChanges,source:r.source};if(mf(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(i=p.error)===null||i===void 0?void 0:i.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let c,h,f;if(n instanceof pe)h=dt(n.firestore,mi),f=Mo(n._key.path),c={next:p=>{e[o]&&e[o](ig(h,n,p))},error:e[o+1],complete:e[o+2]};else{const p=dt(n,Un);h=dt(p.firestore,mi),f=p._query;const m=new tg(h);c={next:T=>{e[o]&&e[o](new si(h,m,p,T))},error:e[o+1],complete:e[o+2]},sP(n._query)}return function(m,T,R,N){const k=new Wm(N),W=new Vm(T,k,R);return m.asyncQueue.enqueueAndForget(async()=>Dm(await wl(m),W)),()=>{k.Ou(),m.asyncQueue.enqueueAndForget(async()=>Om(await wl(m),W))}}(Qc(h),f,l,c)}function ng(n,e){return function(i,s){const r=new Xt;return i.asyncQueue.enqueueAndForget(async()=>VS(await HS(i),s,r)),r.promise}(Qc(n),e)}function ig(n,e,t){const i=t.docs.get(e._key),s=new tg(n);return new wn(n,s,e._key,i,new ts(t.hasPendingWrites,t.fromCache),e.converter)}function MP(){return new Jc("serverTimestamp")}(function(e,t=!0){(function(s){wi=s})(Vn),An(new en("firestore",(i,{instanceIdentifier:s,options:r})=>{const o=i.getProvider("app").getImmediate(),l=new mi(new nC(i.getProvider("auth-internal")),new rC(o,i.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new As(h.options.projectId,f)}(o,s),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),ct(yd,vd,e),ct(yd,vd,"esm2017")})();export{hP as A,uP as B,vi as E,AP as a,PP as b,RP as c,kP as d,VP as e,OP as f,yP as g,SP as h,dv as i,dP as j,pP as k,MP as l,gP as m,lP as n,wP as o,_P as p,bP as q,EP as r,DP as s,NP as t,IP as u,WA as v,TP as w,mP as x,fP as y,cP as z};
