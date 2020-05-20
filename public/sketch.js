function setup() {
    createCanvas(windowWidth, windowHeight);
}

var currentX = 200;
var currentY = 50;
function draw() {
    background(0);
    currentX = currentX - 5;
    if (currentX <= 40){
        currentX= width - 40;
    }
    ellipse(currentX, currentY, 80, 80)
}