import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
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

  describe("Attribute edge cases", () => {
    const hostHeight = () =>
      dom.shadowRoot!.querySelector("#component-styles")!.textContent!;

    test("normalizes an even visible-count to the next odd number", () => {
      dom.setAttribute("visible-count", "4");
      // 5 visible items * 30px item height
      expect(hostHeight()).toContain("height: 150px");
    });

    test("falls back to defaults for invalid visible-count values", () => {
      dom.setAttribute("visible-count", "-3");
      expect(hostHeight()).toContain("height: 150px");

      dom.setAttribute("visible-count", "abc");
      expect(hostHeight()).toContain("height: 150px");
    });

    test("falls back to default for non-positive item-height values", () => {
      dom.setAttribute("item-height", "0");
      expect(hostHeight()).toContain("height: 150px");
    });
  });

  describe("Rendering", () => {
    test("renders item values as plain text, not HTML", () => {
      dom.setItems(["<img src=x onerror=alert(1)>", "safe"]);

      const list = dom.shadowRoot!.querySelector("#list")!;
      expect(list.querySelector("img")).toBeNull();
      expect(list.textContent).toContain("<img src=x onerror=alert(1)>");
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

  describe("Events", () => {
    beforeEach(() => {
      dom.setItems(["Apple", "Banana", "Cherry", "Mango"]);
    });

    test("fires change when a scroll gesture lands on a new item", () => {
      const spy = vi.fn();
      dom.addEventListener("change", spy);

      // Simulate a drag/wheel gesture that ends two items down.
      dom["_move"](-60, true);
      dom["_end"]();

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail).toEqual({
        index: 2,
        value: "Cherry",
      });
    });

    test("does not fire change when the gesture lands on the same item", () => {
      const spy = vi.fn();
      dom.addEventListener("change", spy);

      dom["_move"](0, true);
      dom["_end"]();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
