export interface Context {
	clean(): void,
}

export interface PageableContext<K extends string = string> extends Context {
	switchPage(key: K): void,
}
