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
 * Use the static `show()` method; a manually constructed instance must be
 * appended to the DOM by the caller.
 *
 * @extends AeroShadowElement
 */
export class AeroToast extends AeroShadowElement {
	private _$text: HTMLElement;
	private _ms: number;
	private _removalTimer?: number;

	private _handleAnimationEnd = () => this.remove();

	constructor(text: string = "", options: AeroToastOptions = {}) {
		super(AeroToastHtml);

		const { top, left, ms, background, color } = {
			...defaultAeroToastOptions,
			...options,
		};

		// Guard against invalid durations so the toast is always removed.
		this._ms =
			typeof ms === "number" && Number.isFinite(ms) && ms > 0
				? ms
				: (defaultAeroToastOptions.ms as number);

		this._$text = this.query<HTMLElement>("#text");
		this._$text.textContent = text;

		this.applyStyles(`
			:host {
				top: ${top};
				left: ${left};
				animation-duration: ${this._ms}ms;
				background: ${background};
				color: ${color};
			}
		`);
	}

	connectedCallback() {
		this.addEventListener("animationend", this._handleAnimationEnd, {
			once: true,
		});

		/**
		 * Fallback removal for environments where the CSS animation never
		 * finishes (e.g. 'animation: none' user styles or a hidden ancestor),
		 * so the toast cannot linger in the DOM forever.
		 */
		this._removalTimer = window.setTimeout(
			() => this.remove(),
			this._ms + 100
		);
	}

	disconnectedCallback() {
		this.removeEventListener("animationend", this._handleAnimationEnd);
		window.clearTimeout(this._removalTimer);
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
		document.body.appendChild(new AeroToast(text, options));
	}
}
