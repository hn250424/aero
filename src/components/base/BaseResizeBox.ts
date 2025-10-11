import BaseShadowComponent from "./BaseShadowComponent"

export default abstract class BaseResizeBox extends BaseShadowComponent {
    protected resizer!: HTMLElement

    private isDragging: boolean = false
    private animationFrameId: number | null = null

    private minWidth: number = 10
    private maxWidth: number = 5000

    constructor(htmlTemplate: string) {
        super(htmlTemplate)
        this.initialize()
    }

    protected abstract getResizerSelector(): string

    private initialize() {
        const resizer = this.query(this.getResizerSelector())

        resizer.addEventListener('mousedown', () => {
            this.isDragging = true
            document.body.style.cursor = 'ew-resize'
            document.body.style.userSelect = 'none'
        })

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)

            this.animationFrameId = requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect()
                const offsetX = e.clientX - rect.left
                const newWidth = Math.min(Math.max(offsetX, this.minWidth), this.maxWidth)
                this.style.width = `${newWidth}px`
            })
        })

        document.addEventListener('mouseup', () => {
            if (!this.isDragging) return

            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId)
                this.animationFrameId = null
            }

            document.body.style.cursor = 'default'
            document.body.style.userSelect = 'auto'
            this.isDragging = false
        })
    }
}
