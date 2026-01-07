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
 * @property {string} width - The width of the spinner in pixels.
 * @property {string} height - The height of the spinner in pixels.
 * @property {string} background - The color of the spinner's track.
 * @property {string} color - The color of the spinner's moving part.
 * @property {string} cycle - The duration of one spin cycle in seconds.
 */
export class AeroProgressSpinner extends AeroShadowElement {
	constructor() {
		super(aeroProgressSpinnerHtmlTemplate);
		this._updateSpinnerStyles();
	}

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return ["width", "height", "background", "color", "cycle"];
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
	 * Using :host instead of an inner element means styles are applied to the custom element itself.
	 * Re-appending styles multiple times can cause conflicts or unexpected behavior.
	 * @private
	 */
	private _updateSpinnerStyles() {
		const width = this.getAttribute("width") || "50";
		const height = this.getAttribute("height") || "50";
		const bg = this.getAttribute("background") || "white";
		const color = this.getAttribute("color") || "black";
		const cycle = this.getAttribute("cycle") || "1";

		this.applyStyles(`
			:host {
				width: ${width}px;
				height: ${height}px;
				border: 5px solid ${bg};
				border-top-color: ${color};
				border-radius: 50%;
				animation: spin ${cycle}s linear infinite;
				box-sizing: border-box;
			}

			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
		`);
	}

	/**
	 * The width of the spinner in pixels.
	 * @param {string} val - The width value.
	 * @attr
	 * @default "50"
	 */
	set width(val: string) {
		this.setAttribute("width", val);
	}

	/**
	 * The height of the spinner in pixels.
	 * @param {string} val - The height value.
	 * @attr
	 * @default "50"
	 */
	set height(val: string) {
		this.setAttribute("height", val);
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
	 * @param {string} val - The cycle duration.
	 * @attr
	 * @default "1"
	 */
	set cycle(val: string) {
		this.setAttribute("cycle", val);
	}
}

customElements.define("aero-progress-spinner", AeroProgressSpinner);
