import React, { Component } from 'react';
import { Link } from 'gatsby';
import { Map, Marker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';
import styled from 'styled-components';
import Fullscreen from 'react-full-screen';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BaseLayerControl from '../components/BaseLayerControl';

const StyledMapPage = styled.div`
  height: 80vh;
  .fullscreen-enabled & {
    height: 100vh;
  }
`;
StyledMapPage.displayName = 'StyledMapPage';

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    // new zealand coordinates
    this.state = {
      lat: -40.9006,
      lng: 173.486,
      zoom: 5,
      isFull: false,
    };
  }

  toggleFullScreen = () => {
    const { isFull } = this.state;
    this.setState({ isFull: !isFull });
  };

  render() {
    const { lat, lng, zoom, isFull } = this.state;
    const position = [lat, lng];

    if (typeof window !== 'undefined') {
      return (
        <Layout>
          <SEO title="Map" />

          <Fullscreen
            enabled={isFull}
            onChange={f => this.setState({ isFull: f })}
          >
            <StyledMapPage>
              <Map
                center={position}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
                minZoom={4}
                maxZoom={20}
              >
                <Control position="bottomleft">
                  <button type="button" onClick={this.toggleFullScreen}>
                    Fullscreen
                  </button>
                </Control>

                <BaseLayerControl />
                {/* <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
              </Map>
            </StyledMapPage>
          </Fullscreen>
          <Link to="/">Go back to the homepage</Link>
        </Layout>
      );
    }
    return null;
  }
}
