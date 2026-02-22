import { postProcessAeroToast } from "./aero-toast.mjs"
import { postProcessAeroPopup } from "./aero-popup.mjs"

const processors = {
	"aero-toast": postProcessAeroToast,
	"aero-popup": postProcessAeroPopup,
}

export function postProcess(tagName, html) {
	const processor = processors[tagName]
	return processor ? processor(html) : html
}
