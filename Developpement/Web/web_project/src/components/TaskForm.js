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

const TaskForm = ({ task, OnAddTask }) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentLabels, setCurrentLabels] = useState([]);

  const [currentDate, setCurrentDate] = useState("");


  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleTitleChange = (newTitle) => {
    setCurrentTitle(newTitle);
  };

  const handleSubmit = () => {
    if (task !== undefined) {
      // Vérifié si la tâche n'est pas nouvelle
      // Mettre à jour la nouvelle tâche
    } else {


      OnAddTask({title:currentTitle, date:currentDate});
      // on la créer
    }
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Ajouter une tâche
        </Typography>

        <Stack direction="row" width="100%" spacing={1}>
          <TextField
            id="standard-required"
            label="Nom"
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <TextField
            id="date"
            label="Date"
            type="date"
            onChange={(e) => handleDateChange(e.target.value)}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
            onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Stack>
        {/* <Box sx={{width:'75%', maxWidth:'75%', bgColor:'grey', flexDirection:'row'}}>
                    <Stack component='nav' direction='row' flexWrap='wrap' spacing={0} margin={1}>
                        {currentLabels !== undefined ? currentLabels.map((label) =>(
                            <>
                                <Chip style={{margin:5, padding:10}} size='medium' color='primary' label={label.title} />
                            </>
                        )) : ""} 
                        <IconButton aria-label="Add">
                            <AddCircleIcon sx={{fontSize:'35px'}} color='primary' />
                        </IconButton>          
                    </Stack>            
                </Box> */}
      </Stack>
    </>
  );
};

export default TaskForm;
