import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup, withLeaflet } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
// Import to a different variable so you don't have to update the rest of your codes
import MeasureControlDefault from 'react-leaflet-measure';

// Wrap our new variable and assign it to the one we used before. The rest of the codes stays the same.
const MeasureControl = withLeaflet(MeasureControlDefault);

import BaseLayerControl from './BaseLayerControl';

const measureOptions = {
  position: 'topright',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'acres',
  activeColor: '#db4a29',
  completedColor: '#9b2d14',
};

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    // new zealand coordinates
    this.state = {
      lat: -40.9006,
      lng: 173.486,
      zoom: 5,
    };
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
        >
          <BaseLayerControl />
          <BoxZoomControl position="topright" />
          <MeasureControl
            primaryLengthUnit="meters"
            primaryAreaUnit="sqmeters"
            activeColor="#db4a29"
            completedColor="#9b2d14"
          />
        </Map>
      );
    }
    return null;
  }
}
