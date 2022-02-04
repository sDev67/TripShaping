import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Alert, Collapse } from "@mui/material";

const containerStyle = {
  width: "1800px",
  height: "950px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export const Map = () => {
  const [steps, setSteps] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

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
    if (!error) {
      setSteps((oldArray) => [
        ...oldArray,
        {
          location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          stopover: true,
        },
      ]);
    }
  };

  const changeLocation = (index) => (e) => {
    if (!error) {
      let newSteps = [...steps];
      newSteps[index] = {
        location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        stopover: true,
      };
      setSteps(newSteps);
    }
  };

  const deleteMarker = (step) => {
    if (!error) {
      let newSteps = [...steps];
      newSteps = newSteps.filter((e) => e !== step);
      setSteps(newSteps);
    }
  };

  const closeAlert = () => {
    setError(false);
    let newSteps = [...steps];
    newSteps = newSteps.filter((e) => e !== steps[steps.length - 1]);
    setSteps(newSteps);
  };

  const directionsCallback = useCallback((res) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else if (res !== null && res.status === "ZERO_RESULTS") {
      setError(true);
      //deleteMarker(steps[steps.length]);
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
          center={center}
          zoom={10}
          onClick={onMapClick}
        >
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
          {/* Child components, such as markers, info windows, etc. */}
          {steps.map((step, index) => (
            <Marker
              key={index}
              position={{ lat: step.location.lat, lng: step.location.lng }}
              draggable={!error}
              onClick={() => console.log("click on marker " + index)}
              onRightClick={() => deleteMarker(step)}
              onDragEnd={changeLocation(index)}
            ></Marker>
          ))}
        </GoogleMap>
      </LoadScript>
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

// import * as React from "react";
// import { useState } from "react";
// import ReactMapGL, { Marker, Layer } from "react-map-gl";
// import { ReactComponent as MarkerIcon } from "../resources/position-marker.svg";

// export const Map = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8,
//   });

//   const [lngLat, setlngLat] = useState([0, 0]);

//   function addMarker(event) {
//     const coordinates = event.lngLat;
//     setlngLat(coordinates);
//     console.log(lngLat);
//   }

//   return (
//     <ReactMapGL
//       {...viewport}
//       width={1600}
//       height={1080}
//       onViewportChange={(nextViewport) => setViewport(nextViewport)}
//       mapboxApiAccessToken="pk.eyJ1IjoiYnVja2kiLCJhIjoiY2t5eDM0amJ0MGU4YTJwcDhyc3FrZHBtaiJ9.3Gpf_CKqNQ0Skewsn8Jouw"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       attributionControl={false}
//       dragRotate={false}
//       onClick={addMarker}
//     >
//       <Marker
//         latitude={lngLat[1]}
//         longitude={lngLat[0]}
//         offsetLeft={-16}
//         offsetTop={-32}
//       >
//         <MarkerIcon />
//       </Marker>
//     </ReactMapGL>
//   );
// };
