import BaseAeroShadowComponent from "./BaseAeroShadowComponent"

export default abstract class BaseAeroResizeBox extends BaseAeroShadowComponent {
    private _topResizer!: HTMLElement
    private _bottomResizer!: HTMLElement
    private _leftResizer!: HTMLElement
    private _rightResizer!: HTMLElement

    private _hasTopResizer!: boolean
    private _hasBottomResizer!: boolean
    private _hasLeftResizer!: boolean
    private _hasRightResizer!: boolean

    private _nMinWidth!: number
    private _nMaxWidth!: number
    private _nMinHeight!: number
    private _nMaxHeight!: number

    private isTopDragging: boolean = false
    private isBottomDragging: boolean = false
    private isLeftDragging: boolean = false
    private isRightDragging: boolean = false
    private isDragging: boolean = false

    private animationFrameId: number | null = null

    private resizerHandlers = {
        top: (e: MouseEvent) => this.processMousedownEvent(e, 'top'),
        bottom: (e: MouseEvent) => this.processMousedownEvent(e, 'bottom'),
        left: (e: MouseEvent) => this.processMousedownEvent(e, 'left'),
        right: (e: MouseEvent) => this.processMousedownEvent(e, 'right'),
    }

    protected constructor(htmlTemplate: string) {
        super(htmlTemplate)

        this._topResizer = this.query('#top')
        this._bottomResizer = this.query('#bottom')
        this._leftResizer = this.query('#left')
        this._rightResizer = this.query('#right')

        this.updateMinWidthValue( this.getAttribute('min-width') )
        this.updateMaxWidthValue( this.getAttribute('max-width') )
        this.updateMinHeightValue( this.getAttribute('min-height') )
        this.updateMaxHeightValue( this.getAttribute('max-height') )

        this.updateTopResizerState( this.hasAttribute('resize-top') )
        this.updateBottomResizerState( this.hasAttribute('resize-bottom') )
        this.updateLeftResizerState( this.hasAttribute('resize-left') )
        this.updateRightResizerState( this.hasAttribute('resize-right') )

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)

            this.animationFrameId = requestAnimationFrame(() => {
                const rect = this.getBoundingClientRect()

                if (this.isTopDragging) {
                    const offsetY = rect.bottom - e.clientY
                    const newHeight = Math.min(Math.max(offsetY, this._nMinHeight), this._nMaxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isBottomDragging) {
                    const offsetY = e.clientY - rect.top
                    const newHeight = Math.min(Math.max(offsetY, this._nMinHeight), this._nMaxHeight)
                    this.style.height = `${newHeight}px`

                } else if (this.isLeftDragging) {
                    const offsetX = rect.right - e.clientX
                    const newWidth = Math.min(Math.max(offsetX, this._nMinWidth), this._nMaxWidth)
                    this.style.width = `${newWidth}px`

                } else if (this.isRightDragging) {
                    const offsetX = e.clientX - rect.left
                    const newWidth = Math.min(Math.max(offsetX, this._nMinWidth), this._nMaxWidth)
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



    private processMousedownEvent = (e: MouseEvent, resizer: 'top' | 'bottom' | 'left' | 'right') => {
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
        return [
            'min-width', 'max-width', 'min-height', 'max-height', 
            'resize-top', 'resize-bottom', 'resize-left', 'resize-right',
            'resizer-color'
        ]
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        this.baseAeroResizeBoxAttributeHandlers[name]?.(newValue)
    }

    private baseAeroResizeBoxAttributeHandlers: Record<string, (newValue: string | null) => void> = {
        'min-width': (newValue) => { this.updateMinWidthValue(newValue) },
        'max-width': (newValue) => { this.updateMaxWidthValue(newValue) },
        'min-height': (newValue) => { this.updateMinHeightValue(newValue) },
        'max-height': (newValue) => { this.updateMaxHeightValue(newValue) },
        'resize-top': (newValue) => { this.updateTopResizerState(newValue !== null) },
        'resize-bottom': (newValue) => { this.updateBottomResizerState(newValue !== null) },
        'resize-left': (newValue) => { this.updateLeftResizerState(newValue !== null) },
        'resize-right': (newValue) => { this.updateRightResizerState(newValue !== null) },
        'resizer-color': (newValue) => {
            const color = newValue ?? '#ccc'
            this.applyStyles(`.resizer:hover { background-color: ${color}; }`)
        }
    }



    // TODO: extract common logic ?
    private updateTopResizerState(bool: boolean | null) { 
        this._hasTopResizer = bool ? bool : false 

        if (this._hasTopResizer) {
            this._topResizer.style.display = 'block'
            this._topResizer.addEventListener('mousedown', this.resizerHandlers.top)
        } else {
            this._topResizer.style.display = 'none'
            this._topResizer.removeEventListener('mousedown', this.resizerHandlers.top)
        }
    }

    private updateBottomResizerState(bool: boolean | null) { 
        this._hasBottomResizer = bool ? bool : false 

        if (this._hasBottomResizer) {
            this._bottomResizer.style.display = 'block'
            this._bottomResizer.addEventListener('mousedown', this.resizerHandlers.bottom)
        } else {
            this._bottomResizer.style.display = 'none'
            this._bottomResizer.removeEventListener('mousedown', this.resizerHandlers.bottom)
        }
    }

    private updateLeftResizerState(bool: boolean | null) { 
        this._hasLeftResizer = bool ? bool : false 

        if (this._hasLeftResizer) {
            this._leftResizer.style.display = 'block'
            this._leftResizer.addEventListener('mousedown', this.resizerHandlers.left)
        } else {
            this._leftResizer.style.display = 'none'
            this._leftResizer.removeEventListener('mousedown', this.resizerHandlers.left)
        }
    }

    private updateRightResizerState(bool: boolean | null) { 
        this._hasRightResizer = bool ? bool : false 

        if (this._hasRightResizer) {
            this._rightResizer.style.display = 'block'
            this._rightResizer.addEventListener('mousedown', this.resizerHandlers.right)
        } else {
            this._rightResizer.style.display = 'none'
            this._rightResizer.removeEventListener('mousedown', this.resizerHandlers.right)
        }
    }

    private updateMinWidthValue(val: string | null) {
        this._nMinWidth = val ? Number(val) : 0
    }

    private updateMaxWidthValue(val: string | null) {
        this._nMaxWidth = val ? Number(val) : 2000
    }

    private updateMinHeightValue(val: string | null) {
        this._nMinHeight = val ? Number(val) : 0
    }

    private updateMaxHeightValue(val: string | null) {
        this._nMaxHeight = val ? Number(val) : 2000
    }
    


    set resizerColor(color: string) { this.setAttribute('resizer-color', color) }
    
    get minWidth() { return this._nMinWidth.toString() }
    set minWidth(val: string) { this.setAttribute('min-width', val) }

    get maxWidth() { return this._nMaxWidth.toString() }
    set maxWidth(val: string) { this.setAttribute('max-width', val) }

    get minHeight() { return this._nMinHeight.toString() }
    set minHeight(val: string) { this.setAttribute('min-height', val) }

    get maxHeight() { return this._nMaxHeight.toString() }
    set maxHeight(val: string) { this.setAttribute('max-height', val) }

    addTopResizer() { this.setAttribute('resize-top', '') }
    removeTopResizer() { this.removeAttribute('resize-top') }

    addBottomResizer() { this.setAttribute('resize-bottom', '') }
    removeBottomResizer() { this.removeAttribute('resize-bottom') }

    addLeftResizer() { this.setAttribute('resize-left', '') }
    removeLeftResizer() { this.removeAttribute('resize-left') }

    addRightResizer() { this.setAttribute('resize-right', '') }
    removeRightResizer() { this.removeAttribute('resize-right') }


}
