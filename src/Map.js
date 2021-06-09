import React, { Component } from "react";
import { Map as MapG, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",

  height: "100%",
};

class Map extends Component {
  render() {
    const { lat, long } = this.props.latlong;
    return (
      <div>
        <MapG
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: lat,

            lng: long,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </MapG>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBR3c3gbxWs4F-XgiRN2HTi70ow6bXsWvc",
})(Map);
