import React from "react";
import { Map } from "../components/Map";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import {
  Stack,
  Divider,
  Tab,
  Tabs,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Loading from "./../utils/Loading";
import { MapAlbum } from "../components/MapAlbum";
import { MapDisplay } from "../components/MapDisplay";

const ItineraryDisplay = () => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  // Etapes
  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: steps,
  } = useQuery(["getSteps", idTravel], () =>
    TravelRequests.getStepsOfTravel(idTravel)
  );
  return (
    <>
      {isLoadingS ? (
        <Loading />
      ) : isErrorS ? (
        <p style={{ color: "red" }}>{errorS.message}</p>
      ) : (
        <MapDisplay
          steps={steps}
          isLoadingS={isLoadingS}
          isErrorS={isErrorS}
          errorS={errorS}
        ></MapDisplay>
      )}
    </>
  );
};

export default ItineraryDisplay;
