

export const adjustGrid = (positions, numCols, numRows) => {

    let new_set = new Set()
    let dead_cells = new Set()

    for (let position of positions) {
        let pair = position.split(",")
        let row = parseInt(pair[0])
        let col = parseInt(pair[1])

        let all_neighbors = getNeighbors(row, col, numCols, numRows)

        let count = 0;

        for (let neighbor of all_neighbors) {
            if (positions.has(neighbor)) {
                count += 1;
            } else {
                dead_cells.add(neighbor)
            }
        }

        if (count == 2 || count == 3) {
            new_set.add(position)
        }

    }

    for (let cell of dead_cells) {
        let dead_pair = cell.split(",")
        let dead_row = parseInt(dead_pair[0])
        let dead_col = parseInt(dead_pair[1])

        let all_neighbors_dead = getNeighbors(dead_row, dead_col, numCols, numRows)

        let count_dead = 0;

        if (cell === '2,1') {
            console.log(cell)
            console.log(all_neighbors_dead)
        }

        for (const neighbor of all_neighbors_dead) {
            if (positions.has(neighbor)) {
                count_dead += 1;
            }

        }
        if (count_dead === 3) {
            new_set.add(cell)
        }
    }
    return new_set

}

export const getNeighbors = (row, col, maxCol, maxRow) => {
    let neighbors = new Set()
    row = parseInt(row)
    col = parseInt(col)
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let new_col = col + j;
            let new_row = row + i
            if (new_row === row && new_col === col) {
                continue
            }

            0 <= new_col && new_col < maxCol && 0 <= new_row && new_row < maxRow ? neighbors.add(`${new_row},${new_col}`) : "";
        }
    }
    return neighbors
}




