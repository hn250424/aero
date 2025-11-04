const html = 
`<div class="wrapper" style="background-color: #424242;">
    <aero-progress-spinner width="60" height="60" 
        cycle="2" background="black" color="red"></aero-progress-spinner>
</div>`

const css =
`.wrapper {
    width: 300px;
    height: 200px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 10px;
}

aero-progress-spinner {
    
}`

const js =
`const div = document.createElement('div')
div.classList.add('wrapper')
div.style.background = '#dce1f5'

const spinner = document.createElement('aero-progress-spinner')
spinner.width = '60'
spinner.height = '60'
spinner.background = 'white'
spinner.color = 'blue'
spinner.cycle = '2'
div.appendChild(spinner)

document.body.appendChild(div)`

export default {
    html: html,
    css: css,
    js: js
}