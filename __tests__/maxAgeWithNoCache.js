const utils = require('../utils');
const { sleep } = utils;
const qs = require('qs');

jest.setTimeout(30000);

describe('maxAgeWithNoCache', () => {
    let url;

    beforeEach(() => {
        url = 'http://localhost:8081/items';
    });

    test('#no-cache & max-age = 3', async () => {
        const page = await browser.newPage();
        const param = {
            body: 'now',
            cacheControl: 'no-cache, max-age=3',
            etag: false
        };

        url += `?${qs.stringify(param)}`;

        let responseTime = 0;
        const table = utils.getOutput();

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();

            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#no-cache & max-age = 3 & same response', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: '',
            cacheControl: 'no-cache, max-age=3',
            etag: false
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();

            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });


        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());

    });

    test('#no-cache & etag & max-age = 3 ', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: 'now',
            cacheControl: 'no-cache, max-age=3',
            etag: true
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();
            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#no-cache & etag & max-age = 3 & same response ', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: '',
            cacheControl: 'no-cache, max-age=3',
            etag: true
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();

            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(false);  //true
                expect(status).toBe(304);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);   //true
                expect(status).toBe(304);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#max-age = 3 ', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: 'now',
            cacheControl: 'max-age=3',
            etag: false
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();

            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(true);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#etag & max-age = 3 ', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: 'now',
            cacheControl: 'max-age=3',
            etag: true
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();

            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(true);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#public & max-age = 3 & same response', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: '',
            cacheControl: 'public, max-age=3',
            etag: false
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();
            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(true);
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }
        });

        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(2);
        await page.goto(url);
        await sleep(1);
        console.log(table.toString());
    });

    test('#public & etag & max-age = 3 & same response', async () => {
        const page = await browser.newPage();
        let responseTime = 0;
        const table = utils.getOutput();
        const param = {
            body: '',
            cacheControl: 'public, max-age=3',
            etag: true
        };

        url += `?${qs.stringify(param)}`;

        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            const status = res.status();
            table.push([responseTime, isCached, text, utils.getHeader(res)]);

            if(responseTime === 1) {
                expect(isCached).toBe(false);
                expect(status).toBe(200);
            }

            if(responseTime === 2) {            //2s
                expect(isCached).toBe(true);  //false
                expect(status).toBe(200);
            }

            if(responseTime === 3) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(304);
            }

            if(responseTime === 4) {            //4s
                expect(isCached).toBe(true);
                expect(status).toBe(200);
            }

            if(responseTime === 5) {            //4s
                expect(isCached).toBe(false);
                expect(status).toBe(304);
            }
        });

        await page.goto(url);  // first request
        await sleep(2);
        await page.goto(url);  // in max age
        await sleep(2);
        await page.goto(url);  // out max age
        await sleep(2);
        await page.goto(url);  // in second max age
        await sleep(2);
        await page.goto(url);  // out second max age
        await sleep(0.5);
        console.log(table.toString());
    });
});

