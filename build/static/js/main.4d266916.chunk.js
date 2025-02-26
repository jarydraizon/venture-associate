(this["webpackJsonpventure-associate"]=this["webpackJsonpventure-associate"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},16:function(e,t,a){e.exports=a(26)},26:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(15),c=a(3),s=a(6);const o=Object(n.createContext)(null),i=e=>{let{children:t}=e;const[a,r]=Object(n.useState)(()=>{const e=localStorage.getItem("token")?{email:localStorage.getItem("userEmail")}:null;return console.log("Initial user state:",e),e}),[c,s]=Object(n.useState)(null);return l.a.createElement(o.Provider,{value:{user:a,error:c,login:async e=>{try{const a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await a.json();if(!a.ok)throw new Error(n.error||"Login failed");if(!n.token)throw new Error("Invalid login response");{var t;const a={email:e.email,user_id:n.user_id||(null===(t=n.user)||void 0===t?void 0:t.user_id)};localStorage.setItem("token",n.token),localStorage.setItem("userEmail",e.email),r(a)}return n}catch(a){throw s(a.message),new Error(a.message)}},signup:async e=>{try{const t=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json();if(!t.ok)throw new Error(a.error||"Signup failed");return r(a.user),localStorage.setItem("token",a.token),a}catch(t){throw s(t.message),new Error(t.message)}},logout:()=>{localStorage.removeItem("token"),r(null),s(null)}}},t)},m=()=>Object(n.useContext)(o);var u=()=>{const e=Object(c.q)(),{user:t,logout:a}=m(),n=Object(c.o)();return l.a.createElement("nav",{className:"sidebar"},l.a.createElement("div",{className:"sidebar-content"},l.a.createElement("div",{className:"sidebar-top"},l.a.createElement("div",{className:"logo"},"boola"),l.a.createElement("div",{className:"nav-links"},l.a.createElement("button",{className:"nav-link ".concat("/ventures"===n.pathname?"active":""),onClick:()=>e("/ventures")},"Ventures"),l.a.createElement("button",{className:"nav-link ".concat("/insights"===n.pathname?"active":""),onClick:()=>e("/insights")},"Insights"))),l.a.createElement("div",{className:"sidebar-bottom"},t&&l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{className:"user-email"},t.email),l.a.createElement("button",{className:"sign-out-btn",onClick:a},"Sign Out")))))};var d=e=>{let{onSubmit:t,isLogin:a}=e;const[r,c]=Object(n.useState)(""),[s,o]=Object(n.useState)(""),[i,m]=Object(n.useState)("");return l.a.createElement("form",{onSubmit:async e=>{e.preventDefault(),m("");try{await t({email:r,password:s})}catch(a){m(a.message)}},className:"auth-form"},l.a.createElement("input",{type:"email",value:r,onChange:e=>c(e.target.value),placeholder:"Email",required:!0}),l.a.createElement("input",{type:"password",value:s,onChange:e=>o(e.target.value),placeholder:"Password",required:!0}),i&&l.a.createElement("div",{className:"error-message"},i),l.a.createElement("button",{type:"submit"},a?"Sign In":"Sign Up"))},E=a(28);var v=()=>{const e=Object(c.q)(),[t,a]=Object(n.useState)([]),[r,s]=Object(n.useState)("");return Object(n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("token");if(!e)return void s("No authentication token found");const t={Authorization:"Bearer ".concat(e)},n=await E.a.get("/api/ventures",{headers:t});a(n.data.ventures||[])}catch(r){var e,t;console.error("Error fetching data:",r.response||r),s((null===(e=r.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||"Failed to fetch data")}})()},[]),l.a.createElement("div",{className:"venture-list"},r&&l.a.createElement("p",{className:"error"},r),t.map(t=>l.a.createElement("div",{key:t.venture_id,className:"venture-card",onClick:()=>e("/venture/".concat(t.name))},l.a.createElement("h3",null,t.name),l.a.createElement("p",null,t.description),l.a.createElement("div",{className:"meta"},new Date(t.created_at).toLocaleDateString()," \xb7 ",t.active?"Active":"Inactive"))))};a(13);var p=()=>l.a.createElement("div",{className:"ventures-page"},l.a.createElement("h1",{className:"welcome-title"},"Welcome to your portfolio"),l.a.createElement("hr",{className:"separator"}),l.a.createElement("div",{className:"ventures-section"},l.a.createElement("h2",{className:"section-title"},"My ventures"),l.a.createElement("button",{className:"create-new"},"+ Create new"),l.a.createElement(v,null)));var h=function(){return l.a.createElement("div",{className:"main-content"},l.a.createElement("h1",null,"Insights"),l.a.createElement("p",null,"Coming soon..."))};var g=()=>{const e=Object(c.q)();return l.a.createElement("div",{className:"home-page"},l.a.createElement("div",{className:"hero-section"},l.a.createElement("h1",null,"Your AI Venture Associate"),l.a.createElement("h2",null,"Make better investment decisions with AI-powered insights"),l.a.createElement("button",{className:"cta-button",onClick:()=>e("/login")},"Get Started")))};a(14);var b=()=>{const{ventureName:e}=Object(c.s)(),[t,a]=Object(n.useState)([]),[r,s]=Object(n.useState)("");return l.a.createElement("div",{className:"venture-page"},l.a.createElement("div",{className:"content-layout"},l.a.createElement("div",{className:"sources-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Sources")),l.a.createElement("button",{className:"add-source-btn"},"+ Add source"),0===t.length?l.a.createElement("div",{className:"empty-panel"},l.a.createElement("div",{className:"empty-icon"},"\ud83d\udcc4"),l.a.createElement("p",null,"No sources yet"),l.a.createElement("p",{className:"subtitle"},"Add sources to get started")):l.a.createElement("div",{className:"sources-list"},t.map(e=>l.a.createElement("div",{key:e.id,className:"source-item"},l.a.createElement("h3",null,e.title),l.a.createElement("p",null,e.summary))))),l.a.createElement("div",{className:"chat-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Chat")),l.a.createElement("div",{className:"chat-messages"}),l.a.createElement("div",{className:"chat-input-container"},l.a.createElement("input",{type:"text",value:r,onChange:e=>s(e.target.value),placeholder:"Ask anything about this venture...",className:"chat-input"}),l.a.createElement("button",{className:"send-btn"},"Send"))),l.a.createElement("div",{className:"actions-panel"},l.a.createElement("div",{className:"panel-header"},l.a.createElement("h2",null,"Actions")),l.a.createElement("div",{className:"actions-list"},[{id:1,label:"Generate Value Proposition"},{id:2,label:"Size the Market"},{id:3,label:"Analyze Competition"},{id:4,label:"Create SWOT Analysis"},{id:5,label:"Generate Business Model Canvas"},{id:6,label:"Assess Market Fit"},{id:7,label:"Financial Projections"},{id:8,label:"Risk Assessment"}].map(e=>l.a.createElement("button",{key:e.id,className:"action-btn"},e.label))))))};function N(e){let{children:t}=e;const{user:a}=m();return a?t:l.a.createElement(c.a,{to:"/"})}function S(){const{user:e,login:t,signup:a}=m(),[n,r]=l.a.useState(!0);return l.a.createElement("div",{className:"app-container"},e&&l.a.createElement(u,null),l.a.createElement("div",{className:"main-content"},l.a.createElement(c.d,null,l.a.createElement(c.b,{path:"/ventures",element:l.a.createElement(N,null,l.a.createElement(p,null))}),l.a.createElement(c.b,{path:"/ventures/:ventureName",element:l.a.createElement(N,null,l.a.createElement(b,null))}),l.a.createElement(c.b,{path:"/insights",element:l.a.createElement(N,null,l.a.createElement(h,null))}),l.a.createElement(c.b,{path:"/",element:e?l.a.createElement(c.a,{to:"/ventures"}):l.a.createElement(g,null)}),l.a.createElement(c.b,{path:"/login",element:e?l.a.createElement(c.a,{to:"/ventures"}):l.a.createElement("div",{className:"auth-container"},l.a.createElement("h1",null,n?"Sign In":"Sign Up"),l.a.createElement(d,{onSubmit:n?t:a,isLogin:n}),l.a.createElement("button",{className:"switch-auth",onClick:()=>r(!n)},n?"Need an account? Sign up":"Have an account? Sign in"))}))))}var y=function(){return l.a.createElement(i,null,l.a.createElement(s.a,null,l.a.createElement(S,null)))};const k=document.getElementById("root");Object(r.createRoot)(k).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(y,null)))}},[[16,1,2]]]);
//# sourceMappingURL=main.4d266916.chunk.js.map