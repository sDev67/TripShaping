import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  DirectionService,
  Marker,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_APIKEY } from "../utils";
import CircularProgress from "@mui/material/CircularProgress";

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

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
}

const position = {
  lat: 37.772,
  lng: -122.214,
};

export const Map = () => {
  const [steps, setSteps] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
    if (selectedMarker !== null) {
      setSelectedMarker(null)
    }
    else {
      setSteps((oldArray) => [
        ...oldArray,
        { name: oldArray.length, position: e.latLng },
      ]);
    }
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
              clickable={true}
              onClick={() => setSelectedMarker(steps[index])}
            ></Marker>
          ))}

          <DirectionsRenderer />
        </GoogleMap>
      </LoadScript>
      {selectedMarker && <>
        <aside style={asideStyle}>
          <h3>Titre</h3>
          <textarea value={selectedMarker.name}></textarea>
          <hr />
          <h3>Catégorie</h3>
          <textarea></textarea>
          <hr />
          <h3>Description</h3>
          <textarea></textarea>
          <hr />
          <h3>Documents</h3>
        </aside>
      </>}
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
