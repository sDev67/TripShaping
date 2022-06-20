import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddLabelToTask from "./AddLabelToTaskForm";
import {
  Stack,
  Tooltip,
  Chip,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import "../Styles/ButtonStyles.css";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ConfirmedSuppressionModal from "./ConfirmedSuppressionModal";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TodoListRequest from "../requests/TodoListRequest";
import Loading from "../utils/Loading";
import { Dialog } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Task = ({
  task,
  filteredLabel,
  OnUpdateTask,
  OnSelectTaskToAddLabel,
  existingLabels,
  OnRemoveTask,
  OnRemoveLabelToTask,
  OnEditTask,
  AddLabel,
}) => {
  const {
    isLoading: isLoadingL,
    isError: isErrorL,
    error: errorL,
    data: labels,
  } = useQuery(["getLabelOfTask", task.id], () =>
    TodoListRequest.getLabelOfTask(task.id)
  );

  const [isFiltered, setIsFiltered] = useState();

  const [extendResearch, setResearchType] = useState(true);

  const [labelAddFormOpen, setLabelAddFormFormOpen] = useState(false);

  const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] = useState(false);
  const HandleCloseConfirmedSuppr = () => {
    setConfirmedDeleteDialogOpen(false);

  };

  useEffect(() => { }, [labels]);

  useEffect(() => {
    // setIsFiltered(filteredLabel.length == 0 || (filteredLabel.length > 0 && labels.some(r => filteredLabel.includes(r))))
    checkLabels();
  }, [filteredLabel]);

  const [selectedLabel, setLabelToAdd] = useState();

  const checkLabels = () => {
    if (filteredLabel.length == 0) {
      setIsFiltered(true);
      return;
    }
    if (
      filteredLabel.length > 0 &&
      (labels == undefined || labels.length == 0)
    ) {
      setIsFiltered(false);
      return;
    }

    let isGood = false;

    if (extendResearch) {
      labels.map((f) => {
        filteredLabel.map((l) => {
          if (f.title == l.title) {
            isGood = true;
          }
        });
      });
    }

    setIsFiltered(isGood);

  };

  let color = task.isDone ? "#C8FACD" : "#FFFFFF";

  const addLabelToTask = () => {
    if (selectedLabel === undefined) {
      return;
    }

    if (labels.filter((e) => e.title === selectedLabel.title).length > 0) {
      return;
    }

    AddLabel(task, selectedLabel);
    HandleCloseAddLabelForm();
  };

  const HandleCloseAddLabelForm = () => {
    setLabelAddFormFormOpen(false);
    setLabelToAdd(selectedLabel);
  };

  const OnTaskDone = () => {
    OnUpdateTask({
      title: task.title,
      date: task.date,
      isDone: !task.isDone,
      task: task,
    });
  };

  return (
    <>
      {!isFiltered ? (
        ""
      ) : (
        <>
          <Grid item xs={4}>
            <Card sx={{ background: color }}>
              <CardHeader
                action={
                  <IconButton color="error" onClick={(e) => setConfirmedDeleteDialogOpen(true)}>
                    <HighlightOffIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                }
                title={
                  <>
                    {task.isDone ? <strike>{task.title}</strike> : task.title}
                    {!task.isDone ? (
                      <>
                        <Tooltip title="Editer" placement="right" arrow>
                          <IconButton onClick={(e) => OnEditTask(task)}>
                            <EditRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                }
                subheader={task.date}
              />

              {isLoadingL ? (
                <Loading></Loading>
              ) : isErrorL ? (
                <Typography>{errorL}</Typography>
              ) : (
                <>
                  <CardContent>
                    {labels.map((label, index) => (
                      <>
                        {!task.isDone ? (
                          <>
                            <Chip
                              key={index}
                              style={{ margin: 5 }}
                              size="medium"
                              onDelete={(e) => OnRemoveLabelToTask(task, label)}
                              color="secondary"
                              label={label.title}
                            />
                          </>
                        ) : (
                          <>
                            <Chip
                              key={index}
                              style={{ margin: 5 }}
                              size="medium"
                              color="secondary"
                              label={label.title}
                            />
                          </>
                        )}
                      </>
                    ))}
                    {!task.isDone ? (
                      <>
                        <IconButton
                          onClick={() => setLabelAddFormFormOpen(true)}
                          color="secondary"
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                    <Stack display={"flex"}>
                      <Button
                        onClick={(e) => OnTaskDone()}
                        sx={{ alignSelf: "flex-end" }}
                        variant="contained"
                        color={!task.isDone ? "primary" : "error"}
                      >
                        {!task.isDone ? "Fait" : "Non Fait"}
                      </Button>
                    </Stack>
                  </CardContent>
                </>
              )}
            </Card>
          </Grid>
        </>
      )}

      <Dialog open={labelAddFormOpen} onClose={HandleCloseAddLabelForm}>
        <AddLabelToTask
          labels={existingLabels}
          addLabelToTask={addLabelToTask}
          setLabelToAdd={setLabelToAdd}
          task={task}
        ></AddLabelToTask>
      </Dialog>
      <Dialog
        open={confirmedDeleteDialogOpen}
        onClose={HandleCloseConfirmedSuppr}
      >
        <ConfirmedSuppressionModal
          id={task.id}
          onClose={HandleCloseConfirmedSuppr}
          message="Confirmer la suppression de cette tâche ?"
          onDelete={OnRemoveTask}
        />
      </Dialog>
    </>
  );
};

export default Task;
