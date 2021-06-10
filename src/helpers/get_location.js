const get_location = () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latlong = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      resolve(latlong);
    });
  });
};

export default get_location;
