import React from 'react';
import { Viewer, CameraFlyTo, ImageryLayer } from 'resium';
import { Cartesian3, Math as CesiumMath, UrlTemplateImageryProvider } from 'cesium';
import { useMapStore } from '../../store/useMapStore';

// Cesium CSS is handled by vite-plugin-cesium or can be imported if needed
// import "cesium/Build/Cesium/Widgets/widgets.css";

export const EarthViewer: React.FC = () => {
    const apiKey = import.meta.env.VITE_STADIA_MAPS_API_KEY;
    const target = useMapStore((state) => state.target);

    if (!apiKey) {
        return <div className="text-white flex items-center justify-center h-screen bg-neutral-900">Map Key Missing</div>;
    }

    // Create the imagery provider for Stadia
    const imageryProvider = new UrlTemplateImageryProvider({
        url: `https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}.jpg?api_key=${apiKey}`,
        credit: 'Stadia Maps',
        maximumLevel: 20,
    });

    return (
        <div className="absolute inset-0 z-0 bg-black">
            <Viewer
                full
                timeline={false}
                animation={false}
                baseLayerPicker={false}
                geocoder={false}
                homeButton={false}
                navigationHelpButton={false}
                sceneModePicker={false}
                selectionIndicator={false}
                infoBox={false}
                // High DPI Fixes
                useDefaultRenderLoop={true}
                resolutionScale={window.devicePixelRatio}
                contextOptions={{
                    webgl: {
                        alpha: true,
                        antialias: true,
                        preserveDrawingBuffer: true
                    }
                }}
            >
                {/* Stadia Maps Layer */}
                <ImageryLayer imageryProvider={imageryProvider} />

                {/* Camera Controller */}
                <CameraFlyTo
                    destination={Cartesian3.fromDegrees(target.lng, target.lat, target.height)}
                    orientation={{
                        heading: CesiumMath.toRadians(target.heading),
                        pitch: CesiumMath.toRadians(target.pitch),
                        roll: 0
                    }}
                    duration={3} // smooth flight
                />
            </Viewer>
        </div>
    );
};
