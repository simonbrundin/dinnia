import{b as n,e as l,f as r,A as u,o as c,h as d,j as s,t as p,u as _}from"./entry.ae526870.js";import{_ as g}from"./_plugin-vue_export-helper.c27b6911.js";const f=()=>{n.auth.signOut(),l("auth/login")},h={class:"text-white flex flex-col gap-4 justify-center items-center"},m={class:"flex gap-4"},x=r({__name:"index",async setup(v){let t,a;return[t,a]=u(()=>n.auth.isAuthenticatedAsync()),t=await t,a(),(e,o)=>{var i;return c(),d("div",h,[s("div",null,p((i=("nhost"in e?e.nhost:_(n)).auth.getUser())==null?void 0:i.email),1),s("div",m,[s("button",{onClick:o[0]||(o[0]=y=>("signOut"in e?e.signOut:_(f))()),class:"bg-slate-700 px-4 py-4 rounded-lg text-slate-50"}," Logga ut ")])])}}});const O=g(x,[["__scopeId","data-v-2b6c1934"]]);export{O as default};