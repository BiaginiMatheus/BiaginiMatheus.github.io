let fourier;
let gameOfLife;
let path = [];
let time = 0;

let middleScreenX;
let middleScreenY;

let cols;
let rows;

let state;

function setup() {
    createCanvas(windowWidth, windowHeight);

    state = 'start';

    middleScreenX = windowWidth / 2;
    middleScreenY = windowHeight / 2;

    const svgPathPoints = svgPathToPoints();
    fourier = discreteFourierTransform(svgPathPoints);

    cols = Math.ceil(windowWidth / gameOfLifeGridSize);
    rows = Math.ceil(windowHeight / gameOfLifeGridSize);
    gameOfLife = make2DArray(cols, rows);

    frameRate(frameRateValue)
}

function draw() {
    background(backgroundColor);

    if(state === 'start' || state === 'transition') {
        let v = drawCircles(middleScreenX, middleScreenY, fourier);
        path.unshift(v);
        drawPath(path);

        const dt = 2 * Math.PI / fourier.length;
        time += dt;
    }

    if(time > fullDrawingCycle && time < numberOfDrawingCycles * fullDrawingCycle) {
        state = 'transition'
        drawGrid(gameOfLife, 1, time);
    }
    if(time > numberOfDrawingCycles * fullDrawingCycle && state === 'transition') {
        state = 'gameOfLife'
        path = [];
        gameOfLife = initializeGameOfLife(gameOfLife);
    }

    if(state === 'gameOfLife') {
        drawGrid(gameOfLife,4);
        time++;
        if(time > maxTimeInTransition + delayBeforeStartingGameOfLife) {
            gameOfLife = playGameOfLife(gameOfLife);
        }
    }
}
