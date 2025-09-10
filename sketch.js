function setup() {
    createCanvas(windowWidth, windowHeight);
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
    for (let i = 0; i < numberOfCircles; i++) {
        // Save the previous position
        let previousX = x;
        let previousY = y;

        // n is the harmonic number (1, 3, 5, 7, ...)
        let n = i * 2 + 1;
        let radius = circleBaseRadius * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

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

    // Increment time/angle for rotation
    time += 0.02;

    // Limit the length of the wave array
    if (wave.length > middleScreenX - waveDrawingOffset) {
        wave.pop();
    }
}
