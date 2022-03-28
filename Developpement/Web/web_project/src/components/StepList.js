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

const StepList = ({ steps }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [titles, setTitles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [durations, setDurations] = useState([]);

  const updateInfoStep = useMutation(StepRequests.updateStepInfoById, {
    onSuccess: (step) =>
    {
      queryClient.setQueryData(["getSteps", idTravel], (steps) => [
        ...steps,
        step,

      ]);
      queryClient.invalidateQueries('getSteps');
    }
    
      
  });
  

  const updateStepInfo = (index, id) => (e) => {
    const newStep = {
      title: document.getElementById("title" + index).value,
      duration: parseInt(document.getElementById("duration" + index).value),
      category: document.getElementById("category" + index).textContent,
      description: document.getElementById("description" + index).value,
      idStep: id,
    };
    updateInfoStep.mutate(newStep);
    
  };

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
    <Box id="test" marginBottom={5}>
      {steps.map((step, index) => (
        <Accordion key={index} style={{ backgroundColor: "#F5F5F5" }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Stack direction="column">
              <Stack direction="row" alignItems="center" spacing={5}>
                <Typography variant="h5">{index + 1}.</Typography>
                  <Typography variant="h5" style={{ fontWeight: "normal" }}>
                    {step.title}
                  </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5" style={{ fontWeight: "normal" }}>
                    3
                  </Typography>
                  <InsertDriveFileRoundedIcon color="primary"></InsertDriveFileRoundedIcon>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5" style={{ fontWeight: "normal" }}>
                    1
                  </Typography>
                  <LocationOnRounded color="error"></LocationOnRounded>
                </Stack>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Divider></Divider>
            <Stack direction="column" spacing={5} marginTop={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  id={"title" + index}
                  fullWidth
                  label="Titre"
                  variant="standard"
                  defaultValue={step.title}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  
                  id={"duration" + index}
                  label="Durée"
                  style={{maxWidth:"10%"}}
                  variant="standard"
                  defaultValue={step.duration}
                  endAdornment={
                    <InputAdornment position="end">jours</InputAdornment>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">jours</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id={"category" + index}
                  fullWidth
                  variant="standard"
                  select
                  label="Catégorie"
                  defaultValue={step.category}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {categ.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                id={"description" + index}
                label="Description"
                multiline
                rows={10}
                defaultValue={step.description}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="body"
                  style={{ fontWeight: "bold" }}
                  color="primary"
                >
                  Documents :
                </Typography>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                />
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={updateStepInfo(index, step.id)}
            >
              Enregistrer
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default StepList;
