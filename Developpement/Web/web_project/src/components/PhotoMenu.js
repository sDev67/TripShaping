import React from "react";
import {
  ImageListItemBar,
  ImageListItem,
  Dialog,
} from "@mui/material";

const PhotoMenu = ({ setSelectedPhoto, selectedPhoto }) => {
  const image = "https://images.unsplash.com/photo-1551782450-a2132b4ba21d";
  return (
    <Dialog
      open={selectedPhoto ? true : false}
      onClose={() => setSelectedPhoto(false)}
    >
      <ImageListItem>
        <img
          style={{}}
          src={`data:image/jpeg;base64,${selectedPhoto.dataFile1 + selectedPhoto.dataFile2
            }`}
        />
        <ImageListItemBar title={selectedPhoto.date} />
      </ImageListItem>
    </Dialog>
  );
};

export default PhotoMenu;
