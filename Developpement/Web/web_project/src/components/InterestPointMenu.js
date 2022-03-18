import React, { useState } from "react";
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
import palette from "./../theme/palette";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";
import UploadFileRounded from "@mui/icons-material/UploadFileRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";
import { FileUploader } from "react-drag-drop-files";
import { useQuery, useQueryClient, useMutation } from 'react-query';

const InterestPointMenu = ({
  deletePoint,
  selectedMarker,
  setSelectedMarker,
  interestPoints,
  setInterestPoints,
}) => {
  const queryClient = useQueryClient();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [lengthOfStay, setLengthOfStay] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  let handleChangeTitle = (e) => { };

  const updateProperties = (marker) => (e) => {
    let newInterestPoint = [...interestPoints];
    newInterestPoint[marker.id] = {
      location: {
        id: marker.id,
        name: "PointInteret",
        title: marker.location.title,
        categorie: marker.location.categorie,
        files: [],
        description: marker.location.description,
        lat: marker.location.lat,
        lng: marker.location.lng,
      },
      stopover: true,
    };
    setInterestPoints(newInterestPoint);
  };

  return (
    <>
      <Card style={{ right: 60, top: 30, width: 400, position: "fixed" }}>
        <CardMedia
          component="img"
          height="194"
          image={require("../assets/pointInterets.JPG")}
        />
        <IconButton
          color="error"
          onClick={() => setSelectedMarker(null)}
          style={{ position: "absolute", right: 5, top: 5 }}
        >
          <CancelRounded />
        </IconButton>

        <CardContent>
          <TextField
            fullWidth
            label="Nom"
            value={selectedMarker.title}
            onChange={handleChangeTitle}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            select
            label="Catégorie"
            value={selectedMarker.category}
            onChange={(e) => setCategorie(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem>Musées</MenuItem>
            <MenuItem>Parcs</MenuItem>
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
              label="Documents"
              value=""
              //value={selectedMarker.location.files}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {/* {files.map((file, index) => (
                <MenuItem key={index}>{file.name}</MenuItem>
              ))} */}
            </TextField>

            <Button
              style={{ paddingLeft: 32, paddingRight: 32 }}
              variant="contained"
              color="primary"
              startIcon={<UploadFileRounded />}
              onClick={() => setDialogOpen(true)}
            >
              {" "}
              Ajouter
            </Button>
          </Stack>

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={10}
            value={selectedMarker.description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteRounded />}
              onClick={() => { deletePoint.mutate(selectedMarker.id); setSelectedMarker(null) }}
            >
              Supprimer
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneRounded />}
              onClick={updateProperties(selectedMarker)}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div style={{ margin: 10, marginTop: 0 }}>
          <Typography variant="h3" marginY={2}>
            Ajouter un fichier
          </Typography>
          <FileUploader
            handleChange={(file) => setFiles((oldArray) => [...oldArray, file])}
          />
        </div>
      </Dialog>
    </>
  );
};

export default InterestPointMenu;
