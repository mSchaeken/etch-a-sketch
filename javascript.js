/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('#grid-slider-value');
const divGrid = document.querySelector('.div-grid');
const sketchDiv = document.querySelector('.sketch-div');



function createSketchDivs(divAmount=32) {

    gridSliderValue.textContent = divAmount;
    gridSliderSize = parseInt(divAmount);

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

gridSlider.addEventListener('input', createSketchDivs(gridSlider.value))