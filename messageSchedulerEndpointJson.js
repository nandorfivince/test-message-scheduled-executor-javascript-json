import random from "random";
import {URL} from "url";
import https from "https";
import timer from "timers";

const minDelay = 250; // Minimum delay is 250 ms
const maxDelay = 3500; // Maximum delay is 3500 ms
const minPeriod = 250; // Minimum period 250 ms
const maxPeriod = 3500; // Maximum period 3500 ms
const count = [0];
const delay = [minDelay + random.int(maxDelay - minDelay)]; // Random delaying in the interval
const period = [minPeriod + random.int(maxPeriod - minPeriod)]; // Random delaying in the interval

console.log(`Start delay: ${delay[0]} ms`);
console.log(`Start period: ${period[0]} ms`);

timer.setInterval(() => {
    count[0]++;
    const message = `{"message":"This message was sent ${count[0]}. times."}`;
    delay[0] = minDelay + random.int(maxDelay - minDelay); // update the delay
    period[0] = minPeriod + random.int(maxPeriod - minPeriod); // update the period

    console.log('Data of the sending:');
    console.log(`Message: ${message}`);
    console.log(`Delay: ${delay[0]} ms`);
    console.log(`Period: ${period[0]} ms`);

    // Verify the time out
    if (count[0] >= Math.floor(10000 / period[0])) {
        clearInterval(timer); // Kills the timer
        console.log('The timeout is reached the program is killed.');
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
        console.log(`Response code: ${res.statusCode}`);
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(message);
    req.end();
}