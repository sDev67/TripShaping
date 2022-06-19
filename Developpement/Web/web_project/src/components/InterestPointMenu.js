import React, { useEffect, useState } from "react";
import {
  Card,
  TextField,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import DocumentRequest from "../requests/DocumentRequest";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RichTextEditor from "./RichTextEditor";
import DocumentsList from "./DocumentsList";
import { cryptedNameToTravelId } from "../utils/CryptedNameFormatting";

const InterestPointMenu = ({
  deletePoint,
  selectedMarker,
  setSelectedMarker,
  updateInfoPoint,
  isEdition,
  steps,
  hideDocuments,
  idTravel,
}) => {
  const queryClient = useQueryClient();

  // Documents by id
  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfPoint", selectedMarker.id], () =>
    DocumentRequest.getDocumentsByPointId(selectedMarker.id)
  );

  const addDocument = useMutation(DocumentRequest.uploadFile, {
    onSuccess: (document) => {
      queryClient.invalidateQueries(["getDocumentsOfPoint", selectedMarker.id]);
    },
  });

  const [informationDialogOpen, setInformationDialogOpenOpen] = useState(false);

  const HandleCloseAddLabelForm = () => {
    setInformationDialogOpenOpen(false);
  };

  const [title, setTitle] = useState(selectedMarker.title);
  const [category, setCategory] = useState(selectedMarker.category);
  const [description, setDescription] = useState(selectedMarker.description);
  const [descriptionHTML, setDescriptionHTML] = useState(
    selectedMarker.descriptionHTML
  );
  const [stepId, setStepId] = useState(selectedMarker.StepId);
  const [selectedStep, setSelectedStep] = useState(null);
  const [days, setDays] = useState([]);
  const [dayStep, setDayStep] = useState(selectedMarker.day);
  const listSteps = steps;

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
    if (isEdition) {
      const newPoint = {
        title: title,
        category: category,
        description: description,
        descriptionHTML: descriptionHTML,
        idPoint: pointId.id,
        StepId: selectedStep?.id,
        day: dayStep,
      };
      updateInfoPoint.mutate(newPoint);
      setSelectedMarker(null);
    }
  };

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("PointId", selectedMarker.id);
    console.log(...formData);

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
          onClick={() => setSelectedMarker(null)}
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
            disabled={!isEdition}
          />
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
            disabled={!isEdition}
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
              disabled={!isEdition}
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
              disabled={isEdition && selectedStep ? false : true}
            >
              {days.map((day, index) => (
                <MenuItem key={index} value={day.value}>
                  {day.date}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {hideDocuments ? (
            <></>
          ) : (
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
                  disabled={!isEdition}
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
                  requestKeyValue={selectedMarker.id}
                  isEdition={isEdition}
                ></DocumentsList>
              )}
            </Stack>
          )}

          <Typography variant="h6" color="primary">
            Description
            <IconButton
              disabled={!isEdition}
              onClick={(e) => setInformationDialogOpenOpen(true)}
            >
              <EditRoundedIcon />
            </IconButton>
          </Typography>
          <div style={{ marginBottom: 25 }}>
            <RichTextEditor
              setValueHTML={setDescriptionHTML}
              setValue={setDescription}
              value={description}
              limitedEditor={true}
              openFormEditor={setInformationDialogOpenOpen}
              minH="150px"
              isReadOnly={!isEdition}
              maxW="350px"
              information={false}
            />
          </div>

          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={() => {
                deletePoint.mutate(selectedMarker.id);
                setSelectedMarker(null);
              }}
              disabled={!isEdition}
            >
              Supprimer
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={updateInterestPointInfo(selectedMarker)}
              disabled={!isEdition}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={informationDialogOpen} onClose={HandleCloseAddLabelForm}>
        <RichTextEditor
          setValue={setDescription}
          setValueHTML={setDescriptionHTML}
          value={description}
          limitedEditor={false}
          OnClose={HandleCloseAddLabelForm}
          minH="300px"
          isReadOnly={!isEdition}
          maxW="600px"
          information={false}
        />
      </Dialog>
    </>
  );
};

export default InterestPointMenu;
/*


*/
