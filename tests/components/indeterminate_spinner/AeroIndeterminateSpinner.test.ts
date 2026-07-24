import { beforeEach, afterEach, describe, expect, test } from "vitest";
import { AeroIndeterminateSpinner } from "@src/components/indeterminate_spinner/AeroIndeterminateSpinner";

describe("AeroIndeterminateSpinner", () => {
	let dom: AeroIndeterminateSpinner;

	const svg = () => dom.shadowRoot!.querySelector("svg")!;
	const arc = () => dom.shadowRoot!.querySelector("circle.arc")!;

	beforeEach(() => {
		dom = document.createElement(
			"aero-indeterminate-spinner"
		) as AeroIndeterminateSpinner;
		document.body.appendChild(dom);
	});

	afterEach(() => {
		dom.remove();
	});

	describe("Default rendering", () => {
		test("renders the svg with default size", () => {
			expect(svg().getAttribute("width")).toBe("50");
			expect(svg().getAttribute("height")).toBe("50");
			expect(svg().getAttribute("viewBox")).toBe("0 0 50 50");
		});
	});

	describe("Attribute edge cases", () => {
		test("falls back to defaults for non-numeric attributes", () => {
			dom.setAttribute("size", "abc");
			dom.setAttribute("thickness", "xyz");

			expect(svg().getAttribute("width")).toBe("50");
			expect(arc().getAttribute("r")).toBe(String(50 / 2 - 4 - 1));
		});

		test("falls back to defaults for non-positive attributes", () => {
			dom.setAttribute("size", "-10");

			expect(svg().getAttribute("width")).toBe("50");
		});

		test("keeps the radius positive when thickness exceeds the size", () => {
			dom.setAttribute("size", "10");
			dom.setAttribute("thickness", "20");

			expect(Number(arc().getAttribute("r"))).toBeGreaterThan(0);
		});

		test("accepts fractional cycle values", () => {
			dom.setAttribute("cycle", "0.5");

			const style =
				dom.shadowRoot!.querySelector("#component-styles")!.textContent!;
			expect(style).toContain("0.5s");
		});
	});
});
