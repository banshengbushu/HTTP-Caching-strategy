const utils = require('./utils');
const { sleep } = utils;

describe('maxAgeWithNoCache', () => {
    test('#no-cache will always go server side', async () => {
        let responseTime = 0;
        const page = await browser.newPage();
        const t = utils.getOutput();
        page.on('response', async res => {
            responseTime++;
            const text = await res.text();
            const isCached = res.fromCache();
            t.push([responseTime, isCached, text, utils.getHeader(res)]);
            if (responseTime === 1) {
                expect(isCached).toBe(false);
            }
            if (responseTime === 2) {
                expect(isCached).toBe(false);
            }
            if (responseTime === 3) {
                expect(isCached).toBe(true);
            }
        });
        await page.goto('http://localhost:8081/items');
        await sleep(2);
        await page.goto('http://localhost:8081/items');
        await sleep(5);
        await page.goto('http://localhost:8081/items');
        await sleep(1);
        console.log(t.toString());
    });
});

