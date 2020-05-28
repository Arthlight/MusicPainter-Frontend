function setup() {
    createCanvas(windowWidth, windowHeight - 60);
}

var currentX = 200;
var currentY = 50;

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}