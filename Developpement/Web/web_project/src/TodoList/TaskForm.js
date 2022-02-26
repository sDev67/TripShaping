import {  TextField, Typography } from "@mui/material";
import {Stack,List,ListItemButton,ListItemText,ListItem, Box,Divider,Chip,Button,Grid,Tab,Tabs,FormControlLabel,Switch} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/lab';
import React, {useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TaskForm = ({task}) => 
{
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentLabels, setCurrentLabels] = useState([]);

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
      setValue(newValue);
    };
  

    return(
        <>
             <Stack
                direction="column"
                alignItems='flex-start'
                style={{ height: "100%", width: "100%", margin:'20px' }}>

                    <Typography variant='h3'>Create a Task</Typography>

                <Stack direction="row" width='100%' marginTop={1}>

                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Title"
                        variant="standard"
                        style={{marginRight:11}} />
                    
                    <TextField
                        id="date"
                        label="Execution Date"
                        type="date"
                    
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}/>
                </Stack>
                <Box sx={{width:'75%', maxWidth:'75%', bgColor:'grey', flexDirection:'row'}}>
                    <Stack component='nav' direction='row' flexWrap='wrap' spacing={0} margin={1}>
                        {currentLabels.map((label, yKey) =>(
                            <>
                                <Chip style={{margin:5, padding:10}} size='medium' color='primary' label={label.title} />
                            </>
                        ))} 
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