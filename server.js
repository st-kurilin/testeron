var express = require('express');
var app = express();
app.use(express.bodyParser());

var stories = [
    {"title": "User creation", "role": "user", "goal": "all"},
    {"title": "User deletion", "role": "admin", "goal": "all"}
]
app.get('/hello.txt', function (req, res) {
    res.send('Hello World');
});
app.post('/main.html', function (req, res) {
    console.log('Create story');
    stories.push(req.body)
    res.send('saved');
});
app.get('/stories', function (req, res) {
    res.send(stories);
});
app.use(express.static(__dirname + '/webapp'));
app.listen(3000);
console.log('Listening on port 3000');
