import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { AeroOption } from "@src/components/select/AeroOption";

describe("AeroOption", () => {

	let dom: AeroOption;

	beforeEach(() => {
		dom = document.createElement("aero-option") as AeroOption;
		document.body.appendChild(dom);
	});

	afterEach(() => {
		dom.remove();
	});

	test("returns value and label correctly", () => {
		dom.textContent = "testValue";
		dom.setAttribute("value", "5");

		expect(dom.value).toBe("5");
		expect(dom.label).toBe("testValue");
	})
});
