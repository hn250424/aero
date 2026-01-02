import aeroSelectHtmlTemplate from "./AeroSelect.html?raw";
import { AeroShadowElement } from "@core/AeroShadowElement";

// aero-select의 보더 스타일을 적용하고 싶다면 변수 --aero-border를 이용해라
// aero-select의 박스사이징은 보더박스로 적용된다
export class AeroSelect extends AeroShadowElement {
	private overlay: HTMLElement;
	private container: HTMLElement;
	private current: HTMLElement;
	private button: HTMLElement;
	private dropdown: HTMLElement;

	constructor() {
		super(aeroSelectHtmlTemplate);

		this.overlay= this.query("#overlay");
		this.container= this.query("#container");
		this.current= this.query("#current");
		this.button= this.query("#button");
		this.dropdown= this.query("#dropdown");

		this.applyStyles(
			`#dropdown {
				
			}`
		)
	}



}

customElements.define("aero-select", AeroSelect);

// slot 제한
// 제트 인덱스
// 이벤트
// 버튼 텍스트 자꾸 바꿔도?
