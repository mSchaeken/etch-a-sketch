/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const divGrid = document.querySelector('.div-grid');
const sketchDiv = document.querySelector('.sketch-div');

let gridSliderText = document.querySelector('#grid-slider-text');
let gridSlider = document.querySelector('#grid-slider');
let gridSliderValue = document.getElementById('grid-slider').value;

gridSliderText.textContent = gridSliderValue

gridSlider.addEventListener('input', () => {
     updateRangeSlider();
});

gridSlider.addEventListener('change', () => {
    createSketchDivs()
});

function updateRangeSlider(sliderValue=parseInt(gridSlider.value)) {
    gridSliderText.textContent = gridSlider.value;
}

function createSketchDivs(divAmount=32) {

    let gridSliderSize = parseInt(gridSlider.value);

    document.getElementById('div-grid').style.gridTemplateColumns = `repeat(${gridSliderSize}, 1fr)`;
    document.getElementById('div-grid').style.gridTemplateRows = `repeat(${gridSliderSize}, 1fr)`;

    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild);
    }
    
    for (i = 0; i < (gridSliderSize * gridSliderSize); i++) {
    
        const divToAdd = document.createElement('div');
        divToAdd.className = 'sketch-div';
        divToAdd.id = 'sketch-div-' + i;

        divGrid.append(divToAdd);
    }
}
