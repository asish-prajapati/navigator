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
import RoomIcon from "@material-ui/icons/Room";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import get_location from "./helpers/get_location";
import reverse_geocode from "./helpers/reverse_geocode";

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
  fontColor: {
    color: "white",
    display: "inline",
  },
}));

function App() {
  const classes = useStyles();
  const [latlong, setLatlong] = useState({ lat: "", lng: "" });
  const [open, setOpen] = useState(false);

  const getLocation = async () => {
    let { lat, lng } = await get_location();
    setLatlong({
      lat: lat,
      lng: lng,
    });
  };

  const reverseGeocode = async (lat, lng) => {
    let address_data = await reverse_geocode(lat, lng);
    console.log(address_data);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getLocation();
    reverseGeocode(latlong.lat, latlong.lng);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box className={classes.title}>
            <Button
              onClick={() => toggleDrawer()}
              startIcon={<ArrowDropDownIcon />}
            >
              <Typography variant="subtitle1">
                Your Current Location is : LAT=
                <Typography variant="subtitle1" className={classes.fontColor}>
                  {latlong.lat}
                </Typography>
                , LNG=
                <Typography variant="subtitle1" className={classes.fontColor}>
                  {latlong.lng}
                </Typography>
              </Typography>
            </Button>
          </Box>

          <Typography variant="h4">Navigator</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem>
            <TextField
              color="secondary"
              id="standard-basic"
              label="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RoomIcon color="secondary" />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <div>{latlong.lat !== "" && <Map latlong={latlong} />}</div>
    </div>
  );
}

export default App;
