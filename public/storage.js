if (!localStorage.getItem('token') && !location.search.includes('code')) {
    window.location.replace("http://localhost:8080/login");
} else if (localStorage.getItem('token')) {
    throw new Error('This is not an error. This is just to abort javascript');
}

const queryString = location.search;
if (!queryString.includes('code')) {
    throw new Error('This is not an error. This is just to abort javascript');
}

const redirect_uri = 'http://localhost:8080/';
const authCode = queryString.split('=')[1].split('&')[0];
console.log(authCode)
const url = 'https://accounts.spotify.com/api/token';
fetch(url, {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
        client_id: 'client_id',
        client_secret: 'client_secret',
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirect_uri,
    }
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function () {
        console.log('Error occured while trying to call Spotify API');
    });