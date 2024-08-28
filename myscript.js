const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset-btn');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningAnimation = document.getElementById('winning-animation');
const winnerName = document.getElementById('winner-name');

let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, cellIndex);
    checkResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = boardState[winCondition[0]];
        const b = boardState[winCondition[1]];
        const c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {      
        gameActive = false;        
        console.log(`Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`); // Debugging
        showWinningAnimation(currentPlayer === 'X' ? 'O' : 'X');
        return;
    }

    if (!boardState.includes('')) {
        alert('It\'s a tie!');
        gameActive = false;
        return;
    }
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    cells.forEach(cell => {
        cell.textContent = '';
    });
    hideWinningAnimation();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
function showWinningAnimation(winner) {
    console.log('Showing Wining animation ');
    winnerName.textContent = winner;
    winningAnimation.classList.remove('hidden');
}

function hideWinningAnimation() {
    console.log('Hiding winning animation ');
    winningAnimation.classList.add('hidden');
}

resetButton.addEventListener('click', resetGame);
