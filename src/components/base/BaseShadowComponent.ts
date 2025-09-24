export default class BaseShadowComponent extends HTMLElement {
    protected shadow: ShadowRoot

    constructor(htmlTemplate: string) {
        super()

        const template = document.createElement('template')
        template.innerHTML = htmlTemplate

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(template.content.cloneNode(true))
    }

    protected query<T extends HTMLElement>(selector: string): T {
        return this.shadow.querySelector(selector)! as T
    }
}