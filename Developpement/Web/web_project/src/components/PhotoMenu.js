import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CircularProgress,
  TextField,
  Popover,
  ImageListItemBar,
  ImageListItem,
  CardContent,
  Dialog,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CancelRounded from "@mui/icons-material/CancelRounded";

const PhotoMenu = ({ setSelectedPhoto, selectedPhoto }) => {
  const image = "https://images.unsplash.com/photo-1551782450-a2132b4ba21d";
  return (
    <Dialog
      open={selectedPhoto ? true : false}
      onClose={() => setSelectedPhoto(false)}
    >
      <ImageListItem>
        <img
          src={`${image}?w=1000&fit=crop&auto=format`}
          srcSet={`${image}?w=1000&fit=crop&auto=format&dpr=2 2x`}
          alt="test"
          loading="lazy"
        />
        <ImageListItemBar title={selectedPhoto.date} />
      </ImageListItem>
    </Dialog>
  );
};

export default PhotoMenu;
