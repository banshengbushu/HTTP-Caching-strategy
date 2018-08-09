const _ = require('lodash');
const Table = require('cli-table');

module.exports = {
    sleep(s) {
        return new Promise(res => {
            setTimeout(res, s * 1000);
        });
    },
    getOutput() {
        return new Table({
            head: ['id', 'fromCache', 'res content', 'res headers'],
            colWidths: [8, 10, 29, 100],
        });
    },
    getHeader(res) {
        return JSON.stringify(_.pick(res.headers(), ['cache-control', 'date', 'etag']));
    }
};
