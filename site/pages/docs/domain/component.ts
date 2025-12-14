const comopnentKeys = [
	"aero-numeric-input",
	"aero-spinbox",
	"aero-progress-spinner",
	"aero-resize-box",
] as const;

export type ComponentKeys = (typeof comopnentKeys)[number];
