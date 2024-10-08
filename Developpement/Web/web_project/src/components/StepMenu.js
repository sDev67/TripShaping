import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import RichTextEditor from "./RichTextEditor";
import DocumentRequest from "../requests/DocumentRequest";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DocumentsList from "./DocumentsList";
import ConfirmedSuppressionModal from "./ConfirmedSuppressionModal";
import Loading from "../utils/Loading";
import TravelRequests from "../requests/TravelRequests";
import { addDays } from "../utils/DateFormatting";

const StepMenu = ({
  deleteStep,
  selectedMarker,
  setSelectedMarker,
  updateInfoStep,
  isEdition,
  steps,
  setSelectedPoiOfMarker,
  hideDocuments,
  idTravel,
}) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(selectedMarker.title);
  const [description, setDescription] = useState(selectedMarker.description);
  const [descriptionHTML, setDescriptionHTML] = useState(
    selectedMarker.descriptionHTML
  );

  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] =
    useState(false);
  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);
    setSelectedMarker(null);
  };

  const [duration, setDuration] = useState(selectedMarker.duration);

  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(
    ["getDocumentsOfStep", selectedMarker.id],
    () => DocumentRequest.getDocumentsByStepId(selectedMarker.id),
    { enabled: !hideDocuments }
  );

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: travel,
  } = useQuery(["getTravel", idTravel], () =>
    TravelRequests.getTravelByid(idTravel)
  );

  const [days, setDays] = useState();

  useEffect(() => {
    let dayCounter = 0;
    let stop = false;

    steps.forEach((step) => {
      if (!stop) {
        if (step.id === selectedMarker.id) {
          stop = true;
        } else {
          dayCounter += step.duration;
        }
      }
    });

    setDays(dayCounter);
  }, []);

  const addDocument = useMutation(DocumentRequest.uploadFile, {
    onSuccess: (document) => {
      queryClient.invalidateQueries(["getDocumentsOfStep", selectedMarker.id]);
    },
  });

  const [informationDialogOpen, setInformationDialogOpenOpen] = useState(false);

  const HandleCloseAddLabelForm = () => {
    setInformationDialogOpenOpen(false);
  };

  // Fonction qui met a jour les propriétés d'un point d'interet
  const updateStepInfo = (step) => (e) => {
    if (isEdition) {
      const newPoint = {
        title: title,
        description: description,
        descriptionHTML: descriptionHTML,
        duration: duration,
        idStep: step.id,
      };
      updateInfoStep.mutate(newPoint);
      setSelectedMarker(null);
    }
  };

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);
    formData.append("StepId", selectedMarker.id);

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
          image={require("../assets/etapes.png")}
        />
        <IconButton
          color="error"
          onClick={() => {
            setSelectedMarker(null);
            setSelectedPoiOfMarker(null);
          }}
          style={{ position: "absolute", right: 5, top: 5 }}
        >
          <CancelRounded />
        </IconButton>

        <CardContent>
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
          <Stack direction="row" spacing={2}>
            {isLoadingT ? (
              <Loading />
            ) : isErrorT ? (
              <p style={{ color: "red" }}>{errorT.message}</p>
            ) : (
              <TextField
                fullWidth
                label="Date du début de l'étape"
                type="text"
                value={addDays(travel.startDate, days)}
                style={{ marginBottom: 25 }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
            )}
            <TextField
              fullWidth
              label="Durée du séjour"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ marginBottom: 25 }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!isEdition}
            />
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
                  requestKeyTitle="getDocumentsOfStep"
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
                setConfirmedDeleteDialogOpen(true);
              }}
              disabled={!isEdition}
            >
              Supprimer
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={updateStepInfo(selectedMarker)}
              disabled={!isEdition}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={informationDialogOpen} onClose={HandleCloseAddLabelForm}>
        <RichTextEditor
          setValueHTML={setDescriptionHTML}
          setValue={setDescription}
          value={description}
          limitedEditor={false}
          OnClose={HandleCloseAddLabelForm}
          minH="300px"
          isReadOnly={!isEdition}
          maxW="600px"
          information={false}
        />
      </Dialog>
      <Dialog
        open={confirmedDeleteDialogOpen}
        onClose={HandleCloseConfirmedSuppr}
      >
        <ConfirmedSuppressionModal
          id={selectedMarker.id}
          onClose={HandleCloseConfirmedSuppr}
          message="Confirmer la suppression de cette étape ?"
          onDelete={deleteStep}
        />
      </Dialog>
    </>
  );
};

export default StepMenu;
