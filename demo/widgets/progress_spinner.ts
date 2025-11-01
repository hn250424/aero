const html = 
`<div class="wrapper">
    <aero-progress-spinner container-background="#424242"
        spinner-background="black" spinner-color="red"></aero-progress-spinner>
</div>`

const css =
`.wrapper {
    position: relative;
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
}

aero-progress-spinner {
    
}`

const js =
`const div = document.createElement('div')
div.classList.add('wrapper')

const spinner = document.createElement('aero-progress-spinner')
spinner.containerBackground = '#dce1f5'
spinner.spinnerBackground = 'white'
spinner.spinnerColor = 'blue'
div.appendChild(spinner)

document.body.appendChild(div)`

export default {
    html: html,
    css: css,
    js: js
}