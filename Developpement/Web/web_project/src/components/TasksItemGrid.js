import "../Styles/ButtonStyles.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Chip,
  Grid,
} from "@mui/material";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import EditRoundedIcon from '@mui/icons-material/EditRounded';


const TasksItemGrid = ({ tasks, OnRemoveLabelToTask, OnSelectTask }) => {
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
          height: "100%",
        }}
      >
        {tasks.map((task) => (
          <Grid item xs={4}>
          <Card key={task.toString()}>
              <CardHeader
                action={
                  <IconButton>
                    <HighlightOffIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                }
                title={
                <>{task.title}
                <IconButton>
                  <EditRoundedIcon  />
                </IconButton>
                </>
                  
                }
                subheader={task.executionDate}
              />
              <CardContent>
                {task.labels.map((label) => (
                  <>
                    <Chip
                      key={label.toString()}
                      style={{ margin: 5}}
                      size="medium"
                      onDelete={OnRemoveLabelToTask}
                      onClick={OnRemoveLabelToTask}
                      color="primary"
                      label={label.title}
                    />
                  </>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TasksItemGrid;
