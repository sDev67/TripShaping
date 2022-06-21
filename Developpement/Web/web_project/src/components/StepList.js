import React, { useState, useEffect } from "react";

import {
  Box,
} from "@mui/material";

import { useQueryClient, useMutation } from "react-query";
import StepRequests from "../requests/StepRequests";
import TravelRequests from "../requests/TravelRequests";
import { useParams } from "react-router-dom";
import StepItem from "./StepItem";

const StepList = ({ steps, startDate }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [dates, setDates] = useState([]);

  const updateInfoStep = useMutation(StepRequests.updateStepInfoById, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      queryClient.invalidateQueries("getSteps");
    },
  });

  const deleteStep = useMutation(TravelRequests.removeStep, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      queryClient.invalidateQueries("getSteps");
    },
  });

  useEffect(() => {
    let dayCounter = 0;
    let dates = [];
    dates.push(0);
    steps.forEach((step) => {
      dates.push(step.duration + dayCounter);
      dayCounter += step.duration;
    });
    setDates(dates);
  }, []);

  return (
    <Box marginBottom={5}>
      {steps.map((step, index) => (
        <StepItem
          deleteStep={deleteStep}
          date={dates[index]}
          step={step}
          index={index}
          updateInfoStep={updateInfoStep}
          steps={steps}
          startDate={startDate}
        ></StepItem>
      ))}
    </Box>
  );
};

export default StepList;
