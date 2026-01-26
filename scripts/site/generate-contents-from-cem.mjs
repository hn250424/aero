import fs from "fs";
import path from "path";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import { postProcess } from "./post-process-from-cem/index.mjs";

const ROOT = process.cwd();

const cemRaw = fs.readFileSync(
	path.resolve(ROOT, "artifacts/cem/custom-elements.json"),
	"utf-8"
);

const cem = JSON.parse(cemRaw, (key, value) => {
	if ((key === "text" || key === "default") && typeof value === "string") {
		return value
			.replace(/[\r\n]+/g, " ")
			.replace(/\t/g, " ")
			.replace(/\s+/g, " ")
			.trim();
	}
	return value;
});

const outDir = path.resolve(ROOT, "site/pages/components/api/widgets");
fs.mkdirSync(outDir, { recursive: true });

// Columns to remove from all tables
// Always remove these columns from all tables
const globalColumnsToRemove = ["Privacy", "Inherited From"];

// Remove these columns only in specific sections
const sectionSpecificRemovals = {
	Events: ["Type"],
	Slots: ["Name"]
};

for (const mod of cem.modules ?? []) {
	for (const decl of mod.declarations ?? []) {
		if (decl.customElement && decl.tagName) {
			let md = customElementsManifestToMarkdown(
				{
					...cem,
					modules: [{ ...mod, declarations: [decl] }],
				},
				{ headingLevel: 2 }
			);

			const htmlString = marked(md);
			const dom = new JSDOM(htmlString);
			const doc = dom.window.document;

			// Remove class title and bottom line.
			doc.querySelector("h1").remove();
			doc.querySelector("h2").remove();
			doc.querySelector("hr").remove();

			// Remove specific columns from tables after HTML transformation.
			doc.querySelectorAll("table").forEach((table) => {
				const removeIndexes = [];

				// Find the previous element sibling, skipping any text nodes (whitespace/newlines)
				let prevElement = table.previousElementSibling;
				while (prevElement && prevElement.nodeType === 3) { // 3 === text
					prevElement = prevElement.previousSibling;
				}

				// Apply section-specific column removal rules
				if (prevElement?.tagName === "H3") {
					const sectionName = prevElement.textContent.trim();
					const columnsForSection = sectionSpecificRemovals[sectionName];

					if (columnsForSection) {
						table.querySelectorAll("thead th").forEach((th, i) => {
							if (
								columnsForSection.includes(th.textContent.trim()) &&
								!removeIndexes.includes(i)
							) {
								removeIndexes.push(i);
							}
						});
					}
				}

				// Apply global column removal
				table.querySelectorAll("thead th").forEach((th, i) => {
					const text = th.textContent.trim();
					if (globalColumnsToRemove.includes(text)) {
						removeIndexes.push(i);
					}
				});

				if (removeIndexes.length === 0) return;

				table.querySelectorAll("thead tr").forEach((tr) => {
					tr.querySelectorAll("th").forEach((th, i) => {
						if (removeIndexes.includes(i)) th.remove();
					});
				});

				table.querySelectorAll("tbody tr").forEach((tr) => {
					tr.querySelectorAll("td").forEach((td, i) => {
						if (removeIndexes.includes(i)) td.remove();
					});
				});
			});

			const finalHtml = postProcess(decl.tagName, doc.body.innerHTML);
			const htmlFile = path.join(outDir, `${decl.tagName}.html`);
			fs.writeFileSync(htmlFile, finalHtml, "utf-8");
			console.log(`📄 ${htmlFile} generated`);
		}
	}
}
