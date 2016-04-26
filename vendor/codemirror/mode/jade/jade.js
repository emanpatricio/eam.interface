!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../javascript/javascript"),require("../css/css"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../javascript/javascript","../css/css","../htmlmixed/htmlmixed"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("jade",function(e){function n(){this.javaScriptLine=!1,this.javaScriptLineExcludesColon=!1,this.javaScriptArguments=!1,this.javaScriptArgumentsDepth=0,this.isInterpolating=!1,this.interpolationNesting=0,this.jsState=X.startState(),this.restOfLine="",this.isIncludeFiltered=!1,this.isEach=!1,this.lastTag="",this.scriptType="",this.isAttrs=!1,this.attrsNest=[],this.inAttributeName=!0,this.attributeIsType=!1,this.attrValue="",this.indentOf=1/0,this.indentToken="",this.innerMode=null,this.innerState=null,this.innerModeForLine=!1}function i(t,e){if(t.sol()&&(e.javaScriptLine=!1,e.javaScriptLineExcludesColon=!1),e.javaScriptLine){if(e.javaScriptLineExcludesColon&&":"===t.peek())return e.javaScriptLine=!1,void(e.javaScriptLineExcludesColon=!1);var n=X.token(t,e.jsState);return t.eol()&&(e.javaScriptLine=!1),n||!0}}function r(t,e){if(e.javaScriptArguments){if(0===e.javaScriptArgumentsDepth&&"("!==t.peek())return void(e.javaScriptArguments=!1);if("("===t.peek()?e.javaScriptArgumentsDepth++:")"===t.peek()&&e.javaScriptArgumentsDepth--,0===e.javaScriptArgumentsDepth)return void(e.javaScriptArguments=!1);var n=X.token(t,e.jsState);return n||!0}}function a(t){return t.match(/^yield\b/)?"keyword":void 0}function s(t){return t.match(/^(?:doctype) *([^\n]+)?/)?P:void 0}function o(t,e){return t.match("#{")?(e.isInterpolating=!0,e.interpolationNesting=0,"punctuation"):void 0}function c(t,e){if(e.isInterpolating){if("}"===t.peek()){if(e.interpolationNesting--,e.interpolationNesting<0)return t.next(),e.isInterpolating=!1,"punctuation"}else"{"===t.peek()&&e.interpolationNesting++;return X.token(t,e.jsState)||!0}}function u(t,e){return t.match(/^case\b/)?(e.javaScriptLine=!0,K):void 0}function p(t,e){return t.match(/^when\b/)?(e.javaScriptLine=!0,e.javaScriptLineExcludesColon=!0,K):void 0}function d(t){return t.match(/^default\b/)?K:void 0}function l(t,e){return t.match(/^extends?\b/)?(e.restOfLine="string",K):void 0}function h(t,e){return t.match(/^append\b/)?(e.restOfLine="variable",K):void 0}function f(t,e){return t.match(/^prepend\b/)?(e.restOfLine="variable",K):void 0}function v(t,e){return t.match(/^block\b *(?:(prepend|append)\b)?/)?(e.restOfLine="variable",K):void 0}function m(t,e){return t.match(/^include\b/)?(e.restOfLine="string",K):void 0}function S(t,e){return t.match(/^include:([a-zA-Z0-9\-]+)/,!1)&&t.match("include")?(e.isIncludeFiltered=!0,K):void 0}function j(t,e){if(e.isIncludeFiltered){var n=M(t,e);return e.isIncludeFiltered=!1,e.restOfLine="string",n}}function g(t,e){return t.match(/^mixin\b/)?(e.javaScriptLine=!0,K):void 0}function b(t,e){return t.match(/^\+([-\w]+)/)?(t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),"variable"):t.match(/^\+#{/,!1)?(t.next(),e.mixinCallAfter=!0,o(t,e)):void 0}function L(t,e){return e.mixinCallAfter?(e.mixinCallAfter=!1,t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),!0):void 0}function A(t,e){return t.match(/^(if|unless|else if|else)\b/)?(e.javaScriptLine=!0,K):void 0}function k(t,e){return t.match(/^(- *)?(each|for)\b/)?(e.isEach=!0,K):void 0}function y(t,e){if(e.isEach){if(t.match(/^ in\b/))return e.javaScriptLine=!0,e.isEach=!1,K;if(t.sol()||t.eol())e.isEach=!1;else if(t.next()){for(;!t.match(/^ in\b/,!1)&&t.next(););return"variable"}}}function T(t,e){return t.match(/^while\b/)?(e.javaScriptLine=!0,K):void 0}function x(t,e){var n;return(n=t.match(/^(\w(?:[-:\w]*\w)?)\/?/))?(e.lastTag=n[1].toLowerCase(),"script"===e.lastTag&&(e.scriptType="application/javascript"),"tag"):void 0}function M(n,i){if(n.match(/^:([\w\-]+)/)){var r;return e&&e.innerModes&&(r=e.innerModes(n.current().substring(1))),r||(r=n.current().substring(1)),"string"==typeof r&&(r=t.getMode(e,r)),Z(n,i,r),"atom"}}function N(t,e){return t.match(/^(!?=|-)/)?(e.javaScriptLine=!0,"punctuation"):void 0}function O(t){return t.match(/^#([\w-]+)/)?Q:void 0}function w(t){return t.match(/^\.([\w-]+)/)?R:void 0}function I(t,e){return"("==t.peek()?(t.next(),e.isAttrs=!0,e.attrsNest=[],e.inAttributeName=!0,e.attrValue="",e.attributeIsType=!1,"punctuation"):void 0}function E(t,e){if(e.isAttrs){if(W[t.peek()]&&e.attrsNest.push(W[t.peek()]),e.attrsNest[e.attrsNest.length-1]===t.peek())e.attrsNest.pop();else if(t.eat(")"))return e.isAttrs=!1,"punctuation";if(e.inAttributeName&&t.match(/^[^=,\)!]+/))return"="!==t.peek()&&"!"!==t.peek()||(e.inAttributeName=!1,e.jsState=X.startState(),"script"===e.lastTag&&"type"===t.current().trim().toLowerCase()?e.attributeIsType=!0:e.attributeIsType=!1),"attribute";var n=X.token(t,e.jsState);if(e.attributeIsType&&"string"===n&&(e.scriptType=t.current().toString()),0===e.attrsNest.length&&("string"===n||"variable"===n||"keyword"===n))try{return Function("","var x "+e.attrValue.replace(/,\s*$/,"").replace(/^!/,"")),e.inAttributeName=!0,e.attrValue="",t.backUp(t.current().length),E(t,e)}catch(i){}return e.attrValue+=t.current(),n||!0}}function C(t,e){return t.match(/^&attributes\b/)?(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0,"keyword"):void 0}function F(t){return t.sol()&&t.eatSpace()?"indent":void 0}function D(t,e){return t.match(/^ *\/\/(-)?([^\n]*)/)?(e.indentOf=t.indentation(),e.indentToken="comment","comment"):void 0}function V(t){return t.match(/^: */)?"colon":void 0}function q(t,e){return t.match(/^(?:\| ?| )([^\n]+)/)?"string":t.match(/^(<[^\n]*)/,!1)?(Z(t,e,"htmlmixed"),e.innerModeForLine=!0,$(t,e,!0)):void 0}function z(t,e){if(t.eat(".")){var n=null;return"script"===e.lastTag&&-1!=e.scriptType.toLowerCase().indexOf("javascript")?n=e.scriptType.toLowerCase().replace(/"|'/g,""):"style"===e.lastTag&&(n="css"),Z(t,e,n),"dot"}}function U(t){return t.next(),null}function Z(n,i,r){r=t.mimeModes[r]||r,r=e.innerModes?e.innerModes(r)||r:r,r=t.mimeModes[r]||r,r=t.getMode(e,r),i.indentOf=n.indentation(),r&&"null"!==r.name?i.innerMode=r:i.indentToken="string"}function $(t,e,n){return t.indentation()>e.indentOf||e.innerModeForLine&&!t.sol()||n?e.innerMode?(e.innerState||(e.innerState=e.innerMode.startState?e.innerMode.startState(t.indentation()):{}),t.hideFirstChars(e.indentOf+2,function(){return e.innerMode.token(t,e.innerState)||!0})):(t.skipToEnd(),e.indentToken):void(t.sol()&&(e.indentOf=1/0,e.indentToken=null,e.innerMode=null,e.innerState=null))}function B(t,e){if(t.sol()&&(e.restOfLine=""),e.restOfLine){t.skipToEnd();var n=e.restOfLine;return e.restOfLine="",n}}function G(){return new n}function H(t){return t.copy()}function J(t,e){var n=$(t,e)||B(t,e)||c(t,e)||j(t,e)||y(t,e)||E(t,e)||i(t,e)||r(t,e)||L(t,e)||a(t,e)||s(t,e)||o(t,e)||u(t,e)||p(t,e)||d(t,e)||l(t,e)||h(t,e)||f(t,e)||v(t,e)||m(t,e)||S(t,e)||g(t,e)||b(t,e)||A(t,e)||k(t,e)||T(t,e)||x(t,e)||M(t,e)||N(t,e)||O(t,e)||w(t,e)||I(t,e)||C(t,e)||F(t,e)||q(t,e)||D(t,e)||V(t,e)||z(t,e)||U(t,e);return n===!0?null:n}var K="keyword",P="meta",Q="builtin",R="qualifier",W={"{":"}","(":")","[":"]"},X=t.getMode(e,"javascript");return n.prototype.copy=function(){var e=new n;return e.javaScriptLine=this.javaScriptLine,e.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon,e.javaScriptArguments=this.javaScriptArguments,e.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth,e.isInterpolating=this.isInterpolating,e.interpolationNesting=this.interpolationNesting,e.jsState=t.copyState(X,this.jsState),e.innerMode=this.innerMode,this.innerMode&&this.innerState&&(e.innerState=t.copyState(this.innerMode,this.innerState)),e.restOfLine=this.restOfLine,e.isIncludeFiltered=this.isIncludeFiltered,e.isEach=this.isEach,e.lastTag=this.lastTag,e.scriptType=this.scriptType,e.isAttrs=this.isAttrs,e.attrsNest=this.attrsNest.slice(),e.inAttributeName=this.inAttributeName,e.attributeIsType=this.attributeIsType,e.attrValue=this.attrValue,e.indentOf=this.indentOf,e.indentToken=this.indentToken,e.innerModeForLine=this.innerModeForLine,e},{startState:G,copyState:H,token:J}},"javascript","css","htmlmixed"),t.defineMIME("text/x-jade","jade")});