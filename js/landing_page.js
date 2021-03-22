const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: ((canvas.height / 80) * (canvas.width / 80))
};

window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color, alpha) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.alpha = alpha;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00897b'
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    var numberOfParticles = (canvas.height * canvas.width) / 7000;
    for (var i = 0; i < numberOfParticles; i++){
        var size = (Math.random() * 4) + 1;
        var x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        var y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        var temp = Math.random()
        if (temp > 0 && temp <= 0.25){
            var directionX = (Math.random());
            var directionY = (Math.random());
        } else if (temp > 0.25 && temp <= 0.5){
            var directionX = -(Math.random());
            var directionY = (Math.random());
        } else if (temp > 0.5 && temp <= 0.75){
            var directionX = (Math.random());
            var directionY = -(Math.random());
        } else {
            var directionX = -(Math.random());
            var directionY = -(Math.random());
        }
        var color = '#00897b';
        var alpha = (Math.random() * (0.5 - 0.1 + 2) + 0.2);

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color, alpha));
    }
}

function connectToMouse() {
    for (var i = 0; i < particlesArray.length; i++){
        // TODO draw line to mouse from each particle within range
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.width / 80))
    init();
});

window.addEventListener('mouseout', function(){
    mouse.y = null;
    mouse.x = null;
});

init();
animate();