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
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const containerStyle = {
  width: window.innerWidth,
  height: window.innerHeight,
};


const center = {
  lat: 48.5734053,
  lng: 7.7521113,
};

// const position = {
//   lat: 37.772,
//   lng: -122.214,
// };

export const Map = ({choice, pointToDisplay, labelChoice, handleChangeSelectModeNav}) => {

  const [steps, setSteps] = useState([]);
  const [interestPoint, setInterestPoint] = useState([]);

  const [valueEditionMode, setValueEditionMode] = React.useState("stepOnly");

  const handleChangeSelectModeEdit = (event) => {
    setValueEditionMode(event.target.value);
  };
  

  useEffect(() => {
    //rien
  }, [pointToDisplay])

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
    if (choice){
      
      if(valueEditionMode === "stepOnly"){
        setSteps((oldArray) => [
          ...oldArray,
          { name: "etape", position: e.latLng },
        ]);
      }
      else{
        setInterestPoint((oldArr) => [
          ...oldArr,
          { name: "point interet", position: e.latLng},
        ]);
      }
    
    }
    
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //const img = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";


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
        <Button 
          aria-describedby={id} 
          variant="contained" 
          onClick={handleClick}

          style={{
              background: 'none', 
              backgroundColor: 'white',
              border:'0px',
              padding:'0px 17px',
              textTransform: 'none',
              appearance: 'none',
              position:'absolute',
              bottom:'2rem',
              left: '10 px',
              zIndex: 10,
              cursor: "pointer",
              textAlign: "center",
              height: '40px',
              verticalAlign: 'middle',
              boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
              color:'rgb(86 86 86)',
              fontFamily:'Roboto, Arial, sans-serif',
              fontSize:'18px',
              
              
            }}>
                {labelChoice}
        </Button>
         
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
         { !choice && 
              <FormControl>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={pointToDisplay}
                onChange={handleChangeSelectModeNav}
              >
                <FormControlLabel value="all" control={<Radio />} label="Tout" />
                <FormControlLabel value="stepOnly" control={<Radio />} label="Etapes" />
                <FormControlLabel value="interestPointOnly" control={<Radio />} label="Points d'intérêt" />

              </RadioGroup>
            </FormControl>

            }

            {choice && 
              <FormControl>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueEditionMode}
                onChange={handleChangeSelectModeEdit}
              >
                <FormControlLabel value="stepOnly" control={<Radio />} label="Etapes" />
                <FormControlLabel value="interestPointOnly" control={<Radio />} label="Points d'intérêt" />

              </RadioGroup>
            </FormControl>              
            }
           
      
      </Popover>
       
   
   
      {/* Child components, such as markers, info windows, etc. */}
    
          {
            (pointToDisplay === "stepOnly" || pointToDisplay === "all") && 
            steps.map((step, index) => (
              <Marker
                key={index}
                position={step.position}
                draggable={true}
                clickable={true}
                
              >
              </Marker>
            ))

          }
          {
            (pointToDisplay === "interestPointOnly" || pointToDisplay === "all") &&
            interestPoint.map((interestStep, index) => (
              <Marker
                key={index}
                position={interestStep.position}
                draggable={true}
                clickable={true}                
                icon={{
                  path:
                    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                  fillColor: "green",
                  fillOpacity: 1,
                  scale: 1.9,
                  strokeColor: "black",
                  strokeWeight: 1,
                }}
                            
                title={"TEST"}

              >
              </Marker>
          ))
          }
        
          

          <DirectionsRenderer />
        </GoogleMap>
      </LoadScript>
      
    </>
  );
};