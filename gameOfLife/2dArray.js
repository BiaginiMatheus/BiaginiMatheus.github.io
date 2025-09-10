function make2DArray(cols, rows) {
    let arr = new Array(cols).fill(0);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}
