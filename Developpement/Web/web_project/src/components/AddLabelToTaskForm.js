import { Autocomplete, Typography, Stack,TextField,Button } from "@mui/material";
import { useEffect } from "react";

const AddLabelToTask = ({labels, addLabelToTask,setLabelToAdd, task}) => 
{

    useEffect(() => {
        console.log(labels);
    }, []);

    return(
        <>
              <Stack
        direction="column"
        alignItems="center"
        
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Ajouter un label à {task.title}
        </Typography>
                    <Autocomplete
                        style={{ width: "100%", marginBottom: "10px"}}
                        noOptionsText={"Aucun label trouvé"}
                        options={labels}
                        fullWidth
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
                        style={{ width: "25%" }}
                        variant="contained"
                        onClick={(e) => {
                          addLabelToTask();

                        }}
                      >
                        Ajouter
                      </Button>
        </Stack>
        </>
    )
}

export default AddLabelToTask;