/* DOM */

//QuerySelectors and listeners in order to dynamically update grid based on slider value
const divGrid = document.querySelector('.div-grid');

let sketchDivs = document.querySelectorAll('.sketch-div')
let gridSliderText = document.querySelector('#grid-slider-text');
let gridSlider = document.querySelector('#grid-slider');
let gridSliderValue = document.getElementById('grid-slider').value;

let mouseDown = true
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

gridSliderText.textContent = gridSliderValue;

window.onload = createSketchDivs()
window.onload = attachSketchListener()

gridSlider.addEventListener('input', () => {
     updateRangeSlider();
});

gridSlider.addEventListener('change', () => {
    createSketchDivs();
});

// gridSlider.addEventListener('change', () => {
//     sketchDivs = document.querySelectorAll('.sketch-div');
    
//     sketchDivs.forEach((div) => {
//         div.addEventListener('mousedown', () => {
//                 div.className = 'sketch-div-transformed'
//         });
//     });
// });

gridSlider.addEventListener('change', () => {
    sketchDivs = document.querySelectorAll('.sketch-div');
    
    sketchDivs.forEach((div) => {
        div.addEventListener('mouseover', () => {
                if mouseDown
        });
    });
});

// sketchDivs.forEach((div) => {
//     div.addEventListener('mousedown', () => {
//         div.className = 'sketch-div-transformed'
//     });
// });

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

    clearGrid()
    
    for (i = 0; i < (gridSliderSize * gridSliderSize); i++) {
    
        const divToAdd = document.createElement('div');
        divToAdd.className = 'sketch-div';
        divToAdd.addEventListener('mouseover', changeClass)
        divToAdd.addEventListener('mousedown', changeClass)

        divGrid.append(divToAdd);
    }
}

//Function to attach listeners to every created sketch div
function attachSketchListener() {
    sketchDivs.forEach((div) => {
        div.addEventListener('mousedown', () => {
            div.className = 'sketch-div-transformed'
        });
    });
}

function clearGrid() {
    while (divGrid.hasChildNodes()) {
        divGrid.removeChild(divGrid.firstChild);
    }
}