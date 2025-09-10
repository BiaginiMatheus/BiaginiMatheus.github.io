function setup() {
    createCanvas(windowWidth, windowHeight);
}

let time = 0; //time is theta (angle)
let wave = [];

const circleBaseRadius = 150;
const dotRadius = 2;
const numberOfCircles = 50;

function draw() {
    background(42);
    translate(width / 2, height / 2);

    let x = 0;
    let y= 0;
    for (let i = 0; i < numberOfCircles; i++) {
        let previousX = x;
        let previousY = y;
        let n = i * 2 + 1; //n is the number of circles
        let radius = circleBaseRadius * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255, 100);
        noFill();
        circle(previousX, previousY, radius * 2);

        fill(255);
        stroke(255);
        line(previousX, previousY, x, y);
        circle(x, y, dotRadius);

    }
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);
    wave.unshift(y);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);
    }
    endShape();
    time += 0.02;
    if (wave.length > width / 2 - 200) {
        wave.pop();
    }
}
