import * as aero from '../src'
const dynamicContainer = document.getElementById('dynamic-container')



const numericInput = new aero.NumericInput()
dynamicContainer?.appendChild(numericInput)

numericInput.style.height = '10px'
numericInput.step = 2
setTimeout(() => {
    numericInput.step = 0.2
}, 10000)

const resizeBox = new aero.ResizeBox()
dynamicContainer?.appendChild(resizeBox)

setTimeout(() => {
    resizeBox.minWidth = 40
}, 3000)