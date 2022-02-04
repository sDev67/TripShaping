import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  DirectionService
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import CircularProgress from "@mui/material/CircularProgress";

const containerStyle = {
  width: "1800px",
  height: "950px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const position = {
  lat: 37.772,
  lng: -122.214,
};


export const Map = () => {
  const [steps, setSteps] = useState([]);

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
    setSteps((oldArray) => [
      ...oldArray,
      { name: "Serkan", position: e.latLng },
    ]);
  };

  const dragMarker = (id, e) => {
    console.log(id);
  };


  

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
          {/* Child components, such as markers, info windows, etc. */}
          {steps.map((step, index) => (
            <Marker
              key={index}
              position={step.position}
              draggable={true}
              onCLick={() => console.log(step.name)}
            ></Marker>
          ))}

          <DirectionsRenderer />
        </GoogleMap>
      </LoadScript>
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
