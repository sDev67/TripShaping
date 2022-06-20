import "../Styles/ButtonStyles.css";
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
import ConfirmedSuppressionModal from "../components/ConfirmedSuppressionModal";
import { useState } from "react";
import "../App.css";
import TasksItemGrid from "../components/TasksItemGrid";
import IconButton from "@mui/material/IconButton";
import TaskForm from "../components/TaskForm";
import LabelForm from "../components/LabelForm";
import TravelRequests from "../requests/TravelRequests";
import TodoListRequest from "../requests/TodoListRequest";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";

const TodoList = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const [currentTaskSelected, setCurrentTask] = useState();
  const [currentLabelSelected, setCurrentLabel] = useState();
  const [taskToAdd, OnSelectTaskToAddLabel] = useState();
  const [allIdOfLabel, setAllLabelId] = useState([]);
  const [currentLabelId, setCurrentLabelId] = useState();
  const [filterLabels, setFilterLabels] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] = useState(false);
  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);

  };
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

  const addLabelToTask = useMutation(TodoListRequest.addLabelToTask, {
    onSuccess: (taskLabel) => {
      queryClient.setQueryData(
        ["getLabelOfTask", taskLabel.task.id],
        (taskLabels) => [...taskLabels, taskLabel.label]
      );
    },
  });

  const deleteLabelToTask = useMutation(TodoListRequest.deleteLabelOfTask, {
    onSuccess: (taskLabel) => {
      queryClient.setQueryData(
        ["getLabelOfTask", taskLabel.task.id],
        (taskLabels) => taskLabels.filter((e) => e.id !== taskLabel.label.id)
      );
    },
  });

  const filterTask = useMutation(TodoListRequest.getTaskByLabelId, {
    onSuccess: (task) =>
      queryClient.setQueryData(["getFilteredTasks", idTravel], (tasks) => [
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

  const UpdateTask = ({ title, date, isDone, task }) => {
    const newTask = {
      title: title,
      date: date,
      isDone: isDone,
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

  const OnAddLabelToTask = (task, label) => {
    const taskLabel = {
      task: task,
      label: label,
    };
    addLabelToTask.mutate(taskLabel);
  };

  const OnRemoveLabelToTask = (task, label) => {
    const taskLabel = {
      task: task,
      label: label,
    };
    deleteLabelToTask.mutate(taskLabel);
  };

  const OnRemoveLabel = (label) => {
    removeLabel.mutate(label.id);
  };

  const FilterTask = () => {
    filterLabels.map((e) => filterTask.mutate(e.id));
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
                  style={{ width: "80%" }}
                  noOptionsText={"Aucun label trouvé"}
                  options={labels}
                  fullWidth
                  onChange={(event, value) => {
                    setSelectedFilter(value);
                    FilterTask();
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
                  style={{ width: "20%" }}
                  variant="contained"
                  onClick={(e) => {
                    if (
                      selectedFilter != null &&
                      selectedFilter != {} &&
                      selectedFilter != undefined &&
                      !filterLabels.includes(selectedFilter)
                    ) {
                      console.log(selectedFilter);
                      setFilterLabels((oldArray) => [
                        ...oldArray,
                        selectedFilter,
                      ]);
                    }
                  }}
                >
                  Filtrer
                </Button>
              </Stack>
              <Stack
                marginLeft="5%"
                width="90%"
                direction="row"
                alignItems="center"
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
                filteredLabel={filterLabels}
                existingLabels={labels}
                OnRemoveLabelToTask={OnRemoveLabelToTask}
                OnSelectTask={OnSelectTask}
                OnRemoveTask={removeTask}
                OnUpdateTask={UpdateTask}
                OnEditTask={OnSelectTask}
                AddLabel={OnAddLabelToTask}
                OnSelectTaskToAddLabel={OnSelectTaskToAddLabel}
              />
            </>
          )}
        </Stack>
        <Divider orientation="vertical" />
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
                    <>

                      <Chip
                        size="medium"
                        color="secondary"
                        label={label.title}

                        onDelete={() => {
                          setConfirmedDeleteDialogOpen(true);
                          setCurrentLabelId(label.id)
                        }}
                      />

                    </>
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
      <Dialog
        open={confirmedDeleteDialogOpen}
        onClose={HandleCloseConfirmedSuppr}
      >
        <ConfirmedSuppressionModal
          id={currentLabelId}
          onClose={HandleCloseConfirmedSuppr}
          message="Confirmer la suppression de ce label ?"
          onDelete={removeLabel}
        />
      </Dialog>
    </>
  );
};

export default TodoList;
