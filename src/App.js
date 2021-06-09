import React, { useState, useEffect } from "react";
import Map from "./Map";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Geocode from "react-geocode";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 300,
  },
}));

function App() {
  const classes = useStyles();
  const [latlong, setLatlong] = useState({});
  const [open, setOpen] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatlong({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };
  const reverseGeocode = (lat, long) => {
    Geocode.setApiKey("AIzaSyBR3c3gbxWs4F-XgiRN2HTi70ow6bXsWvc");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getLocation();
    reverseGeocode(latlong.lat, latlong.long);
  }, []);
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box className={classes.title}>
            <Button
              onClick={() => toggleDrawer()}
              startIcon={<ArrowDropDownIcon />}
            >
              <Typography variant="subtitle1">
                Your Current Location is :
                {`Lat: ${latlong.lat} , Long: ${latlong.long}`}
              </Typography>
            </Button>
          </Box>

          <Typography variant="h4">Navigator</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <TextField id="standard-basic" label="Search" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <div>{latlong.lat !== "" && <Map latlong={latlong} />}</div>
    </div>
  );
}

export default App;
