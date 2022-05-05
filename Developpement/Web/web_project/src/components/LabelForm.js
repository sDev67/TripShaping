import { Stack } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { useEffect, useState } from "react";

const LabelForm = ({ label, addLabel, updateLabel, onClose }) => {
  const [currentTitle, setCurrentTitle] = useState("");

  //   useEffect(() => {
  //     if (label.title !== undefined) {
  //       setCurrentTitle(label.title);
  //     }
  //   }, [label]);

  const handleClick = () => {

    if(label != undefined)
    {
      updateLabel({title:currentTitle, labelId:label.id});
    }

    if(currentTitle !== undefined)
    {
      addLabel({title:currentTitle});
    }
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
