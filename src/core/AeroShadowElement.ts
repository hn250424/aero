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

	/**
	 * Queries the shadow DOM for an element matching the given selector.
	 * @param {string} selector - The CSS selector to match.
	 * @returns {T} The first element matching the selector.
	 * @protected
	 */
	protected query<T extends HTMLElement>(selector: string): T {
		return this.shadow.querySelector(selector)! as T;
	}

	/**
	 * Applies a string of CSS to the shadow DOM by creating and appending a `<style>` tag.
	 * @param {string} style - The CSS string to apply.
	 * @protected
	 */
	protected applyStyles(style: string) {
		const tag = document.createElement("style");
		tag.textContent = style;
		this.shadow.appendChild(tag);
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
				composed: true
			})
		)
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
			detail?: unknown,
			originalEvent?: Event,
		}
	) {
		this.dispatchEvent(
			new CustomEvent(
				type,
				{
					detail: options?.detail,
					bubbles: true,
					composed: true,
				}
			)
		)
	}
}

// TODO - Which is better: enforcing strict usage or allowing default HTML inheritance?
// Makes sense that enforcing constraints is better.
// If we want users to use it freely, it's probably better to just cook with standard HTML ingredients.

// private forwardEvents() {
//     const eventsToForward = ['click', 'input', 'change', 'focus', 'blur']

//     const forward = (el: HTMLElement) => {
//         eventsToForward.forEach(eventName => {
//             el.addEventListener(eventName, e => {
//                 this.dispatchEvent(new CustomEvent(eventName, {
//                     detail: { value: (this._input?.value ?? null) },
//                     bubbles: true,
//                     composed: true
//                 }))
//             })
//         })
//     }

//     this.shadowRoot?.querySelectorAll<HTMLElement>('*').forEach(forward)

//     const observer = new MutationObserver(mutations => {
//         mutations.forEach(m => {
//             m.addedNodes.forEach(node => {
//                 if (node instanceof HTMLElement) forward(node)
//             })
//         })
//     })
//     observer.observe(this.shadowRoot!, { childList: true, subtree: true })
// }
