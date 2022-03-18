import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { CircularProgress, Alert, Collapse } from "@mui/material";
import palette from "./../theme/palette";
import InterestPointMenu from "./InterestPointMenu";
import StepMenu from "./StepMenu";
import MapModeSwitch from "./MapModeSwitch";
import RouteMenu from "./RouteMenu";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from 'react-query';

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const position = {
  lat: 48.5734053,
  lng: 7.7521113,
};

export const Map = ({ }) => {
  const queryClient = useQueryClient();

  const idTravel = 1
  const [isEdition, setIsEdition] = useState(false);
  const [switchText, setSwitchText] = useState("Navigation");
  const [markerFilter, setMarkerFilter] = useState("all");
  const [editionMode, setEditionMode] = useState("stepOnlyEdit");

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [stepos, setSteps] = useState([]);
  const { isLoading: isLoadingS, isError: isErrorS, error: errorS, data: steps } = useQuery(
    ['getSteps', idTravel], () => TravelRequests.getStepsOfTravel(idTravel)
  );

  const [interestPointos, setInterestPoints] = useState([]);
  const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: interestPoints } = useQuery(
    ['getPoints', idTravel], () => TravelRequests.getPointsOfTravel(idTravel)
  );
  //console.log(interestPoints)

  const [routes, setRoutes] = useState([]);

  //const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const stepIcon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  const InterestPointIcon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

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
    onSuccess: point => queryClient.setQueryData(
      ['getPoints', idTravel],
      interestPoints => [...interestPoints, point]
    )
  });

  const addStep = useMutation(TravelRequests.addStep, {
    onSuccess: step => queryClient.setQueryData(
      ['getSteps', idTravel],
      steps => [...steps, step]
    )
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
            const newStep = {
              title: "",
              latitude: parseFloat(e.latLng.lat()),
              longitude: parseFloat(e.latLng.lng()),
              description: "",
              category: "",
              duration: 1,
              TravelId: idTravel
            }

            addStep.mutate(newStep);
          }
        }
        // ici : editionMode === "interestPointOnlyEdit")
        else {
          if (!error) {
            const newPoint = {
              title: "",
              latitude: parseFloat(e.latLng.lat()),
              longitude: parseFloat(e.latLng.lng()),
              description: "",
              category: "",
              TravelId: idTravel
            }

            console.log(newPoint);

            addPoint.mutate(newPoint);
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
        console.log(e.latLng.lat())
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

          {(markerFilter === "stepOnlyNav" ||
            markerFilter === "stepOnlyEdit" ||
            markerFilter === "all") &&
            isLoadingS ? 'Chargement...' : isErrorS ? <p style={{ color: 'red' }}>{errorS.message}</p> :
            steps.map((step, index) => (
              <Marker
                key={index}
                position={{ lat: step.latitude, lng: step.longitude }}
                draggable={!error && isEdition}
                clickable={true}
                onClick={() => {
                  setSelectedMarker({ marker: steps[index], type: "Step" });
                  setSelectedRoute(null);
                }}
                onRightClick={() => deleteMarker(step)}
                onDragEnd={updateLocation(index, step)}
                icon={stepIcon}
              ></Marker>
            ))}

          {(markerFilter === "interestPointOnlyNav" ||
            markerFilter === "interestPointOnlyEdit" ||
            markerFilter === "all") &&
            isLoadingP ? 'Chargement...' : isErrorP ? <p style={{ color: 'red' }}>{errorP.message}</p> :
            interestPoints.map((interestPoint, index) => (
              <Marker
                key={index}
                name="Point"
                position={{
                  lat: interestPoint.latitude,
                  lng: interestPoint.longitude,
                }}
                draggable={!error && isEdition}
                clickable={true}
                onClick={() => {
                  setSelectedMarker({ marker: interestPoints[index], type: "Point" });
                  setSelectedRoute(null);
                }}
                onRightClick={() => deleteMarker(interestPoint)}
                onDragEnd={updateLocation(index, interestPoint)}
                icon={InterestPointIcon}
              ></Marker>
            ))}

          {isLoadingS ? 'Chargement...' : isErrorS ? <p style={{ color: 'red' }}>{errorS.message}</p> :
            steps.length >= 2 &&
            !(!isEdition && markerFilter === "interestPointOnlyNav") &&
            (
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
            )}
        </GoogleMap>
      </LoadScript>
      {selectedMarker &&
        (selectedMarker.type === "Point" ? isLoadingP ? 'Chargement...' : isErrorP ? <p style={{ color: 'red' }}>{errorP.message}</p> : (
          <InterestPointMenu
            interestPoints={interestPoints}
            setInterestPoints={setInterestPoints}
            selectedMarker={selectedMarker.marker}
            setSelectedMarker={setSelectedMarker}
            deleteMarker={deleteMarker}
          ></InterestPointMenu>
        ) : (
          selectedMarker.type === "Step" && isLoadingS ? 'Chargement...' : isErrorS ? <p style={{ color: 'red' }}>{errorS.message}</p> : (
            <StepMenu
              steps={steps}
              setSteps={setSteps}
              selectedMarker={selectedMarker.marker}
              setSelectedMarker={setSelectedMarker}
              deleteMarker={deleteMarker}
            ></StepMenu>
          )
        ))}
      {
        selectedRoute && (
          <RouteMenu
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
          ></RouteMenu>
        )
      }

      <Collapse
        in={error}
        style={{
          position: "absolute",
          textAlign: "center",
          bottom: 10,
          marginLeft: "700px",
        }}
      >
        <Alert variant="filled" severity="error" onClose={() => closeAlert()}>
          Désolé, nous n'avons pas pu calculer l'itinéraire.
        </Alert>
      </Collapse>
    </>
  );
};
