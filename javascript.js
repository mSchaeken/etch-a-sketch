/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('#grid-slider-value');
const divGrid = document.querySelector('.div-grid');


gridSlider.textContent = gridSlider.value;
gridSliderValue.append(gridSlider.textContent);

gridSlider.oninput = function() {

    gridSliderValue.textContent = this.value;

    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild)
    }
    
    for (i = 0; i < gridSliderValue.textContent; i++) {
    
        const divToAdd = document.createElement('div');
        divToAdd.className = 'sketch-div';
        divToAdd.id = 'sketch-div-' + i;
    
        divGrid.append(divToAdd)
    }
}
