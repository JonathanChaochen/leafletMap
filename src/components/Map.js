import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup, withLeaflet } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import Control from 'react-leaflet-control';

import MeasureControl from './MeasureControl';

import BaseLayerControl from './BaseLayerControl';

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    // new zealand coordinates
    this.state = {
      lat: -40.9006,
      lng: 173.486,
      zoom: 5,
    };

    this.mapRef = React.createRef();
  }

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    if (typeof window !== 'undefined') {
      return (
        <Map
          center={position}
          zoomControl={false}
          zoom={zoom}
          style={{ width: '100%', height: '100vh' }}
          minZoom={3}
          maxZoom={20}
          ref={this.mapRef}
        >
          <BaseLayerControl />
          <BoxZoomControl position="topright" />
          <MeasureControl
            primaryLengthUnit="meters"
            primaryAreaUnit="sqmeters"
            activeColor="#db4a29"
            completedColor="#9b2d14"
          />

          <Control position="bottomleft">
            <button
              type="button"
              onClick={() => {
                const mapNode = this.mapRef.current.leafletElement;
                mapNode.setView([lat, lng], zoom);
              }}
            >
              New Zealand
            </button>
          </Control>
        </Map>
      );
    }
    return null;
  }
}
