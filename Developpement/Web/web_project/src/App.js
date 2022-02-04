import React from "react";
import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Map } from "./components/Map";
import {
  Box,
  Container,
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ThemeConfig>
        <GlobalStyles />
        <Stack
          direction="row"
          alignItems="stretch"
          divider={<Divider orientation="vertical" flexItem />}
          style={{ height: "100%", width: "100%" }}
        >
          <Stack direction="column" justifyContent="space-around">
            <Typography variant="h2">Atlas</Typography>
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
              />
              <Tab
                icon={<CommuteRoundedIcon />}
                iconPosition="start"
                label="Voyage"
              />
              <Tab
                icon={<SettingsRoundedIcon />}
                iconPosition="start"
                label="Options "
              />
            </Tabs>
          </Stack>
          <Stack style={{ width: '100%' }}>
            <Map></Map>
          </Stack>
        </Stack>
      </ThemeConfig>
    </>
  );
}

export default App;
