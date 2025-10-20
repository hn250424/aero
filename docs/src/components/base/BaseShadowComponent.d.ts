export default class BaseShadowComponent extends HTMLElement {
    protected shadow: ShadowRoot;
    constructor(htmlTemplate: string);
    protected query<T extends HTMLElement>(selector: string): T;
    protected applyStyles(style: string): void;
}
