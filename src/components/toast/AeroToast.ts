import AeroToastHtml from "./AeroToast.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";

/**
 * Configuration options for toast notifications.
 *
 * @typedef {Object} AeroToastOptions
 * @property {string} top - Vertical position of the toast.
 * @property {string} left - Horizontal position of the toast.
 * @property {number} ms - Duration in milliseconds before the toast disappears.
 * @property {string} background - Background color of the toast.
 * @property {string} color - Text color of the toast.
 */
export type AeroToastOptions = {
	top?: string;
	left?: string;
	ms?: number;
	background?: string;
	color?: string;
};

const defaultAeroToastOptions: AeroToastOptions = {
	top: "90%",
	left: "50%",
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

	constructor(text: string, options: AeroToastOptions) {
		super(AeroToastHtml);

		const { top, left, ms, background, color } = options;

		this._$text = this.query<HTMLElement>("#text");
		this._$text.textContent = text;

		this.applyStyles(`
			:host {
				top: ${top};
				left: ${left};
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
	 * @param {Partial<AeroToastOptions>} options - Optional configuration for the toast appearance and behavior.
	 * @returns {void}
	 * @static
	 *
	 * @example
	 * AeroToast.show('Hello World!');
	 * AeroToast.show('Success!', { background: 'green', ms: 3000 });
	 */
	static show(text: string, options: Partial<AeroToastOptions> = {}) {
		const resolvedOptions: AeroToastOptions = {
			...defaultAeroToastOptions,
			...options,
		};

		new AeroToast(text, resolvedOptions);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"aero-toast": AeroToast;
	}
}

customElements.define("aero-toast", AeroToast);
