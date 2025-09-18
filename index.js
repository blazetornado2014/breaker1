const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const plane = {
    posX: 400,
    posY: 550,
    sizeX: 100,
    sizeY: 20,
}

const ball = {
    posX: 350,
    posY: 400,
    radius: 10,
    velocityX: 1,
    velocityY: -2,
}

let blocks = [];

function createBlocks() {
    blocks = []; 
    let blockWidth = 80;
    let blockHeight = 40;
    
    for (let r = 0; r < 4; r++) {       
        for (let c = 0; c < 7; c++) {  
            blocks.push({
                x: c * (blockWidth + 30) + 30,     
                y: r * (blockHeight + 30) + 30,    
                width: blockWidth,
                height: blockHeight,
                color: 'yellow'
            });
        }
    }
}

let keys = {}

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
})
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
})

function drawBoard(){
    ctx.fillStyle = "red";
    ctx.fillRect(plane.posX, plane.posY, plane.sizeX, plane.sizeY);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    for (let block of blocks) {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height);
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys['a'])
        plane.posX -= 5;

    if (keys['d'])
        plane.posX += 5;

    if (plane.posX < 0)
        plane.posX = 0;
    if (plane.posX + plane.sizeX >= canvas.width)
        plane.posX = canvas.width - plane.sizeX;

    ball.posX += ball.velocityX;
    ball.posY += ball.velocityY;

    //Ball Wall boundaries
    if (ball.posY < 0)
        ball.velocityY = -ball.velocityY;
    //if (ball.posY > canvas.height)
        //Game Over
    if (ball.posX < 0)
        ball.velocityX = -ball.velocityX;
    if (ball.posX >= canvas.width)
        ball.velocityX = -ball.velocityX;

    //Collisions
    //Ball Paddle
    if (ball.posX >= plane.posX && ball.posX < plane.posX + plane.sizeX && ball.posY + ball.radius >= plane.posY)
        ball.velocityY = -ball.velocityY

    //Ball block
    for (let i = blocks.length - 1; i >= 0; i--) {
    let block = blocks[i];
    
    if (ball.posX >= block.x && 
        ball.posX <= block.x + block.width && 
        ball.posY - ball.radius <= block.y + block.height &&
        ball.posY + ball.radius >= block.y) {
        
        ball.velocityY = -ball.velocityY;
        blocks.splice(i, 1); 
        break; 
    }
}
    drawBoard();
    requestAnimationFrame(update);
}

createBlocks();
update();