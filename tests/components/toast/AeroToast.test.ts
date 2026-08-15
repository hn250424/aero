import { afterEach, describe, expect, test, vi } from "vitest";
import { AeroToast } from "@src/components/toast/AeroToast";

describe("AeroToast", () => {
  afterEach(() => {
    document.querySelectorAll("aero-toast").forEach((el) => el.remove());
    vi.useRealTimers();
  });

  describe("Construction", () => {
    test("can be created without arguments (createElement safety)", () => {
      expect(() => document.createElement("aero-toast")).not.toThrow();
    });

    test("does not attach itself to the DOM on construction", () => {
      new AeroToast("hello");
      expect(document.querySelector("aero-toast")).toBeNull();
    });
  });

  describe("show()", () => {
    test("appends the toast to document.body", () => {
      AeroToast.show("hello");

      const toast = document.querySelector("aero-toast");
      expect(toast).not.toBeNull();
      expect(toast!.shadowRoot!.querySelector("#text")!.textContent).toBe(
        "hello"
      );
    });

    test("removes the toast after the duration even without animationend", () => {
      vi.useFakeTimers();

      AeroToast.show("bye", { ms: 1000 });
      expect(document.querySelector("aero-toast")).not.toBeNull();

      vi.advanceTimersByTime(1100);
      expect(document.querySelector("aero-toast")).toBeNull();
    });

    test("falls back to the default duration for invalid ms values", () => {
      vi.useFakeTimers();

      AeroToast.show("oops", { ms: -5 });

      vi.advanceTimersByTime(3100);
      expect(document.querySelector("aero-toast")).toBeNull();
    });
  });

  describe("removal", () => {
    test("removes itself on animationend", () => {
      AeroToast.show("animated");

      const toast = document.querySelector("aero-toast")!;
      toast.dispatchEvent(new Event("animationend"));

      expect(document.querySelector("aero-toast")).toBeNull();
    });
  });
});
