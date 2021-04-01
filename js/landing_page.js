const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particlesArray;


let mouse = {
    x: null,
    y: null,
    radius: ((canvas.height / 100) * (canvas.width / 100))
};

window.addEventListener("mousemove", function(event){
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;

    mouse.x = (event.x - rect.left) * scaleX;
    mouse.y = (event.y - rect.top) * scaleY;
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
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x < this.size) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y < this.size) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    var numberOfParticles = (canvas.height * canvas.width) / 20000;
    for (var i = 0; i < numberOfParticles; i++){
        var size = (Math.random() * 30) + 1;
        var x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        var y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        var temp = Math.random()
        var min = 0.05;
        var max = 0.2;
        if (temp > 0 && temp <= 0.25){
            var directionX = (Math.random() * (max - min) + min);
            var directionY = (Math.random() * (max - min) + min);
        } else if (temp > 0.25 && temp <= 0.5){
            var directionX = -(Math.random() * (max - min) + min);
            var directionY = (Math.random() * (max - min) + min);
        } else if (temp > 0.5 && temp <= 0.75){
            var directionX = (Math.random() * (max - min) + min);
            var directionY = -(Math.random() * (max - min) + min);
        } else {
            var directionX = -(Math.random() * (max - min) + min);
            var directionY = -(Math.random() * (max - min) + min);
        }
        var color = '#00897b';
        var alpha = (Math.random() * (0.4 - 0.1) + 0.1);

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color, alpha));
    }
}

function connectToMouse(i) {
    var distance = Math.sqrt((particlesArray[i].x - mouse.x)**2 + (particlesArray[i].y - mouse.y)**2);
    var alpha = 0.5 - (distance/30000);

    var r = (particlesArray[i].size);
    var closestEdgeX = particlesArray[i].x + (r * ((mouse.x - particlesArray[i].x) / 
                                                    Math.sqrt((mouse.x - particlesArray[i].x)**2 + (mouse.y - particlesArray[i].y)**2)));
    var closestEdgeY = particlesArray[i].y + (r * ((mouse.y - particlesArray[i].y) / 
                                                    Math.sqrt((mouse.x - particlesArray[i].x)**2 + (mouse.y - particlesArray[i].y)**2)));

    if (distance <= mouse.radius){
        ctx.strokeStyle = 'rgba(0 , 137, 123, ' + alpha + ')';
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(closestEdgeX, closestEdgeY);
        ctx.stroke();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        connectToMouse(i);
    }
}

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 100) * (canvas.width / 100));
    init();
});

window.addEventListener('mouseout', function(){
    mouse.y = null;
    mouse.x = null;
});

init();
animate();
