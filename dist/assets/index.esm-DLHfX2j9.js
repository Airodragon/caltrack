const ug=()=>{};var Oc={};/**
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
 */const ph=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cg=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],u=r[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},_h={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,u=o?r[s+1]:0,c=s+2<r.length,h=c?r[s+2]:0,f=i>>2,m=(i&3)<<4|u>>4;let p=(u&15)<<2|h>>6,v=h&63;c||(v=64,o||(p=64)),n.push(t[f],t[m],t[p],t[v])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(ph(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):cg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],u=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||u==null||h==null||m==null)throw new lg;const p=i<<2|u>>4;if(n.push(p),h!==64){const v=u<<4&240|h>>2;if(n.push(v),m!==64){const C=h<<6&192|m;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class lg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hg=function(r){const e=ph(r);return _h.encodeByteArray(e,!0)},gi=function(r){return hg(r).replace(/\./g,"")},dg=function(r){try{return _h.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function yh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fg=()=>yh().__FIREBASE_DEFAULTS__,mg=()=>{if(typeof process>"u"||typeof Oc>"u")return;const r=Oc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},gg=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&dg(r[1]);return e&&JSON.parse(e)},Aa=()=>{try{return ug()||fg()||mg()||gg()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},pg=r=>{var e,t;return(t=(e=Aa())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},_g=r=>{const e=pg(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Ih=()=>{var r;return(r=Aa())==null?void 0:r.config};/**
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
 */class yg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function Ig(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[gi(JSON.stringify(t)),gi(JSON.stringify(o)),""].join(".")}/**
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
 */function pi(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Eh(){var e;const r=(e=Aa())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Th(){return!Eh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wh(){return!Eh()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Ah(){try{return typeof indexedDB=="object"}catch{return!1}}function Eg(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const Tg="FirebaseError";class dr extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Tg,Object.setPrototypeOf(this,dr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vh.prototype.create)}}class vh{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?wg(i,n):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new dr(s,u,n)}}function wg(r,e){return r.replace(Ag,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Ag=/\{\$([^}]+)}/g;function Nt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Fc(i)&&Fc(o)){if(!Nt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Fc(r){return r!==null&&typeof r=="object"}/**
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
 */function Ee(r){return r&&r._delegate?r._delegate:r}/**
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
 */function va(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bh(r){return(await fetch(r,{credentials:"include"})).ok}class us{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const nn="[DEFAULT]";/**
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
 */class vg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new yg;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rg(e))try{this.getOrInitializeService({instanceIdentifier:nn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=nn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=nn){return this.instances.has(e)}getOptions(e=nn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:bg(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=nn){return this.component?this.component.multipleInstances?e:nn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bg(r){return r===nn?void 0:r}function Rg(r){return r.instantiationMode==="EAGER"}/**
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
 */class Sg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var J;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(J||(J={}));const Pg={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},Vg=J.INFO,Cg={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},Dg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Cg[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rh{constructor(e){this.name=e,this._logLevel=Vg,this._logHandler=Dg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}const xg=(r,e)=>e.some(t=>r instanceof t);let Lc,Bc;function Ng(){return Lc||(Lc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kg(){return Bc||(Bc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sh=new WeakMap,$o=new WeakMap,Ph=new WeakMap,Do=new WeakMap,ba=new WeakMap;function Mg(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Vt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Sh.set(t,r)}).catch(()=>{}),ba.set(e,r),e}function Og(r){if($o.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});$o.set(r,e)}let Go={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return $o.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Ph.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Vt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function Fg(r){Go=r(Go)}function Lg(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(xo(this),e,...t);return Ph.set(n,e.sort?e.sort():[e]),Vt(n)}:kg().includes(r)?function(...e){return r.apply(xo(this),e),Vt(Sh.get(this))}:function(...e){return Vt(r.apply(xo(this),e))}}function Bg(r){return typeof r=="function"?Lg(r):(r instanceof IDBTransaction&&Og(r),xg(r,Ng())?new Proxy(r,Go):r)}function Vt(r){if(r instanceof IDBRequest)return Mg(r);if(Do.has(r))return Do.get(r);const e=Bg(r);return e!==r&&(Do.set(r,e),ba.set(e,r)),e}const xo=r=>ba.get(r);function Ug(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),u=Vt(o);return n&&o.addEventListener("upgradeneeded",c=>{n(Vt(o.result),c.oldVersion,c.newVersion,Vt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const qg=["get","getKey","getAll","getAllKeys","count"],jg=["put","add","delete","clear"],No=new Map;function Uc(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(No.get(e))return No.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=jg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||qg.includes(t)))return;const i=async function(o,...u){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return n&&(h=h.index(u.shift())),(await Promise.all([h[t](...u),s&&c.done]))[0]};return No.set(e,i),i}Fg(r=>({...r,get:(e,t,n)=>Uc(e,t)||r.get(e,t,n),has:(e,t)=>!!Uc(e,t)||r.has(e,t)}));/**
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
 */class zg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if($g(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function $g(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ko="@firebase/app",qc="0.14.11";/**
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
 */const ut=new Rh("@firebase/app"),Gg="@firebase/app-compat",Kg="@firebase/analytics-compat",Qg="@firebase/analytics",Wg="@firebase/app-check-compat",Hg="@firebase/app-check",Jg="@firebase/auth",Yg="@firebase/auth-compat",Xg="@firebase/database",Zg="@firebase/data-connect",ep="@firebase/database-compat",tp="@firebase/functions",np="@firebase/functions-compat",rp="@firebase/installations",sp="@firebase/installations-compat",ip="@firebase/messaging",op="@firebase/messaging-compat",ap="@firebase/performance",up="@firebase/performance-compat",cp="@firebase/remote-config",lp="@firebase/remote-config-compat",hp="@firebase/storage",dp="@firebase/storage-compat",fp="@firebase/firestore",mp="@firebase/ai",gp="@firebase/firestore-compat",pp="firebase",_p="12.12.0";/**
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
 */const _i="[DEFAULT]",yp={[Ko]:"fire-core",[Gg]:"fire-core-compat",[Qg]:"fire-analytics",[Kg]:"fire-analytics-compat",[Hg]:"fire-app-check",[Wg]:"fire-app-check-compat",[Jg]:"fire-auth",[Yg]:"fire-auth-compat",[Xg]:"fire-rtdb",[Zg]:"fire-data-connect",[ep]:"fire-rtdb-compat",[tp]:"fire-fn",[np]:"fire-fn-compat",[rp]:"fire-iid",[sp]:"fire-iid-compat",[ip]:"fire-fcm",[op]:"fire-fcm-compat",[ap]:"fire-perf",[up]:"fire-perf-compat",[cp]:"fire-rc",[lp]:"fire-rc-compat",[hp]:"fire-gcs",[dp]:"fire-gcs-compat",[fp]:"fire-fst",[gp]:"fire-fst-compat",[mp]:"fire-vertex","fire-js":"fire-js",[pp]:"fire-js-all"};/**
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
 */const yi=new Map,Ip=new Map,Qo=new Map;function jc(r,e){try{r.container.addComponent(e)}catch(t){ut.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Ii(r){const e=r.name;if(Qo.has(e))return ut.debug(`There were multiple attempts to register component ${e}.`),!1;Qo.set(e,r);for(const t of yi.values())jc(t,r);for(const t of Ip.values())jc(t,r);return!0}function Ra(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Ep(r,e,t=_i){Ra(r,e).clearInstance(t)}function Tp(r){return r==null?!1:r.settings!==void 0}/**
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
 */const wp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ct=new vh("app","Firebase",wp);/**
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
 */class Ap{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new us("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ct.create("app-deleted",{appName:this._name})}}/**
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
 */const vp=_p;function bp(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:_i,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Ct.create("bad-app-name",{appName:String(s)});if(t||(t=Ih()),!t)throw Ct.create("no-options");const i=yi.get(s);if(i){if(Nt(t,i.options)&&Nt(n,i.config))return i;throw Ct.create("duplicate-app",{appName:s})}const o=new Sg(s);for(const c of Qo.values())o.addComponent(c);const u=new Ap(t,n,o);return yi.set(s,u),u}function Rp(r=_i){const e=yi.get(r);if(!e&&r===_i&&Ih())return bp();if(!e)throw Ct.create("no-app",{appName:r});return e}function Yr(r,e,t){let n=yp[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ut.warn(o.join(" "));return}Ii(new us(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
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
 */const Sp="firebase-heartbeat-database",Pp=1,cs="firebase-heartbeat-store";let ko=null;function Vh(){return ko||(ko=Ug(Sp,Pp,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(cs)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ct.create("idb-open",{originalErrorMessage:r.message})})),ko}async function Vp(r){try{const t=(await Vh()).transaction(cs),n=await t.objectStore(cs).get(Ch(r));return await t.done,n}catch(e){if(e instanceof dr)ut.warn(e.message);else{const t=Ct.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ut.warn(t.message)}}}async function zc(r,e){try{const n=(await Vh()).transaction(cs,"readwrite");await n.objectStore(cs).put(e,Ch(r)),await n.done}catch(t){if(t instanceof dr)ut.warn(t.message);else{const n=Ct.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ut.warn(n.message)}}}function Ch(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Cp=1024,Dp=30;class xp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new kp(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=$c();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Dp){const o=Mp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ut.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$c(),{heartbeatsToSend:n,unsentEntries:s}=Np(this._heartbeatsCache.heartbeats),i=gi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ut.warn(t),""}}}function $c(){return new Date().toISOString().substring(0,10)}function Np(r,e=Cp){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Gc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Gc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class kp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ah()?Eg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Vp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return zc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return zc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Gc(r){return gi(JSON.stringify({version:2,heartbeats:r})).length}function Mp(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
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
 */function Op(r){Ii(new us("platform-logger",e=>new zg(e),"PRIVATE")),Ii(new us("heartbeat",e=>new xp(e),"PRIVATE")),Yr(Ko,qc,r),Yr(Ko,qc,"esm2020"),Yr("fire-js","")}Op("");var Kc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dt,Dh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function I(){}I.prototype=_.prototype,E.F=_.prototype,E.prototype=new I,E.prototype.constructor=E,E.D=function(w,T,S){for(var y=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)y[Oe-2]=arguments[Oe];return _.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,I){I||(I=0);const w=Array(16);if(typeof _=="string")for(var T=0;T<16;++T)w[T]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(T=0;T<16;++T)w[T]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=E.g[0],I=E.g[1],T=E.g[2];let S=E.g[3],y;y=_+(S^I&(T^S))+w[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[2]+606105819&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[3]+3250441966&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[6]+2821735955&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[7]+4249261313&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[10]+4294925233&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[11]+2304563134&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(S^I&(T^S))+w[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(T^_&(I^T))+w[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=T+(I^S&(_^I))+w[14]+2792965006&4294967295,T=S+(y<<17&4294967295|y>>>15),y=I+(_^T&(S^_))+w[15]+1236535329&4294967295,I=T+(y<<22&4294967295|y>>>10),y=_+(T^S&(I^T))+w[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[11]+643717713&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[0]+3921069994&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[15]+3634488961&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[4]+3889429448&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[3]+4107603335&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[8]+1163531501&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(T^S&(I^T))+w[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^T&(_^I))+w[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=T+(_^I&(S^_))+w[7]+1735328473&4294967295,T=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(T^S))+w[12]+2368359562&4294967295,I=T+(y<<20&4294967295|y>>>12),y=_+(I^T^S)+w[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[11]+1839030562&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[14]+4259657740&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[7]+4139469664&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[10]+3200236656&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[3]+3572445317&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[6]+76029189&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(I^T^S)+w[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^T)+w[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=T+(S^_^I)+w[15]+530742520&4294967295,T=S+(y<<16&4294967295|y>>>16),y=I+(T^S^_)+w[2]+3299628645&4294967295,I=T+(y<<23&4294967295|y>>>9),y=_+(T^(I|~S))+w[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[14]+2878612391&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[5]+4237533241&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[10]+4293915773&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[1]+2240044497&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[6]+2734768916&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[13]+1309151649&4294967295,I=T+(y<<21&4294967295|y>>>11),y=_+(T^(I|~S))+w[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~T))+w[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=T+(_^(S|~I))+w[2]+718787259&4294967295,T=S+(y<<15&4294967295|y>>>17),y=I+(S^(T|~_))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+S&4294967295}n.prototype.v=function(E,_){_===void 0&&(_=E.length);const I=_-this.blockSize,w=this.C;let T=this.h,S=0;for(;S<_;){if(T==0)for(;S<=I;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(w[T++]=E.charCodeAt(S++),T==this.blockSize){s(this,w),T=0;break}}else for(;S<_;)if(w[T++]=E[S++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=_},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;_=this.o*8;for(var I=E.length-8;I<E.length;++I)E[I]=_&255,_/=256;for(this.v(E),E=Array(16),_=0,I=0;I<4;++I)for(let w=0;w<32;w+=8)E[_++]=this.g[I]>>>w&255;return E};function i(E,_){var I=u;return Object.prototype.hasOwnProperty.call(I,E)?I[E]:I[E]=_(E)}function o(E,_){this.h=_;const I=[];let w=!0;for(let T=E.length-1;T>=0;T--){const S=E[T]|0;w&&S==_||(I[T]=S,w=!1)}this.g=I}var u={};function c(E){return-128<=E&&E<128?i(E,function(_){return new o([_|0],_<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(E<0)return x(h(-E));const _=[];let I=1;for(let w=0;E>=I;w++)_[w]=E/I|0,I*=4294967296;return new o(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return x(f(E.substring(1),_));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(_,8));let w=m;for(let S=0;S<E.length;S+=8){var T=Math.min(8,E.length-S);const y=parseInt(E.substring(S,S+T),_);T<8?(T=h(Math.pow(_,T)),w=w.j(T).add(h(y))):(w=w.j(I),w=w.add(h(y)))}return w}var m=c(0),p=c(1),v=c(16777216);r=o.prototype,r.m=function(){if(N(this))return-x(this).m();let E=0,_=1;for(let I=0;I<this.g.length;I++){const w=this.i(I);E+=(w>=0?w:4294967296+w)*_,_*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(N(this))return"-"+x(this).toString(E);const _=h(Math.pow(E,6));var I=this;let w="";for(;;){const T=Z(I,_).g;I=B(I,T.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(E);if(I=T,C(I))return S+w;for(;S.length<6;)S="0"+S;w=S+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(let _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function N(E){return E.h==-1}r.l=function(E){return E=B(this,E),N(E)?-1:C(E)?0:1};function x(E){const _=E.g.length,I=[];for(let w=0;w<_;w++)I[w]=~E.g[w];return new o(I,~E.h).add(p)}r.abs=function(){return N(this)?x(this):this},r.add=function(E){const _=Math.max(this.g.length,E.g.length),I=[];let w=0;for(let T=0;T<=_;T++){let S=w+(this.i(T)&65535)+(E.i(T)&65535),y=(S>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,S&=65535,y&=65535,I[T]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function B(E,_){return E.add(x(_))}r.j=function(E){if(C(this)||C(E))return m;if(N(this))return N(E)?x(this).j(x(E)):x(x(this).j(E));if(N(E))return x(this.j(x(E)));if(this.l(v)<0&&E.l(v)<0)return h(this.m()*E.m());const _=this.g.length+E.g.length,I=[];for(var w=0;w<2*_;w++)I[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const S=this.i(w)>>>16,y=this.i(w)&65535,Oe=E.i(T)>>>16,Ht=E.i(T)&65535;I[2*w+2*T]+=y*Ht,j(I,2*w+2*T),I[2*w+2*T+1]+=S*Ht,j(I,2*w+2*T+1),I[2*w+2*T+1]+=y*Oe,j(I,2*w+2*T+1),I[2*w+2*T+2]+=S*Oe,j(I,2*w+2*T+2)}for(E=0;E<_;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=_;E<2*_;E++)I[E]=0;return new o(I,0)};function j(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function q(E,_){this.g=E,this.h=_}function Z(E,_){if(C(_))throw Error("division by zero");if(C(E))return new q(m,m);if(N(E))return _=Z(x(E),_),new q(x(_.g),x(_.h));if(N(_))return _=Z(E,x(_)),new q(x(_.g),_.h);if(E.g.length>30){if(N(E)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var I=p,w=_;w.l(E)<=0;)I=Y(I),w=Y(w);var T=X(I,1),S=X(w,1);for(w=X(w,2),I=X(I,2);!C(w);){var y=S.add(w);y.l(E)<=0&&(T=T.add(I),S=y),w=X(w,1),I=X(I,1)}return _=B(E,T.j(_)),new q(T,_)}for(T=m;E.l(_)>=0;){for(I=Math.max(1,Math.floor(E.m()/_.m())),w=Math.ceil(Math.log(I)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),S=h(I),y=S.j(_);N(y)||y.l(E)>0;)I-=w,S=h(I),y=S.j(_);C(S)&&(S=p),T=T.add(S),E=B(E,y)}return new q(T,E)}r.B=function(E){return Z(this,E).h},r.and=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)&E.i(w);return new o(I,this.h&E.h)},r.or=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)|E.i(w);return new o(I,this.h|E.h)},r.xor=function(E){const _=Math.max(this.g.length,E.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)^E.i(w);return new o(I,this.h^E.h)};function Y(E){const _=E.g.length+1,I=[];for(let w=0;w<_;w++)I[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(I,E.h)}function X(E,_){const I=_>>5;_%=32;const w=E.g.length-I,T=[];for(let S=0;S<w;S++)T[S]=_>0?E.i(S+I)>>>_|E.i(S+I+1)<<32-_:E.i(S+I);return new o(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Dh=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Dt=o}).apply(typeof Kc<"u"?Kc:typeof self<"u"?self:typeof window<"u"?window:{});var Ys=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xh,Qr,Nh,ii,Wo,kh,Mh,Oh;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ys=="object"&&Ys];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in d))break e;d=d[b]}a=a[a.length-1],g=d[a],l=l(g),l!=g&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function u(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function c(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=c,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function m(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,b,P){for(var O=Array(arguments.length-2),G=2;G<arguments.length;G++)O[G-2]=arguments[G];return l.prototype[b].apply(g,O)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function v(a){const l=a.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=a[g];return d}return[]}function C(a,l){for(let g=1;g<arguments.length;g++){const b=arguments[g];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=a.length||0;const P=b.length||0;a.length=d+P;for(let O=0;O<P;O++)a[d+O]=b[O]}else a.push(b)}}class N{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(a){o.setTimeout(()=>{throw a},0)}function B(){var a=E;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class j{constructor(){this.h=this.g=null}add(l,d){const g=q.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var q=new N(()=>new Z,a=>a.reset());class Z{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Y,X=!1,E=new j,_=()=>{const a=Promise.resolve(void 0);Y=()=>{a.then(I)}};function I(){for(var a;a=B();){try{a.h.call(a.g)}catch(d){x(d)}var l=q;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}X=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a}();function y(a){return/^[\s\xa0]*$/.test(a)}function Oe(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(Oe,T),Oe.prototype.init=function(a,l){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Oe.Z.h.call(this)},Oe.prototype.h=function(){Oe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ht="closure_listenable_"+(Math.random()*1e6|0),Cm=0;function Dm(a,l,d,g,b){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=b,this.key=++Cm,this.da=this.fa=!1}function Os(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Fs(a,l,d){for(const g in a)l.call(d,a[g],g,a)}function xm(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Mu(a){const l={};for(const d in a)l[d]=a[d];return l}const Ou="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fu(a,l){let d,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(d in g)a[d]=g[d];for(let P=0;P<Ou.length;P++)d=Ou[P],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function Ls(a){this.src=a,this.g={},this.h=0}Ls.prototype.add=function(a,l,d,g,b){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const O=ao(a,l,g,b);return O>-1?(l=a[O],d||(l.fa=!1)):(l=new Dm(l,this.src,P,!!g,b),l.fa=d,a.push(l)),l};function oo(a,l){const d=l.type;if(d in a.g){var g=a.g[d],b=Array.prototype.indexOf.call(g,l,void 0),P;(P=b>=0)&&Array.prototype.splice.call(g,b,1),P&&(Os(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ao(a,l,d,g){for(let b=0;b<a.length;++b){const P=a[b];if(!P.da&&P.listener==l&&P.capture==!!d&&P.ha==g)return b}return-1}var uo="closure_lm_"+(Math.random()*1e6|0),co={};function Lu(a,l,d,g,b){if(Array.isArray(l)){for(let P=0;P<l.length;P++)Lu(a,l[P],d,g,b);return null}return d=qu(d),a&&a[Ht]?a.J(l,d,u(g)?!!g.capture:!1,b):Nm(a,l,d,!1,g,b)}function Nm(a,l,d,g,b,P){if(!l)throw Error("Invalid event type");const O=u(b)?!!b.capture:!!b;let G=ho(a);if(G||(a[uo]=G=new Ls(a)),d=G.add(l,d,g,O,P),d.proxy)return d;if(g=km(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)S||(b=O),b===void 0&&(b=!1),a.addEventListener(l.toString(),g,b);else if(a.attachEvent)a.attachEvent(Uu(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function km(){function a(d){return l.call(a.src,a.listener,d)}const l=Mm;return a}function Bu(a,l,d,g,b){if(Array.isArray(l))for(var P=0;P<l.length;P++)Bu(a,l[P],d,g,b);else g=u(g)?!!g.capture:!!g,d=qu(d),a&&a[Ht]?(a=a.i,P=String(l).toString(),P in a.g&&(l=a.g[P],d=ao(l,d,g,b),d>-1&&(Os(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[P],a.h--)))):a&&(a=ho(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ao(l,d,g,b)),(d=a>-1?l[a]:null)&&lo(d))}function lo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Ht])oo(l.i,a);else{var d=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(d,g,a.capture):l.detachEvent?l.detachEvent(Uu(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=ho(l))?(oo(d,a),d.h==0&&(d.src=null,l[uo]=null)):Os(a)}}}function Uu(a){return a in co?co[a]:co[a]="on"+a}function Mm(a,l){if(a.da)a=!0;else{l=new Oe(l,this);const d=a.listener,g=a.ha||a.src;a.fa&&lo(a),a=d.call(g,l)}return a}function ho(a){return a=a[uo],a instanceof Ls?a:null}var fo="__closure_events_fn_"+(Math.random()*1e9>>>0);function qu(a){return typeof a=="function"?a:(a[fo]||(a[fo]=function(l){return a.handleEvent(l)}),a[fo])}function Ve(){w.call(this),this.i=new Ls(this),this.M=this,this.G=null}m(Ve,w),Ve.prototype[Ht]=!0,Ve.prototype.removeEventListener=function(a,l,d,g){Bu(this,a,l,d,g)};function ke(a,l){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var b=l;l=new T(g,a),Fu(l,b)}b=!0;let P,O;if(d)for(O=d.length-1;O>=0;O--)P=l.g=d[O],b=Bs(P,g,!0,l)&&b;if(P=l.g=a,b=Bs(P,g,!0,l)&&b,b=Bs(P,g,!1,l)&&b,d)for(O=0;O<d.length;O++)P=l.g=d[O],b=Bs(P,g,!1,l)&&b}Ve.prototype.N=function(){if(Ve.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let g=0;g<d.length;g++)Os(d[g]);delete a.g[l],a.h--}}this.G=null},Ve.prototype.J=function(a,l,d,g){return this.i.add(String(a),l,!1,d,g)},Ve.prototype.K=function(a,l,d,g){return this.i.add(String(a),l,!0,d,g)};function Bs(a,l,d,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let b=!0;for(let P=0;P<l.length;++P){const O=l[P];if(O&&!O.da&&O.capture==d){const G=O.listener,Ie=O.ha||O.src;O.fa&&oo(a.i,O),b=G.call(Ie,g)!==!1&&b}}return b&&!g.defaultPrevented}function Om(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function ju(a){a.g=Om(()=>{a.g=null,a.i&&(a.i=!1,ju(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Fm extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ju(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function br(a){w.call(this),this.h=a,this.g={}}m(br,w);var zu=[];function $u(a){Fs(a.g,function(l,d){this.g.hasOwnProperty(d)&&lo(l)},a),a.g={}}br.prototype.N=function(){br.Z.N.call(this),$u(this)},br.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mo=o.JSON.stringify,Lm=o.JSON.parse,Bm=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Gu(){}function Ku(){}var Rr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function go(){T.call(this,"d")}m(go,T);function po(){T.call(this,"c")}m(po,T);var Jt={},Qu=null;function Us(){return Qu=Qu||new Ve}Jt.Ia="serverreachability";function Wu(a){T.call(this,Jt.Ia,a)}m(Wu,T);function Sr(a){const l=Us();ke(l,new Wu(l))}Jt.STAT_EVENT="statevent";function Hu(a,l){T.call(this,Jt.STAT_EVENT,a),this.stat=l}m(Hu,T);function Me(a){const l=Us();ke(l,new Hu(l,a))}Jt.Ja="timingevent";function Ju(a,l){T.call(this,Jt.Ja,a),this.size=l}m(Ju,T);function Pr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Vr(){this.g=!0}Vr.prototype.ua=function(){this.g=!1};function Um(a,l,d,g,b,P){a.info(function(){if(a.g)if(P){var O="",G=P.split("&");for(let ie=0;ie<G.length;ie++){var Ie=G[ie].split("=");if(Ie.length>1){const Ae=Ie[0];Ie=Ie[1];const Xe=Ae.split("_");O=Xe.length>=2&&Xe[1]=="type"?O+(Ae+"="+Ie+"&"):O+(Ae+"=redacted&")}}}else O=null;else O=P;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+l+`
`+d+`
`+O})}function qm(a,l,d,g,b,P,O){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+l+`
`+d+`
`+P+" "+O})}function Vn(a,l,d,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+zm(a,d)+(g?" "+g:"")})}function jm(a,l){a.info(function(){return"TIMEOUT: "+l})}Vr.prototype.info=function(){};function zm(a,l){if(!a.g)return l;if(!l)return null;try{const P=JSON.parse(l);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var d=P[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var b=g[0];if(b!="noop"&&b!="stop"&&b!="close")for(let O=1;O<g.length;O++)g[O]=""}}}}return mo(P)}catch{return l}}var qs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Yu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Xu;function _o(){}m(_o,Gu),_o.prototype.g=function(){return new XMLHttpRequest},Xu=new _o;function Cr(a){return encodeURIComponent(String(a))}function $m(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function pt(a,l,d,g){this.j=a,this.i=l,this.l=d,this.S=g||1,this.V=new br(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Zu}function Zu(){this.i=null,this.g="",this.h=!1}var ec={},yo={};function Io(a,l,d){a.M=1,a.A=zs(Ye(l)),a.u=d,a.R=!0,tc(a,null)}function tc(a,l){a.F=Date.now(),js(a),a.B=Ye(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),mc(d.i,"t",g),a.C=0,d=a.j.L,a.h=new Zu,a.g=xc(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Fm(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,g=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(zu[0]=b.toString()),b=zu);for(let P=0;P<b.length;P++){const O=Lu(d,b[P],g||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.J?Mu(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Sr(),Um(a.i,a.v,a.B,a.l,a.S,a.u)}pt.prototype.ba=function(a){a=a.target;const l=this.O;l&&It(a)==3?l.j():this.Y(a)},pt.prototype.Y=function(a){try{if(a==this.g)e:{const G=It(this.g),Ie=this.g.ya(),ie=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||Tc(this.g)))){this.K||G!=4||Ie==7||(Ie==8||ie<=0?Sr(3):Sr(2)),Eo(this);var l=this.g.ca();this.X=l;var d=Gm(this);if(this.o=l==200,qm(this.i,this.v,this.B,this.l,this.S,G,l),this.o){if(this.U&&!this.L){t:{if(this.g){var g,b=this.g;if((g=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var P=g;break t}}P=null}if(a=P)Vn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,To(this,a);else{this.o=!1,this.m=3,Me(12),Yt(this),Dr(this);break e}}if(this.R){a=!0;let Ae;for(;!this.K&&this.C<d.length;)if(Ae=Km(this,d),Ae==yo){G==4&&(this.m=4,Me(14),a=!1),Vn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ae==ec){this.m=4,Me(15),Vn(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Vn(this.i,this.l,Ae,null),To(this,Ae);if(nc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||d.length!=0||this.h.h||(this.m=1,Me(16),a=!1),this.o=this.o&&a,!a)Vn(this.i,this.l,d,"[Invalid Chunked Response]"),Yt(this),Dr(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Vo(O),O.P=!0,Me(11))}}else Vn(this.i,this.l,d,null),To(this,d);G==4&&Yt(this),this.o&&!this.K&&(G==4?Pc(this.j,this):(this.o=!1,js(this)))}else og(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Me(12)):(this.m=0,Me(13)),Yt(this),Dr(this)}}}catch{}finally{}};function Gm(a){if(!nc(a))return a.g.la();const l=Tc(a.g);if(l==="")return"";let d="";const g=l.length,b=It(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Yt(a),Dr(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<g;P++)a.h.h=!0,d+=a.h.i.decode(l[P],{stream:!(b&&P==g-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function nc(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Km(a,l){var d=a.C,g=l.indexOf(`
`,d);return g==-1?yo:(d=Number(l.substring(d,g)),isNaN(d)?ec:(g+=1,g+d>l.length?yo:(l=l.slice(g,g+d),a.C=g+d,l)))}pt.prototype.cancel=function(){this.K=!0,Yt(this)};function js(a){a.T=Date.now()+a.H,rc(a,a.H)}function rc(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Pr(h(a.aa,a),l)}function Eo(a){a.D&&(o.clearTimeout(a.D),a.D=null)}pt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(jm(this.i,this.B),this.M!=2&&(Sr(),Me(17)),Yt(this),this.m=2,Dr(this)):rc(this,this.T-a)};function Dr(a){a.j.I==0||a.K||Pc(a.j,a)}function Yt(a){Eo(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,$u(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function To(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||wo(d.h,a))){if(!a.L&&wo(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Ws(d),Ks(d);else break e;Po(d),Me(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Pr(h(d.Va,d),6e3));oc(d.h)<=1&&d.ta&&(d.ta=void 0)}else Zt(d,11)}else if((a.L||d.g==a)&&Ws(d),!y(l))for(b=d.Ba.g.parse(l),l=0;l<b.length;l++){let ie=b[l];const Ae=ie[0];if(!(Ae<=d.K))if(d.K=Ae,ie=ie[1],d.I==2)if(ie[0]=="c"){d.M=ie[1],d.ba=ie[2];const Xe=ie[3];Xe!=null&&(d.ka=Xe,d.j.info("VER="+d.ka));const en=ie[4];en!=null&&(d.za=en,d.j.info("SVER="+d.za));const Et=ie[5];Et!=null&&typeof Et=="number"&&Et>0&&(g=1.5*Et,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Tt=a.g;if(Tt){const Js=Tt.g?Tt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Js){var P=g.h;P.g||Js.indexOf("spdy")==-1&&Js.indexOf("quic")==-1&&Js.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ao(P,P.h),P.h=null))}if(g.G){const Co=Tt.g?Tt.g.getResponseHeader("X-HTTP-Session-Id"):null;Co&&(g.wa=Co,ae(g.J,g.G,Co))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var O=a;if(g.na=Dc(g,g.L?g.ba:null,g.W),O.L){ac(g.h,O);var G=O,Ie=g.O;Ie&&(G.H=Ie),G.D&&(Eo(G),js(G)),g.g=O}else Rc(g);d.i.length>0&&Qs(d)}else ie[0]!="stop"&&ie[0]!="close"||Zt(d,7);else d.I==3&&(ie[0]=="stop"||ie[0]=="close"?ie[0]=="stop"?Zt(d,7):So(d):ie[0]!="noop"&&d.l&&d.l.qa(ie),d.A=0)}}Sr(4)}catch{}}var Qm=class{constructor(a,l){this.g=a,this.map=l}};function sc(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ic(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function oc(a){return a.h?1:a.g?a.g.size:0}function wo(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Ao(a,l){a.g?a.g.add(l):a.h=l}function ac(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}sc.prototype.cancel=function(){if(this.i=uc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uc(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return v(a.i)}var cc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Wm(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let b,P=null;g>=0?(b=a[d].substring(0,g),P=a[d].substring(g+1)):b=a[d],l(b,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function _t(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof _t?(this.l=a.l,xr(this,a.j),this.o=a.o,this.g=a.g,Nr(this,a.u),this.h=a.h,vo(this,gc(a.i)),this.m=a.m):a&&(l=String(a).match(cc))?(this.l=!1,xr(this,l[1]||"",!0),this.o=kr(l[2]||""),this.g=kr(l[3]||"",!0),Nr(this,l[4]),this.h=kr(l[5]||"",!0),vo(this,l[6]||"",!0),this.m=kr(l[7]||"")):(this.l=!1,this.i=new Or(null,this.l))}_t.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Mr(l,lc,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Mr(l,lc,!0),"@"),a.push(Cr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Mr(d,d.charAt(0)=="/"?Ym:Jm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Mr(d,Zm)),a.join("")},_t.prototype.resolve=function(a){const l=Ye(this);let d=!!a.j;d?xr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var g=a.h;if(d)Nr(l,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var b=l.h.lastIndexOf("/");b!=-1&&(g=l.h.slice(0,b+1)+g)}if(b=g,b==".."||b==".")g="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){g=b.lastIndexOf("/",0)==0,b=b.split("/");const P=[];for(let O=0;O<b.length;){const G=b[O++];G=="."?g&&O==b.length&&P.push(""):G==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),g&&O==b.length&&P.push("")):(P.push(G),g=!0)}g=P.join("/")}else g=b}return d?l.h=g:d=a.i.toString()!=="",d?vo(l,gc(a.i)):d=!!a.m,d&&(l.m=a.m),l};function Ye(a){return new _t(a)}function xr(a,l,d){a.j=d?kr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Nr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function vo(a,l,d){l instanceof Or?(a.i=l,eg(a.i,a.l)):(d||(l=Mr(l,Xm)),a.i=new Or(l,a.l))}function ae(a,l,d){a.i.set(l,d)}function zs(a){return ae(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function kr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Mr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Hm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Hm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var lc=/[#\/\?@]/g,Jm=/[#\?:]/g,Ym=/[#\?]/g,Xm=/[#\?@]/g,Zm=/#/g;function Or(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Xt(a){a.g||(a.g=new Map,a.h=0,a.i&&Wm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Or.prototype,r.add=function(a,l){Xt(this),this.i=null,a=Cn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function hc(a,l){Xt(a),l=Cn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function dc(a,l){return Xt(a),l=Cn(a,l),a.g.has(l)}r.forEach=function(a,l){Xt(this),this.g.forEach(function(d,g){d.forEach(function(b){a.call(l,b,g,this)},this)},this)};function fc(a,l){Xt(a);let d=[];if(typeof l=="string")dc(a,l)&&(d=d.concat(a.g.get(Cn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return Xt(this),this.i=null,a=Cn(this,a),dc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=fc(this,a),a.length>0?String(a[0]):l):l};function mc(a,l,d){hc(a,l),d.length>0&&(a.i=null,a.g.set(Cn(a,l),v(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const b=Cr(d);d=fc(this,d);for(let P=0;P<d.length;P++){let O=b;d[P]!==""&&(O+="="+Cr(d[P])),a.push(O)}}return this.i=a.join("&")};function gc(a){const l=new Or;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Cn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function eg(a,l){l&&!a.j&&(Xt(a),a.i=null,a.g.forEach(function(d,g){const b=g.toLowerCase();g!=b&&(hc(this,g),mc(this,b,d))},a)),a.j=l}function tg(a,l){const d=new Vr;if(o.Image){const g=new Image;g.onload=f(yt,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(yt,d,"TestLoadImage: error",!1,l,g),g.onabort=f(yt,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(yt,d,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function ng(a,l){const d=new Vr,g=new AbortController,b=setTimeout(()=>{g.abort(),yt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(b),P.ok?yt(d,"TestPingServer: ok",!0,l):yt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),yt(d,"TestPingServer: error",!1,l)})}function yt(a,l,d,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(d)}catch{}}function rg(){this.g=new Bm}function bo(a){this.i=a.Sb||null,this.h=a.ab||!1}m(bo,Gu),bo.prototype.g=function(){return new $s(this.i,this.h)};function $s(a,l){Ve.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m($s,Ve),r=$s.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,Lr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Fr(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Lr(this)),this.g&&(this.readyState=3,Lr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;pc(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function pc(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?Fr(this):Lr(this),this.readyState==3&&pc(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,Fr(this))},r.Na=function(a){this.g&&(this.response=a,Fr(this))},r.ga=function(){this.g&&Fr(this)};function Fr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Lr(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Lr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($s.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function _c(a){let l="";return Fs(a,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function Ro(a,l,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=_c(d),typeof a=="string"?d!=null&&Cr(d):ae(a,l,d))}function me(a){Ve.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(me,Ve);var sg=/^https?$/i,ig=["POST","PUT"];r=me.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Xu.g(),this.g.onreadystatechange=p(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(P){yc(this,P);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)d.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())d.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(ig,l,void 0)>=0)||g||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,O]of d)this.g.setRequestHeader(P,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){yc(this,P)}};function yc(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Ic(a),Gs(a)}function Ic(a){a.A||(a.A=!0,ke(a,"complete"),ke(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,ke(this,"complete"),ke(this,"abort"),Gs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gs(this,!0)),me.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?Ec(this):this.Xa())},r.Xa=function(){Ec(this)};function Ec(a){if(a.h&&typeof i<"u"){if(a.v&&It(a)==4)setTimeout(a.Ca.bind(a),0);else if(ke(a,"readystatechange"),It(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var g;if(g=P===0){let O=String(a.D).match(cc)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),g=!sg.test(O?O.toLowerCase():"")}d=g}if(d)ke(a,"complete"),ke(a,"success");else{a.o=6;try{var b=It(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",Ic(a)}}finally{Gs(a)}}}}function Gs(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||ke(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function It(a){return a.g?a.g.readyState:0}r.ca=function(){try{return It(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Lm(l)}};function Tc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function og(a){const l={};a=(a.g&&It(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(y(a[g]))continue;var d=$m(a[g]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=l[b]||[];l[b]=P,P.push(d)}xm(l,function(g){return g.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Br(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function wc(a){this.za=0,this.i=[],this.j=new Vr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Br("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Br("baseRetryDelayMs",5e3,a),this.Za=Br("retryDelaySeedMs",1e4,a),this.Ta=Br("forwardChannelMaxRetries",2,a),this.va=Br("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new sc(a&&a.concurrentRequestLimit),this.Ba=new rg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=wc.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,g){Me(0),this.W=a,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Dc(this,null,this.W),Qs(this)};function So(a){if(Ac(a),a.I==3){var l=a.V++,d=Ye(a.J);if(ae(d,"SID",a.M),ae(d,"RID",l),ae(d,"TYPE","terminate"),Ur(a,d),l=new pt(a,a.j,l),l.M=2,l.A=zs(Ye(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=xc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),js(l)}Cc(a)}function Ks(a){a.g&&(Vo(a),a.g.cancel(),a.g=null)}function Ac(a){Ks(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ws(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Qs(a){if(!ic(a.h)&&!a.m){a.m=!0;var l=a.Ea;Y||_(),X||(Y(),X=!0),E.add(l,a),a.D=0}}function ag(a,l){return oc(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Pr(h(a.Ea,a,l),Vc(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new pt(this,this.j,a);let P=this.o;if(this.U&&(P?(P=Mu(P),Fu(P,this.U)):P=this.U),this.u!==null||this.R||(b.J=P,P=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=bc(this,b,l),d=Ye(this.J),ae(d,"RID",a),ae(d,"CVER",22),this.G&&ae(d,"X-HTTP-Session-Id",this.G),Ur(this,d),P&&(this.R?l="headers="+Cr(_c(P))+"&"+l:this.u&&Ro(d,this.u,P)),Ao(this.h,b),this.Ra&&ae(d,"TYPE","init"),this.S?(ae(d,"$req",l),ae(d,"SID","null"),b.U=!0,Io(b,d,null)):Io(b,d,l),this.I=2}}else this.I==3&&(a?vc(this,a):this.i.length==0||ic(this.h)||vc(this))};function vc(a,l){var d;l?d=l.l:d=a.V++;const g=Ye(a.J);ae(g,"SID",a.M),ae(g,"RID",d),ae(g,"AID",a.K),Ur(a,g),a.u&&a.o&&Ro(g,a.u,a.o),d=new pt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=bc(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ao(a.h,d),Io(d,g,l)}function Ur(a,l){a.H&&Fs(a.H,function(d,g){ae(l,g,d)}),a.l&&Fs({},function(d,g){ae(l,g,d)})}function bc(a,l,d){d=Math.min(a.i.length,d);const g=a.l?h(a.l.Ka,a.l,a):null;e:{var b=a.i;let G=-1;for(;;){const Ie=["count="+d];G==-1?d>0?(G=b[0].g,Ie.push("ofs="+G)):G=0:Ie.push("ofs="+G);let ie=!0;for(let Ae=0;Ae<d;Ae++){var P=b[Ae].g;const Xe=b[Ae].map;if(P-=G,P<0)G=Math.max(0,b[Ae].g-100),ie=!1;else try{P="req"+P+"_"||"";try{var O=Xe instanceof Map?Xe:Object.entries(Xe);for(const[en,Et]of O){let Tt=Et;u(Et)&&(Tt=mo(Et)),Ie.push(P+en+"="+encodeURIComponent(Tt))}}catch(en){throw Ie.push(P+"type="+encodeURIComponent("_badmap")),en}}catch{g&&g(Xe)}}if(ie){O=Ie.join("&");break e}}O=void 0}return a=a.i.splice(0,d),l.G=a,O}function Rc(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;Y||_(),X||(Y(),X=!0),E.add(l,a),a.A=0}}function Po(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Pr(h(a.Da,a),Vc(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Sc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Pr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Me(10),Ks(this),Sc(this))};function Vo(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Sc(a){a.g=new pt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Ye(a.na);ae(l,"RID","rpc"),ae(l,"SID",a.M),ae(l,"AID",a.K),ae(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ae(l,"TO",a.ia),ae(l,"TYPE","xmlhttp"),Ur(a,l),a.u&&a.o&&Ro(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=zs(Ye(l)),d.u=null,d.R=!0,tc(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Ks(this),Po(this),Me(19))};function Ws(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Pc(a,l){var d=null;if(a.g==l){Ws(a),Vo(a),a.g=null;var g=2}else if(wo(a.h,l))d=l.G,ac(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var b=a.D;g=Us(),ke(g,new Ju(g,d)),Qs(a)}else Rc(a);else if(b=l.m,b==3||b==0&&l.X>0||!(g==1&&ag(a,l)||g==2&&Po(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),b){case 1:Zt(a,5);break;case 4:Zt(a,10);break;case 3:Zt(a,6);break;default:Zt(a,2)}}}function Vc(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function Zt(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),g=a.Ua;const b=!g;g=new _t(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||xr(g,"https"),zs(g),b?tg(g.toString(),d):ng(g.toString(),d)}else Me(2);a.I=0,a.l&&a.l.pa(l),Cc(a),Ac(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Me(2)):(this.j.info("Failed to ping google.com"),Me(1))};function Cc(a){if(a.I=0,a.ja=[],a.l){const l=uc(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ja,l),C(a.ja,a.i),a.h.i.length=0,v(a.i),a.i.length=0),a.l.oa()}}function Dc(a,l,d){var g=d instanceof _t?Ye(d):new _t(d);if(g.g!="")l&&(g.g=l+"."+g.g),Nr(g,g.u);else{var b=o.location;g=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;const P=new _t(null);g&&xr(P,g),l&&(P.g=l),b&&Nr(P,b),d&&(P.h=d),g=P}return d=a.G,l=a.wa,d&&l&&ae(g,d,l),ae(g,"VER",a.ka),Ur(a,g),g}function xc(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new me(new bo({ab:d})):new me(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Nc(){}r=Nc.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Hs(){}Hs.prototype.g=function(a,l){return new $e(a,l)};function $e(a,l){Ve.call(this),this.g=new wc(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!y(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Dn(this)}m($e,Ve),$e.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){So(this.g)},$e.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=mo(a),a=d);l.i.push(new Qm(l.Ya++,a)),l.I==3&&Qs(l)},$e.prototype.N=function(){this.g.l=null,delete this.j,So(this.g),delete this.g,$e.Z.N.call(this)};function kc(a){go.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(kc,go);function Mc(){po.call(this),this.status=1}m(Mc,po);function Dn(a){this.g=a}m(Dn,Nc),Dn.prototype.ra=function(){ke(this.g,"a")},Dn.prototype.qa=function(a){ke(this.g,new kc(a))},Dn.prototype.pa=function(a){ke(this.g,new Mc)},Dn.prototype.oa=function(){ke(this.g,"b")},Hs.prototype.createWebChannel=Hs.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,Oh=function(){return new Hs},Mh=function(){return Us()},kh=Jt,Wo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},qs.NO_ERROR=0,qs.TIMEOUT=8,qs.HTTP_ERROR=6,ii=qs,Yu.COMPLETE="complete",Nh=Yu,Ku.EventType=Rr,Rr.OPEN="a",Rr.CLOSE="b",Rr.ERROR="c",Rr.MESSAGE="d",Ve.prototype.listen=Ve.prototype.J,Qr=Ku,me.prototype.listenOnce=me.prototype.K,me.prototype.getLastError=me.prototype.Ha,me.prototype.getLastErrorCode=me.prototype.ya,me.prototype.getStatus=me.prototype.ca,me.prototype.getResponseJson=me.prototype.La,me.prototype.getResponseText=me.prototype.la,me.prototype.send=me.prototype.ea,me.prototype.setWithCredentials=me.prototype.Fa,xh=me}).apply(typeof Ys<"u"?Ys:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
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
 */let fr="12.12.0";function Fp(r){fr=r}/**
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
 */const kt=new Rh("@firebase/firestore");function Ln(){return kt.logLevel}function Lp(r){kt.setLogLevel(r)}function D(r,...e){if(kt.logLevel<=J.DEBUG){const t=e.map(Sa);kt.debug(`Firestore (${fr}): ${r}`,...t)}}function ge(r,...e){if(kt.logLevel<=J.ERROR){const t=e.map(Sa);kt.error(`Firestore (${fr}): ${r}`,...t)}}function ze(r,...e){if(kt.logLevel<=J.WARN){const t=e.map(Sa);kt.warn(`Firestore (${fr}): ${r}`,...t)}}function Sa(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
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
 */function F(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Fh(r,n,t)}function Fh(r,e,t){let n=`FIRESTORE (${fr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw ge(n),new Error(n)}function L(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Fh(e,s,n)}function Bp(r,e){r||F(57014,e)}function M(r,e){return r}/**
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
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends dr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Se{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Lh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Bh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class Up{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class qp{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){L(this.o===void 0,42304);let n=this.i;const s=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let i=new Se;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Se,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Se)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new Lh(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string",2055,{h:e}),new be(e)}}class jp{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=be.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class zp{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new jp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ho{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $p{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Tp(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){L(this.o===void 0,3512);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ho(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(L(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ho(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Gp{getToken(){return Promise.resolve(new Ho(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function Kp(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */class Mi{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Kp(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function Jo(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Mo(s)===Mo(i)?z(s,i):Mo(s)?1:-1}return z(r.length,e.length)}const Qp=55296,Wp=57343;function Mo(r){const e=r.charCodeAt(0);return e>=Qp&&e<=Wp}function Gn(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function Uh(r){return r+"\0"}/**
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
 */const Yo="__name__";class Ze{constructor(e,t,n){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&F(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Ze.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ze?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Ze.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return z(e.length,t.length)}static compareSegments(e,t){const n=Ze.isNumericId(e),s=Ze.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Ze.extractNumericId(e).compare(Ze.extractNumericId(t)):Jo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Dt.fromString(e.substring(4,e.length-2))}}class K extends Ze{construct(e,t,n){return new K(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new V(R.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new K(t)}static emptyPath(){return new K([])}}const Hp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends Ze{construct(e,t,n){return new ce(e,t,n)}static isValidIdentifier(e){return Hp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yo}static keyField(){return new ce([Yo])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new V(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new V(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(n+=u,s++):(i(),s++)}if(i(),o)throw new V(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
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
 */class k{constructor(e){this.path=e}static fromPath(e){return new k(K.fromString(e))}static fromName(e){return new k(K.fromString(e).popFirst(5))}static empty(){return new k(K.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&K.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return K.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new k(new K(e.slice()))}}/**
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
 */function Pa(r,e,t){if(!t)throw new V(R.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function qh(r,e,t,n){if(e===!0&&n===!0)throw new V(R.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Qc(r){if(!k.isDocumentKey(r))throw new V(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Wc(r){if(k.isDocumentKey(r))throw new V(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function jh(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Oi(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":F(12329,{type:typeof r})}function Q(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new V(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Oi(r);throw new V(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function zh(r,e){if(e<=0)throw new V(R.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
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
 */function ye(r,e){const t={typeString:r};return e&&(t.value=e),t}function An(r,e){if(!jh(r))throw new V(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new V(R.INVALID_ARGUMENT,t);return!0}/**
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
 */const Hc=-62135596800,Jc=1e6;class ee{static now(){return ee.fromMillis(Date.now())}static fromDate(e){return ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Jc);return new ee(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Hc)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Jc}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(An(e,ee._jsonSchema))return new ee(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Hc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ee._jsonSchemaVersion="firestore/timestamp/1.0",ee._jsonSchema={type:ye("string",ee._jsonSchemaVersion),seconds:ye("number"),nanoseconds:ye("number")};/**
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
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new ee(0,0))}static max(){return new U(new ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Kn=-1;class Qn{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Xo(r){return r.fields.find(e=>e.kind===2)}function rn(r){return r.fields.filter(e=>e.kind!==2)}function Jp(r,e){let t=z(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=Yp(r.fields[n],e.fields[n]),t!==0)return t;return z(r.fields.length,e.fields.length)}Qn.UNKNOWN_ID=-1;class hn{constructor(e,t){this.fieldPath=e,this.kind=t}}function Yp(r,e){const t=ce.comparator(r.fieldPath,e.fieldPath);return t!==0?t:z(r.kind,e.kind)}class Wn{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Wn(0,Qe.min())}}function $h(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=U.fromTimestamp(n===1e9?new ee(t+1,0):new ee(t,n));return new Qe(s,k.empty(),e)}function Gh(r){return new Qe(r.readTime,r.key,Kn)}class Qe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Qe(U.min(),k.empty(),Kn)}static max(){return new Qe(U.max(),k.empty(),Kn)}}function Va(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=k.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
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
 */const Kh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Qh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function jt(r){if(r.code!==R.FAILED_PRECONDITION||r.message!==Kh)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let s=0,i=0,o=!1;e.forEach(u=>{++s,u.next(()=>{++i,o&&i===s&&t()},c=>n(c))}),o=!0,i===s&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(s=>s?A.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new A((n,s)=>{const i=e.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++u,u===i&&n(o)},f=>s(f))}})}static doWhile(e,t){return new A((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
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
 */const Ge="SimpleDb";class Fi{static open(e,t,n,s){try{return new Fi(t,e.transaction(s,n))}catch(i){throw new Xr(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Se,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Xr(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Ca(n.target.error);this.S.reject(new Xr(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(D(Ge,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Zp(t)}}class rt{static delete(e){return D(Ge,"Removing database:",e),on(yh().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!Ah())return!1;if(rt.F())return!0;const e=pi(),t=rt.M(e),n=0<t&&t<10,s=Wh(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,rt.M(pi())===12.2&&ge("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(D(Ge,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new Xr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new V(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new V(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Xr(e,o))},s.onupgradeneeded=i=>{D(Ge,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{D(Ge,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const u=Fi.open(this.db,e,i?"readonly":"readwrite",n),c=s(u).next(h=>(u.C(),h)).catch(h=>(u.abort(h),A.reject(h))).toPromise();return c.catch(()=>{}),await u.D,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(D(Ge,"Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Wh(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Xp{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return on(this.U.delete())}}class Xr extends V{constructor(e,t){super(R.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function zt(r){return r.name==="IndexedDbTransactionError"}class Zp{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(D(Ge,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(D(Ge,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),on(n)}add(e){return D(Ge,"ADD",this.store.name,e,e),on(this.store.add(e))}get(e){return on(this.store.get(e)).next(t=>(t===void 0&&(t=null),D(Ge,"GET",this.store.name,e,t),t))}delete(e){return D(Ge,"DELETE",this.store.name,e),on(this.store.delete(e))}count(){return D(Ge,"COUNT",this.store.name),on(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((o,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{o(c.target.result)}})}{const i=this.cursor(n),o=[];return this.H(i,(u,c)=>{o.push(c)}).next(()=>o)}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}X(e,t){D(Ge,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,(i,o,u)=>u.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new A((n,s)=>{t.onerror=i=>{const o=Ca(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(u=>{u?o.continue():n()}):n()}})}H(e,t){const n=[];return new A((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void s();const c=new Xp(u),h=t(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch(m=>(c.done(),A.reject(m)));n.push(f)}c.isDone?s():c.G===null?u.continue():u.continue(c.G)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function on(r){return new A((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Ca(n.target.error);t(s)}})}let Yc=!1;function Ca(r){const e=rt.M(pi());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new V("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Yc||(Yc=!0,setTimeout(()=>{throw n},0)),n}}return r}const Zr="IndexBackfiller";class e_{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){D(Zr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();D(Zr,`Documents written: ${t}`)}catch(t){zt(t)?D(Zr,"Ignoring IndexedDB error during index backfill: ",t):await jt(t)}await this.re(6e4)})}}class t_{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let s=t,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return D(Zr,`Processing collection: ${o}`),this.oe(e,o,s).next(u=>{s-=u,n.add(o)});i=!1})).next(()=>t-s)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(u=>(D(Zr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u))).next(()=>o.size)}))}_e(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=Gh(i);Va(o,n)>0&&(n=o)}),new Qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Le{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Le.ce=-1;/**
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
 */const xt=-1;function ws(r){return r==null}function ls(r){return r===0&&1/r==-1/0}function Hh(r){return typeof r=="number"&&Number.isInteger(r)&&!ls(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const Ei="";function xe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Xc(e)),e=n_(r.get(t),e);return Xc(e)}function n_(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Ei:t+="";break;default:t+=i}}return t}function Xc(r){return r+Ei+""}function tt(r){const e=r.length;if(L(e>=2,64408,{path:r}),e===2)return L(r.charAt(0)===Ei&&r.charAt(1)==="",56145,{path:r}),K.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Ei,i);switch((o<0||o>t)&&F(50515,{path:r}),r.charAt(o+1)){case"":const u=r.substring(i,o);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:F(61167,{path:r})}i=o+2}return new K(n)}/**
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
 */const sn="remoteDocuments",As="owner",xn="owner",hs="mutationQueues",r_="userId",We="mutations",Zc="batchId",ln="userMutationsIndex",el=["userId","batchId"];/**
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
 */function oi(r,e){return[r,xe(e)]}function Jh(r,e,t){return[r,xe(e),t]}const s_={},Hn="documentMutations",Ti="remoteDocumentsV14",i_=["prefixPath","collectionGroup","readTime","documentId"],ai="documentKeyIndex",o_=["prefixPath","collectionGroup","documentId"],Yh="collectionGroupIndex",a_=["collectionGroup","readTime","prefixPath","documentId"],ds="remoteDocumentGlobal",Zo="remoteDocumentGlobalKey",Jn="targets",Xh="queryTargetsIndex",u_=["canonicalId","targetId"],Yn="targetDocuments",c_=["targetId","path"],Da="documentTargetsIndex",l_=["path","targetId"],wi="targetGlobalKey",dn="targetGlobal",fs="collectionParents",h_=["collectionId","parent"],Xn="clientMetadata",d_="clientId",Li="bundles",f_="bundleId",Bi="namedQueries",m_="name",xa="indexConfiguration",g_="indexId",ea="collectionGroupIndex",p_="collectionGroup",es="indexState",__=["indexId","uid"],Zh="sequenceNumberIndex",y_=["uid","sequenceNumber"],ts="indexEntries",I_=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],ed="documentKeyIndex",E_=["indexId","uid","orderedDocumentKey"],Ui="documentOverlays",T_=["userId","collectionPath","documentId"],ta="collectionPathOverlayIndex",w_=["userId","collectionPath","largestBatchId"],td="collectionGroupOverlayIndex",A_=["userId","collectionGroup","largestBatchId"],Na="globals",v_="name",nd=[hs,We,Hn,sn,Jn,As,dn,Yn,Xn,ds,fs,Li,Bi],b_=[...nd,Ui],rd=[hs,We,Hn,Ti,Jn,As,dn,Yn,Xn,ds,fs,Li,Bi,Ui],sd=rd,ka=[...sd,xa,es,ts],R_=ka,id=[...ka,Na],S_=id;/**
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
 */class na extends Qh{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function we(r,e){const t=M(r);return rt.O(t.le,e)}/**
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
 */function tl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function $t(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function od(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function ad(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
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
 */class oe{constructor(e,t){this.comparator=e,this.root=t||Pe.EMPTY}insert(e,t){return new oe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Pe.BLACK,null,null))}remove(e){return new oe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Pe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xs(this.root,e,this.comparator,!0)}}class Xs{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Pe{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Pe.RED,this.left=s??Pe.EMPTY,this.right=i??Pe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Pe(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Pe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Pe.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Pe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Pe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}}Pe.EMPTY=null,Pe.RED=!0,Pe.BLACK=!1;Pe.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Pe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class re{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new nl(this.data.getIterator())}getIteratorFrom(e){return new nl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class nl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Nn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Be{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new Be([])}unionWith(e){let t=new re(ce.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Be(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Gn(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
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
 */class ud extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function P_(){return typeof atob<"u"}/**
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
 */class fe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ud("Invalid base64 string: "+i):i}}(e);return new fe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new fe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}fe.EMPTY_BYTE_STRING=new fe("");const V_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(r){if(L(!!r,39018),typeof r=="string"){let e=0;const t=V_.exec(r);if(L(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:le(r.seconds),nanos:le(r.nanos)}}function le(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function lt(r){return typeof r=="string"?fe.fromBase64String(r):fe.fromUint8Array(r)}/**
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
 */const cd="server_timestamp",ld="__type__",hd="__previous_value__",dd="__local_write_time__";function qi(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[ld])==null?void 0:n.stringValue)===cd}function ji(r){const e=r.mapValue.fields[hd];return qi(e)?ji(e):e}function ms(r){const e=ct(r.mapValue.fields[dd].timestampValue);return new ee(e.seconds,e.nanos)}/**
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
 */class C_{constructor(e,t,n,s,i,o,u,c,h,f,m){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const gs="(default)";class Mt{constructor(e,t){this.projectId=e,this.database=t||gs}static empty(){return new Mt("","")}get isDefaultDatabase(){return this.database===gs}isEqual(e){return e instanceof Mt&&e.projectId===this.projectId&&e.database===this.database}}function D_(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new V(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Mt(r.options.projectId,e)}/**
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
 */const Ma="__type__",fd="__max__",St={mapValue:{fields:{__type__:{stringValue:fd}}}},Oa="__vector__",Zn="value",ui={nullValue:"NULL_VALUE"};function Ot(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?qi(r)?4:md(r)?9007199254740991:zi(r)?10:11:F(28295,{value:r})}function it(r,e){if(r===e)return!0;const t=Ot(r);if(t!==Ot(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ms(r).isEqual(ms(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ct(s.timestampValue),u=ct(i.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,i){return lt(s.bytesValue).isEqual(lt(i.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,i){return le(s.geoPointValue.latitude)===le(i.geoPointValue.latitude)&&le(s.geoPointValue.longitude)===le(i.geoPointValue.longitude)}(r,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return le(s.integerValue)===le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=le(s.doubleValue),u=le(i.doubleValue);return o===u?ls(o)===ls(u):isNaN(o)&&isNaN(u)}return!1}(r,e);case 9:return Gn(r.arrayValue.values||[],e.arrayValue.values||[],it);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},u=i.mapValue.fields||{};if(tl(o)!==tl(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!it(o[c],u[c])))return!1;return!0}(r,e);default:return F(52216,{left:r})}}function ps(r,e){return(r.values||[]).find(t=>it(t,e))!==void 0}function Ft(r,e){if(r===e)return 0;const t=Ot(r),n=Ot(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return function(i,o){const u=le(i.integerValue||i.doubleValue),c=le(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,e);case 3:return rl(r.timestampValue,e.timestampValue);case 4:return rl(ms(r),ms(e));case 5:return Jo(r.stringValue,e.stringValue);case 6:return function(i,o){const u=lt(i),c=lt(o);return u.compareTo(c)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=z(u[h],c[h]);if(f!==0)return f}return z(u.length,c.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const u=z(le(i.latitude),le(o.latitude));return u!==0?u:z(le(i.longitude),le(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return sl(r.arrayValue,e.arrayValue);case 10:return function(i,o){var p,v,C,N;const u=i.fields||{},c=o.fields||{},h=(p=u[Zn])==null?void 0:p.arrayValue,f=(v=c[Zn])==null?void 0:v.arrayValue,m=z(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((N=f==null?void 0:f.values)==null?void 0:N.length)||0);return m!==0?m:sl(h,f)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===St.mapValue&&o===St.mapValue)return 0;if(i===St.mapValue)return 1;if(o===St.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const p=Jo(c[m],f[m]);if(p!==0)return p;const v=Ft(u[c[m]],h[f[m]]);if(v!==0)return v}return z(c.length,f.length)}(r.mapValue,e.mapValue);default:throw F(23264,{he:t})}}function rl(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=ct(r),n=ct(e),s=z(t.seconds,n.seconds);return s!==0?s:z(t.nanos,n.nanos)}function sl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Ft(t[s],n[s]);if(i)return i}return z(t.length,n.length)}function er(r){return ra(r)}function ra(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=ct(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return lt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return k.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=ra(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${ra(t.fields[o])}`;return s+"}"}(r.mapValue):F(61005,{value:r})}function ci(r){switch(Ot(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ji(r);return e?16+ci(e):16;case 5:return 2*r.stringValue.length;case 6:return lt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+ci(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return $t(n.fields,(i,o)=>{s+=i.length+ci(o)}),s}(r.mapValue);default:throw F(13486,{value:r})}}function mn(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function sa(r){return!!r&&"integerValue"in r}function _s(r){return!!r&&"arrayValue"in r}function il(r){return!!r&&"nullValue"in r}function ol(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function li(r){return!!r&&"mapValue"in r}function zi(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Ma])==null?void 0:n.stringValue)===Oa}function ns(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return $t(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=ns(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ns(r.arrayValue.values[t]);return e}return{...r}}function md(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===fd}const gd={mapValue:{fields:{[Ma]:{stringValue:Oa},[Zn]:{arrayValue:{}}}}};function x_(r){return"nullValue"in r?ui:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?mn(Mt.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?zi(r)?gd:{mapValue:{}}:F(35942,{value:r})}function N_(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?mn(Mt.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?gd:"mapValue"in r?zi(r)?{mapValue:{}}:St:F(61959,{value:r})}function al(r,e){const t=Ft(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function ul(r,e){const t=Ft(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
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
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!li(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ns(t)}setAll(e){let t=ce.emptyPath(),n={},s=[];e.forEach((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=u.popLast()}o?n[u.lastSegment()]=ns(o):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());li(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return it(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];li(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){$t(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Re(ns(this.value))}}function pd(r){const e=[];return $t(r.fields,(t,n)=>{const s=new ce([t]);if(li(n)){const i=pd(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Be(e)}/**
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
 */class ue{constructor(e,t,n,s,i,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(e){return new ue(e,0,U.min(),U.min(),U.min(),Re.empty(),0)}static newFoundDocument(e,t,n,s){return new ue(e,1,t,U.min(),n,s,0)}static newNoDocument(e,t){return new ue(e,2,t,U.min(),U.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new ue(e,3,t,U.min(),U.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Lt{constructor(e,t){this.position=e,this.inclusive=t}}function cl(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(o.referenceValue),t.key):n=Ft(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function ll(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!it(r.position[t],e.position[t]))return!1;return!0}/**
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
 */class ys{constructor(e,t="asc"){this.field=e,this.dir=t}}function k_(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
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
 */class _d{}class W extends _d{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new M_(e,t,n):t==="array-contains"?new L_(e,n):t==="in"?new Ad(e,n):t==="not-in"?new B_(e,n):t==="array-contains-any"?new U_(e,n):new W(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new O_(e,n):new F_(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ft(t,this.value)):t!==null&&Ot(this.value)===Ot(t)&&this.matchesComparison(Ft(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class te extends _d{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new te(e,t)}matches(e){return tr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function tr(r){return r.op==="and"}function ia(r){return r.op==="or"}function Fa(r){return yd(r)&&tr(r)}function yd(r){for(const e of r.filters)if(e instanceof te)return!1;return!0}function oa(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+er(r.value);if(Fa(r))return r.filters.map(e=>oa(e)).join(",");{const e=r.filters.map(t=>oa(t)).join(",");return`${r.op}(${e})`}}function Id(r,e){return r instanceof W?function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&it(n.value,s.value)}(r,e):r instanceof te?function(n,s){return s instanceof te&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,u)=>i&&Id(o,s.filters[u]),!0):!1}(r,e):void F(19439)}function Ed(r,e){const t=r.filters.concat(e);return te.create(t,r.op)}function Td(r){return r instanceof W?function(t){return`${t.field.canonicalString()} ${t.op} ${er(t.value)}`}(r):r instanceof te?function(t){return t.op.toString()+" {"+t.getFilters().map(Td).join(" ,")+"}"}(r):"Filter"}class M_ extends W{constructor(e,t,n){super(e,t,n),this.key=k.fromName(n.referenceValue)}matches(e){const t=k.comparator(e.key,this.key);return this.matchesComparison(t)}}class O_ extends W{constructor(e,t){super(e,"in",t),this.keys=wd("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class F_ extends W{constructor(e,t){super(e,"not-in",t),this.keys=wd("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function wd(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(n=>k.fromName(n.referenceValue))}class L_ extends W{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return _s(t)&&ps(t.arrayValue,this.value)}}class Ad extends W{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ps(this.value.arrayValue,t)}}class B_ extends W{constructor(e,t){super(e,"not-in",t)}matches(e){if(ps(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ps(this.value.arrayValue,t)}}class U_ extends W{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!_s(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>ps(this.value.arrayValue,n))}}/**
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
 */class q_{constructor(e,t=null,n=[],s=[],i=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.Te=null}}function aa(r,e=null,t=[],n=[],s=null,i=null,o=null){return new q_(r,e,t,n,s,i,o)}function gn(r){const e=M(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>oa(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),ws(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>er(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>er(n)).join(",")),e.Te=t}return e.Te}function vs(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!k_(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Id(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!ll(r.startAt,e.startAt)&&ll(r.endAt,e.endAt)}function Ai(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function vi(r,e){return r.filters.filter(t=>t instanceof W&&t.field.isEqual(e))}function hl(r,e,t){let n=ui,s=!0;for(const i of vi(r,e)){let o=ui,u=!0;switch(i.op){case"<":case"<=":o=x_(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,u=!1;break;case"!=":case"not-in":o=ui}al({value:n,inclusive:s},{value:o,inclusive:u})<0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];al({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function dl(r,e,t){let n=St,s=!0;for(const i of vi(r,e)){let o=St,u=!0;switch(i.op){case">=":case">":o=N_(i.value),u=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,u=!1;break;case"!=":case"not-in":o=St}ul({value:n,inclusive:s},{value:o,inclusive:u})>0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];ul({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class dt{constructor(e,t=null,n=[],s=[],i=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function vd(r,e,t,n,s,i,o,u){return new dt(r,e,t,n,s,i,o,u)}function mr(r){return new dt(r)}function fl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function j_(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function La(r){return r.collectionGroup!==null}function jn(r){const e=M(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new re(ce.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new ys(i,n))}),t.has(ce.keyField().canonicalString())||e.Ee.push(new ys(ce.keyField(),n))}return e.Ee}function Ne(r){const e=M(r);return e.Ie||(e.Ie=Rd(e,jn(r))),e.Ie}function bd(r){const e=M(r);return e.Re||(e.Re=Rd(e,r.explicitOrderBy)),e.Re}function Rd(r,e){if(r.limitType==="F")return aa(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ys(s.field,i)});const t=r.endAt?new Lt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Lt(r.startAt.position,r.startAt.inclusive):null;return aa(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ua(r,e){const t=r.filters.concat([e]);return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function z_(r,e){const t=r.explicitOrderBy.concat([e]);return new dt(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function bi(r,e,t){return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function $_(r,e){return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,e,r.endAt)}function G_(r,e){return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,e)}function bs(r,e){return vs(Ne(r),Ne(e))&&r.limitType===e.limitType}function Sd(r){return`${gn(Ne(r))}|lt:${r.limitType}`}function Bn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>Td(s)).join(", ")}]`),ws(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>er(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>er(s)).join(",")),`Target(${n})`}(Ne(r))}; limitType=${r.limitType})`}function Rs(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of jn(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,u,c){const h=cl(o,u,c);return o.inclusive?h<=0:h<0}(n.startAt,jn(n),s)||n.endAt&&!function(o,u,c){const h=cl(o,u,c);return o.inclusive?h>=0:h>0}(n.endAt,jn(n),s))}(r,e)}function Pd(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Vd(r){return(e,t)=>{let n=!1;for(const s of jn(r)){const i=K_(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function K_(r,e,t){const n=r.field.isKeyField()?k.comparator(e.key,t.key):function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?Ft(c,h):F(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return F(19790,{direction:r.dir})}}/**
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
 */class ft{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){$t(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return ad(this.inner)}size(){return this.innerSize}}/**
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
 */const Q_=new oe(k.comparator);function Ue(){return Q_}const Cd=new oe(k.comparator);function Wr(...r){let e=Cd;for(const t of r)e=e.insert(t.key,t);return e}function Dd(r){let e=Cd;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function nt(){return rs()}function xd(){return rs()}function rs(){return new ft(r=>r.toString(),(r,e)=>r.isEqual(e))}const W_=new oe(k.comparator),H_=new re(k.comparator);function $(...r){let e=H_;for(const t of r)e=e.add(t);return e}const J_=new re(z);function Ba(){return J_}/**
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
 */function Ua(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ls(e)?"-0":e}}function Nd(r){return{integerValue:""+r}}function kd(r,e){return Hh(e)?Nd(e):Ua(r,e)}/**
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
 */class $i{constructor(){this._=void 0}}function Y_(r,e,t){return r instanceof nr?function(s,i){const o={fields:{[ld]:{stringValue:cd},[dd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&qi(i)&&(i=ji(i)),i&&(o.fields[hd]=i),{mapValue:o}}(t,e):r instanceof pn?Od(r,e):r instanceof _n?Fd(r,e):function(s,i){const o=Md(s,i),u=ml(o)+ml(s.Ae);return sa(o)&&sa(s.Ae)?Nd(u):Ua(s.serializer,u)}(r,e)}function X_(r,e,t){return r instanceof pn?Od(r,e):r instanceof _n?Fd(r,e):t}function Md(r,e){return r instanceof rr?function(n){return sa(n)||function(i){return!!i&&"doubleValue"in i}(n)}(e)?e:{integerValue:0}:null}class nr extends $i{}class pn extends $i{constructor(e){super(),this.elements=e}}function Od(r,e){const t=Ld(e);for(const n of r.elements)t.some(s=>it(s,n))||t.push(n);return{arrayValue:{values:t}}}class _n extends $i{constructor(e){super(),this.elements=e}}function Fd(r,e){let t=Ld(e);for(const n of r.elements)t=t.filter(s=>!it(s,n));return{arrayValue:{values:t}}}class rr extends $i{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function ml(r){return le(r.integerValue||r.doubleValue)}function Ld(r){return _s(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Ss{constructor(e,t){this.field=e,this.transform=t}}function Z_(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof pn&&s instanceof pn||n instanceof _n&&s instanceof _n?Gn(n.elements,s.elements,it):n instanceof rr&&s instanceof rr?it(n.Ae,s.Ae):n instanceof nr&&s instanceof nr}(r.transform,e.transform)}class ey{constructor(e,t){this.version=e,this.transformResults=t}}class he{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new he}static exists(e){return new he(void 0,e)}static updateTime(e){return new he(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Gi{}function Bd(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new pr(r.key,he.none()):new gr(r.key,r.data,he.none());{const t=r.data,n=Re.empty();let s=new re(ce.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new mt(r.key,n,new Be(s.toArray()),he.none())}}function ty(r,e,t){r instanceof gr?function(s,i,o){const u=s.value.clone(),c=pl(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):r instanceof mt?function(s,i,o){if(!hi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=pl(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Ud(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ss(r,e,t,n){return r instanceof gr?function(i,o,u,c){if(!hi(i.precondition,o))return u;const h=i.value.clone(),f=_l(i.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof mt?function(i,o,u,c){if(!hi(i.precondition,o))return u;const h=_l(i.fieldTransforms,c,o),f=o.data;return f.setAll(Ud(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(i,o,u){return hi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(r,e,t)}function ny(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Md(n.transform,s||null);i!=null&&(t===null&&(t=Re.empty()),t.set(n.field,i))}return t||null}function gl(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Gn(n,s,(i,o)=>Z_(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class gr extends Gi{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class mt extends Gi{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ud(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function pl(r,e,t){const n=new Map;L(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,u=e.data.field(i.field);n.set(i.field,X_(o,u,t[s]))}return n}function _l(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,Y_(i,o,e))}return n}class pr extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class qa extends Gi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ja{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ty(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ss(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ss(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=xd();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=t.has(s.key)?null:u;const c=Bd(o,u);c!==null&&n.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(U.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&Gn(this.mutations,e.mutations,(t,n)=>gl(t,n))&&Gn(this.baseMutations,e.baseMutations,(t,n)=>gl(t,n))}}class za{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){L(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=function(){return W_}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new za(e,t,n,s)}}/**
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
 */class $a{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class qd{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
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
 */class ry{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var _e,H;function jd(r){switch(r){case R.OK:return F(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return F(15467,{code:r})}}function zd(r){if(r===void 0)return ge("GRPC error has no .code"),R.UNKNOWN;switch(r){case _e.OK:return R.OK;case _e.CANCELLED:return R.CANCELLED;case _e.UNKNOWN:return R.UNKNOWN;case _e.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case _e.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case _e.INTERNAL:return R.INTERNAL;case _e.UNAVAILABLE:return R.UNAVAILABLE;case _e.UNAUTHENTICATED:return R.UNAUTHENTICATED;case _e.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case _e.NOT_FOUND:return R.NOT_FOUND;case _e.ALREADY_EXISTS:return R.ALREADY_EXISTS;case _e.PERMISSION_DENIED:return R.PERMISSION_DENIED;case _e.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case _e.ABORTED:return R.ABORTED;case _e.OUT_OF_RANGE:return R.OUT_OF_RANGE;case _e.UNIMPLEMENTED:return R.UNIMPLEMENTED;case _e.DATA_LOSS:return R.DATA_LOSS;default:return F(39323,{code:r})}}(H=_e||(_e={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let is=null;function sy(r){if(is)throw new Error("a TestingHooksSpi instance is already set");is=r}/**
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
 */function $d(){return new TextEncoder}/**
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
 */const iy=new Dt([4294967295,4294967295],0);function yl(r){const e=$d().encode(r),t=new Dh;return t.update(e),new Uint8Array(t.digest())}function Il(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Dt([t,n],0),new Dt([s,i],0)]}class Ga{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Hr(`Invalid padding: ${t}`);if(n<0)throw new Hr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Hr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Hr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Dt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Dt.fromNumber(n)));return s.compare(iy)===1&&(s=new Dt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=yl(e),[n,s]=Il(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Ga(i,s,t);return n.forEach(u=>o.insert(u)),o}insert(e){if(this.ge===0)return;const t=yl(e),[n,s]=Il(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Hr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ps{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Vs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ps(U.min(),s,new oe(z),Ue(),$())}}class Vs{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Vs(n,t,$(),$(),$())}}/**
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
 */class di{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class Gd{constructor(e,t){this.targetId=e,this.Ce=t}}class Kd{constructor(e,t,n=fe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class El{constructor(){this.ve=0,this.Fe=Tl(),this.Me=fe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=$(),t=$(),n=$();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:F(38017,{changeType:i})}}),new Vs(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Tl()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class oy{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ue(),this.Je=Zs(),this.He=Zs(),this.Ze=new oe(z)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((n,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Ai(i))if(n===0){const o=new k(i.path);this.et(t,o,ue.newNoDocument(o,U.min()))}else L(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const u=this.ut(e),c=u?this.ct(u,e,o):1;if(c!==0){this.it(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}is==null||is.o(function(f,m,p,v,C){var B,j,q;const N={localCacheCount:f,existenceFilterCount:m.count,databaseId:p.database,projectId:p.projectId},x=m.unchangedNames;return x&&(N.bloomFilter={applied:C===0,hashCount:(x==null?void 0:x.hashCount)??0,bitmapLength:((j=(B=x==null?void 0:x.bits)==null?void 0:B.bitmap)==null?void 0:j.length)??0,padding:((q=x==null?void 0:x.bits)==null?void 0:q.padding)??0,mightContain:Z=>(v==null?void 0:v.mightContain(Z))??!1}),N}(o,e.Ce,this.Ge.ht(),u,c))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,u;try{o=lt(n).toUint8Array()}catch(c){if(c instanceof ud)return ze("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Ga(o,s,i)}catch(c){return ze(c instanceof Hr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.Ge.ht(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const u=this.ot(o);if(u){if(i.current&&Ai(u.target)){const c=new k(u.target.path);this.Et(c).has(o)||this.It(o,c)||this.et(o,c,ue.newNoDocument(c,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let n=$();this.He.forEach((i,o)=>{let u=!0;o.forEachWhile(c=>{const h=this.ot(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new Ps(e,t,this.Ze,this.je,n);return this.je=Ue(),this.Je=Zs(),this.He=Zs(),this.Ze=new oe(z),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new El,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new re(z),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new re(z),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new El),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Zs(){return new oe(k.comparator)}function Tl(){return new oe(k.comparator)}const ay={asc:"ASCENDING",desc:"DESCENDING"},uy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cy={and:"AND",or:"OR"};class ly{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ca(r,e){return r.useProto3Json||ws(e)?e:{value:e}}function sr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Qd(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function hy(r,e){return sr(r,e.toTimestamp())}function pe(r){return L(!!r,49232),U.fromTimestamp(function(t){const n=ct(t);return new ee(n.seconds,n.nanos)}(r))}function Ka(r,e){return la(r,e).canonicalString()}function la(r,e){const t=function(s){return new K(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Wd(r){const e=K.fromString(r);return L(rf(e),10190,{key:e.toString()}),e}function Is(r,e){return Ka(r.databaseId,e.path)}function st(r,e){const t=Wd(e);if(t.get(1)!==r.databaseId.projectId)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new k(Yd(t))}function Hd(r,e){return Ka(r.databaseId,e)}function Jd(r){const e=Wd(r);return e.length===4?K.emptyPath():Yd(e)}function ha(r){return new K(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Yd(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function wl(r,e,t){return{name:Is(r,e),fields:t.value.mapValue.fields}}function Ki(r,e,t){const n=st(r,e.name),s=pe(e.updateTime),i=e.createTime?pe(e.createTime):U.min(),o=new Re({mapValue:{fields:e.fields}}),u=ue.newFoundDocument(n,s,i,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function dy(r,e){return"found"in e?function(n,s){L(!!s.found,43571),s.found.name,s.found.updateTime;const i=st(n,s.found.name),o=pe(s.found.updateTime),u=s.found.createTime?pe(s.found.createTime):U.min(),c=new Re({mapValue:{fields:s.found.fields}});return ue.newFoundDocument(i,o,u,c)}(r,e):"missing"in e?function(n,s){L(!!s.missing,3894),L(!!s.readTime,22933);const i=st(n,s.missing),o=pe(s.readTime);return ue.newNoDocument(i,o)}(r,e):F(7234,{result:e})}function fy(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),fe.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),fe.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(h){const f=h.code===void 0?R.UNKNOWN:zd(h.code);return new V(f,h.message||"")}(o);t=new Kd(n,s,i,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=st(r,n.document.name),i=pe(n.document.updateTime),o=n.document.createTime?pe(n.document.createTime):U.min(),u=new Re({mapValue:{fields:n.document.fields}}),c=ue.newFoundDocument(s,i,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new di(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=st(r,n.document),i=n.readTime?pe(n.readTime):U.min(),o=ue.newNoDocument(s,i),u=n.removedTargetIds||[];t=new di([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=st(r,n.document),i=n.removedTargetIds||[];t=new di([],i,s,null)}else{if(!("filter"in e))return F(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new ry(s,i),u=n.targetId;t=new Gd(u,o)}}return t}function Es(r,e){let t;if(e instanceof gr)t={update:wl(r,e.key,e.value)};else if(e instanceof pr)t={delete:Is(r,e.key)};else if(e instanceof mt)t={update:wl(r,e.key,e.data),updateMask:Iy(e.fieldMask)};else{if(!(e instanceof qa))return F(16599,{dt:e.type});t={verify:Is(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const u=o.transform;if(u instanceof nr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof pn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof _n)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof rr)return{fieldPath:o.field.canonicalString(),increment:u.Ae};throw F(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:hy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F(27497)}(r,e.precondition)),t}function da(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?he.updateTime(pe(i.updateTime)):i.exists!==void 0?he.exists(i.exists):he.none()}(e.currentDocument):he.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,u){let c=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),c=new nr;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new pn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new _n(f)}else"increment"in u?c=new rr(o,u.increment):F(16584,{proto:u});const h=ce.fromServerFormat(u.fieldPath);return new Ss(h,c)}(r,s)):[];if(e.update){e.update.name;const s=st(r,e.update.name),i=new Re({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const h=c.fieldPaths||[];return new Be(h.map(f=>ce.fromServerFormat(f)))}(e.updateMask);return new mt(s,i,o,t,n)}return new gr(s,i,t,n)}if(e.delete){const s=st(r,e.delete);return new pr(s,t)}if(e.verify){const s=st(r,e.verify);return new qa(s,t)}return F(1463,{proto:e})}function my(r,e){return r&&r.length>0?(L(e!==void 0,14353),r.map(t=>function(s,i){let o=s.updateTime?pe(s.updateTime):pe(i);return o.isEqual(U.min())&&(o=pe(i)),new ey(o,s.transformResults||[])}(t,e))):[]}function Xd(r,e){return{documents:[Hd(r,e.path)]}}function Qi(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Hd(r,s);const i=function(h){if(h.length!==0)return nf(te.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(f=>function(p){return{field:bt(p.field),direction:py(p.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=ca(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:t,parent:s}}function Zd(r,e,t,n){const{ft:s,parent:i}=Qi(r,e),o={},u=[];let c=0;return t.forEach(h=>{const f=n?h.alias:"aggregate_"+c++;o[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:bt(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:bt(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function ef(r){let e=Jd(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(m){const p=tf(m);return p instanceof te&&Fa(p)?p.getFilters():[p]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(p=>function(C){return new ys(Un(C.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(p))}(t.orderBy));let u=null;t.limit&&(u=function(m){let p;return p=typeof m=="object"?m.value:m,ws(p)?null:p}(t.limit));let c=null;t.startAt&&(c=function(m){const p=!!m.before,v=m.values||[];return new Lt(v,p)}(t.startAt));let h=null;return t.endAt&&(h=function(m){const p=!m.before,v=m.values||[];return new Lt(v,p)}(t.endAt)),vd(e,s,o,i,u,"F",c,h)}function gy(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function tf(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Un(t.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Un(t.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Un(t.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Un(t.unaryFilter.field);return W.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(r):r.fieldFilter!==void 0?function(t){return W.create(Un(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return te.create(t.compositeFilter.filters.map(n=>tf(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(r):F(30097,{filter:r})}function py(r){return ay[r]}function _y(r){return uy[r]}function yy(r){return cy[r]}function bt(r){return{fieldPath:r.canonicalString()}}function Un(r){return ce.fromServerFormat(r.fieldPath)}function nf(r){return r instanceof W?function(t){if(t.op==="=="){if(ol(t.value))return{unaryFilter:{field:bt(t.field),op:"IS_NAN"}};if(il(t.value))return{unaryFilter:{field:bt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ol(t.value))return{unaryFilter:{field:bt(t.field),op:"IS_NOT_NAN"}};if(il(t.value))return{unaryFilter:{field:bt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bt(t.field),op:_y(t.op),value:t.value}}}(r):r instanceof te?function(t){const n=t.getFilters().map(s=>nf(s));return n.length===1?n[0]:{compositeFilter:{op:yy(t.op),filters:n}}}(r):F(54877,{filter:r})}function Iy(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function rf(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function sf(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class ot{constructor(e,t,n,s,i=U.min(),o=U.min(),u=fe.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new ot(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class of{constructor(e){this.yt=e}}function Ey(r,e){let t;if(e.document)t=Ki(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=k.fromSegments(e.noDocument.path),s=In(e.noDocument.readTime);t=ue.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F(56709);{const n=k.fromSegments(e.unknownDocument.path),s=In(e.unknownDocument.version);t=ue.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new ee(s[0],s[1]);return U.fromTimestamp(i)}(e.readTime)),t}function Al(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ri(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:Is(i,o.key),fields:o.data.value.mapValue.fields,updateTime:sr(i,o.version.toTimestamp()),createTime:sr(i,o.createTime.toTimestamp())}}(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:yn(e.version)};else{if(!e.isUnknownDocument())return F(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:yn(e.version)}}return n}function Ri(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function yn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function In(r){const e=new ee(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function an(r,e){const t=(e.baseMutations||[]).map(i=>da(r.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const u=e.mutations[i+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>da(r.yt,i)),s=ee.fromMillis(e.localWriteTimeMs);return new ja(e.batchId,s,t,n)}function Jr(r){const e=In(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?In(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const o=i.documents.length;return L(o===1,1966,{count:o}),Ne(mr(Jd(i.documents[0])))}(r.query):function(i){return Ne(ef(i))}(r.query),new ot(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,fe.fromBase64String(r.resumeToken))}function af(r,e){const t=yn(e.snapshotVersion),n=yn(e.lastLimboFreeSnapshotVersion);let s;s=Ai(e.target)?Xd(r.yt,e.target):Qi(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:gn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Wi(r){const e=ef({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?bi(e,e.limit,"L"):e}function Oo(r,e){return new $a(e.largestBatchId,da(r.yt,e.overlayMutation))}function vl(r,e){const t=e.path.lastSegment();return[r,xe(e.path.popLast()),t]}function bl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:yn(n.readTime),documentKey:xe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class Ty{getBundleMetadata(e,t){return Rl(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:In(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return Rl(e).put(function(s){return{bundleId:s.id,createTime:yn(pe(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Sl(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:Wi(i.bundledQuery),readTime:In(i.readTime)}}(n)})}saveNamedQuery(e,t){return Sl(e).put(function(s){return{name:s.name,readTime:yn(pe(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Rl(r){return we(r,Li)}function Sl(r){return we(r,Bi)}/**
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
 */class Hi{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Hi(e,n)}getOverlay(e,t){return qr(e).get(vl(this.userId,t)).next(n=>n?Oo(this.serializer,n):null)}getOverlays(e,t){const n=nt();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const u=new $a(t,o);s.push(this.St(e,u))}),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(xe(o.getCollectionPath())));const i=[];return s.forEach(o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(qr(e).X(ta,u))}),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=nt(),i=xe(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return qr(e).J(ta,o).next(u=>{for(const c of u){const h=Oo(this.serializer,c);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=nt();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qr(e).ee({index:td,range:u},(c,h,f)=>{const m=Oo(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>i)}St(e,t){return qr(e).put(function(s,i,o){const[u,c,h]=vl(i,o.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Es(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function qr(r){return we(r,Ui)}/**
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
 */class wy{bt(e){return we(e,Na)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?fe.fromUint8Array(n):fe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class un{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(le(e.integerValue));else if("doubleValue"in e){const n=le(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),ls(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=ct(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(lt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?md(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):zi(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):F(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,u;const n=e.fields||{};this.Ft(t,53);const s=Zn,i=((u=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:u.length)||0;this.Ft(t,15),t.Mt(le(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),k.fromName(e).path.forEach(n=>{this.Ft(t,60),this.$t(n,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}un.Wt=new un;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=255;function Ay(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function Pl(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=Ay(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class vy{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=Pl(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=Pl(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(kn),this.sn(255)}_n(){this.an(kn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===kn?(this.sn(kn),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===kn?(this.an(kn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class by{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class Ry{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class jr{constructor(){this.cn=new vy,this.ascending=new by(this.cn),this.descending=new Ry(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class cn{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new cn(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:fi(this.Tn),directionalValue:fi(this.En),orderedDocumentKey:fi(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function wt(r,e){let t=r.hn-e.hn;return t!==0?t:(t=Vl(r.Tn,e.Tn),t!==0?t:(t=Vl(r.En,e.En),t!==0?t:k.comparator(r.Pn,e.Pn)))}function Vl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function fi(r){return wh()?function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n}(r):r}function Cl(r){return typeof r!="string"?r:function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(r)}class Dl{constructor(e){this.Vn=new re((t,n)=>ce.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(L(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Xo(e);if(t!==void 0&&!this.pn(t))return!1;const n=rn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const u=this.Vn.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.yn(u,c)||!this.wn(this.dn[o++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],u))return!1}return!0}Sn(){if(this.fn)return null;let e=new re(ce.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new hn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new hn(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new hn(n.field,n.dir==="asc"?0:1)));return new Qn(Qn.UNKNOWN_ID,this.collectionId,t,Wn.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function uf(r){var t,n;if(L(r instanceof W||r instanceof te,20012),r instanceof W){if(r instanceof Ad){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map(i=>W.create(r.field,"==",i)))||[];return te.create(s,"or")}return r}const e=r.filters.map(s=>uf(s));return te.create(e,r.op)}function Sy(r){if(r.getFilters().length===0)return[];const e=ga(uf(r));return L(cf(e),7391),fa(e)||ma(e)?[e]:e.getFilters()}function fa(r){return r instanceof W}function ma(r){return r instanceof te&&Fa(r)}function cf(r){return fa(r)||ma(r)||function(t){if(t instanceof te&&ia(t)){for(const n of t.getFilters())if(!fa(n)&&!ma(n))return!1;return!0}return!1}(r)}function ga(r){if(L(r instanceof W||r instanceof te,34018),r instanceof W)return r;if(r.filters.length===1)return ga(r.filters[0]);const e=r.filters.map(n=>ga(n));let t=te.create(e,r.op);return t=Si(t),cf(t)?t:(L(t instanceof te,64498),L(tr(t),40251),L(t.filters.length>1,57927),t.filters.reduce((n,s)=>Qa(n,s)))}function Qa(r,e){let t;return L(r instanceof W||r instanceof te,38388),L(e instanceof W||e instanceof te,25473),t=r instanceof W?e instanceof W?function(s,i){return te.create([s,i],"and")}(r,e):xl(r,e):e instanceof W?xl(e,r):function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),tr(s)&&tr(i))return Ed(s,i.getFilters());const o=ia(s)?s:i,u=ia(s)?i:s,c=o.filters.map(h=>Qa(h,u));return te.create(c,"or")}(r,e),Si(t)}function xl(r,e){if(tr(e))return Ed(e,r.getFilters());{const t=e.filters.map(n=>Qa(r,n));return te.create(t,"or")}}function Si(r){if(L(r instanceof W||r instanceof te,11850),r instanceof W)return r;const e=r.getFilters();if(e.length===1)return Si(e[0]);if(yd(r))return r;const t=e.map(s=>Si(s)),n=[];return t.forEach(s=>{s instanceof W?n.push(s):s instanceof te&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:te.create(n,r.op)}/**
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
 */class Py{constructor(){this.bn=new Wa}addToCollectionParentIndex(e,t){return this.bn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Qe.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Qe.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Wa{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new re(K.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new re(K.comparator)).toArray()}}/**
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
 */const Nl="IndexedDbIndexManager",ei=new Uint8Array(0);class Vy{constructor(e,t){this.databaseId=t,this.Dn=new Wa,this.Cn=new ft(n=>gn(n),(n,s)=>vs(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:n,parent:xe(s)};return kl(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Uh(t),""],!1,!0);return kl(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(tt(o.parent))}return n})}addFieldIndex(e,t){const n=zr(e),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=On(e);return i.next(u=>{o.put(bl(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=zr(e),s=On(e),i=Mn(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=zr(e),n=Mn(e),s=On(e);return t.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(e,t){return A.forEach(this.vn(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new Dl(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=Mn(e);let s=!0;const i=new Map;return A.forEach(this.vn(t),o=>this.Fn(e,o).next(u=>{s&&(s=!!u),i.set(o,u)})).next(()=>{if(s){let o=$();const u=[];return A.forEach(i,(c,h)=>{D(Nl,`Using index ${function(q){return`id=${q.indexId}|cg=${q.collectionGroup}|f=${q.fields.map(Z=>`${Z.fieldPath}:${Z.kind}`).join(",")}`}(c)} to execute ${gn(t)}`);const f=function(q,Z){const Y=Xo(Z);if(Y===void 0)return null;for(const X of vi(q,Y.fieldPath))switch(X.op){case"array-contains-any":return X.value.arrayValue.values||[];case"array-contains":return[X.value]}return null}(h,c),m=function(q,Z){const Y=new Map;for(const X of rn(Z))for(const E of vi(q,X.fieldPath))switch(E.op){case"==":case"in":Y.set(X.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return Y.set(X.fieldPath.canonicalString(),E.value),Array.from(Y.values())}return null}(h,c),p=function(q,Z){const Y=[];let X=!0;for(const E of rn(Z)){const _=E.kind===0?hl(q,E.fieldPath,q.startAt):dl(q,E.fieldPath,q.startAt);Y.push(_.value),X&&(X=_.inclusive)}return new Lt(Y,X)}(h,c),v=function(q,Z){const Y=[];let X=!0;for(const E of rn(Z)){const _=E.kind===0?dl(q,E.fieldPath,q.endAt):hl(q,E.fieldPath,q.endAt);Y.push(_.value),X&&(X=_.inclusive)}return new Lt(Y,X)}(h,c),C=this.Mn(c,h,p),N=this.Mn(c,h,v),x=this.xn(c,h,m),B=this.On(c.indexId,f,C,p.inclusive,N,v.inclusive,x);return A.forEach(B,j=>n.Z(j,t.limit).next(q=>{q.forEach(Z=>{const Y=k.fromSegments(Z.documentKey);o.has(Y)||(o=o.add(Y),u.push(Y))})}))}).next(()=>u)}return A.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=Sy(te.create(e.filters,"and")).map(n=>aa(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,i.length),h=c/(t!=null?t.length:1),f=[];for(let m=0;m<c;++m){const p=t?this.Nn(t[m/h]):ei,v=this.Bn(e,p,n[m%h],s),C=this.Ln(e,p,i[m%h],o),N=u.map(x=>this.Bn(e,p,x,!0));f.push(...this.createRange(v,C,N))}return f}Bn(e,t,n,s){const i=new cn(e,k.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new cn(e,k.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new Dl(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const u of i)n.gn(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o})}getIndexType(e,t){let n=2;const s=this.vn(t);return A.forEach(s,i=>this.Fn(e,i).next(o=>{o?n!==0&&o.fields.length<function(c){let h=new re(ce.comparator),f=!1;for(const m of c.filters)for(const p of m.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?f=!0:h=h.add(p.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}kn(e,t){const n=new jr;for(const s of rn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);un.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new jr;return un.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new jr;return un.Wt.Dt(mn(this.databaseId,t),n.ln(function(i){const o=rn(i);return o.length===0?0:o[o.length-1].kind}(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new jr);let i=0;for(const o of rn(e)){const u=n[i++];for(const c of s)if(this.Kn(t,o.fieldPath)&&_s(u))s=this.Un(s,o,u);else{const h=c.ln(o.kind);un.Wt.Dt(u,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const u of s){const c=new jr;c.seed(u.un()),un.Wt.Dt(o,c.ln(t.kind)),i.push(c)}return i}Kn(e,t){return!!e.filters.find(n=>n instanceof W&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=zr(e),s=On(e);return(t?n.J(ea,IDBKeyRange.bound(t,t)):n.J()).next(i=>{const o=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(c=>{o.push(function(f,m){const p=m?new Wn(m.sequenceNumber,new Qe(In(m.readTime),new k(tt(m.documentKey)),m.largestBatchId)):Wn.empty(),v=f.fields.map(([C,N])=>new hn(ce.fromServerFormat(C),N));return new Qn(f.indexId,f.collectionGroup,v,p)}(u,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=zr(e),i=On(e);return this.Wn(e).next(o=>s.J(ea,IDBKeyRange.bound(t,t)).next(u=>A.forEach(u,c=>i.put(bl(c.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,c=>this.Qn(e,s,c).next(h=>{const f=this.Gn(i,c);return h.isEqual(f)?A.resolve():this.zn(e,i,c,h,f)}))))})}jn(e,t,n,s){return Mn(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return Mn(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=Mn(e);let i=new re(wt);return s.ee({index:ed,range:IDBKeyRange.only([n.indexId,this.uid,fi(this.qn(n,t))])},(o,u)=>{i=i.add(new cn(n.indexId,t,Cl(u.arrayValue),Cl(u.directionalValue)))}).next(()=>i)}Gn(e,t){let n=new re(wt);const s=this.kn(t,e);if(s==null)return n;const i=Xo(t);if(i!=null){const o=e.data.field(i.fieldPath);if(_s(o))for(const u of o.arrayValue.values||[])n=n.add(new cn(t.indexId,e.key,this.Nn(u),s))}else n=n.add(new cn(t.indexId,e.key,ei,s));return n}zn(e,t,n,s,i){D(Nl,"Updating index entries for document '%s'",t.key);const o=[];return function(c,h,f,m,p){const v=c.getIterator(),C=h.getIterator();let N=Nn(v),x=Nn(C);for(;N||x;){let B=!1,j=!1;if(N&&x){const q=f(N,x);q<0?j=!0:q>0&&(B=!0)}else N!=null?j=!0:B=!0;B?(m(x),x=Nn(C)):j?(p(N),N=Nn(v)):(N=Nn(v),x=Nn(C))}}(s,i,wt,u=>{o.push(this.jn(e,t,n,u))},u=>{o.push(this.Jn(e,t,n,u))}),A.waitFor(o)}Wn(e){let t=1;return On(e).ee({index:Zh,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,u)=>wt(o,u)).filter((o,u,c)=>!u||wt(o,c[u-1])!==0);const s=[];s.push(e);for(const o of n){const u=wt(o,e),c=wt(o,t);if(u===0)s[0]=e.In();else if(u>0&&c<0)s.push(o),s.push(o.In());else if(c>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const u=s[o].An(this.uid,ei,k.empty()),c=s[o+1].An(this.uid,ei,k.empty());i.push(IDBKeyRange.bound(u,c))}return i}Hn(e,t){return wt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Ml)}getMinOffset(e,t){return A.mapArray(this.vn(t),n=>this.Fn(e,n).next(s=>s||F(44426))).next(Ml)}}function kl(r){return we(r,fs)}function Mn(r){return we(r,ts)}function zr(r){return we(r,xa)}function On(r){return we(r,es)}function Ml(r){L(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Va(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Qe(e.readTime,e.documentKey,t)}/**
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
 */const Ol={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},lf=41943040;class De{static withCacheSize(e){return new De(e,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function hf(r,e,t){const n=r.store(We),s=r.store(Hn),i=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.ee({range:o},(f,m,p)=>(u++,p.delete()));i.push(c.next(()=>{L(u===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const m=Jh(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function Pi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw F(14731);e=r.noDocument}return JSON.stringify(e).length}/**
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
 */De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(lf,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);class Ji{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){L(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Ji(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return At(e).ee({index:ln,range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=qn(e),o=At(e);return o.add({}).next(u=>{L(typeof u=="number",49019);const c=new ja(u,t,n,s),h=function(v,C,N){const x=N.baseMutations.map(j=>Es(v.yt,j)),B=N.mutations.map(j=>Es(v.yt,j));return{userId:C,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:x,mutations:B}}(this.serializer,this.userId,c),f=[];let m=new re((p,v)=>z(p.canonicalString(),v.canonicalString()));for(const p of s){const v=Jh(this.userId,p.key.path,u);m=m.add(p.key.path.popLast()),f.push(o.put(h)),f.push(i.put(v,s_))}return m.forEach(p=>{f.push(this.indexManager.addToCollectionParentIndex(e,p))}),e.addOnCommittedListener(()=>{this.Zn[u]=c.keys()}),A.waitFor(f).next(()=>c)})}lookupMutationBatch(e,t){return At(e).get(t).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),an(this.serializer,n)):null)}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return At(e).ee({index:ln,range:s},(o,u,c)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{Yn:n}),i=an(this.serializer,u)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=xt;return At(e).ee({index:ln,range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,xt],[this.userId,Number.POSITIVE_INFINITY]);return At(e).J(ln,t).next(n=>n.map(s=>an(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=oi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return qn(e).ee({range:s},(o,u,c)=>{const[h,f,m]=o,p=tt(f);if(h===this.userId&&t.path.isEqual(p))return At(e).get(m).next(v=>{if(!v)throw F(61480,{er:o,batchId:m});L(v.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:v.userId,batchId:m}),i.push(an(this.serializer,v))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(z);const s=[];return t.forEach(i=>{const o=oi(this.userId,i.path),u=IDBKeyRange.lowerBound(o),c=qn(e).ee({range:u},(h,f,m)=>{const[p,v,C]=h,N=tt(v);p===this.userId&&i.path.isEqual(N)?n=n.add(C):m.done()});s.push(c)}),A.waitFor(s).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=oi(this.userId,n),o=IDBKeyRange.lowerBound(i);let u=new re(z);return qn(e).ee({range:o},(c,h,f)=>{const[m,p,v]=c,C=tt(p);m===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(v)):f.done()}).next(()=>this.tr(e,u))}tr(e,t){const n=[],s=[];return t.forEach(i=>{s.push(At(e).get(i).next(o=>{if(o===null)throw F(35274,{batchId:i});L(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(an(this.serializer,o))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return hf(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return qn(e).ee({range:n},(i,o,u)=>{if(i[0]===this.userId){const c=tt(i[1]);s.push(c)}else u.done()}).next(()=>{L(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return df(e,this.userId,t)}ir(e){return ff(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:xt,lastStreamToken:""})}}function df(r,e,t){const n=oi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return qn(r).ee({range:i,Y:!0},(u,c,h)=>{const[f,m,p]=u;f===e&&m===s&&(o=!0),h.done()}).next(()=>o)}function At(r){return we(r,We)}function qn(r){return we(r,Hn)}function ff(r){return we(r,hs)}/**
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
 */class En{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new En(0)}static ar(){return new En(-1)}}/**
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
 */class Cy{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new En(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(t=>U.fromTimestamp(new ee(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Fn(e).delete(t.targetId)).next(()=>this.ur(e)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return Fn(e).ee((o,u)=>{const c=Jr(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Fn(e).ee((n,s)=>{const i=Jr(s);t(i)})}ur(e){return Fl(e).get(wi).next(t=>(L(t!==null,2888),t))}cr(e,t){return Fl(e).put(wi,t)}lr(e,t){return Fn(e).put(af(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(t=>t.targetCount)}getTargetData(e,t){const n=gn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Fn(e).ee({range:s,index:Xh},(o,u,c)=>{const h=Jr(u);vs(t,h.target)&&(i=h,c.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=Rt(e);return t.forEach(o=>{const u=xe(o.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=Rt(e);return A.forEach(t,i=>{const o=xe(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=Rt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Rt(e);let i=$();return s.ee({range:n,Y:!0},(o,u,c)=>{const h=tt(o[1]),f=new k(h);i=i.add(f)}).next(()=>i)}containsKey(e,t){const n=xe(t.path),s=IDBKeyRange.bound([n],[Uh(n)],!1,!0);let i=0;return Rt(e).ee({index:Da,Y:!0,range:s},([o,u],c,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}At(e,t){return Fn(e).get(t).next(n=>n?Jr(n):null)}}function Fn(r){return we(r,Jn)}function Fl(r){return we(r,dn)}function Rt(r){return we(r,Yn)}/**
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
 */const Ll="LruGarbageCollector",mf=1048576;function Bl([r,e],[t,n]){const s=z(r,t);return s===0?z(e,n):s}class Dy{constructor(e){this.Pr=e,this.buffer=new re(Bl),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Bl(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gf{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){D(Ll,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){zt(t)?D(Ll,"Ignoring IndexedDB error during garbage collection: ",t):await jt(t)}await this.Ar(3e5)})}}class xy{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Le.ce);const n=new Dy(t);return this.Vr.forEachTarget(e,s=>n.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>n.Ir(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Ol)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ol):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s))).next(m=>(n=m,u=Date.now(),this.removeTargets(e,n,t))).next(m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(h=Date.now(),Ln()<=J.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function pf(r,e){return new xy(r,e)}/**
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
 */class Ny{constructor(e,t){this.db=e,this.garbageCollector=pf(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}pr(e){let t=0;return this.mr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(n,s)=>t(s))}addReference(e,t,n){return ti(e,n)}removeReference(e,t,n){return ti(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return ti(e,t)}wr(e,t){return function(s,i){let o=!1;return ff(s).te(u=>df(s,u,i).next(c=>(c&&(o=!0),A.resolve(!c)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,(o,u)=>{if(u<=t){const c=this.wr(e,o).next(h=>{if(!h)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,U.min()),Rt(e).delete(function(m){return[0,xe(m.path)]}(o))))});s.push(c)}}).next(()=>A.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return ti(e,t)}yr(e,t){const n=Rt(e);let s,i=Le.ce;return n.ee({index:Da},([o,u],{path:c,sequenceNumber:h})=>{o===0?(i!==Le.ce&&t(new k(tt(s)),i),i=h,s=c):i=Le.ce}).next(()=>{i!==Le.ce&&t(new k(tt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ti(r,e){return Rt(r).put(function(n,s){return{targetId:0,path:xe(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}/**
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
 */class _f{constructor(){this.changes=new ft(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class ky{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return tn(e).put(n)}removeEntry(e,t,n){return tn(e).delete(function(i,o){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Ri(o),u[u.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Sr(e,n)))}getEntry(e,t){let n=ue.newInvalidDocument(t);return tn(e).ee({index:ai,range:IDBKeyRange.only($r(t))},(s,i)=>{n=this.br(t,i)}).next(()=>n)}Dr(e,t){let n={size:0,document:ue.newInvalidDocument(t)};return tn(e).ee({index:ai,range:IDBKeyRange.only($r(t))},(s,i)=>{n={document:this.br(t,i),size:Pi(i)}}).next(()=>n)}getEntries(e,t){let n=Ue();return this.Cr(e,t,(s,i)=>{const o=this.br(s,i);n=n.insert(s,o)}).next(()=>n)}vr(e,t){let n=Ue(),s=new oe(k.comparator);return this.Cr(e,t,(i,o)=>{const u=this.br(i,o);n=n.insert(i,u),s=s.insert(i,Pi(o))}).next(()=>({documents:n,Fr:s}))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let s=new re(jl);t.forEach(c=>s=s.add(c));const i=IDBKeyRange.bound($r(s.first()),$r(s.last())),o=s.getIterator();let u=o.getNext();return tn(e).ee({index:ai,range:i},(c,h,f)=>{const m=k.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&jl(u,m)<0;)n(u,null),u=o.getNext();u&&u.isEqual(m)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.j($r(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,u=[o.popLast().toArray(),o.lastSegment(),Ri(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return tn(e).J(IDBKeyRange.bound(u,c,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Ue();for(const m of h){const p=this.br(k.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);p.isFoundDocument()&&(Rs(t,p)||s.has(p.key))&&(f=f.insert(p.key,p))}return f})}getAllFromCollectionGroup(e,t,n,s){let i=Ue();const o=ql(t,n),u=ql(t,Qe.max());return tn(e).ee({index:Yh,range:IDBKeyRange.bound(o,u,!0)},(c,h,f)=>{const m=this.br(k.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new My(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Ul(e).get(Zo).next(t=>(L(!!t,20021),t))}Sr(e,t){return Ul(e).put(Zo,t)}br(e,t){if(t){const n=Ey(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ue.newInvalidDocument(e)}}function yf(r){return new ky(r)}class My extends _f{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new ft(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new re((i,o)=>z(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const u=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,u.readTime)),o.isValidDocument()){const c=Al(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Pi(c);n+=h-u.size,t.push(this.Mr.addEntry(e,i,c))}else if(n-=u.size,this.trackRemovals){const c=Al(this.Mr.serializer,o.convertToNoDocument(U.min()));t.push(this.Mr.addEntry(e,i,c))}}),s.forEach(i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Mr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:n,Fr:s})=>(s.forEach((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function Ul(r){return we(r,ds)}function tn(r){return we(r,Ti)}function $r(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function ql(r,e){const t=e.documentKey.path.toArray();return[r,Ri(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function jl(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=z(t[i],n[i]),s)return s;return s=z(t.length,n.length),s||(s=z(t[t.length-2],n[n.length-2]),s||z(t[t.length-1],n[n.length-1]))}/**
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
 */class Oy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class If{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&ss(n.mutation,s,Be.empty(),ee.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,$()).next(()=>n))}getLocalViewOfDocuments(e,t,n=$()){const s=nt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=Wr();return i.forEach((u,c)=>{o=o.insert(u,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=nt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,$()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,u)=>{t.set(o,u)})})}computeViews(e,t,n,s){let i=Ue();const o=rs(),u=function(){return rs()}();return t.forEach((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof mt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ss(f.mutation,h,f.mutation.getFieldMask(),ee.now())):o.set(h.key,Be.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>u.set(h,new Oy(f,o.get(h)??null))),u))}recalculateAndSaveOverlays(e,t){const n=rs();let s=new oe((o,u)=>o-u),i=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const u of o)u.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||Be.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(s.get(u.batchId)||$()).add(c);s=s.insert(u.batchId,m)})}).next(()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=xd();f.forEach(p=>{if(!i.has(p)){const v=Bd(t.get(p),n.get(p));v!==null&&m.set(p,v),i=i.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return j_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):La(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(nt());let u=Kn,c=i;return o.next(h=>A.forEach(h,(f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(p=>{c=c.insert(f,p)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,$())).next(f=>({batchId:u,changes:Dd(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new k(t)).next(n=>{let s=Wr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=Wr();return this.indexManager.getCollectionParents(e,i).next(u=>A.forEach(u,c=>{const h=function(m,p){return new dt(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next(f=>{f.forEach((m,p)=>{o=o.insert(m,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>{i.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ue.newInvalidDocument(f)))});let u=Wr();return o.forEach((c,h)=>{const f=i.get(c);f!==void 0&&ss(f.mutation,h,Be.empty(),ee.now()),Rs(t,h)&&(u=u.insert(c,h))}),u})}}/**
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
 */class Fy{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:pe(s.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:Wi(s.bundledQuery),readTime:pe(s.readTime)}}(t)),A.resolve()}}/**
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
 */class Ly{constructor(){this.overlays=new oe(k.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=nt();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.St(e,t,i)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=nt(),i=t.length+1,o=new k(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new oe((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=nt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=nt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=s)););return A.resolve(u)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new $a(t,n));let i=this.Lr.get(t);i===void 0&&(i=$(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
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
 */class By{constructor(){this.sessionToken=fe.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
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
 */class Ha{constructor(){this.kr=new re(ve.qr),this.Kr=new re(ve.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new ve(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Wr(new ve(e,t))}Qr(e,t){e.forEach(n=>this.removeReference(n,t))}Gr(e){const t=new k(new K([])),n=new ve(t,e),s=new ve(t,e+1),i=[];return this.Kr.forEachInRange([n,s],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new k(new K([])),n=new ve(t,e),s=new ve(t,e+1);let i=$();return this.Kr.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new ve(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ve{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return k.comparator(e.key,t.key)||z(e.Jr,t.Jr)}static Ur(e,t){return z(e.Jr,t.Jr)||k.comparator(e.key,t.key)}}/**
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
 */class Uy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new re(ve.qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ja(i,t,n,s);this.mutationQueue.push(o);for(const u of s)this.Hr=this.Hr.add(new ve(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?xt:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ve(t,0),s=new ve(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],o=>{const u=this.Zr(o.Jr);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(z);return t.forEach(s=>{const i=new ve(s,0),o=new ve(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],u=>{n=n.add(u.Jr)})}),A.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const o=new ve(new k(i),0);let u=new re(z);return this.Hr.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.Jr)),!0)},o),A.resolve(this.Yr(u))}Yr(e){const t=[];return e.forEach(n=>{const s=this.Zr(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){L(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return A.forEach(t.mutations,s=>{const i=new ve(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Hr=n})}nr(e){}containsKey(e,t){const n=new ve(t,0),s=this.Hr.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class qy{constructor(e){this.ti=e,this.docs=function(){return new oe(k.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():ue.newInvalidDocument(t))}getEntries(e,t){let n=Ue();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ue.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Ue();const o=t.path,u=new k(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Va(Gh(f),n)<=0||(s.has(f.key)||Rs(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,n,s){F(9500)}ni(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new jy(this)}getSize(e){return A.resolve(this.size)}}class jy extends _f{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class zy{constructor(e){this.persistence=e,this.ri=new ft(t=>gn(t),vs),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new Ha,this.targetCount=0,this.oi=En._r()}forEachTarget(e,t){return this.ri.forEach((n,s)=>t(s)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new En(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
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
 */class Ja{constructor(e,t){this._i={},this.overlays={},this.ai=new Le(0),this.ui=!1,this.ui=!0,this.ci=new By,this.referenceDelegate=e(this),this.li=new zy(this),this.indexManager=new Py,this.remoteDocumentCache=function(s){return new qy(s)}(n=>this.referenceDelegate.hi(n)),this.serializer=new of(t),this.Pi=new Fy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ly,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new Uy(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){D("MemoryPersistence","Starting transaction:",e);const s=new $y(this.ai.next());return this.referenceDelegate.Ti(),n(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return A.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class $y extends Qh{constructor(e){super(),this.currentSequenceNumber=e}}class Yi{constructor(e){this.persistence=e,this.Ri=new Ha,this.Ai=null}static Vi(e){return new Yi(e)}get di(){if(this.Ai)return this.Ai;throw F(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,n=>{const s=k.fromPath(n);return this.mi(e,s).next(i=>{i||t.removeEntry(s,U.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Vi{constructor(e,t){this.persistence=e,this.fi=new ft(n=>xe(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=pf(this,t)}static Vi(e,t){return new Vi(e,t)}Ti(){}Ei(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}pr(e){let t=0;return this.mr(e,n=>{t++}).next(()=>t)}mr(e,t){return A.forEach(this.fi,(n,s)=>this.wr(e,n,s).next(i=>i?A.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,o=>this.wr(e,o,t).next(u=>{u||(n++,i.removeEntry(o,U.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ci(e.data.value)),t}wr(e,t,n){return A.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Gy{constructor(e){this.serializer=e}k(e,t,n,s){const i=new Fi("createOrUpgrade",t);n<1&&s>=1&&(function(c){c.createObjectStore(As)}(e),function(c){c.createObjectStore(hs,{keyPath:r_}),c.createObjectStore(We,{keyPath:Zc,autoIncrement:!0}).createIndex(ln,el,{unique:!0}),c.createObjectStore(Hn)}(e),zl(e),function(c){c.createObjectStore(sn)}(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&(function(c){c.deleteObjectStore(Yn),c.deleteObjectStore(Jn),c.deleteObjectStore(dn)}(e),zl(e)),o=o.next(()=>function(c){const h=c.store(dn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put(wi,f)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(c,h){return h.store(We).J().next(m=>{c.deleteObjectStore(We),c.createObjectStore(We,{keyPath:Zc,autoIncrement:!0}).createIndex(ln,el,{unique:!0});const p=h.store(We),v=m.map(C=>p.put(C));return A.waitFor(v)})}(e,i))),o=o.next(()=>{(function(c){c.createObjectStore(Xn,{keyPath:d_})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.gi(i))),n<6&&s>=6&&(o=o.next(()=>(function(c){c.createObjectStore(ds)}(e),this.pi(i)))),n<7&&s>=7&&(o=o.next(()=>this.yi(i))),n<8&&s>=8&&(o=o.next(()=>this.wi(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.Si(i))),n<11&&s>=11&&(o=o.next(()=>{(function(c){c.createObjectStore(Li,{keyPath:f_})})(e),function(c){c.createObjectStore(Bi,{keyPath:m_})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(c){const h=c.createObjectStore(Ui,{keyPath:T_});h.createIndex(ta,w_,{unique:!1}),h.createIndex(td,A_,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(c){const h=c.createObjectStore(Ti,{keyPath:i_});h.createIndex(ai,o_),h.createIndex(Yh,a_)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(sn))),n<14&&s>=14&&(o=o.next(()=>this.Di(e,i))),n<15&&s>=15&&(o=o.next(()=>function(c){c.createObjectStore(xa,{keyPath:g_,autoIncrement:!0}).createIndex(ea,p_,{unique:!1}),c.createObjectStore(es,{keyPath:__}).createIndex(Zh,y_,{unique:!1}),c.createObjectStore(ts,{keyPath:I_}).createIndex(ed,E_,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore(es).clear()}).next(()=>{t.objectStore(ts).clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(c){c.createObjectStore(Na,{keyPath:v_})})(e)})),n<18&&s>=18&&wh()&&(o=o.next(()=>{t.objectStore(es).clear()}).next(()=>{t.objectStore(ts).clear()})),o}pi(e){let t=0;return e.store(sn).ee((n,s)=>{t+=Pi(s)}).next(()=>{const n={byteSize:t};return e.store(ds).put(Zo,n)})}gi(e){const t=e.store(hs),n=e.store(We);return t.J().next(s=>A.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,xt],[i.userId,i.lastAcknowledgedBatchId]);return n.J(ln,o).next(u=>A.forEach(u,c=>{L(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const h=an(this.serializer,c);return hf(e,i.userId,h).next(()=>{})}))}))}yi(e){const t=e.store(Yn),n=e.store(sn);return e.store(dn).get(wi).next(s=>{const i=[];return n.ee((o,u)=>{const c=new K(o),h=function(m){return[0,xe(m)]}(c);i.push(t.get(h).next(f=>f?A.resolve():(m=>t.put({targetId:0,path:xe(m),sequenceNumber:s.highestListenSequenceNumber}))(c)))}).next(()=>A.waitFor(i))})}wi(e,t){e.createObjectStore(fs,{keyPath:h_});const n=t.store(fs),s=new Wa,i=o=>{if(s.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:xe(c)})}};return t.store(sn).ee({Y:!0},(o,u)=>{const c=new K(o);return i(c.popLast())}).next(()=>t.store(Hn).ee({Y:!0},([o,u,c],h)=>{const f=tt(u);return i(f.popLast())}))}Si(e){const t=e.store(Jn);return t.ee((n,s)=>{const i=Jr(s),o=af(this.serializer,i);return t.put(o)})}bi(e,t){const n=t.store(sn),s=[];return n.ee((i,o)=>{const u=t.store(Ti),c=function(m){return m.document?new k(K.fromString(m.document.name).popFirst(5)):m.noDocument?k.fromSegments(m.noDocument.path):m.unknownDocument?k.fromSegments(m.unknownDocument.path):F(36783)}(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(u.put(h))}).next(()=>A.waitFor(s))}Di(e,t){const n=t.store(We),s=yf(this.serializer),i=new Ja(Yi.Vi,this.serializer.yt);return n.J().next(o=>{const u=new Map;return o.forEach(c=>{let h=u.get(c.userId)??$();an(this.serializer,c).keys().forEach(f=>h=h.add(f)),u.set(c.userId,h)}),A.forEach(u,(c,h)=>{const f=new be(h),m=Hi.wt(this.serializer,f),p=i.getIndexManager(f),v=Ji.wt(f,this.serializer,p,i.referenceDelegate);return new If(s,v,m,p).recalculateAndSaveOverlaysForDocumentKeys(new na(t,Le.ce),c).next()})})}}function zl(r){r.createObjectStore(Yn,{keyPath:c_}).createIndex(Da,l_,{unique:!0}),r.createObjectStore(Jn,{keyPath:"targetId"}).createIndex(Xh,u_,{unique:!0}),r.createObjectStore(dn)}const vt="IndexedDbPersistence",Fo=18e5,Lo=5e3,Bo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Ef="main";class Ya{constructor(e,t,n,s,i,o,u,c,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=u,this.Fi=h,this.Mi=f,this.xi=m,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=p=>Promise.resolve(),!Ya.v())throw new V(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Ny(this,s),this.qi=t+Ef,this.serializer=new of(c),this.Ki=new rt(this.qi,this.xi,new Gy(this.serializer)),this.ci=new wy,this.li=new Cy(this.referenceDelegate,this.serializer),this.remoteDocumentCache=yf(this.serializer),this.Pi=new Ty,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&ge(vt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new V(R.FAILED_PRECONDITION,Bo);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new Le(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ni(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(zt(e))return D(vt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return D(vt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return Gr(e).get(xn).next(t=>A.resolve(this.Xi(t)))}Yi(e){return ni(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Fo)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=we(t,Xn);return n.J().next(s=>{const i=this.ns(s,Fo),o=s.filter(u=>i.indexOf(u)===-1);return A.forEach(o,u=>n.delete(u.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?A.resolve(!0):Gr(e).get(xn).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Lo)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new V(R.FAILED_PRECONDITION,Bo);return!1}}return!(!this.networkEnabled||!this.inForeground)||ni(e).J().next(n=>this.ns(n,Lo).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||o&&u)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&D(vt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[As,Xn],e=>{const t=new na(e,Le.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>ni(e).J().next(t=>this.ns(t,Fo).map(n=>n.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Ji.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Vy(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Hi.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){D(vt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(c){return c===18?S_:c===17?id:c===16?R_:c===15?ka:c===14?sd:c===13?rd:c===12?b_:c===11?nd:void F(60245)}(this.xi);let o;return this.Ki.runTransaction(e,s,i,u=>(o=new na(u,this.ai?this.ai.next():Le.ce),t==="readwrite-primary"?this.ji(o).next(c=>!!c||this.Ji(o)).next(c=>{if(!c)throw ge(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new V(R.FAILED_PRECONDITION,Kh);return n(o)}).next(c=>this.Zi(o).next(()=>c)):this.Ps(o).next(()=>n(o)))).then(u=>(o.raiseOnCommittedEvent(),u))}Ps(e){return Gr(e).get(xn).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Lo)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new V(R.FAILED_PRECONDITION,Bo)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Gr(e).put(xn,t)}static v(){return rt.v()}Hi(e){const t=Gr(e);return t.get(xn).next(n=>this.Xi(n)?(D(vt,"Releasing primary lease."),t.delete(xn)):A.resolve())}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ge(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Th()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return D(vt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ge(vt,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){ge("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Gr(r){return we(r,As)}function ni(r){return we(r,Xn)}function Xa(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Za{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=$(),s=$();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Za(e,t.fromCache,n,s)}}/**
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
 */class Ky{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Tf{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Th()?8:Wh(pi())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new Ky;return this.ys(e,t,o).next(u=>{if(i.result=u,this.As)return this.ws(e,t,o,u.size)})}).next(()=>i.result)}ws(e,t,n,s){return n.documentReadCount<this.Vs?(Ln()<=J.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Bn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Ln()<=J.DEBUG&&D("QueryEngine","Query:",Bn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(Ln()<=J.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Bn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ne(t))):A.resolve())}gs(e,t){if(fl(t))return A.resolve(null);let n=Ne(t);return this.indexManager.getIndexType(e,n).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=bi(t,null,"F"),n=Ne(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const o=$(...i);return this.fs.getDocuments(e,o).next(u=>this.indexManager.getMinOffset(e,n).next(c=>{const h=this.Ss(t,u);return this.bs(t,h,o,c.readTime)?this.gs(e,bi(t,null,"F")):this.Ds(e,h,t,c)}))})))}ps(e,t,n,s){return fl(t)||s.isEqual(U.min())?A.resolve(null):this.fs.getDocuments(e,n).next(i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?A.resolve(null):(Ln()<=J.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Bn(t)),this.Ds(e,o,t,$h(s,Kn)).next(u=>u))})}Ss(e,t){let n=new re(Vd(e));return t.forEach((s,i)=>{Rs(e,i)&&(n=n.add(i))}),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return Ln()<=J.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Bn(t)),this.fs.getDocumentsMatchingQuery(e,t,Qe.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */const eu="LocalStore",Qy=3e8;class Wy{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new oe(z),this.Fs=new ft(i=>gn(i),vs),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new If(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function wf(r,e,t,n){return new Wy(r,e,t,n)}async function Af(r,e){const t=M(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],u=[];let c=$();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next(h=>({Ns:h,removedBatchIds:o,addedBatchIds:u}))})})}function Hy(r,e){const t=M(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const m=h.batch,p=m.keys();let v=A.resolve();return p.forEach(C=>{v=v.next(()=>f.getEntry(c,C)).next(N=>{const x=h.docVersions.get(C);L(x!==null,48541),N.version.compareTo(x)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),v.next(()=>u.mutationQueue.removeMutationBatch(c,m))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=$();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function vf(r){const e=M(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function Jy(r,e){const t=M(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const u=[];e.targetChanges.forEach((f,m)=>{const p=s.get(m);if(!p)return;u.push(t.li.removeMatchingKeys(i,f.removedDocuments,m).next(()=>t.li.addMatchingKeys(i,f.addedDocuments,m)));let v=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?v=v.withResumeToken(fe.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,n)),s=s.insert(m,v),function(N,x,B){return N.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Qy?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(p,v,f)&&u.push(t.li.updateTargetData(i,v))});let c=Ue(),h=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(bf(i,o,e.documentUpdates).next(f=>{c=f.Bs,h=f.Ls})),!n.isEqual(U.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next(m=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(t.vs=s,i))}function bf(r,e,t){let n=$(),s=$();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=Ue();return t.forEach((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(U.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):D(eu,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{Bs:o,Ls:s}})}function Yy(r,e){const t=M(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=xt),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function ir(r,e){const t=M(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.li.getTargetData(n,e).next(i=>i?(s=i,A.resolve(s)):t.li.allocateTargetId(n).next(o=>(s=new ot(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n})}async function or(r,e,t){const n=M(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!zt(o))throw o;D(eu,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function Ci(r,e,t){const n=M(r);let s=U.min(),i=$();return n.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const m=M(c),p=m.Fs.get(f);return p!==void 0?A.resolve(m.vs.get(p)):m.li.getTargetData(h,f)}(n,o,Ne(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,u.targetId).next(c=>{i=c})}).next(()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:$())).next(u=>(Pf(n,Pd(e),u),{documents:u,ks:i})))}function Rf(r,e){const t=M(r),n=M(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>n.At(i,e).next(o=>o?o.target:null))}function Sf(r,e){const t=M(r),n=t.Ms.get(e)||U.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.xs.getAllFromCollectionGroup(s,e,$h(n,Kn),Number.MAX_SAFE_INTEGER)).then(s=>(Pf(t,e,s),s))}function Pf(r,e,t){let n=r.Ms.get(e)||U.min();t.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Ms.set(e,n)}async function Xy(r,e,t,n){const s=M(r);let i=$(),o=Ue();for(const h of t){const f=e.qs(h.metadata.name);h.document&&(i=i.add(f));const m=e.Ks(h);m.setReadTime(e.Us(h.metadata.readTime)),o=o.insert(f,m)}const u=s.xs.newChangeBuffer({trackRemovals:!0}),c=await ir(s,function(f){return Ne(mr(K.fromString(`__bundle__/docs/${f}`)))}(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",h=>bf(h,u,o).next(f=>(u.apply(h),f)).next(f=>s.li.removeMatchingKeysForTargetId(h,c.targetId).next(()=>s.li.addMatchingKeys(h,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(h,f.Bs,f.Ls)).next(()=>f.Bs)))}async function Zy(r,e,t=$()){const n=await ir(r,Ne(Wi(e.bundledQuery))),s=M(r);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=pe(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.Pi.saveNamedQuery(i,e);const u=n.withResumeToken(fe.EMPTY_BYTE_STRING,o);return s.vs=s.vs.insert(u.targetId,u),s.li.updateTargetData(i,u).next(()=>s.li.removeMatchingKeysForTargetId(i,n.targetId)).next(()=>s.li.addMatchingKeys(i,t,n.targetId)).next(()=>s.Pi.saveNamedQuery(i,e))})}/**
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
 */const Vf="firestore_clients";function $l(r,e){return`${Vf}_${r}_${e}`}const Cf="firestore_mutations";function Gl(r,e,t){let n=`${Cf}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Df="firestore_targets";function Uo(r,e){return`${Df}_${r}_${e}`}/**
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
 */const et="SharedClientState";class Di{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static $s(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new V(s.error.code,s.error.message))),o?new Di(e,t,s.state,i):(ge(et,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class os{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new V(n.error.code,n.error.message))),i?new os(e,n.state,s):(ge(et,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class xi{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Ba();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=Hh(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new xi(e,i):(ge(et,`Failed to parse client data for instance '${e}': ${t}`),null)}}class tu{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new tu(t.clientId,t.onlineState):(ge(et,`Failed to parse online state: ${e}`),null)}}class pa{constructor(){this.activeTargetIds=Ba()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qo{constructor(e,t,n,s,i){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new oe(z),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=$l(this.persistenceKey,this.zs),this.Ys=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new pa),this.eo=new RegExp(`^${Vf}_${o}_([^_]*)$`),this.no=new RegExp(`^${Cf}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${Df}_${o}_(\\d+)$`),this.io=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.so=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const n of e){if(n===this.zs)continue;const s=this.getItem($l(this.persistenceKey,n));if(s){const i=xi.$s(n,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const n=this._o(t);n&&this.ao(n)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(Uo(this.persistenceKey,e));if(s){const i=os.$s(e,s);i&&(n=i.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Uo(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(s=>{this.lo(s)}),this.currentUser=e,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return D(et,"READ",e,t),t}setItem(e,t){D(et,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){D(et,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(D(et,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ge("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const n=this.Io(t.key);return this.Ro(n,null)}{const n=this.Ao(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(t.key)){if(t.newValue!==null){const n=this.Vo(t.key,t.newValue);if(n)return this.mo(n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(t.key===this.io){if(t.newValue!==null){const n=this._o(t.newValue);if(n)return this.ao(n)}}else if(t.key===this.Ys){const n=function(i){let o=Le.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{yo:i}),o=u}catch(u){ge(et,"Failed to read sequence number from WebStorage",u)}return o}(t.newValue);n!==Le.ce&&this.sequenceNumberHandler(n)}else if(t.key===this.so){const n=this.wo(t.newValue);await Promise.all(n.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const s=new Di(this.currentUser,e,t,n),i=Gl(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=Gl(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const s=Uo(this.persistenceKey,e),i=new os(e,t,n);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Io(e);return xi.$s(n,t)}Vo(e,t){const n=this.no.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Di.$s(new be(i),s,t)}fo(e,t){const n=this.ro.exec(e),s=Number(n[1]);return os.$s(s,t)}_o(e){return tu.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);D(et,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(n),o=[],u=[];return i.forEach(c=>{s.has(c)||o.push(c)}),s.forEach(c=>{i.has(c)||u.push(c)}),this.syncEngine.Co(o,u).then(()=>{this.Hs=n})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Ba();return e.forEach((n,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class xf{constructor(){this.vo=new pa,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new pa,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class eI{Mo(e){}shutdown(){}}/**
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
 */const Kl="ConnectivityMonitor";class Ql{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(Kl,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){D(Kl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ri=null;function _a(){return ri===null?ri=function(){return 268435456+Math.round(2147483648*Math.random())}():ri++,"0x"+ri.toString(16)}/**
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
 */const jo="RestConnection",tI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class nI{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===gs?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=_a(),u=this.Qo(e,t.toUriEncodedString());D(jo,`Sending RPC '${e}' ${o}:`,u,n);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,s,i);const{host:h}=new URL(u),f=va(h);return this.zo(e,u,c,n,f).then(m=>(D(jo,`Received RPC '${e}' ${o}: `,m),m),m=>{throw ze(jo,`RPC '${e}' ${o} failed with error: `,m,"url: ",u,"request:",n),m})}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),n&&n.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const n=tI[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class rI{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const Ce="WebChannelConnection",Kr=(r,e,t)=>{r.listen(e,n=>{try{t(n)}catch(s){setTimeout(()=>{throw s},0)}})};class zn extends nI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!zn.c_){const e=Mh();Kr(e,kh.STAT_EVENT,t=>{t.stat===Wo.PROXY?D(Ce,"STAT_EVENT: detected buffering proxy"):t.stat===Wo.NOPROXY&&D(Ce,"STAT_EVENT: detected no buffering proxy")}),zn.c_=!0}}zo(e,t,n,s,i){const o=_a();return new Promise((u,c)=>{const h=new xh;h.setWithCredentials(!0),h.listenOnce(Nh.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case ii.NO_ERROR:const m=h.getResponseJson();D(Ce,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),u(m);break;case ii.TIMEOUT:D(Ce,`RPC '${e}' ${o} timed out`),c(new V(R.DEADLINE_EXCEEDED,"Request time out"));break;case ii.HTTP_ERROR:const p=h.getStatus();if(D(Ce,`RPC '${e}' ${o} failed with status:`,p,"response text:",h.getResponseText()),p>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const C=v==null?void 0:v.error;if(C&&C.status&&C.message){const N=function(B){const j=B.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(j)>=0?j:R.UNKNOWN}(C.status);c(new V(N,C.message))}else c(new V(R.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new V(R.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{D(Ce,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);D(Ce,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)})}T_(e,t,n){const s=_a(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const h=i.join("");D(Ce,`Creating RPC '${e}' stream ${s}: ${h}`,u);const f=o.createWebChannel(h,u);this.E_(f);let m=!1,p=!1;const v=new rI({Jo:C=>{p?D(Ce,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(m||(D(Ce,`Opening RPC '${e}' stream ${s} transport.`),f.open(),m=!0),D(Ce,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Ho:()=>f.close()});return Kr(f,Qr.EventType.OPEN,()=>{p||(D(Ce,`RPC '${e}' stream ${s} transport opened.`),v.i_())}),Kr(f,Qr.EventType.CLOSE,()=>{p||(p=!0,D(Ce,`RPC '${e}' stream ${s} transport closed`),v.o_(),this.I_(f))}),Kr(f,Qr.EventType.ERROR,C=>{p||(p=!0,ze(Ce,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),v.o_(new V(R.UNAVAILABLE,"The operation could not be completed")))}),Kr(f,Qr.EventType.MESSAGE,C=>{var N;if(!p){const x=C.data[0];L(!!x,16349);const B=x,j=(B==null?void 0:B.error)||((N=B[0])==null?void 0:N.error);if(j){D(Ce,`RPC '${e}' stream ${s} received error:`,j);const q=j.status;let Z=function(E){const _=_e[E];if(_!==void 0)return zd(_)}(q),Y=j.message;q==="NOT_FOUND"&&Y.includes("database")&&Y.includes("does not exist")&&Y.includes(this.databaseId.database)&&ze(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Z===void 0&&(Z=R.INTERNAL,Y="Unknown error status: "+q+" with message "+j.message),p=!0,v.o_(new V(Z,Y)),f.close()}else D(Ce,`RPC '${e}' stream ${s} received:`,x),v.__(x)}}),zn.u_(),setTimeout(()=>{v.s_()},0),v}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Oh()}}/**
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
 */function sI(r){return new zn(r)}/**
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
 */function Nf(){return typeof window<"u"?window:null}function mi(){return typeof document<"u"?document:null}/**
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
 */function vn(r){return new ly(r,!0)}/**
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
 */zn.c_=!1;class nu{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Wl="PersistentStream";class kf{constructor(e,t,n,s,i,o,u,c){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new nu(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(ge(t.toString()),ge("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.D_===t&&this.G_(n,s)},n=>{e(()=>{const s=new V(R.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{n(()=>this.z_(s))}),this.stream.onMessage(s=>{n(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return D(Wl,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(D(Wl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class iI extends kf{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=fy(this.serializer,e),n=function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?pe(o.readTime):U.min()}(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=ha(this.serializer),t.addTarget=function(i,o){let u;const c=o.target;if(u=Ai(c)?{documents:Xd(i,c)}:{query:Qi(i,c).ft},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=Qd(i,o.resumeToken);const h=ca(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){u.readTime=sr(i,o.snapshotVersion.toTimestamp());const h=ca(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,e);const n=gy(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=ha(this.serializer),t.removeTarget=e,this.q_(t)}}class oI extends kf{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return L(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,L(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){L(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=my(e.writeResults,e.commitTime),n=pe(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=ha(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Es(this.serializer,n))};this.q_(t)}}/**
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
 */class aI{}class uI extends aI{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,la(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(R.UNKNOWN,i.toString())})}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.jo(e,la(t,n),s,o,u,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(R.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function cI(r,e,t,n){return new uI(r,e,t,n)}class lI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ge(t),this.aa=!1):D("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Tn="RemoteStore";class hI{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{n.enqueueAndForget(async()=>{Gt(this)&&(D(Tn,"Restarting streams for network reachability change."),await async function(c){const h=M(c);h.Ia.add(4),await _r(h),h.Va.set("Unknown"),h.Ia.delete(4),await Cs(h)}(this))})}),this.Va=new lI(n,s)}}async function Cs(r){if(Gt(r))for(const e of r.Ra)await e(!0)}async function _r(r){for(const e of r.Ra)await e(!1)}function Xi(r,e){const t=M(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),iu(t)?su(t):Ir(t).O_()&&ru(t,e))}function ar(r,e){const t=M(r),n=Ir(t);t.Ea.delete(e),n.O_()&&Mf(t,e),t.Ea.size===0&&(n.O_()?n.L_():Gt(t)&&t.Va.set("Unknown"))}function ru(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ir(r).Z_(e)}function Mf(r,e){r.da.$e(e),Ir(r).X_(e)}function su(r){r.da=new oy({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Ir(r).start(),r.Va.ua()}function iu(r){return Gt(r)&&!Ir(r).x_()&&r.Ea.size>0}function Gt(r){return M(r).Ia.size===0}function Of(r){r.da=void 0}async function dI(r){r.Va.set("Online")}async function fI(r){r.Ea.forEach((e,t)=>{ru(r,e)})}async function mI(r,e){Of(r),iu(r)?(r.Va.ha(e),su(r)):r.Va.set("Unknown")}async function gI(r,e,t){if(r.Va.set("Online"),e instanceof Kd&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const u of i.targetIds)s.Ea.has(u)&&(await s.remoteSyncer.rejectListen(u,o),s.Ea.delete(u),s.da.removeTarget(u))}(r,e)}catch(n){D(Tn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ni(r,n)}else if(e instanceof di?r.da.Xe(e):e instanceof Gd?r.da.st(e):r.da.tt(e),!t.isEqual(U.min()))try{const n=await vf(r.localStore);t.compareTo(n)>=0&&await function(i,o){const u=i.da.Tt(o);return u.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(c.resumeToken,o))}}),u.targetMismatches.forEach((c,h)=>{const f=i.Ea.get(c);if(!f)return;i.Ea.set(c,f.withResumeToken(fe.EMPTY_BYTE_STRING,f.snapshotVersion)),Mf(i,c);const m=new ot(f.target,c,h,f.sequenceNumber);ru(i,m)}),i.remoteSyncer.applyRemoteEvent(u)}(r,t)}catch(n){D(Tn,"Failed to raise snapshot:",n),await Ni(r,n)}}async function Ni(r,e,t){if(!zt(e))throw e;r.Ia.add(1),await _r(r),r.Va.set("Offline"),t||(t=()=>vf(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{D(Tn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await Cs(r)})}function Ff(r,e){return e().catch(t=>Ni(r,t,e))}async function yr(r){const e=M(r),t=Bt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:xt;for(;pI(e);)try{const s=await Yy(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,_I(e,s)}catch(s){await Ni(e,s)}Lf(e)&&Bf(e)}function pI(r){return Gt(r)&&r.Ta.length<10}function _I(r,e){r.Ta.push(e);const t=Bt(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function Lf(r){return Gt(r)&&!Bt(r).x_()&&r.Ta.length>0}function Bf(r){Bt(r).start()}async function yI(r){Bt(r).ra()}async function II(r){const e=Bt(r);for(const t of r.Ta)e.ea(t.mutations)}async function EI(r,e,t){const n=r.Ta.shift(),s=za.from(n,e,t);await Ff(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await yr(r)}async function TI(r,e){e&&Bt(r).Y_&&await async function(n,s){if(function(o){return jd(o)&&o!==R.ABORTED}(s.code)){const i=n.Ta.shift();Bt(n).B_(),await Ff(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await yr(n)}}(r,e),Lf(r)&&Bf(r)}async function Hl(r,e){const t=M(r);t.asyncQueue.verifyOperationInProgress(),D(Tn,"RemoteStore received new credentials");const n=Gt(t);t.Ia.add(3),await _r(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Cs(t)}async function ya(r,e){const t=M(r);e?(t.Ia.delete(2),await Cs(t)):e||(t.Ia.add(2),await _r(t),t.Va.set("Unknown"))}function Ir(r){return r.ma||(r.ma=function(t,n,s){const i=M(t);return i.sa(),new iI(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:dI.bind(null,r),Yo:fI.bind(null,r),t_:mI.bind(null,r),H_:gI.bind(null,r)}),r.Ra.push(async e=>{e?(r.ma.B_(),iu(r)?su(r):r.Va.set("Unknown")):(await r.ma.stop(),Of(r))})),r.ma}function Bt(r){return r.fa||(r.fa=function(t,n,s){const i=M(t);return i.sa(),new oI(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:yI.bind(null,r),t_:TI.bind(null,r),ta:II.bind(null,r),na:EI.bind(null,r)}),r.Ra.push(async e=>{e?(r.fa.B_(),await yr(r)):(await r.fa.stop(),r.Ta.length>0&&(D(Tn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))})),r.fa}/**
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
 */class ou{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Se,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,u=new ou(e,t,o,s,i);return u.start(n),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Er(r,e){if(ge("AsyncQueue",`${e}: ${r}`),zt(r))return new V(R.UNAVAILABLE,`${e}: ${r}`);throw r}/**
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
 */class fn{static emptySet(e){return new fn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||k.comparator(t.key,n.key):(t,n)=>k.comparator(t.key,n.key),this.keyedMap=Wr(),this.sortedSet=new oe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof fn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new fn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class Jl{constructor(){this.ga=new oe(k.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):F(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class wn{constructor(e,t,n,s,i,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(u=>{o.push({type:0,doc:u})}),new wn(e,t,fn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&bs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class wI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class AI{constructor(){this.queries=Yl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=M(t),i=s.queries;s.queries=Yl(),i.forEach((o,u)=>{for(const c of u.Sa)c.onError(n)})})(this,new V(R.ABORTED,"Firestore shutting down"))}}function Yl(){return new ft(r=>Sd(r),bs)}async function au(r,e){const t=M(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new wI,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const u=Er(o,`Initialization of query '${Bn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&cu(t)}async function uu(r,e){const t=M(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function vI(r,e){const t=M(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const u of o.Sa)u.Fa(s)&&(n=!0);o.wa=s}}n&&cu(t)}function bI(r,e,t){const n=M(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function cu(r){r.Ca.forEach(e=>{e.next()})}var Ia,Xl;(Xl=Ia||(Ia={})).Ma="default",Xl.Cache="cache";class lu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new wn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=wn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ia.Cache}}/**
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
 */class Uf{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
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
 */class Zl{constructor(e){this.serializer=e}qs(e){return st(this.serializer,e)}Ks(e){return e.metadata.exists?Ki(this.serializer,e.document,!1):ue.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return pe(e)}}class hu{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=qf(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;const n=K.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new Zl(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.qs(s.metadata.name);for(const o of s.metadata.queries){const u=(t.get(o)||$()).add(i);t.set(o,u)}}return t}async ja(e){const t=await Xy(e,new Zl(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(const s of this.Wa)await Zy(e,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function qf(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
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
 */class jf{constructor(e){this.key=e}}class zf{constructor(e){this.key=e}}class $f{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=$(),this.mutatedKeys=$(),this.eu=Vd(e),this.tu=new fn(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Jl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const p=s.get(f),v=Rs(this.query,m)?m:null,C=!!p&&this.mutatedKeys.has(p.key),N=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let x=!1;p&&v?p.data.isEqual(v.data)?C!==N&&(n.track({type:3,doc:v}),x=!0):this.su(p,v)||(n.track({type:2,doc:v}),x=!0,(c&&this.eu(v,c)>0||h&&this.eu(v,h)<0)&&(u=!0)):!p&&v?(n.track({type:0,doc:v}),x=!0):p&&!v&&(n.track({type:1,doc:p}),x=!0,(c||h)&&(u=!0)),x&&(v?(o=o.add(v),i=N?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:u,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,m)=>function(v,C){const N=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Vt:x})}};return N(v)-N(C)}(f.type,m.type)||this.eu(f.doc,m.doc)),this.ou(n),s=s??!1;const u=t&&!s?this._u():[],c=this.Ya.size===0&&this.current&&!s?1:0,h=c!==this.Xa;return this.Xa=c,o.length!==0||h?{snapshot:new wn(this.query,e.tu,i,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Jl,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=$(),this.tu.forEach(n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))});const t=[];return e.forEach(n=>{this.Ya.has(n)||t.push(new zf(n))}),this.Ya.forEach(n=>{e.has(n)||t.push(new jf(n))}),t}cu(e){this.Za=e.ks,this.Ya=$();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return wn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Kt="SyncEngine";class RI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class SI{constructor(e){this.key=e,this.hu=!1}}class PI{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new ft(u=>Sd(u),bs),this.Eu=new Map,this.Iu=new Set,this.Ru=new oe(k.comparator),this.Au=new Map,this.Vu=new Ha,this.du={},this.mu=new Map,this.fu=En.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function VI(r,e,t=!0){const n=Zi(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Gf(n,e,t,!0),s}async function CI(r,e){const t=Zi(r);await Gf(t,e,!0,!1)}async function Gf(r,e,t,n){const s=await ir(r.localStore,Ne(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let u;return n&&(u=await du(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&Xi(r.remoteStore,s),u}async function du(r,e,t,n,s){r.pu=(m,p,v)=>async function(N,x,B,j){let q=x.view.ru(B);q.bs&&(q=await Ci(N.localStore,x.query,!1).then(({documents:E})=>x.view.ru(E,q)));const Z=j&&j.targetChanges.get(x.targetId),Y=j&&j.targetMismatches.get(x.targetId)!=null,X=x.view.applyChanges(q,N.isPrimaryClient,Z,Y);return Ea(N,x.targetId,X.au),X.snapshot}(r,m,p,v);const i=await Ci(r.localStore,e,!0),o=new $f(e,i.ks),u=o.ru(i.documents),c=Vs.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(u,r.isPrimaryClient,c);Ea(r,t,h.au);const f=new RI(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function DI(r,e,t){const n=M(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter(o=>!bs(o,e))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await or(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&ar(n.remoteStore,s.targetId),ur(n,s.targetId)}).catch(jt)):(ur(n,s.targetId),await or(n.localStore,s.targetId,!0))}async function xI(r,e){const t=M(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),ar(t.remoteStore,n.targetId))}async function NI(r,e,t){const n=pu(r);try{const s=await function(o,u){const c=M(o),h=ee.now(),f=u.reduce((v,C)=>v.add(C.key),$());let m,p;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let C=Ue(),N=$();return c.xs.getEntries(v,f).next(x=>{C=x,C.forEach((B,j)=>{j.isValidDocument()||(N=N.add(B))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,C)).next(x=>{m=x;const B=[];for(const j of u){const q=ny(j,m.get(j.key).overlayedDocument);q!=null&&B.push(new mt(j.key,q,pd(q.value.mapValue),he.exists(!0)))}return c.mutationQueue.addMutationBatch(v,h,B,u)}).next(x=>{p=x;const B=x.applyToLocalDocumentSet(m,N);return c.documentOverlayCache.saveOverlays(v,x.batchId,B)})}).then(()=>({batchId:p.batchId,changes:Dd(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,u,c){let h=o.du[o.currentUser.toKey()];h||(h=new oe(z)),h=h.insert(u,c),o.du[o.currentUser.toKey()]=h}(n,s.batchId,t),await gt(n,s.changes),await yr(n.remoteStore)}catch(s){const i=Er(s,"Failed to persist write");t.reject(i)}}async function Kf(r,e){const t=M(r);try{const n=await Jy(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?L(o.hu,14607):s.removedDocuments.size>0&&(L(o.hu,42227),o.hu=!1))}),await gt(t,n,e)}catch(n){await jt(n)}}function eh(r,e,t){const n=M(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach((i,o)=>{const u=o.view.va(e);u.snapshot&&s.push(u.snapshot)}),function(o,u){const c=M(o);c.onlineState=u;let h=!1;c.queries.forEach((f,m)=>{for(const p of m.Sa)p.va(u)&&(h=!0)}),h&&cu(c)}(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function kI(r,e,t){const n=M(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new oe(k.comparator);o=o.insert(i,ue.newNoDocument(i,U.min()));const u=$().add(i),c=new Ps(U.min(),new Map,new oe(z),o,u);await Kf(n,c),n.Ru=n.Ru.remove(i),n.Au.delete(e),gu(n)}else await or(n.localStore,e,!1).then(()=>ur(n,e,t)).catch(jt)}async function MI(r,e){const t=M(r),n=e.batch.batchId;try{const s=await Hy(t.localStore,e);mu(t,n,null),fu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await gt(t,s)}catch(s){await jt(s)}}async function OI(r,e,t){const n=M(r);try{const s=await function(o,u){const c=M(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(m=>(L(m!==null,37113),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,e);mu(n,e,t),fu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await gt(n,s)}catch(s){await jt(s)}}async function FI(r,e){const t=M(r);Gt(t.remoteStore)||D(Kt,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(o){const u=M(o);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c))}(t.localStore);if(n===xt)return void e.resolve();const s=t.mu.get(n)||[];s.push(e),t.mu.set(n,s)}catch(n){const s=Er(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function fu(r,e){(r.mu.get(e)||[]).forEach(t=>{t.resolve()}),r.mu.delete(e)}function mu(r,e,t){const n=M(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function ur(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach(n=>{r.Vu.containsKey(n)||Qf(r,n)})}function Qf(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(ar(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),gu(r))}function Ea(r,e,t){for(const n of t)n instanceof jf?(r.Vu.addReference(n.key,e),LI(r,n)):n instanceof zf?(D(Kt,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||Qf(r,n.key)):F(19791,{wu:n})}function LI(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(D(Kt,"New document in limbo: "+t),r.Iu.add(n),gu(r))}function gu(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new k(K.fromString(e)),n=r.fu.next();r.Au.set(n,new SI(t)),r.Ru=r.Ru.insert(t,n),Xi(r.remoteStore,new ot(Ne(mr(t.path)),n,"TargetPurposeLimboResolution",Le.ce))}}async function gt(r,e,t){const n=M(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach((u,c)=>{o.push(n.pu(c,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Za.Is(c.targetId,h);i.push(m)}}))}),await Promise.all(o),n.Pu.H_(s),await async function(c,h){const f=M(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>A.forEach(h,p=>A.forEach(p.Ts,v=>f.persistence.referenceDelegate.addReference(m,p.targetId,v)).next(()=>A.forEach(p.Es,v=>f.persistence.referenceDelegate.removeReference(m,p.targetId,v)))))}catch(m){if(!zt(m))throw m;D(eu,"Failed to update sequence numbers: "+m)}for(const m of h){const p=m.targetId;if(!m.fromCache){const v=f.vs.get(p),C=v.snapshotVersion,N=v.withLastLimboFreeSnapshotVersion(C);f.vs=f.vs.insert(p,N)}}}(n.localStore,i))}async function BI(r,e){const t=M(r);if(!t.currentUser.isEqual(e)){D(Kt,"User change. New user:",e.toKey());const n=await Af(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(u=>{u.forEach(c=>{c.reject(new V(R.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await gt(t,n.Ns)}}function UI(r,e){const t=M(r),n=t.Au.get(e);if(n&&n.hu)return $().add(n.key);{let s=$();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const u=t.Tu.get(o);s=s.unionWith(u.view.nu)}return s}}async function qI(r,e){const t=M(r),n=await Ci(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&Ea(t,e.targetId,s.au),s}async function jI(r,e){const t=M(r);return Sf(t.localStore,e).then(n=>gt(t,n))}async function zI(r,e,t,n){const s=M(r),i=await function(u,c){const h=M(u),f=M(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.Xn(m,c).next(p=>p?h.localDocuments.getDocuments(m,p):A.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await yr(s.remoteStore):t==="acknowledged"||t==="rejected"?(mu(s,e,n||null),fu(s,e),function(u,c){M(M(u).mutationQueue).nr(c)}(s.localStore,e)):F(6720,"Unknown batchState",{Su:t}),await gt(s,i)):D(Kt,"Cannot apply mutation batch with id: "+e)}async function $I(r,e){const t=M(r);if(Zi(t),pu(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await th(t,n.toArray());t.gu=!0,await ya(t.remoteStore,!0);for(const i of s)Xi(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Eu.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then(()=>(ur(t,o),or(t.localStore,o,!0))),ar(t.remoteStore,o)}),await s,await th(t,n),function(o){const u=M(o);u.Au.forEach((c,h)=>{ar(u.remoteStore,h)}),u.Vu.zr(),u.Au=new Map,u.Ru=new oe(k.comparator)}(t),t.gu=!1,await ya(t.remoteStore,!1)}}async function th(r,e,t){const n=M(r),s=[],i=[];for(const o of e){let u;const c=n.Eu.get(o);if(c&&c.length!==0){u=await ir(n.localStore,Ne(c[0]));for(const h of c){const f=n.Tu.get(h),m=await qI(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await Rf(n.localStore,o);u=await ir(n.localStore,h),await du(n,Wf(h),o,!1,u.resumeToken)}s.push(u)}return n.Pu.H_(i),s}function Wf(r){return vd(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function GI(r){return function(t){return M(M(t).persistence).hs()}(M(r).localStore)}async function KI(r,e,t,n){const s=M(r);if(s.gu)return void D(Kt,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Sf(s.localStore,Pd(i[0])),u=Ps.createSynthesizedRemoteEventForCurrentChange(e,t==="current",fe.EMPTY_BYTE_STRING);await gt(s,o,u);break}case"rejected":await or(s.localStore,e,!0),ur(s,e,n);break;default:F(64155,t)}}async function QI(r,e,t){const n=Zi(r);if(n.gu){for(const s of e){if(n.Eu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){D(Kt,"Adding an already active target "+s);continue}const i=await Rf(n.localStore,s),o=await ir(n.localStore,i);await du(n,Wf(i),o.targetId,!1,o.resumeToken),Xi(n.remoteStore,o)}for(const s of t)n.Eu.has(s)&&await or(n.localStore,s,!1).then(()=>{ar(n.remoteStore,s),ur(n,s)}).catch(jt)}}function Zi(r){const e=M(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=UI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kI.bind(null,e),e.Pu.H_=vI.bind(null,e.eventManager),e.Pu.yu=bI.bind(null,e.eventManager),e}function pu(r){const e=M(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=MI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=OI.bind(null,e),e}function WI(r,e,t){const n=M(r);(async function(i,o,u){try{const c=await o.getMetadata();if(await function(v,C){const N=M(v),x=pe(C.createTime);return N.persistence.runTransaction("hasNewerBundle","readonly",B=>N.Pi.getBundleMetadata(B,C.id)).then(B=>!!B&&B.createTime.compareTo(x)>=0)}(i.localStore,c))return await o.close(),u._completeWith(function(v){return{taskState:"Success",documentsLoaded:v.totalDocuments,bytesLoaded:v.totalBytes,totalDocuments:v.totalDocuments,totalBytes:v.totalBytes}}(c)),Promise.resolve(new Set);u._updateProgress(qf(c));const h=new hu(c,o.serializer);let f=await o.bu();for(;f;){const p=await h.Ga(f);p&&u._updateProgress(p),f=await o.bu()}const m=await h.ja(i.localStore);return await gt(i,m.Ha,void 0),await function(v,C){const N=M(v);return N.persistence.runTransaction("Save bundle","readwrite",x=>N.Pi.saveBundleMetadata(x,C))}(i.localStore,c),u._completeWith(m.progress),Promise.resolve(m.Ja)}catch(c){return ze(Kt,`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,e,t).then(s=>{n.sharedClientState.notifyBundleLoaded(s)})}class cr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=vn(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return wf(this.persistence,new Tf,e.initialUser,this.serializer)}Cu(e){return new Ja(Yi.Vi,this.serializer)}Du(e){return new xf}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}cr.provider={build:()=>new cr};class _u extends cr{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){L(this.persistence.referenceDelegate instanceof Vi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new gf(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new Ja(n=>Vi.Vi(n,t),this.serializer)}}class yu extends cr{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await pu(this.xu.syncEngine),await yr(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return wf(this.persistence,new Tf,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new gf(n,e.asyncQueue,t)}Mu(e,t){const n=new t_(t,this.persistence);return new e_(e.asyncQueue,n)}Cu(e){const t=Xa(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new Ya(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Nf(),mi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new xf}}class Hf extends yu{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof qo&&(this.sharedClientState.syncEngine={bo:zI.bind(null,t),Do:KI.bind(null,t),Co:QI.bind(null,t),hs:GI.bind(null,t),So:jI.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async n=>{await $I(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Du(e){const t=Nf();if(!qo.v(t))throw new V(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Xa(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new qo(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Ut{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>eh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=BI.bind(null,this.syncEngine),await ya(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new AI}()}createDatastore(e){const t=vn(e.databaseInfo.databaseId),n=sI(e.databaseInfo);return cI(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,u){return new hI(n,s,i,o,u)}(this.localStore,this.datastore,e.asyncQueue,t=>eh(this.syncEngine,t,0),function(){return Ql.v()?new Ql:new eI}())}createSyncEngine(e,t){return function(s,i,o,u,c,h,f){const m=new PI(s,i,o,u,c,h);return f&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=M(s);D(Tn,"RemoteStore shutting down."),i.Ia.add(5),await _r(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Ut.provider={build:()=>new Ut};function nh(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class eo{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ge("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class HI{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new Se,this.buffer=new Uint8Array,this.Lu=function(){return new TextDecoder("utf-8")}(),this.ku().then(n=>{n&&n.Ua()?this.metadata.resolve(n.Ka.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.Ka)}`))},n=>this.metadata.reject(n))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(e===null)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Ku(`length string (${t}) is not valid number`);const s=await this.Uu(n);return new Uf(JSON.parse(s),e.length+n)}$u(){return this.buffer.findIndex(e=>e===123)}async qu(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class JI{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.Ua())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n==null?void 0:n.Ka)}`);this.metadata=n;do n=this.bu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.Uu(e);return new Uf(JSON.parse(t),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new V(R.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if(this.bundleData[t]==="{"){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */let YI=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new V(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=M(s),u={documents:i.map(m=>Is(o.serializer,m))},c=await o.jo("BatchGetDocuments",o.serializer.databaseId,K.emptyPath(),u,i.length),h=new Map;c.forEach(m=>{const p=dy(o.serializer,m);h.set(p.key.toString(),p)});const f=[];return i.forEach(m=>{const p=h.get(m.toString());L(!!p,55234,{key:m}),f.push(p)}),f}(this.datastore,e);return t.forEach(n=>this.recordVersion(n)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new pr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,n)=>{const s=k.fromPath(n);this.mutations.push(new qa(s,this.precondition(s)))}),await async function(n,s){const i=M(n),o={writes:s.map(u=>Es(i.serializer,u))};await i.Wo("Commit",i.serializer.databaseId,K.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw F(50498,{Gu:e.constructor.name});t=U.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new V(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(U.min())?he.exists(!1):he.updateTime(t):he.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(U.min()))throw new V(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return he.updateTime(t)}return he.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
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
 */class XI{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this.zu=n.maxAttempts,this.M_=new nu(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new YI(this.datastore),t=this.Hu(e);t&&t.then(n=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(n)}).catch(s=>{this.Zu(s)}))}).catch(n=>{this.Zu(n)})})}Hu(e){try{const t=this.updateFunction(e);return!ws(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!jd(t)}return!1}}/**
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
 */const qt="FirestoreClient";class ZI{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=be.UNAUTHENTICATED,this.clientId=Mi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{D(qt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(D(qt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Se;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Er(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function zo(r,e){r.asyncQueue.verifyOperationInProgress(),D(qt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Af(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function rh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Iu(r);D(qt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Hl(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Hl(e.remoteStore,s)),r._onlineComponents=e}async function Iu(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D(qt,"Using user provided OfflineComponentProvider");try{await zo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;ze("Error using user provided cache. Falling back to memory cache: "+t),await zo(r,new cr)}}else D(qt,"Using default OfflineComponentProvider"),await zo(r,new _u(void 0));return r._offlineComponents}async function to(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D(qt,"Using user provided OnlineComponentProvider"),await rh(r,r._uninitializedComponentsProvider._online)):(D(qt,"Using default OnlineComponentProvider"),await rh(r,new Ut))),r._onlineComponents}function Jf(r){return Iu(r).then(e=>e.persistence)}function Tr(r){return Iu(r).then(e=>e.localStore)}function Yf(r){return to(r).then(e=>e.remoteStore)}function Eu(r){return to(r).then(e=>e.syncEngine)}function Xf(r){return to(r).then(e=>e.datastore)}async function lr(r){const e=await to(r),t=e.eventManager;return t.onListen=VI.bind(null,e.syncEngine),t.onUnlisten=DI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=CI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=xI.bind(null,e.syncEngine),t}function eE(r){return r.asyncQueue.enqueue(async()=>{const e=await Jf(r),t=await Yf(r);return e.setNetworkEnabled(!0),function(s){const i=M(s);return i.Ia.delete(0),Cs(i)}(t)})}function tE(r){return r.asyncQueue.enqueue(async()=>{const e=await Jf(r),t=await Yf(r);return e.setNetworkEnabled(!1),async function(s){const i=M(s);i.Ia.add(0),await _r(i),i.Va.set("Offline")}(t)})}function nE(r,e,t,n){const s=new eo(n),i=new lu(e,s,t);return r.asyncQueue.enqueueAndForget(async()=>au(await lr(r),i)),()=>{s.Nu(),r.asyncQueue.enqueueAndForget(async()=>uu(await lr(r),i))}}function rE(r,e){const t=new Se;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const u=await function(h,f){const m=M(h);return m.persistence.runTransaction("read document","readonly",p=>m.localDocuments.getDocument(p,f))}(s,i);u.isFoundDocument()?o.resolve(u):u.isNoDocument()?o.resolve(null):o.reject(new V(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=Er(u,`Failed to get document '${i} from cache`);o.reject(c)}}(await Tr(r),e,t)),t.promise}function Zf(r,e,t={}){const n=new Se;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,u,c,h){const f=new eo({next:p=>{f.Nu(),o.enqueueAndForget(()=>uu(i,m));const v=p.docs.has(u);!v&&p.fromCache?h.reject(new V(R.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&p.fromCache&&c&&c.source==="server"?h.reject(new V(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new lu(mr(u.path),f,{includeMetadataChanges:!0,qa:!0});return au(i,m)}(await lr(r),r.asyncQueue,e,t,n)),n.promise}function sE(r,e){const t=new Se;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,o){try{const u=await Ci(s,i,!0),c=new $f(i,u.ks),h=c.ru(u.documents),f=c.applyChanges(h,!1);o.resolve(f.snapshot)}catch(u){const c=Er(u,`Failed to execute query '${i} against cache`);o.reject(c)}}(await Tr(r),e,t)),t.promise}function em(r,e,t={}){const n=new Se;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,u,c,h){const f=new eo({next:p=>{f.Nu(),o.enqueueAndForget(()=>uu(i,m)),p.fromCache&&c.source==="server"?h.reject(new V(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new lu(u,f,{includeMetadataChanges:!0,qa:!0});return au(i,m)}(await lr(r),r.asyncQueue,e,t,n)),n.promise}function iE(r,e,t){const n=new Se;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await Xf(r);n.resolve(async function(o,u,c){var N;const h=M(o),{request:f,gt:m,parent:p}=Zd(h.serializer,bd(u),c);h.connection.qo||delete f.parent;const v=(await h.jo("RunAggregationQuery",h.serializer.databaseId,p,f,1)).filter(x=>!!x.result);L(v.length===1,64727);const C=(N=v[0].result)==null?void 0:N.aggregateFields;return Object.keys(C).reduce((x,B)=>(x[m[B]]=C[B],x),{})}(s,e,t))}catch(s){n.reject(s)}}),n.promise}function oE(r,e){const t=new Se;return r.asyncQueue.enqueueAndForget(async()=>NI(await Eu(r),e,t)),t.promise}function aE(r,e){const t=new eo(e);return r.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.add(i),i.next()}(await lr(r),t)),()=>{t.Nu(),r.asyncQueue.enqueueAndForget(async()=>function(s,i){M(s).Ca.delete(i)}(await lr(r),t))}}function uE(r,e,t){const n=new Se;return r.asyncQueue.enqueueAndForget(async()=>{const s=await Xf(r);new XI(r.asyncQueue,s,t,e,n).ju()}),n.promise}function cE(r,e,t,n){const s=function(o,u){let c;return c=typeof o=="string"?$d().encode(o):o,function(f,m){return new HI(f,m)}(function(f,m){if(f instanceof Uint8Array)return nh(f,m);if(f instanceof ArrayBuffer)return nh(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(c),u)}(t,vn(e));r.asyncQueue.enqueueAndForget(async()=>{WI(await Eu(r),s,n)})}function lE(r,e){return r.asyncQueue.enqueue(async()=>function(n,s){const i=M(n);return i.persistence.runTransaction("Get named query","readonly",o=>i.Pi.getNamedQuery(o,s))}(await Tr(r),e))}function tm(r,e){return function(n,s){return new JI(n,s)}(r,e)}function hE(r,e){return r.asyncQueue.enqueue(async()=>async function(n,s){const i=M(n),o=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",c=>o.getFieldIndexes(c).next(h=>function(m,p,v,C,N){m=[...m],p=[...p],m.sort(v),p.sort(v);const x=m.length,B=p.length;let j=0,q=0;for(;j<B&&q<x;){const Z=v(m[q],p[j]);Z<0?N(m[q++]):Z>0?C(p[j++]):(j++,q++)}for(;j<B;)C(p[j++]);for(;q<x;)N(m[q++])}(h,s,Jp,f=>{u.push(o.addFieldIndex(c,f))},f=>{u.push(o.deleteFieldIndex(c,f))})).next(()=>A.waitFor(u)))}(await Tr(r),e))}function dE(r,e){return r.asyncQueue.enqueue(async()=>function(n,s){M(n).Cs.As=s}(await Tr(r),e))}function fE(r){return r.asyncQueue.enqueue(async()=>function(t){const n=M(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await Tr(r)))}/**
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
 */function nm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
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
 */const mE="ComponentProvider",sh=new Map;function gE(r,e,t,n,s){return new C_(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,nm(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const rm="firestore.googleapis.com",ih=!0;class oh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=rm,this.ssl=ih}else this.host=e.host,this.ssl=e.ssl??ih;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=lf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<mf)throw new V(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}qh("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=nm(e.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ds{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new oh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new oh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Bh;switch(n.type){case"firstParty":return new zp(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new V(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=sh.get(t);n&&(D(mE,"Removing Datastore"),sh.delete(t),n.terminate())}(this),Promise.resolve()}}function sm(r,e,t,n={}){var h;r=Q(r,Ds);const s=va(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},u=`${e}:${t}`;s&&bh(`https://${u}`),i.host!==rm&&i.host!==u&&ze("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:n};if(!Nt(c,o)&&(r._setSettings(c),n.mockUserToken)){let f,m;if(typeof n.mockUserToken=="string")f=n.mockUserToken,m=be.MOCK_USER;else{f=Ig(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new V(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new be(p)}r._authCredentials=new Up(new Lh(f,m))}}/**
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
 */class Te{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Te(this.firestore,e,this._query)}}class ne{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new He(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ne(this.firestore,e,this._key)}toJSON(){return{type:ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(An(t,ne._jsonSchema))return new ne(e,n||null,new k(K.fromString(t.referencePath)))}}ne._jsonSchemaVersion="firestore/documentReference/1.0",ne._jsonSchema={type:ye("string",ne._jsonSchemaVersion),referencePath:ye("string")};class He extends Te{constructor(e,t,n){super(e,t,mr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ne(this.firestore,null,new k(e))}withConverter(e){return new He(this.firestore,e,this._path)}}function pE(r,e,...t){if(r=Ee(r),Pa("collection","path",e),r instanceof Ds){const n=K.fromString(e,...t);return Wc(n),new He(r,null,n)}{if(!(r instanceof ne||r instanceof He))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(K.fromString(e,...t));return Wc(n),new He(r.firestore,null,n)}}function _E(r,e){if(r=Q(r,Ds),Pa("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new V(R.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Te(r,null,function(n){return new dt(K.emptyPath(),n)}(e))}function im(r,e,...t){if(r=Ee(r),arguments.length===1&&(e=Mi.newId()),Pa("doc","path",e),r instanceof Ds){const n=K.fromString(e,...t);return Qc(n),new ne(r,null,new k(n))}{if(!(r instanceof ne||r instanceof He))throw new V(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(K.fromString(e,...t));return Qc(n),new ne(r.firestore,r instanceof He?r.converter:null,new k(n))}}function yE(r,e){return r=Ee(r),e=Ee(e),(r instanceof ne||r instanceof He)&&(e instanceof ne||e instanceof He)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function Tu(r,e){return r=Ee(r),e=Ee(e),r instanceof Te&&e instanceof Te&&r.firestore===e.firestore&&bs(r._query,e._query)&&r.converter===e.converter}/**
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
 */const ah="AsyncQueue";class uh{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new nu(this,"async_queue_retry"),this._c=()=>{const n=mi();n&&D(ah,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=mi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=mi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Se;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!zt(e))throw e;D(ah,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(n=>{throw this.nc=n,this.rc=!1,ge("INTERNAL UNHANDLED ERROR: ",ch(n)),n}).then(n=>(this.rc=!1,n))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=ou.createAndSchedule(this,e,t,n,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&F(47125,{Pc:ch(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ch(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
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
 */class om{constructor(){this._progressObserver={},this._taskCompletionResolver=new Se,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const IE=-1;class se extends Ds{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new uh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new uh(e),this._firestoreClient=void 0,await e}}}function EE(r,e,t){t||(t=gs);const n=Ra(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(Nt(i,e))return s;throw new V(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new V(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<mf)throw new V(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&va(e.host)&&bh(e.host),n.initialize({options:e,instanceIdentifier:t})}function TE(r,e){const t=typeof r=="object"?r:Rp(),n=typeof r=="string"?r:e||gs,s=Ra(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=_g("firestore");i&&sm(s,...i)}return s}function de(r){if(r._terminated)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||am(r),r._firestoreClient}function am(r){var n,s,i,o;const e=r._freezeSettings(),t=gE(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new ZI(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(r._componentsProvider))}function wE(r,e){ze("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return um(r,Ut.provider,{build:n=>new yu(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function AE(r){ze("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();um(r,Ut.provider,{build:t=>new Hf(t,e.cacheSizeBytes)})}function um(r,e,t){if((r=Q(r,se))._firestoreClient||r._terminated)throw new V(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new V(R.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},am(r)}function vE(r){if(r._initialized&&!r._terminated)throw new V(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Se;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!rt.v())return Promise.resolve();const s=n+Ef;await rt.delete(s)}(Xa(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function bE(r){return function(t){const n=new Se;return t.asyncQueue.enqueueAndForget(async()=>FI(await Eu(t),n)),n.promise}(de(r=Q(r,se)))}function RE(r){return eE(de(r=Q(r,se)))}function SE(r){return tE(de(r=Q(r,se)))}function PE(r){return Ep(r.app,"firestore",r._databaseId.database),r._delete()}function Ta(r,e){const t=de(r=Q(r,se)),n=new om;return cE(t,r._databaseId,e,n),n}function cm(r,e){return lE(de(r=Q(r,se)),e).then(t=>t?new Te(r,null,t.query):null)}/**
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
 */class Fe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Fe(fe.fromBase64String(e))}catch(t){throw new V(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Fe(fe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Fe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(An(e,Fe._jsonSchema))return Fe.fromBase64String(e.bytes)}}Fe._jsonSchemaVersion="firestore/bytes/1.0",Fe._jsonSchema={type:ye("string",Fe._jsonSchemaVersion),bytes:ye("string")};/**
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
 */class bn{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function VE(){return new bn(Yo)}/**
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
 */class Qt{constructor(e){this._methodName=e}}/**
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
 */class Je{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Je._jsonSchemaVersion}}static fromJSON(e){if(An(e,Je._jsonSchema))return new Je(e.latitude,e.longitude)}}Je._jsonSchemaVersion="firestore/geoPoint/1.0",Je._jsonSchema={type:ye("string",Je._jsonSchemaVersion),latitude:ye("number"),longitude:ye("number")};/**
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
 */class Ke{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Ke._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(An(e,Ke._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Ke(e.vectorValues);throw new V(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ke._jsonSchemaVersion="firestore/vectorValue/1.0",Ke._jsonSchema={type:ye("string",Ke._jsonSchemaVersion),vectorValues:ye("object")};/**
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
 */const CE=/^__.*__$/;class DE{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new mt(e,this.data,this.fieldMask,t,this.fieldTransforms):new gr(e,this.data,t,this.fieldTransforms)}}class lm{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new mt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function hm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{dataSource:r})}}class no{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new no({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return ki(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(hm(this.dataSource)&&CE.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class xE{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||vn(e)}I(e,t,n,s=!1){return new no({dataSource:e,methodName:t,targetDoc:n,path:ce.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Rn(r){const e=r._freezeSettings(),t=vn(r._databaseId);return new xE(r._databaseId,!!e.ignoreUndefinedProperties,t)}function ro(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);Pu("Data must be an object, but it was:",o,n);const u=mm(n,o);let c,h;if(i.merge)c=new Be(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const p=ht(e,m,t);if(!o.contains(p))throw new V(R.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);pm(f,p)||f.push(p)}c=new Be(f),h=o.fieldTransforms.filter(m=>c.covers(m.field))}else c=null,h=o.fieldTransforms;return new DE(new Re(u),c,h)}class xs extends Qt{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof xs}}function dm(r,e,t){return new no({dataSource:3,targetDoc:e.settings.targetDoc,methodName:r._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class wu extends Qt{_toFieldTransform(e){return new Ss(e.path,new nr)}isEqual(e){return e instanceof wu}}class Au extends Qt{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=dm(this,e,!0),n=this.Sc.map(i=>Sn(i,t)),s=new pn(n);return new Ss(e.path,s)}isEqual(e){return e instanceof Au&&Nt(this.Sc,e.Sc)}}class vu extends Qt{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){const t=dm(this,e,!0),n=this.Sc.map(i=>Sn(i,t)),s=new _n(n);return new Ss(e.path,s)}isEqual(e){return e instanceof vu&&Nt(this.Sc,e.Sc)}}class bu extends Qt{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new rr(e.serializer,kd(e.serializer,this.bc));return new Ss(e.path,t)}isEqual(e){return e instanceof bu&&this.bc===e.bc}}function Ru(r,e,t,n){const s=r.I(1,e,t);Pu("Data must be an object, but it was:",s,n);const i=[],o=Re.empty();$t(n,(c,h)=>{const f=Vu(e,c,t);h=Ee(h);const m=s.fc(f);if(h instanceof xs)i.push(f);else{const p=Sn(h,m);p!=null&&(i.push(f),o.set(f,p))}});const u=new Be(i);return new lm(o,u,s.fieldTransforms)}function Su(r,e,t,n,s,i){const o=r.I(1,e,t),u=[ht(e,n,t)],c=[s];if(i.length%2!=0)throw new V(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)u.push(ht(e,i[p])),c.push(i[p+1]);const h=[],f=Re.empty();for(let p=u.length-1;p>=0;--p)if(!pm(h,u[p])){const v=u[p];let C=c[p];C=Ee(C);const N=o.fc(v);if(C instanceof xs)h.push(v);else{const x=Sn(C,N);x!=null&&(h.push(v),f.set(v,x))}}const m=new Be(h);return new lm(f,m,o.fieldTransforms)}function fm(r,e,t,n=!1){return Sn(t,r.I(n?4:3,e))}function Sn(r,e){if(gm(r=Ee(r)))return Pu("Unsupported field value:",e,r),mm(r,e);if(r instanceof Qt)return function(n,s){if(!hm(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(n,s){const i=[];let o=0;for(const u of n){let c=Sn(u,s.gc(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(r,e)}return function(n,s){if((n=Ee(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return kd(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=ee.fromDate(n);return{timestampValue:sr(s.serializer,i)}}if(n instanceof ee){const i=new ee(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:sr(s.serializer,i)}}if(n instanceof Je)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Fe)return{bytesValue:Qd(s.serializer,n._byteString)};if(n instanceof ne){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ka(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Ke)return function(o,u){const c=o instanceof Ke?o.toArray():o;return{mapValue:{fields:{[Ma]:{stringValue:Oa},[Zn]:{arrayValue:{values:c.map(f=>{if(typeof f!="number")throw u.yc("VectorValues must only contain numeric values.");return Ua(u.serializer,f)})}}}}}}(n,s);if(sf(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Oi(n)}`)}(r,e)}function mm(r,e){const t={};return ad(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$t(r,(n,s)=>{const i=Sn(s,e.dc(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function gm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ee||r instanceof Je||r instanceof Fe||r instanceof ne||r instanceof Qt||r instanceof Ke||sf(r))}function Pu(r,e,t){if(!gm(t)||!jh(t)){const n=Oi(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function ht(r,e,t){if((e=Ee(e))instanceof bn)return e._internalPath;if(typeof e=="string")return Vu(r,e);throw ki("Field path arguments must be of type string or ",r,!1,void 0,t)}const NE=new RegExp("[~\\*/\\[\\]]");function Vu(r,e,t){if(e.search(NE)>=0)throw ki(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new bn(...e.split("."))._internalPath}catch{throw ki(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function ki(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${n}`),o&&(c+=` in document ${s}`),c+=")"),new V(R.INVALID_ARGUMENT,u+r+c)}function pm(r,e){return r.some(t=>t.isEqual(e))}/**
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
 */class Cu{convertValue(e,t="none"){switch(Ot(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(lt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return $t(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[Zn].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>le(o.doubleValue));return new Ke(t)}convertGeoPoint(e){return new Je(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=ji(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ms(e));default:return null}}convertTimestamp(e){const t=ct(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=K.fromString(e);L(rf(n),9688,{name:e});const s=new Mt(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(t)||ge(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class Wt extends Cu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ne(this.firestore,null,t)}}/**
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
 */function kE(){return new xs("deleteField")}function ME(){return new wu("serverTimestamp")}function OE(...r){return new Au("arrayUnion",r)}function FE(...r){return new vu("arrayRemove",r)}function LE(r){return new bu("increment",r)}function BE(r){return new Ke(r)}/**
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
 */function UE(r){var n;const e=de(Q(r.firestore,se)),t=(n=e._onlineComponents)==null?void 0:n.datastore.serializer;return t===void 0?null:Qi(t,Ne(r._query)).ft}function qE(r,e){var i;const t=od(e,(o,u)=>new qd(u,o.aggregateType,o._internalFieldPath)),n=de(Q(r.firestore,se)),s=(i=n._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:Zd(s,bd(r._query),t,!0).request}const lh="@firebase/firestore",hh="4.14.0";/**
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
 */function $n(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}/**
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
 */class hr{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class _m{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new Re({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class Ts{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new jE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(ht("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class jE extends Ts{data(){return super.data()}}/**
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
 */function ym(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new V(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Du{}class wr extends Du{}function zE(r,e,...t){let n=[];e instanceof Du&&n.push(e),n=n.concat(t),function(i){const o=i.filter(c=>c instanceof Pn).length,u=i.filter(c=>c instanceof Ar).length;if(o>1||o>0&&u>0)throw new V(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Ar extends wr{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ar(e,t,n)}_apply(e){const t=this._parse(e);return Em(e._query,t),new Te(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=Rn(e.firestore);return function(i,o,u,c,h,f,m){let p;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){fh(m,f);const C=[];for(const N of m)C.push(dh(c,i,N));p={arrayValue:{values:C}}}else p=dh(c,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||fh(m,f),p=fm(u,o,m,f==="in"||f==="not-in");return W.create(h,f,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function $E(r,e,t){const n=e,s=ht("where",r);return Ar._create(s,n,t)}class Pn extends Du{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Pn(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:te.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const u=i.getFlattenedFilters();for(const c of u)Em(o,c),o=ua(o,c)}(e._query,t),new Te(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function GE(...r){return r.forEach(e=>Tm("or",e)),Pn._create("or",r)}function KE(...r){return r.forEach(e=>Tm("and",e)),Pn._create("and",r)}class so extends wr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new so(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ys(i,o)}(e._query,this._field,this._direction);return new Te(e.firestore,e.converter,z_(e._query,t))}}function QE(r,e="asc"){const t=e,n=ht("orderBy",r);return so._create(n,t)}class Ns extends wr{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Ns(e,t,n)}_apply(e){return new Te(e.firestore,e.converter,bi(e._query,this._limit,this._limitType))}}function WE(r){return zh("limit",r),Ns._create("limit",r,"F")}function HE(r){return zh("limitToLast",r),Ns._create("limitToLast",r,"L")}class ks extends wr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new ks(e,t,n)}_apply(e){const t=Im(e,this.type,this._docOrFields,this._inclusive);return new Te(e.firestore,e.converter,$_(e._query,t))}}function JE(...r){return ks._create("startAt",r,!0)}function YE(...r){return ks._create("startAfter",r,!1)}class Ms extends wr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ms(e,t,n)}_apply(e){const t=Im(e,this.type,this._docOrFields,this._inclusive);return new Te(e.firestore,e.converter,G_(e._query,t))}}function XE(...r){return Ms._create("endBefore",r,!1)}function ZE(...r){return Ms._create("endAt",r,!0)}function Im(r,e,t,n){if(t[0]=Ee(t[0]),t[0]instanceof Ts)return function(i,o,u,c,h){if(!c)throw new V(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of jn(i))if(m.field.isKeyField())f.push(mn(o,c.key));else{const p=c.data.field(m.field);if(qi(p))throw new V(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const v=m.field.canonicalString();throw new V(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}f.push(p)}return new Lt(f,h)}(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=Rn(r.firestore);return function(o,u,c,h,f,m){const p=o.explicitOrderBy;if(f.length>p.length)throw new V(R.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let C=0;C<f.length;C++){const N=f[C];if(p[C].field.isKeyField()){if(typeof N!="string")throw new V(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof N}`);if(!La(o)&&N.indexOf("/")!==-1)throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${N}' contains a slash.`);const x=o.path.child(K.fromString(N));if(!k.isDocumentKey(x))throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${x}' is not because it contains an odd number of segments.`);const B=new k(x);v.push(mn(u,B))}else{const x=fm(c,h,N);v.push(x)}}return new Lt(v,m)}(r._query,r.firestore._databaseId,s,e,t,n)}}function dh(r,e,t){if(typeof(t=Ee(t))=="string"){if(t==="")throw new V(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!La(e)&&t.indexOf("/")!==-1)throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(K.fromString(t));if(!k.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return mn(r,new k(n))}if(t instanceof ne)return mn(r,t._key);throw new V(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Oi(t)}.`)}function fh(r,e){if(!Array.isArray(r)||r.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Em(r,e){const t=function(s,i){for(const o of s)for(const u of o.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Tm(r,e){if(!(e instanceof Ar||e instanceof Pn))throw new V(R.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function io(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class xu extends Cu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ne(this.firestore,null,t)}}/**
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
 */function eT(r){return new hr("sum",ht("sum",r))}function tT(r){return new hr("avg",ht("average",r))}function wm(){return new hr("count")}function nT(r,e){var t,n;return r instanceof hr&&e instanceof hr&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)==null?void 0:t.canonicalString())===((n=e._internalFieldPath)==null?void 0:n.canonicalString())}function rT(r,e){return Tu(r.query,e.query)&&Nt(r.data(),e.data())}/**
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
 */function sT(r){return Am(r,{count:wm()})}function Am(r,e){const t=Q(r.firestore,se),n=de(t),s=od(e,(i,o)=>new qd(o,i.aggregateType,i._internalFieldPath));return iE(n,r._query,s).then(i=>function(u,c,h){const f=new Wt(u);return new _m(c,f,h)}(t,r,i))}class iT{constructor(e){this.kind="memory",this._onlineComponentProvider=Ut.provider,this._offlineComponentProvider=e!=null&&e.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new _u(void 0)}}toJSON(){return{kind:this.kind}}}class oT{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=vm(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class aT{constructor(){this.kind="memoryEager",this._offlineComponentProvider=cr.provider}toJSON(){return{kind:this.kind}}}class uT{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new _u(e)}}toJSON(){return{kind:this.kind}}}function cT(){return new aT}function lT(r){return new uT(r==null?void 0:r.cacheSizeBytes)}function hT(r){return new iT(r)}function dT(r){return new oT(r)}class fT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ut.provider,this._offlineComponentProvider={build:t=>new yu(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class mT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ut.provider,this._offlineComponentProvider={build:t=>new Hf(t,e==null?void 0:e.cacheSizeBytes)}}}function vm(r){return new fT(r==null?void 0:r.forceOwnership)}function gT(){return new mT}/**
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
 *//**
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
 */const bm="NOT SUPPORTED";class at{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qe extends Ts{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new as(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(ht("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=qe._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}function pT(r,e,t){if(An(e,qe._jsonSchema)){if(e.bundle===bm)throw new V(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=vn(r._databaseId),s=tm(e.bundle,n),i=s.Qu(),o=new hu(s.getMetadata(),n);for(const f of i)o.Ga(f);const u=o.documents;if(u.length!==1)throw new V(R.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${u.length} documents.`);const c=Ki(n,u[0].document),h=new k(K.fromString(e.bundleName));return new qe(r,new xu(r),h,c,new at(!1,!1),t||null)}}qe._jsonSchemaVersion="firestore/documentSnapshot/1.0",qe._jsonSchema={type:ye("string",qe._jsonSchemaVersion),bundleSource:ye("string","DocumentSnapshot"),bundleName:ye("string"),bundle:ye("string")};class as extends qe{data(e={}){return super.data(e)}}class je{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new at(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new as(this._firestore,this._userDataWriter,n.key,n,new at(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(u=>{const c=new as(s._firestore,s._userDataWriter,u.doc.key,u.doc,new at(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const c=new as(s._firestore,s._userDataWriter,u.doc.key,u.doc,new at(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:yT(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=je._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Mi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function _T(r,e,t){if(An(e,je._jsonSchema)){if(e.bundle===bm)throw new V(R.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=vn(r._databaseId),s=tm(e.bundle,n),i=s.Qu(),o=new hu(s.getMetadata(),n);for(const p of i)o.Ga(p);if(o.queries.length!==1)throw new V(R.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const u=Wi(o.queries[0].bundledQuery),c=o.documents;let h=new fn;c.map(p=>{const v=Ki(n,p.document);h=h.add(v)});const f=wn.fromInitialDocuments(u,h,$(),!1,!1),m=new Te(r,t||null,u);return new je(r,new xu(r),m,f)}}function yT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:r})}}function IT(r,e){return r instanceof qe&&e instanceof qe?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof je&&e instanceof je&&r._firestore===e._firestore&&Tu(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
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
 */je._jsonSchemaVersion="firestore/querySnapshot/1.0",je._jsonSchema={type:ye("string",je._jsonSchemaVersion),bundleSource:ye("string","QuerySnapshot"),bundleName:ye("string"),bundle:ye("string")};const ET={maxAttempts:5};/**
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
 */class Rm{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Rn(e)}set(e,t,n){this._verifyNotCommitted();const s=Pt(e,this._firestore),i=io(s.converter,t,n),o=ro(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,he.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=Pt(e,this._firestore);let o;return o=typeof(t=Ee(t))=="string"||t instanceof bn?Su(this._dataReader,"WriteBatch.update",i._key,t,n,s):Ru(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,he.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Pt(e,this._firestore);return this._mutations=this._mutations.concat(new pr(t._key,he.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Pt(r,e){if((r=Ee(r)).firestore!==e)throw new V(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */class TT{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Rn(e)}get(e){const t=Pt(e,this._firestore),n=new xu(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return F(24041);const i=s[0];if(i.isFoundDocument())return new Ts(this._firestore,n,i.key,i,t.converter);if(i.isNoDocument())return new Ts(this._firestore,n,t._key,null,t.converter);throw F(18433,{doc:i})})}set(e,t,n){const s=Pt(e,this._firestore),i=io(s.converter,t,n),o=ro(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,o),this}update(e,t,n,...s){const i=Pt(e,this._firestore);let o;return o=typeof(t=Ee(t))=="string"||t instanceof bn?Su(this._dataReader,"Transaction.update",i._key,t,n,s):Ru(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=Pt(e,this._firestore);return this._transaction.delete(t._key),this}}/**
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
 */class Sm extends TT{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Pt(e,this._firestore),n=new Wt(this._firestore);return super.get(e).then(s=>new qe(this._firestore,n,t._key,s._document,new at(!1,!1),t.converter))}}function wT(r,e,t){r=Q(r,se);const n={...ET,...t};(function(o){if(o.maxAttempts<1)throw new V(R.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n);const s=de(r);return uE(s,i=>e(new Sm(r,i)),n)}/**
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
 */function AT(r){r=Q(r,ne);const e=Q(r.firestore,se),t=de(e);return Zf(t,r._key).then(n=>Nu(e,r,n))}function vT(r){r=Q(r,ne);const e=Q(r.firestore,se),t=de(e),n=new Wt(e);return rE(t,r._key).then(s=>new qe(e,n,r._key,s,new at(s!==null&&s.hasLocalMutations,!0),r.converter))}function bT(r){r=Q(r,ne);const e=Q(r.firestore,se),t=de(e);return Zf(t,r._key,{source:"server"}).then(n=>Nu(e,r,n))}function RT(r){r=Q(r,Te);const e=Q(r.firestore,se),t=de(e),n=new Wt(e);return ym(r._query),em(t,r._query).then(s=>new je(e,n,r,s))}function ST(r){r=Q(r,Te);const e=Q(r.firestore,se),t=de(e),n=new Wt(e);return sE(t,r._query).then(s=>new je(e,n,r,s))}function PT(r){r=Q(r,Te);const e=Q(r.firestore,se),t=de(e),n=new Wt(e);return em(t,r._query,{source:"server"}).then(s=>new je(e,n,r,s))}function VT(r,e,t){r=Q(r,ne);const n=Q(r.firestore,se),s=io(r.converter,e,t),i=Rn(n);return vr(n,[ro(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,he.none())])}function CT(r,e,t,...n){r=Q(r,ne);const s=Q(r.firestore,se),i=Rn(s);let o;return o=typeof(e=Ee(e))=="string"||e instanceof bn?Su(i,"updateDoc",r._key,e,t,n):Ru(i,"updateDoc",r._key,e),vr(s,[o.toMutation(r._key,he.exists(!0))])}function DT(r){return vr(Q(r.firestore,se),[new pr(r._key,he.none())])}function xT(r,e){const t=Q(r.firestore,se),n=im(r),s=io(r.converter,e),i=Rn(r.firestore);return vr(t,[ro(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,he.exists(!1))]).then(()=>n)}function wa(r,...e){var h,f,m;r=Ee(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||$n(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if($n(e[n])){const p=e[n];e[n]=(h=p.next)==null?void 0:h.bind(p),e[n+1]=(f=p.error)==null?void 0:f.bind(p),e[n+2]=(m=p.complete)==null?void 0:m.bind(p)}let i,o,u;if(r instanceof ne)o=Q(r.firestore,se),u=mr(r._key.path),i={next:p=>{e[n]&&e[n](Nu(o,r,p))},error:e[n+1],complete:e[n+2]};else{const p=Q(r,Te);o=Q(p.firestore,se),u=p._query;const v=new Wt(o);i={next:C=>{e[n]&&e[n](new je(o,v,p,C))},error:e[n+1],complete:e[n+2]},ym(r._query)}const c=de(o);return nE(c,u,s,i)}function NT(r,e,...t){const n=Ee(r),s=function(c){const h={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const m of f){if(!(m in c)){h.error=`snapshotJson missing required field: ${m}`;break}const p=c[m];if(typeof p!="string"){h.error=`snapshotJson field '${m}' must be a string.`;break}if(p.length===0){h.error=`snapshotJson field '${m}' cannot be an empty string.`;break}m==="bundle"?h.bundle=p:m==="bundleName"?h.bundleName=p:m==="bundleSource"&&(h.bundleSource=p)}return h}(e);if(s.error)throw new V(R.INVALID_ARGUMENT,s.error);let i,o=0;if(typeof t[o]!="object"||$n(t[o])||(i=t[o++]),s.bundleSource==="QuerySnapshot"){let u=null;if(typeof t[o]=="object"&&$n(t[o])){const c=t[o++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:t[o++],error:t[o++],complete:t[o++]};return function(h,f,m,p,v){let C,N=!1;return Ta(h,f.bundle).then(()=>cm(h,f.bundleName)).then(B=>{B&&!N&&(v&&B.withConverter(v),C=wa(B,m||{},p))}).catch(B=>(p.error&&p.error(B),()=>{})),()=>{N||(N=!0,C&&C())}}(n,s,i,u,t[o])}if(s.bundleSource==="DocumentSnapshot"){let u=null;if(typeof t[o]=="object"&&$n(t[o])){const c=t[o++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:t[o++],error:t[o++],complete:t[o++]};return function(h,f,m,p,v){let C,N=!1;return Ta(h,f.bundle).then(()=>{if(!N){const B=new ne(h,v||null,k.fromPath(f.bundleName));C=wa(B,m||{},p)}}).catch(B=>(p.error&&p.error(B),()=>{})),()=>{N||(N=!0,C&&C())}}(n,s,i,u,t[o])}throw new V(R.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function kT(r,e){r=Q(r,se);const t=de(r),n=$n(e)?e:{next:e};return aE(t,n)}function vr(r,e){const t=de(r);return oE(t,e)}function Nu(r,e,t){const n=t.docs.get(e._key),s=new Wt(r);return new qe(r,s,e._key,n,new at(t.hasPendingWrites,t.fromCache),e.converter)}function MT(r){return r=Q(r,se),de(r),new Rm(r,e=>vr(r,e))}/**
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
 */function OT(r,e){r=Q(r,se);const t=de(r);if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return ze("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(i){const o=typeof i=="string"?function(h){try{return JSON.parse(h)}catch(f){throw new V(R.INVALID_ARGUMENT,"Failed to parse JSON: "+(f==null?void 0:f.message))}}(i):i,u=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const h=mh(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const m of c.fields){const p=mh(m,"fieldPath"),v=Vu("setIndexConfiguration",p);m.arrayConfig==="CONTAINS"?f.push(new hn(v,2)):m.order==="ASCENDING"?f.push(new hn(v,0)):m.order==="DESCENDING"&&f.push(new hn(v,1))}u.push(new Qn(Qn.UNKNOWN_ID,h,f,Wn.empty()))}return u}(e);return hE(t,n)}function mh(r,e){if(typeof r[e]!="string")throw new V(R.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
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
 */class Pm{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function FT(r){var s;r=Q(r,se);const e=gh.get(r);if(e)return e;if(((s=de(r)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const n=new Pm(r);return gh.set(r,n),n}function LT(r){Vm(r,!0)}function BT(r){Vm(r,!1)}function UT(r){const e=de(r._firestore);fE(e).then(t=>D("deleting all persistent cache indexes succeeded")).catch(t=>ze("deleting all persistent cache indexes failed",t))}function Vm(r,e){const t=de(r._firestore);dE(t,e).then(n=>D(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(n=>ze(`setting persistent cache index auto creation isEnabled=${e} failed`,n))}const gh=new WeakMap;/**
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
 */class qT{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return ku.instance.onExistenceFilterMismatch(e)}}class ku{constructor(){this.t=new Map}static get instance(){return si||(si=new ku,sy(si)),si}o(e){this.t.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.t;return n.set(t,e),()=>n.delete(t)}}let si=null;(function(e,t=!0){Fp(vp),Ii(new us("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),u=new se(new qp(n.getProvider("auth-internal")),new $p(o,n.getProvider("app-check-internal")),D_(o,s),o);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),Yr(lh,hh,e),Yr(lh,hh,"esm2020")})();const $T=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Cu,AggregateField:hr,AggregateQuerySnapshot:_m,Bytes:Fe,CACHE_SIZE_UNLIMITED:IE,CollectionReference:He,DocumentReference:ne,DocumentSnapshot:qe,FieldPath:bn,FieldValue:Qt,Firestore:se,FirestoreError:V,GeoPoint:Je,LoadBundleTask:om,PersistentCacheIndexManager:Pm,Query:Te,QueryCompositeFilterConstraint:Pn,QueryConstraint:wr,QueryDocumentSnapshot:as,QueryEndAtConstraint:Ms,QueryFieldFilterConstraint:Ar,QueryLimitConstraint:Ns,QueryOrderByConstraint:so,QuerySnapshot:je,QueryStartAtConstraint:ks,SnapshotMetadata:at,Timestamp:ee,Transaction:Sm,VectorValue:Ke,WriteBatch:Rm,_AutoId:Mi,_ByteString:fe,_DatabaseId:Mt,_DocumentKey:k,_EmptyAppCheckTokenProvider:Gp,_EmptyAuthCredentialsProvider:Bh,_FieldPath:ce,_TestingHooks:qT,_cast:Q,_debugAssert:Bp,_internalAggregationQueryToProtoRunAggregationQueryRequest:qE,_internalQueryToProtoQueryTarget:UE,_isBase64Available:P_,_logWarn:ze,_validateIsNotUsedTogether:qh,addDoc:xT,aggregateFieldEqual:nT,aggregateQuerySnapshotEqual:rT,and:KE,arrayRemove:FE,arrayUnion:OE,average:tT,clearIndexedDbPersistence:vE,collection:pE,collectionGroup:_E,connectFirestoreEmulator:sm,count:wm,deleteAllPersistentCacheIndexes:UT,deleteDoc:DT,deleteField:kE,disableNetwork:SE,disablePersistentCacheIndexAutoCreation:BT,doc:im,documentId:VE,documentSnapshotFromJSON:pT,enableIndexedDbPersistence:wE,enableMultiTabIndexedDbPersistence:AE,enableNetwork:RE,enablePersistentCacheIndexAutoCreation:LT,endAt:ZE,endBefore:XE,ensureFirestoreConfigured:de,executeWrite:vr,getAggregateFromServer:Am,getCountFromServer:sT,getDoc:AT,getDocFromCache:vT,getDocFromServer:bT,getDocs:RT,getDocsFromCache:ST,getDocsFromServer:PT,getFirestore:TE,getPersistentCacheIndexManager:FT,increment:LE,initializeFirestore:EE,limit:WE,limitToLast:HE,loadBundle:Ta,memoryEagerGarbageCollector:cT,memoryLocalCache:hT,memoryLruGarbageCollector:lT,namedQuery:cm,onSnapshot:wa,onSnapshotResume:NT,onSnapshotsInSync:kT,or:GE,orderBy:QE,persistentLocalCache:dT,persistentMultipleTabManager:gT,persistentSingleTabManager:vm,query:zE,queryEqual:Tu,querySnapshotFromJSON:_T,refEqual:yE,runTransaction:wT,serverTimestamp:ME,setDoc:VT,setIndexConfiguration:OT,setLogLevel:Lp,snapshotEqual:IT,startAfter:YE,startAt:JE,sum:eT,terminate:PE,updateDoc:CT,vector:BE,waitForPendingWrites:bE,where:$E,writeBatch:MT},Symbol.toStringTag,{value:"Module"}));export{$T as a,TE as g,bp as i,Yr as r};
