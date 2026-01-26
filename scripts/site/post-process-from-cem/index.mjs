import { postProcessAeroToast } from "./aero-toast.mjs"

const processors = {
	"aero-toast": postProcessAeroToast
}

export function postProcess(tagName, html) {
	const processor = processors[tagName]
	return processor ? processor(html) : html
}
