const {URL} = require('url');
const https = require('https');

const timer = require('timers');
const random = require('random');

const minDelay = 250; // Minimum késleltetés 250 ms
const maxDelay = 3500; // Maximum késleltetés 3500 ms
const minPeriod = 250; // Minimum időköz 250 ms
const maxPeriod = 3500; // Maximum időköz 3500 ms
const count = [0];
const delay = [minDelay + random.int(maxDelay - minDelay)]; // Random késleltetés az intervallumban
const period = [minPeriod + random.int(maxPeriod - minPeriod)]; // Random időköz az intervallumban

console.log(`Kezdő késleltetés: ${delay[0]} ms`);
console.log(`Kezdő időköz: ${period[0]} ms`);

timer.setInterval(() => {
    count[0]++;
    const message = `{"message":"Ez az üzenet ${count[0]}. alkalommal lett elküldve."}`;
    delay[0] = minDelay + random.int(maxDelay - minDelay); // Frissíti a késleltetést
    period[0] = minPeriod + random.int(maxPeriod - minPeriod); // Frissíti az időközt

    console.log('Küldési adatok:');
    console.log(`Üzenet: ${message}`);
    console.log(`Késleltetés: ${delay[0]} ms`);
    console.log(`Időköz: ${period[0]} ms`);

    // Az időkorlát ellenőrzése
    if (count[0] >= Math.floor(10000 / period[0])) {
        clearInterval(timer); // Megszünteti az időzítőt
        console.log('Az időkorlát elérve, a program leállt.');
    }

    try {
        sendPostRequest('https://example.com/api/messages', message);
    } catch (e) {
        console.error(e);
    }
}, delay[0]);

function sendPostRequest(endpoint, message) {
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
        },
    };

    const req = https.request(new URL(endpoint), options, (res) => {
        console.log(`Válasz kód: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(message);
    req.end();
}