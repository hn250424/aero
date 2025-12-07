import AeroShadowElement from "../core/AeroShadowElement";

export default class BaseAeroContainer extends AeroShadowElement {
	protected constructor(htmlTemplate: string) {
		super(htmlTemplate);

		this.updateBackground(this.getAttribute("background"));
	}

	static get observedAttributes() {
		return ["background"];
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this.baseAeroContainerAttributeHandlers[name]?.(newValue);
	}

	private baseAeroContainerAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		background: (newValue) => {
			this.updateBackground(newValue);
		},
	};

	updateBackground(val: string | null) {
		this.applyStyles(
			`:host {
					background: ${val ? val : "rgba(0, 0, 0, 0.5)"};
			}`
		);
	}

	set containerBackground(val: string) {
		this.setAttribute("background", val);
	}
}
