const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const player = { x: 350, y: 500, width: 50, height: 50, speed: 5 };
const enemy = { x: 350, y: 50, width: 50, height: 50, speed: 3 };
const bullets = [];

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
    if (event.key === "ArrowRight" && player.x + player.width < canvas.width) player.x += player.speed;
    if (event.key === " ") bullets.push({ x: player.x + 22, y: player.y, speed: 7 });
});

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function drawBullets() {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

function moveEnemy() {
    enemy.x += enemy.speed;
    if (enemy.x + enemy.width > canvas.width || enemy.x < 0) enemy.speed *= -1;
}

function detectCollision() {
    bullets.forEach((bullet, index) => {
        if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + 5 > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + 10 > enemy.y
        ) {
            alert("Enemy Destroyed! Reload to play again.");
            document.location.reload();
        }
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemy();
    drawBullets();
    moveEnemy();
    detectCollision();
    requestAnimationFrame(updateGame);
}

updateGame();
