import { JSDOM } from "jsdom";

export function postProcessAeroPopup(html) {
	const dom = new JSDOM(html);
	const doc = dom.window.document;

	const h3List = [...doc.querySelectorAll("h3")];
	const staticMethodsH3 = h3List.find(
		(h) => h.textContent.trim() === "Static Methods"
	);
	if (!staticMethodsH3)
		throw new Error("Error occur in AeroPopup post-processing");

	const methodsTable = staticMethodsH3.nextElementSibling;
	if (!methodsTable || methodsTable.tagName !== "TABLE") {
		return doc.body.innerHTML;
	}

	const optionsH3 = doc.createElement("h3");
	optionsH3.textContent = "Popup Options";

	const table = doc.createElement("table");
	table.innerHTML = `
		<thead>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>fontSize</code></td>
				<td><code>string</code></td>
				<td><code>"1.2rem"</code></td>
				<td>Font size for the popup content and buttons.</td>
			</tr>
			<tr>
				<td><code>containerBorder</code></td>
				<td><code>string</code></td>
				<td><code>"1px solid lightgrey"</code></td>
				<td>Border style for the popup container.</td>
			</tr>
			<tr>
				<td><code>containerBoxShadow</code></td>
				<td><code>string</code></td>
				<td><code>"0 4px 8px rgba(0, 0, 0, 0.2)"</code></td>
				<td>Box shadow for the popup container.</td>
			</tr>
			<tr>
				<td><code>titleBoundaryColor</code></td>
				<td><code>string</code></td>
				<td><code>"lightgrey"</code></td>
				<td>Color of the border between title and message.</td>
			</tr>
			<tr>
				<td><code>buttonPrimaryBackgroundColor</code></td>
				<td><code>string</code></td>
				<td><code>"#2563eb"</code></td>
				<td>Background color for the OK button.</td>
			</tr>
			<tr>
				<td><code>buttonPrimaryColor</code></td>
				<td><code>string</code></td>
				<td><code>"white"</code></td>
				<td>Text color for the OK button.</td>
			</tr>
			<tr>
				<td><code>buttonSecondaryBackgroundColor</code></td>
				<td><code>string</code></td>
				<td><code>"grey"</code></td>
				<td>Background color for the Cancel button.</td>
			</tr>
			<tr>
				<td><code>buttonSecondaryColor</code></td>
				<td><code>string</code></td>
				<td><code>"white"</code></td>
				<td>Text color for the Cancel button.</td>
			</tr>
			<tr>
				<td><code>buttonBorderRadius</code></td>
				<td><code>string</code></td>
				<td><code>"0"</code></td>
				<td>Border radius for both buttons.</td>
			</tr>
		</tbody>
	`;

	methodsTable.insertAdjacentElement("afterend", table);
	methodsTable.insertAdjacentElement("afterend", optionsH3);

	const fieldsH3 = h3List.find((h) => h.textContent.trim() === "Fields");
	const nextTable = fieldsH3.nextElementSibling;
	fieldsH3.remove();
	nextTable.remove();

	return doc.body.innerHTML;
}
