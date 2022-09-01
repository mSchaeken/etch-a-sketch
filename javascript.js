/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('#grid-slider-value')
gridSlider.textContent = gridSlider.value;
gridSliderValue.append(gridSlider.textContent);

gridSlider.oninput = function() {
    gridSliderValue.textContent = this.value;
}




//Created element and for loop in order to fill on-screen grid with divs
const divGrid = document.createElement('div');

for (i = 0; i < gridSliderValue.textContent; i++) {

}
