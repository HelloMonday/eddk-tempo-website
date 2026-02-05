import{L as Ce,F as ve,b as xt,V as Y,c as K,B as Ae,d as Me,e as Se,f as Yt,h as Bt,i as _t,j as Pe,k as bt,a as wt,I as Le,D as Te,R as ke,H as De,l as se,m as ne,n as Dt,o as Oe,C as Ie,p as vt,q as Ct,Q as oe,r as re,s as $e,t as Re,u as He,S as Ne,P as Fe,W as je,M as ae,v as Ve,w as ze,g as St,x as Ye,G as le,E as Ue}from"./three.module.Br6NOA5I.js";const Xe=Pe;class $t extends Ce{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,n,o,p){const b=this,E=new ve(b.manager);E.setPath(b.path),E.setRequestHeader(b.requestHeader),E.setWithCredentials(b.withCredentials),E.load(t,function(k){try{n(b.parse(k))}catch(H){p?p(H):console.error(H),b.manager.itemError(t)}},o,p)}parse(t){const n=this;function o(c,r){if(c.nodeType!==1)return;const i=D(c);let e=!1,h=null;switch(c.nodeName){case"svg":r=X(c,r);break;case"style":b(c);break;case"g":r=X(c,r);break;case"path":r=X(c,r),c.hasAttribute("d")&&(h=p(c));break;case"rect":r=X(c,r),h=H(c);break;case"polygon":r=X(c,r),h=I(c);break;case"polyline":r=X(c,r),h=W(c);break;case"circle":r=X(c,r),h=$(c);break;case"ellipse":r=X(c,r),h=N(c);break;case"line":r=X(c,r),h=rt(c);break;case"defs":e=!0;break;case"use":r=X(c,r);const _=(c.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),g=c.viewportElement.getElementById(_);g?o(g,r):console.warn("SVGLoader: 'use node' references non-existent node id: "+_);break}h&&(r.fill!==void 0&&r.fill!=="none"&&h.color.setStyle(r.fill,Xe),O(h,et),T.push(h),h.userData={node:c,style:r});const m=c.childNodes;for(let l=0;l<m.length;l++){const _=m[l];e&&_.nodeName!=="style"&&_.nodeName!=="defs"||o(_,r)}i&&(B.pop(),B.length>0?et.copy(B[B.length-1]):et.identity())}function p(c){const r=new bt,i=new Y,e=new Y,h=new Y;let m=!0,l=!1;const _=c.getAttribute("d");if(_===""||_==="none")return null;const g=_.match(/[a-df-z][^a-df-z]*/ig);for(let y=0,d=g.length;y<d;y++){const x=g[y],v=x.charAt(0),M=x.slice(1).trim();m===!0&&(l=!0,m=!1);let a;switch(v){case"M":a=P(M);for(let s=0,A=a.length;s<A;s+=2)i.x=a[s+0],i.y=a[s+1],e.x=i.x,e.y=i.y,s===0?r.moveTo(i.x,i.y):r.lineTo(i.x,i.y),s===0&&h.copy(i);break;case"H":a=P(M);for(let s=0,A=a.length;s<A;s++)i.x=a[s],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"V":a=P(M);for(let s=0,A=a.length;s<A;s++)i.y=a[s],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"L":a=P(M);for(let s=0,A=a.length;s<A;s+=2)i.x=a[s+0],i.y=a[s+1],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"C":a=P(M);for(let s=0,A=a.length;s<A;s+=6)r.bezierCurveTo(a[s+0],a[s+1],a[s+2],a[s+3],a[s+4],a[s+5]),e.x=a[s+2],e.y=a[s+3],i.x=a[s+4],i.y=a[s+5],s===0&&l===!0&&h.copy(i);break;case"S":a=P(M);for(let s=0,A=a.length;s<A;s+=4)r.bezierCurveTo(L(i.x,e.x),L(i.y,e.y),a[s+0],a[s+1],a[s+2],a[s+3]),e.x=a[s+0],e.y=a[s+1],i.x=a[s+2],i.y=a[s+3],s===0&&l===!0&&h.copy(i);break;case"Q":a=P(M);for(let s=0,A=a.length;s<A;s+=4)r.quadraticCurveTo(a[s+0],a[s+1],a[s+2],a[s+3]),e.x=a[s+0],e.y=a[s+1],i.x=a[s+2],i.y=a[s+3],s===0&&l===!0&&h.copy(i);break;case"T":a=P(M);for(let s=0,A=a.length;s<A;s+=2){const V=L(i.x,e.x),nt=L(i.y,e.y);r.quadraticCurveTo(V,nt,a[s+0],a[s+1]),e.x=V,e.y=nt,i.x=a[s+0],i.y=a[s+1],s===0&&l===!0&&h.copy(i)}break;case"A":a=P(M,[3,4],7);for(let s=0,A=a.length;s<A;s+=7){if(a[s+5]==i.x&&a[s+6]==i.y)continue;const V=i.clone();i.x=a[s+5],i.y=a[s+6],e.x=i.x,e.y=i.y,E(r,a[s],a[s+1],a[s+2],a[s+3],a[s+4],V,i),s===0&&l===!0&&h.copy(i)}break;case"m":a=P(M);for(let s=0,A=a.length;s<A;s+=2)i.x+=a[s+0],i.y+=a[s+1],e.x=i.x,e.y=i.y,s===0?r.moveTo(i.x,i.y):r.lineTo(i.x,i.y),s===0&&h.copy(i);break;case"h":a=P(M);for(let s=0,A=a.length;s<A;s++)i.x+=a[s],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"v":a=P(M);for(let s=0,A=a.length;s<A;s++)i.y+=a[s],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"l":a=P(M);for(let s=0,A=a.length;s<A;s+=2)i.x+=a[s+0],i.y+=a[s+1],e.x=i.x,e.y=i.y,r.lineTo(i.x,i.y),s===0&&l===!0&&h.copy(i);break;case"c":a=P(M);for(let s=0,A=a.length;s<A;s+=6)r.bezierCurveTo(i.x+a[s+0],i.y+a[s+1],i.x+a[s+2],i.y+a[s+3],i.x+a[s+4],i.y+a[s+5]),e.x=i.x+a[s+2],e.y=i.y+a[s+3],i.x+=a[s+4],i.y+=a[s+5],s===0&&l===!0&&h.copy(i);break;case"s":a=P(M);for(let s=0,A=a.length;s<A;s+=4)r.bezierCurveTo(L(i.x,e.x),L(i.y,e.y),i.x+a[s+0],i.y+a[s+1],i.x+a[s+2],i.y+a[s+3]),e.x=i.x+a[s+0],e.y=i.y+a[s+1],i.x+=a[s+2],i.y+=a[s+3],s===0&&l===!0&&h.copy(i);break;case"q":a=P(M);for(let s=0,A=a.length;s<A;s+=4)r.quadraticCurveTo(i.x+a[s+0],i.y+a[s+1],i.x+a[s+2],i.y+a[s+3]),e.x=i.x+a[s+0],e.y=i.y+a[s+1],i.x+=a[s+2],i.y+=a[s+3],s===0&&l===!0&&h.copy(i);break;case"t":a=P(M);for(let s=0,A=a.length;s<A;s+=2){const V=L(i.x,e.x),nt=L(i.y,e.y);r.quadraticCurveTo(V,nt,i.x+a[s+0],i.y+a[s+1]),e.x=V,e.y=nt,i.x=i.x+a[s+0],i.y=i.y+a[s+1],s===0&&l===!0&&h.copy(i)}break;case"a":a=P(M,[3,4],7);for(let s=0,A=a.length;s<A;s+=7){if(a[s+5]==0&&a[s+6]==0)continue;const V=i.clone();i.x+=a[s+5],i.y+=a[s+6],e.x=i.x,e.y=i.y,E(r,a[s],a[s+1],a[s+2],a[s+3],a[s+4],V,i),s===0&&l===!0&&h.copy(i)}break;case"Z":case"z":r.currentPath.autoClose=!0,r.currentPath.curves.length>0&&(i.copy(h),r.currentPath.currentPoint.copy(i),m=!0);break;default:console.warn(x)}l=!1}return r}function b(c){if(!(!c.sheet||!c.sheet.cssRules||!c.sheet.cssRules.length))for(let r=0;r<c.sheet.cssRules.length;r++){const i=c.sheet.cssRules[r];if(i.type!==1)continue;const e=i.selectorText.split(/,/gm).filter(Boolean).map(h=>h.trim());for(let h=0;h<e.length;h++){const m=Object.fromEntries(Object.entries(i.style).filter(([,l])=>l!==""));Z[e[h]]=Object.assign(Z[e[h]]||{},m)}}}function E(c,r,i,e,h,m,l,_){if(r==0||i==0){c.lineTo(_.x,_.y);return}e=e*Math.PI/180,r=Math.abs(r),i=Math.abs(i);const g=(l.x-_.x)/2,y=(l.y-_.y)/2,d=Math.cos(e)*g+Math.sin(e)*y,x=-Math.sin(e)*g+Math.cos(e)*y;let v=r*r,M=i*i;const a=d*d,s=x*x,A=a/v+s/M;if(A>1){const kt=Math.sqrt(A);r=kt*r,i=kt*i,v=r*r,M=i*i}const V=v*s+M*a,nt=(v*M-V)/V;let lt=Math.sqrt(Math.max(0,nt));h===m&&(lt=-lt);const it=lt*r*x/i,gt=-lt*i*d/r,Lt=Math.cos(e)*it-Math.sin(e)*gt+(l.x+_.x)/2,te=Math.sin(e)*it+Math.cos(e)*gt+(l.y+_.y)/2,Tt=k(1,0,(d-it)/r,(x-gt)/i),zt=k((d-it)/r,(x-gt)/i,(-d-it)/r,(-x-gt)/i)%(Math.PI*2);c.currentPath.absellipse(Lt,te,r,i,Tt,Tt+zt,m===0,e)}function k(c,r,i,e){const h=c*i+r*e,m=Math.sqrt(c*c+r*r)*Math.sqrt(i*i+e*e);let l=Math.acos(Math.max(-1,Math.min(1,h/m)));return c*e-r*i<0&&(l=-l),l}function H(c){const r=w(c.getAttribute("x")||0),i=w(c.getAttribute("y")||0),e=w(c.getAttribute("rx")||c.getAttribute("ry")||0),h=w(c.getAttribute("ry")||c.getAttribute("rx")||0),m=w(c.getAttribute("width")),l=w(c.getAttribute("height")),_=1-.551915024494,g=new bt;return g.moveTo(r+e,i),g.lineTo(r+m-e,i),(e!==0||h!==0)&&g.bezierCurveTo(r+m-e*_,i,r+m,i+h*_,r+m,i+h),g.lineTo(r+m,i+l-h),(e!==0||h!==0)&&g.bezierCurveTo(r+m,i+l-h*_,r+m-e*_,i+l,r+m-e,i+l),g.lineTo(r+e,i+l),(e!==0||h!==0)&&g.bezierCurveTo(r+e*_,i+l,r,i+l-h*_,r,i+l-h),g.lineTo(r,i+h),(e!==0||h!==0)&&g.bezierCurveTo(r,i+h*_,r+e*_,i,r+e,i),g}function I(c){function r(m,l,_){const g=w(l),y=w(_);h===0?e.moveTo(g,y):e.lineTo(g,y),h++}const i=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,e=new bt;let h=0;return c.getAttribute("points").replace(i,r),e.currentPath.autoClose=!0,e}function W(c){function r(m,l,_){const g=w(l),y=w(_);h===0?e.moveTo(g,y):e.lineTo(g,y),h++}const i=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,e=new bt;let h=0;return c.getAttribute("points").replace(i,r),e.currentPath.autoClose=!1,e}function $(c){const r=w(c.getAttribute("cx")||0),i=w(c.getAttribute("cy")||0),e=w(c.getAttribute("r")||0),h=new Yt;h.absarc(r,i,e,0,Math.PI*2);const m=new bt;return m.subPaths.push(h),m}function N(c){const r=w(c.getAttribute("cx")||0),i=w(c.getAttribute("cy")||0),e=w(c.getAttribute("rx")||0),h=w(c.getAttribute("ry")||0),m=new Yt;m.absellipse(r,i,e,h,0,Math.PI*2);const l=new bt;return l.subPaths.push(m),l}function rt(c){const r=w(c.getAttribute("x1")||0),i=w(c.getAttribute("y1")||0),e=w(c.getAttribute("x2")||0),h=w(c.getAttribute("y2")||0),m=new bt;return m.moveTo(r,i),m.lineTo(e,h),m.currentPath.autoClose=!1,m}function X(c,r){r=Object.assign({},r);let i={};if(c.hasAttribute("class")){const l=c.getAttribute("class").split(/\s/).filter(Boolean).map(_=>_.trim());for(let _=0;_<l.length;_++)i=Object.assign(i,Z["."+l[_]])}c.hasAttribute("id")&&(i=Object.assign(i,Z["#"+c.getAttribute("id")]));function e(l,_,g){g===void 0&&(g=function(d){return d.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),d}),c.hasAttribute(l)&&(r[_]=g(c.getAttribute(l))),i[l]&&(r[_]=g(i[l])),c.style&&c.style[l]!==""&&(r[_]=g(c.style[l]))}function h(l){return Math.max(0,Math.min(1,w(l)))}function m(l){return Math.max(0,w(l))}return e("fill","fill"),e("fill-opacity","fillOpacity",h),e("fill-rule","fillRule"),e("opacity","opacity",h),e("stroke","stroke"),e("stroke-opacity","strokeOpacity",h),e("stroke-width","strokeWidth",m),e("stroke-linejoin","strokeLineJoin"),e("stroke-linecap","strokeLineCap"),e("stroke-miterlimit","strokeMiterLimit",m),e("visibility","visibility"),r}function L(c,r){return c-(r-c)}function P(c,r,i){if(typeof c!="string")throw new TypeError("Invalid input: "+typeof c);const e={WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},h=0,m=1,l=2,_=3;let g=h,y=!0,d="",x="";const v=[];function M(V,nt,lt){const it=new SyntaxError('Unexpected character "'+V+'" at index '+nt+".");throw it.partial=lt,it}function a(){d!==""&&(x===""?v.push(Number(d)):v.push(Number(d)*Math.pow(10,Number(x)))),d="",x=""}let s;const A=c.length;for(let V=0;V<A;V++){if(s=c[V],Array.isArray(r)&&r.includes(v.length%i)&&e.FLAGS.test(s)){g=m,d=s,a();continue}if(g===h){if(e.WHITESPACE.test(s))continue;if(e.DIGIT.test(s)||e.SIGN.test(s)){g=m,d=s;continue}if(e.POINT.test(s)){g=l,d=s;continue}e.COMMA.test(s)&&(y&&M(s,V,v),y=!0)}if(g===m){if(e.DIGIT.test(s)){d+=s;continue}if(e.POINT.test(s)){d+=s,g=l;continue}if(e.EXP.test(s)){g=_;continue}e.SIGN.test(s)&&d.length===1&&e.SIGN.test(d[0])&&M(s,V,v)}if(g===l){if(e.DIGIT.test(s)){d+=s;continue}if(e.EXP.test(s)){g=_;continue}e.POINT.test(s)&&d[d.length-1]==="."&&M(s,V,v)}if(g===_){if(e.DIGIT.test(s)){x+=s;continue}if(e.SIGN.test(s)){if(x===""){x+=s;continue}x.length===1&&e.SIGN.test(x)&&M(s,V,v)}}e.WHITESPACE.test(s)?(a(),g=h,y=!1):e.COMMA.test(s)?(a(),g=h,y=!0):e.SIGN.test(s)?(a(),g=m,d=s):e.POINT.test(s)?(a(),g=l,d=s):M(s,V,v)}return a(),v}const f=["mm","cm","in","pt","pc","px"],S={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function w(c){let r="px";if(typeof c=="string"||c instanceof String)for(let e=0,h=f.length;e<h;e++){const m=f[e];if(c.endsWith(m)){r=m,c=c.substring(0,c.length-m.length);break}}let i;return r==="px"&&n.defaultUnit!=="px"?i=S.in[n.defaultUnit]/n.defaultDPI:(i=S[r][n.defaultUnit],i<0&&(i=S[r].in*n.defaultDPI)),i*parseFloat(c)}function D(c){if(!(c.hasAttribute("transform")||c.nodeName==="use"&&(c.hasAttribute("x")||c.hasAttribute("y"))))return null;const r=R(c);return B.length>0&&r.premultiply(B[B.length-1]),et.copy(r),B.push(r),r}function R(c){const r=new xt,i=st;if(c.nodeName==="use"&&(c.hasAttribute("x")||c.hasAttribute("y"))){const e=w(c.getAttribute("x")),h=w(c.getAttribute("y"));r.translate(e,h)}if(c.hasAttribute("transform")){const e=c.getAttribute("transform").split(")");for(let h=e.length-1;h>=0;h--){const m=e[h].trim();if(m==="")continue;const l=m.indexOf("("),_=m.length;if(l>0&&l<_){const g=m.slice(0,l),y=P(m.slice(l+1));switch(i.identity(),g){case"translate":if(y.length>=1){const d=y[0];let x=0;y.length>=2&&(x=y[1]),i.translate(d,x)}break;case"rotate":if(y.length>=1){let d=0,x=0,v=0;d=y[0]*Math.PI/180,y.length>=3&&(x=y[1],v=y[2]),Q.makeTranslation(-x,-v),j.makeRotation(d),C.multiplyMatrices(j,Q),Q.makeTranslation(x,v),i.multiplyMatrices(Q,C)}break;case"scale":if(y.length>=1){const d=y[0];let x=d;y.length>=2&&(x=y[1]),i.scale(d,x)}break;case"skewX":y.length===1&&i.set(1,Math.tan(y[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":y.length===1&&i.set(1,0,0,Math.tan(y[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":y.length===6&&i.set(y[0],y[2],y[4],y[1],y[3],y[5],0,0,1);break}}r.premultiply(i)}}return r}function O(c,r){function i(l){J.set(l.x,l.y,1).applyMatrix3(r),l.set(J.x,J.y)}function e(l){const _=l.xRadius,g=l.yRadius,y=Math.cos(l.aRotation),d=Math.sin(l.aRotation),x=new K(_*y,_*d,0),v=new K(-g*d,g*y,0),M=x.applyMatrix3(r),a=v.applyMatrix3(r),s=st.set(M.x,a.x,0,M.y,a.y,0,0,0,1),A=Q.copy(s).invert(),lt=j.copy(A).transpose().multiply(A).elements,it=at(lt[0],lt[1],lt[4]),gt=Math.sqrt(it.rt1),Lt=Math.sqrt(it.rt2);if(l.xRadius=1/gt,l.yRadius=1/Lt,l.aRotation=Math.atan2(it.sn,it.cs),!((l.aEndAngle-l.aStartAngle)%(2*Math.PI)<Number.EPSILON)){const Tt=Q.set(gt,0,0,0,Lt,0,0,0,1),zt=j.set(it.cs,it.sn,0,-it.sn,it.cs,0,0,0,1),kt=Tt.multiply(zt).multiply(s),ee=ie=>{const{x:we,y:Ee}=new K(Math.cos(ie),Math.sin(ie),0).applyMatrix3(kt);return Math.atan2(Ee,we)};l.aStartAngle=ee(l.aStartAngle),l.aEndAngle=ee(l.aEndAngle),U(r)&&(l.aClockwise=!l.aClockwise)}}function h(l){const _=z(r),g=G(r);l.xRadius*=_,l.yRadius*=g;const y=_>Number.EPSILON?Math.atan2(r.elements[1],r.elements[0]):Math.atan2(-r.elements[3],r.elements[4]);l.aRotation+=y,U(r)&&(l.aStartAngle*=-1,l.aEndAngle*=-1,l.aClockwise=!l.aClockwise)}const m=c.subPaths;for(let l=0,_=m.length;l<_;l++){const y=m[l].curves;for(let d=0;d<y.length;d++){const x=y[d];x.isLineCurve?(i(x.v1),i(x.v2)):x.isCubicBezierCurve?(i(x.v0),i(x.v1),i(x.v2),i(x.v3)):x.isQuadraticBezierCurve?(i(x.v0),i(x.v1),i(x.v2)):x.isEllipseCurve&&(tt.set(x.aX,x.aY),i(tt),x.aX=tt.x,x.aY=tt.y,F(r)?e(x):h(x))}}}function U(c){const r=c.elements;return r[0]*r[4]-r[1]*r[3]<0}function F(c){const r=c.elements,i=r[0]*r[3]+r[1]*r[4];if(i===0)return!1;const e=z(c),h=G(c);return Math.abs(i/(e*h))>Number.EPSILON}function z(c){const r=c.elements;return Math.sqrt(r[0]*r[0]+r[1]*r[1])}function G(c){const r=c.elements;return Math.sqrt(r[3]*r[3]+r[4]*r[4])}function at(c,r,i){let e,h,m,l,_;const g=c+i,y=c-i,d=Math.sqrt(y*y+4*r*r);return g>0?(e=.5*(g+d),_=1/e,h=c*_*i-r*_*r):g<0?h=.5*(g-d):(e=.5*d,h=-.5*d),y>0?m=y+d:m=y-d,Math.abs(m)>2*Math.abs(r)?(_=-2*r/m,l=1/Math.sqrt(1+_*_),m=_*l):Math.abs(r)===0?(m=1,l=0):(_=-.5*m/r,m=1/Math.sqrt(1+_*_),l=_*m),y>0&&(_=m,m=-l,l=_),{rt1:e,rt2:h,cs:m,sn:l}}const T=[],Z={},B=[],st=new xt,Q=new xt,j=new xt,C=new xt,tt=new Y,J=new K,et=new xt,pt=new DOMParser().parseFromString(t,"image/svg+xml");return o(pt.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:T,xml:pt.documentElement}}static createShapes(t){const o={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},p={loc:o.ORIGIN,t:0};function b(L,P,f,S){const w=L.x,D=P.x,R=f.x,O=S.x,U=L.y,F=P.y,z=f.y,G=S.y,at=(O-R)*(U-z)-(G-z)*(w-R),T=(D-w)*(U-z)-(F-U)*(w-R),Z=(G-z)*(D-w)-(O-R)*(F-U),B=at/Z,st=T/Z;if(Z===0&&at!==0||B<=0||B>=1||st<0||st>1)return null;if(at===0&&Z===0){for(let Q=0;Q<2;Q++)if(E(Q===0?f:S,L,P),p.loc==o.ORIGIN){const j=Q===0?f:S;return{x:j.x,y:j.y,t:p.t}}else if(p.loc==o.BETWEEN){const j=+(w+p.t*(D-w)).toPrecision(10),C=+(U+p.t*(F-U)).toPrecision(10);return{x:j,y:C,t:p.t}}return null}else{for(let C=0;C<2;C++)if(E(C===0?f:S,L,P),p.loc==o.ORIGIN){const tt=C===0?f:S;return{x:tt.x,y:tt.y,t:p.t}}const Q=+(w+B*(D-w)).toPrecision(10),j=+(U+B*(F-U)).toPrecision(10);return{x:Q,y:j,t:B}}}function E(L,P,f){const S=f.x-P.x,w=f.y-P.y,D=L.x-P.x,R=L.y-P.y,O=S*R-D*w;if(L.x===P.x&&L.y===P.y){p.loc=o.ORIGIN,p.t=0;return}if(L.x===f.x&&L.y===f.y){p.loc=o.DESTINATION,p.t=1;return}if(O<-Number.EPSILON){p.loc=o.LEFT;return}if(O>Number.EPSILON){p.loc=o.RIGHT;return}if(S*D<0||w*R<0){p.loc=o.BEHIND;return}if(Math.sqrt(S*S+w*w)<Math.sqrt(D*D+R*R)){p.loc=o.BEYOND;return}let U;S!==0?U=D/S:U=R/w,p.loc=o.BETWEEN,p.t=U}function k(L,P){const f=[],S=[];for(let w=1;w<L.length;w++){const D=L[w-1],R=L[w];for(let O=1;O<P.length;O++){const U=P[O-1],F=P[O],z=b(D,R,U,F);z!==null&&f.find(G=>G.t<=z.t+Number.EPSILON&&G.t>=z.t-Number.EPSILON)===void 0&&(f.push(z),S.push(new Y(z.x,z.y)))}}return S}function H(L,P,f){const S=new Y;P.getCenter(S);const w=[];return f.forEach(D=>{D.boundingBox.containsPoint(S)&&k(L,D.points).forEach(O=>{w.push({identifier:D.identifier,isCW:D.isCW,point:O})})}),w.sort((D,R)=>D.point.x-R.point.x),w}function I(L,P,f,S,w){(w==null||w==="")&&(w="nonzero");const D=new Y;L.boundingBox.getCenter(D);const R=[new Y(f,D.y),new Y(S,D.y)],O=H(R,L.boundingBox,P);O.sort((T,Z)=>T.point.x-Z.point.x);const U=[],F=[];O.forEach(T=>{T.identifier===L.identifier?U.push(T):F.push(T)});const z=U[0].point.x,G=[];let at=0;for(;at<F.length&&F[at].point.x<z;)G.length>0&&G[G.length-1]===F[at].identifier?G.pop():G.push(F[at].identifier),at++;if(G.push(L.identifier),w==="evenodd"){const T=G.length%2===0,Z=G[G.length-2];return{identifier:L.identifier,isHole:T,for:Z}}else if(w==="nonzero"){let T=!0,Z=null,B=null;for(let st=0;st<G.length;st++){const Q=G[st];T?(B=P[Q].isCW,T=!1,Z=Q):B!==P[Q].isCW&&(B=P[Q].isCW,T=!0)}return{identifier:L.identifier,isHole:T,for:Z}}else console.warn('fill-rule: "'+w+'" is currently not implemented.')}let W=999999999,$=-999999999,N=t.subPaths.map(L=>{const P=L.getPoints();let f=-999999999,S=999999999,w=-999999999,D=999999999;for(let R=0;R<P.length;R++){const O=P[R];O.y>f&&(f=O.y),O.y<S&&(S=O.y),O.x>w&&(w=O.x),O.x<D&&(D=O.x)}return $<=w&&($=w+1),W>=D&&(W=D-1),{curves:L.curves,points:P,isCW:Me.isClockWise(P),identifier:-1,boundingBox:new Ae(new Y(D,S),new Y(w,f))}});N=N.filter(L=>L.points.length>1);for(let L=0;L<N.length;L++)N[L].identifier=L;const rt=N.map(L=>I(L,N,W,$,t.userData?t.userData.style.fillRule:void 0)),X=[];return N.forEach(L=>{if(!rt[L.identifier].isHole){const f=new Se;f.curves=L.curves,rt.filter(w=>w.isHole&&w.for===L.identifier).forEach(w=>{const D=N[w.identifier],R=new Yt;R.curves=D.curves,f.holes.push(R)}),X.push(f)}}),X}static getStrokeStyle(t,n,o,p,b){return t=t!==void 0?t:1,n=n!==void 0?n:"#000",o=o!==void 0?o:"miter",p=p!==void 0?p:"butt",b=b!==void 0?b:4,{strokeColor:n,strokeWidth:t,strokeLineJoin:o,strokeLineCap:p,strokeMiterLimit:b}}static pointsToStroke(t,n,o,p){const b=[],E=[],k=[];if($t.pointsToStrokeWithBuffers(t,n,o,p,b,E,k)===0)return null;const H=new Bt;return H.setAttribute("position",new _t(b,3)),H.setAttribute("normal",new _t(E,3)),H.setAttribute("uv",new _t(k,2)),H}static pointsToStrokeWithBuffers(t,n,o,p,b,E,k,H){const I=new Y,W=new Y,$=new Y,N=new Y,rt=new Y,X=new Y,L=new Y,P=new Y,f=new Y,S=new Y,w=new Y,D=new Y,R=new Y,O=new Y,U=new Y,F=new Y,z=new Y;o=o!==void 0?o:12,p=p!==void 0?p:.001,H=H!==void 0?H:0,t=y(t);const G=t.length;if(G<2)return 0;const at=t[0].equals(t[G-1]);let T,Z=t[0],B;const st=n.strokeWidth/2,Q=1/(G-1);let j=0,C,tt,J,et,pt=!1,mt=0,c=H*3,r=H*2;i(t[0],t[1],I).multiplyScalar(st),P.copy(t[0]).sub(I),f.copy(t[0]).add(I),S.copy(P),w.copy(f);for(let d=1;d<G;d++){T=t[d],d===G-1?at?B=t[1]:B=void 0:B=t[d+1];const x=I;if(i(Z,T,x),$.copy(x).multiplyScalar(st),D.copy(T).sub($),R.copy(T).add($),C=j+Q,tt=!1,B!==void 0){i(T,B,W),$.copy(W).multiplyScalar(st),O.copy(T).sub($),U.copy(T).add($),J=!0,$.subVectors(B,Z),x.dot($)<0&&(J=!1),d===1&&(pt=J),$.subVectors(B,T),$.normalize();const v=Math.abs(x.dot($));if(v>Number.EPSILON){const M=st/v;$.multiplyScalar(-M),N.subVectors(T,Z),rt.copy(N).setLength(M).add($),F.copy(rt).negate();const a=rt.length(),s=N.length();N.divideScalar(s),X.subVectors(B,T);const A=X.length();switch(X.divideScalar(A),N.dot(F)<s&&X.dot(F)<A&&(tt=!0),z.copy(rt).add(T),F.add(T),et=!1,tt?J?(U.copy(F),R.copy(F)):(O.copy(F),D.copy(F)):m(),n.strokeLineJoin){case"bevel":l(J,tt,C);break;case"round":_(J,tt),J?h(T,D,O,C,0):h(T,U,R,C,1);break;case"miter":case"miter-clip":default:const V=st*n.strokeMiterLimit/a;if(V<1)if(n.strokeLineJoin!=="miter-clip"){l(J,tt,C);break}else _(J,tt),J?(X.subVectors(z,D).multiplyScalar(V).add(D),L.subVectors(z,O).multiplyScalar(V).add(O),e(D,C,0),e(X,C,0),e(T,C,.5),e(T,C,.5),e(X,C,0),e(L,C,0),e(T,C,.5),e(L,C,0),e(O,C,0)):(X.subVectors(z,R).multiplyScalar(V).add(R),L.subVectors(z,U).multiplyScalar(V).add(U),e(R,C,1),e(X,C,1),e(T,C,.5),e(T,C,.5),e(X,C,1),e(L,C,1),e(T,C,.5),e(L,C,1),e(U,C,1));else tt?(J?(e(f,j,1),e(P,j,0),e(z,C,0),e(f,j,1),e(z,C,0),e(F,C,1)):(e(f,j,1),e(P,j,0),e(z,C,1),e(P,j,0),e(F,C,0),e(z,C,1)),J?O.copy(z):U.copy(z)):J?(e(D,C,0),e(z,C,0),e(T,C,.5),e(T,C,.5),e(z,C,0),e(O,C,0)):(e(R,C,1),e(z,C,1),e(T,C,.5),e(T,C,.5),e(z,C,1),e(U,C,1)),et=!0;break}}else m()}else m();!at&&d===G-1&&g(t[0],S,w,J,!0,j),j=C,Z=T,P.copy(O),f.copy(U)}if(!at)g(T,D,R,J,!1,C);else if(tt&&b){let d=z,x=F;pt!==J&&(d=F,x=z),J?(et||pt)&&(x.toArray(b,0),x.toArray(b,9),et&&d.toArray(b,3)):(et||!pt)&&(x.toArray(b,3),x.toArray(b,9),et&&d.toArray(b,0))}return mt;function i(d,x,v){return v.subVectors(x,d),v.set(-v.y,v.x).normalize()}function e(d,x,v){b&&(b[c]=d.x,b[c+1]=d.y,b[c+2]=0,E&&(E[c]=0,E[c+1]=0,E[c+2]=1),c+=3,k&&(k[r]=x,k[r+1]=v,r+=2)),mt+=3}function h(d,x,v,M,a){I.copy(x).sub(d).normalize(),W.copy(v).sub(d).normalize();let s=Math.PI;const A=I.dot(W);Math.abs(A)<1&&(s=Math.abs(Math.acos(A))),s/=o,$.copy(x);for(let V=0,nt=o-1;V<nt;V++)N.copy($).rotateAround(d,s),e($,M,a),e(N,M,a),e(d,M,.5),$.copy(N);e(N,M,a),e(v,M,a),e(d,M,.5)}function m(){e(f,j,1),e(P,j,0),e(D,C,0),e(f,j,1),e(D,C,0),e(R,C,1)}function l(d,x,v){x?d?(e(f,j,1),e(P,j,0),e(D,C,0),e(f,j,1),e(D,C,0),e(F,C,1),e(D,v,0),e(O,v,0),e(F,v,.5)):(e(f,j,1),e(P,j,0),e(R,C,1),e(P,j,0),e(F,C,0),e(R,C,1),e(R,v,1),e(F,v,0),e(U,v,1)):d?(e(D,v,0),e(O,v,0),e(T,v,.5)):(e(R,v,1),e(U,v,0),e(T,v,.5))}function _(d,x){x&&(d?(e(f,j,1),e(P,j,0),e(D,C,0),e(f,j,1),e(D,C,0),e(F,C,1),e(D,j,0),e(T,C,.5),e(F,C,1),e(T,C,.5),e(O,j,0),e(F,C,1)):(e(f,j,1),e(P,j,0),e(R,C,1),e(P,j,0),e(F,C,0),e(R,C,1),e(R,j,1),e(F,C,0),e(T,C,.5),e(T,C,.5),e(F,C,0),e(U,j,1)))}function g(d,x,v,M,a,s){switch(n.strokeLineCap){case"round":a?h(d,v,x,s,.5):h(d,x,v,s,.5);break;case"square":if(a)I.subVectors(x,d),W.set(I.y,-I.x),$.addVectors(I,W).add(d),N.subVectors(W,I).add(d),M?($.toArray(b,3),N.toArray(b,0),N.toArray(b,9)):($.toArray(b,3),k[7]===1?N.toArray(b,9):$.toArray(b,9),N.toArray(b,0));else{I.subVectors(v,d),W.set(I.y,-I.x),$.addVectors(I,W).add(d),N.subVectors(W,I).add(d);const A=b.length;M?($.toArray(b,A-3),N.toArray(b,A-6),N.toArray(b,A-12)):(N.toArray(b,A-6),$.toArray(b,A-3),N.toArray(b,A-12))}break}}function y(d){let x=!1;for(let M=1,a=d.length-1;M<a;M++)if(d[M].distanceTo(d[M+1])<p){x=!0;break}if(!x)return d;const v=[];v.push(d[0]);for(let M=1,a=d.length-1;M<a;M++)d[M].distanceTo(d[M+1])>=p&&v.push(d[M]);return v.push(d[d.length-1]),v}}}const Et=4,At=1024,ut=4;function Be(u=1){const t=new Uint16Array(At*ut*u*Et),n=new Te(t,At,ut*u,ke,De);return n.wrapS=se,n.wrapY=se,n.magFilter=ne,n.minFilter=ne,n.needsUpdate=!0,n}function Ze(u,t,n=0){const o=Math.floor(At*(ut/4));t.arcLengthDivisions=o/2,t.updateArcLengths();const p=t.getSpacedPoints(o),b=t.computeFrenetFrames(o,!0);for(let E=0;E<o;E++){const k=Math.floor(E/At),H=E%At;let I=p[E];Ot(u,H,I.x,I.y,I.z,0+k+ut*n),I=b.tangents[E],Ot(u,H,I.x,I.y,I.z,1+k+ut*n),I=b.normals[E],Ot(u,H,I.x,I.y,I.z,2+k+ut*n),I=b.binormals[E],Ot(u,H,I.x,I.y,I.z,3+k+ut*n)}u.needsUpdate=!0}function Ot(u,t,n,o,p,b){const E=u.image,{data:k}=E,H=Et*At*b;k[t*Et+H+0]=Dt.toHalfFloat(n),k[t*Et+H+1]=Dt.toHalfFloat(o),k[t*Et+H+2]=Dt.toHalfFloat(p),k[t*Et+H+3]=Dt.toHalfFloat(1)}function We(u){return{spineTexture:{value:u},pathOffset:{type:"f",value:0},pathSegment:{type:"f",value:1},spineOffset:{type:"f",value:161},spineLength:{type:"f",value:400},flow:{type:"i",value:1}}}function he(u,t,n=1){u.__ok||(u.__ok=!0,u.onBeforeCompile=o=>{if(o.__modified)return;o.__modified=!0,Object.assign(o.uniforms,t);const p=`
		uniform sampler2D spineTexture;
		uniform float pathOffset;
		uniform float pathSegment;
		uniform float spineOffset;
		uniform float spineLength;
		uniform int flow;

		float textureLayers = ${ut*n}.;
		float textureStacks = ${ut/4}.;

		${o.vertexShader}
		`.replace("#include <beginnormal_vertex>","").replace("#include <defaultnormal_vertex>","").replace("#include <begin_vertex>","").replace(/void\s*main\s*\(\)\s*\{/,`
void main() {
#include <beginnormal_vertex>

vec4 worldPos = modelMatrix * vec4(position, 1.);

bool bend = flow > 0;
float xWeight = bend ? 0. : 1.;

#ifdef USE_INSTANCING
float pathOffsetFromInstanceMatrix = instanceMatrix[3][2];
float spineLengthFromInstanceMatrix = instanceMatrix[3][0];
float spinePortion = bend ? (worldPos.x + spineOffset) / spineLengthFromInstanceMatrix : 0.;
float mt = (spinePortion * pathSegment + pathOffset + pathOffsetFromInstanceMatrix)*textureStacks;
#else
float spinePortion = bend ? (worldPos.x + spineOffset) / spineLength : 0.;
float mt = (spinePortion * pathSegment + pathOffset)*textureStacks;
#endif

mt = mod(mt, textureStacks);
float rowOffset = floor(mt);

#ifdef USE_INSTANCING
rowOffset += instanceMatrix[3][1] * ${ut}.;
#endif

vec3 spinePos = texture2D(spineTexture, vec2(mt, (0. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 a =        texture2D(spineTexture, vec2(mt, (1. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 b =        texture2D(spineTexture, vec2(mt, (2. + rowOffset + 0.5) / textureLayers)).xyz;
vec3 c =        texture2D(spineTexture, vec2(mt, (3. + rowOffset + 0.5) / textureLayers)).xyz;
mat3 basis = mat3(a, b, c);

vec3 transformed = basis
	* vec3(worldPos.x * xWeight, worldPos.y * 1., worldPos.z * 1.)
	+ spinePos;

vec3 transformedNormal = normalMatrix * (basis * objectNormal);
			`).replace("#include <project_vertex>",`vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
				gl_Position = projectionMatrix * mvPosition;`);o.vertexShader=p})}class ce{constructor(t,n=1){const o=t.clone(),p=Be(n),b=We(p);o.traverse(function(E){if(E instanceof wt||E instanceof Le)if(Array.isArray(E.material)){const k=[];for(const H of E.material){const I=H.clone();he(I,b,n),k.push(I)}E.material=k}else E.material=E.material.clone(),he(E.material,b,n)}),this.curveArray=new Array(n),this.curveLengthArray=new Array(n),this.object3D=o,this.splineTexure=p,this.uniforms=b}updateCurve(t,n){if(t>=this.curveArray.length)throw Error("Index out of range for Flow");const o=n.getLength();this.uniforms.spineLength.value=o,this.curveLengthArray[t]=o,this.curveArray[t]=n,Ze(this.splineTexure,n,t)}moveAlongCurve(t){this.uniforms.pathOffset.value+=t}}new Oe;const ue={type:"change"},Kt={type:"start"},fe={type:"end"},It=new $e,de=new Re,Ge=Math.cos(70*He.DEG2RAD),ot=new K,ht=2*Math.PI,q={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ut=1e-6;class qe extends Ie{constructor(t,n=null){super(t,n),this.state=q.NONE,this.enabled=!0,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vt.ROTATE,MIDDLE:vt.DOLLY,RIGHT:vt.PAN},this.touches={ONE:Ct.ROTATE,TWO:Ct.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new K,this._lastQuaternion=new oe,this._lastTargetPosition=new K,this._quat=new oe().setFromUnitVectors(t.up,new K(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new re,this._sphericalDelta=new re,this._scale=1,this._panOffset=new K,this._rotateStart=new Y,this._rotateEnd=new Y,this._rotateDelta=new Y,this._panStart=new Y,this._panEnd=new Y,this._panDelta=new Y,this._dollyStart=new Y,this._dollyEnd=new Y,this._dollyDelta=new Y,this._dollyDirection=new K,this._mouse=new Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Qe.bind(this),this._onPointerDown=Ke.bind(this),this._onPointerUp=Je.bind(this),this._onContextMenu=ri.bind(this),this._onMouseWheel=ii.bind(this),this._onKeyDown=si.bind(this),this._onTouchStart=ni.bind(this),this._onTouchMove=oi.bind(this),this._onMouseDown=ti.bind(this),this._onMouseMove=ei.bind(this),this._interceptControlDown=ai.bind(this),this._interceptControlUp=li.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ue),this.update(),this.state=q.NONE}update(t=null){const n=this.object.position;ot.copy(n).sub(this.target),ot.applyQuaternion(this._quat),this._spherical.setFromVector3(ot),this.autoRotate&&this.state===q.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,p=this.maxAzimuthAngle;isFinite(o)&&isFinite(p)&&(o<-Math.PI?o+=ht:o>Math.PI&&(o-=ht),p<-Math.PI?p+=ht:p>Math.PI&&(p-=ht),o<=p?this._spherical.theta=Math.max(o,Math.min(p,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+p)/2?Math.max(o,this._spherical.theta):Math.min(p,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let b=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const E=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),b=E!=this._spherical.radius}if(ot.setFromSpherical(this._spherical),ot.applyQuaternion(this._quatInverse),n.copy(this.target).add(ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let E=null;if(this.object.isPerspectiveCamera){const k=ot.length();E=this._clampDistance(k*this._scale);const H=k-E;this.object.position.addScaledVector(this._dollyDirection,H),this.object.updateMatrixWorld(),b=!!H}else if(this.object.isOrthographicCamera){const k=new K(this._mouse.x,this._mouse.y,0);k.unproject(this.object);const H=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),b=H!==this.object.zoom;const I=new K(this._mouse.x,this._mouse.y,0);I.unproject(this.object),this.object.position.sub(I).add(k),this.object.updateMatrixWorld(),E=ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;E!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(E).add(this.object.position):(It.origin.copy(this.object.position),It.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(It.direction))<Ge?this.object.lookAt(this.target):(de.setFromNormalAndCoplanarPoint(this.object.up,this.target),It.intersectPlane(de,this.target))))}else if(this.object.isOrthographicCamera){const E=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),E!==this.object.zoom&&(this.object.updateProjectionMatrix(),b=!0)}return this._scale=1,this._performCursorZoom=!1,b||this._lastPosition.distanceToSquared(this.object.position)>Ut||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ut||this._lastTargetPosition.distanceToSquared(this.target)>Ut?(this.dispatchEvent(ue),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ht/60*this.autoRotateSpeed*t:ht/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){ot.setFromMatrixColumn(n,0),ot.multiplyScalar(-t),this._panOffset.add(ot)}_panUp(t,n){this.screenSpacePanning===!0?ot.setFromMatrixColumn(n,1):(ot.setFromMatrixColumn(n,0),ot.crossVectors(this.object.up,ot)),ot.multiplyScalar(t),this._panOffset.add(ot)}_pan(t,n){const o=this.domElement;if(this.object.isPerspectiveCamera){const p=this.object.position;ot.copy(p).sub(this.target);let b=ot.length();b*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*b/o.clientHeight,this.object.matrix),this._panUp(2*n*b/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),p=t-o.left,b=n-o.top,E=o.width,k=o.height;this._mouse.x=p/E*2-1,this._mouse.y=-(b/k)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/n.clientHeight),this._rotateUp(ht*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-ht*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),p=.5*(t.pageY+n.y);this._rotateStart.set(o,p)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),p=.5*(t.pageY+n.y);this._panStart.set(o,p)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),o=t.pageX-n.x,p=t.pageY-n.y,b=Math.sqrt(o*o+p*p);this._dollyStart.set(0,b)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const o=this._getSecondPointerPosition(t),p=.5*(t.pageX+o.x),b=.5*(t.pageY+o.y);this._rotateEnd.set(p,b)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ht*this._rotateDelta.x/n.clientHeight),this._rotateUp(ht*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),o=.5*(t.pageX+n.x),p=.5*(t.pageY+n.y);this._panEnd.set(o,p)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),o=t.pageX-n.x,p=t.pageY-n.y,b=Math.sqrt(o*o+p*p);this._dollyEnd.set(0,b),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const E=(t.pageX+n.x)*.5,k=(t.pageY+n.y)*.5;this._updateZoomParameters(E,k)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Y,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,o={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function Ke(u){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(u.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(u)&&(this._addPointer(u),u.pointerType==="touch"?this._onTouchStart(u):this._onMouseDown(u)))}function Qe(u){this.enabled!==!1&&(u.pointerType==="touch"?this._onTouchMove(u):this._onMouseMove(u))}function Je(u){switch(this._removePointer(u),this._pointers.length){case 0:this.domElement.releasePointerCapture(u.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fe),this.state=q.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function ti(u){let t;switch(u.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(u),this.state=q.DOLLY;break;case vt.ROTATE:if(u.ctrlKey||u.metaKey||u.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(u),this.state=q.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(u),this.state=q.ROTATE}break;case vt.PAN:if(u.ctrlKey||u.metaKey||u.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(u),this.state=q.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(u),this.state=q.PAN}break;default:this.state=q.NONE}this.state!==q.NONE&&this.dispatchEvent(Kt)}function ei(u){switch(this.state){case q.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(u);break;case q.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(u);break;case q.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(u);break}}function ii(u){this.enabled===!1||this.enableZoom===!1||this.state!==q.NONE||(u.preventDefault(),this.dispatchEvent(Kt),this._handleMouseWheel(this._customWheelEvent(u)),this.dispatchEvent(fe))}function si(u){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(u)}function ni(u){switch(this._trackPointer(u),this._pointers.length){case 1:switch(this.touches.ONE){case Ct.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(u),this.state=q.TOUCH_ROTATE;break;case Ct.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(u),this.state=q.TOUCH_PAN;break;default:this.state=q.NONE}break;case 2:switch(this.touches.TWO){case Ct.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(u),this.state=q.TOUCH_DOLLY_PAN;break;case Ct.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(u),this.state=q.TOUCH_DOLLY_ROTATE;break;default:this.state=q.NONE}break;default:this.state=q.NONE}this.state!==q.NONE&&this.dispatchEvent(Kt)}function oi(u){switch(this._trackPointer(u),this.state){case q.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(u),this.update();break;case q.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(u),this.update();break;case q.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(u),this.update();break;case q.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(u),this.update();break;default:this.state=q.NONE}}function ri(u){this.enabled!==!1&&u.preventDefault()}function ai(u){u.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function li(u){u.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class dt{constructor(t,n,o,p,b="div"){this.parent=t,this.object=n,this.property=o,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(b),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(p),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),dt.nextNameID=dt.nextNameID||0,this.$name.id=`lil-gui-name-${++dt.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",E=>E.stopPropagation()),this.domElement.addEventListener("keyup",E=>E.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(o)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const n=this.parent.add(this.object,this.property,t);return n.name(this._name),this.destroy(),n}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class hi extends dt{constructor(t,n,o){super(t,n,o,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Zt(u){let t,n;return(t=u.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=u.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=u.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?"#"+n:!1}const ci={isPrimitive:!0,match:u=>typeof u=="string",fromHexString:Zt,toHexString:Zt},Pt={isPrimitive:!0,match:u=>typeof u=="number",fromHexString:u=>parseInt(u.substring(1),16),toHexString:u=>"#"+u.toString(16).padStart(6,0)},ui={isPrimitive:!1,match:u=>Array.isArray(u)||ArrayBuffer.isView(u),fromHexString(u,t,n=1){const o=Pt.fromHexString(u);t[0]=(o>>16&255)/255*n,t[1]=(o>>8&255)/255*n,t[2]=(o&255)/255*n},toHexString([u,t,n],o=1){o=255/o;const p=u*o<<16^t*o<<8^n*o<<0;return Pt.toHexString(p)}},di={isPrimitive:!1,match:u=>Object(u)===u,fromHexString(u,t,n=1){const o=Pt.fromHexString(u);t.r=(o>>16&255)/255*n,t.g=(o>>8&255)/255*n,t.b=(o&255)/255*n},toHexString({r:u,g:t,b:n},o=1){o=255/o;const p=u*o<<16^t*o<<8^n*o<<0;return Pt.toHexString(p)}},pi=[ci,Pt,ui,di];function fi(u){return pi.find(t=>t.match(u))}class mi extends dt{constructor(t,n,o,p){super(t,n,o,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=fi(this.initialValue),this._rgbScale=p,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const b=Zt(this.$text.value);b&&this._setValueFromHexString(b)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const n=this._format.fromHexString(t);this.setValue(n)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Xt extends dt{constructor(t,n,o){super(t,n,o,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",p=>{p.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class gi extends dt{constructor(t,n,o,p,b,E){super(t,n,o,"lil-number"),this._initInput(),this.min(p),this.max(b);const k=E!==void 0;this.step(k?E:this._getImplicitStep(),k),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,n=!0){return this._step=t,this._stepExplicit=n,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let n=(t-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let S=parseFloat(this.$input.value);isNaN(S)||(this._stepExplicit&&(S=this._snap(S)),this.setValue(this._clamp(S)))},o=S=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+S),this.$input.value=this.getValue())},p=S=>{S.key==="Enter"&&this.$input.blur(),S.code==="ArrowUp"&&(S.preventDefault(),o(this._step*this._arrowKeyMultiplier(S))),S.code==="ArrowDown"&&(S.preventDefault(),o(this._step*this._arrowKeyMultiplier(S)*-1))},b=S=>{this._inputFocused&&(S.preventDefault(),o(this._step*this._normalizeMouseWheel(S)))};let E=!1,k,H,I,W,$;const N=5,rt=S=>{k=S.clientX,H=I=S.clientY,E=!0,W=this.getValue(),$=0,window.addEventListener("mousemove",X),window.addEventListener("mouseup",L)},X=S=>{if(E){const w=S.clientX-k,D=S.clientY-H;Math.abs(D)>N?(S.preventDefault(),this.$input.blur(),E=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>N&&L()}if(!E){const w=S.clientY-I;$-=w*this._step*this._arrowKeyMultiplier(S),W+$>this._max?$=this._max-W:W+$<this._min&&($=this._min-W),this._snapClampSetValue(W+$)}I=S.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",X),window.removeEventListener("mouseup",L)},P=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",p),this.$input.addEventListener("wheel",b,{passive:!1}),this.$input.addEventListener("mousedown",rt),this.$input.addEventListener("focus",P),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(f,S,w,D,R)=>(f-S)/(w-S)*(R-D)+D,n=f=>{const S=this.$slider.getBoundingClientRect();let w=t(f,S.left,S.right,this._min,this._max);this._snapClampSetValue(w)},o=f=>{this._setDraggingStyle(!0),n(f.clientX),window.addEventListener("mousemove",p),window.addEventListener("mouseup",b)},p=f=>{n(f.clientX)},b=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",b)};let E=!1,k,H;const I=f=>{f.preventDefault(),this._setDraggingStyle(!0),n(f.touches[0].clientX),E=!1},W=f=>{f.touches.length>1||(this._hasScrollBar?(k=f.touches[0].clientX,H=f.touches[0].clientY,E=!0):I(f),window.addEventListener("touchmove",$,{passive:!1}),window.addEventListener("touchend",N))},$=f=>{if(E){const S=f.touches[0].clientX-k,w=f.touches[0].clientY-H;Math.abs(S)>Math.abs(w)?I(f):(window.removeEventListener("touchmove",$),window.removeEventListener("touchend",N))}else f.preventDefault(),n(f.touches[0].clientX)},N=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",$),window.removeEventListener("touchend",N)},rt=this._callOnFinishChange.bind(this),X=400;let L;const P=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const w=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(L),L=setTimeout(rt,X)};this.$slider.addEventListener("mousedown",o),this.$slider.addEventListener("touchstart",W,{passive:!1}),this.$slider.addEventListener("wheel",P,{passive:!1})}_setDraggingStyle(t,n="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${n}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:n,deltaY:o}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(n=0,o=-t.wheelDelta/120,o*=this._stepExplicit?1:10),n+-o}_arrowKeyMultiplier(t){let n=this._stepExplicit?1:10;return t.shiftKey?n*=10:t.altKey&&(n/=10),n}_snap(t){let n=0;return this._hasMin?n=this._min:this._hasMax&&(n=this._max),t-=n,t=Math.round(t/this._step)*this._step,t+=n,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class yi extends dt{constructor(t,n,o,p){super(t,n,o,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(p)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(n=>{const o=document.createElement("option");o.textContent=n,this.$select.appendChild(o)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),n=this._values.indexOf(t);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?t:this._names[n],this}}class bi extends dt{constructor(t,n,o){super(t,n,o,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",p=>{p.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var _i=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function xi(u){const t=document.createElement("style");t.innerHTML=u;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(t,n):document.head.appendChild(t)}let pe=!1;class Qt{constructor({parent:t,autoPlace:n=t===void 0,container:o,width:p,title:b="Controls",closeFolders:E=!1,injectStyles:k=!0,touchStyles:H=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(b),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),H&&this.domElement.classList.add("lil-allow-touch-styles"),!pe&&k&&(xi(_i),pe=!0),o?o.appendChild(this.domElement):n&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),p&&this.domElement.style.setProperty("--width",p+"px"),this._closeFolders=E}add(t,n,o,p,b){if(Object(o)===o)return new yi(this,t,n,o);const E=t[n];switch(typeof E){case"number":return new gi(this,t,n,o,p,b);case"boolean":return new hi(this,t,n);case"string":return new bi(this,t,n);case"function":return new Xt(this,t,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,t,`
	value:`,E)}addColor(t,n,o=1){return new mi(this,t,n,o)}addFolder(t){const n=new Qt({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(t,n=!0){return t.controllers&&this.controllers.forEach(o=>{o instanceof Xt||o._name in t.controllers&&o.load(t.controllers[o._name])}),n&&t.folders&&this.folders.forEach(o=>{o._title in t.folders&&o.load(t.folders[o._title])}),this}save(t=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(o=>{if(!(o instanceof Xt)){if(o._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${o._name}"`);n.controllers[o._name]=o.save()}}),t&&this.folders.forEach(o=>{if(o._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${o._title}"`);n.folders[o._title]=o.save()}),n}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("lil-transition");const o=b=>{b.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",o))};this.$children.addEventListener("transitionend",o);const p=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=p+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(o=>o.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(n=>{t=t.concat(n.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(n=>{t=t.concat(n.foldersRecursive())}),t}}const Wt=["M30.2339 23.2092H23.89L29.8006 5.13697H0L1.57823 0H67.152L65.5428 5.13697H36.1135L30.2339 23.2092Z","M121.715 23.2092H61.185L68.7357 0H129.203L127.718 4.70373H73.5633L72.016 9.25274H126.016L124.531 13.9565H70.6234L69.0761 18.5055H123.293L121.715 23.2092Z","M129.562 23.2092H123.621L131.203 0H153.979L160.632 16.3393L177.961 0H202.006L194.455 23.2092H188.142L194.084 4.70373H180.499L161.003 23.0854H156.64L149.213 4.70373H135.659L129.562 23.2092Z","M209.132 4.70373L206.904 11.4499H251.775C253.467 11.4499 254.88 11.1714 256.015 10.6143C257.17 10.0573 257.882 9.12895 258.15 7.82924C258.356 6.79772 258.181 6.02408 257.624 5.50832C257.088 4.97193 256.201 4.70373 254.963 4.70373H209.132ZM203.098 23.2092H196.754L204.305 0H257.005C258.738 0 260.213 0.319771 261.43 0.959314C262.668 1.59886 263.555 2.48596 264.092 3.62064C264.649 4.73468 264.824 5.99313 264.618 7.396C264.35 9.23211 263.689 10.8103 262.637 12.1307C261.585 13.4304 260.193 14.431 258.46 15.1324C256.747 15.8132 254.746 16.1536 252.456 16.1536H205.388L203.098 23.2092Z","M324.836 21.4453C322.752 22.6212 320.524 23.2092 318.152 23.2092H273.002C270.898 23.2092 269.134 22.776 267.71 21.9095C266.287 21.0224 265.286 19.8052 264.709 18.2579C264.131 16.7106 263.997 14.9777 264.306 13.059C264.678 10.7691 265.555 8.62351 266.937 6.62236C268.319 4.62121 270.062 3.02235 272.167 1.82579C274.271 0.608597 276.52 0 278.913 0H324.062C326.249 0 328.054 0.443554 329.478 1.33066C330.901 2.19714 331.892 3.40402 332.449 4.9513C333.006 6.49858 333.119 8.25216 332.789 10.212C332.397 12.5227 331.5 14.6785 330.097 16.6797C328.694 18.6602 326.94 20.2487 324.836 21.4453ZM271.269 17.3295C272.012 18.1135 273.188 18.5055 274.797 18.5055H317.471C318.709 18.5055 319.967 18.1341 321.246 17.3914C322.525 16.6487 323.639 15.6069 324.588 14.2659C325.537 12.9043 326.167 11.357 326.476 9.62408C326.765 7.93239 326.579 6.69457 325.919 5.91061C325.259 5.10602 324.196 4.70373 322.732 4.70373H279.315C278.036 4.70373 276.788 5.07508 275.571 5.81777C274.353 6.56047 273.301 7.61262 272.414 8.97423C271.548 10.3152 270.949 11.8522 270.619 13.5851C270.31 15.2768 270.527 16.525 271.269 17.3295Z"],me=["M460.192 23.2092H453.848L459.883 4.70374H0L1.48539 0H925.614L924.129 4.70374H466.195L460.192 23.2092Z","M1846.18 23.2092H922.643L930.194 0H1853.67L1852.19 4.70374H935.021L933.474 9.25275H1850.52L1849 13.9565H932.081L930.534 18.5055H1847.76L1846.18 23.2092Z","M1857.35 23.2092H1851.04L1858.62 0H2307.24L2314.7 13.3685L2330.61 0H2781.7L2774.15 23.2092H2767.84L2773.78 4.70374H2333.05L2315.81 19.2172H2311.33L2303.22 4.70374H1863.42L1857.35 23.2092Z","M2791.79 4.70374L2789.56 11.4499H3695.12C3696.81 11.4499 3698.23 11.1713 3699.36 10.6143C3700.52 10.0573 3701.23 9.12894 3701.5 7.82922C3701.7 6.7977 3701.53 6.02406 3700.97 5.5083C3700.43 4.97191 3699.55 4.70374 3698.31 4.70374H2791.79ZM2785.75 23.2092H2779.41L2786.96 0H3700.35C3702.08 0 3703.56 0.319747 3704.78 0.95929C3706.01 1.59883 3706.9 2.48599 3707.44 3.62067C3707.99 4.73471 3708.17 5.99313 3707.96 7.396C3707.7 9.2321 3707.04 10.8103 3705.98 12.1307C3704.93 13.4304 3703.54 14.431 3701.81 15.1324C3700.09 15.8132 3698.09 16.1536 3695.8 16.1536H2788.04L2785.75 23.2092Z","M4627.45 21.4453C4625.37 22.6212 4623.14 23.2092 4620.77 23.2092H3719.48C3717.37 23.2092 3715.61 22.776 3714.18 21.9095C3712.76 21.0224 3711.76 19.8052 3711.18 18.2579C3710.6 16.7107 3710.47 14.9776 3710.78 13.059C3711.15 10.769 3712.03 8.62352 3713.41 6.62238C3714.79 4.62123 3716.54 3.02237 3718.64 1.82581C3720.74 0.608612 3722.99 0 3725.39 0H4626.68C4628.86 0 4630.67 0.44358 4632.09 1.33069C4633.52 2.19717 4634.51 3.40401 4635.06 4.95129C4635.62 6.49857 4635.73 8.25215 4635.4 10.212C4635.01 12.5226 4634.11 14.6785 4632.71 16.6797C4631.31 18.6602 4629.56 20.2487 4627.45 21.4453ZM3717.74 17.3295C3718.49 18.1135 3719.66 18.5055 3721.27 18.5055H4620.09C4621.32 18.5055 4622.58 18.1341 4623.86 17.3914C4625.14 16.6487 4626.25 15.6069 4627.2 14.2659C4628.15 12.9043 4628.78 11.357 4629.09 9.62408C4629.38 7.93239 4629.19 6.69454 4628.53 5.91058C4627.87 5.106 4626.81 4.70374 4625.35 4.70374H3725.79C3724.51 4.70374 3723.26 5.07505 3722.04 5.81775C3720.83 6.56044 3719.77 7.61264 3718.89 8.97424C3718.02 10.3152 3717.42 11.8522 3717.09 13.5851C3716.78 15.2768 3717 16.5249 3717.74 17.3295Z"],ge=["path-t","path-e","path-m","path-p","path-o"],Rt=document.getElementById("logo-svg");function ye(u){const t=[],n=/([a-zA-Z])|(-?\d*\.?\d+)/g;let o;for(;(o=n.exec(u))!==null;)o[1]?t.push(o[1]):o[2]&&t.push(parseFloat(o[2]));return t}function Ht(u,t,n){const o=[];for(let p=0;p<u.length;p++)if(typeof u[p]=="string")o.push(u[p]);else{const b=u[p],E=t[p],k=b+(E-b)*n;o.push(k.toFixed(4))}return o.join(" ").replace(/ ([a-zA-Z]) /g,"$1").replace(/([a-zA-Z])(\d)/g,"$1 $2")}const Nt=Wt.map(ye),Ft=me.map(ye);let Mt=!1,yt=!1;const Jt=24,jt=333,Vt=4636,be=80/Jt,Gt=jt*be,qt=Vt*be;function _e(u=1.5){if(yt||Mt)return;yt=!0;const t={t:0};St.to(t,{t:1,duration:u,ease:"power2.inOut",onUpdate:()=>{ge.forEach((p,b)=>{const E=document.getElementById(p);if(E){const k=Ht(Nt[b],Ft[b],t.t);E.setAttribute("d",k)}});const n=jt+(Vt-jt)*t.t;Rt.setAttribute("viewBox",`0 0 ${n} ${Jt}`);const o=Gt+(qt-Gt)*t.t;Rt.style.width=`${o}px`},onComplete:()=>{Mt=!0,yt=!1}})}function xe(u=1.5){if(yt||!Mt)return;yt=!0;const t={t:0};St.to(t,{t:1,duration:u,ease:"power2.inOut",onUpdate:()=>{ge.forEach((p,b)=>{const E=document.getElementById(p);if(E){const k=Ht(Ft[b],Nt[b],t.t);E.setAttribute("d",k)}});const n=Vt-(Vt-jt)*t.t;Rt.setAttribute("viewBox",`0 0 ${n} ${Jt}`);const o=qt-(qt-Gt)*t.t;Rt.style.width=`${o}px`},onComplete:()=>{Mt=!1,yt=!1}})}let ft=!1;function wi(){if(ft){ft=!1;return}ft=!0;function u(){ft&&(!Mt&&!yt?(_e(2),setTimeout(()=>{ft&&u()},2500)):Mt&&!yt?(xe(2),setTimeout(()=>{ft&&u()},2500)):setTimeout(()=>{ft&&u()},100))}u()}document.getElementById("btn-stretch")?.addEventListener("click",()=>{ft=!1,_e()});document.getElementById("btn-normal")?.addEventListener("click",()=>{ft=!1,xe()});document.getElementById("btn-toggle")?.addEventListener("click",wi);const ct=document.getElementById("three-container");if(ct){let u=function(){w=[];for(let i=0;i<f.numCircles;i++){const e=[],h=(i-Math.floor(f.numCircles/2))*f.ySpacing,m=t(i,f.numCircles),l=f.radius*(1-f.sphereAmount+f.sphereAmount*m);for(let _=0;_<S;_++){const g=_/S*Math.PI*2,y=Math.cos(g)*l,d=Math.sin(g)*l,x=20,v=Math.sign(Math.cos(g))*Math.pow(Math.abs(Math.cos(g)),2/x)*l,M=Math.sign(Math.sin(g))*Math.pow(Math.abs(Math.sin(g)),2/x)*l,a=f.squareness;let s=y*(1-a)+v*a,A=d*(1-a)+M*a;const V=f.aspectRatio;s=s/V,A=A*V,e.push(new K(s,h,A))}w.push(new Ye(e,!0,"catmullrom",.5))}},t=function(i,e){if(e<=1)return 1;const h=(i-(e-1)/2)/((e-1)/2);return .7+Math.cos(h*Math.PI/2)*.3},n=function(i,e){const h=i.getAttribute("position"),m=i.getAttribute("normal"),l=[],_=[];for(let y=0;y<h.count;y+=3){const d=new K(h.getX(y),h.getY(y),h.getZ(y)),x=new K(h.getX(y+1),h.getY(y+1),h.getZ(y+1)),v=new K(h.getX(y+2),h.getY(y+2),h.getZ(y+2)),M=m?new K(m.getX(y),m.getY(y),m.getZ(y)):new K(0,0,1),a=m?new K(m.getX(y+1),m.getY(y+1),m.getZ(y+1)):new K(0,0,1),s=m?new K(m.getX(y+2),m.getY(y+2),m.getZ(y+2)):new K(0,0,1);o(d,x,v,M,a,s,e,l,_)}const g=new Bt;return g.setAttribute("position",new _t(l,3)),g.setAttribute("normal",new _t(_,3)),g},o=function(i,e,h,m,l,_,g,y,d){const x=i.distanceTo(e),v=e.distanceTo(h),M=h.distanceTo(i);if(Math.max(x,v,M)<=g){y.push(i.x,i.y,i.z,e.x,e.y,e.z,h.x,h.y,h.z),d.push(m.x,m.y,m.z,l.x,l.y,l.z,_.x,_.y,_.z);return}const s=new K,A=new K;x>=v&&x>=M?(s.lerpVectors(i,e,.5),A.lerpVectors(m,l,.5).normalize(),o(i,s,h,m,A,_,g,y,d),o(s,e,h,A,l,_,g,y,d)):v>=M?(s.lerpVectors(e,h,.5),A.lerpVectors(l,_,.5).normalize(),o(i,e,s,m,l,A,g,y,d),o(i,s,h,m,A,_,g,y,d)):(s.lerpVectors(h,i,.5),A.lerpVectors(_,m,.5).normalize(),o(i,e,s,m,l,A,g,y,d),o(s,e,h,A,l,_,g,y,d))},p=function(i,e=O.offsetX,h=1){const m=[];i.forEach((v,M)=>{const a=`<svg xmlns="http://www.w3.org/2000/svg"><path d="${v}"/></svg>`;D.parse(a).paths.forEach(A=>{$t.createShapes(A).forEach(nt=>{const lt={depth:.1,bevelEnabled:!1,curveSegments:12},it=new Ue(nt,lt);m.push(it)})})});const l=[],_=[];m.forEach(v=>{const M=v.getAttribute("position"),a=v.getAttribute("normal");for(let s=0;s<M.count;s++)l.push(M.getX(s),M.getY(s),M.getZ(s)),a&&_.push(a.getX(s),a.getY(s),a.getZ(s));v.dispose()});let g=new Bt;g.setAttribute("position",new _t(l,3)),_.length>0&&g.setAttribute("normal",new _t(_,3)),g.computeBoundingBox();const y=g.boundingBox,d=(y.max.x+y.min.x)/2;g.translate(-d,0,0);const x=O.scale*h;g.scale(x,-x,x),g.rotateX(O.rotateX),g.rotateY(O.rotateY),g.rotateZ(O.rotateZ),g.translate(0,O.offsetY,0),g=n(g,O.tessellation),g.computeBoundingBox();{const v=g.boundingBox;g.translate(-v.max.x,0,0)}return g.translate(e,0,0),g},b=function(){U=[],z=[],w.forEach((i,e)=>{const h=new le,m=t(e,f.numCircles),l=1-f.sphereAmount+f.sphereAmount*m,_=p(F,0,l),g=new wt(_,R.clone()),y=new ce(g);y.updateCurve(0,i);{const V=w[Math.floor(f.numCircles/2)],nt=V?V.getLength():i.getLength(),lt=i.getLength();y.uniforms.spineOffset.value=y.uniforms.spineOffset.value*(lt/nt)}const d=1-l,x=Math.pow(d,f.scaleRotationPower)*f.scaleRotationOffset,v=w[Math.floor(f.numCircles/2)],M=v?v.getLength():i.getLength(),a=(O.offsetX+e*f.circleOffsetX)/M+x;y.uniforms.pathOffset.value=(a%1+1)%1,h.add(y.object3D);const s=(e-Math.floor(f.numCircles/2))*f.ySpacing,A=new wt(at,G);A.position.set(0,s,0),h.add(A),rt.add(h),U.push(y),z.push(h)})},E=function(i){z.forEach(e=>{rt.remove(e),e.traverse(h=>{h instanceof wt&&h.geometry.dispose()})}),F=i,U=[],z=[],w.forEach((e,h)=>{const m=new le,l=t(h,f.numCircles),_=1-f.sphereAmount+f.sphereAmount*l,g=p(i,0,_),y=new wt(g,R.clone()),d=new ce(y);d.updateCurve(0,e);{const nt=w[Math.floor(f.numCircles/2)],lt=nt?nt.getLength():e.getLength(),it=e.getLength();d.uniforms.spineOffset.value=d.uniforms.spineOffset.value*(it/lt)}const x=1-_,v=Math.pow(x,f.scaleRotationPower)*f.scaleRotationOffset,M=w[Math.floor(f.numCircles/2)],a=M?M.getLength():e.getLength(),s=(O.offsetX+h*f.circleOffsetX)/a+v;d.uniforms.pathOffset.value=(s%1+1)%1,m.add(d.object3D);const A=(h-Math.floor(f.numCircles/2))*f.ySpacing,V=new wt(at,G);V.position.set(0,A,0),m.add(V),rt.add(m),U.push(d),z.push(m)})},k=function(i=1.5){if(Z||T)return;Z=!0;const e={t:0};St.to(e,{t:1,duration:i,ease:"power2.in",onUpdate:()=>{const h=Wt.map((m,l)=>Ht(Nt[l],Ft[l],e.t));E(h)},onComplete:()=>{T=!0,Z=!1}})},H=function(i=1.5){if(Z||!T)return;Z=!0;const e={t:0};St.to(e,{t:1,duration:i,ease:"power2.inOut",onUpdate:()=>{const h=Wt.map((m,l)=>Ht(Ft[l],Nt[l],e.t));E(h)},onComplete:()=>{T=!1,Z=!1}})},I=function(){requestAnimationFrame(I),st++;const i=performance.now();i-Q>=1e3&&(j.fps=Math.round(st*1e3/(i-Q)),st=0,Q=i),P.update(),L.render(rt,X)},W=function(){tt.animationLoop&&(!T&&!Z?(k(2),setTimeout(()=>tt.animationLoop&&W(),2500)):T&&!Z?(H(2),setTimeout(()=>tt.animationLoop&&W(),2500)):setTimeout(()=>tt.animationLoop&&W(),100))},$=function(){u(),E(F)},N=function(){E(F)};for(;ct.firstChild;)ct.removeChild(ct.firstChild);const rt=new Ne,X=new Fe(60,ct.clientWidth/ct.clientHeight,.1,1e3);X.position.set(0,20,50);const L=new je({antialias:!0});L.setPixelRatio(window.devicePixelRatio),L.setSize(ct.clientWidth,ct.clientHeight),L.setClearColor(1118481),ct.appendChild(L.domElement);const P=new qe(X,L.domElement);P.enableDamping=!0,P.dampingFactor=.05,P.autoRotate=!1,P.autoRotateSpeed=.5;const f={radius:22,ySpacing:4,numCircles:9,squareness:0,aspectRatio:1,sphereAmount:0,circleOffsetX:0,scaleRotationOffset:0,scaleRotationPower:1},S=200;let w=[];u();const D=new $t,R=new ae({color:6710886,side:Ve}),O={rotateX:0,rotateY:0,rotateZ:Math.PI,offsetX:16,offsetY:.4,scale:.03,tessellation:2};let U=[],F=[...me],z=[];const G=new ae({color:16711680}),at=new ze(.5,16,16);b();let T=!0,Z=!1;document.getElementById("btn-stretch")?.addEventListener("click",()=>k()),document.getElementById("btn-normal")?.addEventListener("click",()=>H());let B=!1;document.getElementById("btn-toggle")?.addEventListener("click",()=>{if(B=!B,B){let i=function(){B&&(!T&&!Z?(k(2),setTimeout(()=>B&&i(),2500)):T&&!Z?(H(2),setTimeout(()=>B&&i(),2500)):setTimeout(()=>B&&i(),100))};i()}});let st=0,Q=performance.now();const j={fps:0};I();const C=new Qt,tt={animationLoop:!1,toggleAnimation:function(){this.animationLoop=!this.animationLoop,this.animationLoop&&W()}},J=C.addFolder("Animation");J.add(tt,"animationLoop").name("Loop Animation").onChange(i=>{i&&W()}),J.open();const et=C.addFolder("Circle");et.add(f,"numCircles",1,100,1).name("Num Rings").onChange($),et.add(f,"radius",5,60,.1).name("Radius").onChange($),et.add(f,"ySpacing",1,10,.5).name("Y Spacing").onChange($),et.add(f,"squareness",0,1,.01).name("Squareness").onChange($),et.add(f,"aspectRatio",.25,4,.01).name("Aspect Ratio").onChange($),et.add(f,"circleOffsetX",0,10,.5).name("Ring Offset X").onChange($),et.add(f,"scaleRotationOffset",-4,4,.001).name("Scale Rot Offset").onChange($),et.add(f,"scaleRotationPower",.1,4,.01).name("Scale Rot Power").onChange($);const pt={scaleDownCircles:function(){const i=f.sphereAmount===0?1:0;St.to(f,{sphereAmount:i,duration:1.5,ease:"power2.inOut",onUpdate:()=>{u(),E(F)}})}};et.add(pt,"scaleDownCircles").name("Scale Down Circles"),et.open(),C.add(j,"fps").name("FPS").listen().disable();const mt=C.addFolder("Rotation");mt.add(O,"rotateX",-Math.PI,Math.PI,.01).name("Rotate X").onChange(N),mt.add(O,"rotateY",-Math.PI,Math.PI,.01).name("Rotate Y").onChange(N),mt.add(O,"rotateZ",-Math.PI,Math.PI,.01).name("Rotate Z").onChange(N),mt.open();const c=C.addFolder("Position");c.add(O,"offsetX",0,30,.1).name("Offset X").onChange(N),c.add(O,"offsetY",-2,2,.1).name("Offset Y").onChange(N),c.add(O,"scale",.01,.1,.001).name("Scale").onChange(N),C.addFolder("Quality").add(O,"tessellation",0,10,.1).name("Tessellation").onChange(N),window.addEventListener("resize",()=>{X.aspect=ct.clientWidth/ct.clientHeight,X.updateProjectionMatrix(),L.setSize(ct.clientWidth,ct.clientHeight)})}
