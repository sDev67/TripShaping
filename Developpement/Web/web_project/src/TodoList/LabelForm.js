import { Stack } from '@mui/material';
import {TextField, IconButton, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useEffect, useState} from 'react'

const LabelForm = ({label}) =>
{
    const [currentTitle, setCurrentTitle] = useState('');

    useEffect(() => {


        if(label.title !== undefined)
        {
            setCurrentTitle(label.title);
        }

    }, [label])


    const handleSubmit = () => 
    {

    }

    return(
        <>
            <Stack direction='column'
            alignItems='flex-start'
            style={{ height: "100%", width: "90%", margin:'20px' }}>
              
            {label.title === undefined ^ label.title === 'Title'  ? 
                <Typography variant='h3'>Create a Task</Typography> :
                <Typography variant='h3'>Modify {currentTitle}</Typography>
            }
                
                <TextField
                        required
                        id="secondary-required"
                        label="Required"
                        onChange={(e) => setCurrentTitle(e.target.value)}
                      
                        variant="standard"
                        style={{marginRight:11}} />

                <IconButton aria-label="Add" onClick={handleSubmit}>
                    <AddCircleIcon sx={{fontSize:'35px'}} color='secondary' />
                </IconButton>     

            </Stack>
        </>
    )
}

export default LabelForm;