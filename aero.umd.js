(function(r,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(r=typeof globalThis<"u"?globalThis:r||self,s(r.Aero={}))})(this,(function(r){"use strict";class s extends HTMLElement{shadow;constructor(t){super();const e=document.createElement("template");e.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}applyStyles(t){const e=document.createElement("style");e.textContent=t,this.shadow.appendChild(e)}forwardNativeEvent(t){this.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}forwardCustomEvent(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e?.detail,bubbles:!0,composed:!0}))}}class d extends s{_boundDispatchInputEvent=this._dispatchInputEvent.bind(this);_boundDispatchChangeEvent=this._dispatchChangeEvent.bind(this);_boundDispatchFocusinEvent=this._dispatchFocusinEvent.bind(this);_boundDispatchFocusoutEvent=this._dispatchFocusoutEvent.bind(this);_$input;constructor(t){super(t),this._initializeInput(),this._syncUI(this.getAttribute("value"))}_initializeInput(){this._$input=this.query(this.getInputSelector())}getValidateValue(t){const e=isNaN(t)?this.min:t,n=Math.max(this.min,Math.min(this.max,e))-this.min,h=Math.round(n/this.step)*this.step;let a=this.min+h;return a>this.max&&(a=a-this.step),Number(a.toFixed(this.decimalPlaces))}connectedCallback(){this._$input.addEventListener("input",this._boundDispatchInputEvent),this._$input.addEventListener("change",this._boundDispatchChangeEvent),this._$input.addEventListener("focusin",this._boundDispatchFocusinEvent),this._$input.addEventListener("focusout",this._boundDispatchFocusoutEvent)}disconnectedCallback(){this._$input.removeEventListener("input",this._boundDispatchInputEvent),this._$input.removeEventListener("change",this._boundDispatchChangeEvent),this._$input.removeEventListener("focusin",this._boundDispatchFocusinEvent),this._$input.removeEventListener("focusout",this._boundDispatchFocusoutEvent)}_dispatchInputEvent(t){t.stopImmediatePropagation(),this.forwardNativeEvent("input")}_dispatchChangeEvent(t){t.stopImmediatePropagation();const e=this.getValidateValue(this._$input.valueAsNumber);this.value=e,this.forwardNativeEvent("change")}_dispatchFocusinEvent(t){t.stopImmediatePropagation(),this.forwardNativeEvent("focusin")}_dispatchFocusoutEvent(t){t.stopImmediatePropagation();const e=this.getValidateValue(this._$input.valueAsNumber);this.value=e,this.forwardNativeEvent("focusout")}static get observedAttributes(){return["value","min","max","step"]}attributeChangedCallback(t,e,i){this._baseAeroNumericInputAttributeHandlers[t]?.(i)}_baseAeroNumericInputAttributeHandlers={value:t=>{this._syncUI(t)},min:()=>{this.value=this.value},max:()=>{this.value=this.value},step:()=>{this.value=this.value}};_syncUI(t){t&&(this._$input.value=t)}get input(){return this._$input}get value(){const t=this.getAttribute("value");return t===null?this.min:Number(t)}set value(t){const e=this.getValidateValue(t);this.setAttribute("value",String(e))}get min(){const t=this.getAttribute("min");return t===null||isNaN(Number(t))?0:Number(t)}set min(t){this.setAttribute("min",String(t))}get max(){const t=this.getAttribute("max");return t===null||isNaN(Number(t))?100:Number(t)}set max(t){this.setAttribute("max",String(t))}get step(){const t=this.getAttribute("step"),e=Number(t);return t===null||isNaN(e)||e<=0?1:e}set step(t){this.setAttribute("step",String(t))}get decimalPlaces(){const t=this.getAttribute("step");if(!t||isNaN(Number(t)))return 0;const e=t?.split(".");return e?.length>1?e[1].length:0}}const m=`<style>\r
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
`;class u extends d{constructor(){super(m)}getInputSelector(){return"#input"}}customElements.define("aero-numeric-input",u);const _=`<style>\r
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
`;class l extends d{_boundDecrement=this.decrement.bind(this);_boundIncrement=this.increment.bind(this);_$minus;_$plus;_resizeObserver;constructor(){super(_),this._$minus=this.query("#minus"),this._$plus=this.query("#plus"),this._updateButtonBackgrondColor(this.getAttribute("button-backgroundcolor")),this._updateMinuxText(this.getAttribute("minus-text")),this._updatePlusText(this.getAttribute("plus-text")),this._updateHeight(parseInt(getComputedStyle(this).height)),this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const i=e.contentRect.height;this.applyStyles(`#spinbox {
						grid-template-columns: ${i}px 1fr ${i}px;
					}`)}})}getInputSelector(){return"#input"}connectedCallback(){this._$minus.addEventListener("click",this._boundDecrement),this._$plus.addEventListener("click",this._boundIncrement),this._resizeObserver.observe(this)}disconnectedCallback(){this._$minus.removeEventListener("click",this._boundDecrement),this._$plus.removeEventListener("click",this._boundIncrement),this._resizeObserver.disconnect()}static get observedAttributes(){return[...super.observedAttributes,"minus-text","plus-text","button-backgroundcolor"]}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),this._aeroSpinboxAttributeHandlers[t]?.(i)}_aeroSpinboxAttributeHandlers={"minus-text":t=>{this._updateMinuxText(t)},"plus-text":t=>{this._updatePlusText(t)},"button-backgroundcolor":t=>{this._updateButtonBackgrondColor(t)}};_updateMinuxText(t){this._$minus.textContent=t||"-"}_updatePlusText(t){this._$plus.textContent=t||"+"}_updateButtonBackgrondColor(t){this.applyStyles(`#spinbox > button {
				background-color: ${t||"#ccc"};
			}`)}_updateHeight(t){t=t||30,this.applyStyles(`#spinbox {
				grid-template-columns: ${t}px 1fr ${t}px;
			}`)}set buttonBackgroundColor(t){this.setAttribute("button-backgroundcolor",t)}set minusText(t){this.setAttribute("minus-text",t)}set plusText(t){this.setAttribute("plus-text",t)}decrement(){const t=this.value-this.step;this.value=this.getValidateValue(t)}increment(){const t=this.value+this.step;this.value=this.getValidateValue(t)}}customElements.define("aero-spinbox",l);const v=`<style>\r
#spinner {\r
    border-radius: 50%;\r
    transform: rotate(-45deg);\r
\r
    animation-name: spin;\r
    animation-timing-function: linear;\r
    animation-iteration-count: infinite;\r
    animation-play-state: paused;\r
  }\r
\r
	#spinner.spin {\r
		animation-play-state: running;\r
	}\r
\r
	@keyframes spin {\r
		0% {\r
			transform: rotate(-45deg);\r
		}\r
		100% {\r
			transform: rotate(315deg);\r
		}\r
	}\r
</style>\r
\r
<div id="spinner"></div>\r
`;class c extends s{_$spinner;constructor(){super(v),this._$spinner=this.query("#spinner"),this._updateSpinnerStyles()}static get observedAttributes(){return["width","height","thickness","background","color","cycle"]}attributeChangedCallback(t,e,i){this._updateSpinnerStyles()}_updateSpinnerStyles(){const t=this.getAttribute("width")||"50",e=this.getAttribute("height")||"50",i=this.getAttribute("thickness")||"2",n=this.getAttribute("background")||"white",h=this.getAttribute("color")||"black",a=this.getAttribute("cycle")||"1";this.applyStyles(`
			#spinner {
				width: ${t}px;
        height: ${e}px;
        border: ${i}px solid ${h};
        border-right-color: ${n};
        animation-duration: ${a}s;
			}
		`)}set width(t){this.setAttribute("width",String(t))}set height(t){this.setAttribute("height",String(t))}set thickness(t){this.setAttribute("thickness",String(t))}set background(t){this.setAttribute("background",t)}set color(t){this.setAttribute("color",t)}set cycle(t){this.setAttribute("cycle",String(t))}spin(){this._$spinner.classList.add("spin")}stop(){this._$spinner.classList.remove("spin")}}customElements.define("aero-progress-spinner",c);const x=`<style>\r
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
`;class p extends s{_$topResizer;_$bottomResizer;_$leftResizer;_$rightResizer;_nMinWidth;_nMaxWidth;_nMinHeight;_nMaxHeight;_isTopDragging=!1;_isBottomDragging=!1;_isLeftDragging=!1;_isRightDragging=!1;_isDragging=!1;_animationFrameId=null;_resizerHandlers={top:t=>this._processMousedownEvent(t,"top"),bottom:t=>this._processMousedownEvent(t,"bottom"),left:t=>this._processMousedownEvent(t,"left"),right:t=>this._processMousedownEvent(t,"right")};constructor(){super(x),this._$topResizer=this.query("#top"),this._$bottomResizer=this.query("#bottom"),this._$leftResizer=this.query("#left"),this._$rightResizer=this.query("#right"),this._updateMinWidthValue(this.getAttribute("min-width")),this._updateMaxWidthValue(this.getAttribute("max-width")),this._updateMinHeightValue(this.getAttribute("min-height")),this._updateMaxHeightValue(this.getAttribute("max-height"))}connectedCallback(){this._updateResizeState("top",this.hasAttribute("resize-top")),this._updateResizeState("bottom",this.hasAttribute("resize-bottom")),this._updateResizeState("left",this.hasAttribute("resize-left")),this._updateResizeState("right",this.hasAttribute("resize-right")),window.addEventListener("mousemove",this._handleMousemove),window.addEventListener("mouseup",this._handleMouseup)}disconnectedCallback(){this._updateResizeState("top",!1),this._updateResizeState("bottom",!1),this._updateResizeState("left",!1),this._updateResizeState("right",!1),window.removeEventListener("mousemove",this._handleMousemove),window.removeEventListener("mouseup",this._handleMouseup)}_handleMousemove=t=>{this._isDragging&&(this._animationFrameId&&cancelAnimationFrame(this._animationFrameId),this._animationFrameId=requestAnimationFrame(()=>{const e=this.getBoundingClientRect();if(this._isTopDragging){const i=e.bottom-t.clientY,n=Math.min(Math.max(i,this._nMinHeight),this._nMaxHeight);this.style.height=`${n}px`,this._emitResize(null,n)}else if(this._isBottomDragging){const i=t.clientY-e.top,n=Math.min(Math.max(i,this._nMinHeight),this._nMaxHeight);this.style.height=`${n}px`,this._emitResize(null,n)}else if(this._isLeftDragging){const i=e.right-t.clientX,n=Math.min(Math.max(i,this._nMinWidth),this._nMaxWidth);this.style.width=`${n}px`,this._emitResize(n,null)}else if(this._isRightDragging){const i=t.clientX-e.left,n=Math.min(Math.max(i,this._nMinWidth),this._nMaxWidth);this.style.width=`${n}px`,this._emitResize(n,null)}}))};_handleMouseup=t=>{this._isDragging&&(this.forwardCustomEvent("aero-resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight}}),this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null),document.body.style.cursor="",document.body.style.userSelect="",this._isDragging=!1,this._isTopDragging=!1,this._isBottomDragging=!1,this._isLeftDragging=!1,this._isRightDragging=!1)};_processMousedownEvent=(t,e)=>{switch(t.preventDefault(),document.body.style.userSelect="none",this._isDragging=!0,this.forwardCustomEvent("aero-resize-start",{detail:{width:this.offsetWidth,height:this.offsetHeight,edge:e}}),e){case"top":this._isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this._isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this._isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this._isRightDragging=!0,document.body.style.cursor="ew-resize";break}};_emitResize(t,e){this.forwardCustomEvent("aero-resize",{detail:{width:t,height:e}})}static get observedAttributes(){return["min-width","max-width","min-height","max-height","resize-top","resize-bottom","resize-left","resize-right","resizer-color"]}attributeChangedCallback(t,e,i){this._baseAeroResizeBoxAttributeHandlers[t]?.(i)}_baseAeroResizeBoxAttributeHandlers={"min-width":t=>{this._updateMinWidthValue(t)},"max-width":t=>{this._updateMaxWidthValue(t)},"min-height":t=>{this._updateMinHeightValue(t)},"max-height":t=>{this._updateMaxHeightValue(t)},"resize-top":t=>{this._updateResizeState("top",t!==null)},"resize-bottom":t=>{this._updateResizeState("bottom",t!==null)},"resize-left":t=>{this._updateResizeState("left",t!==null)},"resize-right":t=>{this._updateResizeState("right",t!==null)},"resizer-color":t=>{const e=t??"#ccc";this.applyStyles(`.resizer:hover { background-color: ${e}; }`)}};_updateResizeState(t,e){let i,n;switch(t){case"top":i=this._$topResizer,n=this._resizerHandlers.top;break;case"bottom":i=this._$bottomResizer,n=this._resizerHandlers.bottom;break;case"left":i=this._$leftResizer,n=this._resizerHandlers.left;break;case"right":i=this._$rightResizer,n=this._resizerHandlers.right;break}i.hidden=!e,e?i.addEventListener("mousedown",n):i.removeEventListener("mousedown",n)}_updateMinWidthValue(t){this._nMinWidth=t?Number(t):0}_updateMaxWidthValue(t){this._nMaxWidth=t?Number(t):2e3}_updateMinHeightValue(t){this._nMinHeight=t?Number(t):0}_updateMaxHeightValue(t){this._nMaxHeight=t?Number(t):2e3}set resizerColor(t){this.setAttribute("resizer-color",t)}get minWidth(){return this._nMinWidth.toString()}set minWidth(t){this.setAttribute("min-width",t)}get maxWidth(){return this._nMaxWidth.toString()}set maxWidth(t){this.setAttribute("max-width",t)}get minHeight(){return this._nMinHeight.toString()}set minHeight(t){this.setAttribute("min-height",t)}get maxHeight(){return this._nMaxHeight.toString()}set maxHeight(t){this.setAttribute("max-height",t)}addTopResizer(){this.setAttribute("resize-top","")}removeTopResizer(){this.removeAttribute("resize-top")}addBottomResizer(){this.setAttribute("resize-bottom","")}removeBottomResizer(){this.removeAttribute("resize-bottom")}addLeftResizer(){this.setAttribute("resize-left","")}removeLeftResizer(){this.removeAttribute("resize-left")}addRightResizer(){this.setAttribute("resize-right","")}removeRightResizer(){this.removeAttribute("resize-right")}}customElements.define("aero-resizable-box",p);const f=`<style>\r
	:host {\r
		--aero-select-width: 150px;\r
		--aero-select-height: 36px;\r
\r
		--aero-select-font-size: 16px;\r
		--aero-select-font-family: san-serif;\r
\r
		--aero-select-border: 1px solid #000;\r
\r
		--aero-select-dropdown-border: 1px solid #000;\r
		--aero-select-dropdown-z-index: 100;\r
		--aero-select-dropdown-item-border: 1px solid grey;\r
		--aero-select-dropdown-item-background: #fff;\r
		--aero-select-dropdown-item-color: #000;\r
\r
		--aero-select-dropdown-hover-item-border: 1px solid grey;\r
		--aero-select-dropdown-hover-item-background: #000;\r
		--aero-select-dropdown-hover-item-color: white;\r
		--aero-select-dropdown-hover-item-cursor: pointer;\r
\r
		--aero-select-span-background: transparent;\r
		--aero-select-span-border: 1px solid transparent;\r
\r
		--aero-select-button-border: 1px solid #000;\r
		--aero-select-button-background: lightgrey;\r
		--aero-select-button-color: #000;\r
\r
		--aero-select-button-hover-border: 1px solid #000;\r
		--aero-select-button-hover-background: grey;\r
		--aero-select-button-hover-color: #000;\r
		--aero-select-button-hover-cursor: pointer;\r
\r
		display: block;\r
\r
		width: var(--aero-select-width);\r
		height: var(--aero-select-height);\r
\r
		font-size: var(--aero-select-font-size);\r
		font-family: var(--aero-select-font-family);\r
	}\r
\r
	::slotted(*) {\r
    display: grid;\r
    grid-template-columns: 1fr auto;\r
\r
    text-align: center;\r
		line-height: var(--aero-select-height);\r
\r
		border-bottom: var(--aero-select-dropdown-item-border);\r
		background-color: var(--aero-select-dropdown-item-background);\r
		color: var(--aero-select-dropdown-item-color);\r
	}\r
\r
	::slotted(*.highlight),\r
	::slotted(*:hover) {\r
		border-bottom: var(--aero-select-dropdown-hover-item-border);\r
		background-color: var(--aero-select-dropdown-hover-item-background);\r
		color: var(--aero-select-dropdown-hover-item-color);\r
		cursor: var(--aero-select-dropdown-hover-item-cursor);\r
	}\r
\r
	::slotted(*:last-child) {\r
		border-bottom: none;\r
	}\r
\r
	::slotted(*)::after {\r
		content: '';\r
		aspect-ratio: 1 / 1;\r
	}\r
\r
	#overlay {\r
		position: relative;\r
\r
		width: 100%;\r
    height: 100%;\r
	}\r
\r
	#container {\r
		width: 100%;\r
		height: 100%;\r
\r
		display: grid;\r
		grid-template-columns: 1fr auto;\r
\r
		border: var(--aero-select-border);\r
		box-sizing: border-box;\r
	}\r
\r
	#span,\r
	#button {\r
		padding: 0;\r
		margin: 0;\r
	}\r
\r
	#span {\r
		display: flex;\r
		justify-content: center;\r
		align-items: center;\r
\r
		background-color: var(--aero-select-span-background);\r
\r
		border: var(--aero-select-span-border);\r
		box-sizing: border-box;\r
	}\r
\r
	#span:hover {\r
		cursor: default;\r
	}\r
\r
	#button {\r
    aspect-ratio: 1 / 1;\r
\r
		border: var(--aero-select-button-border);\r
		background-color: var(--aero-select-button-background);\r
		color: var(--aero-select-button-color);\r
	}\r
\r
	#button:hover {\r
		border: var(--aero-select-button-hover-border);\r
		background-color: var(--aero-select-button-hover-background);\r
		color: var(--aero-select-button-hover-color);\r
		cursor: var(--aero-select-button-hover-cursor);\r
	}\r
\r
	#dropdown {\r
		position: absolute;\r
		width: 100%;\r
		display: none;\r
		border: var(--aero-select-dropdown-border);\r
		box-sizing: border-box;\r
		z-index: var(--aero-select-dropdown-z-index);\r
	}\r
\r
	#dropdown.open {\r
		display: block;\r
	}\r
</style>\r
\r
<div id="overlay">\r
	<div id="container">\r
		<span id="span"></span>\r
		<button id="button"></button>\r
	</div>\r
	<div id="dropdown">\r
		<slot></slot>\r
	</div>\r
</div>\r
`;class g extends s{_handlers={documentClick:this._handleDocumentClick.bind(this),buttonClick:this._handleButtonClick.bind(this),dropdownClick:this._handleDropdownClick.bind(this),slotChange:this._handleSlotChange.bind(this),keydown:this._handleKeydown.bind(this)};_$span;_$button;_$dropdown;_$options=[];_optionIndex=-1;_dropdown_open=!1;_$slot;_highlightIndex=-1;_pendingOptionIndex;constructor(){super(f),this._$span=this.query("#span"),this._$button=this.query("#button"),this._$dropdown=this.query("#dropdown"),this._$slot=this.query("slot"),this._$options=(this._$slot?.assignedElements()??[]).filter(t=>t instanceof HTMLElement),this._$button.textContent=this.getAttribute("button-text")??"▽",this._updateOptionIndex(this._getValidateOptionIndexByStr(this.getAttribute("option-index")??"-1"))}connectedCallback(){document.addEventListener("click",this._handlers.documentClick),this._$button.addEventListener("click",this._handlers.buttonClick),this._$dropdown.addEventListener("click",this._handlers.dropdownClick),this._$slot?.addEventListener("slotchange",this._handlers.slotChange),this.addEventListener("keydown",this._handlers.keydown)}disconnectedCallback(){document.removeEventListener("click",this._handlers.documentClick),this._$button.removeEventListener("click",this._handlers.buttonClick),this._$dropdown.removeEventListener("click",this._handlers.dropdownClick),this._$slot?.removeEventListener("slotchange",this._handlers.slotChange),this.removeEventListener("keydown",this._handlers.keydown)}_handleDocumentClick(t){this._dropdown_open&&t?.target!==this&&(this._$dropdown.classList.remove("open"),this._dropdown_open=!1)}_handleButtonClick(t){t.stopPropagation(),this._$dropdown.classList.toggle("open"),this._dropdown_open=!this._dropdown_open}_handleDropdownClick(t){const e=t.composedPath().find(n=>n instanceof HTMLElement&&this._$options.includes(n));if(!e)return;const i=this._$options.indexOf(e);this.optionIndex=i,this._$dropdown.classList.remove("open"),this._dropdown_open=!1}_handleSlotChange(){const t=this._$options[this._optionIndex];if(this._$options=this._$slot.assignedElements().filter(e=>e instanceof HTMLElement),this._pendingOptionIndex!==void 0){const e=this._pendingOptionIndex;this._pendingOptionIndex=void 0,this.optionIndex=e}else this.optionIndex=this._$options.findIndex(e=>e===t)}_handleKeydown(t){if(t.key==="Enter"||t.key===" ")if(t.preventDefault(),!this._dropdown_open)this._$button.click();else{const e=this._$options[this._highlightIndex];e&&(e.classList.remove("highlight"),this.optionIndex=this._highlightIndex),this._highlightIndex=-1,this._$button.click()}if(t.key==="ArrowDown"||t.key==="ArrowUp"){if(t.preventDefault(),!this._dropdown_open||t.key==="ArrowDown"&&this._highlightIndex+1===this._$options.length||t.key==="ArrowUp"&&this._highlightIndex===-1)return;this._$options[this._highlightIndex]?.classList.remove("highlight"),this._highlightIndex=t.key==="ArrowDown"?this._highlightIndex+1:this._highlightIndex-1,this._$options[this._highlightIndex]?.classList.add("highlight"),this._$options[this._highlightIndex]?.scrollIntoView({block:"nearest"})}t.key==="Escape"&&this._dropdown_open&&(this._$button.click(),this._highlightIndex=-1)}static get observedAttributes(){return["option-index"]}attributeChangedCallback(t,e,i){this._aeroSelectAttributeHandlers[t]?.(i)}_aeroSelectAttributeHandlers={"option-index":t=>{this._updateOptionIndex(this._getValidateOptionIndexByStr(t??""))}};get optionIndex(){return this._optionIndex}set optionIndex(t){this.setAttribute("option-index",t.toString())}_updateOptionIndex(t){if(this._optionIndex===t)return;if(t<0){this._unsetOption();return}const e=this._$options[t];if(!e){this._pendingOptionIndex=t;return}this._optionIndex=t,this._$span.textContent=e.textContent,this.forwardCustomEvent("aero-select-changed",{detail:{option:e,index:t}}),this._pendingOptionIndex=void 0}_getValidateOptionIndexByStr(t){if(t==="")return-1;const e=Number(t);return Number.isNaN(e)?-1:e}_unsetOption(){this._optionIndex=-1,this._$span.textContent=""}}customElements.define("aero-select",g);class b extends HTMLElement{constructor(){super()}get value(){return this.getAttribute("value")??""}set value(t){this.setAttribute("value",t)}get label(){return this.textContent??""}}customElements.define("aero-option",b),r.AeroNumericInput=u,r.AeroOption=b,r.AeroProgressSpinner=c,r.AeroResizableBox=p,r.AeroSelect=g,r.AeroSpinbox=l,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));
