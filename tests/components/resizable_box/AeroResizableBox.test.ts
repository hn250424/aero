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
      isResizeBottom = dom.getAttribute("resize-bottom");
      isResizeLeft = dom.getAttribute("resize-left");
      isResizeRight = dom.getAttribute("resize-right");

      expect(isResizeTop).toBe("");
      expect(isResizeBottom).toBe("");
      expect(isResizeLeft).toBe("");
      expect(isResizeRight).toBe("");

      dom.removeTopResizer();
      dom.removeBottomResizer();
      dom.removeLeftResizer();
      dom.removeRightResizer();

      isResizeTop = dom.getAttribute("resize-top");
      isResizeBottom = dom.getAttribute("resize-bottom");
      isResizeLeft = dom.getAttribute("resize-left");
      isResizeRight = dom.getAttribute("resize-right");

      expect(isResizeTop).toBe(null)
      expect(isResizeBottom).toBe(null)
      expect(isResizeLeft).toBe(null)
      expect(isResizeRight).toBe(null)
    })
  })

  describe("Attribute edge cases", () => {
    test("falls back to defaults when size attributes are not numbers", () => {
      dom.setAttribute("min-width", "abc");
      dom.setAttribute("max-width", "xyz");

      expect(dom.minWidth).toBe("0");
      expect(dom.maxWidth).toBe("2000");
    });

    test("falls back to defaults when size attributes are negative", () => {
      dom.setAttribute("min-height", "-10");
      dom.setAttribute("max-height", "-10");

      expect(dom.minHeight).toBe("0");
      expect(dom.maxHeight).toBe("2000");
    });
  });

  describe("Drag state cleanup", () => {
    test("restores body cursor and user-select when removed mid-drag", () => {
      dom.setAttribute("resize-right", "");

      const downEvent = new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 });
      dom["_processPointerdownEvent"](downEvent, "right");

      expect(document.body.style.cursor).toBe("ew-resize");
      expect(document.body.style.userSelect).toBe("none");

      dom.remove();

      expect(document.body.style.cursor).toBe("");
      expect(document.body.style.userSelect).toBe("");
    });
  });

  // TODO: decide on bracket notation approach
  describe("Events", () => {
    test("fires aero-resize-start on top resizer pointerdown", async () => {
      dom.setAttribute("resize-top", "");

      const spy = vi.fn();
      dom.addEventListener("aero-resize-start", spy);

      const event = new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 });
      dom["_processPointerdownEvent"](event, "top");

      expect(spy).toHaveBeenCalledOnce();
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.edge).toBe("top");
      expect(detail.width).toBe(dom.offsetWidth);
      expect(detail.height).toBe(dom.offsetHeight);
    });

    test("fires aero-resize on right resizer pointermove", async () => {
      dom.setAttribute("resize-right", "");

      const spy = vi.fn();
      dom.addEventListener("aero-resize", spy);

      const downEvent = new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 });
      dom["_processPointerdownEvent"](downEvent, "right");

      await new Promise(requestAnimationFrame);

      const moveEvent = new PointerEvent("pointermove", { bubbles: true, pointerId: 1 });
      dom["_handlePointermove"](moveEvent);

      await new Promise(requestAnimationFrame);

      expect(spy).toHaveBeenCalledOnce();
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.width).toBe(dom.offsetWidth);
      expect(detail.height).toBe(null);
    });

    test("fires aero-resize on bottom resizer pointermove", async () => {
      dom.setAttribute("resize-bottom", "");

      const spy = vi.fn();
      dom.addEventListener("aero-resize", spy);

      const downEvent = new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 });
      dom["_processPointerdownEvent"](downEvent, "bottom");

      await new Promise(requestAnimationFrame);

      const moveEvent = new PointerEvent("pointermove", { bubbles: true, pointerId: 1 });
      dom["_handlePointermove"](moveEvent);

      await new Promise(requestAnimationFrame);

      expect(spy).toHaveBeenCalledOnce();
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.width).toBe(null);
      expect(detail.height).toBe(dom.offsetHeight);
    });

    test("fires aero-resize-end on left resizer pointerup", async () => {
      dom.setAttribute("resize-left", "");

      const spy = vi.fn();
      dom.addEventListener("aero-resize-end", spy);

      const downEvent = new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 });
      dom["_processPointerdownEvent"](downEvent, "left");

      await new Promise(requestAnimationFrame);

      const moveEvent = new PointerEvent("pointermove", { bubbles: true, pointerId: 1 });
      dom["_handlePointermove"](moveEvent);

      await new Promise(requestAnimationFrame);

      const upEvent = new PointerEvent("pointerup", { bubbles: true, pointerId: 1 });
      dom["_handlePointerup"](upEvent);

      expect(spy).toHaveBeenCalledOnce();
      const detail = spy.mock.calls[0][0].detail;
      expect(detail.width).toBe(dom.offsetWidth);
      expect(detail.height).toBe(dom.offsetHeight);
    });

    test("ignores pointermove and pointerup from other pointers during a drag", async () => {
      dom.setAttribute("resize-right", "");

      const moveSpy = vi.fn();
      const endSpy = vi.fn();
      dom.addEventListener("aero-resize", moveSpy);
      dom.addEventListener("aero-resize-end", endSpy);

      dom["_processPointerdownEvent"](
        new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 }),
        "right"
      );

      dom["_handlePointermove"](
        new PointerEvent("pointermove", { bubbles: true, pointerId: 2 })
      );
      await new Promise(requestAnimationFrame);
      expect(moveSpy).not.toHaveBeenCalled();

      dom["_handlePointerup"](
        new PointerEvent("pointerup", { bubbles: true, pointerId: 2 })
      );
      expect(endSpy).not.toHaveBeenCalled();

      dom["_handlePointerup"](
        new PointerEvent("pointerup", { bubbles: true, pointerId: 1 })
      );
      expect(endSpy).toHaveBeenCalledOnce();
    });
  })
});
