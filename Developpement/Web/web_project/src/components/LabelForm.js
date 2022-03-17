import { Stack } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { useEffect, useState } from "react";

const LabelForm = ( {addLabel} ) => {
  const [currentTitle, setCurrentTitle] = useState("");

  //   useEffect(() => {
  //     if (label.title !== undefined) {
  //       setCurrentTitle(label.title);
  //     }
  //   }, [label]);



  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginY={2}>
          Créer un label
        </Typography>
        <Stack direction="row" width="100%" spacing={1}>
          <TextField
            id="secondary-required"
            label="Nom"
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
            onClick={addLabel(currentTitle)}
          >
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LabelForm;
