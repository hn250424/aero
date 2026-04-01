import { beforeEach, afterEach, describe, expect, test } from "vitest";
import { AeroRoller } from "@src/components/roller/AeroRoller";

describe("AeroRoller", () => {
	let dom: AeroRoller<string>;

	beforeEach(() => {
		dom = document.createElement("aero-roller") as AeroRoller<string>;
		document.body.appendChild(dom);
	});

	afterEach(() => {
		dom.remove();
	});

	describe("Initial state", () => {
		test("check init props", () => {
			expect(dom.index).toBe(0);
			expect(dom.current).toBeUndefined();
		});
	});

	describe("When items are set", () => {
		beforeEach(() => {
			dom.setItems(["Apple", "Banana", "Cherry", "Mango"]);
		});

		test("sets items and resets index to 0", () => {
			expect(dom.index).toBe(0);
			expect(dom.current).toBe("Apple");
		});

		test("scrolls to valid index", () => {
			dom.scrollToIndex(2);
			expect(dom.index).toBe(2);
			expect(dom.current).toBe("Cherry");
		});

		test("clamps scrollToIndex when index is too low", () => {
			dom.scrollToIndex(-5);
			expect(dom.index).toBe(0);
			expect(dom.current).toBe("Apple");
		});

		test("clamps scrollToIndex when index is too high", () => {
			dom.scrollToIndex(10);
			expect(dom.index).toBe(3);
			expect(dom.current).toBe("Mango");
		});
	});
});
