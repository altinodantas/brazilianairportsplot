// Mapa
const mapCenter = [-18.519074, -49.526367]
const zoom = 6

const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const layerPublicAirport = L.layerGroup([])
const layerPrivateAirport = L.layerGroup([])
const layerHelipoints = L.layerGroup([])

const map = L.map('mapid', {
  center: mapCenter,
  zoom: zoom,
  layers: [mainLayer, layerPublicAirport, layerPrivateAirport, layerHelipoints],
  zoomOffset: -1,
  preferCanvas: true
})

var baseMaps = {
}

var overlayMaps = {
  'Aeroportos Públicos': layerPublicAirport,
  'Aeroportos Privados': layerPrivateAirport,
  'Helipontos': layerHelipoints
}

L.control.layers(baseMaps, overlayMaps).addTo(map)

// Icons
const LeafIcon = L.Icon.extend({
  options: {
    // shadowUrl: 'assets/img/shadow.png',
    iconSize: [22, 35], // size of the icon
    shadowSize: [46, 12], // size of the shadow
    iconAnchor: [11, 34], // point of the icon which will correspond to marker's location
    shadowAnchor: [18, 9], // the same for the shadow
    popupAnchor: [0, -35] // point from which the popup should open relative to the iconAnchor
  }
})

const greenIcon = new LeafIcon({ iconUrl: 'assets/img/green.svg' })
const redIcon = new LeafIcon({ iconUrl: 'assets/img/red.svg' })
const yellowIcon = new LeafIcon({ iconUrl: 'assets/img/yellow.svg' })
const blueIcon = new LeafIcon({ iconUrl: 'assets/img/azul.svg' })
    
fetch("files/aerodromos_publicos.json")
.then(response => response.json())
.then(function(data) {
  
  const vector_markers = []
  layerPublicAirport.clearLayers()

  data.forEach(element => {
    
    const marker = L.marker([element.latitude,element.longitude], {icon: greenIcon})
    marker.bindPopup(` <strong>${element.OACI} - ${element.NOME} </strong> <br/> ${element.MUNICÍPIO}, ${element.UF}`)

    layerPublicAirport.addLayer(marker)

    vector_markers.push(marker)

  });

  if (vector_markers.length > 0) {
      var group = new L.featureGroup(vector_markers)
      map.fitBounds(group.getBounds())
    }

});
    
fetch("files/aerodromos_privados.json")
  .then(response => response.json())
  .then(function(data) {
    
    const vector_markers = []
    layerPrivateAirport.clearLayers()

    data.forEach(element => {
      
      const marker = L.marker([element.LATGEOPOINT,element.LONGEOPOINT], {icon: yellowIcon})
      marker.bindPopup(` <strong>${element.OACI} - ${element.Nome} </strong> <br/> ${element.Município}, ${element.UF}`)

      layerPrivateAirport.addLayer(marker)

      vector_markers.push(marker)

    });

  });

  fetch("files/helipontos.json")
  .then(response => response.json())
  .then(function(data) {
    
    const vector_markers = []
    layerHelipoints.clearLayers()

    data.forEach(element => {
      
      const marker = L.marker([element.LATGEOPOINT,element.LONGEOPOINT], {icon: blueIcon})
      marker.bindPopup(` <strong>${element.OACI} - ${element.Nome} </strong> <br/> ${element.Município}, ${element.UF}`)

      layerHelipoints.addLayer(marker)

      vector_markers.push(marker)

    });

  });