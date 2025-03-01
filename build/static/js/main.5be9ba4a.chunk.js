(this["webpackJsonpventure-associate"]=this["webpackJsonpventure-associate"]||[]).push([[0],{15:function(e,t,a){},17:function(e,t,a){e.exports=a(30)},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),o=a(3),c=a(7);const s=Object(n.createContext)(null),i=e=>{let{children:t}=e;const[a,r]=Object(n.useState)(()=>{const e=localStorage.getItem("token")?{email:localStorage.getItem("userEmail")}:null;return console.log("Initial user state:",e),e}),[o,c]=Object(n.useState)(null);return l.a.createElement(s.Provider,{value:{user:a,error:o,login:async e=>{try{const a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await a.json();if(!a.ok)throw new Error(n.error||"Login failed");if(!n.token)throw new Error("Invalid login response");{var t;const a={email:e.email,user_id:n.user_id||(null===(t=n.user)||void 0===t?void 0:t.user_id)};localStorage.setItem("token",n.token),localStorage.setItem("userEmail",e.email),r(a)}return n}catch(a){throw c(a.message),new Error(a.message)}},signup:async e=>{try{const t=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json();if(!t.ok)throw new Error(a.error||"Signup failed");return r(a.user),localStorage.setItem("token",a.token),a}catch(t){throw c(t.message),new Error(t.message)}},logout:()=>{localStorage.removeItem("token"),r(null),c(null)}}},t)},m=()=>Object(n.useContext)(s);var u=()=>{const e=Object(o.q)(),{user:t,logout:a}=m(),n=Object(o.o)();return l.a.createElement("nav",{className:"sidebar"},l.a.createElement("div",{className:"sidebar-content"},l.a.createElement("div",{className:"sidebar-top"},l.a.createElement("div",{className:"logo"},"boola"),l.a.createElement("div",{className:"nav-links"},l.a.createElement("button",{className:"nav-link ".concat("/ventures"===n.pathname?"active":""),onClick:()=>e("/ventures")},"Ventures"),l.a.createElement("button",{className:"nav-link ".concat("/insights"===n.pathname?"active":""),onClick:()=>e("/insights")},"Insights"))),l.a.createElement("div",{className:"sidebar-bottom"},t&&l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{className:"user-email"},t.email),l.a.createElement("button",{className:"sign-out-btn",onClick:a},"Sign Out")))))};var d=e=>{let{onSubmit:t,isLogin:a}=e;const[r,o]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[i,m]=Object(n.useState)("");return l.a.createElement("form",{onSubmit:async e=>{e.preventDefault(),m("");try{await t({email:r,password:c})}catch(a){m(a.message)}},className:"auth-form"},l.a.createElement("input",{type:"email",value:r,onChange:e=>o(e.target.value),placeholder:"Email",required:!0}),l.a.createElement("input",{type:"password",value:c,onChange:e=>s(e.target.value),placeholder:"Password",required:!0}),i&&l.a.createElement("div",{className:"error-message"},i),l.a.createElement("button",{type:"submit"},a?"Sign In":"Sign Up"))},p=a(5),E=a(31);var v=()=>{const e=Object(o.q)(),[t,a]=Object(n.useState)([]),[r,c]=Object(n.useState)(!0),[s,i]=Object(n.useState)("");return Object(n.useEffect)(()=>{(async()=>{try{c(!0);const e=localStorage.getItem("token");if(!e)return i("No authentication token found"),void c(!1);const t={Authorization:"Bearer ".concat(e)};console.log("Fetching ventures...");const n=await E.a.get("/api/ventures",{headers:t});console.log("Ventures response:",n.data),a(n.data.ventures||[]),c(!1)}catch(s){var e,t;console.error("Error fetching ventures:",s.response||s),i((null===(e=s.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||"Failed to fetch ventures"),c(!1)}})()},[]),r?l.a.createElement("div",{className:"loading"},"Loading ventures..."):l.a.createElement("div",{className:"venture-list"},s&&l.a.createElement("p",{className:"error"},s),0!==t.length||s?t.map(t=>l.a.createElement("div",{key:t.venture_id,className:"venture-card",onClick:()=>e("/ventures/".concat(t.name))},l.a.createElement("h3",null,t.name),l.a.createElement("p",null,t.description||"No description available"),l.a.createElement("div",{className:"meta"},new Date(t.created_at).toLocaleDateString()," \xb7 ",t.active?"Active":"Inactive"))):l.a.createElement("div",{className:"empty-state"},l.a.createElement("p",null,'No ventures found. Click "Create new" to add your first venture.')))};a(27);var g=()=>{const e=Object(o.q)(),[t,a]=Object(n.useState)(!1),[r,c]=Object(n.useState)({name:"",description:""}),[s,i]=Object(n.useState)(""),m=e=>{c(Object(p.a)(Object(p.a)({},r),{},{[e.target.name]:e.target.value}))};return l.a.createElement("div",{className:"ventures-page"},l.a.createElement("h1",{className:"welcome-title"},"Welcome to your portfolio"),l.a.createElement("hr",{className:"separator"}),l.a.createElement("div",{className:"ventures-section"},l.a.createElement("h2",{className:"section-title"},"My ventures"),t?l.a.createElement("div",{className:"create-venture-form"},l.a.createElement("h3",null,"Create New Venture"),s&&l.a.createElement("p",{className:"error"},s),l.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{const t=localStorage.getItem("token");if(!t)return void i("No authentication token found");const n={Authorization:"Bearer ".concat(t)};(await E.a.post("/api/ventures",r,{headers:n})).data.success&&(a(!1),e("/ventures/".concat(r.name)))}catch(s){var n,l;console.error("Error creating venture:",s.response||s),i((null===(n=s.response)||void 0===n||null===(l=n.data)||void 0===l?void 0:l.error)||"Failed to create venture")}}},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"name"},"Venture Name:"),l.a.createElement("input",{type:"text",id:"name",name:"name",value:r.name,onChange:m,required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"description"},"Description:"),l.a.createElement("textarea",{id:"description",name:"description",value:r.description,onChange:m,rows:"3"})),l.a.createElement("div",{className:"form-actions"},l.a.createElement("button",{type:"button",onClick:()=>{a(!1),c({name:"",description:""})}},"Cancel"),l.a.createElement("button",{type:"submit"},"Create")))):l.a.createElement("button",{className:"create-new",onClick:()=>{a(!0)}},"+ Create new"),l.a.createElement(v,null)))};var b=function(){return l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",null,"Insights"),l.a.createElement("p",null,"Coming soon..."))};var h=()=>{const e=Object(o.q)();return l.a.createElement("div",{className:"home-page"},l.a.createElement("div",{className:"hero-section"},l.a.createElement("h1",null,"Your AI Venture Associate"),l.a.createElement("h2",null,"Make better investment decisions with AI-powered insights"),l.a.createElement("button",{className:"cta-button",onClick:()=>e("/login")},"Get Started")))};a(15),a(28),a(29);function N(e){let{ventureName:t,competitorId:a,fullWidth:r}=e;const[o,c]=Object(n.useState)([]),[s,i]=Object(n.useState)(!0),[m,u]=Object(n.useState)(""),[d,v]=Object(n.useState)(!1),[g,b]=Object(n.useState)(""),[h,N]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""}),[f,y]=Object(n.useState)(!1),C=()=>{const e="/api/venture-files/".concat(t);return a?"".concat(e,"/competitors/").concat(a):e},w=async()=>{try{i(!0),u(""),await O()}catch(e){console.error("Error loading data:",e),u("Failed to load data. Please try again."),i(!1)}};Object(n.useEffect)(()=>{w()},[t,a]),Object(n.useEffect)(()=>{t&&w()},[t,a]);const S=e=>{const{name:t,value:a}=e.target;N(e=>Object(p.a)(Object(p.a)({},e),{},{[t]:a}))};if(s)return l.a.createElement("div",{className:"loading"},"Loading data...");if(m)return l.a.createElement("div",{className:"error"},m);const k=()=>{const e=localStorage.getItem("token");return{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}}},O=async()=>{try{i(!0);const e="".concat(C(),"/files");console.log("Fetching files from:",e);const t=k(),a=await E.a.get(e,t);console.log("Files response:",a.data),a.data.files&&c(a.data.files),i(!1)}catch(m){console.error("Error fetching files:",m),m.response&&401===m.response.status?u("Authentication failed. Please log in again."):u("Failed to load files. Please try again."),i(!1)}};return l.a.createElement("div",{className:"venture-file-manager ".concat(r?"full-width":"")},!r&&l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,a?"Competitor Details":"Venture Details"),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Name:"),l.a.createElement("input",{type:"text",name:"name",value:h.name||"",onChange:S,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:h.industry||"",onChange:S,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:h.website||"",onChange:S,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:h.regions||"",onChange:S,placeholder:"Regions of operation"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:h.description||"",onChange:S,placeholder:"Description"})),l.a.createElement("button",{onClick:async()=>{try{const e=C();await E.a.post("".concat(e,"/details"),h,k()),alert("Details saved successfully")}catch(e){console.error("Error saving details:",e),u("Failed to save details")}},className:"save-btn"},"Save Details")),l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,"Important URLs"),l.a.createElement("p",{className:"helper-text"},"Enter one URL per line (website, landing pages, competitors, etc.)"),l.a.createElement("textarea",{value:g,onChange:e=>b(e.target.value),placeholder:"https://example.com",rows:5}),l.a.createElement("button",{onClick:async()=>{try{y(!0);const e=C(),t=g.split("\n").filter(e=>""!==e.trim());await E.a.post("".concat(e,"/urls"),{urls:t},k()),alert("URLs saved successfully"),y(!1)}catch(e){console.error("Error saving URLs:",e),alert("Failed to save URLs"),y(!1)}},className:"save-btn"},"Save URLs")),l.a.createElement("div",{className:"venture-section"},l.a.createElement("h2",null,"Uploaded Files"),l.a.createElement("div",{className:"file-upload"},l.a.createElement("label",{className:"upload-btn"},"Upload Files",l.a.createElement("input",{type:"file",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t.length)return;const a=new FormData;for(let l=0;l<t.length;l++)a.append("files",t[l]);try{v(!0);const e=C();await E.a.post("".concat(e,"/upload"),a,{headers:{"Content-Type":"multipart/form-data"}}),w(),v(!1)}catch(n){console.error("Upload error:",n),u("File upload failed"),v(!1)}},disabled:d,style:{display:"none"}})),d&&l.a.createElement("span",{className:"uploading"},"Uploading...")),l.a.createElement("div",{className:"files-list"},o.length>0?o.map((e,t)=>l.a.createElement("div",{key:t,className:"file-item"},l.a.createElement("span",{className:"file-name"},e.name),l.a.createElement("a",{href:e.path,download:!0,className:"download-link"},"Download"))):l.a.createElement("p",{className:"no-files"},"No files uploaded yet"))))}var f=()=>{const{ventureName:e}=Object(o.s)(),[t,a]=Object(n.useState)("venture"),[r,c]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""}),[s,i]=Object(n.useState)([]),[m,u]=Object(n.useState)(null),[d,v]=Object(n.useState)(!0),[g,b]=Object(n.useState)(""),[h,f]=Object(n.useState)(!1),[y,C]=Object(n.useState)(!1),[w,S]=Object(n.useState)({name:"",description:"",industry:"",website:"",regions:""});Object(n.useEffect)(()=>{e&&(async()=>{try{v(!0),console.log("Loading venture data for:",e);const t=localStorage.getItem("token");if(!t)return b("Authentication required. Please log in again."),void v(!1);const a={headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json"}},n=await E.a.get("/api/ventures/".concat(e,"/details"),a);console.log("Venture details response:",n.data),n.data.details&&c(n.data.details);const l=await E.a.get("/api/ventures/".concat(e,"/competitors"),a);console.log("Competitors response:",l.data),l.data.competitors&&i(l.data.competitors.sort((e,t)=>e.name.localeCompare(t.name))),v(!1)}catch(t){console.error("Error loading venture data:",t),t.response&&401===t.response.status?b("Session expired. Please log in again."):b("Failed to load venture data. Please try refreshing the page."),v(!1)}})()},[e]);const k=e=>{const{name:t,value:a}=e.target;c(e=>Object(p.a)(Object(p.a)({},e),{},{[t]:a}))},O=e=>{const{name:t,value:a}=e.target;S(e=>Object(p.a)(Object(p.a)({},e),{},{[t]:a}))},j=e=>{const{name:t,value:a}=e.target;u(e=>Object(p.a)(Object(p.a)({},e),{},{[t]:a}))};return d?l.a.createElement("div",{className:"loading-screen"},"Loading venture data..."):g?l.a.createElement("div",{className:"error-message"},g):l.a.createElement("div",{className:"venture-page"},l.a.createElement("div",{className:"venture-header"},l.a.createElement("h1",null,e),l.a.createElement("div",{className:"tabs"},l.a.createElement("button",{className:"tab-button ".concat("venture"===t?"active":""),onClick:()=>a("venture")},"Venture Details"),l.a.createElement("button",{className:"tab-button ".concat("competitors"===t?"active":""),onClick:()=>{a("competitors"),u(null)}},"Competitors"),l.a.createElement("button",{className:"tab-button ".concat("add-data"===t?"active":""),onClick:()=>a("add-data")},"Add Data"))),l.a.createElement("div",{className:"panel-container"},"venture"===t&&l.a.createElement("div",{className:"panel venture-details-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Venture Details"),l.a.createElement("div",{className:"panel-actions"},l.a.createElement("button",{className:"action-button",onClick:()=>h?(async()=>{try{const t=localStorage.getItem("token"),a={headers:{Authorization:"Bearer ".concat(t)}};await E.a.post("/api/ventures/".concat(e,"/details"),r,a),f(!1),alert("Venture details saved successfully")}catch(t){console.error("Error saving venture details:",t),alert("Failed to save venture details")}})():f(!0)},h?"Save Details":"Edit Details"),l.a.createElement("button",{className:"action-button",onClick:()=>a("add-data")},"Add Data"))),l.a.createElement("div",{className:"panel-content"},h?l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:r.name||"",onChange:k,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:r.industry||"",onChange:k,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:r.website||"",onChange:k,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:r.regions||"",onChange:k,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:r.description||"",onChange:k,placeholder:"Describe this venture",rows:5}))):l.a.createElement("div",{className:"info-display"},Object.keys(r).some(e=>r[e])?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("p",null,r.name||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("p",null,r.industry||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("p",null,r.website?l.a.createElement("a",{href:r.website,target:"_blank",rel:"noopener noreferrer"},r.website):"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("p",null,r.regions||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("p",{className:"description"},r.description||"No description available"))):l.a.createElement("div",{className:"empty-state"},l.a.createElement("p",null,"No venture details available. Click 'Edit Details' to add information."))),l.a.createElement("div",{className:"venture-files-section"},l.a.createElement("h3",null,"Associated Files & URLs"),l.a.createElement(N,{ventureName:e})))),"competitors"===t&&!m&&l.a.createElement("div",{className:"panel competitors-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Competitors"),l.a.createElement("button",{className:"action-button",onClick:()=>a("add-competitor")},"Add Competitor")),l.a.createElement("div",{className:"panel-content"},s.length>0?l.a.createElement("div",{className:"competitors-list"},s.map((e,t)=>l.a.createElement("button",{key:t,className:"competitor-button",onClick:()=>(e=>{u(e),a("competitor"),C(!1)})(e)},e.name))):l.a.createElement("div",{className:"empty-state"},l.a.createElement("p",null,"No competitors added yet. Click 'Add Competitor' to get started.")))),"add-competitor"===t&&l.a.createElement("div",{className:"panel add-competitor-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add New Competitor"),l.a.createElement("button",{className:"action-button",onClick:()=>a("competitors")},"Back to Competitors")),l.a.createElement("div",{className:"panel-content"},l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:w.name,onChange:O,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:w.industry,onChange:O,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:w.website,onChange:O,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:w.regions,onChange:O,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:w.description,onChange:O,placeholder:"Describe this competitor",rows:5})),l.a.createElement("button",{className:"submit-button",onClick:async()=>{try{if(!w.name.trim())return void alert("Competitor name is required");const t=localStorage.getItem("token");if(!t)return void alert("You need to be logged in to add a competitor");const n={headers:{Authorization:"Bearer ".concat(t),"Content-Type":"application/json"}};console.log("Adding competitor for venture:",e),console.log("Competitor data:",w);const l=await E.a.post("/api/ventures/".concat(e,"/competitors"),w,n);console.log("Add competitor response:",l.data);const r=l.data.competitor;i(e=>[...e,r].sort((e,t)=>e.name.localeCompare(t.name))),S({name:"",description:"",industry:"",website:"",regions:""}),u(r),a("competitor"),alert("Competitor added successfully")}catch(l){var t,n;console.error("Error adding competitor:",l);const e=(null===(t=l.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.error)||l.message||"unknown error";alert("Failed to add competitor: ".concat(e)),console.error("Error adding competitor:",l),l.response?(console.error("Error response:",l.response.data),console.error("Status code:",l.response.status),401===l.response.status?alert("Session expired. Please log in again."):alert("Failed to add competitor: ".concat(l.response.data.error||"Unknown error"))):alert("Failed to add competitor: Network error")}},disabled:!w.name},"Add Competitor")))),"competitor"===t&&m&&l.a.createElement("div",{className:"panel competitor-details-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Competitor: ",m.name),l.a.createElement("div",{className:"panel-actions"},l.a.createElement("button",{className:"action-button",onClick:()=>a("competitors")},"Back to List"),l.a.createElement("button",{className:"action-button",onClick:()=>y?(async()=>{try{if(m){const t=localStorage.getItem("token"),a={headers:{Authorization:"Bearer ".concat(t)}};await E.a.put("/api/ventures/".concat(e,"/competitors/").concat(m.id),m,a),i(e=>e.map(e=>e.id===m.id?m:e).sort((e,t)=>e.name.localeCompare(t.name))),C(!1),alert("Competitor details updated successfully")}}catch(t){console.error("Error updating competitor:",t),alert("Failed to update competitor details")}})():C(!0)},y?"Save Details":"Edit Details"),l.a.createElement("button",{className:"action-button",onClick:()=>a("add-data-competitor")},"Add Data"))),l.a.createElement("div",{className:"panel-content"},y?l.a.createElement("div",{className:"edit-form"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("input",{type:"text",name:"name",value:m.name||"",onChange:j,placeholder:"Company name"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("input",{type:"text",name:"industry",value:m.industry||"",onChange:j,placeholder:"Industry"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("input",{type:"text",name:"website",value:m.website||"",onChange:j,placeholder:"Website URL"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("input",{type:"text",name:"regions",value:m.regions||"",onChange:j,placeholder:"Regions (comma separated)"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("textarea",{name:"description",value:m.description||"",onChange:j,placeholder:"Describe this competitor",rows:5}))):l.a.createElement("div",{className:"info-display"},l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Company Name:"),l.a.createElement("p",null,m.name||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Industry:"),l.a.createElement("p",null,m.industry||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Website:"),l.a.createElement("p",null,m.website?l.a.createElement("a",{href:m.website,target:"_blank",rel:"noopener noreferrer"},m.website):"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Regions of Operation:"),l.a.createElement("p",null,m.regions||"Not specified")),l.a.createElement("div",{className:"info-group"},l.a.createElement("label",null,"Description:"),l.a.createElement("p",{className:"description"},m.description||"No description available"))),l.a.createElement("div",{className:"competitor-files-section"},l.a.createElement("h3",null,"Associated Files & URLs"),l.a.createElement(N,{ventureName:e,competitorId:m.id})))),"add-data"===t&&l.a.createElement("div",{className:"panel add-data-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add Data for ",e),l.a.createElement("button",{className:"action-button",onClick:()=>a("venture")},"Back to Venture Details")),l.a.createElement("div",{className:"panel-content"},l.a.createElement(N,{ventureName:e,fullWidth:!0}))),"add-data-competitor"===t&&m&&l.a.createElement("div",{className:"panel add-data-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Add Data for ",m.name),l.a.createElement("button",{className:"action-button",onClick:()=>a("competitor")},"Back to Competitor Details")),l.a.createElement("div",{className:"panel-content"},l.a.createElement(N,{ventureName:e,competitorId:m.id,fullWidth:!0})))))};function y(e){let{children:t}=e;const{user:a}=m();return a?t:l.a.createElement(o.a,{to:"/"})}function C(){const{user:e,login:t,signup:a}=m(),[n,r]=l.a.useState(!0);return l.a.createElement("div",{className:"app-container"},e&&l.a.createElement(u,null),l.a.createElement("div",{className:"main-content"},l.a.createElement(o.d,null,l.a.createElement(o.b,{path:"/ventures",element:l.a.createElement(y,null,l.a.createElement(g,null))}),l.a.createElement(o.b,{path:"/ventures/:ventureName",element:l.a.createElement(y,null,l.a.createElement(f,null))}),l.a.createElement(o.b,{path:"/insights",element:l.a.createElement(y,null,l.a.createElement(b,null))}),l.a.createElement(o.b,{path:"/",element:e?l.a.createElement(o.a,{to:"/ventures"}):l.a.createElement(h,null)}),l.a.createElement(o.b,{path:"/login",element:e?l.a.createElement(o.a,{to:"/ventures"}):l.a.createElement("div",{className:"auth-container"},l.a.createElement("h1",null,n?"Sign In":"Sign Up"),l.a.createElement(d,{onSubmit:n?t:a,isLogin:n}),l.a.createElement("button",{className:"switch-auth",onClick:()=>r(!n)},n?"Need an account? Sign up":"Have an account? Sign in"))}))))}var w=function(){return l.a.createElement(i,null,l.a.createElement(c.a,null,l.a.createElement(C,null)))};const S=document.getElementById("root");Object(r.createRoot)(S).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(w,null)))}},[[17,1,2]]]);
//# sourceMappingURL=main.5be9ba4a.chunk.js.map