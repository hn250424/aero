/**
 * @module core
 */
/**
 * `AeroShadowElement` is an abstract base class that simplifies the creation of custom elements
 * with a shadow DOM. It handles the boilerplate of creating a shadow root and cloning a template.
 *
 * @abstract
 * @template T - A record defining custom event names and their detail types.
 */
export declare abstract class AeroShadowElement<T extends Record<string, any> = {}> extends HTMLElement {
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
    protected query<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K];
    protected query<E extends HTMLElement = HTMLElement>(selector: string): E;
    protected queryOptional<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
    protected queryOptional<E extends HTMLElement = HTMLElement>(selector: string): E | null;
    protected applyStyles(style: string, id?: string): void;
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
    protected forwardCustomEvent<K extends keyof T & string>(type: K, options?: {
        detail?: T[K];
        originalEvent?: Event;
    }): void;
    addEventListener<K extends keyof (HTMLElementEventMap & {
        [P in keyof T]: CustomEvent<T[P]>;
    })>(type: K, listener: (this: this, ev: (HTMLElementEventMap & {
        [P in keyof T]: CustomEvent<T[P]>;
    })[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof (HTMLElementEventMap & {
        [P in keyof T]: CustomEvent<T[P]>;
    })>(type: K, listener: (this: this, ev: (HTMLElementEventMap & {
        [P in keyof T]: CustomEvent<T[P]>;
    })[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
