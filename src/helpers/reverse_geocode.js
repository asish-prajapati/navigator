const reverse_geocode = async (lat, lng) => {
  console.log(lat, lng);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBR3c3gbxWs4F-XgiRN2HTi70ow6bXsWvc`
  );
  const data = response.json();
  return data;
};

export default reverse_geocode;
