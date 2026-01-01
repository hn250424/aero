export default {
  globs: ["src/**/*.ts"],
  outdir: "artifacts/cem",
  plugins: [
    createFilterPlugin()
  ]
};

/**
 * Filters the Custom Elements Manifest to expose only the public API surface.
 *
 * IMPORTANT:
 * This plugin does NOT hide individual columns.
 * Instead, it removes entire rows (declarations, members, events).
 */
function createFilterPlugin() {
	return {
		name: "api-only",

		packageLinkPhase({ customElementsManifest }) {
			for (const mod of customElementsManifest.modules) {
				if (mod.exports) {
					mod.exports = [];
				}

				if (!mod.declarations) continue;

				mod.declarations = mod.declarations.filter((d) => {
					const isInternal = d.jsDoc?.tags?.some((t) => t.tag === "internal");
					if (isInternal) return false;

					delete d.superclass;
					delete d.mixins;

					if (d.members) {
						d.members = d.members.filter((m) => {
							if (m.privacy && m.privacy !== "public") return false;

							const hasHiddenTag = m.jsDoc?.tags?.some(
								(t) => t.tag === "internal"
							);

							if (hasHiddenTag) return false;
							if (m.name === "innerHTML") return false;

							return true;
						});
					}

					if (d.events) {
						d.events = d.events.filter((e) => e.name !== "type");
					}

					return true;
				});
			}
		},
	};
}
