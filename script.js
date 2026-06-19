// Game Configuration
const GRID_SIZE = 4; // 4x4 grid = 5x5 dots
const DOT_SIZE = 12;
const CELL_SIZE = 40;
const LINE_MARGIN = 5;

// Game Variables
let gameActive = true;
let currentPlayer = 1; // 1 or 2
let p1Score = 0;
let p2Score = 0;
let horizontalLines = {};
let verticalLines = {};
let boxes = {};

// DOM Elements
const board = document.getElementById('board');
const p1ScoreDisplay = document.getElementById('p1');
const p2ScoreDisplay = document.getElementById('p2');
const currentPlayerDisplay = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');
const gameOverModal = document.getElementById('game-over');
const winnerText = document.getElementById('winner-text');
const playAgainBtn = document.getElementById('play-again-btn');

// Event Listeners
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Initialize Game
function initializeGame() {
    // Clear board
    board.innerHTML = '';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'lines-container';
    container.style.width = (GRID_SIZE * CELL_SIZE + 30) + 'px';
    container.style.height = (GRID_SIZE * CELL_SIZE + 30) + 'px';
    container.style.position = 'relative';
    
    // Create dots
    for (let i = 0; i <= GRID_SIZE; i++) {
        for (let j = 0; j <= GRID_SIZE; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = (j * CELL_SIZE + 20 - DOT_SIZE / 2) + 'px';
            dot.style.top = (i * CELL_SIZE + 20 - DOT_SIZE / 2) + 'px';
            container.appendChild(dot);
        }
    }
    
    // Create horizontal lines
    for (let i = 0; i <= GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const line = document.createElement('div');
            const lineId = `h-${i}-${j}`;
            line.className = 'h-line';
            line.id = lineId;
            line.style.left = (j * CELL_SIZE + 25) + 'px';
            line.style.top = (i * CELL_SIZE + 18) + 'px';
            line.style.width = CELL_SIZE - 10 + 'px';
            
            horizontalLines[lineId] = {
                element: line,
                owner: null
            };
            
            line.addEventListener('click', () => selectLine(lineId, 'h'));
            container.appendChild(line);
        }
    }
    
    // Create vertical lines
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j <= GRID_SIZE; j++) {
            const line = document.createElement('div');
            const lineId = `v-${i}-${j}`;
            line.className = 'v-line';
            line.id = lineId;
            line.style.left = (j * CELL_SIZE + 18) + 'px';
            line.style.top = (i * CELL_SIZE + 25) + 'px';
            line.style.height = CELL_SIZE - 10 + 'px';
            
            verticalLines[lineId] = {
                element: line,
                owner: null
            };
            
            line.addEventListener('click', () => selectLine(lineId, 'v'));
            container.appendChild(line);
        }
    }
    
    // Create boxes
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const box = document.createElement('div');
            const boxId = `box-${i}-${j}`;
            box.id = boxId;
            box.className = 'box';
            box.style.left = (j * CELL_SIZE + 25) + 'px';
            box.style.top = (i * CELL_SIZE + 25) + 'px';
            
            boxes[boxId] = {
                element: box,
                owner: null,
                top: false,
                bottom: false,
                left: false,
                right: false
            };
            
            container.appendChild(box);
        }
    }
    
    board.appendChild(container);
}

function selectLine(lineId, direction) {
    if (!gameActive) return;
    
    const lineData = direction === 'h' ? horizontalLines[lineId] : verticalLines[lineId];
    
    if (lineData.owner !== null) {
        return; // Line already taken
    }
    
    // Mark line as taken
    lineData.owner = currentPlayer;
    lineData.element.classList.add('taken');
    lineData.element.classList.add(`player${currentPlayer}`);
    
    // Check for completed boxes
    let boxCompleted = false;
    
    if (direction === 'h') {
        const parts = lineId.split('-');
        const i = parseInt(parts[1]);
        const j = parseInt(parts[2]);
        // Check box above
        if (i > 0) {
            if (checkBoxCompletion(i - 1, j)) {
                boxCompleted = true;
            }
        }
        // Check box below
        if (i < GRID_SIZE) {
            if (checkBoxCompletion(i, j)) {
                boxCompleted = true;
            }
        }
    } else {
        const parts = lineId.split('-');
        const i = parseInt(parts[1]);
        const j = parseInt(parts[2]);
        // Check box to the left
        if (j > 0) {
            if (checkBoxCompletion(i, j - 1)) {
                boxCompleted = true;
            }
        }
        // Check box to the right
        if (j < GRID_SIZE) {
            if (checkBoxCompletion(i, j)) {
                boxCompleted = true;
            }
        }
    }
    
    // Switch player if no box was completed
    if (!boxCompleted) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateCurrentPlayer();
    } else {
        // Check if game is over
        checkGameOver();
    }
}

function checkBoxCompletion(i, j) {
    const boxId = `box-${i}-${j}`;
    const box = boxes[boxId];
    
    const topLineId = `h-${i}-${j}`;
    const bottomLineId = `h-${i + 1}-${j}`;
    const leftLineId = `v-${i}-${j}`;
    const rightLineId = `v-${i}-${j + 1}`;
    
    box.top = horizontalLines[topLineId].owner !== null;
    box.bottom = horizontalLines[bottomLineId].owner !== null;
    box.left = verticalLines[leftLineId].owner !== null;
    box.right = verticalLines[rightLineId].owner !== null;
    
    if (box.top && box.bottom && box.left && box.right && box.owner === null) {
        // Box is completed
        box.owner = currentPlayer;
        box.element.classList.add('completed');
        box.element.classList.add(`player${currentPlayer}`);
        box.element.textContent = currentPlayer;
        
        if (currentPlayer === 1) {
            p1Score++;
        } else {
            p2Score++;
        }
        updateScore();
        return true;
    }
    
    return false;
}

function checkGameOver() {
    let completedBoxes = 0;
    const totalBoxes = GRID_SIZE * GRID_SIZE;
    
    for (const boxId in boxes) {
        if (boxes[boxId].owner !== null) {
            completedBoxes++;
        }
    }
    
    if (completedBoxes === totalBoxes) {
        endGame();
    }
}

function endGame() {
    gameActive = false;
    
    let winnerMessage;
    if (p1Score > p2Score) {
        winnerMessage = `🎉 Player 1 Wins!\n${p1Score} - ${p2Score}`;
    } else if (p2Score > p1Score) {
        winnerMessage = `🎉 Player 2 Wins!\n${p2Score} - ${p1Score}`;
    } else {
        winnerMessage = `🤝 It's a Tie!\n${p1Score} - ${p2Score}`;
    }
    
    winnerText.textContent = winnerMessage;
    gameOverModal.classList.add('show');
}

function resetGame() {
    gameActive = true;
    currentPlayer = 1;
    p1Score = 0;
    p2Score = 0;
    horizontalLines = {};
    verticalLines = {};
    boxes = {};
    gameOverModal.classList.remove('show');
    
    updateScore();
    updateCurrentPlayer();
    initializeGame();
}

function updateScore() {
    p1ScoreDisplay.textContent = p1Score;
    p2ScoreDisplay.textContent = p2Score;
}

function updateCurrentPlayer() {
    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    currentPlayerDisplay.style.color = currentPlayer === 1 ? '#667eea' : '#ff6b6b';
}

// Start the game
initializeGame();
updateScore();
updateCurrentPlayer();
