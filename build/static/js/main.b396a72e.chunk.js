(this["webpackJsonpventure-associate"]=this["webpackJsonpventure-associate"]||[]).push([[0],{10:function(e,t,a){e.exports=a(22)},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(9);const l=Object(n.createContext)(null),c=e=>{let{children:t}=e;const[a,o]=Object(n.useState)(()=>{const e=localStorage.getItem("token")?{email:localStorage.getItem("userEmail")}:null;return console.log("Initial user state:",e),e}),[c,s]=Object(n.useState)(null);return r.a.createElement(l.Provider,{value:{user:a,error:c,login:async e=>{try{const a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await a.json();if(!a.ok)throw new Error(n.error||"Login failed");if(!n.token)throw new Error("Invalid login response");{var t;const a={email:e.email,id:n.user_id||(null===(t=n.user)||void 0===t?void 0:t.id)};localStorage.setItem("token",n.token),localStorage.setItem("userEmail",e.email),o(a)}return n}catch(a){throw s(a.message),new Error(a.message)}},signup:async e=>{try{const t=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json();if(!t.ok)throw new Error(a.error||"Signup failed");return o(a.user),localStorage.setItem("token",a.token),a}catch(t){throw s(t.message),new Error(t.message)}},logout:()=>{localStorage.removeItem("token"),o(null),s(null)}}},t)},s=()=>Object(n.useContext)(l);var i=function(){const{user:e,logout:t}=s();return r.a.createElement("nav",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"logo"},"boola"),r.a.createElement("div",null,e?r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"user-email"},e.email),r.a.createElement("button",{onClick:t},"Sign Out")):null)))};var u=e=>{let{onSubmit:t,isLogin:a}=e;const[o,l]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[i,u]=Object(n.useState)("");return r.a.createElement("form",{onSubmit:async e=>{e.preventDefault(),u("");try{await t({email:o,password:c})}catch(a){u(a.message)}},className:"auth-form"},r.a.createElement("input",{type:"email",value:o,onChange:e=>l(e.target.value),placeholder:"Email",required:!0}),r.a.createElement("input",{type:"password",value:c,onChange:e=>s(e.target.value),placeholder:"Password",required:!0}),i&&r.a.createElement("div",{className:"error-message"},i),r.a.createElement("button",{type:"submit"},a?"Sign In":"Sign Up"))},m=a(24);var g=()=>{console.log("VentureForm rendered");const[e,t]=Object(n.useState)(""),[a,o]=Object(n.useState)(""),[l,c]=Object(n.useState)("");return r.a.createElement("div",null,r.a.createElement("h2",null,"Add a Venture"),r.a.createElement("form",{onSubmit:async n=>{n.preventDefault();const r=localStorage.getItem("token");console.log("Token payload:",JSON.parse(atob(r.split(".")[1])));try{const n=await m.a.post("/api/ventures",{name:e,description:a},{headers:{Authorization:"Bearer ".concat(r)}});c("Venture created successfully! (ID: ".concat(n.data.ventureId,")")),t(""),o("")}catch(l){c("Error: ".concat(l.response.data.error))}}},r.a.createElement("input",{type:"text",placeholder:"Venture Name",value:e,onChange:e=>t(e.target.value),required:!0}),r.a.createElement("textarea",{placeholder:"Description",value:a,onChange:e=>o(e.target.value),required:!0}),r.a.createElement("button",{type:"submit"},"Submit")),l&&r.a.createElement("p",null,l))};function d(){const{user:e,login:t,signup:a}=s(),[o,l]=Object(n.useState)(!0);console.log("MainContent rendered, user state:",e),console.log("Local Storage token:",localStorage.getItem("token"));const c=async e=>{try{if(o){const a=await t(e);console.log("Login success:",a)}else await a(e)}catch(n){console.error("Auth error:",n),alert(n.message)}};return e?r.a.createElement("main",{className:"container"},r.a.createElement("div",{className:"main-content"},r.a.createElement("h1",null,"Welcome to boola"),r.a.createElement("p",null,"Your AI-powered venture analysis assistant"),r.a.createElement(g,null))):r.a.createElement("main",{className:"container"},r.a.createElement("div",{className:"auth-container"},r.a.createElement("h1",null,o?"Sign In":"Sign Up"),r.a.createElement(u,{onSubmit:c,isLogin:o}),r.a.createElement("button",{className:"switch-auth",onClick:()=>l(!o)},o?"Need an account? Sign up":"Have an account? Sign in")))}var p=function(){return r.a.createElement(c,null,r.a.createElement("div",null,r.a.createElement(i,null),r.a.createElement(d,null)))};a(21);const E=document.getElementById("root");Object(o.createRoot)(E).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)))}},[[10,1,2]]]);
//# sourceMappingURL=main.b396a72e.chunk.js.map