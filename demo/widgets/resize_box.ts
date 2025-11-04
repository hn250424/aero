const html = 
`<div class="resizer-container" style="display: flex; justify-content: end; align-items: end;">
    <aero-resize-box resize-top resize-left resizer-color="green">
        <div style="background-color: red; width: 10px; height: 10px;"></div>
        <div style="background-color: burlywood; width: 10px; height: 10px;"></div>
    </aero-resize-box>
</div>
<div id="rc" class="resizer-container" style="display: flex; justify-content: start; align-items: start;">
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
`const resizeBox = document.createElement('aero-resize-box')
resizeBox.addRightResizer()
resizeBox.addBottomResizer()
resizeBox.resizerColor = 'green'

const red = document.createElement('div')
red.style.backgroundColor = 'red'
red.style.width = '10px'
red.style.height = '10px'

const brown = document.createElement('div')
brown.style.backgroundColor = 'burlywood'
brown.style.width = '10px'
brown.style.height = '10px'

resizeBox.append(red, brown)

const rc = document.getElementById('rc')
rc.appendChild(resizeBox)`

export default {
    html: html,
    css: css,
    js: js
}