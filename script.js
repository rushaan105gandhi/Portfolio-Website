// Variables to keep track of game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameInProgress = true;
let turnCount = 0;

// Function to check if a player has won
function checkWin(player) {
  const winStates = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  return winStates.some(state =>
    state.every(index => board[index] === player)
  );
}

// Function to make CPU move
function makeCPUMove() {
  const emptySquares = board
    .map((value, index) => value === "" ? index : -1)
    .filter(index => index !== -1);
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  const move = emptySquares[randomIndex];
  board[move] = "O";
  document.getElementById(move).textContent = "O";
  currentPlayer = "X";
  turnCount++;
  checkGameOver();
}

// Function to check if game is over
function checkGameOver() {
  if (checkWin("X")) {
    document.getElementById("result").textContent = "You win!";
    gameInProgress = false;
  } else if (checkWin("O")) {
    document.getElementById("result").textContent = "CPU wins!";
    gameInProgress = false;
  } else if (turnCount === 9) {
    document.getElementById("result").textContent = "Draw!";
    gameInProgress = false;
  } else {
    gameInProgress = true;
  }
}

// Function to handle player move
function handlePlayerMove(square) {
  if (board[square.id] === "" && gameInProgress) {
    board[square.id] = "X";
    square.textContent = "X";
    currentPlayer = "O";
    turnCount++;
    checkGameOver();
    if (gameInProgress) {
      makeCPUMove();
    }
  }
}

// Add event listeners to squares
const squares = document.querySelectorAll(".square");
squares.forEach(square => {
  square.addEventListener("click", () => handlePlayerMove(square));
});
