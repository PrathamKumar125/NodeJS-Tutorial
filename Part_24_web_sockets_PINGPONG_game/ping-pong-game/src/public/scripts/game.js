let isReferee = false;
let isGameStarted = false;
const socket = io("/ping-pong");
const paddleX = [225, 225];
let score = [0, 0];

// Canvas setup
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const width = 500;
const height = 700;

// Paddle
const paddleWidth = 50;
const paddleHeight = 20;
let paddleComputerX = paddleX[0];
let paddlePlayerX = paddleX[1];
let paddleDiff = 25;
let paddleContact = false;
let paddleIndex = 0;

// Ball
let ballX = width / 2;
let ballY = height / 2;
let ballRadius = 5;

// Speed
let speedY = -2; // Reduce magnitude if needed
let speedX = -2;
let computerSpeed = 3;
let trajectoryX;

let playerMoved = false;

const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');

startButton.addEventListener('click', () => {
    isGameStarted = true;
    socket.emit('ready');
    startScreen.style.display = 'none';
    loadGame();
});

function renderCanvas() {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "black";
  context.fillRect(paddleComputerX, 10, paddleWidth, paddleHeight);
  context.fillRect(paddlePlayerX, height - 30, paddleWidth, paddleHeight);

  // Dashed center
  context.beginPath();
  context.setLineDash([4]);
  context.moveTo(0, 350);
  context.lineTo(500, 350);
  context.strokeStyle = "grey";
  context.stroke();
  //Ball
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
  context.fillStyle = "black";
  context.fill();
  // Score
  context.font = "32px Courier New";
  context.fillText(score[1], 20, canvas.height / 2 + 50);
  context.fillText(score[0], 20, canvas.height / 2 - 30);
}

// Modify ballMove function
function ballMove() {
  ballY += speedY;
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }
  
  if (isReferee) {
    socket.emit("ballMove", {
      xposition: ballX,
      yposition: ballY,
      score: score
    });
  }
}

function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = 3;  // Start with positive speed (downward)
  speedX = 0;  // Start straight
  paddleContact = false;
}

function ballBoundaries() {
  // Vertical (top/bottom) boundaries
  if (ballY < 0) {
    // Hit top wall - reverse direction
    speedY = Math.abs(speedY);
  } else if (ballY > height) {
    // Ball passed bottom paddle
    score[0]++;
    ballReset();
  }

  // Horizontal (left/right) boundaries
  if (ballX < 0 || ballX > width) {
    speedX = -speedX;
  }

  // Paddle collision
  if (ballY > height - paddleHeight - paddleDiff) {
    if (ballX > paddlePlayerX && ballX < paddlePlayerX + paddleWidth) {
      // Hit the paddle - reverse direction
      paddleContact = true;
      speedY = -speedY;
      
      // Calculate new angle
      let deltaX = ballX - (paddlePlayerX + paddleWidth/2);
      speedX = deltaX * 0.2; // Reduce this multiplier if ball moves too fast
    }
  }
}

function computerPaddle() {
  if (playerMoved) {
    if (paddleComputerX + paddleDiff < ballX) {
      paddleComputerX += computerSpeed;
    } else {
      paddleComputerX -= computerSpeed;
    }
    console.log(`Computer paddle moved to ${paddleComputerX}`);
  }
}

function animate() {
  if (!isGameStarted) return;
  
  if (isReferee) {
    ballMove();
    ballBoundaries();
    // Emit ball position more efficiently
    if (paddleContact || ballY < height/2) {
      socket.emit("ballMove", {
        xposition: ballX,
        yposition: ballY,
        score: score
      });
    }
  }
  renderCanvas();
  window.requestAnimationFrame(animate);
}

function createCanvas() {
  canvas.height = height;
  canvas.width = width;
  document.body.appendChild(canvas);
  renderCanvas();
  console.log("Canvas created");
}

function loadGame() {
  createCanvas();
  animate();

  score = [0, 0];
  console.log("Game loaded");
}

function startGame() {
  canvas.addEventListener("mousemove", (e) => {
    playerMoved = true;
    // Fix paddle position calculation
    paddlePlayerX = e.clientX - canvas.offsetLeft - paddleWidth / 2;

    if (paddlePlayerX < 0) {
      paddlePlayerX = 0;
    }
    if (paddlePlayerX > width - paddleWidth) {
      paddlePlayerX = width - paddleWidth;
    }
    console.log(`Player paddle moved to ${paddlePlayerX}`);
    socket.emit("PaddleMove", {
      xposition: paddlePlayerX
    });
  });
}

socket.on("connect", () => {
  console.log("Connected to server", socket.id);
});

socket.on("start", (refereeId) => {
  console.log("Game starting, Referee is", refereeId);
  isReferee = socket.id === refereeId;
  paddleIndex = isReferee ? 0 : 1;
  startGame();
});

socket.on("PaddleMove", (paddleData) => {
  const opponentPaddleIndex = 1 - paddleIndex;
  if (opponentPaddleIndex === 0) {
    paddleComputerX = paddleData.xposition;
  } else {
    paddlePlayerX = paddleData.xposition;
  }
  console.log(`Opponent paddle moved to ${paddleData.xposition}`);
});

socket.on("ballMove", (ballData) => {
  if (!isReferee) {
    ballX = ballData.xposition;
    ballY = ballData.yposition;
    score = ballData.score;
    console.log(`Ball moved to (${ballX}, ${ballY}) by opponent`);
  }
});

// Add disconnect handler
socket.on("playerDisconnected", () => {
  isGameStarted = false;
  alert("Other player disconnected!");
  location.reload();
});
