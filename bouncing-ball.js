// Setup canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Ball setup
let ball = {
  x: 100,
  y: 100,
  radius: 25,
  scaleX: 1, // Initial stretch factor on the X-axis is 1 (no stretch)
  scaleY: 1, // Initial stretch factor on the Y-axis is 1 (no stretch)
  dx: 5, // Horizontal velocity
  dy: 5, // Vertical velocity
  color: 'red',
};

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.save(); // Save the current state of the canvas
  ctx.translate(ball.x, ball.y); // Translate to the ball's position
  ctx.scale(ball.scaleX, ball.scaleY); // Apply scaling transformation
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2); // Draw circle at origin
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.restore(); // Restore the original state (removing translation and scaling)
  ctx.closePath();
}

// Update the ball's position and handle wall collision
function updateBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

  // Ball collision with the walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx; // Reverse horizontal direction
    ball.scaleX = 0.8; // Squash horizontally
    ball.scaleY = 1.2; // Stretch vertically
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy; // Reverse vertical direction
    ball.scaleX = 1.2; // Stretch horizontally
    ball.scaleY = 0.8; // Squash vertically
  }

  // Gradually reset the scaling to normal
  ball.scaleX += (1 - ball.scaleX) * 0.1;
  ball.scaleY += (1 - ball.scaleY) * 0.1;

  // Draw the ball with new properties
  drawBall();

  // Update position based on velocity
  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate); // Request the next frame of animation
  updateBall(); // Update ball's position and render it
}

animate(); // Start the animation
