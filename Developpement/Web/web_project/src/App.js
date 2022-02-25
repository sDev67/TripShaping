import React from "react";
import "./App.css";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Map } from "./components/Map";
import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  Switch

} from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CommuteRoundedIcon from "@mui/icons-material/CommuteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function App() {
  const [value, setValue] = React.useState(0);
  const [isEdition, setIsEdition] = React.useState(false);
  const [switchText, setSwitchText] = React.useState("Navigation");

  const [markerFilter, setMarkerFilter] = React.useState("all");

  const [selectedMarker, setSelectedMarker] = React.useState(null);


  // Lorsqu'on change de choix dans la box Navigation :
  // - Tout
  // - Etapes
  // - Points d'intérêt
  const handleChangeSelectModeNav = (event) => {
    setMarkerFilter(event.target.value);
  };


  // Lorsqu'on change d'élement choisi entre :
  // Carte, Voyage et Options
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  // switch correspondant au mode navigation et mode Edition
  // isEdition = true par defaut --> Navigation 
  // isEdition = false --> Edition
  // Lorsqu'on switch de mode, on reset les points a afficher en les affichant tous
  const handleSwitch = (event) => {
    setIsEdition(event.target.checked);
    if(!isEdition){
      setSwitchText("Edition")
      setMarkerFilter("all");
    }
    // On ferme le menu d'édition s'il est ouvert
    else{
      if (selectedMarker !== null) {
        setSelectedMarker(null)
      }
      setSwitchText("Navigation")
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
          style={{ height: "100%", width: "100%" }}
        >
          <Stack style={{ width: '10%' }} direction="column" justifyContent="space-around">
            <Typography variant="h1" color="primary" textAlign="center">Atlas</Typography>
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
              value={switchText}
              control={<Switch color="primary" />}
              label={switchText}
              labelPlacement="bottom"
              onChange={handleSwitch}
              checked={isEdition}
            />

          </Stack>

          <Stack style={{ width: '100%' }}>
            <Map 
              isEdition = {isEdition} 
              markerFilter = {markerFilter}
              switchText = {switchText}
              handleChangeSelectModeNav = {handleChangeSelectModeNav}
              selectedMarker = {selectedMarker}
              setSelectedMarker = {setSelectedMarker}>
            </Map>
          </Stack>
        </Stack>
      </ThemeConfig>
    </>
  );
}

export default App;