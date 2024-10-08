import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { Button, Dialog, Stack } from "@mui/material";
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
import RouteRequest from "../requests/RouteRequest";

import stepIcon from "../assets/stepIcon.png";
import selectedStepIcon from "../assets/selectedStepIcon.png";
import interestPointIcon from "../assets/interestPointIcon.png";
import selectedInterestPointIcon from "../assets/selectedInterestPointIcon.png";
import antique from "../assets/antique.png";
import antiqueSelected from "../assets/antiqueSelected.png";
import boat from "../assets/boat.png";
import boatSelected from "../assets/boatSelected.png";
import camera from "../assets/camera.png";
import cameraSelected from "../assets/cameraSelected.png";
import castle from "../assets/castle.png";
import castleSelected from "../assets/castleSelected.png";
import parc from "../assets/parc.png";
import parcSelected from "../assets/parcSelected.png";
import shop from "../assets/shop.png";
import shopSelected from "../assets/shopSelected.png";
import stade from "../assets/stade.png";
import stadeSelected from "../assets/stadeSelected.png";
import theater from "../assets/theater.png";
import theaterSelected from "../assets/theaterSelected.png";
import food from "../assets/food.png";
import foodSelected from "../assets/foodSelected.png";
import ConfirmedSuppressionModal from "./ConfirmedSuppressionModal";
import CustomSnackbar from "../utils/CustomSnackbar";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const Map = ({ steps, isLoadingS, isErrorS, errorS }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [position, setPosition] = useState({
    lat: steps[0] ? steps[0].latitude : 48.5734053,
    lng: steps[0] ? steps[0].longitude : 7.7521113,
  });

  const [isEdition, setIsEdition] = useState(false);
  const [markerFilter, setMarkerFilter] = useState("all");
  const [editionMode, setEditionMode] = useState("stepOnlyEdit");

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentPOISTEP, setCurrentPOISTEP] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedPoiOfMarker, setSelectedPoiOfMarker] = useState(null);
  const [currentIndex, setCurrentIndex] = useState();
  const [showTimeline, setShowTimeline] = useState(false);

  const [stepAdded, setStepAdded] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

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

  useEffect(() => {
    if (!isLoadingS && !isErrorS) {
      if (steps.length >= 2 && stepAdded) {
        addRoute({
          idStart: steps[steps.length - 2].id,
          idFinish: steps[steps.length - 1].id,
        });
        setStepAdded(false);
      }
    }
  }, [steps]);

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

  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] =
    useState(false);

  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);
    if (!error && isEdition) {
      if (steps.length > 1 && !isLoadingR && !isErrorR) {
        if (currentPOISTEP.id === steps[steps.length - 1].id) {
          // Si on supprime la dernière étape
          deleteRoute.mutate(routes[routes.length - 1].id);
        } else if (currentPOISTEP.id === steps[0].id) {
          // Si on supprime la première étape
          deleteRoute.mutate(routes[0].id);
        } else {
          // Si on supprime une étape intermédiaire
          deleteRoute.mutate(routes[currentIndex - 1].id);
          deleteRoute.mutate(routes[currentIndex].id);
          addRoute({
            idStart: steps[currentIndex - 1].id,
            idFinish: steps[currentIndex + 1].id,
          });
        }
      }

      // deleteStep.mutate(selectedMarker.marker.id);
      setSelectedMarker(null);
    }
  };

  const [confirmedDeleteDialogOpen2, setConfirmedDeleteDialogOpen2] =
    useState(false);

  const HandleCloseConfirmedSuppr2 = () => {
    setConfirmedDeleteDialogOpen2(false);
    // deletePoint.mutate(selectedMarker.marker.id);
    setSelectedMarker(null);
  };

  const handleChangeSelectModeEdit = (event) => {
    setEditionMode(event.target.value);
  };

  const addPoint = useMutation(TravelRequests.addPoint, {
    onSuccess: (point) => {
      queryClient.setQueryData(["getPoints", idTravel], (interestPoints) => [
        ...interestPoints,
        point,
      ]);
      setMessage("Point d'intérêt ajouté.");
      setColor("primary");
      setOpen(true);
    },
  });

  const addStep = useMutation(TravelRequests.addStep, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      setMessage("Étape ajoutée.");
      setColor("primary");
      setOpen(true);
    },
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
    },
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
    },
  });

  const updateRoute = useMutation(RouteRequest.updateRouteById, {
    onSuccess: (route) => {
      queryClient.invalidateQueries("getRoutes", idTravel);
    },
  });

  //Suppression de point
  const deletePoint = useMutation(TravelRequests.removePoint, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(["getPoints", idTravel], (interestPoints) =>
        interestPoints.filter((e) => e.id !== id)
      );
      setMessage("Point d'intérêt supprimé.");
      setColor("primary");
      setOpen(true);
    },
  });

  //Suppression d'étape
  const deleteStep = useMutation(TravelRequests.removeStep, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) =>
        steps.filter((e) => e.id !== id)
      );
      setMessage("Étape supprimé.");
      setColor("primary");
      setOpen(true);
    },
  });

  //Suppression de route
  const deleteRoute = useMutation(TravelRequests.removeRoute, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getRoutes", idTravel], (routes) =>
        routes.filter((e) => e.id !== id)
      ),
  });

  const onMapClick = (e) => {
    // on peut placer les points uniquement si on est en mode edition*
    setSelectedPoiOfMarker(null);
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
      } else if (selectedRoute !== null) {
        setSelectedRoute(null);
      }
    }
  };

  const selectInterestPointIcon = (interestPoint) => {
    if (selectedPoiOfMarker != null && selectedPoiOfMarker.length > 0) {
      for (let index = 0; index < selectedPoiOfMarker.length; index++) {
        if (selectedPoiOfMarker[index].id == interestPoint.id) {
          if (interestPoint.category == "Parc") {
            return parcSelected;
          } else if (interestPoint.category == "Musée") {
            return antiqueSelected;
          } else if (interestPoint.category == "Cinéma") {
            return cameraSelected;
          } else if (interestPoint.category == "Stade") {
            return stadeSelected;
          } else if (interestPoint.category == "Magasin") {
            return shopSelected;
          } else if (interestPoint.category == "Monument historique") {
            return castleSelected;
          } else if (interestPoint.category == "Restaurant") {
            return foodSelected;
          } else if (interestPoint.category == "Spectacle") {
            return theaterSelected;
          } else if (interestPoint.category == "Port") {
            return boatSelected;
          } else if (interestPoint.category == "Autre") {
            return selectedInterestPointIcon;
          } else {
            return selectedInterestPointIcon;
          }
        }
      }
      if (interestPoint.category == "Parc") {
        return parc;
      } else if (interestPoint.category == "Musée") {
        return antique;
      } else if (interestPoint.category == "Cinéma") {
        return camera;
      } else if (interestPoint.category == "Stade") {
        return stade;
      } else if (interestPoint.category == "Magasin") {
        return shop;
      } else if (interestPoint.category == "Monument historique") {
        return castle;
      } else if (interestPoint.category == "Restaurant") {
        return food;
      } else if (interestPoint.category == "Spectacle") {
        return theater;
      } else if (interestPoint.category == "Port") {
        return boat;
      } else if (interestPoint.category == "Autre") {
        return interestPointIcon;
      } else {
        return interestPointIcon;
      }
    } else {
      if (interestPoint.category == "Parc") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return parcSelected;
        } else {
          return parc;
        }
      } else if (interestPoint.category == "Musée") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return antiqueSelected;
        } else {
          return antique;
        }
      } else if (interestPoint.category == "Cinéma") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return cameraSelected;
        } else {
          return camera;
        }
      } else if (interestPoint.category == "Stade") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return stadeSelected;
        } else {
          return stade;
        }
      } else if (interestPoint.category == "Magasin") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return shopSelected;
        } else {
          return shop;
        }
      } else if (interestPoint.category == "Monument historique") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return castleSelected;
        } else {
          return castle;
        }
      } else if (interestPoint.category == "Restaurant") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return foodSelected;
        } else {
          return food;
        }
      } else if (interestPoint.category == "Spectacle") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return theaterSelected;
        } else {
          return theater;
        }
      } else if (interestPoint.category == "Port") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return boatSelected;
        } else {
          return boat;
        }
      } else if (interestPoint.category == "Autre") {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return selectedInterestPointIcon;
        } else {
          return interestPointIcon;
        }
      } else {
        if (
          selectedMarker?.marker.id == interestPoint.id &&
          selectedMarker?.type == "Point"
        ) {
          return selectedInterestPointIcon;
        } else {
          return interestPointIcon;
        }
      }
    }
  };

  // Fonction qui permet d'ajouter un point d'étape
  const addStepPoint = (e) => {
    const newStep = {
      title: "Etape_" + (steps.length + 1),
      latitude: parseFloat(e.latLng.lat()),
      longitude: parseFloat(e.latLng.lng()),
      description: JSON.stringify({
        blocks: [
          {
            key: "1j7kh",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
      duration: 1,
      TravelId: idTravel,
    };
    addStep.mutate(newStep);
    setStepAdded(true);
  };

  const addRoute = ({ idStart, idFinish }) => {
    const newRoute = {
      travelType: "",
      start: idStart,
      finish: idFinish,
      TravelId: idTravel,
    };
    createRoute.mutate(newRoute);
  };

  // Fonction qui permet d'ajouter un point d'interet
  const addInterestPoint = (e) => {
    const newPoint = {
      title: "POI_" + (interestPoints.length + 1),
      latitude: parseFloat(e.latLng.lat()),
      longitude: parseFloat(e.latLng.lng()),
      description: JSON.stringify({
        blocks: [
          {
            key: "1j7kh",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      }),
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
    <div style={{ height: "93.15%" }}>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_APIKEY}
        loadingElement={<Loading />}
      >
        {isLoadingS ? (
          <Loading />
        ) : isErrorS ? (
          <p style={{ color: "red" }}>{errorS.message}</p>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={10}
            onClick={onMapClick}
          >
            <Stack
              direction="column-reverse"
              spacing={2}
              style={{
                position: "absolute",
                bottom: "2%",
                left: "1%",
              }}
            >
              <MapModeSwitch
                handleSwitch={handleSwitch}
                isEdition={isEdition}
                markerFilter={markerFilter}
                handleChangeSelectModeEdit={handleChangeSelectModeEdit}
                handleChangeSelectModeNav={handleChangeSelectModeNav}
                editionMode={editionMode}
              ></MapModeSwitch>
              {showTimeline ? (
                <Button
                  onClick={() => {
                    setShowTimeline(!showTimeline);
                    setSelectedMarker(null);
                    setSelectedRoute(null);
                  }}
                  variant="outlined"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  Liste Étapes
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowTimeline(!showTimeline);
                    setSelectedMarker(null);
                    setSelectedRoute(null);
                  }}
                  variant="contained"
                >
                  Liste Étapes
                </Button>
              )}
            </Stack>

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
                  draggable={!error && isEdition}
                  clickable={true}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedPoiOfMarker(null);
                    setSelectedMarker(null);
                    setSelectedMarker({ marker: step, type: "Step" });
                    const PoisOfStep = [];
                    interestPoints.map((interestPoint) => {
                      interestPoint.StepId == step.id &&
                        PoisOfStep.push(interestPoint);
                    });

                    setSelectedPoiOfMarker(PoisOfStep);
                    setSelectedRoute(null);
                    setPosition({ lat: step.latitude, lng: step.longitude });
                    setShowTimeline(false);
                  }}
                  onRightClick={() => {
                    setConfirmedDeleteDialogOpen(true);
                    setCurrentPOISTEP(step);
                  }}
                  onDragEnd={updateStepLocation(step)}
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
                  draggable={!error && isEdition}
                  clickable={true}
                  onClick={() => {
                    setCurrentIndex(index);

                    setSelectedPoiOfMarker(null);
                    setSelectedMarker(null);
                    setSelectedMarker({ marker: interestPoint, type: "Point" });
                    setSelectedRoute(null);
                    setShowTimeline(false);
                  }}
                  onRightClick={() => {
                    if (!error && isEdition) {
                      setConfirmedDeleteDialogOpen2(true);
                      setCurrentPOISTEP(interestPoint);
                    }
                  }}
                  onDragEnd={updateInterestPointLocation(interestPoint)}
                  icon={selectInterestPointIcon(interestPoint)}
                ></Marker>
              ))
            )}
            {isLoadingR ? (
              <Loading />
            ) : isErrorR ? (
              <p style={{ color: "red" }}>{errorR.message}</p>
            ) : (
              <>
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
                                setSelectedRoute(null);
                                setSelectedRoute({
                                  route: routes[index - 1],
                                  start: steps[index - 1],
                                  finish: step,
                                });
                                setSelectedMarker(null);
                                setShowTimeline(false);
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
                              options={
                                routes[index - 1]?.travelType == "DRIVING"
                                  ? {
                                      strokeOpacity: 0,
                                      fillOpacity: 0,
                                      zIndex: 1,
                                      icons: [
                                        {
                                          icon: {
                                            path: "M -1 -1 -1 1 M 1 1 1 -1",
                                            strokeOpacity: 1,
                                            scale: 3,
                                            strokeColor: palette.primary.main,
                                          },
                                          offset: "0",
                                          repeat: "3px",
                                        },
                                      ],
                                    }
                                  : routes[index - 1]?.travelType == "WALKING"
                                  ? {
                                      strokeWeight: 8,
                                      strokeOpacity: 0,
                                      fillOpacity: 0,
                                      zIndex: 1,
                                      icons: [
                                        {
                                          icon: {
                                            path: "M 0,-1 0,-1",
                                            strokeOpacity: 1,
                                            scale: 5,
                                            strokeColor: palette.primary.main,
                                          },
                                          offset: "0",
                                          repeat: "10px",
                                        },
                                      ],
                                    }
                                  : routes[index - 1]?.travelType == "BICYCLING"
                                  ? {
                                      strokeWeight: 8,
                                      strokeOpacity: 0,
                                      fillOpacity: 0,
                                      zIndex: 1,
                                      icons: [
                                        {
                                          icon: {
                                            path: "M 0,-1 0, 1",
                                            strokeOpacity: 1,
                                            scale: 5,
                                            strokeColor: palette.primary.main,
                                          },
                                          offset: "0",
                                          repeat: "20px",
                                        },
                                      ],
                                    }
                                  : routes[index - 1]?.travelType == "TRANSIT"
                                  ? {
                                      strokeOpacity: 0,
                                      fillOpacity: 0,
                                      zIndex: 1,
                                      icons: [
                                        {
                                          icon: {
                                            path: "M -1 2 -1 -2 -1 0 -1.5 0 1.5 0 1 0 1 2 1 -2 ",
                                            strokeOpacity: 1,
                                            scale: 3,
                                            strokeColor: palette.primary.main,
                                          },

                                          offset: "0",
                                          repeat: "12px",
                                        },
                                      ],
                                    }
                                  : {
                                      strokeWeight: 5,
                                      strokeColor: palette.primary.main,
                                    }
                              }
                            ></Polyline>
                          )}
                        </>
                      ))}
                    </>
                  )
                )}
              </>
            )}
          </GoogleMap>
        )}
      </LoadScript>

      <Dialog
        open={confirmedDeleteDialogOpen}
        onClose={HandleCloseConfirmedSuppr}
      >
        <ConfirmedSuppressionModal
          message=" Confirmer la suppression de cette étape ?"
          id={currentPOISTEP?.id}
          onClose={setConfirmedDeleteDialogOpen}
          onDelete={deleteStep}
        />
      </Dialog>
      <Dialog
        open={confirmedDeleteDialogOpen2}
        onClose={HandleCloseConfirmedSuppr2}
      >
        <ConfirmedSuppressionModal
          message=" Confirmer la suppression de ce point d'intérêt ?"
          id={currentPOISTEP?.id}
          onClose={setConfirmedDeleteDialogOpen2}
          onDelete={deletePoint}
        />
      </Dialog>

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
              steps={steps}
              idTravel={idTravel}
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
            steps={steps}
            setSelectedPoiOfMarker={setSelectedPoiOfMarker}
            idTravel={idTravel}
          ></StepMenu>
        ))}
      {selectedRoute && (
        <RouteMenu
          selectedRoute={selectedRoute.route}
          start={selectedRoute.start}
          finish={selectedRoute.finish}
          setSelectedRoute={setSelectedRoute}
          isEdition={isEdition}
          updateRoute={updateRoute}
          idTravel={idTravel}
        ></RouteMenu>
      )}
      {showTimeline && (
        <StepTimeline
          steps={steps}
          isLoadingS={isLoadingS}
          isErrorS={isErrorS}
          errorS={errorS}
          setPosition={setPosition}
          setSelectedMarker={setSelectedMarker}
          expanded={expanded}
          setExpanded={setExpanded}
          setShowTimeline={setShowTimeline}
        ></StepTimeline>
      )}
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        color={color}
      ></CustomSnackbar>
    </div>
  );
};
