import React from "react";
import { Map } from "../components/Map";
import NavigationBar from "./../components/NavigationBar";
import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

const Itinerary = () => {
  return (
    <>
      <Stack direction="row"></Stack>
      <Map></Map>
    </>
  );
};

export default Itinerary;
