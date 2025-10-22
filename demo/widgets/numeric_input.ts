const html = 
`<aero-numeric-input 
    min="0.4" max="100" step="0.46" value="1">
</aero-numeric-input>`

const css =
`aero-numeric-input {
    text-align: center;
    margin-bottom: 5px;
}`

const js =
`const numericInput = document.createElement('aero-numeric-input')
numericInput.value = 1
numericInput.step = 0.46
document.body.appendChild(numericInput)
`

export default {
    html: html,
    css: css,
    js: js
}