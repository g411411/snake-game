// Get the canvas element by its ID
var canvas = document.getElementById('game');
// Get the 2D rendering context for the canvas
var context = canvas.getContext('2d');

// Define the size of the game grid
var gridSize = 20;
// Calculate the size of each tile based on the canvas size and grid size
var tileSize = canvas.width / gridSize;

// Set the initial direction of the snake
var direction = 'right';
// Initialize the snake as an array of segments, each with a top and left position
var snake = [{ top: 0, left: 0 }];
// Initialize the apple as null (it will be placed later)
var apple = null;

// The main game loop
function gameLoop() {
  // Update the position of the snake based on its direction
  updateSnakePosition();
  // Check if the game is over (if the snake has hit the edge of the screen)
  checkGameOver();
  // Check if the snake has eaten the apple
  checkAppleCollision();
  // Redraw the game board
  drawGameBoard();

  // Call the game loop again after a delay
  setTimeout(gameLoop, 1000);
}

// Update the position of the snake
function updateSnakePosition() {
  // Create a new head segment based on the current head and the direction
  var head = Object.assign({}, snake[0]); // copy head
  if (direction === 'right') head.left++;
  else if (direction === 'down') head.top++;
  else if (direction === 'left') head.left--;
  else if (direction === 'up') head.top--;
  // Add the new head to the front of the snake
  snake.unshift(head);
  // If the snake has eaten an apple, place a new one, otherwise remove the tail segment
  if (apple) {
    apple = null;
  } else {
    snake.pop();
  }
}

// Check if the game is over
function checkGameOver() {
  // If the snake's head is outside the game grid, end the game
  var head = snake[0];
  if (head.left < 0 || head.top < 0 || head.left >= gridSize || head.top >= gridSize) {
    throw new Error('Game Over');
  }
}

// Check if the snake has eaten the apple
function checkAppleCollision() {
  // If the snake's head is in the same position as the apple, eat it
  var head = snake[0];
  if (apple && apple.top === head.top && apple.left === head.left) {
    apple = null;
  }
}

// Draw the game board
function drawGameBoard() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height); 
  // Draw each segment of the snake
  snake.forEach(function(cell) {
    context.fillRect(cell.left*tileSize, cell.top*tileSize, tileSize, tileSize);
  });
  // Draw the apple
  if (apple) {
    context.fillRect(apple.left*tileSize, apple.top*tileSize, tileSize, tileSize);
  }
}

// Start the game loop
gameLoop();