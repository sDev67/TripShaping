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


const StepItem = ({step, index, updateInfoStep}) => {

    const [title, setTitle] = useState(step.title);
    const [category, setCategory] = useState(step.category);
    const [description, setDescription] = useState(step.description);
    const [duration, setDuration] = useState(step.duration);

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

      const updateStepInfo = (id) => (e) => {
        const newStep = {
          title: title,
          duration: duration,
          category: category,
          description: description,
          idStep: id,
        };
        updateInfoStep.mutate(newStep);
        
      };

      

  return (
    <Accordion key={index} style={{ backgroundColor: "#F5F5F5" }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Stack direction="column">
              <Stack direction="row" alignItems="center" spacing={5}>
                <Typography variant="h5">{index + 1}.</Typography>
                  <Typography variant="h5" style={{ fontWeight: "normal" }}>
                    {title}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  
                  id={"duration" + index}
                  label="Durée"
                  style={{maxWidth:"10%"}}
                  variant="standard"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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

              {/* <TextField
                id={"description" + index}
                label="Description"
                multiline
                rows={10}
                value={description}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
                    
              <RichTextEditor setValue={setDescription} value={description} limitedEditor={true} minH='300px'/>


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
              onClick={updateStepInfo(step.id)}
            >
              Enregistrer
            </Button>
          </AccordionDetails>
        </Accordion>
  )
}

export default StepItem