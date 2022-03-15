import {
  Button,
  tabsListUnstyledClasses,
  TextField,
  Typography,
} from "@mui/material";
import { Stack, Box, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DoneRounded from "@mui/icons-material/DoneRounded";

const TripForm = () => {
  const [name, setName] = useState("");

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const handleSubmit = () => {};

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Nouveau Voyage
        </Typography>

        <Stack direction="row" width="100%" spacing={1}>
          <TextField
            id="standard-required"
            label="Nom"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
          >
            Créer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default TripForm;
