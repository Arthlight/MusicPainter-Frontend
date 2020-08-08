require('dotenv').config();
const path = require('path');
const request = require('request');
const cookieParser = require('cookie-parser');

const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

const port = process.env.PORT || 8081;
const redirect_uri = 'http://161.35.173.232:8081/callback';
console.log(redirect_uri)

app.get('/', function (req, res) {
    const refresh_token = req.cookies['refresh_token'] || null;
    if (!refresh_token) {
        res.redirect('http://161.35.173.232:8081/login');
    } else {
        res.sendFile(path.join(__dirname + '/views/' + 'home.html'));
    }
});


app.get('/login', function(req, res) {
    const scopes = 'user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function (req, res) {
    const code = req.query.code || null;

    if (code === null) {
        res.statusCode(403);
        res.sendFile(path.join(__dirname + '/views/' + 'access_denied.html'));
        return
    }

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            const access_token = body.access_token;
            const refresh_token = body.refresh_token;
            const cookieOptions = {expires: new Date(253402300000000)};

            res.cookie('refresh_token', refresh_token, cookieOptions);
            res.redirect('http://161.35.173.232:8081');
            console.log('access_token: ' ,access_token, 'refresh_token: ', refresh_token)
        }
    });
});

app.listen(port);
console.log("Starting server on port:", port)