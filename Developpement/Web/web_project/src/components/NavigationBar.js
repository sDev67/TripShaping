import React from "react";
import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  IconButton,
  Avatar,
} from "@mui/material";


import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import { Link, Outlet, NavLink } from "react-router-dom";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { stringAvatar } from "../utils/AvatarColorPicker";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';

const NavigationBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      direction="row"
      alignItems="stretch"
      divider={<Divider orientation="vertical" flexItem />}
      style={{ height: "100%", width: "100%" }}
    >
      <Stack
        style={{ width: "15%" }}
        direction="column"
        justifyContent="space-between"
      >
        
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            style={{marginTop:"50px"}}
          >
            <img
              src={require("../assets/globe-terrestre.png")}
              width="64px"
              height="64px"
            ></img>
            <Typography variant="h1" color="primary" textAlign="center">
              Atlas
            </Typography>
          </Stack>
          
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
            paddingLeft={3}
          >
            <IconButton component={Link} to="/mytrips">
              <ArrowCircleLeftRoundedIcon
                color="primary"
                sx={{ fontSize: "35px" }}
              />
            </IconButton>
            <Typography variant="h5" color="primary" textAlign="center">
              Voyage Paris
            </Typography>
          </Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              icon={<MapRoundedIcon />}
              iconPosition="start"
              label="Carte"
              value="/trip/map"
              component={Link}
              to="/trip/map"
            />
            <Tab
              icon={<DirectionsWalkRoundedIcon />}
              iconPosition="start"
              label="Etapes"
              value="/trip/steps"
              component={Link}
              to="/trip/steps"
            />
            <Tab
              icon={<AssignmentRoundedIcon />}
              iconPosition="start"
              label="Tâches"
              value="/trip/todolist"
              component={Link}
              to="/trip/todolist"
            />
            <Tab
              icon={<TextSnippetRoundedIcon />}
              iconPosition="start"
              label="Informations"
              value="/trip/informations"
              component={Link}
              to="/trip/informations"
            />
            <Tab
              icon={<GroupsRoundedIcon />}
              iconPosition="start"
              label="Membres"
              value="/trip/members"
              component={Link}
              to="/trip/members"
            />
          </Tabs>
        

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          marginBottom={3}
        >
          <Avatar {...stringAvatar("Lara Croft")} />
          <Typography variant="h6" textAlign="center">
            Lara Croft
          </Typography>
          <IconButton>
            <SettingsRoundedIcon sx={{ fontSize: "35px" }} />
          </IconButton>
        </Stack>
      </Stack>

      <Stack style={{ width: "100%" }}>
        <Outlet></Outlet>
      </Stack>
    </Stack>
  );
};

export default NavigationBar;
