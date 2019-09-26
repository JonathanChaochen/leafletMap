import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup } from 'react-leaflet';
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
  }

  render() {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    if (typeof window !== 'undefined') {
      return (
        <Map
          center={position}
          zoom={zoom}
          style={{ width: '100%', height: '100vh' }}
          minZoom={3}
          maxZoom={20}
        >
          <BaseLayerControl />
        </Map>
      );
    }
    return null;
  }
}
