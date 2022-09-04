/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('#grid-slider-value');
const divGrid = document.querySelector('.div-grid');
const sketchDiv = document.querySelector('.sketch-div');

//sketchDiv.addEventListener('click', changeSketchDiv())

gridSlider.textContent = gridSlider.value;
gridSliderValue.append(gridSlider.textContent);

//Function neccesary to fill grid with divs for sketching
gridSlider.oninput = function() {

    gridSliderValue.textContent = this.value;
    gridSliderSize = parseInt(this.value);

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

//Function to toggle transformed color/state of sketch divs
function changeSketchDiv(divName = sketchDiv) {

    const elements = document.querySelectorAll(divName);
    for (const element of elements) {

        element.classList.toggle('sketch-div-transformed');
    }
}