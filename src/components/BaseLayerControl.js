// provide control for change base layer

import React from 'react';
import L from 'leaflet';
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

// add additional arcgis satellite layer. This layer has zoom level up to 21 in new Zealand area. more clear detail and update to recent years

const BaseLayerControl = () => (
  <LayersControl position="topright">
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
            attribution={
              "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
            }
            url={`https://api.mapbox.com/styles/v1/mapbox/${styleName}/tiles/{z}/{x}/{y}{r}?access_token=pk.eyJ1IjoiY2hhb2NoZW4iLCJhIjoiY2p3c2xqYW1pMDNxZzRibHlodjFuMmQwbiJ9.ntibxY-is20Rz4GMgA1Jww`}
          />
        </LayersControl.BaseLayer>
      );
    })}

    {/* This tiles just have 256 px * 256 px size image not like mapbox one above. I set detectRetina to true and maxZoom level needs to + 1 on retina */}
    <LayersControl.BaseLayer name="satellite" key="satellite">
      <TileLayer
        maxZoom={L.Browser.retina ? 21 : 20}
        detectRetina
        attribution={'Tiles &copy; Esri &mdash; Source: Esri'}
        url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    </LayersControl.BaseLayer>
  </LayersControl>
);

export default BaseLayerControl;
