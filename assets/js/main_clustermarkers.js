/* TO-DO
  1 - consider https://ghybs.github.io/Leaflet.FeatureGroup.SubGroup/examples/subGroup-markercluster-controlLayers-realworld.388.html
  to create layer controls

  2 - create a cluster marker for each state 

  3 - Filtros de busca por código, cidade, estado
*/

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

const publicoIcon = new LeafIcon({ iconUrl: 'assets/img/publico.svg' })
const helipontoIcon = new LeafIcon({ iconUrl: 'assets/img/heliponto.svg' })
const privadoIcon = new LeafIcon({ iconUrl: 'assets/img/privado.svg' })

var markers = L.markerClusterGroup();
    
fetch("files/aerodromos_publicos.json")
.then(response => response.json())
.then(function(data) {

  data.forEach(element => {
    
    const marker = L.marker([element.latitude,element.longitude], {icon: publicoIcon})
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
      
      const marker = L.marker([element.LATGEOPOINT,element.LONGEOPOINT], {icon: privadoIcon})
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
      
      const marker = L.marker([element.latitude,element.longitude], {icon: helipontoIcon})
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