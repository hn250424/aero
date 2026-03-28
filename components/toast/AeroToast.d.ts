import { AeroShadowElement } from '../../core/AeroShadowElement';
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
/**
 * @module components
 */
/**
 * A toast component for displaying temporary notifications to users.
 *
 * @extends AeroShadowElement
 */
export declare class AeroToast extends AeroShadowElement {
    private _$text;
    constructor(text: string, options: AeroToastOptions);
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
    static show(text: string, options?: Partial<AeroToastOptions>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "aero-toast": AeroToast;
    }
}
