// Clear canvas
function clearCanvas(){
    var canvas= document.getElementById('simulationCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0,  canvas.width, canvas.height);
}

// Animations ========================================
let rectX = 60;
let rectY = 60;
let resetCanvas = false;
let paused = false;

function gameLoop(timeStamp) {
    // Update game objects in the loop
    if(!resetCanvas) {
        if(!paused) {
            update();
        }
        draw();
        window.requestAnimationFrame(gameLoop);
    }
}

function update() {
    rectX += Math.ceil((Math.random() - 0.5) * 2) < 1 ? -2 : 2;
    rectY += Math.ceil((Math.random() - 0.5) * 2) < 1 ? -2 : 2;
}

function draw() {
    var canvas= document.getElementById('simulationCanvas');
    var ctx = canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff8080';
    ctx.fillRect(rectX, rectY, 80, 80);
}


// JQuery stuff for buttons ==========================
$(document).ready(function(){
    // Hide the pause button
    $("#btn-pause").hide();

    $("#btn-run").click(function(){
    // Show pause button and hide simulation settings
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
        clearCanvas();
        // resetCanvas = true;
    });
});