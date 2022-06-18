import React, { useState } from "react";
import DocumentsList from "../components/DocumentsList";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CircularProgress,
  TextField,
  Popover,
  Stack,
  CardMedia,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  Alert,
  Collapse,
  DialogTitle,
  Icon,
  Typography,
  IconButton,
} from "@mui/material";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import DocumentRequest from "../requests/DocumentRequest";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";

const Documents = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  let queryClient = useQueryClient();

  const {
    isLoading: isLoadingD,
    isError: isErrorD,
    error: errorD,
    data: documents,
  } = useQuery(["getDocumentsOfTravel", idTravel], () =>
    DocumentRequest.getDocumentsByTravelId(idTravel)
  );

  const addDocument = useMutation(DocumentRequest.uploadFile, {
    onSuccess: (document) => {
      queryClient.invalidateQueries(["getDocumentsOfTravel", idTravel]);
    },
  });

  const addFile = (file) => {
    const formData = new FormData();
    formData.append("title", file);
    formData.append("TravelId", idTravel);

    console.log(...formData);

    addDocument.mutate(formData);
  };

  return (
    <Stack height="93.15%" width="100%" direction="column">
      <Stack
        width="90%"
        marginLeft="5%"
        paddingY="1%"
        direction="column"
        height="100%"
      >
        <Stack direction="column" height="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" marginY={1}>
              Liste des documents du voyage
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
              requestKeyTitle="getDocumentsOfTravel"
              requestKeyValue={idTravel}
              isEdition={true}
              show={true}
            ></DocumentsList>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Documents;
