import React, { useState, useEffect } from "react";

import {
  Stack,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import Loading from "../utils/Loading";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";

import StepList from "../components/StepList";
import StepTimeline from "../components/StepTimeline";

const Steps = () => {
  const idTravel = 1;
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: steps,
  } = useQuery(["getSteps", idTravel], () =>
    TravelRequests.getStepsOfTravel(idTravel)
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
      <Stack height="100%" width="100%" direction="column" style={{overflowY:"scroll"}} >
        <Typography
          color="primary"
          variant="h2"
          textAlign="center"
          marginTop={4}
        >
          Etapes
        </Typography>
      
        <Stack width="90%" marginLeft="5%" direction="column" height="85%"  >
          {isLoadingS ? (
            <Loading></Loading>
          ) : isErrorS ? (
            <p style={{ color: "red" }}>{errorS.message}</p>
          ) : (
            <div>
              <StepTimeline steps={steps}></StepTimeline>
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
                  Durée totale :{" "}
                  {totalDuration > 1 ? (
                    <Typography variant="body">
                      {totalDuration} jours
                    </Typography>
                  ) : (
                    <Typography variant="body">{totalDuration} jour</Typography>
                  )}
                </Typography>
              </Stack>
              <StepList steps={steps}></StepList>
            </div>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Steps;
