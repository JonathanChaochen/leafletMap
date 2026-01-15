import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import {
  MapContainer,
  ScaleControl,
  Circle,
  CircleMarker,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Navigation } from 'styled-icons/material';
import { Spinner } from 'styled-icons/evil';

import BaseLayerControl from './BaseLayerControl';
import LeafletDrawControl from './LeafletDrawControl';

// Styles
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const RotateSpinner = styled(Spinner)`
  animation: ${rotate} 2s linear infinite;
`;

const GreyNavigation = styled(Navigation)`
  color: ${({ active }) => (active ? '#fc8428' : '#555')};
`;

// Position control manually using absolute positioning relative to map container
const ControlButton = styled.div`
  cursor: pointer;
  background: #fff;
  color: black;
  padding: 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-clip: padding-box;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 5px rgba(0,0,0,0.4);

  &:hover {
    color: #333;
    background: #f4f4f4;
  }
`;

function LocateControl({ active, loading, onClick }) {
  const map = useMap();
  const [container] = useState(() => {
    const div = document.createElement('div');
    // Leaflet bar class for consistent styling
    div.className = 'leaflet-control leaflet-bar';
    // Prevent clicks from propagating to the map
    L.DomEvent.disableClickPropagation(div);
    return div;
  });

  useEffect(() => {
    const control = new L.Control({ position: 'topright' });
    control.onAdd = () => container;
    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, container]);

  return createPortal(
    <ControlButton onClick={onClick} title="Locate Me">
      {loading ? <RotateSpinner size="24" /> : <GreyNavigation size="24" active={active} />}
    </ControlButton>,
    container
  );
}



function LocationLogic({ onLocationFound, onLocationError, triggerLocate, setTriggerLocate }) {
  const map = useMap();
  
  useMapEvents({
    locationfound(e) {
      onLocationFound(e);
    },
    locationerror(e) {
      onLocationError(e);
    },
  });

  useEffect(() => {
    if (triggerLocate) {
      map.locate({ setView: true, maxZoom: 17 });
      setTriggerLocate(false);
    }
  }, [triggerLocate, map, setTriggerLocate]);

  return null;
}

export default function MyMap() {
  const [latlng, setLatlng] = useState({ lat: -40.9006, lng: 173.486 });
  const [zoom] = useState(5);
  const [radius, setRadius] = useState(0);
  const [locater, setLocater] = useState(false);
  const [locateLoading, setLocateLoading] = useState(false);
  const [triggerLocate, setTriggerLocate] = useState(false);

  const onLocationFound = (e) => {
    setLatlng(e.latlng);
    setRadius(e.accuracy);
    setLocater(true);
    setLocateLoading(false);
    // Map view updates automatically via locate({setView: true})
  };

  const onLocationError = (e) => {
    setLocateLoading(false);
    setRadius(0);
    console.error("Location error:", e);
    alert("Could not access your location. Please check browser permissions.");
  };

  const handleLocateClick = () => {
    if (locater) {
      setLocater(false);
      setRadius(0);
    } else {
      setLocateLoading(true);
      setTriggerLocate(true);
    }
  };

  // Fix Leaflet icon paths
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
       iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={latlng}
      zoom={zoom}
      maxZoom={20} // Limited max zoom to 20
      scrollWheelZoom={true}
      style={{ width: '100%', height: '100%' }} // Map takes full container
      zoomControl={false}
    >
        <LocationLogic 
            onLocationFound={onLocationFound} 
            onLocationError={onLocationError}
            triggerLocate={triggerLocate}
            setTriggerLocate={setTriggerLocate}
        />

        <LeafletDrawControl />
        <BaseLayerControl position="bottomright" />
        <ScaleControl position="bottomleft" />
        
        <LocateControl 
            active={locater} 
            loading={locateLoading} 
            onClick={handleLocateClick} 
        />
        
        {locater && (
            <Circle
              center={latlng}
              radius={radius}
              pathOptions={{
                  color: "#136AEC",
                  fillColor: "#136AEC",
                  fillOpacity: 0.15,
                  weight: 0
              }}
            >
              <CircleMarker
                center={latlng}
                radius={9}
                pathOptions={{
                    color: "#fff",
                    fillColor: "#2A93EE",
                    fillOpacity: 1,
                    weight: 3,
                    opacity: 1
                }}
              />
            </Circle>
        )}
    </MapContainer>
  );
}
