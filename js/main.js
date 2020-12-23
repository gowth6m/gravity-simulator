// Clear canvas
function clearCanvas(){
    var canvas= document.getElementById('simulationCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0,  canvas.width, canvas.height);
}

// Animations ========================================
let rectX = Math.floor(Math.random() * 200) + 20;
let rectY = Math.floor(Math.random() * 200) + 20;
let resetCanvas = false;
let paused = false;
let movingDirectionX = false;
let movingDirectionY = false;
let inputSpeed = document.getElementById('input-speed').value;

function gameLoop(timeStamp) {
    // Update game objects in the loop
    if(!resetCanvas) {
        if(!paused) {
            update();
            movingDirectionCalculator();
        }
        draw();
        window.requestAnimationFrame(gameLoop);
    }
}

function update() {
    if(!movingDirectionX) {
        rectX += 0.5 * inputSpeed;
    } else {
        rectX -= 0.5 * inputSpeed;
    }
    
    if(!movingDirectionY) {
        rectY += 0.5 * inputSpeed;
    } else {
        rectY -= 0.5 * inputSpeed;
    }
}

function draw() {
    var canvas= document.getElementById('simulationCanvas');
    var ctx = canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff8080';
    ctx.fillRect(rectX, rectY, 20, 20);
}

function movingDirectionCalculator() {
    if ((Math.ceil((Math.random() - 0.5) * 2) < 1 ? -10 : 10) > 0) {
        movingDirectionX = true;
    } else if ((Math.ceil((Math.random() - 0.5) * 2) < 1 ? -10 : 10) < 0) {
        movingDirectionX = false
    }

    if ((Math.ceil((Math.random() - 0.5) * 2) < 1 ? -10 : 10) > 0) {
        movingDirectionY = true;
    } else if ((Math.ceil((Math.random() - 0.5) * 2) < 1 ? -10 : 10) < 0) {
        movingDirectionY = false
    }
}


// JQuery stuff for buttons ==========================
$(document).ready(function(){
    // Hide the pause button
    $("#btn-pause").hide();

    $("#btn-run").click(function(){
    // Show pause button and hide simulation settings
        inputSpeed = document.getElementById("input-speed").value;
        $("#simulation-settings").hide();
        $("#btn-pause").show();
        $("#simulationCanvas").css({"width": "100vw", "height": "100vh", "top": "0", "margin-top": "0"});

        createParticles();
        paused = false;
        resetCanvas = false
        gameLoop();
    });

    // Hide pause button and show simulation settings
    $("#btn-pause").click(function(){
        paused = true;
        $("#simulation-settings").show();
        $("#btn-pause").hide();
        $("#simulationCanvas").css({"width": "80vw", "height": "80vh", "top": "50%", "margin-top": "-40vh"});
    });

    // Reset canvas
    $("#btn-reset").click(function(){
        resetCanvas = true;
        rectX = Math.floor(Math.random() * 50) + 50;
        rectY = Math.floor(Math.random() * 50) + 50;
        clearCanvas();
        // resetCanvas = true;
    });
});