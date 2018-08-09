var express = require('express');
var app = express();

app.get('/items', (req, res) => {
    const { body, cacheControl, etag } = req.query;
    const result = { timestamp: body === 'now'? Date.now(): 1};

    app.set('etag', etag === 'true')
    res.setHeader('Cache-Control', cacheControl);
    res.status(200).send(JSON.stringify(result));
});

app.use('/', express.static('public', { maxAge: 4 }));

app.listen(8081, () => {
    console.log('Listening on port 8081!');
});
