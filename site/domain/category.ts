export type NavCategory =
	| "home"
	| "getting_started"
	| "components"
	| "links"

export type ContextNavCategory = Exclude<NavCategory, "links">;
