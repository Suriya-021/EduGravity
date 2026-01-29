import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useMapStore } from '../../store/useMapStore';
import 'leaflet/dist/leaflet.css';

// Controller component to handle programmatic navigation
const MapController = () => {
    const map = useMap();
    const target = useMapStore((state) => state.target);

    useEffect(() => {
        if (target) {
            // Leaflet zoom levels are generally different from Google Maps
            // Google Maps used Zoom 2 for world, Leaflet might need Zoom 3 or 4
            // We'll stick to store values for now but might need adjustment
            map.flyTo([target.lat, target.lng], target.zoom, {
                duration: 2 // Animation duration in seconds
            });
        }
    }, [target, map]);

    return null;
};

export const EarthViewer: React.FC = () => {
    const apiKey = import.meta.env.VITE_STADIA_MAPS_API_KEY;

    if (!apiKey) {
        return <div className="text-white flex items-center justify-center h-screen bg-neutral-900">Map Key Missing</div>;
    }

    return (
        <div className="absolute inset-0 z-0 bg-neutral-900">
            <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100vh', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url={`https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg?api_key=${apiKey}`}
                    maxZoom={20}
                />
                <MapController />
            </MapContainer>
        </div>
    );
}
