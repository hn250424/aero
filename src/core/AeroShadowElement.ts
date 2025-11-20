export default class AeroShadowElement extends HTMLElement {
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




// TODO - Which is better: enforcing strict usage or allowing default HTML inheritance?
// Makes sense that enforcing constraints is better. 
// If we want users to use it freely, it's probably better to just cook with standard HTML ingredients.

// private forwardEvents() {
//     const eventsToForward = ['click', 'input', 'change', 'focus', 'blur']

//     const forward = (el: HTMLElement) => {
//         eventsToForward.forEach(eventName => {
//             el.addEventListener(eventName, e => {
//                 this.dispatchEvent(new CustomEvent(eventName, {
//                     detail: { value: (this._input?.value ?? null) },
//                     bubbles: true,
//                     composed: true
//                 }))
//             })
//         })
//     }

//     this.shadowRoot?.querySelectorAll<HTMLElement>('*').forEach(forward)

//     const observer = new MutationObserver(mutations => {
//         mutations.forEach(m => {
//             m.addedNodes.forEach(node => {
//                 if (node instanceof HTMLElement) forward(node)
//             })
//         })
//     })
//     observer.observe(this.shadowRoot!, { childList: true, subtree: true })
// }