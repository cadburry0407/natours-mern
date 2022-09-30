import React, { useEffect } from 'react';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: require('../../img/pin.png'),
  iconSize: [35, 55],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

const Map = (props) => {
  const { startLocation, locations } = props.locations;

  useEffect(() => {
    const container = L.DomUtil.get('map');

    if (container != null) {
      container._leaflet_id = null;
    }
    const map = L.map('map', {
      closePopupOnClick: false,
      zoomControl: false,
    }).setView([startLocation.coordinates[1], startLocation.coordinates[0]], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    locations.map((loc) => {
      return L.marker([loc.coordinates[1], loc.coordinates[0]], {
        icon: markerIcon,
      })
        .addTo(map)
        .bindPopup(`Day ${loc.day}: ${loc.description}`, {
          autoClose: false,
          closeOnClick: false,
        })
        .openPopup();
    });
  });

  return (
    <>
      <section className="section-map">
        <div id="map"></div>
      </section>
    </>
  );
};

export default Map;
