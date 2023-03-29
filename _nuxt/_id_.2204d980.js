import{g}from"./index.e198a6ba.js";import{B as v,C as f,f as x,A as b,o as c,h as l,u as o,w as m,v as _,j as p,i as w,D as y,E as k}from"./entry.745dcdc4.js";async function E(r){const n=g`
    query MyQuery($id: Int!) {
      ingredient_by_pk(id: $id) {
        id
        name
        standard_unit
      }
    }
  `,a={id:r},e=n.definitions[0].selectionSet.selections[0].name.value,{data:t}=await v(n,a);if(t!=null&&t.value&&t.value[e])return t.value[e]}const $=async(r,n,a)=>{const e=g`
    mutation MyMutation($id: Int!, $standard_unit: String!, $name: String!) {
      update_ingredient_by_pk(
        pk_columns: { id: $id }
        _set: { name: $name, standard_unit: $standard_unit }
      ) {
        id
        name
        standard_unit
      }
    }
  `,t={id:r,name:n,standard_unit:a},{mutate:i,onDone:s}=f(e,{variables:t});return i(),{mutate:i,onDone:s}},A={class:"text-white"},M={key:0,class:"flex flex-col"},I=x({__name:"[id]",async setup(r){let n,a;const e=([n,a]=b(()=>E(Number(y().params.id))),n=await n,a(),n),t=async()=>{const{onDone:i}=await $(Number(y().params.id),e.name,e.standard_unit);i(()=>{console.log("Ingrediens uppdaterad")})};return(i,s)=>{const u=k("debounce");return c(),l("div",A,[o(e)?(c(),l("div",M,[m(p("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=d=>o(e).name=d),class:"bg-transparent text-white"},null,512),[[_,o(e).name],[u,t,"1s"]]),m(p("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=d=>o(e).standard_unit=d),class:"bg-transparent text-white"},null,512),[[_,o(e).standard_unit],[u,t,"1s"]])])):w("",!0)])}}});export{I as default};
