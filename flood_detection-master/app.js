try {
  // Create the map
  var map = L.map('map').setView([27.7172, 85.3240], 13);

  // Add the tile layer (e.g., OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Define the custom icon for the markers
  var redIcon = L.icon({
    iconUrl: 'marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  var greenIcon = L.icon({
    iconUrl: 'marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Add the marker for the flooded location
  var floodedLocationMarker = L.marker([27.7172, 85.3240], { icon: redIcon }).addTo(map);
  floodedLocationMarker.bindPopup('<b>Flooded Location</b><br>Latitude: 27.7172<br>Longitude: 85.3240').openPopup();
  floodedLocationMarker.on('click', function() {
    map.setView(floodedLocationMarker.getLatLng(), 15);
  });

  // Add a red circle around the flooded location
  var floodedLocationCircle = L.circle([27.7172, 85.3240], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 1000 // Adjust the radius as needed
  }).addTo(map);

  // Add the marker for the nearest safe location
  var safeLocationMarker = L.marker([27.7725, 85.2782], { icon: greenIcon }).addTo(map);
  safeLocationMarker.bindPopup('<b>Nearest Safe Location</b><br>Latitude: 27.7725<br>Longitude: 85.2782').openPopup();
  safeLocationMarker.on('click', function() {
    map.setView(safeLocationMarker.getLatLng(), 15);
  });

  // Add a green circle around the safe location
  var safeLocationCircle = L.circle([27.7725, 85.2782], {
    color: 'green',
    fillColor: '#3f0',
    fillOpacity: 0.3,
    radius: 1000 // Adjust the radius as needed
  }).addTo(map);

  // Draw the route from flooded location to safe location
L.Routing.control({
  waypoints: [
    L.latLng(27.7172, 85.3240), // Flooded location coordinates
    L.latLng(27.7725, 85.2782) // Safe location coordinates
  ],
  routeWhileDragging: true
}).addTo(map);

var floodedLocation = L.latLng(27.7172, 85.3240);
var safeLocation = L.latLng(27.7725, 85.2782);

var distanceInMeters = floodedLocation.distanceTo(safeLocation);
var distanceInKilometers = distanceInMeters / 1000;

console.log("Distance: " + distanceInKilometers + " km");

// Define the OSRM routing service URL
var routingServiceUrl = 'https://router.project-osrm.org/route/v1';

// Calculate the route from the authorities' location to the flooded location
var authoritiesLocation = [27.7211, 85.3206]; // Replace with the actual authorities' location
var floodedLocation = [27.7172, 85.3240]; // Replace with the actual flooded location

// Create a routing control instance
var routingControl = L.Routing.control({
  waypoints: [
    L.latLng(authoritiesLocation[0], authoritiesLocation[1]),
    L.latLng(floodedLocation[0], floodedLocation[1])
  ],
  router: L.Routing.osrmv1({
    serviceUrl: routingServiceUrl
  }),
  routeWhileDragging: true,
  lineOptions: {
    styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
  },
  addWaypoints: false,
  draggableWaypoints: false,
  show: false
}).addTo(map);

// Event handler for route calculation completion
routingControl.on('routesfound', function (e) {
  var routes = e.routes;
  if (routes.length > 0) {
    var route = routes[0];
    var distance = route.summary.totalDistance / 1000; // Convert distance to kilometers
    var duration = route.summary.totalTime / 60; // Convert duration to minutes

    console.log('Route distance:', distance.toFixed(2), 'km');
    console.log('Route duration:', duration.toFixed(2), 'minutes');
    
    // You can display the route on the map if desired
  }
});



} catch (error) {
  console.error('An error occurred:', error);
  // Handle the error or display an error message to the user
}