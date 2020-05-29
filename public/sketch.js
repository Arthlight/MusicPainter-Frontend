function setup() {
    createCanvas(windowWidth, windowHeight - 60);
    frameRate(60);
    textAlign(CENTER, CENTER);
}

var loaded = false

function isLoaded() {
    // Hier kommt evtl dann ein socket channel etc rein der darauf listened ob der user musik hoert
}

function draw() {
    if (loaded) {
        drawMusic()
    } else {
        background(230);
        textSize(40);
        fill(0, 102, 153);
        text("\t\t\t\t Song not loaded （◞‸◟）\n You need to listen to a jam on Spotify.\n Show me your favourite music! ꈍ .̮ ꈍ", 850, 380)
    }

}
// TODO: Eine function die eventuell mit der socket umgesetzt wird und auf ein event hoert dass mitteilt
// TODO: ob der user bereits einen song spielt oder nicht, falls ja wird loaded zu true gesetzt, falls nein passiert nix
// TODO: und loaded bleibt false.

function drawData() {
    // Hier kommt evtl eine socket connection rein die die nächsten daten zum drawen gesendet bekommt
}
function drawMusic() {
    while (loaded) {
        noStroke()
    }
}