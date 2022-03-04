import React from "react";
import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { Link, Outlet, NavLink } from "react-router-dom";
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

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
        style={{ width: "10%" }}
        direction="column"
        justifyContent="space-around"
      >
        <Typography variant="h1" color="primary" textAlign="center">
          Atlas
        </Typography>
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
            value="/map"
            component={Link}
            to="/map"
          />
          <Tab
            icon={<AssignmentRoundedIcon />}
            iconPosition="start"
            label="Tâches"
            value="/todolist"
            component={Link}
            to="/todolist"
          />
          <Tab
            icon={<TextSnippetRoundedIcon />}
            iconPosition="start"
            label="Informations"
            value="/informations"
            component={Link}
            to="/informations"
          />
          <Tab
            icon={<GroupsRoundedIcon />}
            iconPosition="start"
            label="Membres"
            value="/members"
            component={Link}
            to="/members"
          />

        </Tabs>

        
      </Stack>
      <Stack style={{ width: "100%" }}>
        <Outlet></Outlet>
      </Stack>
      
    </Stack>
  );
};

export default NavigationBar;
