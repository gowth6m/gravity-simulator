context = canvas.getContext('2d')
context.scale(2,2)

// Particle object
function createNewParticle(name) {
    const obj = {};
    obj.name = name;
    obj.greeting = function() {
        var c = document.getElementById("simulationCanvas");
        var ctx = c.getContext("2d");
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#f8f8f8";
        ctx.fill(); 
        ctx.stroke();
    };
    return obj;
}

function createParticles() {
    numberOfParticles = Math.random();

    const salva = createNewParticle('Bob');
    salva.greeting();
}
