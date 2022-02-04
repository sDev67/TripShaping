import { DatePicker, LocalizationProvider } from '@mui/lab';
import DoneIcon from '@mui/icons-material/Done';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';



const TaskForm = ({task, setTask}) =>
{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(Date());

    useEffect(() =>
    {
        setTitle("");
        setDate(Date.now());

    })
    
    const handleSubmit = () =>
    {
        if(title !== null)
        {
            setTask(
            {
                title:{title},
                executionDate:date

            })
        }
        else
        {
            setTask(
                {
                  
                    executionDate:date
    
                })
        }

        setTitle("");
        setDate(Date.now());
    }


    return(
        <>
        <div style={{marginLeft:20}}>
            <h2>Éditer Task</h2>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <h4 style={{marginRight:20}}>Title</h4>
                    <TextField onChange={(e) => setTitle(e.target.value)}  id="outlined-basic" label={task.title} variant="outlined" size='medium'/>

          
                    { /*<LocalizationProvider  dateAdapter={AdapterDateFns} size='medium'/>*/ }
                  
            </div>
            <DoneIcon onClick={() => handleSubmit} size="large"/>
        </div>
          
          

        </>
    )
}

export default TaskForm;