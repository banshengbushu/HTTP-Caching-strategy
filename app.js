var express = require('express');
var app = express();

app.set('etag', false);

app.get('/public/max-age', (req, res) => {
    const result = { timestamp: Date.now() };

    // res.setHeader('Cache-Control', 'no-cache, max-age=3');
    res.setHeader('Cache-Control', 'public, max-age=3');
    res.status(200).send(JSON.stringify(result));
});

app.use('/', express.static('public', { maxAge: 4 }));

app.listen(8081, () => {
    console.log('Listening on port 8081!');
});
