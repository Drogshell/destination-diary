import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useURLposition } from "../hooks/useURLposition.js";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([-37, 144]);
  const [mapLat, mapLng] = useURLposition();
  const {
    isLoading: isLoadingPos,
    position: geoPos,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geoPos) {
        setMapPosition([geoPos.lat, geoPos.lng]);
      }
    },
    [geoPos],
  );

  return (
    <div className={styles.mapContainer}>
      {!geoPos && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPos ? "...Loading" : "Get your current position"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={12} className={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span className="flag-emoji">{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ZipToCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ZipToCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
