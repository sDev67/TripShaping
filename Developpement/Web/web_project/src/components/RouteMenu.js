import React, { useState, useCallback } from "react";
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
  Typography,
  IconButton,
} from "@mui/material";
import {
  GoogleMap,
  Marker,
  Polyline,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import palette from "./../theme/palette";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import DocumentRequest from "../requests/DocumentRequest";
import RouteRequest from "../requests/RouteRequest";
import DocumentsList from "./DocumentsList";
import Loading from "../utils/Loading";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const RouteMenu = ({
  selectedRoute,
  start,
  finish,
  setSelectedRoute,
  isEdition,
  hideDocuments,
  updateRoute,
}) => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [travelType, setTravelType] = useState(selectedRoute.travelType);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  console.log(selectedRoute);
  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfRoute", selectedRoute.id], () =>
    DocumentRequest.getDocumentsByRouteId(selectedRoute.id)
  );

  const UpdateProperties = () => {
    console.log(travelType);
    const route = {
      idRoute: selectedRoute.id,
      travelType: travelType,
    };
    updateRoute.mutate(route);
    setSelectedRoute(null);
  };

  const distance = response?.routes[0].legs[0].distance.text;
  const duration = response?.routes[0].legs[0].duration.text;

  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

  const categ = [
    {
      value: "DRIVING",
      label: "Voiture",
    },
    {
      value: "WALKING",
      label: "À pied",
    },
    {
      value: "BICYCLING",
      label: "À vélo",
    },
    {
      value: "TRANSIT",
      label: "En transports",
    },
    {
      value: "Autre",
      label: "Autre",
    },
  ];

  const [position, setPosition] = useState({
    lat: (start.latitude + finish.latitude) / 2,
    lng: (start.longitude + finish.longitude) / 2,
  });

  // const updateProperties = (marker) => (e) => {
  //   let newInterestPoint = [...interestPoints];
  //   newInterestPoint[marker.id] = {
  //     location: {
  //       id: marker.id,
  //       name: "PointInteret",
  //       title: marker.location.title,
  //       categorie: marker.location.categorie,
  //       files: [],
  //       description: marker.location.description,
  //       lat: marker.location.lat,
  //       lng: marker.location.lng,
  //     },
  //     stopover: true,
  //   };
  //   setInterestPoints(newInterestPoint);
  // };

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("RouteId", selectedRoute.id);

    console.log(...formData);

    DocumentRequest.uploadFile(formData);
  };

  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else if (res !== null && res.status === "ZERO_RESULTS") {
      setError(true);
    }
  }, []);

  return (
    <>
      <Card
        style={{
          right: "3%",
          top: "8%",
          width: 400,
          position: "fixed",
          height: "90%",
        }}
      >
        <CardMedia
          component="img"
          height="120"
          image={require("../assets/routes.png")}
        />
        <IconButton
          color="error"
          onClick={() => setSelectedRoute(null)}
          style={{ position: "absolute", right: 5, top: 5 }}
        >
          <CancelRounded />
        </IconButton>

        <CardContent>
          <TextField
            fullWidth
            select
            label="Type de transport"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {categ.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {hideDocuments ? (
            <></>
          ) : (
            <Stack
              style={{ marginBottom: 25 }}
              spacing={1}
              direction="column"
              height="160px"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" color="primary">
                  Documents
                </Typography>
                <Button
                  style={{ paddingLeft: 32, paddingRight: 32 }}
                  startIcon={<UploadFileRounded />}
                  variant="contained"
                  component="label"
                  disabled={!isEdition}
                >
                  Ajouter
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      addFile(e.target.files[0]);
                    }}
                    required
                  />
                </Button>
              </Stack>
              {isLoadingD ? (
                <Loading />
              ) : isErrorD ? (
                <p style={{ color: "red" }}>{errorD.message}</p>
              ) : (
                <DocumentsList
                  documents={documents}
                  requestKeyTitle="getDocumentsOfPoint"
                  requestKeyValue={selectedRoute.id}
                  isEdition={isEdition}
                ></DocumentsList>
              )}
            </Stack>
          )}

          {response && distance && duration && (
            <Stack direction="row">
              <TextField
                fullWidth
                label="Distance"
                value={distance}
                style={{ marginBottom: 25 }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <TextField
                fullWidth
                label="Temps"
                value={duration}
                style={{ marginBottom: 25 }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
            </Stack>
          )}

          <Stack
            style={{
              border: "1px solid black",
              margin: 5,
              marginBottom: 10,
              height: 300,
            }}
          >
            <GoogleMap
              options={{ mapTypeControl: false, fullscreenControl: false }}
              mapContainerStyle={containerStyle}
              center={position}
              zoom={6}
            >
              <Marker
                key={1}
                position={{ lat: start.latitude, lng: start.longitude }}
                icon={stepIcon}
                // "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              ></Marker>
              <Marker
                key={2}
                position={{ lat: finish.latitude, lng: finish.longitude }}
                icon={stepIcon}
                // "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              ></Marker>

              <>
                {travelType === "Autre" || error ? (
                  <>
                    <Polyline
                      geodesic={true}
                      path={[
                        {
                          lat: start.latitude,
                          lng: start.longitude,
                        },
                        {
                          lat: finish.latitude,
                          lng: finish.longitude,
                        },
                      ]}
                      options={{
                        strokeColor: palette.primary.main,
                        strokeWeight: 4,
                      }}
                    ></Polyline>
                  </>
                ) : (
                  <>
                    <DirectionsService
                      options={{
                        origin: {
                          lat: start.latitude,
                          lng: start.longitude,
                        },
                        destination: {
                          lat: finish.latitude,
                          lng: finish.longitude,
                        },

                        travelMode: travelType.toString(),
                      }}
                      callback={directionsCallback}
                    />
                    <DirectionsRenderer
                      options={{
                        directions: response,
                        suppressMarkers: true,
                        preserveViewport: true,
                        polylineOptions: {
                          strokeColor: palette.primary.main,
                          strokeWeight: 4,
                        },
                      }}
                    />
                  </>
                )}
              </>
            </GoogleMap>
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={() => UpdateProperties()}
              disabled={!isEdition}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default RouteMenu;
