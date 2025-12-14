import type { ComponentKeys } from "../domain";

let currentComponentKey: ComponentKeys | undefined;
const subscribers = new Set<(key: ComponentKeys) => void>();

export function subscribeComponentChange(fn: (key: ComponentKeys) => void) {
	subscribers.add(fn);
}

export function selectComponent(
	key: ComponentKeys | undefined,
	force: boolean = false
) {
	if (!key) return;
	if ((key !== currentComponentKey) || force) {
		currentComponentKey = key;
		subscribers.forEach(fn => fn(key));
	}
}

export function getCurrentComponentKey(): ComponentKeys | undefined {
	return currentComponentKey;
}
