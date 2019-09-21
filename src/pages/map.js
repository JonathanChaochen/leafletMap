import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup } from 'react-leaflet';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BaseLayerControl from '../components/BaseLayerControl';

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
        <Layout>
          <SEO title="Map" />
          <Map
            center={position}
            zoom={zoom}
            style={{ width: '100%', height: '500px' }}
            minZoom={5}
            maxZoom={20}
          >
            <BaseLayerControl />
            {/* <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </Map>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    }
    return null;
  }
}
