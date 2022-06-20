import React, { useState, useEffect } from "react";

import {
  Stack,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
  Divider,
  CardHeader,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Card,
  Grid,
  CardContent,
  Dialog,
  CardMedia,
  IconButton,
  Tooltip,
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
import StepRequests from "../requests/StepRequests";
import CancelRounded from "@mui/icons-material/CancelRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import PointRequests from "./../requests/PointRequests";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { addDays } from "../utils/DateFormatting";

const StepItem = ({ step, index, updateInfoStep, steps, startDate, date }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const [title, setTitle] = useState(step.title);
  const [description, setDescription] = useState(step.description);
  const [duration, setDuration] = useState(step.duration);

  const [informationDialogOpen, setInformationDialogOpen] = useState(false);

  const HandleCloseAddLabelForm = () => {
    setInformationDialogOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [selectedInterestPoint, setSelectedInterestPoint] = useState({});

  const handleSelectInterestPoint = (point) => {
    setSelectedInterestPoint(point);
    setOpen(true);
  };

  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfStep", step.id], () =>
    DocumentRequest.getDocumentsByStepId(step.id)
  );

  const {
    isLoading: isLoadingP,
    isError: isErrorP,
    error: errorP,
    data: points,
  } = useQuery(["getPointsOfStep", step.id], () =>
    StepRequests.getPointsOfStep(step.id)
  );

  const addDocument = useMutation(DocumentRequest.uploadFile, {
    onSuccess: (document) => {
      queryClient.invalidateQueries(["getDocumentsOfStep", step.id]);
    },
  });

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("StepId", step.id);

    addDocument.mutate(formData);
  };

  const updateStepInfo = (id) => (e) => {
    const newStep = {
      title: title,
      duration: duration,
      description: description,
      idStep: id,
    };
    updateInfoStep.mutate(newStep);
  };

  return (
    <>
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
            <Tooltip title="Durée de l'étape" arrow>
              <Typography variant="h5" width="15%">
                {duration} jours
              </Typography>
            </Tooltip>

            <Tooltip title="Date du début de l'étape" arrow>
              <Typography variant="h5" width="15%">
                {addDays(startDate, date)}
              </Typography>
            </Tooltip>

            <Tooltip title="Documents" arrow>
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
            </Tooltip>
            <Tooltip title="Points d'intérêts" arrow>
              <Stack direction="row" alignItems="center" spacing={1} width="5%">
                {isLoadingP ? (
                  <Loading />
                ) : isErrorP ? (
                  <p style={{ color: "red" }}>{errorP.message}</p>
                ) : (
                  <Typography variant="h5" style={{ fontWeight: "normal" }}>
                    {points.length}
                  </Typography>
                )}
                <LocationOnRounded color="secondary"></LocationOnRounded>
              </Stack>
            </Tooltip>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Divider></Divider>
          <Stack direction="column" spacing={3} marginTop={2}>
            <div>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                marginBottom={2}
              >
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
              </Stack>
              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DoneRounded />}
                  onClick={updateStepInfo(step.id)}
                >
                  Enregistrer
                </Button>
              </Stack>
            </div>

            <Typography variant="h6" color="primary">
              Description
              <IconButton onClick={() => setInformationDialogOpen(true)}>
                <EditRoundedIcon />
              </IconButton>
            </Typography>

            <RichTextEditor
              setValue={setDescription}
              value={description}
              limitedEditor={true}
              isReadOnly={true}
              information={false}
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
                  requestKeyTitle="getDocumentsOfStep"
                  requestKeyValue={step.id}
                  isEdition={true}
                  show={false}
                ></DocumentsList>
              )}
            </Stack>
            {isLoadingP ? (
              <Loading />
            ) : isErrorP ? (
              <p style={{ color: "red" }}>{errorP.message}</p>
            ) : (
              <div style={{ overflowY: "scroll", height: "200px" }}>
                <Grid container spacing={5}>
                  {Array.from(Array(duration), (index, day) => {
                    return (
                      <Grid key={index} item xs={3}>
                        <Card>
                          <CardHeader
                            title={
                              <Typography variant="h5" color="primary">
                                Jour {day + 1}
                              </Typography>
                            }
                          ></CardHeader>
                          <CardContent>
                            {points.map(
                              (point) =>
                                point.day === day + 1 && (
                                  <Button
                                    onClick={() =>
                                      handleSelectInterestPoint(point)
                                    }
                                    fullWidth
                                    color="primary"
                                  >
                                    <Typography variant="h7">
                                      {point.title}
                                    </Typography>
                                  </Button>
                                )
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <InterestPointMenuBis
          selectedInterestPoint={selectedInterestPoint}
          steps={steps}
          setOpen={setOpen}
        ></InterestPointMenuBis>
      </Dialog>
      <Dialog open={informationDialogOpen} onClose={HandleCloseAddLabelForm}>
        <RichTextEditor
          setValue={setDescription}
          value={description}
          limitedEditor={false}
          OnClose={HandleCloseAddLabelForm}
          minH="300px"
          isReadOnly={false}
          maxW="600px"
          information={false}
        />
      </Dialog>
    </>
  );
};

const InterestPointMenuBis = ({ selectedInterestPoint, steps, setOpen }) => {
  const queryClient = useQueryClient();

  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  // Documents by id
  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfPoint", selectedInterestPoint.id], () =>
    DocumentRequest.getDocumentsByPointId(selectedInterestPoint.id)
  );

  const addDocument = useMutation(DocumentRequest.uploadFile, {
    onSuccess: (document) => {
      queryClient.invalidateQueries(["getDocumentsOfPoint", selectedInterestPoint.id]);
    },
  });

  const updateInfoPoint = useMutation(PointRequests.updatePointInfoById, {
    onSuccess: (point) => {
      queryClient.setQueryData(
        ["getPointsOfStep", selectedStep.id],
        (interestPoints) => [...interestPoints, point]
      );
      queryClient.invalidateQueries(["getPointsOfStep", selectedStep.id]);
      queryClient.invalidateQueries(["getPointsOfStep", stepId]);
      setStepId(selectedStep.id);
    },
  });

  const [title, setTitle] = useState(selectedInterestPoint.title);
  const [category, setCategory] = useState(selectedInterestPoint.category);
  const [description, setDescription] = useState(
    selectedInterestPoint.description
  );
  const [stepId, setStepId] = useState(selectedInterestPoint.StepId);
  const [selectedStep, setSelectedStep] = useState(null);
  const [days, setDays] = useState([]);
  const [dayStep, setDayStep] = useState(selectedInterestPoint.day);
  const listSteps = steps;

  const [informationDialogOpen, setInformationDialogOpen] = useState(false);

  const categ = [
    {
      value: "Parc",
    },
    {
      value: "Musée",
    },
    {
      value: "Cinéma",
    },
    {
      value: "Stade",
    },
    {
      value: "Magasin",
    },
    {
      value: "Monument historique",
    },
    {
      value: "Restaurant",
    },
    {
      value: "Spectacle",
    },
    {
      value: "Port",
    },
    {
      value: "Autre",
    },
  ];

  const fillDays = () => {
    if (selectedStep) {
      setDays([]);
      for (let i = 0; i < selectedStep.duration; i++) {
        let day = { date: "Jour " + (i + 1), value: i + 1 };
        setDays((days) => [...days, day]);
      }
    }
  };

  useEffect(() => {
    if (stepId) {
      if (listSteps) {
        listSteps.forEach((step) => {
          if (step.id === stepId) {
            setSelectedStep(step);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (selectedStep) {
      fillDays();
    }
  }, [selectedStep]);

  // Fonction qui met a jour les propriétés d'un point d'interet
  const updateInterestPointInfo = (pointId) => (e) => {
    const newPoint = {
      title: title,
      category: category,
      description: description,
      idPoint: pointId.id,
      StepId: selectedStep?.id,
      day: dayStep,
    };
    updateInfoPoint.mutate(newPoint);
    setOpen(false);
  };

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("PointId", selectedInterestPoint.id);

    addDocument.mutate(formData);
  };

  return (
    <>
      <Card
        style={{
          right: "3%",
          top: "8%",
          width: 400,
          position: "fixed",
          height: "90%",
        }}
      >
        <CardMedia
          component="img"
          height="120"
          image={require("../assets/pointInterets.JPG")}
        />
        <IconButton
          color="error"
          onClick={() => setOpen(false)}
          style={{ position: "absolute", right: 5, top: 5 }}
        >
          <CancelRounded />
        </IconButton>

        <CardContent
          style={{
            overflowY: "auto",
          }}
        >
          <TextField
            fullWidth
            label="Nom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>

          <TextField
            fullWidth
            select
            label="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginBottom: 25 }}
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
          <Stack
            style={{ marginBottom: 25 }}
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <TextField
              fullWidth
              select
              label="Etape associée"
              value={selectedStep}
              onChange={(e) => setSelectedStep(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {listSteps &&
                listSteps.map((step, index) => (
                  <MenuItem key={index} value={step}>
                    {step.title}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Jour associé"
              value={dayStep}
              onChange={(e) => setDayStep(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={selectedStep ? false : true}
            >
              {days.map((day, index) => (
                <MenuItem key={index} value={day.value}>
                  {day.date}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack
            style={{ marginBottom: 25 }}
            spacing={1}
            direction="column"
            height="160px"
          >
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
                requestKeyValue={selectedInterestPoint.id}
                show={false}
              ></DocumentsList>
            )}
          </Stack>

          <Typography variant="h6" color="primary">
            Description
            <IconButton onClick={() => setInformationDialogOpen(true)}>
              <EditRoundedIcon />
            </IconButton>
          </Typography>
          <div style={{ marginBottom: 25 }}>
            <RichTextEditor
              setValue={setDescription}
              value={description}
              limitedEditor={true}
              isReadOnly={true}
              information={false}
              minH="150px"
            />
          </div>

          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteRounded />}
              style={{ visibility: "hidden" }}
            >
              Supprimer
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={updateInterestPointInfo(selectedInterestPoint)}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        open={informationDialogOpen}
        onClose={() => setInformationDialogOpen(false)}
      >
        <RichTextEditor
          setValue={setDescription}
          value={description}
          limitedEditor={false}
          OnClose={() => setInformationDialogOpen(false)}
          minH="300px"
          isReadOnly={false}
          maxW="600px"
          information={false}
        />
      </Dialog>
    </>
  );
};

export default StepItem;
