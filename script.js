const secretApi = "at_qUdEVpEFRzxAO33AmrO8qoj1Uvfg7";
const apiUri = "https://geo.ipify.org/api/v1";
const bypassCorsUri = " https://cors-anywhere.herokuapp.com/";

let searchIp = document.querySelector('#ip');
let searchLocation = document.querySelector('#location');
let searchTimezone = document.querySelector('#timezone');
let searchIsp = document.querySelector('#isp');

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

let map = null;
let mapIcon = L.icon({
    iconUrl: './images/icon-location.svg'
});

//Get User IP
async function getIP() {
    // const ipUrl = `${bypassCorsUri}${apiUri}?apiKey=${secretApi}`
    const ipUrl = `${apiUri}?apiKey=${secretApi}`
    const ip = await fetch(ipUrl);
    const ipData = await ip.json();
    updateDetails(ipData);
    getMap(ipData.location.lat, ipData.location.lng)
}

getIP();

function updateDetails(data) {
    searchIp.innerHTML = data.ip
    searchLocation.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
    searchTimezone.innerHTML = data.location.timezone
    searchIsp.innerHTML = data.isp
}

function getMap(lat, long) {
    map = L.map('mapid').setView([lat, long], 13);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    updateMarker(lat, long)
}

function updateMarker(lat, long) {
    map.setView([lat, long], 100)
    L.marker([lat, long], {
        icon: mapIcon
    }).addTo(map)
}

async function search() {
    // const ip = await fetch(`${bypassCorsUri}${apiUri}?apiKey=${secretApi}&ipAddress=${searchInput.value}`, options);
    const ip = await fetch(`${apiUri}?apiKey=${secretApi}&ipAddress=${searchInput.value}`);
    const ipData = await ip.json();
    updateDetails(ipData);
    updateMarker(ipData.location.lat, ipData.location.lng);
    searchInput.value = "";
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    search();
});