var express = require('express');
var app = express();

app.get('/items', (req, res) => {
    const result = [{name: 'wang', age: 20, id: '10'}, {name: 'li', age: 20, id: '10'}]

    res.setHeader('Cache-Control', 'public, max-age=5');
    res.status(200).send(JSON.stringify(result));
});

app.use('/', express.static('public', { maxAge: 33 }));

app.listen(8081, () => {
    console.log('Listening on port 8081!');
});