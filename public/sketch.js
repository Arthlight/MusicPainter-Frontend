function setup() {
    createCanvas(windowWidth, windowHeight - 60);
    frameRate(30);
    textAlign(CENTER, CENTER);
}

let loaded = false;
let queue = [];
let currentEllipseHeight = 0
let currentEllipseWidth = 0
let currentRGB = [0, 0, 0]

const cookie = getCookieValue('refresh_token');
const maxY = window.innerHeight;
const maxX = window.innerWidth;

function WsClient(url) {
    this.ws = new WebSocket(url);
    this.eventListener = {};

    this.on = (eventName, cb) => this.eventListener[eventName] = cb

    this.emit = (name, content) => {
        let event = {
            name: name,
            content: content,
        };
        let rawData = JSON.stringify(event);
        this.ws.send(rawData);
    };

    this.ws.addEventListener('open', () => {
        console.log("Succesfully connected to Backend!")
    });

    this.ws.addEventListener('message', msg => {
        if (msg[0] in this.eventListener) {
            this.eventListener[msg[0]](msg[1])
        }
    });

    this.ws.onmessage = (response) => {
        try {
            let data = JSON.parse(response.data);
            if (data) {
                let cb = this.eventListener[data.name];
                if (cb) {
                    cb(data.content);
                }
            }
        } catch (e) {
            console.log(e);
        }
        console.log('received a message')
    }
}
const ws = new WsClient('ws://localhost:4000/v1/ws');
ws.on("isPlaying", (data) => {
    console.log("Data from isPlaying event is: ", data)
    loaded = data["isPlaying"]
    console.log("loaded is: ", loaded)
})
ws.on("coordinates", (data) => {
    console.log("Data from coordinates event is: ", data)
    queue.push([data.x, data.y])
    currentEllipseHeight = data.ellipse_height
    currentEllipseWidth = data.ellipse_width
    currentRGB = data.color_palette
    updateSongName(data.song_name)
})

function updateSongName(songname) {
    // TODO: implement this
    console.log("")
}

function connect() {
    ws.emit('refresh_token', {x: maxX, y: maxY, refresh_token: cookie})
}

let counter = 0
function draw() {
    if (loaded) {
        if (counter === 0) {
            clear()
            counter += 1
        }
        currentCoordinates = queue.shift()
        if (currentCoordinates !== undefined) {
            noStroke();
            fill(currentRGB['Red'], currentRGB['Green'], currentRGB['Blue']);
            ellipse(currentCoordinates[0], currentCoordinates[1], currentEllipseWidth, currentEllipseHeight)
        }
    } else {
        if (counter !== 1) {
            counter = 0
            background(230);
            textSize(40);
            fill(0, 102, 153);
            text("\t\t\t\t Song not loaded （◞‸◟）\n You need to listen to a jam on Spotify.\n Show me your favourite music! ꈍ .̮ ꈍ", 840, 380)
        }
    }
}

function getCookieValue(a) {
    const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}