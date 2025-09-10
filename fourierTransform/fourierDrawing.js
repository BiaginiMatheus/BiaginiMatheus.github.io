function drawCircles(x, y, fourier) {
    for (let i = 1; i < fourier.length; i++) {
        let previousX = x;
        let previousY = y;

        let freq = fourier[i].freq;
        let radius =  fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * Math.cos(freq * time + phase);
        y += radius * Math.sin(freq * time + phase);

        stroke(circleColor, circleOpacity);
        noFill();
        circle(previousX, previousY, radius * 2);

        stroke(lineColor, lineOpacity);
        line(previousX, previousY, x, y);
        circle(x, y, dotRadius);
    }
    return createVector(x, y);
}

function drawPath(path) {
    stroke(pathColor);
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();
}
