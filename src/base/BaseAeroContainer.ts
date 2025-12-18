import { AeroShadowElement } from "../core/AeroShadowElement";

/**
 * @module base
 */

/**
 * A base class for container-like elements, providing common functionality
 * such as handling a background attribute.
 *
 * @extends AeroShadowElement
 * @abstract
 */
export class BaseAeroContainer extends AeroShadowElement {
	/**
	 * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
	 * @protected
	 */
	protected constructor(htmlTemplate: string) {
		super(htmlTemplate);

		this.updateBackground(this.getAttribute("background"));
	}

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return ["background"];
	}

	/**
	 * Called when an observed attribute has been added, removed, or changed.
	 * @param {string} name - The name of the attribute that changed.
	 * @param {string | null} _oldValue - The old value of the attribute.
	 * @param {string | null} newValue - The new value of the attribute.
	 */
	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this.baseAeroContainerAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions.
	 * @private
	 */
	private baseAeroContainerAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		background: (newValue) => {
			this.updateBackground(newValue);
		},
	};

	/**
	 * Updates the background style of the container.
	 * @param {string | null} val - The new background value.
	 * @private
	 */
	private updateBackground(val: string | null) {
		this.applyStyles(
			`:host {
					background: ${val ? val : "rgba(0, 0, 0, 0.5)"};
			}`
		);
	}

	/**
	 * Sets the background of the container.
	 * @param {string} val - The new background value.
	 * @attr
	 */
	set containerBackground(val: string) {
		this.setAttribute("background", val);
	}
}
