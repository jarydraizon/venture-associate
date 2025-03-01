(this["webpackJsonpventure-associate"]=this["webpackJsonpventure-associate"]||[]).push([[0],{15:function(e,a,t){},17:function(e,a,t){e.exports=t(30)},27:function(e,a,t){},28:function(e,a,t){},29:function(e,a,t){},30:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(16),c=t(3),s=t(7);const o=Object(n.createContext)(null),i=e=>{let{children:a}=e;const[t,r]=Object(n.useState)(()=>{const e=localStorage.getItem("token")?{email:localStorage.getItem("userEmail")}:null;return console.log("Initial user state:",e),e}),[c,s]=Object(n.useState)(null);return l.a.createElement(o.Provider,{value:{user:t,error:c,login:async e=>{try{const t=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await t.json();if(!t.ok)throw new Error(n.error||"Login failed");if(!n.token)throw new Error("Invalid login response");{var a;const t={email:e.email,user_id:n.user_id||(null===(a=n.user)||void 0===a?void 0:a.user_id)};localStorage.setItem("token",n.token),localStorage.setItem("userEmail",e.email),r(t)}return n}catch(t){throw s(t.message),new Error(t.message)}},signup:async e=>{try{const a=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),t=await a.json();if(!a.ok)throw new Error(t.error||"Signup failed");return r(t.user),localStorage.setItem("token",t.token),t}catch(a){throw s(a.message),new Error(a.message)}},logout:()=>{localStorage.removeItem("token"),r(null),s(null)}}},a)},m=()=>Object(n.useContext)(o);var u=()=>{const e=Object(c.q)(),{user:a,logout:t}=m(),n=Object(c.o)();return l.a.createElement("nav",{className:"sidebar"},l.a.createElement("div",{className:"sidebar-content"},l.a.createElement("div",{className:"sidebar-top"},l.a.createElement("div",{className:"logo"},"boola"),l.a.createElement("div",{className:"nav-links"},l.a.createElement("button",{className:"nav-link ".concat("/ventures"===n.pathname?"active":""),onClick:()=>e("/ventures")},"Ventures"),l.a.createElement("button",{className:"nav-link ".concat("/insights"===n.pathname?"active":""),onClick:()=>e("/insights")},"Insights"))),l.a.createElement("div",{className:"sidebar-bottom"},a&&l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{className:"user-email"},a.email),l.a.createElement("button",{className:"sign-out-btn",onClick:t},"Sign Out")))))};var d=e=>{let{onSubmit:a,isLogin:t}=e;const[r,c]=Object(n.useState)(""),[s,o]=Object(n.useState)(""),[i,m]=Object(n.useState)("");return l.a.createElement("form",{onSubmit:async e=>{e.preventDefault(),m("");try{await a({email:r,password:s})}catch(t){m(t.message)}},className:"auth-form"},l.a.createElement("input",{type:"email",value:r,onChange:e=>c(e.target.value),placeholder:"Email",required:!0}),l.a.createElement("input",{type:"password",value:s,onChange:e=>o(e.target.value),placeholder:"Password",required:!0}),i&&l.a.createElement("div",{className:"error-message"},i),l.a.createElement("button",{type:"submit"},t?"Sign In":"Sign Up"))},p=t(31);var E=()=>{const e=Object(c.q)(),[a,t]=Object(n.useState)([]),[r,s]=Object(n.useState)("");return Object(n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("token");if(!e)return void s("No authentication token found");const a={Authorization:"Bearer ".concat(e)},n=await p.a.get("/api/ventures",{headers:a});t(n.data.ventures||[])}catch(r){var e,a;console.error("Error fetching data:",r.response||r),s((null===(e=r.response)||void 0===e||null===(a=e.data)||void 0===a?void 0:a.error)||"Failed to fetch data")}})()},[]),l.a.createElement("div",{className:"venture-list"},r&&l.a.createElement("p",{className:"error"},r),a.map(a=>l.a.createElement("div",{key:a.venture_id,className:"venture-card",onClick:()=>e("/ventures/".concat(a.name))},l.a.createElement("h3",null,a.name),l.a.createElement("p",null,a.description),l.a.createElement("div",{className:"meta"},new Date(a.created_at).toLocaleDateString()," \xb7 ",a.active?"Active":"Inactive"))))};t(27);var v=()=>l.a.createElement("div",{className:"ventures-page"},l.a.createElement("h1",{className:"welcome-title"},"Welcome to your portfolio"),l.a.createElement("hr",{className:"separator"}),l.a.createElement("div",{className:"ventures-section"},l.a.createElement("h2",{className:"section-title"},"My ventures"),l.a.createElement("button",{className:"create-new"},"+ Create new"),l.a.createElement(E,null)));var b=function(){return l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",null,"Insights"),l.a.createElement("p",null,"Coming soon..."))};var g=()=>{const e=Object(c.q)();return l.a.createElement("div",{className:"home-page"},l.a.createElement("div",{className:"hero-section"},l.a.createElement("h1",null,"Your AI Venture Associate"),l.a.createElement("h2",null,"Make better investment decisions with AI-powered insights"),l.a.createElement("button",{className:"cta-button",onClick:()=>e("/login")},"Get Started")))},N=(t(15),t(5));t(28),t(29);function h(e){let{ventureName:a,competitorId:t,fullWidth:r}=e;const[c,s]=Object(n.useState)([]),[o,i]=Object(n.useState)(!0),[m,u]=Object(n.useState)(""),[d,E]=Object(n.useState)(!1),[v,b]=Object(n.useState)(""),[g,h]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""}),y=()=>{const e="/api/venture-files/".concat(a);return t?"".concat(e,"/competitors/").concat(t):e},C=async()=>{try{i(!0),u(""),await k()}catch(e){console.error("Error loading data:",e),u("Failed to load data. Please try again."),i(!1)}};Object(n.useEffect)(()=>{C()},[a,t]),Object(n.useEffect)(()=>{a&&C()},[a,t]);const w=e=>{const{name:a,value:t}=e.target;h(e=>Object(N.a)(Object(N.a)({},e),{},{[a]:t}))};if(o)return l.a.createElement("div",{className:"loading"},"Loading data...");if(m)return l.a.createElement("div",{className:"error"},m);const k=async()=>{try{i(!0);const e="".concat(y(),"/files"),a=await p.a.get(e,f());a.data.files&&s(a.data.files),i(!1)}catch(m){console.error("Error fetching files:",m),u("Failed to load files"),i(!1)}};return l.a.createElement("div",{className:"venture-file-manager ".concat(r?"full-width":"")},!r&&l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,t?"Competitor Details":"Venture Details"),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Name:"),l.a.createElement("input",{type:"text",name:"name",value:g.name||"",onChange:w,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:g.industry||"",onChange:w,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:g.website||"",onChange:w,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:g.regions||"",onChange:w,placeholder:"Regions of operation"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:g.description||"",onChange:w,placeholder:"Description"})),l.a.createElement("button",{onClick:async()=>{try{const e=y();await p.a.post("".concat(e,"/details"),g),alert("Details saved successfully")}catch(e){console.error("Error saving details:",e),u("Failed to save details")}},className:"save-btn"},"Save Details")),l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,"Important URLs"),l.a.createElement("p",{className:"helper-text"},"Enter one URL per line (website, landing pages, competitors, etc.)"),l.a.createElement("textarea",{value:v,onChange:e=>b(e.target.value),placeholder:"https://example.com",rows:5}),l.a.createElement("button",{onClick:async()=>{try{const e=v.split("\n").filter(e=>e.trim()),a=y();await p.a.post("".concat(a,"/urls"),{urls:e}),alert("URLs saved successfully")}catch(e){console.error("Error saving URLs:",e),u("Failed to save URLs")}},className:"save-btn"},"Save URLs")),l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,"Uploaded Files"),l.a.createElement("div",{className:"file-upload"},l.a.createElement("label",{className:"upload-btn"},"Upload Files",l.a.createElement("input",{type:"file",multiple:!0,onChange:async e=>{const a=e.target.files;if(!a.length)return;const t=new FormData;for(let l=0;l<a.length;l++)t.append("files",a[l]);try{E(!0);const e=y();await p.a.post("".concat(e,"/upload"),t,{headers:{"Content-Type":"multipart/form-data"}}),C(),E(!1)}catch(n){console.error("Upload error:",n),u("File upload failed"),E(!1)}},disabled:d,style:{display:"none"}})),d&&l.a.createElement("span",{className:"uploading"},"Uploading...")),l.a.createElement("div",{className:"files-list"},c.length>0?c.map((e,a)=>l.a.createElement("div",{key:a,className:"file-item"},l.a.createElement("span",{className:"file-name"},e.name),l.a.createElement("a",{href:e.path,download:!0,className:"download-link"},"Download"))):l.a.createElement("p",{className:"no-files"},"No files uploaded yet"))))}const f=()=>{const e=localStorage.getItem("token");return{headers:{Authorization:"Bearer ".concat(e)}}};var y=()=>{const{ventureName:e}=Object(c.s)(),[a,t]=Object(n.useState)("venture"),[r,s]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""}),[o,i]=Object(n.useState)([]),[m,u]=Object(n.useState)(null),[d,E]=Object(n.useState)(!0),[v,b]=Object(n.useState)(""),[g,f]=Object(n.useState)(!1),[y,C]=Object(n.useState)(!1),[w,k]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""});Object(n.useEffect)(()=>{e&&(async()=>{try{E(!0);const a=localStorage.getItem("token"),t={headers:{Authorization:"Bearer ".concat(a)}},n=await p.a.get("/api/venture-files/".concat(e,"/details"),t);n.data.details&&s(n.data.details);const l=await p.a.get("/api/venture-files/".concat(e,"/competitors"),t);l.data.competitors&&i(l.data.competitors.sort((e,a)=>e.name.localeCompare(a.name))),E(!1)}catch(a){console.error("Error loading venture data:",a),b("Failed to load venture data"),E(!1)}})()},[e]);const O=e=>{const{name:a,value:t}=e.target;s(e=>Object(N.a)(Object(N.a)({},e),{},{[a]:t}))},S=e=>{const{name:a,value:t}=e.target;k(e=>Object(N.a)(Object(N.a)({},e),{},{[a]:t}))},j=e=>{const{name:a,value:t}=e.target;u(e=>Object(N.a)(Object(N.a)({},e),{},{[a]:t}))};return d?l.a.createElement("div",{className:"loading-screen"},"Loading venture data..."):v?l.a.createElement("div",{className:"error-message"},v):l.a.createElement("div",{className:"venture-page"},l.a.createElement("div",{className:"venture-header"},l.a.createElement("h1",null,e),l.a.createElement("div",{className:"tabs"},l.a.createElement("button",{className:"tab-button ".concat("venture"===a?"active":""),onClick:()=>t("venture")},"Venture Details"),l.a.createElement("button",{className:"tab-button ".concat("competitors"===a?"active":""),onClick:()=>{t("competitors"),u(null)}},"Competitors"),l.a.createElement("button",{className:"tab-button ".concat("add-data"===a?"active":""),onClick:()=>t("add-data")},"Add Data"))),l.a.createElement("div",{className:"panel-container"},"venture"===a&&l.a.createElement("div",{className:"panel venture-details-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Venture Details"),l.a.createElement("div",{className:"panel-actions"},l.a.createElement("button",{className:"action-button",onClick:()=>g?(async()=>{try{await p.a.post("/api/venture-files/".concat(e,"/details"),r),f(!1),alert("Venture details saved successfully")}catch(a){console.error("Error saving venture details:",a),alert("Failed to save venture details")}})():f(!0)},g?"Save Details":"Edit Details"),l.a.createElement("button",{className:"action-button",onClick:()=>t("add-data")},"Add Data"))),l.a.createElement("div",{className:"panel-content"},g?l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:r.name||"",onChange:O,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:r.industry||"",onChange:O,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:r.website||"",onChange:O,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:r.regions||"",onChange:O,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:r.description||"",onChange:O,placeholder:"Describe this venture",rows:5}))):l.a.createElement("div",{className:"info-display"},Object.keys(r).some(e=>r[e])?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("p",null,r.name||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("p",null,r.industry||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("p",null,r.website?l.a.createElement("a",{href:r.website,target:"_blank",rel:"noopener noreferrer"},r.website):"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("p",null,r.regions||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("p",{className:"description"},r.description||"No description available"))):l.a.createElement("div",{className:"empty-state"},l.a.createElement("p",null,"No venture details available. Click 'Edit Details' to add information."))),l.a.createElement("div",{className:"venture-files-section"},l.a.createElement("h3",null,"Associated Files & URLs"),l.a.createElement(h,{ventureName:e})))),"competitors"===a&&!m&&l.a.createElement("div",{className:"panel competitors-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Competitors"),l.a.createElement("button",{className:"action-button",onClick:()=>t("add-competitor")},"Add Competitor")),l.a.createElement("div",{className:"panel-content"},o.length>0?l.a.createElement("div",{className:"competitors-list"},o.map((e,a)=>l.a.createElement("button",{key:a,className:"competitor-button",onClick:()=>(e=>{u(e),t("competitor"),C(!1)})(e)},e.name))):l.a.createElement("div",{className:"empty-state"},l.a.createElement("p",null,"No competitors added yet. Click 'Add Competitor' to get started.")))),"add-competitor"===a&&l.a.createElement("div",{className:"panel add-competitor-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add New Competitor"),l.a.createElement("button",{className:"action-button",onClick:()=>t("competitors")},"Back to Competitors")),l.a.createElement("div",{className:"panel-content"},l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:w.name,onChange:S,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:w.industry,onChange:S,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:w.website,onChange:S,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:w.regions,onChange:S,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:w.description,onChange:S,placeholder:"Describe this competitor",rows:5})),l.a.createElement("button",{className:"submit-button",onClick:async()=>{try{const a=(await p.a.post("/api/venture-files/".concat(e,"/competitors"),w)).data.competitor;i(e=>[...e,a].sort((e,a)=>e.name.localeCompare(a.name))),k({name:"",description:"",industry:"",website:"",regions:""}),u(a),t("competitor"),alert("Competitor added successfully")}catch(a){console.error("Error adding competitor:",a),alert("Failed to add competitor")}},disabled:!w.name},"Add Competitor")))),"competitor"===a&&m&&l.a.createElement("div",{className:"panel competitor-details-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Competitor: ",m.name),l.a.createElement("div",{className:"panel-actions"},l.a.createElement("button",{className:"action-button",onClick:()=>t("competitors")},"Back to List"),l.a.createElement("button",{className:"action-button",onClick:()=>y?(async()=>{try{m&&(await p.a.put("/api/venture-files/".concat(e,"/competitors/").concat(m.id),m),i(e=>e.map(e=>e.id===m.id?m:e).sort((e,a)=>e.name.localeCompare(a.name))),C(!1),alert("Competitor details updated successfully"))}catch(a){console.error("Error updating competitor:",a),alert("Failed to update competitor details")}})():C(!0)},y?"Save Details":"Edit Details"),l.a.createElement("button",{className:"action-button",onClick:()=>t("add-data-competitor")},"Add Data"))),l.a.createElement("div",{className:"panel-content"},y?l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:m.name||"",onChange:j,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:m.industry||"",onChange:j,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:m.website||"",onChange:j,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:m.regions||"",onChange:j,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:m.description||"",onChange:j,placeholder:"Describe this competitor",rows:5}))):l.a.createElement("div",{className:"info-display"},l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("p",null,m.name||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("p",null,m.industry||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("p",null,m.website?l.a.createElement("a",{href:m.website,target:"_blank",rel:"noopener noreferrer"},m.website):"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("p",null,m.regions||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("p",{className:"description"},m.description||"No description available"))),l.a.createElement("div",{className:"competitor-files-section"},l.a.createElement("h3",null,"Associated Files & URLs"),l.a.createElement(h,{ventureName:e,competitorId:m.id})))),"add-data"===a&&l.a.createElement("div",{className:"panel add-data-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add Data for ",e),l.a.createElement("button",{className:"action-button",onClick:()=>t("venture")},"Back to Venture Details")),l.a.createElement("div",{className:"panel-content"},l.a.createElement(h,{ventureName:e,fullWidth:!0}))),"add-data-competitor"===a&&m&&l.a.createElement("div",{className:"panel add-data-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add Data for ",m.name),l.a.createElement("button",{className:"action-button",onClick:()=>t("competitor")},"Back to Competitor Details")),l.a.createElement("div",{className:"panel-content"},l.a.createElement(h,{ventureName:e,competitorId:m.id,fullWidth:!0})))))};function C(e){let{children:a}=e;const{user:t}=m();return t?a:l.a.createElement(c.a,{to:"/"})}function w(){const{user:e,login:a,signup:t}=m(),[n,r]=l.a.useState(!0);return l.a.createElement("div",{className:"app-container"},e&&l.a.createElement(u,null),l.a.createElement("div",{className:"main-content"},l.a.createElement(c.d,null,l.a.createElement(c.b,{path:"/ventures",element:l.a.createElement(C,null,l.a.createElement(v,null))}),l.a.createElement(c.b,{path:"/ventures/:ventureName",element:l.a.createElement(C,null,l.a.createElement(y,null))}),l.a.createElement(c.b,{path:"/insights",element:l.a.createElement(C,null,l.a.createElement(b,null))}),l.a.createElement(c.b,{path:"/",element:e?l.a.createElement(c.a,{to:"/ventures"}):l.a.createElement(g,null)}),l.a.createElement(c.b,{path:"/login",element:e?l.a.createElement(c.a,{to:"/ventures"}):l.a.createElement("div",{className:"auth-container"},l.a.createElement("h1",null,n?"Sign In":"Sign Up"),l.a.createElement(d,{onSubmit:n?a:t,isLogin:n}),l.a.createElement("button",{className:"switch-auth",onClick:()=>r(!n)},n?"Need an account? Sign up":"Have an account? Sign in"))}))))}var k=function(){return l.a.createElement(i,null,l.a.createElement(s.a,null,l.a.createElement(w,null)))};const O=document.getElementById("root");Object(r.createRoot)(O).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(k,null)))}},[[17,1,2]]]);
//# sourceMappingURL=main.8e742835.chunk.js.map