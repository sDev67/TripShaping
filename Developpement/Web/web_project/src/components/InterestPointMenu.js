import React, { useState } from "react";
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
import { FileUploader } from "react-drag-drop-files";
import { useQueryClient } from 'react-query';

const InterestPointMenu = ({
  deletePoint,
  selectedMarker,
  setSelectedMarker,
  updateInfoPoint,
  isEdition
}) => {
  const queryClient = useQueryClient();

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState(selectedMarker.title);
  const [category, setCategory] = useState(selectedMarker.category);
  const [description, setDescription] = useState(selectedMarker.description);
  const [lengthOfStay, setLengthOfStay] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const categ = [
    {
      value: 'Parc',
    },
    {
      value: 'Musée',
    },
    {
      value: 'Cinéma',
    },
    {
      value: 'Stade',
    },
    {
      value: 'Magasin',
    },
    {
      value: 'Monument historique',
    },
    {
      value: 'Restaurant',
    },
    {
      value: 'Spectacle',
    },
    {
      value: 'Nature',
    },
    {
      value: 'Port',
    },
    {
      value: 'Autre',
    },
    
    
  ];

 // Fonction qui met a jour les propriétés d'un point d'interet
  const updateInterestPointInfo = (pointId) => (e) => {
    if(isEdition){
      const newPoint = {
        title: title,
        category: category,
        description: description,
        idPoint: pointId.id
      };
      updateInfoPoint.mutate(newPoint);
      setSelectedMarker(null);
    }  
  };
  

  return (
    <>
      <Card style={{ right: "3%", top: "5%", width: 400, position: "fixed", height:"90%" }}>
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
            value={title}
            onChange={(e) =>setTitle(e.target.value)}
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
            {/* <TextField
              fullWidth
              select
              label="Etape associée"
              value={selectedMarker.category}
              onChange={(e) => setCategorie(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem>Etape 1</MenuItem>
              <MenuItem>Etape 2</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Jour"
              value={selectedMarker.category}
              onChange={(e) => setCategorie(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
            </TextField> */}
          </Stack>
          
          <Stack
            style={{ marginBottom: 25 }}
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            {/* <TextField
              fullWidth
              select
              label="Documents"
              value=""
              //value={selectedMarker.location.files}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {files.map((file, index) => (
                <MenuItem key={index}>{file.name}</MenuItem>
              ))}
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
            </Button> */}
          </Stack>

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: 25 }}
            InputLabelProps={{
              shrink: true,
            }}
            disabled={!isEdition}

          />

          <Stack direction="row" justifyContent="space-between">
            {isEdition && <>
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
                //onClick={updateProperties(selectedMarker)}
                onClick={updateInterestPointInfo(selectedMarker)}

              >
                Enregistrer
              </Button>
              </>
            }
            
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
