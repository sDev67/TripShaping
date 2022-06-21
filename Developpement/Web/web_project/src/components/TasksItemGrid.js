import "../Styles/ButtonStyles.css";
import {
  Grid,
} from "@mui/material";
import Task from "./Task";

const TasksItemGrid = ({ tasks,filteredLabel,OnUpdateTask,OnSelectTaskToAddLabel,existingLabels,OnRemoveTask,OnRemoveLabelToTask,OnEditTask,AddLabel}) => {
  
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
         
            <Task
              key={index}
              task={task}
              OnSelectTaskToAddLabel={OnSelectTaskToAddLabel}
              existingLabels={existingLabels}
              OnRemoveTask={OnRemoveTask}
              filteredLabel={filteredLabel}
              OnRemoveLabelToTask={OnRemoveLabelToTask}
              OnEditTask={OnEditTask}
              AddLabel={AddLabel}
              OnUpdateTask={OnUpdateTask}
            
            ></Task>
          ))
          // )
        }
      </Grid>
    </>
  );
};

export default TasksItemGrid;
