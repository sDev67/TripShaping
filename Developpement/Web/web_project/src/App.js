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
  TextField, 
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Switch

} from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function App() {
  const [value, setValue] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [label, setLabel] = React.useState("Navigation");

  const [valueNavMode, setValueNavMode] = React.useState("all");

  const handleChangeSelectModeNav = (event) => {
    setValueNavMode(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  


  const handleChangeOnOff = (event) => {
    setSuccess(event.target.checked);
    if(!success){
      setLabel("Edition")
      setValueNavMode("all");

    }
    else{
      setLabel("Navigation")
    }
    
  }
  


  return (
    <>
      <ThemeConfig>
        <GlobalStyles />
        <Stack
          direction="row"
          alignItems="stretch"
          divider={<Divider orientation="vertical" flexItem />}
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
        
            <FormControlLabel
              value={label}
              control={<Switch color="primary" />}
              label={label}
              labelPlacement="bottom"
              onChange={handleChangeOnOff}
              checked={success}
            />          
        
          </Stack>
        
          <Stack>
            <Map 
              choice = {success} 
              pointToDisplay = {valueNavMode}
              labelChoice = {label}
              handleChangeSelectModeNav = {handleChangeSelectModeNav}>
            </Map>
          </Stack>
        </Stack>
      </ThemeConfig>
    </>
  );
}

export default App;
