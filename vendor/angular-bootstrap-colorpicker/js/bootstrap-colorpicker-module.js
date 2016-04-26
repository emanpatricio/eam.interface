angular.module("colorpicker.module",[]).factory("Helper",function(){"use strict";return{closestSlider:function(e){var o=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector;return o.bind(e)("I")?e.parentNode:e},getOffset:function(e,o){for(var t=0,n=0,r=e.getBoundingClientRect();e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)o||"BODY"!==e.tagName?(t+=e.scrollLeft,n+=e.scrollTop):(t+=document.documentElement.scrollLeft||e.scrollLeft,n+=document.documentElement.scrollTop||e.scrollTop),e=e.offsetParent;return{top:r.top+window.pageYOffset,left:r.left+window.pageXOffset,scrollX:t,scrollY:n}},stringParsers:[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}}]}}).factory("Color",["Helper",function(e){"use strict";return{value:{h:1,s:1,b:1,a:1},rgb:function(){var e=this.toRGB();return"rgb("+e.r+","+e.g+","+e.b+")"},rgba:function(){var e=this.toRGB();return"rgba("+e.r+","+e.g+","+e.b+","+e.a+")"},hex:function(){return this.toHex()},RGBtoHSB:function(e,o,t,n){e/=255,o/=255,t/=255;var r,i,l,c;return l=Math.max(e,o,t),c=l-Math.min(e,o,t),r=0===c?null:l===e?(o-t)/c:l===o?(t-e)/c+2:(e-o)/c+4,r=(r+360)%6*60/360,i=0===c?0:c/l,{h:r||1,s:i,b:l,a:n||1}},setColor:function(o){o=o?o.toLowerCase():o;for(var t in e.stringParsers)if(e.stringParsers.hasOwnProperty(t)){var n=e.stringParsers[t],r=n.re.exec(o),i=r&&n.parse(r);if(i)return this.value=this.RGBtoHSB.apply(null,i),!1}},setHue:function(e){this.value.h=1-e},setSaturation:function(e){this.value.s=e},setLightness:function(e){this.value.b=1-e},setAlpha:function(e){this.value.a=parseInt(100*(1-e),10)/100},toRGB:function(e,o,t,n){e||(e=this.value.h,o=this.value.s,t=this.value.b),e*=360;var r,i,l,c,s;return e=e%360/60,s=t*o,c=s*(1-Math.abs(e%2-1)),r=i=l=t-s,e=~~e,r+=[s,c,0,0,c,s][e],i+=[c,s,s,c,0,0][e],l+=[0,0,c,s,s,c][e],{r:Math.round(255*r),g:Math.round(255*i),b:Math.round(255*l),a:n||this.value.a}},toHex:function(e,o,t,n){var r=this.toRGB(e,o,t,n);return"#"+(1<<24|parseInt(r.r,10)<<16|parseInt(r.g,10)<<8|parseInt(r.b,10)).toString(16).substr(1)}}}]).factory("Slider",["Helper",function(e){"use strict";var o={maxLeft:0,maxTop:0,callLeft:null,callTop:null,knob:{top:0,left:0}},t={};return{getSlider:function(){return o},getLeftPosition:function(e){return Math.max(0,Math.min(o.maxLeft,o.left+((e.pageX||t.left)-t.left)))},getTopPosition:function(e){return Math.max(0,Math.min(o.maxTop,o.top+((e.pageY||t.top)-t.top)))},setSlider:function(n,r){var i=e.closestSlider(n.target),l=e.getOffset(i,r),c=i.getBoundingClientRect(),s=n.clientX-c.left,a=n.clientY-c.top;o.knob=i.children[0].style,o.left=n.pageX-l.left-window.pageXOffset+l.scrollX,o.top=n.pageY-l.top-window.pageYOffset+l.scrollY,t={left:n.pageX-(s-o.left),top:n.pageY-(a-o.top)}},setSaturation:function(e,t){o={maxLeft:100,maxTop:100,callLeft:"setSaturation",callTop:"setLightness"},this.setSlider(e,t)},setHue:function(e,t){o={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setHue"},this.setSlider(e,t)},setAlpha:function(e,t){o={maxLeft:0,maxTop:100,callLeft:!1,callTop:"setAlpha"},this.setSlider(e,t)},setKnob:function(e,t){o.knob.top=e+"px",o.knob.left=t+"px"}}}]).directive("colorpicker",["$document","$compile","Color","Slider","Helper",function(e,o,t,n,r){"use strict";return{require:"?ngModel",restrict:"A",link:function(i,l,c,s){function a(){e.on("mousemove",p),e.on("mouseup",f)}function u(){try{A.css("backgroundColor",O[x]())}catch(e){A.css("backgroundColor",O.toHex())}M.css("backgroundColor",O.toHex(O.value.h,1,1,1)),"rgba"===x&&(b.css.backgroundColor=O.toHex())}function p(e){var o=n.getLeftPosition(e),t=n.getTopPosition(e),r=n.getSlider();n.setKnob(t,o),r.callLeft&&O[r.callLeft].call(O,o/100),r.callTop&&O[r.callTop].call(O,t/100),u();var c=O[x]();return l.val(c),s&&i.$apply(s.$setViewValue(c)),L&&D.val(c),!1}function f(){m("colorpicker-selected"),e.off("mousemove",p),e.off("mouseup",f)}function d(e){O.setColor(l.val()),L&&!e&&D.val(l.val()),B.eq(0).css({left:100*O.value.s+"px",top:100-100*O.value.b+"px"}),B.eq(1).css("top",100*(1-O.value.h)+"px"),B.eq(2).css("top",100*(1-O.value.a)+"px"),u()}function h(){var e,o=r.getOffset(l[0]);return angular.isDefined(c.colorpickerParent)&&(o.left=0,o.top=0),"top"===w?e={top:o.top-147,left:o.left}:"right"===w?e={top:o.top,left:o.left+126}:"bottom"===w?e={top:o.top+l[0].offsetHeight+2,left:o.left}:"left"===w&&(e={top:o.top,left:o.left-150}),{top:e.top+"px",left:e.left+"px"}}function g(){v()}function k(){T.hasClass("colorpicker-visible")||(d(),T.addClass("colorpicker-visible").css(h()),m("colorpicker-shown"),S===!1&&e.on("mousedown",g),c.colorpickerIsOpen&&(i[c.colorpickerIsOpen]=!0,i.$$phase||i.$digest()))}function m(e){s&&i.$emit(e,{name:c.ngModel,value:s.$modelValue})}function v(){T.hasClass("colorpicker-visible")&&(T.removeClass("colorpicker-visible"),m("colorpicker-closed"),e.off("mousedown",g),c.colorpickerIsOpen&&(i[c.colorpickerIsOpen]=!1,i.$$phase||i.$digest()))}var b,x=c.colorpicker?c.colorpicker:"hex",w=angular.isDefined(c.colorpickerPosition)?c.colorpickerPosition:"bottom",S=angular.isDefined(c.colorpickerInline)?c.colorpickerInline:!1,I=angular.isDefined(c.colorpickerFixedPosition)?c.colorpickerFixedPosition:!1,C=angular.isDefined(c.colorpickerParent)?l.parent():angular.element(document.body),L=angular.isDefined(c.colorpickerWithInput)?c.colorpickerWithInput:!1,$=L?'<input type="text" name="colorpicker-input" spellcheck="false">':"",P=S?"":'<button type="button" class="close close-colorpicker">&times;</button>',H='<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>'+$+P+"</div></div>",T=angular.element(H),O=t,y=T.find("colorpicker-hue"),M=T.find("colorpicker-saturation"),A=T.find("colorpicker-preview"),B=T.find("i");if(o(T)(i),L){var D=T.find("input");D.on("mousedown",function(e){e.stopPropagation()}).on("keyup",function(){var e=this.value;l.val(e),s&&s.$modelValue!==e&&(i.$apply(s.$setViewValue(e)),d(!0))})}"rgba"===x&&(T.addClass("alpha"),b=T.find("colorpicker-alpha"),b.on("click",function(e){n.setAlpha(e,I),p(e)}).on("mousedown",function(e){n.setAlpha(e,I),a()}).on("mouseup",function(e){m("colorpicker-selected-alpha")})),y.on("click",function(e){n.setHue(e,I),p(e)}).on("mousedown",function(e){n.setHue(e,I),a()}).on("mouseup",function(e){m("colorpicker-selected-hue")}),M.on("click",function(e){n.setSaturation(e,I),p(e),angular.isDefined(c.colorpickerCloseOnSelect)&&v()}).on("mousedown",function(e){n.setSaturation(e,I),a()}).on("mouseup",function(e){m("colorpicker-selected-saturation")}),I&&T.addClass("colorpicker-fixed-position"),T.addClass("colorpicker-position-"+w),"true"===S&&T.addClass("colorpicker-inline"),C.append(T),s&&(s.$render=function(){l.val(s.$viewValue),d()}),l.on("blur keyup change",function(){d()}),l.on("$destroy",function(){T.remove()}),S===!1?l.on("click",k):k(),T.on("mousedown",function(e){e.stopPropagation(),e.preventDefault()}),T.find("button").on("click",function(){v()}),c.colorpickerIsOpen&&i.$watch(c.colorpickerIsOpen,function(e){e===!0?k():e===!1&&v()})}}}]);