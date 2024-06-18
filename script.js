const ROWS = 6;
const COLUMNS = 7;
let currentPlayer = 'red';
let board = [];

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board = [];

    for (let row = 0; row < ROWS; row++) {
        const rowArray = [];
        for (let col = 0; col < COLUMNS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
            rowArray.push(null);
        }
        board.push(rowArray);
    }
}

function handleCellClick(row, col) {
  for (let r = ROWS - 1; r >= 0; r--) {
      if (!board[r][col]) {
          board[r][col] = currentPlayer;
          const cell = document.querySelector(`[data-row="${r}"][data-col="${col}"]`);
          cell.classList.add(currentPlayer);
          cell.style.animationDelay = `${(ROWS - r) * 0.1}s`;

          if (checkWin(r, col)) {
              setTimeout(() => {
                  alert(`${currentPlayer} wins!`);
                  createBoard();
              }, 100);
              return;
          }
          currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
          updateTurnIndicator();
          return;
      }
  }
}

function checkWin(row, col) {
    const directions = [
        { r: 0, c: 1 }, // Horizontal
        { r: 1, c: 0 }, // Vertical
        { r: 1, c: 1 }, // Diagonal down-right
        { r: 1, c: -1 } // Diagonal down-left
    ];

    for (const { r, c } of directions) {
        let count = 1;
        count += countInDirection(row, col, r, c);
        count += countInDirection(row, col, -r, -c);
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function countInDirection(row, col, r, c) {
    let count = 0;
    let currentRow = row + r;
    let currentCol = col + c;
    while (
        currentRow >= 0 && currentRow < ROWS &&
        currentCol >= 0 && currentCol < COLUMNS &&
        board[currentRow][currentCol] === currentPlayer
    ) {
        count++;
        currentRow += r;
        currentCol += c;
    }
    return count;
}

function updateTurnIndicator() {
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    currentPlayerElement.style.color = currentPlayer;
}

function highlightWinningCells(cells) {
  cells.forEach(({ row, col }) => {
      document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.add('win');
  });
}

document.getElementById('reset').addEventListener('click', createBoard);

createBoard();
updateTurnIndicator();

