import { Stack } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { useEffect, useState } from "react";

const LabelForm = ({ label, addLabel, updateLabel, onClose }) => {
  const [currentTitle, setCurrentTitle] = useState("");

  const handleClick = () => {

    if (label != undefined) {
      if (currentTitle != undefined && currentTitle != null && currentTitle != "") {

        updateLabel({ title: currentTitle, labelId: label.id });
      }
    }

    if (currentTitle != undefined && currentTitle != null && currentTitle != "") {
      addLabel({ title: currentTitle });
    }

    onClose();
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Créer un label
        </Typography>
        <Stack direction="row" width="100%" spacing={1}>
          <TextField
            required
            id="secondary-required"
            label="Nom"
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
            onClick={handleClick}
          >
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LabelForm;
