import AeroAlertHtml from "./AeroAlert.html?raw";
import AeroConfirmHtml from "./AeroConfirm.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";
import { colors } from "../../constants"

/**
 * Configuration options for the popup notifications.
 *
 * @typedef {Object} AeroPopupOptions
 * @property {string} [fontSize="1rem"] - Font size for the popup content and buttons.
 * @property {string} [containerBorder="1px solid lightgrey"] - Border style for the popup container.
 * @property {string} [containerBoxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"] - Box shadow for the popup container.
 * @property {string} [titleBoundaryColor="lightgrey"] - Color of the border between title and message.
 * @property {string} [buttonPrimaryBackgroundColor="#2563eb"] - Background color for the OK button.
 * @property {string} [buttonPrimaryColor="white"] - Text color for the OK button.
 * @property {string} [buttonSecondaryBackgroundColor="grey"] - Background color for the Cancel button.
 * @property {string} [buttonSecondaryColor="white"] - Text color for the Cancel button.
 * @property {string} [buttonBorderRadius="0"] - Border radius for both buttons.
 */
export type AeroPopupOptions = {
	fontSize?: string;
	containerBorder?: string;
	containerBoxShadow?: string;
	titleBoundaryColor?: string;
	buttonPrimaryBackgroundColor?: string;
	buttonPrimaryColor?: string;
	buttonSecondaryBackgroundColor?: string;
	buttonSecondaryColor?: string;
	buttonBorderRadius?: string;
};

const defaultAeroPopupOptions: AeroPopupOptions = {
	fontSize: "1rem",
	containerBorder: "1px solid lightgrey",
	containerBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	titleBoundaryColor: "lightgrey",
	buttonPrimaryBackgroundColor: `${colors.blue_5}`,
	buttonPrimaryColor: "white",
	buttonSecondaryBackgroundColor: "grey",
	buttonSecondaryColor: "white",
	buttonBorderRadius: "0",
};

/**
 * @module components
 */

/**
 * A popup component for displaying notifications to users without blocking main processor.
 *
 * @extends AeroShadowElement
 */
export class AeroPopup extends AeroShadowElement {
	private _$title: HTMLElement;
	private _$message: HTMLElement;
	private _$ok: HTMLElement;
	private _$cancel: HTMLElement | null;

	private _resolve?: (result: boolean) => void;
	private _handleKeyDown: (e: KeyboardEvent) => void;

	constructor(
		html: string,
		title: string,
		message: string,
		options: AeroPopupOptions
	) {
		super(html);

		const {
			fontSize,
			containerBorder,
			containerBoxShadow,
			titleBoundaryColor,
			buttonPrimaryBackgroundColor,
			buttonPrimaryColor,
			buttonSecondaryBackgroundColor,
			buttonSecondaryColor,
			buttonBorderRadius,
		} = options;

		this._$title = this.query("#title");
		this._$message = this.query("#message");
		this._$title.textContent = title;
		this._$message.textContent = message;

		this._$ok = this.query("#ok");
		this._$cancel = this.queryOptional("#cancel");

		this.applyStyles(`
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
				border-radius: ${buttonBorderRadius}
			}

			#ok {
				background-color: ${buttonPrimaryBackgroundColor};
				color: ${buttonPrimaryColor};
			}

			#cancel {
				background-color: ${buttonSecondaryBackgroundColor};
				color: ${buttonSecondaryColor};
			}
		`);

		this._$ok.onclick = () => {
			this.remove();
			this._resolve?.(true);
			this._resolve = undefined;
		};

		if (this._$cancel) {
			this._$cancel.onclick = () => {
				this.remove();
				this._resolve?.(false);
				this._resolve = undefined;
			};
		}

		this._handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				this._$ok.click();
			} else if (e.key === "Escape") {
				if (this._$cancel) {
					this._$cancel.click();
				} else {
					this._$ok.click();
				}
			}
		};
		window.addEventListener("keydown", this._handleKeyDown);

		document.body.appendChild(this);
	}

	/**
	 * Displays a alert notification on the screen.
	 *
	 * @param {string} message - A message content to display in the alert.
	 * @param {string} title - A title content to display in the alert.
	 * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
	 * @returns {Promise<void>}
	 * @static
	 *
	 * @example
	 * AeroPopup.alert('Hello World!');
	 */
	static alert(
		message: string,
		title: string = "",
		options: Partial<AeroPopupOptions> = {}
	): Promise<boolean> {
		return this._create(AeroAlertHtml, message, title, options);
	}

	/**
	 * Displays a confirm notification on the screen.
	 *
	 * @param {string} message - A message content to display in the confirm.
	 * @param {string} title - A title content to display in the confirm.
	 * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
	 * @returns {Promise<void>}
	 * @static
	 *
	 * @example
	 * AeroPopup.confirm('Hello World?');
	 */
	static confirm(
		message: string,
		title: string = "",
		options: Partial<AeroPopupOptions> = {}
	): Promise<boolean> {
		return this._create(AeroConfirmHtml, message, title, options);
	}

	private static _create(
		html: string,
		message: string,
		title: string,
		options: Partial<AeroPopupOptions>
	): Promise<boolean> {
		const resolvedOptions: AeroPopupOptions = {
			...defaultAeroPopupOptions,
			...options,
		};

		return new Promise<boolean>((resolve) => {
			const popup = new AeroPopup(html, title, message, resolvedOptions);
			popup._resolve = resolve;
		});
	}
}

customElements.define("aero-popup", AeroPopup);
