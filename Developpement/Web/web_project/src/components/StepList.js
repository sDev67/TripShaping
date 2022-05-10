import React, { useState } from "react";

import {
  Stack,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  Divider,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import StepRequests from "../requests/StepRequests";
import { useParams } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import StepItem from "./StepItem";

const StepList = ({ steps }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const updateInfoStep = useMutation(StepRequests.updateStepInfoById, {
    onSuccess: (step) => {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,
      ]);
      queryClient.invalidateQueries("getSteps");
    },
  });

  // // const handleCategoryChange = (index) => (e) => {
  // //   let newCategories = [...categories];
  // //   newCategories[index] = e.target.value;
  // //   setCategories(newCategories);
  // // };

  // const handleDescriptionChange = (index) => (e) => {
  //   console.log(document.getElementById("title" + index).value)
  //   console.log(document.getElementById("duration" + index).value)
  //   console.log(document.getElementById("category" + index).textContent)
  //   console.log(document.getElementById("description" + index).value)
  // };

  const categ = [
    {
      value: "Hôtel",
    },
    {
      value: "Gîtes",
    },
    {
      value: "Camping",
    },
    {
      value: "Palace",
    },
    {
      value: "Autre",
    },
  ];

  return (
    <Box marginBottom={5}>
      {steps.map((step, index) => (
        <StepItem
          step={step}
          index={index}
          updateInfoStep={updateInfoStep}
        ></StepItem>
      ))}
    </Box>
  );
};

export default StepList;
