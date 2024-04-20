import{Q as n}from"./QMarkupTable.47ca92a4.js";import{Q as l}from"./QPage.4391cc74.js";import{u as a}from"./use-meta.2ca91963.js";import{d as c,$ as r,a0 as i,a1 as t,a2 as s,ax as e}from"./index.f64f3f8b.js";import"./use-dark.1f598ace.js";const o=e("h6",{class:"q-mt-none q-mb-lg"},"Elemental resistance",-1),m=e("p",null," Enemies have either 0%, -5%, or -10% elemental resistance. That is, they can take up to -10% extra damage of a given element. The only time enemies have positive elemental resistance, ie. they take less damage from a given element, is when a neural sim modifier gives them more resistance. ",-1),h=e("p",null," The table below shows the elemental resistance values of all enemy types, just remember to that doing calculations, that negative elemental resistance means more damage, not less. ",-1),d=e("thead",null,[e("tr",null,[e("th"),e("th",null,[e("div",{class:"row justify-center"},[e("img",{src:"element_kinetic.png",style:{"max-width":"42px"}})]),e("h6",{class:"q-ma-none"},"Kinetic")]),e("th",null,[e("div",{class:"row justify-center"},[e("img",{src:"element_chaos.png",style:{"max-width":"42px"}})]),e("h6",{class:"q-ma-none"},"Chaos")]),e("th",null,[e("div",{class:"row justify-center"},[e("img",{src:"element_thermal.png",style:{"max-width":"42px"}})]),e("h6",{class:"q-ma-none"},"Thermal")]),e("th",null,[e("div",{class:"row justify-center"},[e("img",{src:"element_frost.png",style:{"max-width":"42px"}})]),e("h6",{class:"q-ma-none"},"Frost")]),e("th",null,[e("div",{class:"row justify-center"},[e("img",{src:"element_electrical.png",style:{"max-width":"42px"}})]),e("h6",{class:"q-ma-none"},"Electrical")])])],-1),u=e("tbody",null,[e("tr",null,[e("td",null,[e("div",{class:"row justify-center"},[e("img",{src:"enemy_type_biological.png"})]),e("h6",{class:"q-ma-none text-center"},"Biological")]),e("td",{class:"text-black text-center bg-red"},[e("h5",null,"-10%")]),e("td",{class:"text-black text-center bg-grey"},[e("h5",null,"0%")]),e("td",{class:"text-black text-center bg-red"},[e("h5",null,"-10%")]),e("td",{class:"text-black text-center bg-orange"},[e("h5",null,"-5%")]),e("td",{class:"text-black text-center bg-grey"},[e("h5",null,"0%")])]),e("tr",null,[e("td",null,[e("div",{class:"row justify-center"},[e("img",{src:"enemy_type_mechanical.png"})]),e("h6",{class:"q-ma-none text-center"},"Mechanical")]),e("td",{class:"text-black text-center bg-grey"},[e("h5",null,"0%")]),e("td",{class:"text-black text-center bg-red"},[e("h5",null,"-10%")]),e("td",{class:"text-black text-center bg-orange"},[e("h5",null,"-5%")]),e("td",{class:"text-black text-center bg-grey"},[e("h5",null,"0%")]),e("td",{class:"text-black text-center bg-red"},[e("h5",null,"-10%")])]),e("tr",null,[e("td",null,[e("div",{class:"row justify-center"},[e("img",{src:"enemy_type_titan.png"})]),e("h6",{class:"q-ma-none text-center"},"Titan")]),e("td",{class:"text-black text-center bg-orange"},[e("h5",null,"-5%")]),e("td",{class:"text-black text-center bg-orange"},[e("h5",null,"-5%")]),e("td",{class:"text-black text-center bg-grey"},[e("h5",null,"0%")]),e("td",{class:"text-black text-center bg-red"},[e("h5",null,"-10%")]),e("td",{class:"text-black text-center bg-orange"},[e("h5",null,"-5%")])])],-1),g=e("h6",{class:"q-mt-xl q-mb-md"},"Unique enemy mechanics",-1),y=e("thead",null,[e("tr",null,[e("th",null,[e("h6",{class:"q-my-sm"},"Enemy")]),e("th",null,[e("h6",{class:"q-my-sm"},"Mechanics")])])],-1),p=e("tbody",null,[e("tr",null,[e("td",null,[e("div",{class:"row justify-center"},[e("img",{src:"enemy_icons/fiend_foehn.png",style:{width:"200px"}})]),e("div",{class:"row justify-center"},[e("img",{src:"enemy_icons/fiend_frostwind.png",style:{width:"200px"}})]),e("h6",{class:"q-ma-none text-center"}," Fiend - Foehn / Fiend - Frostwind ")]),e("td",null,[e("p",{class:"text-body1"},` In fire form ("Foehn"), the fiend has 80% thermal resistance, 30% chaos resistance, and normal resistance to all the other elements, ex. -10% frost resistance like every other titan. In ice form ("Frostwind"), the fiend has 80% frost resistance, 30% chaos resistance, and normal resistance to all the other elements. The ice fiend can't be frozen like most Titans can. `),e("p",{class:"text-body1"}," The form-specific frost/thermal resistances are not affected by Twilight or neural sim modifiers. Strangely, weakspot hits or non-weakspot hits on their heads do not seem to be affected by the extra resistance. ")])]),e("tr",null,[e("td",null,[e("div",{class:"row justify-center"},[e("img",{src:"enemy_icons/ni_type_mech.png",style:{width:"200px"}})]),e("div",{class:"row justify-center"},[e("img",{src:"enemy_icons/ni_type_mech_falconer.png",style:{width:"200px"}})]),e("h6",{class:"q-ma-none text-center"}," Ni-Type Mech / Ni-Type Mech - Falconer ")]),e("td",null,[e("p",{class:"text-body1"}," Both mechs take 50% less damage to the body. This is a separate multiplier and cannot be mitigated with elemental resistance shred or defense reduction/penetration. ")])])],-1),j=c({__name:"EnemyInfoPage",setup(x){return a({title:"Enemy information",meta:{description:{name:"description",content:"Basic information on elemental resistance and enemy mechanics in the game Snowbreak: Containment Zone"}}}),(f,_)=>(r(),i(l,{class:"q-pa-lg",style:{"margin-top":"50px"}},{default:t(()=>[o,m,h,s(n,{class:"element-table",separator:"cell",flat:"",bordered:"",style:{width:"fit-content"}},{default:t(()=>[d,u]),_:1}),g,s(n,{flat:"",bordered:"","wrap-cells":"",separator:"cell",style:{width:"fit-content"}},{default:t(()=>[y,p]),_:1})]),_:1}))}});export{j as default};
