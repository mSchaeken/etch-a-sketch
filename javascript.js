/* DOM */

const colorInput = document.createElement('input')
      colorInput.type = 'color';
      colorInput.className = 'color';
      colorInput.value = '#FF1053'

const pageHeader = document.querySelector('h1');
const divGrid = document.querySelector('.div-grid');
const gridSliderText = document.querySelector('#grid-slider-text');
const gridSlider = document.querySelector('#grid-slider');
const eraserBtn = document.querySelector('button.eraser');
const clearBtn = document.querySelector('button.clear');
const colorBtn = document.querySelector('button.color')
const toggleGridBtn = document.querySelector('button.toggle-grid-lines');
const rainbowBtn = document.querySelector('button.rainbow');
const brightnessBtn = document.querySelector('button.brightness');

let gridToggle = false;
let rainbowToggle = false;
let brightnessToggle = false;
let eraserToggle = false;
let mouseButtonDown = false;
let sketchColor = '#FF1053';

document.body.onmousedown = () => (mouseButtonDown = true);
document.body.onmouseup = () => (mouseButtonDown = false);

eraserBtn.addEventListener('click', toggleEraser)
clearBtn.addEventListener('click', resetColor);
toggleGridBtn.addEventListener('click', addGridLines);
colorBtn.addEventListener('click', chooseColor);
colorInput.addEventListener('input', chooseColor);
rainbowBtn.addEventListener('click', toggleRainbow);
brightnessBtn.addEventListener('click', toggleBrightness);
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
        divToAdd.style.filter = 'brightness(100%)';
        divToAdd.addEventListener('mouseover', sketch);
        divToAdd.addEventListener('mousedown', sketch);
        divGrid.append(divToAdd);
    };

    //Make sure gridlines stay toggled on after creating a new sketching grid
    if (gridToggle === true) {
        gridToggle = false;
        addGridLines();
    };

    //Make sure rainbow mode stays toggled on after creating a new sketching grid
    if (rainbowToggle === true) {
        rainbowToggle = false;
        toggleRainbow();
    };

    //Make sure brightness mode stays toggled on after creating a new sketching grid
    if (brightnessToggle === true) {
        brightnessToggle = false;
        toggleBrightness();
    };
};

function sketch(e) {

    if (e.type === 'mouseover' && mouseButtonDown !== true) {
        return
    }
    else {
        e.target.style.backgroundColor = sketchColor;
    }  
};


function chooseColor() {
    colorInput.click();
    colorBtn.style.backgroundColor = colorInput.value;
    pageHeader.style.borderColor = colorInput.value;
    sketchColor = colorInput.value;
};

function randomColor() {
    sketchColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

function resetColor() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    sketchDivs.forEach(element => {
        element.style.backgroundColor = '#FFFFFF';
        element.style.filter = 'brightness(100%)';
    });
    mouseDown = false;
};

function toggleEraser() {
    if (eraserToggle === false) {
        sketchColor = '#FFFFFF';
        eraserBtn.style.backgroundColor = '#000000'
        eraserToggle = true;
    }

    else {
        sketchColor = colorInput.value;
        eraserBtn.style.backgroundColor = '#4d5e66'
        eraserToggle = false
    };

};

function addGridLines() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    //Add lines if mode was toggled off when function is called
    if (gridToggle === false) {
        sketchDivs.forEach(element => {
            element.style.border = 'dotted';
            element.style.borderWidth = '0.05em';
        });
        toggleGridBtn.style.backgroundColor = '#000000'
        gridToggle = true;
    }

    //Remove lines if mode was toggled on when function is called
    else {
        sketchDivs.forEach(element => {
            element.style.border = null;
        });
        toggleGridBtn.style.backgroundColor = '#4d5e66'
        gridToggle = false;
    };
};

function toggleRainbow() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    //Remove rainbow listener when mode is toggled on when function is called
    if (rainbowToggle === true ) {
        sketchDivs.forEach(element => {
            element.removeEventListener('mouseout', randomColor)
        })
        
        rainbowBtn.style.backgroundImage = null;
        sketchColor = colorInput.value;
        rainbowToggle = false;
    }
    
    //Add rainbow listener if mode is toggled off when function is called
    else {
        sketchDivs.forEach(element => {
            element.addEventListener('mouseout', randomColor)
        })

        rainbowBtn.style.backgroundImage = 'linear-gradient(to right, red, orange, green, blue, indigo, violet)';
        rainbowToggle = true;
    }
}

function toggleBrightness() {
    const sketchDivs = document.querySelectorAll('.sketch-div');

    if (brightnessToggle === false ) {
        
        sketchDivs.forEach(element => {
        element.addEventListener('mouseenter', changeBrightness);
        element.addEventListener('mousedown', changeBrightness);
        })
        brightnessBtn.style.backgroundColor = '#000000'
        brightnessToggle = true;
    }

    else {
        brightnessBtn.style.backgroundColor = '#4d5e66'
        sketchDivs.forEach(element => {
            element.removeEventListener('mouseenter', changeBrightness);
            element.removeEventListener('mousedown', changeBrightness);
        })
        brightnessToggle = false;
    };
};

function changeBrightness(e) {
    if (e.type === 'mouseenter' && mouseButtonDown !== true) {
        return
    }

    else {
    let brightness = this.style.filter;
    let brightnessValue = undefined;
    let newBrightnessValue = undefined;

    brightnessValue = parseInt(brightness.slice(11, 14));
    newBrightnessValue = brightnessValue - 10;
    this.style.filter = `brightness(${newBrightnessValue}%)`;
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