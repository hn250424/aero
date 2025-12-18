(function(r,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(r=typeof globalThis<"u"?globalThis:r||self,n(r.Aero={}))})(this,(function(r){"use strict";class n extends HTMLElement{shadow;constructor(t){super();const e=document.createElement("template");e.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}applyStyles(t){const e=document.createElement("style");e.textContent=t,this.shadow.appendChild(e)}forwardNativeEvent(t){this.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}forwardCustomEvent(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e?.detail,bubbles:!0,composed:!0}))}}class a extends n{_input;_value;_min;_max;_step;_decimalPlaces;constructor(t){super(t),this.initializeInput(),this.dispatchInputEvents(),this.updateInputValue(this.getAttribute("value")),this.updateMinValue(this.getAttribute("min")),this.updateMaxValue(this.getAttribute("max")),this.updateStepValue(this.getAttribute("step"))}initializeInput(){this._input=this.query(this.getInputSelector())}getValidateValue(t){return Math.min(Number(this._max),Math.max(Number(this._min),Math.round(Number(t)/Number(this._step))*Number(this._step))).toFixed(Number(this._decimalPlaces))}dispatchInputEvents(){this._input.addEventListener("input",()=>{this.forwardNativeEvent("input")}),this._input.addEventListener("change",()=>{this.forwardNativeEvent("change")}),this._input.addEventListener("focusin",()=>{this.forwardNativeEvent("focusin")}),this._input.addEventListener("focusout",()=>{const t=this.getValidateValue(this._input.value);this.value=t,this.forwardNativeEvent("focusout")})}static get observedAttributes(){return["value","min","max","step"]}attributeChangedCallback(t,e,i){this.baseAeroNumericInputAttributeHandlers[t]?.(i)}baseAeroNumericInputAttributeHandlers={value:t=>{this.updateInputValue(t)},min:t=>{this.updateMinValue(t)},max:t=>{this.updateMaxValue(t)},step:t=>{this.updateStepValue(t)}};updateInputValue(t){this._value=t?this.getValidateValue(t):"0",this._input.value=this._value}updateMinValue(t){this._min=t||"0"}updateMaxValue(t){this._max=t||"100"}updateStepValue(t){this._step=t||"1",this._decimalPlaces=this._step.toString().split(".")[1]?.length.toString()||"0"}get input(){return this._input}get value(){return this._value}set value(t){this.setAttribute("value",t)}get min(){return this._min}set min(t){this.setAttribute("min",t)}get max(){return this._max}set max(t){this.setAttribute("max",t)}get step(){return this._step}set step(t){this.setAttribute("step",t)}get decimalPlaces(){return this._decimalPlaces}}const p=`<style>\r
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
	#input:focus {\r
		outline: none;\r
	}\r
	#input::-webkit-inner-spin-button {\r
		appearance: none;\r
	}\r
</style>\r
\r
<input id="input" type="number" />\r
`;class h extends a{constructor(){super(p)}getInputSelector(){return"#input"}}customElements.define("aero-numeric-input",h);const g=`<style>\r
	:host {\r
		border: 1px solid #ccc;\r
		display: block;\r
\r
		width: 130px;\r
		height: 30px;\r
	}\r
\r
	#spinbox {\r
		display: grid;\r
	}\r
\r
	#spinbox,\r
	#spinbox > * {\r
		width: 100%;\r
		height: 100%;\r
		border: none;\r
		font-size: inherit;\r
		color: inherit;\r
	}\r
\r
	#spinbox > button {\r
		cursor: pointer;\r
	}\r
\r
	#input {\r
		padding: 0;\r
		text-align: center;\r
	}\r
\r
	#input:focus {\r
		outline: none;\r
	}\r
	#input::-webkit-inner-spin-button {\r
		appearance: none;\r
	}\r
</style>\r
\r
<div id="spinbox">\r
	<button id="minus">-</button>\r
	<input id="input" type="number" />\r
	<button id="plus">+</button>\r
</div>\r
`;class u extends a{minus;plus;constructor(){super(g),this.minus=this.query("#minus"),this.plus=this.query("#plus"),this.minus.addEventListener("click",this.decrement.bind(this)),this.plus.addEventListener("click",this.increment.bind(this)),this.updateButtonBackgrondColor(this.getAttribute("button-backgroundcolor")),this.updateMinuxText(this.getAttribute("minus-text")),this.updatePlusText(this.getAttribute("plus-text")),this.updateHeight(parseInt(getComputedStyle(this).height)),new ResizeObserver(e=>{for(const i of e){const s=i.contentRect.height;this.applyStyles(`#spinbox {
						grid-template-columns: ${s}px 1fr ${s}px;
					}`)}}).observe(this)}getInputSelector(){return"#input"}static get observedAttributes(){return[...super.observedAttributes,"minus-text","plus-text","button-backgroundcolor"]}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),this.aeroSpinboxAttributeHandlers[t]?.(i)}aeroSpinboxAttributeHandlers={"minus-text":t=>{this.updateMinuxText(t)},"plus-text":t=>{this.updatePlusText(t)},"button-backgroundcolor":t=>{this.updateButtonBackgrondColor(t)}};updateMinuxText(t){this.minus.textContent=t||"-"}updatePlusText(t){this.plus.textContent=t||"+"}updateButtonBackgrondColor(t){this.applyStyles(`#spinbox > button {
				background-color: ${t||"#ccc"};
			}`)}updateHeight(t){t=t||30,this.applyStyles(`#spinbox {
				grid-template-columns: ${t}px 1fr ${t}px;
			}`)}set buttonBackgroundColor(t){this.setAttribute("button-backgroundcolor",t)}set minusText(t){this.setAttribute("minus-text",t)}set plusText(t){this.setAttribute("plus-text",t)}decrement(){const t=Number(this.input.value)-Number(this.step);this.value=this.getValidateValue(t.toString())}increment(){const t=Number(this.input.value)+Number(this.step);this.value=this.getValidateValue(t.toString())}}customElements.define("aero-spinbox",u);const c=`<style>\r
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
`;class d extends n{constructor(){super(c),this.updateSpinnerStyles()}static get observedAttributes(){return["width","height","background","color","cycle"]}attributeChangedCallback(t,e,i){this.updateSpinnerStyles()}updateSpinnerStyles(){const t=this.getAttribute("width")||"50",e=this.getAttribute("height")||"50",i=this.getAttribute("background")||"white",s=this.getAttribute("color")||"black",b=this.getAttribute("cycle")||"1";this.applyStyles(`
			:host {
					width: ${t}px;
					height: ${e}px;
					border: 5px solid ${i};
					border-top-color: ${s};
					border-radius: 50%;
					animation: spin ${b}s linear infinite;
					box-sizing: border-box;
			}

			@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
			}
		`)}set width(t){this.setAttribute("width",t)}set height(t){this.setAttribute("height",t)}set background(t){this.setAttribute("background",t)}set color(t){this.setAttribute("color",t)}set cycle(t){this.setAttribute("cycle",t)}}customElements.define("aero-progress-spinner",d);const m=`<style>\r
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
<div id="right" class="resizer horizontal"></div>\r
`;class l extends n{_topResizer;_bottomResizer;_leftResizer;_rightResizer;_hasTopResizer;_hasBottomResizer;_hasLeftResizer;_hasRightResizer;_nMinWidth;_nMaxWidth;_nMinHeight;_nMaxHeight;isTopDragging=!1;isBottomDragging=!1;isLeftDragging=!1;isRightDragging=!1;isDragging=!1;animationFrameId=null;resizerHandlers={top:t=>this.processMousedownEvent(t,"top"),bottom:t=>this.processMousedownEvent(t,"bottom"),left:t=>this.processMousedownEvent(t,"left"),right:t=>this.processMousedownEvent(t,"right")};constructor(){super(m),this._topResizer=this.query("#top"),this._bottomResizer=this.query("#bottom"),this._leftResizer=this.query("#left"),this._rightResizer=this.query("#right"),this.updateMinWidthValue(this.getAttribute("min-width")),this.updateMaxWidthValue(this.getAttribute("max-width")),this.updateMinHeightValue(this.getAttribute("min-height")),this.updateMaxHeightValue(this.getAttribute("max-height")),this.updateTopResizerState(this.hasAttribute("resize-top")),this.updateBottomResizerState(this.hasAttribute("resize-bottom")),this.updateLeftResizerState(this.hasAttribute("resize-left")),this.updateRightResizerState(this.hasAttribute("resize-right")),document.addEventListener("mousemove",t=>{this.isDragging&&(this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),this.animationFrameId=requestAnimationFrame(()=>{const e=this.getBoundingClientRect();if(this.isTopDragging){const i=e.bottom-t.clientY,s=Math.min(Math.max(i,this._nMinHeight),this._nMaxHeight);this.style.height=`${s}px`,this.emitResize(null,s)}else if(this.isBottomDragging){const i=t.clientY-e.top,s=Math.min(Math.max(i,this._nMinHeight),this._nMaxHeight);this.style.height=`${s}px`,this.emitResize(null,s)}else if(this.isLeftDragging){const i=e.right-t.clientX,s=Math.min(Math.max(i,this._nMinWidth),this._nMaxWidth);this.style.width=`${s}px`,this.emitResize(s,null)}else if(this.isRightDragging){const i=t.clientX-e.left,s=Math.min(Math.max(i,this._nMinWidth),this._nMaxWidth);this.style.width=`${s}px`,this.emitResize(s,null)}}))}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.forwardCustomEvent("aero-resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight}}),this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),document.body.style.cursor="default",document.body.style.userSelect="auto",this.isDragging=!1,this.isTopDragging=!1,this.isBottomDragging=!1,this.isLeftDragging=!1,this.isRightDragging=!1)})}processMousedownEvent=(t,e)=>{switch(t.preventDefault(),document.body.style.userSelect="none",this.isDragging=!0,this.forwardCustomEvent("aero-resize-start",{detail:{width:this.offsetWidth,height:this.offsetHeight,edge:e}}),e){case"top":this.isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this.isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this.isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this.isRightDragging=!0,document.body.style.cursor="ew-resize";break}};emitResize(t,e){this.forwardCustomEvent("aero-resize",{detail:{width:t,height:e}})}static get observedAttributes(){return["min-width","max-width","min-height","max-height","resize-top","resize-bottom","resize-left","resize-right","resizer-color"]}attributeChangedCallback(t,e,i){this.baseAeroResizeBoxAttributeHandlers[t]?.(i)}baseAeroResizeBoxAttributeHandlers={"min-width":t=>{this.updateMinWidthValue(t)},"max-width":t=>{this.updateMaxWidthValue(t)},"min-height":t=>{this.updateMinHeightValue(t)},"max-height":t=>{this.updateMaxHeightValue(t)},"resize-top":t=>{this.updateTopResizerState(t!==null)},"resize-bottom":t=>{this.updateBottomResizerState(t!==null)},"resize-left":t=>{this.updateLeftResizerState(t!==null)},"resize-right":t=>{this.updateRightResizerState(t!==null)},"resizer-color":t=>{const e=t??"#ccc";this.applyStyles(`.resizer:hover { background-color: ${e}; }`)}};updateTopResizerState(t){this._hasTopResizer=t,this.updateResizeState(this._topResizer,this._hasTopResizer,this.resizerHandlers.top)}updateBottomResizerState(t){this._hasBottomResizer=t,this.updateResizeState(this._bottomResizer,this._hasBottomResizer,this.resizerHandlers.bottom)}updateLeftResizerState(t){this._hasLeftResizer=t,this.updateResizeState(this._leftResizer,this._hasLeftResizer,this.resizerHandlers.left)}updateRightResizerState(t){this._hasRightResizer=t,this.updateResizeState(this._rightResizer,this._hasRightResizer,this.resizerHandlers.right)}updateResizeState(t,e,i){t.hidden=!e,e?t.addEventListener("mousedown",i):t.removeEventListener("mousedown",i)}updateMinWidthValue(t){this._nMinWidth=t?Number(t):0}updateMaxWidthValue(t){this._nMaxWidth=t?Number(t):2e3}updateMinHeightValue(t){this._nMinHeight=t?Number(t):0}updateMaxHeightValue(t){this._nMaxHeight=t?Number(t):2e3}set resizerColor(t){this.setAttribute("resizer-color",t)}get minWidth(){return this._nMinWidth.toString()}set minWidth(t){this.setAttribute("min-width",t)}get maxWidth(){return this._nMaxWidth.toString()}set maxWidth(t){this.setAttribute("max-width",t)}get minHeight(){return this._nMinHeight.toString()}set minHeight(t){this.setAttribute("min-height",t)}get maxHeight(){return this._nMaxHeight.toString()}set maxHeight(t){this.setAttribute("max-height",t)}addTopResizer(){this.setAttribute("resize-top","")}removeTopResizer(){this.removeAttribute("resize-top")}addBottomResizer(){this.setAttribute("resize-bottom","")}removeBottomResizer(){this.removeAttribute("resize-bottom")}addLeftResizer(){this.setAttribute("resize-left","")}removeLeftResizer(){this.removeAttribute("resize-left")}addRightResizer(){this.setAttribute("resize-right","")}removeRightResizer(){this.removeAttribute("resize-right")}}customElements.define("aero-resize-box",l),r.AeroNumericInput=h,r.AeroProgressSpinner=d,r.AeroResizeBox=l,r.AeroSpinbox=u,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));
