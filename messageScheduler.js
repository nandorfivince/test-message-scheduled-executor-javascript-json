const Timer = require("timers");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const minDelay = 250; // Minimum delay is 250 ms
const maxDelay = 3500; // Maximum delay is 3500 ms
const minPeriod = 250; // Minimum period is 250 ms
const maxPeriod = 3500; // Maximum period is 3500 ms
let count = 0;
let delay = minDelay + rand(minDelay, maxDelay);
let period = minPeriod + rand(minPeriod, maxPeriod);

console.log(`Start delay: ${delay} ms`);
console.log(`Start period: ${period} ms`);

const timer = Timer.setInterval(() => {
    count++;
    console.log(`This message was sent ${count}. times.`);
    delay = minDelay + rand(minDelay, maxDelay);
    period = minPeriod + rand(minPeriod, maxPeriod);

    console.log(`Delay: ${delay} ms`);
    console.log(`Period: ${period} ms`);

    // Verify the timeout
    if (count >= Math.floor(10000 / period)) {
        Timer.clearInterval(timer); // Kills the timer
        console.log("Time out reached the program killed.");
    }
}, delay);