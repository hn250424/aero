import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { AeroSelect } from "@src/components/select/AeroSelect";
import type { AeroOption } from "@src/index";

describe("AeroSelect", () => {
	let dom: AeroSelect;

	beforeEach(() => {
		dom = document.createElement("aero-select") as AeroSelect;
		document.body.appendChild(dom);
	});

	afterEach(() => {
		dom.remove();
	});

	describe("Initial state", () => {
		test("check init props", async () => {
			expect(dom.optionIndex).toBe(-1);
		});
	});

	describe("When options exist", () => {
		beforeEach(async () => {
			const child_0 = document.createElement("aero-option") as AeroOption;
			const child_1 = document.createElement("aero-option") as AeroOption;
			const child_2 = document.createElement("aero-option") as AeroOption;
			dom.append(child_0, child_1, child_2);

			await Promise.resolve();
		});

		test("sets optionIndex correctly via attribute", () => {
			dom.setAttribute("option-index", "2");
			expect(dom.optionIndex).toBe(2);
		});

		test("sets optionIndex correctly via setter", () => {
			dom.optionIndex = 2;
			expect(dom.optionIndex).toBe(2);
		});

		test("resets optionIndex when index is out of range", () => {
			dom.optionIndex = 9;
			expect(dom.optionIndex).toBe(-1);
		});

		test("resets optionIndex when attribute value is invalid", () => {
			dom.setAttribute("option-index", "invalid-value");
			expect(dom.optionIndex).toBe(-1);
		});

		test("does nothing when setting same optionIndex", async () => {
			dom.optionIndex = 0;
			dom.optionIndex = 0;
			expect(dom.optionIndex).toBe(0);
		});
	});

	describe("When no options exist", () => {
		test("resets optionIndex when attribute is empty", async () => {
			dom.setAttribute("option-index", "");
			expect(dom.optionIndex).toBe(-1);
		});

		test("resets optionIndex when attribute value is invalid", async () => {
			dom.optionIndex = -3;
			expect(dom.optionIndex).toBe(-1);
		});
	});

	describe("Dynamic option changes", () => {
		test("resets optionIndex when selected option is removed", async () => {
			const child = document.createElement("aero-option") as AeroOption;
			dom.append(child);

			await Promise.resolve();

			dom.optionIndex = 0;
			child.remove();

			await Promise.resolve();

			expect(dom.optionIndex).toBe(-1);
		});
	})


	describe("Events", () => {
		test("changes optionIndex", async () => {
			const child_0 = document.createElement("aero-option") as AeroOption;
			dom.append(child_0);

			await Promise.resolve();

			const spy = vi.fn();
			dom.addEventListener("aero-select-changed", spy);

			dom.optionIndex = 0;

			expect(spy).toHaveBeenCalledOnce();
		});
	})
});
