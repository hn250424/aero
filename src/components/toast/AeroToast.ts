import AeroToastHtml from "./AeroToast.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";

/**
 * Configuration options for toast notifications.
 *
 * @typedef {Object} ToastOptions
 * @property {number} top - Vertical position of the toast as a percentage (0-100).
 * @property {number} left - Horizontal position of the toast as a percentage (0-100).
 * @property {number} ms - Duration in milliseconds before the toast disappears.
 * @property {string} background - Background color of the toast.
 * @property {string} color - Text color of the toast.
 */
type ToastOptions = {
	top: number;
	left: number;
	ms: number;
	background: string;
	color: string;
};

const defaultToastOptions: ToastOptions = {
	top: 90,
	left: 50,
	ms: 3000,
	background: "black",
	color: "white",
};

/**
 * @module components
 */

/**
 * A toast component for displaying temporary notifications to users.
 *
 * @extends AeroShadowElement
 */
export class AeroToast extends AeroShadowElement {
	private _$text: HTMLElement;

	constructor(text: string, options: ToastOptions) {
		super(AeroToastHtml);

		const { top, left, ms, background, color } = options;

		this._$text = this.query("#text");
		this._$text.textContent = text;

		this.applyStyles(`
			:host {
				top: ${top}%;
				left: ${left}%;
				animation-duration: ${ms}ms;
				background: ${background};
				color: ${color};
			}
		`);

		document.body.appendChild(this);

		this.addEventListener(
			"animationend",
			() => {
				this.remove();
			},
			{ once: true }
		);
	}

	/**
	 * Displays a toast notification on the screen.
	 *
	 * @param {string} text - A text content to display in the toast.
	 * @param {Partial<ToastOptions>} options - Optional configuration for the toast appearance and behavior.
	 * @returns {void}
	 * @static
	 *
	 * @example
	 * AeroToast.show('Hello World!');
	 * AeroToast.show('Success!', { background: 'green', ms: 3000 });
	 */
	static show(text: string, options: Partial<ToastOptions> = {}) {
		const resolvedOptions: ToastOptions = {
			...defaultToastOptions,
			...options,
		};

		new AeroToast(text, resolvedOptions);
	}
}

customElements.define("aero-toast", AeroToast);
