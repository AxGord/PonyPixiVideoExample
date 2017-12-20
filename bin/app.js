!function(e,n){"use strict";"function"==typeof define&&define.amd?define("stackframe",[],n):"object"==typeof exports?module.exports=n():e.StackFrame=n()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e,n,t,r,o,i){void 0!==e&&this.setFunctionName(e),void 0!==n&&this.setArgs(n),void 0!==t&&this.setFileName(t),void 0!==r&&this.setLineNumber(r),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return n.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(e){this.functionName=String(e)},getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getFileName:function(){return this.fileName},setFileName:function(e){this.fileName=String(e)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(n){if(!e(n))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(n)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(n){if(!e(n))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(n)},getSource:function(){return this.source},setSource:function(e){this.source=String(e)},toString:function(){var n=this.getFunctionName()||"{anonymous}",t="("+(this.getArgs()||[]).join(",")+")",r=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+t+r+o+i}},n});var SourceMap=function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){function r(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new a(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var t=s.getArg(n,"version"),r=s.getArg(n,"sources"),o=s.getArg(n,"names",[]),i=s.getArg(n,"sourceRoot",null),a=s.getArg(n,"sourcesContent",null),u=s.getArg(n,"mappings"),l=s.getArg(n,"file",null);if(t!=this._version)throw new Error("Unsupported version: "+t);r=r.map(String).map(s.normalize).map(function(e){return i&&s.isAbsolute(i)&&s.isAbsolute(e)?s.relative(i,e):e}),this._names=c.fromArray(o.map(String),!0),this._sources=c.fromArray(r,!0),this.sourceRoot=i,this.sourcesContent=a,this._mappings=u,this.file=l}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var t=s.getArg(n,"version"),o=s.getArg(n,"sections");if(t!=this._version)throw new Error("Unsupported version: "+t);this._sources=new c,this._names=new c;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=s.getArg(e,"offset"),t=s.getArg(n,"line"),o=s.getArg(n,"column");if(t<i.line||t===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:t+1,generatedColumn:o+1},consumer:new r(s.getArg(e,"map"))}})}var s=t(1),u=t(2),c=t(3).ArraySet,l=t(4),f=t(6).quickSort;r.fromSourceMap=function(e){return o.fromSourceMap(e)},r.prototype._version=3,r.prototype.__generatedMappings=null,Object.defineProperty(r.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),r.prototype.__originalMappings=null,Object.defineProperty(r.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),r.prototype._charIsMappingSeparator=function(e,n){var t=e.charAt(n);return";"===t||","===t},r.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},r.GENERATED_ORDER=1,r.ORIGINAL_ORDER=2,r.GREATEST_LOWER_BOUND=1,r.LEAST_UPPER_BOUND=2,r.prototype.eachMapping=function(e,n,t){var o,i=n||null,a=t||r.GENERATED_ORDER;switch(a){case r.GENERATED_ORDER:o=this._generatedMappings;break;case r.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=s.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},r.prototype.allGeneratedPositionsFor=function(e){var n=s.getArg(e,"line"),t={source:s.getArg(e,"source"),originalLine:n,originalColumn:s.getArg(e,"column",0)};if(null!=this.sourceRoot&&(t.source=s.relative(this.sourceRoot,t.source)),!this._sources.has(t.source))return[];t.source=this._sources.indexOf(t.source);var r=[],o=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var a=i.originalLine;i&&i.originalLine===a;)r.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var c=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==c;)r.push({line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return r},n.SourceMapConsumer=r,o.prototype=Object.create(r.prototype),o.prototype.consumer=r,o.fromSourceMap=function(e){var n=Object.create(o.prototype),t=n._names=c.fromArray(e._names.toArray(),!0),r=n._sources=c.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var a=e._mappings.toArray().slice(),u=n.__generatedMappings=[],l=n.__originalMappings=[],p=0,g=a.length;g>p;p++){var h=a[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=r.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=t.indexOf(h.name)),l.push(m)),u.push(m)}return f(n.__originalMappings,s.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var t,r,o,a,u,c=1,p=0,g=0,h=0,m=0,d=0,v=e.length,_=0,y={},w={},b=[],C=[];v>_;)if(";"===e.charAt(_))c++,_++,p=0;else if(","===e.charAt(_))_++;else{for(t=new i,t.generatedLine=c,a=_;v>a&&!this._charIsMappingSeparator(e,a);a++);if(r=e.slice(_,a),o=y[r])_+=r.length;else{for(o=[];a>_;)l.decode(e,_,w),u=w.value,_=w.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[r]=o}t.generatedColumn=p+o[0],p=t.generatedColumn,o.length>1&&(t.source=m+o[1],m+=o[1],t.originalLine=g+o[2],g=t.originalLine,t.originalLine+=1,t.originalColumn=h+o[3],h=t.originalColumn,o.length>4&&(t.name=d+o[4],d+=o[4])),C.push(t),"number"==typeof t.originalLine&&b.push(t)}f(C,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,f(b,s.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,t,r,o,i){if(e[t]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[t]);if(e[r]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[r]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var t=this._generatedMappings[e+1];if(n.generatedLine===t.generatedLine){n.lastGeneratedColumn=t.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},t=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",r.GREATEST_LOWER_BOUND));if(t>=0){var o=this._generatedMappings[t];if(o.generatedLine===n.generatedLine){var i=s.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=s.join(this.sourceRoot,i)));var a=s.getArg(o,"name",null);return null!==a&&(a=this._names.at(a)),{source:i,line:s.getArg(o,"originalLine",null),column:s.getArg(o,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}):!1},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var t;if(null!=this.sourceRoot&&(t=s.urlParse(this.sourceRoot))){var r=e.replace(/^file:\/\//,"");if("file"==t.scheme&&this._sources.has(r))return this.sourcesContent[this._sources.indexOf(r)];if((!t.path||"/"==t.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=s.getArg(e,"source");if(null!=this.sourceRoot&&(n=s.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var t={source:n,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},o=this._findMapping(t,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",r.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===t.source)return{line:s.getArg(i,"generatedLine",null),column:s.getArg(i,"generatedColumn",null),lastColumn:s.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},n.BasicSourceMapConsumer=o,a.prototype=Object.create(r.prototype),a.prototype.constructor=r,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var t=0;t<this._sections[n].consumer.sources.length;t++)e.push(this._sections[n].consumer.sources[t]);return e}}),a.prototype.originalPositionFor=function(e){var n={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},t=u.search(n,this._sections,function(e,n){var t=e.generatedLine-n.generatedOffset.generatedLine;return t?t:e.generatedColumn-n.generatedOffset.generatedColumn}),r=this._sections[t];return r?r.consumer.originalPositionFor({line:n.generatedLine-(r.generatedOffset.generatedLine-1),column:n.generatedColumn-(r.generatedOffset.generatedLine===n.generatedLine?r.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,n){for(var t=0;t<this._sections.length;t++){var r=this._sections[t],o=r.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var t=this._sections[n];if(-1!==t.consumer.sources.indexOf(s.getArg(e,"source"))){var r=t.consumer.generatedPositionFor(e);if(r){var o={line:r.line+(t.generatedOffset.generatedLine-1),column:r.column+(t.generatedOffset.generatedLine===r.line?t.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var t=0;t<this._sections.length;t++)for(var r=this._sections[t],o=r.consumer._generatedMappings,i=0;i<o.length;i++){var a=o[i],u=r.consumer._sources.at(a.source);null!==r.consumer.sourceRoot&&(u=s.join(r.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=r.consumer._names.at(a.name);this._names.add(c),c=this._names.indexOf(c);var l={source:u,generatedLine:a.generatedLine+(r.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(r.generatedOffset.generatedLine===a.generatedLine?r.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}f(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),f(this.__originalMappings,s.compareByOriginalPositions)},n.IndexedSourceMapConsumer=a},function(e,n){function t(e,n,t){if(n in e)return e[n];if(3===arguments.length)return t;throw new Error('"'+n+'" is a required argument.')}function r(e){var n=e.match(d);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function o(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function i(e){var t=e,i=r(e);if(i){if(!i.path)return e;t=i.path}for(var a,s=n.isAbsolute(t),u=t.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--));return t=u.join("/"),""===t&&(t=s?"/":"."),i?(i.path=t,o(i)):t}function a(e,n){""===e&&(e="."),""===n&&(n=".");var t=r(n),a=r(e);if(a&&(e=a.path||"/"),t&&!t.scheme)return a&&(t.scheme=a.scheme),o(t);if(t||n.match(v))return n;if(a&&!a.host&&!a.path)return a.host=n,o(a);var s="/"===n.charAt(0)?n:i(e.replace(/\/+$/,"")+"/"+n);return a?(a.path=s,o(a)):s}function s(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var t=0;0!==n.indexOf(e+"/");){var r=e.lastIndexOf("/");if(0>r)return n;if(e=e.slice(0,r),e.match(/^([^\/]+:\/)?\/*$/))return n;++t}return Array(t+1).join("../")+n.substr(e.length+1)}function u(e){return e}function c(e){return f(e)?"$"+e:e}function l(e){return f(e)?e.slice(1):e}function f(e){if(!e)return!1;var n=e.length;if(9>n)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var t=n-10;t>=0;t--)if(36!==e.charCodeAt(t))return!1;return!0}function p(e,n,t){var r=e.source-n.source;return 0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r||t?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=e.generatedLine-n.generatedLine,0!==r?r:e.name-n.name))))}function g(e,n,t){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r||t?r:(r=e.source-n.source,0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:e.name-n.name))))}function h(e,n){return e===n?0:e>n?1:-1}function m(e,n){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=h(e.source,n.source),0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:h(e.name,n.name)))))}n.getArg=t;var d=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,v=/^data:.+\,.+$/;n.urlParse=r,n.urlGenerate=o,n.normalize=i,n.join=a,n.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(d)},n.relative=s;var _=function(){var e=Object.create(null);return!("__proto__"in e)}();n.toSetString=_?u:c,n.fromSetString=_?u:l,n.compareByOriginalPositions=p,n.compareByGeneratedPositionsDeflated=g,n.compareByGeneratedPositionsInflated=m},function(e,n){function t(e,r,o,i,a,s){var u=Math.floor((r-e)/2)+e,c=a(o,i[u],!0);return 0===c?u:c>0?r-u>1?t(u,r,o,i,a,s):s==n.LEAST_UPPER_BOUND?r<i.length?r:-1:u:u-e>1?t(e,u,o,i,a,s):s==n.LEAST_UPPER_BOUND?u:0>e?-1:e}n.GREATEST_LOWER_BOUND=1,n.LEAST_UPPER_BOUND=2,n.search=function(e,r,o,i){if(0===r.length)return-1;var a=t(-1,r.length,e,r,o,i||n.GREATEST_LOWER_BOUND);if(0>a)return-1;for(;a-1>=0&&0===o(r[a],r[a-1],!0);)--a;return a}},function(e,n,t){function r(){this._array=[],this._set=Object.create(null)}var o=t(1),i=Object.prototype.hasOwnProperty;r.fromArray=function(e,n){for(var t=new r,o=0,i=e.length;i>o;o++)t.add(e[o],n);return t},r.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},r.prototype.add=function(e,n){var t=o.toSetString(e),r=i.call(this._set,t),a=this._array.length;(!r||n)&&this._array.push(e),r||(this._set[t]=a)},r.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},r.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},r.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},r.prototype.toArray=function(){return this._array.slice()},n.ArraySet=r},function(e,n,t){function r(e){return 0>e?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),t=e>>1;return n?-t:t}var i=t(5),a=5,s=1<<a,u=s-1,c=s;n.encode=function(e){var n,t="",o=r(e);do{n=o&u,o>>>=a,o>0&&(n|=c),t+=i.encode(n)}while(o>0);return t},n.decode=function(e,n,t){var r,s,l=e.length,f=0,p=0;do{if(n>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(s=i.decode(e.charCodeAt(n++)),-1===s)throw new Error("Invalid base64 digit: "+e.charAt(n-1));r=!!(s&c),s&=u,f+=s<<p,p+=a}while(r);t.value=o(f),t.rest=n}},function(e,n){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");n.encode=function(e){if(e>=0&&e<t.length)return t[e];throw new TypeError("Must be between 0 and 63: "+e)},n.decode=function(e){var n=65,t=90,r=97,o=122,i=48,a=57,s=43,u=47,c=26,l=52;return e>=n&&t>=e?e-n:e>=r&&o>=e?e-r+c:e>=i&&a>=e?e-i+l:e==s?62:e==u?63:-1}},function(e,n){function t(e,n,t){var r=e[n];e[n]=e[t],e[t]=r}function r(e,n){return Math.round(e+Math.random()*(n-e))}function o(e,n,i,a){if(a>i){var s=r(i,a),u=i-1;t(e,s,a);for(var c=e[a],l=i;a>l;l++)n(e[l],c)<=0&&(u+=1,t(e,u,l));t(e,u+1,l);var f=u+1;o(e,n,i,f-1),o(e,n,f+1,a)}}n.quickSort=function(e,n){o(e,n,0,e.length-1)}}]);!function(e,n){"use strict";"function"==typeof define&&define.amd?define("stacktrace-gps",["source-map","stackframe"],n):"object"==typeof exports?module.exports=n(require("source-map/lib/source-map-consumer"),require("stackframe")):e.StackTraceGPS=n(e.SourceMap||e.sourceMap,e.StackFrame)}(this,function(e,n){"use strict";function t(e){return new Promise(function(n,t){var r=new XMLHttpRequest;r.open("get",e),r.onerror=t,r.onreadystatechange=function(){4===r.readyState&&(r.status>=200&&r.status<300?n(r.responseText):t(new Error("HTTP status: "+r.status+" retrieving "+e)))},r.send()})}function r(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var t,r=/function\s+([^(]*?)\s*\(([^)]*)\)/,o=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,i=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,a=e.split("\n"),s="",u=Math.min(n,20),c=0;u>c;++c){var l=a[n-c-1],f=l.indexOf("//");if(f>=0&&(l=l.substr(0,f)),l){if(s=l+s,t=o.exec(s),t&&t[1])return t[1];if(t=r.exec(s),t&&t[1])return t[1];if(t=i.exec(s),t&&t[1])return t[1]}}}function a(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function s(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){var n=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/.exec(e);if(n&&n[1])return n[1];throw new Error("sourceMappingURL not found")}function c(t,r,o,i,a){var s=new e.SourceMapConsumer(t),u=s.originalPositionFor({line:o,column:i}),c=s.sourceContentFor(u.source);return c&&(a[u.source]=c),new n(u.name,r,u.source,u.line,u.column)}return function l(e){return this instanceof l?(e=e||{},this.sourceCache=e.sourceCache||{},this.ajax=e.ajax||t,this._atob=e.atob||r,this._get=function(n){return new Promise(function(t,r){var o="data:"===n.substr(0,5);if(this.sourceCache[n])t(this.sourceCache[n]);else if(e.offline&&!o)r(new Error("Cannot make network requests in offline mode"));else if(o){var i=/^data:application\/json;([\w=:"-]+;)*base64,/,a=n.match(i);if(a){var s=a[0].length,u=n.substr(s),c=this._atob(u);this.sourceCache[n]=c,t(c)}else r(new Error("The encoding of the inline sourcemap is not supported"))}else{var l=this.ajax(n,{method:"get"});this.sourceCache[n]=l,l.then(t,r)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,t){this.getMappedLocation(e).then(function(e){function t(){n(e)}this.findFunctionName(e).then(n,t)["catch"](t)}.bind(this),t)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(t,r){s(e),this._get(e.fileName).then(function(r){var o=i(r,e.lineNumber,e.columnNumber);t(new n(o,e.args,e.fileName,e.lineNumber,e.columnNumber))},r)["catch"](r)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,t){a(),s(e);var r=this.sourceCache,i=e.fileName;this._get(i).then(function(a){var s=u(a),l="data:"===s.substr(0,5),f=i.substring(0,i.lastIndexOf("/")+1);"/"===s[0]||l||/^https?:\/\/|^\/\//i.test(s)||(s=f+s),this._get(s).then(function(t){var i=e.lineNumber,a=e.columnNumber;"string"==typeof t&&(t=o(t.replace(/^\)\]\}'/,""))),"undefined"==typeof t.sourceRoot&&(t.sourceRoot=f),n(c(t,e.args,i,a,r))},t)["catch"](t)}.bind(this),t)["catch"](t)}.bind(this))})):new l(e)}}),function(e,n){"use strict";"function"==typeof define&&define.amd?define("stack-generator",["stackframe"],n):"object"==typeof exports?module.exports=n(require("stackframe")):e.StackGenerator=n(e.StackFrame)}(this,function(e){return{backtrace:function(n){var t=[],r=10;"object"==typeof n&&"number"==typeof n.maxStackSize&&(r=n.maxStackSize);for(var o=arguments.callee;o&&t.length<r;){for(var i=new Array(o.arguments.length),a=0;a<i.length;++a)i[a]=o.arguments[a];/function(?:\s+([\w$]+))+\s*\(/.test(o.toString())?t.push(new e(RegExp.$1||void 0,i)):t.push(new e(void 0,i));try{o=o.caller}catch(s){break}}return t}}}),function(e,n){"use strict";"function"==typeof define&&define.amd?define("error-stack-parser",["stackframe"],n):"object"==typeof exports?module.exports=n(require("stackframe")):e.ErrorStackParser=n(e.StackFrame)}(this,function(e){"use strict";function n(e,n,t){if("function"==typeof Array.prototype.map)return e.map(n,t);for(var r=new Array(e.length),o=0;o<e.length;o++)r[o]=n.call(t,e[o]);return r}function t(e,n,t){if("function"==typeof Array.prototype.filter)return e.filter(n,t);for(var r=[],o=0;o<e.length;o++)n.call(t,e[o])&&r.push(e[o]);return r}function r(e,n){if("function"==typeof Array.prototype.indexOf)return e.indexOf(n);for(var t=0;t<e.length;t++)if(e[t]===n)return t;return-1}var o=/(^|@)\S+\:\d+/,i=/^\s*at .*(\S+\:\d+|\(native\))/m,a=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(i))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(-1===e.indexOf(":"))return[e];var n=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,t=n.exec(e.replace(/[\(\)]/g,""));return[t[1],t[2]||void 0,t[3]||void 0]},parseV8OrIE:function(o){var a=t(o.stack.split("\n"),function(e){return!!e.match(i)},this);return n(a,function(n){n.indexOf("(eval ")>-1&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var t=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),o=this.extractLocation(t.pop()),i=t.join(" ")||void 0,a=r(["eval","<anonymous>"],o[0])>-1?void 0:o[0];return new e(i,void 0,a,o[1],o[2],n)},this)},parseFFOrSafari:function(r){var o=t(r.stack.split("\n"),function(e){return!e.match(a)},this);return n(o,function(n){if(n.indexOf(" > eval")>-1&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),-1===n.indexOf("@")&&-1===n.indexOf(":"))return new e(n);var t=n.split("@"),r=this.extractLocation(t.pop()),o=t.join("@")||void 0;return new e(o,void 0,r[0],r[1],r[2],n)},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(n){for(var t=/Line (\d+).*script (?:in )?(\S+)/i,r=n.message.split("\n"),o=[],i=2,a=r.length;a>i;i+=2){var s=t.exec(r[i]);s&&o.push(new e(void 0,void 0,s[2],s[1],void 0,r[i]))}return o},parseOpera10:function(n){for(var t=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,r=n.stacktrace.split("\n"),o=[],i=0,a=r.length;a>i;i+=2){var s=t.exec(r[i]);s&&o.push(new e(s[3]||void 0,void 0,s[2],s[1],void 0,r[i]))}return o},parseOpera11:function(r){var i=t(r.stack.split("\n"),function(e){return!!e.match(o)&&!e.match(/^Error created at/)},this);return n(i,function(n){var t,r=n.split("@"),o=this.extractLocation(r.pop()),i=r.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(t=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===t||"[arguments not available]"===t?void 0:t.split(",");return new e(a,s,o[0],o[1],o[2],n)},this)}}}),function(e,n){"use strict";"function"==typeof define&&define.amd?define("stacktrace",["error-stack-parser","stack-generator","stacktrace-gps"],n):"object"==typeof exports?module.exports=n(require("error-stack-parser"),require("stack-generator"),require("stacktrace-gps")):e.StackTrace=n(e.ErrorStackParser,e.StackGenerator,e.StackTraceGPS)}(this,function(e,n,t){function r(e,n){var t={};return[e,n].forEach(function(e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}),t}function o(e){return e.stack||e["opera#sourceloc"]}var i={filter:function(e){return-1===(e.functionName||"").indexOf("StackTrace$$")&&-1===(e.functionName||"").indexOf("ErrorStackParser$$")&&-1===(e.functionName||"").indexOf("StackTraceGPS$$")&&-1===(e.functionName||"").indexOf("StackGenerator$$")},sourceCache:{}},a=function(){try{throw new Error}catch(e){return e}};return{get:function(e){var n=a();return o(n)?this.fromError(n,e):this.generateArtificially(e)},getSync:function(t){t=r(i,t);var s,u=a();return s=o(u)?e.parse(u):n.backtrace(t),"function"==typeof t.filter&&(s=s.filter(t.filter)),s},fromError:function(n,o){o=r(i,o);var a=new t(o);return new Promise(function(t){var r=e.parse(n);"function"==typeof o.filter&&(r=r.filter(o.filter)),t(Promise.all(r.map(function(e){return new Promise(function(n){function t(){n(e)}a.pinpoint(e).then(n,t)["catch"](t)})})))}.bind(this))},generateArtificially:function(e){e=r(i,e);var t=n.backtrace(e);return"function"==typeof e.filter&&(t=t.filter(e.filter)),Promise.resolve(t)},instrument:function(e,n,t,r){if("function"!=typeof e)throw new Error("Cannot instrument non-function object");if("function"==typeof e.__stacktraceOriginalFn)return e;var i=function(){try{return this.get().then(n,t)["catch"](t),e.apply(r||this,arguments)}catch(i){throw o(i)&&this.fromError(i).then(n,t)["catch"](t),i}}.bind(this);return i.__stacktraceOriginalFn=e,i},deinstrument:function(e){if("function"!=typeof e)throw new Error("Cannot de-instrument non-function object");return"function"==typeof e.__stacktraceOriginalFn?e.__stacktraceOriginalFn:e},report:function(e,n,t){return new Promise(function(r,o){var i=new XMLHttpRequest;i.onerror=o,i.onreadystatechange=function(){4===i.readyState&&(i.status>=200&&i.status<400?r(i.responseText):o(new Error("POST to "+n+" failed with status: "+i.status)))},i.open("post",n),i.setRequestHeader("Content-Type","application/json");var a={stack:e};void 0!==t&&(a.message=t),i.send(JSON.stringify(a))})}}});!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.PIXI=t()}}(function(){var t;return function t(e,r,n){function i(s,a){if(!r[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var l=r[s]={exports:{}};e[s][0].call(l.exports,function(t){var r=e[s][1][t];return i(r?r:t)},l,l.exports,t,e,r,n)}return r[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,e,r){"use strict";"use restrict";function n(t){var e=32;return t&=-t,t&&e--,65535&t&&(e-=16),16711935&t&&(e-=8),252645135&t&&(e-=4),858993459&t&&(e-=2),1431655765&t&&(e-=1),e}var i=32;r.INT_BITS=i,r.INT_MAX=2147483647,r.INT_MIN=-1<<i-1,r.sign=function(t){return(t>0)-(t<0)},r.abs=function(t){var e=t>>i-1;return(t^e)-e},r.min=function(t,e){return e^(t^e)&-(t<e)},r.max=function(t,e){return t^(t^e)&-(t<e)},r.isPow2=function(t){return!(t&t-1||!t)},r.log2=function(t){var e,r;return e=(t>65535)<<4,t>>>=e,r=(t>255)<<3,t>>>=r,e|=r,r=(t>15)<<2,t>>>=r,e|=r,r=(t>3)<<1,t>>>=r,e|=r,e|t>>1},r.log10=function(t){return t>=1e9?9:t>=1e8?8:t>=1e7?7:t>=1e6?6:t>=1e5?5:t>=1e4?4:t>=1e3?3:t>=100?2:t>=10?1:0},r.popCount=function(t){return t-=t>>>1&1431655765,t=(858993459&t)+(t>>>2&858993459),16843009*(t+(t>>>4)&252645135)>>>24},r.countTrailingZeros=n,r.nextPow2=function(t){return t+=0===t,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t+1},r.prevPow2=function(t){return t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t-(t>>>1)},r.parity=function(t){return t^=t>>>16,t^=t>>>8,t^=t>>>4,t&=15,27030>>>t&1};var o=new Array(256);!function(t){for(var e=0;e<256;++e){var r=e,n=e,i=7;for(r>>>=1;r;r>>>=1)n<<=1,n|=1&r,--i;t[e]=n<<i&255}}(o),r.reverse=function(t){return o[255&t]<<24|o[t>>>8&255]<<16|o[t>>>16&255]<<8|o[t>>>24&255]},r.interleave2=function(t,e){return t&=65535,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e&=65535,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1},r.deinterleave2=function(t,e){return t=t>>>e&1431655765,t=858993459&(t|t>>>1),t=252645135&(t|t>>>2),t=16711935&(t|t>>>4),t=65535&(t|t>>>16),t<<16>>16},r.interleave3=function(t,e,r){return t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),e&=1023,e=4278190335&(e|e<<16),e=251719695&(e|e<<8),e=3272356035&(e|e<<4),e=1227133513&(e|e<<2),t|=e<<1,r&=1023,r=4278190335&(r|r<<16),r=251719695&(r|r<<8),r=3272356035&(r|r<<4),r=1227133513&(r|r<<2),t|r<<2},r.deinterleave3=function(t,e){return t=t>>>e&1227133513,t=3272356035&(t|t>>>2),t=251719695&(t|t>>>4),t=4278190335&(t|t>>>8),t=1023&(t|t>>>16),t<<22>>22},r.nextCombination=function(t){var e=t|t-1;return e+1|(~e&-~e)-1>>>n(t)+1}},{}],2:[function(t,e,r){"use strict";function n(t,e,r){r=r||2;var n=e&&e.length,o=n?e[0]*r:t.length,a=i(t,0,o,r,!0),u=[];if(!a)return u;var h,l,d,f,p,v,y;if(n&&(a=c(t,e,a,r)),t.length>80*r){h=d=t[0],l=f=t[1];for(var g=r;g<o;g+=r)p=t[g],v=t[g+1],p<h&&(h=p),v<l&&(l=v),p>d&&(d=p),v>f&&(f=v);y=Math.max(d-h,f-l)}return s(a,u,r,h,l,y),u}function i(t,e,r,n,i){var o,s;if(i===A(t,e,r,n)>0)for(o=e;o<r;o+=n)s=M(o,t[o],t[o+1],s);else for(o=r-n;o>=e;o-=n)s=M(o,t[o],t[o+1],s);return s&&T(s,s.next)&&(C(s),s=s.next),s}function o(t,e){if(!t)return t;e||(e=t);var r,n=t;do{if(r=!1,n.steiner||!T(n,n.next)&&0!==x(n.prev,n,n.next))n=n.next;else{if(C(n),n=e=n.prev,n===n.next)return null;r=!0}}while(r||n!==e);return e}function s(t,e,r,n,i,c,d){if(t){!d&&c&&v(t,n,i,c);for(var f,p,y=t;t.prev!==t.next;)if(f=t.prev,p=t.next,c?u(t,n,i,c):a(t))e.push(f.i/r),e.push(t.i/r),e.push(p.i/r),C(t),t=p.next,y=p.next;else if(t=p,t===y){d?1===d?(t=h(t,e,r),s(t,e,r,n,i,c,2)):2===d&&l(t,e,r,n,i,c):s(o(t),e,r,n,i,c,1);break}}}function a(t){var e=t.prev,r=t,n=t.next;if(x(e,r,n)>=0)return!1;for(var i=t.next.next;i!==t.prev;){if(_(e.x,e.y,r.x,r.y,n.x,n.y,i.x,i.y)&&x(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function u(t,e,r,n){var i=t.prev,o=t,s=t.next;if(x(i,o,s)>=0)return!1;for(var a=i.x<o.x?i.x<s.x?i.x:s.x:o.x<s.x?o.x:s.x,u=i.y<o.y?i.y<s.y?i.y:s.y:o.y<s.y?o.y:s.y,h=i.x>o.x?i.x>s.x?i.x:s.x:o.x>s.x?o.x:s.x,l=i.y>o.y?i.y>s.y?i.y:s.y:o.y>s.y?o.y:s.y,c=g(a,u,e,r,n),d=g(h,l,e,r,n),f=t.nextZ;f&&f.z<=d;){if(f!==t.prev&&f!==t.next&&_(i.x,i.y,o.x,o.y,s.x,s.y,f.x,f.y)&&x(f.prev,f,f.next)>=0)return!1;f=f.nextZ}for(f=t.prevZ;f&&f.z>=c;){if(f!==t.prev&&f!==t.next&&_(i.x,i.y,o.x,o.y,s.x,s.y,f.x,f.y)&&x(f.prev,f,f.next)>=0)return!1;f=f.prevZ}return!0}function h(t,e,r){var n=t;do{var i=n.prev,o=n.next.next;!T(i,o)&&w(i,n,n.next,o)&&S(i,o)&&S(o,i)&&(e.push(i.i/r),e.push(n.i/r),e.push(o.i/r),C(n),C(n.next),n=t=o),n=n.next}while(n!==t);return n}function l(t,e,r,n,i,a){var u=t;do{for(var h=u.next.next;h!==u.prev;){if(u.i!==h.i&&b(u,h)){var l=P(u,h);return u=o(u,u.next),l=o(l,l.next),s(u,e,r,n,i,a),void s(l,e,r,n,i,a)}h=h.next}u=u.next}while(u!==t)}function c(t,e,r,n){var s,a,u,h,l,c=[];for(s=0,a=e.length;s<a;s++)u=e[s]*n,h=s<a-1?e[s+1]*n:t.length,l=i(t,u,h,n,!1),l===l.next&&(l.steiner=!0),c.push(m(l));for(c.sort(d),s=0;s<c.length;s++)f(c[s],r),r=o(r,r.next);return r}function d(t,e){return t.x-e.x}function f(t,e){if(e=p(t,e)){var r=P(e,t);o(r,r.next)}}function p(t,e){var r,n=e,i=t.x,o=t.y,s=-(1/0);do{if(o<=n.y&&o>=n.next.y){var a=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(a<=i&&a>s){if(s=a,a===i){if(o===n.y)return n;if(o===n.next.y)return n.next}r=n.x<n.next.x?n:n.next}}n=n.next}while(n!==e);if(!r)return null;if(i===s)return r.prev;var u,h=r,l=r.x,c=r.y,d=1/0;for(n=r.next;n!==h;)i>=n.x&&n.x>=l&&_(o<c?i:s,o,l,c,o<c?s:i,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(i-n.x),(u<d||u===d&&n.x>r.x)&&S(n,t)&&(r=n,d=u)),n=n.next;return r}function v(t,e,r,n){var i=t;do{null===i.z&&(i.z=g(i.x,i.y,e,r,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,y(i)}function y(t){var e,r,n,i,o,s,a,u,h=1;do{for(r=t,t=null,o=null,s=0;r;){for(s++,n=r,a=0,e=0;e<h&&(a++,n=n.nextZ,n);e++);for(u=h;a>0||u>0&&n;)0===a?(i=n,n=n.nextZ,u--):0!==u&&n?r.z<=n.z?(i=r,r=r.nextZ,a--):(i=n,n=n.nextZ,u--):(i=r,r=r.nextZ,a--),o?o.nextZ=i:t=i,i.prevZ=o,o=i;r=n}o.nextZ=null,h*=2}while(s>1);return t}function g(t,e,r,n,i){return t=32767*(t-r)/i,e=32767*(e-n)/i,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1}function m(t){var e=t,r=t;do{e.x<r.x&&(r=e),e=e.next}while(e!==t);return r}function _(t,e,r,n,i,o,s,a){return(i-s)*(e-a)-(t-s)*(o-a)>=0&&(t-s)*(n-a)-(r-s)*(e-a)>=0&&(r-s)*(o-a)-(i-s)*(n-a)>=0}function b(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!E(t,e)&&S(t,e)&&S(e,t)&&O(t,e)}function x(t,e,r){return(e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function T(t,e){return t.x===e.x&&t.y===e.y}function w(t,e,r,n){return!!(T(t,e)&&T(r,n)||T(t,n)&&T(r,e))||x(t,e,r)>0!=x(t,e,n)>0&&x(r,n,t)>0!=x(r,n,e)>0}function E(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&w(r,r.next,t,e))return!0;r=r.next}while(r!==t);return!1}function S(t,e){return x(t.prev,t,t.next)<0?x(t,e,t.next)>=0&&x(t,t.prev,e)>=0:x(t,e,t.prev)<0||x(t,t.next,e)<0}function O(t,e){var r=t,n=!1,i=(t.x+e.x)/2,o=(t.y+e.y)/2;do{r.y>o!=r.next.y>o&&i<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next}while(r!==t);return n}function P(t,e){var r=new R(t.i,t.x,t.y),n=new R(e.i,e.x,e.y),i=t.next,o=e.prev;return t.next=e,e.prev=t,r.next=i,i.prev=r,n.next=r,r.prev=n,o.next=n,n.prev=o,n}function M(t,e,r,n){var i=new R(t,e,r);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function C(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function R(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A(t,e,r,n){for(var i=0,o=e,s=r-n;o<r;o+=n)i+=(t[s]-t[o])*(t[o+1]+t[s+1]),s=o;return i}e.exports=n,n.deviation=function(t,e,r,n){var i=e&&e.length,o=i?e[0]*r:t.length,s=Math.abs(A(t,0,o,r));if(i)for(var a=0,u=e.length;a<u;a++){var h=e[a]*r,l=a<u-1?e[a+1]*r:t.length;s-=Math.abs(A(t,h,l,r))}var c=0;for(a=0;a<n.length;a+=3){var d=n[a]*r,f=n[a+1]*r,p=n[a+2]*r;c+=Math.abs((t[d]-t[p])*(t[f+1]-t[d+1])-(t[d]-t[f])*(t[p+1]-t[d+1]))}return 0===s&&0===c?0:Math.abs((c-s)/s)},n.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},n=0,i=0;i<t.length;i++){for(var o=0;o<t[i].length;o++)for(var s=0;s<e;s++)r.vertices.push(t[i][o][s]);i>0&&(n+=t[i-1].length,r.holes.push(n))}return r}},{}],3:[function(t,e,r){"use strict";function n(){}function i(t,e,r){this.fn=t,this.context=e,this.once=r||!1}function o(){this._events=new n,this._eventsCount=0}var s=Object.prototype.hasOwnProperty,a="~";Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(a=!1)),o.prototype.eventNames=function(){var t,e,r=[];if(0===this._eventsCount)return r;for(e in t=this._events)s.call(t,e)&&r.push(a?e.slice(1):e);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},o.prototype.listeners=function(t,e){var r=a?a+t:t,n=this._events[r];if(e)return!!n;if(!n)return[];if(n.fn)return[n.fn];for(var i=0,o=n.length,s=new Array(o);i<o;i++)s[i]=n[i].fn;return s},o.prototype.emit=function(t,e,r,n,i,o){var s=a?a+t:t;if(!this._events[s])return!1;var u,h,l=this._events[s],c=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),c){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,n),!0;case 5:return l.fn.call(l.context,e,r,n,i),!0;case 6:return l.fn.call(l.context,e,r,n,i,o),!0}for(h=1,u=new Array(c-1);h<c;h++)u[h-1]=arguments[h];l.fn.apply(l.context,u)}else{var d,f=l.length;for(h=0;h<f;h++)switch(l[h].once&&this.removeListener(t,l[h].fn,void 0,!0),c){case 1:l[h].fn.call(l[h].context);break;case 2:l[h].fn.call(l[h].context,e);break;case 3:l[h].fn.call(l[h].context,e,r);break;case 4:l[h].fn.call(l[h].context,e,r,n);break;default:if(!u)for(d=1,u=new Array(c-1);d<c;d++)u[d-1]=arguments[d];l[h].fn.apply(l[h].context,u)}}return!0},o.prototype.on=function(t,e,r){var n=new i(e,r||this),o=a?a+t:t;return this._events[o]?this._events[o].fn?this._events[o]=[this._events[o],n]:this._events[o].push(n):(this._events[o]=n,this._eventsCount++),this},o.prototype.once=function(t,e,r){var n=new i(e,r||this,!0),o=a?a+t:t;return this._events[o]?this._events[o].fn?this._events[o]=[this._events[o],n]:this._events[o].push(n):(this._events[o]=n,this._eventsCount++),this},o.prototype.removeListener=function(t,e,r,i){var o=a?a+t:t;if(!this._events[o])return this;if(!e)return 0===--this._eventsCount?this._events=new n:delete this._events[o],this;var s=this._events[o];if(s.fn)s.fn!==e||i&&!s.once||r&&s.context!==r||(0===--this._eventsCount?this._events=new n:delete this._events[o]);else{for(var u=0,h=[],l=s.length;u<l;u++)(s[u].fn!==e||i&&!s[u].once||r&&s[u].context!==r)&&h.push(s[u]);h.length?this._events[o]=1===h.length?h[0]:h:0===--this._eventsCount?this._events=new n:delete this._events[o]}return this},o.prototype.removeAllListeners=function(t){var e;return t?(e=a?a+t:t,this._events[e]&&(0===--this._eventsCount?this._events=new n:delete this._events[e])):(this._events=new n,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prototype.setMaxListeners=function(){return this},o.prefixed=a,o.EventEmitter=o,"undefined"!=typeof e&&(e.exports=o)},{}],4:[function(e,r,n){!function(e){var n=/iPhone/i,i=/iPod/i,o=/iPad/i,s=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,a=/Android/i,u=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,l=/IEMobile/i,c=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,d=/BlackBerry/i,f=/BB10/i,p=/Opera Mini/i,v=/(CriOS|Chrome)(?=.*\bMobile\b)/i,y=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,g=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(t,e){return t.test(e)},_=function(t){var e=t||navigator.userAgent,r=e.split("[FBAN");if("undefined"!=typeof r[1]&&(e=r[0]),r=e.split("Twitter"),"undefined"!=typeof r[1]&&(e=r[0]),this.apple={phone:m(n,e),ipod:m(i,e),tablet:!m(n,e)&&m(o,e),device:m(n,e)||m(i,e)||m(o,e)},this.amazon={phone:m(u,e),tablet:!m(u,e)&&m(h,e),device:m(u,e)||m(h,e)},this.android={phone:m(u,e)||m(s,e),tablet:!m(u,e)&&!m(s,e)&&(m(h,e)||m(a,e)),device:m(u,e)||m(h,e)||m(s,e)||m(a,e)},this.windows={phone:m(l,e),tablet:m(c,e),device:m(l,e)||m(c,e)},this.other={blackberry:m(d,e),blackberry10:m(f,e),opera:m(p,e),firefox:m(y,e),chrome:m(v,e),device:m(d,e)||m(f,e)||m(p,e)||m(y,e)||m(v,e)},this.seven_inch=m(g,e),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this},b=function(){var t=new _;return t.Class=_,t};"undefined"!=typeof r&&r.exports&&"undefined"==typeof window?r.exports=_:"undefined"!=typeof r&&r.exports&&"undefined"!=typeof window?r.exports=b():"function"==typeof t&&t.amd?t("isMobile",[],e.isMobile=b()):e.isMobile=b()}(this)},{}],5:[function(t,e,r){"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function i(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==n.join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(t){i[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(t){return!1}}var o=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;e.exports=i()?Object.assign:function(t,e){for(var r,i,u=n(t),h=1;h<arguments.length;h++){r=Object(arguments[h]);for(var l in r)s.call(r,l)&&(u[l]=r[l]);if(o){i=o(r);for(var c=0;c<i.length;c++)a.call(r,i[c])&&(u[i[c]]=r[i[c]])}}return u}},{}],6:[function(t,e,r){var n=new ArrayBuffer(0),i=function(t,e,r,i){this.gl=t,this.buffer=t.createBuffer(),this.type=e||t.ARRAY_BUFFER,this.drawType=i||t.STATIC_DRAW,this.data=n,r&&this.upload(r)};i.prototype.upload=function(t,e,r){r||this.bind();var n=this.gl;t=t||this.data,e=e||0,this.data.byteLength>=t.byteLength?n.bufferSubData(this.type,e,t):n.bufferData(this.type,t,this.drawType),this.data=t},i.prototype.bind=function(){var t=this.gl;t.bindBuffer(this.type,this.buffer)},i.createVertexBuffer=function(t,e,r){return new i(t,t.ARRAY_BUFFER,e,r)},i.createIndexBuffer=function(t,e,r){return new i(t,t.ELEMENT_ARRAY_BUFFER,e,r)},i.create=function(t,e,r,n){return new i(t,e,r,n)},i.prototype.destroy=function(){this.gl.deleteBuffer(this.buffer)},e.exports=i},{}],7:[function(t,e,r){var n=t("./GLTexture"),i=function(t,e,r){this.gl=t,this.framebuffer=t.createFramebuffer(),this.stencil=null,this.texture=null,this.width=e||100,this.height=r||100};i.prototype.enableTexture=function(t){var e=this.gl;this.texture=t||new n(e),this.texture.bind(),this.bind(),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture.texture,0)},i.prototype.enableStencil=function(){if(!this.stencil){var t=this.gl;this.stencil=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,this.stencil),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,this.stencil),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,this.width,this.height)}},i.prototype.clear=function(t,e,r,n){this.bind();var i=this.gl;i.clearColor(t,e,r,n),i.clear(i.COLOR_BUFFER_BIT)},i.prototype.bind=function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer)},i.prototype.unbind=function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null)},i.prototype.resize=function(t,e){var r=this.gl;this.width=t,this.height=e,this.texture&&this.texture.uploadData(null,t,e),this.stencil&&(r.bindRenderbuffer(r.RENDERBUFFER,this.stencil),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,t,e))},i.prototype.destroy=function(){var t=this.gl;this.texture&&this.texture.destroy(),t.deleteFramebuffer(this.framebuffer),this.gl=null,this.stencil=null,this.texture=null},i.createRGBA=function(t,e,r,o){var s=n.fromData(t,null,e,r);s.enableNearestScaling(),s.enableWrapClamp();var a=new i(t,e,r);return a.enableTexture(s),a.unbind(),a},i.createFloat32=function(t,e,r,o){var s=new n.fromData(t,o,e,r);s.enableNearestScaling(),s.enableWrapClamp();var a=new i(t,e,r);return a.enableTexture(s),a.unbind(),a},e.exports=i},{"./GLTexture":9}],8:[function(t,e,r){var n=t("./shader/compileProgram"),i=t("./shader/extractAttributes"),o=t("./shader/extractUniforms"),s=t("./shader/generateUniformAccessObject"),a=function(t,e,r){this.gl=t,this.program=n(t,e,r),this.attributes=i(t,this.program);var a=o(t,this.program);this.uniforms=s(t,a)};a.prototype.bind=function(){this.gl.useProgram(this.program)},a.prototype.destroy=function(){},e.exports=a},{"./shader/compileProgram":14,"./shader/extractAttributes":16,"./shader/extractUniforms":17,"./shader/generateUniformAccessObject":18}],9:[function(t,e,r){var n=function(t,e,r,n,i){this.gl=t,this.texture=t.createTexture(),this.mipmap=!1,this.premultiplyAlpha=!1,this.width=e||-1,this.height=r||-1,this.format=n||t.RGBA,this.type=i||t.UNSIGNED_BYTE};n.prototype.upload=function(t){this.bind();var e=this.gl;e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha);var r=t.videoWidth||t.width,n=t.videoHeight||t.height;n!==this.height||r!==this.width?e.texImage2D(e.TEXTURE_2D,0,this.format,this.format,this.type,t):e.texSubImage2D(e.TEXTURE_2D,0,0,0,this.format,this.type,t),this.width=r,this.height=n};var i=!1;n.prototype.uploadData=function(t,e,r){this.bind();var n=this.gl;if(t instanceof Float32Array){if(!i){var o=n.getExtension("OES_texture_float");if(!o)throw new Error("floating point textures not available");i=!0}this.type=n.FLOAT}else this.type=n.UNSIGNED_BYTE;n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),e!==this.width||r!==this.height?n.texImage2D(n.TEXTURE_2D,0,this.format,e,r,0,this.format,this.type,t||null):n.texSubImage2D(n.TEXTURE_2D,0,0,0,e,r,this.format,this.type,t||null),this.width=e,this.height=r},n.prototype.bind=function(t){var e=this.gl;void 0!==t&&e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,this.texture)},n.prototype.unbind=function(){var t=this.gl;t.bindTexture(t.TEXTURE_2D,null)},n.prototype.minFilter=function(t){var e=this.gl;this.bind(),this.mipmap?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR:e.NEAREST)},n.prototype.magFilter=function(t){var e=this.gl;this.bind(),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t?e.LINEAR:e.NEAREST)},n.prototype.enableMipmap=function(){var t=this.gl;this.bind(),this.mipmap=!0,t.generateMipmap(t.TEXTURE_2D)},n.prototype.enableLinearScaling=function(){this.minFilter(!0),this.magFilter(!0)},n.prototype.enableNearestScaling=function(){this.minFilter(!1),this.magFilter(!1)},n.prototype.enableWrapClamp=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)},n.prototype.enableWrapRepeat=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)},n.prototype.enableWrapMirrorRepeat=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.MIRRORED_REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.MIRRORED_REPEAT)},n.prototype.destroy=function(){var t=this.gl;t.deleteTexture(this.texture)},n.fromSource=function(t,e,r){var i=new n(t);return i.premultiplyAlpha=r||!1,i.upload(e),i},n.fromData=function(t,e,r,i){var o=new n(t);return o.uploadData(e,r,i),o},e.exports=n},{}],10:[function(t,e,r){function n(t,e){if(this.nativeVaoExtension=null,n.FORCE_NATIVE||(this.nativeVaoExtension=t.getExtension("OES_vertex_array_object")||t.getExtension("MOZ_OES_vertex_array_object")||t.getExtension("WEBKIT_OES_vertex_array_object")),this.nativeState=e,this.nativeVaoExtension){this.nativeVao=this.nativeVaoExtension.createVertexArrayOES();var r=t.getParameter(t.MAX_VERTEX_ATTRIBS);this.nativeState={tempAttribState:new Array(r),attribState:new Array(r)}}this.gl=t,this.attributes=[],this.indexBuffer=null,this.dirty=!1}var i=t("./setVertexAttribArrays");n.prototype.constructor=n,e.exports=n,n.FORCE_NATIVE=!1,n.prototype.bind=function(){return this.nativeVao?(this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),this.dirty&&(this.dirty=!1,this.activate())):this.activate(),this},n.prototype.unbind=function(){return this.nativeVao&&this.nativeVaoExtension.bindVertexArrayOES(null),this},n.prototype.activate=function(){for(var t=this.gl,e=null,r=0;r<this.attributes.length;r++){var n=this.attributes[r];e!==n.buffer&&(n.buffer.bind(),e=n.buffer),t.vertexAttribPointer(n.attribute.location,n.attribute.size,n.type||t.FLOAT,n.normalized||!1,n.stride||0,n.start||0)}return i(t,this.attributes,this.nativeState),this.indexBuffer.bind(),this},n.prototype.addAttribute=function(t,e,r,n,i,o){return this.attributes.push({buffer:t,attribute:e,location:e.location,type:r||this.gl.FLOAT,normalized:n||!1,stride:i||0,start:o||0}),this.dirty=!0,this},n.prototype.addIndex=function(t){return this.indexBuffer=t,this.dirty=!0,this},n.prototype.clear=function(){return this.nativeVao&&this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),this.attributes.length=0,this.indexBuffer=null,this},n.prototype.draw=function(t,e,r){var n=this.gl;return n.drawElements(t,e,n.UNSIGNED_SHORT,r||0),this},n.prototype.destroy=function(){this.gl=null,this.indexBuffer=null,this.attributes=null,this.nativeState=null,this.nativeVao&&this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao),this.nativeVaoExtension=null,this.nativeVao=null}},{"./setVertexAttribArrays":13}],11:[function(t,e,r){var n=function(t,e){var r=t.getContext("webgl",e)||t.getContext("experimental-webgl",e);if(!r)throw new Error("This browser does not support webGL. Try using the canvas renderer");return r};e.exports=n},{}],12:[function(t,e,r){var n={createContext:t("./createContext"),setVertexAttribArrays:t("./setVertexAttribArrays"),GLBuffer:t("./GLBuffer"),GLFramebuffer:t("./GLFramebuffer"),GLShader:t("./GLShader"),GLTexture:t("./GLTexture"),VertexArrayObject:t("./VertexArrayObject"),shader:t("./shader")};"undefined"!=typeof e&&e.exports&&(e.exports=n),"undefined"!=typeof window&&(window.PIXI=window.PIXI||{},window.PIXI.glCore=n)},{"./GLBuffer":6,"./GLFramebuffer":7,"./GLShader":8,"./GLTexture":9,"./VertexArrayObject":10,"./createContext":11,"./setVertexAttribArrays":13,"./shader":19}],13:[function(t,e,r){var n=function(t,e,r){var n;if(r){var i=r.tempAttribState,o=r.attribState;for(n=0;n<i.length;n++)i[n]=!1;for(n=0;n<e.length;n++)i[e[n].attribute.location]=!0;for(n=0;n<o.length;n++)o[n]!==i[n]&&(o[n]=i[n],r.attribState[n]?t.enableVertexAttribArray(n):t.disableVertexAttribArray(n))}else for(n=0;n<e.length;n++){var s=e[n];t.enableVertexAttribArray(s.attribute.location)}};e.exports=n},{}],14:[function(t,e,r){var n=function(t,e,r){var n=i(t,t.VERTEX_SHADER,e),o=i(t,t.FRAGMENT_SHADER,r),s=t.createProgram();return t.attachShader(s,n),t.attachShader(s,o),t.linkProgram(s),t.getProgramParameter(s,t.LINK_STATUS)||(console.error("Pixi.js Error: Could not initialize shader."),console.error("gl.VALIDATE_STATUS",t.getProgramParameter(s,t.VALIDATE_STATUS)),console.error("gl.getError()",t.getError()),""!==t.getProgramInfoLog(s)&&console.warn("Pixi.js Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(s)),t.deleteProgram(s),s=null),t.deleteShader(n),t.deleteShader(o),s},i=function(t,e,r){var n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(console.log(t.getShaderInfoLog(n)),null)};e.exports=n},{}],15:[function(t,e,r){var n=function(t,e){switch(t){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"sampler2D":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"bool":return!1;case"bvec2":return i(2*e);case"bvec3":return i(3*e);case"bvec4":return i(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}},i=function(t){for(var e=new Array(t),r=0;r<e.length;r++)e[r]=!1;return e};e.exports=n},{}],16:[function(t,e,r){var n=t("./mapType"),i=t("./mapSize"),o=function(t,e){for(var r={},o=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES),a=0;a<o;a++){var u=t.getActiveAttrib(e,a),h=n(t,u.type);r[u.name]={type:h,size:i(h),location:t.getAttribLocation(e,u.name),pointer:s}}return r},s=function(t,e,r,n){gl.vertexAttribPointer(this.location,this.size,t||gl.FLOAT,e||!1,r||0,n||0)};e.exports=o},{"./mapSize":20,"./mapType":21}],17:[function(t,e,r){var n=t("./mapType"),i=t("./defaultValue"),o=function(t,e){for(var r={},o=t.getProgramParameter(e,t.ACTIVE_UNIFORMS),s=0;s<o;s++){var a=t.getActiveUniform(e,s),u=a.name.replace(/\[.*?\]/,""),h=n(t,a.type);r[u]={type:h,size:a.size,location:t.getUniformLocation(e,u),value:i(h,a.size)}}return r};e.exports=o},{"./defaultValue":15,"./mapType":21}],18:[function(t,e,r){var n=function(t,e){var r={data:{}};r.gl=t;for(var n=Object.keys(e),a=0;a<n.length;a++){var u=n[a],h=u.split("."),l=h[h.length-1],c=s(h,r),d=e[u];c.data[l]=d,c.gl=t,Object.defineProperty(c,l,{get:i(l),set:o(l,d)})}return r},i=function(t){var e=a.replace("%%",t);return new Function(e)},o=function(t,e){var r,n=u.replace(/%%/g,t);return r=1===e.size?h[e.type]:l[e.type],r&&(n+="\nthis.gl."+r+";"),new Function("value",n)},s=function(t,e){for(var r=e,n=0;n<t.length-1;n++){var i=r[t[n]]||{data:{}};r[t[n]]=i,r=i}return r},a=["return this.data.%%.value;"].join("\n"),u=["this.data.%%.value = value;","var location = this.data.%%.location;"].join("\n"),h={float:"uniform1f(location, value)",vec2:"uniform2f(location, value[0], value[1])",vec3:"uniform3f(location, value[0], value[1], value[2])",vec4:"uniform4f(location, value[0], value[1], value[2], value[3])",int:"uniform1i(location, value)",ivec2:"uniform2i(location, value[0], value[1])",ivec3:"uniform3i(location, value[0], value[1], value[2])",ivec4:"uniform4i(location, value[0], value[1], value[2], value[3])",bool:"uniform1i(location, value)",bvec2:"uniform2i(location, value[0], value[1])",bvec3:"uniform3i(location, value[0], value[1], value[2])",bvec4:"uniform4i(location, value[0], value[1], value[2], value[3])",mat2:"uniformMatrix2fv(location, false, value)",mat3:"uniformMatrix3fv(location, false, value)",mat4:"uniformMatrix4fv(location, false, value)",sampler2D:"uniform1i(location, value)"},l={float:"uniform1fv(location, value)",vec2:"uniform2fv(location, value)",vec3:"uniform3fv(location, value)",vec4:"uniform4fv(location, value)",int:"uniform1iv(location, value)",ivec2:"uniform2iv(location, value)",ivec3:"uniform3iv(location, value)",ivec4:"uniform4iv(location, value)",bool:"uniform1iv(location, value)",bvec2:"uniform2iv(location, value)",bvec3:"uniform3iv(location, value)",bvec4:"uniform4iv(location, value)",sampler2D:"uniform1iv(location, value)"};e.exports=n},{}],19:[function(t,e,r){e.exports={compileProgram:t("./compileProgram"),defaultValue:t("./defaultValue"),extractAttributes:t("./extractAttributes"),extractUniforms:t("./extractUniforms"),generateUniformAccessObject:t("./generateUniformAccessObject"),mapSize:t("./mapSize"),mapType:t("./mapType")}},{"./compileProgram":14,"./defaultValue":15,"./extractAttributes":16,"./extractUniforms":17,"./generateUniformAccessObject":18,"./mapSize":20,"./mapType":21}],20:[function(t,e,r){var n=function(t){return i[t]},i={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};e.exports=n},{}],21:[function(t,e,r){var n=function(t,e){if(!i){var r=Object.keys(o);i={};for(var n=0;n<r.length;++n){var s=r[n];i[t[s]]=o[s]}}return i[e]},i=null,o={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D"};e.exports=n},{}],22:[function(t,e,r){(function(t){function e(t,e){for(var r=0,n=t.length-1;n>=0;n--){var i=t[n];"."===i?t.splice(n,1):".."===i?(t.splice(n,1),r++):r&&(t.splice(n,1),r--)}if(e)for(;r--;r)t.unshift("..");return t}function n(t,e){if(t.filter)return t.filter(e);for(var r=[],n=0;n<t.length;n++)e(t[n],n,t)&&r.push(t[n]);return r}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(t){return i.exec(t).slice(1)};r.resolve=function(){for(var r="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s=o>=0?arguments[o]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(r=s+"/"+r,i="/"===s.charAt(0))}return r=e(n(r.split("/"),function(t){return!!t}),!i).join("/"),(i?"/":"")+r||"."},r.normalize=function(t){var i=r.isAbsolute(t),o="/"===s(t,-1);return t=e(n(t.split("/"),function(t){return!!t}),!i).join("/"),t||i||(t="."),t&&o&&(t+="/"),(i?"/":"")+t},r.isAbsolute=function(t){return"/"===t.charAt(0)},r.join=function(){var t=Array.prototype.slice.call(arguments,0);return r.normalize(n(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},r.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r-e+1)}t=r.resolve(t).substr(1),e=r.resolve(e).substr(1);for(var i=n(t.split("/")),o=n(e.split("/")),s=Math.min(i.length,o.length),a=s,u=0;u<s;u++)if(i[u]!==o[u]){a=u;break}for(var h=[],u=a;u<i.length;u++)h.push("..");return h=h.concat(o.slice(a)),h.join("/")},r.sep="/",r.delimiter=":",r.dirname=function(t){var e=o(t),r=e[0],n=e[1];return r||n?(n&&(n=n.substr(0,n.length-1)),r+n):"."},r.basename=function(t,e){var r=o(t)[2];return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},r.extname=function(t){return o(t)[3]};var s="b"==="ab".substr(-1)?function(t,e,r){return t.substr(e,r)}:function(t,e,r){return e<0&&(e=t.length+e),t.substr(e,r)}}).call(this,t("_process"))},{_process:23}],23:[function(t,e,r){function n(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function o(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function s(t){if(d===clearTimeout)return clearTimeout(t);if((d===i||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(t);try{return d(t)}catch(e){try{return d.call(null,t)}catch(e){return d.call(this,t)}}}function a(){y&&p&&(y=!1,p.length?v=p.concat(v):g=-1,v.length&&u())}function u(){if(!y){var t=o(a);y=!0;for(var e=v.length;e;){for(p=v,v=[];++g<e;)p&&p[g].run();g=-1,e=v.length}p=null,y=!1,s(t)}}function h(t,e){this.fun=t,this.array=e}function l(){}var c,d,f=e.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{d="function"==typeof clearTimeout?clearTimeout:i}catch(t){d=i}}();var p,v=[],y=!1,g=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];v.push(new h(t,e)),1!==v.length||y||o(u)},h.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=l,f.addListener=l,f.once=l,f.off=l,f.removeListener=l,f.removeAllListeners=l,f.emit=l,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},{}],24:[function(e,r,n){(function(e){!function(i){function o(t){throw new RangeError(L[t])}function s(t,e){for(var r=t.length,n=[];r--;)n[r]=e(t[r]);return n}function a(t,e){var r=t.split("@"),n="";r.length>1&&(n=r[0]+"@",t=r[1]),t=t.replace(D,".");var i=t.split("."),o=s(i,e).join(".");return n+o}function u(t){for(var e,r,n=[],i=0,o=t.length;i<o;)e=t.charCodeAt(i++),e>=55296&&e<=56319&&i<o?(r=t.charCodeAt(i++),56320==(64512&r)?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),i--)):n.push(e);return n}function h(t){return s(t,function(t){var e="";return t>65535&&(t-=65536,e+=B(t>>>10&1023|55296),t=56320|1023&t),e+=B(t)}).join("")}function l(t){return t-48<10?t-22:t-65<26?t-65:t-97<26?t-97:w}function c(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function d(t,e,r){var n=0;for(t=r?F(t/P):t>>1,t+=F(t/e);t>N*S>>1;n+=w)t=F(t/N);return F(n+(N+1)*t/(t+O))}function f(t){var e,r,n,i,s,a,u,c,f,p,v=[],y=t.length,g=0,m=C,_=M;for(r=t.lastIndexOf(R),r<0&&(r=0),n=0;n<r;++n)t.charCodeAt(n)>=128&&o("not-basic"),v.push(t.charCodeAt(n));for(i=r>0?r+1:0;i<y;){for(s=g,a=1,u=w;i>=y&&o("invalid-input"),c=l(t.charCodeAt(i++)),(c>=w||c>F((T-g)/a))&&o("overflow"),g+=c*a,f=u<=_?E:u>=_+S?S:u-_,!(c<f);u+=w)p=w-f,a>F(T/p)&&o("overflow"),a*=p;e=v.length+1,_=d(g-s,e,0==s),F(g/e)>T-m&&o("overflow"),m+=F(g/e),g%=e,v.splice(g++,0,m)}return h(v)}function p(t){var e,r,n,i,s,a,h,l,f,p,v,y,g,m,_,b=[];for(t=u(t),y=t.length,e=C,r=0,s=M,a=0;a<y;++a)v=t[a],v<128&&b.push(B(v));for(n=i=b.length,i&&b.push(R);n<y;){for(h=T,a=0;a<y;++a)v=t[a],v>=e&&v<h&&(h=v);for(g=n+1,h-e>F((T-r)/g)&&o("overflow"),r+=(h-e)*g,e=h,a=0;a<y;++a)if(v=t[a],v<e&&++r>T&&o("overflow"),v==e){for(l=r,f=w;p=f<=s?E:f>=s+S?S:f-s,!(l<p);f+=w)_=l-p,m=w-p,b.push(B(c(p+_%m,0))),l=F(_/m);b.push(B(c(l,0))),s=d(r,g,n==i),r=0,++n}++r,++e}return b.join("")}function v(t){return a(t,function(t){return A.test(t)?f(t.slice(4).toLowerCase()):t})}function y(t){return a(t,function(t){return I.test(t)?"xn--"+p(t):t})}var g="object"==typeof n&&n&&!n.nodeType&&n,m="object"==typeof r&&r&&!r.nodeType&&r,_="object"==typeof e&&e;_.global!==_&&_.window!==_&&_.self!==_||(i=_);var b,x,T=2147483647,w=36,E=1,S=26,O=38,P=700,M=72,C=128,R="-",A=/^xn--/,I=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},N=w-E,F=Math.floor,B=String.fromCharCode;if(b={version:"1.4.1",ucs2:{decode:u,encode:h},decode:f,encode:p,toASCII:y,toUnicode:v},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return b});else if(g&&m)if(r.exports==g)m.exports=b;else for(x in b)b.hasOwnProperty(x)&&(g[x]=b[x]);else i.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],25:[function(t,e,r){"use strict";function n(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,r,o){e=e||"&",r=r||"=";var s={};if("string"!=typeof t||0===t.length)return s;var a=/\+/g;t=t.split(e);var u=1e3;o&&"number"==typeof o.maxKeys&&(u=o.maxKeys);var h=t.length;u>0&&h>u&&(h=u);for(var l=0;l<h;++l){var c,d,f,p,v=t[l].replace(a,"%20"),y=v.indexOf(r);y>=0?(c=v.substr(0,y),d=v.substr(y+1)):(c=v,d=""),f=decodeURIComponent(c),p=decodeURIComponent(d),n(s,f)?i(s[f])?s[f].push(p):s[f]=[s[f],p]:s[f]=p}return s};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],26:[function(t,e,r){"use strict";function n(t,e){if(t.map)return t.map(e);for(var r=[],n=0;n<t.length;n++)r.push(e(t[n],n));return r}var i=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,r,a){return e=e||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?n(s(t),function(s){var a=encodeURIComponent(i(s))+r;return o(t[s])?n(t[s],function(t){return a+encodeURIComponent(i(t))}).join(e):a+encodeURIComponent(i(t[s]))}).join(e):a?encodeURIComponent(i(a))+r+encodeURIComponent(i(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e}},{}],27:[function(t,e,r){"use strict";r.decode=r.parse=t("./decode"),r.encode=r.stringify=t("./encode")},{"./decode":25,"./encode":26}],28:[function(t,e,r){"use strict";function n(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(t,e,r){if(t&&h.isObject(t)&&t instanceof n)return t;var i=new n;return i.parse(t,e,r),i}function o(t){return h.isString(t)&&(t=i(t)),t instanceof n?t.format():n.prototype.format.call(t)}function s(t,e){return i(t,!1,!0).resolve(e)}function a(t,e){return t?i(t,!1,!0).resolveObject(e):e}var u=t("punycode"),h=t("./util");r.parse=i,r.resolve=s,r.resolveObject=a,r.format=o,r.Url=n;var l=/^([a-z0-9.+-]+:)/i,c=/:[0-9]*$/,d=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,f=["<",">",'"',"`"," ","\r","\n","\t"],p=["{","}","|","\\","^","`"].concat(f),v=["'"].concat(p),y=["%","/","?",";","#"].concat(v),g=["/","?","#"],m=255,_=/^[+a-z0-9A-Z_-]{0,63}$/,b=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,x={javascript:!0,"javascript:":!0},T={javascript:!0,"javascript:":!0},w={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},E=t("querystring");n.prototype.parse=function(t,e,r){if(!h.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var n=t.indexOf("?"),i=n!==-1&&n<t.indexOf("#")?"?":"#",o=t.split(i),s=/\\/g;o[0]=o[0].replace(s,"/"),t=o.join(i);var a=t;if(a=a.trim(),!r&&1===t.split("#").length){var c=d.exec(a);if(c)return this.path=a,this.href=a,this.pathname=c[1],c[2]?(this.search=c[2],e?this.query=E.parse(this.search.substr(1)):this.query=this.search.substr(1)):e&&(this.search="",this.query={}),this}var f=l.exec(a);if(f){f=f[0];var p=f.toLowerCase();this.protocol=p,a=a.substr(f.length)}if(r||f||a.match(/^\/\/[^@\/]+@[^@\/]+/)){var S="//"===a.substr(0,2);!S||f&&T[f]||(a=a.substr(2),this.slashes=!0)}if(!T[f]&&(S||f&&!w[f])){for(var O=-1,P=0;P<g.length;P++){var M=a.indexOf(g[P]);M!==-1&&(O===-1||M<O)&&(O=M)}var C,R;R=O===-1?a.lastIndexOf("@"):a.lastIndexOf("@",O),R!==-1&&(C=a.slice(0,R),a=a.slice(R+1),this.auth=decodeURIComponent(C)),O=-1;for(var P=0;P<y.length;P++){var M=a.indexOf(y[P]);M!==-1&&(O===-1||M<O)&&(O=M)}O===-1&&(O=a.length),this.host=a.slice(0,O),a=a.slice(O),this.parseHost(),this.hostname=this.hostname||"";var A="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!A)for(var I=this.hostname.split(/\./),P=0,D=I.length;P<D;P++){var L=I[P];if(L&&!L.match(_)){for(var N="",F=0,B=L.length;F<B;F++)N+=L.charCodeAt(F)>127?"x":L[F];if(!N.match(_)){var k=I.slice(0,P),j=I.slice(P+1),U=L.match(b);U&&(k.push(U[1]),j.unshift(U[2])),j.length&&(a="/"+j.join(".")+a),this.hostname=k.join(".");break}}}this.hostname.length>m?this.hostname="":this.hostname=this.hostname.toLowerCase(),A||(this.hostname=u.toASCII(this.hostname));var X=this.port?":"+this.port:"",G=this.hostname||"";this.host=G+X,this.href+=this.host,A&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==a[0]&&(a="/"+a))}if(!x[p])for(var P=0,D=v.length;P<D;P++){var W=v[P];if(a.indexOf(W)!==-1){var H=encodeURIComponent(W);H===W&&(H=escape(W)),a=a.split(W).join(H)}}var Y=a.indexOf("#");Y!==-1&&(this.hash=a.substr(Y),a=a.slice(0,Y));var V=a.indexOf("?");if(V!==-1?(this.search=a.substr(V),this.query=a.substr(V+1),e&&(this.query=E.parse(this.query)),a=a.slice(0,V)):e&&(this.search="",this.query={}),a&&(this.pathname=a),w[p]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var X=this.pathname||"",z=this.search||"";this.path=X+z}return this.href=this.format(),this},n.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",r=this.pathname||"",n=this.hash||"",i=!1,o="";this.host?i=t+this.host:this.hostname&&(i=t+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&h.isObject(this.query)&&Object.keys(this.query).length&&(o=E.stringify(this.query));var s=this.search||o&&"?"+o||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||w[e])&&i!==!1?(i="//"+(i||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):i||(i=""),n&&"#"!==n.charAt(0)&&(n="#"+n),s&&"?"!==s.charAt(0)&&(s="?"+s),r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),s=s.replace("#","%23"),e+i+r+s+n},n.prototype.resolve=function(t){return this.resolveObject(i(t,!1,!0)).format()},n.prototype.resolveObject=function(t){if(h.isString(t)){var e=new n;e.parse(t,!1,!0),t=e}for(var r=new n,i=Object.keys(this),o=0;o<i.length;o++){var s=i[o];r[s]=this[s]}if(r.hash=t.hash,""===t.href)return r.href=r.format(),r;if(t.slashes&&!t.protocol){for(var a=Object.keys(t),u=0;u<a.length;u++){var l=a[u];"protocol"!==l&&(r[l]=t[l])}return w[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){if(!w[t.protocol]){for(var c=Object.keys(t),d=0;d<c.length;d++){var f=c[d];r[f]=t[f]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||T[t.protocol])r.pathname=t.pathname;else{for(var p=(t.pathname||"").split("/");p.length&&!(t.host=p.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),r.pathname=p.join("/")}if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var v=r.pathname||"",y=r.search||"";r.path=v+y}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var g=r.pathname&&"/"===r.pathname.charAt(0),m=t.host||t.pathname&&"/"===t.pathname.charAt(0),_=m||g||r.host&&t.pathname,b=_,x=r.pathname&&r.pathname.split("/")||[],p=t.pathname&&t.pathname.split("/")||[],E=r.protocol&&!w[r.protocol];if(E&&(r.hostname="",r.port=null,r.host&&(""===x[0]?x[0]=r.host:x.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===p[0]?p[0]=t.host:p.unshift(t.host)),t.host=null),_=_&&(""===p[0]||""===x[0])),m)r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,x=p;else if(p.length)x||(x=[]),x.pop(),x=x.concat(p),r.search=t.search,r.query=t.query;else if(!h.isNullOrUndefined(t.search)){if(E){r.hostname=r.host=x.shift();var S=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");S&&(r.auth=S.shift(),r.host=r.hostname=S.shift())}return r.search=t.search,r.query=t.query,h.isNull(r.pathname)&&h.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!x.length)return r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r;for(var O=x.slice(-1)[0],P=(r.host||t.host||x.length>1)&&("."===O||".."===O)||""===O,M=0,C=x.length;C>=0;C--)O=x[C],"."===O?x.splice(C,1):".."===O?(x.splice(C,1),M++):M&&(x.splice(C,1),M--);if(!_&&!b)for(;M--;M)x.unshift("..");!_||""===x[0]||x[0]&&"/"===x[0].charAt(0)||x.unshift(""),P&&"/"!==x.join("/").substr(-1)&&x.push("");var R=""===x[0]||x[0]&&"/"===x[0].charAt(0);if(E){r.hostname=r.host=R?"":x.length?x.shift():"";var S=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");S&&(r.auth=S.shift(),r.host=r.hostname=S.shift())}return _=_||r.host&&x.length,_&&!R&&x.unshift(""),x.length?r.pathname=x.join("/"):(r.pathname=null,r.path=null),h.isNull(r.pathname)&&h.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},n.prototype.parseHost=function(){var t=this.host,e=c.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{"./util":29,punycode:24,querystring:27}],29:[function(t,e,r){"use strict";e.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}},{}],30:[function(t,e,r){"use strict";e.exports=function(t,e,r){var n,i=t.length;if(!(e>=i||0===r)){r=e+r>i?i-e:r;var o=i-r;for(n=e;n<o;++n)t[n]=t[n+r];t.length=o}}},{}],31:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=t("mini-signals"),u=i(a),h=t("parse-uri"),l=i(h),c=t("./async"),d=n(c),f=t("./Resource"),p=i(f),v=100,y=/(#[\w-]+)?$/,g=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;o(this,t),this.baseUrl=r,this.progress=0,this.loading=!1,this.defaultQueryString="",this._beforeMiddleware=[],this._afterMiddleware=[],this._resourcesParsing=[],this._boundLoadResource=function(t,r){return e._loadResource(t,r)},this._queue=d.queue(this._boundLoadResource,n),this._queue.pause(),this.resources={},this.onProgress=new u.default,this.onError=new u.default,this.onLoad=new u.default,this.onStart=new u.default,this.onComplete=new u.default}return t.prototype.add=function(t,e,r,n){if(Array.isArray(t)){for(var i=0;i<t.length;++i)this.add(t[i]);return this}if("object"===("undefined"==typeof t?"undefined":s(t))&&(n=e||t.callback||t.onComplete,r=t,e=t.url,t=t.name||t.key||t.url),"string"!=typeof e&&(n=r,r=e,e=t),"string"!=typeof e)throw new Error("No url passed to add resource to loader.");if("function"==typeof r&&(n=r,r=null),this.loading&&(!r||!r.parentResource))throw new Error("Cannot add resources while the loader is running.");if(this.resources[t])throw new Error('Resource named "'+t+'" already exists.');if(e=this._prepareUrl(e),this.resources[t]=new p.default(t,e,r),"function"==typeof n&&this.resources[t].onAfterMiddleware.once(n),this.loading){for(var o=r.parentResource,a=[],u=0;u<o.children.length;++u)o.children[u].isComplete||a.push(o.children[u]);var h=o.progressChunk*(a.length+1),l=h/(a.length+2);o.children.push(this.resources[t]),o.progressChunk=l;for(var c=0;c<a.length;++c)a[c].progressChunk=l;this.resources[t].progressChunk=l}return this._queue.push(this.resources[t]),this},t.prototype.pre=function(t){return this._beforeMiddleware.push(t),this},t.prototype.use=function(t){return this._afterMiddleware.push(t),this},t.prototype.reset=function(){this.progress=0,this.loading=!1,this._queue.kill(),this._queue.pause();for(var t in this.resources){var e=this.resources[t];e._onLoadBinding&&e._onLoadBinding.detach(),e.isLoading&&e.abort()}return this.resources={},this},t.prototype.load=function(t){if("function"==typeof t&&this.onComplete.once(t),this.loading)return this;for(var e=100/this._queue._tasks.length,r=0;r<this._queue._tasks.length;++r)this._queue._tasks[r].data.progressChunk=e;return this.loading=!0,this.onStart.dispatch(this),this._queue.resume(),this},t.prototype._prepareUrl=function(t){var e=(0,l.default)(t,{strictMode:!0}),r=void 0;if(r=e.protocol||!e.path||0===t.indexOf("//")?t:this.baseUrl.length&&this.baseUrl.lastIndexOf("/")!==this.baseUrl.length-1&&"/"!==t.charAt(0)?this.baseUrl+"/"+t:this.baseUrl+t,this.defaultQueryString){var n=y.exec(r)[0];r=r.substr(0,r.length-n.length),r+=r.indexOf("?")!==-1?"&"+this.defaultQueryString:"?"+this.defaultQueryString,r+=n}return r},t.prototype._loadResource=function(t,e){var r=this;t._dequeue=e,d.eachSeries(this._beforeMiddleware,function(e,n){e.call(r,t,function(){n(t.isComplete?{}:null)})},function(){t.isComplete?r._onLoad(t):(t._onLoadBinding=t.onComplete.once(r._onLoad,r),t.load())})},t.prototype._onComplete=function(){this.loading=!1,this.onComplete.dispatch(this,this.resources)},t.prototype._onLoad=function(t){var e=this;t._onLoadBinding=null,t._dequeue(),this._resourcesParsing.push(t),d.eachSeries(this._afterMiddleware,function(r,n){r.call(e,t,n)},function(){t.onAfterMiddleware.dispatch(t),e.progress+=t.progressChunk,e.onProgress.dispatch(e,t),t.error?e.onError.dispatch(t.error,e,t):e.onLoad.dispatch(e,t),e._resourcesParsing.splice(e._resourcesParsing.indexOf(t),1),e._queue.idle()&&0===e._resourcesParsing.length&&(e.progress=v,e._onComplete())})},t}();r.default=g},{"./Resource":32,"./async":33,"mini-signals":37,"parse-uri":38}],32:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){}function s(t,e,r){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t[e]=r)}function a(t){return t.toString().replace("object ","")}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("parse-uri"),l=n(h),c=t("mini-signals"),d=n(c),f=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest),p=null,v=0,y=200,g=204,m=function(){function t(e,r,n){if(i(this,t),"string"!=typeof e||"string"!=typeof r)throw new Error("Both name and url are required for constructing a resource.");n=n||{},this._flags=0,this._setFlag(t.STATUS_FLAGS.DATA_URL,0===r.indexOf("data:")),this.name=e,this.url=r,this.extension=this._getExtension(),this.data=null,this.crossOrigin=n.crossOrigin===!0?"anonymous":n.crossOrigin,this.loadType=n.loadType||this._determineLoadType(),this.xhrType=n.xhrType,this.metadata=n.metadata||{},this.error=null,this.xhr=null,this.children=[],this.type=t.TYPE.UNKNOWN,this.progressChunk=0,this._dequeue=o,this._onLoadBinding=null,this._boundComplete=this.complete.bind(this),this._boundOnError=this._onError.bind(this),this._boundOnProgress=this._onProgress.bind(this),this._boundXhrOnError=this._xhrOnError.bind(this),this._boundXhrOnAbort=this._xhrOnAbort.bind(this),this._boundXhrOnLoad=this._xhrOnLoad.bind(this),this._boundXdrOnTimeout=this._xdrOnTimeout.bind(this),this.onStart=new d.default,this.onProgress=new d.default,this.onComplete=new d.default,this.onAfterMiddleware=new d.default}return t.setExtensionLoadType=function(e,r){s(t._loadTypeMap,e,r)},t.setExtensionXhrType=function(e,r){s(t._xhrTypeMap,e,r)},t.prototype.complete=function(){if(this.data&&this.data.removeEventListener&&(this.data.removeEventListener("error",this._boundOnError,!1),this.data.removeEventListener("load",this._boundComplete,!1),this.data.removeEventListener("progress",this._boundOnProgress,!1),this.data.removeEventListener("canplaythrough",this._boundComplete,!1)),this.xhr&&(this.xhr.removeEventListener?(this.xhr.removeEventListener("error",this._boundXhrOnError,!1),this.xhr.removeEventListener("abort",this._boundXhrOnAbort,!1),this.xhr.removeEventListener("progress",this._boundOnProgress,!1),this.xhr.removeEventListener("load",this._boundXhrOnLoad,!1)):(this.xhr.onerror=null,this.xhr.ontimeout=null,this.xhr.onprogress=null,this.xhr.onload=null)),this.isComplete)throw new Error("Complete called again for an already completed resource.");this._setFlag(t.STATUS_FLAGS.COMPLETE,!0),this._setFlag(t.STATUS_FLAGS.LOADING,!1),this.onComplete.dispatch(this)},t.prototype.abort=function(e){if(!this.error){if(this.error=new Error(e),this.xhr)this.xhr.abort();else if(this.xdr)this.xdr.abort();else if(this.data)if(this.data.src)this.data.src=t.EMPTY_GIF;else for(;this.data.firstChild;)this.data.removeChild(this.data.firstChild);this.complete()}},t.prototype.load=function(e){var r=this;if(!this.isLoading){if(this.isComplete)return void(e&&setTimeout(function(){return e(r)},1));switch(e&&this.onComplete.once(e),this._setFlag(t.STATUS_FLAGS.LOADING,!0),this.onStart.dispatch(this),this.crossOrigin!==!1&&"string"==typeof this.crossOrigin||(this.crossOrigin=this._determineCrossOrigin(this.url)),this.loadType){case t.LOAD_TYPE.IMAGE:this.type=t.TYPE.IMAGE,this._loadElement("image");break;case t.LOAD_TYPE.AUDIO:this.type=t.TYPE.AUDIO,this._loadSourceElement("audio");break;case t.LOAD_TYPE.VIDEO:this.type=t.TYPE.VIDEO,this._loadSourceElement("video");break;case t.LOAD_TYPE.XHR:default:f&&this.crossOrigin?this._loadXdr():this._loadXhr()}}},t.prototype._hasFlag=function(t){return!!(this._flags&t)},t.prototype._setFlag=function(t,e){this._flags=e?this._flags|t:this._flags&~t},t.prototype._loadElement=function(t){this.metadata.loadElement?this.data=this.metadata.loadElement:"image"===t&&"undefined"!=typeof window.Image?this.data=new Image:this.data=document.createElement(t),this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),this.metadata.skipSource||(this.data.src=this.url),this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1)},t.prototype._loadSourceElement=function(t){if(this.metadata.loadElement?this.data=this.metadata.loadElement:"audio"===t&&"undefined"!=typeof window.Audio?this.data=new Audio:this.data=document.createElement(t),null===this.data)return void this.abort("Unsupported element: "+t);if(!this.metadata.skipSource)if(navigator.isCocoonJS)this.data.src=Array.isArray(this.url)?this.url[0]:this.url;else if(Array.isArray(this.url))for(var e=0;e<this.url.length;++e)this.data.appendChild(this._createSource(t,this.url[e]));else this.data.appendChild(this._createSource(t,this.url));this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.data.addEventListener("canplaythrough",this._boundComplete,!1),this.data.load()},t.prototype._loadXhr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var e=this.xhr=new XMLHttpRequest;e.open("GET",this.url,!0),this.xhrType===t.XHR_RESPONSE_TYPE.JSON||this.xhrType===t.XHR_RESPONSE_TYPE.DOCUMENT?e.responseType=t.XHR_RESPONSE_TYPE.TEXT:e.responseType=this.xhrType,e.addEventListener("error",this._boundXhrOnError,!1),e.addEventListener("abort",this._boundXhrOnAbort,!1),e.addEventListener("progress",this._boundOnProgress,!1),e.addEventListener("load",this._boundXhrOnLoad,!1),e.send()},t.prototype._loadXdr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XDomainRequest;t.timeout=5e3,t.onerror=this._boundXhrOnError,t.ontimeout=this._boundXdrOnTimeout,t.onprogress=this._boundOnProgress,t.onload=this._boundXhrOnLoad,t.open("GET",this.url,!0),setTimeout(function(){return t.send()},1)},t.prototype._createSource=function(t,e,r){r||(r=t+"/"+e.substr(e.lastIndexOf(".")+1));var n=document.createElement("source");return n.src=e,n.type=r,n},t.prototype._onError=function(t){this.abort("Failed to load element using: "+t.target.nodeName)},t.prototype._onProgress=function(t){t&&t.lengthComputable&&this.onProgress.dispatch(this,t.loaded/t.total)},t.prototype._xhrOnError=function(){var t=this.xhr;this.abort(a(t)+" Request failed. Status: "+t.status+', text: "'+t.statusText+'"')},t.prototype._xhrOnAbort=function(){this.abort(a(this.xhr)+" Request was aborted by the user.")},t.prototype._xdrOnTimeout=function(){this.abort(a(this.xhr)+" Request timed out.")},t.prototype._xhrOnLoad=function(){var e=this.xhr,r="undefined"==typeof e.status?e.status:y;if(!(r===y||r===g||r===v&&e.responseText.length>0))return void this.abort("["+e.status+"] "+e.statusText+": "+e.responseURL);if(this.xhrType===t.XHR_RESPONSE_TYPE.TEXT)this.data=e.responseText,this.type=t.TYPE.TEXT;else if(this.xhrType===t.XHR_RESPONSE_TYPE.JSON)try{this.data=JSON.parse(e.responseText),this.type=t.TYPE.JSON}catch(t){return void this.abort("Error trying to parse loaded json: "+t)}else if(this.xhrType===t.XHR_RESPONSE_TYPE.DOCUMENT)try{if(window.DOMParser){var n=new DOMParser;this.data=n.parseFromString(e.responseText,"text/xml")}else{var i=document.createElement("div");i.innerHTML=e.responseText,this.data=i}this.type=t.TYPE.XML}catch(t){return void this.abort("Error trying to parse loaded xml: "+t)}else this.data=e.response||e.responseText;this.complete()},t.prototype._determineCrossOrigin=function(t,e){if(0===t.indexOf("data:"))return"";e=e||window.location,p||(p=document.createElement("a")),p.href=t,t=(0,l.default)(p.href,{strictMode:!0});var r=!t.port&&""===e.port||t.port===e.port,n=t.protocol?t.protocol+":":"";return t.host===e.hostname&&r&&n===e.protocol?"":"anonymous"},t.prototype._determineXhrType=function(){return t._xhrTypeMap[this.extension]||t.XHR_RESPONSE_TYPE.TEXT},t.prototype._determineLoadType=function(){return t._loadTypeMap[this.extension]||t.LOAD_TYPE.XHR},t.prototype._getExtension=function(){var t=this.url,e="";if(this.isDataUrl){var r=t.indexOf("/");e=t.substring(r+1,t.indexOf(";",r))}else{var n=t.indexOf("?");n!==-1&&(t=t.substring(0,n)),e=t.substring(t.lastIndexOf(".")+1)}return e.toLowerCase()},t.prototype._getMimeFromXhrType=function(e){switch(e){case t.XHR_RESPONSE_TYPE.BUFFER:return"application/octet-binary";case t.XHR_RESPONSE_TYPE.BLOB:return"application/blob";case t.XHR_RESPONSE_TYPE.DOCUMENT:return"application/xml";case t.XHR_RESPONSE_TYPE.JSON:return"application/json";case t.XHR_RESPONSE_TYPE.DEFAULT:case t.XHR_RESPONSE_TYPE.TEXT:default:return"text/plain"}},u(t,[{key:"isDataUrl",get:function(){return this._hasFlag(t.STATUS_FLAGS.DATA_URL)}},{key:"isComplete",get:function(){return this._hasFlag(t.STATUS_FLAGS.COMPLETE)}},{key:"isLoading",get:function(){return this._hasFlag(t.STATUS_FLAGS.LOADING)}}]),t}();r.default=m,m.STATUS_FLAGS={NONE:0,DATA_URL:1,COMPLETE:2,LOADING:4},m.TYPE={UNKNOWN:0,JSON:1,XML:2,IMAGE:3,AUDIO:4,VIDEO:5,TEXT:6},m.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4},m.XHR_RESPONSE_TYPE={DEFAULT:"text",BUFFER:"arraybuffer",BLOB:"blob",DOCUMENT:"document",JSON:"json",TEXT:"text"},m._loadTypeMap={gif:m.LOAD_TYPE.IMAGE,png:m.LOAD_TYPE.IMAGE,bmp:m.LOAD_TYPE.IMAGE,jpg:m.LOAD_TYPE.IMAGE,jpeg:m.LOAD_TYPE.IMAGE,tif:m.LOAD_TYPE.IMAGE,tiff:m.LOAD_TYPE.IMAGE,webp:m.LOAD_TYPE.IMAGE,tga:m.LOAD_TYPE.IMAGE,svg:m.LOAD_TYPE.IMAGE,"svg+xml":m.LOAD_TYPE.IMAGE,mp3:m.LOAD_TYPE.AUDIO,ogg:m.LOAD_TYPE.AUDIO,wav:m.LOAD_TYPE.AUDIO,mp4:m.LOAD_TYPE.VIDEO,webm:m.LOAD_TYPE.VIDEO},m._xhrTypeMap={xhtml:m.XHR_RESPONSE_TYPE.DOCUMENT,html:m.XHR_RESPONSE_TYPE.DOCUMENT,htm:m.XHR_RESPONSE_TYPE.DOCUMENT,xml:m.XHR_RESPONSE_TYPE.DOCUMENT,tmx:m.XHR_RESPONSE_TYPE.DOCUMENT,svg:m.XHR_RESPONSE_TYPE.DOCUMENT,tsx:m.XHR_RESPONSE_TYPE.DOCUMENT,gif:m.XHR_RESPONSE_TYPE.BLOB,png:m.XHR_RESPONSE_TYPE.BLOB,bmp:m.XHR_RESPONSE_TYPE.BLOB,jpg:m.XHR_RESPONSE_TYPE.BLOB,jpeg:m.XHR_RESPONSE_TYPE.BLOB,tif:m.XHR_RESPONSE_TYPE.BLOB,tiff:m.XHR_RESPONSE_TYPE.BLOB,webp:m.XHR_RESPONSE_TYPE.BLOB,tga:m.XHR_RESPONSE_TYPE.BLOB,json:m.XHR_RESPONSE_TYPE.JSON,text:m.XHR_RESPONSE_TYPE.TEXT,txt:m.XHR_RESPONSE_TYPE.TEXT,ttf:m.XHR_RESPONSE_TYPE.BUFFER,otf:m.XHR_RESPONSE_TYPE.BUFFER},m.EMPTY_GIF="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},{"mini-signals":37,"parse-uri":38}],33:[function(t,e,r){"use strict";function n(){}function i(t,e,r){var n=0,i=t.length;!function o(s){return s||n===i?void(r&&r(s)):void e(t[n++],o)}()}function o(t){return function(){if(null===t)throw new Error("Callback was already called.");var e=t;t=null,e.apply(this,arguments)}}function s(t,e){function r(t,e,r){if(null!=r&&"function"!=typeof r)throw new Error("task callback must be a function");if(a.started=!0,null==t&&a.idle())return void setTimeout(function(){return a.drain()},1);var i={data:t,callback:"function"==typeof r?r:n};e?a._tasks.unshift(i):a._tasks.push(i),setTimeout(function(){return a.process()},1)}function i(t){return function(){s-=1,t.callback.apply(t,arguments),null!=arguments[0]&&a.error(arguments[0],t.data),s<=a.concurrency-a.buffer&&a.unsaturated(),a.idle()&&a.drain(),a.process()}}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var s=0,a={_tasks:[],concurrency:e,saturated:n,unsaturated:n,buffer:e/4,empty:n,drain:n,error:n,started:!1,paused:!1,push:function(t,e){r(t,!1,e)},kill:function(){s=0,a.drain=n,a.started=!1,a._tasks=[]},unshift:function(t,e){r(t,!0,e)},process:function(){for(;!a.paused&&s<a.concurrency&&a._tasks.length;){var e=a._tasks.shift();0===a._tasks.length&&a.empty(),s+=1,s===a.concurrency&&a.saturated(),t(e.data,o(i(e)))}},length:function(){return a._tasks.length},running:function(){return s},idle:function(){return a._tasks.length+s===0},pause:function(){a.paused!==!0&&(a.paused=!0)},resume:function(){if(a.paused!==!1){a.paused=!1;for(var t=1;t<=a.concurrency;t++)a.process()}}};return a}r.__esModule=!0,r.eachSeries=i,r.queue=s},{}],34:[function(t,e,r){"use strict";function n(t){for(var e="",r=0;r<t.length;){for(var n=[0,0,0],o=[0,0,0,0],s=0;s<n.length;++s)r<t.length?n[s]=255&t.charCodeAt(r++):n[s]=0;o[0]=n[0]>>2,o[1]=(3&n[0])<<4|n[1]>>4,o[2]=(15&n[1])<<2|n[2]>>6,o[3]=63&n[2];var a=r-(t.length-1);switch(a){case 2:o[3]=64,o[2]=64;break;case 1:o[3]=64}for(var u=0;u<o.length;++u)e+=i.charAt(o[u])}return e}r.__esModule=!0,r.encodeBinary=n;var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},{}],35:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var o=t("./Loader"),s=i(o),a=t("./Resource"),u=i(a),h=t("./async"),l=n(h),c=t("./b64"),d=n(c);s.default.Resource=u.default,s.default.async=l,s.default.base64=d,e.exports=s.default,r.default=s.default},{"./Loader":31,"./Resource":32,"./async":33,"./b64":34}],36:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(){return function(t,e){if(!t.data)return void e();if(t.xhr&&t.xhrType===a.default.XHR_RESPONSE_TYPE.BLOB)if(window.Blob&&"string"!=typeof t.data){if(0===t.data.type.indexOf("image")){var r=function(){var r=l.createObjectURL(t.data);return t.blob=t.data,t.data=new Image,t.data.src=r,t.type=a.default.TYPE.IMAGE,t.data.onload=function(){l.revokeObjectURL(r),t.data.onload=null,e()},{v:void 0}}();if("object"===("undefined"==typeof r?"undefined":o(r)))return r.v}}else{var n=t.xhr.getResponseHeader("content-type");if(n&&0===n.indexOf("image"))return t.data=new Image,t.data.src="data:"+n+";base64,"+h.default.encodeBinary(t.xhr.responseText),t.type=a.default.TYPE.IMAGE,void(t.data.onload=function(){t.data.onload=null,e()})}e()}}r.__esModule=!0;var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r.blobMiddlewareFactory=i;var s=t("../../Resource"),a=n(s),u=t("../../b64"),h=n(u),l=window.URL||window.webkitURL},{"../../Resource":32,"../../b64":34}],37:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return t._head?(t._tail._next=e,e._prev=t._tail,t._tail=e):(t._head=e,t._tail=e),e._owner=t,e}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=function(){function t(e,r,i){void 0===r&&(r=!1),n(this,t),this._fn=e,this._once=r,this._thisArg=i,this._next=this._prev=this._owner=null}return o(t,[{key:"detach",value:function(){return null!==this._owner&&(this._owner.detach(this),!0)}}]),t}(),a=function(){function t(){n(this,t),this._head=this._tail=void 0}return o(t,[{key:"handlers",value:function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0],e=this._head;if(t)return!!e;for(var r=[];e;)r.push(e),e=e._next;return r}},{key:"has",value:function(t){if(!(t instanceof s))throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");return t._owner===this}},{key:"dispatch",value:function(){var t=this._head;if(!t)return!1;for(;t;)t._once&&this.detach(t),t._fn.apply(t._thisArg,arguments),t=t._next;return!0}},{key:"add",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];if("function"!=typeof t)throw new Error("MiniSignal#add(): First arg must be a Function.");return i(this,new s(t,!1,e))}},{key:"once",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];if("function"!=typeof t)throw new Error("MiniSignal#once(): First arg must be a Function.");return i(this,new s(t,!0,e))}},{key:"detach",value:function(t){if(!(t instanceof s))throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");return t._owner!==this?this:(t._prev&&(t._prev._next=t._next),t._next&&(t._next._prev=t._prev),t===this._head?(this._head=t._next,null===t._next&&(this._tail=null)):t===this._tail&&(this._tail=t._prev,this._tail._next=null),t._owner=null,this)}},{key:"detachAll",value:function(){var t=this._head;if(!t)return this;for(this._head=this._tail=null;t;)t._owner=null,t=t._next;return this}}]),t}();a.MiniSignalBinding=s,r.default=a,e.exports=r.default},{}],38:[function(t,e,r){"use strict";e.exports=function(t,e){e=e||{};for(var r={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},n=r.parser[e.strictMode?"strict":"loose"].exec(t),i={},o=14;o--;)i[r.key[o]]=n[o]||"";return i[r.q.name]={},i[r.key[12]].replace(r.q.parser,function(t,e,n){e&&(i[r.q.name][e]=n)}),i}},{}],39:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var s=t("../core"),a=i(s),u=t("ismobilejs"),h=n(u),l=t("./accessibleTarget"),c=n(l);a.utils.mixins.delayMixin(a.DisplayObject.prototype,c.default);var d=9,f=100,p=0,v=0,y=2,g=1,m=-1e3,_=-1e3,b=2,x=function(){function t(e){o(this,t),!h.default.tablet&&!h.default.phone||navigator.isCocoonJS||this.createTouchHook();var r=document.createElement("div");r.style.width=f+"px",r.style.height=f+"px",r.style.position="absolute",r.style.top=p+"px",r.style.left=v+"px",r.style.zIndex=y,this.div=r,this.pool=[],this.renderId=0,this.debug=!1,this.renderer=e,this.children=[],this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this.isActive=!1,this.isMobileAccessabillity=!1,window.addEventListener("keydown",this._onKeyDown,!1)}return t.prototype.createTouchHook=function(){var t=this,e=document.createElement("button");e.style.width=g+"px",e.style.height=g+"px",e.style.position="absolute",e.style.top=m+"px",e.style.left=_+"px",e.style.zIndex=b,e.style.backgroundColor="#FF0000",e.title="HOOK DIV",e.addEventListener("focus",function(){t.isMobileAccessabillity=!0,t.activate(),document.body.removeChild(e)}),document.body.appendChild(e)},t.prototype.activate=function(){this.isActive||(this.isActive=!0,window.document.addEventListener("mousemove",this._onMouseMove,!0),window.removeEventListener("keydown",this._onKeyDown,!1),this.renderer.on("postrender",this.update,this),this.renderer.view.parentNode&&this.renderer.view.parentNode.appendChild(this.div))},t.prototype.deactivate=function(){this.isActive&&!this.isMobileAccessabillity&&(this.isActive=!1,window.document.removeEventListener("mousemove",this._onMouseMove),window.addEventListener("keydown",this._onKeyDown,!1),this.renderer.off("postrender",this.update),this.div.parentNode&&this.div.parentNode.removeChild(this.div))},t.prototype.updateAccessibleObjects=function(t){if(t.visible){t.accessible&&t.interactive&&(t._accessibleActive||this.addChild(t),t.renderId=this.renderId);for(var e=t.children,r=e.length-1;r>=0;r--)this.updateAccessibleObjects(e[r])}},t.prototype.update=function(){if(this.renderer.renderingToScreen){this.updateAccessibleObjects(this.renderer._lastObjectRendered);var t=this.renderer.view.getBoundingClientRect(),e=t.width/this.renderer.width,r=t.height/this.renderer.height,n=this.div;n.style.left=t.left+"px",n.style.top=t.top+"px",n.style.width=this.renderer.width+"px",n.style.height=this.renderer.height+"px";for(var i=0;i<this.children.length;i++){var o=this.children[i];if(o.renderId!==this.renderId)o._accessibleActive=!1,a.utils.removeItems(this.children,i,1),this.div.removeChild(o._accessibleDiv),this.pool.push(o._accessibleDiv),o._accessibleDiv=null,i--,0===this.children.length&&this.deactivate();else{n=o._accessibleDiv;var s=o.hitArea,u=o.worldTransform;o.hitArea?(n.style.left=(u.tx+s.x*u.a)*e+"px",n.style.top=(u.ty+s.y*u.d)*r+"px",n.style.width=s.width*u.a*e+"px",n.style.height=s.height*u.d*r+"px"):(s=o.getBounds(),this.capHitArea(s),n.style.left=s.x*e+"px",n.style.top=s.y*r+"px",n.style.width=s.width*e+"px",n.style.height=s.height*r+"px")}}this.renderId++}},t.prototype.capHitArea=function(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0),t.x+t.width>this.renderer.width&&(t.width=this.renderer.width-t.x),t.y+t.height>this.renderer.height&&(t.height=this.renderer.height-t.y)},t.prototype.addChild=function(t){var e=this.pool.pop();e||(e=document.createElement("button"),e.style.width=f+"px",e.style.height=f+"px",e.style.backgroundColor=this.debug?"rgba(255,0,0,0.5)":"transparent",e.style.position="absolute",e.style.zIndex=y,e.style.borderStyle="none",e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),t.accessibleTitle?e.title=t.accessibleTitle:t.accessibleTitle||t.accessibleHint||(e.title="displayObject "+this.tabIndex),t.accessibleHint&&e.setAttribute("aria-label",t.accessibleHint),t._accessibleActive=!0,t._accessibleDiv=e,e.displayObject=t,this.children.push(t),this.div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex},t.prototype._onClick=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"click",e.eventData)},t.prototype._onFocus=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"mouseover",e.eventData)},t.prototype._onFocusOut=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"mouseout",e.eventData)},t.prototype._onKeyDown=function(t){t.keyCode===d&&this.activate()},t.prototype._onMouseMove=function(){this.deactivate()},t.prototype.destroy=function(){this.div=null;for(var t=0;t<this.children.length;t++)this.children[t].div=null;window.document.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("keydown",this._onKeyDown),this.pool=null,this.children=null,this.renderer=null},t}();r.default=x,a.WebGLRenderer.registerPlugin("accessibility",x),a.CanvasRenderer.registerPlugin("accessibility",x)},{"../core":64,"./accessibleTarget":40,ismobilejs:4}],40:[function(t,e,r){"use strict";r.__esModule=!0,r.default={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:!1}},{}],41:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./accessibleTarget");Object.defineProperty(r,"accessibleTarget",{enumerable:!0,get:function(){return n(i).default}});var o=t("./AccessibilityManager");Object.defineProperty(r,"AccessibilityManager",{enumerable:!0,get:function(){return n(o).default}})},{"./AccessibilityManager":39,"./accessibleTarget":40}],42:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("./autoDetectRenderer"),a=t("./display/Container"),u=n(a),h=t("./ticker"),l=t("./settings"),c=n(l),d=t("./const"),f=function(){function t(e,r,n,o,a){i(this,t),"number"==typeof e&&(e=Object.assign({width:e,height:r||c.default.RENDER_OPTIONS.height,forceCanvas:!!o,sharedTicker:!!a},n)),this._options=e=Object.assign({sharedTicker:!1,forceCanvas:!1,sharedLoader:!1},e),this.renderer=(0,s.autoDetectRenderer)(e),this.stage=new u.default,this._ticker=null,this.ticker=e.sharedTicker?h.shared:new h.Ticker,this.start()}return t.prototype.render=function(){this.renderer.render(this.stage)},t.prototype.stop=function(){this._ticker.stop()},t.prototype.start=function(){this._ticker.start()},t.prototype.destroy=function(t){var e=this._ticker;this.ticker=null,e.destroy(),this.stage.destroy(),this.stage=null,this.renderer.destroy(t),this.renderer=null,this._options=null},o(t,[{key:"ticker",set:function(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,d.UPDATE_PRIORITY.LOW)},get:function(){return this._ticker}},{key:"view",get:function(){return this.renderer.view}},{key:"screen",get:function(){return this.renderer.screen}}]),t}();r.default=f},{"./autoDetectRenderer":44,"./const":45,"./display/Container":47,"./settings":100,"./ticker":119}],43:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(t instanceof Array){if("precision"!==t[0].substring(0,9)){var r=t.slice(0);return r.unshift("precision "+e+" float;"),r}}else if("precision"!==t.substring(0,9))return"precision "+e+" float;\n"+t;return t}r.__esModule=!0;var u=t("pixi-gl-core"),h=t("./settings"),l=n(h),c=function(t){function e(r,n,s){return i(this,e),o(this,t.call(this,r,a(n,l.default.PRECISION_VERTEX),a(s,l.default.PRECISION_FRAGMENT)))}return s(e,t),e}(u.GLShader);r.default=c},{"./settings":100,"pixi-gl-core":12}],44:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e,r,n){var i=t&&t.forceCanvas;return void 0!==n&&(i=n),!i&&a.isWebGLSupported()?new c.default(t,e,r):new h.default(t,e,r)}r.__esModule=!0,r.autoDetectRenderer=o;var s=t("./utils"),a=i(s),u=t("./renderers/canvas/CanvasRenderer"),h=n(u),l=t("./renderers/webgl/WebGLRenderer"),c=n(l)},{"./renderers/canvas/CanvasRenderer":76,"./renderers/webgl/WebGLRenderer":83,"./utils":123}],45:[function(t,e,r){"use strict";r.__esModule=!0;r.VERSION="4.5.3",r.PI_2=2*Math.PI,r.RAD_TO_DEG=180/Math.PI,r.DEG_TO_RAD=Math.PI/180,r.RENDERER_TYPE={UNKNOWN:0,WEBGL:1,CANVAS:2},r.BLEND_MODES={NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16,NORMAL_NPM:17,ADD_NPM:18,SCREEN_NPM:19},r.DRAW_MODES={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},r.SCALE_MODES={LINEAR:0,NEAREST:1},r.WRAP_MODES={CLAMP:0,REPEAT:1,MIRRORED_REPEAT:2},r.GC_MODES={AUTO:0,MANUAL:1},r.URL_FILE_EXTENSION=/\.(\w{3,4})(?:$|\?|#)/i,r.DATA_URI=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;(charset=[\w-]+|base64))?,(.*)/i,r.SVG_SIZE=/<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i,r.SHAPES={POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4},r.PRECISION={LOW:"lowp",MEDIUM:"mediump",HIGH:"highp"},r.TRANSFORM_MODE={STATIC:0,DYNAMIC:1},r.TEXT_GRADIENT={LINEAR_VERTICAL:0,LINEAR_HORIZONTAL:1},r.UPDATE_PRIORITY={INTERACTION:50,HIGH:25,NORMAL:0,LOW:-25,UTILITY:-50}},{}],46:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=t("../math"),o=function(){function t(){n(this,t),this.minX=1/0,this.minY=1/0,this.maxX=-(1/0),this.maxY=-(1/0),this.rect=null}return t.prototype.isEmpty=function(){return this.minX>this.maxX||this.minY>this.maxY},t.prototype.clear=function(){this.updateID++,this.minX=1/0,this.minY=1/0,this.maxX=-(1/0),this.maxY=-(1/0)},t.prototype.getRectangle=function(t){return this.minX>this.maxX||this.minY>this.maxY?i.Rectangle.EMPTY:(t=t||new i.Rectangle(0,0,1,1),t.x=this.minX,t.y=this.minY,t.width=this.maxX-this.minX,t.height=this.maxY-this.minY,t)},t.prototype.addPoint=function(t){this.minX=Math.min(this.minX,t.x),this.maxX=Math.max(this.maxX,t.x),this.minY=Math.min(this.minY,t.y),this.maxY=Math.max(this.maxY,t.y)},t.prototype.addQuad=function(t){var e=this.minX,r=this.minY,n=this.maxX,i=this.maxY,o=t[0],s=t[1];e=o<e?o:e,r=s<r?s:r,n=o>n?o:n,i=s>i?s:i,o=t[2],s=t[3],e=o<e?o:e,r=s<r?s:r,n=o>n?o:n,i=s>i?s:i,o=t[4],s=t[5],e=o<e?o:e,r=s<r?s:r,n=o>n?o:n,i=s>i?s:i,o=t[6],s=t[7],e=o<e?o:e,r=s<r?s:r,n=o>n?o:n,i=s>i?s:i,this.minX=e,this.minY=r,this.maxX=n,this.maxY=i},t.prototype.addFrame=function(t,e,r,n,i){var o=t.worldTransform,s=o.a,a=o.b,u=o.c,h=o.d,l=o.tx,c=o.ty,d=this.minX,f=this.minY,p=this.maxX,v=this.maxY,y=s*e+u*r+l,g=a*e+h*r+c;d=y<d?y:d,f=g<f?g:f,p=y>p?y:p,v=g>v?g:v,y=s*n+u*r+l,g=a*n+h*r+c,d=y<d?y:d,f=g<f?g:f,p=y>p?y:p,v=g>v?g:v,y=s*e+u*i+l,g=a*e+h*i+c,d=y<d?y:d,f=g<f?g:f,p=y>p?y:p,v=g>v?g:v,y=s*n+u*i+l,g=a*n+h*i+c,d=y<d?y:d,f=g<f?g:f,p=y>p?y:p,v=g>v?g:v,this.minX=d,this.minY=f,this.maxX=p,this.maxY=v},t.prototype.addVertices=function(t,e,r,n){for(var i=t.worldTransform,o=i.a,s=i.b,a=i.c,u=i.d,h=i.tx,l=i.ty,c=this.minX,d=this.minY,f=this.maxX,p=this.maxY,v=r;v<n;v+=2){var y=e[v],g=e[v+1],m=o*y+a*g+h,_=u*g+s*y+l;c=m<c?m:c,d=_<d?_:d,f=m>f?m:f,p=_>p?_:p}this.minX=c,this.minY=d,this.maxX=f,this.maxY=p},t.prototype.addBounds=function(t){var e=this.minX,r=this.minY,n=this.maxX,i=this.maxY;this.minX=t.minX<e?t.minX:e,this.minY=t.minY<r?t.minY:r,this.maxX=t.maxX>n?t.maxX:n,this.maxY=t.maxY>i?t.maxY:i},t.prototype.addBoundsMask=function(t,e){var r=t.minX>e.minX?t.minX:e.minX,n=t.minY>e.minY?t.minY:e.minY,i=t.maxX<e.maxX?t.maxX:e.maxX,o=t.maxY<e.maxY?t.maxY:e.maxY;if(r<=i&&n<=o){var s=this.minX,a=this.minY,u=this.maxX,h=this.maxY;this.minX=r<s?r:s,this.minY=n<a?n:a,this.maxX=i>u?i:u,this.maxY=o>h?o:h}},t.prototype.addBoundsArea=function(t,e){var r=t.minX>e.x?t.minX:e.x,n=t.minY>e.y?t.minY:e.y,i=t.maxX<e.x+e.width?t.maxX:e.x+e.width,o=t.maxY<e.y+e.height?t.maxY:e.y+e.height;if(r<=i&&n<=o){var s=this.minX,a=this.minY,u=this.maxX,h=this.maxY;this.minX=r<s?r:s,this.minY=n<a?n:a,this.maxX=i>u?i:u,this.maxY=o>h?o:h}},t}();r.default=o},{"../math":69}],47:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../utils"),h=t("./DisplayObject"),l=n(h),c=function(t){function e(){i(this,e);var r=o(this,t.call(this));return r.children=[],r}return s(e,t),e.prototype.onChildrenChange=function(){},e.prototype.addChild=function(t){var e=arguments.length;if(e>1)for(var r=0;r<e;r++)this.addChild(arguments[r]);else t.parent&&t.parent.removeChild(t),t.parent=this,t.transform._parentID=-1,this.children.push(t),this._boundsID++,this.onChildrenChange(this.children.length-1),t.emit("added",this);return t},e.prototype.addChildAt=function(t,e){if(e<0||e>this.children.length)throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length);return t.parent&&t.parent.removeChild(t),t.parent=this,t.transform._parentID=-1,this.children.splice(e,0,t),this._boundsID++,this.onChildrenChange(e),t.emit("added",this),t},e.prototype.swapChildren=function(t,e){if(t!==e){var r=this.getChildIndex(t),n=this.getChildIndex(e);this.children[r]=e,this.children[n]=t,this.onChildrenChange(r<n?r:n)}},e.prototype.getChildIndex=function(t){var e=this.children.indexOf(t);if(e===-1)throw new Error("The supplied DisplayObject must be a child of the caller");return e},e.prototype.setChildIndex=function(t,e){if(e<0||e>=this.children.length)throw new Error("The supplied index is out of bounds");var r=this.getChildIndex(t);(0,u.removeItems)(this.children,r,1),this.children.splice(e,0,t),this.onChildrenChange(e)},e.prototype.getChildAt=function(t){if(t<0||t>=this.children.length)throw new Error("getChildAt: Index ("+t+") does not exist.");return this.children[t]},e.prototype.removeChild=function(t){var e=arguments.length;if(e>1)for(var r=0;r<e;r++)this.removeChild(arguments[r]);else{var n=this.children.indexOf(t);if(n===-1)return null;t.parent=null,t.transform._parentID=-1,(0,u.removeItems)(this.children,n,1),this._boundsID++,this.onChildrenChange(n),t.emit("removed",this)}return t},e.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e.parent=null,e.transform._parentID=-1,(0,u.removeItems)(this.children,t,1),this._boundsID++,this.onChildrenChange(t),e.emit("removed",this),e},e.prototype.removeChildren=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments[1],r=t,n="number"==typeof e?e:this.children.length,i=n-r,o=void 0;if(i>0&&i<=n){o=this.children.splice(r,i);for(var s=0;s<o.length;++s)o[s].parent=null,o[s].transform&&(o[s].transform._parentID=-1);this._boundsID++,this.onChildrenChange(t);for(var a=0;a<o.length;++a)o[a].emit("removed",this);return o}if(0===i&&0===this.children.length)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},e.prototype.updateTransform=function(){this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha;for(var t=0,e=this.children.length;t<e;++t){var r=this.children[t];r.visible&&r.updateTransform()}},e.prototype.calculateBounds=function(){this._bounds.clear(),this._calculateBounds();for(var t=0;t<this.children.length;t++){var e=this.children[t];e.visible&&e.renderable&&(e.calculateBounds(),e._mask?(e._mask.calculateBounds(),this._bounds.addBoundsMask(e._bounds,e._mask._bounds)):e.filterArea?this._bounds.addBoundsArea(e._bounds,e.filterArea):this._bounds.addBounds(e._bounds))}this._lastBoundsID=this._boundsID},e.prototype._calculateBounds=function(){},e.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this._filters)this.renderAdvancedWebGL(t);else{this._renderWebGL(t);for(var e=0,r=this.children.length;e<r;++e)this.children[e].renderWebGL(t)}},e.prototype.renderAdvancedWebGL=function(t){t.flush();var e=this._filters,r=this._mask;if(e){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<e.length;n++)e[n].enabled&&this._enabledFilters.push(e[n]);this._enabledFilters.length&&t.filterManager.pushFilter(this,this._enabledFilters)}r&&t.maskManager.pushMask(this,this._mask),this._renderWebGL(t);for(var i=0,o=this.children.length;i<o;i++)this.children[i].renderWebGL(t);t.flush(),r&&t.maskManager.popMask(this,this._mask),e&&this._enabledFilters&&this._enabledFilters.length&&t.filterManager.popFilter()},e.prototype._renderWebGL=function(t){},e.prototype._renderCanvas=function(t){},e.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){this._mask&&t.maskManager.pushMask(this._mask),this._renderCanvas(t);for(var e=0,r=this.children.length;e<r;++e)this.children[e].renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},e.prototype.destroy=function(e){t.prototype.destroy.call(this);var r="boolean"==typeof e?e:e&&e.children,n=this.removeChildren(0,this.children.length);if(r)for(var i=0;i<n.length;++i)n[i].destroy(e)},a(e,[{key:"width",get:function(){return this.scale.x*this.getLocalBounds().width},set:function(t){var e=this.getLocalBounds().width;0!==e?this.scale.x=t/e:this.scale.x=1,this._width=t}},{key:"height",get:function(){return this.scale.y*this.getLocalBounds().height},set:function(t){var e=this.getLocalBounds().height;0!==e?this.scale.y=t/e:this.scale.y=1,this._height=t}}]),e}(l.default);r.default=c,c.prototype.containerUpdateTransform=c.prototype.updateTransform},{"../utils":123,"./DisplayObject":48}],48:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("eventemitter3"),h=n(u),l=t("../const"),c=t("../settings"),d=n(c),f=t("./TransformStatic"),p=n(f),v=t("./Transform"),y=n(v),g=t("./Bounds"),m=n(g),_=t("../math"),b=function(t){function e(){i(this,e);var r=o(this,t.call(this)),n=d.default.TRANSFORM_MODE===l.TRANSFORM_MODE.STATIC?p.default:y.default;return r.tempDisplayObjectParent=null,r.transform=new n,r.alpha=1,r.visible=!0,r.renderable=!0,r.parent=null,r.worldAlpha=1,r.filterArea=null,r._filters=null,r._enabledFilters=null,r._bounds=new m.default,r._boundsID=0,r._lastBoundsID=-1,r._boundsRect=null,r._localBoundsRect=null,r._mask=null,r._destroyed=!1,r}return s(e,t),e.prototype.updateTransform=function(){this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha,this._bounds.updateID++},e.prototype._recursivePostUpdateTransform=function(){this.parent?(this.parent._recursivePostUpdateTransform(),this.transform.updateTransform(this.parent.transform)):this.transform.updateTransform(this._tempDisplayObjectParent.transform)},e.prototype.getBounds=function(t,e){return t||(this.parent?(this._recursivePostUpdateTransform(),this.updateTransform()):(this.parent=this._tempDisplayObjectParent,this.updateTransform(),this.parent=null)),this._boundsID!==this._lastBoundsID&&this.calculateBounds(),e||(this._boundsRect||(this._boundsRect=new _.Rectangle),e=this._boundsRect),this._bounds.getRectangle(e)},e.prototype.getLocalBounds=function(t){var e=this.transform,r=this.parent;this.parent=null,this.transform=this._tempDisplayObjectParent.transform,t||(this._localBoundsRect||(this._localBoundsRect=new _.Rectangle),t=this._localBoundsRect);var n=this.getBounds(!1,t);return this.parent=r,this.transform=e,n},e.prototype.toGlobal=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.apply(t,e)},e.prototype.toLocal=function(t,e,r,n){return e&&(t=e.toGlobal(t,r,n)),n||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.applyInverse(t,r)},e.prototype.renderWebGL=function(t){},e.prototype.renderCanvas=function(t){},e.prototype.setParent=function(t){if(!t||!t.addChild)throw new Error("setParent: Argument must be a Container");return t.addChild(this),t},e.prototype.setTransform=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,a=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,u=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0;return this.position.x=t,this.position.y=e,this.scale.x=r?r:1,this.scale.y=n?n:1,this.rotation=i,this.skew.x=o,this.skew.y=s,this.pivot.x=a,this.pivot.y=u,this},e.prototype.destroy=function(){this.removeAllListeners(),this.parent&&this.parent.removeChild(this),this.transform=null,this.parent=null,this._bounds=null,this._currentBounds=null,this._mask=null,this.filterArea=null,this.interactive=!1,this.interactiveChildren=!1,this._destroyed=!0},a(e,[{key:"_tempDisplayObjectParent",get:function(){return null===this.tempDisplayObjectParent&&(this.tempDisplayObjectParent=new e),this.tempDisplayObjectParent}},{key:"x",get:function(){return this.position.x},set:function(t){this.transform.position.x=t}},{key:"y",get:function(){return this.position.y},set:function(t){this.transform.position.y=t}},{key:"worldTransform",get:function(){return this.transform.worldTransform}},{key:"localTransform",get:function(){return this.transform.localTransform}},{key:"position",get:function(){return this.transform.position},set:function(t){this.transform.position.copy(t)}},{key:"scale",get:function(){return this.transform.scale},set:function(t){this.transform.scale.copy(t)}},{key:"pivot",get:function(){return this.transform.pivot},set:function(t){this.transform.pivot.copy(t)}},{key:"skew",get:function(){return this.transform.skew},set:function(t){this.transform.skew.copy(t)}},{key:"rotation",get:function(){return this.transform.rotation},set:function(t){this.transform.rotation=t}},{key:"worldVisible",get:function(){var t=this;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}},{key:"mask",get:function(){return this._mask},set:function(t){this._mask&&(this._mask.renderable=!0),this._mask=t,this._mask&&(this._mask.renderable=!1)}},{key:"filters",get:function(){return this._filters&&this._filters.slice()},set:function(t){this._filters=t&&t.slice()}}]),e}(h.default);r.default=b,b.prototype.displayObjectUpdateTransform=b.prototype.updateTransform},{"../const":45,"../math":69,"../settings":100,"./Bounds":46,"./Transform":49,"./TransformStatic":51,eventemitter3:3}],49:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../math"),h=t("./TransformBase"),l=n(h),c=function(t){function e(){i(this,e);var r=o(this,t.call(this));return r.position=new u.Point(0,0),r.scale=new u.Point(1,1),r.skew=new u.ObservablePoint(r.updateSkew,r,0,0),r.pivot=new u.Point(0,0),r._rotation=0,r._cx=1,r._sx=0,r._cy=0,r._sy=1,r}return s(e,t),e.prototype.updateSkew=function(){this._cx=Math.cos(this._rotation+this.skew._y),this._sx=Math.sin(this._rotation+this.skew._y),this._cy=-Math.sin(this._rotation-this.skew._x),this._sy=Math.cos(this._rotation-this.skew._x)},e.prototype.updateLocalTransform=function(){var t=this.localTransform;t.a=this._cx*this.scale.x,t.b=this._sx*this.scale.x,t.c=this._cy*this.scale.y,t.d=this._sy*this.scale.y,t.tx=this.position.x-(this.pivot.x*t.a+this.pivot.y*t.c),t.ty=this.position.y-(this.pivot.x*t.b+this.pivot.y*t.d)},e.prototype.updateTransform=function(t){var e=this.localTransform;e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d);var r=t.worldTransform,n=this.worldTransform;n.a=e.a*r.a+e.b*r.c,n.b=e.a*r.b+e.b*r.d,n.c=e.c*r.a+e.d*r.c,n.d=e.c*r.b+e.d*r.d,n.tx=e.tx*r.a+e.ty*r.c+r.tx,n.ty=e.tx*r.b+e.ty*r.d+r.ty,this._worldID++},e.prototype.setFromMatrix=function(t){t.decompose(this)},a(e,[{key:"rotation",get:function(){return this._rotation},set:function(t){this._rotation=t,this.updateSkew()}}]),e}(l.default);r.default=c},{"../math":69,"./TransformBase":50}],50:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=t("../math"),o=function(){function t(){n(this,t),this.worldTransform=new i.Matrix,this.localTransform=new i.Matrix,this._worldID=0,this._parentID=0}return t.prototype.updateLocalTransform=function(){},t.prototype.updateTransform=function(t){var e=t.worldTransform,r=this.worldTransform,n=this.localTransform;r.a=n.a*e.a+n.b*e.c,r.b=n.a*e.b+n.b*e.d,r.c=n.c*e.a+n.d*e.c,r.d=n.c*e.b+n.d*e.d,r.tx=n.tx*e.a+n.ty*e.c+e.tx,r.ty=n.tx*e.b+n.ty*e.d+e.ty,this._worldID++},t}();r.default=o,o.prototype.updateWorldTransform=o.prototype.updateTransform,o.IDENTITY=new o},{"../math":69}],51:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../math"),h=t("./TransformBase"),l=n(h),c=function(t){function e(){i(this,e);var r=o(this,t.call(this));return r.position=new u.ObservablePoint(r.onChange,r,0,0),r.scale=new u.ObservablePoint(r.onChange,r,1,1),r.pivot=new u.ObservablePoint(r.onChange,r,0,0),r.skew=new u.ObservablePoint(r.updateSkew,r,0,0),r._rotation=0,r._cx=1,r._sx=0,r._cy=0,r._sy=1,r._localID=0,r._currentLocalID=0,r}return s(e,t),e.prototype.onChange=function(){this._localID++},e.prototype.updateSkew=function(){this._cx=Math.cos(this._rotation+this.skew._y),this._sx=Math.sin(this._rotation+this.skew._y),this._cy=-Math.sin(this._rotation-this.skew._x),this._sy=Math.cos(this._rotation-this.skew._x),this._localID++},e.prototype.updateLocalTransform=function(){var t=this.localTransform;this._localID!==this._currentLocalID&&(t.a=this._cx*this.scale._x,t.b=this._sx*this.scale._x,t.c=this._cy*this.scale._y,t.d=this._sy*this.scale._y,t.tx=this.position._x-(this.pivot._x*t.a+this.pivot._y*t.c),t.ty=this.position._y-(this.pivot._x*t.b+this.pivot._y*t.d),this._currentLocalID=this._localID,this._parentID=-1)},e.prototype.updateTransform=function(t){var e=this.localTransform;if(this._localID!==this._currentLocalID&&(e.a=this._cx*this.scale._x,e.b=this._sx*this.scale._x,e.c=this._cy*this.scale._y,e.d=this._sy*this.scale._y,e.tx=this.position._x-(this.pivot._x*e.a+this.pivot._y*e.c),e.ty=this.position._y-(this.pivot._x*e.b+this.pivot._y*e.d),this._currentLocalID=this._localID,this._parentID=-1),this._parentID!==t._worldID){var r=t.worldTransform,n=this.worldTransform;n.a=e.a*r.a+e.b*r.c,n.b=e.a*r.b+e.b*r.d,n.c=e.c*r.a+e.d*r.c,n.d=e.c*r.b+e.d*r.d,n.tx=e.tx*r.a+e.ty*r.c+r.tx,n.ty=e.tx*r.b+e.ty*r.d+r.ty,this._parentID=t._worldID,this._worldID++}},e.prototype.setFromMatrix=function(t){t.decompose(this),this._localID++},a(e,[{key:"rotation",get:function(){return this._rotation},set:function(t){this._rotation=t,this.updateSkew()}}]),e}(l.default);r.default=c},{"../math":69,"./TransformBase":50}],52:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../display/Container"),u=n(a),h=t("../textures/RenderTexture"),l=n(h),c=t("../textures/Texture"),d=n(c),f=t("./GraphicsData"),p=n(f),v=t("../sprites/Sprite"),y=n(v),g=t("../math"),m=t("../utils"),_=t("../const"),b=t("../display/Bounds"),x=n(b),T=t("./utils/bezierCurveTo"),w=n(T),E=t("../renderers/canvas/CanvasRenderer"),S=n(E),O=void 0,P=new g.Matrix,M=new g.Point,C=new Float32Array(4),R=new Float32Array(4),A=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]&&arguments[0];i(this,e);var n=o(this,t.call(this));return n.fillAlpha=1,n.lineWidth=0,n.nativeLines=r,n.lineColor=0,n.graphicsData=[],n.tint=16777215,n._prevTint=16777215,n.blendMode=_.BLEND_MODES.NORMAL,n.currentPath=null,n._webGL={},n.isMask=!1,n.boundsPadding=0,n._localBounds=new x.default,n.dirty=0,n.fastRectDirty=-1,n.clearDirty=0,n.boundsDirty=-1,n.cachedSpriteDirty=!1,n._spriteRect=null,n._fastRect=!1,n}return s(e,t),e.prototype.clone=function t(){var t=new e;t.renderable=this.renderable,t.fillAlpha=this.fillAlpha,t.lineWidth=this.lineWidth,t.lineColor=this.lineColor,t.tint=this.tint,t.blendMode=this.blendMode,t.isMask=this.isMask,t.boundsPadding=this.boundsPadding,t.dirty=0,t.cachedSpriteDirty=this.cachedSpriteDirty;for(var r=0;r<this.graphicsData.length;++r)t.graphicsData.push(this.graphicsData[r].clone());return t.currentPath=t.graphicsData[t.graphicsData.length-1],t.updateLocalBounds(),t},e.prototype.lineStyle=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this.lineWidth=t,this.lineColor=e,this.lineAlpha=r,this.currentPath)if(this.currentPath.shape.points.length){var n=new g.Polygon(this.currentPath.shape.points.slice(-2));n.closed=!1,this.drawShape(n)}else this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha;return this},e.prototype.moveTo=function(t,e){var r=new g.Polygon([t,e]);return r.closed=!1,this.drawShape(r),this},e.prototype.lineTo=function(t,e){return this.currentPath.shape.points.push(t,e),this.dirty++,this},e.prototype.quadraticCurveTo=function(t,e,r,n){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var i=20,o=this.currentPath.shape.points,s=0,a=0;0===o.length&&this.moveTo(0,0);for(var u=o[o.length-2],h=o[o.length-1],l=1;l<=i;++l){var c=l/i;s=u+(t-u)*c,a=h+(e-h)*c,o.push(s+(t+(r-t)*c-s)*c,a+(e+(n-e)*c-a)*c)}return this.dirty++,this},e.prototype.bezierCurveTo=function(t,e,r,n,i,o){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var s=this.currentPath.shape.points,a=s[s.length-2],u=s[s.length-1];return s.length-=2,(0,w.default)(a,u,t,e,r,n,i,o,s),this.dirty++,this},e.prototype.arcTo=function(t,e,r,n,i){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(t,e):this.moveTo(t,e);var o=this.currentPath.shape.points,s=o[o.length-2],a=o[o.length-1],u=a-e,h=s-t,l=n-e,c=r-t,d=Math.abs(u*c-h*l);if(d<1e-8||0===i)o[o.length-2]===t&&o[o.length-1]===e||o.push(t,e);else{var f=u*u+h*h,p=l*l+c*c,v=u*l+h*c,y=i*Math.sqrt(f)/d,g=i*Math.sqrt(p)/d,m=y*v/f,_=g*v/p,b=y*c+g*h,x=y*l+g*u,T=h*(g+m),w=u*(g+m),E=c*(y+_),S=l*(y+_),O=Math.atan2(w-x,T-b),P=Math.atan2(S-x,E-b);this.arc(b+t,x+e,i,O,P,h*l>c*u)}return this.dirty++,this},e.prototype.arc=function(t,e,r,n,i){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(n===i)return this;!o&&i<=n?i+=2*Math.PI:o&&n<=i&&(n+=2*Math.PI);var s=i-n,a=40*Math.ceil(Math.abs(s)/(2*Math.PI));if(0===s)return this;var u=t+Math.cos(n)*r,h=e+Math.sin(n)*r,l=this.currentPath?this.currentPath.shape.points:null;l?l[l.length-2]===u&&l[l.length-1]===h||l.push(u,h):(this.moveTo(u,h),l=this.currentPath.shape.points);for(var c=s/(2*a),d=2*c,f=Math.cos(c),p=Math.sin(c),v=a-1,y=v%1/v,g=0;g<=v;++g){var m=g+y*g,_=c+n+d*m,b=Math.cos(_),x=-Math.sin(_);l.push((f*b+p*x)*r+t,(f*-x+p*b)*r+e)}return this.dirty++,this},e.prototype.beginFill=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return this.filling=!0,this.fillColor=t,this.fillAlpha=e,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},e.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},e.prototype.drawRect=function(t,e,r,n){return this.drawShape(new g.Rectangle(t,e,r,n)),this},e.prototype.drawRoundedRect=function(t,e,r,n,i){return this.drawShape(new g.RoundedRectangle(t,e,r,n,i)),this},e.prototype.drawCircle=function(t,e,r){return this.drawShape(new g.Circle(t,e,r)),this},e.prototype.drawEllipse=function(t,e,r,n){return this.drawShape(new g.Ellipse(t,e,r,n)),this},e.prototype.drawPolygon=function(t){var e=t,r=!0;if(e instanceof g.Polygon&&(r=e.closed,e=e.points),!Array.isArray(e)){e=new Array(arguments.length);for(var n=0;n<e.length;++n)e[n]=arguments[n]}var i=new g.Polygon(e);return i.closed=r,this.drawShape(i),this},e.prototype.clear=function(){return(this.lineWidth||this.filling||this.graphicsData.length>0)&&(this.lineWidth=0,this.filling=!1,this.boundsDirty=-1,this.dirty++,this.clearDirty++,this.graphicsData.length=0),this.currentPath=null,this._spriteRect=null,this},e.prototype.isFastRect=function(){return 1===this.graphicsData.length&&this.graphicsData[0].shape.type===_.SHAPES.RECT&&!this.graphicsData[0].lineWidth},e.prototype._renderWebGL=function(t){this.dirty!==this.fastRectDirty&&(this.fastRectDirty=this.dirty,this._fastRect=this.isFastRect()),this._fastRect?this._renderSpriteRect(t):(t.setObjectRenderer(t.plugins.graphics),t.plugins.graphics.render(this))},e.prototype._renderSpriteRect=function(t){var e=this.graphicsData[0].shape;this._spriteRect||(this._spriteRect=new y.default(new d.default(d.default.WHITE)));var r=this._spriteRect;if(16777215===this.tint)r.tint=this.graphicsData[0].fillColor;else{var n=C,i=R;(0,m.hex2rgb)(this.graphicsData[0].fillColor,n),(0,m.hex2rgb)(this.tint,i),n[0]*=i[0],n[1]*=i[1],n[2]*=i[2],r.tint=(0,m.rgb2hex)(n)}r.alpha=this.graphicsData[0].fillAlpha,r.worldAlpha=this.worldAlpha*r.alpha,r.blendMode=this.blendMode,r._texture._frame.width=e.width,r._texture._frame.height=e.height,r.transform.worldTransform=this.transform.worldTransform,r.anchor.set(-e.x/e.width,-e.y/e.height),r._onAnchorUpdate(),r._renderWebGL(t)},e.prototype._renderCanvas=function(t){this.isMask!==!0&&t.plugins.graphics.render(this)},e.prototype._calculateBounds=function(){this.boundsDirty!==this.dirty&&(this.boundsDirty=this.dirty,this.updateLocalBounds(),this.cachedSpriteDirty=!0);var t=this._localBounds;this._bounds.addFrame(this.transform,t.minX,t.minY,t.maxX,t.maxY)},e.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,M);for(var e=this.graphicsData,r=0;r<e.length;++r){var n=e[r];if(n.fill&&n.shape&&n.shape.contains(M.x,M.y)){if(n.holes)for(var i=0;i<n.holes.length;i++){var o=n.holes[i];if(o.contains(M.x,M.y))return!1}return!0}}return!1},e.prototype.updateLocalBounds=function(){var t=1/0,e=-(1/0),r=1/0,n=-(1/0);if(this.graphicsData.length)for(var i=0,o=0,s=0,a=0,u=0,h=0;h<this.graphicsData.length;h++){var l=this.graphicsData[h],c=l.type,d=l.lineWidth;if(i=l.shape,c===_.SHAPES.RECT||c===_.SHAPES.RREC)o=i.x-d/2,s=i.y-d/2,a=i.width+d,u=i.height+d,t=o<t?o:t,e=o+a>e?o+a:e,r=s<r?s:r,n=s+u>n?s+u:n;else if(c===_.SHAPES.CIRC)o=i.x,s=i.y,a=i.radius+d/2,u=i.radius+d/2,t=o-a<t?o-a:t,e=o+a>e?o+a:e,r=s-u<r?s-u:r,n=s+u>n?s+u:n;else if(c===_.SHAPES.ELIP)o=i.x,s=i.y,a=i.width+d/2,u=i.height+d/2,t=o-a<t?o-a:t,e=o+a>e?o+a:e,r=s-u<r?s-u:r,n=s+u>n?s+u:n;else for(var f=i.points,p=0,v=0,y=0,g=0,m=0,b=0,x=0,T=0,w=0;w+2<f.length;w+=2)o=f[w],s=f[w+1],p=f[w+2],v=f[w+3],y=Math.abs(p-o),g=Math.abs(v-s),u=d,a=Math.sqrt(y*y+g*g),a<1e-9||(m=(u/a*g+y)/2,b=(u/a*y+g)/2,x=(p+o)/2,T=(v+s)/2,t=x-m<t?x-m:t,e=x+m>e?x+m:e,r=T-b<r?T-b:r,n=T+b>n?T+b:n)}else t=0,e=0,r=0,n=0;var E=this.boundsPadding;this._localBounds.minX=t-E,this._localBounds.maxX=e+E,this._localBounds.minY=r-E,this._localBounds.maxY=n+E},e.prototype.drawShape=function(t){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null;var e=new p.default(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,this.nativeLines,t);return this.graphicsData.push(e),e.type===_.SHAPES.POLY&&(e.shape.closed=e.shape.closed||this.filling,this.currentPath=e),this.dirty++,e},e.prototype.generateCanvasTexture=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=this.getLocalBounds(),n=l.default.create(r.width,r.height,t,e);O||(O=new S.default),this.transform.updateLocalTransform(),this.transform.localTransform.copy(P),P.invert(),P.tx-=r.x,P.ty-=r.y,O.render(this,n,!0,P);var i=d.default.fromCanvas(n.baseTexture._canvasRenderTarget.canvas,t,"graphics");return i.baseTexture.resolution=e,i.baseTexture.update(),i},e.prototype.closePath=function(){var t=this.currentPath;return t&&t.shape&&t.shape.close(),this},e.prototype.addHole=function(){var t=this.graphicsData.pop();return this.currentPath=this.graphicsData[this.graphicsData.length-1],this.currentPath.addHole(t.shape),this.currentPath=null,this},e.prototype.destroy=function(e){t.prototype.destroy.call(this,e);for(var r=0;r<this.graphicsData.length;++r)this.graphicsData[r].destroy();for(var n in this._webgl)for(var i=0;i<this._webgl[n].data.length;++i)this._webgl[n].data[i].destroy();this._spriteRect&&this._spriteRect.destroy(),this.graphicsData=null,this.currentPath=null,this._webgl=null,this._localBounds=null},e}(u.default);r.default=A,A._SPRITE_TEXTURE=null},{"../const":45,"../display/Bounds":46,"../display/Container":47,"../math":69,"../renderers/canvas/CanvasRenderer":76,"../sprites/Sprite":101,"../textures/RenderTexture":112,"../textures/Texture":114,"../utils":123,"./GraphicsData":53,"./utils/bezierCurveTo":55}],53:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e,r,i,o,s,a,u,h){n(this,t),this.lineWidth=e,this.nativeLines=u,this.lineColor=r,this.lineAlpha=i,this._lineTint=r,this.fillColor=o,this.fillAlpha=s,this._fillTint=o,this.fill=a,this.holes=[],this.shape=h,this.type=h.type}return t.prototype.clone=function(){return new t(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.nativeLines,this.shape)},t.prototype.addHole=function(t){this.holes.push(t)},t.prototype.destroy=function(){this.shape=null,this.holes=null},t}();r.default=i},{}],54:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../renderers/canvas/CanvasRenderer"),s=n(o),a=t("../../const"),u=function(){function t(e){i(this,t),this.renderer=e}return t.prototype.render=function(t){var e=this.renderer,r=e.context,n=t.worldAlpha,i=t.transform.worldTransform,o=e.resolution;this._prevTint!==this.tint&&(this.dirty=!0),r.setTransform(i.a*o,i.b*o,i.c*o,i.d*o,i.tx*o,i.ty*o),t.dirty&&(this.updateGraphicsTint(t),t.dirty=!1),e.setBlendMode(t.blendMode);for(var s=0;s<t.graphicsData.length;s++){var u=t.graphicsData[s],h=u.shape,l=u._fillTint,c=u._lineTint;if(r.lineWidth=u.lineWidth,u.type===a.SHAPES.POLY){r.beginPath(),this.renderPolygon(h.points,h.closed,r);for(var d=0;d<u.holes.length;d++)this.renderPolygon(u.holes[d].points,!0,r);u.fill&&(r.globalAlpha=u.fillAlpha*n,r.fillStyle="#"+("00000"+(0|l).toString(16)).substr(-6),r.fill()),u.lineWidth&&(r.globalAlpha=u.lineAlpha*n,r.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),r.stroke())}else if(u.type===a.SHAPES.RECT)(u.fillColor||0===u.fillColor)&&(r.globalAlpha=u.fillAlpha*n,r.fillStyle="#"+("00000"+(0|l).toString(16)).substr(-6),r.fillRect(h.x,h.y,h.width,h.height)),u.lineWidth&&(r.globalAlpha=u.lineAlpha*n,r.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),r.strokeRect(h.x,h.y,h.width,h.height));else if(u.type===a.SHAPES.CIRC)r.beginPath(),r.arc(h.x,h.y,h.radius,0,2*Math.PI),r.closePath(),u.fill&&(r.globalAlpha=u.fillAlpha*n,r.fillStyle="#"+("00000"+(0|l).toString(16)).substr(-6),r.fill()),u.lineWidth&&(r.globalAlpha=u.lineAlpha*n,r.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),r.stroke());else if(u.type===a.SHAPES.ELIP){var f=2*h.width,p=2*h.height,v=h.x-f/2,y=h.y-p/2;r.beginPath();var g=.5522848,m=f/2*g,_=p/2*g,b=v+f,x=y+p,T=v+f/2,w=y+p/2;r.moveTo(v,w),r.bezierCurveTo(v,w-_,T-m,y,T,y),r.bezierCurveTo(T+m,y,b,w-_,b,w),r.bezierCurveTo(b,w+_,T+m,x,T,x),r.bezierCurveTo(T-m,x,v,w+_,v,w),r.closePath(),u.fill&&(r.globalAlpha=u.fillAlpha*n,r.fillStyle="#"+("00000"+(0|l).toString(16)).substr(-6),r.fill()),u.lineWidth&&(r.globalAlpha=u.lineAlpha*n,r.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),r.stroke())}else if(u.type===a.SHAPES.RREC){var E=h.x,S=h.y,O=h.width,P=h.height,M=h.radius,C=Math.min(O,P)/2|0;M=M>C?C:M,r.beginPath(),r.moveTo(E,S+M),r.lineTo(E,S+P-M),r.quadraticCurveTo(E,S+P,E+M,S+P),r.lineTo(E+O-M,S+P),r.quadraticCurveTo(E+O,S+P,E+O,S+P-M),r.lineTo(E+O,S+M),r.quadraticCurveTo(E+O,S,E+O-M,S),r.lineTo(E+M,S),r.quadraticCurveTo(E,S,E,S+M),r.closePath(),(u.fillColor||0===u.fillColor)&&(r.globalAlpha=u.fillAlpha*n,r.fillStyle="#"+("00000"+(0|l).toString(16)).substr(-6),r.fill()),u.lineWidth&&(r.globalAlpha=u.lineAlpha*n,r.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),r.stroke())}}},t.prototype.updateGraphicsTint=function(t){t._prevTint=t.tint;for(var e=(t.tint>>16&255)/255,r=(t.tint>>8&255)/255,n=(255&t.tint)/255,i=0;i<t.graphicsData.length;++i){var o=t.graphicsData[i],s=0|o.fillColor,a=0|o.lineColor;o._fillTint=((s>>16&255)/255*e*255<<16)+((s>>8&255)/255*r*255<<8)+(255&s)/255*n*255,o._lineTint=((a>>16&255)/255*e*255<<16)+((a>>8&255)/255*r*255<<8)+(255&a)/255*n*255}},t.prototype.renderPolygon=function(t,e,r){r.moveTo(t[0],t[1]);for(var n=1;n<t.length/2;++n)r.lineTo(t[2*n],t[2*n+1]);e&&r.closePath()},t.prototype.destroy=function(){this.renderer=null},t}();r.default=u,s.default.registerPlugin("graphics",u)},{"../../const":45,"../../renderers/canvas/CanvasRenderer":76}],55:[function(t,e,r){"use strict";function n(t,e,r,n,i,o,s,a){var u=arguments.length>8&&void 0!==arguments[8]?arguments[8]:[],h=20,l=0,c=0,d=0,f=0,p=0;u.push(t,e);for(var v=1,y=0;v<=h;++v)y=v/h,l=1-y,c=l*l,d=c*l,f=y*y,p=f*y,u.push(d*t+3*c*y*r+3*l*f*i+p*s,d*e+3*c*y*n+3*l*f*o+p*a);return u}r.__esModule=!0,r.default=n},{}],56:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../utils"),u=t("../../const"),h=t("../../renderers/webgl/utils/ObjectRenderer"),l=n(h),c=t("../../renderers/webgl/WebGLRenderer"),d=n(c),f=t("./WebGLGraphicsData"),p=n(f),v=t("./shaders/PrimitiveShader"),y=n(v),g=t("./utils/buildPoly"),m=n(g),_=t("./utils/buildRectangle"),b=n(_),x=t("./utils/buildRoundedRectangle"),T=n(x),w=t("./utils/buildCircle"),E=n(w),S=function(t){function e(r){i(this,e);var n=o(this,t.call(this,r));return n.graphicsDataPool=[],n.primitiveShader=null,n.gl=r.gl,n.CONTEXT_UID=0,n}return s(e,t),e.prototype.onContextChange=function(){this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.primitiveShader=new y.default(this.gl)},e.prototype.destroy=function(){l.default.prototype.destroy.call(this);for(var t=0;t<this.graphicsDataPool.length;++t)this.graphicsDataPool[t].destroy();this.graphicsDataPool=null},e.prototype.render=function(t){var e=this.renderer,r=e.gl,n=void 0,i=t._webGL[this.CONTEXT_UID];i&&t.dirty===i.dirty||(this.updateGraphics(t),i=t._webGL[this.CONTEXT_UID]);var o=this.primitiveShader;e.bindShader(o),e.state.setBlendMode(t.blendMode);for(var s=0,u=i.data.length;s<u;s++){n=i.data[s];var h=n.shader;e.bindShader(h),h.uniforms.translationMatrix=t.transform.worldTransform.toArray(!0),h.uniforms.tint=(0,a.hex2rgb)(t.tint),h.uniforms.alpha=t.worldAlpha,e.bindVao(n.vao),n.nativeLines?r.drawArrays(r.LINES,0,n.points.length/6):n.vao.draw(r.TRIANGLE_STRIP,n.indices.length)}},e.prototype.updateGraphics=function(t){var e=this.renderer.gl,r=t._webGL[this.CONTEXT_UID];if(r||(r=t._webGL[this.CONTEXT_UID]={lastIndex:0,data:[],gl:e,clearDirty:-1,dirty:-1}),r.dirty=t.dirty,t.clearDirty!==r.clearDirty){r.clearDirty=t.clearDirty;for(var n=0;n<r.data.length;n++)this.graphicsDataPool.push(r.data[n]);r.data.length=0,r.lastIndex=0}for(var i=void 0,o=void 0,s=r.lastIndex;s<t.graphicsData.length;s++){var a=t.graphicsData[s];i=this.getWebGLData(r,0),a.nativeLines&&a.lineWidth&&(o=this.getWebGLData(r,0,!0),r.lastIndex++),a.type===u.SHAPES.POLY&&(0,m.default)(a,i,o),a.type===u.SHAPES.RECT?(0,b.default)(a,i,o):a.type===u.SHAPES.CIRC||a.type===u.SHAPES.ELIP?(0,E.default)(a,i,o):a.type===u.SHAPES.RREC&&(0,T.default)(a,i,o),r.lastIndex++}this.renderer.bindVao(null);for(var h=0;h<r.data.length;h++)i=r.data[h],i.dirty&&i.upload()},e.prototype.getWebGLData=function(t,e,r){var n=t.data[t.data.length-1];return(!n||n.nativeLines!==r||n.points.length>32e4)&&(n=this.graphicsDataPool.pop()||new p.default(this.renderer.gl,this.primitiveShader,this.renderer.state.attribsState),n.nativeLines=r,n.reset(e),t.data.push(n)),n.dirty=!0,n},e}(l.default);r.default=S,d.default.registerPlugin("graphics",S)},{"../../const":45,"../../renderers/webgl/WebGLRenderer":83,"../../renderers/webgl/utils/ObjectRenderer":93,"../../utils":123,"./WebGLGraphicsData":57,"./shaders/PrimitiveShader":58,"./utils/buildCircle":59,"./utils/buildPoly":61,"./utils/buildRectangle":62,"./utils/buildRoundedRectangle":63}],57:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("pixi-gl-core"),s=n(o),a=function(){function t(e,r,n){i(this,t),this.gl=e,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=s.default.GLBuffer.createVertexBuffer(e),this.indexBuffer=s.default.GLBuffer.createIndexBuffer(e),this.dirty=!0,this.nativeLines=!1,this.glPoints=null,this.glIndices=null,this.shader=r,this.vao=new s.default.VertexArrayObject(e,n).addIndex(this.indexBuffer).addAttribute(this.buffer,r.attributes.aVertexPosition,e.FLOAT,!1,24,0).addAttribute(this.buffer,r.attributes.aColor,e.FLOAT,!1,24,8)}return t.prototype.reset=function(){this.points.length=0,this.indices.length=0},t.prototype.upload=function(){this.glPoints=new Float32Array(this.points),this.buffer.upload(this.glPoints),this.glIndices=new Uint16Array(this.indices),this.indexBuffer.upload(this.glIndices),this.dirty=!1},t.prototype.destroy=function(){this.color=null,this.points=null,this.indices=null,this.vao.destroy(),this.buffer.destroy(),this.indexBuffer.destroy(),this.gl=null,this.buffer=null,this.indexBuffer=null,this.glPoints=null,this.glIndices=null},t}();r.default=a},{"pixi-gl-core":12}],58:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../../Shader"),u=n(a),h=function(t){function e(r){return i(this,e),o(this,t.call(this,r,["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"].join("\n"),["varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n")))}return s(e,t),e}(u.default);r.default=h},{"../../../Shader":43}],59:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,r){var n=t.shape,i=n.x,o=n.y,h=void 0,l=void 0;if(t.type===a.SHAPES.CIRC?(h=n.radius,l=n.radius):(h=n.width,l=n.height),0!==h&&0!==l){var c=Math.floor(30*Math.sqrt(n.radius))||Math.floor(15*Math.sqrt(n.width+n.height)),d=2*Math.PI/c;if(t.fill){var f=(0,u.hex2rgb)(t.fillColor),p=t.fillAlpha,v=f[0]*p,y=f[1]*p,g=f[2]*p,m=e.points,_=e.indices,b=m.length/6;_.push(b);for(var x=0;x<c+1;x++)m.push(i,o,v,y,g,p),m.push(i+Math.sin(d*x)*h,o+Math.cos(d*x)*l,v,y,g,p),_.push(b++,b++);_.push(b-1)}if(t.lineWidth){var T=t.points;t.points=[];for(var w=0;w<c+1;w++)t.points.push(i+Math.sin(d*w)*h,o+Math.cos(d*w)*l);(0,s.default)(t,e,r),t.points=T}}}r.__esModule=!0,r.default=i;var o=t("./buildLine"),s=n(o),a=t("../../../const"),u=t("../../../utils")},{"../../../const":45,"../../../utils":123,"./buildLine":60}],60:[function(t,e,r){"use strict";function n(t,e){var r=t.points;if(0!==r.length){var n=new o.Point(r[0],r[1]),i=new o.Point(r[r.length-2],r[r.length-1]);if(n.x===i.x&&n.y===i.y){r=r.slice(),r.pop(),r.pop(),i=new o.Point(r[r.length-2],r[r.length-1]);var a=i.x+.5*(n.x-i.x),u=i.y+.5*(n.y-i.y);r.unshift(a,u),r.push(a,u)}var h=e.points,l=e.indices,c=r.length/2,d=r.length,f=h.length/6,p=t.lineWidth/2,v=(0,s.hex2rgb)(t.lineColor),y=t.lineAlpha,g=v[0]*y,m=v[1]*y,_=v[2]*y,b=r[0],x=r[1],T=r[2],w=r[3],E=0,S=0,O=-(x-w),P=b-T,M=0,C=0,R=0,A=0,I=Math.sqrt(O*O+P*P);O/=I,P/=I,O*=p,P*=p,h.push(b-O,x-P,g,m,_,y),h.push(b+O,x+P,g,m,_,y);for(var D=1;D<c-1;++D){b=r[2*(D-1)],x=r[2*(D-1)+1],T=r[2*D],w=r[2*D+1],E=r[2*(D+1)],S=r[2*(D+1)+1],O=-(x-w),P=b-T,I=Math.sqrt(O*O+P*P),O/=I,P/=I,O*=p,P*=p,M=-(w-S),C=T-E,I=Math.sqrt(M*M+C*C),M/=I,C/=I,M*=p,C*=p;var L=-P+x-(-P+w),N=-O+T-(-O+b),F=(-O+b)*(-P+w)-(-O+T)*(-P+x),B=-C+S-(-C+w),k=-M+T-(-M+E),j=(-M+E)*(-C+w)-(-M+T)*(-C+S),U=L*k-B*N;if(Math.abs(U)<.1)U+=10.1,h.push(T-O,w-P,g,m,_,y),h.push(T+O,w+P,g,m,_,y);else{var X=(N*j-k*F)/U,G=(B*F-L*j)/U,W=(X-T)*(X-T)+(G-w)*(G-w);W>196*p*p?(R=O-M,A=P-C,I=Math.sqrt(R*R+A*A),R/=I,A/=I,R*=p,A*=p,h.push(T-R,w-A),h.push(g,m,_,y),h.push(T+R,w+A),h.push(g,m,_,y),h.push(T-R,w-A),h.push(g,m,_,y),d++):(h.push(X,G),h.push(g,m,_,y),h.push(T-(X-T),w-(G-w)),h.push(g,m,_,y))}}b=r[2*(c-2)],x=r[2*(c-2)+1],T=r[2*(c-1)],w=r[2*(c-1)+1],O=-(x-w),P=b-T,I=Math.sqrt(O*O+P*P),O/=I,P/=I,O*=p,P*=p,h.push(T-O,w-P),h.push(g,m,_,y),h.push(T+O,w+P),h.push(g,m,_,y),l.push(f);for(var H=0;H<d;++H)l.push(f++);l.push(f-1)}}function i(t,e){var r=0,n=t.points;if(0!==n.length){var i=e.points,o=n.length/2,a=(0,s.hex2rgb)(t.lineColor),u=t.lineAlpha,h=a[0]*u,l=a[1]*u,c=a[2]*u;for(r=1;r<o;r++){var d=n[2*(r-1)],f=n[2*(r-1)+1],p=n[2*r],v=n[2*r+1];i.push(d,f),i.push(h,l,c,u),i.push(p,v),i.push(h,l,c,u)}}}r.__esModule=!0,r.default=function(t,e,r){t.nativeLines?i(t,r):n(t,e)};var o=t("../../../math"),s=t("../../../utils")},{"../../../math":69,"../../../utils":123}],61:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,r){t.points=t.shape.points.slice();var n=t.points;if(t.fill&&n.length>=6){for(var i=[],o=t.holes,u=0;u<o.length;u++){var l=o[u];i.push(n.length/2),n=n.concat(l.points)}var c=e.points,d=e.indices,f=n.length/2,p=(0,a.hex2rgb)(t.fillColor),v=t.fillAlpha,y=p[0]*v,g=p[1]*v,m=p[2]*v,_=(0,h.default)(n,i,2);if(!_)return;for(var b=c.length/6,x=0;x<_.length;x+=3)d.push(_[x]+b),d.push(_[x]+b),d.push(_[x+1]+b),d.push(_[x+2]+b),d.push(_[x+2]+b);for(var T=0;T<f;T++)c.push(n[2*T],n[2*T+1],y,g,m,v)}t.lineWidth>0&&(0,s.default)(t,e,r)}r.__esModule=!0,r.default=i;var o=t("./buildLine"),s=n(o),a=t("../../../utils"),u=t("earcut"),h=n(u)},{"../../../utils":123,"./buildLine":60,earcut:2}],62:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,r){var n=t.shape,i=n.x,o=n.y,u=n.width,h=n.height;if(t.fill){var l=(0,a.hex2rgb)(t.fillColor),c=t.fillAlpha,d=l[0]*c,f=l[1]*c,p=l[2]*c,v=e.points,y=e.indices,g=v.length/6;v.push(i,o),v.push(d,f,p,c),v.push(i+u,o),v.push(d,f,p,c),v.push(i,o+h),v.push(d,f,p,c),v.push(i+u,o+h),v.push(d,f,p,c),y.push(g,g,g+1,g+2,g+3,g+3)}if(t.lineWidth){var m=t.points;t.points=[i,o,i+u,o,i+u,o+h,i,o+h,i,o],(0,s.default)(t,e,r),t.points=m}}r.__esModule=!0,r.default=i;var o=t("./buildLine"),s=n(o),a=t("../../../utils")},{"../../../utils":123,"./buildLine":60}],63:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,r){var n=t.shape,i=n.x,o=n.y,a=n.width,h=n.height,d=n.radius,f=[];if(f.push(i,o+d),s(i,o+h-d,i,o+h,i+d,o+h,f),s(i+a-d,o+h,i+a,o+h,i+a,o+h-d,f),s(i+a,o+d,i+a,o,i+a-d,o,f),s(i+d,o,i,o,i,o+d+1e-10,f),t.fill){for(var p=(0,c.hex2rgb)(t.fillColor),v=t.fillAlpha,y=p[0]*v,g=p[1]*v,m=p[2]*v,_=e.points,b=e.indices,x=_.length/6,T=(0,u.default)(f,null,2),w=0,E=T.length;w<E;w+=3)b.push(T[w]+x),b.push(T[w]+x),b.push(T[w+1]+x),b.push(T[w+2]+x),b.push(T[w+2]+x);for(var S=0,O=f.length;S<O;S++)_.push(f[S],f[++S],y,g,m,v)}if(t.lineWidth){var P=t.points;t.points=f,(0,l.default)(t,e,r),t.points=P}}function o(t,e,r){var n=e-t;return t+n*r}function s(t,e,r,n,i,s){for(var a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[],u=20,h=a,l=0,c=0,d=0,f=0,p=0,v=0,y=0,g=0;y<=u;++y)g=y/u,l=o(t,r,g),c=o(e,n,g),d=o(r,i,g),f=o(n,s,g),p=o(l,d,g),v=o(c,f,g),h.push(p,v);return h}r.__esModule=!0,r.default=i;var a=t("earcut"),u=n(a),h=t("./buildLine"),l=n(h),c=t("../../../utils")},{"../../../utils":123,"./buildLine":60,earcut:2}],64:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.autoDetectRenderer=r.Application=r.Filter=r.SpriteMaskFilter=r.Quad=r.RenderTarget=r.ObjectRenderer=r.WebGLManager=r.Shader=r.CanvasRenderTarget=r.TextureUvs=r.VideoBaseTexture=r.BaseRenderTexture=r.RenderTexture=r.BaseTexture=r.Texture=r.Spritesheet=r.CanvasGraphicsRenderer=r.GraphicsRenderer=r.GraphicsData=r.Graphics=r.TextMetrics=r.TextStyle=r.Text=r.SpriteRenderer=r.CanvasTinter=r.CanvasSpriteRenderer=r.Sprite=r.TransformBase=r.TransformStatic=r.Transform=r.Container=r.DisplayObject=r.Bounds=r.glCore=r.WebGLRenderer=r.CanvasRenderer=r.ticker=r.utils=r.settings=void 0;var o=t("./const");Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(r,t,{enumerable:!0,get:function(){return o[t]}})});var s=t("./math");Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(r,t,{enumerable:!0,get:function(){return s[t]}})});var a=t("pixi-gl-core");Object.defineProperty(r,"glCore",{enumerable:!0,get:function(){return i(a).default}});var u=t("./display/Bounds");Object.defineProperty(r,"Bounds",{enumerable:!0,get:function(){return i(u).default}});var h=t("./display/DisplayObject");Object.defineProperty(r,"DisplayObject",{enumerable:!0,get:function(){return i(h).default}});var l=t("./display/Container");Object.defineProperty(r,"Container",{enumerable:!0,get:function(){return i(l).default}});var c=t("./display/Transform");Object.defineProperty(r,"Transform",{enumerable:!0,get:function(){return i(c).default}});var d=t("./display/TransformStatic");Object.defineProperty(r,"TransformStatic",{enumerable:!0,get:function(){return i(d).default}});var f=t("./display/TransformBase");Object.defineProperty(r,"TransformBase",{enumerable:!0,get:function(){return i(f).default}});var p=t("./sprites/Sprite");Object.defineProperty(r,"Sprite",{enumerable:!0,get:function(){return i(p).default}});var v=t("./sprites/canvas/CanvasSpriteRenderer");Object.defineProperty(r,"CanvasSpriteRenderer",{enumerable:!0,get:function(){return i(v).default}});var y=t("./sprites/canvas/CanvasTinter");Object.defineProperty(r,"CanvasTinter",{enumerable:!0,get:function(){return i(y).default}});var g=t("./sprites/webgl/SpriteRenderer");Object.defineProperty(r,"SpriteRenderer",{enumerable:!0,get:function(){return i(g).default}});var m=t("./text/Text");Object.defineProperty(r,"Text",{enumerable:!0,get:function(){return i(m).default}});var _=t("./text/TextStyle");Object.defineProperty(r,"TextStyle",{enumerable:!0,get:function(){return i(_).default}});var b=t("./text/TextMetrics");Object.defineProperty(r,"TextMetrics",{enumerable:!0,get:function(){return i(b).default}});var x=t("./graphics/Graphics");Object.defineProperty(r,"Graphics",{enumerable:!0,get:function(){return i(x).default}});var T=t("./graphics/GraphicsData");Object.defineProperty(r,"GraphicsData",{enumerable:!0,get:function(){return i(T).default}});var w=t("./graphics/webgl/GraphicsRenderer");Object.defineProperty(r,"GraphicsRenderer",{enumerable:!0,get:function(){return i(w).default}});var E=t("./graphics/canvas/CanvasGraphicsRenderer");Object.defineProperty(r,"CanvasGraphicsRenderer",{enumerable:!0,get:function(){return i(E).default}});var S=t("./textures/Spritesheet");Object.defineProperty(r,"Spritesheet",{enumerable:!0,get:function(){return i(S).default}});var O=t("./textures/Texture");Object.defineProperty(r,"Texture",{enumerable:!0,get:function(){return i(O).default}});var P=t("./textures/BaseTexture");Object.defineProperty(r,"BaseTexture",{enumerable:!0,get:function(){return i(P).default}});var M=t("./textures/RenderTexture");Object.defineProperty(r,"RenderTexture",{enumerable:!0,get:function(){return i(M).default}});var C=t("./textures/BaseRenderTexture");Object.defineProperty(r,"BaseRenderTexture",{enumerable:!0,get:function(){return i(C).default}});var R=t("./textures/VideoBaseTexture");Object.defineProperty(r,"VideoBaseTexture",{enumerable:!0,get:function(){return i(R).default}});var A=t("./textures/TextureUvs");Object.defineProperty(r,"TextureUvs",{enumerable:!0,get:function(){return i(A).default}});var I=t("./renderers/canvas/utils/CanvasRenderTarget");Object.defineProperty(r,"CanvasRenderTarget",{enumerable:!0,get:function(){return i(I).default}});var D=t("./Shader");Object.defineProperty(r,"Shader",{enumerable:!0,get:function(){return i(D).default}});var L=t("./renderers/webgl/managers/WebGLManager");Object.defineProperty(r,"WebGLManager",{enumerable:!0,get:function(){return i(L).default}});var N=t("./renderers/webgl/utils/ObjectRenderer");Object.defineProperty(r,"ObjectRenderer",{enumerable:!0,get:function(){return i(N).default}});var F=t("./renderers/webgl/utils/RenderTarget");Object.defineProperty(r,"RenderTarget",{enumerable:!0,get:function(){return i(F).default}});var B=t("./renderers/webgl/utils/Quad");Object.defineProperty(r,"Quad",{enumerable:!0,get:function(){return i(B).default}});var k=t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter");Object.defineProperty(r,"SpriteMaskFilter",{enumerable:!0,get:function(){return i(k).default}});var j=t("./renderers/webgl/filters/Filter");Object.defineProperty(r,"Filter",{enumerable:!0,get:function(){return i(j).default}});var U=t("./Application");Object.defineProperty(r,"Application",{enumerable:!0,get:function(){return i(U).default}});var X=t("./autoDetectRenderer");Object.defineProperty(r,"autoDetectRenderer",{enumerable:!0,get:function(){return X.autoDetectRenderer}});var G=t("./utils"),W=n(G),H=t("./ticker"),Y=n(H),V=t("./settings"),z=i(V),q=t("./renderers/canvas/CanvasRenderer"),K=i(q),Z=t("./renderers/webgl/WebGLRenderer"),J=i(Z);r.settings=z.default,r.utils=W,r.ticker=Y,r.CanvasRenderer=K.default,r.WebGLRenderer=J.default},{"./Application":42,"./Shader":43,"./autoDetectRenderer":44,"./const":45,"./display/Bounds":46,"./display/Container":47,"./display/DisplayObject":48,"./display/Transform":49,"./display/TransformBase":50,"./display/TransformStatic":51,"./graphics/Graphics":52,"./graphics/GraphicsData":53,"./graphics/canvas/CanvasGraphicsRenderer":54,"./graphics/webgl/GraphicsRenderer":56,"./math":69,"./renderers/canvas/CanvasRenderer":76,"./renderers/canvas/utils/CanvasRenderTarget":78,"./renderers/webgl/WebGLRenderer":83,"./renderers/webgl/filters/Filter":85,"./renderers/webgl/filters/spriteMask/SpriteMaskFilter":88,"./renderers/webgl/managers/WebGLManager":92,"./renderers/webgl/utils/ObjectRenderer":93,"./renderers/webgl/utils/Quad":94,"./renderers/webgl/utils/RenderTarget":95,"./settings":100,"./sprites/Sprite":101,"./sprites/canvas/CanvasSpriteRenderer":102,"./sprites/canvas/CanvasTinter":103,"./sprites/webgl/SpriteRenderer":105,"./text/Text":107,"./text/TextMetrics":108,"./text/TextStyle":109,"./textures/BaseRenderTexture":110,"./textures/BaseTexture":111,"./textures/RenderTexture":112,"./textures/Spritesheet":113,"./textures/Texture":114,"./textures/TextureUvs":115,"./textures/VideoBaseTexture":116,"./ticker":119,"./utils":123,"pixi-gl-core":12}],65:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){return t<0?-1:t>0?1:0}function o(){for(var t=0;t<16;t++){var e=[];f.push(e);for(var r=0;r<16;r++)for(var n=i(u[t]*u[r]+l[t]*h[r]),o=i(h[t]*u[r]+c[t]*h[r]),s=i(u[t]*l[r]+l[t]*c[r]),p=i(h[t]*l[r]+c[t]*c[r]),v=0;v<16;v++)if(u[v]===n&&h[v]===o&&l[v]===s&&c[v]===p){e.push(v);break}}for(var y=0;y<16;y++){var g=new a.default;g.set(u[y],h[y],l[y],c[y],0,0),d.push(g)}}r.__esModule=!0;var s=t("./Matrix"),a=n(s),u=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],h=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],l=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],c=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],d=[],f=[];o();var p={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MIRROR_HORIZONTAL:12,uX:function(t){return u[t]},uY:function(t){return h[t]},vX:function(t){return l[t]},vY:function(t){return c[t]},inv:function(t){return 8&t?15&t:7&-t},add:function(t,e){return f[t][e]},sub:function(t,e){return f[t][p.inv(e)]},rotate180:function(t){return 4^t},isSwapWidthHeight:function(t){return 2===(3&t)},byDirection:function(t,e){return 2*Math.abs(t)<=Math.abs(e)?e>=0?p.S:p.N:2*Math.abs(e)<=Math.abs(t)?t>0?p.E:p.W:e>0?t>0?p.SE:p.SW:t>0?p.NE:p.NW},matrixAppendRotationInv:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=d[p.inv(e)];i.tx=r,i.ty=n,t.append(i)}};r.default=p},{"./Matrix":66}],66:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("./Point"),a=n(s),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;i(this,t),this.a=e,this.b=r,this.c=n,this.d=o,this.tx=s,this.ty=a,this.array=null}return t.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},t.prototype.set=function(t,e,r,n,i,o){return this.a=t,this.b=e,this.c=r,this.d=n,this.tx=i,this.ty=o,this},t.prototype.toArray=function(t,e){this.array||(this.array=new Float32Array(9));var r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty,r[8]=1):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0,r[8]=1),r},t.prototype.apply=function(t,e){e=e||new a.default;var r=t.x,n=t.y;return e.x=this.a*r+this.c*n+this.tx,e.y=this.b*r+this.d*n+this.ty,e},t.prototype.applyInverse=function(t,e){e=e||new a.default;var r=1/(this.a*this.d+this.c*-this.b),n=t.x,i=t.y;return e.x=this.d*r*n+-this.c*r*i+(this.ty*this.c-this.tx*this.d)*r,e.y=this.a*r*i+-this.b*r*n+(-this.ty*this.a+this.tx*this.b)*r,e},t.prototype.translate=function(t,e){return this.tx+=t,this.ty+=e,this},t.prototype.scale=function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},t.prototype.rotate=function(t){var e=Math.cos(t),r=Math.sin(t),n=this.a,i=this.c,o=this.tx;return this.a=n*e-this.b*r,this.b=n*r+this.b*e,this.c=i*e-this.d*r,this.d=i*r+this.d*e,this.tx=o*e-this.ty*r,this.ty=o*r+this.ty*e,this},t.prototype.append=function(t){var e=this.a,r=this.b,n=this.c,i=this.d;return this.a=t.a*e+t.b*n,this.b=t.a*r+t.b*i,this.c=t.c*e+t.d*n,this.d=t.c*r+t.d*i,this.tx=t.tx*e+t.ty*n+this.tx,this.ty=t.tx*r+t.ty*i+this.ty,this},t.prototype.setTransform=function(t,e,r,n,i,o,s,a,u){var h=Math.sin(s),l=Math.cos(s),c=Math.cos(u),d=Math.sin(u),f=-Math.sin(a),p=Math.cos(a),v=l*i,y=h*i,g=-h*o,m=l*o;return this.a=c*v+d*g,this.b=c*y+d*m,this.c=f*v+p*g,this.d=f*y+p*m,this.tx=t+(r*v+n*g),this.ty=e+(r*y+n*m),this},t.prototype.prepend=function(t){var e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){var r=this.a,n=this.c;this.a=r*t.a+this.b*t.c,this.b=r*t.b+this.b*t.d,this.c=n*t.a+this.d*t.c,this.d=n*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this},t.prototype.decompose=function(t){var e=this.a,r=this.b,n=this.c,i=this.d,o=-Math.atan2(-n,i),s=Math.atan2(r,e),a=Math.abs(o+s);return a<1e-5?(t.rotation=s,e<0&&i>=0&&(t.rotation+=t.rotation<=0?Math.PI:-Math.PI),t.skew.x=t.skew.y=0):(t.skew.x=o,t.skew.y=s),t.scale.x=Math.sqrt(e*e+r*r),t.scale.y=Math.sqrt(n*n+i*i),t.position.x=this.tx,t.position.y=this.ty,t},t.prototype.invert=function(){var t=this.a,e=this.b,r=this.c,n=this.d,i=this.tx,o=t*n-e*r;return this.a=n/o,this.b=-e/o,this.c=-r/o,this.d=t/o,this.tx=(r*this.ty-n*i)/o,this.ty=-(t*this.ty-e*i)/o,this},t.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},t.prototype.clone=function(){var e=new t;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e},t.prototype.copy=function(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},o(t,null,[{key:"IDENTITY",get:function(){return new t}},{key:"TEMP_MATRIX",get:function(){return new t}}]),t}();r.default=u},{"./Point":68}],67:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=function(){function t(e,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;n(this,t),this._x=i,this._y=o,this.cb=e,this.scope=r}return t.prototype.set=function(t,e){var r=t||0,n=e||(0!==e?r:0);this._x===r&&this._y===n||(this._x=r,this._y=n,this.cb.call(this.scope))},t.prototype.copy=function(t){this._x===t.x&&this._y===t.y||(this._x=t.x,this._y=t.y,this.cb.call(this.scope))},i(t,[{key:"x",get:function(){return this._x},set:function(t){this._x!==t&&(this._x=t,this.cb.call(this.scope))}},{key:"y",get:function(){return this._y},set:function(t){this._y!==t&&(this._y=t,this.cb.call(this.scope))}}]),t}();r.default=o},{}],68:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;n(this,t),this.x=e,this.y=r}return t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.copy=function(t){this.set(t.x,t.y)},t.prototype.equals=function(t){return t.x===this.x&&t.y===this.y},t.prototype.set=function(t,e){this.x=t||0,this.y=e||(0!==e?this.x:0)},t}();r.default=i},{}],69:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./Point");Object.defineProperty(r,"Point",{enumerable:!0,get:function(){return n(i).default}});var o=t("./ObservablePoint");Object.defineProperty(r,"ObservablePoint",{enumerable:!0,get:function(){return n(o).default}});var s=t("./Matrix");Object.defineProperty(r,"Matrix",{enumerable:!0,get:function(){return n(s).default}});var a=t("./GroupD8");Object.defineProperty(r,"GroupD8",{enumerable:!0,get:function(){return n(a).default}});var u=t("./shapes/Circle");Object.defineProperty(r,"Circle",{enumerable:!0,get:function(){return n(u).default}});var h=t("./shapes/Ellipse");Object.defineProperty(r,"Ellipse",{enumerable:!0,get:function(){return n(h).default}});var l=t("./shapes/Polygon");Object.defineProperty(r,"Polygon",{enumerable:!0,get:function(){return n(l).default}});var c=t("./shapes/Rectangle");Object.defineProperty(r,"Rectangle",{enumerable:!0,get:function(){return n(c).default}});var d=t("./shapes/RoundedRectangle");Object.defineProperty(r,"RoundedRectangle",{enumerable:!0,get:function(){return n(d).default}})},{"./GroupD8":65,"./Matrix":66,"./ObservablePoint":67,"./Point":68,"./shapes/Circle":70,"./shapes/Ellipse":71,"./shapes/Polygon":72,"./shapes/Rectangle":73,"./shapes/RoundedRectangle":74}],70:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("./Rectangle"),s=n(o),a=t("../../const"),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;i(this,t),this.x=e,this.y=r,this.radius=n,this.type=a.SHAPES.CIRC}return t.prototype.clone=function(){return new t(this.x,this.y,this.radius)},t.prototype.contains=function(t,e){if(this.radius<=0)return!1;var r=this.radius*this.radius,n=this.x-t,i=this.y-e;return n*=n,i*=i,n+i<=r},t.prototype.getBounds=function(){return new s.default(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)},t}();r.default=u},{"../../const":45,"./Rectangle":73}],71:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("./Rectangle"),s=n(o),a=t("../../const"),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;i(this,t),this.x=e,this.y=r,this.width=n,this.height=o,this.type=a.SHAPES.ELIP}return t.prototype.clone=function(){return new t(this.x,this.y,this.width,this.height)},t.prototype.contains=function(t,e){if(this.width<=0||this.height<=0)return!1;var r=(t-this.x)/this.width,n=(e-this.y)/this.height;return r*=r,n*=n,r+n<=1},t.prototype.getBounds=function(){return new s.default(this.x-this.width,this.y-this.height,this.width,this.height)},t}();r.default=u},{"../../const":45,"./Rectangle":73}],72:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../Point"),s=n(o),a=t("../../const"),u=function(){function t(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];if(i(this,t),Array.isArray(r[0])&&(r=r[0]),r[0]instanceof s.default){for(var o=[],u=0,h=r.length;u<h;u++)o.push(r[u].x,r[u].y);r=o}this.closed=!0,this.points=r,this.type=a.SHAPES.POLY}return t.prototype.clone=function(){return new t(this.points.slice())},t.prototype.close=function(){var t=this.points;t[0]===t[t.length-2]&&t[1]===t[t.length-1]||t.push(t[0],t[1])},t.prototype.contains=function(t,e){for(var r=!1,n=this.points.length/2,i=0,o=n-1;i<n;o=i++){var s=this.points[2*i],a=this.points[2*i+1],u=this.points[2*o],h=this.points[2*o+1],l=a>e!=h>e&&t<(u-s)*((e-a)/(h-a))+s;l&&(r=!r)}return r},t}();r.default=u},{"../../const":45,"../Point":68}],73:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=t("../../const"),s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;n(this,t),this.x=e,this.y=r,this.width=i,this.height=s,this.type=o.SHAPES.RECT}return t.prototype.clone=function(){return new t(this.x,this.y,this.width,this.height)},t.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this},t.prototype.contains=function(t,e){return!(this.width<=0||this.height<=0)&&(t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height)},t.prototype.pad=function(t,e){t=t||0,e=e||(0!==e?t:0),this.x-=t,this.y-=e,this.width+=2*t,this.height+=2*e},t.prototype.fit=function(t){this.x<t.x&&(this.width+=this.x,this.width<0&&(this.width=0),this.x=t.x),this.y<t.y&&(this.height+=this.y,this.height<0&&(this.height=0),this.y=t.y),this.x+this.width>t.x+t.width&&(this.width=t.width-this.x,this.width<0&&(this.width=0)),this.y+this.height>t.y+t.height&&(this.height=t.height-this.y,this.height<0&&(this.height=0))},t.prototype.enlarge=function(t){var e=Math.min(this.x,t.x),r=Math.max(this.x+this.width,t.x+t.width),n=Math.min(this.y,t.y),i=Math.max(this.y+this.height,t.y+t.height);this.x=e,this.width=r-e,this.y=n,this.height=i-n},i(t,[{key:"left",get:function(){return this.x}},{key:"right",get:function(){return this.x+this.width}},{key:"top",get:function(){return this.y}},{key:"bottom",get:function(){return this.y+this.height}}],[{key:"EMPTY",get:function(){return new t(0,0,0,0)}}]),t}();r.default=s},{"../../const":45}],74:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=t("../../const"),o=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:20;n(this,t),this.x=e,this.y=r,this.width=o,this.height=s,this.radius=a,this.type=i.SHAPES.RREC}return t.prototype.clone=function(){return new t(this.x,this.y,this.width,this.height,this.radius)},t.prototype.contains=function(t,e){if(this.width<=0||this.height<=0)return!1;if(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height){if(e>=this.y+this.radius&&e<=this.y+this.height-this.radius||t>=this.x+this.radius&&t<=this.x+this.width-this.radius)return!0;var r=t-(this.x+this.radius),n=e-(this.y+this.radius),i=this.radius*this.radius;if(r*r+n*n<=i)return!0;if(r=t-(this.x+this.width-this.radius),r*r+n*n<=i)return!0;if(n=e-(this.y+this.height-this.radius),r*r+n*n<=i)return!0;if(r=t-(this.x+this.radius),r*r+n*n<=i)return!0}return!1},t}();r.default=o},{"../../const":45}],75:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../utils"),h=t("../math"),l=t("../const"),c=t("../settings"),d=n(c),f=t("../display/Container"),p=n(f),v=t("../textures/RenderTexture"),y=n(v),g=t("eventemitter3"),m=n(g),_=new h.Matrix,b=function(t){function e(r,n,s,a){i(this,e);var c=o(this,t.call(this));return(0,u.sayHello)(r),"number"==typeof n&&(n=Object.assign({width:n,height:s||d.default.RENDER_OPTIONS.height},a)),n=Object.assign({},d.default.RENDER_OPTIONS,n),c.options=n,c.type=l.RENDERER_TYPE.UNKNOWN,c.screen=new h.Rectangle(0,0,n.width,n.height),c.view=n.view||document.createElement("canvas"),c.resolution=n.resolution||d.default.RESOLUTION,c.transparent=n.transparent,c.autoResize=n.autoResize||!1,c.blendModes=null,c.preserveDrawingBuffer=n.preserveDrawingBuffer,c.clearBeforeRender=n.clearBeforeRender,c.roundPixels=n.roundPixels,c._backgroundColor=0,c._backgroundColorRgba=[0,0,0,0],c._backgroundColorString="#000000",c.backgroundColor=n.backgroundColor||c._backgroundColor,c._tempDisplayObjectParent=new p.default,c._lastObjectRendered=c._tempDisplayObjectParent,c}return s(e,t),e.prototype.resize=function(t,e){this.screen.width=t,this.screen.height=e,this.view.width=t*this.resolution,this.view.height=e*this.resolution,this.autoResize&&(this.view.style.width=t+"px",this.view.style.height=e+"px")},e.prototype.generateTexture=function(t,e,r){var n=t.getLocalBounds(),i=y.default.create(0|n.width,0|n.height,e,r);return _.tx=-n.x,_.ty=-n.y,this.render(t,i,!1,_,!0),i},e.prototype.destroy=function(t){t&&this.view.parentNode&&this.view.parentNode.removeChild(this.view),this.type=l.RENDERER_TYPE.UNKNOWN,this.view=null,this.screen=null,this.resolution=0,this.transparent=!1,this.autoResize=!1,this.blendModes=null,this.options=null,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!1,this.roundPixels=!1,this._backgroundColor=0,this._backgroundColorRgba=null,this._backgroundColorString=null,this._tempDisplayObjectParent=null,this._lastObjectRendered=null},a(e,[{key:"width",get:function(){return this.view.width}},{key:"height",get:function(){return this.view.height}},{key:"backgroundColor",get:function(){return this._backgroundColor},set:function(t){this._backgroundColor=t,this._backgroundColorString=(0,u.hex2string)(t),(0,u.hex2rgb)(t,this._backgroundColorRgba)}}]),e}(m.default);r.default=b},{"../const":45,"../display/Container":47,"../math":69,"../settings":100,"../textures/RenderTexture":112,"../utils":123,eventemitter3:3}],76:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../SystemRenderer"),u=n(a),h=t("./utils/CanvasMaskManager"),l=n(h),c=t("./utils/CanvasRenderTarget"),d=n(c),f=t("./utils/mapCanvasBlendModesToPixi"),p=n(f),v=t("../../utils"),y=t("../../const"),g=t("../../settings"),m=n(g),_=function(t){function e(r,n,s){i(this,e);var a=o(this,t.call(this,"Canvas",r,n,s));return a.type=y.RENDERER_TYPE.CANVAS,a.rootContext=a.view.getContext("2d",{alpha:a.transparent}),a.context=a.rootContext,a.refresh=!0,a.maskManager=new l.default(a),a.smoothProperty="imageSmoothingEnabled",a.rootContext.imageSmoothingEnabled||(a.rootContext.webkitImageSmoothingEnabled?a.smoothProperty="webkitImageSmoothingEnabled":a.rootContext.mozImageSmoothingEnabled?a.smoothProperty="mozImageSmoothingEnabled":a.rootContext.oImageSmoothingEnabled?a.smoothProperty="oImageSmoothingEnabled":a.rootContext.msImageSmoothingEnabled&&(a.smoothProperty="msImageSmoothingEnabled")),a.initPlugins(),a.blendModes=(0,p.default)(),a._activeBlendMode=null,a.renderingToScreen=!1,a.resize(a.options.width,a.options.height),a}return s(e,t),e.prototype.render=function(t,e,r,n,i){if(this.view){this.renderingToScreen=!e,this.emit("prerender");var o=this.resolution;e?(e=e.baseTexture||e,e._canvasRenderTarget||(e._canvasRenderTarget=new d.default(e.width,e.height,e.resolution),e.source=e._canvasRenderTarget.canvas,e.valid=!0),this.context=e._canvasRenderTarget.context,this.resolution=e._canvasRenderTarget.resolution):this.context=this.rootContext;var s=this.context;if(e||(this._lastObjectRendered=t),!i){var a=t.parent,u=this._tempDisplayObjectParent.transform.worldTransform;n?(n.copy(u),this._tempDisplayObjectParent.transform._worldID=-1):u.identity(),t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=a}s.setTransform(1,0,0,1,0,0),s.globalAlpha=1,s.globalCompositeOperation=this.blendModes[y.BLEND_MODES.NORMAL],navigator.isCocoonJS&&this.view.screencanvas&&(s.fillStyle="black",s.clear()),(void 0!==r?r:this.clearBeforeRender)&&this.renderingToScreen&&(this.transparent?s.clearRect(0,0,this.width,this.height):(s.fillStyle=this._backgroundColorString,s.fillRect(0,0,this.width,this.height)));var h=this.context;this.context=s,t.renderCanvas(this),this.context=h,this.resolution=o,this.emit("postrender")}},e.prototype.clear=function(t){var e=this.context;t=t||this._backgroundColorString,!this.transparent&&t?(e.fillStyle=t,e.fillRect(0,0,this.width,this.height)):e.clearRect(0,0,this.width,this.height)},e.prototype.setBlendMode=function(t){this._activeBlendMode!==t&&(this._activeBlendMode=t,this.context.globalCompositeOperation=this.blendModes[t])},e.prototype.destroy=function(e){this.destroyPlugins(),t.prototype.destroy.call(this,e),this.context=null,this.refresh=!0,this.maskManager.destroy(),this.maskManager=null,this.smoothProperty=null},e.prototype.resize=function(e,r){t.prototype.resize.call(this,e,r),this.smoothProperty&&(this.rootContext[this.smoothProperty]=m.default.SCALE_MODE===y.SCALE_MODES.LINEAR)},e}(u.default);r.default=_,v.pluginTarget.mixin(_)},{"../../const":45,"../../settings":100,"../../utils":123,"../SystemRenderer":75,"./utils/CanvasMaskManager":77,"./utils/CanvasRenderTarget":78,"./utils/mapCanvasBlendModesToPixi":80}],77:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=t("../../../const"),o=function(){function t(e){n(this,t),this.renderer=e}return t.prototype.pushMask=function(t){var e=this.renderer;e.context.save();var r=t.alpha,n=t.transform.worldTransform,i=e.resolution;e.context.setTransform(n.a*i,n.b*i,n.c*i,n.d*i,n.tx*i,n.ty*i),t._texture||(this.renderGraphicsShape(t),e.context.clip()),t.worldAlpha=r},t.prototype.renderGraphicsShape=function(t){var e=this.renderer.context,r=t.graphicsData.length;if(0!==r){e.beginPath();for(var n=0;n<r;n++){var o=t.graphicsData[n],s=o.shape;if(o.type===i.SHAPES.POLY){var a=s.points;e.moveTo(a[0],a[1]);for(var u=1;u<a.length/2;u++)e.lineTo(a[2*u],a[2*u+1]);a[0]===a[a.length-2]&&a[1]===a[a.length-1]&&e.closePath()}else if(o.type===i.SHAPES.RECT)e.rect(s.x,s.y,s.width,s.height),e.closePath();else if(o.type===i.SHAPES.CIRC)e.arc(s.x,s.y,s.radius,0,2*Math.PI),e.closePath();else if(o.type===i.SHAPES.ELIP){var h=2*s.width,l=2*s.height,c=s.x-h/2,d=s.y-l/2,f=.5522848,p=h/2*f,v=l/2*f,y=c+h,g=d+l,m=c+h/2,_=d+l/2;e.moveTo(c,_),e.bezierCurveTo(c,_-v,m-p,d,m,d),e.bezierCurveTo(m+p,d,y,_-v,y,_),e.bezierCurveTo(y,_+v,m+p,g,m,g),e.bezierCurveTo(m-p,g,c,_+v,c,_),e.closePath()}else if(o.type===i.SHAPES.RREC){var b=s.x,x=s.y,T=s.width,w=s.height,E=s.radius,S=Math.min(T,w)/2|0;E=E>S?S:E,e.moveTo(b,x+E),e.lineTo(b,x+w-E),e.quadraticCurveTo(b,x+w,b+E,x+w),e.lineTo(b+T-E,x+w),e.quadraticCurveTo(b+T,x+w,b+T,x+w-E),e.lineTo(b+T,x+E),e.quadraticCurveTo(b+T,x,b+T-E,x),e.lineTo(b+E,x),e.quadraticCurveTo(b,x,b,x+E),e.closePath()}}}},t.prototype.popMask=function(t){t.context.restore()},t.prototype.destroy=function(){},t}();r.default=o},{"../../../const":45}],78:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("../../../settings"),a=n(s),u=function(){function t(e,r,n){i(this,t),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=n||a.default.RESOLUTION,this.resize(e,r)}return t.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.resize=function(t,e){this.canvas.width=t*this.resolution,this.canvas.height=e*this.resolution},t.prototype.destroy=function(){this.context=null,this.canvas=null},o(t,[{key:"width",get:function(){return this.canvas.width},set:function(t){this.canvas.width=t}},{key:"height",get:function(){return this.canvas.height},set:function(t){this.canvas.height=t}}]),t}();r.default=u},{"../../../settings":100}],79:[function(t,e,r){"use strict";function n(t){var e=document.createElement("canvas");e.width=6,e.height=1;var r=e.getContext("2d");return r.fillStyle=t,r.fillRect(0,0,6,1),e}function i(){if("undefined"==typeof document)return!1;var t=n("#ff00ff"),e=n("#ffff00"),r=document.createElement("canvas");r.width=6,r.height=1;var i=r.getContext("2d");i.globalCompositeOperation="multiply",i.drawImage(t,0,0),i.drawImage(e,2,0);var o=i.getImageData(2,0,1,1);if(!o)return!1;var s=o.data;return 255===s[0]&&0===s[1]&&0===s[2]}r.__esModule=!0,r.default=i},{}],80:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return(0,a.default)()?(t[o.BLEND_MODES.NORMAL]="source-over",t[o.BLEND_MODES.ADD]="lighter",t[o.BLEND_MODES.MULTIPLY]="multiply",t[o.BLEND_MODES.SCREEN]="screen",t[o.BLEND_MODES.OVERLAY]="overlay",t[o.BLEND_MODES.DARKEN]="darken",t[o.BLEND_MODES.LIGHTEN]="lighten",t[o.BLEND_MODES.COLOR_DODGE]="color-dodge",t[o.BLEND_MODES.COLOR_BURN]="color-burn",t[o.BLEND_MODES.HARD_LIGHT]="hard-light",t[o.BLEND_MODES.SOFT_LIGHT]="soft-light",t[o.BLEND_MODES.DIFFERENCE]="difference",t[o.BLEND_MODES.EXCLUSION]="exclusion",t[o.BLEND_MODES.HUE]="hue",t[o.BLEND_MODES.SATURATION]="saturate",t[o.BLEND_MODES.COLOR]="color",t[o.BLEND_MODES.LUMINOSITY]="luminosity"):(t[o.BLEND_MODES.NORMAL]="source-over",t[o.BLEND_MODES.ADD]="lighter",t[o.BLEND_MODES.MULTIPLY]="source-over",t[o.BLEND_MODES.SCREEN]="source-over",t[o.BLEND_MODES.OVERLAY]="source-over",t[o.BLEND_MODES.DARKEN]="source-over",t[o.BLEND_MODES.LIGHTEN]="source-over",t[o.BLEND_MODES.COLOR_DODGE]="source-over",t[o.BLEND_MODES.COLOR_BURN]="source-over",t[o.BLEND_MODES.HARD_LIGHT]="source-over",t[o.BLEND_MODES.SOFT_LIGHT]="source-over",t[o.BLEND_MODES.DIFFERENCE]="source-over",t[o.BLEND_MODES.EXCLUSION]="source-over",t[o.BLEND_MODES.HUE]="source-over",t[o.BLEND_MODES.SATURATION]="source-over",t[o.BLEND_MODES.COLOR]="source-over",t[o.BLEND_MODES.LUMINOSITY]="source-over"),t[o.BLEND_MODES.NORMAL_NPM]=t[o.BLEND_MODES.NORMAL],t[o.BLEND_MODES.ADD_NPM]=t[o.BLEND_MODES.ADD],t[o.BLEND_MODES.SCREEN_NPM]=t[o.BLEND_MODES.SCREEN],t}r.__esModule=!0,r.default=i;var o=t("../../../const"),s=t("./canUseNewCanvasBlendModes"),a=n(s)},{"../../../const":45,"./canUseNewCanvasBlendModes":79}],81:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../const"),s=t("../../settings"),a=n(s),u=function(){function t(e){i(this,t),this.renderer=e,this.count=0,this.checkCount=0,this.maxIdle=a.default.GC_MAX_IDLE,this.checkCountMax=a.default.GC_MAX_CHECK_COUNT,this.mode=a.default.GC_MODE}return t.prototype.update=function(){this.count++,this.mode!==o.GC_MODES.MANUAL&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run()))},t.prototype.run=function(){for(var t=this.renderer.textureManager,e=t._managedTextures,r=!1,n=0;n<e.length;n++){var i=e[n];!i._glRenderTargets&&this.count-i.touched>this.maxIdle&&(t.destroyTexture(i,!0),e[n]=null,r=!0)}if(r){for(var o=0,s=0;s<e.length;s++)null!==e[s]&&(e[o++]=e[s]);e.length=o}},t.prototype.unload=function(t){var e=this.renderer.textureManager;t._texture&&t._texture._glRenderTargets&&e.destroyTexture(t._texture,!0);for(var r=t.children.length-1;r>=0;r--)this.unload(t.children[r])},t}();r.default=u},{"../../const":45,"../../settings":100}],82:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("pixi-gl-core"),s=t("../../const"),a=t("./utils/RenderTarget"),u=n(a),h=t("../../utils"),l=function(){function t(e){i(this,t),this.renderer=e,this.gl=e.gl,this._managedTextures=[]}return t.prototype.bindTexture=function(){},t.prototype.getTexture=function(){},t.prototype.updateTexture=function(t,e){var r=this.gl,n=!!t._glRenderTargets;if(!t.hasLoaded)return null;var i=this.renderer.boundTextures;if(void 0===e){e=0;for(var a=0;a<i.length;++a)if(i[a]===t){e=a;break}}i[e]=t,r.activeTexture(r.TEXTURE0+e);var h=t._glTextures[this.renderer.CONTEXT_UID];if(h)n?t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width,t.height):h.upload(t.source);else{if(n){var l=new u.default(this.gl,t.width,t.height,t.scaleMode,t.resolution);l.resize(t.width,t.height),t._glRenderTargets[this.renderer.CONTEXT_UID]=l,h=l.texture}else h=new o.GLTexture(this.gl,null,null,null,null),h.bind(e),h.premultiplyAlpha=!0,h.upload(t.source);t._glTextures[this.renderer.CONTEXT_UID]=h,t.on("update",this.updateTexture,this),t.on("dispose",this.destroyTexture,this),this._managedTextures.push(t),t.isPowerOfTwo?(t.mipmap&&h.enableMipmap(),t.wrapMode===s.WRAP_MODES.CLAMP?h.enableWrapClamp():t.wrapMode===s.WRAP_MODES.REPEAT?h.enableWrapRepeat():h.enableWrapMirrorRepeat()):h.enableWrapClamp(),t.scaleMode===s.SCALE_MODES.NEAREST?h.enableNearestScaling():h.enableLinearScaling()}return h},t.prototype.destroyTexture=function(t,e){if(t=t.baseTexture||t,t.hasLoaded&&t._glTextures[this.renderer.CONTEXT_UID]&&(this.renderer.unbindTexture(t),t._glTextures[this.renderer.CONTEXT_UID].destroy(),t.off("update",this.updateTexture,this),t.off("dispose",this.destroyTexture,this),delete t._glTextures[this.renderer.CONTEXT_UID],!e)){var r=this._managedTextures.indexOf(t);r!==-1&&(0,h.removeItems)(this._managedTextures,r,1)}},t.prototype.removeAll=function(){for(var t=0;t<this._managedTextures.length;++t){var e=this._managedTextures[t];e._glTextures[this.renderer.CONTEXT_UID]&&delete e._glTextures[this.renderer.CONTEXT_UID]}},t.prototype.destroy=function(){for(var t=0;t<this._managedTextures.length;++t){var e=this._managedTextures[t];this.destroyTexture(e,!0),e.off("update",this.updateTexture,this),e.off("dispose",this.destroyTexture,this)}this._managedTextures=null},t}();r.default=l},{"../../const":45,"../../utils":123,"./utils/RenderTarget":95,"pixi-gl-core":12}],83:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../SystemRenderer"),u=n(a),h=t("./managers/MaskManager"),l=n(h),c=t("./managers/StencilManager"),d=n(c),f=t("./managers/FilterManager"),p=n(f),v=t("./utils/RenderTarget"),y=n(v),g=t("./utils/ObjectRenderer"),m=n(g),_=t("./TextureManager"),b=n(_),x=t("../../textures/BaseTexture"),T=n(x),w=t("./TextureGarbageCollector"),E=n(w),S=t("./WebGLState"),O=n(S),P=t("./utils/mapWebGLDrawModesToPixi"),M=n(P),C=t("./utils/validateContext"),R=n(C),A=t("../../utils"),I=t("pixi-gl-core"),D=n(I),L=t("../../const"),N=0,F=function(t){function e(r,n,s){i(this,e);var a=o(this,t.call(this,"WebGL",r,n,s));return a.legacy=a.options.legacy,a.legacy&&(D.default.VertexArrayObject.FORCE_NATIVE=!0),a.type=L.RENDERER_TYPE.WEBGL,a.handleContextLost=a.handleContextLost.bind(a),a.handleContextRestored=a.handleContextRestored.bind(a),a.view.addEventListener("webglcontextlost",a.handleContextLost,!1),a.view.addEventListener("webglcontextrestored",a.handleContextRestored,!1),a._contextOptions={alpha:a.transparent,antialias:a.options.antialias,premultipliedAlpha:a.transparent&&"notMultiplied"!==a.transparent,stencil:!0,preserveDrawingBuffer:a.options.preserveDrawingBuffer},a._backgroundColorRgba[3]=a.transparent?0:1,a.maskManager=new l.default(a),a.stencilManager=new d.default(a),a.emptyRenderer=new m.default(a),a.currentRenderer=a.emptyRenderer,a.initPlugins(),a.options.context&&(0,R.default)(a.options.context),a.gl=a.options.context||D.default.createContext(a.view,a._contextOptions),a.CONTEXT_UID=N++,a.state=new O.default(a.gl),a.renderingToScreen=!0,a.boundTextures=null,a._activeShader=null,a._activeVao=null,a._activeRenderTarget=null,a._initContext(),a.filterManager=new p.default(a),a.drawModes=(0,M.default)(a.gl),a._nextTextureLocation=0,a.setBlendMode(0),a}return s(e,t),e.prototype._initContext=function(){var t=this.gl;t.isContextLost()&&t.getExtension("WEBGL_lose_context")&&t.getExtension("WEBGL_lose_context").restoreContext();var e=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);this._activeShader=null,this._activeVao=null,this.boundTextures=new Array(e),this.emptyTextures=new Array(e),this.textureManager=new b.default(this),this.textureGC=new E.default(this),this.state.resetToDefault(),this.rootRenderTarget=new y.default(t,this.width,this.height,null,this.resolution,!0),this.rootRenderTarget.clearColor=this._backgroundColorRgba,this.bindRenderTarget(this.rootRenderTarget);var r=new D.default.GLTexture.fromData(t,null,1,1),n={_glTextures:{}};n._glTextures[this.CONTEXT_UID]={};for(var i=0;i<e;i++){var o=new T.default;o._glTextures[this.CONTEXT_UID]=r,this.boundTextures[i]=n,this.emptyTextures[i]=o,this.bindTexture(null,i)}this.emit("context",t),this.resize(this.screen.width,this.screen.height)},e.prototype.render=function(t,e,r,n,i){if(this.renderingToScreen=!e,this.emit("prerender"),this.gl&&!this.gl.isContextLost()){if(this._nextTextureLocation=0,e||(this._lastObjectRendered=t),!i){var o=t.parent;t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=o}this.bindRenderTexture(e,n),this.currentRenderer.start(),(void 0!==r?r:this.clearBeforeRender)&&this._activeRenderTarget.clear(),t.renderWebGL(this),this.currentRenderer.flush(),this.textureGC.update(),this.emit("postrender")}},e.prototype.setObjectRenderer=function(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())},e.prototype.flush=function(){this.setObjectRenderer(this.emptyRenderer)},e.prototype.resize=function(t,e){u.default.prototype.resize.call(this,t,e),this.rootRenderTarget.resize(t,e),this._activeRenderTarget===this.rootRenderTarget&&(this.rootRenderTarget.activate(),this._activeShader&&(this._activeShader.uniforms.projectionMatrix=this.rootRenderTarget.projectionMatrix.toArray(!0)))},e.prototype.setBlendMode=function(t){this.state.setBlendMode(t)},e.prototype.clear=function(t){this._activeRenderTarget.clear(t)},e.prototype.setTransform=function(t){this._activeRenderTarget.transform=t},e.prototype.clearRenderTexture=function(t,e){var r=t.baseTexture,n=r._glRenderTargets[this.CONTEXT_UID];return n&&n.clear(e),this},e.prototype.bindRenderTexture=function(t,e){var r=void 0;if(t){var n=t.baseTexture;n._glRenderTargets[this.CONTEXT_UID]||this.textureManager.updateTexture(n,0),this.unbindTexture(n),r=n._glRenderTargets[this.CONTEXT_UID],r.setFrame(t.frame)}else r=this.rootRenderTarget;return r.transform=e,this.bindRenderTarget(r),this},e.prototype.bindRenderTarget=function(t){return t!==this._activeRenderTarget&&(this._activeRenderTarget=t,t.activate(),this._activeShader&&(this._activeShader.uniforms.projectionMatrix=t.projectionMatrix.toArray(!0)),this.stencilManager.setMaskStack(t.stencilMaskStack)),this},e.prototype.bindShader=function(t,e){return this._activeShader!==t&&(this._activeShader=t,t.bind(),e!==!1&&(t.uniforms.projectionMatrix=this._activeRenderTarget.projectionMatrix.toArray(!0))),this},e.prototype.bindTexture=function(t,e,r){if(t=t||this.emptyTextures[e],t=t.baseTexture||t,t.touched=this.textureGC.count,r)e=e||0;else{for(var n=0;n<this.boundTextures.length;n++)if(this.boundTextures[n]===t)return n;void 0===e&&(this._nextTextureLocation++,this._nextTextureLocation%=this.boundTextures.length,e=this.boundTextures.length-this._nextTextureLocation-1)}var i=this.gl,o=t._glTextures[this.CONTEXT_UID];return o?(this.boundTextures[e]=t,i.activeTexture(i.TEXTURE0+e),i.bindTexture(i.TEXTURE_2D,o.texture)):this.textureManager.updateTexture(t,e),e},e.prototype.unbindTexture=function(t){var e=this.gl;t=t.baseTexture||t;for(var r=0;r<this.boundTextures.length;r++)this.boundTextures[r]===t&&(this.boundTextures[r]=this.emptyTextures[r],e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,this.emptyTextures[r]._glTextures[this.CONTEXT_UID].texture));return this},e.prototype.createVao=function(){return new D.default.VertexArrayObject(this.gl,this.state.attribState)},e.prototype.bindVao=function(t){return this._activeVao===t?this:(t?t.bind():this._activeVao&&this._activeVao.unbind(),this._activeVao=t,this)},e.prototype.reset=function(){return this.setObjectRenderer(this.emptyRenderer),this._activeShader=null,this._activeRenderTarget=this.rootRenderTarget,this.rootRenderTarget.activate(),this.state.resetToDefault(),this},e.prototype.handleContextLost=function(t){t.preventDefault()},e.prototype.handleContextRestored=function(){this.textureManager.removeAll(),this._initContext()},e.prototype.destroy=function(e){this.destroyPlugins(),this.view.removeEventListener("webglcontextlost",this.handleContextLost),this.view.removeEventListener("webglcontextrestored",this.handleContextRestored),this.textureManager.destroy(),t.prototype.destroy.call(this,e),this.uid=0,this.maskManager.destroy(),this.stencilManager.destroy(),this.filterManager.destroy(),this.maskManager=null,this.filterManager=null,this.textureManager=null,this.currentRenderer=null,this.handleContextLost=null,this.handleContextRestored=null,this._contextOptions=null,this.gl.useProgram(null),this.gl.getExtension("WEBGL_lose_context")&&this.gl.getExtension("WEBGL_lose_context").loseContext(),this.gl=null},e}(u.default);r.default=F,A.pluginTarget.mixin(F)},{"../../const":45,"../../textures/BaseTexture":111,"../../utils":123,"../SystemRenderer":75,"./TextureGarbageCollector":81,"./TextureManager":82,"./WebGLState":84,"./managers/FilterManager":89,"./managers/MaskManager":90,"./managers/StencilManager":91,"./utils/ObjectRenderer":93,"./utils/RenderTarget":95,"./utils/mapWebGLDrawModesToPixi":98,"./utils/validateContext":99,"pixi-gl-core":12}],84:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("./utils/mapWebGLBlendModesToPixi"),s=n(o),a=0,u=1,h=2,l=3,c=4,d=function(){function t(e){i(this,t),this.activeState=new Uint8Array(16),this.defaultState=new Uint8Array(16),this.defaultState[0]=1,this.stackIndex=0,this.stack=[],this.gl=e,this.maxAttribs=e.getParameter(e.MAX_VERTEX_ATTRIBS),this.attribState={tempAttribState:new Array(this.maxAttribs),attribState:new Array(this.maxAttribs)},this.blendModes=(0,s.default)(e),this.nativeVaoExtension=e.getExtension("OES_vertex_array_object")||e.getExtension("MOZ_OES_vertex_array_object")||e.getExtension("WEBKIT_OES_vertex_array_object")}return t.prototype.push=function(){var t=this.stack[this.stackIndex];t||(t=this.stack[this.stackIndex]=new Uint8Array(16)),++this.stackIndex;for(var e=0;e<this.activeState.length;e++)t[e]=this.activeState[e]},t.prototype.pop=function(){var t=this.stack[--this.stackIndex];this.setState(t)},t.prototype.setState=function(t){this.setBlend(t[a]),this.setDepthTest(t[u]),this.setFrontFace(t[h]),this.setCullFace(t[l]),this.setBlendMode(t[c])},t.prototype.setBlend=function(t){t=t?1:0,this.activeState[a]!==t&&(this.activeState[a]=t,this.gl[t?"enable":"disable"](this.gl.BLEND))},t.prototype.setBlendMode=function(t){if(t!==this.activeState[c]){this.activeState[c]=t;var e=this.blendModes[t];2===e.length?this.gl.blendFunc(e[0],e[1]):this.gl.blendFuncSeparate(e[0],e[1],e[2],e[3])}},t.prototype.setDepthTest=function(t){t=t?1:0,this.activeState[u]!==t&&(this.activeState[u]=t,this.gl[t?"enable":"disable"](this.gl.DEPTH_TEST))},t.prototype.setCullFace=function(t){t=t?1:0,this.activeState[l]!==t&&(this.activeState[l]=t,this.gl[t?"enable":"disable"](this.gl.CULL_FACE))},t.prototype.setFrontFace=function(t){t=t?1:0,this.activeState[h]!==t&&(this.activeState[h]=t,this.gl.frontFace(this.gl[t?"CW":"CCW"]))},t.prototype.resetAttributes=function(){for(var t=0;t<this.attribState.tempAttribState.length;t++)this.attribState.tempAttribState[t]=0;for(var e=0;e<this.attribState.attribState.length;e++)this.attribState.attribState[e]=0;for(var r=1;r<this.maxAttribs;r++)this.gl.disableVertexAttribArray(r)},t.prototype.resetToDefault=function(){this.nativeVaoExtension&&this.nativeVaoExtension.bindVertexArrayOES(null),this.resetAttributes();for(var t=0;t<this.activeState.length;++t)this.activeState[t]=32;this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.setState(this.defaultState)},t}();r.default=d},{"./utils/mapWebGLBlendModesToPixi":97}],85:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("./extractUniformsFromSrc"),a=n(s),u=t("../../../utils"),h=t("../../../const"),l=t("../../../settings"),c=n(l),d={},f=function(){function t(e,r,n){i(this,t),this.vertexSrc=e||t.defaultVertexSrc,this.fragmentSrc=r||t.defaultFragmentSrc,this.blendMode=h.BLEND_MODES.NORMAL,this.uniformData=n||(0,a.default)(this.vertexSrc,this.fragmentSrc,"projectionMatrix|uSampler"),this.uniforms={};for(var o in this.uniformData)this.uniforms[o]=this.uniformData[o].value;this.glShaders={},d[this.vertexSrc+this.fragmentSrc]||(d[this.vertexSrc+this.fragmentSrc]=(0,u.uid)()),this.glShaderKey=d[this.vertexSrc+this.fragmentSrc],this.padding=4,this.resolution=c.default.RESOLUTION,this.enabled=!0,this.autoFit=!0}return t.prototype.apply=function(t,e,r,n,i){t.applyFilter(this,e,r,n)},o(t,null,[{key:"defaultVertexSrc",get:function(){return["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 projectionMatrix;","uniform mat3 filterMatrix;","varying vec2 vTextureCoord;","varying vec2 vFilterCoord;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;","   vTextureCoord = aTextureCoord ;","}"].join("\n")}},{key:"defaultFragmentSrc",get:function(){return["varying vec2 vTextureCoord;","varying vec2 vFilterCoord;","uniform sampler2D uSampler;","uniform sampler2D filterSampler;","void main(void){","   vec4 masky = texture2D(filterSampler, vFilterCoord);","   vec4 sample = texture2D(uSampler, vTextureCoord);","   vec4 color;","   if(mod(vFilterCoord.x, 1.0) > 0.5)","   {","     color = vec4(1.0, 0.0, 0.0, 1.0);","   }","   else","   {","     color = vec4(0.0, 1.0, 0.0, 1.0);","   }","   gl_FragColor = mix(sample, masky, 0.5);","   gl_FragColor *= sample.a;","}"].join("\n")}}]),t}();r.default=f},{"../../../const":45,"../../../settings":100,"../../../utils":123,"./extractUniformsFromSrc":86}],86:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,r){var n=o(t,r),i=o(e,r);return Object.assign(n,i)}function o(t){for(var e=new RegExp("^(projectionMatrix|uSampler|filterArea|filterClamp)$"),r={},n=void 0,i=t.replace(/\s+/g," ").split(/\s*;\s*/),o=0;o<i.length;o++){var s=i[o].trim();if(s.indexOf("uniform")>-1){var a=s.split(" "),h=a[1],l=a[2],c=1;l.indexOf("[")>-1&&(n=l.split(/\[|]/),l=n[0],c*=Number(n[1])),l.match(e)||(r[l]={value:u(h,c),name:l,type:h})}}return r}r.__esModule=!0,r.default=i;var s=t("pixi-gl-core"),a=n(s),u=a.default.shader.defaultValue},{"pixi-gl-core":12}],87:[function(t,e,r){"use strict";function n(t,e,r){var n=t.identity();return n.translate(e.x/r.width,e.y/r.height),n.scale(r.width,r.height),n}function i(t,e,r){var n=t.identity();n.translate(e.x/r.width,e.y/r.height);var i=r.width/e.width,o=r.height/e.height;return n.scale(i,o),n}function o(t,e,r,n){var i=n.worldTransform.copy(s.Matrix.TEMP_MATRIX),o=n._texture.baseTexture,a=t.identity(),u=r.height/r.width;a.translate(e.x/r.width,e.y/r.height),a.scale(1,u);var h=r.width/o.width,l=r.height/o.height;return i.tx/=o.width*h,i.ty/=o.width*h,i.invert(),a.prepend(i),a.scale(1,1/u),a.scale(h,l),a.translate(n.anchor.x,n.anchor.y),a}r.__esModule=!0,r.calculateScreenSpaceMatrix=n,r.calculateNormalizedScreenSpaceMatrix=i,r.calculateSpriteMatrix=o;var s=t("../../../math")},{"../../../math":69}],88:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../Filter"),u=n(a),h=t("../../../../math"),l=(t("path"),function(t){function e(r){i(this,e);var n=new h.Matrix,s=o(this,t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n","varying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n\n    original *= (masky.r * masky.a * alpha * clip);\n\n    gl_FragColor = original;\n}\n"));return r.renderable=!1,s.maskSprite=r,s.maskMatrix=n,s}return s(e,t),e.prototype.apply=function(t,e,r){var n=this.maskSprite;this.uniforms.mask=n._texture,this.uniforms.otherMatrix=t.calculateSpriteMatrix(this.maskMatrix,n),this.uniforms.alpha=n.worldAlpha,t.applyFilter(this,e,r)},e}(u.default));r.default=l},{"../../../../math":69,"../Filter":85,path:22}],89:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var u=t("./WebGLManager"),h=i(u),l=t("../utils/RenderTarget"),c=i(l),d=t("../utils/Quad"),f=i(d),p=t("../../../math"),v=t("../../../Shader"),y=i(v),g=t("../filters/filterTransforms"),m=n(g),_=t("bit-twiddle"),b=i(_),x=function t(){a(this,t),this.renderTarget=null,this.sourceFrame=new p.Rectangle,this.destinationFrame=new p.Rectangle,this.filters=[],this.target=null,this.resolution=1},T=function(t){function e(r){a(this,e);var n=o(this,t.call(this,r));return n.gl=n.renderer.gl,n.quad=new f.default(n.gl,r.state.attribState),n.shaderCache={},n.pool={},n.filterData=null,n}return s(e,t),e.prototype.pushFilter=function(t,e){var r=this.renderer,n=this.filterData;if(!n){n=this.renderer._activeRenderTarget.filterStack;var i=new x;i.sourceFrame=i.destinationFrame=this.renderer._activeRenderTarget.size,i.renderTarget=r._activeRenderTarget,this.renderer._activeRenderTarget.filterData=n={index:0,stack:[i]},this.filterData=n}var o=n.stack[++n.index];o||(o=n.stack[n.index]=new x);var s=e[0].resolution,a=0|e[0].padding,u=t.filterArea||t.getBounds(!0),h=o.sourceFrame,l=o.destinationFrame;h.x=(u.x*s|0)/s,h.y=(u.y*s|0)/s,h.width=(u.width*s|0)/s,h.height=(u.height*s|0)/s,n.stack[0].renderTarget.transform||e[0].autoFit&&h.fit(n.stack[0].destinationFrame),h.pad(a),l.width=h.width,l.height=h.height;var c=this.getPotRenderTarget(r.gl,h.width,h.height,s);o.target=t,o.filters=e,o.resolution=s,o.renderTarget=c,c.setFrame(l,h),r.bindRenderTarget(c),c.clear()},e.prototype.popFilter=function(){var t=this.filterData,e=t.stack[t.index-1],r=t.stack[t.index];this.quad.map(r.renderTarget.size,r.sourceFrame).upload();var n=r.filters;if(1===n.length)n[0].apply(this,r.renderTarget,e.renderTarget,!1,r),this.freePotRenderTarget(r.renderTarget);else{var i=r.renderTarget,o=this.getPotRenderTarget(this.renderer.gl,r.sourceFrame.width,r.sourceFrame.height,r.resolution);o.setFrame(r.destinationFrame,r.sourceFrame),o.clear();var s=0;for(s=0;s<n.length-1;++s){n[s].apply(this,i,o,!0,r);var a=i;i=o,o=a}n[s].apply(this,i,e.renderTarget,!1,r),this.freePotRenderTarget(i),this.freePotRenderTarget(o)}t.index--,0===t.index&&(this.filterData=null)},e.prototype.applyFilter=function(t,e,r,n){var i=this.renderer,o=i.gl,s=t.glShaders[i.CONTEXT_UID];s||(t.glShaderKey?(s=this.shaderCache[t.glShaderKey],s||(s=new y.default(this.gl,t.vertexSrc,t.fragmentSrc),t.glShaders[i.CONTEXT_UID]=this.shaderCache[t.glShaderKey]=s)):s=t.glShaders[i.CONTEXT_UID]=new y.default(this.gl,t.vertexSrc,t.fragmentSrc),i.bindVao(null),this.quad.initVao(s)),i.bindVao(this.quad.vao),i.bindRenderTarget(r),n&&(o.disable(o.SCISSOR_TEST),i.clear(),o.enable(o.SCISSOR_TEST)),r===i.maskManager.scissorRenderTarget&&i.maskManager.pushScissorMask(null,i.maskManager.scissorData),i.bindShader(s);var a=this.renderer.emptyTextures[0];this.renderer.boundTextures[0]=a,this.syncUniforms(s,t),i.state.setBlendMode(t.blendMode),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,e.texture.texture),this.quad.vao.draw(this.renderer.gl.TRIANGLES,6,0),o.bindTexture(o.TEXTURE_2D,a._glTextures[this.renderer.CONTEXT_UID].texture)},e.prototype.syncUniforms=function(t,e){var r=e.uniformData,n=e.uniforms,i=1,o=void 0;if(t.uniforms.filterArea){o=this.filterData.stack[this.filterData.index];var s=t.uniforms.filterArea;s[0]=o.renderTarget.size.width,s[1]=o.renderTarget.size.height,s[2]=o.sourceFrame.x,s[3]=o.sourceFrame.y,t.uniforms.filterArea=s}if(t.uniforms.filterClamp){o=o||this.filterData.stack[this.filterData.index];var a=t.uniforms.filterClamp;a[0]=0,a[1]=0,a[2]=(o.sourceFrame.width-1)/o.renderTarget.size.width,a[3]=(o.sourceFrame.height-1)/o.renderTarget.size.height,t.uniforms.filterClamp=a}for(var u in r)if("sampler2D"===r[u].type&&0!==n[u]){if(n[u].baseTexture)t.uniforms[u]=this.renderer.bindTexture(n[u].baseTexture,i);else{t.uniforms[u]=i;var h=this.renderer.gl;this.renderer.boundTextures[i]=this.renderer.emptyTextures[i],h.activeTexture(h.TEXTURE0+i),n[u].texture.bind()}i++}else if("mat3"===r[u].type)void 0!==n[u].a?t.uniforms[u]=n[u].toArray(!0):t.uniforms[u]=n[u];else if("vec2"===r[u].type)if(void 0!==n[u].x){var l=t.uniforms[u]||new Float32Array(2);l[0]=n[u].x,l[1]=n[u].y,t.uniforms[u]=l}else t.uniforms[u]=n[u];else"float"===r[u].type?t.uniforms.data[u].value!==r[u]&&(t.uniforms[u]=n[u]):t.uniforms[u]=n[u]},e.prototype.getRenderTarget=function(t,e){var r=this.filterData.stack[this.filterData.index],n=this.getPotRenderTarget(this.renderer.gl,r.sourceFrame.width,r.sourceFrame.height,e||r.resolution);return n.setFrame(r.destinationFrame,r.sourceFrame),n},e.prototype.returnRenderTarget=function(t){this.freePotRenderTarget(t)},e.prototype.calculateScreenSpaceMatrix=function(t){var e=this.filterData.stack[this.filterData.index];return m.calculateScreenSpaceMatrix(t,e.sourceFrame,e.renderTarget.size)},e.prototype.calculateNormalizedScreenSpaceMatrix=function(t){var e=this.filterData.stack[this.filterData.index];return m.calculateNormalizedScreenSpaceMatrix(t,e.sourceFrame,e.renderTarget.size,e.destinationFrame)},e.prototype.calculateSpriteMatrix=function(t,e){var r=this.filterData.stack[this.filterData.index];return m.calculateSpriteMatrix(t,r.sourceFrame,r.renderTarget.size,e)},e.prototype.destroy=function(){this.shaderCache={},this.emptyPool()},e.prototype.getPotRenderTarget=function(t,e,r,n){e=b.default.nextPow2(e*n),r=b.default.nextPow2(r*n);var i=(65535&e)<<16|65535&r;this.pool[i]||(this.pool[i]=[]);var o=this.pool[i].pop();if(!o){var s=this.renderer.boundTextures[0];t.activeTexture(t.TEXTURE0),o=new c.default(t,e,r,null,1),t.bindTexture(t.TEXTURE_2D,s._glTextures[this.renderer.CONTEXT_UID].texture)}return o.resolution=n,o.defaultFrame.width=o.size.width=e/n,o.defaultFrame.height=o.size.height=r/n,o},e.prototype.emptyPool=function(){for(var t in this.pool){var e=this.pool[t];if(e)for(var r=0;r<e.length;r++)e[r].destroy(!0)}this.pool={}},e.prototype.freePotRenderTarget=function(t){var e=t.size.width*t.resolution,r=t.size.height*t.resolution,n=(65535&e)<<16|65535&r;this.pool[n].push(t)},e}(h.default);r.default=T},{"../../../Shader":43,"../../../math":69,"../filters/filterTransforms":87,"../utils/Quad":94,"../utils/RenderTarget":95,"./WebGLManager":92,"bit-twiddle":1}],90:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./WebGLManager"),u=n(a),h=t("../filters/spriteMask/SpriteMaskFilter"),l=n(h),c=function(t){function e(r){i(this,e);var n=o(this,t.call(this,r));return n.scissor=!1,n.scissorData=null,n.scissorRenderTarget=null,n.enableScissor=!0,n.alphaMaskPool=[],n.alphaMaskIndex=0,n}return s(e,t),e.prototype.pushMask=function(t,e){if(e.texture)this.pushSpriteMask(t,e);else if(this.enableScissor&&!this.scissor&&this.renderer._activeRenderTarget.root&&!this.renderer.stencilManager.stencilMaskStack.length&&e.isFastRect()){var r=e.worldTransform,n=Math.atan2(r.b,r.a);n=Math.round(n*(180/Math.PI)),n%90?this.pushStencilMask(e):this.pushScissorMask(t,e)}else this.pushStencilMask(e)},e.prototype.popMask=function(t,e){e.texture?this.popSpriteMask(t,e):this.enableScissor&&!this.renderer.stencilManager.stencilMaskStack.length?this.popScissorMask(t,e):this.popStencilMask(t,e)},e.prototype.pushSpriteMask=function(t,e){var r=this.alphaMaskPool[this.alphaMaskIndex];r||(r=this.alphaMaskPool[this.alphaMaskIndex]=[new l.default(e)]),r[0].resolution=this.renderer.resolution,r[0].maskSprite=e,t.filterArea=e.getBounds(!0),this.renderer.filterManager.pushFilter(t,r),this.alphaMaskIndex++},e.prototype.popSpriteMask=function(){this.renderer.filterManager.popFilter(),this.alphaMaskIndex--},e.prototype.pushStencilMask=function(t){this.renderer.currentRenderer.stop(),this.renderer.stencilManager.pushStencil(t)},e.prototype.popStencilMask=function(){this.renderer.currentRenderer.stop(),this.renderer.stencilManager.popStencil()},e.prototype.pushScissorMask=function(t,e){e.renderable=!0;var r=this.renderer._activeRenderTarget,n=e.getBounds();n.fit(r.size),e.renderable=!1,this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);var i=this.renderer.resolution;this.renderer.gl.scissor(n.x*i,(r.root?r.size.height-n.y-n.height:n.y)*i,n.width*i,n.height*i),this.scissorRenderTarget=r,this.scissorData=e,this.scissor=!0},e.prototype.popScissorMask=function(){this.scissorRenderTarget=null,this.scissorData=null,this.scissor=!1;var t=this.renderer.gl;t.disable(t.SCISSOR_TEST)},e}(u.default);r.default=c},{"../filters/spriteMask/SpriteMaskFilter":88,"./WebGLManager":92}],91:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./WebGLManager"),u=n(a),h=function(t){function e(r){i(this,e);var n=o(this,t.call(this,r));return n.stencilMaskStack=null,n}return s(e,t),e.prototype.setMaskStack=function(t){this.stencilMaskStack=t;var e=this.renderer.gl;0===t.length?e.disable(e.STENCIL_TEST):e.enable(e.STENCIL_TEST)},e.prototype.pushStencil=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),this.renderer._activeRenderTarget.attachStencilBuffer();var e=this.renderer.gl,r=this.stencilMaskStack;0===r.length&&(e.enable(e.STENCIL_TEST),e.clear(e.STENCIL_BUFFER_BIT),e.stencilFunc(e.ALWAYS,1,1)),r.push(t),e.colorMask(!1,!1,!1,!1),e.stencilOp(e.KEEP,e.KEEP,e.INCR),this.renderer.plugins.graphics.render(t),e.colorMask(!0,!0,!0,!0),e.stencilFunc(e.NOTEQUAL,0,r.length),e.stencilOp(e.KEEP,e.KEEP,e.KEEP)},e.prototype.popStencil=function(){this.renderer.setObjectRenderer(this.renderer.plugins.graphics);var t=this.renderer.gl,e=this.stencilMaskStack,r=e.pop();0===e.length?t.disable(t.STENCIL_TEST):(t.colorMask(!1,!1,!1,!1),t.stencilOp(t.KEEP,t.KEEP,t.DECR),this.renderer.plugins.graphics.render(r),t.colorMask(!0,!0,!0,!0),t.stencilFunc(t.NOTEQUAL,0,e.length),t.stencilOp(t.KEEP,t.KEEP,t.KEEP))},e.prototype.destroy=function(){u.default.prototype.destroy.call(this),this.stencilMaskStack.stencilStack=null},e}(u.default);r.default=h},{"./WebGLManager":92}],92:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e){n(this,t),this.renderer=e,this.renderer.on("context",this.onContextChange,this)}return t.prototype.onContextChange=function(){},t.prototype.destroy=function(){this.renderer.off("context",this.onContextChange,this),this.renderer=null},t}();r.default=i},{}],93:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../managers/WebGLManager"),u=n(a),h=function(t){function e(){return i(this,e),o(this,t.apply(this,arguments))}return s(e,t),e.prototype.start=function(){},e.prototype.stop=function(){this.flush()},e.prototype.flush=function(){},e.prototype.render=function(t){},e}(u.default);r.default=h},{"../managers/WebGLManager":92}],94:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("pixi-gl-core"),s=n(o),a=t("../../../utils/createIndicesForQuads"),u=n(a),h=function(){function t(e,r){i(this,t),this.gl=e,this.vertices=new Float32Array([-1,-1,1,-1,1,1,-1,1]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.interleaved=new Float32Array(16);for(var n=0;n<4;n++)this.interleaved[4*n]=this.vertices[2*n],this.interleaved[4*n+1]=this.vertices[2*n+1],this.interleaved[4*n+2]=this.uvs[2*n],this.interleaved[4*n+3]=this.uvs[2*n+1];this.indices=(0,u.default)(1),this.vertexBuffer=s.default.GLBuffer.createVertexBuffer(e,this.interleaved,e.STATIC_DRAW),this.indexBuffer=s.default.GLBuffer.createIndexBuffer(e,this.indices,e.STATIC_DRAW),this.vao=new s.default.VertexArrayObject(e,r)}return t.prototype.initVao=function(t){this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer,t.attributes.aVertexPosition,this.gl.FLOAT,!1,16,0).addAttribute(this.vertexBuffer,t.attributes.aTextureCoord,this.gl.FLOAT,!1,16,8)},t.prototype.map=function(t,e){var r=0,n=0;return this.uvs[0]=r,this.uvs[1]=n,this.uvs[2]=r+e.width/t.width,this.uvs[3]=n,this.uvs[4]=r+e.width/t.width,this.uvs[5]=n+e.height/t.height,this.uvs[6]=r,this.uvs[7]=n+e.height/t.height,r=e.x,n=e.y,this.vertices[0]=r,this.vertices[1]=n,this.vertices[2]=r+e.width,this.vertices[3]=n,this.vertices[4]=r+e.width,this.vertices[5]=n+e.height,this.vertices[6]=r,this.vertices[7]=n+e.height,this},t.prototype.upload=function(){for(var t=0;t<4;t++)this.interleaved[4*t]=this.vertices[2*t],this.interleaved[4*t+1]=this.vertices[2*t+1],this.interleaved[4*t+2]=this.uvs[2*t],this.interleaved[4*t+3]=this.uvs[2*t+1];return this.vertexBuffer.upload(this.interleaved),this},t.prototype.destroy=function(){var t=this.gl;t.deleteBuffer(this.vertexBuffer),t.deleteBuffer(this.indexBuffer)},t}();r.default=h},{"../../../utils/createIndicesForQuads":121,"pixi-gl-core":12}],95:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../../math"),s=t("../../../const"),a=t("../../../settings"),u=n(a),h=t("pixi-gl-core"),l=function(){function t(e,r,n,a,l,c){i(this,t),this.gl=e,this.frameBuffer=null,this.texture=null,this.clearColor=[0,0,0,0],this.size=new o.Rectangle(0,0,1,1),this.resolution=l||u.default.RESOLUTION,this.projectionMatrix=new o.Matrix,this.transform=null,this.frame=null,this.defaultFrame=new o.Rectangle,this.destinationFrame=null,this.sourceFrame=null,this.stencilBuffer=null,this.stencilMaskStack=[],this.filterData=null,this.scaleMode=void 0!==a?a:u.default.SCALE_MODE,this.root=c,this.root?(this.frameBuffer=new h.GLFramebuffer(e,100,100),this.frameBuffer.framebuffer=null):(this.frameBuffer=h.GLFramebuffer.createRGBA(e,100,100),this.scaleMode===s.SCALE_MODES.NEAREST?this.frameBuffer.texture.enableNearestScaling():this.frameBuffer.texture.enableLinearScaling(),this.texture=this.frameBuffer.texture),this.setFrame(),this.resize(r,n)}return t.prototype.clear=function(t){var e=t||this.clearColor;this.frameBuffer.clear(e[0],e[1],e[2],e[3])},t.prototype.attachStencilBuffer=function(){this.root||this.frameBuffer.enableStencil()},t.prototype.setFrame=function(t,e){this.destinationFrame=t||this.destinationFrame||this.defaultFrame,this.sourceFrame=e||this.sourceFrame||this.destinationFrame},t.prototype.activate=function(){var t=this.gl;this.frameBuffer.bind(),this.calculateProjection(this.destinationFrame,this.sourceFrame),this.transform&&this.projectionMatrix.append(this.transform),this.destinationFrame!==this.sourceFrame?(t.enable(t.SCISSOR_TEST),t.scissor(0|this.destinationFrame.x,0|this.destinationFrame.y,this.destinationFrame.width*this.resolution|0,this.destinationFrame.height*this.resolution|0)):t.disable(t.SCISSOR_TEST),t.viewport(0|this.destinationFrame.x,0|this.destinationFrame.y,this.destinationFrame.width*this.resolution|0,this.destinationFrame.height*this.resolution|0)},t.prototype.calculateProjection=function(t,e){var r=this.projectionMatrix;e=e||t,r.identity(),this.root?(r.a=1/t.width*2,r.d=-1/t.height*2,r.tx=-1-e.x*r.a,r.ty=1-e.y*r.d):(r.a=1/t.width*2,r.d=1/t.height*2,r.tx=-1-e.x*r.a,r.ty=-1-e.y*r.d)},t.prototype.resize=function(t,e){if(t=0|t,e=0|e,this.size.width!==t||this.size.height!==e){this.size.width=t,this.size.height=e,this.defaultFrame.width=t,this.defaultFrame.height=e,this.frameBuffer.resize(t*this.resolution,e*this.resolution);var r=this.frame||this.size;this.calculateProjection(r)}},t.prototype.destroy=function(){this.frameBuffer.destroy(),this.frameBuffer=null,this.texture=null},t}();r.default=l},{"../../../const":45,"../../../math":69,"../../../settings":100,"pixi-gl-core":12}],96:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var r=!e;if(r){var n=document.createElement("canvas");n.width=1,n.height=1,e=a.default.createContext(n)}for(var i=e.createShader(e.FRAGMENT_SHADER);;){var s=u.replace(/%forloop%/gi,o(t));if(e.shaderSource(i,s),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))break;t=t/2|0}return r&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),t}function o(t){for(var e="",r=0;r<t;++r)r>0&&(e+="\nelse "),r<t-1&&(e+="if(test == "+r+".0){}");return e}r.__esModule=!0,r.default=i;var s=t("pixi-gl-core"),a=n(s),u=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join("\n")},{"pixi-gl-core":12}],97:[function(t,e,r){"use strict";function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e[i.BLEND_MODES.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.ADD]=[t.ONE,t.DST_ALPHA],e[i.BLEND_MODES.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.SCREEN]=[t.ONE,t.ONE_MINUS_SRC_COLOR],e[i.BLEND_MODES.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.NORMAL_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.BLEND_MODES.ADD_NPM]=[t.SRC_ALPHA,t.DST_ALPHA,t.ONE,t.DST_ALPHA],e[i.BLEND_MODES.SCREEN_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_COLOR],e}r.__esModule=!0,r.default=n;var i=t("../../../const")},{"../../../const":45}],98:[function(t,e,r){"use strict";function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e[i.DRAW_MODES.POINTS]=t.POINTS,e[i.DRAW_MODES.LINES]=t.LINES,e[i.DRAW_MODES.LINE_LOOP]=t.LINE_LOOP,e[i.DRAW_MODES.LINE_STRIP]=t.LINE_STRIP,e[i.DRAW_MODES.TRIANGLES]=t.TRIANGLES,e[i.DRAW_MODES.TRIANGLE_STRIP]=t.TRIANGLE_STRIP,e[i.DRAW_MODES.TRIANGLE_FAN]=t.TRIANGLE_FAN,e}r.__esModule=!0,r.default=n;var i=t("../../../const")},{"../../../const":45}],99:[function(t,e,r){"use strict";function n(t){var e=t.getContextAttributes();e.stencil||console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")}r.__esModule=!0,r.default=n},{}],100:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./utils/maxRecommendedTextures"),o=n(i),s=t("./utils/canUploadSameBuffer"),a=n(s);r.default={TARGET_FPMS:.06,MIPMAP_TEXTURES:!0,RESOLUTION:1,FILTER_RESOLUTION:1,SPRITE_MAX_TEXTURES:(0,o.default)(32),SPRITE_BATCH_SIZE:4096,RETINA_PREFIX:/@([0-9\.]+)x/,RENDER_OPTIONS:{view:null,antialias:!1,forceFXAA:!1,autoResize:!1,transparent:!1,backgroundColor:0,clearBeforeRender:!0,preserveDrawingBuffer:!1,roundPixels:!1,width:800,height:600,legacy:!1},TRANSFORM_MODE:0,GC_MODE:0,GC_MAX_IDLE:3600,GC_MAX_CHECK_COUNT:600,WRAP_MODE:0,SCALE_MODE:0,PRECISION_VERTEX:"highp",PRECISION_FRAGMENT:"mediump",CAN_UPLOAD_SAME_BUFFER:(0,a.default)()}},{"./utils/canUploadSameBuffer":120,"./utils/maxRecommendedTextures":125}],101:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../math"),h=t("../utils"),l=t("../const"),c=t("../textures/Texture"),d=n(c),f=t("../display/Container"),p=n(f),v=new u.Point,y=function(t){function e(r){i(this,e);var n=o(this,t.call(this));return n._anchor=new u.ObservablePoint(n._onAnchorUpdate,n),n._texture=null,n._width=0,n._height=0,n._tint=null,n._tintRGB=null,n.tint=16777215,n.blendMode=l.BLEND_MODES.NORMAL,n.shader=null,n.cachedTint=16777215,n.texture=r||d.default.EMPTY,n.vertexData=new Float32Array(8),n.vertexTrimmedData=null,n._transformID=-1,n._textureID=-1,n._transformTrimmedID=-1,n._textureTrimmedID=-1,n.pluginName="sprite",n}return s(e,t),e.prototype._onTextureUpdate=function(){this._textureID=-1,this._textureTrimmedID=-1,this._width&&(this.scale.x=(0,h.sign)(this.scale.x)*this._width/this._texture.orig.width),this._height&&(this.scale.y=(0,h.sign)(this.scale.y)*this._height/this._texture.orig.height)},e.prototype._onAnchorUpdate=function(){this._transformID=-1,this._transformTrimmedID=-1},e.prototype.calculateVertices=function(){if(this._transformID!==this.transform._worldID||this._textureID!==this._texture._updateID){this._transformID=this.transform._worldID,this._textureID=this._texture._updateID;var t=this._texture,e=this.transform.worldTransform,r=e.a,n=e.b,i=e.c,o=e.d,s=e.tx,a=e.ty,u=this.vertexData,h=t.trim,l=t.orig,c=this._anchor,d=0,f=0,p=0,v=0;h?(f=h.x-c._x*l.width,d=f+h.width,v=h.y-c._y*l.height,p=v+h.height):(f=-c._x*l.width,d=f+l.width,v=-c._y*l.height,p=v+l.height),u[0]=r*f+i*v+s,u[1]=o*v+n*f+a,u[2]=r*d+i*v+s,u[3]=o*v+n*d+a,u[4]=r*d+i*p+s,u[5]=o*p+n*d+a,u[6]=r*f+i*p+s,u[7]=o*p+n*f+a}},e.prototype.calculateTrimmedVertices=function(){if(this.vertexTrimmedData){if(this._transformTrimmedID===this.transform._worldID&&this._textureTrimmedID===this._texture._updateID)return}else this.vertexTrimmedData=new Float32Array(8);this._transformTrimmedID=this.transform._worldID,this._textureTrimmedID=this._texture._updateID;var t=this._texture,e=this.vertexTrimmedData,r=t.orig,n=this._anchor,i=this.transform.worldTransform,o=i.a,s=i.b,a=i.c,u=i.d,h=i.tx,l=i.ty,c=-n._x*r.width,d=c+r.width,f=-n._y*r.height,p=f+r.height;e[0]=o*c+a*f+h,e[1]=u*f+s*c+l,e[2]=o*d+a*f+h,e[3]=u*f+s*d+l,e[4]=o*d+a*p+h,e[5]=u*p+s*d+l,e[6]=o*c+a*p+h,e[7]=u*p+s*c+l},e.prototype._renderWebGL=function(t){this.calculateVertices(),t.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this)},e.prototype._renderCanvas=function(t){t.plugins[this.pluginName].render(this)},e.prototype._calculateBounds=function(){var t=this._texture.trim,e=this._texture.orig;!t||t.width===e.width&&t.height===e.height?(this.calculateVertices(),this._bounds.addQuad(this.vertexData)):(this.calculateTrimmedVertices(),this._bounds.addQuad(this.vertexTrimmedData))},e.prototype.getLocalBounds=function(e){return 0===this.children.length?(this._bounds.minX=this._texture.orig.width*-this._anchor._x,this._bounds.minY=this._texture.orig.height*-this._anchor._y,this._bounds.maxX=this._texture.orig.width*(1-this._anchor._x),this._bounds.maxY=this._texture.orig.height*(1-this._anchor._x),e||(this._localBoundsRect||(this._localBoundsRect=new u.Rectangle),e=this._localBoundsRect),this._bounds.getRectangle(e)):t.prototype.getLocalBounds.call(this,e)},e.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,v);var e=this._texture.orig.width,r=this._texture.orig.height,n=-e*this.anchor.x,i=0;return v.x>=n&&v.x<n+e&&(i=-r*this.anchor.y,v.y>=i&&v.y<i+r)},e.prototype.destroy=function(e){t.prototype.destroy.call(this,e),this._anchor=null;var r="boolean"==typeof e?e:e&&e.texture;if(r){var n="boolean"==typeof e?e:e&&e.baseTexture;this._texture.destroy(!!n)}this._texture=null,this.shader=null},e.from=function(t){return new e(d.default.from(t))},e.fromFrame=function(t){var r=h.TextureCache[t];if(!r)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return new e(r)},e.fromImage=function(t,r,n){return new e(d.default.fromImage(t,r,n))},a(e,[{key:"width",get:function(){return Math.abs(this.scale.x)*this._texture.orig.width},set:function(t){var e=(0,h.sign)(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}},{key:"height",get:function(){return Math.abs(this.scale.y)*this._texture.orig.height},set:function(t){var e=(0,h.sign)(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}},{key:"anchor",get:function(){return this._anchor},set:function(t){this._anchor.copy(t)}},{key:"tint",get:function(){return this._tint},set:function(t){this._tint=t,this._tintRGB=(t>>16)+(65280&t)+((255&t)<<16)}},{key:"texture",get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,this.cachedTint=16777215,this._textureID=-1,this._textureTrimmedID=-1,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}]),e}(p.default);r.default=y},{"../const":45,"../display/Container":47,"../math":69,"../textures/Texture":114,"../utils":123}],102:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../renderers/canvas/CanvasRenderer"),s=n(o),a=t("../../const"),u=t("../../math"),h=t("./CanvasTinter"),l=n(h),c=new u.Matrix,d=function(){function t(e){i(this,t),this.renderer=e}return t.prototype.render=function(t){var e=t._texture,r=this.renderer,n=e._frame.width,i=e._frame.height,o=t.transform.worldTransform,s=0,h=0;if(!(e.orig.width<=0||e.orig.height<=0)&&e.baseTexture.source&&(r.setBlendMode(t.blendMode),e.valid)){r.context.globalAlpha=t.worldAlpha;var d=e.baseTexture.scaleMode===a.SCALE_MODES.LINEAR;r.smoothProperty&&r.context[r.smoothProperty]!==d&&(r.context[r.smoothProperty]=d),e.trim?(s=e.trim.width/2+e.trim.x-t.anchor.x*e.orig.width,h=e.trim.height/2+e.trim.y-t.anchor.y*e.orig.height):(s=(.5-t.anchor.x)*e.orig.width,h=(.5-t.anchor.y)*e.orig.height),e.rotate&&(o.copy(c),o=c,u.GroupD8.matrixAppendRotationInv(o,e.rotate,s,h),s=0,h=0),s-=n/2,h-=i/2,r.roundPixels?(r.context.setTransform(o.a,o.b,o.c,o.d,o.tx*r.resolution|0,o.ty*r.resolution|0),s=0|s,h=0|h):r.context.setTransform(o.a,o.b,o.c,o.d,o.tx*r.resolution,o.ty*r.resolution);var f=e.baseTexture.resolution;16777215!==t.tint?(t.cachedTint===t.tint&&t.tintedTexture.tintId===t._texture._updateID||(t.cachedTint=t.tint,t.tintedTexture=l.default.getTintedTexture(t,t.tint)),r.context.drawImage(t.tintedTexture,0,0,n*f,i*f,s*r.resolution,h*r.resolution,n*r.resolution,i*r.resolution)):r.context.drawImage(e.baseTexture.source,e._frame.x*f,e._frame.y*f,n*f,i*f,s*r.resolution,h*r.resolution,n*r.resolution,i*r.resolution)}},t.prototype.destroy=function(){this.renderer=null},t}();r.default=d,s.default.registerPlugin("sprite",d)},{"../../const":45,"../../math":69,"../../renderers/canvas/CanvasRenderer":76,"./CanvasTinter":103}],103:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("../../utils"),o=t("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),s=n(o),a={getTintedTexture:function(t,e){var r=t._texture;e=a.roundColor(e);var n="#"+("00000"+(0|e).toString(16)).substr(-6);r.tintCache=r.tintCache||{};var i=r.tintCache[n],o=void 0;if(i){if(i.tintId===r._updateID)return r.tintCache[n];o=r.tintCache[n]}else o=a.canvas||document.createElement("canvas");if(a.tintMethod(r,e,o),o.tintId=r._updateID,a.convertTintToImage){var s=new Image;s.src=o.toDataURL(),r.tintCache[n]=s}else r.tintCache[n]=o,a.canvas=null;return o},tintWithMultiply:function(t,e,r){var n=r.getContext("2d"),i=t._frame.clone(),o=t.baseTexture.resolution;i.x*=o,i.y*=o,i.width*=o,i.height*=o,r.width=Math.ceil(i.width),r.height=Math.ceil(i.height),n.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),n.fillRect(0,0,i.width,i.height),n.globalCompositeOperation="multiply",n.drawImage(t.baseTexture.source,i.x,i.y,i.width,i.height,0,0,i.width,i.height),n.globalCompositeOperation="destination-atop",n.drawImage(t.baseTexture.source,i.x,i.y,i.width,i.height,0,0,i.width,i.height)},tintWithOverlay:function(t,e,r){var n=r.getContext("2d"),i=t._frame.clone(),o=t.baseTexture.resolution;i.x*=o,i.y*=o,i.width*=o,i.height*=o,r.width=Math.ceil(i.width),r.height=Math.ceil(i.height),n.globalCompositeOperation="copy",n.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),n.fillRect(0,0,i.width,i.height),n.globalCompositeOperation="destination-atop",n.drawImage(t.baseTexture.source,i.x,i.y,i.width,i.height,0,0,i.width,i.height)},tintWithPerPixel:function(t,e,r){var n=r.getContext("2d"),o=t._frame.clone(),s=t.baseTexture.resolution;o.x*=s,o.y*=s,o.width*=s,o.height*=s,r.width=Math.ceil(o.width),r.height=Math.ceil(o.height),n.globalCompositeOperation="copy",n.drawImage(t.baseTexture.source,o.x,o.y,o.width,o.height,0,0,o.width,o.height);for(var a=(0,i.hex2rgb)(e),u=a[0],h=a[1],l=a[2],c=n.getImageData(0,0,o.width,o.height),d=c.data,f=0;f<d.length;f+=4)d[f+0]*=u,d[f+1]*=h,d[f+2]*=l;n.putImageData(c,0,0)},roundColor:function(t){var e=a.cacheStepsPerColorChannel,r=(0,i.hex2rgb)(t);return r[0]=Math.min(255,r[0]/e*e),r[1]=Math.min(255,r[1]/e*e),r[2]=Math.min(255,r[2]/e*e),(0,i.rgb2hex)(r)},cacheStepsPerColorChannel:8,convertTintToImage:!1,canUseMultiply:(0,s.default)(),tintMethod:0};a.tintMethod=a.canUseMultiply?a.tintWithMultiply:a.tintWithPerPixel,r.default=a},{"../../renderers/canvas/utils/canUseNewCanvasBlendModes":79,"../../utils":123}],104:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e){n(this,t),this.vertices=new ArrayBuffer(e),this.float32View=new Float32Array(this.vertices),this.uint32View=new Uint32Array(this.vertices)}return t.prototype.destroy=function(){this.vertices=null,this.positions=null,this.uvs=null,this.colors=null},t}();r.default=i},{}],105:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../renderers/webgl/utils/ObjectRenderer"),u=n(a),h=t("../../renderers/webgl/WebGLRenderer"),l=n(h),c=t("../../utils/createIndicesForQuads"),d=n(c),f=t("./generateMultiTextureShader"),p=n(f),v=t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),y=n(v),g=t("./BatchBuffer"),m=n(g),_=t("../../settings"),b=n(_),x=t("../../utils"),T=t("pixi-gl-core"),w=n(T),E=t("bit-twiddle"),S=n(E),O=0,P=0,M=function(t){function e(r){i(this,e);var n=o(this,t.call(this,r));n.vertSize=5,n.vertByteSize=4*n.vertSize,n.size=b.default.SPRITE_BATCH_SIZE,n.buffers=[];for(var s=1;s<=S.default.nextPow2(n.size);s*=2)n.buffers.push(new m.default(4*s*n.vertByteSize));n.indices=(0,d.default)(n.size),n.shader=null,n.currentIndex=0,n.groups=[];for(var a=0;a<n.size;a++)n.groups[a]={textures:[],textureCount:0,ids:[],size:0,start:0,blend:0};return n.sprites=[],n.vertexBuffers=[],n.vaos=[],n.vaoMax=2,n.vertexCount=0,n.renderer.on("prerender",n.onPrerender,n),n}return s(e,t),e.prototype.onContextChange=function(){var t=this.renderer.gl;this.renderer.legacy?this.MAX_TEXTURES=1:(this.MAX_TEXTURES=Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),b.default.SPRITE_MAX_TEXTURES),this.MAX_TEXTURES=(0,y.default)(this.MAX_TEXTURES,t)),this.shader=(0,p.default)(t,this.MAX_TEXTURES),this.indexBuffer=w.default.GLBuffer.createIndexBuffer(t,this.indices,t.STATIC_DRAW),this.renderer.bindVao(null);for(var e=this.shader.attributes,r=0;r<this.vaoMax;r++){var n=this.vertexBuffers[r]=w.default.GLBuffer.createVertexBuffer(t,null,t.STREAM_DRAW),i=this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(n,e.aVertexPosition,t.FLOAT,!1,this.vertByteSize,0).addAttribute(n,e.aTextureCoord,t.UNSIGNED_SHORT,!0,this.vertByteSize,8).addAttribute(n,e.aColor,t.UNSIGNED_BYTE,!0,this.vertByteSize,12);e.aTextureId&&i.addAttribute(n,e.aTextureId,t.FLOAT,!1,this.vertByteSize,16),this.vaos[r]=i}this.vao=this.vaos[0],this.currentBlendMode=99999,this.boundTextures=new Array(this.MAX_TEXTURES)},e.prototype.onPrerender=function(){this.vertexCount=0},e.prototype.render=function(t){this.currentIndex>=this.size&&this.flush(),t._texture._uvs&&(this.sprites[this.currentIndex++]=t)},e.prototype.flush=function(){if(0!==this.currentIndex){var t=this.renderer.gl,e=this.MAX_TEXTURES,r=S.default.nextPow2(this.currentIndex),n=S.default.log2(r),i=this.buffers[n],o=this.sprites,s=this.groups,a=i.float32View,u=i.uint32View,h=this.boundTextures,l=this.renderer.boundTextures,c=this.renderer.textureGC.count,d=0,f=void 0,p=void 0,v=1,y=0,g=s[0],m=void 0,_=void 0,T=x.premultiplyBlendMode[o[0]._texture.baseTexture.premultipliedAlpha?1:0][o[0].blendMode];g.textureCount=0,g.start=0,g.blend=T,O++;var E=void 0;for(E=0;E<e;++E)h[E]=l[E],h[E]._virtalBoundId=E;for(E=0;E<this.currentIndex;++E){var M=o[E];f=M._texture.baseTexture;var C=x.premultiplyBlendMode[Number(f.premultipliedAlpha)][M.blendMode];if(T!==C&&(T=C,p=null,y=e,O++),p!==f&&(p=f,f._enabled!==O)){if(y===e&&(O++,g.size=E-g.start,y=0,g=s[v++],g.blend=T,g.textureCount=0,g.start=E),f.touched=c,f._virtalBoundId===-1)for(var R=0;R<e;++R){var A=(R+P)%e,I=h[A];if(I._enabled!==O){P++,I._virtalBoundId=-1,f._virtalBoundId=A,h[A]=f;break}}f._enabled=O,g.textureCount++,g.ids[y]=f._virtalBoundId,g.textures[y++]=f}if(m=M.vertexData,_=M._texture._uvs.uvsUint32,this.renderer.roundPixels){var D=this.renderer.resolution;a[d]=(m[0]*D|0)/D,a[d+1]=(m[1]*D|0)/D,a[d+5]=(m[2]*D|0)/D,a[d+6]=(m[3]*D|0)/D,a[d+10]=(m[4]*D|0)/D,a[d+11]=(m[5]*D|0)/D,a[d+15]=(m[6]*D|0)/D,a[d+16]=(m[7]*D|0)/D}else a[d]=m[0],a[d+1]=m[1],a[d+5]=m[2],a[d+6]=m[3],a[d+10]=m[4],a[d+11]=m[5],a[d+15]=m[6],a[d+16]=m[7];u[d+2]=_[0],u[d+7]=_[1],u[d+12]=_[2],u[d+17]=_[3];var L=Math.min(M.worldAlpha,1),N=L<1&&f.premultipliedAlpha?(0,x.premultiplyTint)(M._tintRGB,L):M._tintRGB+(255*L<<24);u[d+3]=u[d+8]=u[d+13]=u[d+18]=N,a[d+4]=a[d+9]=a[d+14]=a[d+19]=f._virtalBoundId,d+=20}if(g.size=E-g.start,b.default.CAN_UPLOAD_SAME_BUFFER)this.vertexBuffers[this.vertexCount].upload(i.vertices,0,!0);else{if(this.vaoMax<=this.vertexCount){this.vaoMax++;var F=this.shader.attributes,B=this.vertexBuffers[this.vertexCount]=w.default.GLBuffer.createVertexBuffer(t,null,t.STREAM_DRAW),k=this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(B,F.aVertexPosition,t.FLOAT,!1,this.vertByteSize,0).addAttribute(B,F.aTextureCoord,t.UNSIGNED_SHORT,!0,this.vertByteSize,8).addAttribute(B,F.aColor,t.UNSIGNED_BYTE,!0,this.vertByteSize,12);F.aTextureId&&k.addAttribute(B,F.aTextureId,t.FLOAT,!1,this.vertByteSize,16),this.vaos[this.vertexCount]=k}this.renderer.bindVao(this.vaos[this.vertexCount]),this.vertexBuffers[this.vertexCount].upload(i.vertices,0,!1),this.vertexCount++}for(E=0;E<e;++E)l[E]._virtalBoundId=-1;for(E=0;E<v;++E){for(var j=s[E],U=j.textureCount,X=0;X<U;X++)p=j.textures[X],l[j.ids[X]]!==p&&this.renderer.bindTexture(p,j.ids[X],!0),p._virtalBoundId=-1;this.renderer.state.setBlendMode(j.blend),t.drawElements(t.TRIANGLES,6*j.size,t.UNSIGNED_SHORT,6*j.start*2)}this.currentIndex=0}},e.prototype.start=function(){this.renderer.bindShader(this.shader),b.default.CAN_UPLOAD_SAME_BUFFER&&(this.renderer.bindVao(this.vaos[this.vertexCount]),this.vertexBuffers[this.vertexCount].bind())},e.prototype.stop=function(){this.flush()},e.prototype.destroy=function(){for(var e=0;e<this.vaoMax;e++)this.vertexBuffers[e]&&this.vertexBuffers[e].destroy(),this.vaos[e]&&this.vaos[e].destroy();this.indexBuffer&&this.indexBuffer.destroy(),this.renderer.off("prerender",this.onPrerender,this),t.prototype.destroy.call(this),this.shader&&(this.shader.destroy(),this.shader=null),this.vertexBuffers=null,this.vaos=null,this.indexBuffer=null,this.indices=null,this.sprites=null;for(var r=0;r<this.buffers.length;++r)this.buffers[r].destroy()},e}(u.default);r.default=M,l.default.registerPlugin("sprite",M)},{"../../renderers/webgl/WebGLRenderer":83,"../../renderers/webgl/utils/ObjectRenderer":93,"../../renderers/webgl/utils/checkMaxIfStatmentsInShader":96,"../../settings":100,"../../utils":123,"../../utils/createIndicesForQuads":121,"./BatchBuffer":104,"./generateMultiTextureShader":106,"bit-twiddle":1,"pixi-gl-core":12}],106:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var r="precision highp float;\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vTextureId = aTextureId;\n    vColor = aColor;\n}\n",n=u;n=n.replace(/%count%/gi,e),n=n.replace(/%forloop%/gi,o(e));for(var i=new a.default(t,r,n),s=[],h=0;h<e;h++)s[h]=h;return i.bind(),i.uniforms.uSamplers=s,i}function o(t){var e="";e+="\n",e+="\n";for(var r=0;r<t;r++)r>0&&(e+="\nelse "),r<t-1&&(e+="if(textureId == "+r+".0)"),e+="\n{",e+="\n\tcolor = texture2D(uSamplers["+r+"], vTextureCoord);",e+="\n}";return e+="\n",e+="\n"}r.__esModule=!0,r.default=i;var s=t("../../Shader"),a=n(s),u=(t("path"),["varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureId;","uniform sampler2D uSamplers[%count%];","void main(void){","vec4 color;","float textureId = floor(vTextureId+0.5);","%forloop%","gl_FragColor = color * vColor;","}"].join("\n"))},{"../../Shader":43,path:22}],107:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../sprites/Sprite"),h=n(u),l=t("../textures/Texture"),c=n(l),d=t("../math"),f=t("../utils"),p=t("../const"),v=t("../settings"),y=n(v),g=t("./TextStyle"),m=n(g),_=t("./TextMetrics"),b=n(_),x=t("../utils/trimCanvas"),T=n(x),w={texture:!0,children:!1,baseTexture:!0},E=function(t){function e(r,n,s){i(this,e),s=s||document.createElement("canvas"),s.width=3,s.height=3;var a=c.default.fromCanvas(s,y.default.SCALE_MODE,"text");a.orig=new d.Rectangle,a.trim=new d.Rectangle;var u=o(this,t.call(this,a));return c.default.addToCache(u._texture,u._texture.baseTexture.textureCacheIds[0]),u.canvas=s,u.context=u.canvas.getContext("2d"),u.resolution=y.default.RESOLUTION,u._text=null,u._style=null,u._styleListener=null,u._font="",u.text=r,u.style=n,u.localStyleID=-1,u}return s(e,t),e.prototype.updateText=function(t){var e=this._style;if(this.localStyleID!==e.styleID&&(this.dirty=!0,this.localStyleID=e.styleID),this.dirty||!t){this._font=this._style.toFontString();var r=this.context,n=b.default.measureText(this._text,this._style,this._style.wordWrap,this.canvas),i=n.width,o=n.height,s=n.lines,a=n.lineHeight,u=n.lineWidths,h=n.maxLineWidth,l=n.fontProperties;this.canvas.width=Math.ceil((i+2*e.padding)*this.resolution),this.canvas.height=Math.ceil((o+2*e.padding)*this.resolution),r.scale(this.resolution,this.resolution),r.clearRect(0,0,this.canvas.width,this.canvas.height),r.font=this._font,r.strokeStyle=e.stroke,r.lineWidth=e.strokeThickness,r.textBaseline=e.textBaseline,r.lineJoin=e.lineJoin,r.miterLimit=e.miterLimit;var c=void 0,d=void 0;if(e.dropShadow){r.fillStyle=e.dropShadowColor,r.globalAlpha=e.dropShadowAlpha,r.shadowBlur=e.dropShadowBlur,e.dropShadowBlur>0&&(r.shadowColor=e.dropShadowColor);for(var f=Math.cos(e.dropShadowAngle)*e.dropShadowDistance,p=Math.sin(e.dropShadowAngle)*e.dropShadowDistance,v=0;v<s.length;v++)c=e.strokeThickness/2,d=e.strokeThickness/2+v*a+l.ascent,"right"===e.align?c+=h-u[v]:"center"===e.align&&(c+=(h-u[v])/2),e.fill&&(this.drawLetterSpacing(s[v],c+f+e.padding,d+p+e.padding),e.stroke&&e.strokeThickness&&(r.strokeStyle=e.dropShadowColor,this.drawLetterSpacing(s[v],c+f+e.padding,d+p+e.padding,!0),r.strokeStyle=e.stroke))}r.shadowBlur=0,r.globalAlpha=1,r.fillStyle=this._generateFillStyle(e,s);for(var y=0;y<s.length;y++)c=e.strokeThickness/2,d=e.strokeThickness/2+y*a+l.ascent,"right"===e.align?c+=h-u[y]:"center"===e.align&&(c+=(h-u[y])/2),e.stroke&&e.strokeThickness&&this.drawLetterSpacing(s[y],c+e.padding,d+e.padding,!0),e.fill&&this.drawLetterSpacing(s[y],c+e.padding,d+e.padding);this.updateTexture()}},e.prototype.drawLetterSpacing=function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=this._style,o=i.letterSpacing;if(0===o)return void(n?this.context.strokeText(t,e,r):this.context.fillText(t,e,r));for(var s=String.prototype.split.call(t,""),a=e,u=0,h="";u<t.length;)h=s[u++],n?this.context.strokeText(h,a,r):this.context.fillText(h,a,r),a+=this.context.measureText(h).width+o},e.prototype.updateTexture=function(){var t=this.canvas;if(this._style.trim){var e=(0,T.default)(t);t.width=e.width,t.height=e.height,this.context.putImageData(e.data,0,0)}var r=this._texture,n=this._style,i=n.trim?0:n.padding,o=r.baseTexture;o.hasLoaded=!0,o.resolution=this.resolution,o.realWidth=t.width,o.realHeight=t.height,o.width=t.width/this.resolution,o.height=t.height/this.resolution,r.trim.width=r._frame.width=t.width/this.resolution,r.trim.height=r._frame.height=t.height/this.resolution,r.trim.x=-i,r.trim.y=-i,r.orig.width=r._frame.width-2*i,r.orig.height=r._frame.height-2*i,this._onTextureUpdate(),o.emit("update",o),this.dirty=!1},e.prototype.renderWebGL=function(e){this.resolution!==e.resolution&&(this.resolution=e.resolution,this.dirty=!0),this.updateText(!0),t.prototype.renderWebGL.call(this,e)},e.prototype._renderCanvas=function(e){this.resolution!==e.resolution&&(this.resolution=e.resolution,this.dirty=!0),this.updateText(!0),t.prototype._renderCanvas.call(this,e)},e.prototype.getLocalBounds=function(e){return this.updateText(!0),t.prototype.getLocalBounds.call(this,e)},e.prototype._calculateBounds=function(){this.updateText(!0),this.calculateVertices(),this._bounds.addQuad(this.vertexData)},e.prototype._onStyleChange=function(){this.dirty=!0},e.prototype._generateFillStyle=function(t,e){if(!Array.isArray(t.fill))return t.fill;if(navigator.isCocoonJS)return t.fill[0];var r=void 0,n=void 0,i=void 0,o=void 0,s=this.canvas.width/this.resolution,a=this.canvas.height/this.resolution,u=t.fill.slice(),h=t.fillGradientStops.slice();if(!h.length)for(var l=u.length+1,c=1;c<l;++c)h.push(c/l);if(u.unshift(t.fill[0]),h.unshift(0),u.push(t.fill[t.fill.length-1]),h.push(1),t.fillGradientType===p.TEXT_GRADIENT.LINEAR_VERTICAL){r=this.context.createLinearGradient(s/2,0,s/2,a),n=(u.length+1)*e.length,i=0;for(var d=0;d<e.length;d++){i+=1;for(var f=0;f<u.length;f++)o="number"==typeof h[f]?h[f]/e.length+d/e.length:i/n,r.addColorStop(o,u[f]),i++}}else{r=this.context.createLinearGradient(0,a/2,s,a/2),n=u.length+1,i=1;for(var v=0;v<u.length;v++)o="number"==typeof h[v]?h[v]:i/n,r.addColorStop(o,u[v]),i++}return r},e.prototype.destroy=function(e){"boolean"==typeof e&&(e={children:e}),e=Object.assign({},w,e),t.prototype.destroy.call(this,e),this.context=null,this.canvas=null,this._style=null},a(e,[{key:"width",get:function(){return this.updateText(!0),Math.abs(this.scale.x)*this._texture.orig.width},set:function(t){this.updateText(!0);var e=(0,f.sign)(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}},{key:"height",get:function(){return this.updateText(!0),Math.abs(this.scale.y)*this._texture.orig.height},set:function(t){this.updateText(!0);var e=(0,f.sign)(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}},{key:"style",get:function(){return this._style},set:function(t){t=t||{},t instanceof m.default?this._style=t:this._style=new m.default(t),this.localStyleID=-1,this.dirty=!0}},{key:"text",get:function(){return this._text},set:function(t){t=String(""===t||null===t||void 0===t?" ":t),this._text!==t&&(this._text=t,this.dirty=!0)}}]),e}(h.default);r.default=E},{"../const":45,"../math":69,"../settings":100,"../sprites/Sprite":101,"../textures/Texture":114,"../utils":123,"../utils/trimCanvas":128,"./TextMetrics":108,"./TextStyle":109}],108:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e,r,i,o,s,a,u,h,l){n(this,t),this.text=e,this.style=r,this.width=i,this.height=o,this.lines=s,this.lineWidths=a,this.lineHeight=u,this.maxLineWidth=h,this.fontProperties=l}return t.measureText=function(e,r,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t._canvas;n=n||r.wordWrap;var o=r.toFontString(),s=t.measureFont(o),a=i.getContext("2d");a.font=o;for(var u=n?t.wordWrap(e,r,i):e,h=u.split(/(?:\r\n|\r|\n)/),l=new Array(h.length),c=0,d=0;d<h.length;d++){var f=a.measureText(h[d]).width+(h[d].length-1)*r.letterSpacing;l[d]=f,c=Math.max(c,f)}var p=c+r.strokeThickness;r.dropShadow&&(p+=r.dropShadowDistance);var v=r.lineHeight||s.fontSize+r.strokeThickness,y=Math.max(v,s.fontSize+r.strokeThickness)+(h.length-1)*v;return r.dropShadow&&(y+=r.dropShadowDistance),new t(e,r,p,y,h,l,v,c,s)},t.wordWrap=function(e,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t._canvas,i=n.getContext("2d"),o="",s=e.split("\n"),a=r.wordWrapWidth,u={},h=0;h<s.length;h++){for(var l=a,c=s[h].split(" "),d=0;d<c.length;d++){var f=i.measureText(c[d]).width;if(r.breakWords&&f>a)for(var p=c[d].split(""),v=0;v<p.length;v++){var y=p[v],g=u[y];void 0===g&&(g=i.measureText(y).width,u[y]=g),g>l?(o+="\n"+y,l=a-g):(0===v&&(o+=" "),o+=y,l-=g)}else{var m=f+i.measureText(" ").width;0===d||m>l?(d>0&&(o+="\n"),o+=c[d],l=a-f):(l-=m,o+=" "+c[d])}}h<s.length-1&&(o+="\n")}return o},t.measureFont=function(e){if(t._fonts[e])return t._fonts[e];var r={},n=t._canvas,i=t._context;i.font=e;var o=Math.ceil(i.measureText("|MÉq").width),s=Math.ceil(i.measureText("M").width),a=2*s;s=1.4*s|0,n.width=o,n.height=a,i.fillStyle="#f00",i.fillRect(0,0,o,a),i.font=e,i.textBaseline="alphabetic",i.fillStyle="#000",i.fillText("|MÉq",0,s);var u=i.getImageData(0,0,o,a).data,h=u.length,l=4*o,c=0,d=0,f=!1;for(c=0;c<s;++c){for(var p=0;p<l;p+=4)if(255!==u[d+p]){f=!0;break}if(f)break;d+=l}for(r.ascent=s-c,d=h-l,f=!1,c=a;c>s;--c){for(var v=0;v<l;v+=4)if(255!==u[d+v]){f=!0;break}if(f)break;d-=l}return r.descent=c-s,r.fontSize=r.ascent+r.descent,t._fonts[e]=r,r},t}();r.default=i;var o=document.createElement("canvas");o.width=o.height=10,i._canvas=o,i._context=o.getContext("2d"),i._fonts={}},{}],109:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){return"number"==typeof t?(0,h.hex2string)(t):("string"==typeof t&&0===t.indexOf("0x")&&(t=t.replace("0x","#")),t)}function o(t){if(Array.isArray(t)){for(var e=0;e<t.length;++e)t[e]=i(t[e]);return t}return i(t)}function s(t,e){if(!Array.isArray(t)||!Array.isArray(e))return!1;if(t.length!==e.length)return!1;for(var r=0;r<t.length;++r)if(t[r]!==e[r])return!1;return!0}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../const"),h=t("../utils"),l={align:"left",breakWords:!1,dropShadow:!1,dropShadowAlpha:1,dropShadowAngle:Math.PI/6,dropShadowBlur:0,dropShadowColor:"black",dropShadowDistance:5,fill:"black",fillGradientType:u.TEXT_GRADIENT.LINEAR_VERTICAL,fillGradientStops:[],fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",letterSpacing:0,lineHeight:0,lineJoin:"miter",miterLimit:10,padding:0,stroke:"black",strokeThickness:0,textBaseline:"alphabetic",trim:!1,wordWrap:!1,wordWrapWidth:100},c=function(){function t(e){n(this,t),this.styleID=0,Object.assign(this,l,e)}return t.prototype.clone=function(){var e={};for(var r in l)e[r]=this[r];return new t(e)},t.prototype.reset=function(){Object.assign(this,l)},t.prototype.toFontString=function(){var t="number"==typeof this.fontSize?this.fontSize+"px":this.fontSize,e=this.fontFamily;Array.isArray(this.fontFamily)||(e=this.fontFamily.split(","));for(var r=e.length-1;r>=0;r--){var n=e[r].trim();/([\"\'])[^\'\"]+\1/.test(n)||(n='"'+n+'"'),e[r]=n}return this.fontStyle+" "+this.fontVariant+" "+this.fontWeight+" "+t+" "+e.join(",")},a(t,[{key:"align",get:function(){return this._align},set:function(t){this._align!==t&&(this._align=t,this.styleID++)}},{key:"breakWords",get:function(){return this._breakWords},set:function(t){this._breakWords!==t&&(this._breakWords=t,this.styleID++)}},{key:"dropShadow",get:function(){return this._dropShadow},set:function(t){this._dropShadow!==t&&(this._dropShadow=t,this.styleID++)}},{key:"dropShadowAlpha",get:function(){return this._dropShadowAlpha},set:function(t){this._dropShadowAlpha!==t&&(this._dropShadowAlpha=t,this.styleID++)}},{key:"dropShadowAngle",get:function(){return this._dropShadowAngle},set:function(t){this._dropShadowAngle!==t&&(this._dropShadowAngle=t,this.styleID++)}},{key:"dropShadowBlur",get:function(){return this._dropShadowBlur},set:function(t){this._dropShadowBlur!==t&&(this._dropShadowBlur=t,this.styleID++)}},{key:"dropShadowColor",get:function(){return this._dropShadowColor},set:function(t){var e=o(t);this._dropShadowColor!==e&&(this._dropShadowColor=e,this.styleID++)}},{key:"dropShadowDistance",get:function(){return this._dropShadowDistance},set:function(t){this._dropShadowDistance!==t&&(this._dropShadowDistance=t,this.styleID++)}},{key:"fill",get:function(){return this._fill},set:function(t){var e=o(t);this._fill!==e&&(this._fill=e,this.styleID++)}},{key:"fillGradientType",get:function(){return this._fillGradientType},set:function(t){this._fillGradientType!==t&&(this._fillGradientType=t,this.styleID++)}},{key:"fillGradientStops",get:function(){return this._fillGradientStops},set:function(t){s(this._fillGradientStops,t)||(this._fillGradientStops=t,this.styleID++)}},{key:"fontFamily",get:function(){return this._fontFamily},set:function(t){this.fontFamily!==t&&(this._fontFamily=t,this.styleID++)}},{key:"fontSize",get:function(){return this._fontSize},set:function(t){this._fontSize!==t&&(this._fontSize=t,this.styleID++)}},{key:"fontStyle",get:function(){return this._fontStyle},set:function(t){this._fontStyle!==t&&(this._fontStyle=t,this.styleID++)}},{key:"fontVariant",get:function(){return this._fontVariant},set:function(t){this._fontVariant!==t&&(this._fontVariant=t,this.styleID++)}},{key:"fontWeight",get:function(){return this._fontWeight},set:function(t){this._fontWeight!==t&&(this._fontWeight=t,this.styleID++)}},{key:"letterSpacing",get:function(){return this._letterSpacing},set:function(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.styleID++)}},{key:"lineHeight",get:function(){return this._lineHeight},set:function(t){this._lineHeight!==t&&(this._lineHeight=t,this.styleID++)}},{key:"lineJoin",get:function(){return this._lineJoin},set:function(t){this._lineJoin!==t&&(this._lineJoin=t,this.styleID++)}},{key:"miterLimit",get:function(){return this._miterLimit},set:function(t){this._miterLimit!==t&&(this._miterLimit=t,this.styleID++)}},{key:"padding",get:function(){return this._padding},set:function(t){this._padding!==t&&(this._padding=t,this.styleID++)}},{key:"stroke",get:function(){return this._stroke},set:function(t){var e=o(t);this._stroke!==e&&(this._stroke=e,this.styleID++)}},{key:"strokeThickness",get:function(){return this._strokeThickness},set:function(t){this._strokeThickness!==t&&(this._strokeThickness=t,this.styleID++)}},{key:"textBaseline",get:function(){return this._textBaseline},set:function(t){this._textBaseline!==t&&(this._textBaseline=t,this.styleID++)}},{key:"trim",get:function(){return this._trim},set:function(t){this._trim!==t&&(this._trim=t,this.styleID++)}},{key:"wordWrap",get:function(){return this._wordWrap},set:function(t){this._wordWrap!==t&&(this._wordWrap=t,this.styleID++)}},{key:"wordWrapWidth",get:function(){return this._wordWrapWidth},set:function(t){this._wordWrapWidth!==t&&(this._wordWrapWidth=t,this.styleID++)}}]),t}();r.default=c},{"../const":45,"../utils":123}],110:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./BaseTexture"),u=n(a),h=t("../settings"),l=n(h),c=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,s=arguments[2],a=arguments[3];i(this,e);var u=o(this,t.call(this,null,s));return u.resolution=a||l.default.RESOLUTION,u.width=r,u.height=n,u.realWidth=u.width*u.resolution,u.realHeight=u.height*u.resolution,u.scaleMode=void 0!==s?s:l.default.SCALE_MODE,u.hasLoaded=!0,u._glRenderTargets={},u._canvasRenderTarget=null,u.valid=!1,u}return s(e,t),e.prototype.resize=function(t,e){t===this.width&&e===this.height||(this.valid=t>0&&e>0,this.width=t,this.height=e,this.realWidth=this.width*this.resolution,this.realHeight=this.height*this.resolution,this.valid&&this.emit("update",this))},e.prototype.destroy=function(){t.prototype.destroy.call(this,!0),this.renderer=null},e}(u.default);r.default=c},{"../settings":100,"./BaseTexture":111}],111:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=t("../utils"),h=t("../settings"),l=n(h),c=t("eventemitter3"),d=n(c),f=t("../utils/determineCrossOrigin"),p=n(f),v=t("bit-twiddle"),y=n(v),g=function(t){function e(r,n,s){i(this,e);var a=o(this,t.call(this));return a.uid=(0,u.uid)(),a.touched=0,a.resolution=s||l.default.RESOLUTION,a.width=100,a.height=100,a.realWidth=100,a.realHeight=100,a.scaleMode=void 0!==n?n:l.default.SCALE_MODE,a.hasLoaded=!1,a.isLoading=!1,a.source=null,a.origSource=null,a.imageType=null,a.sourceScale=1,a.premultipliedAlpha=!0,a.imageUrl=null,a.isPowerOfTwo=!1,a.mipmap=l.default.MIPMAP_TEXTURES,a.wrapMode=l.default.WRAP_MODE,a._glTextures={},a._enabled=0,a._virtalBoundId=-1,a._destroyed=!1,a.textureCacheIds=[],r&&a.loadSource(r),a}return s(e,t),e.prototype.update=function(){"svg"!==this.imageType&&(this.realWidth=this.source.naturalWidth||this.source.videoWidth||this.source.width,this.realHeight=this.source.naturalHeight||this.source.videoHeight||this.source.height,this._updateDimensions()),this.emit("update",this)},e.prototype._updateDimensions=function(){this.width=this.realWidth/this.resolution,this.height=this.realHeight/this.resolution,this.isPowerOfTwo=y.default.isPow2(this.realWidth)&&y.default.isPow2(this.realHeight)},e.prototype.loadSource=function(t){var e=this,r=this.isLoading;this.hasLoaded=!1,this.isLoading=!1,r&&this.source&&(this.source.onload=null,this.source.onerror=null);var n=!this.source;if(this.source=t,(t.src&&t.complete||t.getContext)&&t.width&&t.height)this._updateImageType(),"svg"===this.imageType?this._loadSvgSource():this._sourceLoaded(),n&&this.emit("loaded",this);else if(!t.getContext){var i=function(){e.isLoading=!0;var n=e;if(t.onload=function(){if(n._updateImageType(),t.onload=null,t.onerror=null,n.isLoading)return n.isLoading=!1,n._sourceLoaded(),"svg"===n.imageType?void n._loadSvgSource():void n.emit("loaded",n)},t.onerror=function(){t.onload=null,t.onerror=null,n.isLoading&&(n.isLoading=!1,n.emit("error",n))},t.complete&&t.src){if(t.onload=null,t.onerror=null,"svg"===n.imageType)return n._loadSvgSource(),{v:void 0};e.isLoading=!1,t.width&&t.height?(e._sourceLoaded(),r&&e.emit("loaded",e)):r&&e.emit("error",e)}}();if("object"===("undefined"==typeof i?"undefined":a(i)))return i.v}},e.prototype._updateImageType=function(){if(this.imageUrl){var t=(0,u.decomposeDataUri)(this.imageUrl),e=void 0;if(t&&"image"===t.mediaType){var r=t.subType.split("+")[0];if(e=(0,u.getUrlFileExtension)("."+r),!e)throw new Error("Invalid image type in data URI.")}else e=(0,u.getUrlFileExtension)(this.imageUrl),e||(e="png");this.imageType=e}},e.prototype._loadSvgSource=function(){if("svg"===this.imageType){var t=(0,u.decomposeDataUri)(this.imageUrl);t?this._loadSvgSourceUsingDataUri(t):this._loadSvgSourceUsingXhr()}},e.prototype._loadSvgSourceUsingDataUri=function(t){var e=void 0;if("base64"===t.encoding){if(!atob)throw new Error("Your browser doesn't support base64 conversions.");e=atob(t.data)}else e=t.data;this._loadSvgSourceUsingString(e)},e.prototype._loadSvgSourceUsingXhr=function(){var t=this,e=new XMLHttpRequest;e.onload=function(){if(e.readyState!==e.DONE||200!==e.status)throw new Error("Failed to load SVG using XHR.");t._loadSvgSourceUsingString(e.response)},e.onerror=function(){return t.emit("error",t)},e.open("GET",this.imageUrl,!0),e.send()},e.prototype._loadSvgSourceUsingString=function(t){var r=(0,u.getSvgSize)(t),n=r.width,i=r.height;if(!n||!i)throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");this.realWidth=Math.round(n*this.sourceScale),this.realHeight=Math.round(i*this.sourceScale),this._updateDimensions();var o=document.createElement("canvas");o.width=this.realWidth,o.height=this.realHeight,o._pixiId="canvas_"+(0,u.uid)(),o.getContext("2d").drawImage(this.source,0,0,n,i,0,0,this.realWidth,this.realHeight),this.origSource=this.source,this.source=o,e.addToCache(this,o._pixiId),this.isLoading=!1,this._sourceLoaded(),this.emit("loaded",this)},e.prototype._sourceLoaded=function(){this.hasLoaded=!0,this.update()},e.prototype.destroy=function(){this.imageUrl&&(delete u.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")),this.source=null,this.dispose(),e.removeFromCache(this),this.textureCacheIds=null,this._destroyed=!0},e.prototype.dispose=function(){this.emit("dispose",this)},e.prototype.updateSourceImage=function(t){this.source.src=t,this.loadSource(this.source)},e.fromImage=function(t,r,n,i){var o=u.BaseTextureCache[t];if(!o){var s=new Image;void 0===r&&0!==t.indexOf("data:")?s.crossOrigin=(0,p.default)(t):r&&(s.crossOrigin="string"==typeof r?r:"anonymous"),o=new e(s,n),o.imageUrl=t,i&&(o.sourceScale=i),o.resolution=(0,u.getResolutionOfUrl)(t),s.src=t,e.addToCache(o,t)}return o},e.fromCanvas=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"canvas";t._pixiId||(t._pixiId=n+"_"+(0,u.uid)());var i=u.BaseTextureCache[t._pixiId];return i||(i=new e(t,r),e.addToCache(i,t._pixiId)),i},e.from=function(t,r,n){if("string"==typeof t)return e.fromImage(t,void 0,r,n);if(t instanceof HTMLImageElement){var i=t.src,o=u.BaseTextureCache[i];return o||(o=new e(t,r),o.imageUrl=i,n&&(o.sourceScale=n),o.resolution=(0,u.getResolutionOfUrl)(i),e.addToCache(o,i)),o}return t instanceof HTMLCanvasElement?e.fromCanvas(t,r):t},e.addToCache=function(t,e){e&&(t.textureCacheIds.indexOf(e)===-1&&t.textureCacheIds.push(e),u.BaseTextureCache[e]=t)},e.removeFromCache=function(t){if("string"==typeof t){var e=u.BaseTextureCache[t];if(e){var r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete u.BaseTextureCache[t],e}}else if(t&&t.textureCacheIds){for(var n=0;n<t.textureCacheIds.length;++n)delete u.BaseTextureCache[t.textureCacheIds[n]];return t.textureCacheIds.length=0,t}return null},e}(d.default);r.default=g},{"../settings":100,"../utils":123,"../utils/determineCrossOrigin":122,"bit-twiddle":1,eventemitter3:3}],112:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./BaseRenderTexture"),u=n(a),h=t("./Texture"),l=n(h),c=function(t){function e(r,n){i(this,e);var s=null;if(!(r instanceof u.default)){var a=arguments[1],h=arguments[2],l=arguments[3],c=arguments[4];console.warn("Please use RenderTexture.create("+a+", "+h+") instead of the ctor directly."),s=arguments[0],n=null,r=new u.default(a,h,l,c)}var d=o(this,t.call(this,r,n));return d.legacyRenderer=s,d.valid=!0,d._updateUvs(),d}return s(e,t),e.prototype.resize=function(t,e,r){this.valid=t>0&&e>0,this._frame.width=this.orig.width=t,this._frame.height=this.orig.height=e,r||this.baseTexture.resize(t,e),this._updateUvs()},e.create=function(t,r,n,i){return new e(new u.default(t,r,n,i))},e}(l.default);r.default=c},{"./BaseRenderTexture":110,"./Texture":114}],113:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=t("../"),s=t("../utils"),a=function(){function t(e,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;n(this,t),this.baseTexture=e,this.textures={},this.data=r,this.resolution=this._updateResolution(i||this.baseTexture.imageUrl),this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}return i(t,null,[{key:"BATCH_SIZE",get:function(){return 1e3}}]),t.prototype._updateResolution=function(t){var e=this.data.meta.scale,r=(0,s.getResolutionOfUrl)(t,null);return null===r&&(r=void 0!==e?parseFloat(e):1),1!==r&&(this.baseTexture.resolution=r,this.baseTexture.update()),r},t.prototype.parse=function(e){this._batchIndex=0,this._callback=e,this._frameKeys.length<=t.BATCH_SIZE?(this._processFrames(0),this._parseComplete()):this._nextBatch()},t.prototype._processFrames=function(e){for(var r=e,n=t.BATCH_SIZE;r-e<n&&r<this._frameKeys.length;){var i=this._frameKeys[r],s=this._frames[i].frame;if(s){var a=null,u=null,h=new o.Rectangle(0,0,this._frames[i].sourceSize.w/this.resolution,this._frames[i].sourceSize.h/this.resolution);a=this._frames[i].rotated?new o.Rectangle(s.x/this.resolution,s.y/this.resolution,s.h/this.resolution,s.w/this.resolution):new o.Rectangle(s.x/this.resolution,s.y/this.resolution,s.w/this.resolution,s.h/this.resolution),this._frames[i].trimmed&&(u=new o.Rectangle(this._frames[i].spriteSourceSize.x/this.resolution,this._frames[i].spriteSourceSize.y/this.resolution,s.w/this.resolution,s.h/this.resolution)),this.textures[i]=new o.Texture(this.baseTexture,a,h,u,this._frames[i].rotated?2:0),o.Texture.addToCache(this.textures[i],i)}r++}},t.prototype._parseComplete=function(){var t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)},t.prototype._nextBatch=function(){var e=this;this._processFrames(this._batchIndex*t.BATCH_SIZE),this._batchIndex++,setTimeout(function(){e._batchIndex*t.BATCH_SIZE<e._frameKeys.length?e._nextBatch():e._parseComplete()},0)},t.prototype.destroy=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];for(var e in this.textures)this.textures[e].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&this.baseTexture.destroy(),this.baseTexture=null},t}();r.default=a},{"../":64,"../utils":123}],114:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(){var t=document.createElement("canvas");t.width=10,t.height=10;var e=t.getContext("2d");return e.fillStyle="white",e.fillRect(0,0,10,10),new T(new c.default(t))}function u(t){t.destroy=function(){},t.on=function(){},t.once=function(){},t.emit=function(){}}r.__esModule=!0;var h=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),l=t("./BaseTexture"),c=n(l),d=t("./VideoBaseTexture"),f=n(d),p=t("./TextureUvs"),v=n(p),y=t("eventemitter3"),g=n(y),m=t("../math"),_=t("../utils"),b=t("../settings"),x=n(b),T=function(t){function e(r,n,s,a,u){i(this,e);var h=o(this,t.call(this));if(h.noFrame=!1,n||(h.noFrame=!0,n=new m.Rectangle(0,0,1,1)),r instanceof e&&(r=r.baseTexture),h.baseTexture=r,h._frame=n,h.trim=a,h.valid=!1,h.requiresUpdate=!1,h._uvs=null,h.orig=s||n,h._rotate=Number(u||0),u===!0)h._rotate=2;else if(h._rotate%2!==0)throw new Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");return r.hasLoaded?(h.noFrame&&(n=new m.Rectangle(0,0,r.width,r.height),r.on("update",h.onBaseTextureUpdated,h)),h.frame=n):r.once("loaded",h.onBaseTextureLoaded,h),h._updateID=0,h.transform=null,h.textureCacheIds=[],h}return s(e,t),e.prototype.update=function(){this.baseTexture.update()},e.prototype.onBaseTextureLoaded=function(t){this._updateID++,this.noFrame?this.frame=new m.Rectangle(0,0,t.width,t.height):this.frame=this._frame,this.baseTexture.on("update",this.onBaseTextureUpdated,this),this.emit("update",this)},e.prototype.onBaseTextureUpdated=function(t){this._updateID++,this._frame.width=t.width,this._frame.height=t.height,this.emit("update",this)},e.prototype.destroy=function(t){this.baseTexture&&(t&&(_.TextureCache[this.baseTexture.imageUrl]&&e.removeFromCache(this.baseTexture.imageUrl),this.baseTexture.destroy()),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture.off("loaded",this.onBaseTextureLoaded,this),this.baseTexture=null),this._frame=null,this._uvs=null,this.trim=null,this.orig=null,this.valid=!1,e.removeFromCache(this),this.textureCacheIds=null},e.prototype.clone=function(){return new e(this.baseTexture,this.frame,this.orig,this.trim,this.rotate)},e.prototype._updateUvs=function(){this._uvs||(this._uvs=new v.default),this._uvs.set(this._frame,this.baseTexture,this.rotate),this._updateID++},e.fromImage=function(t,r,n,i){var o=_.TextureCache[t];return o||(o=new e(c.default.fromImage(t,r,n,i)),e.addToCache(o,t)),o},e.fromFrame=function(t){var e=_.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return e},e.fromCanvas=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"canvas";return new e(c.default.fromCanvas(t,r,n))},e.fromVideo=function(t,r){return"string"==typeof t?e.fromVideoUrl(t,r):new e(f.default.fromVideo(t,r))},e.fromVideoUrl=function(t,r){return new e(f.default.fromUrl(t,r))},e.from=function(t){if("string"==typeof t){var r=_.TextureCache[t];if(!r){var n=null!==t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/);return n?e.fromVideoUrl(t):e.fromImage(t)}return r}return t instanceof HTMLImageElement?new e(c.default.from(t)):t instanceof HTMLCanvasElement?e.fromCanvas(t,x.default.SCALE_MODE,"HTMLCanvasElement"):t instanceof HTMLVideoElement?e.fromVideo(t):t instanceof c.default?new e(t):t},e.fromLoader=function(t,r,n){var i=new c.default(t,void 0,(0,_.getResolutionOfUrl)(r)),o=new e(i);return i.imageUrl=r,n||(n=r),c.default.addToCache(o.baseTexture,n),e.addToCache(o,n),n!==r&&(c.default.addToCache(o.baseTexture,r),e.addToCache(o,r)),o},e.addToCache=function(t,e){e&&(t.textureCacheIds.indexOf(e)===-1&&t.textureCacheIds.push(e),_.TextureCache[e]=t)},e.removeFromCache=function(t){if("string"==typeof t){var e=_.TextureCache[t];if(e){var r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete _.TextureCache[t],e}}else if(t&&t.textureCacheIds){for(var n=0;n<t.textureCacheIds.length;++n)delete _.TextureCache[t.textureCacheIds[n]];return t.textureCacheIds.length=0,t}return null},h(e,[{key:"frame",get:function(){return this._frame},set:function(t){if(this._frame=t,this.noFrame=!1,t.x+t.width>this.baseTexture.width||t.y+t.height>this.baseTexture.height)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions: "+("X: "+t.x+" + "+t.width+" > "+this.baseTexture.width+" ")+("Y: "+t.y+" + "+t.height+" > "+this.baseTexture.height));this.valid=t&&t.width&&t.height&&this.baseTexture.hasLoaded,this.trim||this.rotate||(this.orig=t),this.valid&&this._updateUvs()}},{key:"rotate",get:function(){return this._rotate},set:function(t){this._rotate=t,this.valid&&this._updateUvs()}},{key:"width",get:function(){return this.orig.width}},{key:"height",get:function(){return this.orig.height}}]),e}(g.default);r.default=T,T.EMPTY=new T(new c.default),u(T.EMPTY),u(T.EMPTY.baseTexture),T.WHITE=a(),u(T.WHITE),u(T.WHITE.baseTexture)},{"../math":69,"../settings":100,"../utils":123,"./BaseTexture":111,"./TextureUvs":115,"./VideoBaseTexture":116,eventemitter3:3}],115:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../math/GroupD8"),s=n(o),a=function(){function t(){i(this,t),this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsUint32=new Uint32Array(4)}return t.prototype.set=function(t,e,r){var n=e.width,i=e.height;if(r){var o=t.width/2/n,a=t.height/2/i,u=t.x/n+o,h=t.y/i+a;r=s.default.add(r,s.default.NW),this.x0=u+o*s.default.uX(r),this.y0=h+a*s.default.uY(r),r=s.default.add(r,2),this.x1=u+o*s.default.uX(r),this.y1=h+a*s.default.uY(r),r=s.default.add(r,2),this.x2=u+o*s.default.uX(r),this.y2=h+a*s.default.uY(r),r=s.default.add(r,2),this.x3=u+o*s.default.uX(r),this.y3=h+a*s.default.uY(r)}else this.x0=t.x/n,this.y0=t.y/i,this.x1=(t.x+t.width)/n,this.y1=t.y/i,this.x2=(t.x+t.width)/n,this.y2=(t.y+t.height)/i,this.x3=t.x/n,this.y3=(t.y+t.height)/i;this.uvsUint32[0]=(65535*this.y0&65535)<<16|65535*this.x0&65535,this.uvsUint32[1]=(65535*this.y1&65535)<<16|65535*this.x1&65535,this.uvsUint32[2]=(65535*this.y2&65535)<<16|65535*this.x2&65535,this.uvsUint32[3]=(65535*this.y3&65535)<<16|65535*this.x3&65535},t}();r.default=a},{"../math/GroupD8":65}],116:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){e||(e="video/"+t.substr(t.lastIndexOf(".")+1));var r=document.createElement("source");return r.src=t,r.type=e,r}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("./BaseTexture"),l=n(h),c=t("../utils"),d=t("../ticker"),f=t("../const"),p=function(t){function e(r,n){if(i(this,e),!r)throw new Error("No video source element specified.");(r.readyState===r.HAVE_ENOUGH_DATA||r.readyState===r.HAVE_FUTURE_DATA)&&r.width&&r.height&&(r.complete=!0);var s=o(this,t.call(this,r,n));return s.width=r.videoWidth,s.height=r.videoHeight,s._autoUpdate=!0,s._isAutoUpdating=!1,s.autoPlay=!0,s.update=s.update.bind(s),s._onCanPlay=s._onCanPlay.bind(s),r.addEventListener("play",s._onPlayStart.bind(s)),r.addEventListener("pause",s._onPlayStop.bind(s)),s.hasLoaded=!1,s.__loaded=!1,s._isSourceReady()?s._onCanPlay():(r.addEventListener("canplay",s._onCanPlay),r.addEventListener("canplaythrough",s._onCanPlay)),s}return s(e,t),e.prototype._isSourcePlaying=function(){var t=this.source;return t.currentTime>0&&t.paused===!1&&t.ended===!1&&t.readyState>2},e.prototype._isSourceReady=function(){return 3===this.source.readyState||4===this.source.readyState},e.prototype._onPlayStart=function(){this.hasLoaded||this._onCanPlay(),!this._isAutoUpdating&&this.autoUpdate&&(d.shared.add(this.update,this,f.UPDATE_PRIORITY.HIGH),this._isAutoUpdating=!0)},e.prototype._onPlayStop=function(){this._isAutoUpdating&&(d.shared.remove(this.update,this),this._isAutoUpdating=!1)},e.prototype._onCanPlay=function(){this.hasLoaded=!0,this.source&&(this.source.removeEventListener("canplay",this._onCanPlay),this.source.removeEventListener("canplaythrough",this._onCanPlay),this.width=this.source.videoWidth,this.height=this.source.videoHeight,this.__loaded||(this.__loaded=!0,this.emit("loaded",this)),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.source.play())},e.prototype.destroy=function(){this._isAutoUpdating&&d.shared.remove(this.update,this),this.source&&this.source._pixiId&&(l.default.removeFromCache(this.source._pixiId),delete this.source._pixiId),t.prototype.destroy.call(this)},e.fromVideo=function(t,r){t._pixiId||(t._pixiId="video_"+(0,c.uid)());var n=c.BaseTextureCache[t._pixiId];return n||(n=new e(t,r),l.default.addToCache(n,t._pixiId)),n},e.fromUrl=function(t,r){var n=document.createElement("video");if(n.setAttribute("webkit-playsinline",""),n.setAttribute("playsinline",""),Array.isArray(t))for(var i=0;i<t.length;++i)n.appendChild(a(t[i].src||t[i],t[i].mime));else n.appendChild(a(t.src||t,t.mime));return n.load(),e.fromVideo(n,r)},u(e,[{key:"autoUpdate",get:function(){return this._autoUpdate},set:function(t){t!==this._autoUpdate&&(this._autoUpdate=t,!this._autoUpdate&&this._isAutoUpdating?(d.shared.remove(this.update,this),this._isAutoUpdating=!1):this._autoUpdate&&!this._isAutoUpdating&&(d.shared.add(this.update,this,f.UPDATE_PRIORITY.HIGH),this._isAutoUpdating=!0))}}]),e}(l.default);r.default=p,p.fromUrls=p.fromUrl},{"../const":45,"../ticker":119,"../utils":123,"./BaseTexture":111}],117:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("../settings"),a=n(s),u=t("../const"),h=t("./TickerListener"),l=n(h),c=function(){function t(){var e=this;i(this,t),this._head=new l.default(null,null,1/0),this._requestId=null,this._maxElapsedMS=100,this.autoStart=!1,this.deltaTime=1,this.elapsedMS=1/a.default.TARGET_FPMS,this.lastTime=0,this.speed=1,this.started=!1,this._tick=function(t){e._requestId=null,e.started&&(e.update(t),e.started&&null===e._requestId&&e._head.next&&(e._requestId=requestAnimationFrame(e._tick)))}}return t.prototype._requestIfNeeded=function(){null===this._requestId&&this._head.next&&(this.lastTime=performance.now(),this._requestId=requestAnimationFrame(this._tick))},t.prototype._cancelIfNeeded=function(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)},t.prototype._startIfPossible=function(){this.started?this._requestIfNeeded():this.autoStart&&this.start()},t.prototype.add=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.UPDATE_PRIORITY.NORMAL;return this._addListener(new l.default(t,e,r))},t.prototype.addOnce=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.UPDATE_PRIORITY.NORMAL;return this._addListener(new l.default(t,e,r,!0))},t.prototype._addListener=function(t){var e=this._head.next,r=this._head;if(e){for(;e;){if(t.priority>e.priority){t.connect(r);break}r=e,e=e.next}t.previous||t.connect(r)}else t.connect(r);return this._startIfPossible(),this},t.prototype.remove=function(t,e){for(var r=this._head.next;r;)r=r.match(t,e)?r.destroy():r.next;return this._head.next||this._cancelIfNeeded(),this},t.prototype.start=function(){this.started||(this.started=!0,this._requestIfNeeded())},t.prototype.stop=function(){this.started&&(this.started=!1,this._cancelIfNeeded())},t.prototype.destroy=function(){this.stop();for(var t=this._head.next;t;)t=t.destroy(!0);this._head.destroy(),this._head=null},t.prototype.update=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:performance.now(),e=void 0;if(t>this.lastTime){e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),this.deltaTime=e*a.default.TARGET_FPMS*this.speed;for(var r=this._head,n=r.next;n;)n=n.emit(this.deltaTime);r.next||this._cancelIfNeeded()}else this.deltaTime=this.elapsedMS=0;this.lastTime=t},o(t,[{key:"FPS",get:function(){return 1e3/this.elapsedMS}},{key:"minFPS",get:function(){return 1e3/this._maxElapsedMS},set:function(t){var e=Math.min(Math.max(0,t)/1e3,a.default.TARGET_FPMS);this._maxElapsedMS=1/e}}]),t}();r.default=c},{"../const":45,"../settings":100,"./TickerListener":118}],118:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];n(this,t),this.fn=e,this.context=r,this.priority=i,this.once=o,this.next=null,this.previous=null,this._destroyed=!1}return t.prototype.match=function(t,e){return e=e||null,this.fn===t&&this.context===e},t.prototype.emit=function(t){this.fn&&(this.context?this.fn.call(this.context,t):this.fn(t));var e=this.next;return this.once&&this.destroy(!0),this._destroyed&&(this.next=null),e},t.prototype.connect=function(t){this.previous=t,t.next&&(t.next.previous=this),this.next=t.next,t.next=this},t.prototype.destroy=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this._destroyed=!0,this.fn=null,this.context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);var e=this.previous;return this.next=t?null:e,this.previous=null,e},t}();r.default=i},{}],119:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.Ticker=r.shared=void 0;var i=t("./Ticker"),o=n(i),s=new o.default;s.autoStart=!0,s.destroy=function(){},r.shared=s,r.Ticker=o.default},{"./Ticker":117}],120:[function(t,e,r){"use strict";function n(){var t=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform);return!t}r.__esModule=!0,r.default=n},{}],121:[function(t,e,r){"use strict";function n(t){for(var e=6*t,r=new Uint16Array(e),n=0,i=0;n<e;n+=6,i+=4)r[n+0]=i+0,r[n+1]=i+1,r[n+2]=i+2,r[n+3]=i+0,r[n+4]=i+2,r[n+5]=i+3;return r}r.__esModule=!0,r.default=n},{}],122:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location;if(0===t.indexOf("data:"))return"";e=e||window.location,a||(a=document.createElement("a")),a.href=t,t=s.default.parse(a.href);var r=!t.port&&""===e.port||t.port===e.port;return t.hostname===e.hostname&&r&&t.protocol===e.protocol?"":"anonymous"}r.__esModule=!0,r.default=i;var o=t("url"),s=n(o),a=void 0},{url:28}],123:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}function o(){return++k}function s(t,e){return e=e||[],e[0]=(t>>16&255)/255,e[1]=(t>>8&255)/255,e[2]=(255&t)/255,e}function a(t){return t=t.toString(16),t="000000".substr(0,6-t.length)+t,"#"+t}function u(t){return(255*t[0]<<16)+(255*t[1]<<8)+(255*t[2]|0)}function h(t,e){var r=S.default.RETINA_PREFIX.exec(t);return r?parseFloat(r[1]):void 0!==e?e:1}function l(t){var e=w.DATA_URI.exec(t);if(e)return{mediaType:e[1]?e[1].toLowerCase():void 0,subType:e[2]?e[2].toLowerCase():void 0,encoding:e[3]?e[3].toLowerCase():void 0,data:e[4]}}function c(t){var e=w.URL_FILE_EXTENSION.exec(t);if(e)return e[1].toLowerCase()}function d(t){var e=w.SVG_SIZE.exec(t),r={};return e&&(r[e[1]]=Math.round(parseFloat(e[3])),r[e[5]]=Math.round(parseFloat(e[7]))),r}function f(){j=!0}function p(t){if(!j){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var e=["\n %c %c %c Pixi.js "+w.VERSION+" - ✰ "+t+" ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n","background: #ff66a5; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff66a5; background: #030307; padding:5px 0;","background: #ff66a5; padding:5px 0;","background: #ffc3dc; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;"];window.console.log.apply(console,e)}else window.console&&window.console.log("Pixi.js "+w.VERSION+" - "+t+" - http://www.pixijs.com/");j=!0}}function v(){var t={stencil:!0,failIfMajorPerformanceCaveat:!0};try{if(!window.WebGLRenderingContext)return!1;var e=document.createElement("canvas"),r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),n=!(!r||!r.getContextAttributes().stencil);if(r){var i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,n}catch(t){return!1}}function y(t){return 0===t?0:t<0?-1:1}function g(){var t=void 0;for(t in U)U[t].destroy();for(t in X)X[t].destroy()}function m(){var t=void 0;for(t in U)delete U[t];for(t in X)delete X[t]}function _(t,e){return G[e?1:0][t]}function b(t,e){if(1===e)return(255*e<<24)+t;if(0===e)return 0;var r=t>>16&255,n=t>>8&255,i=255&t;return r=r*e+.5|0,n=n*e+.5|0,i=i*e+.5|0,(255*e<<24)+(r<<16)+(n<<8)+i}function x(t,e,r,n){return r=r||new Float32Array(4),n||void 0===n?(r[0]=t[0]*e,r[1]=t[1]*e,r[2]=t[2]*e):(r[0]=t[0],r[1]=t[1],r[2]=t[2]),r[3]=e,r}function T(t,e,r,n){return r=r||new Float32Array(4),r[0]=(t>>16&255)/255,r[1]=(t>>8&255)/255,r[2]=(255&t)/255,(n||void 0===n)&&(r[0]*=e,r[1]*=e,r[2]*=e),r[3]=e,r}r.__esModule=!0,r.premultiplyBlendMode=r.BaseTextureCache=r.TextureCache=r.mixins=r.pluginTarget=r.EventEmitter=r.removeItems=r.isMobile=void 0,r.uid=o,r.hex2rgb=s,r.hex2string=a,r.rgb2hex=u,r.getResolutionOfUrl=h,r.decomposeDataUri=l,r.getUrlFileExtension=c,r.getSvgSize=d,r.skipHello=f,r.sayHello=p,r.isWebGLSupported=v,r.sign=y,r.destroyTextureCache=g,r.clearTextureCache=m,r.correctBlendMode=_,r.premultiplyTint=b,r.premultiplyRgba=x,r.premultiplyTintToRgba=T;var w=t("../const"),E=t("../settings"),S=i(E),O=t("eventemitter3"),P=i(O),M=t("./pluginTarget"),C=i(M),R=t("./mixin"),A=n(R),I=t("ismobilejs"),D=n(I),L=t("remove-array-items"),N=i(L),F=t("./mapPremultipliedBlendModes"),B=i(F),k=0,j=!1;r.isMobile=D,r.removeItems=N.default,r.EventEmitter=P.default,r.pluginTarget=C.default,r.mixins=A;var U=r.TextureCache=Object.create(null),X=r.BaseTextureCache=Object.create(null),G=r.premultiplyBlendMode=(0,B.default)()},{"../const":45,"../settings":100,"./mapPremultipliedBlendModes":124,"./mixin":126,"./pluginTarget":127,eventemitter3:3,ismobilejs:4,"remove-array-items":30}],124:[function(t,e,r){"use strict";function n(){for(var t=[],e=[],r=0;r<32;r++)t[r]=r,e[r]=r;t[i.BLEND_MODES.NORMAL_NPM]=i.BLEND_MODES.NORMAL,t[i.BLEND_MODES.ADD_NPM]=i.BLEND_MODES.ADD,t[i.BLEND_MODES.SCREEN_NPM]=i.BLEND_MODES.SCREEN,e[i.BLEND_MODES.NORMAL]=i.BLEND_MODES.NORMAL_NPM,e[i.BLEND_MODES.ADD]=i.BLEND_MODES.ADD_NPM,e[i.BLEND_MODES.SCREEN]=i.BLEND_MODES.SCREEN_NPM;var n=[];return n.push(e),n.push(t),n}r.__esModule=!0,r.default=n;var i=t("../const")},{"../const":45}],125:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){return s.default.tablet||s.default.phone?4:t}r.__esModule=!0,r.default=i;var o=t("ismobilejs"),s=n(o)},{ismobilejs:4}],126:[function(t,e,r){"use strict";function n(t,e){if(t&&e)for(var r=Object.keys(e),n=0;n<r.length;++n){var i=r[n];Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}}function i(t,e){s.push(t,e)}function o(){for(var t=0;t<s.length;t+=2)n(s[t],s[t+1]);s.length=0}r.__esModule=!0,r.mixin=n,r.delayMixin=i,r.performMixins=o;var s=[]},{}],127:[function(t,e,r){"use strict";function n(t){t.__plugins={},t.registerPlugin=function(e,r){t.__plugins[e]=r},t.prototype.initPlugins=function(){this.plugins=this.plugins||{};for(var e in t.__plugins)this.plugins[e]=new t.__plugins[e](this)},t.prototype.destroyPlugins=function(){for(var t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null;this.plugins=null}}r.__esModule=!0,r.default={mixin:function(t){n(t)}}},{}],128:[function(t,e,r){"use strict";function n(t){var e=t.width,r=t.height,n=t.getContext("2d"),i=n.getImageData(0,0,e,r),o=i.data,s=o.length,a={top:null,left:null,right:null,bottom:null},u=void 0,h=void 0,l=void 0;for(u=0;u<s;u+=4)0!==o[u+3]&&(h=u/4%e,l=~~(u/4/e),null===a.top&&(a.top=l),null===a.left?a.left=h:h<a.left&&(a.left=h),null===a.right?a.right=h+1:a.right<h&&(a.right=h+1),null===a.bottom?a.bottom=l:a.bottom<l&&(a.bottom=l));e=a.right-a.left,r=a.bottom-a.top+1;var c=n.getImageData(a.left,a.top,e,r);return{height:r,width:e,data:c}}r.__esModule=!0,r.default=n},{}],129:[function(t,e,r){"use strict";function n(t){}function i(t){var e=t.mesh,r=t.particles,i=t.extras,o=t.filters,s=t.prepare,a=t.loaders,u=t.interaction;Object.defineProperties(t,{SpriteBatch:{get:function(){throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")}},AssetLoader:{get:function(){throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")}},Stage:{get:function(){return n("You do not need to use a PIXI Stage any more, you can simply render any container."),t.Container}},DisplayObjectContainer:{get:function(){return n("DisplayObjectContainer has been shortened to Container, please use Container from now on."),t.Container}},Strip:{get:function(){return n("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."),e.Mesh}},Rope:{get:function(){return n("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."),e.Rope}},ParticleContainer:{get:function(){return n("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."),r.ParticleContainer}},MovieClip:{get:function(){return n("The MovieClip class has been moved to extras.AnimatedSprite, please use extras.AnimatedSprite."),i.AnimatedSprite}},TilingSprite:{get:function(){return n("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."),i.TilingSprite}},BitmapText:{get:function(){return n("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."),i.BitmapText}},blendModes:{get:function(){return n("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."),t.BLEND_MODES}},scaleModes:{get:function(){return n("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."),t.SCALE_MODES}},BaseTextureCache:{get:function(){return n("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."),t.utils.BaseTextureCache}},TextureCache:{get:function(){return n("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."),t.utils.TextureCache}},math:{get:function(){return n("The math namespace is deprecated, please access members already accessible on PIXI."),t}},AbstractFilter:{get:function(){return n("AstractFilter has been renamed to Filter, please use PIXI.Filter"),t.Filter}},TransformManual:{get:function(){return n("TransformManual has been renamed to TransformBase, please update your pixi-spine"),t.TransformBase}},TARGET_FPMS:{get:function(){return n("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"),t.settings.TARGET_FPMS},set:function(e){n("PIXI.TARGET_FPMS has been deprecated, please use PIXI.settings.TARGET_FPMS"),t.settings.TARGET_FPMS=e}},FILTER_RESOLUTION:{get:function(){return n("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"),t.settings.FILTER_RESOLUTION},set:function(e){n("PIXI.FILTER_RESOLUTION has been deprecated, please use PIXI.settings.FILTER_RESOLUTION"),t.settings.FILTER_RESOLUTION=e}},RESOLUTION:{get:function(){return n("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"),t.settings.RESOLUTION},set:function(e){n("PIXI.RESOLUTION has been deprecated, please use PIXI.settings.RESOLUTION"),t.settings.RESOLUTION=e}},MIPMAP_TEXTURES:{get:function(){return n("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"),t.settings.MIPMAP_TEXTURES},set:function(e){n("PIXI.MIPMAP_TEXTURES has been deprecated, please use PIXI.settings.MIPMAP_TEXTURES"),t.settings.MIPMAP_TEXTURES=e}},SPRITE_BATCH_SIZE:{get:function(){return n("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"),t.settings.SPRITE_BATCH_SIZE},set:function(e){n("PIXI.SPRITE_BATCH_SIZE has been deprecated, please use PIXI.settings.SPRITE_BATCH_SIZE"),t.settings.SPRITE_BATCH_SIZE=e}},SPRITE_MAX_TEXTURES:{get:function(){return n("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"),t.settings.SPRITE_MAX_TEXTURES},set:function(e){n("PIXI.SPRITE_MAX_TEXTURES has been deprecated, please use PIXI.settings.SPRITE_MAX_TEXTURES"),t.settings.SPRITE_MAX_TEXTURES=e}},RETINA_PREFIX:{get:function(){return n("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"),t.settings.RETINA_PREFIX},set:function(e){n("PIXI.RETINA_PREFIX has been deprecated, please use PIXI.settings.RETINA_PREFIX"),t.settings.RETINA_PREFIX=e}},DEFAULT_RENDER_OPTIONS:{get:function(){return n("PIXI.DEFAULT_RENDER_OPTIONS has been deprecated, please use PIXI.settings.DEFAULT_RENDER_OPTIONS"),t.settings.RENDER_OPTIONS}}});for(var h=[{parent:"TRANSFORM_MODE",target:"TRANSFORM_MODE"},{parent:"GC_MODES",target:"GC_MODE"},{parent:"WRAP_MODES",target:"WRAP_MODE"},{parent:"SCALE_MODES",target:"SCALE_MODE"},{parent:"PRECISION",target:"PRECISION_FRAGMENT"}],l=function(e){var r=h[e];Object.defineProperty(t[r.parent],"DEFAULT",{get:function(){return n("PIXI."+r.parent+".DEFAULT has been deprecated, please use PIXI.settings."+r.target),t.settings[r.target]},set:function(e){n("PIXI."+r.parent+".DEFAULT has been deprecated, please use PIXI.settings."+r.target),t.settings[r.target]=e}})},c=0;c<h.length;c++)l(c);Object.defineProperties(t.settings,{PRECISION:{get:function(){return n("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"),t.settings.PRECISION_FRAGMENT},set:function(e){n("PIXI.settings.PRECISION has been deprecated, please use PIXI.settings.PRECISION_FRAGMENT"),t.settings.PRECISION_FRAGMENT=e}}}),i.AnimatedSprite&&Object.defineProperties(i,{MovieClip:{get:function(){return n("The MovieClip class has been renamed to AnimatedSprite, please use AnimatedSprite from now on."),i.AnimatedSprite}}}),t.DisplayObject.prototype.generateTexture=function(t,e,r){return n("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"),t.generateTexture(this,e,r)},t.Graphics.prototype.generateTexture=function(t,e){return n("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"),this.generateCanvasTexture(t,e)},t.RenderTexture.prototype.render=function(t,e,r,i){this.legacyRenderer.render(t,this,r,e,!i),n("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")},t.RenderTexture.prototype.getImage=function(t){return n("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"),this.legacyRenderer.extract.image(t)},t.RenderTexture.prototype.getBase64=function(t){return n("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"),this.legacyRenderer.extract.base64(t)},t.RenderTexture.prototype.getCanvas=function(t){return n("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"),this.legacyRenderer.extract.canvas(t)},t.RenderTexture.prototype.getPixels=function(t){return n("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"),this.legacyRenderer.pixels(t)},t.Sprite.prototype.setTexture=function(t){this.texture=t,n("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")},i.BitmapText&&(i.BitmapText.prototype.setText=function(t){this.text=t,n("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")}),t.Text.prototype.setText=function(t){this.text=t,n("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")},t.Text.calculateFontProperties=function(e){return n("Text.calculateFontProperties is now deprecated, please use the TextMetrics.measureFont"),t.TextMetrics.measureFont(e)},Object.defineProperties(t.Text,{fontPropertiesCache:{get:function(){return n("Text.fontPropertiesCache is deprecated"),t.TextMetrics._fonts}},fontPropertiesCanvas:{get:function(){return n("Text.fontPropertiesCanvas is deprecated"),t.TextMetrics._canvas}},fontPropertiesContext:{get:function(){return n("Text.fontPropertiesContext is deprecated"),t.TextMetrics._context}}}),t.Text.prototype.setStyle=function(t){this.style=t,n("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")},t.Text.prototype.determineFontProperties=function(e){return n("determineFontProperties is now deprecated, please use TextMetrics.measureFont method"),t.TextMetrics.measureFont(e)},t.Text.getFontStyle=function(e){return n("getFontStyle is now deprecated, please use TextStyle.toFontString() instead"),e=e||{},e instanceof t.TextStyle||(e=new t.TextStyle(e)),e.toFontString()},Object.defineProperties(t.TextStyle.prototype,{font:{get:function(){n("text style property 'font' is now deprecated, please use the 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant' and 'fontWeight' properties from now on");var t="number"==typeof this._fontSize?this._fontSize+"px":this._fontSize;return this._fontStyle+" "+this._fontVariant+" "+this._fontWeight+" "+t+" "+this._fontFamily},set:function(t){n("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"),t.indexOf("italic")>1?this._fontStyle="italic":t.indexOf("oblique")>-1?this._fontStyle="oblique":this._fontStyle="normal",t.indexOf("small-caps")>-1?this._fontVariant="small-caps":this._fontVariant="normal";var e=t.split(" "),r=-1;this._fontSize=26;for(var i=0;i<e.length;++i)if(e[i].match(/(px|pt|em|%)/)){r=i,this._fontSize=e[i];break}this._fontWeight="normal";for(var o=0;o<r;++o)if(e[o].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)){this._fontWeight=e[o];break}if(r>-1&&r<e.length-1){this._fontFamily="";for(var s=r+1;s<e.length;++s)this._fontFamily+=e[s]+" ";this._fontFamily=this._fontFamily.slice(0,-1)}else this._fontFamily="Arial";this.styleID++}}}),t.Texture.prototype.setFrame=function(t){this.frame=t,n("setFrame is now deprecated, please use the frame property, e.g: myTexture.frame = frame;")},t.Texture.addTextureToCache=function(e,r){t.Texture.addToCache(e,r),n("Texture.addTextureToCache is deprecated, please use Texture.addToCache from now on.")},t.Texture.removeTextureFromCache=function(e){return n("Texture.removeTextureFromCache is deprecated, please use Texture.removeFromCache from now on. Be aware that Texture.removeFromCache does not automatically its BaseTexture from the BaseTextureCache. For that, use BaseTexture.removeFromCache"),t.BaseTexture.removeFromCache(e),t.Texture.removeFromCache(e)},Object.defineProperties(o,{AbstractFilter:{get:function(){return n("AstractFilter has been renamed to Filter, please use PIXI.Filter"),t.AbstractFilter}},SpriteMaskFilter:{get:function(){return n("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."),t.SpriteMaskFilter}}}),t.utils.uuid=function(){return n("utils.uuid() is deprecated, please use utils.uid() from now on."),t.utils.uid()},t.utils.canUseNewCanvasBlendModes=function(){return n("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"),t.CanvasTinter.canUseMultiply};var d=!0;Object.defineProperty(t.utils,"_saidHello",{set:function(t){t&&(n("PIXI.utils._saidHello is deprecated, please use PIXI.utils.skipHello()"),this.skipHello()),d=t},get:function(){return d}}),s.BasePrepare&&(s.BasePrepare.prototype.register=function(t,e){return n("renderer.plugins.prepare.register is now deprecated, please use renderer.plugins.prepare.registerFindHook & renderer.plugins.prepare.registerUploadHook"),t&&this.registerFindHook(t),e&&this.registerUploadHook(e),this}),s.canvas&&Object.defineProperty(s.canvas,"UPLOADS_PER_FRAME",{set:function(){n("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")},get:function(){return n("PIXI.CanvasPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"),NaN}}),s.webgl&&Object.defineProperty(s.webgl,"UPLOADS_PER_FRAME",{set:function(){n("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please set renderer.plugins.prepare.limiter.maxItemsPerFrame on your renderer")},get:function(){return n("PIXI.WebGLPrepare.UPLOADS_PER_FRAME has been removed. Please use renderer.plugins.prepare.limiter"),NaN}}),a.Loader&&!function(){var t=a.Resource,e=a.Loader;Object.defineProperties(t.prototype,{isJson:{get:function(){return n("The isJson property is deprecated, please use `resource.type === Resource.TYPE.JSON`."),this.type===t.TYPE.JSON}},isXml:{get:function(){return n("The isXml property is deprecated, please use `resource.type === Resource.TYPE.XML`."),this.type===t.TYPE.XML}},isImage:{get:function(){return n("The isImage property is deprecated, please use `resource.type === Resource.TYPE.IMAGE`."),this.type===t.TYPE.IMAGE}},isAudio:{get:function(){return n("The isAudio property is deprecated, please use `resource.type === Resource.TYPE.AUDIO`."),this.type===t.TYPE.AUDIO}},isVideo:{get:function(){return n("The isVideo property is deprecated, please use `resource.type === Resource.TYPE.VIDEO`."),this.type===t.TYPE.VIDEO}}}),Object.defineProperties(e.prototype,{before:{get:function(){return n("The before() method is deprecated, please use pre()."),this.pre}},after:{get:function(){return n("The after() method is deprecated, please use use()."),this.use}}})}(),u.interactiveTarget&&Object.defineProperty(u.interactiveTarget,"defaultCursor",{set:function(t){n("Property defaultCursor has been replaced with 'cursor'. "),this.cursor=t},get:function(){return n("Property defaultCursor has been replaced with 'cursor'. "),this.cursor}}),u.InteractionManager&&(Object.defineProperty(u.InteractionManager,"defaultCursorStyle",{set:function(t){n("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "),this.cursorStyles.default=t},get:function(){return n("Property defaultCursorStyle has been replaced with 'cursorStyles.default'. "),this.cursorStyles.default}}),Object.defineProperty(u.InteractionManager,"currentCursorStyle",{set:function(t){n("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."),this.currentCursorMode=t},get:function(){return n("Property currentCursorStyle has been removed.See the currentCursorMode property, which works differently."),this.currentCursorMode}}))}r.__esModule=!0,r.default=i},{}],130:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../core"),s=n(o),a=new s.Rectangle,u=function(){function t(e){i(this,t),this.renderer=e,e.extract=this}return t.prototype.image=function t(e){var t=new Image;return t.src=this.base64(e),t},t.prototype.base64=function(t){return this.canvas(t).toDataURL()},t.prototype.canvas=function(t){var e=this.renderer,r=void 0,n=void 0,i=void 0,o=void 0;t&&(o=t instanceof s.RenderTexture?t:e.generateTexture(t)),o?(r=o.baseTexture._canvasRenderTarget.context,n=o.baseTexture._canvasRenderTarget.resolution,i=o.frame):(r=e.rootContext,i=a,i.width=this.renderer.width,i.height=this.renderer.height);var u=i.width*n,h=i.height*n,l=new s.CanvasRenderTarget(u,h),c=r.getImageData(i.x*n,i.y*n,u,h);return l.context.putImageData(c,0,0),l.canvas},t.prototype.pixels=function(t){var e=this.renderer,r=void 0,n=void 0,i=void 0,o=void 0;return t&&(o=t instanceof s.RenderTexture?t:e.generateTexture(t)),o?(r=o.baseTexture._canvasRenderTarget.context,n=o.baseTexture._canvasRenderTarget.resolution,i=o.frame):(r=e.rootContext,i=a,i.width=e.width,i.height=e.height),r.getImageData(0,0,i.width*n,i.height*n).data},t.prototype.destroy=function(){this.renderer.extract=null,this.renderer=null},t}();r.default=u,s.CanvasRenderer.registerPlugin("extract",u)},{"../../core":64}],131:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./webgl/WebGLExtract");Object.defineProperty(r,"webgl",{enumerable:!0,get:function(){return n(i).default}});var o=t("./canvas/CanvasExtract");Object.defineProperty(r,"canvas",{enumerable:!0,get:function(){return n(o).default}})},{"./canvas/CanvasExtract":130,"./webgl/WebGLExtract":132}],132:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("../../core"),s=n(o),a=new s.Rectangle,u=4,h=function(){function t(e){i(this,t),this.renderer=e,e.extract=this}return t.prototype.image=function t(e){var t=new Image;return t.src=this.base64(e),t},t.prototype.base64=function(t){return this.canvas(t).toDataURL()},t.prototype.canvas=function(t){var e=this.renderer,r=void 0,n=void 0,i=void 0,o=!1,h=void 0;t&&(h=t instanceof s.RenderTexture?t:this.renderer.generateTexture(t)),h?(r=h.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID],n=r.resolution,i=h.frame,o=!1):(r=this.renderer.rootRenderTarget,n=r.resolution,o=!0,i=a,i.width=r.size.width,i.height=r.size.height);var l=i.width*n,c=i.height*n,d=new s.CanvasRenderTarget(l,c);if(r){e.bindRenderTarget(r);var f=new Uint8Array(u*l*c),p=e.gl;p.readPixels(i.x*n,i.y*n,l,c,p.RGBA,p.UNSIGNED_BYTE,f);var v=d.context.getImageData(0,0,l,c);v.data.set(f),d.context.putImageData(v,0,0),o&&(d.context.scale(1,-1),d.context.drawImage(d.canvas,0,-c))}return d.canvas},t.prototype.pixels=function(t){var e=this.renderer,r=void 0,n=void 0,i=void 0,o=void 0;t&&(o=t instanceof s.RenderTexture?t:this.renderer.generateTexture(t)),o?(r=o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID],n=r.resolution,i=o.frame):(r=this.renderer.rootRenderTarget,n=r.resolution,i=a,i.width=r.size.width,i.height=r.size.height);var h=i.width*n,l=i.height*n,c=new Uint8Array(u*h*l);if(r){e.bindRenderTarget(r);var d=e.gl;d.readPixels(i.x*n,i.y*n,h,l,d.RGBA,d.UNSIGNED_BYTE,c)}return c},t.prototype.destroy=function(){this.renderer.extract=null,this.renderer=null},t}();r.default=h,s.WebGLRenderer.registerPlugin("extract",h)},{"../../core":64}],133:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../core"),h=n(u),l=function(t){function e(r,n){i(this,e);var s=o(this,t.call(this,r[0]instanceof h.Texture?r[0]:r[0].texture));return s._textures=null,s._durations=null,s.textures=r,s._autoUpdate=n!==!1,s.animationSpeed=1,s.loop=!0,s.onComplete=null,s.onFrameChange=null,s.onLoop=null,s._currentTime=0,s.playing=!1,s}return s(e,t),e.prototype.stop=function(){this.playing&&(this.playing=!1,this._autoUpdate&&h.ticker.shared.remove(this.update,this))},e.prototype.play=function(){this.playing||(this.playing=!0,this._autoUpdate&&h.ticker.shared.add(this.update,this,h.UPDATE_PRIORITY.HIGH))},e.prototype.gotoAndStop=function(t){this.stop();var e=this.currentFrame;this._currentTime=t,e!==this.currentFrame&&this.updateTexture()},e.prototype.gotoAndPlay=function(t){var e=this.currentFrame;this._currentTime=t,e!==this.currentFrame&&this.updateTexture(),this.play()},e.prototype.update=function(t){var e=this.animationSpeed*t,r=this.currentFrame;if(null!==this._durations){var n=this._currentTime%1*this._durations[this.currentFrame];for(n+=e/60*1e3;n<0;)this._currentTime--,n+=this._durations[this.currentFrame];var i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);n>=this._durations[this.currentFrame];)n-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=n/this._durations[this.currentFrame]}else this._currentTime+=e;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r?this.onLoop():this.animationSpeed<0&&this.currentFrame>r&&this.onLoop()),this.updateTexture())},e.prototype.updateTexture=function(){this._texture=this._textures[this.currentFrame],this._textureID=-1,this.onFrameChange&&this.onFrameChange(this.currentFrame)},e.prototype.destroy=function(e){this.stop(),t.prototype.destroy.call(this,e)},e.fromFrames=function(t){for(var r=[],n=0;n<t.length;++n)r.push(h.Texture.fromFrame(t[n]));return new e(r)},e.fromImages=function(t){for(var r=[],n=0;n<t.length;++n)r.push(h.Texture.fromImage(t[n]));return new e(r)},a(e,[{key:"totalFrames",get:function(){return this._textures.length}},{key:"textures",get:function(){return this._textures},set:function(t){if(t[0]instanceof h.Texture)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(var e=0;e<t.length;e++)this._textures.push(t[e].texture),this._durations.push(t[e].time)}this.gotoAndStop(0),this.updateTexture()}},{key:"currentFrame",get:function(){var t=Math.floor(this._currentTime)%this._textures.length;return t<0&&(t+=this._textures.length),t}}]),e}(h.Sprite);r.default=l},{"../core":64}],134:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../core"),l=i(h),c=t("../core/math/ObservablePoint"),d=n(c),f=t("../core/settings"),p=n(f),v=function(t){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e);var i=s(this,t.call(this));return i._textWidth=0,i._textHeight=0,i._glyphs=[],i._font={tint:void 0!==n.tint?n.tint:16777215,align:n.align||"left",name:null,size:0},i.font=n.font,i._text=r,i._maxWidth=0,i._maxLineHeight=0,i._anchor=new d.default(function(){i.dirty=!0},i,0,0),i.dirty=!1,i.updateText(),i}return a(e,t),e.prototype.updateText=function(){for(var t=e.fonts[this._font.name],r=this._font.size/t.size,n=new l.Point,i=[],o=[],s=null,a=0,u=0,h=0,c=-1,d=0,f=0,p=0,v=0;v<this.text.length;v++){var y=this.text.charCodeAt(v);if(/(\s)/.test(this.text.charAt(v))&&(c=v,d=a),/(?:\r\n|\r|\n)/.test(this.text.charAt(v)))o.push(a),u=Math.max(u,a),h++,n.x=0,n.y+=t.lineHeight,s=null;else if(c!==-1&&this._maxWidth>0&&n.x*r>this._maxWidth)l.utils.removeItems(i,c-f,v-c),v=c,c=-1,++f,o.push(d),u=Math.max(u,d),h++,n.x=0,n.y+=t.lineHeight,s=null;else{var g=t.chars[y];g&&(s&&g.kerning[s]&&(n.x+=g.kerning[s]),i.push({texture:g.texture,line:h,charCode:y,position:new l.Point(n.x+g.xOffset,n.y+g.yOffset)}),a=n.x+(g.texture.width+g.xOffset),n.x+=g.xAdvance,p=Math.max(p,g.yOffset+g.texture.height),s=y)}}o.push(a),u=Math.max(u,a);for(var m=[],_=0;_<=h;_++){var b=0;"right"===this._font.align?b=u-o[_]:"center"===this._font.align&&(b=(u-o[_])/2),m.push(b)}for(var x=i.length,T=this.tint,w=0;w<x;w++){var E=this._glyphs[w];E?E.texture=i[w].texture:(E=new l.Sprite(i[w].texture),this._glyphs.push(E)),E.position.x=(i[w].position.x+m[i[w].line])*r,E.position.y=i[w].position.y*r,E.scale.x=E.scale.y=r,E.tint=T,E.parent||this.addChild(E)}for(var S=x;S<this._glyphs.length;++S)this.removeChild(this._glyphs[S]);if(this._textWidth=u*r,this._textHeight=(n.y+t.lineHeight)*r,0!==this.anchor.x||0!==this.anchor.y)for(var O=0;O<x;O++)this._glyphs[O].x-=this._textWidth*this.anchor.x,this._glyphs[O].y-=this._textHeight*this.anchor.y;this._maxLineHeight=p*r},e.prototype.updateTransform=function(){this.validate(),this.containerUpdateTransform()},e.prototype.getLocalBounds=function(){return this.validate(),t.prototype.getLocalBounds.call(this)},e.prototype.validate=function(){this.dirty&&(this.updateText(),this.dirty=!1)},e.registerFont=function(t,r){var n={},i=t.getElementsByTagName("info")[0],o=t.getElementsByTagName("common")[0],s=r.baseTexture.resolution||p.default.RESOLUTION;n.font=i.getAttribute("face"),n.size=parseInt(i.getAttribute("size"),10),n.lineHeight=parseInt(o.getAttribute("lineHeight"),10)/s,n.chars={};for(var a=t.getElementsByTagName("char"),u=0;u<a.length;u++){var h=a[u],c=parseInt(h.getAttribute("id"),10),d=new l.Rectangle(parseInt(h.getAttribute("x"),10)/s+r.frame.x/s,parseInt(h.getAttribute("y"),10)/s+r.frame.y/s,parseInt(h.getAttribute("width"),10)/s,parseInt(h.getAttribute("height"),10)/s);n.chars[c]={xOffset:parseInt(h.getAttribute("xoffset"),10)/s,yOffset:parseInt(h.getAttribute("yoffset"),10)/s,xAdvance:parseInt(h.getAttribute("xadvance"),10)/s,kerning:{},texture:new l.Texture(r.baseTexture,d)}}for(var f=t.getElementsByTagName("kerning"),v=0;v<f.length;v++){var y=f[v],g=parseInt(y.getAttribute("first"),10)/s,m=parseInt(y.getAttribute("second"),10)/s,_=parseInt(y.getAttribute("amount"),10)/s;n.chars[m]&&(n.chars[m].kerning[g]=_)}return e.fonts[n.font]=n,n},u(e,[{key:"tint",get:function(){return this._font.tint},set:function(t){this._font.tint="number"==typeof t&&t>=0?t:16777215,this.dirty=!0}},{key:"align",get:function(){return this._font.align},set:function(t){this._font.align=t||"left",this.dirty=!0}},{key:"anchor",get:function(){return this._anchor},set:function(t){"number"==typeof t?this._anchor.set(t):this._anchor.copy(t)}},{key:"font",get:function(){return this._font},set:function(t){t&&("string"==typeof t?(t=t.split(" "),this._font.name=1===t.length?t[0]:t.slice(1).join(" "),this._font.size=t.length>=2?parseInt(t[0],10):e.fonts[this._font.name].size):(this._font.name=t.name,this._font.size="number"==typeof t.size?t.size:parseInt(t.size,10)),this.dirty=!0)}},{key:"text",get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}},{key:"maxWidth",get:function(){return this._maxWidth},set:function(t){this._maxWidth!==t&&(this._maxWidth=t,this.dirty=!0)}},{key:"maxLineHeight",get:function(){return this.validate(),this._maxLineHeight}},{key:"textWidth",get:function(){return this.validate(),this._textWidth}},{key:"textHeight",get:function(){return this.validate(),this._textHeight}}]),e}(l.Container);r.default=v,v.fonts={}},{"../core":64,"../core/math/ObservablePoint":67,"../core/settings":100}],135:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("../core/math/Matrix"),a=n(s),u=new a.default,h=function(){function t(e,r){i(this,t),this._texture=e,this.mapCoord=new a.default,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._lastTextureID=-1,this.clampOffset=0,this.clampMargin="undefined"==typeof r?.5:r}return t.prototype.multiplyUvs=function(t,e){void 0===e&&(e=t);for(var r=this.mapCoord,n=0;n<t.length;n+=2){var i=t[n],o=t[n+1];e[n]=i*r.a+o*r.c+r.tx,e[n+1]=i*r.b+o*r.d+r.ty}return e},t.prototype.update=function(t){var e=this._texture;if(!e||!e.valid)return!1;if(!t&&this._lastTextureID===e._updateID)return!1;this._lastTextureID=e._updateID;var r=e._uvs;this.mapCoord.set(r.x1-r.x0,r.y1-r.y0,r.x3-r.x0,r.y3-r.y0,r.x0,r.y0);var n=e.orig,i=e.trim;i&&(u.set(n.width/i.width,0,0,n.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append(u));var o=e.baseTexture,s=this.uClampFrame,a=this.clampMargin/o.resolution,h=this.clampOffset;return s[0]=(e._frame.x+a+h)/o.width,s[1]=(e._frame.y+a+h)/o.height,s[2]=(e._frame.x+e._frame.width-a+h)/o.width,s[3]=(e._frame.y+e._frame.height-a+h)/o.height,this.uClampOffset[0]=h/o.realWidth,this.uClampOffset[1]=h/o.realHeight,!0},o(t,[{key:"texture",get:function(){return this._texture},set:function(t){this._texture=t,this._lastTextureID=-1}}]),t}();r.default=h},{"../core/math/Matrix":66}],136:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../core"),l=i(h),c=t("../core/sprites/canvas/CanvasTinter"),d=n(c),f=t("./TextureTransform"),p=n(f),v=new l.Point,y=function(t){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100;o(this,e);var a=s(this,t.call(this,r));return a.tileTransform=new l.TransformStatic,a._width=n,a._height=i,a._canvasPattern=null,a.uvTransform=r.transform||new p.default(r),a.pluginName="tilingSprite",a.uvRespectAnchor=!1,a}return a(e,t),e.prototype._onTextureUpdate=function(){this.uvTransform&&(this.uvTransform.texture=this._texture)},e.prototype._renderWebGL=function(t){var e=this._texture;e&&e.valid&&(this.tileTransform.updateLocalTransform(),this.uvTransform.update(),t.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this))},e.prototype._renderCanvas=function(t){var e=this._texture;if(e.baseTexture.hasLoaded){var r=t.context,n=this.worldTransform,i=t.resolution,o=e.baseTexture,s=o.resolution,a=this.tilePosition.x/this.tileScale.x%e._frame.width*s,u=this.tilePosition.y/this.tileScale.y%e._frame.height*s;if(!this._canvasPattern){var h=new l.CanvasRenderTarget(e._frame.width,e._frame.height,s);16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=d.default.getTintedTexture(this,this.tint)),h.context.drawImage(this.tintedTexture,0,0)):h.context.drawImage(o.source,-e._frame.x*s,-e._frame.y*s),this._canvasPattern=h.context.createPattern(h.canvas,"repeat")}r.globalAlpha=this.worldAlpha,r.setTransform(n.a*i,n.b*i,n.c*i,n.d*i,n.tx*i,n.ty*i),t.setBlendMode(this.blendMode),r.fillStyle=this._canvasPattern,r.scale(this.tileScale.x/s,this.tileScale.y/s);var c=this.anchor.x*-this._width,f=this.anchor.y*-this._height;this.uvRespectAnchor?(r.translate(a,u),r.fillRect(-a+c,-u+f,this._width/this.tileScale.x*s,this._height/this.tileScale.y*s)):(r.translate(a+c,u+f),r.fillRect(-a,-u,this._width/this.tileScale.x*s,this._height/this.tileScale.y*s))}},e.prototype._calculateBounds=function(){var t=this._width*-this._anchor._x,e=this._height*-this._anchor._y,r=this._width*(1-this._anchor._x),n=this._height*(1-this._anchor._y);this._bounds.addFrame(this.transform,t,e,r,n)},e.prototype.getLocalBounds=function(e){return 0===this.children.length?(this._bounds.minX=this._width*-this._anchor._x,this._bounds.minY=this._height*-this._anchor._y,this._bounds.maxX=this._width*(1-this._anchor._x),this._bounds.maxY=this._height*(1-this._anchor._x),e||(this._localBoundsRect||(this._localBoundsRect=new l.Rectangle),e=this._localBoundsRect),this._bounds.getRectangle(e)):t.prototype.getLocalBounds.call(this,e)},e.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,v);var e=this._width,r=this._height,n=-e*this.anchor._x;if(v.x>=n&&v.x<n+e){var i=-r*this.anchor._y;if(v.y>=i&&v.y<i+r)return!0}return!1},e.prototype.destroy=function(e){t.prototype.destroy.call(this,e),this.tileTransform=null,this.uvTransform=null},e.from=function(t,r,n){return new e(l.Texture.from(t),r,n)},e.fromFrame=function(t,r,n){var i=l.utils.TextureCache[t];if(!i)throw new Error('The frameId "'+t+'" does not exist in the texture cache '+this);return new e(i,r,n)},e.fromImage=function(t,r,n,i,o){return new e(l.Texture.fromImage(t,i,o),r,n)},u(e,[{key:"clampMargin",get:function(){return this.uvTransform.clampMargin},set:function(t){this.uvTransform.clampMargin=t,this.uvTransform.update(!0)}},{key:"tileScale",get:function(){return this.tileTransform.scale},set:function(t){this.tileTransform.scale.copy(t)}},{key:"tilePosition",get:function(){return this.tileTransform.position},set:function(t){this.tileTransform.position.copy(t)}},{key:"width",get:function(){return this._width},set:function(t){this._width=t}},{key:"height",get:function(){return this._height},set:function(t){this._height=t}}]),e}(l.Sprite);r.default=y},{"../core":64,"../core/sprites/canvas/CanvasTinter":103,"./TextureTransform":135}],137:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=t("../core"),a=i(s),u=t("../core/textures/Texture"),h=n(u),l=t("../core/textures/BaseTexture"),c=n(l),d=t("../core/utils"),f=a.DisplayObject,p=new a.Matrix;f.prototype._cacheAsBitmap=!1,f.prototype._cacheData=!1;var v=function t(){o(this,t),this.textureCacheId=null,this.originalRenderWebGL=null,this.originalRenderCanvas=null,this.originalCalculateBounds=null,this.originalGetLocalBounds=null,this.originalUpdateTransform=null,this.originalHitTest=null,this.originalDestroy=null,this.originalMask=null,this.originalFilterArea=null,this.sprite=null};Object.defineProperties(f.prototype,{cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(t){if(this._cacheAsBitmap!==t){this._cacheAsBitmap=t;var e=void 0;t?(this._cacheData||(this._cacheData=new v),e=this._cacheData,e.originalRenderWebGL=this.renderWebGL,e.originalRenderCanvas=this.renderCanvas,e.originalUpdateTransform=this.updateTransform,e.originalCalculateBounds=this._calculateBounds,e.originalGetLocalBounds=this.getLocalBounds,e.originalDestroy=this.destroy,e.originalContainsPoint=this.containsPoint,e.originalMask=this._mask,e.originalFilterArea=this.filterArea,this.renderWebGL=this._renderCachedWebGL,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):(e=this._cacheData,e.sprite&&this._destroyCachedDisplayObject(),this.renderWebGL=e.originalRenderWebGL,this.renderCanvas=e.originalRenderCanvas,this._calculateBounds=e.originalCalculateBounds,this.getLocalBounds=e.originalGetLocalBounds,this.destroy=e.originalDestroy,this.updateTransform=e.originalUpdateTransform,this.containsPoint=e.originalContainsPoint,this._mask=e.originalMask,this.filterArea=e.originalFilterArea)}}}}),f.prototype._renderCachedWebGL=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObject(t),this._cacheData.sprite._transformID=-1,this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._renderWebGL(t))},f.prototype._initCachedDisplayObject=function(t){if(!this._cacheData||!this._cacheData.sprite){var e=this.alpha;this.alpha=1,t.currentRenderer.flush();var r=this.getLocalBounds().clone();if(this._filters){var n=this._filters[0].padding;r.pad(n)}var i=t._activeRenderTarget,o=t.filterManager.filterStack,s=a.RenderTexture.create(0|r.width,0|r.height),u="cacheAsBitmap_"+(0,d.uid)();this._cacheData.textureCacheId=u,c.default.addToCache(s.baseTexture,u),h.default.addToCache(s,u);var l=p;l.tx=-r.x,l.ty=-r.y,this.transform.worldTransform.identity(),this.renderWebGL=this._cacheData.originalRenderWebGL,t.render(this,s,!0,l,!0),t.bindRenderTarget(i),t.filterManager.filterStack=o,this.renderWebGL=this._renderCachedWebGL,this.updateTransform=this.displayObjectUpdateTransform,this._mask=null,this.filterArea=null;var f=new a.Sprite(s);f.transform.worldTransform=this.transform.worldTransform,f.anchor.x=-(r.x/r.width),f.anchor.y=-(r.y/r.height),f.alpha=e,f._bounds=this._bounds,this._calculateBounds=this._calculateCachedBounds,this.getLocalBounds=this._getCachedLocalBounds,this._cacheData.sprite=f,this.transform._parentID=-1,this.parent?this.updateTransform():(this.parent=t._tempDisplayObjectParent,this.updateTransform(),this.parent=null),this.containsPoint=f.containsPoint.bind(f)}},f.prototype._renderCachedCanvas=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObjectCanvas(t),this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite.renderCanvas(t))},f.prototype._initCachedDisplayObjectCanvas=function(t){if(!this._cacheData||!this._cacheData.sprite){var e=this.getLocalBounds(),r=this.alpha;this.alpha=1;var n=t.context,i=a.RenderTexture.create(0|e.width,0|e.height),o="cacheAsBitmap_"+(0,d.uid)();this._cacheData.textureCacheId=o,c.default.addToCache(i.baseTexture,o),h.default.addToCache(i,o);var s=p;this.transform.localTransform.copy(s),s.invert(),s.tx-=e.x,s.ty-=e.y,this.renderCanvas=this._cacheData.originalRenderCanvas,t.render(this,i,!0,s,!1),t.context=n,this.renderCanvas=this._renderCachedCanvas,this._calculateBounds=this._calculateCachedBounds,this._mask=null,this.filterArea=null;var u=new a.Sprite(i);u.transform.worldTransform=this.transform.worldTransform,u.anchor.x=-(e.x/e.width),u.anchor.y=-(e.y/e.height),u._bounds=this._bounds,u.alpha=r,this.parent?this.updateTransform():(this.parent=t._tempDisplayObjectParent,this.updateTransform(),this.parent=null),this.updateTransform=this.displayObjectUpdateTransform,this._cacheData.sprite=u,this.containsPoint=u.containsPoint.bind(u)}},f.prototype._calculateCachedBounds=function(){this._cacheData.sprite._calculateBounds()},f.prototype._getCachedLocalBounds=function(){return this._cacheData.sprite.getLocalBounds()},f.prototype._destroyCachedDisplayObject=function(){this._cacheData.sprite._texture.destroy(!0),this._cacheData.sprite=null,c.default.removeFromCache(this._cacheData.textureCacheId),h.default.removeFromCache(this._cacheData.textureCacheId),this._cacheData.textureCacheId=null},f.prototype._cacheAsBitmapDestroy=function(t){this.cacheAsBitmap=!1,this.destroy(t)}},{"../core":64,"../core/textures/BaseTexture":111,"../core/textures/Texture":114,"../core/utils":123}],138:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}var i=t("../core"),o=n(i);o.DisplayObject.prototype.name=null,o.Container.prototype.getChildByName=function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e];return null}},{"../core":64}],139:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}var i=t("../core"),o=n(i);o.DisplayObject.prototype.getGlobalPosition=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new o.Point,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.parent?this.parent.toGlobal(this.position,t,e):(t.x=this.position.x,t.y=this.position.y),t}},{"../core":64}],140:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.BitmapText=r.TilingSpriteRenderer=r.TilingSprite=r.TextureTransform=r.AnimatedSprite=void 0;var i=t("./AnimatedSprite");Object.defineProperty(r,"AnimatedSprite",{enumerable:!0,get:function(){return n(i).default}});var o=t("./TextureTransform");Object.defineProperty(r,"TextureTransform",{enumerable:!0,get:function(){return n(o).default}});var s=t("./TilingSprite");Object.defineProperty(r,"TilingSprite",{enumerable:!0,get:function(){return n(s).default}});var a=t("./webgl/TilingSpriteRenderer");Object.defineProperty(r,"TilingSpriteRenderer",{enumerable:!0,get:function(){return n(a).default}});var u=t("./BitmapText");Object.defineProperty(r,"BitmapText",{enumerable:!0,get:function(){return n(u).default}}),t("./cacheAsBitmap"),t("./getChildByName"),t("./getGlobalPosition")},{"./AnimatedSprite":133,"./BitmapText":134,"./TextureTransform":135,"./TilingSprite":136,"./cacheAsBitmap":137,"./getChildByName":138,"./getGlobalPosition":139,"./webgl/TilingSpriteRenderer":141}],141:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../core"),u=n(a),h=t("../../core/const"),l=(t("path"),new u.Matrix),c=function(t){function e(r){i(this,e);var n=o(this,t.call(this,r));return n.shader=null,n.simpleShader=null,n.quad=null,n}return s(e,t),e.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=new u.Shader(t,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void)\n{\n    vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n    coord = (uMapCoord * vec3(coord, 1.0)).xy;\n    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n    vec4 sample = texture2D(uSampler, coord);\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n    gl_FragColor = sample * color ;\n}\n"),this.simpleShader=new u.Shader(t,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n    vec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n    gl_FragColor = sample * color;\n}\n"),this.renderer.bindVao(null),this.quad=new u.Quad(t,this.renderer.state.attribState),this.quad.initVao(this.shader)},e.prototype.render=function(t){var e=this.renderer,r=this.quad;e.bindVao(r.vao);var n=r.vertices;n[0]=n[6]=t._width*-t.anchor.x,n[1]=n[3]=t._height*-t.anchor.y,n[2]=n[4]=t._width*(1-t.anchor.x),n[5]=n[7]=t._height*(1-t.anchor.y),t.uvRespectAnchor&&(n=r.uvs,n[0]=n[6]=-t.anchor.x,n[1]=n[3]=-t.anchor.y,n[2]=n[4]=1-t.anchor.x,n[5]=n[7]=1-t.anchor.y),r.upload();var i=t._texture,o=i.baseTexture,s=t.tileTransform.localTransform,a=t.uvTransform,c=o.isPowerOfTwo&&i.frame.width===o.width&&i.frame.height===o.height;c&&(o._glTextures[e.CONTEXT_UID]?c=o.wrapMode!==h.WRAP_MODES.CLAMP:o.wrapMode===h.WRAP_MODES.CLAMP&&(o.wrapMode=h.WRAP_MODES.REPEAT));var d=c?this.simpleShader:this.shader;e.bindShader(d);var f=i.width,p=i.height,v=t._width,y=t._height;l.set(s.a*f/v,s.b*f/y,s.c*p/v,s.d*p/y,s.tx/v,s.ty/y),l.invert(),c?l.prepend(a.mapCoord):(d.uniforms.uMapCoord=a.mapCoord.toArray(!0),d.uniforms.uClampFrame=a.uClampFrame,d.uniforms.uClampOffset=a.uClampOffset),d.uniforms.uTransform=l.toArray(!0),d.uniforms.uColor=u.utils.premultiplyTintToRgba(t.tint,t.worldAlpha,d.uniforms.uColor,o.premultipliedAlpha),d.uniforms.translationMatrix=t.transform.worldTransform.toArray(!0),d.uniforms.uSampler=e.bindTexture(i),e.setBlendMode(u.utils.correctBlendMode(t.blendMode,o.premultipliedAlpha)),r.vao.draw(this.renderer.gl.TRIANGLES,6,0)},e}(u.ObjectRenderer);r.default=c,u.WebGLRenderer.registerPlugin("tilingSprite",c)},{"../../core":64,"../../core/const":45,path:22}],142:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../../core"),l=i(h),c=t("./BlurXFilter"),d=n(c),f=t("./BlurYFilter"),p=n(f),v=function(t){function e(r,n,i,a){o(this,e);var u=s(this,t.call(this));return u.blurXFilter=new d.default(r,n,i,a),u.blurYFilter=new p.default(r,n,i,a),u.padding=0,u.resolution=i||l.settings.RESOLUTION,u.quality=n||4,u.blur=r||8,u}return a(e,t),e.prototype.apply=function(t,e,r){var n=t.getRenderTarget(!0);this.blurXFilter.apply(t,e,n,!0),this.blurYFilter.apply(t,n,r,!1),t.returnRenderTarget(n)},u(e,[{key:"blur",get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurXFilter.strength),Math.abs(this.blurYFilter.strength))}},{key:"quality",get:function(){return this.blurXFilter.quality},set:function(t){this.blurXFilter.quality=this.blurYFilter.quality=t}},{key:"blurX",get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurXFilter.strength),Math.abs(this.blurYFilter.strength))}},{key:"blurY",get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurXFilter.strength),Math.abs(this.blurYFilter.strength))}}]),e}(l.Filter);r.default=v},{"../../core":64,"./BlurXFilter":143,"./BlurYFilter":144}],143:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../../core"),l=i(h),c=t("./generateBlurVertSource"),d=n(c),f=t("./generateBlurFragSource"),p=n(f),v=t("./getMaxBlurKernelSize"),y=n(v),g=function(t){function e(r,n,i,a){o(this,e),a=a||5;var u=(0,d.default)(a,!0),h=(0,p.default)(a),c=s(this,t.call(this,u,h));return c.resolution=i||l.settings.RESOLUTION,c._quality=0,c.quality=n||4,c.strength=r||8,c.firstRun=!0,c}return a(e,t),e.prototype.apply=function(t,e,r,n){if(this.firstRun){var i=t.renderer.gl,o=(0,y.default)(i);this.vertexSrc=(0,d.default)(o,!0),this.fragmentSrc=(0,p.default)(o),this.firstRun=!1}if(this.uniforms.strength=1/r.size.width*(r.size.width/e.size.width),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,r,n);else{for(var s=t.getRenderTarget(!0),a=e,u=s,h=0;h<this.passes-1;h++){t.applyFilter(this,a,u,!0);var l=u;u=a,a=l}t.applyFilter(this,a,r,n),t.returnRenderTarget(s)}},u(e,[{key:"blur",get:function(){return this.strength},set:function(t){this.padding=2*Math.abs(t),this.strength=t}},{key:"quality",get:function(){return this._quality},set:function(t){this._quality=t,this.passes=t}}]),e}(l.Filter);r.default=g},{"../../core":64,"./generateBlurFragSource":145,"./generateBlurVertSource":146,"./getMaxBlurKernelSize":147}],144:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../../core"),l=i(h),c=t("./generateBlurVertSource"),d=n(c),f=t("./generateBlurFragSource"),p=n(f),v=t("./getMaxBlurKernelSize"),y=n(v),g=function(t){function e(r,n,i,a){o(this,e),a=a||5;var u=(0,d.default)(a,!1),h=(0,p.default)(a),c=s(this,t.call(this,u,h));return c.resolution=i||l.settings.RESOLUTION,c._quality=0,c.quality=n||4,c.strength=r||8,c.firstRun=!0,c}return a(e,t),e.prototype.apply=function(t,e,r,n){if(this.firstRun){var i=t.renderer.gl,o=(0,y.default)(i);this.vertexSrc=(0,d.default)(o,!1),this.fragmentSrc=(0,p.default)(o),this.firstRun=!1}if(this.uniforms.strength=1/r.size.height*(r.size.height/e.size.height),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,r,n);else{for(var s=t.getRenderTarget(!0),a=e,u=s,h=0;h<this.passes-1;h++){t.applyFilter(this,a,u,!0);var l=u;u=a,a=l}t.applyFilter(this,a,r,n),t.returnRenderTarget(s)}},u(e,[{key:"blur",get:function(){return this.strength},set:function(t){this.padding=2*Math.abs(t),this.strength=t}},{key:"quality",get:function(){return this._quality},set:function(t){this._quality=t,this.passes=t}}]),e}(l.Filter);r.default=g},{"../../core":64,"./generateBlurFragSource":145,"./generateBlurVertSource":146,"./getMaxBlurKernelSize":147}],145:[function(t,e,r){"use strict";function n(t){for(var e=i[t],r=e.length,n=o,s="",a="gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;",u=void 0,h=0;h<t;h++){var l=a.replace("%index%",h);u=h,h>=r&&(u=t-h-1),l=l.replace("%value%",e[u]),s+=l,s+="\n"}return n=n.replace("%blur%",s),n=n.replace("%size%",t)}r.__esModule=!0,r.default=n;var i={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},o=["varying vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","void main(void)","{","    gl_FragColor = vec4(0.0);","    %blur%","}"].join("\n")},{}],146:[function(t,e,r){"use strict";function n(t,e){var r=Math.ceil(t/2),n=i,o="",s=void 0;s=e?"vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);":"vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";for(var a=0;a<t;a++){var u=s.replace("%index%",a);u=u.replace("%sampleIndex%",a-(r-1)+".0"),o+=u,o+="\n"}return n=n.replace("%blur%",o),n=n.replace("%size%",t)}r.__esModule=!0,r.default=n;var i=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform float strength;","uniform mat3 projectionMatrix;","varying vec2 vBlurTexCoords[%size%];","void main(void)","{","gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);","%blur%","}"].join("\n")},{}],147:[function(t,e,r){"use strict";function n(t){for(var e=t.getParameter(t.MAX_VARYING_VECTORS),r=15;r>e;)r-=2;return r}r.__esModule=!0,r.default=n},{}],148:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../../core"),h=n(u),l=(t("path"),function(t){function e(){i(this,e);var r=o(this,t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\nuniform float uAlpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (uAlpha == 0.0) {\n        gl_FragColor = c;\n        return;\n    }\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (c.a > 0.0) {\n      c.rgb /= c.a;\n    }\n\n    vec4 result;\n\n    result.r = (m[0] * c.r);\n        result.r += (m[1] * c.g);\n        result.r += (m[2] * c.b);\n        result.r += (m[3] * c.a);\n        result.r += m[4];\n\n    result.g = (m[5] * c.r);\n        result.g += (m[6] * c.g);\n        result.g += (m[7] * c.b);\n        result.g += (m[8] * c.a);\n        result.g += m[9];\n\n    result.b = (m[10] * c.r);\n       result.b += (m[11] * c.g);\n       result.b += (m[12] * c.b);\n       result.b += (m[13] * c.a);\n       result.b += m[14];\n\n    result.a = (m[15] * c.r);\n       result.a += (m[16] * c.g);\n       result.a += (m[17] * c.b);\n       result.a += (m[18] * c.a);\n       result.a += m[19];\n\n    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);\n\n    // Premultiply alpha again.\n    rgb *= result.a;\n\n    gl_FragColor = vec4(rgb, result.a);\n}\n"));return r.uniforms.m=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],r.alpha=1,r}return s(e,t),e.prototype._loadMatrix=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=t;e&&(this._multiply(r,this.uniforms.m,t),r=this._colorMatrix(r)),this.uniforms.m=r},e.prototype._multiply=function(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19]+e[4],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19]+e[9],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19]+e[14],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19]+e[19],t},e.prototype._colorMatrix=function(t){var e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e},e.prototype.brightness=function(t,e){var r=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},e.prototype.greyscale=function(t,e){var r=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},e.prototype.blackAndWhite=function(t){var e=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.hue=function(t,e){t=(t||0)/180*Math.PI;var r=Math.cos(t),n=Math.sin(t),i=Math.sqrt,o=1/3,s=i(o),a=r+(1-r)*o,u=o*(1-r)-s*n,h=o*(1-r)+s*n,l=o*(1-r)+s*n,c=r+o*(1-r),d=o*(1-r)-s*n,f=o*(1-r)-s*n,p=o*(1-r)+s*n,v=r+o*(1-r),y=[a,u,h,0,0,l,c,d,0,0,f,p,v,0,0,0,0,0,1,0];this._loadMatrix(y,e)},e.prototype.contrast=function(t,e){var r=(t||0)+1,n=-128*(r-1),i=[r,0,0,0,n,0,r,0,0,n,0,0,r,0,n,0,0,0,1,0];this._loadMatrix(i,e)},e.prototype.saturate=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments[1],r=2*t/3+1,n=(r-1)*-.5,i=[r,n,n,0,0,n,r,n,0,0,n,n,r,0,0,0,0,0,1,0];this._loadMatrix(i,e)},e.prototype.desaturate=function(){this.saturate(-1)},e.prototype.negative=function(t){var e=[0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.sepia=function(t){var e=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.technicolor=function(t){var e=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.polaroid=function(t){var e=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.toBGR=function(t){var e=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.kodachrome=function(t){var e=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.browni=function(t){var e=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.vintage=function(t){var e=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.colorTone=function(t,e,r,n,i){t=t||.2,e=e||.15,r=r||16770432,n=n||3375104;var o=(r>>16&255)/255,s=(r>>8&255)/255,a=(255&r)/255,u=(n>>16&255)/255,h=(n>>8&255)/255,l=(255&n)/255,c=[.3,.59,.11,0,0,o,s,a,t,0,u,h,l,e,0,o-u,s-h,a-l,0,0];this._loadMatrix(c,i)},e.prototype.night=function(t,e){t=t||.1;var r=[t*-2,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(r,e)},e.prototype.predator=function(t,e){var r=[11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,0,0,0,1,0];this._loadMatrix(r,e)},e.prototype.lsd=function(t){var e=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(e,t)},e.prototype.reset=function(){var t=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(t,!1)},a(e,[{key:"matrix",get:function(){return this.uniforms.m},set:function(t){this.uniforms.m=t}},{key:"alpha",get:function(){return this.uniforms.uAlpha},set:function(t){this.uniforms.uAlpha=t}}]),e}(h.Filter));r.default=l,l.prototype.grayscale=l.prototype.greyscale},{"../../core":64,path:22}],149:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../../core"),h=n(u),l=(t("path"),function(t){function e(r,n){i(this,e);var s=new h.Matrix;r.renderable=!1;var a=o(this,t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}","varying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"));return a.maskSprite=r,a.maskMatrix=s,a.uniforms.mapSampler=r._texture,a.uniforms.filterMatrix=s,a.uniforms.scale={x:1,y:1},null!==n&&void 0!==n||(n=20),a.scale=new h.Point(n,n),a}return s(e,t),e.prototype.apply=function(t,e,r){var n=1/r.destinationFrame.width*(r.size.width/e.size.width);this.uniforms.filterMatrix=t.calculateSpriteMatrix(this.maskMatrix,this.maskSprite),this.uniforms.scale.x=this.scale.x*n,this.uniforms.scale.y=this.scale.y*n,t.applyFilter(this,e,r)},a(e,[{key:"map",get:function(){return this.uniforms.mapSampler},set:function(t){this.uniforms.mapSampler=t}}]),e}(h.Filter));r.default=l},{"../../core":64,path:22}],150:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../core"),u=n(a),h=(t("path"),function(t){function e(){return i(this,e),o(this,t.call(this,"\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}",'varying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n      vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n      vec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n      gl_FragColor = color;\n}\n'))}return s(e,t),e}(u.Filter));r.default=h},{"../../core":64,path:22}],151:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./fxaa/FXAAFilter");Object.defineProperty(r,"FXAAFilter",{enumerable:!0,get:function(){return n(i).default}});var o=t("./noise/NoiseFilter");Object.defineProperty(r,"NoiseFilter",{enumerable:!0,get:function(){return n(o).default}});var s=t("./displacement/DisplacementFilter");Object.defineProperty(r,"DisplacementFilter",{enumerable:!0,get:function(){return n(s).default}});var a=t("./blur/BlurFilter");Object.defineProperty(r,"BlurFilter",{enumerable:!0,get:function(){return n(a).default}});var u=t("./blur/BlurXFilter");Object.defineProperty(r,"BlurXFilter",{enumerable:!0,get:function(){return n(u).default}});var h=t("./blur/BlurYFilter");Object.defineProperty(r,"BlurYFilter",{enumerable:!0,get:function(){return n(h).default}});var l=t("./colormatrix/ColorMatrixFilter");Object.defineProperty(r,"ColorMatrixFilter",{enumerable:!0,get:function(){return n(l).default}});var c=t("./void/VoidFilter");Object.defineProperty(r,"VoidFilter",{enumerable:!0,get:function(){return n(c).default}})},{"./blur/BlurFilter":142,"./blur/BlurXFilter":143,"./blur/BlurYFilter":144,"./colormatrix/ColorMatrixFilter":148,"./displacement/DisplacementFilter":149,"./fxaa/FXAAFilter":150,"./noise/NoiseFilter":152,"./void/VoidFilter":153}],152:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../../core"),h=n(u),l=(t("path"),function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.5,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Math.random();i(this,e);var s=o(this,t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) * uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    gl_FragColor = color;\n}\n"));return s.noise=r,s.seed=n,s}return s(e,t),a(e,[{key:"noise",get:function(){return this.uniforms.uNoise},set:function(t){this.uniforms.uNoise=t}},{key:"seed",get:function(){return this.uniforms.uSeed},set:function(t){this.uniforms.uSeed=t}}]),e}(h.Filter));r.default=l},{"../../core":64,path:22}],153:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../core"),u=n(a),h=(t("path"),function(t){function e(){i(this,e);var r=o(this,t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"));return r.glShaderKey="void",r}return s(e,t),e}(u.Filter));r.default=h},{"../../core":64,path:22}],154:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=t("../core"),a=n(s),u=function(){function t(){i(this,t),this.global=new a.Point,this.target=null,this.originalEvent=null,this.identifier=null,this.isPrimary=!1,this.button=0,this.buttons=0,this.width=0,this.height=0,this.tiltX=0,this.tiltY=0,this.pointerType=null,this.pressure=0,this.rotationAngle=0,this.twist=0,this.tangentialPressure=0}return t.prototype.getLocalPosition=function(t,e,r){return t.worldTransform.applyInverse(r||this.global,e)},t.prototype._copyEvent=function(t){t.isPrimary&&(this.isPrimary=!0),this.button=t.button,this.buttons=t.buttons,this.width=t.width,this.height=t.height,this.tiltX=t.tiltX,this.tiltY=t.tiltY,this.pointerType=t.pointerType,this.pressure=t.pressure,this.rotationAngle=t.rotationAngle,this.twist=t.twist||0,this.tangentialPressure=t.tangentialPressure||0},t.prototype._reset=function(){this.isPrimary=!1},o(t,[{key:"pointerId",get:function(){return this.identifier}}]),t}();r.default=u},{"../core":64}],155:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(){n(this,t),this.stopped=!1,this.target=null,this.currentTarget=null,this.type=null,this.data=null}return t.prototype.stopPropagation=function(){this.stopped=!0},t.prototype._reset=function(){this.stopped=!1,this.currentTarget=null,this.target=null},t}();r.default=i},{}],156:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=t("../core"),l=i(h),c=t("./InteractionData"),d=n(c),f=t("./InteractionEvent"),p=n(f),v=t("./InteractionTrackingData"),y=n(v),g=t("eventemitter3"),m=n(g),_=t("./interactiveTarget"),b=n(_);l.utils.mixins.delayMixin(l.DisplayObject.prototype,b.default);var x="MOUSE",T={target:null,data:{global:null}},w=function(t){function e(r,n){o(this,e);var i=s(this,t.call(this));return n=n||{},i.renderer=r,i.autoPreventDefault=void 0===n.autoPreventDefault||n.autoPreventDefault,i.interactionFrequency=n.interactionFrequency||10,i.mouse=new d.default,i.mouse.identifier=x,i.mouse.global.set(-999999),i.activeInteractionData={},i.activeInteractionData[x]=i.mouse,i.interactionDataPool=[],i.eventData=new p.default,i.interactionDOMElement=null,i.moveWhenInside=!1,i.eventsAdded=!1,i.mouseOverRenderer=!1,i.supportsTouchEvents="ontouchstart"in window,i.supportsPointerEvents=!!window.PointerEvent,i.onPointerUp=i.onPointerUp.bind(i),i.processPointerUp=i.processPointerUp.bind(i),i.onPointerCancel=i.onPointerCancel.bind(i),i.processPointerCancel=i.processPointerCancel.bind(i),i.onPointerDown=i.onPointerDown.bind(i),i.processPointerDown=i.processPointerDown.bind(i),i.onPointerMove=i.onPointerMove.bind(i),i.processPointerMove=i.processPointerMove.bind(i),i.onPointerOut=i.onPointerOut.bind(i),i.processPointerOverOut=i.processPointerOverOut.bind(i),i.onPointerOver=i.onPointerOver.bind(i),i.cursorStyles={default:"inherit",pointer:"pointer"},i.currentCursorMode=null,i.cursor=null,i._tempPoint=new l.Point,i.resolution=1,i.setTargetElement(i.renderer.view,i.renderer.resolution),i}return a(e,t),e.prototype.hitTest=function(t,e){return T.target=null,T.data.global=t,e||(e=this.renderer._lastObjectRendered),this.processInteractive(T,e,null,!0),T.target},e.prototype.setTargetElement=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.removeEvents(),this.interactionDOMElement=t,this.resolution=e,this.addEvents()},e.prototype.addEvents=function(){this.interactionDOMElement&&(l.ticker.shared.add(this.update,this,l.UPDATE_PRIORITY.INTERACTION),window.navigator.msPointerEnabled?(this.interactionDOMElement.style["-ms-content-zooming"]="none",this.interactionDOMElement.style["-ms-touch-action"]="none"):this.supportsPointerEvents&&(this.interactionDOMElement.style["touch-action"]="none"),this.supportsPointerEvents?(window.document.addEventListener("pointermove",this.onPointerMove,!0),this.interactionDOMElement.addEventListener("pointerdown",this.onPointerDown,!0),this.interactionDOMElement.addEventListener("pointerleave",this.onPointerOut,!0),this.interactionDOMElement.addEventListener("pointerover",this.onPointerOver,!0),window.addEventListener("pointercancel",this.onPointerCancel,!0),window.addEventListener("pointerup",this.onPointerUp,!0)):(window.document.addEventListener("mousemove",this.onPointerMove,!0),this.interactionDOMElement.addEventListener("mousedown",this.onPointerDown,!0),this.interactionDOMElement.addEventListener("mouseout",this.onPointerOut,!0),this.interactionDOMElement.addEventListener("mouseover",this.onPointerOver,!0),window.addEventListener("mouseup",this.onPointerUp,!0)),this.supportsTouchEvents&&(this.interactionDOMElement.addEventListener("touchstart",this.onPointerDown,!0),this.interactionDOMElement.addEventListener("touchcancel",this.onPointerCancel,!0),this.interactionDOMElement.addEventListener("touchend",this.onPointerUp,!0),this.interactionDOMElement.addEventListener("touchmove",this.onPointerMove,!0)),this.eventsAdded=!0)},e.prototype.removeEvents=function(){this.interactionDOMElement&&(l.ticker.shared.remove(this.update,this),window.navigator.msPointerEnabled?(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]=""):this.supportsPointerEvents&&(this.interactionDOMElement.style["touch-action"]=""),this.supportsPointerEvents?(window.document.removeEventListener("pointermove",this.onPointerMove,!0),this.interactionDOMElement.removeEventListener("pointerdown",this.onPointerDown,!0),this.interactionDOMElement.removeEventListener("pointerleave",this.onPointerOut,!0),this.interactionDOMElement.removeEventListener("pointerover",this.onPointerOver,!0),window.removeEventListener("pointercancel",this.onPointerCancel,!0),window.removeEventListener("pointerup",this.onPointerUp,!0)):(window.document.removeEventListener("mousemove",this.onPointerMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onPointerDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onPointerOut,!0),this.interactionDOMElement.removeEventListener("mouseover",this.onPointerOver,!0),window.removeEventListener("mouseup",this.onPointerUp,!0)),this.supportsTouchEvents&&(this.interactionDOMElement.removeEventListener("touchstart",this.onPointerDown,!0),this.interactionDOMElement.removeEventListener("touchcancel",this.onPointerCancel,!0),this.interactionDOMElement.removeEventListener("touchend",this.onPointerUp,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onPointerMove,!0)),this.interactionDOMElement=null,this.eventsAdded=!1)},e.prototype.update=function(t){if(this._deltaTime+=t,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this.interactionDOMElement)){if(this.didMove)return void(this.didMove=!1);this.cursor=null;for(var e in this.activeInteractionData)if(this.activeInteractionData.hasOwnProperty(e)){var r=this.activeInteractionData[e];if(r.originalEvent&&"touch"!==r.pointerType){var n=this.configureInteractionEventForDOMEvent(this.eventData,r.originalEvent,r);this.processInteractive(n,this.renderer._lastObjectRendered,this.processPointerOverOut,!0)}}this.setCursorMode(this.cursor)}},e.prototype.setCursorMode=function(t){if(t=t||"default",this.currentCursorMode!==t){this.currentCursorMode=t;var e=this.cursorStyles[t];if(e)switch("undefined"==typeof e?"undefined":u(e)){case"string":this.interactionDOMElement.style.cursor=e;break;case"function":e(t);break;case"object":Object.assign(this.interactionDOMElement.style,e)}else"string"!=typeof t||Object.prototype.hasOwnProperty.call(this.cursorStyles,t)||(this.interactionDOMElement.style.cursor=t)}},e.prototype.dispatchEvent=function(t,e,r){r.stopped||(r.currentTarget=t,r.type=e,t.emit(e,r),t[e]&&t[e](r))},e.prototype.mapPositionToPoint=function(t,e,r){var n=void 0;n=this.interactionDOMElement.parentElement?this.interactionDOMElement.getBoundingClientRect():{x:0,y:0,width:0,height:0};var i=navigator.isCocoonJS?this.resolution:1/this.resolution;t.x=(e-n.left)*(this.interactionDOMElement.width/n.width)*i,t.y=(r-n.top)*(this.interactionDOMElement.height/n.height)*i},e.prototype.processInteractive=function(t,e,r,n,i){if(!e||!e.visible)return!1;var o=t.data.global;i=e.interactive||i;var s=!1,a=i;if(e.hitArea?a=!1:n&&e._mask&&(e._mask.containsPoint(o)||(n=!1)),e.interactiveChildren&&e.children)for(var u=e.children,h=u.length-1;h>=0;h--){var l=u[h],c=this.processInteractive(t,l,r,n,a);if(c){if(!l.parent)continue;a=!1,c&&(t.target&&(n=!1),s=!0)}}return i&&(n&&!t.target&&(e.hitArea?(e.worldTransform.applyInverse(o,this._tempPoint),e.hitArea.contains(this._tempPoint.x,this._tempPoint.y)&&(s=!0)):e.containsPoint&&e.containsPoint(o)&&(s=!0)),e.interactive&&(s&&!t.target&&(t.target=e),r&&r(t,e,!!s))),s},e.prototype.onPointerDown=function(t){if(!this.supportsTouchEvents||"touch"!==t.pointerType){var e=this.normalizeToPointerData(t);this.autoPreventDefault&&e[0].isNormalized&&t.preventDefault();for(var r=e.length,n=0;n<r;n++){var i=e[n],o=this.getInteractionDataForPointerId(i),s=this.configureInteractionEventForDOMEvent(this.eventData,i,o);if(s.data.originalEvent=t,this.processInteractive(s,this.renderer._lastObjectRendered,this.processPointerDown,!0),this.emit("pointerdown",s),"touch"===i.pointerType)this.emit("touchstart",s);else if("mouse"===i.pointerType||"pen"===i.pointerType){var a=2===i.button;this.emit(a?"rightdown":"mousedown",this.eventData)}}}},e.prototype.processPointerDown=function(t,e,r){var n=t.data,i=t.data.identifier;if(r)if(e.trackedPointers[i]||(e.trackedPointers[i]=new y.default(i)),this.dispatchEvent(e,"pointerdown",t),"touch"===n.pointerType)this.dispatchEvent(e,"touchstart",t);else if("mouse"===n.pointerType||"pen"===n.pointerType){var o=2===n.button;o?e.trackedPointers[i].rightDown=!0:e.trackedPointers[i].leftDown=!0,this.dispatchEvent(e,o?"rightdown":"mousedown",t)}},e.prototype.onPointerComplete=function(t,e,r){for(var n=this.normalizeToPointerData(t),i=n.length,o=t.target!==this.interactionDOMElement?"outside":"",s=0;s<i;s++){var a=n[s],u=this.getInteractionDataForPointerId(a),h=this.configureInteractionEventForDOMEvent(this.eventData,a,u);if(h.data.originalEvent=t,this.processInteractive(h,this.renderer._lastObjectRendered,r,e||!o),this.emit(e?"pointercancel":"pointerup"+o,h),"mouse"===a.pointerType||"pen"===a.pointerType){var l=2===a.button;this.emit(l?"rightup"+o:"mouseup"+o,h)}else"touch"===a.pointerType&&(this.emit(e?"touchcancel":"touchend"+o,h),this.releaseInteractionDataForPointerId(a.pointerId,u))}},e.prototype.onPointerCancel=function(t){this.supportsTouchEvents&&"touch"===t.pointerType||this.onPointerComplete(t,!0,this.processPointerCancel)},e.prototype.processPointerCancel=function(t,e){var r=t.data,n=t.data.identifier;void 0!==e.trackedPointers[n]&&(delete e.trackedPointers[n],this.dispatchEvent(e,"pointercancel",t),"touch"===r.pointerType&&this.dispatchEvent(e,"touchcancel",t))},e.prototype.onPointerUp=function(t){this.supportsTouchEvents&&"touch"===t.pointerType||this.onPointerComplete(t,!1,this.processPointerUp)},e.prototype.processPointerUp=function(t,e,r){var n=t.data,i=t.data.identifier,o=e.trackedPointers[i],s="touch"===n.pointerType,a="mouse"===n.pointerType||"pen"===n.pointerType;if(a){var u=2===n.button,h=y.default.FLAGS,l=u?h.RIGHT_DOWN:h.LEFT_DOWN,c=void 0!==o&&o.flags&l;r?(this.dispatchEvent(e,u?"rightup":"mouseup",t),c&&this.dispatchEvent(e,u?"rightclick":"click",t)):c&&this.dispatchEvent(e,u?"rightupoutside":"mouseupoutside",t),o&&(u?o.rightDown=!1:o.leftDown=!1)}r?(this.dispatchEvent(e,"pointerup",t),s&&this.dispatchEvent(e,"touchend",t),o&&(this.dispatchEvent(e,"pointertap",t),s&&(this.dispatchEvent(e,"tap",t),o.over=!1))):o&&(this.dispatchEvent(e,"pointerupoutside",t),s&&this.dispatchEvent(e,"touchendoutside",t)),o&&o.none&&delete e.trackedPointers[i]},e.prototype.onPointerMove=function(t){if(!this.supportsTouchEvents||"touch"!==t.pointerType){var e=this.normalizeToPointerData(t);"mouse"===e[0].pointerType&&(this.didMove=!0,this.cursor=null);for(var r=e.length,n=0;n<r;n++){var i=e[n],o=this.getInteractionDataForPointerId(i),s=this.configureInteractionEventForDOMEvent(this.eventData,i,o);s.data.originalEvent=t;var a="touch"!==i.pointerType||this.moveWhenInside;this.processInteractive(s,this.renderer._lastObjectRendered,this.processPointerMove,a),this.emit("pointermove",s),"touch"===i.pointerType&&this.emit("touchmove",s),"mouse"!==i.pointerType&&"pen"!==i.pointerType||this.emit("mousemove",s)}"mouse"===e[0].pointerType&&this.setCursorMode(this.cursor)}},e.prototype.processPointerMove=function(t,e,r){var n=t.data,i="touch"===n.pointerType,o="mouse"===n.pointerType||"pen"===n.pointerType;o&&this.processPointerOverOut(t,e,r),this.moveWhenInside&&!r||(this.dispatchEvent(e,"pointermove",t),i&&this.dispatchEvent(e,"touchmove",t),o&&this.dispatchEvent(e,"mousemove",t))},e.prototype.onPointerOut=function(t){if(!this.supportsTouchEvents||"touch"!==t.pointerType){var e=this.normalizeToPointerData(t),r=e[0];"mouse"===r.pointerType&&(this.mouseOverRenderer=!1,this.setCursorMode(null));var n=this.getInteractionDataForPointerId(r),i=this.configureInteractionEventForDOMEvent(this.eventData,r,n);i.data.originalEvent=r,this.processInteractive(i,this.renderer._lastObjectRendered,this.processPointerOverOut,!1),this.emit("pointerout",i),"mouse"===r.pointerType||"pen"===r.pointerType?this.emit("mouseout",i):this.releaseInteractionDataForPointerId(n.identifier)}},e.prototype.processPointerOverOut=function(t,e,r){var n=t.data,i=t.data.identifier,o="mouse"===n.pointerType||"pen"===n.pointerType,s=e.trackedPointers[i];r&&!s&&(s=e.trackedPointers[i]=new y.default(i)),void 0!==s&&(r&&this.mouseOverRenderer?(s.over||(s.over=!0,this.dispatchEvent(e,"pointerover",t),o&&this.dispatchEvent(e,"mouseover",t)),o&&null===this.cursor&&(this.cursor=e.cursor)):s.over&&(s.over=!1,this.dispatchEvent(e,"pointerout",this.eventData),o&&this.dispatchEvent(e,"mouseout",t),s.none&&delete e.trackedPointers[i]))},e.prototype.onPointerOver=function(t){var e=this.normalizeToPointerData(t),r=e[0],n=this.getInteractionDataForPointerId(r),i=this.configureInteractionEventForDOMEvent(this.eventData,r,n);i.data.originalEvent=r,"mouse"===r.pointerType&&(this.mouseOverRenderer=!0),this.emit("pointerover",i),"mouse"!==r.pointerType&&"pen"!==r.pointerType||this.emit("mouseover",i)},e.prototype.getInteractionDataForPointerId=function(t){var e=t.pointerId,r=void 0;return e===x||"mouse"===t.pointerType?r=this.mouse:this.activeInteractionData[e]?r=this.activeInteractionData[e]:(r=this.interactionDataPool.pop()||new d.default,r.identifier=e,this.activeInteractionData[e]=r),r._copyEvent(t),r},e.prototype.releaseInteractionDataForPointerId=function(t){var e=this.activeInteractionData[t];e&&(delete this.activeInteractionData[t],e._reset(),this.interactionDataPool.push(e))},e.prototype.configureInteractionEventForDOMEvent=function(t,e,r){return t.data=r,this.mapPositionToPoint(r.global,e.clientX,e.clientY),navigator.isCocoonJS&&"touch"===e.pointerType&&(r.global.x=r.global.x/this.resolution,r.global.y=r.global.y/this.resolution),"touch"===e.pointerType&&(e.globalX=r.global.x,e.globalY=r.global.y),r.originalEvent=e,t._reset(),t},e.prototype.normalizeToPointerData=function(t){var e=[];if(this.supportsTouchEvents&&t instanceof TouchEvent)for(var r=0,n=t.changedTouches.length;r<n;r++){var i=t.changedTouches[r];"undefined"==typeof i.button&&(i.button=t.touches.length?1:0),"undefined"==typeof i.buttons&&(i.buttons=t.touches.length?1:0),"undefined"==typeof i.isPrimary&&(i.isPrimary=1===t.touches.length&&"touchstart"===t.type),"undefined"==typeof i.width&&(i.width=i.radiusX||1),"undefined"==typeof i.height&&(i.height=i.radiusY||1),"undefined"==typeof i.tiltX&&(i.tiltX=0),"undefined"==typeof i.tiltY&&(i.tiltY=0),"undefined"==typeof i.pointerType&&(i.pointerType="touch"),"undefined"==typeof i.pointerId&&(i.pointerId=i.identifier||0),"undefined"==typeof i.pressure&&(i.pressure=i.force||.5),i.twist=0,i.tangentialPressure=0,"undefined"==typeof i.layerX&&(i.layerX=i.offsetX=i.clientX),"undefined"==typeof i.layerY&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,e.push(i)}else!(t instanceof MouseEvent)||this.supportsPointerEvents&&t instanceof window.PointerEvent?e.push(t):("undefined"==typeof t.isPrimary&&(t.isPrimary=!0),"undefined"==typeof t.width&&(t.width=1),"undefined"==typeof t.height&&(t.height=1),"undefined"==typeof t.tiltX&&(t.tiltX=0),"undefined"==typeof t.tiltY&&(t.tiltY=0),"undefined"==typeof t.pointerType&&(t.pointerType="mouse"),"undefined"==typeof t.pointerId&&(t.pointerId=x),"undefined"==typeof t.pressure&&(t.pressure=.5),t.twist=0,t.tangentialPressure=0,t.isNormalized=!0,e.push(t));return e},e.prototype.destroy=function(){this.removeEvents(),this.removeAllListeners(),this.renderer=null,this.mouse=null,this.eventData=null,this.interactionDOMElement=null,this.onPointerDown=null,this.processPointerDown=null,this.onPointerUp=null,this.processPointerUp=null,this.onPointerCancel=null,this.processPointerCancel=null,this.onPointerMove=null,this.processPointerMove=null,this.onPointerOut=null,this.processPointerOverOut=null,this.onPointerOver=null,this._tempPoint=null},e}(m.default);r.default=w,l.WebGLRenderer.registerPlugin("interaction",w),l.CanvasRenderer.registerPlugin("interaction",w)},{"../core":64,"./InteractionData":154,"./InteractionEvent":155,"./InteractionTrackingData":157,"./interactiveTarget":159,eventemitter3:3}],157:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=function(){function t(e){n(this,t),this._pointerId=e,this._flags=t.FLAGS.NONE}return t.prototype._doSet=function(t,e){e?this._flags=this._flags|t:this._flags=this._flags&~t},i(t,[{key:"pointerId",get:function(){return this._pointerId}},{key:"flags",get:function(){return this._flags},set:function(t){this._flags=t}},{key:"none",get:function(){return this._flags===this.constructor.FLAGS.NONE}},{key:"over",get:function(){return 0!==(this._flags&this.constructor.FLAGS.OVER)},set:function(t){this._doSet(this.constructor.FLAGS.OVER,t)}},{key:"rightDown",get:function(){return 0!==(this._flags&this.constructor.FLAGS.RIGHT_DOWN)},set:function(t){this._doSet(this.constructor.FLAGS.RIGHT_DOWN,t)}},{key:"leftDown",get:function(){return 0!==(this._flags&this.constructor.FLAGS.LEFT_DOWN)},set:function(t){this._doSet(this.constructor.FLAGS.LEFT_DOWN,t)}}]),t}();r.default=o,o.FLAGS=Object.freeze({NONE:0,OVER:1,LEFT_DOWN:2,RIGHT_DOWN:4})},{}],158:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./InteractionData");Object.defineProperty(r,"InteractionData",{enumerable:!0,get:function(){return n(i).default}});var o=t("./InteractionManager");Object.defineProperty(r,"InteractionManager",{enumerable:!0,get:function(){return n(o).default}});var s=t("./interactiveTarget");Object.defineProperty(r,"interactiveTarget",{enumerable:!0,get:function(){return n(s).default}})},{"./InteractionData":154,"./InteractionManager":156,"./interactiveTarget":159}],159:[function(t,e,r){"use strict";r.__esModule=!0,r.default={interactive:!1,interactiveChildren:!0,hitArea:null,get buttonMode(){return"pointer"===this.cursor},set buttonMode(t){t?this.cursor="pointer":"pointer"===this.cursor&&(this.cursor=null)},cursor:null,get trackedPointers(){return void 0===this._trackedPointers&&(this._trackedPointers={}),this._trackedPointers},_trackedPointers:void 0}},{}],160:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){t.bitmapFont=h.BitmapText.registerFont(t.data,e)}r.__esModule=!0,r.parse=i,r.default=function(){return function(t,e){if(!t.data||t.type!==u.Resource.TYPE.XML)return void e();if(0===t.data.getElementsByTagName("page").length||0===t.data.getElementsByTagName("info").length||null===t.data.getElementsByTagName("info")[0].getAttribute("face"))return void e();var r=t.isDataUrl?"":s.dirname(t.url);t.isDataUrl&&("."===r&&(r=""),this.baseUrl&&r&&("/"===this.baseUrl.charAt(this.baseUrl.length-1)&&(r+="/"),r=r.replace(this.baseUrl,""))),r&&"/"!==r.charAt(r.length-1)&&(r+="/");var n=r+t.data.getElementsByTagName("page")[0].getAttribute("file");if(a.utils.TextureCache[n])i(t,a.utils.TextureCache[n]),e();else{var o={crossOrigin:t.crossOrigin,loadType:u.Resource.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata,parentResource:t};this.add(t.name+"_image",n,o,function(r){i(t,r.texture),e()})}}};var o=t("path"),s=n(o),a=t("../core"),u=t("resource-loader"),h=t("../extras")},{"../core":64,"../extras":140,path:22,"resource-loader":35}],161:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.shared=r.Resource=r.textureParser=r.getResourcePath=r.spritesheetParser=r.parseBitmapFontData=r.bitmapFontParser=r.Loader=void 0;var i=t("./bitmapFontParser");Object.defineProperty(r,"bitmapFontParser",{enumerable:!0,get:function(){return n(i).default}}),Object.defineProperty(r,"parseBitmapFontData",{enumerable:!0,get:function(){return i.parse}});var o=t("./spritesheetParser");Object.defineProperty(r,"spritesheetParser",{enumerable:!0,get:function(){return n(o).default}}),Object.defineProperty(r,"getResourcePath",{enumerable:!0,get:function(){return o.getResourcePath}});var s=t("./textureParser");Object.defineProperty(r,"textureParser",{enumerable:!0,get:function(){return n(s).default}});var a=t("resource-loader");Object.defineProperty(r,"Resource",{enumerable:!0,get:function(){return a.Resource}});var u=t("../core/Application"),h=n(u),l=t("./loader"),c=n(l);r.Loader=c.default;var d=new c.default;d.destroy=function(){},r.shared=d;var f=h.default.prototype;f._loader=null,Object.defineProperty(f,"loader",{get:function(){if(!this._loader){var t=this._options.sharedLoader;this._loader=t?d:new c.default}return this._loader}}),f._parentDestroy=f.destroy,f.destroy=function(t){this._loader&&(this._loader.destroy(),this._loader=null),this._parentDestroy(t)}},{"../core/Application":42,"./bitmapFontParser":160,"./loader":162,"./spritesheetParser":163,"./textureParser":164,"resource-loader":35}],162:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("resource-loader"),u=n(a),h=t("resource-loader/lib/middlewares/parsing/blob"),l=t("eventemitter3"),c=n(l),d=t("./textureParser"),f=n(d),p=t("./spritesheetParser"),v=n(p),y=t("./bitmapFontParser"),g=n(y),m=function(t){function e(r,n){i(this,e);var s=o(this,t.call(this,r,n));c.default.call(s);for(var a=0;a<e._pixiMiddleware.length;++a)s.use(e._pixiMiddleware[a]());return s.onStart.add(function(t){return s.emit("start",t)}),s.onProgress.add(function(t,e){return s.emit("progress",t,e)}),s.onError.add(function(t,e,r){return s.emit("error",t,e,r)}),s.onLoad.add(function(t,e){return s.emit("load",t,e)}),s.onComplete.add(function(t,e){return s.emit("complete",t,e)}),s}return s(e,t),e.addPixiMiddleware=function(t){e._pixiMiddleware.push(t)},e.prototype.destroy=function(){this.removeAllListeners(),this.reset()},e}(u.default);r.default=m;for(var _ in c.default.prototype)m.prototype[_]=c.default.prototype[_];m._pixiMiddleware=[h.blobMiddlewareFactory,f.default,v.default,g.default];var b=u.default.Resource;b.setExtensionXhrType("fnt",b.XHR_RESPONSE_TYPE.DOCUMENT)},{"./bitmapFontParser":160,"./spritesheetParser":163,"./textureParser":164,eventemitter3:3,"resource-loader":35,"resource-loader/lib/middlewares/parsing/blob":36}],163:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return t.isDataUrl?t.data.meta.image:a.default.resolve(t.url.replace(e,""),t.data.meta.image)}r.__esModule=!0,r.default=function(){return function(t,e){var r=t.name+"_image";if(!t.data||t.type!==o.Resource.TYPE.JSON||!t.data.frames||this.resources[r])return void e();var n={crossOrigin:t.crossOrigin,loadType:o.Resource.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata,parentResource:t},s=i(t,this.baseUrl);this.add(r,s,n,function(r){var n=new u.Spritesheet(r.texture.baseTexture,t.data,t.url);n.parse(function(){t.spritesheet=n,t.textures=n.textures,e()})})}},r.getResourcePath=i;var o=t("resource-loader"),s=t("url"),a=n(s),u=t("../core")},{"../core":64,"resource-loader":35,url:28}],164:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.default=function(){return function(t,e){t.data&&t.type===i.Resource.TYPE.IMAGE&&(t.texture=s.default.fromLoader(t.data,t.url,t.name)),e()}};var i=t("resource-loader"),o=t("../core/textures/Texture"),s=n(o)},{"../core/textures/Texture":114,"resource-loader":35}],165:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),h=t("../core"),l=i(h),c=t("../extras/TextureTransform"),d=n(c),f=new l.Point,p=new l.Polygon,v=function(t){function e(r,n,i,a,u){o(this,e);var h=s(this,t.call(this));return h._texture=r,h.uvs=i||new Float32Array([0,0,1,0,1,1,0,1]),h.vertices=n||new Float32Array([0,0,100,0,100,100,0,100]),h.indices=a||new Uint16Array([0,1,3,2]),h.dirty=0,h.indexDirty=0,h.blendMode=l.BLEND_MODES.NORMAL,h.canvasPadding=0,h.drawMode=u||e.DRAW_MODES.TRIANGLE_MESH,h.shader=null,h.tintRgb=new Float32Array([1,1,1]),h._glDatas={},h._uvTransform=new d.default(r),h.uploadUvTransform=!1,h.pluginName="mesh",h}return a(e,t),e.prototype._renderWebGL=function(t){this.refresh(),t.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this)},e.prototype._renderCanvas=function(t){this.refresh(),t.plugins[this.pluginName].render(this)},e.prototype._onTextureUpdate=function(){this._uvTransform.texture=this._texture,this.refresh()},e.prototype.multiplyUvs=function(){this.uploadUvTransform||this._uvTransform.multiplyUvs(this.uvs)},e.prototype.refresh=function(t){this._uvTransform.update(t)&&this._refresh()},e.prototype._refresh=function(){},e.prototype._calculateBounds=function(){this._bounds.addVertices(this.transform,this.vertices,0,this.vertices.length)},e.prototype.containsPoint=function(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,f);for(var r=this.vertices,n=p.points,i=this.indices,o=this.indices.length,s=this.drawMode===e.DRAW_MODES.TRIANGLES?3:1,a=0;a+2<o;a+=s){var u=2*i[a],h=2*i[a+1],l=2*i[a+2];if(n[0]=r[u],n[1]=r[u+1],n[2]=r[h],n[3]=r[h+1],n[4]=r[l],n[5]=r[l+1],p.contains(f.x,f.y))return!0}return!1},u(e,[{key:"texture",get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}},{key:"tint",get:function(){return l.utils.rgb2hex(this.tintRgb)},set:function(t){this.tintRgb=l.utils.hex2rgb(t,this.tintRgb)}}]),e}(l.Container);r.default=v,v.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1}},{"../core":64,"../extras/TextureTransform":135}],166:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("./Plane"),h=n(u),l=10,c=function(t){function e(r,n,s,a,u){i(this,e);var h=o(this,t.call(this,r,4,4));return h._origWidth=r.orig.width,h._origHeight=r.orig.height,h._width=h._origWidth,h._height=h._origHeight,h.leftWidth="undefined"!=typeof n?n:l,h.rightWidth="undefined"!=typeof a?a:l,h.topHeight="undefined"!=typeof s?s:l,h.bottomHeight="undefined"!=typeof u?u:l,h.refresh(!0),h}return s(e,t),e.prototype.updateHorizontalVertices=function(){var t=this.vertices;t[9]=t[11]=t[13]=t[15]=this._topHeight,t[17]=t[19]=t[21]=t[23]=this._height-this._bottomHeight,t[25]=t[27]=t[29]=t[31]=this._height},e.prototype.updateVerticalVertices=function(){var t=this.vertices;t[2]=t[10]=t[18]=t[26]=this._leftWidth,t[4]=t[12]=t[20]=t[28]=this._width-this._rightWidth,t[6]=t[14]=t[22]=t[30]=this._width},e.prototype._renderCanvas=function(t){var e=t.context;e.globalAlpha=this.worldAlpha;var r=this.worldTransform,n=t.resolution;t.roundPixels?e.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n|0,r.ty*n|0):e.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n,r.ty*n);var i=this._texture.baseTexture,o=i.source,s=i.width,a=i.height;this.drawSegment(e,o,s,a,0,1,10,11),this.drawSegment(e,o,s,a,2,3,12,13),this.drawSegment(e,o,s,a,4,5,14,15),this.drawSegment(e,o,s,a,8,9,18,19),this.drawSegment(e,o,s,a,10,11,20,21),this.drawSegment(e,o,s,a,12,13,22,23),this.drawSegment(e,o,s,a,16,17,26,27),this.drawSegment(e,o,s,a,18,19,28,29),this.drawSegment(e,o,s,a,20,21,30,31)},e.prototype.drawSegment=function(t,e,r,n,i,o,s,a){var u=this.uvs,h=this.vertices,l=(u[s]-u[i])*r,c=(u[a]-u[o])*n,d=h[s]-h[i],f=h[a]-h[o];l<1&&(l=1),c<1&&(c=1),d<1&&(d=1),f<1&&(f=1),t.drawImage(e,u[i]*r,u[o]*n,l,c,h[i],h[o],d,f)},e.prototype._refresh=function(){t.prototype._refresh.call(this);var e=this.uvs,r=this._texture;this._origWidth=r.orig.width,this._origHeight=r.orig.height;var n=1/this._origWidth,i=1/this._origHeight;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1,e[2]=e[10]=e[18]=e[26]=n*this._leftWidth,e[4]=e[12]=e[20]=e[28]=1-n*this._rightWidth,e[9]=e[11]=e[13]=e[15]=i*this._topHeight,e[17]=e[19]=e[21]=e[23]=1-i*this._bottomHeight,this.updateHorizontalVertices(),this.updateVerticalVertices(),this.dirty=!0,this.multiplyUvs()},a(e,[{key:"width",get:function(){return this._width},set:function(t){this._width=t,this._refresh()}},{key:"height",get:function(){return this._height},set:function(t){this._height=t,this._refresh()}},{key:"leftWidth",get:function(){return this._leftWidth},set:function(t){this._leftWidth=t,this._refresh()}},{key:"rightWidth",get:function(){return this._rightWidth},set:function(t){this._rightWidth=t,this._refresh()}},{key:"topHeight",get:function(){return this._topHeight},set:function(t){this._topHeight=t,this._refresh()}},{key:"bottomHeight",get:function(){return this._bottomHeight},set:function(t){this._bottomHeight=t,this._refresh()}}]),e}(h.default);r.default=c},{"./Plane":167}],167:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./Mesh"),u=n(a),h=function(t){function e(r,n,s){i(this,e);var a=o(this,t.call(this,r));return a._ready=!0,a.verticesX=n||10,a.verticesY=s||10,a.drawMode=u.default.DRAW_MODES.TRIANGLES,a.refresh(),a}return s(e,t),e.prototype._refresh=function(){for(var t=this._texture,e=this.verticesX*this.verticesY,r=[],n=[],i=[],o=[],s=this.verticesX-1,a=this.verticesY-1,u=t.width/s,h=t.height/a,l=0;l<e;l++){var c=l%this.verticesX,d=l/this.verticesX|0;r.push(c*u,d*h),i.push(c/s,d/a)}for(var f=s*a,p=0;p<f;p++){var v=p%s,y=p/s|0,g=y*this.verticesX+v,m=y*this.verticesX+v+1,_=(y+1)*this.verticesX+v,b=(y+1)*this.verticesX+v+1;o.push(g,m,_),o.push(m,b,_)}this.vertices=new Float32Array(r),this.uvs=new Float32Array(i),this.colors=new Float32Array(n),this.indices=new Uint16Array(o),this.indexDirty=!0,this.multiplyUvs()},e.prototype._onTextureUpdate=function(){u.default.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()},e}(u.default);r.default=h},{"./Mesh":165}],168:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("./Mesh"),u=n(a),h=function(t){function e(r,n){i(this,e);var s=o(this,t.call(this,r));return s.points=n,s.vertices=new Float32Array(4*n.length),s.uvs=new Float32Array(4*n.length),s.colors=new Float32Array(2*n.length),s.indices=new Uint16Array(2*n.length),s.autoUpdate=!0,s.refresh(),s}return s(e,t),e.prototype._refresh=function(){var t=this.points;if(!(t.length<1)&&this._texture._uvs){this.vertices.length/4!==t.length&&(this.vertices=new Float32Array(4*t.length),this.uvs=new Float32Array(4*t.length),this.colors=new Float32Array(2*t.length),this.indices=new Uint16Array(2*t.length));var e=this.uvs,r=this.indices,n=this.colors;e[0]=0,e[1]=0,e[2]=0,e[3]=1,n[0]=1,n[1]=1,r[0]=0,r[1]=1;for(var i=t.length,o=1;o<i;o++){var s=4*o,a=o/(i-1);e[s]=a,e[s+1]=0,e[s+2]=a,e[s+3]=1,s=2*o,n[s]=1,n[s+1]=1,s=2*o,r[s]=s,r[s+1]=s+1}this.dirty++,this.indexDirty++,this.multiplyUvs(),this.refreshVertices()}},e.prototype.refreshVertices=function(){var t=this.points;if(!(t.length<1))for(var e=t[0],r=void 0,n=0,i=0,o=this.vertices,s=t.length,a=0;a<s;a++){var u=t[a],h=4*a;r=a<t.length-1?t[a+1]:u,i=-(r.x-e.x),n=r.y-e.y;var l=10*(1-a/(s-1));l>1&&(l=1);var c=Math.sqrt(n*n+i*i),d=this._texture.height/2;n/=c,i/=c,n*=d,i*=d,o[h]=u.x+n,o[h+1]=u.y+i,o[h+2]=u.x-n,o[h+3]=u.y-i,e=u}},e.prototype.updateTransform=function(){this.autoUpdate&&this.refreshVertices(),this.containerUpdateTransform()},e}(u.default);r.default=h},{"./Mesh":165}],169:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var s=t("../../core"),a=i(s),u=t("../Mesh"),h=n(u),l=function(){function t(e){o(this,t),this.renderer=e}return t.prototype.render=function(t){var e=this.renderer,r=e.context,n=t.worldTransform,i=e.resolution;e.roundPixels?r.setTransform(n.a*i,n.b*i,n.c*i,n.d*i,n.tx*i|0,n.ty*i|0):r.setTransform(n.a*i,n.b*i,n.c*i,n.d*i,n.tx*i,n.ty*i),e.setBlendMode(t.blendMode),t.drawMode===h.default.DRAW_MODES.TRIANGLE_MESH?this._renderTriangleMesh(t):this._renderTriangles(t)},t.prototype._renderTriangleMesh=function(t){for(var e=t.vertices.length/2,r=0;r<e-2;r++){var n=2*r;this._renderDrawTriangle(t,n,n+2,n+4)}},t.prototype._renderTriangles=function(t){for(var e=t.indices,r=e.length,n=0;n<r;n+=3){var i=2*e[n],o=2*e[n+1],s=2*e[n+2];this._renderDrawTriangle(t,i,o,s)}},t.prototype._renderDrawTriangle=function(t,e,r,n){var i=this.renderer.context,o=t.uvs,s=t.vertices,a=t._texture;if(a.valid){var u=a.baseTexture,h=u.source,l=u.width,c=u.height,d=void 0,f=void 0,p=void 0,v=void 0,y=void 0,g=void 0;if(t.uploadUvTransform){var m=t._uvTransform.mapCoord;d=(o[e]*m.a+o[e+1]*m.c+m.tx)*u.width,f=(o[r]*m.a+o[r+1]*m.c+m.tx)*u.width,p=(o[n]*m.a+o[n+1]*m.c+m.tx)*u.width,v=(o[e]*m.b+o[e+1]*m.d+m.ty)*u.height,y=(o[r]*m.b+o[r+1]*m.d+m.ty)*u.height,g=(o[n]*m.b+o[n+1]*m.d+m.ty)*u.height}else d=o[e]*u.width,f=o[r]*u.width,p=o[n]*u.width,v=o[e+1]*u.height,y=o[r+1]*u.height,g=o[n+1]*u.height;var _=s[e],b=s[r],x=s[n],T=s[e+1],w=s[r+1],E=s[n+1];if(t.canvasPadding>0){var S=t.canvasPadding/t.worldTransform.a,O=t.canvasPadding/t.worldTransform.d,P=(_+b+x)/3,M=(T+w+E)/3,C=_-P,R=T-M,A=Math.sqrt(C*C+R*R);_=P+C/A*(A+S),T=M+R/A*(A+O),C=b-P,R=w-M,A=Math.sqrt(C*C+R*R),b=P+C/A*(A+S),w=M+R/A*(A+O),C=x-P,R=E-M,A=Math.sqrt(C*C+R*R),x=P+C/A*(A+S),E=M+R/A*(A+O)}i.save(),i.beginPath(),i.moveTo(_,T),i.lineTo(b,w),i.lineTo(x,E),i.closePath(),i.clip();var I=d*y+v*p+f*g-y*p-v*f-d*g,D=_*y+v*x+b*g-y*x-v*b-_*g,L=d*b+_*p+f*x-b*p-_*f-d*x,N=d*y*x+v*b*p+_*f*g-_*y*p-v*f*x-d*b*g,F=T*y+v*E+w*g-y*E-v*w-T*g,B=d*w+T*p+f*E-w*p-T*f-d*E,k=d*y*E+v*w*p+T*f*g-T*y*p-v*f*E-d*w*g;i.transform(D/I,F/I,L/I,B/I,N/I,k/I),i.drawImage(h,0,0,l*u.resolution,c*u.resolution,0,0,l,c),i.restore()}},t.prototype.renderMeshFlat=function(t){var e=this.renderer.context,r=t.vertices,n=r.length/2;e.beginPath();for(var i=1;i<n-2;++i){var o=2*i,s=r[o],a=r[o+1],u=r[o+2],h=r[o+3],l=r[o+4],c=r[o+5];e.moveTo(s,a),e.lineTo(u,h),e.lineTo(l,c)}e.fillStyle="#FF0000",e.fill(),e.closePath()},t.prototype.destroy=function(){this.renderer=null},t}();r.default=l,a.CanvasRenderer.registerPlugin("mesh",l)},{"../../core":64,"../Mesh":165}],170:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./Mesh");Object.defineProperty(r,"Mesh",{enumerable:!0,get:function(){return n(i).default}});var o=t("./webgl/MeshRenderer");Object.defineProperty(r,"MeshRenderer",{enumerable:!0,get:function(){return n(o).default}});var s=t("./canvas/CanvasMeshRenderer");Object.defineProperty(r,"CanvasMeshRenderer",{enumerable:!0,get:function(){return n(s).default}});var a=t("./Plane");Object.defineProperty(r,"Plane",{enumerable:!0,get:function(){return n(a).default}});var u=t("./NineSlicePlane");Object.defineProperty(r,"NineSlicePlane",{enumerable:!0,get:function(){return n(u).default}});var h=t("./Rope");Object.defineProperty(r,"Rope",{enumerable:!0,get:function(){return n(h).default}})},{"./Mesh":165,"./NineSlicePlane":166,"./Plane":167,"./Rope":168,"./canvas/CanvasMeshRenderer":169,"./webgl/MeshRenderer":171}],171:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=t("../../core"),h=i(u),l=t("pixi-gl-core"),c=n(l),d=t("../Mesh"),f=n(d),p=(t("path"),h.Matrix.IDENTITY),v=function(t){function e(r){o(this,e);var n=s(this,t.call(this,r));return n.shader=null,n}return a(e,t),e.prototype.onContextChange=function(){var t=this.renderer.gl;this.shader=new h.Shader(t,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}\n","varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}\n")},e.prototype.render=function(t){var e=this.renderer,r=e.gl,n=t._texture;if(n.valid){var i=t._glDatas[e.CONTEXT_UID];i||(e.bindVao(null),i={shader:this.shader,vertexBuffer:c.default.GLBuffer.createVertexBuffer(r,t.vertices,r.STREAM_DRAW),uvBuffer:c.default.GLBuffer.createVertexBuffer(r,t.uvs,r.STREAM_DRAW),indexBuffer:c.default.GLBuffer.createIndexBuffer(r,t.indices,r.STATIC_DRAW),vao:null,dirty:t.dirty,indexDirty:t.indexDirty},i.vao=new c.default.VertexArrayObject(r).addIndex(i.indexBuffer).addAttribute(i.vertexBuffer,i.shader.attributes.aVertexPosition,r.FLOAT,!1,8,0).addAttribute(i.uvBuffer,i.shader.attributes.aTextureCoord,r.FLOAT,!1,8,0),t._glDatas[e.CONTEXT_UID]=i),e.bindVao(i.vao),t.dirty!==i.dirty&&(i.dirty=t.dirty,i.uvBuffer.upload(t.uvs)),t.indexDirty!==i.indexDirty&&(i.indexDirty=t.indexDirty,i.indexBuffer.upload(t.indices)),i.vertexBuffer.upload(t.vertices),e.bindShader(i.shader),i.shader.uniforms.uSampler=e.bindTexture(n),e.state.setBlendMode(h.utils.correctBlendMode(t.blendMode,n.baseTexture.premultipliedAlpha)),i.shader.uniforms.uTransform&&(t.uploadUvTransform?i.shader.uniforms.uTransform=t._uvTransform.mapCoord.toArray(!0):i.shader.uniforms.uTransform=p.toArray(!0)),i.shader.uniforms.translationMatrix=t.worldTransform.toArray(!0),i.shader.uniforms.uColor=h.utils.premultiplyRgba(t.tintRgb,t.worldAlpha,i.shader.uniforms.uColor,n.baseTexture.premultipliedAlpha);var o=t.drawMode===f.default.DRAW_MODES.TRIANGLE_MESH?r.TRIANGLE_STRIP:r.TRIANGLES;i.vao.draw(o,t.indices.length,0)}},e}(h.ObjectRenderer);r.default=v,h.WebGLRenderer.registerPlugin("mesh",v)},{"../../core":64,"../Mesh":165,path:22,"pixi-gl-core":12}],172:[function(t,e,r){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=t("../core"),h=n(u),l=t("../core/utils"),c=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1500,n=arguments[1],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:16384;i(this,e);var a=o(this,t.call(this)),u=16384;return s>u&&(s=u),s>r&&(s=r),a._properties=[!1,!0,!1,!1,!1],a._maxSize=r,a._batchSize=s,a._glBuffers={},a._bufferToUpdate=0,a.interactiveChildren=!1,a.blendMode=h.BLEND_MODES.NORMAL,a.roundPixels=!0,a.baseTexture=null,a.setProperties(n),a._tint=0,a.tintRgb=new Float32Array(4),a.tint=16777215,a}return s(e,t),e.prototype.setProperties=function(t){t&&(this._properties[0]="scale"in t?!!t.scale:this._properties[0],this._properties[1]="position"in t?!!t.position:this._properties[1],this._properties[2]="rotation"in t?!!t.rotation:this._properties[2],this._properties[3]="uvs"in t?!!t.uvs:this._properties[3],this._properties[4]="alpha"in t?!!t.alpha:this._properties[4])},e.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},e.prototype.renderWebGL=function(t){var e=this;this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable&&(this.baseTexture||(this.baseTexture=this.children[0]._texture.baseTexture,this.baseTexture.hasLoaded||this.baseTexture.once("update",function(){return e.onChildrenChange(0)})),t.setObjectRenderer(t.plugins.particle),t.plugins.particle.render(this))},e.prototype.onChildrenChange=function(t){var e=Math.floor(t/this._batchSize);e<this._bufferToUpdate&&(this._bufferToUpdate=e)},e.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable){var e=t.context,r=this.worldTransform,n=!0,i=0,o=0,s=0,a=0,u=t.blendModes[this.blendMode];u!==e.globalCompositeOperation&&(e.globalCompositeOperation=u),e.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var h=0;h<this.children.length;++h){var l=this.children[h];if(l.visible){var c=l._texture.frame;if(e.globalAlpha=this.worldAlpha*l.alpha,l.rotation%(2*Math.PI)===0)n&&(e.setTransform(r.a,r.b,r.c,r.d,r.tx*t.resolution,r.ty*t.resolution),n=!1),i=l.anchor.x*(-c.width*l.scale.x)+l.position.x+.5,o=l.anchor.y*(-c.height*l.scale.y)+l.position.y+.5,s=c.width*l.scale.x,a=c.height*l.scale.y;else{n||(n=!0),l.displayObjectUpdateTransform();var d=l.worldTransform;t.roundPixels?e.setTransform(d.a,d.b,d.c,d.d,d.tx*t.resolution|0,d.ty*t.resolution|0):e.setTransform(d.a,d.b,d.c,d.d,d.tx*t.resolution,d.ty*t.resolution),i=l.anchor.x*-c.width+.5,o=l.anchor.y*-c.height+.5,s=c.width,a=c.height}var f=l._texture.baseTexture.resolution;e.drawImage(l._texture.baseTexture.source,c.x*f,c.y*f,c.width*f,c.height*f,i*t.resolution,o*t.resolution,s*t.resolution,a*t.resolution)}}}},e.prototype.destroy=function(e){if(t.prototype.destroy.call(this,e),this._buffers)for(var r=0;r<this._buffers.length;++r)this._buffers[r].destroy();this._properties=null,this._buffers=null},a(e,[{key:"tint",get:function(){return this._tint},set:function(t){this._tint=t,(0,l.hex2rgb)(t,this.tintRgb)}}]),e}(h.Container);r.default=c},{"../core":64,"../core/utils":123}],173:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./ParticleContainer");Object.defineProperty(r,"ParticleContainer",{enumerable:!0,get:function(){return n(i).default}});var o=t("./webgl/ParticleRenderer");Object.defineProperty(r,"ParticleRenderer",{enumerable:!0,get:function(){return n(o).default}})},{"./ParticleContainer":172,"./webgl/ParticleRenderer":175}],174:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var o=t("pixi-gl-core"),s=n(o),a=t("../../core/utils/createIndicesForQuads"),u=n(a),h=function(){function t(e,r,n,o){i(this,t),this.gl=e,this.vertSize=2,this.vertByteSize=4*this.vertSize,this.size=o,this.dynamicProperties=[],this.staticProperties=[];for(var s=0;s<r.length;++s){var a=r[s];a={attribute:a.attribute,size:a.size,uploadFunction:a.uploadFunction,offset:a.offset},n[s]?this.dynamicProperties.push(a):this.staticProperties.push(a)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.initBuffers()}return t.prototype.initBuffers=function(){var t=this.gl,e=0;this.indices=(0,u.default)(this.size),this.indexBuffer=s.default.GLBuffer.createIndexBuffer(t,this.indices,t.STATIC_DRAW),this.dynamicStride=0;for(var r=0;r<this.dynamicProperties.length;++r){var n=this.dynamicProperties[r];n.offset=e,e+=n.size,this.dynamicStride+=n.size}this.dynamicData=new Float32Array(this.size*this.dynamicStride*4),this.dynamicBuffer=s.default.GLBuffer.createVertexBuffer(t,this.dynamicData,t.STREAM_DRAW);var i=0;this.staticStride=0;for(var o=0;o<this.staticProperties.length;++o){var a=this.staticProperties[o];a.offset=i,i+=a.size,this.staticStride+=a.size}this.staticData=new Float32Array(this.size*this.staticStride*4),this.staticBuffer=s.default.GLBuffer.createVertexBuffer(t,this.staticData,t.STATIC_DRAW),this.vao=new s.default.VertexArrayObject(t).addIndex(this.indexBuffer);for(var h=0;h<this.dynamicProperties.length;++h){var l=this.dynamicProperties[h];this.vao.addAttribute(this.dynamicBuffer,l.attribute,t.FLOAT,!1,4*this.dynamicStride,4*l.offset)}for(var c=0;c<this.staticProperties.length;++c){var d=this.staticProperties[c];this.vao.addAttribute(this.staticBuffer,d.attribute,t.FLOAT,!1,4*this.staticStride,4*d.offset)}},t.prototype.uploadDynamic=function(t,e,r){for(var n=0;n<this.dynamicProperties.length;n++){var i=this.dynamicProperties[n];i.uploadFunction(t,e,r,this.dynamicData,this.dynamicStride,i.offset)}this.dynamicBuffer.upload()},t.prototype.uploadStatic=function(t,e,r){for(var n=0;n<this.staticProperties.length;n++){var i=this.staticProperties[n];i.uploadFunction(t,e,r,this.staticData,this.staticStride,i.offset)}this.staticBuffer.upload()},t.prototype.destroy=function(){this.dynamicProperties=null,this.dynamicData=null,this.dynamicBuffer.destroy(),this.staticProperties=null,this.staticData=null,this.staticBuffer.destroy()},t}();r.default=h},{"../../core/utils/createIndicesForQuads":121,"pixi-gl-core":12}],175:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var u=t("../../core"),h=i(u),l=t("./ParticleShader"),c=n(l),d=t("./ParticleBuffer"),f=n(d),p=function(t){function e(r){o(this,e);var n=s(this,t.call(this,r));return n.shader=null,n.indexBuffer=null,n.properties=null,n.tempMatrix=new h.Matrix,n.CONTEXT_UID=0,n}return a(e,t),e.prototype.onContextChange=function(){var t=this.renderer.gl;this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.shader=new c.default(t),this.properties=[{attribute:this.shader.attributes.aVertexPosition,size:2,uploadFunction:this.uploadVertices,offset:0},{attribute:this.shader.attributes.aPositionCoord,size:2,uploadFunction:this.uploadPosition,offset:0},{attribute:this.shader.attributes.aRotation,size:1,uploadFunction:this.uploadRotation,offset:0},{attribute:this.shader.attributes.aTextureCoord,size:2,uploadFunction:this.uploadUvs,offset:0},{attribute:this.shader.attributes.aColor,size:1,uploadFunction:this.uploadAlpha,offset:0}]},e.prototype.start=function(){this.renderer.bindShader(this.shader)},e.prototype.render=function(t){var e=t.children,r=t._maxSize,n=t._batchSize,i=this.renderer,o=e.length;if(0!==o){o>r&&(o=r);var s=t._glBuffers[i.CONTEXT_UID];s||(s=t._glBuffers[i.CONTEXT_UID]=this.generateBuffers(t));var a=e[0]._texture.baseTexture;this.renderer.setBlendMode(h.utils.correctBlendMode(t.blendMode,a.premultipliedAlpha));var u=i.gl,l=t.worldTransform.copy(this.tempMatrix);l.prepend(i._activeRenderTarget.projectionMatrix),this.shader.uniforms.projectionMatrix=l.toArray(!0),this.shader.uniforms.uColor=h.utils.premultiplyRgba(t.tintRgb,t.worldAlpha,this.shader.uniforms.uColor,a.premultipliedAlpha),this.shader.uniforms.uSampler=i.bindTexture(a);for(var c=0,d=0;c<o;c+=n,d+=1){var f=o-c;f>n&&(f=n);var p=s[d];p.uploadDynamic(e,c,f),t._bufferToUpdate===d&&(p.uploadStatic(e,c,f),t._bufferToUpdate=d+1),i.bindVao(p.vao),p.vao.draw(u.TRIANGLES,6*f)}}},e.prototype.generateBuffers=function(t){for(var e=this.renderer.gl,r=[],n=t._maxSize,i=t._batchSize,o=t._properties,s=0;s<n;s+=i)r.push(new f.default(e,this.properties,o,i));return r},e.prototype.uploadVertices=function(t,e,r,n,i,o){for(var s=0,a=0,u=0,h=0,l=0;l<r;++l){var c=t[e+l],d=c._texture,f=c.scale.x,p=c.scale.y,v=d.trim,y=d.orig;v?(a=v.x-c.anchor.x*y.width,s=a+v.width,h=v.y-c.anchor.y*y.height,u=h+v.height):(s=y.width*(1-c.anchor.x),a=y.width*-c.anchor.x,u=y.height*(1-c.anchor.y),h=y.height*-c.anchor.y),n[o]=a*f,n[o+1]=h*p,n[o+i]=s*f,n[o+i+1]=h*p,n[o+2*i]=s*f,n[o+2*i+1]=u*p,n[o+3*i]=a*f,n[o+3*i+1]=u*p,o+=4*i}},e.prototype.uploadPosition=function(t,e,r,n,i,o){for(var s=0;s<r;s++){var a=t[e+s].position;n[o]=a.x,n[o+1]=a.y,n[o+i]=a.x,n[o+i+1]=a.y,n[o+2*i]=a.x,n[o+2*i+1]=a.y,n[o+3*i]=a.x,n[o+3*i+1]=a.y,o+=4*i}},e.prototype.uploadRotation=function(t,e,r,n,i,o){for(var s=0;s<r;s++){var a=t[e+s].rotation;n[o]=a,n[o+i]=a,n[o+2*i]=a,n[o+3*i]=a,o+=4*i}},e.prototype.uploadUvs=function(t,e,r,n,i,o){for(var s=0;s<r;++s){var a=t[e+s]._texture._uvs;a?(n[o]=a.x0,n[o+1]=a.y0,n[o+i]=a.x1,n[o+i+1]=a.y1,n[o+2*i]=a.x2,n[o+2*i+1]=a.y2,n[o+3*i]=a.x3,n[o+3*i+1]=a.y3,o+=4*i):(n[o]=0,n[o+1]=0,n[o+i]=0,n[o+i+1]=0,n[o+2*i]=0,n[o+2*i+1]=0,n[o+3*i]=0,n[o+3*i+1]=0,o+=4*i)}},e.prototype.uploadAlpha=function(t,e,r,n,i,o){for(var s=0;s<r;s++){var a=t[e+s].alpha;n[o]=a,n[o+i]=a,n[o+2*i]=a,n[o+3*i]=a,o+=4*i}},e.prototype.destroy=function(){this.renderer.gl&&this.renderer.gl.deleteBuffer(this.indexBuffer),t.prototype.destroy.call(this),this.shader.destroy(),this.indices=null,this.tempMatrix=null},e}(h.ObjectRenderer);r.default=p,h.WebGLRenderer.registerPlugin("particle",p)},{"../../core":64,"./ParticleBuffer":174,"./ParticleShader":176}],176:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}r.__esModule=!0;var a=t("../../core/Shader"),u=n(a),h=function(t){function e(r){return i(this,e),o(this,t.call(this,r,["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying float vColor;","void main(void){","   vec2 v = aVertexPosition;","   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);","   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);","   v = v + aPositionCoord;","   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"].join("\n"),["varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","uniform vec4 uColor;","void main(void){","  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uColor;","  if (color.a == 0.0) discard;","  gl_FragColor = color;","}"].join("\n")))}return s(e,t),e}(u.default);r.default=h},{"../../core/Shader":43}],177:[function(t,e,r){"use strict";Math.sign||(Math.sign=function(t){return t=Number(t),0===t||isNaN(t)?t:t>0?1:-1})},{}],178:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=t("object-assign"),o=n(i);Object.assign||(Object.assign=o.default)},{"object-assign":5}],179:[function(t,e,r){"use strict";t("./Object.assign"),t("./requestAnimationFrame"),t("./Math.sign"),window.ArrayBuffer||(window.ArrayBuffer=Array),window.Float32Array||(window.Float32Array=Array),window.Uint32Array||(window.Uint32Array=Array),window.Uint16Array||(window.Uint16Array=Array)},{"./Math.sign":177,"./Object.assign":178,"./requestAnimationFrame":180}],180:[function(t,e,r){(function(t){"use strict";var e=16;Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),t.performance&&t.performance.now||!function(){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}();for(var r=Date.now(),n=["ms","moz","webkit","o"],i=0;i<n.length&&!t.requestAnimationFrame;++i){var o=n[i];t.requestAnimationFrame=t[o+"RequestAnimationFrame"],t.cancelAnimationFrame=t[o+"CancelAnimationFrame"]||t[o+"CancelRequestAnimationFrame"]}t.requestAnimationFrame||(t.requestAnimationFrame=function(t){if("function"!=typeof t)throw new TypeError(t+"is not a function");var n=Date.now(),i=e+r-n;return i<0&&(i=0),r=n,setTimeout(function(){r=Date.now(),t(performance.now())},i)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){return clearTimeout(t)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],181:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){var r=!1;if(t&&t._textures&&t._textures.length)for(var n=0;n<t._textures.length;n++)if(t._textures[n]instanceof p.Texture){var i=t._textures[n].baseTexture;e.indexOf(i)===-1&&(e.push(i),r=!0)}return r}function a(t,e){return t instanceof p.BaseTexture&&(e.indexOf(t)===-1&&e.push(t),!0)}function u(t,e){if(t._texture&&t._texture instanceof p.Texture){var r=t._texture.baseTexture;return e.indexOf(r)===-1&&e.push(r),!0}return!1}function h(t,e){return e instanceof p.Text&&(e.updateText(!0),!0)}function l(t,e){if(e instanceof p.TextStyle){var r=e.toFontString();return p.TextMetrics.measureFont(r),!0}return!1}function c(t,e){if(t instanceof p.Text){e.indexOf(t.style)===-1&&e.push(t.style),e.indexOf(t)===-1&&e.push(t);var r=t._texture.baseTexture;return e.indexOf(r)===-1&&e.push(r),!0}return!1}function d(t,e){return t instanceof p.TextStyle&&(e.indexOf(t)===-1&&e.push(t),!0)}r.__esModule=!0;var f=t("../core"),p=i(f),v=t("./limiters/CountLimiter"),y=n(v),g=p.ticker.shared;p.settings.UPLOADS_PER_FRAME=4;var m=function(){function t(e){var r=this;o(this,t),this.limiter=new y.default(p.settings.UPLOADS_PER_FRAME),this.renderer=e,this.uploadHookHelper=null,this.queue=[],this.addHooks=[],this.uploadHooks=[],this.completes=[],this.ticking=!1,this.delayedTick=function(){r.queue&&r.prepareItems()},this.registerFindHook(c),this.registerFindHook(d),this.registerFindHook(s),this.registerFindHook(a),this.registerFindHook(u),this.registerUploadHook(h),this.registerUploadHook(l)}return t.prototype.upload=function(t,e){"function"==typeof t&&(e=t,t=null),t&&this.add(t),this.queue.length?(e&&this.completes.push(e),this.ticking||(this.ticking=!0,g.addOnce(this.tick,this,p.UPDATE_PRIORITY.UTILITY))):e&&e()},t.prototype.tick=function(){setTimeout(this.delayedTick,0)},t.prototype.prepareItems=function(){for(this.limiter.beginFrame();this.queue.length&&this.limiter.allowedToUpload();){var t=this.queue[0],e=!1;if(t&&!t._destroyed)for(var r=0,n=this.uploadHooks.length;r<n;r++)if(this.uploadHooks[r](this.uploadHookHelper,t)){this.queue.shift(),e=!0;break}e||this.queue.shift()}if(this.queue.length)g.addOnce(this.tick,this,p.UPDATE_PRIORITY.UTILITY);else{this.ticking=!1;var i=this.completes.slice(0);this.completes.length=0;for(var o=0,s=i.length;o<s;o++)i[o]()}},t.prototype.registerFindHook=function(t){return t&&this.addHooks.push(t),this},t.prototype.registerUploadHook=function(t){return t&&this.uploadHooks.push(t),this},t.prototype.add=function(t){for(var e=0,r=this.addHooks.length;e<r&&!this.addHooks[e](t,this.queue);e++);if(t instanceof p.Container)for(var n=t.children.length-1;n>=0;n--)this.add(t.children[n]);return this},t.prototype.destroy=function(){this.ticking&&g.remove(this.tick,this),this.ticking=!1,this.addHooks=null,this.uploadHooks=null,this.renderer=null,this.completes=null,this.queue=null,this.limiter=null,this.uploadHookHelper=null},t}();r.default=m},{"../core":64,"./limiters/CountLimiter":184}],182:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){if(e instanceof l.BaseTexture){var r=e.source,n=0===r.width?t.canvas.width:Math.min(t.canvas.width,r.width),i=0===r.height?t.canvas.height:Math.min(t.canvas.height,r.height);return t.ctx.drawImage(r,0,0,n,i,0,0,t.canvas.width,t.canvas.height),!0}return!1}r.__esModule=!0;var h=t("../../core"),l=i(h),c=t("../BasePrepare"),d=n(c),f=16,p=function(t){function e(r){o(this,e);var n=s(this,t.call(this,r));return n.uploadHookHelper=n,n.canvas=document.createElement("canvas"),n.canvas.width=f,n.canvas.height=f,n.ctx=n.canvas.getContext("2d"),n.registerUploadHook(u),n}return a(e,t),e.prototype.destroy=function(){t.prototype.destroy.call(this),this.ctx=null,this.canvas=null},e}(d.default);r.default=p,l.CanvasRenderer.registerPlugin("prepare",p)},{"../../core":64,"../BasePrepare":181}],183:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0;var i=t("./webgl/WebGLPrepare");Object.defineProperty(r,"webgl",{enumerable:!0,get:function(){return n(i).default}});var o=t("./canvas/CanvasPrepare");Object.defineProperty(r,"canvas",{enumerable:!0,get:function(){return n(o).default}});var s=t("./BasePrepare");Object.defineProperty(r,"BasePrepare",{enumerable:!0,get:function(){return n(s).default}});var a=t("./limiters/CountLimiter");Object.defineProperty(r,"CountLimiter",{enumerable:!0,get:function(){return n(a).default}});var u=t("./limiters/TimeLimiter");Object.defineProperty(r,"TimeLimiter",{enumerable:!0,get:function(){return n(u).default}})},{"./BasePrepare":181,"./canvas/CanvasPrepare":182,"./limiters/CountLimiter":184,"./limiters/TimeLimiter":185,"./webgl/WebGLPrepare":186}],184:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e){n(this,t),this.maxItemsPerFrame=e,this.itemsLeft=0}return t.prototype.beginFrame=function(){this.itemsLeft=this.maxItemsPerFrame},t.prototype.allowedToUpload=function(){return this.itemsLeft-- >0},t}();r.default=i},{}],185:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.__esModule=!0;var i=function(){function t(e){n(this,t),this.maxMilliseconds=e,this.frameStart=0}return t.prototype.beginFrame=function(){this.frameStart=Date.now()},t.prototype.allowedToUpload=function(){return Date.now()-this.frameStart<this.maxMilliseconds},t}();r.default=i},{}],186:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){return e instanceof d.BaseTexture&&(e._glTextures[t.CONTEXT_UID]||t.textureManager.updateTexture(e),!0)}function h(t,e){return e instanceof d.Graphics&&((e.dirty||e.clearDirty||!e._webGL[t.plugins.graphics.CONTEXT_UID])&&t.plugins.graphics.updateGraphics(e),!0)}function l(t,e){return t instanceof d.Graphics&&(e.push(t),!0)}r.__esModule=!0;var c=t("../../core"),d=i(c),f=t("../BasePrepare"),p=n(f),v=function(t){function e(r){o(this,e);var n=s(this,t.call(this,r));return n.uploadHookHelper=n.renderer,n.registerFindHook(l),n.registerUploadHook(u),n.registerUploadHook(h),n}return a(e,t),e}(p.default);r.default=v,d.WebGLRenderer.registerPlugin("prepare",v)},{"../../core":64,"../BasePrepare":181}],187:[function(t,e,r){(function(e){"use strict";function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}function i(t){return t&&t.__esModule?t:{default:t}}r.__esModule=!0,r.loader=r.prepare=r.particles=r.mesh=r.loaders=r.interaction=r.filters=r.extras=r.extract=r.accessibility=void 0;var o=t("./polyfill");Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(r,t,{enumerable:!0,get:function(){return o[t]}})});var s=t("./core");Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(r,t,{enumerable:!0,get:function(){return s[t]}})});var a=t("./deprecation"),u=i(a),h=t("./accessibility"),l=n(h),c=t("./extract"),d=n(c),f=t("./extras"),p=n(f),v=t("./filters"),y=n(v),g=t("./interaction"),m=n(g),_=t("./loaders"),b=n(_),x=t("./mesh"),T=n(x),w=t("./particles"),E=n(w),S=t("./prepare"),O=n(S);s.utils.mixins.performMixins();var P=b.shared||null;r.accessibility=l,r.extract=d,r.extras=p,r.filters=y,r.interaction=m,r.loaders=b,r.mesh=T,r.particles=E,r.prepare=O,r.loader=P,"function"==typeof u.default&&(0,u.default)(r),e.PIXI=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./accessibility":41,"./core":64,"./deprecation":129,"./extract":131,"./extras":140,"./filters":151,"./interaction":158,"./loaders":161,"./mesh":170,"./particles":173,"./polyfill":179,"./prepare":183}]},{},[187])(187)});
// Generated by Haxe 3.4.4
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIterator.__name__ = true;
IntIterator.prototype = {
	__class__: IntIterator
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = $iterator(it)();
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
var pony_magic_HasSignal = function() { };
pony_magic_HasSignal.__name__ = true;
var pony_pixi_App = function(container,width,height,bg,parentDom,smallDeviceQuality,resizeInterval,backImg) {
	if(resizeInterval == null) {
		resizeInterval = 200;
	}
	if(smallDeviceQuality == null) {
		smallDeviceQuality = 3;
	}
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eFrequentResize = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eResize = this11;
	this.renderPause = false;
	this.width = width;
	this.height = height;
	this.background = bg;
	this.parentDom = parentDom;
	this.smallDeviceQuality = smallDeviceQuality;
	this.smallDeviceQualityOffset = 1 - 1 / smallDeviceQuality;
	var this12 = { min : 0, max : resizeInterval};
	var tmp;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this111 = new pony_Priority(null,false);
		this111.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		tmp = pony_time_DeltaTime.eFixedUpdate = this111;
	} else {
		tmp = pony_time_DeltaTime.eFixedUpdate;
	}
	this.resizeTimer = new pony_time_DTimer(tmp,this12,0);
	this.resizeTimer.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.resizeHandler))});
	window.addEventListener("orientationchange",$bind(this,this.refreshSize),true);
	window.addEventListener("focus",$bind(this,this.refreshSize),true);
	window.onresize = $bind(this,this.refreshSize);
	this._width = width;
	this._height = height;
	this.container = container;
	this.canvas = window.document.createElement("canvas");
	this.canvas.style.width = width + "px";
	this.canvas.style.height = height + "px";
	this.canvas.style.position = "static";
	var renderingOptions = { width : width, height : height, view : this.canvas, backgroundColor : this.background, resolution : 1, antialias : false, forceFXAA : false, autoResize : false, transparent : false, clearBeforeRender : true, preserveDrawingBuffer : false, roundPixels : true};
	this.app = new PIXI.Application(renderingOptions);
	if(parentDom == null) {
		this.parentDom = window.document.body;
	}
	this.parentDom.appendChild(this.app.view);
	this.isWebGL = this.app.renderer.type == PIXI.RENDERER_TYPE.WEBGL;
	if(backImg != null) {
		this.backImgcontainer = backImg;
		this.app.stage.addChild(this.backImgcontainer);
	}
	this.app.stage.addChild(container);
	pony_ui_touch_pixi_Mouse.reg(container);
	pony_ui_touch_pixi_Mouse.correction = $bind(this,this.correction);
	pony_ui_touch_pixi_Touch.reg(container);
	pony_ui_touch_pixi_Touch.correction = $bind(this,this.correction);
	this.resizeHandler();
	if(pony_pixi_App.main == null) {
		pony_pixi_App.main = this;
	}
	this.app.stop();
	this.app.ticker.stop();
	pony_time_JsDT.start();
	pony_time_JsDT.render = $bind(this,this.render);
};
pony_pixi_App.__name__ = true;
pony_pixi_App.__interfaces__ = [pony_magic_HasSignal];
pony_pixi_App.prototype = {
	render: function() {
		if(!this.renderPause) {
			this.app.render();
		}
	}
	,fullscreen: function() {
		pony_JsTools.fse(this.parentDom);
	}
	,ratioMod: function(ratio) {
		return ratio;
	}
	,resizeHandler: function() {
		this.width = this.parentDom.clientWidth;
		this.height = this.parentDom.clientHeight;
		var w = this.width / this._width;
		var h = this.height / this._height;
		var d = w > h ? h : w;
		var ratio = this.smallDeviceQuality <= 1 ? 1 : this.smallDeviceQualityOffset + d / this.smallDeviceQuality;
		if(ratio > 1) {
			ratio = 1;
		}
		ratio = this.ratioMod(ratio);
		this.app.renderer.resize(this.width / d * ratio,this.height / d * ratio);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(w > h) {
			this.container.x = (this.width / d - this._width) / 2 * ratio;
			this.container.y = 0;
		} else {
			this.container.x = 0;
			this.container.y = (this.height / d - this._height) / 2 * ratio;
		}
		this.container.width = ratio;
		this.container.height = ratio;
		if(this.backImgcontainer != null) {
			this.backImgcontainer.width = this.width / d * ratio / this._width;
			this.backImgcontainer.height = this.height / d * ratio / this._height;
		}
		this.scale = d;
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eResize,d);
	}
	,correction: function(x,y) {
		var this1 = { x : (x - this.container.x) / this.container.width, y : (y - this.container.y) / this.container.height};
		return this1;
	}
	,refreshSize: function(_) {
		pony_events__$Event0_Event0_$Impl_$.dispatch(this.eFrequentResize);
		this.resizeTimer.reset();
		var _this = this.resizeTimer;
		_this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
		if(null != null) {
			_this._update(null);
		}
	}
	,__class__: pony_pixi_App
};
var Main = function() {
	var scene = new UI();
	pony_pixi_App.call(this,scene,1280,920,6710886,Main.mainDiv);
	scene.init();
};
Main.__name__ = true;
Main.main = function() {
	pony_time_JsDT.start();
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this11 = new pony_Priority(null,false);
		this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this11;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(Main.createMain)};
	listener.once = true;
	this1.add(listener,0);
};
Main.createMain = function() {
	Main.mainDiv = window.document.getElementById("app");
	new Main();
};
Main.__super__ = pony_pixi_App;
Main.prototype = $extend(pony_pixi_App.prototype,{
	__class__: Main
});
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return HxOverrides.substr(s,0,start.length) == start;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return HxOverrides.substr(s,slen - elen,elen) == end;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var pony_magic_HasAbstract = function() { };
pony_magic_HasAbstract.__name__ = true;
var pony_ui_xml_PixiXmlUi = function(texture) {
	this.SCALE = 1;
	this.FILTERS = new haxe_ds_StringMap();
	PIXI.Sprite.call(this,texture);
};
pony_ui_xml_PixiXmlUi.__name__ = true;
pony_ui_xml_PixiXmlUi.__interfaces__ = [pony_magic_HasAbstract];
pony_ui_xml_PixiXmlUi.textTransform = function(text,transform) {
	switch(transform) {
	case "lowercase":
		return text.toLowerCase();
	case "uppercase":
		return text.toUpperCase();
	default:
		return text;
	}
};
pony_ui_xml_PixiXmlUi.splitAttr = function(s) {
	return s.split(",").map(StringTools.trim).map(function(v) {
		if(v == "") {
			return null;
		} else {
			return v;
		}
	});
};
pony_ui_xml_PixiXmlUi.__super__ = PIXI.Sprite;
pony_ui_xml_PixiXmlUi.prototype = $extend(PIXI.Sprite.prototype,{
	createUIElement: function(name,attrs,content) {
		var obj;
		switch(name) {
		case "autobutton":
			obj = new pony_pixi_ui_AutoButton(pony_pixi_PixiAssets.image(attrs.src,attrs.name));
			break;
		case "bar":
			var this1 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs = this.SCALE;
			var top = this1.top * rhs;
			var left = this1.left * rhs;
			var right = this1.right * rhs;
			var bottom = this1.bottom * rhs;
			var this2;
			if(left == null) {
				left = top;
			}
			if(right == null) {
				right = left;
			}
			if(bottom == null) {
				bottom = top;
			}
			this2 = { top : top, left : left, right : right, bottom : bottom};
			var b = this2;
			var s = attrs.w;
			var x = s == null ? 0 : Std.parseInt(s) * this.SCALE | 0;
			var s1 = attrs.h;
			var this11 = { x : x, y : s1 == null ? 0 : Std.parseInt(s1) * this.SCALE | 0};
			var attrs1 = attrs.begin;
			var attrs2 = attrs.fill;
			var this12 = { x : b.left, y : b.top};
			var s2 = attrs.invert;
			var obj1 = s2 != null && StringTools.trim(s2.toLowerCase()) == "true";
			var obj2 = attrs.src != null;
			var s3 = attrs.creep;
			var obj3 = s3 == null ? 0 : Std.parseInt(s3) * this.SCALE | 0;
			var s4 = attrs.smooth;
			obj = new pony_pixi_ui_Bar(pony_OrState.B(this11),attrs1,attrs2,this12,obj1,obj2,obj3,s4 != null && StringTools.trim(s4.toLowerCase()) == "true");
			break;
		case "button":
			obj = new pony_pixi_ui_Button(pony_ui_xml_PixiXmlUi.splitAttr(attrs.skin),null,attrs.src);
			break;
		case "circle":
			var color = pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color);
			var g = new PIXI.Graphics();
			g.lineStyle();
			g.beginFill(color & 16777215,_$UInt_UInt_$Impl_$.toFloat((255 - (color >>> 24 & 255) << 24) + ((color >>> 16 & 255) << 16) + ((color >>> 8 & 255) << 8) + (color & 255) >>> 24 & 255) / _$UInt_UInt_$Impl_$.toFloat(255));
			var s5 = attrs.r;
			g.drawCircle(0,0,s5 == null ? 0 : parseFloat(s5) * this.SCALE);
			g.endFill();
			obj = g;
			break;
		case "clip":
			var data;
			if(attrs.name != null) {
				var a = attrs.name.split("|");
				var p = a[1].split("...");
				var _g = [];
				var _g2 = Std.parseInt(p[0]);
				var _g1 = Std.parseInt(p[1]);
				while(_g2 < _g1) {
					var n = _g2++;
					_g.push(a[0] + n + a[2]);
				}
				data = _g;
			} else {
				data = attrs.frames.split(",").map(StringTools.trim);
			}
			var m = PIXI.extras.AnimatedSprite.fromFrames(data);
			if(attrs.speed != null) {
				m.animationSpeed = parseFloat(attrs.speed);
			}
			var s6 = attrs.loop;
			m.loop = !(s6 != null && StringTools.trim(s6.toLowerCase()) != "true");
			var s7 = attrs.play;
			if(s7 != null && StringTools.trim(s7.toLowerCase()) == "true") {
				m.play();
			}
			obj = m;
			break;
		case "fastclip":
			var data1;
			if(attrs.name != null) {
				var a1 = attrs.name.split("|");
				var p1 = a1[1].split("...");
				var _g3 = [];
				var _g21 = Std.parseInt(p1[0]);
				var _g11 = Std.parseInt(p1[1]);
				while(_g21 < _g11) {
					var n1 = _g21++;
					_g3.push(a1[0] + n1 + a1[2]);
				}
				data1 = _g3;
			} else {
				data1 = attrs.frames.split(",").map(StringTools.trim);
			}
			var this3 = parseFloat(attrs.frameTime) | 0;
			var s8 = attrs.fixedTime;
			var clip = pony_pixi_FastMovieClip.fromStorage(pony_OrState.B(data1),this3,s8 != null && StringTools.trim(s8.toLowerCase()) == "true");
			var s9 = attrs.loop;
			clip.loop = !(s9 != null && StringTools.trim(s9.toLowerCase()) != "true");
			var s10 = attrs.play;
			if(s10 != null && StringTools.trim(s10.toLowerCase()) == "true") {
				var _this = clip.timer;
				_this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
				if(0 != null) {
					_this._update(0);
				}
			}
			if(clip.pool.length > 0) {
				obj = clip.pool.pop();
			} else {
				obj = new PIXI.Sprite(clip.texture);
			}
			break;
		case "free":
			var s11 = attrs.w;
			var x1 = s11 == null ? 0 : parseFloat(s11) * this.SCALE;
			var s12 = attrs.h;
			var this13 = { x : x1, y : s12 == null ? 0 : parseFloat(s12) * this.SCALE};
			var s13 = new pony_pixi_ui_SizedSprite(this13);
			var _g4 = 0;
			while(_g4 < content.length) {
				var e = content[_g4];
				++_g4;
				s13.addChild(e);
			}
			obj = s13;
			break;
		case "fsbutton":
			obj = new pony_pixi_ui_FSButton(pony_ui_xml_PixiXmlUi.splitAttr(attrs.skin),null,attrs.src);
			break;
		case "html":
			var s14 = attrs.x;
			var c = s14 == null ? 0 : parseFloat(s14) * this.SCALE;
			var s15 = attrs.y;
			var c1 = s15 == null ? 0 : parseFloat(s15) * this.SCALE;
			var s16 = attrs.w;
			var c2 = s16 == null ? 0 : parseFloat(s16) * this.SCALE;
			var s17 = attrs.h;
			var c3 = new pony_pixi_ui_HtmlContainer({ x : c, y : c1, width : c2, height : s17 == null ? 0 : parseFloat(s17) * this.SCALE},this.app);
			var s18 = attrs.div;
			if(s18 != null && StringTools.trim(s18.toLowerCase()) == "true") {
				var div = window.document.createElement("div");
				if(attrs.src != null) {
					div.innerHTML = pony_pixi_PixiAssets.text(attrs.src);
				}
				if(attrs.color != null) {
					div.style.backgroundColor = attrs.color;
				}
				this.app.parentDom.appendChild(div);
				c3.htmlContainer.set_targetStyle(div.style);
				c3.element = div;
			}
			obj = c3;
			break;
		case "image":
			obj = pony_pixi_PixiAssets.image(attrs.src,attrs.name);
			break;
		case "layout":
			var s19 = attrs.align;
			var align;
			if(s19 == null) {
				align = null;
			} else {
				var hor = null;
				var vert = null;
				var _g5 = 0;
				var _g12 = s19.split(" ");
				while(_g5 < _g12.length) {
					var v = _g12[_g5];
					++_g5;
					if(v != "") {
						var _g22 = v.toLowerCase();
						switch(_g22) {
						case "bottom":
							vert = pony_geom_VAlign.Bottom;
							break;
						case "center":
							hor = pony_geom_HAlign.Center;
							break;
						case "left":
							hor = pony_geom_HAlign.Left;
							break;
						case "middle":
							vert = pony_geom_VAlign.Middle;
							break;
						case "right":
							hor = pony_geom_HAlign.Right;
							break;
						case "top":
							vert = pony_geom_VAlign.Top;
							break;
						default:
							throw new js__$Boot_HaxeError("error");
						}
					}
				}
				var this14 = { a : vert, b : hor};
				align = this14;
			}
			if(attrs.src != null) {
				var l = pony_pixi_PixiAssets.image(attrs.src,attrs.name);
				var s20 = attrs.vert;
				var l1 = s20 != null && StringTools.trim(s20.toLowerCase()) == "true";
				var this4 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
				var rhs1 = this.SCALE;
				var top1 = this4.top * rhs1;
				var left1 = this4.left * rhs1;
				var right1 = this4.right * rhs1;
				var bottom1 = this4.bottom * rhs1;
				var this5;
				if(left1 == null) {
					left1 = top1;
				}
				if(right1 == null) {
					right1 = left1;
				}
				if(bottom1 == null) {
					bottom1 = top1;
				}
				this5 = { top : top1, left : left1, right : right1, bottom : bottom1};
				var l2 = new pony_pixi_ui_BGLayout(l,l1,this5);
				var _g6 = 0;
				while(_g6 < content.length) {
					var e1 = content[_g6];
					++_g6;
					l2.add(e1);
				}
				obj = l2;
			} else if(attrs.iv != null) {
				var s21 = attrs.iv;
				var l3 = s21 == null ? 0 : Std.parseInt(s21) * this.SCALE | 0;
				var this6 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
				var rhs2 = this.SCALE;
				var top2 = this6.top * rhs2;
				var left2 = this6.left * rhs2;
				var right2 = this6.right * rhs2;
				var bottom2 = this6.bottom * rhs2;
				var this7;
				if(left2 == null) {
					left2 = top2;
				}
				if(right2 == null) {
					right2 = left2;
				}
				if(bottom2 == null) {
					bottom2 = top2;
				}
				this7 = { top : top2, left : left2, right : right2, bottom : bottom2};
				var l4 = new pony_pixi_ui_IntervalLayout(l3,true,this7,align);
				var _g7 = 0;
				while(_g7 < content.length) {
					var e2 = content[_g7];
					++_g7;
					l4.add(e2);
				}
				obj = l4;
			} else if(attrs.ih != null) {
				var s22 = attrs.ih;
				var l5 = s22 == null ? 0 : Std.parseInt(s22) * this.SCALE | 0;
				var this8 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
				var rhs3 = this.SCALE;
				var top3 = this8.top * rhs3;
				var left3 = this8.left * rhs3;
				var right3 = this8.right * rhs3;
				var bottom3 = this8.bottom * rhs3;
				var this9;
				if(left3 == null) {
					left3 = top3;
				}
				if(right3 == null) {
					right3 = left3;
				}
				if(bottom3 == null) {
					bottom3 = top3;
				}
				this9 = { top : top3, left : left3, right : right3, bottom : bottom3};
				var l6 = new pony_pixi_ui_IntervalLayout(l5,false,this9,align);
				var _g8 = 0;
				while(_g8 < content.length) {
					var e3 = content[_g8];
					++_g8;
					l6.add(e3);
				}
				obj = l6;
			} else if(attrs.w != null || attrs.h != null) {
				var s23 = attrs.w;
				var r = s23 == null ? 0 : parseFloat(s23) * this.SCALE;
				var s24 = attrs.h;
				var r1 = s24 == null ? 0 : parseFloat(s24) * this.SCALE;
				var s25 = attrs.vert;
				var r2 = s25 != null && StringTools.trim(s25.toLowerCase()) == "true";
				var this10 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
				var rhs4 = this.SCALE;
				var top4 = this10.top * rhs4;
				var left4 = this10.left * rhs4;
				var right4 = this10.right * rhs4;
				var bottom4 = this10.bottom * rhs4;
				var this15;
				if(left4 == null) {
					left4 = top4;
				}
				if(right4 == null) {
					right4 = left4;
				}
				if(bottom4 == null) {
					bottom4 = top4;
				}
				this15 = { top : top4, left : left4, right : right4, bottom : bottom4};
				var r3;
				if(attrs.padding == null) {
					r3 = true;
				} else {
					var s26 = attrs.padding;
					if(s26 != null) {
						r3 = StringTools.trim(s26.toLowerCase()) == "true";
					} else {
						r3 = false;
					}
				}
				var r4 = new pony_pixi_ui_RubberLayout(r,r1,r2,this15,r3,align);
				var _g9 = 0;
				while(_g9 < content.length) {
					var e4 = content[_g9];
					++_g9;
					r4.add(e4);
				}
				obj = r4;
			} else {
				var s27 = new pony_pixi_ui_AlignLayout(align);
				var _g10 = 0;
				while(_g10 < content.length) {
					var e5 = content[_g10];
					++_g10;
					s27.add(e5);
				}
				obj = s27;
			}
			break;
		case "lbutton":
			var b1 = pony_ui_xml_PixiXmlUi.splitAttr(attrs.skin);
			var s28 = attrs.vert;
			var b2 = s28 != null && StringTools.trim(s28.toLowerCase()) == "true";
			var this16 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs5 = this.SCALE;
			var top5 = this16.top * rhs5;
			var left5 = this16.left * rhs5;
			var right5 = this16.right * rhs5;
			var bottom5 = this16.bottom * rhs5;
			var this17;
			if(left5 == null) {
				left5 = top5;
			}
			if(right5 == null) {
				right5 = left5;
			}
			if(bottom5 == null) {
				bottom5 = top5;
			}
			this17 = { top : top5, left : left5, right : right5, bottom : bottom5};
			var b3 = new pony_pixi_ui_LabelButton(b1,b2,this17,null,attrs.src);
			var _g13 = 0;
			while(_g13 < content.length) {
				var c4 = content[_g13];
				++_g13;
				b3.add(c4);
			}
			obj = b3;
			break;
		case "line":
			var color1 = pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color);
			var g1 = new PIXI.Graphics(true);
			var s29 = attrs.size;
			g1.lineStyle(s29 == null ? 0 : parseFloat(s29) * this.SCALE,color1 & 16777215,_$UInt_UInt_$Impl_$.toFloat((255 - (color1 >>> 24 & 255) << 24) + ((color1 >>> 16 & 255) << 16) + ((color1 >>> 8 & 255) << 8) + (color1 & 255) >>> 24 & 255) / _$UInt_UInt_$Impl_$.toFloat(255));
			g1.moveTo(0,0);
			var s30 = attrs.w;
			var obj4 = s30 == null ? 0 : parseFloat(s30) * this.SCALE;
			var s31 = attrs.h;
			g1.lineTo(obj4,s31 == null ? 0 : parseFloat(s31) * this.SCALE);
			obj = g1;
			break;
		case "mask":
			var o = parseFloat(attrs.w) * this.SCALE;
			var o1 = parseFloat(attrs.h) * this.SCALE;
			var s32 = attrs.radius;
			var o2 = new pony_pixi_ui_Mask(o,o1,s32 == null ? 0 : Std.parseInt(s32) * this.SCALE | 0,content.shift());
			var _g14 = 0;
			while(_g14 < content.length) {
				var e6 = content[_g14];
				++_g14;
				o2.addChild(e6);
			}
			obj = o2;
			break;
		case "progressbar":
			var font;
			if(attrs.font == null) {
				font = null;
			} else {
				var s33 = attrs.size;
				font = (s33 == null ? 0 : Std.parseInt(s33) * this.SCALE | 0) + "px " + attrs.font;
			}
			var attrs3 = attrs.bg;
			var attrs4 = attrs.begin;
			var attrs5 = attrs.fill;
			var attrs6 = attrs.anim;
			var obj5 = attrs.animspeed == null ? null : pony_time__$Time_Time_$Impl_$.fromString(attrs.animspeed);
			var this18 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs6 = this.SCALE;
			var top6 = this18.top * rhs6;
			var left6 = this18.left * rhs6;
			var right6 = this18.right * rhs6;
			var bottom6 = this18.bottom * rhs6;
			var this19;
			if(left6 == null) {
				left6 = top6;
			}
			if(right6 == null) {
				right6 = left6;
			}
			if(bottom6 == null) {
				bottom6 = top6;
			}
			this19 = { top : top6, left : left6, right : right6, bottom : bottom6};
			var obj6 = font == null ? null : pony_pixi_ETextStyle.BITMAP_TEXT_STYLE({ font : font, tint : pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color) & 16777215});
			var s34 = attrs.shadow;
			var obj7 = s34 != null && StringTools.trim(s34.toLowerCase()) == "true";
			var s35 = attrs.invert;
			var obj8 = s35 != null && StringTools.trim(s35.toLowerCase()) == "true";
			var obj9 = font == null || attrs.src.indexOf(",") != -1;
			var s36 = attrs.creep;
			var obj10 = s36 == null ? 0 : Std.parseInt(s36) * this.SCALE | 0;
			var s37 = attrs.smooth;
			obj = new pony_pixi_ui_ProgressBar(attrs3,attrs4,attrs5,attrs6,obj5,this19,obj6,obj7,obj8,obj9,obj10,s37 != null && StringTools.trim(s37.toLowerCase()) == "true");
			break;
		case "rect":
			var color2 = pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color);
			var g2 = new PIXI.Graphics();
			g2.lineStyle();
			g2.beginFill(color2 & 16777215,_$UInt_UInt_$Impl_$.toFloat((255 - (color2 >>> 24 & 255) << 24) + ((color2 >>> 16 & 255) << 16) + ((color2 >>> 8 & 255) << 8) + (color2 & 255) >>> 24 & 255) / _$UInt_UInt_$Impl_$.toFloat(255));
			if(attrs.round == null) {
				var s38 = attrs.w;
				var obj11 = s38 == null ? 0 : parseFloat(s38) * this.SCALE;
				var s39 = attrs.h;
				g2.drawRect(0,0,obj11,s39 == null ? 0 : parseFloat(s39) * this.SCALE);
			} else {
				var s40 = attrs.w;
				var obj12 = s40 == null ? 0 : parseFloat(s40) * this.SCALE;
				var s41 = attrs.h;
				var obj13 = s41 == null ? 0 : parseFloat(s41) * this.SCALE;
				var s42 = attrs.round;
				g2.drawRoundedRect(0,0,obj12,obj13,s42 == null ? 0 : Std.parseInt(s42) * this.SCALE | 0);
			}
			g2.endFill();
			obj = g2;
			break;
		case "render":
			var s43 = attrs.w;
			var r5 = s43 == null ? 0 : parseFloat(s43) * this.SCALE;
			var s44 = attrs.h;
			var r6 = s44 == null ? 0 : parseFloat(s44) * this.SCALE;
			var s45 = attrs.canvas;
			var r7 = new pony_pixi_ui_RenderBox(r5,r6,null,s45 != null && StringTools.trim(s45.toLowerCase()) == "true");
			var _g15 = 0;
			while(_g15 < content.length) {
				var c5 = content[_g15];
				++_g15;
				r7.container.addChild(c5);
			}
			r7.update();
			obj = r7;
			break;
		case "slice":
			var s46 = attrs.creep;
			var s47 = pony_pixi_ui_slices_SliceTools.getSliceSprite(attrs.name,attrs.src,s46 == null ? 0 : parseFloat(s46) * this.SCALE);
			if(attrs.w != null) {
				var s48 = attrs.w;
				s47.set_sliceWidth(s48 == null ? 0 : parseFloat(s48) * this.SCALE);
			}
			if(attrs.h != null) {
				var s49 = attrs.h;
				s47.set_sliceHeight(s49 == null ? 0 : parseFloat(s49) * this.SCALE);
			}
			obj = s47;
			break;
		case "slider":
			var b4 = pony_ui_xml_PixiXmlUi.splitAttr(attrs.skin);
			var s50 = attrs.vert;
			var b5 = s50 != null && StringTools.trim(s50.toLowerCase()) == "true";
			var this20 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs7 = this.SCALE;
			var top7 = this20.top * rhs7;
			var left7 = this20.left * rhs7;
			var right7 = this20.right * rhs7;
			var bottom7 = this20.bottom * rhs7;
			var this21;
			if(left7 == null) {
				left7 = top7;
			}
			if(right7 == null) {
				right7 = left7;
			}
			if(bottom7 == null) {
				bottom7 = top7;
			}
			this21 = { top : top7, left : left7, right : right7, bottom : bottom7};
			var b6 = new pony_pixi_ui_LabelButton(b4,b5,this21,null,attrs.src);
			var s51 = attrs.w;
			var b7 = s51 == null ? 0 : parseFloat(s51) * this.SCALE;
			var s52 = attrs.h;
			var b8 = s52 == null ? 0 : parseFloat(s52) * this.SCALE;
			var s53 = attrs.invert;
			var b9 = s53 != null && StringTools.trim(s53.toLowerCase()) == "true";
			var s54 = attrs.draggable;
			var b10 = new pony_pixi_ui_StepSlider(b6,b7,b8,b9,!(s54 != null && StringTools.trim(s54.toLowerCase()) != "true"));
			if(attrs.step != null) {
				var _this1 = b10.sliderCore;
				var v1 = parseFloat(attrs.step);
				_this1.posStep = _this1.size * v1;
				_this1.percentRound = pony_math_MathTools.lengthAfterComma(v1);
				_this1.valueRound = -1;
			}
			var _g16 = 0;
			while(_g16 < content.length) {
				var c6 = content[_g16];
				++_g16;
				b10.add(c6);
			}
			obj = b10;
			break;
		case "text":
			var s55 = attrs.size;
			var font1 = (s55 == null ? 0 : Std.parseInt(s55) * this.SCALE | 0) + "px " + attrs.font;
			var text = pony_ui_xml_PixiXmlUi.textTransform(this._putData(content),attrs.transform);
			var style = { font : font1, tint : pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color) & 16777215};
			var s56 = attrs.shadow;
			obj = new pony_pixi_ui_BText(text,style,attrs.ansi,s56 != null && StringTools.trim(s56.toLowerCase()) == "true");
			break;
		case "textbox":
			var s57 = attrs.size;
			var font2 = (s57 == null ? 0 : Std.parseInt(s57) * this.SCALE | 0) + "px " + attrs.font;
			var text1 = pony_ui_xml_PixiXmlUi.textTransform(this._putData(content),attrs.transform);
			var style1 = pony_pixi_ETextStyle.BITMAP_TEXT_STYLE({ font : font2, tint : pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color) & 16777215});
			var s58 = pony_pixi_PixiAssets.image(attrs.src,attrs.name);
			var s59 = attrs.hidebg;
			s58.visible = !(s59 != null && StringTools.trim(s59.toLowerCase()) == "true");
			var this22 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs8 = this.SCALE;
			var top8 = this22.top * rhs8;
			var left8 = this22.left * rhs8;
			var right8 = this22.right * rhs8;
			var bottom8 = this22.bottom * rhs8;
			var this23;
			if(left8 == null) {
				left8 = top8;
			}
			if(right8 == null) {
				right8 = left8;
			}
			if(bottom8 == null) {
				bottom8 = top8;
			}
			this23 = { top : top8, left : left8, right : right8, bottom : bottom8};
			var s60 = attrs.nocache;
			var obj14 = s60 != null && StringTools.trim(s60.toLowerCase()) == "true";
			var s61 = attrs.shadow;
			obj = new pony_pixi_ui_TextBox(s58,text1,style1,null,this23,obj14,s61 != null && StringTools.trim(s61.toLowerCase()) == "true");
			break;
		case "textbutton":
			var s62 = attrs.size;
			var font3 = (s62 == null ? 0 : Std.parseInt(s62) * this.SCALE | 0) + "px " + attrs.font;
			var text2 = pony_ui_xml_PixiXmlUi.textTransform(this._putData(content),attrs.transform);
			var obj15 = attrs.color.split(" ").map(pony_color__$UColor_UColor_$Impl_$.fromString);
			var attrs7 = attrs.ansi;
			var s63 = attrs.line;
			var obj16 = s63 == null ? 0 : parseFloat(s63) * this.SCALE;
			var s64 = attrs.linepos;
			obj = new pony_pixi_ui_TextButton(obj15,text2,font3,attrs7,obj16,s64 == null ? 0 : parseFloat(s64) * this.SCALE);
			break;
		case "tile":
			var obj17 = pony_pixi_PixiAssets.texture(attrs.src,attrs.name);
			var s65 = attrs.w;
			var obj18 = s65 == null ? 0 : parseFloat(s65) * this.SCALE;
			var s66 = attrs.h;
			obj = new PIXI.extras.TilingSprite(obj17,obj18,s66 == null ? 0 : parseFloat(s66) * this.SCALE);
			break;
		case "timebar":
			var s67 = attrs.size;
			var font4 = (s67 == null ? 0 : Std.parseInt(s67) * this.SCALE | 0) + "px " + attrs.font;
			var attrs8 = attrs.bg;
			var attrs9 = attrs.begin;
			var attrs10 = attrs.fill;
			var attrs11 = attrs.anim;
			var obj19 = attrs.animspeed == null ? null : pony_time__$Time_Time_$Impl_$.fromString(attrs.animspeed);
			var this24 = pony_geom__$Border_Border_$Impl_$.fromString(attrs.border);
			var rhs9 = this.SCALE;
			var top9 = this24.top * rhs9;
			var left9 = this24.left * rhs9;
			var right9 = this24.right * rhs9;
			var bottom9 = this24.bottom * rhs9;
			var this25;
			if(left9 == null) {
				left9 = top9;
			}
			if(right9 == null) {
				right9 = left9;
			}
			if(bottom9 == null) {
				bottom9 = top9;
			}
			this25 = { top : top9, left : left9, right : right9, bottom : bottom9};
			var obj20 = pony_pixi_ETextStyle.BITMAP_TEXT_STYLE({ font : font4, tint : pony_color__$UColor_UColor_$Impl_$.fromString(attrs.color) & 16777215});
			var s68 = attrs.shadow;
			var obj21 = s68 != null && StringTools.trim(s68.toLowerCase()) == "true";
			var s69 = attrs.invert;
			var obj22 = s69 != null && StringTools.trim(s69.toLowerCase()) == "true";
			var obj23 = attrs.src.indexOf(",") != -1;
			var s70 = attrs.creep;
			obj = new pony_pixi_ui_TimeBar(attrs8,attrs9,attrs10,attrs11,obj19,this25,obj20,obj21,obj22,obj23,s70 == null ? 0 : Std.parseInt(s70) * this.SCALE | 0);
			break;
		case "video":
			var s71 = attrs.x;
			var video = s71 == null ? 0 : parseFloat(s71) * this.SCALE;
			var s72 = attrs.y;
			var video1 = s72 == null ? 0 : parseFloat(s72) * this.SCALE;
			var s73 = attrs.w;
			var video2 = s73 == null ? 0 : parseFloat(s73) * this.SCALE;
			var s74 = attrs.h;
			var video3 = new pony_pixi_ui_HtmlVideoUI({ x : video, y : video1, width : video2, height : s74 == null ? 0 : parseFloat(s74) * this.SCALE},this.app);
			var src = attrs.src;
			if(src != null) {
				video3.video.loadVideo(src);
			}
			obj = video3;
			break;
		case "zeroplace":
			var s75 = new pony_pixi_ui_ZeroPlace();
			var _g17 = 0;
			while(_g17 < content.length) {
				var e7 = content[_g17];
				++_g17;
				s75.add(e7);
			}
			obj = s75;
			break;
		default:
			obj = this.customUIElement(name,attrs,content);
		}
		if(attrs.pivot != null) {
			var a2 = attrs.pivot.split(" ");
			var w = (js_Boot.__cast(obj , PIXI.Sprite)).width;
			var h = (js_Boot.__cast(obj , PIXI.Sprite)).height;
			if(a2.length == 1) {
				obj.pivot.set(parseFloat(a2[0]) * w,parseFloat(a2[0]) * h);
			} else {
				obj.pivot.set(parseFloat(a2[0]) * w,parseFloat(a2[1]) * h);
			}
		}
		var s76 = attrs.notouch;
		if(s76 != null && StringTools.trim(s76.toLowerCase()) == "true") {
			obj.interactive = false;
			obj.interactiveChildren = false;
			obj.hitArea = new PIXI.Rectangle(0,0,0,0);
		}
		if(attrs.r != null) {
			obj.rotation = parseFloat(attrs.r) * Math.PI / 180;
		}
		if(attrs.alpha != null) {
			obj.alpha = parseFloat(attrs.alpha);
		}
		if(attrs.scale != null) {
			obj.scale.set(parseFloat(attrs.scale));
		}
		if(attrs.filters != null) {
			var a3 = [];
			var _g18 = 0;
			var _g19 = pony_ui_xml_PixiXmlUi.splitAttr(attrs.filters);
			while(_g18 < _g19.length) {
				var f = _g19[_g18];
				++_g18;
				var _this2 = this.FILTERS;
				if(__map_reserved[f] != null ? _this2.existsReserved(f) : _this2.h.hasOwnProperty(f)) {
					var _this3 = this.FILTERS;
					a3.push(__map_reserved[f] != null ? _this3.getReserved(f) : _this3.h[f]);
					var _this4 = this.FILTERS;
					if(js_Boot.__instanceof(__map_reserved[f] != null ? _this4.getReserved(f) : _this4.h[f],PIXI.filters.GlowFilter)) {
						var obj24 = [obj];
						var _this5 = this.FILTERS;
						var g3 = __map_reserved[f] != null ? _this5.getReserved(f) : _this5.h[f];
						var s77 = [g3.outerStrength + 2];
						var f1 = null;
						if(js_Boot.__instanceof(obj24[0],pony_geom_IWH)) {
							f1 = (function(s78,obj25) {
								return function() {
									var p2 = obj25[0].toGlobal(new PIXI.Point());
									obj25[0].filterArea = new PIXI.Rectangle(p2.x - s78[0],p2.y - s78[0],obj25[0].width + s78[0] * 2,obj25[0].height + s78[0] * 2);
									var size = (js_Boot.__cast(obj25[0] , pony_geom_IWH)).get_size();
									obj25[0].filterArea.width = size.x + s78[0] * 2;
									obj25[0].filterArea.height = size.y + s78[0] * 2;
								};
							})(s77,obj24);
						} else {
							f1 = (function(s79,obj26) {
								return function() {
									var p3 = obj26[0].toGlobal(new PIXI.Point());
									obj26[0].filterArea = new PIXI.Rectangle(p3.x - s79[0],p3.y - s79[0],obj26[0].width + s79[0] * 2,obj26[0].height + s79[0] * 2);
								};
							})(s77,obj24);
						}
						var s80 = attrs.dyn;
						if(s80 != null && StringTools.trim(s80.toLowerCase()) == "true") {
							var this26;
							if(pony_time_DeltaTime.eFixedUpdate == null) {
								var this110 = new pony_Priority(null,false);
								this110.compare = pony_events__$Event1_Event1_$Impl_$.compare;
								this26 = pony_time_DeltaTime.eFixedUpdate = this110;
							} else {
								this26 = pony_time_DeltaTime.eFixedUpdate;
							}
							this26.add({ once : false, listener : pony_events_Listener1Type.LFunction0(f1)});
						} else {
							pony_time_DeltaTime.skipUpdate(f1);
							this.app.eResize.add({ once : false, listener : pony_events_Listener1Type.LFunction0(f1)});
						}
					}
				}
			}
			if(a3.length > 0) {
				obj.filters = a3;
			}
		}
		if(attrs.x != null) {
			var s81 = attrs.x;
			obj.x = s81 == null ? 0 : parseFloat(s81) * this.SCALE;
		}
		if(attrs.y != null) {
			var s82 = attrs.y;
			obj.y = s82 == null ? 0 : parseFloat(s82) * this.SCALE;
		}
		var s83 = attrs.flipx;
		if(s83 != null && StringTools.trim(s83.toLowerCase()) == "true") {
			var o3 = obj;
			o3.scale.x = -o3.scale.x;
			var o4 = obj;
			o4.x += o4.width;
		}
		var s84 = attrs.flipy;
		if(s84 != null && StringTools.trim(s84.toLowerCase()) == "true") {
			var o5 = obj;
			o5.scale.y = -o5.scale.y;
			var o6 = obj;
			o6.y += o6.height;
		}
		var s85 = attrs.visible;
		if(s85 != null && StringTools.trim(s85.toLowerCase()) != "true") {
			obj.visible = false;
		}
		return obj;
	}
	,_putData: function(content) {
		return this.putData(content.length > 0 ? content[0] : "");
	}
	,putData: function(c) {
		return c;
	}
	,customUIElement: function(name,attrs,content) {
		throw new js__$Boot_HaxeError("Unknown component " + name);
	}
	,_createUI: function() {
		throw new js__$Boot_HaxeError("not implemented");
	}
	,createUI: function(app,scale) {
		if(scale == null) {
			scale = 1;
		}
		if(this.app == null) {
			this.app = app == null ? pony_pixi_App.main : app;
		}
		this.SCALE = scale;
		this.addChild(this._createUI());
	}
	,createFilters: function(data) {
		var _g = 0;
		var _g1 = Reflect.fields(data);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			var d = Reflect.field(data,name);
			var tmp;
			var s = d.nomobile;
			if(s != null && StringTools.trim(s.toLowerCase()) == "true") {
				tmp = window.orientation != null;
			} else {
				tmp = false;
			}
			if(tmp) {
				continue;
			}
			var f;
			var _g2 = Reflect.field(d,"extends");
			if(_g2 == "glow") {
				f = new PIXI.filters.GlowFilter(Std.parseInt(d.distance),parseFloat(d.outerStrength),parseFloat(d.innerStrength),pony_color__$UColor_UColor_$Impl_$.fromString(d.color),parseFloat(d.quality));
			} else {
				throw new js__$Boot_HaxeError("Unknown filter");
			}
			var _this = this.FILTERS;
			if(__map_reserved[name] != null) {
				_this.setReserved(name,f);
			} else {
				_this.h[name] = f;
			}
		}
	}
	,__class__: pony_ui_xml_PixiXmlUi
});
var UI = function(texture) {
	pony_ui_xml_PixiXmlUi.call(this,texture);
};
UI.__name__ = true;
UI.__super__ = pony_ui_xml_PixiXmlUi;
UI.prototype = $extend(pony_ui_xml_PixiXmlUi.prototype,{
	init: function() {
		this.createUI(null,1);
	}
	,_createUI: function() {
		this.createFilters({ });
		var tmp = this.createUIElement("rect",{ h : "300", w : "300", round : "15", color : "#333033", y : "200", x : "200"},[]);
		var tmp1 = this.createUIElement("video",{ h : "280", src : "big_buck_bunny.mp4", w : "280", y : "210", x : "210"},[]);
		return this.createUIElement("free",{ },[tmp,tmp1]);
	}
	,__class__: UI
});
var _$UInt_UInt_$Impl_$ = {};
_$UInt_UInt_$Impl_$.__name__ = true;
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	if(this1 < 0) {
		return 4294967296.0 + this1;
	} else {
		return this1 + 0.0;
	}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) {
			a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		var _this = this.map;
		var key = this.keys[this.index++];
		if(__map_reserved[key] != null) {
			return _this.getReserved(key);
		} else {
			return _this.h[key];
		}
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) {
			this.setReserved(key,value);
		} else {
			this.h[key] = value;
		}
	}
	,setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Eof = function() { };
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var pony_HtmlVideo = function(options) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eEnd = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eHide = this11;
	var this12 = new pony_Priority(null,false);
	this12.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eShow = this12;
	var this13 = new pony_Priority(null,false);
	this13.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eClick = this13;
	this.startPercent = 0;
	this.retryCount = 0;
	this.videoLoadPercentage = 0;
	this.options = { bufferingTreshhold : 0.5, retryDelay : 3000, maxRetries : 4, playDelay : 500};
	if(options != null) {
		if(options.bufferingTreshhold != null) {
			this.options.bufferingTreshhold = options.bufferingTreshhold;
		}
		if(options.retryDelay != null) {
			this.options.retryDelay = options.retryDelay;
		}
		if(options.maxRetries != null) {
			this.options.maxRetries = options.maxRetries;
		}
	}
	this.videoElement = window.document.createElement("video");
	this.videoElement.setAttribute("playsinline","playsinline");
	this.videoElement.muted = true;
	this.videoElement.autoplay = true;
	this.videoElement.controls = false;
	this.videoElement.addEventListener("loadeddata",$bind(this,this.videoLoaddataHandler));
	this.videoElement.addEventListener("canplay",$bind(this,this.videoCanplayHandler));
	this.videoElement.addEventListener("click",$bind(this,this.videoClickHandler));
	this.videoElement.addEventListener("ended",$bind(this,this.videoEndHandler));
	this.videoElement.addEventListener("pause",$bind(this,this.videoPauseHandler));
	this.videoElement.addEventListener("progress",$bind(this,this.videoProgessHandler));
	this.set_elementVisible(false);
};
pony_HtmlVideo.__name__ = true;
pony_HtmlVideo.__interfaces__ = [pony_magic_HasSignal];
pony_HtmlVideo.prototype = {
	set_elementVisible: function(v) {
		if(v) {
			this.videoElement.style.display = "block";
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eShow);
		} else {
			this.videoElement.style.display = "none";
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eHide);
		}
		return v;
	}
	,loadVideo: function(url,startPercent) {
		if(startPercent == null) {
			startPercent = 0;
		}
		this.set_elementVisible(false);
		this.startPercent = startPercent;
		if(this.videoSource != null) {
			this.videoSource.removeEventListener("error",$bind(this,this.videoSourceErrorHandler));
			this.videoElement.removeChild(this.videoSource);
		}
		this.videoSource = window.document.createElement("source");
		this.videoSource.addEventListener("error",$bind(this,this.videoSourceErrorHandler));
		this.videoSource.src = url;
		this.videoElement.appendChild(this.videoSource);
		this.updateVideoLoadPercentage();
		var f = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.playVideo))};
		var this1 = { min : 0, max : this.options.playDelay};
		var t;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			t = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			t = pony_time_DeltaTime.eFixedUpdate;
		}
		var t1 = new pony_time_DTimer(t,this1,0);
		f.once = true;
		t1.eComplete.add(f,0);
		var e = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(t1,t1.destroy))};
		e.once = true;
		t1.eComplete.add(e,0);
		t1.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(t1,t1._update))});
		if(null != null) {
			t1._update(null);
		}
	}
	,videoSourceErrorHandler: function(e) {
		var f = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.retryConnect))};
		var this1 = { min : 0, max : this.options.retryDelay};
		var t;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			t = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			t = pony_time_DeltaTime.eFixedUpdate;
		}
		var t1 = new pony_time_DTimer(t,this1,0);
		f.once = true;
		t1.eComplete.add(f,0);
		var e1 = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(t1,t1.destroy))};
		e1.once = true;
		t1.eComplete.add(e1,0);
		t1.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(t1,t1._update))});
		if(null != null) {
			t1._update(null);
		}
	}
	,retryConnect: function() {
		if(this.retryCount < this.options.maxRetries) {
			this.loadVideo(this.videoSource.src,this.startPercent);
			this.retryCount++;
		}
	}
	,videoLoaddataHandler: function() {
		this.updateVideoLoadPercentage();
		if(this.videoLoadPercentage >= this.options.bufferingTreshhold) {
			this.videoLoaded();
		}
	}
	,videoCanplayHandler: function() {
		this.updateVideoLoadPercentage();
		if(this.videoLoadPercentage >= this.options.bufferingTreshhold && this.videoElement.style.display == "block") {
			this.playVideo();
		}
	}
	,videoClickHandler: function() {
		pony_events__$Event0_Event0_$Impl_$.dispatch(this.eClick);
	}
	,videoEndHandler: function() {
		this.hideVideo();
		pony_events__$Event0_Event0_$Impl_$.dispatch(this.eEnd);
	}
	,videoPauseHandler: function() {
		if(this.videoElement.style.display == "block") {
			this.playVideo();
		}
	}
	,videoProgessHandler: function() {
		this.updateVideoLoadPercentage();
		if(this.videoLoadPercentage >= this.options.bufferingTreshhold) {
			this.showVideo();
			this.videoCanplayHandler();
		}
	}
	,updateVideoLoadPercentage: function() {
		if(this.videoElement.buffered.length > 0) {
			this.videoLoadPercentage = this.videoElement.buffered.end(0) / this.videoElement.duration;
		}
	}
	,videoLoaded: function() {
		this.retryCount = 0;
		this.videoElement.currentTime = this.videoElement.duration * this.startPercent;
		this.updateVideoLoadPercentage();
		this.playVideo();
		this.showVideo();
	}
	,showVideo: function() {
		this.updateVideoLoadPercentage();
		if(this.videoLoadPercentage >= this.options.bufferingTreshhold) {
			this.set_elementVisible(true);
		}
	}
	,hideVideo: function() {
		var f = { once : false, listener : pony_events_Listener1Type.LFunction0(($_=this.videoElement,$bind($_,$_.pause)))};
		var this1 = { min : 0, max : this.options.playDelay};
		var t;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			t = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			t = pony_time_DeltaTime.eFixedUpdate;
		}
		var t1 = new pony_time_DTimer(t,this1,0);
		f.once = true;
		t1.eComplete.add(f,0);
		var e = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(t1,t1.destroy))};
		e.once = true;
		t1.eComplete.add(e,0);
		t1.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(t1,t1._update))});
		if(null != null) {
			t1._update(null);
		}
		this.set_elementVisible(false);
	}
	,playVideo: function() {
		if(this.videoLoadPercentage >= this.options.bufferingTreshhold) {
			this.videoElement.play();
		}
	}
	,__class__: pony_HtmlVideo
};
var pony_IPool = function() { };
pony_IPool.__name__ = true;
var pony_UserAgent = { __ename__ : true, __constructs__ : ["IE","Edge","Chrome","Safari","Firefox","Samsung","Unknown"] };
pony_UserAgent.IE = ["IE",0];
pony_UserAgent.IE.toString = $estr;
pony_UserAgent.IE.__enum__ = pony_UserAgent;
pony_UserAgent.Edge = ["Edge",1];
pony_UserAgent.Edge.toString = $estr;
pony_UserAgent.Edge.__enum__ = pony_UserAgent;
pony_UserAgent.Chrome = ["Chrome",2];
pony_UserAgent.Chrome.toString = $estr;
pony_UserAgent.Chrome.__enum__ = pony_UserAgent;
pony_UserAgent.Safari = ["Safari",3];
pony_UserAgent.Safari.toString = $estr;
pony_UserAgent.Safari.__enum__ = pony_UserAgent;
pony_UserAgent.Firefox = ["Firefox",4];
pony_UserAgent.Firefox.toString = $estr;
pony_UserAgent.Firefox.__enum__ = pony_UserAgent;
pony_UserAgent.Samsung = ["Samsung",5];
pony_UserAgent.Samsung.toString = $estr;
pony_UserAgent.Samsung.__enum__ = pony_UserAgent;
pony_UserAgent.Unknown = ["Unknown",6];
pony_UserAgent.Unknown.toString = $estr;
pony_UserAgent.Unknown.__enum__ = pony_UserAgent;
var pony_OS = { __ename__ : true, __constructs__ : ["Windows","Linux","Android","Unknown","IOS"] };
pony_OS.Windows = ["Windows",0];
pony_OS.Windows.toString = $estr;
pony_OS.Windows.__enum__ = pony_OS;
pony_OS.Linux = function(type) { var $x = ["Linux",1,type]; $x.__enum__ = pony_OS; $x.toString = $estr; return $x; };
pony_OS.Android = ["Android",2];
pony_OS.Android.toString = $estr;
pony_OS.Android.__enum__ = pony_OS;
pony_OS.Unknown = ["Unknown",3];
pony_OS.Unknown.toString = $estr;
pony_OS.Unknown.__enum__ = pony_OS;
pony_OS.IOS = ["IOS",4];
pony_OS.IOS.toString = $estr;
pony_OS.IOS.__enum__ = pony_OS;
var pony_Linux = { __ename__ : true, __constructs__ : ["Ubuntu","Other"] };
pony_Linux.Ubuntu = ["Ubuntu",0];
pony_Linux.Ubuntu.toString = $estr;
pony_Linux.Ubuntu.__enum__ = pony_Linux;
pony_Linux.Other = ["Other",1];
pony_Linux.Other.toString = $estr;
pony_Linux.Other.__enum__ = pony_Linux;
var pony_ISA = { __ename__ : true, __constructs__ : ["X32","X64","Unknown"] };
pony_ISA.X32 = ["X32",0];
pony_ISA.X32.toString = $estr;
pony_ISA.X32.__enum__ = pony_ISA;
pony_ISA.X64 = ["X64",1];
pony_ISA.X64.toString = $estr;
pony_ISA.X64.__enum__ = pony_ISA;
pony_ISA.Unknown = ["Unknown",2];
pony_ISA.Unknown.toString = $estr;
pony_ISA.Unknown.__enum__ = pony_ISA;
var pony_Priority = function(data,$double) {
	if($double == null) {
		$double = false;
	}
	this.lock = false;
	this.hash = new haxe_ds_IntMap();
	this.data = [];
	this.counters = [0];
	this.addStack = [];
	this["double"] = $double;
	if(data != null) {
		this.data = data;
		this.hash = new haxe_ds_IntMap();
		this.hash.set(0,this.data.length);
	}
};
pony_Priority.__name__ = true;
pony_Priority.__interfaces__ = [pony_magic_HasSignal];
pony_Priority.prototype = {
	add: function(e,priority) {
		if(priority == null) {
			priority = 0;
		}
		var tmp;
		if(!this["double"]) {
			var f = $bind(this,this.compare);
			var a = e;
			var f1 = function(b) {
				return f(a,b);
			};
			tmp = Lambda.exists(this.data,f1);
		} else {
			tmp = false;
		}
		if(tmp) {
			return this;
		}
		if(this.lock) {
			var this1 = { a : e, b : priority};
			this.addStack.push(this1);
			return this;
		}
		var needOnTake = this.data.length == 0;
		var s = this.hash.h.hasOwnProperty(priority) ? this.hash.h[priority] : 0;
		var c = 0;
		var k = this.hash.keys();
		while(k.hasNext()) {
			var k1 = k.next();
			if(k1 < priority) {
				c += this.hash.h[k1];
			}
		}
		c += s;
		this.data.splice(c,0,e);
		var _g1 = 0;
		var _g = this.counters.length;
		while(_g1 < _g) {
			var k2 = _g1++;
			if(c < this.counters[k2]) {
				this.counters[k2]++;
			}
		}
		this.hash.h[priority] = s + 1;
		if(needOnTake) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eTake);
		}
		return this;
	}
	,set_lock: function(v) {
		if(this.data == null) {
			return v;
		}
		if(this.lock != v) {
			this.lock = v;
			if(!v) {
				var _g = 0;
				var _g1 = this.addStack;
				while(_g < _g1.length) {
					var e = _g1[_g];
					++_g;
					this.add(e.a,e.b);
				}
				this.addStack = [];
			}
		}
		return v;
	}
	,iterator: function() {
		var _gthis = this;
		var n = this.counters.push(0) - 1;
		var i = 0;
		return { hasNext : function() {
			if(_gthis.counters == null) {
				return false;
			}
			if(_gthis.counters.length < n) {
				_gthis.counters.push(i);
			}
			if(_gthis.data.length > _gthis.counters[n]) {
				return true;
			} else {
				_gthis.counters.splice(n,1);
				return false;
			}
		}, next : function() {
			return _gthis.data[_gthis.counters[n]++];
		}};
	}
	,destroy: function() {
		if(this.hash == null) {
			return;
		}
		var needOnLost = this.data.length != 0;
		this.hash = new haxe_ds_IntMap();
		this.data = [];
		this.counters = [0];
		this.addStack = [];
		if(needOnLost) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eLost);
		}
		this.hash = null;
		this.data = null;
		this.counters = null;
		this.addStack = null;
		this.destroySignals();
	}
	,compare: function(a,b) {
		return a == b;
	}
	,asort: function(x,y) {
		return x - y;
	}
	,remove: function(e) {
		if(this.lock) {
			var ns = [];
			var _g = 0;
			var _g1 = this.addStack;
			while(_g < _g1.length) {
				var st = _g1[_g];
				++_g;
				if(!this.compare(st.a,e)) {
					ns.push(st);
				}
			}
			this.addStack = ns;
		}
		var f = $bind(this,this.compare);
		var a = e;
		var f1 = function(b) {
			return f(a,b);
		};
		var i = pony_ArrayTools.fIndexOf(this.data,f1);
		if(i == -1) {
			return false;
		}
		var needOnLost = this.data.length != 0;
		var _g11 = 0;
		var _g2 = this.counters.length;
		while(_g11 < _g2) {
			var k = _g11++;
			if(i < this.counters[k]) {
				this.counters[k]--;
			}
		}
		this.data.splice(i,1);
		var _g3 = [];
		var k1 = this.hash.keys();
		while(k1.hasNext()) {
			var k2 = k1.next();
			_g3.push(k2);
		}
		_g3.sort($bind(this,this.asort));
		var _g12 = 0;
		while(_g12 < _g3.length) {
			var k3 = _g3[_g12];
			++_g12;
			var n = this.hash.h[k3];
			if(i > 0) {
				i -= n;
			} else {
				if(n > 1) {
					this.hash.h[k3] = n - 1;
				} else {
					this.hash.remove(k3);
				}
				break;
			}
		}
		if(needOnLost && this.data.length == 0) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eLost);
		}
		if(this["double"]) {
			this.remove(e);
		}
		return true;
	}
	,destroySignals: function() {
		if(this.eTake != null) {
			pony_events__$Event0_Event0_$Impl_$.destroy(this.eTake);
		}
		this.eTake = null;
		if(this.eLost != null) {
			pony_events__$Event0_Event0_$Impl_$.destroy(this.eLost);
		}
		this.eLost = null;
	}
	,__class__: pony_Priority
};
var pony_events__$Event0_Event0_$Impl_$ = {};
pony_events__$Event0_Event0_$Impl_$.__name__ = true;
pony_events__$Event0_Event0_$Impl_$.compare = function(a,b) {
	var _g = b.listener;
	var _g1 = a.listener;
	switch(_g1[1]) {
	case 0:
		if(_g[1] == 0) {
			var a1 = _g1[2];
			var b1 = _g[2];
			return a1 == b1;
		} else {
			return false;
		}
		break;
	case 1:
		if(_g[1] == 1) {
			var a2 = _g1[2];
			var b2 = _g[2];
			return a2 == b2;
		} else {
			return false;
		}
		break;
	case 2:
		if(_g[1] == 2) {
			var a3 = _g1[3];
			var b3 = _g[3];
			return a3 == b3;
		} else {
			return false;
		}
		break;
	case 3:
		if(_g[1] == 3) {
			var a11 = _g1[3];
			var a21 = _g1[4];
			var b21 = _g[4];
			var b11 = _g[3];
			if(a11 == b11) {
				return a21 == b21;
			} else {
				return false;
			}
		} else {
			return false;
		}
		break;
	}
};
pony_events__$Event0_Event0_$Impl_$.dispatch = function(this1,safe) {
	if(safe == null) {
		safe = false;
	}
	if(this1 == null || this1.data == null || safe && this1.counters.length > 1) {
		return false;
	}
	this1.set_lock(true);
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		if(this1.data == null) {
			return false;
		}
		if(e1.once) {
			this1.remove(e1);
		}
		var tmp;
		var _g = e1.listener;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			tmp = f();
			break;
		case 1:
			var sv = _g[3];
			var s = _g[2];
			tmp = pony_events__$Event0_Event0_$Impl_$.dispatch(s,sv || safe);
			break;
		case 2:
			var v = _g[3];
			var s1 = _g[2];
			tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s1,v,safe);
			break;
		case 3:
			var v2 = _g[4];
			var v1 = _g[3];
			var s2 = _g[2];
			tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s2,v1,v2,safe);
			break;
		}
		if(tmp) {
			if(this1.counters != null) {
				this1.counters.splice(1,this1.counters.length);
			}
			return true;
		}
	}
	this1.set_lock(false);
	return false;
};
pony_events__$Event0_Event0_$Impl_$.destroy = function(this1) {
	if(this1 != null) {
		this1.destroy();
	}
};
var pony_events__$Event1_Event1_$Impl_$ = {};
pony_events__$Event1_Event1_$Impl_$.__name__ = true;
pony_events__$Event1_Event1_$Impl_$.compare = function(a,b) {
	var _g = b.listener;
	var _g1 = a.listener;
	switch(_g1[1]) {
	case 0:
		if(_g[1] == 0) {
			var a1 = _g1[2];
			var b1 = _g[2];
			return a1 == b1;
		} else {
			return false;
		}
		break;
	case 1:
		if(_g[1] == 1) {
			var a2 = _g1[2];
			var b2 = _g[2];
			return a2 == b2;
		} else {
			return false;
		}
		break;
	case 2:
		if(_g[1] == 2) {
			var a3 = _g1[2];
			var b3 = _g[2];
			return a3 == b3;
		} else {
			return false;
		}
		break;
	case 3:
		if(_g[1] == 3) {
			var a4 = _g1[2];
			var b4 = _g[2];
			return a4 == b4;
		} else {
			return false;
		}
		break;
	case 4:
		if(_g[1] == 4) {
			var a5 = _g1[3];
			var b5 = _g[3];
			return a5 == b5;
		} else {
			return false;
		}
		break;
	case 5:
		if(_g[1] == 5) {
			var a6 = _g1[3];
			var b6 = _g[3];
			return a6 == b6;
		} else {
			return false;
		}
		break;
	case 6:
		if(_g[1] == 6) {
			var a11 = _g1[3];
			var b11 = _g[3];
			return a11 == b11;
		} else {
			return false;
		}
		break;
	}
};
pony_events__$Event1_Event1_$Impl_$.dispatch = function(this1,a1,safe) {
	if(safe == null) {
		safe = false;
	}
	if(this1 == null || this1.data == null || safe && this1.counters.length > 1) {
		return false;
	}
	this1.set_lock(true);
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		if(this1.data == null) {
			return false;
		}
		if(e1.once) {
			this1.remove(e1);
		}
		var tmp;
		var _g = e1.listener;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			tmp = f();
			break;
		case 1:
			var f1 = _g[2];
			tmp = f1(a1);
			break;
		case 2:
			var sv = _g[3];
			var s = _g[2];
			tmp = pony_events__$Event0_Event0_$Impl_$.dispatch(s,sv || safe);
			break;
		case 3:
			var sv1 = _g[3];
			var s1 = _g[2];
			tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s1,a1,sv1 || safe);
			break;
		case 4:
			var v = _g[3];
			var s2 = _g[2];
			if(v == a1) {
				tmp = pony_events__$Event0_Event0_$Impl_$.dispatch(s2,safe);
			} else {
				tmp = false;
			}
			break;
		case 5:
			var v1 = _g[3];
			var s3 = _g[2];
			if(v1 != a1) {
				tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s3,a1,safe);
			} else {
				tmp = false;
			}
			break;
		case 6:
			var v11 = _g[3];
			var s4 = _g[2];
			tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s4,a1,v11,safe);
			break;
		default:
			tmp = false;
		}
		if(tmp) {
			if(this1.counters != null) {
				this1.counters.splice(1,this1.counters.length);
			}
			return true;
		}
	}
	this1.set_lock(false);
	return false;
};
var pony_events__$Event2_Event2_$Impl_$ = {};
pony_events__$Event2_Event2_$Impl_$.__name__ = true;
pony_events__$Event2_Event2_$Impl_$.compare = function(a,b) {
	var _g = b.listener;
	var _g1 = a.listener;
	switch(_g1[1]) {
	case 0:
		if(_g[1] == 0) {
			var a1 = _g1[2];
			var b1 = _g[2];
			return a1 == b1;
		} else {
			return false;
		}
		break;
	case 1:
		if(_g[1] == 1) {
			var a2 = _g1[2];
			var b2 = _g[2];
			return a2 == b2;
		} else {
			return false;
		}
		break;
	case 2:
		if(_g[1] == 2) {
			var a3 = _g1[2];
			var b3 = _g[2];
			return a3 == b3;
		} else {
			return false;
		}
		break;
	case 3:
		if(_g[1] == 3) {
			var a4 = _g1[2];
			var b4 = _g[2];
			return a4 == b4;
		} else {
			return false;
		}
		break;
	case 4:
		if(_g[1] == 4) {
			var a5 = _g1[2];
			var b5 = _g[2];
			return a5 == b5;
		} else {
			return false;
		}
		break;
	case 5:
		if(_g[1] == 5) {
			var a6 = _g1[2];
			var b6 = _g[2];
			return a6 == b6;
		} else {
			return false;
		}
		break;
	case 6:
		if(_g[1] == 6) {
			var a11 = _g1[3];
			var a21 = _g1[4];
			var b21 = _g[4];
			var b11 = _g[3];
			if(a11 == b11) {
				return a21 == b21;
			} else {
				return false;
			}
		} else {
			return false;
		}
		break;
	case 7:
		if(_g[1] == 7) {
			var a7 = _g1[3];
			var b7 = _g[3];
			return a7 == b7;
		} else {
			return false;
		}
		break;
	case 8:
		if(_g[1] == 8) {
			var a8 = _g1[3];
			var b8 = _g[3];
			return a8 == b8;
		} else {
			return false;
		}
		break;
	case 9:
		if(_g[1] == 9) {
			var a12 = _g1[3];
			var a22 = _g1[4];
			var b22 = _g[4];
			var b12 = _g[3];
			if(a12 == b12) {
				return a22 == b22;
			} else {
				return false;
			}
		} else {
			return false;
		}
		break;
	case 10:
		if(_g[1] == 10) {
			var a9 = _g1[3];
			var b9 = _g[3];
			return a9 == b9;
		} else {
			return false;
		}
		break;
	case 11:
		if(_g[1] == 11) {
			var a10 = _g1[3];
			var b10 = _g[3];
			return a10 == b10;
		} else {
			return false;
		}
		break;
	}
};
pony_events__$Event2_Event2_$Impl_$.dispatch = function(this1,a1,a2,safe) {
	if(safe == null) {
		safe = false;
	}
	if(this1 == null || this1.data == null || safe && this1.counters.length > 1) {
		return false;
	}
	this1.set_lock(true);
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		if(this1.data == null) {
			return false;
		}
		if(e1.once) {
			this1.remove(e1);
		}
		var tmp;
		var _g = e1.listener;
		switch(_g[1]) {
		case 0:
			var f = _g[2];
			tmp = f();
			break;
		case 1:
			var f1 = _g[2];
			tmp = f1(a1);
			break;
		case 2:
			var f2 = _g[2];
			tmp = f2(a1,a2);
			break;
		case 3:
			var sv = _g[3];
			var s = _g[2];
			tmp = pony_events__$Event0_Event0_$Impl_$.dispatch(s,sv || safe);
			break;
		case 4:
			var sv1 = _g[3];
			var s1 = _g[2];
			tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s1,a1,sv1 || safe);
			break;
		case 5:
			var sv2 = _g[3];
			var s2 = _g[2];
			tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s2,a1,a2,sv2 || safe);
			break;
		case 6:
			var v2 = _g[4];
			var v1 = _g[3];
			var s3 = _g[2];
			if(v1 == a1 && v2 == a2) {
				tmp = pony_events__$Event0_Event0_$Impl_$.dispatch(s3,safe);
			} else {
				tmp = false;
			}
			break;
		case 7:
			var v11 = _g[3];
			var s4 = _g[2];
			if(v11 == a1) {
				tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s4,a2,safe);
			} else {
				tmp = false;
			}
			break;
		case 8:
			var v21 = _g[3];
			var s5 = _g[2];
			if(v21 == a2) {
				tmp = pony_events__$Event1_Event1_$Impl_$.dispatch(s5,a1,safe);
			} else {
				tmp = false;
			}
			break;
		case 9:
			var v22 = _g[4];
			var v12 = _g[3];
			var s6 = _g[2];
			if(v12 != a1 && v22 != a2) {
				tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s6,a1,a2,safe);
			} else {
				tmp = false;
			}
			break;
		case 10:
			var v13 = _g[3];
			var s7 = _g[2];
			if(v13 != a1) {
				tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s7,a1,a2,safe);
			} else {
				tmp = false;
			}
			break;
		case 11:
			var v23 = _g[3];
			var s8 = _g[2];
			if(v23 != a2) {
				tmp = pony_events__$Event2_Event2_$Impl_$.dispatch(s8,a1,a2,safe);
			} else {
				tmp = false;
			}
			break;
		default:
			tmp = false;
		}
		if(tmp) {
			if(this1.counters != null) {
				this1.counters.splice(1,this1.counters.length);
			}
			return true;
		}
	}
	this1.set_lock(false);
	return false;
};
var pony_events_Listener0Type = { __ename__ : true, __constructs__ : ["LFunction0","LEvent0","LBind1","LBind2"] };
pony_events_Listener0Type.LFunction0 = function(f) { var $x = ["LFunction0",0,f]; $x.__enum__ = pony_events_Listener0Type; $x.toString = $estr; return $x; };
pony_events_Listener0Type.LEvent0 = function(s,safe) { var $x = ["LEvent0",1,s,safe]; $x.__enum__ = pony_events_Listener0Type; $x.toString = $estr; return $x; };
pony_events_Listener0Type.LBind1 = function(s,v) { var $x = ["LBind1",2,s,v]; $x.__enum__ = pony_events_Listener0Type; $x.toString = $estr; return $x; };
pony_events_Listener0Type.LBind2 = function(s,v1,v2) { var $x = ["LBind2",3,s,v1,v2]; $x.__enum__ = pony_events_Listener0Type; $x.toString = $estr; return $x; };
var pony_JsTools = function() { };
pony_JsTools.__name__ = true;
pony_JsTools.__interfaces__ = [pony_magic_HasSignal];
pony_JsTools.regDocReady = function() {
	var _e = pony_JsTools.eDocReady;
	var tmp = function(safe) {
		return pony_events__$Event0_Event0_$Impl_$.dispatch(_e,safe);
	};
	$global.docReady(tmp);
};
pony_JsTools.closeFS = function() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	} else if(document.msCancelFullScreen) {
		document.msCancelFullScreen();
	}
};
pony_JsTools.fse = function(e) {
	if($bind(e,e.requestFullscreen)) {
		e.requestFullscreen();
	} else if(e.mozRequestFullScreen) {
		e.mozRequestFullScreen();
	} else if(e.webkitRequestFullscreen) {
		e.webkitRequestFullscreen();
	} else if(e.msRequestFullscreen) {
		e.msRequestFullscreen();
	}
};
var pony_OrState = { __ename__ : true, __constructs__ : ["A","B"] };
pony_OrState.A = function(v) { var $x = ["A",0,v]; $x.__enum__ = pony_OrState; $x.toString = $estr; return $x; };
pony_OrState.B = function(v) { var $x = ["B",1,v]; $x.__enum__ = pony_OrState; $x.toString = $estr; return $x; };
var pony__$Tasks_Tasks_$Impl_$ = {};
pony__$Tasks_Tasks_$Impl_$.__name__ = true;
pony__$Tasks_Tasks_$Impl_$.add = function(this1) {
	var _g = this1;
	_g.a = _g.a + 1;
};
pony__$Tasks_Tasks_$Impl_$.end = function(this1) {
	var _g = this1;
	if((_g.a = _g.a - 1) == 0) {
		this1.b();
	}
};
var pony_ArrayTools = function() { };
pony_ArrayTools.__name__ = true;
pony_ArrayTools.pair = function(a,b) {
	var itA = $iterator(a)();
	var itB = $iterator(b)();
	return { hasNext : function() {
		if(itA.hasNext()) {
			return itB.hasNext();
		} else {
			return false;
		}
	}, next : function() {
		var this1 = { a : itA.next(), b : itB.next()};
		return this1;
	}};
};
pony_ArrayTools.fIndexOf = function(a,f) {
	var i = 0;
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		if(f(e)) {
			return i;
		}
		++i;
	}
	return -1;
};
var pony_FloatTools = function() { };
pony_FloatTools.__name__ = true;
pony_FloatTools._toFixed = function(v,n,begin,d,beginS,endS) {
	if(endS == null) {
		endS = "0";
	}
	if(beginS == null) {
		beginS = "0";
	}
	if(d == null) {
		d = ".";
	}
	if(begin == null) {
		begin = 0;
	}
	if(begin != 0) {
		var s = pony_FloatTools._toFixed(v,n,0,d,beginS,endS);
		var a = s.split(d);
		var d1 = begin - a[0].length;
		return pony_text_TextTools.repeat(beginS,d1) + s;
	}
	if(n == 0) {
		return Std.string(v | 0);
	}
	var p = Math.pow(10,n);
	v = Math.floor(v * p) / p;
	var s1 = v == null ? "null" : "" + v;
	var a1 = s1.split(".");
	if(a1.length <= 1) {
		return s1 + d + pony_text_TextTools.repeat(endS,n);
	} else {
		return a1[0] + d + a1[1] + pony_text_TextTools.repeat(endS,n - a1[1].length);
	}
};
var pony_Tumbler = function(enabled) {
	if(enabled == null) {
		enabled = true;
	}
	this.enabled = true;
	if(this.eChangeEnabled == null || enabled != this.enabled) {
		var prev = this.enabled;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeEnabled,this.enabled = enabled,prev,true);
	}
	var this1;
	if(this.eChangeEnabled == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this1 = this.eChangeEnabled = this2;
	} else {
		this1 = this.eChangeEnabled;
	}
	var s = pony_events__$Signal2_Signal2_$Impl_$.sub1(this1,true);
	var this3 = new pony_Priority(null,false);
	this3.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	var ns = this3;
	s.add({ once : false, listener : pony_events_Listener1Type.LEvent0(ns)});
	this.onEnable = ns;
	var this4;
	if(this.eChangeEnabled == null) {
		var this5 = new pony_Priority(null,false);
		this5.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this4 = this.eChangeEnabled = this5;
	} else {
		this4 = this.eChangeEnabled;
	}
	var s1 = pony_events__$Signal2_Signal2_$Impl_$.sub1(this4,false);
	var this6 = new pony_Priority(null,false);
	this6.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	var ns1 = this6;
	s1.add({ once : false, listener : pony_events_Listener1Type.LEvent0(ns1)});
	this.onDisable = ns1;
};
pony_Tumbler.__name__ = true;
pony_Tumbler.__interfaces__ = [pony_magic_HasSignal];
pony_Tumbler.prototype = {
	enable: function() {
		if(this.eChangeEnabled == null || true != this.enabled) {
			var prev = this.enabled;
			this.enabled = true;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeEnabled,true,prev,true);
		}
	}
	,disable: function() {
		if(this.eChangeEnabled == null || false != this.enabled) {
			var prev = this.enabled;
			this.enabled = false;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeEnabled,false,prev,true);
		}
	}
	,destroySignals: function() {
		if(this.eChangeEnabled != null) {
			var this1 = this.eChangeEnabled;
			if(this1 != null) {
				this1.destroy();
			}
		}
		this.eChangeEnabled = null;
	}
	,__class__: pony_Tumbler
};
var pony_TypedPool_$pony_$ui_$touch_$Touch = function() {
	this.list = [];
};
pony_TypedPool_$pony_$ui_$touch_$Touch.__name__ = true;
pony_TypedPool_$pony_$ui_$touch_$Touch.__interfaces__ = [pony_IPool];
pony_TypedPool_$pony_$ui_$touch_$Touch.prototype = {
	__class__: pony_TypedPool_$pony_$ui_$touch_$Touch
};
var pony_color__$UColor_UColor_$Impl_$ = {};
pony_color__$UColor_UColor_$Impl_$.__name__ = true;
pony_color__$UColor_UColor_$Impl_$.fromString = function(s) {
	s = StringTools.trim(s);
	var v;
	if(HxOverrides.substr(s,0,1) == "#") {
		v = Std.parseInt("0x" + HxOverrides.substr(s,1,null));
	} else if(HxOverrides.substr(s,0,3) == "rgb") {
		s = StringTools.ltrim(HxOverrides.substr(s,3,null));
		if(StringTools.startsWith(s,"(") && StringTools.endsWith(s,")")) {
			var d = HxOverrides.substr(s,1,s.length - 2).split(",").map(Std.parseInt);
			if(d.length != 3) {
				throw new js__$Boot_HaxeError("Color params error");
			}
			v = (d[0] << 16) + (d[1] << 8) + d[2];
		} else {
			throw new js__$Boot_HaxeError("Color syntax error");
		}
	} else if(HxOverrides.substr(s,0,4) == "argb") {
		s = StringTools.ltrim(HxOverrides.substr(s,4,null));
		if(StringTools.startsWith(s,"(") && StringTools.endsWith(s,")")) {
			var d1 = HxOverrides.substr(s,1,s.length - 2).split(",").map(Std.parseInt);
			if(d1.length != 4) {
				throw new js__$Boot_HaxeError("Color params error");
			}
			v = (d1[0] << 24) + (d1[1] << 16) + (d1[2] << 8) + d1[3];
		} else {
			throw new js__$Boot_HaxeError("Color syntax error");
		}
	} else {
		switch(s) {
		case "blue":
			v = 255;
			break;
		case "green":
			v = 65280;
			break;
		case "red":
			v = 16711680;
			break;
		default:
			throw new js__$Boot_HaxeError("Unknown color");
		}
	}
	var this1 = v;
	return this1;
};
var pony_events_Listener1Type = { __ename__ : true, __constructs__ : ["LFunction0","LFunction1","LEvent0","LEvent1","LSub","LNot","LBind1"] };
pony_events_Listener1Type.LFunction0 = function(f) { var $x = ["LFunction0",0,f]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LFunction1 = function(f) { var $x = ["LFunction1",1,f]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LEvent0 = function(s,safe) { var $x = ["LEvent0",2,s,safe]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LEvent1 = function(s,safe) { var $x = ["LEvent1",3,s,safe]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LSub = function(s,v) { var $x = ["LSub",4,s,v]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LNot = function(s,v) { var $x = ["LNot",5,s,v]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
pony_events_Listener1Type.LBind1 = function(s,v1) { var $x = ["LBind1",6,s,v1]; $x.__enum__ = pony_events_Listener1Type; $x.toString = $estr; return $x; };
var pony_events_Listener2Type = { __ename__ : true, __constructs__ : ["LFunction0","LFunction1","LFunction2","LEvent0","LEvent1","LEvent2","LSub","LSub1","LSub2","LNot","LNot1","LNot2"] };
pony_events_Listener2Type.LFunction0 = function(f) { var $x = ["LFunction0",0,f]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LFunction1 = function(f) { var $x = ["LFunction1",1,f]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LFunction2 = function(f) { var $x = ["LFunction2",2,f]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LEvent0 = function(s,safe) { var $x = ["LEvent0",3,s,safe]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LEvent1 = function(s,safe) { var $x = ["LEvent1",4,s,safe]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LEvent2 = function(s,safe) { var $x = ["LEvent2",5,s,safe]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LSub = function(s,v1,v2) { var $x = ["LSub",6,s,v1,v2]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LSub1 = function(s,v) { var $x = ["LSub1",7,s,v]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LSub2 = function(s,v) { var $x = ["LSub2",8,s,v]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LNot = function(s,v1,v2) { var $x = ["LNot",9,s,v1,v2]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LNot1 = function(s,v) { var $x = ["LNot1",10,s,v]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
pony_events_Listener2Type.LNot2 = function(s,v) { var $x = ["LNot2",11,s,v]; $x.__enum__ = pony_events_Listener2Type; $x.toString = $estr; return $x; };
var pony_events__$Signal1_Signal1_$Impl_$ = {};
pony_events__$Signal1_Signal1_$Impl_$.__name__ = true;
pony_events__$Signal1_Signal1_$Impl_$.sub = function(this1,a1,priority,once) {
	if(once == null) {
		once = false;
	}
	if(priority == null) {
		priority = 0;
	}
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		var _g = e1.listener;
		if(_g[1] == 4) {
			var val = _g[3];
			var sig = _g[2];
			if(val == a1) {
				if(this1.counters != null) {
					this1.counters.splice(1,this1.counters.length);
				}
				return sig;
			}
		}
	}
	var this2 = new pony_Priority(null,false);
	this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	var s = this2;
	this1.add({ once : once, listener : pony_events_Listener1Type.LSub(s,a1)},priority);
	return s;
};
var pony_events__$Signal2_Signal2_$Impl_$ = {};
pony_events__$Signal2_Signal2_$Impl_$.__name__ = true;
pony_events__$Signal2_Signal2_$Impl_$.sub1 = function(this1,a1,priority,once) {
	if(once == null) {
		once = false;
	}
	if(priority == null) {
		priority = 0;
	}
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		var _g = e1.listener;
		if(_g[1] == 7) {
			var v1 = _g[3];
			var sig = _g[2];
			if(v1 == a1) {
				if(this1.counters != null) {
					this1.counters.splice(1,this1.counters.length);
				}
				return sig;
			}
		}
	}
	var this2 = new pony_Priority(null,false);
	this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	var s = this2;
	this1.add({ once : once, listener : pony_events_Listener2Type.LSub1(s,a1)},priority);
	return s;
};
pony_events__$Signal2_Signal2_$Impl_$.not1 = function(this1,a1,priority,once) {
	if(once == null) {
		once = false;
	}
	if(priority == null) {
		priority = 0;
	}
	var e = this1.iterator();
	while(e.hasNext()) {
		var e1 = e.next();
		var _g = e1.listener;
		if(_g[1] == 10) {
			var val = _g[3];
			var sig = _g[2];
			if(val == a1) {
				if(this1.counters != null) {
					this1.counters.splice(1,this1.counters.length);
				}
				return sig;
			}
		}
	}
	var this2 = new pony_Priority(null,false);
	this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
	var s = this2;
	this1.add({ once : once, listener : pony_events_Listener2Type.LNot1(s,a1)},priority);
	return s;
};
var pony_events_WaitReady = function() {
	this.list = [];
	this.isReady = false;
};
pony_events_WaitReady.__name__ = true;
pony_events_WaitReady.prototype = {
	ready: function() {
		if(this.list == null) {
			return;
		}
		this.isReady = true;
		var _g = 0;
		var _g1 = this.list;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f();
		}
		this.list = null;
	}
	,wait: function(cb) {
		if(this.isReady) {
			cb();
		} else {
			this.list.push(cb);
		}
	}
	,__class__: pony_events_WaitReady
};
var pony_geom_VAlign = { __ename__ : true, __constructs__ : ["Top","Middle","Bottom"] };
pony_geom_VAlign.Top = ["Top",0];
pony_geom_VAlign.Top.toString = $estr;
pony_geom_VAlign.Top.__enum__ = pony_geom_VAlign;
pony_geom_VAlign.Middle = ["Middle",1];
pony_geom_VAlign.Middle.toString = $estr;
pony_geom_VAlign.Middle.__enum__ = pony_geom_VAlign;
pony_geom_VAlign.Bottom = ["Bottom",2];
pony_geom_VAlign.Bottom.toString = $estr;
pony_geom_VAlign.Bottom.__enum__ = pony_geom_VAlign;
var pony_geom_HAlign = { __ename__ : true, __constructs__ : ["Left","Center","Right"] };
pony_geom_HAlign.Left = ["Left",0];
pony_geom_HAlign.Left.toString = $estr;
pony_geom_HAlign.Left.__enum__ = pony_geom_HAlign;
pony_geom_HAlign.Center = ["Center",1];
pony_geom_HAlign.Center.toString = $estr;
pony_geom_HAlign.Center.__enum__ = pony_geom_HAlign;
pony_geom_HAlign.Right = ["Right",2];
pony_geom_HAlign.Right.toString = $estr;
pony_geom_HAlign.Right.__enum__ = pony_geom_HAlign;
var pony_geom__$Border_Border_$Impl_$ = {};
pony_geom__$Border_Border_$Impl_$.__name__ = true;
pony_geom__$Border_Border_$Impl_$.fromString = function(v) {
	if(v == null || v == "") {
		var left = null;
		var right = null;
		var bottom = null;
		var this1;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this1 = { top : 0, left : left, right : right, bottom : bottom};
		return this1;
	}
	var v1 = v.split(" ");
	return pony_geom__$Border_Border_$Impl_$.fromArray([parseFloat(v1[0]),parseFloat(v1[1]),parseFloat(v1[2]),parseFloat(v1[3])]);
};
pony_geom__$Border_Border_$Impl_$.fromArray = function(v) {
	var _g = v.length;
	switch(_g) {
	case 0:
		var left = null;
		var right = null;
		var bottom = null;
		var this1;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this1 = { top : 0, left : left, right : right, bottom : bottom};
		return this1;
	case 1:
		var top = v[0];
		var left1 = null;
		var right1 = null;
		var bottom1 = null;
		var this2;
		if(left1 == null) {
			left1 = top;
		}
		if(right1 == null) {
			right1 = left1;
		}
		if(bottom1 == null) {
			bottom1 = top;
		}
		this2 = { top : top, left : left1, right : right1, bottom : bottom1};
		return this2;
	case 2:
		var top1 = v[0];
		var left2 = v[1];
		var right2 = null;
		var bottom2 = null;
		var this3;
		if(left2 == null) {
			left2 = top1;
		}
		if(right2 == null) {
			right2 = left2;
		}
		if(bottom2 == null) {
			bottom2 = top1;
		}
		this3 = { top : top1, left : left2, right : right2, bottom : bottom2};
		return this3;
	case 3:
		var top2 = v[0];
		var left3 = v[1];
		var right3 = v[2];
		var bottom3 = null;
		var this4;
		if(left3 == null) {
			left3 = top2;
		}
		if(right3 == null) {
			right3 = left3;
		}
		if(bottom3 == null) {
			bottom3 = top2;
		}
		this4 = { top : top2, left : left3, right : right3, bottom : bottom3};
		return this4;
	case 4:
		var top3 = v[0];
		var left4 = v[1];
		var right4 = v[2];
		var bottom4 = v[3];
		var this5;
		if(left4 == null) {
			left4 = top3;
		}
		if(right4 == null) {
			right4 = left4;
		}
		if(bottom4 == null) {
			bottom4 = top3;
		}
		this5 = { top : top3, left : left4, right : right4, bottom : bottom4};
		return this5;
	default:
		throw new js__$Boot_HaxeError("Uncorrect array length");
	}
};
var pony_geom_Direction = { __ename__ : true, __constructs__ : ["left","right","up","down"] };
pony_geom_Direction.left = ["left",0];
pony_geom_Direction.left.toString = $estr;
pony_geom_Direction.left.__enum__ = pony_geom_Direction;
pony_geom_Direction.right = ["right",1];
pony_geom_Direction.right.toString = $estr;
pony_geom_Direction.right.__enum__ = pony_geom_Direction;
pony_geom_Direction.up = ["up",2];
pony_geom_Direction.up.toString = $estr;
pony_geom_Direction.up.__enum__ = pony_geom_Direction;
pony_geom_Direction.down = ["down",3];
pony_geom_Direction.down.toString = $estr;
pony_geom_Direction.down.__enum__ = pony_geom_Direction;
var pony_geom_GeomTools = function() { };
pony_geom_GeomTools.__name__ = true;
pony_geom_GeomTools.center = function(container,objects,vert,border,padding,align) {
	if(padding == null) {
		padding = true;
	}
	if(vert == null) {
		vert = false;
	}
	var cfun;
	if(align != null) {
		if(vert) {
			var _g = align.b;
			switch(_g[1]) {
			case 0:
				cfun = pony_geom_GeomTools.begin;
				break;
			case 1:
				cfun = pony_geom_GeomTools.centerA;
				break;
			case 2:
				cfun = pony_geom_GeomTools.end;
				break;
			}
		} else {
			var _g1 = align.a;
			switch(_g1[1]) {
			case 0:
				cfun = pony_geom_GeomTools.begin;
				break;
			case 1:
				cfun = pony_geom_GeomTools.centerA;
				break;
			case 2:
				cfun = pony_geom_GeomTools.end;
				break;
			}
		}
	} else {
		cfun = pony_geom_GeomTools.centerA;
	}
	var _fc = !padding && objects.length > 1 ? pony_geom_GeomTools.centerC : pony_geom_GeomTools.centerB;
	var fc;
	if(align != null) {
		if(!vert) {
			var _g2 = align.b;
			switch(_g2[1]) {
			case 0:
				fc = pony_geom_GeomTools.begin;
				break;
			case 1:
				fc = _fc;
				break;
			case 2:
				fc = pony_geom_GeomTools.end;
				break;
			}
		} else {
			var _g3 = align.a;
			switch(_g3[1]) {
			case 0:
				fc = pony_geom_GeomTools.begin;
				break;
			case 1:
				fc = _fc;
				break;
			case 2:
				fc = pony_geom_GeomTools.end;
				break;
			}
		}
	} else {
		fc = _fc;
	}
	var fa = vert ? cfun : fc;
	var fb = vert ? fc : cfun;
	if(border == null) {
		var left = null;
		var right = null;
		var bottom = null;
		var this1;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this1 = { top : 0, left : left, right : right, bottom : bottom};
		border = this1;
	}
	var w = container.x - (border.left + border.right);
	var h = container.y - (border.top + border.bottom);
	var _g4 = [];
	var _g11 = 0;
	while(_g11 < objects.length) {
		var obj = objects[_g11];
		++_g11;
		_g4.push(obj.x);
	}
	var a = fa(w,_g4);
	var _g12 = [];
	var _g21 = 0;
	while(_g21 < objects.length) {
		var obj1 = objects[_g21];
		++_g21;
		_g12.push(obj1.y);
	}
	var b = fb(h,_g12);
	var _g22 = [];
	var _g41 = 0;
	var _g31 = a.length;
	while(_g41 < _g31) {
		var i = _g41++;
		var this2 = { x : a[i] + border.left, y : b[i] + border.top};
		_g22.push(this2);
	}
	return _g22;
};
pony_geom_GeomTools.centerA = function(size,objects) {
	if(size == -1) {
		var _g = 0;
		while(_g < objects.length) {
			var obj = objects[_g];
			++_g;
			if(obj > size) {
				size = obj;
			}
		}
	}
	var _g1 = [];
	var _g11 = 0;
	while(_g11 < objects.length) {
		var obj1 = objects[_g11];
		++_g11;
		_g1.push((size - obj1) / 2);
	}
	return _g1;
};
pony_geom_GeomTools.centerB = function(size,objects) {
	var sum = 0;
	var _g = 0;
	while(_g < objects.length) {
		var obj = objects[_g];
		++_g;
		sum += obj;
	}
	var d = (size - sum) / (objects.length + 1);
	var pos = d;
	var r = [];
	var _g1 = 0;
	while(_g1 < objects.length) {
		var obj1 = objects[_g1];
		++_g1;
		r.push(pos);
		pos += obj1 + d;
	}
	return r;
};
pony_geom_GeomTools.centerC = function(size,objects) {
	var sum = 0;
	var _g = 0;
	while(_g < objects.length) {
		var obj = objects[_g];
		++_g;
		sum += obj;
	}
	var d = (size - sum) / (objects.length - 1);
	var pos = 0;
	var r = [];
	var _g1 = 0;
	while(_g1 < objects.length) {
		var obj1 = objects[_g1];
		++_g1;
		r.push(pos);
		pos += obj1 + d;
	}
	return r;
};
pony_geom_GeomTools.begin = function(size,objects) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < objects.length) {
		++_g1;
		_g.push(0);
	}
	return _g;
};
pony_geom_GeomTools.end = function(size,objects) {
	if(size == -1) {
		var _g = 0;
		while(_g < objects.length) {
			var obj = objects[_g];
			++_g;
			if(obj > size) {
				size = obj;
			}
		}
	}
	var _g1 = [];
	var _g11 = 0;
	while(_g11 < objects.length) {
		var obj1 = objects[_g11];
		++_g11;
		_g1.push(size - obj1);
	}
	return _g1;
};
pony_geom_GeomTools.valign = function(a,size,objects) {
	switch(a[1]) {
	case 0:
		var _g = [];
		var _g1 = 0;
		while(_g1 < objects.length) {
			++_g1;
			_g.push(0);
		}
		return _g;
	case 1:
		return pony_geom_GeomTools.centerA(size,objects);
	case 2:
		return pony_geom_GeomTools.end(size,objects);
	}
};
pony_geom_GeomTools.halign = function(a,size,objects) {
	switch(a[1]) {
	case 0:
		var _g = [];
		var _g1 = 0;
		while(_g1 < objects.length) {
			++_g1;
			_g.push(0);
		}
		return _g;
	case 1:
		return pony_geom_GeomTools.centerA(size,objects);
	case 2:
		return pony_geom_GeomTools.end(size,objects);
	}
};
pony_geom_GeomTools.pointsCeil = function(a) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < a.length) {
		var p = a[_g1];
		++_g1;
		_g.push(pony_geom__$Point_IntPoint_$Impl_$._new(p.x | 0,p.y | 0));
	}
	return _g;
};
var pony_geom_IWH = function() { };
pony_geom_IWH.__name__ = true;
pony_geom_IWH.prototype = {
	__class__: pony_geom_IWH
};
var pony_geom__$Point_IntPoint_$Impl_$ = {};
pony_geom__$Point_IntPoint_$Impl_$.__name__ = true;
pony_geom__$Point_IntPoint_$Impl_$._new = function(x,y) {
	var this1 = { x : x, y : y};
	return this1;
};
var pony_magic_Declarator = function() { };
pony_magic_Declarator.__name__ = true;
var pony_math_MathTools = function() { };
pony_math_MathTools.__name__ = true;
pony_math_MathTools.lengthAfterComma = function(v) {
	var a = (v == null ? "null" : "" + v).split(".");
	if(a.length < 2) {
		return 0;
	} else {
		return a[1].length;
	}
};
pony_math_MathTools.range = function(a,b) {
	var max = Math.max(a,b);
	var min = Math.min(a,b);
	var up = min < 0 ? -min : 0;
	max += up;
	min += up;
	return max - min;
};
var pony_pixi_ETextStyle = { __ename__ : true, __constructs__ : ["TEXT_STYLE","BITMAP_TEXT_STYLE"] };
pony_pixi_ETextStyle.TEXT_STYLE = function(style) { var $x = ["TEXT_STYLE",0,style]; $x.__enum__ = pony_pixi_ETextStyle; $x.toString = $estr; return $x; };
pony_pixi_ETextStyle.BITMAP_TEXT_STYLE = function(style) { var $x = ["BITMAP_TEXT_STYLE",1,style]; $x.__enum__ = pony_pixi_ETextStyle; $x.toString = $estr; return $x; };
var pony_pixi_FastMovieClip = function(data,frameTime,fixedTime,crop) {
	if(crop == null) {
		crop = 0;
	}
	if(fixedTime == null) {
		fixedTime = false;
	}
	this.loop = true;
	this.frame = 0;
	this.pool = [];
	var data1;
	switch(data[1]) {
	case 0:
		var t = data[2];
		data1 = t;
		break;
	case 1:
		var s = data[2];
		var _g = [];
		var _g1 = 0;
		while(_g1 < s.length) {
			var e = s[_g1];
			++_g1;
			_g.push(PIXI.Texture.fromFrame(e));
		}
		data1 = _g;
		break;
	}
	this.texture = data1[0];
	this.crop = crop;
	var first = true;
	var _g2 = [];
	var _g11 = 0;
	while(_g11 < data1.length) {
		var t1 = data1[_g11];
		++_g11;
		var this1 = { a : t1.trim, b : t1.frame};
		var p = this1;
		if(!first) {
			t1.destroy();
		} else {
			first = false;
		}
		_g2.push(p);
	}
	this.data = _g2;
	var tmp;
	if(fixedTime) {
		var this2 = { min : 0, max : frameTime};
		var tmp1;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this3 = new pony_Priority(null,false);
			this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp1 = pony_time_DeltaTime.eFixedUpdate = this3;
		} else {
			tmp1 = pony_time_DeltaTime.eFixedUpdate;
		}
		tmp = new pony_time_DTimer(tmp1,this2,-1);
	} else {
		var this4 = { min : 0, max : frameTime};
		var tmp2;
		if(pony_time_DeltaTime.eUpdate == null) {
			var this5 = new pony_Priority(null,false);
			this5.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp2 = pony_time_DeltaTime.eUpdate = this5;
		} else {
			tmp2 = pony_time_DeltaTime.eUpdate;
		}
		tmp = new pony_time_DTimer(tmp2,this4,-1);
	}
	this.timer = tmp;
	this.timer.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.tick))});
};
pony_pixi_FastMovieClip.__name__ = true;
pony_pixi_FastMovieClip.fromStorage = function(data,frameTime,fixedTime,crop) {
	if(crop == null) {
		crop = 0;
	}
	if(fixedTime == null) {
		fixedTime = false;
	}
	var t;
	switch(data[1]) {
	case 0:
		var t1 = data[2];
		t = t1[0];
		break;
	case 1:
		var s = data[2];
		t = PIXI.Texture.fromFrame(s[0]);
		break;
	}
	var n = t.baseTexture.imageUrl + "_" + t.frame.x + "_" + t.frame.y;
	var _this = pony_pixi_FastMovieClip.storage;
	if(!(__map_reserved[n] != null ? _this.existsReserved(n) : _this.h.hasOwnProperty(n))) {
		var this1 = pony_pixi_FastMovieClip.storage;
		var v = new pony_pixi_FastMovieClip(data,frameTime,fixedTime,crop);
		var _this1 = this1;
		if(__map_reserved[n] != null) {
			_this1.setReserved(n,v);
		} else {
			_this1.h[n] = v;
		}
		return v;
	} else {
		var _this2 = pony_pixi_FastMovieClip.storage;
		if(__map_reserved[n] != null) {
			return _this2.getReserved(n);
		} else {
			return _this2.h[n];
		}
	}
};
pony_pixi_FastMovieClip.prototype = {
	tick: function(dt) {
		if(this.loop && this.frame >= this.data.length - 1) {
			var n = 0;
			if(0 >= this.data.length) {
				n = this.data.length - 1;
			}
			this.texture.trim = this.data[n].a;
			var r = this.data[n].b;
			this.texture.frame = r;
			if(this.crop > 0) {
				if(this.texture.trim == null) {
					this.texture.trim = new PIXI.Rectangle(-this.crop,-this.crop,r.width + this.crop * 2,r.height + this.crop * 2);
				} else {
					this.texture.trim = new PIXI.Rectangle(this.texture.trim.x - this.crop,this.texture.trim.y - this.crop,this.texture.trim.width + this.crop * 2,this.texture.trim.height + this.crop * 2);
				}
			}
			this.frame = n;
		} else {
			var _g = this;
			var _g1 = _g.frame;
			var n1 = _g1 + 1;
			if(n1 < 0) {
				n1 = 0;
			} else if(n1 >= _g.data.length) {
				n1 = _g.data.length - 1;
			}
			_g.texture.trim = _g.data[n1].a;
			var r1 = _g.data[n1].b;
			_g.texture.frame = r1;
			if(_g.crop > 0) {
				if(_g.texture.trim == null) {
					_g.texture.trim = new PIXI.Rectangle(-_g.crop,-_g.crop,r1.width + _g.crop * 2,r1.height + _g.crop * 2);
				} else {
					_g.texture.trim = new PIXI.Rectangle(_g.texture.trim.x - _g.crop,_g.texture.trim.y - _g.crop,_g.texture.trim.width + _g.crop * 2,_g.texture.trim.height + _g.crop * 2);
				}
			}
			_g.frame = n1;
		}
		this.onFrameUpdate(this.frame,dt);
		if(!this.loop && this.frame >= this.data.length - 1) {
			var _this = this.timer;
			_this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
			this.timer.reset();
			var this1;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this1 = pony_time_DeltaTime.eFixedUpdate = this2;
			} else {
				this1 = pony_time_DeltaTime.eFixedUpdate;
			}
			var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.onComplete))};
			listener.once = true;
			this1.add(listener,0);
		}
	}
	,onComplete: function(dt) {
	}
	,onFrameUpdate: function(frame,dt) {
	}
	,__class__: pony_pixi_FastMovieClip
};
var pony_pixi_HtmlContainerBase = function(targetRect,app,targetStyle) {
	this.lastRect = null;
	var this1 = { x : .0, y : .0};
	this.targetPos = this1;
	this.set_targetRect(targetRect);
	if(app == null) {
		app = pony_pixi_App.main;
	}
	this.app = app;
	this.set_targetStyle(targetStyle);
	this.set_targetPos(this.targetPos);
};
pony_pixi_HtmlContainerBase.__name__ = true;
pony_pixi_HtmlContainerBase.prototype = {
	resizeHandler: function(scale) {
		this.lastRect = { x : scale * (this.targetRect.x + this.targetPos.x + this.app.container.x / this.app.container.width), y : scale * (this.targetRect.y + this.targetPos.y + this.app.container.y / this.app.container.height), width : scale * this.targetRect.width, height : scale * this.targetRect.height};
		this.lastRect.x += this.lastRect.width;
		this.lastRect.y += this.lastRect.height;
		this.resize();
	}
	,resize: function() {
		this.targetStyle.bottom = this.app.parentDom.clientHeight - this.lastRect.y + "px";
		this.targetStyle.right = this.app.parentDom.clientWidth - this.lastRect.x + "px";
		this.targetStyle.width = this.lastRect.width + "px";
		this.targetStyle.height = this.lastRect.height + "px";
	}
	,set_targetStyle: function(s) {
		this.targetStyle = s;
		if(s == null) {
			this.app.eResize.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.resizeHandler))});
			var this1 = this.app.eFrequentResize;
			this1.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.resize))});
		} else {
			s.position = "absolute";
			this.app.eResize.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.resizeHandler))});
			this.app.eFrequentResize.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.resize))});
			this.resizeHandler(this.app.scale);
		}
		return this.targetStyle;
	}
	,set_targetRect: function(v) {
		if(this.targetRect == null || v.x != this.targetRect.x || v.y != this.targetRect.y || v.width != this.targetRect.width || v.height != this.targetRect.height) {
			this.targetRect = v;
			if(this.targetStyle != null) {
				this.resizeHandler(this.app.scale);
			}
		}
		return v;
	}
	,set_targetPos: function(v) {
		if(v.x != this.targetPos.x || v.y != this.targetPos.y) {
			this.targetPos = v;
			this.resizeHandler(this.app.scale);
		}
		return v;
	}
	,__class__: pony_pixi_HtmlContainerBase
};
var pony_pixi_PixiAssets = function() { };
pony_pixi_PixiAssets.__name__ = true;
pony_pixi_PixiAssets.image = function(asset,name) {
	if(name == null) {
		return PIXI.Sprite.fromImage(pony_ui_AssetManager.baseUrl + StringTools.replace(asset,"{local}",pony_ui_AssetManager.local));
	} else {
		return PIXI.Sprite.fromFrame(name);
	}
};
pony_pixi_PixiAssets.texture = function(asset,name) {
	if(name == null) {
		return PIXI.Texture.fromImage(pony_ui_AssetManager.baseUrl + StringTools.replace(asset,"{local}",pony_ui_AssetManager.local));
	} else {
		return PIXI.Texture.fromFrame(name);
	}
};
pony_pixi_PixiAssets.cImage = function(asset,useSpriteSheet) {
	if(useSpriteSheet) {
		return PIXI.Sprite.fromFrame(asset);
	} else {
		return PIXI.Sprite.fromImage(pony_ui_AssetManager.baseUrl + StringTools.replace(asset,"{local}",pony_ui_AssetManager.local));
	}
};
pony_pixi_PixiAssets.text = function(asset) {
	var _this = pony_pixi_PixiAssets.texts;
	if(__map_reserved[asset] != null) {
		return _this.getReserved(asset);
	} else {
		return _this.h[asset];
	}
};
var pony_pixi_PixiExtends = function() { };
pony_pixi_PixiExtends.__name__ = true;
pony_pixi_PixiExtends.loadedList = function(a,f) {
	var i = a.length;
	if(i == 0) {
		f();
	} else {
		var _g = 0;
		while(_g < a.length) {
			var s = a[_g];
			++_g;
			pony_pixi_PixiExtendsTexture.loaded(s.texture,function() {
				if((i -= 1) == 0) {
					f();
				}
			});
		}
	}
};
var pony_pixi_PixiExtendsTexture = function() { };
pony_pixi_PixiExtendsTexture.__name__ = true;
pony_pixi_PixiExtendsTexture.loaded = function(t,f) {
	if(t.baseTexture.hasLoaded) {
		f();
	} else {
		t.baseTexture.once("loaded",function(_) {
			f();
		});
	}
};
var pony_pixi_TextureCut = function() { };
pony_pixi_TextureCut.__name__ = true;
pony_pixi_TextureCut.apply = function(texture,crop) {
	if(pony_pixi_TextureCut.list.indexOf([texture.baseTexture.imageUrl,texture.frame.x,texture.frame.y,texture.frame.width,texture.frame.height].join(";")) != -1) {
		return;
	}
	texture.frame = new PIXI.Rectangle(texture.frame.x + crop,texture.frame.y + crop,texture.frame.width - crop * 2,texture.frame.height - crop * 2);
	pony_pixi_TextureCut.list.push([texture.baseTexture.imageUrl,texture.frame.x,texture.frame.y,texture.frame.width,texture.frame.height].join(";"));
};
var pony_pixi_ui_BaseLayout = function() {
	PIXI.Sprite.call(this);
	this.layout.load = $bind(this,this.load);
	this.layout.getSize = $bind(this,this.getSize);
	this.layout.getSizeMod = pony_pixi_ui_BaseLayout.getSizeMod;
	this.layout.setXpos = $bind(this,this.setXpos);
	this.layout.setYpos = $bind(this,this.setYpos);
};
pony_pixi_ui_BaseLayout.__name__ = true;
pony_pixi_ui_BaseLayout.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_BaseLayout.getSizeMod = function(o,p) {
	var this1 = { x : p.x * o.scale.x, y : p.y * o.scale.y};
	return this1;
};
pony_pixi_ui_BaseLayout.__super__ = PIXI.Sprite;
pony_pixi_ui_BaseLayout.prototype = $extend(PIXI.Sprite.prototype,{
	add: function(obj) {
		this.addChild(obj);
		this.layout.add(obj);
	}
	,load: function(obj) {
		if(js_Boot.__instanceof(obj,PIXI.Sprite)) {
			pony__$Tasks_Tasks_$Impl_$.add(this.layout.tasks);
			var _e = this.layout.tasks;
			var f = function() {
				pony__$Tasks_Tasks_$Impl_$.end(_e);
			};
			pony_pixi_PixiExtendsTexture.loaded((js_Boot.__cast(obj , PIXI.Sprite)).texture,f);
		}
	}
	,setXpos: function(obj,v) {
		obj.x = v;
	}
	,setYpos: function(obj,v) {
		obj.y = v;
	}
	,wait: function(cb) {
		this.layout.wait(cb);
	}
	,getSize: function(o) {
		if(js_Boot.__instanceof(o,PIXI.extras.BitmapText)) {
			var this1 = { x : o.textWidth, y : o.textHeight};
			return this1;
		} else {
			var this2 = { x : o.width * o.scale.x, y : o.height * o.scale.y};
			return this2;
		}
	}
	,get_size: function() {
		if(this.visible) {
			return this.layout.get_size();
		} else {
			var this1 = { x : 0, y : 0};
			return this1;
		}
	}
	,destroy: function(options) {
		this.layout.destroy();
		this.layout = null;
		PIXI.Sprite.prototype.destroy.call(this,options);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_BaseLayout
});
var pony_pixi_ui_AlignLayout = function(align,border) {
	this.layout = new pony_ui_gui_AlignLayoutCore(align,border);
	pony_pixi_ui_BaseLayout.call(this);
};
pony_pixi_ui_AlignLayout.__name__ = true;
pony_pixi_ui_AlignLayout.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_AlignLayout.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_AlignLayout
});
var pony_pixi_ui_Bar = function(bg,fillBegin,fill,offset,invert,useSpriteSheet,creep,smooth) {
	if(smooth == null) {
		smooth = false;
	}
	if(creep == null) {
		creep = 0;
	}
	if(useSpriteSheet == null) {
		useSpriteSheet = false;
	}
	if(invert == null) {
		invert = false;
	}
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eReady = this1;
	this.invert = false;
	this._wait = new pony_events_WaitReady();
	PIXI.Sprite.call(this);
	this.invert = invert;
	this.smooth = smooth;
	var loadList;
	switch(bg[1]) {
	case 0:
		var v = bg[2];
		var s = pony_pixi_PixiAssets.cImage(v,useSpriteSheet);
		this.addChild(s);
		this.bg = pony_OrState.A(s);
		loadList = [s];
		break;
	case 1:
		var v1 = bg[2];
		this.bg = pony_OrState.B(v1);
		loadList = [];
		break;
	}
	this.barContainter = new PIXI.Sprite();
	this.addChild(this.barContainter);
	this.begin = pony_pixi_PixiAssets.cImage(fillBegin,useSpriteSheet);
	if(useSpriteSheet) {
		pony_pixi_TextureCut.apply(this.begin.texture,creep);
	}
	this.barContainter.addChild(this.begin);
	this.fill = pony_pixi_PixiAssets.cImage(fill,useSpriteSheet);
	if(useSpriteSheet) {
		pony_pixi_TextureCut.apply(this.fill.texture,creep);
	}
	this.barContainter.addChild(this.fill);
	if(useSpriteSheet) {
		var this11;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this11 = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			this11 = pony_time_DeltaTime.eFixedUpdate;
		}
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.init))};
		listener.once = true;
		this11.add(listener,0);
	} else {
		pony_pixi_PixiExtends.loadedList(loadList.concat([this.begin,this.fill]),pony_time_DeltaTime.notInstant($bind(this,this.init)));
	}
	if(offset != null) {
		this.fill.x = this.begin.x = offset.x;
		this.fill.y = this.begin.y = offset.y;
	}
	this.eReady.add({ once : false, listener : pony_events_Listener1Type.LFunction0(($_=this._wait,$bind($_,$_.ready)))},10);
};
pony_pixi_ui_Bar.__name__ = true;
pony_pixi_ui_Bar.__interfaces__ = [pony_geom_IWH,pony_magic_HasSignal];
pony_pixi_ui_Bar.__super__ = PIXI.Sprite;
pony_pixi_ui_Bar.prototype = $extend(PIXI.Sprite.prototype,{
	wait: function(cb) {
		this._wait.wait(cb);
	}
	,get_size: function() {
		var _g = this.bg;
		switch(_g[1]) {
		case 0:
			var v = _g[2];
			var this1 = { x : v.width, y : v.height};
			return this1;
		case 1:
			var v1 = _g[2];
			return v1;
		}
	}
	,init: function() {
		this.end = new PIXI.Sprite(this.begin.texture);
		this.end.x = this.begin.x;
		this.end.y = this.begin.y;
		this.barContainter.addChild(this.end);
		var size;
		var _g = this.bg;
		switch(_g[1]) {
		case 0:
			var v = _g[2];
			var this1 = { x : v.width | 0, y : v.height | 0};
			size = this1;
			break;
		case 1:
			var v1 = _g[2];
			size = v1;
			break;
		}
		var width = size.x - (this.begin.x + this.begin.width) * 2;
		var height = size.y - (this.begin.y + this.begin.height) * 2;
		var isVert = height > width;
		this.core = new pony_ui_gui_SmoothBarCore(isVert ? height : width,isVert,this.invert);
		var _this = this.core;
		var v2 = this.smooth;
		if(_this.eChangeSmooth == null || v2 != _this.smooth) {
			var prev = _this.smooth;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_this.eChangeSmooth,_this.smooth = v2,prev,true);
		}
		if(this.core.isVertical) {
			this.end.height = -this.end.height;
			this.fill.y = this.begin.y + this.begin.height;
		} else {
			this.end.width = -this.end.width;
			this.fill.x = this.begin.x + this.begin.width;
		}
		if(this.smooth) {
			this.core.smoothChangeX = $bind(this,this.changeXHandler);
			this.core.smoothChangeY = $bind(this,this.changeYHandler);
		} else {
			this.core.changeX = $bind(this,this.changeXHandler);
			this.core.changeY = $bind(this,this.changeYHandler);
		}
		this.core.endInit();
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eReady,size);
		var this2 = this.eReady;
		if(this2 != null) {
			this2.destroy();
		}
	}
	,changeXHandler: function(p) {
		this.fill.width = p;
		this.end.x = this.fill.x + this.fill.width + this.begin.width;
	}
	,changeYHandler: function(p) {
		this.fill.height = p;
		this.end.y = this.fill.y + this.fill.height + this.begin.height;
	}
	,destroy: function(options) {
		this.core.destroy();
		this.core = null;
		this.destroySignals();
		var _g = this.bg;
		if(_g[1] == 0) {
			var v = _g[2];
			this.removeChild(v);
			v.destroy();
		}
		this.bg = null;
		this.removeChild(this.begin);
		this.begin.destroy();
		this.begin = null;
		this.removeChild(this.fill);
		this.fill.destroy();
		this.fill = null;
		if(this.end != null) {
			this.removeChild(this.end);
			this.end.destroy();
			this.end = null;
		}
		PIXI.Sprite.prototype.destroy.call(this,options);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,destroySignals: function() {
		var this1 = this.eReady;
		if(this1 != null) {
			this1.destroy();
		}
		this.eReady = null;
	}
	,__class__: pony_pixi_ui_Bar
});
var pony_pixi_ui_AnimBar = function(bg,fillBegin,fill,animation,animationSpeed,offset,invert,useSpriteSheet,creep,smooth) {
	if(smooth == null) {
		smooth = false;
	}
	if(creep == null) {
		creep = 0;
	}
	if(useSpriteSheet == null) {
		useSpriteSheet = false;
	}
	if(invert == null) {
		invert = false;
	}
	if(animationSpeed == null) {
		animationSpeed = 2000;
	}
	pony_pixi_ui_Bar.call(this,pony_OrState.A(bg),fillBegin,fill,offset,invert,useSpriteSheet,creep,smooth);
	this.tween = new pony_time_Tween(null,null,animationSpeed,true,true,true,true);
	if(animation != null) {
		this.animation = pony_pixi_PixiAssets.cImage(animation,useSpriteSheet);
		this.animation.visible = false;
		if(offset != null) {
			this.animation.x = offset.x;
			this.animation.y = offset.y;
		}
		this.tween.eUpdate.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.animUpdate))});
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.animInit))};
		listener.once = true;
		this.eReady.add(listener,0);
	} else {
		this.tween.eUpdate.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.animUpdate2))});
	}
};
pony_pixi_ui_AnimBar.__name__ = true;
pony_pixi_ui_AnimBar.__super__ = pony_pixi_ui_Bar;
pony_pixi_ui_AnimBar.prototype = $extend(pony_pixi_ui_Bar.prototype,{
	animInit: function() {
		this.addChildAt(this.animation,this.children.length);
	}
	,animUpdate: function(alp) {
		this.animation.alpha = alp;
	}
	,animUpdate2: function(alp) {
		this.begin.alpha = this.fill.alpha = this.end.alpha = alp;
	}
	,startAnimation: function() {
		if(this.animation != null) {
			this.animation.visible = true;
		}
		this.tween.play();
	}
	,destroy: function(options) {
		this.tween.destroy();
		this.tween = null;
		if(this.animation != null) {
			this.removeChild(this.animation);
			this.animation.destroy();
			this.animation = null;
		}
		pony_pixi_ui_Bar.prototype.destroy.call(this,options);
	}
	,__class__: pony_pixi_ui_AnimBar
});
var pony_pixi_ui_AutoButton = function(s) {
	PIXI.Sprite.call(this);
	s.pivot.set(s.width / 2,s.height / 2);
	s.position = s.pivot;
	this.addChild(this.img = s);
	var this1 = { x : s.width, y : s.height};
	this._size = this1;
	this.hitArea = new PIXI.Rectangle(0,0,s.width,s.height);
	this.core = new pony_ui_gui_ButtonCore(new pony_ui_touch_pixi_Touchable(this));
	this.core.eVisual.add({ once : false, listener : pony_events_Listener2Type.LFunction2($bind(this,this.visualHandler))});
};
pony_pixi_ui_AutoButton.__name__ = true;
pony_pixi_ui_AutoButton.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_AutoButton.__super__ = PIXI.Sprite;
pony_pixi_ui_AutoButton.prototype = $extend(PIXI.Sprite.prototype,{
	visualHandler: function(mode,state) {
		if(mode == 1) {
			this.buttonMode = false;
			this.img.filters = pony_pixi_ui_AutoButton.GRAY_FILTER;
		} else {
			this.buttonMode = true;
			switch(state[1]) {
			case 0:
				this.img.filters = null;
				this.img.scale.set(1);
				break;
			case 1:case 2:
				this.img.filters = pony_pixi_ui_AutoButton.LIGHT_FILTER;
				this.img.scale.set(1.05);
				break;
			case 3:
				this.img.filters = pony_pixi_ui_AutoButton.DARK_FILTER;
				this.img.scale.set(0.95);
				break;
			}
		}
	}
	,get_size: function() {
		return this._size;
	}
	,wait: function(cb) {
		cb();
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_AutoButton
});
var pony_pixi_ui_BGLayout = function(img,vert,border) {
	if(vert == null) {
		vert = false;
	}
	var _gthis = this;
	this.layout = new pony_ui_gui_RubberLayoutCore(vert,border);
	pony__$Tasks_Tasks_$Impl_$.add(this.layout.tasks);
	pony_pixi_ui_BaseLayout.call(this);
	this.addChild(img);
	pony_pixi_PixiExtendsTexture.loaded(img.texture,function() {
		var _this = _gthis.layout;
		var v = img.width;
		if(_this.width != v) {
			_this.width = v;
			_this.update();
		}
		var _this1 = _gthis.layout;
		var v1 = img.height;
		if(_this1.height != v1) {
			_this1.height = v1;
			_this1.update();
		}
		pony__$Tasks_Tasks_$Impl_$.end(_gthis.layout.tasks);
	});
};
pony_pixi_ui_BGLayout.__name__ = true;
pony_pixi_ui_BGLayout.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_BGLayout.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_BGLayout
});
var pony_pixi_ui_BText = function(text,style,ansi,shadow) {
	if(shadow == null) {
		shadow = false;
	}
	this.shadow = false;
	PIXI.Sprite.call(this);
	this.style = style;
	this.ansi = ansi;
	this.shadow = shadow;
	if(shadow) {
		this.shadowStyle = { font : style.font, tint : 0};
	}
	this.defColor = style.tint;
	this.set_t(text);
};
pony_pixi_ui_BText.__name__ = true;
pony_pixi_ui_BText.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_BText.__super__ = PIXI.Sprite;
pony_pixi_ui_BText.prototype = $extend(PIXI.Sprite.prototype,{
	get_size: function() {
		if(this.current == null) {
			return null;
		} else {
			return this.current.get_size();
		}
	}
	,wait: function(cb) {
		cb();
	}
	,set_t: function(s) {
		if(this.current != null && this.current.text == s) {
			return s;
		}
		if(this.current != null) {
			this.removeChild(this.current);
			this.current.destroy();
		}
		if(this.currentShadow != null) {
			this.removeChild(this.currentShadow);
			this.currentShadow.destroy();
		}
		if(s == null) {
			return s;
		}
		s = StringTools.replace(s,"\\n","\n");
		this.current = new pony_pixi_ui_BTextLow(s,this.style,this.ansi);
		if(this.shadow) {
			this.currentShadow = new pony_pixi_ui_BTextLow(s,this.shadowStyle,this.ansi,true);
			this.currentShadow.filters = [pony_pixi_ui_BText.blurFilter];
			this.addChild(this.currentShadow);
		}
		this.addChild(this.current);
		return s;
	}
	,destroy: function(options) {
		if(this.current != null) {
			this.removeChild(this.current);
			this.current.destroy();
		}
		if(this.currentShadow != null) {
			this.removeChild(this.currentShadow);
			this.currentShadow.destroy();
		}
		this.ansi = null;
		this.style = null;
		PIXI.Sprite.prototype.destroy.call(this,options);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_BText
});
var pony_pixi_ui_BTextLow = function(text,style,ansi,nocache) {
	if(nocache == null) {
		nocache = false;
	}
	this.ansi = ansi;
	this.nocache = nocache;
	if(text == null) {
		text = " ";
	}
	if(ansi != null) {
		text = pony_text_TextTools.convertToANSI(text,ansi);
	}
	try {
		PIXI.extras.BitmapText.call(this,text,style);
	} catch( _ ) {
		throw new js__$Boot_HaxeError("Font error: " + Std.string(style.font));
	}
	if(!this.nocache) {
		this.cacheAsBitmap = true;
	}
};
pony_pixi_ui_BTextLow.__name__ = true;
pony_pixi_ui_BTextLow.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_BTextLow.__super__ = PIXI.extras.BitmapText;
pony_pixi_ui_BTextLow.prototype = $extend(PIXI.extras.BitmapText.prototype,{
	get_size: function() {
		var this1 = { x : this.textWidth, y : this.textHeight};
		return this1;
	}
	,wait: function(cb) {
		cb();
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_BTextLow
});
var pony_pixi_ui_Button = function(imgs,offset,useSpriteSheet) {
	this.prev = 0;
	var imgs1 = imgs.slice();
	this.wr = new pony_events_WaitReady();
	if(imgs1[0] == null) {
		throw new js__$Boot_HaxeError("Need first img");
	}
	if(imgs1[1] == null) {
		imgs1[1] = imgs1[2] != null ? imgs1[2] : imgs1[0];
	}
	if(imgs1[2] == null) {
		imgs1[2] = imgs1[1];
	}
	var z = imgs1.length > 3 ? imgs1.splice(3,1)[0] : null;
	if(z == null) {
		z = imgs1[0];
	}
	this.hideDisabled = imgs1[3] == null;
	var i = 4;
	while(i < imgs1.length) {
		if(imgs1[i + 1] == null) {
			imgs1[i + 1] = imgs1[i + 2] != null ? imgs1[i + 2] : imgs1[i];
		}
		if(imgs1[i + 2] == null) {
			imgs1[i + 2] = imgs1[i + 1];
		}
		i += 3;
	}
	var _g = [];
	var _g1 = 0;
	while(_g1 < imgs1.length) {
		var img = imgs1[_g1];
		++_g1;
		_g.push(img == null ? null : pony_pixi_ui_Button.getImg(img,useSpriteSheet));
	}
	this.list = _g;
	if(offset != null) {
		var _g11 = 0;
		var _g2 = this.list;
		while(_g11 < _g2.length) {
			var e = _g2[_g11];
			++_g11;
			if(e != null) {
				e.x = -offset.x;
				e.y = -offset.y;
			}
		}
	}
	PIXI.Sprite.call(this);
	this.zone = pony_pixi_ui_slices_SliceTools.getSliceSprite(useSpriteSheet != null ? StringTools.replace(z,"/","_") : z,useSpriteSheet);
	if(useSpriteSheet != null) {
		this.wr.ready();
	} else {
		pony_pixi_PixiExtendsTexture.loaded(this.zone.texture,($_=this.wr,$bind($_,$_.ready)));
	}
	this.addChild(this.zone);
	this.zone.buttonMode = true;
	this.zone.alpha = 0;
	this.core = new pony_ui_gui_ButtonImgN(new pony_ui_touch_pixi_Touchable(this.zone));
	this.core.eImg.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.imgHandler))});
	this.core.onDisable.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.disableHandler))});
	this.core.onEnable.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.enableHandler))});
	this.addChild(this.list[0]);
};
pony_pixi_ui_Button.__name__ = true;
pony_pixi_ui_Button.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_Button.getImg = function(img,useSpriteSheet) {
	var s = pony_pixi_ui_slices_SliceTools.getSliceSprite(useSpriteSheet != null ? StringTools.replace(img,"/","_") : img,useSpriteSheet);
	s.interactive = false;
	s.interactiveChildren = false;
	return s;
};
pony_pixi_ui_Button.__super__ = PIXI.Sprite;
pony_pixi_ui_Button.prototype = $extend(PIXI.Sprite.prototype,{
	disableHandler: function() {
		this.zone.buttonMode = false;
	}
	,enableHandler: function() {
		this.zone.buttonMode = true;
	}
	,wait: function(cb) {
		this.wr.wait(cb);
	}
	,get_size: function() {
		var this1 = { x : this.zone.sliceWidth, y : this.zone.sliceHeight};
		return this1;
	}
	,imgHandler: function(n) {
		if(n == 4 && this.hideDisabled) {
			this.visible = false;
			return;
		} else {
			this.visible = true;
		}
		if(this.prev != -1) {
			this.removeChild(this.list[this.prev]);
		}
		this.addChild(this.list[this.prev = n - 1]);
	}
	,destroy: function(options) {
		this.core.destroy();
		this.core = null;
		var _g = 0;
		var _g1 = this.list;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			this.removeChild(e);
			e.destroy();
		}
		this.list = null;
		this.removeChild(this.zone);
		this.zone.destroy();
		this.zone = null;
		this.wr = null;
		PIXI.Sprite.prototype.destroy.call(this,options);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_Button
});
var pony_pixi_ui_FSButton = function(imgs,offset,useSpriteSheet) {
	pony_pixi_ui_Button.call(this,imgs,offset,useSpriteSheet);
	this.fs = new pony_pixi_ui_FSButtonCore();
	this.fs.onEnable = $bind(this,this.fsEnableHandler);
	this.fs.onDisable = $bind(this,this.fsDisableHandler);
	pony_events__$Signal1_Signal1_$Impl_$.sub(this.core.eClick,1).add({ once : false, listener : pony_events_Listener0Type.LFunction0(($_=this.fs,$bind($_,$_.fsOff)))});
	pony_events__$Signal1_Signal1_$Impl_$.sub(this.core.eClick,0).add({ once : false, listener : pony_events_Listener0Type.LFunction0(($_=this.fs,$bind($_,$_.fsOn)))});
};
pony_pixi_ui_FSButton.__name__ = true;
pony_pixi_ui_FSButton.__super__ = pony_pixi_ui_Button;
pony_pixi_ui_FSButton.prototype = $extend(pony_pixi_ui_Button.prototype,{
	fsEnableHandler: function() {
		var _this = this.core;
		if(_this.eChangeBMode == null || true != _this.bMode) {
			var prev = _this.bMode;
			_this.bMode = true;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_this.eChangeBMode,true,prev,true);
		}
	}
	,fsDisableHandler: function() {
		var _this = this.core;
		if(_this.eChangeBMode == null || false != _this.bMode) {
			var prev = _this.bMode;
			_this.bMode = false;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_this.eChangeBMode,false,prev,true);
		}
	}
	,__class__: pony_pixi_ui_FSButton
});
var pony_pixi_ui_FSButtonCore = function() {
	pony_pixi_App.main.parentDom.addEventListener("fullscreenchange",$bind(this,this.setFullScreenImage));
	pony_pixi_App.main.parentDom.addEventListener("webkitfullscreenchange",$bind(this,this.setFullScreenImage));
	pony_pixi_App.main.parentDom.addEventListener("msfullscreenchange",$bind(this,this.setFullScreenImage));
	window.document.addEventListener("mozfullscreenchange",$bind(this,this.setFullScreenImage));
};
pony_pixi_ui_FSButtonCore.__name__ = true;
pony_pixi_ui_FSButtonCore.prototype = {
	onEnable: function() {
	}
	,onDisable: function() {
	}
	,setFullScreenImage: function() {
		if(window.document.fullscreenElement || window.document.mozFullScreen || window.document.mozFullscreenElement || window.document.webkitFullscreenElement || window.document.msFullscreenElement) {
			this.onEnable();
		} else {
			this.onDisable();
		}
	}
	,fsOn: function() {
		pony_pixi_App.main.fullscreen();
	}
	,fsOff: function() {
		pony_JsTools.closeFS();
	}
	,__class__: pony_pixi_ui_FSButtonCore
};
var pony_pixi_ui_HtmlContainer = function(targetRect,app) {
	PIXI.Sprite.call(this);
	var this1 = { x : targetRect.width, y : targetRect.height};
	this._size = this1;
	this.htmlContainer = new pony_pixi_HtmlContainerBase(targetRect,app);
	var this2;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this11 = new pony_Priority(null,false);
		this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this2 = pony_time_DeltaTime.eFixedUpdate = this11;
	} else {
		this2 = pony_time_DeltaTime.eFixedUpdate;
	}
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.posUpdate))};
	listener.once = true;
	this2.add(listener,0);
	pony_time_DeltaTime.skipUpdate($bind(this,this.posUpdate));
};
pony_pixi_ui_HtmlContainer.__name__ = true;
pony_pixi_ui_HtmlContainer.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_HtmlContainer.__super__ = PIXI.Sprite;
pony_pixi_ui_HtmlContainer.prototype = $extend(PIXI.Sprite.prototype,{
	wait: function(f) {
		f();
	}
	,posUpdate: function() {
		var gx = 0;
		var gy = 0;
		var p = this.parent;
		while(p.parent.parent != null) {
			gx += p.x;
			gy += p.y;
			p = p.parent;
		}
		var this1 = { x : gx, y : gy};
		this.htmlContainer.set_targetPos(this1);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_HtmlContainer
});
var pony_pixi_ui_HtmlVideoUI = function(targetRect,app,options) {
	pony_pixi_ui_HtmlContainer.call(this,targetRect,app);
	this.video = new pony_HtmlVideo(options);
	app.parentDom.appendChild(this.video.videoElement);
	this.htmlContainer.set_targetStyle(this.video.videoElement.style);
};
pony_pixi_ui_HtmlVideoUI.__name__ = true;
pony_pixi_ui_HtmlVideoUI.__super__ = pony_pixi_ui_HtmlContainer;
pony_pixi_ui_HtmlVideoUI.prototype = $extend(pony_pixi_ui_HtmlContainer.prototype,{
	__class__: pony_pixi_ui_HtmlVideoUI
});
var pony_pixi_ui_IntervalLayout = function(interval,vert,border,align) {
	if(vert == null) {
		vert = false;
	}
	this.layout = new pony_ui_gui_IntervalLayoutCore(interval,vert,border,align);
	pony_pixi_ui_BaseLayout.call(this);
};
pony_pixi_ui_IntervalLayout.__name__ = true;
pony_pixi_ui_IntervalLayout.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_IntervalLayout.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_IntervalLayout
});
var pony_pixi_ui_LabelBar = function(bg,fillBegin,fill,animation,animationSpeed,border,style,shadow,invert,useSpriteSheet,creep,smooth) {
	if(smooth == null) {
		smooth = false;
	}
	if(creep == null) {
		creep = 0;
	}
	if(useSpriteSheet == null) {
		useSpriteSheet = false;
	}
	if(invert == null) {
		invert = false;
	}
	if(shadow == null) {
		shadow = false;
	}
	if(animationSpeed == null) {
		animationSpeed = 2000;
	}
	this.labelInitVisible = true;
	this.style = style;
	this.shadow = shadow;
	this.border = border;
	var tmp;
	if(border == null) {
		tmp = null;
	} else {
		var this1 = { x : border.left, y : border.top};
		tmp = this1;
	}
	pony_pixi_ui_AnimBar.call(this,bg,fillBegin,fill,animation,animationSpeed,tmp,invert,useSpriteSheet,creep,smooth);
	if(style != null) {
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.labelInit))};
		listener.once = true;
		this.eReady.add(listener,0);
	}
};
pony_pixi_ui_LabelBar.__name__ = true;
pony_pixi_ui_LabelBar.__super__ = pony_pixi_ui_AnimBar;
pony_pixi_ui_LabelBar.prototype = $extend(pony_pixi_ui_AnimBar.prototype,{
	labelInit: function(p) {
		this.label = new pony_pixi_ui_TextSizedBox(p.x,p.y,"",this.style,this.border,null,true,this.shadow);
		this.label.visible = this.labelInitVisible;
		this.addChild(this.label);
		this.style = null;
	}
	,startAnimation: function() {
		if(this.label == null) {
			this.labelInitVisible = false;
		} else {
			this.label.visible = false;
		}
		pony_pixi_ui_AnimBar.prototype.startAnimation.call(this);
	}
	,destroy: function(options) {
		this.border = null;
		this.style = null;
		if(this.label != null) {
			this.label.destroy();
			this.label = null;
		}
		pony_pixi_ui_AnimBar.prototype.destroy.call(this,options);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_LabelBar
});
var pony_pixi_ui_LabelButton = function(imgs,vert,border,offset,useSpriteSheet) {
	if(vert == null) {
		vert = false;
	}
	var _gthis = this;
	this.layout = new pony_ui_gui_RubberLayoutCore(vert,border);
	pony__$Tasks_Tasks_$Impl_$.add(this.layout.tasks);
	pony_pixi_ui_BaseLayout.call(this);
	this.button = new pony_pixi_ui_Button(imgs,offset,useSpriteSheet);
	this.addChild(this.button);
	this.button.wr.wait(function() {
		var _this = _gthis.layout;
		var _this1 = _gthis.button;
		var this1 = { x : _this1.zone.sliceWidth, y : _this1.zone.sliceHeight};
		var v = this1.x;
		if(_this.width != v) {
			_this.width = v;
			_this.update();
		}
		var _this2 = _gthis.layout;
		var _this3 = _gthis.button;
		var this2 = { x : _this3.zone.sliceWidth, y : _this3.zone.sliceHeight};
		var v1 = this2.y;
		if(_this2.height != v1) {
			_this2.height = v1;
			_this2.update();
		}
		pony__$Tasks_Tasks_$Impl_$.end(_gthis.layout.tasks);
	});
};
pony_pixi_ui_LabelButton.__name__ = true;
pony_pixi_ui_LabelButton.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_LabelButton.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	add: function(obj) {
		obj.interactive = false;
		obj.interactiveChildren = false;
		obj.hitArea = new PIXI.Rectangle(0,0,0,0);
		pony_pixi_ui_BaseLayout.prototype.add.call(this,obj);
	}
	,destroy: function(options) {
		this.removeChild(this.button);
		this.button.destroy();
		this.button = null;
		pony_pixi_ui_BaseLayout.prototype.destroy.call(this,options);
	}
	,__class__: pony_pixi_ui_LabelButton
});
var pony_pixi_ui_Mask = function(w,h,radius,obj) {
	PIXI.Sprite.call(this);
	this.objMask = new PIXI.Graphics();
	this.objMask.beginFill(6710886);
	this.objMask.drawRoundedRect(0,0,w,h,radius);
	obj.mask = this.objMask;
	this.addChild(this.objMask);
	this.addChild(obj);
};
pony_pixi_ui_Mask.__name__ = true;
pony_pixi_ui_Mask.__super__ = PIXI.Sprite;
pony_pixi_ui_Mask.prototype = $extend(PIXI.Sprite.prototype,{
	__class__: pony_pixi_ui_Mask
});
var pony_pixi_ui_ProgressBar = function(bg,fillBegin,fill,animation,animationSpeed,border,style,shadow,invert,useSpriteSheet,creep,smooth) {
	if(smooth == null) {
		smooth = false;
	}
	if(creep == null) {
		creep = 0;
	}
	if(useSpriteSheet == null) {
		useSpriteSheet = false;
	}
	if(invert == null) {
		invert = false;
	}
	if(shadow == null) {
		shadow = false;
	}
	if(animationSpeed == null) {
		animationSpeed = 2000;
	}
	pony_pixi_ui_LabelBar.call(this,bg,fillBegin,fill,animation,animationSpeed,border,style,shadow,invert,useSpriteSheet,creep,smooth);
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.initProgressBar))};
	listener.once = true;
	this.eReady.add(listener,0);
};
pony_pixi_ui_ProgressBar.__name__ = true;
pony_pixi_ui_ProgressBar.__super__ = pony_pixi_ui_LabelBar;
pony_pixi_ui_ProgressBar.prototype = $extend(pony_pixi_ui_LabelBar.prototype,{
	initProgressBar: function() {
		if(this.label == null) {
			return;
		}
		this.setLabel(0);
		var _this = this.core;
		var this1;
		if(_this.eChangePercent == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = _this.eChangePercent = this2;
		} else {
			this1 = _this.eChangePercent;
		}
		this1.add({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.setLabel))});
	}
	,setLabel: function(v) {
		if(this.label != null) {
			this.label.set_text((v * 100 | 0) + "%");
		}
	}
	,__class__: pony_pixi_ui_ProgressBar
});
var pony_pixi_ui_RenderBox = function(w,h,app,canvas) {
	this.app = app == null ? pony_pixi_App.main : app;
	if(!canvas) {
		this.renderTexture = PIXI.RenderTexture.create(w,h);
	}
	PIXI.Sprite.call(this,this.renderTexture);
	var this1 = { x : w, y : h};
	this.container = new pony_pixi_ui_RenderContainer(this1);
};
pony_pixi_ui_RenderBox.__name__ = true;
pony_pixi_ui_RenderBox.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_RenderBox.__super__ = PIXI.Sprite;
pony_pixi_ui_RenderBox.prototype = $extend(PIXI.Sprite.prototype,{
	update: function() {
		if(this.renderTexture != null) {
			this.app.app.renderer.render(this.container,this.renderTexture,true);
		} else {
			var _renderer = new PIXI.CanvasRenderer(null,this.container._size.x,this.container._size.y);
			_renderer.transparent = true;
			_renderer.render(this.container);
			this.texture = PIXI.Texture.fromCanvas(_renderer.view);
		}
	}
	,wait: function(f) {
		this.container.wait(f);
	}
	,destroyIWH: function() {
		this.container.destroyIWH();
		this.destroy();
	}
	,__class__: pony_pixi_ui_RenderBox
});
var pony_pixi_ui_RenderContainer = function(size) {
	PIXI.Sprite.call(this);
	this._size = size;
};
pony_pixi_ui_RenderContainer.__name__ = true;
pony_pixi_ui_RenderContainer.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_RenderContainer.__super__ = PIXI.Sprite;
pony_pixi_ui_RenderContainer.prototype = $extend(PIXI.Sprite.prototype,{
	wait: function(f) {
		f();
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_RenderContainer
});
var pony_pixi_ui_RubberLayout = function(layoutWidth,layoutHeight,vert,border,padding,align) {
	if(padding == null) {
		padding = true;
	}
	if(vert == null) {
		vert = false;
	}
	this.layout = new pony_ui_gui_RubberLayoutCore(vert,border,padding,align);
	var _this = this.layout;
	if(_this.width != layoutWidth) {
		_this.width = layoutWidth;
		_this.update();
	}
	var _this1 = this.layout;
	if(_this1.height != layoutHeight) {
		_this1.height = layoutHeight;
		_this1.update();
	}
	pony_pixi_ui_BaseLayout.call(this);
};
pony_pixi_ui_RubberLayout.__name__ = true;
pony_pixi_ui_RubberLayout.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_RubberLayout.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_RubberLayout
});
var pony_pixi_ui_SizedSprite = function(p) {
	this._size = p;
	PIXI.Sprite.call(this);
};
pony_pixi_ui_SizedSprite.__name__ = true;
pony_pixi_ui_SizedSprite.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_SizedSprite.__super__ = PIXI.Sprite;
pony_pixi_ui_SizedSprite.prototype = $extend(PIXI.Sprite.prototype,{
	wait: function(cb) {
		cb();
	}
	,get_size: function() {
		return this._size;
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_SizedSprite
});
var pony_pixi_ui_StepSlider = function(labelButton,w,h,invert,draggable) {
	if(draggable == null) {
		draggable = true;
	}
	if(invert == null) {
		invert = false;
	}
	PIXI.Sprite.call(this);
	this.labelButton = labelButton;
	this.addChild(labelButton);
	var isVert = h > w;
	this.sliderCore = new pony_ui_gui_StepSliderCore(labelButton.button.core,isVert ? h : w,isVert,invert,draggable);
	this.sliderCore.changeX = $bind(this,this.changeXHandler);
	this.sliderCore.changeY = $bind(this,this.changeXHandler);
};
pony_pixi_ui_StepSlider.__name__ = true;
pony_pixi_ui_StepSlider.__super__ = PIXI.Sprite;
pony_pixi_ui_StepSlider.prototype = $extend(PIXI.Sprite.prototype,{
	changeXHandler: function(v) {
		this.labelButton.x = v;
	}
	,add: function(obj) {
		this.labelButton.add(obj);
	}
	,__class__: pony_pixi_ui_StepSlider
});
var pony_pixi_ui_TextBox = function(image,text,style,ansi,border,nocache,shadow) {
	if(shadow == null) {
		shadow = false;
	}
	if(nocache == null) {
		nocache = false;
	}
	var _gthis = this;
	this.nocache = nocache;
	this.layout = new pony_ui_gui_RubberLayoutCore(null,border);
	pony__$Tasks_Tasks_$Impl_$.add(this.layout.tasks);
	pony_pixi_ui_BaseLayout.call(this);
	this.addChild(image);
	pony_pixi_PixiExtendsTexture.loaded(image.texture,function() {
		var _this = _gthis.layout;
		var v = image.width;
		if(_this.width != v) {
			_this.width = v;
			_this.update();
		}
		var _this1 = _gthis.layout;
		var v1 = image.height;
		if(_this1.height != v1) {
			_this1.height = v1;
			_this1.update();
		}
		pony__$Tasks_Tasks_$Impl_$.end(_gthis.layout.tasks);
	});
	if(style[1] == 1) {
		var s = style[2];
		this.add(this.obj = new pony_pixi_ui_BText(text,s,ansi,shadow));
	} else {
		throw new js__$Boot_HaxeError("Not supported");
	}
};
pony_pixi_ui_TextBox.__name__ = true;
pony_pixi_ui_TextBox.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_TextBox.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_TextBox
});
var pony_pixi_ui_TextButton = function(color,text,font,ansi,line,linepos) {
	if(linepos == null) {
		linepos = 0;
	}
	if(line == null) {
		line = 0;
	}
	PIXI.Sprite.call(this);
	this.color = color;
	this.btext = new pony_pixi_ui_BTextLow(text,{ font : font, tint : color[0] & 16777215},ansi,true);
	this.btext.interactive = false;
	this.btext.interactiveChildren = false;
	this.addChild(this.btext);
	var g = new PIXI.Graphics();
	g.lineStyle();
	g.beginFill(0,0);
	g.drawRect(0,0,this.btext.get_size().x,this.btext.get_size().y);
	g.endFill();
	this.addChildAt(g,0);
	g.buttonMode = true;
	if(line > 0) {
		this.lines = [];
		var _g = 0;
		while(_g < color.length) {
			var c = color[_g];
			++_g;
			var g1 = new PIXI.Graphics();
			g1.lineStyle(line,c & 16777215,1 - _$UInt_UInt_$Impl_$.toFloat(c >>> 24 & 255) / _$UInt_UInt_$Impl_$.toFloat(255));
			var pos = 0;
			var step = false;
			while(pos <= this.btext.get_size().x) {
				var end = false;
				if(pos == this.btext.get_size().x) {
					end = true;
				}
				if(step) {
					g1.lineTo(pos,this.btext.get_size().y);
					pos += 5;
				} else {
					g1.moveTo(pos,this.btext.get_size().y);
					pos += 10;
				}
				if(end) {
					break;
				} else if(pos > this.btext.get_size().x) {
					pos = this.btext.get_size().x;
				}
				step = !step;
			}
			g1.y = linepos;
			g1.visible = false;
			this.addChild(g1);
			this.lines.push(g1);
			if(this.lines.length > 2) {
				break;
			}
		}
		this.prevline = this.lines[0];
		this.prevline.visible = true;
	}
	this.core = new pony_ui_gui_ButtonImgN(new pony_ui_touch_pixi_Touchable(g));
	this.core.eImg.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.imgHandler))});
};
pony_pixi_ui_TextButton.__name__ = true;
pony_pixi_ui_TextButton.__interfaces__ = [pony_geom_IWH];
pony_pixi_ui_TextButton.__super__ = PIXI.Sprite;
pony_pixi_ui_TextButton.prototype = $extend(PIXI.Sprite.prototype,{
	imgHandler: function(n) {
		--n;
		if(n > this.color.length) {
			n = this.color.length - 1;
		}
		this.btext.tint = this.color[n];
		if(this.prevline != null) {
			this.prevline.visible = false;
			this.prevline = null;
		}
		if(this.lines[n] != null) {
			this.lines[n].visible = true;
			this.prevline = this.lines[n];
		}
	}
	,get_size: function() {
		return this.btext.get_size();
	}
	,wait: function(cb) {
		this.btext.wait(cb);
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,__class__: pony_pixi_ui_TextButton
});
var pony_pixi_ui_TextSizedBox = function(w,h,text,style,border,align,nocache,shadow) {
	if(shadow == null) {
		shadow = false;
	}
	if(nocache == null) {
		nocache = false;
	}
	this.noupdate = false;
	var f = align != null && align.b != pony_geom_HAlign.Center;
	this.nocache = nocache;
	this.layout = new pony_ui_gui_RubberLayoutCore(f,border,null,align);
	pony__$Tasks_Tasks_$Impl_$.add(this.layout.tasks);
	var _this = this.layout;
	if(_this.width != w) {
		_this.width = w;
		_this.update();
	}
	var _this1 = this.layout;
	if(_this1.height != h) {
		_this1.height = h;
		_this1.update();
	}
	pony_pixi_ui_BaseLayout.call(this);
	switch(style[1]) {
	case 0:
		throw new js__$Boot_HaxeError("Not supported");
		break;
	case 1:
		var t = style[2];
		this.obj = new pony_pixi_ui_BText(text,t,null,shadow);
		this.add(this.obj);
		break;
	}
	pony__$Tasks_Tasks_$Impl_$.end(this.layout.tasks);
};
pony_pixi_ui_TextSizedBox.__name__ = true;
pony_pixi_ui_TextSizedBox.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_TextSizedBox.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	set_text: function(v) {
		var _this = this.obj;
		if((_this.current == null ? null : _this.current.text) != v) {
			this.obj.set_t(v);
			if(!this.noupdate) {
				this.layout.update();
				var this1;
				if(pony_time_DeltaTime.eFixedUpdate == null) {
					var this2 = new pony_Priority(null,false);
					this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
					this1 = pony_time_DeltaTime.eFixedUpdate = this2;
				} else {
					this1 = pony_time_DeltaTime.eFixedUpdate;
				}
				var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(($_=this.layout,$bind($_,$_.update)))};
				listener.once = true;
				this1.add(listener,0);
				var this3;
				if(pony_time_DeltaTime.eFixedUpdate == null) {
					var this4 = new pony_Priority(null,false);
					this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
					this3 = pony_time_DeltaTime.eFixedUpdate = this4;
				} else {
					this3 = pony_time_DeltaTime.eFixedUpdate;
				}
				var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this._update))};
				listener1.once = true;
				this3.add(listener1,0);
			}
		}
		return v;
	}
	,_update: function() {
		var this1;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this1 = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			this1 = pony_time_DeltaTime.eFixedUpdate;
		}
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(($_=this.layout,$bind($_,$_.update)))};
		listener.once = true;
		this1.add(listener,0);
	}
	,destroy: function(options) {
		var this1;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this1 = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			this1 = pony_time_DeltaTime.eFixedUpdate;
		}
		this1.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this._update))});
		var this3;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this4 = new pony_Priority(null,false);
			this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this3 = pony_time_DeltaTime.eFixedUpdate = this4;
		} else {
			this3 = pony_time_DeltaTime.eFixedUpdate;
		}
		this3.remove({ once : false, listener : pony_events_Listener1Type.LFunction0(($_=this.layout,$bind($_,$_.update)))});
		pony_pixi_ui_BaseLayout.prototype.destroy.call(this,options);
	}
	,__class__: pony_pixi_ui_TextSizedBox
});
var pony_pixi_ui_TimeBar = function(bg,fillBegin,fill,animation,animationSpeed,border,style,shadow,invert,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	if(useSpriteSheet == null) {
		useSpriteSheet = false;
	}
	if(invert == null) {
		invert = false;
	}
	if(shadow == null) {
		shadow = false;
	}
	if(animationSpeed == null) {
		animationSpeed = 2000;
	}
	this.ignoreBeginAnimation = false;
	this.labelInitVisible = false;
	pony_pixi_ui_LabelBar.call(this,bg,fillBegin,fill,animation,animationSpeed,border,style,shadow,invert,useSpriteSheet,creep);
	var tmp;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this1 = new pony_Priority(null,false);
		this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		tmp = pony_time_DeltaTime.eFixedUpdate = this1;
	} else {
		tmp = pony_time_DeltaTime.eFixedUpdate;
	}
	this.timer = new pony_time_DTimer(tmp,null,0);
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.timerInit))};
	listener.once = true;
	this.eReady.add(listener,0);
};
pony_pixi_ui_TimeBar.__name__ = true;
pony_pixi_ui_TimeBar.__super__ = pony_pixi_ui_LabelBar;
pony_pixi_ui_TimeBar.prototype = $extend(pony_pixi_ui_LabelBar.prototype,{
	timerInit: function(p) {
		this.timer.eProgress.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.progressHandler))});
		this.timer.eUpdate.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.updateHandler))});
		this.timer.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.startAnimation))},-10);
		if(this.label != null) {
			this.label.set_text("00:00");
		}
		if(!this.ignoreBeginAnimation) {
			this.startAnimation();
		}
	}
	,progressHandler: function(p) {
		var _this = this.core;
		if(_this.eChangePercent == null || p != _this.percent) {
			var prev = _this.percent;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_this.eChangePercent,_this.percent = p,prev,true);
		}
	}
	,updateHandler: function(t) {
		var s = pony_FloatTools._toFixed(Math.abs(((t / 1000 | 0) / 60 | 0) % 60),0,2,".","0","0") + ":" + pony_FloatTools._toFixed(Math.abs((t / 1000 | 0) % 60),0,2,".","0","0");
		if(this.label != null) {
			this.label.set_text(s);
		}
	}
	,destroy: function(options) {
		this.timer.destroy();
		this.timer = null;
		pony_pixi_ui_LabelBar.prototype.destroy.call(this,options);
	}
	,__class__: pony_pixi_ui_TimeBar
});
var pony_pixi_ui_ZeroPlace = function() {
	this.layout = new pony_ui_gui_ZeroPlaceCore();
	pony_pixi_ui_BaseLayout.call(this);
};
pony_pixi_ui_ZeroPlace.__name__ = true;
pony_pixi_ui_ZeroPlace.__super__ = pony_pixi_ui_BaseLayout;
pony_pixi_ui_ZeroPlace.prototype = $extend(pony_pixi_ui_BaseLayout.prototype,{
	__class__: pony_pixi_ui_ZeroPlace
});
var pony_pixi_ui_slices_SliceSprite = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	this.inited = false;
	PIXI.Sprite.call(this);
	this.creep = creep;
	if(useSpriteSheet != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < data.length) {
			var e = data[_g1];
			++_g1;
			_g.push(pony_pixi_PixiAssets.image(useSpriteSheet,e));
		}
		this.images = _g;
	} else {
		var _g2 = [];
		var _g11 = 0;
		while(_g11 < data.length) {
			var e1 = data[_g11];
			++_g11;
			_g2.push(pony_pixi_PixiAssets.image(e1));
		}
		this.images = _g2;
	}
	pony_pixi_PixiExtends.loadedList(this.images,$bind(this,this.init));
};
pony_pixi_ui_slices_SliceSprite.__name__ = true;
pony_pixi_ui_slices_SliceSprite.__super__ = PIXI.Sprite;
pony_pixi_ui_slices_SliceSprite.prototype = $extend(PIXI.Sprite.prototype,{
	init: function() {
		this.inited = true;
		if(this.sliceWidth != null) {
			this.set_sliceWidth(this.sliceWidth);
		} else {
			this.set_sliceWidth(this.images[0].width);
		}
		if(this.sliceHeight != null) {
			this.set_sliceHeight(this.sliceHeight);
		} else {
			this.set_sliceHeight(this.images[0].height);
		}
		var _g = 0;
		var _g1 = this.images;
		while(_g < _g1.length) {
			var img = _g1[_g];
			++_g;
			this.addChild(img);
		}
	}
	,set_sliceWidth: function(v) {
		this.sliceWidth = v;
		if(!this.inited) {
			return v;
		}
		var _g = 0;
		var _g1 = this.images;
		while(_g < _g1.length) {
			var img = _g1[_g];
			++_g;
			img.width = v;
		}
		return v;
	}
	,set_sliceHeight: function(v) {
		this.sliceHeight = v;
		if(!this.inited) {
			return v;
		}
		var _g = 0;
		var _g1 = this.images;
		while(_g < _g1.length) {
			var img = _g1[_g];
			++_g;
			img.height = v;
		}
		return v;
	}
	,__class__: pony_pixi_ui_slices_SliceSprite
});
var pony_pixi_ui_slices_Slice3H = function(data,useSpriteSheet,creep) {
	pony_pixi_ui_slices_SliceSprite.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice3H.__name__ = true;
pony_pixi_ui_slices_Slice3H.__super__ = pony_pixi_ui_slices_SliceSprite;
pony_pixi_ui_slices_Slice3H.prototype = $extend(pony_pixi_ui_slices_SliceSprite.prototype,{
	init: function() {
		this.images[1].x = this.images[0].width - this.creep;
		if(this.sliceWidth == null) {
			this.set_sliceWidth(this.images[0].width + this.images[1].width + this.images[2].width);
		}
		pony_pixi_ui_slices_SliceSprite.prototype.init.call(this);
	}
	,set_sliceWidth: function(v) {
		this.sliceWidth = v;
		this.update();
		return v;
	}
	,update: function() {
		if(!this.inited) {
			return;
		}
		this.images[1].width = this.sliceWidth - this.images[0].width - this.images[2].width + this.creep * 2;
		this.images[2].x = this.images[0].width + this.images[1].width - this.creep * 2;
	}
	,__class__: pony_pixi_ui_slices_Slice3H
});
var pony_pixi_ui_slices_Slice2H = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	data.push(data[0]);
	pony_pixi_ui_slices_Slice3H.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice2H.__name__ = true;
pony_pixi_ui_slices_Slice2H.__super__ = pony_pixi_ui_slices_Slice3H;
pony_pixi_ui_slices_Slice2H.prototype = $extend(pony_pixi_ui_slices_Slice3H.prototype,{
	init: function() {
		pony_pixi_ui_slices_Slice3H.prototype.init.call(this);
		var o = this.images[2];
		o.scale.x = -o.scale.x;
	}
	,update: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice3H.prototype.update.call(this);
		var o = this.images[2];
		o.x += o.width;
	}
	,__class__: pony_pixi_ui_slices_Slice2H
});
var pony_pixi_ui_slices_Slice3V = function(data,useSpriteSheet,creep) {
	pony_pixi_ui_slices_SliceSprite.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice3V.__name__ = true;
pony_pixi_ui_slices_Slice3V.__super__ = pony_pixi_ui_slices_SliceSprite;
pony_pixi_ui_slices_Slice3V.prototype = $extend(pony_pixi_ui_slices_SliceSprite.prototype,{
	init: function() {
		this.images[1].y = this.images[0].height - this.creep;
		if(this.sliceHeight == null) {
			this.set_sliceHeight(this.images[0].height + this.images[1].height + this.images[2].height);
		}
		pony_pixi_ui_slices_SliceSprite.prototype.init.call(this);
	}
	,set_sliceHeight: function(v) {
		this.sliceHeight = v;
		this.update();
		return v;
	}
	,update: function() {
		if(!this.inited) {
			return;
		}
		this.images[1].height = this.sliceHeight - this.images[0].height - this.images[2].height + this.creep * 2;
		this.images[2].y = this.images[0].height + this.images[1].height - this.creep * 2;
	}
	,__class__: pony_pixi_ui_slices_Slice3V
});
var pony_pixi_ui_slices_Slice2V = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	data.push(data[0]);
	pony_pixi_ui_slices_Slice3V.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice2V.__name__ = true;
pony_pixi_ui_slices_Slice2V.__super__ = pony_pixi_ui_slices_Slice3V;
pony_pixi_ui_slices_Slice2V.prototype = $extend(pony_pixi_ui_slices_Slice3V.prototype,{
	init: function() {
		pony_pixi_ui_slices_Slice3V.prototype.init.call(this);
		var o = this.images[2];
		o.scale.y = -o.scale.y;
	}
	,update: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice3V.prototype.update.call(this);
		var o = this.images[2];
		o.y += o.height;
	}
	,__class__: pony_pixi_ui_slices_Slice2V
});
var pony_pixi_ui_slices_Slice9 = function(data,useSpriteSheet,creep) {
	pony_pixi_ui_slices_SliceSprite.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice9.__name__ = true;
pony_pixi_ui_slices_Slice9.__super__ = pony_pixi_ui_slices_SliceSprite;
pony_pixi_ui_slices_Slice9.prototype = $extend(pony_pixi_ui_slices_SliceSprite.prototype,{
	init: function() {
		this.images[1].x = this.images[0].width - this.creep;
		this.images[3].y = this.images[0].height - this.creep;
		this.images[4].x = this.images[1].x;
		this.images[4].y = this.images[3].y;
		if(this.sliceWidth == null) {
			this.set_sliceWidth(this.images[0].width + this.images[1].width + this.images[2].width);
		}
		if(this.sliceHeight == null) {
			this.set_sliceHeight(this.images[0].height + this.images[3].height + this.images[6].height);
		}
		pony_pixi_ui_slices_SliceSprite.prototype.init.call(this);
	}
	,set_sliceWidth: function(v) {
		this.sliceWidth = v;
		this.updateWidth();
		return v;
	}
	,updateWidth: function() {
		if(!this.inited) {
			return;
		}
		this.images[1].width = this.sliceWidth - this.images[0].width - this.images[2].width + this.creep * 2;
		this.images[2].x = this.images[0].width + this.images[1].width - this.creep * 2;
		this.images[4].width = this.images[1].width;
		this.images[5].x = this.images[2].x;
		this.images[7].width = this.images[1].width;
		this.images[7].x = this.images[1].x;
		this.images[8].x = this.images[2].x;
	}
	,set_sliceHeight: function(v) {
		this.sliceHeight = v;
		this.updateHeight();
		return v;
	}
	,updateHeight: function() {
		if(!this.inited) {
			return;
		}
		this.images[3].height = this.sliceHeight - this.images[0].height - this.images[6].height + this.creep * 2;
		this.images[6].y = this.images[0].height + this.images[3].height - this.creep * 2;
		this.images[4].height = this.images[3].height;
		this.images[5].y = this.images[3].y;
		this.images[5].height = this.images[3].height;
		this.images[7].y = this.images[6].y;
		this.images[8].y = this.images[6].y;
	}
	,__class__: pony_pixi_ui_slices_Slice9
});
var pony_pixi_ui_slices_Slice4 = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	data = [data[0],data[1],data[0],data[2],data[3],data[2],data[0],data[1],data[0]];
	pony_pixi_ui_slices_Slice9.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice4.__name__ = true;
pony_pixi_ui_slices_Slice4.__super__ = pony_pixi_ui_slices_Slice9;
pony_pixi_ui_slices_Slice4.prototype = $extend(pony_pixi_ui_slices_Slice9.prototype,{
	init: function() {
		pony_pixi_ui_slices_Slice9.prototype.init.call(this);
		var o = this.images[2];
		o.scale.x = -o.scale.x;
		var o1 = this.images[5];
		o1.scale.x = -o1.scale.x;
		var o2 = this.images[8];
		o2.scale.x = -o2.scale.x;
		var _g = 6;
		while(_g < 9) {
			var i = _g++;
			var o3 = this.images[i];
			o3.scale.y = -o3.scale.y;
		}
	}
	,updateWidth: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice9.prototype.updateWidth.call(this);
		var o = this.images[2];
		o.x += o.width;
		var o1 = this.images[5];
		o1.x += o1.width;
		var o2 = this.images[8];
		o2.x += o2.width;
	}
	,updateHeight: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice9.prototype.updateHeight.call(this);
		var _g = 6;
		while(_g < 9) {
			var i = _g++;
			var o = this.images[i];
			o.y += o.height;
		}
	}
	,__class__: pony_pixi_ui_slices_Slice4
});
var pony_pixi_ui_slices_Slice6H = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	data = [data[0],data[1],data[0],data[2],data[3],data[2],data[4],data[5],data[4]];
	pony_pixi_ui_slices_Slice9.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice6H.__name__ = true;
pony_pixi_ui_slices_Slice6H.__super__ = pony_pixi_ui_slices_Slice9;
pony_pixi_ui_slices_Slice6H.prototype = $extend(pony_pixi_ui_slices_Slice9.prototype,{
	init: function() {
		pony_pixi_ui_slices_Slice9.prototype.init.call(this);
		var o = this.images[2];
		o.scale.x = -o.scale.x;
		var o1 = this.images[5];
		o1.scale.x = -o1.scale.x;
		var o2 = this.images[8];
		o2.scale.x = -o2.scale.x;
	}
	,updateWidth: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice9.prototype.updateWidth.call(this);
		var o = this.images[2];
		o.x += o.width;
		var o1 = this.images[5];
		o1.x += o1.width;
		var o2 = this.images[8];
		o2.x += o2.width;
	}
	,__class__: pony_pixi_ui_slices_Slice6H
});
var pony_pixi_ui_slices_Slice6V = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	data = [data[0],data[1],data[2],data[3],data[4],data[5],data[0],data[1],data[2]];
	pony_pixi_ui_slices_Slice9.call(this,data,useSpriteSheet,creep);
};
pony_pixi_ui_slices_Slice6V.__name__ = true;
pony_pixi_ui_slices_Slice6V.__super__ = pony_pixi_ui_slices_Slice9;
pony_pixi_ui_slices_Slice6V.prototype = $extend(pony_pixi_ui_slices_Slice9.prototype,{
	init: function() {
		pony_pixi_ui_slices_Slice9.prototype.init.call(this);
		var _g = 6;
		while(_g < 9) {
			var i = _g++;
			var o = this.images[i];
			o.scale.y = -o.scale.y;
		}
	}
	,updateHeight: function() {
		if(!this.inited) {
			return;
		}
		pony_pixi_ui_slices_Slice9.prototype.updateHeight.call(this);
		var _g = 6;
		while(_g < 9) {
			var i = _g++;
			var o = this.images[i];
			o.y += o.height;
		}
	}
	,__class__: pony_pixi_ui_slices_Slice6V
});
var pony_pixi_ui_slices_SliceData = { __ename__ : true, __constructs__ : ["Not","Vert2","Hor2","Vert3","Hor3","Four","Vert6","Hor6","Nine"] };
pony_pixi_ui_slices_SliceData.Not = function(s) { var $x = ["Not",0,s]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Vert2 = function(a) { var $x = ["Vert2",1,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Hor2 = function(a) { var $x = ["Hor2",2,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Vert3 = function(a) { var $x = ["Vert3",3,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Hor3 = function(a) { var $x = ["Hor3",4,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Four = function(a) { var $x = ["Four",5,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Vert6 = function(a) { var $x = ["Vert6",6,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Hor6 = function(a) { var $x = ["Hor6",7,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
pony_pixi_ui_slices_SliceData.Nine = function(a) { var $x = ["Nine",8,a]; $x.__enum__ = pony_pixi_ui_slices_SliceData; $x.toString = $estr; return $x; };
var pony_pixi_ui_slices_SliceTools = function() { };
pony_pixi_ui_slices_SliceTools.__name__ = true;
pony_pixi_ui_slices_SliceTools.getSliceSprite = function(name,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	return pony_pixi_ui_slices_SliceTools.getSliceSpriteFromData(pony_pixi_ui_slices_SliceTools.parseSliceName(name),useSpriteSheet,creep);
};
pony_pixi_ui_slices_SliceTools.parseSliceName = function(name) {
	if(name.indexOf("{slice" + 2 + "v" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Vert2(pony_pixi_ui_slices_SliceTools.slice(name,2,"v"));
	} else if(name.indexOf("{slice" + 2 + "h" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Hor2(pony_pixi_ui_slices_SliceTools.slice(name,2,"h"));
	} else if(name.indexOf("{slice" + 3 + "v" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Vert3(pony_pixi_ui_slices_SliceTools.slice(name,3,"v"));
	} else if(name.indexOf("{slice" + 3 + "h" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Hor3(pony_pixi_ui_slices_SliceTools.slice(name,3,"h"));
	} else if(name.indexOf("{slice" + 4 + "" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Four(pony_pixi_ui_slices_SliceTools.slice(name,4));
	} else if(name.indexOf("{slice" + 6 + "v" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Vert6(pony_pixi_ui_slices_SliceTools.slice(name,6,"v"));
	} else if(name.indexOf("{slice" + 6 + "h" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Hor6(pony_pixi_ui_slices_SliceTools.slice(name,6,"h"));
	} else if(name.indexOf("{slice" + 9 + "" + "}") != -1) {
		return pony_pixi_ui_slices_SliceData.Nine(pony_pixi_ui_slices_SliceTools.slice(name,9));
	} else {
		return pony_pixi_ui_slices_SliceData.Not(name);
	}
};
pony_pixi_ui_slices_SliceTools.slice = function(name,n,letter) {
	if(letter == null) {
		letter = "";
	}
	var s = name.split("{slice" + n + letter + "}");
	var _g = [];
	var _g2 = 0;
	while(_g2 < n) {
		var i = _g2++;
		_g.push(s[0] + i + s[1]);
	}
	return _g;
};
pony_pixi_ui_slices_SliceTools.getSliceSpriteFromData = function(data,useSpriteSheet,creep) {
	if(creep == null) {
		creep = 0;
	}
	switch(data[1]) {
	case 0:
		var s = data[2];
		return new pony_pixi_ui_slices_SliceSprite([s],useSpriteSheet);
	case 1:
		var a = data[2];
		return new pony_pixi_ui_slices_Slice2V(a,useSpriteSheet,creep);
	case 2:
		var a1 = data[2];
		return new pony_pixi_ui_slices_Slice2H(a1,useSpriteSheet,creep);
	case 3:
		var a2 = data[2];
		return new pony_pixi_ui_slices_Slice3V(a2,useSpriteSheet,creep);
	case 4:
		var a3 = data[2];
		return new pony_pixi_ui_slices_Slice3H(a3,useSpriteSheet,creep);
	case 5:
		var a4 = data[2];
		return new pony_pixi_ui_slices_Slice4(a4,useSpriteSheet,creep);
	case 6:
		var a5 = data[2];
		return new pony_pixi_ui_slices_Slice6V(a5,useSpriteSheet,creep);
	case 7:
		var a6 = data[2];
		return new pony_pixi_ui_slices_Slice6H(a6,useSpriteSheet,creep);
	case 8:
		var a7 = data[2];
		return new pony_pixi_ui_slices_Slice9(a7,useSpriteSheet,creep);
	}
};
var pony_text_TextTools = function() { };
pony_text_TextTools.__name__ = true;
pony_text_TextTools.convertToANSI = function(s,lang) {
	lang = lang.split("_")[0];
	var _this = pony_text_TextTools.letters;
	if(!(__map_reserved[lang] != null ? _this.existsReserved(lang) : _this.h.hasOwnProperty(lang))) {
		return s;
	}
	var r = "";
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		r += pony_text_TextTools.getANSILetter(s.charAt(i),lang);
	}
	return r;
};
pony_text_TextTools.getANSILetter = function(s,lang) {
	var _this = pony_text_TextTools.letters;
	var l = __map_reserved[lang] != null ? _this.getReserved(lang) : _this.h[lang];
	var _g1 = 0;
	var _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(l.charAt(i) == s) {
			return String.fromCharCode(i + 192);
		}
	}
	l = l.toLowerCase();
	var _g11 = 0;
	var _g2 = l.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		if(l.charAt(i1) == s) {
			return String.fromCharCode(l.length + i1 + 192);
		}
	}
	return s;
};
pony_text_TextTools.repeat = function(s,count) {
	var r = "";
	while(count-- > 0) r += s;
	return r;
};
var pony_time_ITimer = function() { };
pony_time_ITimer.__name__ = true;
pony_time_ITimer.prototype = {
	__class__: pony_time_ITimer
};
var pony_time_DTimer = function(updateSignal,time,repeatCount) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eComplete = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eProgress = this11;
	var this12 = new pony_Priority(null,false);
	this12.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eUpdate = this12;
	this.sumdt = 0.;
	this.updateSignal = updateSignal;
	var tmp;
	if(time != null) {
		tmp = time;
	} else {
		time = null;
		tmp = time;
	}
	this.time = tmp;
	var tmp1;
	if(repeatCount != null) {
		tmp1 = repeatCount;
	} else {
		repeatCount = 0;
		tmp1 = 0;
	}
	this.repeatCount = tmp1;
	var _this = this.eProgress;
	var tmp2;
	if(_this.eTake == null) {
		var this13 = new pony_Priority(null,false);
		this13.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		tmp2 = _this.eTake = this13;
	} else {
		tmp2 = _this.eTake;
	}
	tmp2.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.takeProgress))});
	var _this1 = this.eProgress;
	var tmp3;
	if(_this1.eLost == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		tmp3 = _this1.eLost = this2;
	} else {
		tmp3 = _this1.eLost;
	}
	tmp3.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.lostProgress))});
	this.reset();
};
pony_time_DTimer.__name__ = true;
pony_time_DTimer.__interfaces__ = [pony_magic_Declarator,pony_time_ITimer,pony_magic_HasSignal];
pony_time_DTimer.prototype = {
	takeProgress: function() {
		this.eUpdate.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this._progress))});
	}
	,lostProgress: function() {
		this.eUpdate.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this._progress))});
	}
	,reset: function() {
		if(this.time != null) {
			this.currentTime = this.time.min;
		} else {
			this.currentTime = 0;
		}
		return this;
	}
	,_update: function(dt) {
		this.sumdt = this.sumdt + dt;
		if(this.sumdt >= 0.001) {
			var this1 = this.sumdt * 1000 | 0;
			var t = this1;
			var this2 = t / 1000;
			this.sumdt = this.sumdt - this2;
			if(this.time != null) {
				var this3 = this.time;
				if(this3.min > this3.max) {
					this.currentTime = this.currentTime - t;
					while(this.currentTime <= this.time.max) if(this.loop()) {
						break;
					}
				} else {
					this.currentTime = this.currentTime + t;
					while(this.currentTime >= this.time.max) if(this.loop()) {
						break;
					}
				}
			} else {
				this.currentTime = this.currentTime + t;
			}
			if(this.eUpdate != null) {
				pony_events__$Event1_Event1_$Impl_$.dispatch(this.eUpdate,this.currentTime);
			}
		}
	}
	,loop: function() {
		if(this.eComplete == null) {
			return true;
		}
		var result = false;
		var d = Math.abs(this.currentTime - this.time.max) / 1000 + this.sumdt;
		if(this.repeatCount > 0) {
			var this1 = this.time;
			this.currentTime = this.currentTime - (this1.max - this1.min);
			this.repeatCount--;
		} else if(this.repeatCount == -1) {
			var this2 = this.time;
			this.currentTime = this.currentTime - (this2.max - this2.min);
		} else {
			this.currentTime = this.time.max;
			this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this._update))});
			result = true;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eComplete,d);
		return result;
	}
	,destroy: function() {
		if(this.eUpdate == null) {
			return;
		}
		var _this = this.eProgress;
		var tmp;
		if(_this.eTake == null) {
			var this1 = new pony_Priority(null,false);
			this1.compare = pony_events__$Event0_Event0_$Impl_$.compare;
			tmp = _this.eTake = this1;
		} else {
			tmp = _this.eTake;
		}
		tmp.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.takeProgress))});
		var _this1 = this.eProgress;
		var tmp1;
		if(_this1.eLost == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
			tmp1 = _this1.eLost = this2;
		} else {
			tmp1 = _this1.eLost;
		}
		tmp1.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.lostProgress))});
		this.destroySignals();
		this.time = null;
	}
	,_progress: function() {
		var this1 = this.time;
		var time = this.currentTime;
		var tmp;
		if(this1.max > this1.min) {
			var t = time - this1.min;
			var m = this1.max - this1.min;
			tmp = t / m;
		} else {
			var t1 = time - this1.max;
			var m1 = this1.min - this1.max;
			tmp = t1 / m1;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eProgress,tmp);
	}
	,destroySignals: function() {
		var this1 = this.eUpdate;
		if(this1 != null) {
			this1.destroy();
		}
		this.eUpdate = null;
		var this2 = this.eProgress;
		if(this2 != null) {
			this2.destroy();
		}
		this.eProgress = null;
		var this3 = this.eComplete;
		if(this3 != null) {
			this3.destroy();
		}
		this.eComplete = null;
	}
	,__class__: pony_time_DTimer
};
var pony_time_DeltaTime = function() { };
pony_time_DeltaTime.__name__ = true;
pony_time_DeltaTime.__interfaces__ = [pony_magic_HasSignal];
pony_time_DeltaTime.updateHandler = function(dt) {
	if(pony_time_DeltaTime.speed > 0 && dt > 0.) {
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_time_DeltaTime.eUpdate,pony_time_DeltaTime.value = dt * pony_time_DeltaTime.speed);
	}
};
pony_time_DeltaTime._takeListeners = function() {
	var tmp;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this1 = new pony_Priority(null,false);
		this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		tmp = pony_time_DeltaTime.eFixedUpdate = this1;
	} else {
		tmp = pony_time_DeltaTime.eFixedUpdate;
	}
	tmp.add({ once : false, listener : pony_events_Listener1Type.LFunction1(pony_time_DeltaTime.updateHandler)});
};
pony_time_DeltaTime._lostListeners = function() {
	var tmp;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this1 = new pony_Priority(null,false);
		this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		tmp = pony_time_DeltaTime.eFixedUpdate = this1;
	} else {
		tmp = pony_time_DeltaTime.eFixedUpdate;
	}
	tmp.remove({ once : false, listener : pony_events_Listener1Type.LFunction1(pony_time_DeltaTime.updateHandler)});
};
pony_time_DeltaTime.skipUpdate = function(f) {
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		var this3;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this4 = new pony_Priority(null,false);
			this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this3 = pony_time_DeltaTime.eFixedUpdate = this4;
		} else {
			this3 = pony_time_DeltaTime.eFixedUpdate;
		}
		var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0(f)};
		listener1.once = true;
		this3.add(listener1,0);
	})};
	listener.once = true;
	this1.add(listener,0);
};
pony_time_DeltaTime.notInstant = function(cb) {
	var instant = true;
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		instant = false;
	})};
	listener.once = true;
	this1.add(listener,0);
	return function() {
		if(instant) {
			var this3;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this4 = new pony_Priority(null,false);
				this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this3 = pony_time_DeltaTime.eFixedUpdate = this4;
			} else {
				this3 = pony_time_DeltaTime.eFixedUpdate;
			}
			var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0(cb)};
			listener1.once = true;
			this3.add(listener1,0);
		} else {
			cb();
		}
	};
};
var pony_time_JsDT = function() { };
pony_time_JsDT.__name__ = true;
pony_time_JsDT.init = function() {
	pony_time_JsDT.inited = true;
	pony_time_JsDT.set_half(window.orientation != null);
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) {
		pony_time_JsDT.raf = ($_=window,$bind($_,$_.requestAnimationFrame));
	} else if(window.mozRequestAnimationFrame != null) {
		pony_time_JsDT.raf = window.mozRequestAnimationFrame;
	} else if(window.webkitRequestAnimationFrame != null) {
		pony_time_JsDT.raf = window.webkitRequestAnimationFrame;
	} else if(window.msRequestAnimationFrame != null) {
		pony_time_JsDT.raf = window.msRequestAnimationFrame;
	}
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) {
		pony_time_JsDT.caf = ($_=window,$bind($_,$_.cancelAnimationFrame));
	} else if(window.mozCancelAnimationFrame != null) {
		pony_time_JsDT.caf = window.mozCancelAnimationFrame;
	} else if(window.webkitCancelAnimationFrame != null) {
		pony_time_JsDT.caf = window.webkitCancelAnimationFrame;
	} else if(window.msCancelAnimationFrame != null) {
		pony_time_JsDT.caf = window.msCancelAnimationFrame;
	}
};
pony_time_JsDT.raf = function(cb) {
	throw new js__$Boot_HaxeError("Not set");
};
pony_time_JsDT.caf = function(id) {
	throw new js__$Boot_HaxeError("Not set");
};
pony_time_JsDT.render = function() {
};
pony_time_JsDT.set_half = function(b) {
	if(!pony_time_JsDT.inited) {
		pony_time_JsDT.init();
		return pony_time_JsDT.half = b;
	}
	if(pony_time_JsDT.half != b) {
		pony_time_JsDT.half = b;
		if(pony_time_JsDT.afid != -1) {
			pony_time_JsDT.caf(pony_time_JsDT.afid);
			pony_time_JsDT.afid = -1;
			if(pony_time_JsDT.half) {
				pony_time_JsDT.allowFastTickAbort = false;
			} else {
				pony_time_JsDT.allowHalfTick = false;
			}
			pony_time_JsDT.start();
		}
	}
	return b;
};
pony_time_JsDT.start = function() {
	if(!pony_time_JsDT.inited) {
		pony_time_JsDT.init();
	}
	if(pony_time_JsDT.half) {
		pony_time_JsDT.allowHalfTick = true;
		pony_time_JsDT.afid = pony_time_JsDT.raf(pony_time_JsDT.halfTick1);
	} else {
		pony_time_JsDT.allowFastTickAbort = true;
		pony_time_JsDT.afid = pony_time_JsDT.raf(pony_time_JsDT.fastTick);
	}
};
pony_time_JsDT.halfTick1 = function(v) {
	pony_time_DeltaTime.fixedValue = (v - pony_time_JsDT.ms) / 1000;
	pony_time_JsDT.ms = v;
	pony_events__$Event1_Event1_$Impl_$.dispatch(pony_time_DeltaTime.eFixedUpdate,pony_time_DeltaTime.fixedValue);
	if(pony_time_JsDT.allowHalfTick) {
		pony_time_JsDT.afid = pony_time_JsDT.raf(pony_time_JsDT.halfTick2);
	}
};
pony_time_JsDT.halfTick2 = function(v) {
	pony_time_JsDT.render();
	pony_time_JsDT.afid = pony_time_JsDT.raf(pony_time_JsDT.halfTick1);
};
pony_time_JsDT.fastTick = function(v) {
	pony_time_DeltaTime.fixedValue = (v - pony_time_JsDT.ms) / 1000;
	pony_time_JsDT.ms = v;
	pony_events__$Event1_Event1_$Impl_$.dispatch(pony_time_DeltaTime.eFixedUpdate,pony_time_DeltaTime.fixedValue);
	pony_time_JsDT.render();
	if(pony_time_JsDT.allowFastTickAbort) {
		pony_time_JsDT.afid = pony_time_JsDT.raf(pony_time_JsDT.fastTick);
	}
};
var pony_time__$Time_Time_$Impl_$ = {};
pony_time__$Time_Time_$Impl_$.__name__ = true;
pony_time__$Time_Time_$Impl_$.fromString = function(time) {
	var ms = 0;
	time = StringTools.trim(time);
	var neg = time.charAt(0) == "-";
	if(neg) {
		time = HxOverrides.substr(time,1,null);
	}
	var nbuf = "";
	var chbuf = "";
	var _g1 = 0;
	var _g = time.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ch = time.charAt(i);
		if(ch != " ") {
			if(Std.parseInt(ch) == null) {
				chbuf += ch;
			} else {
				if(chbuf != "") {
					ms += pony_time__$Time_Time_$Impl_$.parseBuf(chbuf,Std.parseInt(nbuf));
					nbuf = "";
					chbuf = "";
				}
				nbuf += ch;
			}
		}
	}
	if(chbuf != "" && nbuf != "") {
		ms += pony_time__$Time_Time_$Impl_$.parseBuf(chbuf,Std.parseInt(nbuf));
	}
	if(ms == 0) {
		var s = time.split(".");
		if(s.length == 2) {
			ms = Std.parseInt(s[1]);
			time = s[0];
		}
		var s1 = time.split(" ");
		var t;
		if(s1.length == 2) {
			ms = ms + pony_time__$Time_Time_$Impl_$.fromMinutes(Std.parseInt(s1[0]) * 24 * 60);
			t = s1[1];
		} else {
			t = time;
		}
		var d = t.split(":");
		var ms1;
		var _g2 = d.length;
		switch(_g2) {
		case 1:
			ms1 = (d[0] == "" ? 0 : Std.parseInt(d[0])) * 1000;
			break;
		case 2:
			ms1 = (d[1] == "" ? 0 : Std.parseInt(d[1])) * 1000 + (d[0] == "" ? 0 : Std.parseInt(d[0])) * 60 * 1000;
			break;
		case 3:
			ms1 = (d[2] == "" ? 0 : Std.parseInt(d[2])) * 1000 + (d[0] == "" ? 0 : Std.parseInt(d[1])) * 60 * 1000 + pony_time__$Time_Time_$Impl_$.fromMinutes((d[0] == "" ? 0 : Std.parseInt(d[0])) * 60);
			break;
		default:
			throw new js__$Boot_HaxeError("Invalid time format");
		}
		ms += ms1;
	}
	if(neg) {
		ms *= -1;
	}
	var this1 = ms;
	return this1;
};
pony_time__$Time_Time_$Impl_$.parseBuf = function(buf,n) {
	switch(buf) {
	case "d":case "day":case "days":
		return pony_time__$Time_Time_$Impl_$.fromMinutes(n * 24 * 60);
	case "h":case "hour":case "hours":
		return pony_time__$Time_Time_$Impl_$.fromMinutes(n * 60);
	case "millisecond":case "milliseconds":case "ms":
		return n;
	case "m":case "min":case "minute":case "minutes":
		return n * 60 * 1000;
	case "s":case "sec":case "second":case "seconds":
		return n * 1000;
	default:
		return 0;
	}
};
pony_time__$Time_Time_$Impl_$.fromMinutes = function(minutes) {
	return minutes * 60 * 1000;
};
var pony_time_Tween = function(range,type,time,invert,loop,pingpong,fixedTime,skipTime) {
	if(fixedTime == null) {
		fixedTime = false;
	}
	if(pingpong == null) {
		pingpong = false;
	}
	if(loop == null) {
		loop = false;
	}
	if(invert == null) {
		invert = false;
	}
	if(time == null) {
		time = 1000;
	}
	if(type == null) {
		type = 0;
	}
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eSkip = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eComplete = this11;
	var this12 = new pony_Priority(null,false);
	this12.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eProgress = this12;
	var this13 = new pony_Priority(null,false);
	this13.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eUpdate = this13;
	var tmp;
	if(range != null) {
		tmp = range;
	} else {
		var it = new IntIterator(0,1);
		var this14 = { a : Reflect.field(it,"min"), b : Reflect.field(it,"max")};
		range = this14;
		tmp = range;
	}
	this.range = tmp;
	this.progress = 0;
	this.playing = false;
	this.type = type;
	this.sr = 1000 / time;
	this.invert = invert;
	var tmp1;
	if(fixedTime) {
		var tmp2;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp2 = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			tmp2 = pony_time_DeltaTime.eFixedUpdate;
		}
		tmp1 = tmp2;
	} else {
		var tmp3;
		if(pony_time_DeltaTime.eUpdate == null) {
			var this3 = new pony_Priority(null,false);
			this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp3 = pony_time_DeltaTime.eUpdate = this3;
		} else {
			tmp3 = pony_time_DeltaTime.eUpdate;
		}
		tmp1 = tmp3;
	}
	this.updateSignal = tmp1;
	if(pingpong) {
		if(skipTime == null) {
			var this4 = time / 500 | 0;
			skipTime = this4;
		}
		this.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.invertInvert))});
	} else if(skipTime == null) {
		var this5 = time / 1000 | 0;
		skipTime = this5;
	}
	this.skipTime = skipTime;
	this.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.endPlay))});
	if(loop) {
		this.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.play))});
	}
	this.eProgress.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.progressHandler))});
};
pony_time_Tween.__name__ = true;
pony_time_Tween.__interfaces__ = [pony_magic_Declarator,pony_magic_HasSignal];
pony_time_Tween.prototype = {
	progressHandler: function(v) {
		var _g = this.type;
		switch(_g) {
		case 0:
			v = v;
			break;
		case 1:
			v *= v;
			break;
		case 2:
			v = 1 - Math.pow(1 - v,2);
			break;
		case 3:
			v = v * v * (3 - 2 * v);
			break;
		}
		var min = this.range.a;
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eUpdate,(this.range.b - min) * v + min);
	}
	,invertInvert: function() {
		this.invert = !this.invert;
	}
	,endPlay: function() {
		this.playing = false;
	}
	,play: function(dt) {
		if(this.updateSignal == null) {
			return;
		}
		if(this.playing) {
			return;
		}
		this.playing = true;
		if(dt > this.skipTime) {
			var c = dt / this.skipTime | 0;
			dt = dt - this.skipTime * c;
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eSkip,c);
		}
		if(this.invert) {
			if(this.progress == 0) {
				this.progress = 1;
			}
		} else if(this.progress == 1) {
			this.progress = 0;
		}
		if(!this.invert) {
			this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
			if(dt != null) {
				this.forward(dt);
			}
		} else {
			this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))});
			if(dt != null) {
				this.backward(dt);
			}
		}
	}
	,forward: function(dt) {
		if(this.updateSignal == null) {
			var this1;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this1 = pony_time_DeltaTime.eFixedUpdate = this2;
			} else {
				this1 = pony_time_DeltaTime.eFixedUpdate;
			}
			this1.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
			var this3;
			if(pony_time_DeltaTime.eUpdate == null) {
				var this4 = new pony_Priority(null,false);
				this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this3 = pony_time_DeltaTime.eUpdate = this4;
			} else {
				this3 = pony_time_DeltaTime.eUpdate;
			}
			this3.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
			return;
		}
		if(!this.playing) {
			this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
			return;
		}
		this.progress += dt * this.sr;
		if(this.progress >= 1) {
			this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
			var d = pony_math_MathTools.range(this.progress,1) / this.sr;
			this.progress = 1;
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eProgress,this.progress);
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eComplete,d);
		} else {
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eProgress,this.progress);
		}
	}
	,backward: function(dt) {
		if(this.updateSignal == null) {
			var this1;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this1 = pony_time_DeltaTime.eFixedUpdate = this2;
			} else {
				this1 = pony_time_DeltaTime.eFixedUpdate;
			}
			this1.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))});
			var this3;
			if(pony_time_DeltaTime.eUpdate == null) {
				var this4 = new pony_Priority(null,false);
				this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this3 = pony_time_DeltaTime.eUpdate = this4;
			} else {
				this3 = pony_time_DeltaTime.eUpdate;
			}
			this3.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))});
			return;
		}
		if(!this.playing) {
			this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))});
			return;
		}
		this.progress -= dt * this.sr;
		if(this.progress <= 0) {
			this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))});
			var d = pony_math_MathTools.range(this.progress,0) / this.sr;
			this.progress = 0;
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eProgress,this.progress);
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eComplete,d);
		} else {
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eProgress,this.progress);
		}
	}
	,pause: function() {
		if(this.updateSignal == null) {
			return;
		}
		this.updateSignal.remove(this.invert ? { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.backward))} : { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.forward))});
		this.playing = false;
	}
	,destroy: function() {
		this.pause();
		this.destroySignals();
		this.updateSignal = null;
		this.range = null;
	}
	,destroySignals: function() {
		var this1 = this.eUpdate;
		if(this1 != null) {
			this1.destroy();
		}
		this.eUpdate = null;
		var this2 = this.eProgress;
		if(this2 != null) {
			this2.destroy();
		}
		this.eProgress = null;
		var this3 = this.eComplete;
		if(this3 != null) {
			this3.destroy();
		}
		this.eComplete = null;
		var this4 = this.eSkip;
		if(this4 != null) {
			this4.destroy();
		}
		this.eSkip = null;
	}
	,__class__: pony_time_Tween
};
var pony_ui_AssetManager = function() { };
pony_ui_AssetManager.__name__ = true;
var pony_ui_gui_BaseLayoutCore = function() {
	this.objects = [];
	this.ready = false;
	this._needUpdate = false;
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eReady = this1;
	var this2;
	var this3 = { a : 0, b : $bind(this,this.tasksReady)};
	this2 = this3;
	this.tasks = this2;
};
pony_ui_gui_BaseLayoutCore.__name__ = true;
pony_ui_gui_BaseLayoutCore.__interfaces__ = [pony_geom_IWH,pony_magic_HasSignal,pony_magic_Declarator];
pony_ui_gui_BaseLayoutCore.prototype = {
	add: function(o) {
		this.objects.push(o);
		this.addWait(o);
	}
	,addWait: function(o) {
		if(js_Boot.__instanceof(o,pony_geom_IWH)) {
			pony__$Tasks_Tasks_$Impl_$.add(this.tasks);
			var _e = this.tasks;
			(js_Boot.__cast(o , pony_geom_IWH)).wait(function() {
				pony__$Tasks_Tasks_$Impl_$.end(_e);
			});
		} else {
			this.load(o);
		}
		this.needUpdate();
	}
	,endUpdate: function() {
		if(this.objects == null) {
			return;
		}
		pony__$Tasks_Tasks_$Impl_$.end(this.tasks);
		this._needUpdate = false;
	}
	,needUpdate: function() {
		if(this.objects == null) {
			return;
		}
		if(!this._needUpdate) {
			this._needUpdate = true;
			pony__$Tasks_Tasks_$Impl_$.add(this.tasks);
			var this1;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this1 = pony_time_DeltaTime.eFixedUpdate = this2;
			} else {
				this1 = pony_time_DeltaTime.eFixedUpdate;
			}
			var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.endUpdate))};
			listener.once = true;
			this1.add(listener,0);
		}
	}
	,load: function(o) {
	}
	,destroyChild: function(o) {
	}
	,getSize: function(o) {
		throw new js__$Boot_HaxeError("Unknown type");
	}
	,getSizeMod: function(o,p) {
		return p;
	}
	,setXpos: function(o,v) {
	}
	,setYpos: function(o,v) {
	}
	,get_size: function() {
		var this1 = { x : this._w, y : this._h};
		return this1;
	}
	,tasksReady: function() {
		if(this.objects == null) {
			return;
		}
		if(this.ready) {
			this.update();
		} else {
			this.ready = true;
			this.update();
			pony_events__$Event0_Event0_$Impl_$.dispatch(this.eReady);
			var this1 = this.eReady;
			if(this1 != null) {
				this1.destroy();
			}
		}
	}
	,wait: function(cb) {
		if(this.objects == null) {
			return;
		}
		if(this.ready) {
			cb();
		} else if(this.tasks.a == 0) {
			this.tasksReady();
			cb();
		} else {
			var e = { once : false, listener : pony_events_Listener0Type.LFunction0(cb)};
			e.once = true;
			this.eReady.add(e,0);
		}
	}
	,update: function() {
	}
	,destroy: function() {
		var _g = 0;
		var _g1 = this.objects;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(o,pony_geom_IWH)) {
				(js_Boot.__cast(o , pony_geom_IWH)).destroyIWH();
			} else {
				this.destroyChild(o);
			}
		}
		this.objects = null;
		var this1;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			this1 = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			this1 = pony_time_DeltaTime.eFixedUpdate;
		}
		this1.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.endUpdate))});
		this.destroySignals();
		this.tasks = null;
	}
	,destroyIWH: function() {
		this.destroy();
	}
	,destroySignals: function() {
		var this1 = this.eReady;
		if(this1 != null) {
			this1.destroy();
		}
		this.eReady = null;
	}
	,__class__: pony_ui_gui_BaseLayoutCore
};
var pony_ui_gui_AlignLayoutCore = function(_align,_border) {
	var tmp;
	if(_align != null) {
		tmp = _align;
	} else {
		var this1 = { a : pony_geom_VAlign.Middle, b : pony_geom_HAlign.Center};
		_align = this1;
		tmp = _align;
	}
	this._align = tmp;
	var tmp1;
	if(_border != null) {
		tmp1 = _border;
	} else {
		var left = null;
		var right = null;
		var bottom = null;
		var this2;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this2 = { top : 0, left : left, right : right, bottom : bottom};
		_border = this2;
		tmp1 = _border;
	}
	this._border = tmp1;
	pony_ui_gui_BaseLayoutCore.call(this);
};
pony_ui_gui_AlignLayoutCore.__name__ = true;
pony_ui_gui_AlignLayoutCore.__super__ = pony_ui_gui_BaseLayoutCore;
pony_ui_gui_AlignLayoutCore.prototype = $extend(pony_ui_gui_BaseLayoutCore.prototype,{
	update: function() {
		if(this.objects == null) {
			return;
		}
		if(!this.ready) {
			return;
		}
		if(this.objects.length == 0) {
			this._w = 0;
			this._h = 0;
			return;
		}
		if(this.objects.length == 1) {
			var o = this.objects[0];
			this._w = this.getSizeMod(o,js_Boot.__instanceof(o,pony_geom_IWH) ? (js_Boot.__cast(o , pony_geom_IWH)).get_size() : this.getSize(o)).x;
			var o1 = this.objects[0];
			this._h = this.getSizeMod(o1,js_Boot.__instanceof(o1,pony_geom_IWH) ? (js_Boot.__cast(o1 , pony_geom_IWH)).get_size() : this.getSize(o1)).y;
		} else {
			if(this._align.b != null) {
				this._w = 0;
				var _g = [];
				var _g1 = 0;
				var _g2 = this.objects;
				while(_g1 < _g2.length) {
					var obj = _g2[_g1];
					++_g1;
					var s = this.getSizeMod(obj,js_Boot.__instanceof(obj,pony_geom_IWH) ? (js_Boot.__cast(obj , pony_geom_IWH)).get_size() : this.getSize(obj)).x;
					if(s > this._w) {
						this._w = s;
					}
					_g.push(s);
				}
				var p = pony_ArrayTools.pair(pony_geom_GeomTools.halign(this._align.b,this._w,_g),this.objects);
				while(p.hasNext()) {
					var p1 = p.next();
					this.setXpos(p1.b,(p1.a | 0) + this._border.left);
				}
			} else {
				this._w = 0;
				var _g3 = 0;
				var _g11 = this.objects;
				while(_g3 < _g11.length) {
					var obj1 = _g11[_g3];
					++_g3;
					var s1 = this.getSizeMod(obj1,js_Boot.__instanceof(obj1,pony_geom_IWH) ? (js_Boot.__cast(obj1 , pony_geom_IWH)).get_size() : this.getSize(obj1)).x;
					if(s1 > this._w) {
						this._w = s1;
					}
				}
			}
			if(this._align.a != null) {
				this._h = 0;
				var _g4 = [];
				var _g12 = 0;
				var _g21 = this.objects;
				while(_g12 < _g21.length) {
					var obj2 = _g21[_g12];
					++_g12;
					var s2 = this.getSizeMod(obj2,js_Boot.__instanceof(obj2,pony_geom_IWH) ? (js_Boot.__cast(obj2 , pony_geom_IWH)).get_size() : this.getSize(obj2)).y;
					if(s2 > this._h) {
						this._h = s2;
					}
					_g4.push(s2);
				}
				var p2 = pony_ArrayTools.pair(pony_geom_GeomTools.valign(this._align.a,this._h,_g4),this.objects);
				while(p2.hasNext()) {
					var p3 = p2.next();
					this.setYpos(p3.b,(p3.a | 0) + this._border.top);
				}
			} else {
				this._h = 0;
				var _g5 = 0;
				var _g13 = this.objects;
				while(_g5 < _g13.length) {
					var obj3 = _g13[_g5];
					++_g5;
					var s3 = this.getSizeMod(obj3,js_Boot.__instanceof(obj3,pony_geom_IWH) ? (js_Boot.__cast(obj3 , pony_geom_IWH)).get_size() : this.getSize(obj3)).y;
					if(s3 > this._h) {
						this._h = s3;
					}
				}
			}
		}
		pony_ui_gui_BaseLayoutCore.prototype.update.call(this);
	}
	,__class__: pony_ui_gui_AlignLayoutCore
});
var pony_ui_gui_BarCore = function(size,isVertical,invert) {
	this.value = 0;
	this.pos = 0;
	this.percent = 0;
	var _gthis = this;
	this.size = size;
	var tmp;
	if(isVertical != null) {
		tmp = isVertical;
	} else {
		isVertical = false;
		tmp = false;
	}
	this.isVertical = tmp;
	var tmp1;
	if(invert != null) {
		tmp1 = invert;
	} else {
		invert = false;
		tmp1 = false;
	}
	this.invert = tmp1;
	var this1;
	if(this.eChangePercent == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this1 = this.eChangePercent = this2;
	} else {
		this1 = this.eChangePercent;
	}
	this1.add({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.changePercentHandler))});
	var this3;
	if(this.eChangePos == null) {
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this3 = this.eChangePos = this4;
	} else {
		this3 = this.eChangePos;
	}
	this3.add({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.changePosHandler))});
	if(isVertical) {
		var this5;
		if(this.eChangePos == null) {
			var this6 = new pony_Priority(null,false);
			this6.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this5 = this.eChangePos = this6;
		} else {
			this5 = this.eChangePos;
		}
		this5.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v) {
			_gthis.changeY(_gthis.invert ? _gthis.size - v : v);
		})});
	} else {
		var this7;
		if(this.eChangePos == null) {
			var this8 = new pony_Priority(null,false);
			this8.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this7 = this.eChangePos = this8;
		} else {
			this7 = this.eChangePos;
		}
		this7.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v1) {
			_gthis.changeX(_gthis.invert ? _gthis.size - v1 : v1);
		})});
	}
};
pony_ui_gui_BarCore.__name__ = true;
pony_ui_gui_BarCore.__interfaces__ = [pony_magic_HasSignal,pony_magic_Declarator];
pony_ui_gui_BarCore.prototype = {
	destroy: function() {
		this.destroySignals();
	}
	,changePercentHandler: function(v) {
		var v1 = v * this.size;
		if(this.eChangePos == null || v1 != this.pos) {
			var prev = this.pos;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangePos,this.pos = v1,prev,true);
		}
	}
	,changePosHandler: function(v) {
		var v1 = v / this.size;
		if(this.eChangePercent == null || v1 != this.percent) {
			var prev = this.percent;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangePercent,this.percent = v1,prev,true);
		}
	}
	,endInit: function() {
		if(this.isVertical) {
			this.changeY(this.invert ? this.size : 0);
		} else {
			this.changeX(this.invert ? this.size : 0);
		}
	}
	,changeX: function(v) {
	}
	,changeY: function(v) {
	}
	,destroySignals: function() {
		if(this.eChangePercent != null) {
			var this1 = this.eChangePercent;
			if(this1 != null) {
				this1.destroy();
			}
		}
		this.eChangePercent = null;
		if(this.eChangePos != null) {
			var this2 = this.eChangePos;
			if(this2 != null) {
				this2.destroy();
			}
		}
		this.eChangePos = null;
		if(this.eChangeValue != null) {
			var this3 = this.eChangeValue;
			if(this3 != null) {
				this3.destroy();
			}
		}
		this.eChangeValue = null;
	}
	,__class__: pony_ui_gui_BarCore
};
var pony_ui_gui_ButtonState = { __ename__ : true, __constructs__ : ["Default","Focus","Leave","Press"] };
pony_ui_gui_ButtonState.Default = ["Default",0];
pony_ui_gui_ButtonState.Default.toString = $estr;
pony_ui_gui_ButtonState.Default.__enum__ = pony_ui_gui_ButtonState;
pony_ui_gui_ButtonState.Focus = ["Focus",1];
pony_ui_gui_ButtonState.Focus.toString = $estr;
pony_ui_gui_ButtonState.Focus.__enum__ = pony_ui_gui_ButtonState;
pony_ui_gui_ButtonState.Leave = ["Leave",2];
pony_ui_gui_ButtonState.Leave.toString = $estr;
pony_ui_gui_ButtonState.Leave.__enum__ = pony_ui_gui_ButtonState;
pony_ui_gui_ButtonState.Press = ["Press",3];
pony_ui_gui_ButtonState.Press.toString = $estr;
pony_ui_gui_ButtonState.Press.__enum__ = pony_ui_gui_ButtonState;
var pony_ui_gui_ButtonCore = function(t) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event2_Event2_$Impl_$.compare;
	this.eVisual = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eClick = this11;
	this.modeBeforeDisable = 1;
	this.state = pony_ui_gui_ButtonState.Default;
	this.bMode = false;
	this.mode = 0;
	this.lowMode = 0;
	var _gthis = this;
	pony_Tumbler.call(this);
	this.touch = t;
	var listener = { once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		if(_gthis.enabled) {
			pony_events__$Event1_Event1_$Impl_$.dispatch(_gthis.eClick,_gthis.mode);
		}
	})};
	t.eClick.add(listener);
	var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		_gthis.touch.eOverDown.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.overDownHandler))});
		_gthis.touch.eOutDown.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.outDownHandler))});
		var v = pony_ui_gui_ButtonState.Press;
		if(_gthis.eChangeState == null || v != _gthis.state) {
			var prev = _gthis.state;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeState,_gthis.state = v,prev,true);
		}
	})};
	t.eDown.add(listener1);
	var listener2 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		_gthis.touch.eOverDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.overDownHandler))});
		_gthis.touch.eOutDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.outDownHandler))});
		var v1 = pony_ui_gui_ButtonState.Focus;
		if(_gthis.eChangeState == null || v1 != _gthis.state) {
			var prev1 = _gthis.state;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeState,_gthis.state = v1,prev1,true);
		}
	})};
	t.eUp.add(listener2);
	var listener3 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		var v2 = pony_ui_gui_ButtonState.Focus;
		if(_gthis.eChangeState == null || v2 != _gthis.state) {
			var prev2 = _gthis.state;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeState,_gthis.state = v2,prev2,true);
		}
	})};
	t.eOver.add(listener3);
	var listener4 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		var v3 = pony_ui_gui_ButtonState.Default;
		if(_gthis.eChangeState == null || v3 != _gthis.state) {
			var prev3 = _gthis.state;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeState,_gthis.state = v3,prev3,true);
		}
	})};
	t.eOut.add(listener4);
	var listener5 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		_gthis.touch.eOverDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.overDownHandler))});
		_gthis.touch.eOutDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(_gthis,_gthis.outDownHandler))});
		var v4 = pony_ui_gui_ButtonState.Default;
		if(_gthis.eChangeState == null || v4 != _gthis.state) {
			var prev4 = _gthis.state;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeState,_gthis.state = v4,prev4,true);
		}
	})};
	t.eOutUp.add(listener5);
	var this12;
	if(this.eChangeState == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this12 = this.eChangeState = this2;
	} else {
		this12 = this.eChangeState;
	}
	this12.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v5) {
		if(_gthis.lowMode != 1) {
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eVisual,_gthis.lowMode,v5);
		}
	})});
	var this3;
	if(this.eChangeLowMode == null) {
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this3 = this.eChangeLowMode = this4;
	} else {
		this3 = this.eChangeLowMode;
	}
	this3.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v6) {
		pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eVisual,v6,_gthis.state);
	})});
	var this5;
	if(this.eChangeLowMode == null) {
		var this6 = new pony_Priority(null,false);
		this6.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this5 = this.eChangeLowMode = this6;
	} else {
		this5 = this.eChangeLowMode;
	}
	pony_events__$Signal2_Signal2_$Impl_$.sub1(this5,1).add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.disable))});
	var this7;
	if(this.eChangeLowMode == null) {
		var this8 = new pony_Priority(null,false);
		this8.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this7 = this.eChangeLowMode = this8;
	} else {
		this7 = this.eChangeLowMode;
	}
	pony_events__$Signal2_Signal2_$Impl_$.not1(this7,1).add({ once : false, listener : pony_events_Listener2Type.LFunction0($bind(this,this.enable))});
	var listener6 = { once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		var v7 = _gthis.modeBeforeDisable;
		if(_gthis.eChangeLowMode == null || v7 != _gthis.lowMode) {
			var prev5 = _gthis.lowMode;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeLowMode,_gthis.lowMode = v7,prev5,true);
		}
	})};
	this.onEnable.add(listener6);
	var listener7 = { once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		_gthis.modeBeforeDisable = _gthis.lowMode;
		if(_gthis.eChangeLowMode == null || 1 != _gthis.lowMode) {
			var prev6 = _gthis.lowMode;
			var _gthis1 = _gthis.eChangeLowMode;
			_gthis.lowMode = 1;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis1,1,prev6,true);
		}
	})};
	this.onDisable.add(listener7);
	var this9;
	if(this.eChangeLowMode == null) {
		var this10 = new pony_Priority(null,false);
		this10.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this9 = this.eChangeLowMode = this10;
	} else {
		this9 = this.eChangeLowMode;
	}
	var tmp = pony_events_Listener2Type.LFunction1(function(v8) {
		var v9 = v8 > 1 ? v8 - 1 : v8;
		if(_gthis.eChangeMode == null || v9 != _gthis.mode) {
			var prev7 = _gthis.mode;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeMode,_gthis.mode = v9,prev7,true);
		}
	});
	pony_events__$Signal2_Signal2_$Impl_$.not1(this9,1).add({ once : false, listener : tmp});
	var this111;
	if(this.eChangeBMode == null) {
		var this121 = new pony_Priority(null,false);
		this121.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this111 = this.eChangeBMode = this121;
	} else {
		this111 = this.eChangeBMode;
	}
	this111.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v10) {
		var v11 = v10 ? 1 : 0;
		if(_gthis.eChangeMode == null || v11 != _gthis.mode) {
			var prev8 = _gthis.mode;
			pony_events__$Event2_Event2_$Impl_$.dispatch(_gthis.eChangeMode,_gthis.mode = v11,prev8,true);
		}
		if(!_gthis.enabled) {
			_gthis.modeBeforeDisable = _gthis.mode != 0 ? _gthis.mode + 1 : _gthis.mode;
		}
	})});
	this.allowChangeMode();
	this.onEnable.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.allowChangeMode))});
	this.onDisable.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.disallowChangeMode))});
};
pony_ui_gui_ButtonCore.__name__ = true;
pony_ui_gui_ButtonCore.__interfaces__ = [pony_magic_HasSignal];
pony_ui_gui_ButtonCore.__super__ = pony_Tumbler;
pony_ui_gui_ButtonCore.prototype = $extend(pony_Tumbler.prototype,{
	destroy: function() {
		this.touch.destroy();
		this.destroySignals();
	}
	,allowChangeMode: function() {
		var this1;
		if(this.eChangeMode == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = this.eChangeMode = this2;
		} else {
			this1 = this.eChangeMode;
		}
		this1.add({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.changeModeHandler))});
	}
	,disallowChangeMode: function() {
		var this1;
		if(this.eChangeMode == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = this.eChangeMode = this2;
		} else {
			this1 = this.eChangeMode;
		}
		this1.remove({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.changeModeHandler))});
	}
	,changeModeHandler: function(v) {
		var v1 = v != 0 ? v + 1 : v;
		if(this.eChangeLowMode == null || v1 != this.lowMode) {
			var prev = this.lowMode;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeLowMode,this.lowMode = v1,prev,true);
		}
		var v2 = v == 1;
		if(this.eChangeBMode == null || v2 != this.bMode) {
			var prev1 = this.bMode;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeBMode,this.bMode = v2,prev1,true);
		}
	}
	,overDownHandler: function() {
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eVisual,this.lowMode,pony_ui_gui_ButtonState.Press);
	}
	,outDownHandler: function() {
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eVisual,this.lowMode,pony_ui_gui_ButtonState.Leave);
	}
	,destroySignals: function() {
		pony_Tumbler.prototype.destroySignals.call(this);
		var this1 = this.eClick;
		if(this1 != null) {
			this1.destroy();
		}
		this.eClick = null;
		var this2 = this.eVisual;
		if(this2 != null) {
			this2.destroy();
		}
		this.eVisual = null;
		if(this.eChangeLowMode != null) {
			var this3 = this.eChangeLowMode;
			if(this3 != null) {
				this3.destroy();
			}
		}
		this.eChangeLowMode = null;
		if(this.eChangeMode != null) {
			var this4 = this.eChangeMode;
			if(this4 != null) {
				this4.destroy();
			}
		}
		this.eChangeMode = null;
		if(this.eChangeBMode != null) {
			var this5 = this.eChangeBMode;
			if(this5 != null) {
				this5.destroy();
			}
		}
		this.eChangeBMode = null;
		if(this.eChangeState != null) {
			var this6 = this.eChangeState;
			if(this6 != null) {
				this6.destroy();
			}
		}
		this.eChangeState = null;
	}
	,__class__: pony_ui_gui_ButtonCore
});
var pony_ui_gui_ButtonImgN = function(t) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eImg = this1;
	pony_ui_gui_ButtonCore.call(this,t);
	this.eVisual.add({ once : false, listener : pony_events_Listener2Type.LFunction2($bind(this,this.visualHandler))});
};
pony_ui_gui_ButtonImgN.__name__ = true;
pony_ui_gui_ButtonImgN.__super__ = pony_ui_gui_ButtonCore;
pony_ui_gui_ButtonImgN.prototype = $extend(pony_ui_gui_ButtonCore.prototype,{
	visualHandler: function(mode,state) {
		if(mode == 1) {
			pony_events__$Event1_Event1_$Impl_$.dispatch(this.eImg,4);
			return;
		}
		var n;
		switch(state[1]) {
		case 0:
			n = 1;
			break;
		case 1:
			n = 2;
			break;
		case 2:
			n = 2;
			break;
		case 3:
			n = 3;
			break;
		}
		if(mode > 1) {
			n += (mode - 1) * 3 + 1;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eImg,n);
	}
	,destroySignals: function() {
		pony_ui_gui_ButtonCore.prototype.destroySignals.call(this);
		var this1 = this.eImg;
		if(this1 != null) {
			this1.destroy();
		}
		this.eImg = null;
	}
	,__class__: pony_ui_gui_ButtonImgN
});
var pony_ui_gui_IntervalLayoutCore = function(_interval,_vert,_border,_align) {
	this._interval = _interval;
	var tmp;
	if(_vert != null) {
		tmp = _vert;
	} else {
		_vert = false;
		tmp = false;
	}
	this._vert = tmp;
	var tmp1;
	if(_border != null) {
		tmp1 = _border;
	} else {
		var left = null;
		var right = null;
		var bottom = null;
		var this1;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this1 = { top : 0, left : left, right : right, bottom : bottom};
		_border = this1;
		tmp1 = _border;
	}
	this._border = tmp1;
	var tmp2;
	if(_align != null) {
		tmp2 = _align;
	} else {
		var this2 = { a : pony_geom_VAlign.Middle, b : pony_geom_HAlign.Center};
		_align = this2;
		tmp2 = _align;
	}
	this._align = tmp2;
	pony_ui_gui_BaseLayoutCore.call(this);
};
pony_ui_gui_IntervalLayoutCore.__name__ = true;
pony_ui_gui_IntervalLayoutCore.__super__ = pony_ui_gui_BaseLayoutCore;
pony_ui_gui_IntervalLayoutCore.prototype = $extend(pony_ui_gui_BaseLayoutCore.prototype,{
	update: function() {
		if(this.objects == null) {
			return;
		}
		if(!this.ready) {
			return;
		}
		var pos = 0;
		if(this._vert) {
			this._w = 0;
			pos = this._border.top;
			var _g = [];
			var _g1 = 0;
			var _g2 = this.objects;
			while(_g1 < _g2.length) {
				var obj = _g2[_g1];
				++_g1;
				var objSize = this.getSizeMod(obj,js_Boot.__instanceof(obj,pony_geom_IWH) ? (js_Boot.__cast(obj , pony_geom_IWH)).get_size() : this.getSize(obj));
				this.setYpos(obj,pos | 0);
				pos += objSize.y + this._interval;
				if(objSize.x > this._w) {
					this._w = objSize.x;
				}
				_g.push(objSize.x);
			}
			if(this.objects.length > 0) {
				pos -= this._interval;
			}
			this._h = pos;
			var p = pony_ArrayTools.pair(pony_geom_GeomTools.halign(this._align.b,this._w,_g),this.objects);
			while(p.hasNext()) {
				var p1 = p.next();
				this.setXpos(p1.b,(p1.a | 0) + this._border.left);
			}
		} else {
			this._h = 0;
			pos = this._border.left;
			var _g3 = [];
			var _g11 = 0;
			var _g21 = this.objects;
			while(_g11 < _g21.length) {
				var obj1 = _g21[_g11];
				++_g11;
				var objSize1 = this.getSizeMod(obj1,js_Boot.__instanceof(obj1,pony_geom_IWH) ? (js_Boot.__cast(obj1 , pony_geom_IWH)).get_size() : this.getSize(obj1));
				this.setXpos(obj1,pos | 0);
				pos += objSize1.x + this._interval;
				if(objSize1.y > this._h) {
					this._h = objSize1.y;
				}
				_g3.push(objSize1.y);
			}
			if(this.objects.length > 0) {
				pos -= this._interval;
			}
			this._w = pos;
			var p2 = pony_ArrayTools.pair(pony_geom_GeomTools.valign(this._align.a,this._h,_g3),this.objects);
			while(p2.hasNext()) {
				var p3 = p2.next();
				this.setYpos(p3.b,(p3.a | 0) + this._border.top);
			}
		}
		pony_ui_gui_BaseLayoutCore.prototype.update.call(this);
	}
	,__class__: pony_ui_gui_IntervalLayoutCore
});
var pony_ui_gui_RubberLayoutCore = function(_vert,_border,_padding,_align) {
	var tmp;
	if(_vert != null) {
		tmp = _vert;
	} else {
		_vert = false;
		tmp = false;
	}
	this._vert = tmp;
	var tmp1;
	if(_border != null) {
		tmp1 = _border;
	} else {
		var left = null;
		var right = null;
		var bottom = null;
		var this1;
		if(left == null) {
			left = 0;
		}
		if(right == null) {
			right = left;
		}
		if(bottom == null) {
			bottom = 0;
		}
		this1 = { top : 0, left : left, right : right, bottom : bottom};
		_border = this1;
		tmp1 = _border;
	}
	this._border = tmp1;
	var tmp2;
	if(_padding != null) {
		tmp2 = _padding;
	} else {
		_padding = true;
		tmp2 = true;
	}
	this._padding = tmp2;
	var tmp3;
	if(_align != null) {
		tmp3 = _align;
	} else {
		var this2 = { a : pony_geom_VAlign.Middle, b : pony_geom_HAlign.Center};
		_align = this2;
		tmp3 = _align;
	}
	this._align = tmp3;
	pony_ui_gui_BaseLayoutCore.call(this);
};
pony_ui_gui_RubberLayoutCore.__name__ = true;
pony_ui_gui_RubberLayoutCore.__super__ = pony_ui_gui_BaseLayoutCore;
pony_ui_gui_RubberLayoutCore.prototype = $extend(pony_ui_gui_BaseLayoutCore.prototype,{
	update: function() {
		if(this.objects == null) {
			return;
		}
		if(!this.ready) {
			return;
		}
		var this1 = { x : this.width, y : this.height};
		var positions = this1;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.objects;
		while(_g1 < _g2.length) {
			var obj = _g2[_g1];
			++_g1;
			_g.push(this.getSizeMod(obj,js_Boot.__instanceof(obj,pony_geom_IWH) ? (js_Boot.__cast(obj , pony_geom_IWH)).get_size() : this.getSize(obj)));
		}
		var positions1 = pony_geom_GeomTools.pointsCeil(pony_geom_GeomTools.center(positions,_g,this._vert,this._border,this._padding,this._align));
		var p = pony_ArrayTools.pair(this.objects,positions1);
		while(p.hasNext()) {
			var p1 = p.next();
			this.setXpos(p1.a,p1.b.x);
			this.setYpos(p1.a,p1.b.y);
		}
		pony_ui_gui_BaseLayoutCore.prototype.update.call(this);
	}
	,get_size: function() {
		var this1 = { x : this.width, y : this.height};
		return this1;
	}
	,__class__: pony_ui_gui_RubberLayoutCore
});
var pony_ui_gui_SliderCore = function(button,size,isVertical,invert,draggable) {
	if(draggable == null) {
		draggable = true;
	}
	if(invert == null) {
		invert = false;
	}
	if(isVertical == null) {
		isVertical = false;
	}
	var tmp;
	if(button != null) {
		tmp = button;
	} else {
		button = null;
		tmp = button;
	}
	this.button = tmp;
	if(this.eChangeFinalPercent == null || 0 != this.finalPercent) {
		var prev = this.finalPercent;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalPercent,this.finalPercent = 0,prev,true);
	}
	if(this.eChangeFinalPos == null || 0 != this.finalPos) {
		var prev1 = this.finalPos;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalPos,this.finalPos = 0,prev1,true);
	}
	if(this.eChangeFinalValue == null || 0 != this.finalValue) {
		var prev2 = this.finalValue;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalValue,this.finalValue = 0,prev2,true);
	}
	this.startPoint = 0;
	pony_ui_gui_BarCore.call(this,size,isVertical,invert);
	this.draggable = draggable;
	if(button != null) {
		this.onStartDrag = button.touch.eDown;
		var this1 = button.touch.eUp;
		var s = button.touch.eOutUp;
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		var ns = this2;
		this1.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns)});
		s.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns)});
		this.onStopDrag = ns;
	} else {
		var this3 = new pony_Priority(null,false);
		this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this.onStartDrag = this3;
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this.onStopDrag = this4;
	}
	this.onStopDrag.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.stopDragHandler))});
	if(draggable) {
		this.onStartDrag.add({ once : false, listener : pony_events_Listener1Type.LFunction1(isVertical ? $bind(this,this.startYDragHandler) : $bind(this,this.startXDragHandler))});
		this.onStartDrag.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.startDragHandler))});
	}
	if(button != null) {
		var this5;
		if(this.eChangePos == null) {
			var this6 = new pony_Priority(null,false);
			this6.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this5 = this.eChangePos = this6;
		} else {
			this5 = this.eChangePos;
		}
		this5.add({ once : false, listener : pony_events_Listener2Type.LFunction0(($_=button.touch,$bind($_,$_.check)))});
	}
};
pony_ui_gui_SliderCore.__name__ = true;
pony_ui_gui_SliderCore.__super__ = pony_ui_gui_BarCore;
pony_ui_gui_SliderCore.prototype = $extend(pony_ui_gui_BarCore.prototype,{
	destroy: function() {
		this.destroySignals();
		if(this.button != null) {
			this.button.destroy();
		}
	}
	,stopDragHandler: function(t) {
		if(t != null) {
			t.eMove.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.moveHandler))});
		}
		var v = this.pos;
		if(this.eChangeFinalPos == null || v != this.finalPos) {
			var prev = this.finalPos;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalPos,this.finalPos = v,prev,true);
		}
		var v1 = this.percent;
		if(this.eChangeFinalPercent == null || v1 != this.finalPercent) {
			var prev1 = this.finalPercent;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalPercent,this.finalPercent = v1,prev1,true);
		}
		var v2 = this.value;
		if(this.eChangeFinalValue == null || v2 != this.finalValue) {
			var prev2 = this.finalValue;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeFinalValue,this.finalValue = v2,prev2,true);
		}
		if(this.button != null) {
			var this1;
			if(this.eChangePos == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
				this1 = this.eChangePos = this2;
			} else {
				this1 = this.eChangePos;
			}
			this1.add({ once : false, listener : pony_events_Listener2Type.LFunction0(($_=this.button.touch,$bind($_,$_.check)))});
		}
	}
	,startXDragHandler: function(t) {
		var p = this.pos;
		this.startPoint = (this.invert ? this.size - p : p) - t.x;
	}
	,startYDragHandler: function(t) {
		var p = this.pos;
		this.startPoint = (this.invert ? this.size - p : p) - t.y;
	}
	,startDragHandler: function(t) {
		if(t != null) {
			t.eMove.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.moveHandler))});
		}
		if(this.button != null) {
			var this1;
			if(this.eChangePos == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
				this1 = this.eChangePos = this2;
			} else {
				this1 = this.eChangePos;
			}
			this1.remove({ once : false, listener : pony_events_Listener2Type.LFunction0(($_=this.button.touch,$bind($_,$_.check)))});
		}
	}
	,moveHandler: function(t) {
		var p = (this.isVertical ? t.y : t.x) + this.startPoint;
		var p1 = this.invert ? this.size - p : p;
		var v = p1 < 0 ? 0 : p1 > this.size ? this.size : p1;
		if(this.eChangePos == null || v != this.pos) {
			var prev = this.pos;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangePos,this.pos = v,prev,true);
		}
	}
	,destroySignals: function() {
		pony_ui_gui_BarCore.prototype.destroySignals.call(this);
		if(this.eChangeFinalPercent != null) {
			var this1 = this.eChangeFinalPercent;
			if(this1 != null) {
				this1.destroy();
			}
		}
		this.eChangeFinalPercent = null;
		if(this.eChangeFinalPos != null) {
			var this2 = this.eChangeFinalPos;
			if(this2 != null) {
				this2.destroy();
			}
		}
		this.eChangeFinalPos = null;
		if(this.eChangeFinalValue != null) {
			var this3 = this.eChangeFinalValue;
			if(this3 != null) {
				this3.destroy();
			}
		}
		this.eChangeFinalValue = null;
	}
	,__class__: pony_ui_gui_SliderCore
});
var pony_ui_gui_SmoothBarCore = function(size,isVertical,invert) {
	if(invert == null) {
		invert = false;
	}
	if(isVertical == null) {
		isVertical = false;
	}
	var _gthis = this;
	if(this.eChangeSmooth == null || false != this.smooth) {
		var prev = this.smooth;
		this.smooth = false;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeSmooth,false,prev,true);
	}
	if(this.eChangeSmoothPercent == null || 0 != this.smoothPercent) {
		var prev1 = this.smoothPercent;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeSmoothPercent,this.smoothPercent = 0,prev1,true);
	}
	if(this.eChangeSmoothPos == null || 0 != this.smoothPos) {
		var prev2 = this.smoothPos;
		pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeSmoothPos,this.smoothPos = 0,prev2,true);
	}
	pony_ui_gui_BarCore.call(this,size,isVertical,invert);
	var this1;
	if(this.eChangeSmooth == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this1 = this.eChangeSmooth = this2;
	} else {
		this1 = this.eChangeSmooth;
	}
	pony_events__$Signal2_Signal2_$Impl_$.sub1(this1,true).add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.enableSmoothPercent))});
	var this3;
	if(this.eChangeSmooth == null) {
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this3 = this.eChangeSmooth = this4;
	} else {
		this3 = this.eChangeSmooth;
	}
	pony_events__$Signal2_Signal2_$Impl_$.sub1(this3,false).add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.disableSmoothPercent))});
	if(isVertical) {
		var this5;
		if(this.eChangeSmoothPos == null) {
			var this6 = new pony_Priority(null,false);
			this6.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this5 = this.eChangeSmoothPos = this6;
		} else {
			this5 = this.eChangeSmoothPos;
		}
		this5.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v) {
			_gthis.smoothChangeY(_gthis.invert ? _gthis.size - v : v);
		})});
	} else {
		var this7;
		if(this.eChangeSmoothPos == null) {
			var this8 = new pony_Priority(null,false);
			this8.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this7 = this.eChangeSmoothPos = this8;
		} else {
			this7 = this.eChangeSmoothPos;
		}
		this7.add({ once : false, listener : pony_events_Listener2Type.LFunction1(function(v1) {
			_gthis.smoothChangeX(_gthis.invert ? _gthis.size - v1 : v1);
		})});
	}
};
pony_ui_gui_SmoothBarCore.__name__ = true;
pony_ui_gui_SmoothBarCore.__super__ = pony_ui_gui_BarCore;
pony_ui_gui_SmoothBarCore.prototype = $extend(pony_ui_gui_BarCore.prototype,{
	enableSmoothPercent: function() {
		var this1;
		if(this.eChangePercent == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = this.eChangePercent = this2;
		} else {
			this1 = this.eChangePercent;
		}
		this1.add({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.updateSmoothPercentTarget))});
	}
	,disableSmoothPercent: function() {
		var this1;
		if(this.eChangePercent == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = this.eChangePercent = this2;
		} else {
			this1 = this.eChangePercent;
		}
		this1.remove({ once : false, listener : pony_events_Listener2Type.LFunction1($bind(this,this.updateSmoothPercentTarget))});
	}
	,updateSmoothPercentTarget: function(p) {
		if(p != this.smoothPercent) {
			var this1;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this2 = new pony_Priority(null,false);
				this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this1 = pony_time_DeltaTime.eFixedUpdate = this2;
			} else {
				this1 = pony_time_DeltaTime.eFixedUpdate;
			}
			this1.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.updateSmoothPercent))});
		}
	}
	,updateSmoothPercent: function(dt) {
		var d = this.percent - this.smoothPercent;
		var n = this.smoothPercent + dt * d * 5.;
		if(d > 0) {
			if(n >= this.percent - 0.001) {
				n = this.percent;
				var this1;
				if(pony_time_DeltaTime.eFixedUpdate == null) {
					var this2 = new pony_Priority(null,false);
					this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
					this1 = pony_time_DeltaTime.eFixedUpdate = this2;
				} else {
					this1 = pony_time_DeltaTime.eFixedUpdate;
				}
				this1.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.updateSmoothPercent))});
			}
		} else if(n <= this.percent + 0.001) {
			n = this.percent;
			var this3;
			if(pony_time_DeltaTime.eFixedUpdate == null) {
				var this4 = new pony_Priority(null,false);
				this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
				this3 = pony_time_DeltaTime.eFixedUpdate = this4;
			} else {
				this3 = pony_time_DeltaTime.eFixedUpdate;
			}
			this3.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.updateSmoothPercent))});
		}
		if(this.eChangeSmoothPercent == null || n != this.smoothPercent) {
			var prev = this.smoothPercent;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeSmoothPercent,this.smoothPercent = n,prev,true);
		}
		var v = this.smoothPercent * this.size;
		if(this.eChangeSmoothPos == null || v != this.smoothPos) {
			var prev1 = this.smoothPos;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangeSmoothPos,this.smoothPos = v,prev1,true);
		}
	}
	,smoothChangeX: function(v) {
	}
	,smoothChangeY: function(v) {
	}
	,endInit: function() {
		pony_ui_gui_BarCore.prototype.endInit.call(this);
		if(this.isVertical) {
			this.smoothChangeY(this.invert ? this.size : 0);
		} else {
			this.smoothChangeX(this.invert ? this.size : 0);
		}
	}
	,destroySignals: function() {
		pony_ui_gui_BarCore.prototype.destroySignals.call(this);
		if(this.eChangeSmooth != null) {
			var this1 = this.eChangeSmooth;
			if(this1 != null) {
				this1.destroy();
			}
		}
		this.eChangeSmooth = null;
		if(this.eChangeSmoothPercent != null) {
			var this2 = this.eChangeSmoothPercent;
			if(this2 != null) {
				this2.destroy();
			}
		}
		this.eChangeSmoothPercent = null;
		if(this.eChangeSmoothPos != null) {
			var this3 = this.eChangeSmoothPos;
			if(this3 != null) {
				this3.destroy();
			}
		}
		this.eChangeSmoothPos = null;
	}
	,__class__: pony_ui_gui_SmoothBarCore
});
var pony_ui_gui_StepSliderCore = function(button,size,isVertical,invert,draggable) {
	if(draggable == null) {
		draggable = true;
	}
	if(invert == null) {
		invert = false;
	}
	if(isVertical == null) {
		isVertical = false;
	}
	this.posStep = 0;
	this.percentRound = -1;
	this.valueRound = -1;
	pony_ui_gui_SliderCore.call(this,button,size,isVertical,invert,draggable);
};
pony_ui_gui_StepSliderCore.__name__ = true;
pony_ui_gui_StepSliderCore.__super__ = pony_ui_gui_SliderCore;
pony_ui_gui_StepSliderCore.prototype = $extend(pony_ui_gui_SliderCore.prototype,{
	moveHandler: function(t) {
		var p = (this.isVertical ? t.y : t.x) + this.startPoint;
		var p1 = this.invert ? this.size - p : p;
		var p2 = this.posStep == 0 ? p1 : Math.round(p1 / this.posStep) * this.posStep;
		var v = p2 < 0 ? 0 : p2 > this.size ? this.size : p2;
		if(this.eChangePos == null || v != this.pos) {
			var prev = this.pos;
			pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangePos,this.pos = v,prev,true);
		}
	}
	,changePosHandler: function(v) {
		if(this.percentRound == -1) {
			pony_ui_gui_SliderCore.prototype.changePosHandler.call(this,v);
		} else {
			var count = this.percentRound;
			var v1 = Math.round(v / this.size * Math.pow(10,count)) / Math.pow(10,count);
			if(this.eChangePercent == null || v1 != this.percent) {
				var prev = this.percent;
				pony_events__$Event2_Event2_$Impl_$.dispatch(this.eChangePercent,this.percent = v1,prev,true);
			}
		}
	}
	,__class__: pony_ui_gui_StepSliderCore
});
var pony_ui_gui_ZeroPlaceCore = function() {
	pony_ui_gui_BaseLayoutCore.call(this);
};
pony_ui_gui_ZeroPlaceCore.__name__ = true;
pony_ui_gui_ZeroPlaceCore.__super__ = pony_ui_gui_BaseLayoutCore;
pony_ui_gui_ZeroPlaceCore.prototype = $extend(pony_ui_gui_BaseLayoutCore.prototype,{
	update: function() {
		if(this.objects == null) {
			return;
		}
		if(!this.ready) {
			return;
		}
		if(this.objects.length == 0) {
			this._w = 0;
			this._h = 0;
		} else if(this.objects.length == 1) {
			var o = this.objects[0];
			this._w = this.getSizeMod(o,js_Boot.__instanceof(o,pony_geom_IWH) ? (js_Boot.__cast(o , pony_geom_IWH)).get_size() : this.getSize(o)).x;
			var o1 = this.objects[0];
			this._h = this.getSizeMod(o1,js_Boot.__instanceof(o1,pony_geom_IWH) ? (js_Boot.__cast(o1 , pony_geom_IWH)).get_size() : this.getSize(o1)).y;
			this.setXpos(this.objects[0],-this._w / 2);
			this.setYpos(this.objects[0],-this._h / 2);
		} else {
			this._w = 0;
			this._h = 0;
			var _g = 0;
			var _g1 = this.objects;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				var sw = this.getSizeMod(obj,js_Boot.__instanceof(obj,pony_geom_IWH) ? (js_Boot.__cast(obj , pony_geom_IWH)).get_size() : this.getSize(obj)).x;
				var sh = this.getSizeMod(obj,js_Boot.__instanceof(obj,pony_geom_IWH) ? (js_Boot.__cast(obj , pony_geom_IWH)).get_size() : this.getSize(obj)).y;
				if(sw > this._w) {
					this._w = sw;
				}
				if(sh > this._h) {
					this._h = sh;
				}
				this.setXpos(obj,-sw / 2);
				this.setYpos(obj,-sh / 2);
			}
		}
	}
	,__class__: pony_ui_gui_ZeroPlaceCore
});
var pony_ui_touch_Mouse = function() { };
pony_ui_touch_Mouse.__name__ = true;
pony_ui_touch_Mouse.__interfaces__ = [pony_magic_HasSignal,pony_magic_Declarator];
pony_ui_touch_Mouse.moveHandler = function(x,y) {
	pony_ui_touch_Mouse.x = x;
	pony_ui_touch_Mouse.y = y;
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_Mouse.moveDispatch)};
	e.once = true;
	this1.add(e,-4);
};
pony_ui_touch_Mouse.moveDispatch = function() {
	pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eMove,pony_ui_touch_Mouse.x,pony_ui_touch_Mouse.y);
};
pony_ui_touch_Mouse.downHandler = function(x,y,b) {
	pony_ui_touch_Mouse.downStack.push({ x : x, y : y, b : b});
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_Mouse.downDispatch)};
	e.once = true;
	this1.add(e,-5);
};
pony_ui_touch_Mouse.downDispatch = function() {
	var _g = 0;
	var _g1 = pony_ui_touch_Mouse.downStack;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var _g2 = e.b;
		switch(_g2) {
		case 0:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eLeftDown,e.x,e.y);
			break;
		case 1:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eMiddleDown,e.x,e.y);
			break;
		case 2:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eRightDown,e.x,e.y);
			break;
		}
	}
	pony_ui_touch_Mouse.downStack = [];
};
pony_ui_touch_Mouse.upHandler = function(x,y,b) {
	pony_ui_touch_Mouse.upStack.push(b);
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_Mouse.upDispatch)};
	e.once = true;
	this1.add(e,-3);
};
pony_ui_touch_Mouse.upDispatch = function() {
	var _g = 0;
	var _g1 = pony_ui_touch_Mouse.upStack;
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		switch(e) {
		case 0:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eLeftUp,pony_ui_touch_Mouse.x,pony_ui_touch_Mouse.y);
			break;
		case 1:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eMiddleUp,pony_ui_touch_Mouse.x,pony_ui_touch_Mouse.y);
			break;
		case 2:
			pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_Mouse.eRightUp,pony_ui_touch_Mouse.x,pony_ui_touch_Mouse.y);
			break;
		}
	}
	pony_ui_touch_Mouse.upStack = [];
};
var pony_ui_touch_Touch = function() {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eMove = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eUp = this11;
	var this12 = new pony_Priority(null,false);
	this12.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eDown = this12;
	var this13 = new pony_Priority(null,false);
	this13.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOutDown = this13;
	var this14 = new pony_Priority(null,false);
	this14.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOverDown = this14;
	var this15 = new pony_Priority(null,false);
	this15.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOutUp = this15;
	var this16 = new pony_Priority(null,false);
	this16.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOut = this16;
	var this17 = new pony_Priority(null,false);
	this17.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOver = this17;
};
pony_ui_touch_Touch.__name__ = true;
pony_ui_touch_Touch.__interfaces__ = [pony_magic_HasSignal];
pony_ui_touch_Touch.prototype = {
	clear: function() {
		var _this = this.eOver;
		var needOnLost = _this.data.length != 0;
		_this.hash = new haxe_ds_IntMap();
		_this.data = [];
		_this.counters = [0];
		_this.addStack = [];
		if(needOnLost) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this.eLost);
		}
		var _this1 = this.eOut;
		var needOnLost1 = _this1.data.length != 0;
		_this1.hash = new haxe_ds_IntMap();
		_this1.data = [];
		_this1.counters = [0];
		_this1.addStack = [];
		if(needOnLost1) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this1.eLost);
		}
		var _this2 = this.eOutUp;
		var needOnLost2 = _this2.data.length != 0;
		_this2.hash = new haxe_ds_IntMap();
		_this2.data = [];
		_this2.counters = [0];
		_this2.addStack = [];
		if(needOnLost2) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this2.eLost);
		}
		var _this3 = this.eOverDown;
		var needOnLost3 = _this3.data.length != 0;
		_this3.hash = new haxe_ds_IntMap();
		_this3.data = [];
		_this3.counters = [0];
		_this3.addStack = [];
		if(needOnLost3) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this3.eLost);
		}
		var _this4 = this.eOutDown;
		var needOnLost4 = _this4.data.length != 0;
		_this4.hash = new haxe_ds_IntMap();
		_this4.data = [];
		_this4.counters = [0];
		_this4.addStack = [];
		if(needOnLost4) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this4.eLost);
		}
		var _this5 = this.eDown;
		var needOnLost5 = _this5.data.length != 0;
		_this5.hash = new haxe_ds_IntMap();
		_this5.data = [];
		_this5.counters = [0];
		_this5.addStack = [];
		if(needOnLost5) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this5.eLost);
		}
		var _this6 = this.eUp;
		var needOnLost6 = _this6.data.length != 0;
		_this6.hash = new haxe_ds_IntMap();
		_this6.data = [];
		_this6.counters = [0];
		_this6.addStack = [];
		if(needOnLost6) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this6.eLost);
		}
		var _this7 = this.eMove;
		var needOnLost7 = _this7.data.length != 0;
		_this7.hash = new haxe_ds_IntMap();
		_this7.data = [];
		_this7.counters = [0];
		_this7.addStack = [];
		if(needOnLost7) {
			pony_events__$Event0_Event0_$Impl_$.dispatch(_this7.eLost);
		}
	}
	,__class__: pony_ui_touch_Touch
};
var pony_ui_touch_TouchableBase = function() {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eSwipe = this1;
	var this11 = new pony_Priority(null,false);
	this11.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eWheel = this11;
	var this12 = new pony_Priority(null,false);
	this12.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eTap = this12;
	var this13 = new pony_Priority(null,false);
	this13.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this.eClick = this13;
	var this14 = new pony_Priority(null,false);
	this14.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eUp = this14;
	var this15 = new pony_Priority(null,false);
	this15.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eDown = this15;
	var this16 = new pony_Priority(null,false);
	this16.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOutDown = this16;
	var this17 = new pony_Priority(null,false);
	this17.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOverDown = this17;
	var this18 = new pony_Priority(null,false);
	this18.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOutUp = this18;
	var this19 = new pony_Priority(null,false);
	this19.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOut = this19;
	var this110 = new pony_Priority(null,false);
	this110.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	this.eOver = this110;
	var _gthis = this;
	var listener = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		var this111 = _gthis.eUp;
		var listener1 = { once : false, listener : pony_events_Listener1Type.LEvent0(_gthis.eClick)};
		listener1.once = true;
		this111.add(listener1,0);
	})};
	this.eDown.add(listener);
	var listener2 = { once : false, listener : pony_events_Listener1Type.LFunction0(function() {
		_gthis.eUp.remove({ once : false, listener : pony_events_Listener1Type.LEvent0(_gthis.eClick)});
	})};
	this.eOutUp.add(listener2);
	var _this = this.eTap;
	var this2;
	if(_this.eTake == null) {
		var this3 = new pony_Priority(null,false);
		this3.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this2 = _this.eTake = this3;
	} else {
		this2 = _this.eTake;
	}
	this2.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.eTapTake))});
	var _this1 = this.eTap;
	var this4;
	if(_this1.eLost == null) {
		var this5 = new pony_Priority(null,false);
		this5.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this4 = _this1.eLost = this5;
	} else {
		this4 = _this1.eLost;
	}
	this4.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.eTapLost))});
	var _this2 = this.eWheel;
	var this6;
	if(_this2.eTake == null) {
		var this7 = new pony_Priority(null,false);
		this7.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this6 = _this2.eTake = this7;
	} else {
		this6 = _this2.eTake;
	}
	this6.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.addWheel))});
	var _this3 = this.eWheel;
	var this8;
	if(_this3.eLost == null) {
		var this9 = new pony_Priority(null,false);
		this9.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this8 = _this3.eLost = this9;
	} else {
		this8 = _this3.eLost;
	}
	this8.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.removeWheel))});
	var _this4 = this.eSwipe;
	var this10;
	if(_this4.eTake == null) {
		var this112 = new pony_Priority(null,false);
		this112.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this10 = _this4.eTake = this112;
	} else {
		this10 = _this4.eTake;
	}
	this10.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.addSwipe))});
	var _this5 = this.eSwipe;
	var this121;
	if(_this5.eLost == null) {
		var this131 = new pony_Priority(null,false);
		this131.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this121 = _this5.eLost = this131;
	} else {
		this121 = _this5.eLost;
	}
	this121.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.removeSwipe))});
};
pony_ui_touch_TouchableBase.__name__ = true;
pony_ui_touch_TouchableBase.__interfaces__ = [pony_magic_HasSignal];
pony_ui_touch_TouchableBase.dispatchMove = function(id,x,y) {
	if(id == null) {
		id = 0;
	}
	if(pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
		var tmp = pony_ui_touch_TouchableBase.touches.h[id].eMove;
		var _this = pony_ui_touch_TouchableBase.touches.h[id];
		_this.x = x;
		_this.y = y;
		pony_events__$Event1_Event1_$Impl_$.dispatch(tmp,_this);
	}
};
pony_ui_touch_TouchableBase.removeTouch = function(id) {
	if(id == 0 || !pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
		return;
	}
	pony_ui_touch_TouchableBase.touches.h[id].clear();
	pony_ui_touch_TouchableBase.touchPool.list.push(pony_ui_touch_TouchableBase.touches.h[id]);
	pony_ui_touch_TouchableBase.touches.remove(id);
};
pony_ui_touch_TouchableBase.prototype = {
	addSwipe: function() {
		var this1 = { min : 0, max : 50};
		var tmp;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			tmp = pony_time_DeltaTime.eFixedUpdate;
		}
		this.swipeTimer = new pony_time_DTimer(tmp,this1,0);
		this.swipeTimer.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.checkSwipe))});
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.listenSwipe))};
		listener.once = true;
		this.eDown.add(listener,0);
	}
	,removeSwipe: function() {
		this.eDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.listenSwipe))});
		this.cancleSwipe();
		this.swipeTimer.destroy();
		this.swipeTimer = null;
	}
	,listenSwipe: function(t) {
		var this1 = { x : t.x, y : t.y};
		this.swipePoint = this1;
		this.eDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.listenSwipe))});
		this.swipeTouch = t;
		this.swipeTimer.repeatCount = 8;
		var _this = this.swipeTimer;
		_this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
		if(null != null) {
			_this._update(null);
		}
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleSwipeAndListenDown))};
		listener.once = true;
		t.eUp.add(listener,0);
		var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleSwipeAndListenDown))};
		listener1.once = true;
		t.eOutUp.add(listener1,0);
	}
	,checkSwipe: function() {
		var x = this.swipePoint.x - this.swipeTouch.x;
		var y = this.swipePoint.y - this.swipeTouch.y;
		var ax = Math.abs(x);
		var ay = Math.abs(y);
		if(ax > ay) {
			if(ax >= 4) {
				this.eUp.remove({ once : false, listener : pony_events_Listener1Type.LEvent0(this.eClick)});
				pony_events__$Event1_Event1_$Impl_$.dispatch(this.eSwipe,x > 0 ? pony_geom_Direction.left : pony_geom_Direction.right);
				this.cancleSwipeAndListenDown();
				return;
			}
		} else if(ax < ay) {
			if(ay >= 4) {
				this.eUp.remove({ once : false, listener : pony_events_Listener1Type.LEvent0(this.eClick)});
				pony_events__$Event1_Event1_$Impl_$.dispatch(this.eSwipe,y > 0 ? pony_geom_Direction.up : pony_geom_Direction.down);
				this.cancleSwipeAndListenDown();
				return;
			}
		}
		if(this.swipeTimer.repeatCount == 0) {
			this.cancleSwipeAndListenDown();
		}
	}
	,cancleSwipeAndListenDown: function() {
		this.cancleSwipe();
		if(this.swipeTimer != null) {
			var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.listenSwipe))};
			listener.once = true;
			this.eDown.add(listener,0);
		}
	}
	,cancleSwipe: function() {
		if(this.swipeTimer != null) {
			var _this = this.swipeTimer;
			_this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
			this.swipeTimer.reset();
		}
		if(this.swipeTouch != null) {
			this.swipeTouch.eUp.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleSwipeAndListenDown))});
			this.swipeTouch.eOutUp.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleSwipeAndListenDown))});
			this.swipeTouch = null;
		}
		this.swipePoint = null;
	}
	,addWheel: function() {
		this.eOver.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.listenWheel))});
		this.eUp.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.listenWheel))});
		this.eOut.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.unlistenWheel))});
		this.eOutUp.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.unlistenWheel))});
	}
	,removeWheel: function() {
		if(this.eOver != null) {
			this.eOver.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.listenWheel))});
		}
		if(this.eUp != null) {
			this.eUp.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.listenWheel))});
		}
		if(this.eOut != null) {
			this.eOut.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.unlistenWheel))});
		}
		if(this.eOutUp != null) {
			this.eOutUp.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.unlistenWheel))});
		}
	}
	,listenWheel: function() {
		pony_ui_touch_Mouse.eWheel.add({ once : false, listener : pony_events_Listener1Type.LEvent1(this.eWheel)});
	}
	,unlistenWheel: function() {
		pony_ui_touch_Mouse.eWheel.remove({ once : false, listener : pony_events_Listener1Type.LEvent1(this.eWheel)});
	}
	,eTapTake: function() {
		var this1 = { min : 0, max : 300};
		var tmp;
		if(pony_time_DeltaTime.eFixedUpdate == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
			tmp = pony_time_DeltaTime.eFixedUpdate = this2;
		} else {
			tmp = pony_time_DeltaTime.eFixedUpdate;
		}
		this.tapTimer = new pony_time_DTimer(tmp,this1,0);
		this.tapTimer.eComplete.add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleTap))});
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.beginTap))};
		listener.once = true;
		this.eDown.add(listener,0);
	}
	,eTapLost: function() {
		if(this.tapTouch != null) {
			this.removeTapCancle();
		}
		this.tapTimer.destroy();
		this.tapTimer = null;
		this.eDown.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.beginTap))});
	}
	,beginTap: function(t) {
		this.tapTouch = t;
		var _this = this.tapTimer;
		_this.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
		if(null != null) {
			_this._update(null);
		}
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.tapHandler))};
		listener.once = true;
		this.eUp.add(listener,0);
		var listener1 = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.tapFirstMove))};
		listener1.once = true;
		t.eMove.add(listener1,0);
	}
	,tapFirstMove: function() {
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleTap))};
		listener.once = true;
		this.tapTouch.eMove.add(listener,0);
	}
	,tapHandler: function(t) {
		this.removeTapCancle();
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.beginTap))};
		listener.once = true;
		this.eDown.add(listener,0);
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eTap,t);
	}
	,cancleTap: function() {
		this.removeTapCancle();
		var listener = { once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.beginTap))};
		listener.once = true;
		this.eDown.add(listener,0);
	}
	,removeTapCancle: function() {
		this.eUp.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.tapHandler))});
		var _this = this.tapTimer;
		_this.updateSignal.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(_this,_this._update))});
		this.tapTimer.reset();
		this.tapTouch.eMove.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.tapFirstMove))});
		this.tapTouch.eMove.remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.cancleTap))});
		this.tapTouch = null;
	}
	,destroy: function() {
		this.unlistenWheel();
		if(this.tapTimer != null) {
			this.eTapLost();
		}
		var _this = this.eTap;
		var this1;
		if(_this.eTake == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
			this1 = _this.eTake = this2;
		} else {
			this1 = _this.eTake;
		}
		this1.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.eTapTake))});
		var _this1 = this.eTap;
		var this3;
		if(_this1.eLost == null) {
			var this4 = new pony_Priority(null,false);
			this4.compare = pony_events__$Event0_Event0_$Impl_$.compare;
			this3 = _this1.eLost = this4;
		} else {
			this3 = _this1.eLost;
		}
		this3.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.eTapLost))});
		this.destroySignals();
	}
	,check: function() {
	}
	,dispatchDown: function(id,x,y,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			var tmp = pony_ui_touch_TouchableBase.touches.h[id].eDown;
			var _this = pony_ui_touch_TouchableBase.touches.h[id];
			_this.x = x;
			_this.y = y;
			pony_events__$Event1_Event1_$Impl_$.dispatch(tmp,_this);
		} else {
			var this1 = pony_ui_touch_TouchableBase.touches;
			var v = pony_ui_touch_TouchableBase.touchPool.list.pop();
			var _this1 = v == null ? new pony_ui_touch_Touch() : v;
			_this1.x = x;
			_this1.y = y;
			var v1 = _this1;
			this1.h[id] = v1;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eDown,pony_ui_touch_TouchableBase.touches.h[id],safe);
	}
	,dispatchUp: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(!pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			return;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eUp,pony_ui_touch_TouchableBase.touches.h[id]);
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eUp,pony_ui_touch_TouchableBase.touches.h[id],safe);
	}
	,dispatchOver: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eOver,pony_ui_touch_TouchableBase.touches.h[id]);
		} else {
			var this1 = pony_ui_touch_TouchableBase.touches;
			var v = pony_ui_touch_TouchableBase.touchPool.list.pop();
			var v1 = v == null ? new pony_ui_touch_Touch() : v;
			this1.h[id] = v1;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eOver,pony_ui_touch_TouchableBase.touches.h[id],safe);
	}
	,dispatchOutDown: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(!pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			return;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eOutDown,pony_ui_touch_TouchableBase.touches.h[id]);
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eOutDown,pony_ui_touch_TouchableBase.touches.h[id],safe);
	}
	,dispatchOverDown: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eOverDown,pony_ui_touch_TouchableBase.touches.h[id]);
		} else {
			var this1 = pony_ui_touch_TouchableBase.touches;
			var v = pony_ui_touch_TouchableBase.touchPool.list.pop();
			var v1 = v == null ? new pony_ui_touch_Touch() : v;
			this1.h[id] = v1;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eOverDown,pony_ui_touch_TouchableBase.touches.h[id],safe);
	}
	,dispatchOut: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(!pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			return;
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eOut,pony_ui_touch_TouchableBase.touches.h[id]);
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eOut,pony_ui_touch_TouchableBase.touches.h[id],safe);
		pony_ui_touch_TouchableBase.removeTouch(id);
	}
	,dispatchOutUp: function(id,safe) {
		if(safe == null) {
			safe = false;
		}
		if(id == null) {
			id = 0;
		}
		if(pony_ui_touch_TouchableBase.touches.h.hasOwnProperty(id)) {
			pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_TouchableBase.touches.h[id].eOutUp,pony_ui_touch_TouchableBase.touches.h[id]);
		}
		pony_events__$Event1_Event1_$Impl_$.dispatch(this.eOutUp,pony_ui_touch_TouchableBase.touches.h[id],safe);
		pony_ui_touch_TouchableBase.removeTouch(id);
	}
	,destroySignals: function() {
		var this1 = this.eOver;
		if(this1 != null) {
			this1.destroy();
		}
		this.eOver = null;
		var this2 = this.eOut;
		if(this2 != null) {
			this2.destroy();
		}
		this.eOut = null;
		var this3 = this.eOutUp;
		if(this3 != null) {
			this3.destroy();
		}
		this.eOutUp = null;
		var this4 = this.eOverDown;
		if(this4 != null) {
			this4.destroy();
		}
		this.eOverDown = null;
		var this5 = this.eOutDown;
		if(this5 != null) {
			this5.destroy();
		}
		this.eOutDown = null;
		var this6 = this.eDown;
		if(this6 != null) {
			this6.destroy();
		}
		this.eDown = null;
		var this7 = this.eUp;
		if(this7 != null) {
			this7.destroy();
		}
		this.eUp = null;
		var this8 = this.eClick;
		if(this8 != null) {
			this8.destroy();
		}
		this.eClick = null;
		var this9 = this.eTap;
		if(this9 != null) {
			this9.destroy();
		}
		this.eTap = null;
		var this10 = this.eWheel;
		if(this10 != null) {
			this10.destroy();
		}
		this.eWheel = null;
		var this11 = this.eSwipe;
		if(this11 != null) {
			this11.destroy();
		}
		this.eSwipe = null;
	}
	,__class__: pony_ui_touch_TouchableBase
};
var pony_ui_touch_pixi_Mouse = function() { };
pony_ui_touch_pixi_Mouse.__name__ = true;
pony_ui_touch_pixi_Mouse.reg = function(obj) {
	if(pony_ui_touch_pixi_Mouse.obj != null) {
		throw new js__$Boot_HaxeError("ready");
	}
	pony_ui_touch_pixi_Mouse.obj = obj;
	if(pony_ui_touch_pixi_Mouse.inited) {
		pony_ui_touch_pixi_Mouse._init();
	}
};
pony_ui_touch_pixi_Mouse.init = function() {
	if(pony_ui_touch_pixi_Mouse.inited) {
		return;
	}
	pony_ui_touch_pixi_Mouse.inited = true;
	if(pony_ui_touch_pixi_Mouse.obj != null) {
		pony_ui_touch_pixi_Mouse._init();
	}
};
pony_ui_touch_pixi_Mouse._init = function() {
	pony_ui_touch_pixi_Mouse.obj.interactive = true;
	pony_ui_touch_pixi_Mouse.obj.on("mousedown",pony_ui_touch_pixi_Mouse.downHandler);
	pony_ui_touch_pixi_Mouse.obj.on("mouseup",pony_ui_touch_pixi_Mouse.upHandler);
	var _this = pony_ui_touch_Mouse.eMove;
	var this1;
	if(_this.eTake == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this1 = _this.eTake = this2;
	} else {
		this1 = _this.eTake;
	}
	this1.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Mouse.obj.on("mousemove",pony_ui_touch_pixi_Mouse.moveHandler);
	})});
	var _this1 = pony_ui_touch_Mouse.eMove;
	var this3;
	if(_this1.eLost == null) {
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this3 = _this1.eLost = this4;
	} else {
		this3 = _this1.eLost;
	}
	this3.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Mouse.obj.removeListener("mousemove",pony_ui_touch_pixi_Mouse.moveHandler);
	})});
	var _this2 = pony_ui_touch_Mouse.eLeave;
	var this5;
	if(_this2.eTake == null) {
		var this6 = new pony_Priority(null,false);
		this6.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this5 = _this2.eTake = this6;
	} else {
		this5 = _this2.eTake;
	}
	this5.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Mouse.obj.on("mouseupoutside",pony_ui_touch_pixi_Mouse.upoutsideHandler);
	})});
	var _this3 = pony_ui_touch_Mouse.eLeave;
	var this7;
	if(_this3.eLost == null) {
		var this8 = new pony_Priority(null,false);
		this8.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this7 = _this3.eLost = this8;
	} else {
		this7 = _this3.eLost;
	}
	this7.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Mouse.obj.removeListener("mouseupoutside",pony_ui_touch_pixi_Mouse.upoutsideHandler);
	})});
	var _this4 = pony_ui_touch_Mouse.eWheel;
	var this9;
	if(_this4.eTake == null) {
		var this10 = new pony_Priority(null,false);
		this10.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this9 = _this4.eTake = this10;
	} else {
		this9 = _this4.eTake;
	}
	var f = ($_=window.document,$bind($_,$_.addEventListener));
	this9.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		f("wheel",pony_ui_touch_pixi_Mouse.wheelHandler,false);
	})});
	var _this5 = pony_ui_touch_Mouse.eWheel;
	var this11;
	if(_this5.eLost == null) {
		var this12 = new pony_Priority(null,false);
		this12.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this11 = _this5.eLost = this12;
	} else {
		this11 = _this5.eLost;
	}
	var f1 = ($_=window.document,$bind($_,$_.removeEventListener));
	this11.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		f1("wheel",pony_ui_touch_pixi_Mouse.wheelHandler,false);
	})});
};
pony_ui_touch_pixi_Mouse.wheelHandler = function(e) {
	if(e.wheelDelta == null) {
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_Mouse.eWheel,e.deltaY > 0 ? -120 : 120);
	} else {
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_Mouse.eWheel,e.wheelDelta);
	}
	e.returnValue = false;
	e.preventDefault();
};
pony_ui_touch_pixi_Mouse.downHandler = function(e) {
	var p = pony_ui_touch_pixi_Mouse.correction(e.data.global.x,e.data.global.y);
	pony_ui_touch_Mouse.downHandler(p.x,p.y,e.data.originalEvent.button);
};
pony_ui_touch_pixi_Mouse.upHandler = function(e) {
	var p = pony_ui_touch_pixi_Mouse.correction(e.data.global.x,e.data.global.y);
	pony_ui_touch_Mouse.upHandler(p.x,p.y,e.data.originalEvent.button);
};
pony_ui_touch_pixi_Mouse.moveHandler = function(e) {
	var p = pony_ui_touch_pixi_Mouse.correction(e.data.global.x,e.data.global.y);
	pony_ui_touch_Mouse.moveHandler(p.x,p.y);
};
pony_ui_touch_pixi_Mouse.upoutsideHandler = function(_) {
	pony_events__$Event0_Event0_$Impl_$.dispatch(pony_ui_touch_Mouse.eLeave);
};
pony_ui_touch_pixi_Mouse.correction = function(x,y) {
	var this1 = { x : x, y : y};
	return this1;
};
var pony_ui_touch_pixi_Touch = function() { };
pony_ui_touch_pixi_Touch.__name__ = true;
pony_ui_touch_pixi_Touch.__interfaces__ = [pony_magic_HasSignal,pony_magic_Declarator];
pony_ui_touch_pixi_Touch.reg = function(obj) {
	if(pony_ui_touch_pixi_Touch.obj != null) {
		throw new js__$Boot_HaxeError("ready");
	}
	pony_ui_touch_pixi_Touch.obj = obj;
	if(pony_ui_touch_pixi_Touch.inited) {
		pony_ui_touch_pixi_Touch._init();
	}
};
pony_ui_touch_pixi_Touch.init = function() {
	if(pony_ui_touch_pixi_Touch.inited) {
		return;
	}
	pony_ui_touch_pixi_Touch.inited = true;
	if(pony_ui_touch_pixi_Touch.obj != null) {
		pony_ui_touch_pixi_Touch._init();
	}
};
pony_ui_touch_pixi_Touch._init = function() {
	pony_ui_touch_pixi_Touch.obj.interactive = true;
	var _this = pony_ui_touch_pixi_Touch.eMove;
	var this1;
	if(_this.eTake == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this1 = _this.eTake = this2;
	} else {
		this1 = _this.eTake;
	}
	this1.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.on("touchstart",pony_ui_touch_pixi_Touch.startHandler);
	})});
	var _this1 = pony_ui_touch_pixi_Touch.eMove;
	var this3;
	if(_this1.eLost == null) {
		var this4 = new pony_Priority(null,false);
		this4.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this3 = _this1.eLost = this4;
	} else {
		this3 = _this1.eLost;
	}
	this3.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.removeListener("touchstart",pony_ui_touch_pixi_Touch.startHandler);
	})});
	var _this2 = pony_ui_touch_pixi_Touch.eEnd;
	var this5;
	if(_this2.eTake == null) {
		var this6 = new pony_Priority(null,false);
		this6.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this5 = _this2.eTake = this6;
	} else {
		this5 = _this2.eTake;
	}
	this5.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.on("touchend",pony_ui_touch_pixi_Touch.endHandler);
	})});
	var _this3 = pony_ui_touch_pixi_Touch.eEnd;
	var this7;
	if(_this3.eLost == null) {
		var this8 = new pony_Priority(null,false);
		this8.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this7 = _this3.eLost = this8;
	} else {
		this7 = _this3.eLost;
	}
	this7.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.removeListener("touchend",pony_ui_touch_pixi_Touch.endHandler);
	})});
	var _this4 = pony_ui_touch_pixi_Touch.eMove;
	var this9;
	if(_this4.eTake == null) {
		var this10 = new pony_Priority(null,false);
		this10.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this9 = _this4.eTake = this10;
	} else {
		this9 = _this4.eTake;
	}
	this9.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.on("touchmove",pony_ui_touch_pixi_Touch.moveHandler);
	})});
	var _this5 = pony_ui_touch_pixi_Touch.eMove;
	var this11;
	if(_this5.eLost == null) {
		var this12 = new pony_Priority(null,false);
		this12.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this11 = _this5.eLost = this12;
	} else {
		this11 = _this5.eLost;
	}
	this11.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.removeListener("touchmove",pony_ui_touch_pixi_Touch.moveHandler);
	})});
	var _this6 = pony_ui_touch_pixi_Touch.eCancle;
	var this13;
	if(_this6.eTake == null) {
		var this14 = new pony_Priority(null,false);
		this14.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this13 = _this6.eTake = this14;
	} else {
		this13 = _this6.eTake;
	}
	this13.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.on("touchendoutside",pony_ui_touch_pixi_Touch.handleTouchEvent);
	})});
	var _this7 = pony_ui_touch_pixi_Touch.eCancle;
	var this15;
	if(_this7.eLost == null) {
		var this16 = new pony_Priority(null,false);
		this16.compare = pony_events__$Event0_Event0_$Impl_$.compare;
		this15 = _this7.eLost = this16;
	} else {
		this15 = _this7.eLost;
	}
	this15.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_Touch.obj.removeListener("touchendoutside",pony_ui_touch_pixi_Touch.handleTouchEvent);
	})});
};
pony_ui_touch_pixi_Touch.handleTouchEvent = function(e) {
	pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_pixi_Touch.eCancle,e.data.identifier);
};
pony_ui_touch_pixi_Touch.moveHandler = function(e) {
	var this1 = pony_ui_touch_pixi_Touch.tMove;
	var k = Std.string(e.data.identifier);
	var p = pony_ui_touch_pixi_Touch.correction(e.data.global.x,e.data.global.y);
	var v = { id : e.data.identifier, x : p.x, y : p.y};
	var _this = this1;
	if(__map_reserved[k] != null) {
		_this.setReserved(k,v);
	} else {
		_this.h[k] = v;
	}
	var this2;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this3 = new pony_Priority(null,false);
		this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this2 = pony_time_DeltaTime.eFixedUpdate = this3;
	} else {
		this2 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e1 = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touch.moveDispatch)};
	e1.once = true;
	this2.add(e1,-8);
};
pony_ui_touch_pixi_Touch.moveDispatch = function() {
	var _this = pony_ui_touch_pixi_Touch.tMove;
	var t = new haxe_ds__$StringMap_StringMapIterator(_this,_this.arrayKeys());
	while(t.hasNext()) {
		var t1 = t.next();
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_pixi_Touch.eMove,t1);
	}
	pony_ui_touch_pixi_Touch.tMove = new haxe_ds_StringMap();
};
pony_ui_touch_pixi_Touch.startHandler = function(e) {
	var tmp = pony_ui_touch_pixi_Touch.startStack;
	var p = pony_ui_touch_pixi_Touch.correction(e.data.global.x,e.data.global.y);
	tmp.push({ id : e.data.identifier, x : p.x, y : p.y});
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e1 = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touch.startDispatch)};
	e1.once = true;
	this1.add(e1,-9);
};
pony_ui_touch_pixi_Touch.startDispatch = function() {
	var _g = 0;
	var _g1 = pony_ui_touch_pixi_Touch.startStack;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_pixi_Touch.eStart,t);
	}
	pony_ui_touch_pixi_Touch.startStack = [];
};
pony_ui_touch_pixi_Touch.endHandler = function(e) {
	var tmp = pony_ui_touch_pixi_Touch.endStack;
	var p = pony_ui_touch_pixi_Touch.correction(e.data.global.x,e.data.global.y);
	tmp.push({ id : e.data.identifier, x : p.x, y : p.y});
	var this1;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		this1 = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		this1 = pony_time_DeltaTime.eFixedUpdate;
	}
	var e1 = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touch.endDispatch)};
	e1.once = true;
	this1.add(e1,-7);
};
pony_ui_touch_pixi_Touch.endDispatch = function() {
	var _g = 0;
	var _g1 = pony_ui_touch_pixi_Touch.endStack;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		pony_events__$Event1_Event1_$Impl_$.dispatch(pony_ui_touch_pixi_Touch.eEnd,t);
	}
	pony_ui_touch_pixi_Touch.endStack = [];
};
pony_ui_touch_pixi_Touch.correction = function(x,y) {
	var this1 = { x : x, y : y};
	return this1;
};
var pony_ui_touch_pixi_Touchable = function(obj) {
	if(!pony_ui_touch_pixi_Touchable.inited) {
		pony_ui_touch_pixi_Touchable.inited = true;
		pony_ui_touch_pixi_Mouse.init();
		pony_ui_touch_pixi_Touch.init();
		var this1 = pony_ui_touch_pixi_Touch.eEnd;
		var s = pony_ui_touch_pixi_Touch.eStart;
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		var ns = this2;
		this1.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns)});
		s.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns)});
		var s1 = pony_ui_touch_pixi_Touch.eMove;
		var this3 = new pony_Priority(null,false);
		this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		var ns1 = this3;
		ns.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns1)});
		s1.add({ once : false, listener : pony_events_Listener1Type.LEvent1(ns1)});
		pony_ui_touch_pixi_Touchable.onAnyTouch = ns1;
		pony_ui_touch_pixi_Touchable.firstSwitchToTouch();
	}
	pony_ui_touch_TouchableBase.call(this);
	this.obj = obj;
	obj.interactive = true;
	if(pony_ui_touch_pixi_Touchable.touchMode) {
		this.touch = new pony_ui_touch_pixi_TouchableTouch(obj,this);
	} else {
		this.mouse = new pony_ui_touch_pixi_TouchableMouse(obj,this);
	}
	var this4;
	if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null) {
		var this5 = new pony_Priority(null,false);
		this5.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this4 = pony_ui_touch_pixi_Touchable.eChangeTouchMode = this5;
	} else {
		this4 = pony_ui_touch_pixi_Touchable.eChangeTouchMode;
	}
	pony_events__$Signal2_Signal2_$Impl_$.sub1(this4,true).add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.toTouch))});
	var this6;
	if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null) {
		var this7 = new pony_Priority(null,false);
		this7.compare = pony_events__$Event2_Event2_$Impl_$.compare;
		this6 = pony_ui_touch_pixi_Touchable.eChangeTouchMode = this7;
	} else {
		this6 = pony_ui_touch_pixi_Touchable.eChangeTouchMode;
	}
	pony_events__$Signal2_Signal2_$Impl_$.sub1(this6,false).add({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.toMouse))});
};
pony_ui_touch_pixi_Touchable.__name__ = true;
pony_ui_touch_pixi_Touchable.switchToMouse = function() {
	pony_ui_touch_pixi_Touchable.needSw = false;
	pony_ui_touch_pixi_Touchable.onAnyTouch.remove({ once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touchable.touchHandler)});
	pony_ui_touch_Mouse.eMove.remove({ once : false, listener : pony_events_Listener2Type.LFunction0(pony_ui_touch_pixi_Touchable.mouseHandler)});
	pony_ui_touch_pixi_Touchable.onAnyTouch.add({ once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touchable.switchToTouch)});
	if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null || false != pony_ui_touch_pixi_Touchable.touchMode) {
		var prev = pony_ui_touch_pixi_Touchable.touchMode;
		pony_ui_touch_pixi_Touchable.touchMode = false;
		pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_pixi_Touchable.eChangeTouchMode,false,prev,true);
	}
};
pony_ui_touch_pixi_Touchable.switchToTouch = function() {
	pony_ui_touch_pixi_Touchable.needSw = false;
	pony_ui_touch_pixi_Touchable.firstSwitchToTouch();
	pony_ui_touch_pixi_Touchable.onAnyTouch.remove({ once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touchable.switchToTouch)});
};
pony_ui_touch_pixi_Touchable.firstSwitchToTouch = function() {
	if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null || true != pony_ui_touch_pixi_Touchable.touchMode) {
		var prev = pony_ui_touch_pixi_Touchable.touchMode;
		pony_ui_touch_pixi_Touchable.touchMode = true;
		pony_events__$Event2_Event2_$Impl_$.dispatch(pony_ui_touch_pixi_Touchable.eChangeTouchMode,true,prev,true);
	}
	pony_ui_touch_pixi_Touchable.onAnyTouch.add({ once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touchable.touchHandler)});
	pony_ui_touch_Mouse.eMove.add({ once : false, listener : pony_events_Listener2Type.LFunction0(pony_ui_touch_pixi_Touchable.mouseHandler)});
};
pony_ui_touch_pixi_Touchable.mouseHandler = function() {
	if(pony_ui_touch_pixi_Touchable.wait) {
		return;
	}
	pony_ui_touch_pixi_Touchable.wait = true;
	pony_ui_touch_pixi_Touchable.needSw = true;
	var f = { once : false, listener : pony_events_Listener1Type.LFunction0(pony_ui_touch_pixi_Touchable.needSwToMouse)};
	var this1 = { min : 0, max : 500};
	var t;
	if(pony_time_DeltaTime.eFixedUpdate == null) {
		var this2 = new pony_Priority(null,false);
		this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
		t = pony_time_DeltaTime.eFixedUpdate = this2;
	} else {
		t = pony_time_DeltaTime.eFixedUpdate;
	}
	var t1 = new pony_time_DTimer(t,this1,0);
	f.once = true;
	t1.eComplete.add(f,0);
	var e = { once : false, listener : pony_events_Listener1Type.LFunction0($bind(t1,t1.destroy))};
	e.once = true;
	t1.eComplete.add(e,0);
	t1.updateSignal.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(t1,t1._update))});
	if(null != null) {
		t1._update(null);
	}
};
pony_ui_touch_pixi_Touchable.needSwToMouse = function() {
	pony_ui_touch_pixi_Touchable.wait = false;
	if(pony_ui_touch_pixi_Touchable.needSw) {
		pony_ui_touch_pixi_Touchable.switchToMouse();
	}
	pony_ui_touch_pixi_Touchable.needSw = false;
};
pony_ui_touch_pixi_Touchable.touchHandler = function() {
	pony_ui_touch_pixi_Touchable.needSw = false;
};
pony_ui_touch_pixi_Touchable.__super__ = pony_ui_touch_TouchableBase;
pony_ui_touch_pixi_Touchable.prototype = $extend(pony_ui_touch_TouchableBase.prototype,{
	destroy: function() {
		var this1;
		if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null) {
			var this2 = new pony_Priority(null,false);
			this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this1 = pony_ui_touch_pixi_Touchable.eChangeTouchMode = this2;
		} else {
			this1 = pony_ui_touch_pixi_Touchable.eChangeTouchMode;
		}
		pony_events__$Signal2_Signal2_$Impl_$.sub1(this1,true).remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.toTouch))});
		var this3;
		if(pony_ui_touch_pixi_Touchable.eChangeTouchMode == null) {
			var this4 = new pony_Priority(null,false);
			this4.compare = pony_events__$Event2_Event2_$Impl_$.compare;
			this3 = pony_ui_touch_pixi_Touchable.eChangeTouchMode = this4;
		} else {
			this3 = pony_ui_touch_pixi_Touchable.eChangeTouchMode;
		}
		pony_events__$Signal2_Signal2_$Impl_$.sub1(this3,false).remove({ once : false, listener : pony_events_Listener1Type.LFunction0($bind(this,this.toMouse))});
		this.obj = null;
		if(pony_ui_touch_pixi_Touchable.touchMode) {
			this.touch.destroy();
			this.touch = null;
		} else {
			this.mouse.destroy();
			this.mouse = null;
		}
		pony_ui_touch_TouchableBase.prototype.destroy.call(this);
	}
	,toTouch: function() {
		this.mouse.destroy();
		this.mouse = null;
		this.touch = new pony_ui_touch_pixi_TouchableTouch(this.obj,this);
	}
	,toMouse: function() {
		this.touch.destroy();
		this.touch = null;
		this.mouse = new pony_ui_touch_pixi_TouchableMouse(this.obj,this);
	}
	,__class__: pony_ui_touch_pixi_Touchable
});
var pony_ui_touch_pixi_TouchableMouse = function(obj,base) {
	this._down = false;
	this.over = false;
	pony_ui_touch_pixi_TouchableMouse.init();
	this.obj = obj;
	this.base = base;
	obj.on("mouseover",$bind(this,this.overHandler));
	obj.on("mouseout",$bind(this,this.outHandler));
	obj.on("mousedown",$bind(this,this.downHandler));
	obj.on("mouseup",$bind(this,this.upHandler));
	pony_ui_touch_Mouse.eLeftUp.add({ once : false, listener : pony_events_Listener2Type.LFunction0($bind(this,this.globUpHandler))});
	pony_ui_touch_Mouse.eLeave.add({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.leaveHandler))});
};
pony_ui_touch_pixi_TouchableMouse.__name__ = true;
pony_ui_touch_pixi_TouchableMouse.init = function() {
	if(pony_ui_touch_pixi_TouchableMouse.inited) {
		return;
	}
	pony_ui_touch_pixi_TouchableMouse.inited = true;
	pony_ui_touch_pixi_Mouse.init();
	var listener = { once : false, listener : pony_events_Listener2Type.LFunction2(function(x,y) {
		pony_ui_touch_TouchableBase.dispatchMove(0,x,y);
	})};
	pony_ui_touch_Mouse.eMove.add(listener);
	pony_ui_touch_Mouse.eLeftDown.add({ once : false, listener : pony_events_Listener2Type.LFunction0(function() {
		pony_ui_touch_pixi_TouchableMouse.down = true;
	})});
	pony_ui_touch_Mouse.eLeftUp.add({ once : false, listener : pony_events_Listener2Type.LFunction0(function() {
		pony_ui_touch_pixi_TouchableMouse.down = false;
	})});
	pony_ui_touch_Mouse.eLeave.add({ once : false, listener : pony_events_Listener0Type.LFunction0(function() {
		pony_ui_touch_pixi_TouchableMouse.down = false;
	})});
};
pony_ui_touch_pixi_TouchableMouse.prototype = {
	destroy: function() {
		this.leaveHandler();
		this.obj.removeListener("mouseover",$bind(this,this.overHandler));
		this.obj.removeListener("mouseout",$bind(this,this.outHandler));
		this.obj.removeListener("mousedown",$bind(this,this.downHandler));
		this.obj.removeListener("mouseup",$bind(this,this.upHandler));
		pony_ui_touch_Mouse.eLeftUp.remove({ once : false, listener : pony_events_Listener2Type.LFunction0($bind(this,this.globUpHandler))});
		var this1 = pony_ui_touch_Mouse.eLeave;
		this1.remove({ once : false, listener : pony_events_Listener0Type.LFunction0($bind(this,this.leaveHandler))});
		this.obj = null;
		this.base = null;
	}
	,overHandler: function(_) {
		this.over = true;
		if(pony_ui_touch_pixi_TouchableMouse.down) {
			this.base.dispatchOverDown();
		} else {
			this.base.dispatchOver();
		}
	}
	,outHandler: function(_) {
		this.over = false;
		if(pony_ui_touch_pixi_TouchableMouse.down) {
			this.base.dispatchOutDown();
		} else {
			this.base.dispatchOut();
		}
	}
	,downHandler: function(e) {
		if(e.data.originalEvent.button != 0) {
			return;
		}
		if(!this.over) {
			this.over = true;
			this.base.dispatchOver();
		}
		this._down = true;
		var p = pony_ui_touch_pixi_Mouse.correction(e.data.global.x,e.data.global.y);
		this.base.dispatchDown(0,p.x,p.y);
	}
	,upHandler: function(e) {
		if(e.data.originalEvent.button != 0) {
			return;
		}
		this._down = false;
		if(!this.over) {
			return;
		}
		this.base.dispatchUp();
	}
	,globUpHandler: function() {
		this._down = false;
		if(!this.over) {
			this.base.dispatchOutUp();
		} else {
			this.base.dispatchUp();
		}
	}
	,leaveHandler: function() {
		if(this.over) {
			this.over = false;
			if(this._down) {
				this.base.dispatchOutDown();
			} else {
				this.base.dispatchOut();
			}
		}
		if(this._down) {
			this._down = false;
			this.base.dispatchOutUp();
		}
	}
	,__class__: pony_ui_touch_pixi_TouchableMouse
};
var pony_ui_touch_pixi_TouchableTouch = function(obj,base) {
	this.needCancle = false;
	this.down = false;
	this.over = false;
	this.touchId = null;
	pony_ui_touch_pixi_TouchableTouch.init();
	this.obj = obj;
	this.base = base;
	obj.on("touchstart",$bind(this,this.touchBeginHandler));
	obj.on("touchmove",$bind(this,this.touchMoveHandler));
	obj.on("touchendoutside",$bind(this,this.outsideHandler));
	pony_ui_touch_pixi_Touch.eEnd.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.touchEndHandler))});
	pony_ui_touch_pixi_Touch.eCancle.add({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.cancleTouchHandler))});
	window.addEventListener("orientationchange",$bind(this,this.orientationchangeHandler),true);
};
pony_ui_touch_pixi_TouchableTouch.__name__ = true;
pony_ui_touch_pixi_TouchableTouch.init = function() {
	if(pony_ui_touch_pixi_TouchableTouch.inited) {
		return;
	}
	pony_ui_touch_pixi_TouchableTouch.inited = true;
	pony_ui_touch_pixi_Touch.init();
	pony_ui_touch_pixi_Touch.eMove.add({ once : false, listener : pony_events_Listener1Type.LFunction1(pony_ui_touch_pixi_TouchableTouch.globalTouchMoveHandler)});
};
pony_ui_touch_pixi_TouchableTouch.globalTouchMoveHandler = function(e) {
	pony_ui_touch_TouchableBase.dispatchMove(e.id,e.x,e.y);
};
pony_ui_touch_pixi_TouchableTouch.prototype = {
	orientationchangeHandler: function() {
		this.lost(this.touchId);
	}
	,destroy: function() {
		if(this.touchId != null) {
			this.lost(this.touchId);
		}
		this.obj.removeListener("touchstart",$bind(this,this.touchBeginHandler));
		this.obj.removeListener("touchmove",$bind(this,this.touchMoveHandler));
		this.obj.removeListener("touchendoutside",$bind(this,this.outsideHandler));
		window.removeEventListener("orientationchange",$bind(this,this.orientationchangeHandler),true);
		pony_ui_touch_pixi_Touch.eEnd.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.touchEndHandler))});
		pony_ui_touch_pixi_Touch.eCancle.remove({ once : false, listener : pony_events_Listener1Type.LFunction1($bind(this,this.cancleTouchHandler))});
		this.obj = null;
		this.base = null;
	}
	,outsideHandler: function(e) {
		if(this.isLock(e.data.identifier)) {
			return;
		}
		this.lost(e.data.identifier);
	}
	,isLock: function(t) {
		if(this.touchId == null || this.touchId == t) {
			this.touchId = t;
			return false;
		} else {
			return true;
		}
	}
	,touchBeginHandler: function(e) {
		if(this.isLock(e.data.identifier)) {
			return;
		}
		this.over = true;
		this.down = true;
		this.base.dispatchOver(e.data.identifier);
		var p = pony_ui_touch_pixi_Touch.correction(e.data.global.x,e.data.global.y);
		this.base.dispatchDown(e.data.identifier,p.x,p.y);
	}
	,touchEndHandler: function(t) {
		if(!this.down) {
			return;
		}
		if(!(this.touchId == null || this.touchId == t.id)) {
			if(this.down && !this.over) {
				this.lost(t.id);
			}
			return;
		}
		if(this.over) {
			this.base.dispatchUp(t.id);
			this.base.dispatchOut(t.id);
		} else {
			this.base.dispatchOutUp(t.id);
		}
		this.over = false;
		this.down = false;
		this.touchId = null;
	}
	,touchMoveHandler: function(e) {
		if(!this.down) {
			return;
		}
		var id = e.data.identifier;
		if(this.isLock(id)) {
			return;
		}
		var p = e.data.global;
		var c = this.obj.getBounds().contains(p.x,p.y);
		if(this.over) {
			if(!c) {
				this.over = false;
				this.base.dispatchOutDown(id);
				if(this.needCancle) {
					this.lost(id);
				}
			}
		} else if(c) {
			this.over = true;
			this.base.dispatchOverDown(id);
		}
	}
	,cancleTouchHandler: function(id) {
		if(this.touchId == id) {
			this.lost(id);
		} else if(!(this.touchId == null || this.touchId == id) && this.down) {
			if(!this.over) {
				this.lost(id);
			} else {
				this.needCancle = true;
			}
		}
	}
	,lost: function(id) {
		this.needCancle = false;
		this.down = false;
		this.over = false;
		this.base.dispatchOutDown(id);
		this.base.dispatchOutUp(id);
		this.touchId = null;
	}
	,__class__: pony_ui_touch_pixi_TouchableTouch
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {};
var _this;
if(pony_JsTools.eDocReady == null) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	_this = pony_JsTools.eDocReady = this1;
} else {
	_this = pony_JsTools.eDocReady;
}
var _this1 = _this;
var needOnLost = _this1.data.length != 0;
_this1.hash = new haxe_ds_IntMap();
_this1.data = [];
_this1.counters = [0];
_this1.addStack = [];
if(needOnLost) {
	pony_events__$Event0_Event0_$Impl_$.dispatch(_this1.eLost);
}
var _this2 = pony_JsTools.eDocReady;
var this2;
if(_this2.eTake == null) {
	var this3 = new pony_Priority(null,false);
	this3.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	this2 = _this2.eTake = this3;
} else {
	this2 = _this2.eTake;
}
var e = { once : false, listener : pony_events_Listener0Type.LFunction0(pony_JsTools.regDocReady)};
e.once = true;
this2.add(e,0);
var f = new PIXI.filters.ColorMatrixFilter();
f.kodachrome(true);
pony_pixi_ui_AutoButton.LIGHT_FILTER = [f];
var f1 = new PIXI.filters.ColorMatrixFilter();
f1.desaturate(true);
pony_pixi_ui_AutoButton.GRAY_FILTER = [f1];
var f2 = new PIXI.filters.ColorMatrixFilter();
f2.vintage(true);
pony_pixi_ui_AutoButton.DARK_FILTER = [f2];
pony_pixi_ui_BText.blurFilter = new PIXI.filters.BlurFilter();
pony_pixi_ui_BText.blurFilter.blur = 2;
if(pony_time_DeltaTime.eUpdate == null) {
	var this1 = new pony_Priority(null,false);
	this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	pony_time_DeltaTime.eUpdate = this1;
}
if(pony_time_DeltaTime.eFixedUpdate == null) {
	var this2 = new pony_Priority(null,false);
	this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
	pony_time_DeltaTime.eFixedUpdate = this2;
}
var _this = pony_time_DeltaTime.eUpdate;
var tmp;
if(_this.eTake == null) {
	var this3 = new pony_Priority(null,false);
	this3.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	tmp = _this.eTake = this3;
} else {
	tmp = _this.eTake;
}
tmp.add({ once : false, listener : pony_events_Listener0Type.LFunction0(pony_time_DeltaTime._takeListeners)});
var _this1 = pony_time_DeltaTime.eUpdate;
var tmp1;
if(_this1.eLost == null) {
	var this4 = new pony_Priority(null,false);
	this4.compare = pony_events__$Event0_Event0_$Impl_$.compare;
	tmp1 = _this1.eLost = this4;
} else {
	tmp1 = _this1.eLost;
}
tmp1.add({ once : false, listener : pony_events_Listener0Type.LFunction0(pony_time_DeltaTime._lostListeners)});
pony_ui_touch_Mouse.downStack = [];
pony_ui_touch_Mouse.upStack = [];
var this1 = new pony_Priority(null,false);
this1.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eMove = this1;
var this2 = new pony_Priority(null,false);
this2.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eLeftDown = this2;
var this3 = new pony_Priority(null,false);
this3.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eLeftUp = this3;
var this4 = new pony_Priority(null,false);
this4.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eRightDown = this4;
var this5 = new pony_Priority(null,false);
this5.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eRightUp = this5;
var this6 = new pony_Priority(null,false);
this6.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eMiddleDown = this6;
var this7 = new pony_Priority(null,false);
this7.compare = pony_events__$Event2_Event2_$Impl_$.compare;
pony_ui_touch_Mouse.eMiddleUp = this7;
var this8 = new pony_Priority(null,false);
this8.compare = pony_events__$Event0_Event0_$Impl_$.compare;
pony_ui_touch_Mouse.eLeave = this8;
var this9 = new pony_Priority(null,false);
this9.compare = pony_events__$Event1_Event1_$Impl_$.compare;
pony_ui_touch_Mouse.eWheel = this9;
pony_ui_touch_pixi_Touch.tMove = new haxe_ds_StringMap();
pony_ui_touch_pixi_Touch.startStack = [];
pony_ui_touch_pixi_Touch.endStack = [];
pony_ui_touch_pixi_Touch.inited = false;
var this1 = new pony_Priority(null,false);
this1.compare = pony_events__$Event1_Event1_$Impl_$.compare;
pony_ui_touch_pixi_Touch.eMove = this1;
var this2 = new pony_Priority(null,false);
this2.compare = pony_events__$Event1_Event1_$Impl_$.compare;
pony_ui_touch_pixi_Touch.eStart = this2;
var this3 = new pony_Priority(null,false);
this3.compare = pony_events__$Event1_Event1_$Impl_$.compare;
pony_ui_touch_pixi_Touch.eEnd = this3;
var this4 = new pony_Priority(null,false);
this4.compare = pony_events__$Event1_Event1_$Impl_$.compare;
pony_ui_touch_pixi_Touch.eCancle = this4;
js_Boot.__toStr = ({ }).toString;
pony_pixi_FastMovieClip.storage = new haxe_ds_StringMap();
pony_pixi_PixiAssets.texts = new haxe_ds_StringMap();
pony_pixi_TextureCut.list = [];
pony_text_TextTools.letters = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved["ru"] != null) {
		_g.setReserved("ru","АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ");
	} else {
		_g.h["ru"] = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
	}
	$r = _g;
	return $r;
}(this));
pony_time_DeltaTime.speed = 1;
pony_time_DeltaTime.value = 0;
pony_time_DeltaTime.fixedValue = 0;
pony_time_JsDT.inited = false;
pony_time_JsDT.afid = -1;
pony_time_JsDT.ms = 0;
pony_time_JsDT.allowFastTickAbort = false;
pony_time_JsDT.allowHalfTick = false;
pony_ui_AssetManager.baseUrl = "";
pony_ui_AssetManager.local = "";
pony_ui_touch_TouchableBase.touches = new haxe_ds_IntMap();
pony_ui_touch_TouchableBase.touchPool = new pony_TypedPool_$pony_$ui_$touch_$Touch();
pony_ui_touch_pixi_Mouse.inited = false;
pony_ui_touch_pixi_Touchable.touchMode = false;
pony_ui_touch_pixi_Touchable.inited = false;
pony_ui_touch_pixi_Touchable.needSw = false;
pony_ui_touch_pixi_Touchable.wait = false;
pony_ui_touch_pixi_TouchableMouse.inited = false;
pony_ui_touch_pixi_TouchableMouse.down = false;
pony_ui_touch_pixi_TouchableTouch.inited = false;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=app.js.map