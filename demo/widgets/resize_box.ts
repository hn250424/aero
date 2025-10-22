const html = 
`<div class="resizer-container" style="display: flex; justify-content: end; align-items: end;">
    <aero-resize-box resize-top resize-left resizer-color="green">
        <div style="background-color: red; width: 10px; height: 10px;"></div>
        <div style="background-color: burlywood; width: 10px; height: 10px;"></div>
    </aero-resize-box>
</div>`

const css =
`.resizer-container {
    width: 400px;
    height: 100px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
}

aero-resize-box {
    display: flex;
    justify-content: center;

    width: 300px;
    height: 50px;
    border: 1px solid #ccc;
}`

const js =
`const resizeBox = new aero.AeroResizeBox({ bottom: true })
resizeBox.setResizerColor('green')
document.body.appendChild(resizeBox)`

export default {
    html: html,
    css: css,
    js: js
}