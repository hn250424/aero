import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import { AeroResizableBox } from "@src/components/resizable_box/AeroResizableBox";

describe("AeroResizableBox", () => {

	let dom: AeroResizableBox;

	beforeEach(() => {
		dom = document.createElement("aero-resizable-box") as AeroResizableBox;
		document.body.appendChild(dom);
	});

	afterEach(() => {
		dom.remove();
	});

	describe("Attributes", () => {
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
	})

	// TODO: decide on bracket notation approach
	describe("Events", () => {
		test("fires aero-resize-start on top resizer mousedown", async () => {
			dom.setAttribute("resize-top", "");

			const spy = vi.fn();
			dom.addEventListener("aero-resize-start", spy);

			const event = new MouseEvent("mousedown", { bubbles: true });
  		dom["_processMousedownEvent"](event, "top");

			expect(spy).toHaveBeenCalledOnce();
			const detail = spy.mock.calls[0][0].detail;
			expect(detail.edge).toBe("top");
			expect(detail.width).toBe(dom.offsetWidth);
			expect(detail.height).toBe(dom.offsetHeight);
		});

		test("fires aero-resize on right resizer mousemove", async () => {
			dom.setAttribute("resize-right", "");

			const spy = vi.fn();
			dom.addEventListener("aero-resize", spy);

			const downEvent = new MouseEvent("mousedown", { bubbles: true });
  		dom["_processMousedownEvent"](downEvent, "right");

			await new Promise(requestAnimationFrame);

			const moveEvent = new MouseEvent("mousemove", { bubbles: true });
  		dom["_handleMousemove"](moveEvent);

			await new Promise(requestAnimationFrame);

			expect(spy).toHaveBeenCalledOnce();
			const detail = spy.mock.calls[0][0].detail;
			expect(detail.width).toBe(dom.offsetWidth);
			expect(detail.height).toBe(null);
		});

		test("fires aero-resize on bottom resizer mousemove", async () => {
			dom.setAttribute("resize-bottom", "");

			const spy = vi.fn();
			dom.addEventListener("aero-resize", spy);

			const downEvent = new MouseEvent("mousedown", { bubbles: true });
  		dom["_processMousedownEvent"](downEvent, "bottom");

			await new Promise(requestAnimationFrame);

			const moveEvent = new MouseEvent("mousemove", { bubbles: true });
  		dom["_handleMousemove"](moveEvent);

			await new Promise(requestAnimationFrame);

			expect(spy).toHaveBeenCalledOnce();
			const detail = spy.mock.calls[0][0].detail;
			expect(detail.width).toBe(null);
			expect(detail.height).toBe(dom.offsetHeight);
		});

		test("fires aero-resize-end on left resizer mouseup", async () => {
			dom.setAttribute("resize-left", "");

			const spy = vi.fn();
			dom.addEventListener("aero-resize-end", spy);

			const downEvent = new MouseEvent("mousedown", { bubbles: true });
  		dom["_processMousedownEvent"](downEvent, "left");

			await new Promise(requestAnimationFrame);

			const moveEvent = new MouseEvent("mousemove", { bubbles: true });
  		dom["_handleMousemove"](moveEvent);

			await new Promise(requestAnimationFrame);

			const upEvent = new MouseEvent("mouseup", { bubbles: true });
  		dom["_handleMouseup"](upEvent);

			expect(spy).toHaveBeenCalledOnce();
			const detail = spy.mock.calls[0][0].detail;
			expect(detail.width).toBe(dom.offsetWidth);
			expect(detail.height).toBe(dom.offsetHeight);
		});
	})
});
