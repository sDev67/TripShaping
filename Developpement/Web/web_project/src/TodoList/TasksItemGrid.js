import '../Styles/ButtonStyles.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Stack,List,ListItemButton,ListItemText,ListItem, Box,Divider,Chip,Button,Grid,Tab,Tabs,Typography,FormControlLabel,Switch} from "@mui/material";
import {useState} from 'react';
import '../App.css';
import { fontSize } from '@mui/system';
import IconButton from '@mui/material/IconButton';

const TasksItemGrid = ({tasks, OnRemoveLabelToTask,OnSelectTask }) =>
{
    return(<>
    
   
    <Stack 
    direction='column'
    divider={<Divider orientation="horizontal" flexItem />}
    style={{ overflowY:'auto', textAlign:'left', width:'99%', height:'100%',border:'1px', solid:'#ccc',margin:'10px', marginBottom:'50px' }}>
                                 
            <List component="nav" color='grey'>
                {tasks.map((task, key) => (
                    <>
                        <Box sx={{width:'100%', maxWidth:'100%', bgColor:'grey', flexDirection:'row'}}>
                            <ListItemButton onClick={OnSelectTask}>
                                <Box sx={{my:1, mx:2, width:'100%'}}>
                                    <Grid container alignItems="center" xs={15}>
                                        <Grid item xs={100}>
                                            <Typography variant='h4' component="div">
                                                {task.title}
                                                <IconButton aria-label="Add">
                                                    <HighlightOffIcon sx={{fontSize:'30px'}} />
                                                </IconButton>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5' component="div">
                                                {task.executionDate}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                             
                                </Box>
                            </ListItemButton>
                                <Divider variant='middle'/>
                                <Box sx={{width:'75%', maxWidth:'75%', bgColor:'grey', flexDirection:'row'}}>
                                    <Stack component='nav' direction='row' flexWrap='wrap' spacing={0} margin={1}>
                                        {task.labels.map((label, yKey) =>(
                                            <>
                                                <Chip style={{margin:5, padding:10}} size='medium' onDelete={OnRemoveLabelToTask} color='primary' label={label.title} />
                                            </>
                                        ))} 
                                        <IconButton aria-label="Add">
                                            <AddCircleIcon sx={{fontSize:'35px'}} color='primary' />
                                        </IconButton>
                                     
                                          
                                    </Stack>            
                                </Box>
                            </Box>
                     
                        <Divider/>
                    </>
                ))
                }
            </List>
     </Stack>
     </>)
}

export default TasksItemGrid;