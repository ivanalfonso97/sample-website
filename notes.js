const colorSchemeArr = [
    "monochrome", 
    "monochrome-dark", 
    "monochrome-light", 
    "analogic", 
    "complement", 
    "analogic-complement", 
    "triad",
    "quad"
]

let colorArr = []

let colorSchemeHtml = ""
colorSchemeArr.map(colorScheme => {
    colorSchemeHtml += `
    <option value="${colorScheme}">${colorScheme}</option>`
})
document.getElementById("color-scheme").innerHTML = colorSchemeHtml

document.getElementById("color-selector").addEventListener("submit", event => {
    event.preventDefault()
    const chosenColor = document.getElementById("color-picker").value.slice(1)
    const chosenScheme = document.getElementById("color-scheme").value
    generateColors(chosenColor, chosenScheme)
    // renderColors()
})

function generateColors(color, scheme) {
    colorArr = []
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`)
        .then(res => res.json())
        .then(data => data.colors.map(color => {
            colorArr.push(color.hex.value)
            renderColors()
        }))
        
}

function renderColors() {
    console.log(colorArr)
    let colorDisplayHtml = ""
    colorArr.map(color => {
        colorDisplayHtml += `
            <div id="${color}" class="color">
                <div class="color-display-hex">${color}</div>
            </div>`
    })
    document.getElementById("color-display").innerHTML = colorDisplayHtml

    colorArr.map(color => {
        document.getElementById(color).style.background = color
    })
}