let fourierX;
let fourierY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    const pathPoints = svgPathToPoints();
    const signalX = pathPoints.map(p => p.x);
    const signalY = pathPoints.map(p => p.y);
    // Circle signal
    // const signalX = [];
    // const signalY = [];
    // for(let i = 0; i < 100; i++) {
    //     const angle = map(i, 0, 100, 0, TWO_PI);
    //     signalX[i] = 100 * Math.cos(angle);
    //     signalY[i] = 100 * Math.sin(angle);
    // }
    fourierX = discreteFourierTransform(signalX);
    fourierY = discreteFourierTransform(signalY);

    // Sort circles by amplitude
    fourierX.sort((a, b) => b.amp - a.amp)
    fourierY.sort((a, b) => b.amp - a.amp);
    frameRate(20)
}

//time is theta (angle)
let time = 0;
let path = [];

const circleBaseRadius = 150;
const dotRadius = 2;
const numberOfCircles = 5;
const backgroundColor = 42;
const waveDrawingOffset = circleBaseRadius + 100;
const whiteColor = 255;

function drawEpiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length; i++) {
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

    let vx = drawEpiCycles(middleScreenX, 100, 0, fourierX);
    let vy = drawEpiCycles(100, middleScreenY, Math.PI/2, fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v);

    // Line from the last circle to the wave
    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);

    // Draw the wave
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = 2 * Math.PI / fourierY.length;
    time += dt;

    if(time > 2 * Math.PI) {
        time = 0;
        path = [];
    }
}
