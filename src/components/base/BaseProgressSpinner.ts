import BaseShadowComponent from "./BaseShadowComponent"

export default class BaseProgressSpinner extends BaseShadowComponent {
    private containerBackgroundColor
    private spinnerBackgroundColor
    private spinnerColor

    constructor(htmlTemplate: string) {
        super(htmlTemplate)

        this.containerBackgroundColor = this.getAttribute('container-background') ?? 'rgba(0, 0, 0, 0.5)'
        this.spinnerBackgroundColor = this.getAttribute('spinner-background') ?? 'white'
        this.spinnerColor = this.getAttribute('spinner-color') ?? 'black'
        const container = this.query('.container')
        container.style.background = this.containerBackgroundColor

        const spinner = this.query('.spinner')
        spinner.style.border = `5px solid ${this.spinnerBackgroundColor}`
        spinner.style.borderTop = `5px solid ${this.spinnerColor}`
        
    }

    
}