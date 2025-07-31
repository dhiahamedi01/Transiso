import React from 'react';
import { Card, CardContent } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';

// URLs des icônes personnalisées (tu peux remplacer par tes propres images PNG)
const omanIconUrl = '/img/Marker.png';
const turkeyIconUrl = '/img/Marker.png';
const yemenIconUrl = '/img/Marker.png';

// Création des icônes Leaflet personnalisées
const createIcon = (iconUrl: string) =>
  new L.Icon({
    iconUrl,
    iconSize: [40, 40],     // taille plus grande
    iconAnchor: [25, 40],   // point ancré au centre bas de l'icône
    popupAnchor: [0, -40],
    shadowUrl: undefined,
  });

const omanIcon = createIcon(omanIconUrl);
const turkeyIcon = createIcon(turkeyIconUrl);
const yemenIcon = createIcon(yemenIconUrl);

// Typage des markers
const markers: { position: LatLngTuple; name: string; icon: L.Icon }[] = [
  { position: [23.5859, 58.4059], name: 'Oman', icon: omanIcon },
  { position: [39.9334, 32.8597], name: 'Turquie', icon: turkeyIcon },
  { position: [15.5527, 48.5164], name: 'Yémen', icon: yemenIcon },
];

export default function ShippingMap() {
  // Centre plus large pour inclure tous les pays
  const center: LatLngTuple = [25, 45];

  return (
    <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 900, height: 500, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, padding: 0 }}>
          <MapContainer center={center} zoom={3} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map(({ position, name, icon }) => (
              <Marker key={name} position={position} icon={icon}>
                <Popup>{name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
}
