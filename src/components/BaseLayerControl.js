// provide control for change base layer

import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';

export const mapboxMapStyles = [
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

const BaseLayerControl = () => (
  <LayersControl position="topright">
    {mapboxMapStyles.map((styleName, index) => {
      return (
        <LayersControl.BaseLayer checked={index === 0} name={styleName}>
          <TileLayer
            attribution={
              "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            }
            url={`https://api.mapbox.com/styles/v1/mapbox/${styleName}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhb2NoZW4iLCJhIjoiY2p3c2xqYW1pMDNxZzRibHlodjFuMmQwbiJ9.ntibxY-is20Rz4GMgA1Jww`}
            zoomOffset={-1} 
          />
        </LayersControl.BaseLayer>
      );
    })}
  </LayersControl>
);

export default BaseLayerControl;
