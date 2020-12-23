

// Particle object
function createNewParticle(name) {
    const obj = {};
    obj.name = name;
    obj.greeting = function() {
        var c = document.getElementById("simulationCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(Math.random(), Math.random(), 20, 0, 2 * Math.PI);
        ctx.stroke();
    };
    return obj;
}

function createParticles() {
    numberOfParticles = Math.random();

    const salva = createNewParticle('Bob');
    salva.greeting();

}


$(document).ready(function(){
    // Hide the pause button
    $("#btn-pause").hide();

    $("#btn-run").click(function(){
    // Show pause button and hide simulation settings
        $("#simulation-settings").hide();
        $("#btn-pause").show();

        createParticles();
    });

    // Hide pause button and show simulation settings
    $("#btn-pause").click(function(){
        $("#simulation-settings").show();
        $("#btn-pause").hide();
    });
  });