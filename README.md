# :art: :musical_note: MusicPainter
Music Painter is a simple app that lets you connect your [Spotify](https://www.spotify.com) account and analyses the music you are currently listening to. The recommended way of use is letting the app run in the background while listening to your favourite playlists. Music Painter will then go along and paint a customized picture according to the metadata of all the songs you choose to listen to.

The Backend for this webapp, written in Go, can be found [here](https://github.com/Arthlight/MusicPainter).

# Demo :movie_camera:
Demo can be seen [here](https://github.com/Arthlight/MusicPainter).

# Structure :open_file_folder:
```bash
├── index.js
├── node_modules
├── package-lock.json
├── package.json
├── public
└── views
```

# Frameworks & APIs :hammer_and_pick:
- Web Framework: [Express](https://github.com/expressjs/express)
- Cookie Parser: [Cookie-Parser](https://github.com/expressjs/cookie-parser)
- For Developing: [Nodemon](https://github.com/remy/nodemon)
- Drawing: [P5](https://p5js.org)
- Deployment: [Docker](https://www.docker.com)

# Installation :gear:

**With WebStorm**:
- [WebStorm](https://www.jetbrains.com/webstorm/) >=2020.1
- ```$ git clone https://github.com/Arthlight/MusicPainter-Frontend.git```
- Open the project with WebStorm and click on the attached Terminal on the bottom
- ```$ node index.js```
- Open http://localhost:8081/

**Without WebStorm**:
- ```$ git clone https://github.com/Arthlight/MusicPainter-Frontend.git```
- ```$ cd MusicPainter-Frontend```
- ```$ node index.js```
- Open http://localhost:8081/

