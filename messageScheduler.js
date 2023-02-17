const Timer = require("timers");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const minDelay = 250; // Minimum késleltetés 250 ms
const maxDelay = 3500; // Maximum késleltetés 3500 ms
const minPeriod = 250; // Minimum időköz 250 ms
const maxPeriod = 3500; // Maximum időköz 3500 ms
let count = 0;
let delay = minDelay + rand(minDelay, maxDelay);
let period = minPeriod + rand(minPeriod, maxPeriod);

console.log(`Kezdő késleltetés: ${delay} ms`);
console.log(`Kezdő időköz: ${period} ms`);

const timer = Timer.setInterval(() => {
    count++;
    console.log(`Ez az üzenet ${count}. alkalommal lett elküldve a konzolra.`);
    delay = minDelay + rand(minDelay, maxDelay);
    period = minPeriod + rand(minPeriod, maxPeriod);

    console.log(`Késleltetés: ${delay} ms`);
    console.log(`Időköz: ${period} ms`);

    // Az időkorlát ellenőrzése
    if (count >= Math.floor(10000 / period)) {
        Timer.clearInterval(timer); // Megszünteti az időzítőt
        console.log("Az időkorlát elérve, a program leállt.");
    }
}, delay);