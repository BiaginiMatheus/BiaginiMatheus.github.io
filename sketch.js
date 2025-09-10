let fourier;
const frameRateValue = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    const pathPoints = svgPathToPoints();

    fourier = discreteFourierTransform(pathPoints);
    console.log('fourierX', fourier);

    frameRate(frameRateValue)
}

//time is theta (angle)
let time = 0;
let path = [];

const dotRadius = 2;
const backgroundColor = 42;
const whiteColor = 255;
const numberOfCycles = 2;

function drawEpiCycles(x, y, rotation, fourier) {
    for (let i = 1; i < fourier.length; i++) {
        // Save the previous position
        let previousX = x;
        let previousY = y;

        let freq = fourier[i].freq;
        let radius =  fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * Math.cos(freq * time + phase + rotation);
        y += radius * Math.sin(freq * time + phase + rotation);

        // Draw the circles
        stroke(whiteColor, 100);
        noFill();
        circle(previousX, previousY, radius * 2);

        // Draw the radius line from the center of the circle
        // to the center of the next circle
        stroke(whiteColor);
        line(previousX, previousY, x, y);
        circle(x, y, dotRadius);
    }
    return createVector(x, y);
}
function draw() {
    const middleScreenX = windowWidth / 2;
    const middleScreenY = windowHeight / 2;

    background(backgroundColor);

    let v = drawEpiCycles(middleScreenX, middleScreenY, 0, fourier);
    path.unshift(v);

    // Line from the last circle to the wave
    // line(middleScreenX, middleScreenY, v.x, v.y);

    // Draw the wave
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = 2 * Math.PI / fourier.length;
    time += dt;

    if(time > numberOfCycles * 2 * Math.PI) {
        time = 0;
        path = [];
    }
}
