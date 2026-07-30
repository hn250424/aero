import { afterEach, describe, expect, test } from "vitest";
import { AeroPopup } from "@src/components/popup/AeroPopup";

describe("AeroPopup", () => {
	afterEach(() => {
		document.querySelectorAll("aero-popup").forEach((el) => el.remove());
	});

	const shadowButton = (popup: Element, selector: string) =>
		popup.shadowRoot!.querySelector<HTMLButtonElement>(selector)!;

	describe("Construction", () => {
		test("can be created without arguments (createElement safety)", () => {
			expect(() => document.createElement("aero-popup")).not.toThrow();
		});

		test("does not attach itself to the DOM on construction", () => {
			new AeroPopup();
			expect(document.querySelector("aero-popup")).toBeNull();
		});
	});

	describe("alert()", () => {
		test("resolves true when ok is clicked", async () => {
			const promise = AeroPopup.alert("hello");

			const popup = document.querySelector("aero-popup")!;
			shadowButton(popup, "#ok").click();

			await expect(promise).resolves.toBe(true);
			expect(document.querySelector("aero-popup")).toBeNull();
		});
	});

	describe("confirm()", () => {
		test("resolves false when cancel is clicked", async () => {
			const promise = AeroPopup.confirm("sure?");

			const popup = document.querySelector("aero-popup")!;
			shadowButton(popup, "#cancel").click();

			await expect(promise).resolves.toBe(false);
		});

		test("resolves false (dismissal) when removed without a button press", async () => {
			const promise = AeroPopup.confirm("sure?");

			document.querySelector("aero-popup")!.remove();

			await expect(promise).resolves.toBe(false);
		});
	});

	describe("Keyboard", () => {
		test("Enter resolves the popup with true", async () => {
			const promise = AeroPopup.confirm("keyboard?");

			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

			await expect(promise).resolves.toBe(true);
		});

		test("Escape resolves a confirm with false", async () => {
			const promise = AeroPopup.confirm("keyboard?");

			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

			await expect(promise).resolves.toBe(false);
		});

		test("only the topmost popup reacts to keys when stacked", async () => {
			const first = AeroPopup.confirm("first");
			const second = AeroPopup.confirm("second");

			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

			await expect(second).resolves.toBe(false);
			expect(document.querySelectorAll("aero-popup").length).toBe(1);

			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
			await expect(first).resolves.toBe(true);
		});

		test("window keydown listener is removed after the popup closes", async () => {
			const promise = AeroPopup.alert("bye");

			const popup = document.querySelector("aero-popup")!;
			shadowButton(popup, "#ok").click();
			await promise;

			// A later keydown must not throw or resurrect anything.
			expect(() =>
				window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
			).not.toThrow();
			expect(document.querySelector("aero-popup")).toBeNull();
		});
	});
});
