import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';

export default function HaulMap({ route }: any) {
  const positions = [[40.0, -75.0], [39.7, -74.8]]; // fallback
  return (
    <div className="h-[400px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
      <MapContainer center={[40, -75]} zoom={10} style={{height: '100%', width: '100%'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={positions} color="#f59e0b" weight={6} />
        <Marker position={[40, -75]} />
        <Marker position={[39.7, -74.8]} />
      </MapContainer>
    </div>
  );
}