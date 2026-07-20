/**
 * Registers all library custom elements before tests run.
 * Component registration was centralized in src/index.ts, so tests that
 * rely on document.createElement("aero-...") need this side-effect import.
 */
import "@src/index";

// jsdom does not implement scrollIntoView; stub it so components can call it directly.
Element.prototype.scrollIntoView = () => {};
