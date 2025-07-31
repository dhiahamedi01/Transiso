'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const countryCoords: Record<string, [number, number]> = {
  FRA: [46.2276, 2.2137],
  DEU: [51.1657, 10.4515],
  USA: [37.0902, -95.7129],
  TUR: [38.9637, 35.2433],
  EGY: [26.8206, 30.8025],
  AUS: [-25.2744, 133.7751],
};

const regions = {
  europe: ["FRA", "DEU", "TUR"],
  northAmerica: ["USA"],
  africa: ["EGY"],
  australia: ["AUS"],
};

const getRegionColor = (iso: string) => {
  if (regions.europe.includes(iso)) return '#e53935';
  if (regions.northAmerica.includes(iso)) return '#1976d2';
  if (regions.africa.includes(iso)) return '#43a047';
  if (regions.australia.includes(iso)) return '#f57c00';
  return '#757575';
};

const createIcon = (color: string) =>
  L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    "></div>`,
    className: '',
    iconSize: [28, 28],
  });

const FitBounds: React.FC<{ positions: [number, number][] }> = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, positions]);

  return null;
};

const MapLeaflet = () => {
  const positions = Object.values(countryCoords);

  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      center={[20, 0]}
      zoom={2.5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <FitBounds positions={positions} />
      {positions.map((pos, i) => {
        const iso = Object.keys(countryCoords)[i];
        return (
          <Marker
            key={iso}
            position={pos}
            icon={createIcon(getRegionColor(iso))}
          >
            <Popup>{iso}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapLeaflet;
