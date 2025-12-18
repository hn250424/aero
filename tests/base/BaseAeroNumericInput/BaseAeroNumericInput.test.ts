import { beforeEach, describe, expect, test, vi } from "vitest";
import { TestableBaseAeroNumericInput } from "./TestableBaseAeroNumericInput";

describe("BaseAeroNumericInput", () => {
	let base: TestableBaseAeroNumericInput;

	beforeEach(() => {
		base = new TestableBaseAeroNumericInput();
	});

	describe("Initial property values", () => {
		test("should have correct default values on creation", () => {
			expect(base.input.value).toBe("0");
			expect(base.value).toBe("0");
			expect(base.min).toBe("0");
			expect(base.max).toBe("100");
			expect(base.step).toBe("1");
		});
	});

	describe("Property setters", () => {
		test("should update properties correctly when set", () => {
			base.value = "10";
			base.min = "2";
			base.max = "5";
			base.step = "2";

			expect(base.input.value).toBe("10");
			expect(base.value).toBe("10");
			expect(base.min).toBe("2");
			expect(base.max).toBe("5");
			expect(base.step).toBe("2");
		});
	});

	describe("Value normalization", () => {
		beforeEach(() => {
			base.value = "50";
			base.min = "0";
			base.max = "100";
			base.step = "1";
		});

		test("should respect min value", () => {
			base.value = "-1";
			expect(base.value).toBe("0");

			base.min = "-1";
			base.value = "-1";
			expect(base.value).toBe("-1");
		});

		test("should respect max value", () => {
			base.value = "101";
			expect(base.value).toBe("100");

			base.max = "101";
			base.value = "101";
			expect(base.value).toBe("101");
		});

		test("should normalize value according to step", () => {
			base.step = "0.4";

			base.value = "49.7";
			expect(base.value).toBe("49.6");
			base.value = "49.5";
			expect(base.value).toBe("49.6");
			base.value = "49.4";
			expect(base.value).toBe("49.2");
		});
	});
});
