

// Mapa
const mapCenter = [-18.519074, -49.526367]
const zoom = 6

const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const map = L.map('mapid', {
  center: mapCenter,
  zoom: zoom,
  layers: [mainLayer],
  zoomOffset: -1,
  preferCanvas: true
})

// Icons
const LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'assets/img/shadow.png',
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

var markers = L.markerClusterGroup();
    
fetch("files/aerodromos_publicos.json")
.then(response => response.json())
.then(function(data) {

  data.forEach(element => {
    
    const marker = L.marker([element.latitude,element.longitude], {icon: greenIcon})
    marker.bindPopup(`<strong>${element.OACI} - ${element.Nome} </strong> <br/> \
                      Aeródromo público<br/> ${element.Município}, ${element.UF} <br /> \
                      latitude ${element.latitude}, longitude ${element.longitude} <br /> \
                      Elevação ${element.ALTITUDE} <br /> \
                      Comprimento ${element.COMPRIMENTO} <br /> \
                      Largura ${element.LARGURA} <br /> \
                      Designação ${element.DESIGNAÇÃO}
                      `)

    markers.addLayer(marker);

  });


    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

});
    
fetch("files/aerodromos_privados.json")
  .then(response => response.json())
  .then(function(data) {

    data.forEach(element => {
      
      const marker = L.marker([element.LATGEOPOINT,element.LONGEOPOINT], {icon: yellowIcon})
      marker.bindPopup(` <strong>${element.OACI} - ${element.Nome} </strong> <br/>Aeródromo privado <br/> ${element.Município}, ${element.UF} <br />latitude ${element.LATGEOPOINT}, longitude ${element.LONGEOPOINT}`)

      markers.addLayer(marker);

    });


    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

  });

  fetch("files/helipontos.json")
  .then(response => response.json())
  .then(function(data) {

    data.forEach(element => {
      
      const marker = L.marker([element.latitude,element.longitude], {icon: blueIcon})
      marker.bindPopup(` <strong>${element.OACI} - ${element.Nome} </strong> <br/> \
                        Heliponto <br/> ${element.Município}, ${element.UF} <br /> \
                        latitude ${element.latitude}, longitude ${element.longitude} <br /> \
                        Tipo: ${element.Tipo} <br /> \
                        Formato: ${element.formato} <br/> \
                        Dimensões: ${element.Dimensões}
                        `)

      markers.addLayer(marker);

    });
  
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

  });