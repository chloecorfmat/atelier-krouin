(window.webpackJsonp=window.webpackJsonp||[]).push([[6,11],{316:function(t,e,r){"use strict";r.r(e);var n={name:"Instagram",props:{image_url:String,post_url:String},computed:{imgUrl:function(){return"http://strapi:1337"+this.image_url}}},l=r(32),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{staticClass:"item--instagram",attrs:{href:t.post_url,target:"_blank"}},[t._m(0),t._v(" "),r("img",{staticClass:"item--instagram-image",attrs:{src:t.imgUrl,alt:"Image du post Instagram en lien"}})])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"item--instagram-profile"},[r("img",{attrs:{src:"/images/instagram.jpg",alt:"Photo de profil Instagram de Atelier Krouiñ"}}),t._v(" "),r("p",{staticClass:"item--instagram-username"},[t._v("atelierkrouin")])])}],!1,null,null,null);e.default=component.exports},348:function(t,e,r){"use strict";r.r(e);var n={name:"BlockComments",components:{Instagram:r(316).default},props:{data:{}}},l=r(32),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"block block--comments"},[r("div",{staticClass:"comments--content"},[r("h2",{staticClass:"comments--title"},[t._v("Pour commenter")]),t._v(" "),r("p",{staticClass:"comments--text"},[t._v(t._s(t.data.insta_text))]),t._v(" "),r("a",{staticClass:"tag tag--reverse",attrs:{href:t.data.insta_url,target:"_blank"}},[t._v("Commenter l'article")])]),t._v(" "),r("Instagram",{attrs:{image_url:t.data.insta_image.url,post_url:t.data.insta_url}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Instagram:r(316).default})}}]);