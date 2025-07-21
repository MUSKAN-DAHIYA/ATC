// Initialize the map
const map = L.map('map', {
  center: [40.7128, -74.0060], // New York
  zoom: 4,
  zoomControl: false
});

// Add dark-themed tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Define flight path coordinates
const pathCoords = [
  [40.7128, -74.0060],  // New York
  [41.8781, -87.6298],  // Chicago
  [39.7392, -104.9903], // Denver
  [34.0522, -118.2437]  // Los Angeles
];

// Create animated polyline using SnakeAnim
const flightPath = L.polyline(pathCoords, {
  color: '#00ccff',
  weight: 4,
  opacity: 0.8,
  className: 'animated-path'
}).addTo(map);

flightPath.snakeIn();

// Add an animated airplane marker (optional)
const planeIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Animate plane along the path
const animatedPlane = L.animatedMarker(
  L.polyline(pathCoords).getLatLngs(), {
    icon: planeIcon,
    autoStart: true,
    distance: 300,
    interval: 100
  }
).addTo(map);
document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([20.5937, 78.9629], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  async function fetchFlights() {
    try {
      const response = await fetch('https://corsproxy.io/?https://opensky-network.org/api/states/all');
      const data = await response.json();

      if (window.flightMarkers) {
        window.flightMarkers.forEach(marker => map.removeLayer(marker));
      }

      window.flightMarkers = [];

      const flights = data.states;
      flights.forEach(flight => {
        const callsign = flight[1];
        const lat = flight[6];
        const lon = flight[5];

        if (lat && lon) {
          const marker = L.marker([lat, lon]).addTo(map)
            .bindPopup(`<strong>Callsign:</strong> ${callsign || 'Unknown'}`);
          window.flightMarkers.push(marker);
        }
      });
    } catch (err) {
      console.error('Flight data error:', err);
    }
  }

  fetchFlights();
  setInterval(fetchFlights, 10000);
});

// Auto-hide alert after 7 seconds
setTimeout(() => {
  const warning = document.getElementById("conflictWarningBox");
  if (warning) {
    warning.style.display = "none";
  }
}, 7000);
const url = `https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2090&units=metric&appid=YOUR_API_KEY`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("Weather in India (Delhi):", data);
    document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°C`;
  });








