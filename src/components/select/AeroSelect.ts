import aeroSelectHtmlTemplate from "./AeroSelect.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";

/**
 * @module components
 */

/**
 * `<aero-select>` is a custom select element that provides a customizable dropdown selection.
 * It uses `<aero-option>` elements as its options.
 *
 * @element aero-select
 * @fires aero-select-changed - Fired when the selected option changes.
 *
 * @slot - Default slot for `<aero-option>` elements.
 *
 * @cssprop --aero-select-width - Width of the select component.
 * @cssprop --aero-select-height - Height of the select component.
 * @cssprop --aero-select-font-size - Font size for the select text.
 * @cssprop --aero-select-font-family - Font family for the select text.
 * @cssprop --aero-select-border - Border style for the select component.
 * @cssprop --aero-select-dropdown-border - Border style for the dropdown container.
 * @cssprop --aero-select-dropdown-z-index - Z-index for the dropdown container.
 * @cssprop --aero-select-dropdown-item-border - Border style for individual dropdown items.
 * @cssprop --aero-select-dropdown-item-background - Background color for individual dropdown items.
 * @cssprop --aero-select-dropdown-item-color - Text color for individual dropdown items.
 * @cssprop --aero-select-dropdown-hover-item-border - Border style for dropdown items on hover.
 * @cssprop --aero-select-dropdown-hover-item-background - Background color for dropdown items on hover.
 * @cssprop --aero-select-dropdown-hover-item-color - Text color for dropdown items on hover.
 * @cssprop --aero-select-dropdown-hover-item-cursor - Cursor style for dropdown items on hover.
 * @cssprop --aero-select-span-background - Background color for the displayed selected option text.
 * @cssprop --aero-select-span-border - Border style for the displayed selected option text.
 * @cssprop --aero-select-button-border - Border style for the dropdown toggle button.
 * @cssprop --aero-select-button-background - Background color for the dropdown toggle button.
 * @cssprop --aero-select-button-color - Text color for the dropdown toggle button.
 * @cssprop --aero-select-button-hover-border - Border style for the dropdown toggle button on hover.
 * @cssprop --aero-select-button-hover-background - Background color for the dropdown toggle button on hover.
 * @cssprop --aero-select-button-hover-color - Text color for the dropdown toggle button on hover.
 * @cssprop --aero-select-button-hover-cursor - Cursor style for the dropdown toggle button on hover.
 *
 * @extends AeroShadowElement
 */
export class AeroSelect extends AeroShadowElement {
	/** @private */
	private _handlers = {
    documentClick: this._handleDocumentClick.bind(this),
    buttonClick: this._handleButtonClick.bind(this),
    dropdownClick: this._handleDropdownClick.bind(this),
    slotChange: this._handleSlotChange.bind(this),
    keydown: this._handleKeydown.bind(this),
  };

	/**
	 * The `<span>` element displaying the currently selected option's text.
	 * @private
	 */
	private _$span: HTMLElement;
	/**
	 * The button element that toggles the dropdown.
	 * @private
	 */
	private _$button: HTMLElement;
	/**
	 * The dropdown container element.
	 * @private
	 */
	private _$dropdown: HTMLElement;
	/**
	 * An array of `<aero-option>` elements assigned to the slot.
	 * @private
	 */
	private _$options: HTMLElement[] = [];
	/**
	 * The index of the currently selected option.
	 * @private
	 */
	private _optionIndex = -1;
	/**
	 * Indicates whether the dropdown is currently open.
	 * @private
	 */
	private _dropdown_open = false;
	/**
	 * The slot element that holds the `<aero-option>` elements.
	 * @private
	 */
	private _$slot: HTMLSlotElement;
	/**
	 * The index of the currently highlighted option (for keyboard navigation).
	 * @private
	 */
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

	/**
	 * Lifecycle callback: Invoked when the component is added to the DOM.
	 * Sets up event listeners.
	 * @returns {void}
	 */
  connectedCallback() {
    document.addEventListener("click", this._handlers.documentClick);
    this._$button.addEventListener("click", this._handlers.buttonClick);
    this._$dropdown.addEventListener("click", this._handlers.dropdownClick);
    this._$slot?.addEventListener("slotchange", this._handlers.slotChange);
    this.addEventListener("keydown", this._handlers.keydown);
  }

	/**
	 * Lifecycle callback: Invoked when the component is removed from the DOM.
	 * Cleans up event listeners to prevent memory leaks.
	 * @returns {void}
	 */
  disconnectedCallback() {
    document.removeEventListener("click", this._handlers.documentClick);
    this._$button.removeEventListener("click", this._handlers.buttonClick);
    this._$dropdown.removeEventListener("click", this._handlers.dropdownClick);
    this._$slot?.removeEventListener("slotchange", this._handlers.slotChange);
    this.removeEventListener("keydown", this._handlers.keydown);
  }

	/**
	 * Handles clicks anywhere on the document to close the dropdown if open.
	 * @private
	 * @param {MouseEvent} [e] - The mouse event.
	 * @returns {void}
	 */
	private _handleDocumentClick(e?: MouseEvent) {
    if (this._dropdown_open && e?.target !== this) {
      this._$dropdown.classList.remove("open");
      this._dropdown_open = false;
    }
  }

	/**
	 * Handles clicks on the dropdown toggle button.
	 * @private
	 * @param {MouseEvent} e - The mouse event.
	 * @returns {void}
	 */
	private _handleButtonClick(e: MouseEvent) {
		e.stopPropagation();
		this._$dropdown.classList.toggle("open");
		this._dropdown_open = !this._dropdown_open;
	}

	/**
	 * Handles clicks within the dropdown menu.
	 * @private
	 * @param {MouseEvent} e - The mouse event.
	 * @returns {void}
	 */
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

	/**
	 * Handles changes to the slotted `<aero-option>` elements.
	 * @private
	 * @returns {void}
	 */
	private _handleSlotChange() {
		const $preOption = this._$options[this._optionIndex];

		this._$options = this._$slot
			.assignedElements()
			.filter((el): el is HTMLElement => el instanceof HTMLElement);

		this.optionIndex = this._$options.findIndex((o) => o === $preOption);
	}

	/**
	 * Handles keyboard navigation within the select component.
	 * @private
	 * @param {KeyboardEvent} e - The keyboard event.
	 * @returns {void}
	 */
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

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return ["option-index"];
	}

	/**
	 * Called when an observed attribute has been added, removed, or changed.
	 * @param {string} name - The name of the attribute that changed.
	 * @param {string | null} _oldValue - The old value of the attribute.
	 * @param {string | null} newValue - The new value of the attribute.
	 * @returns {void}
	 */
	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this._aeroSelectAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions for this component.
	 * @private
	 */
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

	/**
	 * The zero-based index of the currently selected option.
	 * Setting this property will update the displayed value and fire the `aero-select-changed` event.
	 * @type {number}
	 * @attr option-index
	 * @default -1 (no option selected)
	 */
	get optionIndex(): number {
		return this._optionIndex;
	}
	set optionIndex(option: number) {
		this.setAttribute("option-index", option.toString());
	}

	/**
	 * Updates the currently selected option based on the provided index.
	 * @private
	 * @param {number} index - The index of the option to select.
	 * @returns {void}
	 */
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

		/**
		 * Fired when the selected option changes.
		 * @event aero-select-changed
		 * @type {CustomEvent<{ option: HTMLElement, index: number }>}
		 */
		this.forwardCustomEvent("aero-select-changed", {
			detail: {
				option: option,
				index: index,
			},
		});
	}

	/**
	 * Validates and converts a string to a numeric option index.
	 * @private
	 * @param {string} index - The string representation of the index.
	 * @returns {number} The validated numeric index, or -1 if invalid.
	 */
	private _getValidateOptionIndexByStr(index: string): number {
		if (index === "") return -1; // Number("") is 0, so treat empty input as an invalid index.
		const i = Number(index);
		return Number.isNaN(i) ? -1 : i;
	}

	/**
	 * Resets the select component to an unselected state.
	 * @private
	 * @returns {void}
	 */
	private _unsetOption() {
		this._optionIndex = -1;
		this._$span.textContent = "";
	}
}

customElements.define("aero-select", AeroSelect);

