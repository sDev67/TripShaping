import React, { useState, useEffect } from "react";

import {

  Stack,
  Typography,

} from "@mui/material";

import Loading from "../utils/Loading";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import StepList from "../components/StepList";
import StepTimeline from "../components/StepTimeline";
import { addDays, changeDateFormat } from "./../utils/DateFormatting";

const Steps = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: steps,
  } = useQuery(["getSteps", idTravel], () =>
    TravelRequests.getStepsOfTravel(idTravel)
  );

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travel,
  } = useQuery(["getTravel", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (steps) calculTotalDuration(steps);
  }, [steps]);

  const calculTotalDuration = (steps) => {
    let duration = 0;

    steps.map((step) => {
      duration = duration + step.duration;
    });
    setTotalDuration(duration);
  };

  return (
    <>
      <Stack
        height="93.15%"
        width="100%"
        direction="column"
        style={{ overflowY: "scroll" }}
      >
        {isLoadingT ? (
          <Loading></Loading>
        ) : isErrorT ? (
          <p style={{ color: "red" }}>{errorT.message}</p>
        ) : (
          <Stack
            width="90%"
            marginLeft="5%"
            paddingY="1%"
            direction="column"
            height="100%"
          >
            {isLoadingS ? (
              <Loading></Loading>
            ) : isErrorS ? (
              <p style={{ color: "red" }}>{errorS.message}</p>
            ) : (
              <div>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={10}
                >
                  <Typography variant="h4" marginY={1}>
                    Nombre d'étapes : {steps.length}
                  </Typography>
                  <Typography variant="h4" marginY={1}>
                    Date de départ : {changeDateFormat(travel.startDate)}
                  </Typography>
                  <Typography variant="h4" marginY={1}>
                    Date d'arrivée : {addDays(travel.startDate, totalDuration)}
                  </Typography>
                  <Typography variant="h4" marginY={1}>
                    Durée totale :{" "}
                    {totalDuration > 1 ? (
                      <Typography variant="body">
                        {totalDuration} jours
                      </Typography>
                    ) : (
                      <Typography variant="body">
                        {totalDuration} jour
                      </Typography>
                    )}
                  </Typography>
                </Stack>
                <StepList steps={steps} startDate={travel.startDate}></StepList>
              </div>
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Steps;
