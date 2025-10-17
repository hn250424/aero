import * as aero from '../src'
import { EditorView, basicSetup } from "codemirror"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { javascript } from "@codemirror/lang-javascript"

document.addEventListener("DOMContentLoaded", () => {
    const updatePreview = () => {
        const doc = `
            <html>
            <head>
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                    }

                    html,
                    body {
                        width: 100%;
                        height: 100%;
                    }
                </style>
                <style>${cssInput.state.doc.toString()}</style>
            </head>
            <body>
                ${htmlInput.state.doc.toString()}
            <script type="module">
                import * as aero from '../src'
                ${javascriptInput.state.doc.toString()}
            </script>
            </body>
            </html>
        `
        previewIframe.srcdoc = doc
    }

    const previewIframe = document.querySelector('.preview-iframe') as HTMLIFrameElement
    
    const htmlInput = new EditorView({
        doc: "<p>Hello HTML</p>",
        extensions: [
            basicSetup,
            html(),
            EditorView.updateListener.of(updatePreview)
        ],
        parent: document.querySelector(".html-box")!
    })

    const cssInput = new EditorView({
        doc: "body { color: red; }",
        extensions: [
            basicSetup,
            css(),
            EditorView.updateListener.of(updatePreview)
        ],
        parent: document.querySelector(".css-box")!
    })

    const javascriptInput = new EditorView({
        doc: "console.log('Hello JS');",
        extensions: [
            basicSetup,
            javascript(),
            EditorView.updateListener.of(updatePreview)
        ],
        parent: document.querySelector(".javascript-box")!
    })

    updatePreview()
})

// const dynamicContainer = document.getElementById('dynamic-container')

// const numericInput = new aero.NumericInput()
// dynamicContainer?.appendChild(numericInput)

// numericInput.style.height = '10px'
// numericInput.step = 2
// setTimeout(() => {
//     numericInput.step = 0.2
// }, 10000)

// const resizeBox = new aero.ResizeBox()
// dynamicContainer?.appendChild(resizeBox)

// setTimeout(() => {
//     resizeBox.minWidth = 40
// }, 3000)