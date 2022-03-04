import React from "react";
import { Map } from "../components/Map";
import NavigationBar from "./../components/NavigationBar";

const Itinerary = () => {
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
    if (!isEdition) {
      setSwitchText("Edition");
      setMarkerFilter("all");
    }
    // On ferme le menu d'édition s'il est ouvert
    else {
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      }
      setSwitchText("Navigation");
    }
  };

  return (
    <>
      <Map
        isEdition={isEdition}
        markerFilter={markerFilter}
        switchText={switchText}
        handleChangeSelectModeNav={handleChangeSelectModeNav}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      ></Map>
    </>
  );
};

export default Itinerary;
