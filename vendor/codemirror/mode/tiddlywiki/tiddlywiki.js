!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("tiddlywiki",function(){function e(e,t,r){return t.tokenize=r,r(e,t)}function t(t,l){var y,$=t.sol();if(l.block=!1,y=t.peek(),$&&/[<\/\*{}\-]/.test(y)){if(t.match(w))return l.block=!0,e(t,l,i);if(t.match(k))return"quote";if(t.match(d)||t.match(h))return"comment";if(t.match(p)||t.match(b)||t.match(v)||t.match(g))return"comment";if(t.match(s))return"hr"}if(y=t.next(),$&&/[\/\*!#;:>|]/.test(y)){if("!"==y)return t.skipToEnd(),"header";if("*"==y)return t.eatWhile("*"),"comment";if("#"==y)return t.eatWhile("#"),"comment";if(";"==y)return t.eatWhile(";"),"comment";if(":"==y)return t.eatWhile(":"),"comment";if(">"==y)return t.eatWhile(">"),"quote";if("|"==y)return"header"}if("{"==y&&t.match(/\{\{/))return e(t,l,i);if(/[hf]/i.test(y)&&/[ti]/i.test(t.peek())&&t.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i))return"link";if('"'==y)return"string";if("~"==y)return"brace";if(/[\[\]]/.test(y)&&t.peek()==y)return t.next(),"brace";if("@"==y)return t.eatWhile(m),"link";if(/\d/.test(y))return t.eatWhile(/\d/),"number";if("/"==y){if(t.eat("%"))return e(t,l,r);if(t.eat("/"))return e(t,l,o)}if("_"==y&&t.eat("_"))return e(t,l,a);if("-"==y&&t.eat("-")){if(" "!=t.peek())return e(t,l,u);if(" "==t.peek())return"brace"}if("'"==y&&t.eat("'"))return e(t,l,n);if("<"!=y)return null;if(t.eat("<"))return e(t,l,f);t.eatWhile(/[\w\$_]/);var x=t.current(),z=c.propertyIsEnumerable(x)&&c[x];return z?z.style:null}function r(e,r){for(var n,i=!1;n=e.next();){if("/"==n&&i){r.tokenize=t;break}i="%"==n}return"comment"}function n(e,r){for(var n,i=!1;n=e.next();){if("'"==n&&i){r.tokenize=t;break}i="'"==n}return"strong"}function i(e,r){var n=r.block;return n&&e.current()?"comment":!n&&e.match($)?(r.tokenize=t,"comment"):n&&e.sol()&&e.match(y)?(r.tokenize=t,"comment"):(e.next(),"comment")}function o(e,r){for(var n,i=!1;n=e.next();){if("/"==n&&i){r.tokenize=t;break}i="/"==n}return"em"}function a(e,r){for(var n,i=!1;n=e.next();){if("_"==n&&i){r.tokenize=t;break}i="_"==n}return"underlined"}function u(e,r){for(var n,i=!1;n=e.next();){if("-"==n&&i){r.tokenize=t;break}i="-"==n}return"strikethrough"}function f(e,r){var n,i,o;return"<<"==e.current()?"macro":(n=e.next())?">"==n&&">"==e.peek()?(e.next(),r.tokenize=t,"macro"):(e.eatWhile(/[\w\$_]/),i=e.current(),o=l.propertyIsEnumerable(i)&&l[i],o?(o.style,i):i):(r.tokenize=t,null)}var c={},l=function(){function e(e){return{type:e,style:"macro"}}return{allTags:e("allTags"),closeAll:e("closeAll"),list:e("list"),newJournal:e("newJournal"),newTiddler:e("newTiddler"),permaview:e("permaview"),saveChanges:e("saveChanges"),search:e("search"),slider:e("slider"),tabs:e("tabs"),tag:e("tag"),tagging:e("tagging"),tags:e("tags"),tiddler:e("tiddler"),timeline:e("timeline"),today:e("today"),version:e("version"),option:e("option"),"with":e("with"),filter:e("filter")}}(),m=/[\w_\-]/i,s=/^\-\-\-\-+$/,d=/^\/\*\*\*$/,h=/^\*\*\*\/$/,k=/^<<<$/,p=/^\/\/\{\{\{$/,b=/^\/\/\}\}\}$/,v=/^<!--\{\{\{-->$/,g=/^<!--\}\}\}-->$/,w=/^\{\{\{$/,y=/^\}\}\}$/,$=/.*?\}\}\}/;return{startState:function(){return{tokenize:t,indented:0,level:0}},token:function(e,t){if(e.eatSpace())return null;var r=t.tokenize(e,t);return r},electricChars:""}}),e.defineMIME("text/x-tiddlywiki","tiddlywiki")});