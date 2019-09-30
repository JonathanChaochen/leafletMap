import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import L from 'leaflet';
import { Map, Marker, Popup, Circle, ScaleControl } from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import Control from 'react-leaflet-control';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Navigation } from 'styled-icons/material/Navigation';
import { Spinner } from 'styled-icons/evil/Spinner';

import homeImage from '../images/new zealand.png';

import BaseLayerControl from './BaseLayerControl';
import DrawComponent from './FeatureGroup';

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RotateSpinner = styled(Spinner)`
  animation: ${rotate} 2s linear infinite;
`;

const GreyNavigation = styled(Navigation)`
  color: ${({ active }) => (active ? '#444' : '#666')};
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
      locater: false, // if locate have result.
      locateLoading: false,
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
    const radius = e.accuracy / 2;
    this.setState({
      latlng: e.latlng,
      radius,
      locater: true,
      zoom: 16,
      locateLoading: false,
    });

    // L.marker(e.latlng)
    //   .addTo(mapNode)
    //   .bindPopup(`You are within ${radius} meters from this point`)
    //   .openPopup();

    // L.circle(e.latlng, radius).addTo(mapNode);
  };

  onLocationError = e => {
    this.setState({ locateLoading: false });
    // console.log('TCL: MyMap -> onLocationError -> e', e);
  };
  /* ---------------------------------------- */

  locate = () => {
    const mapNode = this.mapRef.current.leafletElement;

    const { locater } = this.state;

    // remove locater and loading
    if (locater) {
      this.setState({ locater: false });
    } else {
      // start locate process by setting loading and trigger locate
      this.setState({ locateLoading: true });
      mapNode.locate({ setView: true, maxZoom: 16 });
    }
  };

  render() {
    const { zoom, latlng, radius, locater, locateLoading } = this.state;
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
            <ControlButton>
              {locateLoading ? (
                <RotateSpinner size="32" />
              ) : (
                <GreyNavigation
                  size="32"
                  title="Locate"
                  active={locater}
                  onClick={this.locate}
                />
              )}
            </ControlButton>
          </Control>

          <DrawComponent />
          <BaseLayerControl position="topright" />

          {locater && (
            <Marker position={latlng}>
              <Popup>{`You are within ${radius} meters from this point`}</Popup>
            </Marker>
          )}

          <ScaleControl position="bottomleft" />
        </Map>
      );
    }
    return null;
  }
}
