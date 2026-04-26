import { AeroShadowElement } from '../../core/AeroShadowElement';
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
/**
 * @module components
 */
/**
 * A popup component for displaying notifications to users without blocking main processor.
 *
 * @extends AeroShadowElement
 */
export declare class AeroPopup extends AeroShadowElement {
    private _$message;
    private _$ok;
    private _$cancel;
    private _resolve?;
    private _handleKeyDown;
    constructor(html: string, message: string, options: AeroPopupOptions);
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
    static alert(message: string, options?: Partial<AeroPopupOptions>): Promise<boolean>;
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
    static confirm(message: string, options?: Partial<AeroPopupOptions>): Promise<boolean>;
    private static _create;
}
