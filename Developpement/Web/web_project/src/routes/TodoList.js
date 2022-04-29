import "../Styles/ButtonStyles.css";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Stack,
  Divider,
  Typography,
  Dialog,
  Chip,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
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
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const TodoList = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const [currentTaskSelected, setCurrentTask] = useState();
  const [currentLabelSelected, setCurrentLabel] = useState();

  const [filterLabels, setFilterLabels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});

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
      queryClient.setQueryData(
        ["getTasks", idTravel],
        (tasks) => [...tasks, task],
        queryClient.invalidateQueries(["getTasks", idTravel])
      ),
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

  const removeTask = useMutation(TravelRequests.removeTask, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getTasks", idTravel], (tasks) =>
        tasks.filter((e) => e.id !== id)
      ),
  });

  const removeLabel = useMutation(TravelRequests.removeLabel, {
    onSuccess: (_, id) =>
      queryClient.setQueryData(["getLabels", idTravel], (labels) =>
        labels.filter((e) => e.id !== id)
      ),
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

    addLabel.mutate(newLabel);
  };

  const UpdateLabel = ({ title, labelId }) => {
    const newLabel = {
      title: title,
      labelId: labelId,
      TravelId: idTravel,
    };

    updateLabel.mutate(newLabel);
  };

  const UpdateTask = ({ title, date, task }) => {
    const newTask = {
      title: title,
      date: date,
      idTask: task.id,
      idTravel: idTravel,
    };

    updateTask.mutate(newTask);
  };

  const OnSelectTask = (task) => {
    setCurrentTask(task);
    setTaskFormOpen(true);
  };

  const OnSelectLabel = (label) => {
    setCurrentLabel(label);
    setLabelFormOpen(true);
  };

  const OnAddTask = ({ title, date }) => {
    const newTask = {
      title: title,
      date: date,
      TravelId: idTravel,
    };

    addTask.mutate(newTask);
  };

  const OnRemoveTask = (task) => {
    removeTask.mutate(task.id);
  };

  const OnAddLabelToTask = ({ label, task }) => {};

  const OnRemoveLabelToTask = (label) => {
    removeLabel.mutate(label.id);
  };

  const HandleCloseTaskForm = () => {
    setTaskFormOpen(false);
    setCurrentTask(undefined);
  };

  const HandleCloseLabelForm = () => {
    setLabelFormOpen(false);
    setCurrentLabel(undefined);
  };
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
                justifyContent="flex-start"
                spacing={1}
              >
                <Autocomplete
                  style={{ width: "75%" }}
                  noOptionsText={"Aucun label trouvé"}
                  options={labels}
                  fullWidth
                  onChange={(event, value) => {
                    setSelectedFilter(value);
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
                  style={{ width: "25%" }}
                  variant="contained"
                  onClick={(e) => {
                    setFilterLabels((oldArray) => [
                      ...oldArray,
                      selectedFilter,
                    ]);
                  }}
                >
                  Filtrer
                </Button>
              </Stack>
              <Stack
                direction="horizontal"
                alignItems="center"
                sx={{
                  padding: 1,
                }}
              >
                {filterLabels.map((label, index) => {
                  return (
                    <Chip
                      style={{ margin: 5 }}
                      color="secondary"
                      label={label?.title}
                      onDelete={() =>
                        setFilterLabels(
                          filterLabels.filter((item) => item.id !== label.id)
                        )
                      }
                    />
                  );
                })}
              </Stack>
              <Divider></Divider>
              <TasksItemGrid
                filterLabels={filterLabels}
                tasks={tasks}
                OnRemoveLabelToTask={OnRemoveLabelToTask}
                OnSelectTask={OnSelectTask}
                OnRemoveTask={OnRemoveTask}
                OnEditTask={OnSelectTask}
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
          {isLoadingL ? (
            <Typography>Chargement...</Typography>
          ) : isErrorL ? (
            <Typography>{errorL}</Typography>
          ) : (
            <>
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{
                  padding: 1,
                }}
              >
                {labels.map((label, index) => {
                  return (
                    <Chip size="medium" color="secondary" label={label.title} />
                  );
                })}
              </Stack>
            </>
          )}
        </Stack>
      </Stack>

      <Dialog open={taskFormOpen} onClose={HandleCloseTaskForm}>
        <TaskForm
          task={currentTaskSelected}
          OnAddTask={OnAddTask}
          UpdateTask={UpdateTask}
          onClose={HandleCloseTaskForm}
        ></TaskForm>
      </Dialog>
      <Dialog open={labelFormOpen} onClose={HandleCloseLabelForm}>
        <LabelForm
          label={currentLabelSelected}
          addLabel={OnAddLabel}
          UpdateLabel={UpdateLabel}
          onClose={HandleCloseLabelForm}
        ></LabelForm>
      </Dialog>
    </>
  );
};

export default TodoList;
