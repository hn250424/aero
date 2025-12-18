/**
 * @module core
 */
/**
 * `AeroShadowElement` is an abstract base class that simplifies the creation of custom elements
 * with a shadow DOM. It handles the boilerplate of creating a shadow root and cloning a template.
 *
 * @abstract
 */
export default class AeroShadowElement extends HTMLElement {
    /**
     * The shadow root for this element.
     * @protected
     */
    protected shadow: ShadowRoot;
    /**
     * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
     * @protected
     */
    protected constructor(htmlTemplate: string);
    /**
     * Queries the shadow DOM for an element matching the given selector.
     * @param {string} selector - The CSS selector to match.
     * @returns {T} The first element matching the selector.
     * @protected
     */
    protected query<T extends HTMLElement>(selector: string): T;
    /**
     * Applies a string of CSS to the shadow DOM by creating and appending a `<style>` tag.
     * @param {string} style - The CSS string to apply.
     * @protected
     */
    protected applyStyles(style: string): void;
    /**
     * Dispatches a standard DOM event from this custom element.
     * @param {string} type - The type of the event to dispatch (e.g., 'click', 'input').
     * @protected
     */
    protected forwardNativeEvent(type: string): void;
    /**
     * Dispatches a custom event with an optional detail payload.
     * @param {string} type - The name of the custom event.
     * @param {object} [options] - Options for the custom event.
     * @param {*} [options.detail] - The data payload to send with the event.
     * @param {Event} [options.originalEvent] - The original event that triggered this custom event.
     * @protected
     */
    protected forwardCustomEvent(type: string, options?: {
        detail?: unknown;
        originalEvent?: Event;
    }): void;
}
