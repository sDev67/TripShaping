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
import RichTextEditor from "./RichTextEditor";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import DocumentRequest from "../requests/DocumentRequest";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import DocumentsList from "./DocumentsList";

const StepItem = ({ step, index, updateInfoStep }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

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

  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfStep", step.id], () =>
    DocumentRequest.getDocumentsByStepId(step.id)
  );

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("StepId", step.id);

    console.log(...formData);

    DocumentRequest.uploadFile(formData);
  };

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
        <Stack direction="row" spacing={5} width="50%">
          <Stack direction="row" alignItems="center" spacing={1} width="60%">
            <Typography variant="h5">{index + 1}.</Typography>
            <Typography
              variant="h5"
              style={{ fontWeight: "normal" }}
              width="30%"
            >
              {title}
            </Typography>
          </Stack>

          <Typography variant="h5" width="15%">
            {duration} jours
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} width="5%">
            {isLoadingD ? (
              <Loading />
            ) : isErrorD ? (
              <p style={{ color: "red" }}>{errorD.message}</p>
            ) : (
              <Typography variant="h5" style={{ fontWeight: "normal" }}>
                {documents.length}
              </Typography>
            )}

            <InsertDriveFileRoundedIcon color="primary"></InsertDriveFileRoundedIcon>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} width="5%">
            <Typography variant="h5" style={{ fontWeight: "normal" }}>
              1
            </Typography>
            <LocationOnRounded color="error"></LocationOnRounded>
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
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id={"duration" + index}
              label="Durée"
              style={{ maxWidth: "10%" }}
              variant="outlined"
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
              variant="outlined"
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

          <RichTextEditor
            setValue={setDescription}
            value={description}
            limitedEditor={true}
            minH="300px"
          />

          <Stack spacing={1} direction="column" height="160px">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" color="primary">
                Documents
              </Typography>
              <Button
                style={{ paddingLeft: 32, paddingRight: 32 }}
                startIcon={<UploadFileRounded />}
                variant="contained"
                component="label"
              >
                Ajouter
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    addFile(e.target.files[0]);
                  }}
                  required
                />
              </Button>
            </Stack>
            {isLoadingD ? (
              <Loading />
            ) : isErrorD ? (
              <p style={{ color: "red" }}>{errorD.message}</p>
            ) : (
              <DocumentsList
                documents={documents}
                requestKeyTitle="getDocumentsOfPoint"
                requestKeyValue={step.id}
                isEdition={true}
              ></DocumentsList>
            )}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
            onClick={updateStepInfo(step.id)}
          >
            Enregistrer
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default StepItem;
