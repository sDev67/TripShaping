import "../Styles/ButtonStyles.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Stack,
  List,
  ListItemButton,
  Box,
  Divider,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TasksItemGrid = ({ tasks, OnRemoveLabelToTask, OnSelectTask }) => {
  return (
    <>
      <div
        direction="column"
        justifyContent="center"
        style={{
          overflow: "auto",
          height: "100%",
        }}
      >
        {tasks.map((task) => (
          <>
            {/* <Box
                key={task.toString()}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgColor: "grey",
                  flexDirection: "row",
                }}
              >
                <ListItemButton onClick={(e) => OnSelectTask(task)}>
                  <Box sx={{ my: 1, mx: 2, width: "100%" }}>
                    <Grid container alignItems="center">
                      <Grid item xs={100}>
                        <Stack direction="row" alignItems="flex-start">
                          <ClassOutlinedIcon sx={{ fontSize: "40px" }} />
                          <Typography variant="h4" component="div">
                            {task.title}
                            <IconButton aria-label="Add">
                              <HighlightOffIcon sx={{ fontSize: "30px" }} />
                            </IconButton>
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="div">
                          {task.executionDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </ListItemButton>

                <Box
                  sx={{
                    width: "75%",
                    maxWidth: "75%",
                    bgColor: "grey",
                    flexDirection: "row",
                  }}
                >
                  <Stack
                    component="nav"
                    direction="row"
                    flexWrap="wrap"
                    spacing={0}
                    margin={1}
                  >
                    {task.labels.map((label) => (
                      <>
                        <Chip
                          key={label.toString()}
                          style={{ margin: 5, padding: 10 }}
                          size="medium"
                          onDelete={OnRemoveLabelToTask}
                          color="primary"
                          label={label.title}
                        />
                      </>
                    ))}
                  </Stack>
                </Box>
              </Box> */}

            <Card key={task.toString()} sx={{ width: "90%", marginBottom:5, marginTop:5, marginLeft:"5%"}}>
              <CardHeader
                action={
                  <IconButton aria-label="Add">
                    <HighlightOffIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                }
                title={task.title}
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
          </>
        ))}
      </div>
    </>
  );
};

export default TasksItemGrid;
