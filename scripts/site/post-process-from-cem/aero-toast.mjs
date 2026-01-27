import { JSDOM } from "jsdom";

export function postProcessAeroToast(html) {
	const dom = new JSDOM(html);
	const doc = dom.window.document;

	const h3List = [...doc.querySelectorAll("h3")];
	const staticMethodsH3 = h3List.find(
		(h) => h.textContent.trim() === "Static Methods"
	);
	if (!staticMethodsH3) throw new Error("Error occur in AeroToast post-processing");



	const methodsTable = staticMethodsH3.nextElementSibling;
	if (!methodsTable || methodsTable.tagName !== "TABLE") {
		return doc.body.innerHTML;
	}

	const hasShow = [...methodsTable.querySelectorAll("tbody tr")].some((tr) =>
		tr.querySelector("td code")?.textContent === "show"
	);
	if (!hasShow) throw new Error("Error occur in AeroToast post-processing");

	const optionsH3 = doc.createElement("h3");
	optionsH3.textContent = "Toast Options";
	// optionsH3.style.color = "var(--color-accent, #6b7280)";
	// optionsH3.style.fontWeight = "500";

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
				<td><code>top</code></td>
				<td><code>number</code></td>
				<td><code>90</code></td>
				<td>Vertical position of the toast (percentage, 0–100).</td>
			</tr>
			<tr>
				<td><code>left</code></td>
				<td><code>number</code></td>
				<td><code>50</code></td>
				<td>Horizontal position of the toast (percentage, 0–100).</td>
			</tr>
			<tr>
				<td><code>ms</code></td>
				<td><code>number</code></td>
				<td><code>3000</code></td>
				<td>Duration before the toast disappears (milliseconds).</td>
			</tr>
			<tr>
				<td><code>background</code></td>
				<td><code>string</code></td>
				<td><code>"black"</code></td>
				<td>Background color of the toast.</td>
			</tr>
			<tr>
				<td><code>color</code></td>
				<td><code>string</code></td>
				<td><code>"white"</code></td>
				<td>Text color of the toast.</td>
			</tr>
		</tbody>
	`;

	methodsTable.insertAdjacentElement("afterend", table);
	methodsTable.insertAdjacentElement("afterend", optionsH3);

	return doc.body.innerHTML;
}
