import { beforeEach, describe, expect, test, vi } from "vitest";
import { AeroResizeBox } from "@components/resize_box/AeroResizeBox";

describe("AeroResizeBox", () => {

	let dom: AeroResizeBox;

	beforeEach(() => {
		dom = document.createElement("aero-resize-box") as AeroResizeBox;
		document.body.appendChild(dom);
	});

	test("adds and removes resizer attributes correctly", () => {
		let isResizeTop = dom.getAttribute("resize-top");
		let isResizeBottom = dom.getAttribute("resize-bottom");
		let isResizeLeft = dom.getAttribute("resize-left");
		let isResizeRight = dom.getAttribute("resize-right");

		expect(isResizeTop).toBe(null)
		expect(isResizeBottom).toBe(null)
		expect(isResizeLeft).toBe(null)
		expect(isResizeRight).toBe(null)

		dom.addTopResizer();
		dom.addBottomResizer();
		dom.addLeftResizer();
		dom.addRightResizer();

		isResizeTop = dom.getAttribute("resize-top");
		isResizeBottom = dom.getAttribute("resize-top");
		isResizeLeft = dom.getAttribute("resize-top");
		isResizeRight = dom.getAttribute("resize-top");

		expect(isResizeTop).toBe("");
		expect(isResizeBottom).toBe("");
		expect(isResizeLeft).toBe("");
		expect(isResizeRight).toBe("");

		dom.removeTopResizer();
		dom.removeBottomResizer();
		dom.removeLeftResizer();
		dom.removeRightResizer();

		isResizeTop = dom.getAttribute("resize-top");
		isResizeBottom = dom.getAttribute("resize-top");
		isResizeLeft = dom.getAttribute("resize-top");
		isResizeRight = dom.getAttribute("resize-top");

		expect(isResizeTop).toBe(null)
		expect(isResizeBottom).toBe(null)
		expect(isResizeLeft).toBe(null)
		expect(isResizeRight).toBe(null)
	})
});
