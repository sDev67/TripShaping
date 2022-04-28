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

const TasksItemGrid = ({ tasks,OnRemoveTask, OnRemoveLabelToTask, OnEditTask }) => {
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
            <Grid key={index} item xs={4}>
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
                <CardContent>
                  {/* {task.labels.map((label) => (
                    <>
                      <Chip
                        key={label.toString()}
                        style={{ margin: 5 }}
                        size="medium"
                        onDelete={OnRemoveLabelToTask}
                        onClick={OnRemoveLabelToTask}
                        color="secondary"
                        label={label.title}
                      />
                    </>
                  ))} */}
                </CardContent>
              </Card>
            </Grid>
          ))
          // )
        }
      </Grid>
    </>
  );
};

export default TasksItemGrid;
