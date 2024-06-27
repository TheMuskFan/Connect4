console.log("JavaScript file loaded successfully");

const ROWS = 6;
const COLUMNS = 7;
let currentPlayer = 'red';
let board = [];
let gameMode = '';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    gameMode = window.gameMode;  // Set game mode from the template
    console.log("Game mode:", gameMode);
    createBoard();
    updateTurnIndicator();
    document.getElementById('reset').addEventListener('click', createBoard);
});

async function createBoard() {
    console.log("Creating board...");
    const response = await fetch('/create_board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log("Board created:", data);
    board = data.board;
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
    console.log("Board rendered in DOM");
}

async function handleCellClick(row, col) {
    // Prevent interaction if it's AI's turn
    if (gameMode === 'single' && currentPlayer === 'yellow') {
        console.log("It's AI's turn. Waiting for AI to make a move.");
        return;
    }

    console.log(`Handling cell click: row=${row}, col=${col}, currentPlayer=${currentPlayer}`);
    const response = await fetch('/make_move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            row,
            col,
            player: currentPlayer,
            board
        })
    });
    const data = await response.json();
    console.log("Response from /make_move:", data);

    if (data.error) {
        alert(data.error);
        return;
    }

    board = data.board;
    updateBoardDisplay();

    if (data.winner) {
        setTimeout(() => {
            alert(data.winner === 'draw' ? "It's a draw!" : `${data.winner.charAt(0).toUpperCase() + data.winner.slice(1)} wins!`);
            createBoard();
        }, 100);
        return;
    }

    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    updateTurnIndicator();

    // If single player mode and it's now AI's turn, make AI move
    if (gameMode === 'single' && currentPlayer === 'yellow') {
        console.log("AI's turn to move.");
        setTimeout(makeAIMove, 500);
    }
}

function updateBoardDisplay() {
    console.log("Updating board display...");
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            cell.className = 'cell'; // reset class
            if (board[r][c]) {
                cell.classList.add(board[r][c]);
            }
        }
    }
    console.log("Board display updated");
}

function updateTurnIndicator() {
    console.log("Updating turn indicator...");
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    currentPlayerElement.style.color = currentPlayer;
    console.log("Turn indicator updated:", currentPlayer);
}

function makeAIMove() {
    // Simple AI: choose a random column
    const availableCols = [];
    for (let col = 0; col < COLUMNS; col++) {
        if (board[0][col] === null) {
            availableCols.push(col);
        }
    }
    if (availableCols.length === 0) {
        console.log("No available columns for AI to move.");
        return;
    }

    const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    console.log(`AI chooses column ${randomCol}`);
    handleCellClick(0, randomCol);  // The row value here is ignored in handleCellClick
}
