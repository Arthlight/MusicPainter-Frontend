require('dotenv').config();
const path = require('path');
const fs = require('fs');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

const port = process.env.PORT || 8080;
const redirect_uri = 'http://localhost:8080/callback';


app.get('/login', function(req, res) {
    res.statusCode = 302;
    var scopes = 'user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function (req, res) {
    const code = req.query.code || null;
    const storedCode = req.cookies['auth_token'] || null;

    if (code === null) {
        res.statusCode(403);
        res.sendFile(path.join(__dirname + '/views/' + 'access_denied.html'));
    }
    if (storedCode !== null) {
        res.statusCode(302);
        res.redirect('http://localhost:8080/')
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

            console.log('access_token: ' ,access_token, 'refresh_token: ', refresh_token)
        } else {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }))
        }
    });

    res.statusCode = 302;
    res.redirect('http://localhost:8080/')

});

// TODO: still under construction, not used yet
app.get('/refresh_token', function(req, res) {


    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/views/' + 'home.html'));
    res.statusCode = 200;

});

app.get('/clear', function (req, res) {

    // TODO: REMEMBER, clearcookie will only clear the cookie
    // TODO: if i put in the exact same options when i was
    // TODO: setting the cookie, including options etc
    // TODO: take a look again here: https://expressjs.com/en/4x/api.html#res.clearCookie
    res.clearCookie('auth_token');
    res.clearCookie('refresh_token');
    res.statusCode = 302;
    res.redirect('http://localhost:8080/login')

});

app.listen(port);
