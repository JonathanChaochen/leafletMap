import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { TileLayer, LayersControl } from 'react-leaflet';

const mapboxMapStyles = [
  'streets-v11',
  'outdoors-v11',
  'light-v10',
  'dark-v10',
  'satellite-v9',
  'satellite-streets-v11',
  'navigation-preview-day-v4',
  'navigation-preview-night-v4',
  'navigation-guidance-day-v4',
  'navigation-guidance-night-v4',
];

const BaseLayerControl = ({ position = 'topright' }) => (
  <LayersControl position={position}>
    {mapboxMapStyles.map((styleName, index) => {
      return (
        <LayersControl.BaseLayer
          checked={index === 0}
          name={styleName}
          key={styleName}
        >
          <TileLayer
            zoomOffset={-1}
            tileSize={512}
            maxZoom={20}
            maxNativeZoom={19}
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            url={`https://api.mapbox.com/styles/v1/mapbox/${styleName}/tiles/{z}/{x}/{y}{r}?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`}
          />
        </LayersControl.BaseLayer>
      );
    })}

    {/* Esri Satellite Layer */}
    <LayersControl.BaseLayer name="high resolution satellite" key="satellite">
      <TileLayer
        maxZoom={21}
        maxNativeZoom={L.Browser.retina ? 21 : 20}
        detectRetina={true}
        attribution="Tiles &copy; Esri &mdash; Source: Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    </LayersControl.BaseLayer>
  </LayersControl>
);

BaseLayerControl.propTypes = {
  position: PropTypes.string,
};

export default BaseLayerControl;
