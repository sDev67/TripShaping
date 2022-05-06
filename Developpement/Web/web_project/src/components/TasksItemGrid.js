import "../Styles/ButtonStyles.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Stack,
  List,
  ListItemButton,
  Box,
  Tooltip,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useQueryClient, useMutation } from "react-query";
import TodoListRequest from "../requests/TodoListRequest";
import Loading from "../utils/Loading";

const TasksItemGrid = ({
  tasks,
  OnRemoveTask,
  OnRemoveLabelToTask,
  OnEditTask,
  filterLabels,
}) => {
  const [taskLabels, setTaskLabels] = useState([
    { id: 1, title: "Test" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
    { id: 4, title: "4" },
    { id: 5, title: "5" },
    { id: 6, title: "6" },
  ]);

  return (
    <>
      <Grid
        marginTop={0}
        paddingX={2}
        paddingBottom={2}
        container
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        style={{
          overflow: "auto",
        }}
      >
        {
          tasks.map((task, index) => (
            // task.labels.filter((e) => e.title === "Benjamin").length > 0 && (
            <Task
              key={index}
              task={task}
              OnRemoveTask={OnRemoveTask}
              OnRemoveLabelToTask={OnRemoveLabelToTask}
              OnEditTask={OnEditTask}
            ></Task>
          ))
          // )
        }
      </Grid>
    </>
  );
};

const Task = ({ task, OnRemoveTask, OnRemoveLabelToTask, OnEditTask }) => {
  const {
    isLoading: isLoadingL,
    isError: isErrorL,
    error: errorL,
    data: labels,
  } = useQuery(["getLabelOfTask", task.id], () =>
    TodoListRequest.getLabelOfTask(task.id)
  );

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          action={
            <IconButton color="error" onClick={(e) => OnRemoveTask(task)}>
              <HighlightOffIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          }
          title={
            <>
              {task.title}
              <Tooltip title="Editer" placement="right" arrow>
                <IconButton onClick={(e) => OnEditTask(task)}>
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          subheader={task.date}
        />
        {isLoadingL ? (
          <Loading></Loading>
        ) : isErrorL ? (
          <Typography>{errorL}</Typography>
        ) : (
          <CardContent>
            {labels.map((label, index) => (
              <>
                <Chip
                  key={index}
                  style={{ margin: 5 }}
                  size="medium"
                  onDelete={(e) => OnRemoveLabelToTask(label)}
                  color="secondary"
                  label={label.title}
                />
              </>
            ))}
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default TasksItemGrid;
