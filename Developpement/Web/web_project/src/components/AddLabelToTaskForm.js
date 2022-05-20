import { DoneRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useEffect } from "react";

const AddLabelToTask = ({ labels, addLabelToTask, setLabelToAdd, task }) => {
  useEffect(() => {
    console.log(labels);
  }, []);

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Ajouter un label
        </Typography>
        <Stack direction="row" width="100%" spacing={1}>
          <Autocomplete
            style={{ minWidth: "200px" }}
            noOptionsText={"Aucun label trouvé"}
            options={labels}
            onChange={(event, value) => {
              setLabelToAdd(value);
            }}
            autoHighlight
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <Stack
                direction="row"
                component="li"
                {...props}
                alignItems="center"
                spacing={1}
              >
                <Typography>{option.title}</Typography>
              </Stack>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Button
            color="secondary"
            variant="contained"
            startIcon={<DoneRounded />}
            onClick={(e) => {
              addLabelToTask();
            }}
          >
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AddLabelToTask;
