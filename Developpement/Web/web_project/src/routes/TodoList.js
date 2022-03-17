import "../Styles/ButtonStyles.css";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack, Divider, Typography, Dialog, Chip, Box } from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { useState } from "react";
import "../App.css";
import TasksItemGrid from "../components/TasksItemGrid";
import LabelsItemGrid from "../components/LabelsItemGrid";
import IconButton from "@mui/material/IconButton";
import TaskForm from "../components/TaskForm";
import LabelForm from "../components/LabelForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const [currentLabel, setCurrentLabel] = useState();
  const [currentTask, setCurrentTask] = useState();
  const [allTasks, setAllTasks] = useState([
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les valises",
      executionDate: "2022-07-07",
      labels: [
        {
          title: "Serkan",
        },
        {
          title: "Vivien",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les valises",
      executionDate: "2022-07-07",
      labels: [
        {
          title: "Serkan",
        },
        {
          title: "Vivien",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les papiers",
      executionDate: "2022-05-07",
      labels: [
        {
          title: "Benjamin",
        },
      ],
    },
    {
      title: "Faire les valises",
      executionDate: "2022-07-07",
      labels: [
        {
          title: "Serkan",
        },
        {
          title: "Vivien",
        },
      ],
    },
    {
      title: "Organiser les repas",
      executionDate: "2022-05-14",
      labels: [
        {
          title: "Nourriture",
        },
        {
          title: "Philippe",
        },
        {
          title: "Courses",
        },
      ],
    },
    {
      title: "Préparer psychologiquement les enfants",
      executionDate: "2022-04-07",
      labels: [
        {
          title: "Baptiste",
        },
      ],
    },
    {
      title: "Faire les valises",
      executionDate: "2022-07-07",
      labels: [
        {
          title: "Serkan",
        },
        {
          title: "Vivien",
        },
      ],
    },
    {
      title: "Faire les valises",
      executionDate: "2022-07-07",
      labels: [
        {
          title: "Serkan",
        },
        {
          title: "Vivien",
        },
      ],
    },
    {
      title: "Trouver une voiture de location",
      executionDate: "2022-04-07",
      labels: [
        {
          title: "Réservation",
        },
        {
          title: "Enzo",
        },
      ],
    },
  ]);
  const [allLabels, setAllLabels] = useState([
    {
      id:1,
      title: "Benjamin",
    },
    {
      id:2,
      title: "Vivien",
    },
    {
      id:3,
      title: "Serkan",
    },
    {
      id:4,
      title: "Baptiste",
    },
    {
      id:5,
      title: "Enzo",
    },
    {
      id:6,
      title: "Philippe",
    },
    {
      id:7,
      title: "Nourriture",
    },
    {
      id:8,
      title: "Réservation",
    },
    {
      id:9,
      title: "Administration",
    },
    {
      id:10,
      title: "Passeport",
    },
    {
      id:11,
      title: "Courses",
    },
  ]);

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [labelFormOpen, setLabelFormOpen] = useState(false);

  const OnAddLabel = ({ label }) => {
    setAllLabels(...allLabels, label);
  };

  const addLabel = (title) => {
    // console.log("AJouter un label");
    // setAllLabels((oldArray) => [...oldArray,
    // {
    //     title:"caca"
    // }])
  };

  const OnSelectTask = (task) => {
    setCurrentTask(task);
  };

  const OnAddTask = ({ label }) => {
    setAllTasks(...allTasks, label);
  };

  const OnRemoveTask = ({ task }) => {};

  const OnAddLabelToTask = ({ label, task }) => {};

  const OnRemoveLabelToTask = ({ label, task }) => {
    //allTasks[task].labels
  };

  const OnDeleteLabel = ({ label }) => {};

  return (
    <>
      <Stack height="100%" width="100%" direction="row">
        <Stack direction="column" width="100%">
          <Typography
            color="primary"
            variant="h2"
            textAlign="center"
            marginTop={4}
          >
            Tâches
          </Typography>
          <Stack
            marginLeft="5%"
            width="90%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">Liste des tâches</Typography>
            <IconButton
              aria-label="Add"
              color="primary"
              onClick={(e) => setTaskFormOpen(true)}
            >
              <AddCircleIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </Stack>
          <Stack
            marginLeft="5%"
            marginY={2}
            width="90%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="h5" marginLeft={5} marginRight={10}>
              Filtrer
            </Typography>
            <Stack direction="row">
              <Chip
                style={{ margin: 5 }}
                size="medium"
                color="primary"
                label="Benjamin"
              />
              <Chip
                style={{ margin: 5 }}
                size="medium"
                color="primary"
                label="Benjamin"
              />
              <Chip
                style={{ margin: 5 }}
                size="medium"
                color="primary"
                label="Benjamin"
              />
            </Stack>
          </Stack>
          <Divider></Divider>
          <TasksItemGrid
            tasks={allTasks}
            OnRemoveLabelToTask={OnRemoveLabelToTask}
            OnSelectTask={OnSelectTask}
          />
       
        </Stack>
        <Stack direction="column" width="25%">
          <Stack
            marginTop="50px"
            marginLeft="5%"
            width="90%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">Labels</Typography>
            <IconButton
              aria-label="Add"
              color="secondary"
              onClick={(e) => setLabelFormOpen(true)}
            >
              <AddCircleIcon sx={{ fontSize: "45px" }} />
            </IconButton>
          </Stack>
          <Divider></Divider>

          <DragDropContext>
            <Droppable droppableId="labels" direction="vertical">
              {(provided) => (
                <Stack direction="column" alignItems="center" spacing={1}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  
                  sx={{
                    padding: 1,
                    
                  }}
                >
                  {allLabels.map((label, index) => {
                    return (
                      <Draggable key={`draggable-${label.id}`} draggableId={`draggable-${label.id}`} index={index}>
                        {(provided) => (
                          <Chip
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            size="medium"
                            color="secondary"
                            label={label.title}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      </Stack>

      <Dialog open={taskFormOpen} onClose={() => setTaskFormOpen(false)}>
        <TaskForm></TaskForm>
      </Dialog>
      <Dialog open={labelFormOpen} onClose={() => setLabelFormOpen(false)}>
        <LabelForm addLabel={addLabel}></LabelForm>
      </Dialog>
    </>
  );
};

export default TodoList;
