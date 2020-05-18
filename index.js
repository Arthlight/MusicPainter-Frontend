require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const port = process.env.PORT || 8080;
const redirect_uri = 'http://localhost:8080/';

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/login', function(req, res) {
    var scopes = 'user-read-currently-playing';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/', function (req, res) {
    res.render('home', {layout: false});

});

app.listen(port);
