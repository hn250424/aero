import BaseAeroShadowComponent from "./BaseAeroShadowComponent"

export default class BaseAeroProgress extends BaseAeroShadowComponent {
    
    protected constructor(htmlTemplate: string) {
        super(htmlTemplate)

        this.updateContainerBackground( this.getAttribute('container-background') )
    }


    
    static get observedAttributes() {
        return [
            'container-background'
        ]
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        this.baseAeroProgressAttributeHandlers[name]?.(newValue)
    }

    private baseAeroProgressAttributeHandlers: Record<string, (newValue: string | null) => void> = {
        'container-background': (newValue) => { this.updateContainerBackground(newValue) },
    }

    

    updateContainerBackground(val: string | null) {
        this.applyStyles(
            `:host {
                background: ${val ? val : 'rgba(0, 0, 0, 0.5)'};
            }`
        )
    }



    set containerBackground(val: string) {
        this.setAttribute('container-background', val)
    }
}