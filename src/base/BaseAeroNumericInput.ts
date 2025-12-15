import AeroShadowElement from "../core/AeroShadowElement";

export default abstract class BaseAeroNumericInput extends AeroShadowElement {
	private _input!: HTMLInputElement;

	private _min!: string;
	private _max!: string;
	private _step!: string;

	private _decimalPlaces!: string;

	protected constructor(htmlTemplate: string) {
		super(htmlTemplate);

		this.initializeInput();

		this.dispatchInputEvents();

		this.updateMinValue(this.getAttribute("min"));
		this.updateMaxValue(this.getAttribute("max"));
		this.updateStepValue(this.getAttribute("step"));

		const value = this.getAttribute("value") ?? "0";
		this._input.value = value;
	}

	protected abstract getInputSelector(): string;

	private initializeInput() {
		this._input = this.query(this.getInputSelector());
	}

	protected getValidateValue(value: string): string {
		const newValue = Math.min(
			Number(this._max),
			Math.max(
				Number(this._min),
				Math.round(Number(value) / Number(this._step)) * Number(this._step)
			)
		);
		return newValue.toFixed(Number(this._decimalPlaces));
	}

	private dispatchInputEvents() {
		this._input.addEventListener("input", () => {
			this.forwardNativeEvent("input")
		})

		this._input.addEventListener("change", () => {
			this.forwardNativeEvent("change")
		})

		this._input.addEventListener("focusin", () => {
			this.forwardNativeEvent("focusin")
		})

		this._input.addEventListener("focusout", () => {
			const validatedValue = this.getValidateValue(this._input.value);
			this._input.value = validatedValue;

			this.forwardNativeEvent("focusout")
		})
	}

	static get observedAttributes() {
		return ["min", "max", "step"];
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this.baseAeroNumericInputAttributeHandlers[name]?.(newValue);
	}

	private baseAeroNumericInputAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		min: (newValue) => {
			this.updateMinValue(newValue);
		},
		max: (newValue) => {
			this.updateMaxValue(newValue);
		},
		step: (newValue) => {
			this.updateStepValue(newValue);
		},
	};

	private updateMinValue(val: string | null) {
		this._min = val ? val : "0";
	}

	private updateMaxValue(val: string | null) {
		this._max = val ? val : "100";
	}

	private updateStepValue(val: string | null) {
		this._step = val ? val : "1";
		this._decimalPlaces =
			this._step.toString().split(".")[1]?.length.toString() || "0";
	}

	get input() {
		return this._input;
	}

	get value() {
		return this._input.value;
	}
	set value(val: string) {
		this._input.value = val;
	}

	get min() {
		return this._min;
	}
	set min(val: string) {
		this.setAttribute("min", val);
	}

	get max() {
		return this._max;
	}
	set max(val: string) {
		this.setAttribute("max", val);
	}

	get step() {
		return this._step;
	}
	set step(val: string) {
		this.setAttribute("step", val);
	}

	protected get decimalPlaces() {
		return this._decimalPlaces;
	}
}
