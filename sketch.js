let fourier;
let gameOfLife;
let path = [];
let time = 0;

let middleScreenX;
let middleScreenY;

let cols;
let rows;

const fullDrawingCycle = 2 * Math.PI;

function make2DArray() {
    let arr = new Array(cols).fill(0);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

const maxTimeInTransition = numberOfDrawingCycles * fullDrawingCycle;
const minTimeInTransition = fullDrawingCycle;

function drawGrid(colorIntensity = 1, time = maxTimeInTransition) {
    const normalizedTime = (time - minTimeInTransition)/ (maxTimeInTransition-minTimeInTransition);
    for(let i = 0; i < floor(cols * normalizedTime); i++) {
        for(let j = 0; j < floor(rows * normalizedTime); j++) {
            const x = i * gameOfLifeGridSize;
            const y = j * gameOfLifeGridSize;
            stroke(gridLineColor, gridLineOpacity*colorIntensity);
            if(gameOfLife[i][j] === 1) {
                fill(aliveCellColor);
                rect(x, y, gameOfLifeGridSize, gameOfLifeGridSize);
            }else{
                noFill();
                rect(x, y, gameOfLifeGridSize, gameOfLifeGridSize);
            }
        }
    }
}

function initializeGameOfLife() {
    const nameGridCols = nameGrid.length;
    const nameGridRows = nameGrid[0].length;
    const certeredStartingCol = floor((rows - nameGridCols) / 2);
    const certeredStartingRow = floor((cols - nameGridRows) / 2);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            const isInNameGridCols = j >= certeredStartingCol && j < certeredStartingCol + nameGridCols;
            const isInNameGridRows = i >= certeredStartingRow && i < certeredStartingRow + nameGridRows;
            const isJInMargin = j >= certeredStartingCol - marginToName && j < certeredStartingCol + nameGridCols + marginToName;
            const isIInMargin = i >= certeredStartingRow - marginToName && i < certeredStartingRow + nameGridRows + marginToName;
            if(isInNameGridCols && isInNameGridRows){
                gameOfLife[i][j] = nameGrid[j-certeredStartingCol][i-certeredStartingRow];
            } else if (isJInMargin && isIInMargin){
                gameOfLife[i][j] = 0;
            } else{
                gameOfLife[i][j] = Math.floor(random(2));
            }
        }
    }
}

function countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += gameOfLife[col][row];
        }
    }
    sum -= gameOfLife[x][y];
    return sum;
}

function startGameOfLife(){
    let next = make2DArray();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = gameOfLife[i][j];
            let neighbors = countNeighbors(i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }

        }
    }
    gameOfLife = next;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    middleScreenX = windowWidth / 2;
    middleScreenY = windowHeight / 2;

    const svgPathPoints = svgPathToPoints();
    fourier = discreteFourierTransform(svgPathPoints);

    cols = Math.ceil(windowWidth / gameOfLifeGridSize);
    rows = Math.ceil(windowHeight / gameOfLifeGridSize);
    gameOfLife = make2DArray(cols, rows);

    frameRate(frameRateValue)
}

let state = 'start';

// time = numberOfDrawingCycles * fullDrawingCycle;

function draw() {
    background(backgroundColor);

    if(state === 'gameOfLife') {
        drawGrid(4);
        time++;
        if(time > maxTimeInTransition + 20) {
            startGameOfLife();
        }
    }

    if(state === 'start' || state === 'transition') {
        let v = drawCircles(middleScreenX, middleScreenY, fourier);
        path.unshift(v);
        drawPath(path);

        const dt = 2 * Math.PI / fourier.length;
        time += dt;
    }

    if(time > fullDrawingCycle && time < numberOfDrawingCycles * fullDrawingCycle) {
        state = 'transition'
        drawGrid(1, time);
    }
    if(time > numberOfDrawingCycles * fullDrawingCycle && state === 'transition') {
        state = 'gameOfLife'
        path = [];
        initializeGameOfLife();
    }
}
