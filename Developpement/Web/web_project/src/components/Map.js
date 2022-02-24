import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  DirectionsService,
  Marker,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import CircularProgress from "@mui/material/CircularProgress";
import Popover from '@mui/material/Popover';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";


import { Button, Alert, Collapse } from "@mui/material";

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};


const position = {
  lat: 48.5734053,
  lng: 7.7521113,
};

export const Map = ({ choice, pointToDisplay, labelChoice, handleChangeSelectModeNav,selectedMarker, setSelectedMarker }) => {

  const [steps, setSteps] = useState([]);
  const [interestPoint, setInterestPoint] = useState([]);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false)

  const [valueEditionMode, setValueEditionMode] = React.useState("stepOnly");

  const handleChangeSelectModeEdit = (event) => {
    setValueEditionMode(event.target.value);
  };

  useEffect(() => {
    // met a jour la page avec l'élément choisi dans la box Navigation
  }, [pointToDisplay]);

  // style pour le menu edition a droite de l'écran
  const asideStyle = {
    right: 60,
    top: 30,
    width: 400,
    height: '90%',
    position: 'fixed',
    background: "#FFFFFF",
    border: '1px solid black',
    borderRadius: 5,
    opacity: 0.85
  };

  const mapLoading = (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );

  const onMapClick = (e) => {
    // on peut placer les points uniquement si on est en mode edition
    if(choice){
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      }     
      else {
        if (valueEditionMode === "stepOnly") {
          if (!error) {
            setSteps((oldArray) => [
              ...oldArray,
              {
                // la prop name de step.location.name est très importante car c'est elle qui permet de savoir sur quelle point on clique
                location: { name: "Etape", lat: e.latLng.lat(), lng: e.latLng.lng(), title: "chien" },
                stopover: true,
              },
            ]);
          }
        }
        // ici : valueEditionMode === "interestPointOnly")
        else { 
          if (!error) {
            setInterestPoint((oldArr) => [
              ...oldArr,
              {
                location: { name: "PointInteret", lat: e.latLng.lat(), lng: e.latLng.lng(), title: "chat" },
                stopover: true,
              },
            ]);
          }
        }
      }
    }    
    // si on est en mode navigation 
    else{
      // si le menu est ouvert on le ferme en cliquant sur la map
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      }
    }

  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  // Clique sur la box Navigation / Edition placé sur la map
  const handleClickOnBox = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Ferme la box Navigation / Edition
  const handleCloseBox = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //const img = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  // Fonction qui met a jour la position des points
  // en fonction de leurs index et du point choisi
  const changeLocation = (index, stp) => (e) => {
    if (!error) {
      if(stp.location.name === "Etape"){
        let newSteps = [...steps];
        newSteps[index] = {
          location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          stopover: true,
        };
        setSteps(newSteps);
      }
      else if (stp.location.name === "PointInteret"){
        let newInterestSteps = [...interestPoint];
        newInterestSteps[index] = {
          location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          stopover: true,
        };
        setInterestPoint(newInterestSteps);
      }      
    }
  };

  // Fonction qui permet de supprimer des points d'étapes et des points d'interet
  const deleteMarker = (step) => {
    if (!error) {
      if(step.location.name === "Etape"){
        let newSteps = [...steps];
        newSteps = newSteps.filter((e) => e !== step);
        setSteps(newSteps);
      }
      else if (step.location.name === "PointInteret"){
        let newInterestSteps = [...interestPoint];
        newInterestSteps = newInterestSteps.filter((e) => e !== step);
        setInterestPoint(newInterestSteps);
      }
    }    
  };

  // Fonction qui enleve le dernier point lorsque ce dernier est placé dans un endroit qui cause pb
  const closeAlert = () => {
    setError(false);
    let newSteps = [...steps];
    newSteps = newSteps.filter((e) => e !== steps[steps.length - 1]);
    setSteps(newSteps);
  };

  // fonction qui calcule l'itinéraire et qui le trace
  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else if (res !== null && res.status === "ZERO_RESULTS") {
      setError(true);
    }
  }, []);

  return (
    <>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_APIKEY}
        loadingElement={mapLoading}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
          onClick={onMapClick}
        >
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClickOnBox}

            style={{
              background: 'none',
              backgroundColor: 'white',
              border: '0px',
              padding: '0px 17px',
              textTransform: 'none',
              appearance: 'none',
              position: 'absolute',
              bottom: '2rem',
              left: '10 px',
              zIndex: 10,
              cursor: "pointer",
              textAlign: "center",
              height: '40px',
              verticalAlign: 'middle',
              boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
              color: 'rgb(86 86 86)',
              fontFamily: 'Roboto, Arial, sans-serif',
              fontSize: '18px',


            }}>
            {labelChoice}
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseBox}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {!choice &&
              <FormControl>
                <RadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={pointToDisplay}
                  onChange={handleChangeSelectModeNav}
                >
                  <FormControlLabel value="all" control={<Radio />} label="Tout" />
                  <FormControlLabel value="stepOnly" control={<Radio />} label="Etapes" />
                  <FormControlLabel value="interestPointOnly" control={<Radio />} label="Points d'intérêt" />

                </RadioGroup>
              </FormControl>

            }

            {choice &&
              <FormControl>
                <RadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueEditionMode}
                  onChange={handleChangeSelectModeEdit}
                >
                  <FormControlLabel value="stepOnly" control={<Radio />} label="Etapes" />
                  <FormControlLabel value="interestPointOnly" control={<Radio />} label="Points d'intérêt" />

                </RadioGroup>
              </FormControl>
            }
          </Popover>



          {/* Child components, such as markers, info windows, etc. */}

          {
            (pointToDisplay === "stepOnly" || pointToDisplay === "all") &&
            steps.map((step, index) => (
              <Marker
                key={index}
                position={{ lat: step.location.lat, lng: step.location.lng }}
                draggable={!error}
                clickable={true}
                onClick={() => setSelectedMarker(steps[index])}
                onRightClick={() => deleteMarker(step)}
                onDragEnd={changeLocation(index,step )}

              >
              </Marker>
            ))

          }

          {
            (pointToDisplay === "interestPointOnly" || pointToDisplay === "all") &&
            interestPoint.map((interestStep, index) => (
              <Marker
                key={index}
                position={{ lat: interestStep.location.lat, lng: interestStep.location.lng }}
                draggable={!error}
                clickable={true}
                onClick={() => setSelectedMarker(interestPoint[index])}
                onRightClick={() => deleteMarker(interestStep)}
                onDragEnd={changeLocation(index, interestStep)}
                icon={{
                  path:
                    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                  fillColor: "green",
                  fillOpacity: 1,
                  scale: 1.9,
                  strokeColor: "black",
                  strokeWeight: 1,
                }}

                title={"TEST"}


              >
              </Marker>
            ))
          }
          
          {steps.length >= 2 && (
            <>
              <DirectionsService
                options={{
                  origin: {
                    lat: steps[0].location.lat,
                    lng: steps[0].location.lng,
                  },
                  waypoints: steps.slice(1, steps.length - 1),
                  destination: {
                    lat: steps[steps.length - 1].location.lat,
                    lng: steps[steps.length - 1].location.lng,
                  },

                  travelMode: "DRIVING",
                }}
                callback={directionsCallback}
              />
              <DirectionsRenderer
                options={{
                  directions: response,
                  suppressMarkers: true,
                  polylineOptions: { strokeColor: "#00AB55", strokeWeight: 3 },
                }}
              />
            </>
          )}


        </GoogleMap>
      </LoadScript>
      {
        selectedMarker && <>
          <aside style={asideStyle}>
            <h3>Titre</h3>
            <textarea value={selectedMarker.location.title}></textarea>
            <hr />
            <h3>Catégorie</h3>
            <textarea></textarea>
            <hr />
            <h3>Description</h3>
            <textarea></textarea>
            <hr />
            <h3>Documents</h3>
          </aside>
        </>
      }
      
      {/* Affichage popin lorsque le trajet est introuvable. */}

      <Collapse
        in={error}
        style={{ position: "absolute", alignSelf: "center", bottom: 10 }}
      >
        <Alert variant="filled" severity="error" onClose={() => closeAlert()}>
          Désolé, nous n'avons pas pu calculer l'itinéraire.
        </Alert>
      </Collapse>
    </>
  );
};