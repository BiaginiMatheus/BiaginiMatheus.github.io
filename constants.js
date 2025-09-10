const lineColor = 255;
const circleColor = 255;
const pathColor = 'cyan';
const backgroundColor = 42;

const lineOpacity = 200;
const circleOpacity = 100;

const dotRadius = 2;

const frameRateValue = 20;

const numberOfDrawingCycles = 2;

const svgSizeDivider = 2;

const gameOfLifeGridSize = 20;
const gridLineColor = 255;
const gridLineOpacity = 25;
const aliveCellColor = 255;

const marginToName = 3;

const fullDrawingCycle = 2 * Math.PI;
const maxTimeInTransition = numberOfDrawingCycles * fullDrawingCycle;
const minTimeInTransition = fullDrawingCycle;

const delayBeforeStartingGameOfLife = 30;

const nameGrid = [[1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,0,1,0,0,1,1,1,1,0,0,1,1,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,1,1,1,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,0,0,1,0,1],
    [1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
    [1,0,0,0,1,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1],
    [1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0]];
