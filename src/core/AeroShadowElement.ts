/**
 * @module core
 */

/**
 * `AeroShadowElement` is an abstract base class that simplifies the creation of custom elements
 * with a shadow DOM. It handles the boilerplate of creating a shadow root and cloning a template.
 *
 * @abstract
 */
export class AeroShadowElement extends HTMLElement {
	/**
	 * The shadow root for this element.
	 * @protected
	 */
	protected shadow: ShadowRoot;

	/**
	 * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
	 * @protected
	 */
	protected constructor(htmlTemplate: string) {
		super();

		const template = document.createElement("template");
		template.innerHTML = htmlTemplate;

		this.shadow = this.attachShadow({ mode: "open" });
		this.shadow.appendChild(template.content.cloneNode(true));
	}

	// Queries the shadow DOM for an element matching the given selector.
	protected query<T extends HTMLElement>(selector: string): T {
		return this.shadow.querySelector(selector)! as T;
	}

	// Queries the shadow DOM for an element matching the given selector.
  // Unlike query(), this returns null if the element is not found.
	protected queryOptional<T extends HTMLElement>(selector: string): T | null {
		return this.shadow.querySelector(selector) as T | null;
	}

	// Applies a string of CSS to the shadow DOM by creating and appending a `<style>` tag.
	protected applyStyles(style: string, id: string = "component-styles") {
    let tag = this.shadow.querySelector(`#${id}`) as HTMLStyleElement;
    if (!tag) {
        tag = document.createElement("style");
        tag.id = id;
        this.shadow.appendChild(tag);
    }
    tag.textContent = style;
	}

	/**
	 * Dispatches a standard DOM event from this custom element.
	 * @param {string} type - The type of the event to dispatch (e.g., 'click', 'input').
	 * @protected
	 */
	protected forwardNativeEvent(type: string) {
		this.dispatchEvent(
			new Event(type, {
				bubbles: true,
				composed: true,
			})
		);
	}

	/**
	 * Dispatches a custom event with an optional detail payload.
	 * @param {string} type - The name of the custom event.
	 * @param {object} [options] - Options for the custom event.
	 * @param {*} [options.detail] - The data payload to send with the event.
	 * @param {Event} [options.originalEvent] - The original event that triggered this custom event.
	 * @protected
	 */
	protected forwardCustomEvent(
		type: string,
		options?: {
			detail?: unknown;
			originalEvent?: Event;
		}
	) {
		this.dispatchEvent(
			new CustomEvent(type, {
				detail: options?.detail,
				bubbles: true,
				composed: true,
			})
		);
	}
}
