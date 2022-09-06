/* DOM */
const colorInput = document.createElement('input')
      colorInput.type = 'color';
      colorInput.className = 'color';

const divGrid = document.querySelector('.div-grid');
const gridSliderText = document.querySelector('#grid-slider-text');
const gridSlider = document.querySelector('#grid-slider');
const clearBtn = document.querySelector('button.clear');
const colorBtn = document.querySelector('button.color')
const toggleBtn = document.querySelector('button.toggle-grid-lines');

let gridToggle = false;
let mouseButtonDown = false;
let sketchColor = '#FF1053';

document.body.onmousedown = () => (mouseButtonDown = true);
document.body.onmouseup = () => (mouseButtonDown = false);

clearBtn.addEventListener('click', resetColor);
toggleBtn.addEventListener('click', addGridLines);
colorBtn.addEventListener('click', chooseColor);
colorInput.addEventListener('input', updateColorButton);
gridSlider.addEventListener('input', setSliderText);
gridSlider.addEventListener('change', () => {createSketchDivs()});

/* FUNCTIONS */

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
        divToAdd.addEventListener('mouseover', sketch);
        divToAdd.addEventListener('mousedown', sketch);
        divGrid.append(divToAdd);
    };
};

function sketch(e) {
    if (e.type === 'mouseover' && mouseButtonDown !== true) {return};
        e.target.style.backgroundColor = sketchColor;
    };

function chooseColor() {
    colorInput.click();
}

function updateColorButton() {
    colorBtn.style.backgroundColor = colorInput.value;
    sketchColor = colorInput.value;
}

function resetColor() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    sketchDivs.forEach(element => {
        element.style.backgroundColor = '#FFFFFF';
    });
    mouseDown = false;
};

function addGridLines() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    if (gridToggle === false) {
        sketchDivs.forEach(element => {
            element.style.border = 'dotted';
            element.style.borderWidth = '0.05em';
        });
        gridToggle = true;
    }

    else {
        sketchDivs.forEach(element => {
            element.style.border = 'none';
        });
        gridToggle = false;
    };
};

function clearGrid() {
    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild);
    };
};

function setSliderText() {
    gridSliderText.textContent = `${gridSlider.value} x ${gridSlider.value}`;
};

window.onload = createSketchDivs();