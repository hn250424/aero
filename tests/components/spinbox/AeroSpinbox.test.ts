import { beforeEach, describe, expect, test, vi } from "vitest";
import { AeroSpinbox } from "@components/spinbox/AeroSpinbox";
import { MockResizeObserver } from "../../mocks/MockResizeObserver";

describe("AeroSpinbox", () => {
	(
		globalThis as unknown as { ResizeObserver: typeof ResizeObserver }
	).ResizeObserver = MockResizeObserver;

	let dom: AeroSpinbox;

	beforeEach(() => {
		dom = document.createElement("aero-spinbox") as AeroSpinbox;
		document.body.appendChild(dom);
	});

	describe("Interaction with step property", () => {
		beforeEach(() => {
			dom.value = "50";
			dom.min = "0";
			dom.max = "100";
			dom.step = "1";
		});

		test("should increment and decrement value based on min", () => {
			dom.min = "50";

			dom.decrement();
			expect(dom.value).toBe("50");
			dom.min = "49";
			dom.decrement();
			expect(dom.value).toBe("49");
		});

		test("should increment and decrement value based on max", () => {
			dom.max = "50";

			dom.increment();
			expect(dom.value).toBe("50");
			dom.max = "51";
			dom.increment();
			expect(dom.value).toBe("51");
		});

		test("should increment and decrement value based on step", () => {
			dom.step = "1";

			dom.decrement();
			expect(dom.value).toBe("49");
			dom.increment();
			expect(dom.value).toBe("50");

			dom.step = "0.4";

			dom.decrement();
			expect(dom.value).toBe("49.6");
			dom.increment();
			expect(dom.value).toBe("50.0");
		});
	});
});
