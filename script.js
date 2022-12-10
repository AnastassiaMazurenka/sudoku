let root = document.querySelector('.wrapper');
let table = document.createElement('table');

const chooser = document.createElement('div')
chooser.classList.add('chooser')

let turnElement = document.createElement('div')
turnElement.classList.add('turn')
const listener = (event) => {
    const target = event.target;
    const column = target.cellIndex;
    const row = target.closest('tr').rowIndex;
    console.log(target)
    const valid = getValidDigits(row,column)

    let exist = document.querySelector('.chooser');
    if (exist) exist.parentElement.removeChild(exist);
    exist = chooser.cloneNode();
    for (let turn of valid) {
        let t = turnElement.cloneNode();
        t.textContent = turn;
        if (turn == "X") turn = ''
        t.addEventListener('click', () => {
            cells[row][column].textContent = turn;
            exist.parentElement.removeChild(exist);
        })

        exist.appendChild(t)
    }
    console.log(exist)
    root.appendChild(exist)
}
let row = document.createElement('tr');
let cell = document.createElement('td');
cell.classList.add('cell')

for (let i = 0; i < 9; i++) {
    let tr = row.cloneNode();
    for (let j = 0; j < 9; j++) {
        let td = cell.cloneNode(true)
    td.addEventListener('click', listener)
    tr.appendChild(td)
    }
    table.appendChild(tr)
}

root.appendChild(table)

const cells = Array.from(table.rows).map(row => [...Array.from(row.cells)])

function getValidDigits(row,column) {
    const valid = [];
    const rowDigits = new Set(cells[row].map(cell => Number(cell.textContent)))
    const columnA = new Set(Array.from(table.rows).map(row => Number(row.cells[column].textContent)))
    let rStart = Math.floor(row / 3) * 3;
    let cStart = Math.floor(column / 3) * 3;
    let square = [];
    for (let r = rStart; r < rStart + 3; r++) {
        for (let c = cStart; c < cStart + 3; c++) {
            square.push(Number(cells[r][c].textContent))
        }
    }
    square = new Set(square);
    for (digit = 1; digit <= 9; digit++) {

        if (rowDigits.has(digit) || columnA.has(digit) || square.has(digit)) continue;
        valid.push(digit)
    }
    valid.push('X')
    return valid
}
