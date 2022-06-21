import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneRounded from "@mui/icons-material/DoneRounded";
import { AirlineSeatReclineNormalRounded } from "@mui/icons-material";

const TaskForm = ({
  task,
  OnAddTask,
  UpdateTask,
  onClose,
  setOpen,
  setMessage,
  setColor,
}) => {
  const [currentTitle, setCurrentTitle] = useState("");

  const [currentDate, setCurrentDate] = useState("");

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleTitleChange = (newTitle) => {
    setCurrentTitle(newTitle);
  };

  useEffect(() => {
    setCurrentTitle("");
    setCurrentDate(undefined);
    if (task !== undefined) {
      if (task.title !== undefined) {
        setCurrentTitle(task.title);
      }

      if (task.date !== undefined) {
        setCurrentDate(task.date);
      }
    }
  }, [task]);

  const handleSubmit = () => {
    if (task !== undefined) {
      UpdateTask({ title: currentTitle, date: currentDate, task });
    } else {
      if (
        currentTitle != undefined &&
        currentTitle != null &&
        currentTitle != ""
      ) {
        OnAddTask({ title: currentTitle, date: currentDate });
      } else {
        setMessage("Veuillez renseigner un nom.");
        setColor("error");
        setOpen(true);
      }
      // on la créer
    }

    setCurrentTitle("");
    setCurrentDate(undefined);

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
          {task != undefined ? "Modifier une tâche" : "Créer une tâche"}
        </Typography>

        <Stack direction="row" width="100%" spacing={1}>
          <TextField
            required
            id="standard-required"
            label="Nom"
            value={currentTitle !== undefined ? currentTitle : ""}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <TextField
            id="date"
            label="Date"
            value={currentDate !== undefined ? currentDate : undefined}
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
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default TaskForm;
