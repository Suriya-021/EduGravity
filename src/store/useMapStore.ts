import { create } from 'zustand';

interface Coordinates {
    lat: number;
    lng: number;
    height: number; // Height in meters above ellipsoid
    heading: number; // Rotation
    pitch: number; // Tilt
}

export const CONTINENTS: Record<string, Coordinates> = {
    asia: { lat: 34.0479, lng: 100.6197, height: 10000000, heading: 0, pitch: -90 },
    africa: { lat: -8.7832, lng: 34.5085, height: 10000000, heading: 0, pitch: -90 },
    north_america: { lat: 54.5260, lng: -105.2551, height: 10000000, heading: 0, pitch: -90 },
    south_america: { lat: -8.7832, lng: -55.4915, height: 10000000, heading: 0, pitch: -90 },
    antarctica: { lat: -82.8628, lng: 135.0000, height: 5000000, heading: 0, pitch: -45 },
    europe: { lat: 54.5260, lng: 15.2551, height: 5000000, heading: 0, pitch: -60 },
    australia: { lat: -25.2744, lng: 133.7751, height: 5000000, heading: 0, pitch: -60 },
    default: { lat: 20, lng: 0, height: 20000000, heading: 0, pitch: -90 }
};

interface MapState {
    target: Coordinates;
    flyTo: (location: Coordinates) => void;
    flyToContinent: (name: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
    target: CONTINENTS.default,
    flyTo: (location) => set({ target: location }),
    flyToContinent: (name) => {
        const key = name.toLowerCase().replace(' ', '_');
        const target = CONTINENTS[key] || CONTINENTS.default;
        set({ target });
    }
}));
