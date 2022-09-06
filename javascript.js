/* DOM */
const divGrid = document.querySelector('.div-grid');

let sketchDiv = document.querySelector('.sketch-div');
let gridSliderText = document.querySelector('#grid-slider-text');
let gridSlider = document.querySelector('#grid-slider');
let clearBtn = document.querySelector('button.clear');

let mouseButtonDown = false;
document.body.onmousedown = () => (mouseButtonDown = true);
document.body.onmouseup = () => (mouseButtonDown = false);

clearBtn.addEventListener('click', resetColor);
gridSlider.addEventListener('input', setSliderText);
gridSlider.addEventListener('change', () => {
    createSketchDivs();
});

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
        divToAdd.addEventListener('mouseover', changeColor);
        divToAdd.addEventListener('mousedown', changeColor);
        divGrid.append(divToAdd);
    };
};

function changeColor(e) {
    if (e.type === 'mouseover' && mouseButtonDown !== true) {return};

        e.target.style.backgroundColor = '#FF1053';
    };

function resetColor() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    sketchDivs.forEach(element => {
        element.style.backgroundColor = '#FFFFFF';
    });
    mouseDown = false;
};

function addGridLines() {
    const sketchDivs = document.querySelectorAll('.sketch-div');
    sketchDivs.forEach(element => {
        element.style.border = 'dashed';
        element.style.borderSize = '0.05em';
    });
};

function clearGrid() {
    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild);
    };
};

function setSliderText() {
    gridSliderText.textContent = `${gridSlider.value} x ${gridSlider.value}`;
};

window.onload = createSketchDivs()