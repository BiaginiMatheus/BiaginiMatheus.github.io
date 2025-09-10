let fourierY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    const pathPoints = svgPathToPoints();
    const signalY = pathPoints.map(p => p.y);
    fourierY = new discreteFourierTransform(signalY);
}

//time is theta (angle)
let time = 0;
let wave = [];

const circleBaseRadius = 150;
const dotRadius = 2;
const numberOfCircles = 5;
const backgroundColor = 42;
const waveDrawingOffset = circleBaseRadius + 100;
const whiteColor = 255;

function draw() {
    const middleScreenX = windowWidth / 2;
    const middleScreenY = windowHeight / 2;

    background(backgroundColor);
    translate(middleScreenX, middleScreenY);

    let x = 0;
    let y= 0;
    for (let i = 0; i < fourierY.length; i++) {
        // Save the previous position
        let previousX = x;
        let previousY = y;

        let freq = fourierY[i].freq;
        let radius =  fourierY[i].amp;
        let phase = fourierY[i].phase;
        x += radius * Math.cos(freq * time + phase + Math.PI / 2);
        y += radius * Math.sin(freq * time + phase + Math.PI / 2);

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
    // Add the y value of the last circle to the wave array
    wave.unshift(y);

    // Line from the last circle to the wave
    translate(waveDrawingOffset, 0);
    line(x - waveDrawingOffset, y, 0, wave[0]);

    // Draw the wave
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();

    const dt = 2 * Math.PI / fourierY.length;
    time += dt;

    // Limit the length of the wave array
    if (wave.length > middleScreenX - waveDrawingOffset) {
        wave.pop();
    }
}
