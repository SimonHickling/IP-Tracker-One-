//map code

let map = L.map("map").setView([51.505, -0.09], 16);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const secret_api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_u33jMQhgRYe4U65QaLlTaUxDO0gcC&ipAddress=8.8.8.8"
const api_url = "https://geo.ipify.org/api/"
let current_version = "v1"

let currentIp = document.getElementById("current-ip")
let currentLocation = document.getElementById("current-location")
let currentZone = document.getElementById("current-zone")
let currentIsp = document.getElementById("current-isp")

const enteredIp = document.getElementById("ip-address")
const searchBtn = document.getElementById("search-btn")

updateMarker = (update_marker = [42, 42]) => {
    map.setView(update_marker, 16)
    L.marker(update_marker).addTo(map)
}

const headers_option = {
    headers: {
        'Content-Type': 'application/json'
    }
};

getIpDetails = (default_ip) => {
    let ip_url;
    if (default_ip == undefined) {
        ip_url = `${api_url}${current_version}?apiKey=${secret_api}`
    }
    else {
        ip_url = `${api_url}${current_version}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }

    fetch(ip_url, headers_option)
    .then(results => results.json())
    .then(data => {
        currentIp.innerHTML = data.ip
        currentLocation.innerHTML = data.location.city + " " + data.location.country + " " + data.location.postalCode
        currentZone.innerHTML = data.location.timezone
        currentIsp.innerHTML = data.isp

        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => alert("Oops! Something went wrong"))
}

getIpDetails();

document.addEventListener('load', updateMarker())

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    if (enteredIp.value != ''  && enteredIp.value != null) {
        getIpDetails(enteredIp.value)
        return
    }
    alert("Please enter a valid IP Address")
})