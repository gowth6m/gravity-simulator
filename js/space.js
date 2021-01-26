const canvas = document.getElementById('space');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

function windowResize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
};
  
window.addEventListener('resize', windowResize);

// Simulator code
let id = document.getElementById("space");
let planetNumber = 0;
let clickPlanetName = "Planet";

let context = id.getContext("2d");
document.getElementById("body").onmousedown = function (event) {
    event = event || window.event;
    event.preventDefault();
    let x = event.pageX;
    let y = event.pageY;
    planetList.push(createPlanet(clickPlanetName, x, y, 0, 0, 10, "#f8f8f8"));
    console.log("x:"+x+" y:"+y);
};


function createPlanet(name, posX, posY, dirX, dirY, size, colour) {
    let nameToWite = "";
    if (clickPlanetName === name) {
        nameToWite = name + "_" + (planetNumber++).toString();
    } else {
        nameToWite = name
    }
    let planet = {
        posX: posX,
        posY: posY,
        dirX: dirX,
        dirY: dirY,
        size: size,
        colour: colour,
        name: nameToWite,
    };

    return planet;
}

let planetList = [];

planetList.push(createPlanet("StartParticle", (canvas.width/2), (canvas.height/2), -2, 0, 20, "#f8f8f8"));
planetList.push(createPlanet("StartParticle2", (canvas.width/2), (canvas.height/2.4), 4, 0, 20, "#f8f8f8"));

function drawPlanet(x, y, size, colour) {
    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.stroke();
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function init() {
    setInterval(draw, 10);
}

function drawBall(colour) {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = colour;
    context.fill();
    context.closePath();
}

function calcAccel(planetA, planetB) {
    const G = 9.81;
    let localDirX = 1;
    let localDirY = 1;
    let directions = [0, 0];
    let contact = 0;

    let memberA = Math.pow((planetA.posX - planetB.posX), 2);
    let memberB = Math.pow((planetA.posY - planetB.posY), 2);
    let distance = Math.sqrt(memberA + memberB);

    let gravatationalAcceleration = G * (planetA.size * planetB.size) / Math.pow(distance, 2);

    gravatationalAcceleration *= Math.pow(planetB.size, 2) / Math.pow((planetA.size + planetB.size), 2);


    let diffX = Math.abs(planetA.posX - planetB.posX);
    let diffY = Math.abs(planetA.posY - planetB.posY);

    let angle = Math.atan(diffY / diffX);
    directions[0] = Math.cos(angle) * gravatationalAcceleration;
    directions[1] = Math.sin(angle) * gravatationalAcceleration;

    if (distance < (planetA.size + planetB.size) / 2) {
        contact = 1;
    } else {
        contact = 0;
    }


    if (planetA.posX > planetB.posX) {
        localDirX = -1;
    }
    if (planetA.posY > planetB.posY) {
        localDirY = -1;
    }
    if (planetA.name === "StartParticle") {
        planetA.dirX = 0;
        planetA.dirY = 0;
    } else {
        planetA.dirX += localDirX * Math.abs(directions[0]);
        planetA.dirY += localDirY * Math.abs(directions[1]);
    }
    deplacement(planetA);
    return contact;
}

function deplacement(planetA) {

    planetA.posX += planetA.dirX;
    planetA.posY += planetA.dirY;

    if (planetA.posX < 0 || planetA.posX > canvas.width) {
        planetA.dirX = -planetA.dirX;
    }

    if (planetA.posY < 0 || planetA.posY > canvas.height) {
        planetA.dirY = -planetA.dirY;
    }
}

function draw() {
    context.clearRect(0, 0, 10000, 10000);
    let breaked = 0;
    let planet, planetToTest;

    for (planet of planetList) {
        if (planetList.length === 1) {
            deplacement(planet)
        }
        for (planetToTest of planetList) {
            if (planet != planetToTest) {
                let contact = 0;

                let directions = [0, 0];
                contact = calcAccel(planetToTest, planet);

                if (contact != 0) {

                    let speedComponentX = 0.1 * (planet.dirX * (planet.size / planetToTest.size) + planetToTest.dirX * (planetToTest.size / planet.size));
                    let speedComponentY = 0.1 * (planet.dirY * (planet.size / planetToTest.size) + planetToTest.dirY * (planetToTest.size / planet.size));
                   
                    if (planet.size > planetToTest.size) {
                        colourToAdd = planet.colour;
                    } else {
                        colourToAdd = planetToTest.colour;
                    }

                    planetList.push(createPlanet(planet.name + "_" + planetToTest.name, planet.posX, planet.posY, speedComponentX, speedComponentY, planet.size + planetToTest.size, colourToAdd));
                    for (let i = 0; i < planetList.length; i++) {
                        if (planetList[i].name === planet.name || planetList[i].name === planetToTest.name) {
                            planetList.splice(i, 1);
                            breaked = 1;
                            break;
                        }
                    }

                    for (let i = 0; i < planetList.length; i++) {
                        if (planetList[i].name === planet.name || planetList[i].name === planetToTest.name) {
                            planetList.splice(i, 1);
                            breaked = 1;
                            break;
                        }
                    }
                }
            }
            if (breaked) {
                break;
            }
        }
        if (breaked) {
            break;
        }
        drawPlanet(planet.posX, planet.posY, planet.size, planet.colour);
    }
}