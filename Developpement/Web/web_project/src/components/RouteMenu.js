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
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
} from "@mui/material";
import {
  GoogleMap,
  Marker,
  Polyline,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";
import palette from "./../theme/palette";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { FileUploader } from "react-drag-drop-files";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const RouteMenu = ({
  selectedRoute,
  start,
  finish,
  setSelectedRoute
}) => {
  const [files, setFiles] = useState([]);
  const [travelType, setTravelType] = useState(selectedRoute.travelType);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

  const categ = [
    {
      value: 'DRIVING',
    },
    {
      value: 'WALKING',
    },
    {
      value: 'BICYCLING',
    },
    {
      value: 'TRANSIT',
    },
    {
      value: 'Autre',
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

  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else if (res !== null && res.status === "ZERO_RESULTS") {
      setError(true);
    }
  }, []);

  return (
    <>
      <Card style={{ right: "3%", top: "5%", width: 400, position: "fixed", height: "90%" }}>
        <CardMedia
          component="img"
          height="194"
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
            label="Catégorie"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {categ.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
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
              // value={selectedRoute.location.files}
              InputLabelProps={{
                shrink: true,
              }}
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

          <Stack style={{ border: "1px solid black", margin: 5, marginBottom: 10, height: 425 }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={6}>
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
                {(travelType === "Autre" || error) ? <>
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
                  :
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

                        travelMode: travelType.toString()
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
                  </>}
              </>
            </GoogleMap>
          </Stack>


          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
            // onClick={updateProperties(selectedRoute)}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div style={{ margin: 10, marginTop: 0 }}>
          <Typography variant="h3" marginY={2}>
            Ajouter un fichier
          </Typography>
          <FileUploader
            handleChange={(file) => setFiles((oldArray) => [...oldArray, file])}
          />
        </div>
      </Dialog>
    </>
  );
};

export default RouteMenu;
