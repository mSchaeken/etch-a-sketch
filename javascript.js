/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const divGrid = document.querySelector('.div-grid');

let gridSliderText = document.querySelector('#grid-slider-text');
let gridSlider = document.querySelector('#grid-slider');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

gridSlider.addEventListener('input', updateRangeSlider);
gridSlider.addEventListener('change', () => {
    createSketchDivs();
});

/* FUNCTIONS */

//Function to update grid slider textcontent
function updateRangeSlider(sliderValue=gridSlider.value) {
    gridSliderText.textContent = gridSlider.value;
}

//Function to fill the grid container with sketching divs
function createSketchDivs(divAmount=gridSlider.value) {

    let gridSliderSize = parseInt(divAmount);
    document.getElementById('div-grid').style.gridTemplateColumns = `repeat(${gridSliderSize}, 1fr)`;
    document.getElementById('div-grid').style.gridTemplateRows = `repeat(${gridSliderSize}, 1fr)`;

    setSliderText()
    clearGrid()
    
    for (i = 0; i < (gridSliderSize * gridSliderSize); i++) {
    
        const divToAdd = document.createElement('div');

        divToAdd.className = 'sketch-div';
        divToAdd.addEventListener('mouseover', changeColor);
        divToAdd.addEventListener('mousedown', changeColor);
        divGrid.append(divToAdd);
    }
}

function changeColor(e) {
    if (mouseDown === true) {
        e.target.style.backgroundColor = '#FF1053'
    }
}

function clearGrid() {
    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild);
    }
}

function setSliderText() {
    gridSliderText.textContent = gridSlider.value
}

window.onload = createSketchDivs()