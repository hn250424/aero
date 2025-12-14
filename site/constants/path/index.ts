	export const AERO_IMPORT_PATH = import.meta.env.DEV
		? "/src/index.ts"
		: `${import.meta.env.BASE_URL}aero.es.js`;
