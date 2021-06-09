import React from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";

const Marker = () => (
  <div>
    <RoomIcon color="secondary" style={{ fontSize: 40 }} />
  </div>
);

const Map = (props) => {
  const { lat, lng } = props.latlong;
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBR3c3gbxWs4F-XgiRN2HTi70ow6bXsWvc" }}
        defaultCenter={props.latlong}
        defaultZoom={11}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
