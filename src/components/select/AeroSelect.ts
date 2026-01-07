import aeroSelectHtmlTemplate from "./AeroSelect.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";

// aero-select의 보더 스타일을 적용하고 싶다면 변수 --aero-border를 이용해라
// aero-select의 박스사이징은 보더박스로 적용된다
export class AeroSelect extends AeroShadowElement {
	private _handlers = {
    documentClick: this._handleDocumentClick.bind(this),
    buttonClick: this._handleButtonClick.bind(this),
    dropdownClick: this._handleDropdownClick.bind(this),
    slotChange: this._handleSlotChange.bind(this),
    keydown: this._handleKeydown.bind(this),
  };

	private _$span: HTMLElement;
	private _$button: HTMLElement;
	private _$dropdown: HTMLElement;
	private _$options: HTMLElement[] = [];
	private _optionIndex = -1;
	private _dropdown_open = false;
	private _$slot: HTMLSlotElement;
	private _highlightIndex = -1;

	constructor() {
		super(aeroSelectHtmlTemplate);

		this._$span = this.query("#span");
		this._$button = this.query("#button");
		this._$dropdown = this.query("#dropdown");
		this._$slot = this.query("slot") as HTMLSlotElement;
		this._$options = (this._$slot?.assignedElements() ?? []).filter(
			(el): el is HTMLElement => el instanceof HTMLElement
		);

		this._$button.textContent = this.getAttribute("button-text") ?? "▽";

		this._updateOptionIndex(
			this._getValidateOptionIndexByStr(
				this.getAttribute("option-index") ?? "0"
			)
		);
	}

  connectedCallback() {
    document.addEventListener("click", this._handlers.documentClick);
    this._$button.addEventListener("click", this._handlers.buttonClick);
    this._$dropdown.addEventListener("click", this._handlers.dropdownClick);
    this._$slot?.addEventListener("slotchange", this._handlers.slotChange);
    this.addEventListener("keydown", this._handlers.keydown);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this._handlers.documentClick);
    this._$button.removeEventListener("click", this._handlers.buttonClick);
    this._$dropdown.removeEventListener("click", this._handlers.dropdownClick);
    this._$slot?.removeEventListener("slotchange", this._handlers.slotChange);
    this.removeEventListener("keydown", this._handlers.keydown);
  }

	private _handleDocumentClick() {
    if (this._dropdown_open) {
      this._$dropdown.classList.remove("open");
      this._dropdown_open = false;
    }
  }

	private _handleButtonClick(e: MouseEvent) {
		e.stopPropagation();
		this._$dropdown.classList.toggle("open");
		this._dropdown_open = !this._dropdown_open;
	}

	private _handleDropdownClick(e: MouseEvent) {
		const item = e
			.composedPath()
			.find(
				(node): node is HTMLElement =>
					node instanceof HTMLElement && this._$options.includes(node)
			);

		if (!item) return;

		const idx = this._$options.indexOf(item);
		this.optionIndex = idx;
		this._$dropdown.classList.remove("open");
		this._dropdown_open = false;
	}

	private _handleSlotChange() {
		const $preOption = this._$options[this._optionIndex];

		this._$options = this._$slot
			.assignedElements()
			.filter((el): el is HTMLElement => el instanceof HTMLElement);

		this.optionIndex = this._$options.findIndex((o) => o === $preOption);
	}

	private _handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") { // Enter, Spacebar
			e.preventDefault();

			if (!this._dropdown_open) {
				this._$button.click(); // Open.
			} else {
				const opt = this._$options[this._highlightIndex];
				if (opt) {
					opt.classList.remove("highlight");
					this.optionIndex = this._highlightIndex;
				}
				this._highlightIndex = -1;
				this._$button.click();
			}
		}

		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			if (!this._dropdown_open) return;

			if (e.key === "ArrowDown" && this._highlightIndex + 1 === this._$options.length) return;
			if (e.key === "ArrowUp" && this._highlightIndex === -1) return;

			this._$options[this._highlightIndex]?.classList.remove("highlight");
			this._highlightIndex = e.key === "ArrowDown" ? this._highlightIndex + 1 : this._highlightIndex - 1;
			this._$options[this._highlightIndex]?.classList.add("highlight");
			this._$options[this._highlightIndex]?.scrollIntoView({ block: "nearest" });
		}

		if (e.key === "Escape" && this._dropdown_open) {
			this._$button.click();
			this._highlightIndex = -1;
		}
	}

	static get observedAttributes() {
		return ["option-index"];
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this._aeroSelectAttributeHandlers[name]?.(newValue);
	}

	private _aeroSelectAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		"option-index": (newValue) => {
			this._updateOptionIndex(
				this._getValidateOptionIndexByStr(newValue ?? "")
			);
		},
	};

	get optionIndex() {
		return this._optionIndex;
	}
	set optionIndex(option: number) {
		this.setAttribute("option-index", option.toString());
	}

	private _updateOptionIndex(index: number) {
		if (this._optionIndex === index) return;

		if (index < 0) {
			this._unsetOption();
			return;
		}

		const option = this._$options[index];
		if (!option) {
			this._unsetOption();
			return;
		}

		this._optionIndex = index;
		this._$span.textContent = option.textContent;

		this.forwardCustomEvent("aero-select-changed", {
			detail: {
				option: option,
				index: index,
			},
		});
	}

	private _getValidateOptionIndexByStr(index: string) {
		if (index === "") return -1; // Number("") is 0, so treat empty input as an invalid index.
		const i = Number(index);
		return Number.isNaN(i) ? -1 : i;
	}

	private _unsetOption() {
		this._optionIndex = -1;
		this._$span.textContent = "";
	}
}

customElements.define("aero-select", AeroSelect);
