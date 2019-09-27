import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Map, Marker, Popup } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import Control from 'react-leaflet-control';
import 'leaflet-draw/dist/leaflet.draw.css';

import homeImage from '../images/new zealand.png';

// // Import to a different variable so you don't have to update the rest of your codes
// import MeasureControl from './MeasureControl';

import BaseLayerControl from './BaseLayerControl';
import DrawComponent from './FeatureGroup';

const HomeButton = styled.div`
  background: url (${props => props.backgroundUrl}) no-repeat;
  cursor: pointer;
  height: 50px;
  width: 50px;
  z-index: 100000;
`;

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
          <Control position="topleft">
            {/* <HomeButton
              backgroundUrl={homeImage}
              // type="button"
              onClick={() => {
                const mapNode = this.mapRef.current.leafletElement;
                mapNode.setView([lat, lng], zoom);
              }}
            > */}
            <img
              title="New Zealand"
              style={{
                borderRadius: '25px',
                display: 'inline-block',
                marginBottom: '0',
                cursor: 'pointer',
              }}
              src={homeImage}
              alt="New Zealand"
              height="50px"
              width="50px"
              onClick={() => {
                const mapNode = this.mapRef.current.leafletElement;
                mapNode.setView([lat, lng], zoom);
              }}
            />
            {/* </HomeButton> */}
          </Control>
          {/* <BoxZoomControl position="topright" /> */}
          {/* <MeasureControl
          primaryLengthUnit="meters"
          primaryAreaUnit="sqmeters"
          activeColor="#db4a29"
          completedColor="#9b2d14"
        /> */}

          <DrawComponent />
          <BaseLayerControl position="topright" />
        </Map>
      );
    }
    return null;
  }
}
