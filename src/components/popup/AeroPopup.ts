import AeroAlertHtml from "./AeroAlert.html?raw";
import AeroConfirmHtml from "./AeroConfirm.html?raw";
import { AeroShadowElement } from "../../core/AeroShadowElement";
import { colors } from "../../constants";

/**
 * Configuration options for the popup notifications.
 *
 * @typedef {Object} AeroPopupOptions
 * @property {string} [fontSize="1rem"] - Font size for the popup content and buttons.
 * @property {string} [containerBorder="1px solid lightgrey"] - Border style for the popup container.
 * @property {string} [containerBoxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"] - Box shadow for the popup container.
 * @property {string} [primaryBackgroundColor="#2563eb"] - Primary background color.
 * @property {string} [primaryColor="white"] - Primary color.
 * @property {string} [secondaryBackgroundColor="grey"] - Secondary background color.
 * @property {string} [secondaryColor="white"] - Secondary color.
 * @property {string} [buttonBorderRadius="0"] - Border radius for both buttons.
 */
export type AeroPopupOptions = {
  fontSize?: string;
  containerBorder?: string;
  containerBoxShadow?: string;
  primaryBackgroundColor?: string;
  primaryColor?: string;
  secondaryBackgroundColor?: string;
  secondaryColor?: string;
  buttonBorderRadius?: string;
};

const defaultAeroPopupOptions: AeroPopupOptions = {
  fontSize: "1rem",
  containerBorder: "1px solid lightgrey",
  containerBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  primaryBackgroundColor: `${colors.blue_5}`,
  primaryColor: "white",
  secondaryBackgroundColor: "grey",
  secondaryColor: "white",
  buttonBorderRadius: "0",
};

/**
 * @module components
 */

/**
 * A popup component for displaying notifications to users without blocking main processor.
 * Use the static `alert()`/`confirm()` methods; a manually constructed instance
 * must be appended to the DOM by the caller.
 *
 * When several popups are stacked, only the topmost one reacts to the
 * Enter/Escape keyboard shortcuts.
 *
 * @extends AeroShadowElement
 */
export class AeroPopup extends AeroShadowElement {
  private _$message: HTMLElement;
  private _$ok: HTMLElement;
  private _$cancel: HTMLElement | null;

  private _resolve?: (result: boolean) => void;
  private _previousFocus: HTMLElement | null = null;

  constructor(
    html: string = AeroAlertHtml,
    message: string = "",
    options: AeroPopupOptions = {}
  ) {
    super(html);

    const {
      fontSize,
      containerBorder,
      containerBoxShadow,
      primaryBackgroundColor,
      primaryColor,
      secondaryBackgroundColor,
      secondaryColor,
      buttonBorderRadius,
    } = { ...defaultAeroPopupOptions, ...options };

    this._$message = this.query<HTMLElement>("#message");
    this._$message.textContent = message;

    this._$ok = this.query<HTMLElement>("#ok");
    this._$cancel = this.queryOptional<HTMLElement>("#cancel");

    this.applyStyles(`
      #container {
        font-size: ${fontSize};
        border: ${containerBorder};
        box-shadow: ${containerBoxShadow};
      }

      #head {
        background: ${primaryBackgroundColor};
      }

      button {
        font-size: ${fontSize};
        border-radius: ${buttonBorderRadius}
      }

      #ok {
        background-color: ${primaryBackgroundColor};
        color: ${primaryColor};
      }

      #cancel {
        background-color: ${secondaryBackgroundColor};
        color: ${secondaryColor};
      }
    `);

    this._$ok.onclick = () => this._settle(true);

    if (this._$cancel) {
      this._$cancel.onclick = () => this._settle(false);
    }
  }

  connectedCallback() {
    window.addEventListener("keydown", this._handleKeyDown);

    // Move focus into the popup so keyboard users land on the primary action.
    this._previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this._$ok.focus();
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._handleKeyDown);

    // Restore focus to where it was before the popup opened.
    this._previousFocus?.focus();
    this._previousFocus = null;

    // If the popup is removed without a button press (e.g. taken out of the
    // DOM manually), settle as a dismissal so awaiting callers never hang.
    this._resolve?.(false);
    this._resolve = undefined;
  }

  // Removes the popup and resolves its promise exactly once.
  private _settle(result: boolean) {
    const resolve = this._resolve;
    this._resolve = undefined;
    this.remove();
    resolve?.(result);
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    // With stacked popups, only the topmost (last appended) reacts to keys.
    const popups = document.querySelectorAll("aero-popup");
    if (popups[popups.length - 1] !== this) return;

    if (e.key === "Enter") {
      e.preventDefault();
      this._$ok.click();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (this._$cancel) {
        this._$cancel.click();
      } else {
        this._$ok.click();
      }
    }
  };

  /**
   * Displays a alert notification on the screen.
   *
   * @param {string} message - A message content to display in the alert.
   * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
   * @returns {Promise<void>}
   * @static
   *
   * @example
   * AeroPopup.alert('Hello World!');
   */
  static alert(
    message: string,
    options: Partial<AeroPopupOptions> = {}
  ): Promise<boolean> {
    return this._create(AeroAlertHtml, message, options);
  }

  /**
   * Displays a confirm notification on the screen.
   *
   * @param {string} message - A message content to display in the confirm.
   * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
   * @returns {Promise<void>}
   * @static
   *
   * @example
   * AeroPopup.confirm('Hello World?');
   */
  static confirm(
    message: string,
    options: Partial<AeroPopupOptions> = {}
  ): Promise<boolean> {
    return this._create(AeroConfirmHtml, message, options);
  }

  private static _create(
    html: string,
    message: string,
    options: Partial<AeroPopupOptions>
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const popup = new AeroPopup(html, message, options);
      popup._resolve = resolve;
      document.body.appendChild(popup);
    });
  }
}


