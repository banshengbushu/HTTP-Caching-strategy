var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    const result = {name: 'wang', age: 20, id: '10'}
    res.send(JSON.stringify(result));
});

app.listen(8081, () => {
    console.log('Listening on port 8081!');
});