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
import TravelRequests from "../requests/TravelRequests";
import TodoListRequest from "../requests/TodoListRequest";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";

const TodoList = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingT,
    isError: isErrorT,
    error: errorT,
    data: tasks,
  } = useQuery(["getTasks", idTravel], () =>
    TravelRequests.getTasksOfTravel(idTravel)
  );
  const {
    isLoading: isLoadingL,
    isError: isErrorL,
    error: errorL,
    data: labels,
  } = useQuery(["getLabels", idTravel], () =>
    TravelRequests.getLabelsOfTravel(idTravel)
  );

  const updateTask = useMutation(TodoListRequest.updateTaskById, {
    onSuccess: (task) =>
      queryClient.setQueryData(["getTasks", idTravel], (tasks) => [
        ...tasks,
        task,
      ]),
  });
  const updateLabel = useMutation(TodoListRequest.updateLabelById, {
    onSuccess: (label) =>
      queryClient.setQueryData(["getLabels", idTravel], (labels) => [
        ...labels,
        label,
      ]),
  });

  const addTask = useMutation(TravelRequests.addTask, {
    onSuccess: (task) =>
      queryClient.setQueryData(["getTasks", idTravel], (tasks) => [
        ...tasks,
        task,
      ]),
  });
  const addLabel = useMutation(TravelRequests.addLabel, {
    onSuccess: (label) =>
      queryClient.setQueryData(["getLabels", idTravel], (labels) => [
        ...labels,
        label,
      ]),
  });

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [labelFormOpen, setLabelFormOpen] = useState(false);

  const OnAddLabel = ({ title }) => {
    const newLabel = {
      title: title,
      TravelId: idTravel,
    };

    addLabel.useMutation(newLabel);
  };

  const OnSelectTask = (task) => {
    //setCurrentTask(task);
  };

  const OnAddTask = ({ title, date }) => {
    const newTask = {
      title: title,
      date: date,
      TravelId: idTravel,
    };

    addTask.mutate(newTask);
  };

  const OnRemoveTask = ({ task }) => {};

  const OnAddLabelToTask = ({ label, task }) => {};

  const OnRemoveLabelToTask = ({ label, task }) => {
    //allTasks[task].labels
  };

  const OnDeleteLabel = ({ label }) => {};

  return (
    <>
      <Stack height="93.15%" width="100%" direction="row">
        <Stack direction="column" width="100%">
          <Stack
            marginLeft="5%"
            width="90%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">Liste des tâches</Typography>
            <IconButton
              aria-label="Add"
              color="primary"
              onClick={(e) => setTaskFormOpen(true)}
            >
              <AddCircleIcon sx={{ fontSize: "60px" }} />
            </IconButton>
          </Stack>
          {isLoadingT ? (
            <Typography>Chargement...</Typography>
          ) : isErrorT ? (
            <Typography>{errorT}</Typography>
          ) : (
            <>
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
                    color="secondary"
                    label="Benjamin"
                  />
                </Stack>
              </Stack>
              <Divider></Divider>
              <TasksItemGrid
                tasks={tasks}
                OnRemoveLabelToTask={OnRemoveLabelToTask}
                OnSelectTask={OnSelectTask}
              />
            </>
          )}
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
            <Typography variant="h4">Labels</Typography>
            <IconButton
              aria-label="Add"
              color="secondary"
              onClick={(e) => setLabelFormOpen(true)}
            >
              <AddCircleIcon sx={{ fontSize: "45px" }} />
            </IconButton>
          </Stack>
          <Divider></Divider>
          {isLoadingL ? (
            <Typography>Chargement...</Typography>
          ) : isErrorL ? (
            <Typography>{errorL}</Typography>
          ) : (
            <>
              <DragDropContext>
                <Droppable droppableId="labels" direction="vertical">
                  {(provided) => (
                    <Stack
                      direction="column"
                      alignItems="center"
                      spacing={1}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        padding: 1,
                      }}
                    >
                      {labels.map((label, index) => {
                        return (
                          <Draggable
                            key={`draggable-${label.id}`}
                            draggableId={`draggable-${label.id}`}
                            index={index}
                          >
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
            </>
          )}
        </Stack>
      </Stack>

      <Dialog open={taskFormOpen} onClose={() => setTaskFormOpen(false)}>
        <TaskForm task={undefined} OnAddTask={OnAddTask}></TaskForm>
      </Dialog>
      <Dialog open={labelFormOpen} onClose={() => setLabelFormOpen(false)}>
        <LabelForm addLabel={addLabel}></LabelForm>
      </Dialog>
    </>
  );
};

export default TodoList;
