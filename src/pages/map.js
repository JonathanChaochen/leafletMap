import React, { Component } from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

export default class MyMap extends Component {
  state = {
    lat: -39.006,
    lng: 174.886,
    zoom: 10,
  }
  render() {
    // const { options } = this.props
    const position = [this.state.lat, this.state.lng]

    if (typeof window !== "undefined") {
      return (
        // <div>123</div>
        <Map
          center={position}
          zoom={this.state.zoom}
          style={{ width: "800px", height: "600px" }}
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
      )
    }
    return null
  }
}
