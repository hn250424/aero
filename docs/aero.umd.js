(function(r,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(r=typeof globalThis<"u"?globalThis:r||self,n(r.Aero={}))})(this,(function(r){"use strict";class n extends HTMLElement{shadow;constructor(t){super();const e=document.createElement("template");e.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}applyStyles(t){const e=document.createElement("style");e.textContent=t,this.shadow.appendChild(e)}}class h extends n{_input;_min;_max;_step;_decimalPlaces;constructor(t){super(t),this.initializeInput(),this.updateMinValue(this.getAttribute("min")),this.updateMaxValue(this.getAttribute("max")),this.updateStepValue(this.getAttribute("step"));const e=this.getAttribute("value")??"0";this._input.value=e}initializeInput(){this._input=this.query(this.getInputSelector()),this._input.addEventListener("focusout",()=>{const t=this.getValidateValue(this._input.value);this._input.value=t})}getValidateValue(t){return Math.min(Number(this._max),Math.max(Number(this._min),Math.round(Number(t)/Number(this._step))*Number(this._step))).toFixed(Number(this._decimalPlaces))}static get observedAttributes(){return["min","max","step"]}attributeChangedCallback(t,e,i){this.attributeHandlers[t]?.(i)}attributeHandlers={min:t=>{this.updateMinValue(t)},max:t=>{this.updateMaxValue(t)},step:t=>{this.updateStepValue(t)}};updateMinValue(t){this._min=t||"0"}updateMaxValue(t){this._max=t||"100"}updateStepValue(t){this._step=t||"1",this._decimalPlaces=this._step.toString().split(".")[1]?.length.toString()||"0"}get input(){return this._input}get value(){return this._input.value}set value(t){this._input.value=t}get min(){return this._min}set min(t){this.setAttribute("min",t)}get max(){return this._max}set max(t){this.setAttribute("max",t)}get step(){return this._step}set step(t){this.setAttribute("step",t)}get decimalPlaces(){return this._decimalPlaces}}const g=`<style>\r
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
<input id="input" type="number" />`;class u extends h{constructor(){super(g)}getInputSelector(){return"#input"}}customElements.define("aero-numeric-input",u);const c=`<style>
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
</div>`;class l extends h{minus;plus;constructor(){super(c),this.minus=this.query("#minus"),this.plus=this.query("#plus"),this.minus.addEventListener("click",this.decrement.bind(this)),this.plus.addEventListener("click",this.increment.bind(this)),this.updateButtonBackgrondColor(this.getAttribute("button-backgroundcolor")),this.updateMinuxText(this.getAttribute("text-minus")),this.updatePlusText(this.getAttribute("text-plus")),this.updateHeight(parseInt(getComputedStyle(this).height)),new ResizeObserver(e=>{for(const i of e){const s=i.contentRect.height;this.applyStyles(`#spinbox {
                        grid-template-columns: ${s}px 1fr ${s}px;
                    }`)}}).observe(this)}getInputSelector(){return"#input"}static get observedAttributes(){return[...super.observedAttributes,"text-minus","text-plus","button-backgroundcolor"]}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),this.attributetHandlers[t]?.(i)}attributetHandlers={"text-minus":t=>{this.updateMinuxText(t)},"text-plus":t=>{this.updatePlusText(t)},"button-backgroundcolor":t=>{this.updateButtonBackgrondColor(t)}};updateMinuxText(t){this.minus.textContent=t||"-"}updatePlusText(t){this.plus.textContent=t||"+"}updateButtonBackgrondColor(t){this.applyStyles(`#spinbox > button { 
                background-color: ${t||"#ccc"};
            }`)}updateHeight(t){t=t||30,this.applyStyles(`#spinbox {
                grid-template-columns: ${t}px 1fr ${t}px;
            }`)}set buttonBackgroundColor(t){this.setAttribute("button-backgroundcolor",t)}set minusText(t){this.setAttribute("text-minus",t)}set plusText(t){this.setAttribute("text-plus",t)}decrement(){const t=Number(this.input.value)-Number(this.step);this.input.value=this.getValidateValue(t.toString())}increment(){let t=Number(this.input.value)+Number(this.step);this.input.value=this.getValidateValue(t.toString())}}customElements.define("aero-spinbox",l);class m extends n{containerBackgroundColor;spinnerBackgroundColor;spinnerColor;constructor(t){super(t),this.containerBackgroundColor=this.getAttribute("container-background")??"rgba(0, 0, 0, 0.5)",this.spinnerBackgroundColor=this.getAttribute("spinner-background")??"white",this.spinnerColor=this.getAttribute("spinner-color")??"black";const e=this.query(".container");e.style.background=this.containerBackgroundColor;const i=this.query(".spinner");i.style.border=`5px solid ${this.spinnerBackgroundColor}`,i.style.borderTop=`5px solid ${this.spinnerColor}`}}const b=`<style>\r
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
</div>`;class d extends m{constructor(){super(b)}}customElements.define("aero-progress-spinner",d);class x extends n{_topResizer;_bottomResizer;_leftResizer;_rightResizer;_hasTopResizer;_hasBottomResizer;_hasLeftResizer;_hasRightResizer;_nMinWidth;_nMaxWidth;_nMinHeight;_nMaxHeight;isTopDragging=!1;isBottomDragging=!1;isLeftDragging=!1;isRightDragging=!1;isDragging=!1;animationFrameId=null;resizerHandlers={top:t=>this.processMousedownEvent(t,"top"),bottom:t=>this.processMousedownEvent(t,"bottom"),left:t=>this.processMousedownEvent(t,"left"),right:t=>this.processMousedownEvent(t,"right")};constructor(t){super(t),this._topResizer=this.query("#top"),this._bottomResizer=this.query("#bottom"),this._leftResizer=this.query("#left"),this._rightResizer=this.query("#right"),this.updateMinWidthValue(this.getAttribute("min-width")),this.updateMaxWidthValue(this.getAttribute("max-width")),this.updateMinHeightValue(this.getAttribute("min-height")),this.updateMaxHeightValue(this.getAttribute("max-height")),this.updateTopResizerState(this.hasAttribute("resize-top")),this.updateBottomResizerState(this.hasAttribute("resize-bottom")),this.updateLeftResizerState(this.hasAttribute("resize-left")),this.updateRightResizerState(this.hasAttribute("resize-right")),document.addEventListener("mousemove",e=>{this.isDragging&&(this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animationFrameId=requestAnimationFrame(()=>{const i=this.getBoundingClientRect();if(this.isTopDragging){const s=i.bottom-e.clientY,a=Math.min(Math.max(s,this._nMinHeight),this._nMaxHeight);this.style.height=`${a}px`}else if(this.isBottomDragging){const s=e.clientY-i.top,a=Math.min(Math.max(s,this._nMinHeight),this._nMaxHeight);this.style.height=`${a}px`}else if(this.isLeftDragging){const s=i.right-e.clientX,a=Math.min(Math.max(s,this._nMinWidth),this._nMaxWidth);this.style.width=`${a}px`}else if(this.isRightDragging){const s=e.clientX-i.left,a=Math.min(Math.max(s,this._nMinWidth),this._nMaxWidth);this.style.width=`${a}px`}}))}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),document.body.style.cursor="default",document.body.style.userSelect="auto",this.isDragging=!1,this.isTopDragging=!1,this.isBottomDragging=!1,this.isLeftDragging=!1,this.isRightDragging=!1)})}processMousedownEvent=(t,e)=>{switch(t.preventDefault(),document.body.style.userSelect="none",this.isDragging=!0,e){case"top":this.isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this.isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this.isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this.isRightDragging=!0,document.body.style.cursor="ew-resize";break}};static get observedAttributes(){return["min-width","max-width","min-height","max-height","resize-top","resize-bottom","resize-left","resize-right","resizer-color"]}attributeChangedCallback(t,e,i){this.attributeHandlers[t]?.(i)}attributeHandlers={"min-width":t=>{this.updateMinWidthValue(t)},"max-width":t=>{this.updateMaxWidthValue(t)},"min-height":t=>{this.updateMinHeightValue(t)},"max-height":t=>{this.updateMaxHeightValue(t)},"resize-top":t=>{this.updateTopResizerState(t!==null)},"resize-bottom":t=>{this.updateBottomResizerState(t!==null)},"resize-left":t=>{this.updateLeftResizerState(t!==null)},"resize-right":t=>{this.updateRightResizerState(t!==null)},"resizer-color":t=>{const e=t??"#ccc";this.applyStyles(`.resizer:hover { background-color: ${e}; }`)}};updateTopResizerState(t){this._hasTopResizer=t||!1,this._hasTopResizer?(this._topResizer.style.display="block",this._topResizer.addEventListener("mousedown",this.resizerHandlers.top)):(this._topResizer.style.display="none",this._topResizer.removeEventListener("mousedown",this.resizerHandlers.top))}updateBottomResizerState(t){this._hasBottomResizer=t||!1,this._hasBottomResizer?(this._bottomResizer.style.display="block",this._bottomResizer.addEventListener("mousedown",this.resizerHandlers.bottom)):(this._bottomResizer.style.display="none",this._bottomResizer.removeEventListener("mousedown",this.resizerHandlers.bottom))}updateLeftResizerState(t){this._hasLeftResizer=t||!1,this._hasLeftResizer?(this._leftResizer.style.display="block",this._leftResizer.addEventListener("mousedown",this.resizerHandlers.left)):(this._leftResizer.style.display="none",this._leftResizer.removeEventListener("mousedown",this.resizerHandlers.left))}updateRightResizerState(t){this._hasRightResizer=t||!1,this._hasRightResizer?(this._rightResizer.style.display="block",this._rightResizer.addEventListener("mousedown",this.resizerHandlers.right)):(this._rightResizer.style.display="none",this._rightResizer.removeEventListener("mousedown",this.resizerHandlers.right))}updateMinWidthValue(t){this._nMinWidth=t?Number(t):0}updateMaxWidthValue(t){this._nMaxWidth=t?Number(t):2e3}updateMinHeightValue(t){this._nMinHeight=t?Number(t):0}updateMaxHeightValue(t){this._nMaxHeight=t?Number(t):2e3}set resizerColor(t){this.setAttribute("resizer-color",t)}get minWidth(){return this._nMinWidth.toString()}set minWidth(t){this.setAttribute("min-width",t)}get maxWidth(){return this._nMaxWidth.toString()}set maxWidth(t){this.setAttribute("max-width",t)}get minHeight(){return this._nMinHeight.toString()}set minHeight(t){this.setAttribute("min-height",t)}get maxHeight(){return this._nMaxHeight.toString()}set maxHeight(t){this.setAttribute("max-height",t)}addTopResizer(){this.setAttribute("resize-top","")}removeTopResizer(){this.removeAttribute("resize-top")}addBottomResizer(){this.setAttribute("resize-bottom","")}removeBottomResizer(){this.removeAttribute("resize-bottom")}addLeftResizer(){this.setAttribute("resize-left","")}removeLeftResizer(){this.removeAttribute("resize-left")}addRightResizer(){this.setAttribute("resize-right","")}removeRightResizer(){this.removeAttribute("resize-right")}}const z=`<style>\r
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
<div id="right" class="resizer horizontal"></div>`;class p extends x{constructor(t){super(z,t)}}customElements.define("aero-resize-box",p),r.AeroNumericInput=u,r.AeroProgressSpinner=d,r.AeroResizeBox=p,r.AeroSpinbox=l,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));
