(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();class u extends HTMLElement{shadow;constructor(t){super();const n=document.createElement("template");n.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(n.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}applyStyles(t){const n=document.createElement("style");n.textContent=t,this.shadow.appendChild(n)}}class d extends u{_input;_min;_max;_step;_decimalPlaces;constructor(t){super(t),this.initializeInput(),this._min=Number(this.getAttribute("min")??0),this._max=Number(this.getAttribute("max")??100),this._step=Number(this.getAttribute("step")??1),this._decimalPlaces=this._step.toString().split(".")[1]?.length||0}initializeInput(){this._input=this.query(this.getInputSelector()),this._input.addEventListener("focusout",()=>{const t=this.getValidateValue(Number(this._input.value));this._input.value=t})}getValidateValue(t){return t=Math.min(this._max,Math.max(this._min,Math.round(t/this._step)*this._step)),t.toFixed(this._decimalPlaces)}static get observedAttributes(){return["min","max","step"]}attributeChangedCallback(t,n,s){const e=Number(s);({min:()=>{this._min=e},max:()=>{this._max=e},step:()=>{this._step=e,this._decimalPlaces=this._step.toString().split(".")[1]?.length||0}})[t]?.()}get input(){return this._input}get min(){return this._min}set min(t){this.setAttribute("min",t.toString())}get max(){return this._max}set max(t){this.setAttribute("max",t.toString())}get step(){return this._step}set step(t){this.setAttribute("step",t.toString())}get decimalPlaces(){return this._decimalPlaces}}const b=`<style>\r
    #input {\r
        width: 100%;\r
        height: 100%;\r
\r
        text-align: center;\r
        border: none;\r
\r
        padding: 0;\r
    }\r
\r
    #input:focus { outline: none; }\r
    #input::-webkit-inner-spin-button { appearance: none; }\r
</style>\r
\r
<input id="input" type="number" />`;class c extends d{constructor(){super(b);const t=this.getAttribute("font-size")||"1rem",n=this.getAttribute("font-color")||"black";this.applyStyles(`#input {
                font-size: ${t};
                color: ${n};
            }`)}getInputSelector(){return"#input"}}customElements.define("aero-numeric-input",c);const f=`<style>
    #spinbox {
        width: 100%;
        height: 100%;
        display: grid;
    }

    #spinbox > * { width: 100%; height: 100%; border: none; }
    #spinbox > button { cursor: pointer; }

    #input {
        padding: 0;
        text-align: center;
    }

    #input:focus { outline: none; }
    #input::-webkit-inner-spin-button { appearance: none; }
</style>

<div id="spinbox">
    <button id="minus">-</button>
    <input id="input" type="number">
    <button id="plus">+</button>
</div>`;class x extends d{minus;plus;constructor(){super(f),this.minus=this.query("#minus"),this.plus=this.query("#plus"),this.minus.addEventListener("click",this.decrement.bind(this)),this.plus.addEventListener("click",this.increment.bind(this));const t=this.getAttribute("font-size")||"1rem",n=this.getAttribute("font-color")||"black",s=this.getAttribute("button-backgroundColor")||"#ccc",e=this.getAttribute("text-minus")||"-",i=this.getAttribute("text-plus")||"+",r=getComputedStyle(this),o=parseInt(r.height)||30;this.minus.textContent=e,this.plus.textContent=i,this.applyStyles(`#spinbox {
                grid-template-columns: ${o}px 1fr ${o}px;
            }
            
            #spinbox > * {
                font-size: ${t};
                color: ${n};
            }

            #spinbox > button { 
                background-color: ${s};
            
            }`)}getInputSelector(){return"#input"}decrement(){let t=Number(this.input.value)-this.step;t=Math.max(Number(this.min),parseFloat(t.toFixed(this.decimalPlaces))),this.updateValue(t)}increment(){let t=Number(this.input.value)+this.step;t=Math.min(Number(this.max),parseFloat(t.toFixed(this.decimalPlaces))),this.updateValue(t)}updateValue(t){const n=parseFloat(t.toFixed(this.decimalPlaces));this.input.value=n.toString()}}customElements.define("aero-spinbox",x);class y extends u{containerBackgroundColor;spinnerBackgroundColor;spinnerColor;constructor(t){super(t),this.containerBackgroundColor=this.getAttribute("container-background")??"rgba(0, 0, 0, 0.5)",this.spinnerBackgroundColor=this.getAttribute("spinner-background")??"white",this.spinnerColor=this.getAttribute("spinner-color")??"black";const n=this.query(".container");n.style.background=this.containerBackgroundColor;const s=this.query(".spinner");s.style.border=`5px solid ${this.spinnerBackgroundColor}`,s.style.borderTop=`5px solid ${this.spinnerColor}`}}const _=`<style>\r
    .container {\r
        display: flex;\r
        justify-content: center;\r
        align-items: center;\r
        position: fixed;\r
        top: 0;\r
        left: 0;\r
        width: 100%;\r
        height: 100%;\r
        /* background-color: rgba(0, 0, 0, 0.5); */\r
        background-color: transparent;\r
        z-index: 99;\r
    }\r
\r
    .spinner {\r
        width: 50px;\r
        height: 50px;\r
        border: 5px solid white;\r
        border-top: 5px solid black;\r
        border-radius: 50%;\r
        animation: spin 2s linear infinite;\r
    }\r
\r
    @keyframes spin {\r
        0% {\r
            transform: rotate(0deg);\r
        }\r
\r
        100% {\r
            transform: rotate(360deg);\r
        }\r
    }\r
</style>\r
\r
<div class="container">\r
    <div class="spinner"></div>\r
</div>`;class w extends y{constructor(){super(_)}}customElements.define("aero-progress-spinner",w);class z extends u{_topResizer;_bottomResizer;_leftResizer;_rightResizer;top;bottom;left;right;_minWidth;_maxWidth;_minHeight;_maxHeight;isTopDragging=!1;isBottomDragging=!1;isLeftDragging=!1;isRightDragging=!1;isDragging=!1;animationFrameId=null;constructor(t,n){super(t);const s=this.getAttribute("resizer-color")??"#ccc";this.applyStyles(`.resizer:hover {
                background-color: ${s};
            }`);const e=getComputedStyle(this);this._minHeight=parseInt(e.minHeight)||0,this._maxHeight=parseInt(e.maxHeight)||1/0,this._minWidth=parseInt(e.minWidth)||0,this._maxWidth=parseInt(e.maxWidth)||1/0,this._topResizer=this.query("#top"),this._bottomResizer=this.query("#bottom"),this._leftResizer=this.query("#left"),this._rightResizer=this.query("#right"),this.top=n?.top??this.hasAttribute("resize-top"),this.bottom=n?.bottom??this.hasAttribute("resize-bottom"),this.left=n?.left??this.hasAttribute("resize-left"),this.right=n?.right??this.hasAttribute("resize-right"),!this.top&&!this.bottom&&!this.left&&!this.right&&(this.right=!0),this.top||(this._topResizer.style.display="none"),this.bottom||(this._bottomResizer.style.display="none"),this.left||(this._leftResizer.style.display="none"),this.right||(this._rightResizer.style.display="none"),this.top&&this._topResizer.addEventListener("mousedown",i=>this.processMousedownEvent(i,"top")),this.bottom&&this._bottomResizer.addEventListener("mousedown",i=>this.processMousedownEvent(i,"bottom")),this.left&&this._leftResizer.addEventListener("mousedown",i=>this.processMousedownEvent(i,"left")),this.right&&this._rightResizer.addEventListener("mousedown",i=>this.processMousedownEvent(i,"right")),document.addEventListener("mousemove",i=>{this.isDragging&&(this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animationFrameId=requestAnimationFrame(()=>{const r=this.getBoundingClientRect();if(this.isTopDragging){const o=r.bottom-i.clientY,h=Math.min(Math.max(o,this._minHeight),this._maxHeight);this.style.height=`${h}px`}else if(this.isBottomDragging){const o=i.clientY-r.top,h=Math.min(Math.max(o,this._minHeight),this._maxHeight);this.style.height=`${h}px`}else if(this.isLeftDragging){const o=r.right-i.clientX,h=Math.min(Math.max(o,this._minWidth),this._maxWidth);this.style.width=`${h}px`}else if(this.isRightDragging){const o=i.clientX-r.left,h=Math.min(Math.max(o,this._minWidth),this._maxWidth);this.style.width=`${h}px`}}))}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),document.body.style.cursor="default",document.body.style.userSelect="auto",this.isDragging=!1,this.isTopDragging=!1,this.isBottomDragging=!1,this.isLeftDragging=!1,this.isRightDragging=!1)})}processMousedownEvent(t,n){switch(t.preventDefault(),document.body.style.userSelect="none",this.isDragging=!0,n){case"top":this.isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this.isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this.isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this.isRightDragging=!0,document.body.style.cursor="ew-resize";break}}static get observedAttributes(){return["min-width","max-width","min-height","max-height"]}attributeChangedCallback(t,n,s){const e=Number(s);({"min-width":()=>{this._minWidth=e},"max-width":()=>{this._maxWidth=e},"min-height":()=>{this._minHeight=e},"max-height":()=>{this._maxHeight=e}})[t]?.()}get minWidth(){return this._minWidth}set minWidth(t){this.setAttribute("min-width",t.toString())}get maxWidth(){return this._maxWidth}set maxWidth(t){this.setAttribute("max-width",t.toString())}get minHeight(){return this._minHeight}set minHeight(t){this.setAttribute("min-height",t.toString())}get maxHeight(){return this._maxHeight}set maxHeight(t){this.setAttribute("max-height",t.toString())}}const v=`<style>\r
    :host {\r
        position: relative;\r
    }\r
\r
    .resizer {\r
        position: absolute;\r
        background-color: transparent;\r
        transition: background-color 0.3s ease;\r
    }\r
\r
    .horizontal {\r
        width: 3px;\r
        height: 100%;\r
        cursor: ew-resize;\r
    }\r
\r
    .vertical {\r
        width: 100%;\r
        height: 3px;\r
        cursor: ns-resize;\r
    }\r
\r
    #top {\r
        left: 0;\r
        top: 0;\r
    }\r
\r
    #bottom {\r
        left: 0;\r
        bottom: 0;\r
    }\r
\r
    #left {\r
        top: 0;\r
        left: 0;\r
    }\r
\r
    #right {\r
        top: 0;\r
        right: 0;\r
    }\r
</style>\r
\r
<slot></slot>\r
<div id="top" class="resizer vertical"></div>\r
<div id="bottom" class="resizer vertical"></div>\r
<div id="left" class="resizer horizontal"></div>\r
<div id="right" class="resizer horizontal"></div>`;class m extends z{constructor(t){super(v,t)}}customElements.define("aero-resize-box",m);const p=document.getElementById("dynamic-container"),l=new c;p?.appendChild(l);l.style.height="10px";l.step=2;setTimeout(()=>{l.step=.2},1e4);const g=new m;p?.appendChild(g);setTimeout(()=>{g.minWidth=40},3e3);
