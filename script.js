const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');

const cells = Array.from({ length: 9 }, (_, index) => index + 1);

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    if (gameOver) return;

    const index = event.target.dataset.index;
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        switchPlayer();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        resultDisplay.textContent = 'It\'s a draw!';
        gameOver = true;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

renderBoard();
