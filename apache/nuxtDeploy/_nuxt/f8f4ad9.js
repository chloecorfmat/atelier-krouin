(window.webpackJsonp=window.webpackJsonp||[]).push([[15,3,4,5,12],{313:function(t,e,r){"use strict";r.r(e);var n=r(4),l=(r(38),r(27),{name:"Article",props:{article:{}},data:function(){return{tag:null}},computed:{imgUrl:function(){return"http://192.168.1.22:1337"+this.article.image_header.media.url},date:function(){var t=new Date(this.article.published_at);return t.getDate()+" "+t.toLocaleString("default",{month:"long"})+" "+t.getFullYear()+" à "+t.getHours()+"h"+t.getMinutes()},url:function(){return"/article/"+this.article.slug}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t.article.categories){e.next=7;break}return e.next=3,t.$http.$get("http://192.168.1.22:1337/articles/"+t.article.id);case 3:null==(r=e.sent).categories?t.tag="":t.tag=r.categories[0].name,e.next=8;break;case 7:"undefined"!=t.article.categories[0].name&&(t.tag=t.article.categories[0].name);case 8:case"end":return e.stop()}}),e)})))()}}),c=r(32),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"list--articles-item"},[r("NuxtLink",{staticClass:"list--articles-item--container",attrs:{to:t.url}},[r("div",{staticClass:"article--image--container"},[r("img",{staticClass:"article--image",attrs:{src:t.imgUrl,alt:this.article.image_header.alt}})]),t._v(" "),r("div",{staticClass:"article--infos"},[""!=t.tag?r("span",{staticClass:"tag tag--primary"},[t._v(t._s(t.tag))]):t._e(),t._v(" "),r("h3",{staticClass:"article--title"},[t._v(t._s(t.article.title))]),t._v(" "),r("time",{staticClass:"article--time",attrs:{datetime:t.article.published_at}},[t._v(t._s(t.date))])])])],1)}),[],!1,null,null,null);e.default=component.exports},314:function(t,e,r){"use strict";r.r(e);var n=r(4),l=(r(38),r(27),{name:"ArticleLarge",props:{article:{}},data:function(){return{tag:null}},computed:{imgUrl:function(){return"http://192.168.1.22:1337"+this.article.image_header.media.url},date:function(){var t=new Date(this.article.published_at);return t.getDate()+" "+t.toLocaleString("default",{month:"long"})+" "+t.getFullYear()+" à "+t.getHours()+"h"+t.getMinutes()},url:function(){return"article/"+this.article.slug}},fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t.article.categories){e.next=7;break}return e.next=3,t.$http.$get("http://192.168.1.22:1337/articles/"+t.article.id);case 3:null==(r=e.sent).categories?t.tag="":t.tag=r.categories[0].name,e.next=8;break;case 7:"undefined"!=t.article.categories[0].name&&(t.tag=t.article.categories[0].name);case 8:case"end":return e.stop()}}),e)})))()}}),c=r(32),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"list--articles-item"},[r("NuxtLink",{staticClass:"list--articles-item--container",attrs:{to:t.url}},[r("div",{staticClass:"article--image--container"},[r("img",{staticClass:"article--image",attrs:{src:t.imgUrl,alt:this.article.image_header.alt}})]),t._v(" "),r("div",{staticClass:"article--infos"},[""!=t.tag?r("span",{staticClass:"tag tag--primary"},[t._v(t._s(t.tag))]):t._e(),t._v(" "),r("h3",{staticClass:"article--title"},[t._v(t._s(t.article.title))]),t._v(" "),r("time",{staticClass:"article--time",attrs:{datetime:t.article.published_at}},[t._v(t._s(t.date))]),t._v(" "),r("p",{staticClass:"article--description"},[t._v(t._s(t.article.header))])])])],1)}),[],!1,null,null,null);e.default=component.exports},315:function(t,e,r){"use strict";r.r(e);var n=r(314),l=r(313),c={name:"BlockArticles",components:{ArticleLarge:n.default,Article:l.default},props:{articles:null},data:function(){return{largeArticle:null,shortArticles:null}},mounted:function(){this.largeArticle=this.articles.shift(),this.shortArticles=this.articles}},o=r(32),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ol",{staticClass:"list--articles"},[null!=t.largeArticle?r("ArticleLarge",{attrs:{article:t.largeArticle}}):t._e(),t._v(" "),t._l(t.articles,(function(article){return null!=t.shortArticles?r("Article",{key:article.id,attrs:{article:article}}):t._e()}))],2)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ArticleLarge:r(314).default,Article:r(313).default})},318:function(t,e,r){"use strict";r.r(e);r(206);var n={name:"Pagination",props:{page:Number,pagesNb:Number,baseUrl:String},computed:{nextPage:function(){return this.page+1},previousPage:function(){return this.page-1}}},l=r(32),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pagination--container"},[r("nav",{staticClass:"pagination--nav"},[r("ul",{staticClass:"pagination"},[r("li",{directives:[{name:"show",rawName:"v-show",value:1!=t.page,expression:"page != 1"}],staticClass:"pagination--item"},[r("NuxtLink",{staticClass:"btn--secondary tag tag--secondary tag--inline",attrs:{to:t.baseUrl+t.previousPage}},[r("span",{staticClass:"sr-only"},[t._v("Page ")]),t._v("Précédente\n        ")])],1),t._v(" "),r("li",{directives:[{name:"show",rawName:"v-show",value:t.page>1,expression:"page > 1"}],staticClass:"pagination--item"},[r("NuxtLink",{staticClass:"pagination--item--link btn--secondary tag tag--secondary tag--inline",attrs:{to:t.baseUrl+1}},[t._v("1")])],1),t._v(" "),r("li",{directives:[{name:"show",rawName:"v-show",value:t.page>2,expression:"page > 2"}],staticClass:"pagination--item"},[t._v("\n        ...\n      ")]),t._v(" "),r("li",{staticClass:"pagination--item pagination--item--is-active"},[r("p",{staticClass:"pagination--item--link tag tag--secondary tag--inline",attrs:{"aria-current":"page"}},[t._v(t._s(t.page))])]),t._v(" "),r("li",{directives:[{name:"show",rawName:"v-show",value:1==t.page&&1!=t.pagesNb||t.page<t.pagesNb-1,expression:"(page == 1 && pagesNb != 1) || (page < pagesNb-1)"}],staticClass:"pagination--item"},[t._v("\n        ...\n      ")]),t._v(" "),r("li",{directives:[{name:"show",rawName:"v-show",value:t.page<t.pagesNb,expression:"page < pagesNb"}],staticClass:"pagination--item"},[r("NuxtLink",{staticClass:"pagination--item--link btn--secondary tag tag--secondary tag--inline",attrs:{to:t.baseUrl+t.pagesNb}},[t._v(t._s(t.pagesNb))])],1),t._v(" "),r("li",{directives:[{name:"show",rawName:"v-show",value:t.page!=t.pagesNb,expression:"page != pagesNb"}],staticClass:"pagination--item"},[r("NuxtLink",{staticClass:"pagination--item--link btn--secondary tag tag--secondary tag--inline",attrs:{to:t.baseUrl+t.nextPage}},[r("span",{staticClass:"sr-only"},[t._v("Page ")]),t._v("Suivante\n        ")])],1)])])])}),[],!1,null,null,null);e.default=component.exports},502:function(t,e,r){"use strict";r.r(e);var n=r(4),l=(r(38),r(315)),c=r(318),o={name:"ArticleListPaginated",components:{BlockArticles:l.default,Pagination:c.default},data:function(){return{articles:null,page:null,pagesNb:null}},asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,l,c,o,m,v,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,n=t.$http,l=8,c=parseInt(r.page),o=c*l-l,e.next=6,n.$get("http://192.168.1.22:1337/articles?_limit="+l+"&_start="+o);case 6:return m=e.sent,e.next=9,n.$get("http://192.168.1.22:1337/articles/count");case 9:return v=e.sent,d=Math.ceil(v/l),e.abrupt("return",{articles:m,page:c,pagesNb:d});case 12:case"end":return e.stop()}}),e)})))()}},m=r(32),component=Object(m.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"content page--list-articles"},[r("div",{staticClass:"block block--last-articles"},[r("h1",{staticClass:"h2-like heading--with-tag"},[t._v("Tous les articles (page "+t._s(t.page)+")")]),t._v(" "),null!=t.articles?r("BlockArticles",{attrs:{articles:t.articles}}):t._e(),t._v(" "),t.pagesNb>1?r("Pagination",{attrs:{page:t.page,pagesNb:t.pagesNb,baseUrl:"/articles/"}}):t._e()],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{BlockArticles:r(315).default,Pagination:r(318).default})}}]);