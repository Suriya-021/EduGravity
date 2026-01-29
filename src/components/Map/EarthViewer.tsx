import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const defaultCenter = {
    lat: 20,
    lng: 0
};

const options = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeId: 'satellite',
    tilt: 45,
};

export const EarthViewer: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_KEY_HERE"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const target = useMapStore((state) => state.target);

    React.useEffect(() => {
        if (map) {
            map.panTo({ lat: target.lat, lng: target.lng });
            map.setZoom(target.zoom);
            map.setTilt(target.tilt);
        }
    }, [map, target]);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    <p>Initializing Earth View...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={2}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >
                { /* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
        </div>
    );
}
