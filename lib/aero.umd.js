(function(o,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(o=typeof globalThis<"u"?globalThis:o||self,u(o.Aero={}))})(this,(function(o){"use strict";class u extends HTMLElement{shadow;constructor(t){super();const e=document.createElement("template");e.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}applyStyles(t){const e=document.createElement("style");e.textContent=t,this.shadow.appendChild(e)}}class d extends u{_input;_min;_max;_step;_decimalPlaces;constructor(t){super(t),this.initializeInput(),this._min=Number(this.getAttribute("min")??0),this._max=Number(this.getAttribute("max")??100),this._step=Number(this.getAttribute("step")??1),this._decimalPlaces=this._step.toString().split(".")[1]?.length||0;const e=Number(this.getAttribute("value")??0);this._input.value=e.toString()}initializeInput(){this._input=this.query(this.getInputSelector()),this._input.addEventListener("focusout",()=>{const t=this.getValidateValue(Number(this._input.value));this._input.value=t})}getValidateValue(t){return t=Math.min(this._max,Math.max(this._min,Math.round(t/this._step)*this._step)),t.toFixed(this._decimalPlaces)}static get observedAttributes(){return["min","max","step"]}attributeChangedCallback(t,e,n){const s=Number(n);({min:()=>{this._min=s},max:()=>{this._max=s},step:()=>{this._step=s,this._decimalPlaces=this._step.toString().split(".")[1]?.length||0}})[t]?.()}get input(){return this._input}get value(){return Number(this._input.value)}set value(t){this._input.value=t.toString()}get min(){return this._min}set min(t){this.setAttribute("min",t.toString())}get max(){return this._max}set max(t){this.setAttribute("max",t.toString())}get step(){return this._step}set step(t){this.setAttribute("step",t.toString())}get decimalPlaces(){return this._decimalPlaces}}const x=`<style>\r
    :host {\r
        border: 1px solid #ccc;\r
        display: block;\r
\r
        width: 100px;\r
        height: 30px;\r
    }\r
\r
    #input {\r
        width: 100%;\r
        height: 100%;\r
        padding: 0;\r
        border: none;\r
        \r
        text-align: inherit;\r
        font-size: inherit;\r
        color: inherit;\r
    }\r
\r
    #input:focus { outline: none; }\r
    #input::-webkit-inner-spin-button { appearance: none; }\r
</style>\r
\r
<input id="input" type="number" />`;class c extends d{constructor(){super(x)}getInputSelector(){return"#input"}}customElements.define("aero-numeric-input",c);const f=`<style>
    :host {
        border: 1px solid #ccc;
        display: block;

        width: 130px;
        height: 30px;
    }

    #spinbox {
        display: grid;
    }

    #spinbox,
    #spinbox > * {
        width: 100%;
        height: 100%;
        border: none;
        font-size: inherit;
        color: inherit;
    }

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
</div>`;class g extends d{minus;plus;constructor(){super(f),this.minus=this.query("#minus"),this.plus=this.query("#plus"),this.minus.addEventListener("click",this.decrement.bind(this)),this.plus.addEventListener("click",this.increment.bind(this));const t=this.getAttribute("button-backgroundColor")||"#ccc",e=this.getAttribute("text-minus")||"-",n=this.getAttribute("text-plus")||"+",s=getComputedStyle(this),i=parseInt(s.height)||30;this.minus.textContent=e,this.plus.textContent=n,this.applyStyles(`#spinbox {
                grid-template-columns: ${i}px 1fr ${i}px;
            }
            
            #spinbox > button { 
                background-color: ${t};
            }`),new ResizeObserver(r=>{for(const w of r){const b=w.contentRect.height;this.applyStyles(`#spinbox {
                        grid-template-columns: ${b}px 1fr ${b}px;
                    }`)}}).observe(this),new MutationObserver(()=>{const r=this.getAttribute("button-backgroundColor")||"#ccc";this.minus.style.backgroundColor=r,this.plus.style.backgroundColor=r}).observe(this,{attributes:!0})}getInputSelector(){return"#input"}static get observedAttributes(){return[...super.observedAttributes,"text-minus","text-plus","button-backgroundColor"]}attributeChangedCallback(t,e,n){super.attributeChangedCallback(t,e,n),{"text-minus":()=>{this.minus.textContent=n},"text-plus":()=>{this.plus.textContent=n}}[t]?.()}setButtonBackgroundColor(t){this.setAttribute("button-backgroundColor",t)}setMinusText(t){this.setAttribute("text-minus",t)}setPlusText(t){this.setAttribute("text-plus",t)}decrement(){let t=Number(this.input.value)-this.step;this.input.value=this.getValidateValue(t)}increment(){let t=Number(this.input.value)+this.step;this.input.value=this.getValidateValue(t)}}customElements.define("aero-spinbox",g);class y extends u{containerBackgroundColor;spinnerBackgroundColor;spinnerColor;constructor(t){super(t),this.containerBackgroundColor=this.getAttribute("container-background")??"rgba(0, 0, 0, 0.5)",this.spinnerBackgroundColor=this.getAttribute("spinner-background")??"white",this.spinnerColor=this.getAttribute("spinner-color")??"black";const e=this.query(".container");e.style.background=this.containerBackgroundColor;const n=this.query(".spinner");n.style.border=`5px solid ${this.spinnerBackgroundColor}`,n.style.borderTop=`5px solid ${this.spinnerColor}`}}const _=`<style>\r
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
</div>`;class p extends y{constructor(){super(_)}}customElements.define("aero-progress-spinner",p);class v extends u{_topResizer;_bottomResizer;_leftResizer;_rightResizer;top;bottom;left;right;_minWidth;_maxWidth;_minHeight;_maxHeight;isTopDragging=!1;isBottomDragging=!1;isLeftDragging=!1;isRightDragging=!1;isDragging=!1;animationFrameId=null;constructor(t,e){super(t);const n=(i,h)=>{switch(i.preventDefault(),document.body.style.userSelect="none",this.isDragging=!0,h){case"top":this.isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this.isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this.isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this.isRightDragging=!0,document.body.style.cursor="ew-resize";break}},s=getComputedStyle(this);this._minHeight=parseInt(s.minHeight)||0,this._maxHeight=parseInt(s.maxHeight)||1/0,this._minWidth=parseInt(s.minWidth)||0,this._maxWidth=parseInt(s.maxWidth)||1/0,this._topResizer=this.query("#top"),this._bottomResizer=this.query("#bottom"),this._leftResizer=this.query("#left"),this._rightResizer=this.query("#right"),this.top=e?.top??this.hasAttribute("resize-top"),this.bottom=e?.bottom??this.hasAttribute("resize-bottom"),this.left=e?.left??this.hasAttribute("resize-left"),this.right=e?.right??this.hasAttribute("resize-right"),!this.top&&!this.bottom&&!this.left&&!this.right&&(this.right=!0),this.top||(this._topResizer.style.display="none"),this.bottom||(this._bottomResizer.style.display="none"),this.left||(this._leftResizer.style.display="none"),this.right||(this._rightResizer.style.display="none"),this.top&&this._topResizer.addEventListener("mousedown",i=>n(i,"top")),this.bottom&&this._bottomResizer.addEventListener("mousedown",i=>n(i,"bottom")),this.left&&this._leftResizer.addEventListener("mousedown",i=>n(i,"left")),this.right&&this._rightResizer.addEventListener("mousedown",i=>n(i,"right")),document.addEventListener("mousemove",i=>{this.isDragging&&(this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animationFrameId=requestAnimationFrame(()=>{const h=this.getBoundingClientRect();if(this.isTopDragging){const a=h.bottom-i.clientY,r=Math.min(Math.max(a,this._minHeight),this._maxHeight);this.style.height=`${r}px`}else if(this.isBottomDragging){const a=i.clientY-h.top,r=Math.min(Math.max(a,this._minHeight),this._maxHeight);this.style.height=`${r}px`}else if(this.isLeftDragging){const a=h.right-i.clientX,r=Math.min(Math.max(a,this._minWidth),this._maxWidth);this.style.width=`${r}px`}else if(this.isRightDragging){const a=i.clientX-h.left,r=Math.min(Math.max(a,this._minWidth),this._maxWidth);this.style.width=`${r}px`}}))}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),document.body.style.cursor="default",document.body.style.userSelect="auto",this.isDragging=!1,this.isTopDragging=!1,this.isBottomDragging=!1,this.isLeftDragging=!1,this.isRightDragging=!1)})}static get observedAttributes(){return["min-width","max-width","min-height","max-height","resizer-color"]}attributeChangedCallback(t,e,n){const s=Number(n);({"min-width":()=>{this._minWidth=s},"max-width":()=>{this._maxWidth=s},"min-height":()=>{this._minHeight=s},"max-height":()=>{this._maxHeight=s},"resizer-color":()=>{const h=n??"#ccc";this.applyStyles(`.resizer:hover { background-color: ${h}; }`)}})[t]?.()}setResizerColor(t){this.setAttribute("resizer-color",t)}get minWidth(){return this._minWidth}set minWidth(t){this.setAttribute("min-width",t.toString())}get maxWidth(){return this._maxWidth}set maxWidth(t){this.setAttribute("max-width",t.toString())}get minHeight(){return this._minHeight}set minHeight(t){this.setAttribute("min-height",t.toString())}get maxHeight(){return this._maxHeight}set maxHeight(t){this.setAttribute("max-height",t.toString())}}const z=`<style>\r
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
<div id="right" class="resizer horizontal"></div>`;class m extends v{constructor(t){super(z,t)}}customElements.define("aero-resize-box",m),o.NumericInput=c,o.ProgressSpinner=p,o.ResizeBox=m,o.Spinbox=g,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));
