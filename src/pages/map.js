import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: -39.006,
      lng: 174.886,
      zoom: 10,
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
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.takiwa.co/osm_tiles/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
          <Link to="/page-2/">Go to page 2</Link>
          <Link to="/map/">Go to page map</Link>
          <Link to="/not/">Go to page not</Link>
        </Layout>
      );
    }
    return null;
  }
}
