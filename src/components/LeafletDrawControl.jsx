import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function LeafletDrawControl() {
  const map = useMap();

  useEffect(() => {
    // Create the FeatureGroup to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    const drawControl = new L.Control.Draw({
      position: 'topleft', // Match legacy default
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        rectangle: false, // Match legacy config
        circle: true,
        marker: true,
        polygon: true,
        polyline: true,
        circlemarker: true
      }
    });

    map.addControl(drawControl);

    // Event listeners
    const onCreated = (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
    };

    map.on(L.Draw.Event.CREATED, onCreated);

    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      map.off(L.Draw.Event.CREATED, onCreated);
    };
  }, [map]);

  return null;
}
