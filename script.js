const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
const winCombinations =[[0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
[0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
[0, 4, 8], [2, 4, 6] //Diagonals 
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true});
});

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)){
        alert('${currentPlayer} wins!');
        resetGame();
    } else if(isDraw()){
        alert('Draw!');
        resetGame();
    } else {
        swapTurns();
    }
}

function placeMark(cell, player) {
    cell.textContent = player;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return winCombinations.some(combination =>{
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw(){
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once:true});
    });
    currentPlayer = 'X';
}