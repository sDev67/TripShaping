import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { CircularProgress, Button } from "@mui/material";
import palette from "./../theme/palette";
import InterestPointMenu from "./../components/InterestPointMenu";
import StepMenu from "./../components/StepMenu";
import MapModeSwitch from "./../components/MapModeSwitch";
import RouteMenu from "./../components/RouteMenu";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import PointRequests from "../requests/PointRequests";
import StepRequests from "../requests/StepRequests";
import { useParams } from "react-router-dom";
import StepTimeline from "./../components/StepTimeline";
import Loading from "../utils/Loading";

import stepIcon from "../assets/stepIcon.png";
import selectedStepIcon from "../assets/selectedStepIcon.png";

import interestPointIcon from "../assets/interestPointIcon.png";
import selectedInterestPointIcon from "../assets/selectedInterestPointIcon.png";
import MapModeSwitchAlbum from "../components/MapModeSwitchAlbum";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const MapReview = ({ }) => {
  const queryClient = useQueryClient();

  let { cryptedName } = useParams();
  cryptedName = cryptedName.toString();

  let idTravel = cryptedName.substring(cryptedName.indexOf('$') + 1);
  console.log(idTravel);
  idTravel = parseInt(idTravel);

  const [position, setPosition] = useState({
    lat: 48.5734053,
    lng: 7.7521113,
  });

  const [isEdition, setIsEdition] = useState(false);
  const [markerFilter, setMarkerFilter] = useState("all");
  const [editionMode, setEditionMode] = useState("stepOnlyEdit");

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [stepAdded, setStepAdded] = useState(false);

  const [expanded, setExpanded] = useState(false);

  // Etapes
  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: steps,
  } = useQuery(["getSteps", idTravel], () =>
    TravelRequests.getStepsOfTravel(idTravel)
  );

  // Points
  const {
    isLoading: isLoadingP,
    isError: isErrorP,
    error: errorP,
    data: interestPoints,
  } = useQuery(["getPoints", idTravel], () =>
    TravelRequests.getPointsOfTravel(idTravel)
  );

  // Trajets
  const {
    isLoading: isLoadingR,
    isError: isErrorR,
    error: errorR,
    data: routes,
  } = useQuery(["getRoutes", idTravel], () =>
    TravelRequests.getRoutesOfTravel(idTravel)
  );

  //const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // met a jour la page avec l'élément choisi dans la box Navigation
  }, [markerFilter]);

  // Lorsqu'on change de choix dans la box Navigation :
  // - Tout
  // - Etapes
  // - Points d'intérêt
  const handleChangeSelectModeNav = (event) => {
    setMarkerFilter(event.target.value);
  };

  // switch correspondant au mode navigation et mode Edition
  // isEdition = true par defaut --> Navigation
  // isEdition = false --> Edition
  // Lorsqu'on switch de mode, on reset les points a afficher en les affichant tous
  const handleSwitch = (event) => {
    setIsEdition(event.target.checked);
    if (!isEdition) {
      setMarkerFilter("all");
    }
    // On ferme le menu d'édition s'il est ouvert
    else {
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      }
    }
  };

  const handleChangeSelectModeEdit = (event) => {
    setEditionMode(event.target.value);
  };

  return (
    <div style={{ height: "93.15%" }}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_APIKEY}
        loadingElement={<Loading />}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
        >
          <MapModeSwitchAlbum
            handleSwitch={handleSwitch}
            isEdition={isEdition}
            markerFilter={markerFilter}
            handleChangeSelectModeEdit={handleChangeSelectModeEdit}
            handleChangeSelectModeNav={handleChangeSelectModeNav}
            editionMode={editionMode}
          ></MapModeSwitchAlbum>
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="contained"
            style={{
              position: "absolute",
              top: "1%",
              left: "12%",
              // height: "100px"
            }}
          >
            Liste Étapes
          </Button>

          {isLoadingS ? (
            <Loading />
          ) : isErrorS ? (
            <p style={{ color: "red" }}>{errorS.message}</p>
          ) : (
            !(!isEdition && markerFilter === "interestPointOnlyNav") &&
            steps.map((step, index) => (
              <Marker
                key={index}
                position={{ lat: step.latitude, lng: step.longitude }}
                icon={
                  selectedMarker?.marker.id == step.id &&
                    selectedMarker?.type == "Step"
                    ? selectedStepIcon
                    : stepIcon
                }
              ></Marker>
            ))
          )}

          {isLoadingP ? (
            "Chargement..."
          ) : isErrorP ? (
            <p style={{ color: "red" }}>{errorP.message}</p>
          ) : (
            !(!isEdition && markerFilter === "stepOnlyNav") &&
            interestPoints.map((interestPoint, index) => (
              <Marker
                key={index}
                position={{
                  lat: interestPoint.latitude,
                  lng: interestPoint.longitude,
                }}
                icon={
                  selectedMarker?.marker.id == interestPoint.id &&
                    selectedMarker?.type == "Point"
                    ? selectedInterestPointIcon
                    : interestPointIcon
                }
              ></Marker>
            ))
          )}

          {isLoadingS ? (
            "Chargement..."
          ) : isErrorS ? (
            <p style={{ color: "red" }}>{errorS.message}</p>
          ) : (
            steps.length >= 2 &&
            !(!isEdition && markerFilter === "interestPointOnlyNav") && (
              <>
                {steps.map((step, index) => (
                  <>
                    {index > 0 && (
                      <Polyline
                        key={index - 1}
                        geodesic={true}
                        clickable={true}
                        path={[
                          {
                            lat: steps[index - 1].latitude,
                            lng: steps[index - 1].longitude,
                          },
                          {
                            lat: step.latitude,
                            lng: step.longitude,
                          },
                        ]}
                        options={{
                          strokeColor: palette.primary.main,
                          strokeWeight: 8,
                        }}
                      ></Polyline>
                    )}
                  </>
                ))}
              </>
            )
          )}
        </GoogleMap>
      </LoadScript>
      <StepTimeline
        steps={steps}
        isLoadingS={isLoadingS}
        isErrorS={isErrorS}
        errorS={errorS}
        setPosition={setPosition}
        setSelectedMarker={setSelectedMarker}
        expanded={expanded}
        setExpanded={setExpanded}
      ></StepTimeline>
    </div>
  );
};
