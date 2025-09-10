let fourier;
let path = [];
let time = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    const pathPoints = svgPathToPoints();
    fourier = discreteFourierTransform(pathPoints);

    frameRate(frameRateValue)
}

function draw() {
    background(backgroundColor);

    const middleScreenX = windowWidth / 2;
    const middleScreenY = windowHeight / 2;

    let v = drawCircles(middleScreenX, middleScreenY, fourier);
    path.unshift(v);
    drawPath(path);

    const dt = 2 * Math.PI / fourier.length;
    time += dt;

    if(time > numberOfDrawingCycles * 2 * Math.PI) {
        time = 0;
        path = [];
    }
}
