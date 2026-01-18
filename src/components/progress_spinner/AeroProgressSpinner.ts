import { AeroShadowElement } from "../../core/AeroShadowElement";
import aeroProgressSpinnerHtmlTemplate from "./AeroProgressSpinner.html?raw";

/**
 * @module components
 */

/**
 * A circular progress spinner component.
 *
 * @extends AeroShadowElement
 *
 * @property {number} width - The width of the spinner in pixels.
 * @property {number} height - The height of the spinner in pixels.
 * @property {number} thickness - The thickness of the spinner in pixels.
 * @property {string} background - The color of the spinner's track.
 * @property {string} color - The color of the spinner's moving part.
 * @property {number} cycle - The duration of one spin cycle in seconds.
 */
export class AeroProgressSpinner extends AeroShadowElement {
	private _$spinner: HTMLElement;

	constructor() {
		super(aeroProgressSpinnerHtmlTemplate);

		this._$spinner = this.query("#spinner");
		this._updateSpinnerStyles();
	}

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return ["width", "height", "thickness", "background", "color", "cycle"];
	}

	/**
	 * Called when an observed attribute has been added, removed, or changed.
	 */
	attributeChangedCallback(
		_name: string,
		_oldValue: string | null,
		_newValue: string | null
	) {
		this._updateSpinnerStyles();
	}

	/**
	 * Updates the spinner's styles based on its current attributes.
	 * @private
	 */
	private _updateSpinnerStyles() {
		const width = this.getAttribute("width") || "50";
		const height = this.getAttribute("height") || "50";
		const thickness = this.getAttribute("thickness") || "2";
		const bg = this.getAttribute("background") || "white";
		const color = this.getAttribute("color") || "black";
		const cycle = this.getAttribute("cycle") || "1";

		this.applyStyles(`
			#spinner {
				width: ${width}px;
        height: ${height}px;
        border: ${thickness}px solid ${color};
        border-right-color: ${bg};
        animation-duration: ${cycle}s;
			}
		`);
	}

	/**
	 * The width of the spinner in pixels.
	 * @param {number} val - The width value.
	 * @attr
	 * @default 50
	 */
	set width(val: number) {
		this.setAttribute("width", String(val));
	}

	/**
	 * The height of the spinner in pixels.
	 * @param {number} val - The height value.
	 * @attr
	 * @default 50
	 */
	set height(val: number) {
		this.setAttribute("height", String(val));
	}

	/**
	 * The thickness of the spinner in pixels.
	 * @param {number} val - The thickness value.
	 * @attr
	 * @default 2
	 */
	set thickness(val: number) {
		this.setAttribute("thickness", String(val));
	}

	/**
	 * The color of the spinner's track.
	 * @param {string} val - The background color value.
	 * @attr
	 * @default "white"
	 */
	set background(val: string) {
		this.setAttribute("background", val);
	}

	/**
	 * The color of the spinner's moving part.
	 * @param {string} val - The color value.
	 * @attr
	 * @default "black"
	 */
	set color(val: string) {
		this.setAttribute("color", val);
	}

	/**
	 * The duration of one spin cycle in seconds.
	 * @param {number} val - The cycle duration.
	 * @attr
	 * @default 1
	 */
	set cycle(val: number) {
		this.setAttribute("cycle", String(val));
	}

	/**
	 * Starts the spinner animation.
	 */
	spin() {
		this._$spinner.classList.add("spin");
	}

	/**
	 * Stops the spinner animation and pauses at the current position.
	 */
	stop() {
		this._$spinner.classList.remove("spin");
	}
}

customElements.define("aero-progress-spinner", AeroProgressSpinner);
