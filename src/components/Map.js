import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import L from 'leaflet';
import { Map, Marker, Popup, Circle } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import Control from 'react-leaflet-control';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Navigation } from 'styled-icons/material/Navigation';

import homeImage from '../images/new zealand.png';

import BaseLayerControl from './BaseLayerControl';
import DrawComponent from './FeatureGroup';

const GreyNavigation = styled(Navigation)`
  color: ${({ active }) => (active ? '#444' : '#bbb')};
`;

// const HomeButton = styled.div`
//   background: url (${props => props.backgroundUrl}) no-repeat;
//   cursor: pointer;
//   height: 50px;
//   width: 50px;
//   z-index: 100000;
// `;

const ControlButton = styled.div`
  cursor: pointer;
  background: #fff;
  color: black;
  padding: 6px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-clip: padding-box;
  &:hover {
    color: #333;
    background: #f4f4f4;
    background-clip: padding-box;
  }
`;

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    // new zealand coordinates
    this.state = {
      latlng: { lat: -40.9006, lng: 173.486 },
      lat: -40.9006,
      lng: 173.486,
      zoom: 5,
      radius: 0,
      locater: false,
    };

    this.mapRef = React.createRef(null);
  }

  /**
   *  add listener to map
   */
  componentDidMount() {
    // listen to location event from map element
    this.mapRef.current.leafletElement.on(
      'locationfound',
      this.onLocationFound
    );
    this.mapRef.current.leafletElement.on(
      'locationerror',
      this.onLocationError
    );
  }

  /**
   *  remove listener from map
   */
  componentWillUnmount() {
    this.mapRef.current.leafletElement.off(
      'locationfound',
      this.onLocationFound
    );
    this.mapRef.current.leafletElement.off(
      'locationerror',
      this.onLocationError
    );
  }

  /* ------------on location method---------- */
  onLocationFound = e => {
    // console.log('TCL: MyMap -> onLocationFound -> e', e);
    // const mapNode = this.mapRef.current.leafletElement;
    const radius = e.accuracy / 2;

    this.setState({ latlng: e.latlng, radius, locater: true, zoom: 16 });
    // L.marker(e.latlng)
    //   .addTo(mapNode)
    //   .bindPopup(`You are within ${radius} meters from this point`)
    //   .openPopup();

    // L.circle(e.latlng, radius).addTo(mapNode);
  };

  onLocationError = e => {
    console.log('TCL: MyMap -> onLocationError -> e', e);
  };
  /* ---------------------------------------- */

  locate = () => {
    const mapNode = this.mapRef.current.leafletElement;
    const { locater } = this.state;
    if (locater) {
      this.setState({ locater: false });
    } else {
      mapNode.locate({ setView: true, maxZoom: 16 });
    }
  };

  render() {
    const { lat, lng, zoom, latlng, radius, locater } = this.state;
    // const position = [lat, lng];

    if (typeof window !== 'undefined') {
      return (
        <Map
          center={latlng}
          zoomControl={false}
          zoom={zoom}
          style={{ width: '100%', height: '100vh' }}
          minZoom={3}
          maxZoom={20}
          ref={this.mapRef}
        >
          {/* <Control position="topleft"> */}
          {/* <HomeButton
              backgroundUrl={homeImage}
              // type="button"
              onClick={() => {
                const mapNode = this.mapRef.current.leafletElement;
                mapNode.setView([lat, lng], zoom);
              }}
            > */}
          {/* <img
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
            /> */}
          {/* </HomeButton> */}
          {/* </Control> */}
          {/* <BoxZoomControl position="topright" /> */}
          {/* <MeasureControl
          primaryLengthUnit="meters"
          primaryAreaUnit="sqmeters"
          activeColor="#db4a29"
          completedColor="#9b2d14"
        /> */}

          <Control position="topright">
            <ControlButton onClick={this.locate}>
              <GreyNavigation size="32" title="Locate" active={locater} />
            </ControlButton>
          </Control>

          {/* <Control position="topright">
            <button
              type="button"
              style={{ padding: '6px' }}
              onClick={() => setInterval(this.locate, 2000)}
            >
              Navigation
            </button>
          </Control> */}

          <DrawComponent />
          <BaseLayerControl position="topright" />

          {locater && (
            <Marker position={latlng}>
              <Popup>{`You are within ${radius} meters from this point`}</Popup>
            </Marker>
          )}
        </Map>
      );
    }
    return null;
  }
}
