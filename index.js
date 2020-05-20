require('dotenv').config();
const path = require('path');
const fs = require('fs');

const express = require('express');

const helper = require('./helper');

const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 8080;
const redirect_uri = 'http://localhost:8080/';


app.get('/login', function(req, res) {
    res.statusCode = 302;
    var scopes = 'user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/', function (req, res) {
    if (helper.checkForError(req.query)) {
        res.statusCode = 403;
        res.sendFile(path.join(__dirname + '/views/' + 'access_denied.html'));
        return
    }
    res.sendFile(path.join(__dirname + '/views/' + 'home.html'));
    res.statusCode = 200;

});

app.listen(port);
