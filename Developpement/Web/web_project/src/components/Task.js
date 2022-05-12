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
  Autocomplete,
  TextField,
  Button
} from "@mui/material";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import "../Styles/ButtonStyles.css";
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

const Task = ({ task,filteredLabel,OnSelectTaskToAddLabel, existingLabels,OnRemoveTask, OnRemoveLabelToTask, OnEditTask, AddLabel}) => {
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

    useEffect(() => {

    },[labels]);

    useEffect(() => 
    {
 
        // setIsFiltered(filteredLabel.length == 0 || (filteredLabel.length > 0 && labels.some(r => filteredLabel.includes(r))))
        checkLabels();

    }, [filteredLabel])
  
    const [selectedLabel, setLabelToAdd] = useState();
  
    const checkLabels = () => 
    {
     if(filteredLabel.length == 0){  setIsFiltered( true); return; }
    if(filteredLabel.length > 0 && (labels == undefined || labels.length == 0)){  setIsFiltered( false); return;}

      let isGood = false;

      if(extendResearch)
      {
        labels.map((f) => 
        {
          filteredLabel.map((l) => 
          {
            if(f.title==l.title)
            {
              isGood = true;           
            }
          })
        })
      }

      setIsFiltered( isGood);
      // else
      // {
      //   labels.map((f) => 
      //   {
      //     filteredLabel.map((l) => 
      //     {
      //       if(f.title==l.title)
      //       {
      //           isGood = true;
            
      //       }else{
  
      //         setIsFiltered( false);
      //         return
      //       }
      //     })
      //   })
      // }


    //  return false;
    }

    const addLabelToTask = () => 
    {
      if(selectedLabel === undefined){ return; }
  
      if(labels.filter((e) => e.title === selectedLabel.title).length > 0)
      {
        return;
      }
   
      AddLabel(task,selectedLabel);
  
    }
  
    return (
      <>
      {
        !isFiltered  ?
        ""
        :
        <>   
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
                <>
                  <CardContent>
                    {labels.map((label, index) => (
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
                    ))}
                  </CardContent>      
                  <Autocomplete
                        style={{ width: "75%" }}
                        noOptionsText={"Aucun label trouvé"}
                        options={existingLabels}
                        fullWidth
                        onChange={(event, value) => {
                          setLabelToAdd(value);
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
                          addLabelToTask();
                        }}
                      >
                        Ajouter
                      </Button>
                </>
                
              )}
            </Card>
          </Grid>
        </>
    }
      
      </>
    );
}

export default Task;