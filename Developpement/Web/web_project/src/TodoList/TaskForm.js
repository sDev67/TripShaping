import {  tabsListUnstyledClasses, TextField, Typography } from "@mui/material";
import {Stack, Box,Chip} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

const TaskForm = ({task}) => 
{
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentLabels, setCurrentLabels] = useState([]);

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => 
    {
        if(task.title !== undefined)
        {
            setCurrentTitle(task.title);
        }
        else{
            setCurrentTitle("Title");
        }

        if(task.labels !== undefined)
        {
            setCurrentLabels(task.labels);
        }
        else{
            setCurrentLabels([]);
        }
        if(task.executionDate !== undefined){
               
            setCurrentDate(task.executionDate);
        }
        else{
            setCurrentDate(Date.now());
        }

    }, [task])


    const handleDateChange = (newDate) => {
      setCurrentDate(newDate);
    };

    const handleTitleChange = (newTitle) => {
        setCurrentTitle(newTitle)
        
    }

    const handleSubmit = () =>
    {
        if(task.title !== undefined) { // Vérifié si la tâche n'est pas nouvelle
            
            // Mettre à jour la nouvelle tâche

        }
        else
        {
            // on la créer
        }
    }
  

    return(
        <>           
             <Stack
                direction="column"
                alignItems='flex-start'
                style={{ height: "100%", width: "100%", margin:'20px' }}>
              
                    {task.title === undefined || task.title === 'Title'  ? 
                        <Typography variant='h3'>Create a Task</Typography> :
                        <Typography variant='h3'>Modify {currentTitle}</Typography>
                    }
                   

                <Stack direction="row" width='100%' marginTop={1}>

                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        onChange={(e) => handleTitleChange(e.target.value)}
                        defaultValue={tabsListUnstyledClasses.title}
                        variant="standard"
                        style={{marginRight:11}} />
                    
                    <TextField
                        id="date"
                        label="Execution Date"
                        type="date"
                        defaultValue={task.executionDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}/>

                        <IconButton aria-label="Add" onClick={handleSubmit}>
                            <TaskAltOutlinedIcon sx={{fontSize:'40px'}} color='primary' />
                        </IconButton>
                </Stack>
                <Box sx={{width:'75%', maxWidth:'75%', bgColor:'grey', flexDirection:'row'}}>
                    <Stack component='nav' direction='row' flexWrap='wrap' spacing={0} margin={1}>
                        {currentLabels !== undefined ? currentLabels.map((label) =>(
                            <>
                                <Chip style={{margin:5, padding:10}} size='medium' color='primary' label={label.title} />
                            </>
                        )) : ""} 
                        <IconButton aria-label="Add">
                            <AddCircleIcon sx={{fontSize:'35px'}} color='primary' />
                        </IconButton>          
                    </Stack>            
                </Box>
            </Stack>
        </>
    )
}

export default TaskForm;