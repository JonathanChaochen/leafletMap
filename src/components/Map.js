import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import L from 'leaflet';
import {
  Map,
  Marker,
  Popup,
  Circle,
  ScaleControl,
  CircleMarker,
} from 'react-leaflet';
import { BoxZoomControl } from 'react-leaflet-box-zoom';
import Control from 'react-leaflet-control';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Navigation } from 'styled-icons/material/Navigation';
import { Spinner } from 'styled-icons/evil/Spinner';

import BaseLayerControl from './BaseLayerControl';
import DrawComponent from './LeafletDrawControl';

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
  color: ${({ active }) => (active ? '#fc8428' : '#555')};
`;

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
    const radius = e.accuracy;
    this.setState({
      latlng: e.latlng,
      radius,
      locater: true,
      zoom: 17,
      locateLoading: false,
    });
  };

  onLocationError = e => {
    this.setState({ locateLoading: false, radius: 0 });
    // console.log('TCL: MyMap -> onLocationError -> e', e);
  };
  /* ---------------------------------------- */

  locate = () => {
    const mapNode = this.mapRef.current.leafletElement;

    const { locater } = this.state;

    // remove locater and loading
    if (locater) {
      this.setState({ locater: false, radius: 0 });
    } else {
      // start locate process by setting loading and trigger locate
      this.setState({ locateLoading: true });
      mapNode.locate({ setView: true, maxZoom: 17 });
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

          {locater && (
            <Circle
              center={latlng}
              radius={radius}
              color="#136AEC"
              fillColor="#136AEC"
              fillOpacity={0.15}
              weight={0}
            >
              <CircleMarker
                center={latlng}
                radius={9}
                color="#fff"
                fillColor="#2A93EE"
                fillOpacity={1}
                weight={3}
                opacity={1}
              />
            </Circle>
          )}

          <BaseLayerControl position="bottomright" />
          <ScaleControl position="bottomleft" />
        </Map>
      );
    }
    return null;
  }
}
