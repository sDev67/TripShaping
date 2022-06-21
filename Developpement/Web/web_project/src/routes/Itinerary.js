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

const Itinerary = () => {
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
        <Map
          steps={steps}
          isLoadingS={isLoadingS}
          isErrorS={isErrorS}
          errorS={errorS}
        ></Map>
      )}
    </>
  );
};

export default Itinerary;
