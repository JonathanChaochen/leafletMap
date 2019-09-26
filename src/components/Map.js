import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup, withLeaflet } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
// Import to a different variable so you don't have to update the rest of your codes
import MeasureControlDefault from 'react-leaflet-measure';

import Control from 'react-leaflet-control';

import BaseLayerControl from './BaseLayerControl';

// Wrap our new variable and assign it to the one we used before. The rest of the codes stays the same.
const MeasureControl = withLeaflet(MeasureControlDefault);

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
