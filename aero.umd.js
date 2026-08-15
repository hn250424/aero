(function(s,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(s=typeof globalThis<"u"?globalThis:s||self,o(s.Aero={}))})(this,(function(s){"use strict";class o extends HTMLElement{shadow;constructor(t){super();const e=document.createElement("template");e.innerHTML=t,this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0))}query(t){return this.shadow.querySelector(t)}queryOptional(t){return this.shadow.querySelector(t)}applyStyles(t,e="component-styles"){let i=this.shadow.querySelector(`#${e}`);i||(i=document.createElement("style"),i.id=e,this.shadow.appendChild(i)),i.textContent=t}forwardNativeEvent(t){this.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}forwardCustomEvent(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e?.detail,bubbles:!0,composed:!0}))}addEventListener(t,e,i){super.addEventListener(t,e,i)}removeEventListener(t,e,i){super.removeEventListener(t,e,i)}}class _ extends o{_boundDispatchInputEvent=this._dispatchInputEvent.bind(this);_boundDispatchChangeEvent=this._dispatchChangeEvent.bind(this);_boundDispatchFocusinEvent=this._dispatchFocusinEvent.bind(this);_boundDispatchFocusoutEvent=this._dispatchFocusoutEvent.bind(this);_$input;constructor(t){super(t),this._initializeInput(),this._syncUI(this.getAttribute("value"))}_initializeInput(){this._$input=this.query(this.getInputSelector())}getValidateValue(t){if(this.min>this.max)return this.min;const e=isNaN(t)?this.min:t,n=Math.max(this.min,Math.min(this.max,e))-this.min,r=Math.round(n/this.step)*this.step;let a=this.min+r;return a>this.max&&(a=a-this.step),Number(a.toFixed(this.decimalPlaces))}connectedCallback(){this._$input.addEventListener("input",this._boundDispatchInputEvent),this._$input.addEventListener("change",this._boundDispatchChangeEvent),this._$input.addEventListener("focusin",this._boundDispatchFocusinEvent),this._$input.addEventListener("focusout",this._boundDispatchFocusoutEvent),this.getAttribute("value")!==null&&(this.value=this.value)}disconnectedCallback(){this._$input.removeEventListener("input",this._boundDispatchInputEvent),this._$input.removeEventListener("change",this._boundDispatchChangeEvent),this._$input.removeEventListener("focusin",this._boundDispatchFocusinEvent),this._$input.removeEventListener("focusout",this._boundDispatchFocusoutEvent)}_dispatchInputEvent(t){t.stopImmediatePropagation(),this.forwardNativeEvent("input")}_dispatchChangeEvent(t){t.stopImmediatePropagation();const e=this.getValidateValue(this._$input.valueAsNumber);this.value=e,this.forwardNativeEvent("change")}_dispatchFocusinEvent(t){t.stopImmediatePropagation(),this.forwardNativeEvent("focusin")}_dispatchFocusoutEvent(t){t.stopImmediatePropagation();const e=this.getValidateValue(this._$input.valueAsNumber);this.value=e,this.forwardNativeEvent("focusout")}static get observedAttributes(){return["value","min","max","step"]}attributeChangedCallback(t,e,i){this._baseAeroNumericInputAttributeHandlers[t]?.(i)}_baseAeroNumericInputAttributeHandlers={value:t=>{this._syncUI(t)},min:()=>{this.value=this.value},max:()=>{this.value=this.value},step:()=>{this.value=this.value}};_syncUI(t){this._$input.value=t??""}get input(){return this._$input}get value(){const t=this.getAttribute("value");if(t===null)return this.min;const e=Number(t);return isNaN(e)?this.min:e}set value(t){const e=this.getValidateValue(t);this.setAttribute("value",String(e))}get min(){const t=this.getAttribute("min");return t===null||isNaN(Number(t))?0:Number(t)}set min(t){this.setAttribute("min",String(t))}get max(){const t=this.getAttribute("max");return t===null||isNaN(Number(t))?100:Number(t)}set max(t){this.setAttribute("max",String(t))}get step(){const t=this.getAttribute("step"),e=Number(t);return t===null||isNaN(e)||e<=0?1:e}set step(t){this.setAttribute("step",String(t))}get decimalPlaces(){const t=e=>{if(!e||isNaN(Number(e)))return 0;const i=e.split(".");return i.length>1?i[1].length:0};return Math.max(t(this.getAttribute("step")),t(this.getAttribute("min")))}}const w=`<style>
  :host {
    border: 1px solid #ccc;
    display: block;

    width: 100px;
    height: 30px;
  }

  #input {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;

    text-align: inherit;
    font-size: inherit;
    color: inherit;
  }

  #input:focus {
    outline: none;
  }
  #input::-webkit-inner-spin-button {
    appearance: none;
  }
</style>

<input id="input" type="number" />
`;class g extends _{constructor(){super(w)}getInputSelector(){return"#input"}}const y=`<style>
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

  #spinbox > button {
    cursor: pointer;
    background-color: var(--aero-spinbox-button-background, lightgrey);
  }

  #input {
    padding: 0;
    text-align: center;
  }

  #input:focus {
    outline: none;
  }
  #input::-webkit-inner-spin-button {
    appearance: none;
  }
</style>

<div id="spinbox">
  <button id="minus">-</button>
  <input id="input" type="number" />
  <button id="plus">+</button>
</div>
`;class m extends _{_boundDecrement=this.decrement.bind(this);_boundIncrement=this.increment.bind(this);_$minus;_$plus;_resizeObserver;constructor(){super(y),this._$minus=this.query("#minus"),this._$plus=this.query("#plus"),this._updateMinusText(this.getAttribute("minus-text")),this._updatePlusText(this.getAttribute("plus-text")),this._updateHeight(parseInt(getComputedStyle(this).height)),this._resizeObserver=new ResizeObserver(t=>{for(const e of t){const i=e.contentRect.height;this.applyStyles(`#spinbox {
            grid-template-columns: ${i}px 1fr ${i}px;
          }`)}})}getInputSelector(){return"#input"}connectedCallback(){super.connectedCallback(),this._$minus.addEventListener("click",this._boundDecrement),this._$plus.addEventListener("click",this._boundIncrement),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._$minus.removeEventListener("click",this._boundDecrement),this._$plus.removeEventListener("click",this._boundIncrement),this._resizeObserver.disconnect()}static get observedAttributes(){return[...super.observedAttributes,"minus-text","plus-text"]}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i),this._aeroSpinboxAttributeHandlers[t]?.(i)}_aeroSpinboxAttributeHandlers={"minus-text":t=>{this._updateMinusText(t)},"plus-text":t=>{this._updatePlusText(t)}};_updateMinusText(t){this._$minus.textContent=t||"-"}_updatePlusText(t){this._$plus.textContent=t||"+"}_updateHeight(t){t=t||30,this.applyStyles(`#spinbox {
        grid-template-columns: ${t}px 1fr ${t}px;
      }`)}set minusText(t){this.setAttribute("minus-text",t)}set plusText(t){this.setAttribute("plus-text",t)}decrement(){this._stepBy(-this.step)}increment(){this._stepBy(this.step)}_stepBy(t){const e=this.value;this.value=this.getValidateValue(this.value+t),this.value!==e&&(this.forwardNativeEvent("input"),this.forwardNativeEvent("change"))}}const $=`<style>
  :host {
    display: block;
  }
</style>
`;class b extends o{_size;_thickness;_radius;_circumference;_trackColor;_arcColor;_cycle;_arcRatio;_$svg;_$track;_$arc;constructor(){super($),this._syncHostAttributes(),this._buildSvg(),this._syncSvgAttributes(),this._syncStyles()}_buildSvg(){const t="http://www.w3.org/2000/svg";this._$svg=document.createElementNS(t,"svg"),this._$track=document.createElementNS(t,"circle"),this._$arc=document.createElementNS(t,"circle"),this._$track.classList.add("track"),this._$arc.classList.add("arc"),this._$svg.appendChild(this._$track),this._$svg.appendChild(this._$arc),this.shadow.appendChild(this._$svg)}static get observedAttributes(){return["size","thickness","track-color","arc-color","cycle","arc-ratio"]}attributeChangedCallback(t,e,i){this._syncHostAttributes(),this._syncSvgAttributes(),this._syncStyles()}_syncHostAttributes(){this._size=this._parsePositive(this.getAttribute("size"),50),this._thickness=this._parsePositive(this.getAttribute("thickness"),4),this._radius=Math.max(this._size/2-this._thickness-1,1),this._circumference=2*Math.PI*this._radius,this._trackColor=this.getAttribute("track-color")||"transparent",this._arcColor=this.getAttribute("arc-color")||"black",this._cycle=this._parsePositive(this.getAttribute("cycle"),2),this._arcRatio=this._parsePositive(this.getAttribute("arc-ratio"),90,100)/100}_parsePositive(t,e,i=1/0){const n=parseFloat(t??"");return isNaN(n)||n<=0||n>i?e:n}_syncSvgAttributes(){this._$svg.setAttribute("viewBox",`0 0 ${this._size} ${this._size}`),this._$svg.setAttribute("width",String(this._size)),this._$svg.setAttribute("height",String(this._size)),this._$track.setAttribute("cx",String(this._size/2)),this._$track.setAttribute("cy",String(this._size/2)),this._$track.setAttribute("r",String(this._radius)),this._$arc.setAttribute("cx",String(this._size/2)),this._$arc.setAttribute("cy",String(this._size/2)),this._$arc.setAttribute("r",String(this._radius))}_syncStyles(){const t=Math.min(10,this._circumference);this.applyStyles(`
      :host {
        width: ${this._size}px;
        height: ${this._size}px;
      }

      .track {
        fill: none;
        stroke: ${this._trackColor};
        stroke-width: ${this._thickness};
      }

      .arc {
        fill: none;
        stroke: ${this._arcColor};
        stroke-width: ${this._thickness};

        stroke-dasharray: ${this._circumference};
        stroke-dashoffset: ${this._circumference};

        transform-origin: center;

        animation:
          spin ${this._cycle}s linear infinite,
          arc ${this._cycle}s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes arc {
        0% {
          stroke-dasharray: ${t} ${this._circumference-t};
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: ${this._circumference*this._arcRatio} ${this._circumference-this._circumference*this._arcRatio};
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dasharray: ${t} ${this._circumference-t};
          stroke-dashoffset: ${this._circumference*-1};
        }
      }
    `)}}const k=`<style>
  :host {
    position: relative;
    display: block;
    width: 300px;
    height: 300px;
    border: 1px solid lightgray;
    box-sizing: border-box;
  }

  .resizer {
    position: absolute;
    background-color: transparent;
    transition: background-color 0.3s ease;
    /* Required for pointer-event dragging on touch devices. */
    touch-action: none;
  }

  .resizer:hover {
    background-color: var(--aero-resizable-box-resizer-color, grey);
  }

  .horizontal {
    width: 3px;
    height: 100%;
    cursor: ew-resize;
  }

  .vertical {
    width: 100%;
    height: 3px;
    cursor: ns-resize;
  }

  #top {
    left: 0;
    top: 0;
    transform: translateY(-50%);
  }

  #bottom {
    left: 0;
    bottom: 0;
    transform: translateY(50%);
  }

  #left {
    top: 0;
    left: 0;
    transform: translateX(-50%);
  }

  #right {
    top: 0;
    right: 0;
    transform: translateX(50%);
  }
</style>

<slot></slot>
<div id="top" class="resizer vertical"></div>
<div id="bottom" class="resizer vertical"></div>
<div id="left" class="resizer horizontal"></div>
<div id="right" class="resizer horizontal"></div>
`;class l extends o{_$topResizer;_$bottomResizer;_$leftResizer;_$rightResizer;_nMinWidth;_nMaxWidth;_nMinHeight;_nMaxHeight;_isTopDragging=!1;_isBottomDragging=!1;_isLeftDragging=!1;_isRightDragging=!1;_isDragging=!1;_animationFrameId=null;_activePointerId=null;_resizerHandlers={top:t=>this._processPointerdownEvent(t,"top"),bottom:t=>this._processPointerdownEvent(t,"bottom"),left:t=>this._processPointerdownEvent(t,"left"),right:t=>this._processPointerdownEvent(t,"right")};constructor(){super(k),this._$topResizer=this.query("#top"),this._$bottomResizer=this.query("#bottom"),this._$leftResizer=this.query("#left"),this._$rightResizer=this.query("#right"),this._updateMinWidthValue(this.getAttribute("min-width")),this._updateMaxWidthValue(this.getAttribute("max-width")),this._updateMinHeightValue(this.getAttribute("min-height")),this._updateMaxHeightValue(this.getAttribute("max-height")),this._initializeAttributes()}_initializeAttributes(){l.observedAttributes.forEach(t=>{const e=this.getAttribute(t);this._baseAeroResizeBoxAttributeHandlers[t]?.(e)})}connectedCallback(){this._updateResizeState("top",this.hasAttribute("resize-top")),this._updateResizeState("bottom",this.hasAttribute("resize-bottom")),this._updateResizeState("left",this.hasAttribute("resize-left")),this._updateResizeState("right",this.hasAttribute("resize-right")),window.addEventListener("pointermove",this._handlePointermove),window.addEventListener("pointerup",this._handlePointerup),window.addEventListener("pointercancel",this._handlePointerup)}disconnectedCallback(){this._updateResizeState("top",!1),this._updateResizeState("bottom",!1),this._updateResizeState("left",!1),this._updateResizeState("right",!1),window.removeEventListener("pointermove",this._handlePointermove),window.removeEventListener("pointerup",this._handlePointerup),window.removeEventListener("pointercancel",this._handlePointerup),this._stopDragging()}_handlePointermove=t=>{!this._isDragging||t.pointerId!==this._activePointerId||(this._animationFrameId&&cancelAnimationFrame(this._animationFrameId),this._animationFrameId=requestAnimationFrame(()=>{const e=this.getBoundingClientRect();if(this._isTopDragging){const i=this._clampHeight(e.bottom-t.clientY);this.style.height=`${i}px`,this._emitResize(null,i)}else if(this._isBottomDragging){const i=this._clampHeight(t.clientY-e.top);this.style.height=`${i}px`,this._emitResize(null,i)}else if(this._isLeftDragging){const i=this._clampWidth(e.right-t.clientX);this.style.width=`${i}px`,this._emitResize(i,null)}else if(this._isRightDragging){const i=this._clampWidth(t.clientX-e.left);this.style.width=`${i}px`,this._emitResize(i,null)}}))};_clampWidth(t){return Math.max(Math.min(t,this._nMaxWidth),this._nMinWidth)}_clampHeight(t){return Math.max(Math.min(t,this._nMaxHeight),this._nMinHeight)}_handlePointerup=t=>{!this._isDragging||t.pointerId!==this._activePointerId||(this.forwardCustomEvent("aero-resize-end",{detail:{width:this.offsetWidth,height:this.offsetHeight}}),this._stopDragging())};_stopDragging(){this._isDragging&&(this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null),document.body.style.cursor="",document.body.style.userSelect="",this._isDragging=!1,this._isTopDragging=!1,this._isBottomDragging=!1,this._isLeftDragging=!1,this._isRightDragging=!1,this._activePointerId=null)}_processPointerdownEvent=(t,e)=>{if(!this._isDragging)switch(t.preventDefault(),document.body.style.userSelect="none",this._isDragging=!0,this._activePointerId=t.pointerId,this.forwardCustomEvent("aero-resize-start",{detail:{width:this.offsetWidth,height:this.offsetHeight,edge:e}}),e){case"top":this._isTopDragging=!0,document.body.style.cursor="ns-resize";break;case"bottom":this._isBottomDragging=!0,document.body.style.cursor="ns-resize";break;case"left":this._isLeftDragging=!0,document.body.style.cursor="ew-resize";break;case"right":this._isRightDragging=!0,document.body.style.cursor="ew-resize";break}};_emitResize(t,e){this.forwardCustomEvent("aero-resize",{detail:{width:t,height:e}})}static get observedAttributes(){return["min-width","max-width","min-height","max-height","resize-top","resize-bottom","resize-left","resize-right"]}attributeChangedCallback(t,e,i){this._baseAeroResizeBoxAttributeHandlers[t]?.(i)}_baseAeroResizeBoxAttributeHandlers={"min-width":t=>{this._updateMinWidthValue(t)},"max-width":t=>{this._updateMaxWidthValue(t)},"min-height":t=>{this._updateMinHeightValue(t)},"max-height":t=>{this._updateMaxHeightValue(t)},"resize-top":t=>{this._updateResizeState("top",t!==null)},"resize-bottom":t=>{this._updateResizeState("bottom",t!==null)},"resize-left":t=>{this._updateResizeState("left",t!==null)},"resize-right":t=>{this._updateResizeState("right",t!==null)}};_updateResizeState(t,e){let i,n;switch(t){case"top":i=this._$topResizer,n=this._resizerHandlers.top;break;case"bottom":i=this._$bottomResizer,n=this._resizerHandlers.bottom;break;case"left":i=this._$leftResizer,n=this._resizerHandlers.left;break;case"right":i=this._$rightResizer,n=this._resizerHandlers.right;break}i.hidden=!e,e?i.addEventListener("pointerdown",n):i.removeEventListener("pointerdown",n)}_parseSize(t,e){if(t===null||t==="")return e;const i=Number(t);return isNaN(i)||i<0?e:i}_updateMinWidthValue(t){this._nMinWidth=this._parseSize(t,0)}_updateMaxWidthValue(t){this._nMaxWidth=this._parseSize(t,2e3)}_updateMinHeightValue(t){this._nMinHeight=this._parseSize(t,0)}_updateMaxHeightValue(t){this._nMaxHeight=this._parseSize(t,2e3)}get minWidth(){return this._nMinWidth.toString()}set minWidth(t){this.setAttribute("min-width",t)}get maxWidth(){return this._nMaxWidth.toString()}set maxWidth(t){this.setAttribute("max-width",t)}get minHeight(){return this._nMinHeight.toString()}set minHeight(t){this.setAttribute("min-height",t)}get maxHeight(){return this._nMaxHeight.toString()}set maxHeight(t){this.setAttribute("max-height",t)}addTopResizer(){this.setAttribute("resize-top","")}removeTopResizer(){this.removeAttribute("resize-top")}addBottomResizer(){this.setAttribute("resize-bottom","")}removeBottomResizer(){this.removeAttribute("resize-bottom")}addLeftResizer(){this.setAttribute("resize-left","")}removeLeftResizer(){this.removeAttribute("resize-left")}addRightResizer(){this.setAttribute("resize-right","")}removeRightResizer(){this.removeAttribute("resize-right")}}const z=`<style>
  :host {
    --aero-select-width: 100%;
    --aero-select-height: 36px;

    --aero-select-font-size: 16px;
    --aero-select-font-family: san-serif;
    --aero-select-text-align: center;

    --aero-select-border: 1px solid #000;

    --aero-select-dropdown-border: 1px solid #000;
    --aero-select-dropdown-z-index: 100;
    --aero-select-dropdown-item-border: 1px solid grey;
    --aero-select-dropdown-item-background: #fff;
    --aero-select-dropdown-item-color: #000;

    --aero-select-dropdown-hover-item-border: 1px solid grey;
    --aero-select-dropdown-hover-item-background: #000;
    --aero-select-dropdown-hover-item-color: white;
    --aero-select-dropdown-hover-item-cursor: pointer;

    --aero-select-span-background: transparent;
    --aero-select-span-border: 1px solid transparent;

    --aero-select-button-border: 1px solid #000;
    --aero-select-button-background: lightgrey;
    --aero-select-button-color: #000;

    --aero-select-button-hover-border: 1px solid #000;
    --aero-select-button-hover-background: grey;
    --aero-select-button-hover-color: #000;
    --aero-select-button-hover-cursor: pointer;

    display: block;

    width: var(--aero-select-width, 100%);
    height: var(--aero-select-height, 36px);

    font-size: var(--aero-select-font-size);
    font-family: var(--aero-select-font-family);
  }

  ::slotted(*) {
    display: grid;
    grid-template-columns: 1fr var(--aero-select-height, 36px);
    height: var(--aero-select-height, 36px);

    text-align: var(--aero-select-text-align);
    line-height: var(--aero-select-height);

    border-bottom: var(--aero-select-dropdown-item-border);
    background-color: var(--aero-select-dropdown-item-background);
    color: var(--aero-select-dropdown-item-color);
  }

  ::slotted(*.highlight),
  ::slotted(*:hover) {
    border-bottom: var(--aero-select-dropdown-hover-item-border);
    background-color: var(--aero-select-dropdown-hover-item-background);
    color: var(--aero-select-dropdown-hover-item-color);
    cursor: var(--aero-select-dropdown-hover-item-cursor);
  }

  ::slotted(*:last-child) {
    border-bottom: none;
  }

  ::slotted(*)::after {
    content: '';
  }

  #overlay {
    position: relative;

    width: 100%;
    height: 100%;
  }

  #container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr auto;

    border: var(--aero-select-border);
    box-sizing: border-box;
  }

  #span,
  #button {
    padding: 0;
    margin: 0;
  }

  #span {
    display: flex;
    /* left/right are valid justify-content keywords, so the same value
       drives both this flex row and the options' text-align. */
    justify-content: var(--aero-select-text-align);
    align-items: center;

    background-color: var(--aero-select-span-background);

    border: var(--aero-select-span-border);
    box-sizing: border-box;
  }

  #span:hover {
    cursor: default;
  }

  #button {
    aspect-ratio: 1 / 1;

    border: var(--aero-select-button-border);
    background-color: var(--aero-select-button-background);
    color: var(--aero-select-button-color);
  }

  #button:hover {
    border: var(--aero-select-button-hover-border);
    background-color: var(--aero-select-button-hover-background);
    color: var(--aero-select-button-hover-color);
    cursor: var(--aero-select-button-hover-cursor);
  }

  #dropdown {
    position: fixed;
    z-index: var(--aero-select-dropdown-z-index);

    max-height: calc(var(--aero-select-height, 36px) * 6.5);
    overflow-y: auto;

    display: none;

    border: var(--aero-select-dropdown-border);
    box-sizing: border-box;

    scrollbar-width: thin;
  }

  #dropdown.open {
    display: block;
  }
</style>

<div id="overlay">
  <div id="container">
    <span id="span"></span>
    <!-- The host carries the tab stop; the inner button must not add a second one. -->
    <button id="button" tabindex="-1"></button>
  </div>
  <div id="dropdown">
    <slot></slot>
  </div>
</div>
`;class v extends o{_handlers={documentClick:this._handleDocumentClick.bind(this),buttonClick:this._handleButtonClick.bind(this),dropdownClick:this._handleDropdownClick.bind(this),slotChange:this._handleSlotChange.bind(this),keydown:this._handleKeydown.bind(this)};_$span;_$button;_$dropdown;_$options=[];_optionIndex=-1;_dropdown_open=!1;_$slot;_highlightIndex=-1;_pendingOptionIndex;constructor(){super(z),this._$span=this.query("#span"),this._$button=this.query("#button"),this._$dropdown=this.query("#dropdown"),this._$slot=this.query("slot"),this._$options=(this._$slot?.assignedElements()??[]).filter(t=>t instanceof HTMLElement),this._$button.textContent=this.getAttribute("button-text")??"▽",this._updateOptionIndex(this._getValidateOptionIndexByStr(this.getAttribute("option-index")??"-1"))}connectedCallback(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),document.addEventListener("click",this._handlers.documentClick),this._$button.addEventListener("click",this._handlers.buttonClick),this._$dropdown.addEventListener("click",this._handlers.dropdownClick),this._$slot?.addEventListener("slotchange",this._handlers.slotChange),this.addEventListener("keydown",this._handlers.keydown)}disconnectedCallback(){document.removeEventListener("click",this._handlers.documentClick),this._$button.removeEventListener("click",this._handlers.buttonClick),this._$dropdown.removeEventListener("click",this._handlers.dropdownClick),this._$slot?.removeEventListener("slotchange",this._handlers.slotChange),this.removeEventListener("keydown",this._handlers.keydown)}_handleDocumentClick(t){t?.composedPath().includes(this)||this._dropdown_open&&(this._closeDropdown(),this._dropdown_open=!1)}_handleButtonClick(t){this._dropdown_open=!this._dropdown_open,this._dropdown_open?this._openDropdown():this._closeDropdown()}_openDropdown(){const t=this.getBoundingClientRect(),e=this._$dropdown.offsetHeight||parseInt(getComputedStyle(this).getPropertyValue("--aero-select-height"))*6.5,i=window.innerHeight-t.bottom,n=t.top;let r=!1;if(i<e&&n>i&&(r=!0),this._$dropdown.style.left=`${t.left}px`,this._$dropdown.style.width=`${t.width}px`,r?(this._$dropdown.style.top=`${t.top-e}px`,this._$dropdown.classList.add("open-up"),this._$dropdown.classList.remove("open-down")):(this._$dropdown.style.top=`${t.bottom}px`,this._$dropdown.classList.add("open-down"),this._$dropdown.classList.remove("open-up")),this._$dropdown.classList.add("open"),this._optionIndex>=0){this._highlightIndex=this._optionIndex;const a=this._$options[this._highlightIndex];a?.classList.add("highlight"),a?.scrollIntoView({block:"nearest"})}window.addEventListener("scroll",this._handlers.documentClick,{capture:!0,passive:!0}),window.addEventListener("resize",this._handlers.documentClick)}_closeDropdown(){this._$options[this._highlightIndex]?.classList.remove("highlight"),this._highlightIndex=-1,this._$dropdown.classList.remove("open","open-up","open-down"),window.removeEventListener("scroll",this._handlers.documentClick,{capture:!0}),window.removeEventListener("resize",this._handlers.documentClick)}_handleDropdownClick(t){const e=t.composedPath().find(n=>n instanceof HTMLElement&&this._$options.includes(n));if(!e)return;const i=this._$options.indexOf(e);this.optionIndex=i,this._closeDropdown(),this._dropdown_open=!1}_handleSlotChange(){const t=this._$options[this._optionIndex];if(this._$options=this._$slot.assignedElements().filter(e=>e instanceof HTMLElement),this._pendingOptionIndex!==void 0){const e=this._pendingOptionIndex;this._pendingOptionIndex=void 0,this.optionIndex=e}else this.optionIndex=this._$options.findIndex(e=>e===t)}_handleKeydown(t){if((t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._dropdown_open?(this._$options[this._highlightIndex]&&(this.optionIndex=this._highlightIndex),this._$button.click()):this._$button.click()),t.key==="ArrowDown"||t.key==="ArrowUp"){if(t.preventDefault(),!this._dropdown_open||t.key==="ArrowDown"&&this._highlightIndex+1===this._$options.length||t.key==="ArrowUp"&&this._highlightIndex<=0)return;this._$options[this._highlightIndex]?.classList.remove("highlight"),this._highlightIndex=t.key==="ArrowDown"?this._highlightIndex+1:this._highlightIndex-1,this._$options[this._highlightIndex]?.classList.add("highlight"),this._$options[this._highlightIndex]?.scrollIntoView({block:"nearest"})}t.key==="Escape"&&this._dropdown_open&&this._$button.click()}static get observedAttributes(){return["option-index"]}attributeChangedCallback(t,e,i){this._aeroSelectAttributeHandlers[t]?.(i)}_aeroSelectAttributeHandlers={"option-index":t=>{this._updateOptionIndex(this._getValidateOptionIndexByStr(t??""))}};get optionIndex(){return this._optionIndex}set optionIndex(t){this.setAttribute("option-index",t.toString())}_updateOptionIndex(t){if(this._optionIndex===t)return;if(t<0){this._unsetOption();return}const e=this._$options[t];if(!e){this._$options.length===0?this._pendingOptionIndex=t:this._unsetOption();return}this._optionIndex=t,this._$span.textContent=e.textContent,this.forwardCustomEvent("aero-select-changed",{detail:{option:e,index:t}}),this._pendingOptionIndex=void 0}_getValidateOptionIndexByStr(t){if(t==="")return-1;const e=Number(t);return Number.isInteger(e)?e:-1}_unsetOption(){this._optionIndex=-1,this._$span.textContent=""}}class f extends HTMLElement{constructor(){super()}get value(){return this.getAttribute("value")??""}set value(t){this.setAttribute("value",t)}get label(){return this.textContent??""}}const A=`<style>
  :host {
    position: fixed;

    top: 90%;
    left: 50%;

    transform: translate(-50%, 10px);
    opacity: 0;

    animation: toast-fade linear forwards;

    border-radius: 5px;
  }

  #box {
    padding: 5px 10px;
  }

  @keyframes toast-fade {
    0% {
      transform: translate(-50%, 10px);
      opacity: 0;
    }
    10% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    90% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 10px);
      opacity: 0;
    }
  }
</style>

<div id="box">
  <span id="text"></span>
</div>
`,E={top:"90%",left:"50%",ms:3e3,background:"black",color:"white"};class c extends o{_$text;_ms;_removalTimer;_handleAnimationEnd=()=>this.remove();constructor(t="",e={}){super(A);const{top:i,left:n,ms:r,background:a,color:p}={...E,...e};this._ms=r,this._$text=this.query("#text"),this._$text.textContent=t,this.applyStyles(`
      :host {
        top: ${i};
        left: ${n};
        animation-duration: ${this._ms}ms;
        background: ${a};
        color: ${p};
      }
    `)}connectedCallback(){this.addEventListener("animationend",this._handleAnimationEnd,{once:!0}),this._removalTimer=window.setTimeout(()=>this.remove(),this._ms+100)}disconnectedCallback(){this.removeEventListener("animationend",this._handleAnimationEnd),window.clearTimeout(this._removalTimer)}static show(t,e={}){document.body.appendChild(new c(t,e))}}const x=`<style>
  :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #overlay {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    min-width: 300px;
    min-height: 200px;

    display: grid;
    grid-template-rows: 1fr 4fr;
    grid-template-columns: 1fr;
  }

  #head {
    display: grid;
    place-items: center;
    font-weight: bold;
  }

  #body {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;

    place-items: center;
  }

  #button-box {
    padding: 10px;
  }

  button {
    min-width: 70px;
    min-height: 30px;
    border: none;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  button:active {
    scale: 0.99;
  }
</style>

<div id="overlay">
  <div id="container">
    <div id="head">
      <span id="title"></span>
    </div>
    <div id="body">
      <span id="message"></span>
      <div id="button-box">
        <button id="ok">ok</button>
      </div>
    </div>
  </div>
</div>
`,C=`<style>
  :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #overlay {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    min-width: 300px;
    min-height: 200px;

    display: grid;
    grid-template-rows: 1fr 4fr;
    grid-template-columns: 1fr;
  }

  #head {

  }

  #body {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;

    place-items: center;
  }

  #button-box {
    display: flex;
    gap: 10px;
    padding: 10px;
  }

  button {
    min-width: 70px;
    min-height: 30px;
    border: none;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  button:active {
    scale: 0.99;
  }
</style>

<div id="overlay">
  <div id="container">
    <div id="head"></div>
    <div id="body">
      <span id="message"></span>
      <div id="button-box">
        <button id="ok">ok</button>
        <button id="cancel">cancel</button>
      </div>
    </div>
  </div>
</div>
`,I={fontSize:"1rem",containerBorder:"1px solid lightgrey",containerBoxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)",primaryBackgroundColor:`${{blue_5:"#2563eb"}.blue_5}`,primaryColor:"white",secondaryBackgroundColor:"grey",secondaryColor:"white",buttonBorderRadius:"0"};class u extends o{_$message;_$ok;_$cancel;_resolve;_previousFocus=null;constructor(t=x,e="",i={}){super(t);const{fontSize:n,containerBorder:r,containerBoxShadow:a,primaryBackgroundColor:p,primaryColor:H,secondaryBackgroundColor:L,secondaryColor:D,buttonBorderRadius:M}={...I,...i};this._$message=this.query("#message"),this._$message.textContent=e,this._$ok=this.query("#ok"),this._$cancel=this.queryOptional("#cancel"),this.applyStyles(`
      #container {
        font-size: ${n};
        border: ${r};
        box-shadow: ${a};
      }

      #head {
        background: ${p};
      }

      button {
        font-size: ${n};
        border-radius: ${M}
      }

      #ok {
        background-color: ${p};
        color: ${H};
      }

      #cancel {
        background-color: ${L};
        color: ${D};
      }
    `),this._$ok.onclick=()=>this._settle(!0),this._$cancel&&(this._$cancel.onclick=()=>this._settle(!1))}connectedCallback(){window.addEventListener("keydown",this._handleKeyDown),this._previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this._$ok.focus()}disconnectedCallback(){window.removeEventListener("keydown",this._handleKeyDown),this._previousFocus?.focus(),this._previousFocus=null,this._resolve?.(!1),this._resolve=void 0}_settle(t){const e=this._resolve;this._resolve=void 0,this.remove(),e?.(t)}_handleKeyDown=t=>{const e=document.querySelectorAll("aero-popup");e[e.length-1]===this&&(t.key==="Enter"?(t.preventDefault(),this._$ok.click()):t.key==="Escape"&&(t.preventDefault(),this._$cancel?this._$cancel.click():this._$ok.click()))};static alert(t,e={}){return this._create(x,t,e)}static confirm(t,e={}){return this._create(C,t,e)}static _create(t,e,i){return new Promise(n=>{const r=new u(t,e,i);r._resolve=n,document.body.appendChild(r)})}}const S=`<style>

</style>

<div id="list"></div>
<div class="highlight"></div>
`;class h extends o{_items=[];_$list;_itemHeight=0;_visibleCount=5;_maxHeight=0;_index=0;_y=0;_startY=0;_isDown=!1;_onPointerDown=t=>{this._isDown=!0,this._startY=t.pageY,this._$list.style.transition="none",window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp)};_onPointerMove=t=>{if(!this._isDown)return;const e=t.pageY-this._startY;this._startY=t.pageY;const i=this._y+e,n=Math.max(this._maxHeight,Math.min(0,i));this._move(n)};_onPointerUp=()=>{this._isDown&&(this._isDown=!1,window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),this._end())};_wheelTimer;_onWheel=t=>{t.preventDefault();const e=this._y-t.deltaY,i=Math.max(this._maxHeight,Math.min(0,e));this._move(i),clearTimeout(this._wheelTimer),this._wheelTimer=window.setTimeout(()=>{this._end()},100)};constructor(){super(S),this._$list=this.query("#list"),this._itemHeight=h._parseItemHeight(this.getAttribute("item-height")),this._visibleCount=h._parseVisibleCount(this.getAttribute("visible-count")),this._syncStyles()}static _parseItemHeight(t){const e=parseInt(t??"");return isNaN(e)||e<=0?30:e}static _parseVisibleCount(t){const e=parseInt(t??""),i=isNaN(e)||e<1?5:e;return i%2===0?i+1:i}connectedCallback(){this.addEventListener("pointerdown",this._onPointerDown),this.addEventListener("wheel",this._onWheel,{passive:!1})}disconnectedCallback(){this.removeEventListener("pointerdown",this._onPointerDown),this.removeEventListener("wheel",this._onWheel)}static get observedAttributes(){return["item-height","visible-count"]}attributeChangedCallback(t,e,i){this._aeroRollerAttributeHandlers[t]?.(i)}_aeroRollerAttributeHandlers={"item-height":t=>{this._updateItemHeight(h._parseItemHeight(t))},"visible-count":t=>{this._updateVisibleCount(h._parseVisibleCount(t))}};setItems(t){this._items=t,this._updateMaxHeight(),this._render(),this._reset()}_updateItemHeight(t){this._itemHeight=t,this._updateMaxHeight(),this._syncStyles(),this.scrollToIndex(this._index)}_updateVisibleCount(t){this._visibleCount=t,this._syncStyles(),this._render(),this.scrollToIndex(this._index)}_updateMaxHeight(){const t=Math.max(0,this._items.length-1);this._maxHeight=-t*this._itemHeight}_syncStyles(){this.applyStyles(`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :host {
        position: relative;
        display: block;
        height: ${this._itemHeight*this._visibleCount}px;
        overflow: hidden;
      }

      #list {
      }

      .item {
        height: ${this._itemHeight}px;

        text-align: center;
        line-height: ${this._itemHeight}px;

        user-select: none;
        cursor: var(--aero-roller-item-cursor);
      }

      .highlight {
        position: absolute;
        top: 50%;
        left: 0;

        width: 100%;
        height: ${this._itemHeight}px;
        transform: translateY(-50%);

        pointer-events: none;

        border-top: var(--aero-roller-highlight-border-top, var(--aero-roller-highlight-border, none));
        border-bottom: var(--aero-roller-highlight-border-bottom, var(--aero-roller-highlight-border, none));
        border-left: var(--aero-roller-highlight-border-left, var(--aero-roller-highlight-border, none));
        border-right: var(--aero-roller-highlight-border-right, var(--aero-roller-highlight-border, none));

        background: var(--aero-roller-highlight-bg, none);
      }
    `)}_render(){const t=Math.floor(this._visibleCount/2),e=i=>{const n=document.createElement("div");n.className="item",n.textContent=i,this._$list.appendChild(n)};this._$list.textContent="";for(let i=0;i<t;i++)e("");this._items.forEach(i=>e(String(i)));for(let i=0;i<t;i++)e("")}_reset(){this._index=0,this._move(0,!0)}get index(){return this._index}scrollToIndex(t){const e=Math.max(0,this._items.length-1),i=Math.max(0,Math.min(t,e));this._index=i;const n=-(i*this._itemHeight);this._$list.style.transition="transform 0.2s ease-out",this._move(n,!0),setTimeout(()=>{this._$list.style.transition="none"},200)}get current(){return this._items[this._index]}_move(t,e=!1){this._y=t,e?this._$list.style.transition="none":this._$list.style.transition="transform 0.2s ease-out",this._$list.style.transform=`translateY(${this._y}px)`}_end(){const t=this._index,e=Math.round(Math.abs(this._y/this._itemHeight));this.scrollToIndex(e),this._index!==t&&this.forwardCustomEvent("change",{detail:{index:this._index,value:this._items[this._index]}})}}customElements.define("aero-numeric-input",g),customElements.define("aero-spinbox",m),customElements.define("aero-indeterminate-spinner",b),customElements.define("aero-resizable-box",l),customElements.define("aero-select",v),customElements.define("aero-option",f),customElements.define("aero-toast",c),customElements.define("aero-popup",u),customElements.define("aero-roller",h),s.AeroIndeterminateSpinner=b,s.AeroNumericInput=g,s.AeroOption=f,s.AeroPopup=u,s.AeroResizableBox=l,s.AeroRoller=h,s.AeroSelect=v,s.AeroSpinbox=m,s.AeroToast=c,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})}));
