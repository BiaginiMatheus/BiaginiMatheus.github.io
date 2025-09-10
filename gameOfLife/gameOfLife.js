function initializeGameOfLife(grid) {
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
                grid[i][j] = nameGrid[j-certeredStartingCol][i-certeredStartingRow];
            } else if (isJInMargin && isIInMargin){
                grid[i][j] = 0;
            } else{
                grid[i][j] = Math.floor(random(2));
            }
        }
    }
    return grid;
}

function playGameOfLife(grid){
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(i, j, grid);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }

        }
    }
    return next;
}

function countNeighbors(x, y, grid) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}


function drawGrid(grid, colorIntensity = 1, time = maxTimeInTransition) {
    const normalizedTime = (time - minTimeInTransition)/ (maxTimeInTransition-minTimeInTransition);
    for(let i = 0; i < floor(cols * normalizedTime); i++) {
        for(let j = 0; j < floor(rows * normalizedTime); j++) {
            const x = i * gameOfLifeGridSize;
            const y = j * gameOfLifeGridSize;
            stroke(gridLineColor, gridLineOpacity*colorIntensity);
            if(grid[i][j] === 1) {
                fill(aliveCellColor);
                rect(x, y, gameOfLifeGridSize, gameOfLifeGridSize);
            }else{
                noFill();
                rect(x, y, gameOfLifeGridSize, gameOfLifeGridSize);
            }
        }
    }
}
