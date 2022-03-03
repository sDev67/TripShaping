import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CircularProgress,
  TextField,
  Popover,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
} from "@mui/material";
import palette from "./../theme/palette";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { FileUploader } from "react-drag-drop-files";
import Direction from "./Direction";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const position = {
  lat: 48.5734053,
  lng: 7.7521113,
};

export const Map = ({
  isEdition,
  markerFilter,
  switchText,
  handleChangeSelectModeNav,
  selectedMarker,
  setSelectedMarker,
}) => {
  const [steps, setSteps] = useState([]);
  const [interestPoints, setInterestPoints] = useState([]);
  const [routeOpen, setRouteOpen] = useState(false);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const [editionMode, setEditionMode] = useState("stepOnlyEdit");

  const [dialogOpen, setDialogOpen] = useState(false);

  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  const InterestPointIcon =
    "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [lengthOfStay, setLengthOfStay] = useState(0);

  let handleChangeTitle = (e) => {
    //selectedMarker.location.title = e.target.value;

    setSelectedMarker({ location: { title: e.target.value } });
    //console.log(selectedMarker.location.title)
  };

  const handleChangeSelectModeEdit = (event) => {
    setEditionMode(event.target.value);
  };

  useEffect(() => {
    // met a jour la page avec l'élément choisi dans la box Navigation
  }, [markerFilter]);

  // style pour le menu edition a droite de l'écran
  const asideStyle = {
    right: 60,
    top: 30,
    width: 400,
    position: "fixed",
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
    if (isEdition) {
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      } else {
        if (editionMode === "stepOnlyEdit") {
          if (!error) {
            setSteps((oldArray) => [
              ...oldArray,
              {
                // la prop name de step.location.name est très importante car c'est elle qui permet de savoir sur quelle point on clique
                location: {
                  id: steps.length,
                  name: "Etape",
                  title: "",
                  categorie: "",
                  lengthOfStay: 0,
                  files: [],
                  description: "",
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                },
                stopover: true,
              },
            ]);
          }
        }
        // ici : editionMode === "interestPointOnlyEdit")
        else {
          if (!error) {
            setInterestPoints((oldArr) => [
              ...oldArr,
              {
                location: {
                  id: interestPoints.length,
                  name: "PointInteret",
                  title: "",
                  categorie: "",
                  files: [],
                  description: "",
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                },
                stopover: true,
              },
            ]);
          }
        }
      }
    }
    // si on est en mode navigation
    else {
      // si le menu est ouvert on le ferme en cliquant sur la map
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      }
    }
  };

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
  const id = open ? "simple-popover" : undefined;

  // Fonction qui met a jour la position des points
  // en fonction de leurs index et du point choisi
  const updateLocation = (index, marker) => (e) => {
    if (!error) {
      if (marker.location.name === "Etape") {
        let newStep = [...steps];
        newStep[index] = {
          location: {
            id: index,
            name: "Etape",
            title: marker.location.title,
            categorie: marker.location.categorie,
            lengthOfStay: 0,
            files: [],
            description: marker.location.description,
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
          stopover: true,
        };
        setSteps(newStep);
      } else if (marker.location.name === "PointInteret") {
        let newInterestPoint = [...interestPoints];
        newInterestPoint[index] = {
          location: {
            id: index,
            name: "PointInteret",
            title: marker.location.title,
            categorie: marker.location.categorie,
            files: [],
            description: marker.location.description,
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
          stopover: true,
        };
        setInterestPoints(newInterestPoint);
      }
    }
  };

  const updateProperties = (marker) => (e) => {
    console.log(marker);
    if (!error) {
      if (marker.location.name === "Etape") {
        let newStep = [...steps];
        newStep[marker.id] = {
          location: {
            id: marker.id,
            name: "PointInteret",
            title: marker.location.title,
            categorie: marker.location.categorie,
            lengthOfStay: 0,
            files: [],
            description: marker.location.description,
            lat: marker.location.lat,
            lng: marker.location.lng,
          },
          stopover: true,
        };
        setSteps(newStep);
      } else if (marker.location.name === "PointInteret") {
        let newInterestPoint = [...interestPoints];
        newInterestPoint[marker.id] = {
          location: {
            id: marker.id,
            name: "PointInteret",
            title: marker.location.title,
            categorie: marker.location.categorie,
            files: [],
            description: marker.location.description,
            lat: marker.location.lat,
            lng: marker.location.lng,
          },
          stopover: true,
        };
        setInterestPoints(newInterestPoint);
      }
    }
  };

  // Fonction qui permet de supprimer des points d'étapes et des points d'interet
  const deleteMarker = (marker) => {
    if (!error && isEdition) {
      if (marker.location.name === "Etape") {
        let newStep = [...steps];
        newStep = newStep.filter((e) => e !== marker);
        setSteps(newStep);
      } else if (marker.location.name === "PointInteret") {
        let newInterestPoint = [...interestPoints];
        newInterestPoint = newInterestPoint.filter((e) => e !== marker);
        setInterestPoints(newInterestPoint);
      }
      setSelectedMarker(null);
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

  const onItineraryClick = () => {
    setRouteOpen(!routeOpen);
  }

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
            style={{
              background: "none",
              backgroundColor: "white",
              border: "0px",
              padding: "0px 17px",
              textTransform: "none",
              appearance: "none",
              position: "absolute",
              bottom: "2rem",
              left: "125px",
              zIndex: 10,
            }}
            onClick={onItineraryClick}
          >
            Itinéraire
          </Button>

          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClickOnBox}
            style={{
              background: "none",
              backgroundColor: "white",
              border: "0px",
              padding: "0px 17px",
              textTransform: "none",
              appearance: "none",
              position: "absolute",
              bottom: "2rem",
              left: "10 px",
              zIndex: 10,
              cursor: "pointer",
              textAlign: "center",
              height: "40px",
              verticalAlign: "middle",
              boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
              color: "rgb(86 86 86)",
              fontFamily: "Roboto, Arial, sans-serif",
              fontSize: "18px",
            }}
          >
            {switchText}
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseBox}
            style={{ marginLeft: 2 }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {!isEdition && (
              <FormControl>
                <RadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={markerFilter}
                  onChange={handleChangeSelectModeNav}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="Tout"
                  />
                  <FormControlLabel
                    value="stepOnlyNav"
                    control={<Radio />}
                    label="Etapes"
                  />
                  <FormControlLabel
                    value="interestPointOnlyNav"
                    control={<Radio />}
                    label="Points d'intérêt"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {isEdition && (
              <>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={editionMode}
                    onChange={handleChangeSelectModeEdit}
                  >
                    <FormControlLabel
                      value="stepOnlyEdit"
                      control={<Radio />}
                      label="Etapes"
                    />
                    <FormControlLabel
                      value="interestPointOnlyEdit"
                      control={<Radio />}
                      label="Points d'intérêt"
                    />
                  </RadioGroup>
                </FormControl>

              </>
            )}
          </Popover>

          {/* Child components, such as markers, info windows, etc. */}

          {(markerFilter === "stepOnlyNav" ||
            markerFilter === "stepOnlyEdit" ||
            markerFilter === "all") &&
            steps.map((step, index) => (
              <Marker
                key={index}
                position={{ lat: step.location.lat, lng: step.location.lng }}
                draggable={!error && isEdition}
                clickable={true}
                onClick={() => setSelectedMarker(steps[index])}
                onRightClick={() => deleteMarker(step)}
                onDragEnd={updateLocation(index, step)}
                icon={stepIcon}
              ></Marker>
            ))}

          {(markerFilter === "interestPointOnlyNav" ||
            markerFilter === "interestPointOnlyEdit" ||
            markerFilter === "all") &&
            interestPoints.map((interestPoint, index) => (
              <Marker
                key={index}
                position={{
                  lat: interestPoint.location.lat,
                  lng: interestPoint.location.lng,
                }}
                draggable={!error && isEdition}
                clickable={true}
                onClick={() => setSelectedMarker(interestPoints[index])}
                onRightClick={() => deleteMarker(interestPoint)}
                onDragEnd={updateLocation(index, interestPoint)}
                icon={InterestPointIcon}
              ></Marker>
            ))}

          {steps.length >= 2 &&
            !(!isEdition && markerFilter === "interestPointOnlyNav") && (
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
                    preserveViewport: true,
                    draggable: true,
                    polylineOptions: {
                      strokeColor: palette.primary.main,
                      strokeWeight: 3,
                      clickable: true
                    },
                  }}
                  onClick={() => console.log("ola")}
                />
              </>
            )
          }
        </GoogleMap>
      </LoadScript>
      {selectedMarker && !routeOpen && (
        <>
          <Card style={asideStyle}>
            <CardMedia
              component="img"
              height="194"
              image={require("../assets/pointInterets.JPG")}
            />
            <IconButton
              color="error"
              onClick={() => setSelectedMarker(null)}
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <CancelRounded />
            </IconButton>

            <CardContent>
              <TextField
                fullWidth
                label="Nom"
                value={selectedMarker.location.title}
                onChange={handleChangeTitle}
                style={{ marginBottom: 25 }}
              />
              <TextField
                fullWidth
                select
                label="Catégorie"
                value={selectedMarker.location.categorie}
                onChange={(e) => setCategorie(e.target.value)}
                style={{ marginBottom: 25 }}
              >
                <MenuItem>Musées</MenuItem>
                <MenuItem>Parcs</MenuItem>
              </TextField>
              <Stack
                style={{ marginBottom: 25 }}
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <TextField
                  fullWidth
                  select
                  label="Documents"
                  value={selectedMarker.location.files}
                >
                  {files.map((file, index) => (
                    <MenuItem key={index}>{file.name}</MenuItem>
                  ))}
                </TextField>

                <Button
                  style={{ paddingLeft: 32, paddingRight: 32 }}
                  variant="contained"
                  color="primary"
                  startIcon={<UploadFileRounded />}
                  onClick={() => setDialogOpen(true)}
                >
                  {" "}
                  Ajouter
                </Button>
              </Stack>

              <TextField
                fullWidth
                label="Description"
                multiline
                rows={10}
                value={selectedMarker.location.description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: 25 }}
              />

              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteRounded />}
                  onClick={() => deleteMarker(selectedMarker)}
                >
                  Supprimer
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DoneRounded />}
                  onClick={updateProperties(selectedMarker)}
                >
                  Enregistrer
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </>
      )}
      {routeOpen && !selectedMarker && (
        <>
          <Card style={asideStyle}>
            <CardMedia
              component="img"
              height="194"
              image={require("../assets/pointInterets.JPG")}
            />
            <IconButton
              color="error"
              onClick={() => setSelectedMarker(null)}
              style={{ position: "absolute", right: 5, top: 5 }}
            >
              <CancelRounded />
            </IconButton>

            <CardContent>
              <TextField
                fullWidth
                label="Route1"
                value=""
                onChange={handleChangeTitle}
                style={{ marginBottom: 25 }}
              />
              <TextField
                fullWidth
                label="Route2"
                value=""
                onChange={handleChangeTitle}
                style={{ marginBottom: 25 }}
              />
              <TextField
                fullWidth
                label="Route3"
                value=""
                onChange={handleChangeTitle}
                style={{ marginBottom: 25 }}
              />
              <TextField
                fullWidth
                label="Route4"
                value=""
                onChange={handleChangeTitle}
                style={{ marginBottom: 25 }}
              />
            </CardContent>
          </Card>
        </>
      )}

      {/* Affichage popin lorsque le trajet est introuvable. */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div style={{ margin: 10, marginTop: 0 }}>
          <DialogTitle>Choississez un fichier</DialogTitle>
          <FileUploader
            handleChange={(file) => setFiles((oldArray) => [...oldArray, file])}
          />
        </div>
      </Dialog>

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
