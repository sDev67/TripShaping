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
import TodoList from "./TodoList/TodoList";

function App() {
  const [value, setValue] = React.useState(0);
  const [success, setSuccess] = React.useState(false);
  const [label, setLabel] = React.useState("Navigation");

  const [valueNavMode, setValueNavMode] = React.useState("all");

  const [selectedMarker, setSelectedMarker] = React.useState(null);


  // Lorsqu'on change de choix dans la box Navigation :
  // - Tout
  // - Etapes
  // - Points d'intérêt
  const handleChangeSelectModeNav = (event) => {
    setValueNavMode(event.target.value);
  };


  // Lorsqu'on change d'élement choisi entre :
  // Carte, Voyage et Options
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  // switch correspondant au mode navigation et mode Edition
  // success = true par defaut --> Navigation 
  // success = false --> Edition
  // Lorsqu'on switch de mode, on reset les points a afficher en les affichant tous
  const handleChangeOnOff = (event) => {
    setSuccess(event.target.checked);
    if(!success){
      setLabel("Edition")
      setValueNavMode("all");

    }
    // On ferme le menu d'édition s'il est ouvert
    else{
      if (selectedMarker !== null) {
        setSelectedMarker(null)
      }
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
        
            <FormControlLabel
              value={label}
              control={<Switch color="primary" />}
              label={label}
              labelPlacement="bottom"
              onChange={handleChangeOnOff}
              checked={success}
            />          
        
          </Stack>
          <TodoList/>
        {/** 
         * <Stack style={{ width: '100%' }}>
            <Map 
              choice = {success} 
              pointToDisplay = {valueNavMode}
              labelChoice = {label}
              handleChangeSelectModeNav = {handleChangeSelectModeNav}
              selectedMarker = {selectedMarker}
              setSelectedMarker = {setSelectedMarker}>
            </Map>
          </Stack>
        */}
          
        </Stack>
      </ThemeConfig>
    </>
  );
}

export default App;
