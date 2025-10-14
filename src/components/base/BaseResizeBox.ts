import BaseShadowComponent from "./BaseShadowComponent"

export default abstract class BaseResizeBox extends BaseShadowComponent {
    private _topResizer!: HTMLElement
    private _bottomResizer!: HTMLElement
    private _leftResizer!: HTMLElement
    private _rightResizer!: HTMLElement

    private top!: boolean
    private bottom!: boolean
    private left!: boolean
    private right!: boolean

    private _minWidth!: number
    private _maxWidth!: number
    private _minHeight!: number
    private _maxHeight!: number

    private isTopDragging: boolean = false
    private isBottomDragging: boolean = false
    private isLeftDragging: boolean = false
    private isRightDragging: boolean = false
    private isDragging: boolean = false

    private animationFrameId: number | null = null

    constructor(htmlTemplate: string, resizeDirections?: { top?: boolean, bottom?: boolean, left?: boolean, right?: boolean }) {
        super(htmlTemplate)

        const resizerColor = this.getAttribute('resizer-color') ?? '#ccc'
        this.applyStyles(
            `.resizer:hover {
                background-color: ${resizerColor};
            }`
        )

        // Treat falsy max values (e.g., 0) as Infinity.
        const computedStyle = getComputedStyle(this)
        this._minHeight = parseInt(computedStyle.minHeight) || 0
        this._maxHeight = parseInt(computedStyle.maxHeight) || Infinity
        this._minWidth = parseInt(computedStyle.minWidth) || 0
        this._maxWidth = parseInt(computedStyle.maxWidth) || Infinity

        this._topResizer = this.query('#top')
        this._bottomResizer = this.query('#bottom')
        this._leftResizer = this.query('#left')
        this._rightResizer = this.query('#right')

        this.top = resizeDirections?.top ?? this.hasAttribute('resize-top')
        this.bottom = resizeDirections?.bottom ?? this.hasAttribute('resize-bottom')
        this.left = resizeDirections?.left ?? this.hasAttribute('resize-left')
        this.right = resizeDirections?.right ?? this.hasAttribute('resize-right')
        if (!this.top && !this.bottom && !this.left && !this.right) this.right = true

        if (!this.top) this._topResizer.style.display = 'none'
        if (!this.bottom) this._bottomResizer.style.display = 'none'
        if (!this.left) this._leftResizer.style.display = 'none'
        if (!this.right) this._rightResizer.style.display = 'none'

        if (this.top) this._topResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'top'))
        if (this.bottom) this._bottomResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'bottom'))
        if (this.left) this._leftResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'left'))
        if (this.right) this._rightResizer.addEventListener('mousedown', (e) => this.processMousedownEvent(e, 'right'))

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)

            this.animationFrameId = requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect()

                if (this.isTopDragging) {
                    const offsetY = rect.bottom - e.clientY
                    const newHeight = Math.min(Math.max(offsetY, this._minHeight), this._maxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isBottomDragging) {
                    const offsetY = e.clientY - rect.top
                    const newHeight = Math.min(Math.max(offsetY, this._minHeight), this._maxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isLeftDragging) {
                    const offsetX = rect.right - e.clientX
                    const newWidth = Math.min(Math.max(offsetX, this._minWidth), this._maxWidth)
                    this.style.width = `${newWidth}px`

                } else if (this.isRightDragging) {
                    const offsetX = e.clientX - rect.left
                    const newWidth = Math.min(Math.max(offsetX, this._minWidth), this._maxWidth)
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



    static get observedAttributes() {
        return ['min-width', 'max-width', 'min-height', 'max-height']
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        const num = Number(newValue)

        const handlers: Record<string, () => void> = {
            'min-width': () => { this._minWidth = num },
            'max-width': () => { this._maxWidth = num },
            'min-height': () => { this._minHeight = num },
            'max-height': () => { this._maxHeight = num },
        }

        handlers[name]?.()
    }


    
    get minWidth() { return this._minWidth }
    set minWidth(val: number) { this.setAttribute('min-width', val.toString()) }

    get maxWidth() { return this._maxWidth }
    set maxWidth(val: number) { this.setAttribute('max-width', val.toString()) }

    get minHeight() { return this._minHeight }
    set minHeight(val: number) { this.setAttribute('min-height', val.toString()) }

    get maxHeight() { return this._maxHeight }
    set maxHeight(val: number) { this.setAttribute('max-height', val.toString()) }
}
