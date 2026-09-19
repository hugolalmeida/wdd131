const temperature = 9;
const windSpeed = 15;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

const windChillElement = document.querySelector('#wind-chill');
const canCalculateWindChill = temperature <= 10 && windSpeed > 4.8;

windChillElement.textContent = canCalculateWindChill
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)}°C`
    : 'N/A';

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;