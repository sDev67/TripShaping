import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { CircularProgress } from "@mui/material";
import palette from "./../theme/palette";
import InterestPointMenu from "./InterestPointMenu";
import StepMenu from "./StepMenu";
import MapModeSwitch from "./MapModeSwitch";
import RouteMenu from "./RouteMenu";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import PointRequests from "../requests/PointRequests";
import StepRequests from "../requests/StepRequests";
import { useParams } from "react-router-dom";
import StepTimeline from "./StepTimeline";
import Loading from "../utils/Loading";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};



export const Map = ({ }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [position, setPosition] = useState({
    lat: 48.5734053,
    lng: 7.7521113,
  });

  const [isEdition, setIsEdition] = useState(false);
  const [switchText, setSwitchText] = useState("Navigation");
  const [markerFilter, setMarkerFilter] = useState("all");
  const [editionMode, setEditionMode] = useState("stepOnlyEdit");

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

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

  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  const interestPointIcon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

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

  const handleChangeSelectModeEdit = (event) => {
    setEditionMode(event.target.value);
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

  const addPoint = useMutation(TravelRequests.addPoint, {
    onSuccess: (point) =>
      queryClient.setQueryData(["getPoints", idTravel], (interestPoints) => [
        ...interestPoints,
        point,
      ]),
  });

  const addStep = useMutation(TravelRequests.addStep, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ])
    }
  });

  const createRoute = useMutation(TravelRequests.addRoute, {
    onSuccess: (route) =>
      queryClient.setQueryData(["getRoutes", idTravel], (routes) => [
        ...routes,
        route,
      ]),
  });

  const updateLocationPoint = useMutation(
    PointRequests.updatePointLocationById,
    {
      onSuccess: (point) => {
        queryClient.setQueryData(["getPoints", idTravel], (interestPoints) => [
          ...interestPoints,
          point,
        ]);
        queryClient.invalidateQueries(["getPoints", idTravel]);
      },
    }
  );

  const updateInfoPoint = useMutation(PointRequests.updatePointInfoById, {
    onSuccess: (point) => {
      queryClient.setQueryData(["getPoints", idTravel], (interestPoints) => [
        ...interestPoints,
        point,
      ]);
      queryClient.invalidateQueries(["getPoints", idTravel]);
    }
  });

  const updateLocationStep = useMutation(StepRequests.updateStepLocationById, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      queryClient.invalidateQueries(["getSteps", idTravel]);
    },
  });

  const updateInfoStep = useMutation(StepRequests.updateStepInfoById, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      queryClient.invalidateQueries(["getSteps", idTravel]);
    }
  });

  //Suppression de point
  const deletePoint = useMutation(TravelRequests.removePoint, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getPoints", idTravel], (interestPoints) =>
        interestPoints.filter((e) => e.id !== id)
      ),
  });

  //Suppression d'étape
  const deleteStep = useMutation(TravelRequests.removeStep, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getSteps", idTravel], (steps) =>
        steps.filter((e) => e.id !== id)
      ),
  });

  //Suppression de route
  const deleteRoute = useMutation(TravelRequests.removeRoute, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getRoute", idTravel], (routes) =>
        routes.filter((e) => e.id !== id)
      ),
  });

  const onMapClick = (e) => {
    // on peut placer les points uniquement si on est en mode edition
    if (isEdition) {
      if (selectedMarker !== null) {
        setSelectedMarker(null);
      } else if (selectedRoute !== null) {
        setSelectedRoute(null);
      } else {
        if (editionMode === "stepOnlyEdit") {
          if (!error) {
            addStepPoint(e);
          }
        }
        // ici : editionMode === "interestPointOnlyEdit")
        else {
          if (!error) {
            addInterestPoint(e);
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

  // Fonction qui permet d'ajouter un point d'étape
  const addStepPoint = (e) => {
    const newStep = {
      title: "",
      latitude: parseFloat(e.latLng.lat()),
      longitude: parseFloat(e.latLng.lng()),
      description: "",
      category: "",
      duration: 1,
      TravelId: idTravel,
    };
    addStep.mutate(newStep);
    if (steps.length >= 2) {
      addRoute({ idStart: steps[steps.length - 2].id, idFinish: steps[steps.length - 1].id });
    }
  };

  const addRoute = ({ idStart, idFinish }) => {
    const newRoute = {
      travelType: "",
      start: idStart,
      finish: idFinish,
      TravelId: idTravel
    };
    createRoute.mutate(newRoute);
  };

  // Fonction qui permet d'ajouter un point d'interet
  const addInterestPoint = (e) => {
    const newPoint = {
      title: "",
      latitude: parseFloat(e.latLng.lat()),
      longitude: parseFloat(e.latLng.lng()),
      description: "",
      category: "",
      TravelId: idTravel,
    };
    addPoint.mutate(newPoint);
  };

  // Fonction qui met a jour la position d'un point d'interet
  const updateInterestPointLocation = (interestPoint) => (e) => {
    if (!error) {
      const newPoint = {
        latitude: parseFloat(e.latLng.lat()),
        longitude: parseFloat(e.latLng.lng()),
        idPoint: interestPoint.id,
      };
      updateLocationPoint.mutate(newPoint);
    }
  };

  // Fonction qui met a jour la position d'un point d'interet
  const updateStepLocation = (step) => (e) => {
    if (!error) {
      const newPoint = {
        latitude: parseFloat(e.latLng.lat()),
        longitude: parseFloat(e.latLng.lng()),
        idPoint: step.id,
      };

      updateLocationStep.mutate(newPoint);
    }
  };

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
          <MapModeSwitch
            switchText={switchText}
            handleSwitch={handleSwitch}
            isEdition={isEdition}
            markerFilter={markerFilter}
            handleChangeSelectModeEdit={handleChangeSelectModeEdit}
            handleChangeSelectModeNav={handleChangeSelectModeNav}
            editionMode={editionMode}
          ></MapModeSwitch>

          {isLoadingS ? (
            <Loading />
          ) : isErrorS ? (
            <p style={{ color: "red" }}>{errorS.message}</p>
          ) : (
            !(!isEdition && markerFilter === "interestPointOnlyNav") && (
              steps.map((step, index) => (
                <Marker
                  key={index}
                  position={{ lat: step.latitude, lng: step.longitude }}
                  draggable={!error && isEdition}
                  clickable={true}
                  onClick={() => {
                    setSelectedMarker(null);
                    setSelectedMarker({ marker: step, type: "Step" });
                    setSelectedRoute(null);
                    setPosition({ lat: step.latitude, lng: step.longitude });
                  }}
                  onRightClick={() => {
                    if (!error && isEdition) {
                      if (steps.length > 1 && !isLoadingR && !isErrorR) {
                        if (step.id === steps[steps.length - 1].id) {
                          //deleteRoute.mutate(routes[routes.length - 1].id)
                        }
                        else if (step.id === steps[0].id) {
                          deleteRoute.mutate(routes[0].id)
                        }
                        else {
                          deleteRoute.mutate(routes[index - 1].id)
                          deleteRoute.mutate(routes[index].id)
                          addRoute({ idStart: steps[index - 1].id, idFinish: steps[index + 1].id });
                        }
                      }
                      deleteStep.mutate(step.id);
                      setSelectedMarker(null);
                    }
                  }}
                  onDragEnd={updateStepLocation(step)}
                  icon={selectedMarker?.marker.id == step.id ? null : stepIcon}

                // "https://maps.google.com/mapfiles/ms/icons/red-dot.png"

                ></Marker>
              )))
          )}

          {isLoadingP ? (
            "Chargement..."
          ) : isErrorP ? (
            <p style={{ color: "red" }}>{errorP.message}</p>
          ) : (
            !(!isEdition && markerFilter === "stepOnlyNav") && (
              interestPoints.map((interestPoint, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: interestPoint.latitude,
                    lng: interestPoint.longitude,
                  }}
                  draggable={!error && isEdition}
                  clickable={true}
                  onClick={() => {
                    setSelectedMarker(null);
                    setSelectedMarker({ marker: interestPoint, type: "Point" });
                    setSelectedRoute(null);
                  }}
                  onRightClick={() => {
                    if (!error && isEdition) {
                      deletePoint.mutate(interestPoint.id);
                      setSelectedMarker(null);
                    }
                  }}
                  onDragEnd={updateInterestPointLocation(interestPoint)}
                  icon={interestPointIcon}
                ></Marker>
              )))
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
                        onClick={() => {
                          setSelectedRoute(index);
                          setSelectedMarker(null);
                        }}
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
      ></StepTimeline>
      {selectedMarker &&
        (selectedMarker.type === "Point" ? (
          isLoadingP ? (
            "Chargement..."
          ) : isErrorP ? (
            <p style={{ color: "red" }}>{errorP.message}</p>
          ) : (
            <InterestPointMenu
              selectedMarker={selectedMarker.marker}
              setSelectedMarker={setSelectedMarker}
              deletePoint={deletePoint}
              updateInfoPoint={updateInfoPoint}
              isEdition={isEdition}
            ></InterestPointMenu>
          )
        ) : selectedMarker.type === "Step" && isLoadingS ? (
          "Chargement..."
        ) : isErrorS ? (
          <p style={{ color: "red" }}>{errorS.message}</p>
        ) : (
          <StepMenu
            selectedMarker={selectedMarker.marker}
            setSelectedMarker={setSelectedMarker}
            deleteStep={deleteStep}
            updateInfoStep={updateInfoStep}
            isEdition={isEdition}
          ></StepMenu>
        ))}
      {selectedRoute && (
        <RouteMenu
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        ></RouteMenu>
      )}
    </>
  );
};
