import fs from "fs";
import path from "path";
import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";

const ROOT = process.cwd();

const cemRaw = fs.readFileSync(path.resolve(ROOT, "site/custom-elements.json"), "utf-8");

const cem = JSON.parse(cemRaw, (key, value) => {
  if ((key === 'text' || key === 'default') && typeof value === 'string') {
    return value
      .replace(/[\r\n]+/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return value;
});

const outDir = path.resolve(ROOT, "site/pages/docs/api_reference/widgets");
fs.mkdirSync(outDir, { recursive: true });

for (const mod of cem.modules ?? []) {
  for (const decl of mod.declarations ?? []) {
    if (decl.customElement && decl.tagName) {
      const md = customElementsManifestToMarkdown(
        {
          ...cem,
          modules: [{ ...mod, declarations: [decl] }]
        },
        { headingLevel: 2 }
      );

      const file = path.join(outDir, `${decl.tagName}.md`);
      fs.writeFileSync(file, md, "utf-8");
      console.log(`📄 ${file} generated`);
    }
  }
}
