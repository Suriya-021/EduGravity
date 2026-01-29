import { create } from 'zustand';

interface Coordinates {
    lat: number;
    lng: number;
    zoom: number;
    tilt: number;
}

export const CONTINENTS: Record<string, Coordinates> = {
    asia: { lat: 34.0479, lng: 100.6197, zoom: 3, tilt: 45 },
    africa: { lat: -8.7832, lng: 34.5085, zoom: 3, tilt: 45 },
    north_america: { lat: 54.5260, lng: -105.2551, zoom: 3, tilt: 45 },
    south_america: { lat: -8.7832, lng: -55.4915, zoom: 3, tilt: 45 },
    antarctica: { lat: -82.8628, lng: 135.0000, zoom: 3, tilt: 0 },
    europe: { lat: 54.5260, lng: 15.2551, zoom: 4, tilt: 45 },
    australia: { lat: -25.2744, lng: 133.7751, zoom: 4, tilt: 45 },
    default: { lat: 20, lng: 0, zoom: 2, tilt: 45 }
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
