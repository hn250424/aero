import AeroAlertHtml from "./AeroAlert.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";
import type { AeroPopupOptions } from "./AeroPopupOptions";

const defaultAeroPopupOptions: AeroPopupOptions = {
	fontSize: "1.2rem",
	containerBorder: "1px solid #bdbdbd",
	containerBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	titleBoundaryColor: "#bdbdbd",
	buttonBackgroundColor: "#616161",
	buttonColor: "white",
	buttonBorderRadius: "0",
};

/**
 * @module components
 */

/**
 * A alert component for displaying notifications to users without blocking main processor.
 *
 * @extends AeroShadowElement
 */
export class AeroAlert extends AeroShadowElement {
	private _$title: HTMLElement;
	private _$message: HTMLElement;
	private _$ok: HTMLElement;

	private _resolve?: () => void;

	constructor(title: string, message: string, options: AeroPopupOptions) {
		super(AeroAlertHtml);

		const {
			fontSize,
			containerBorder,
			containerBoxShadow,
			titleBoundaryColor,
			buttonBackgroundColor,
			buttonColor,
			buttonBorderRadius,
		} = options;

		this._$title = this.query("#title");
		this._$message = this.query("#message");
		this._$title.textContent = title;
		this._$message.textContent = message;

		this._$ok = this.query("#ok");

		this.applyStyles(`
			:host {

			}

			#container {
				font-size: ${fontSize};
				border: ${containerBorder};
				box-shadow: ${containerBoxShadow};
			}

			#head {
				border-bottom: 1px solid ${titleBoundaryColor};
			}

			button {
				font-size: ${fontSize};
				background-color: ${buttonBackgroundColor};
				color: ${buttonColor};
				border-radius: ${buttonBorderRadius}
			}
		`);

		this._$ok.onclick = () => {
			this.remove();
			if (this._resolve) this._resolve();
		};

		document.body.appendChild(this);
	}

	/**
	 * Displays a alert notification on the screen.
	 *
	 * @param {string} title - A title content to display in the alert.
	 * @param {string} message - A message content to display in the alert.
	 * @returns {void}
	 * @static
	 *
	 * @example
	 * AeroAlert.show('Hello World!');
	 */
	static show(
		title: string,
		message: string,
		options: Partial<AeroPopupOptions> = {}
	): Promise<void> {
		const resolvedOptions: AeroPopupOptions = {
			...defaultAeroPopupOptions,
			...options,
		};

		return new Promise((resolve) => {
			const alert = new AeroAlert(title, message, resolvedOptions);
			alert._resolve = resolve;
		});
	}
}

customElements.define("aero-alert", AeroAlert);
