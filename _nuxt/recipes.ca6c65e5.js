import{_ as u}from"./nuxt-link.c41a428a.js";import{g as _}from"./index.e198a6ba.js";import{B as l,f as d,A as p,o as r,h as a,F as m,G as f,u as y,q as h,s as x,b as g,t as v,p as w}from"./entry.745dcdc4.js";async function A(o){const e=_`
    query MyQuery($user_id: uuid!) {
      recipe(where: { user_id: { _eq: $user_id } }) {
        id
        title
      }
    }
  `,s={user_id:o},n=e.definitions[0].selectionSet.selections[0].name.value,{data:t}=await l(e,s);if(t!=null&&t.value&&t.value[n])return t.value[n]}const k={class:"text-white"},B=d({__name:"recipes",async setup(o){let e,s;const n=([e,s]=p(()=>A(g.auth.getUser().id)),e=await e,s(),e);return(t,q)=>{const c=u;return r(),a("div",k,[(r(!0),a(m,null,f(y(n),i=>(r(),a("div",{key:i.id},v(i.title),1))),128)),h(c,{to:"/"},{default:x(()=>[w("Startsida")]),_:1})])}}});export{B as default};
