import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { TestableBaseAeroNumericInput } from "./TestableBaseAeroNumericInput";

describe("BaseAeroNumericInput", () => {
	let base: TestableBaseAeroNumericInput;

	beforeEach(() => {
		base = new TestableBaseAeroNumericInput();
	});

	describe("Initial property values", () => {
		test("should have correct default values on creation", () => {
			expect(base.value).toBe(0);
			expect(base.min).toBe(0);
			expect(base.max).toBe(100);
			expect(base.step).toBe(1);
		});
	});

	describe("Property setters & Value Sanitization", () => {
		test("should clamp value to max and align to the nearest step relative to min", () => {
			base.min = 2;
			base.max = 5;
			base.step = 2;

			base.value = 10;

			expect(base.value).toBe(4);
			expect(base.input.valueAsNumber).toBe(4);
		});

		test("should clamp value to min when input is below range", () => {
			base.min = 2;
			base.max = 5;
			base.step = 3;

			base.value = 1;

			expect(base.value).toBe(2);
			expect(base.input.valueAsNumber).toBe(2);
			expect(base.step).toBe(3);
		});

		test("should round to the nearest step (up and down)", () => {
			base.min = 0;
			base.step = 10;

			base.value = 4;
			expect(base.value).toBe(0);

			base.value = 6;
			expect(base.value).toBe(10);
		});

		test("should prevent exceeding max when rounding up near the boundary", () => {
			base.min = 0;
			base.max = 5;
			base.step = 3;

			// 4.6 is closer to 6 (next step), but must be 3 due to max=5
			base.value = 4.6;
			expect(base.value).toBe(3);
		});

		test("should handle floating point precision correctly", () => {
			base.min = 0;
			base.step = 0.1;

			// Prevents 0.30000000000000004
			base.value = 0.1 + 0.2;
			expect(base.value).toBe(0.3);
		});
	});

	describe("Value normalization", () => {
		beforeEach(() => {
			base.value = 50;
			base.min = 0;
			base.max = 100;
			base.step = 1;
		});

		test("should respect min value", () => {
			base.value = -1;
			expect(base.value).toBe(0);

			base.min = -1;
			base.value = -1;
			expect(base.value).toBe(-1);
		});

		test("should respect max value", () => {
			base.value = 101;
			expect(base.value).toBe(100);

			base.max = 101;
			base.value = 101;
			expect(base.value).toBe(101);
		});

		test("should normalize value according to step", () => {
			base.step = 0.4;

			base.value = 49.7;
			expect(base.value).toBe(49.6);
			base.value = 49.5;
			expect(base.value).toBe(49.6);
			base.value = 49.4;
			expect(base.value).toBe(49.2);
		});
	});

	describe("Events", () => {
		beforeEach(() => {
			document.body.appendChild(base);
		});

		afterEach(() => {
			base.remove();
		});

		test("forwards input event", () => {
			const spy = vi.fn();
			base.addEventListener("input", spy);
			base.input.dispatchEvent(new Event("input", { bubbles: true }));
			expect(spy).toHaveBeenCalled();
		});

		test("forwards change event", () => {
			const spy = vi.fn();
			base.addEventListener("change", spy);
			base.input.dispatchEvent(new Event("change", { bubbles: true }));
			expect(spy).toHaveBeenCalled();
		});

		test("forwards focusin event", () => {
			const spy = vi.fn();
			base.addEventListener("focusin", spy);
			base.input.dispatchEvent(new Event("focusin", { bubbles: true }));
			expect(spy).toHaveBeenCalled();
		});

		test("forwards focusout event", () => {
			const spy = vi.fn();
			base.addEventListener("focusout", spy);
			base.input.dispatchEvent(new Event("focusout", { bubbles: true }));
			expect(spy).toHaveBeenCalled();
		});
	});
});
