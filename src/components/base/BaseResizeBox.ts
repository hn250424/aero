import BaseShadowComponent from "./BaseShadowComponent"

export default abstract class BaseResizeBox extends BaseShadowComponent {
    protected topResizer!: HTMLElement
    protected bottomResizer!: HTMLElement
    protected leftResizer!: HTMLElement
    protected rightResizer!: HTMLElement

    private top!: boolean
    private bottom!: boolean
    private left!: boolean
    private right!: boolean

    private minWidth!: number
    private maxWidth!: number
    private minHeight!: number
    private maxHeight!: number

    private isTopDragging: boolean = false
    private isBottomDragging: boolean = false
    private isLeftDragging: boolean = false
    private isRightDragging: boolean = false
    private isDragging: boolean = false

    private animationFrameId: number | null = null

    constructor(htmlTemplate: string) {
        super(htmlTemplate)

        const resizerColor = this.getAttribute('resizer-color') ?? '#ccc'
        const style = document.createElement('style')
        style.textContent = `
            .resizer:hover {
                background-color: ${resizerColor};
            }
        `
        this.shadow.appendChild(style)

        const computedStyle = getComputedStyle(this)
        this.minHeight = parseInt(computedStyle.minHeight) || 10
        this.maxHeight = parseInt(computedStyle.maxHeight) || 5000
        this.minWidth = parseInt(computedStyle.minWidth) || 10
        this.maxWidth = parseInt(computedStyle.maxWidth) || 5000

        this.topResizer = this.query('#top')
        this.bottomResizer = this.query('#bottom')
        this.leftResizer = this.query('#left')
        this.rightResizer = this.query('#right')

        this.top = this.hasAttribute('resize-top')
        this.bottom = this.hasAttribute('resize-bottom')
        this.left = this.hasAttribute('resize-left')
        this.right = this.hasAttribute('resize-right')
        if (!this.top && !this.bottom && !this.left && !this.right) this.right = true

        if (!this.top) this.topResizer.style.display = 'none'
        if (!this.bottom) this.bottomResizer.style.display = 'none'
        if (!this.left) this.leftResizer.style.display = 'none'
        if (!this.right) this.rightResizer.style.display = 'none'

        if (this.top) this.topResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'top'))
        if (this.bottom) this.bottomResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'bottom'))
        if (this.left) this.leftResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'left'))
        if (this.right) this.rightResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'right'))

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)

            this.animationFrameId = requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect()

                if (this.isTopDragging) {
                    const offsetY = rect.bottom - e.clientY
                    const newHeight = Math.min(Math.max(offsetY, this.minHeight), this.maxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isBottomDragging) {
                    const offsetY = e.clientY - rect.top
                    const newHeight = Math.min(Math.max(offsetY, this.minHeight), this.maxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isLeftDragging) {
                    const offsetX = rect.right - e.clientX
                    const newWidth = Math.min(Math.max(offsetX, this.minWidth), this.maxWidth)
                    this.style.width = `${newWidth}px`

                } else if (this.isRightDragging) {
                    const offsetX = e.clientX - rect.left
                    const newWidth = Math.min(Math.max(offsetX, this.minWidth), this.maxWidth)
                    this.style.width = `${newWidth}px`

                }
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
            this.isTopDragging = false
            this.isBottomDragging = false
            this.isLeftDragging = false
            this.isRightDragging = false
        })
    }

    private processMousedownEvent(e: MouseEvent, resizer: 'top' | 'bottom' | 'left' | 'right') {
        e.preventDefault()
        document.body.style.userSelect = 'none'
        this.isDragging = true

        switch (resizer) {
            case 'top':
                this.isTopDragging = true
                document.body.style.cursor = 'ns-resize'
                break
            case 'bottom':
                this.isBottomDragging = true
                document.body.style.cursor = 'ns-resize'
                break
            case 'left':
                this.isLeftDragging = true
                document.body.style.cursor = 'ew-resize'
                break
            case 'right':
                this.isRightDragging = true
                document.body.style.cursor = 'ew-resize'
                break
        }
    }
}
