export default class BaseAeroShadowComponent extends HTMLElement {
    protected shadow: ShadowRoot

    protected constructor(htmlTemplate: string) {
        super()

        const template = document.createElement('template')
        template.innerHTML = htmlTemplate

        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(template.content.cloneNode(true))
    }

    protected query<T extends HTMLElement>(selector: string): T {
        return this.shadow.querySelector(selector)! as T
    }

    protected applyStyles(style: string) {
        const tag = document.createElement('style')
        tag.textContent = style
        this.shadow.appendChild(tag)
    }
}