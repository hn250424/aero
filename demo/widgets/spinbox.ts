const html = 
`<aero-spinbox min="0.4" max="100" step="0.46" value="1"
    text-minus="-" text-plus="+" button-backgroundcolor="#ccc">
</aero-spinbox>`

const css =
`aero-spinbox {
    margin-bottom: 5px;
}`

const js =
`const spinbox = new aero.AeroSpinbox()
spinbox.setButtonBackgroundcolor('#ccc')
spinbox.value = 1
spinbox.step = 0.46
document.body.appendChild(spinbox)
`

export default {
    html: html,
    css: css,
    js: js
}