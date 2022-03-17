import { Stack } from "@mui/material";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog } from "@mui/material";
import MemberErrorMsgPanel from "./MemberErrorMsgPanel";

const MemberForm = ({OnAddMember}) => 
{
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const HandleClick = () =>
    {
        if(firstname !== undefined && firstname !== '' && lastname !== undefined && lastname !== '')
        {
            OnAddMember({firstname:firstname, lastname:lastname});
            
        }
        else
        {
            setErrorDialogOpen(true);
        }

        setFirstName('');
        setLastName('');
        
    }

    return(
        <>
            <Stack alignItems='center' justifyContent='space-around' height='300px' width='300px'>
                <TextField onChange={(e) => setFirstName(e.target.value)} sx={{width:'80%'}} id="outlined-basic" label="Member Firstname" variant="outlined" />
                <TextField onChange={(e) => setLastName(e.target.value)} sx={{width:'80%'}} id="outlined-basic" label="Member Lastname" variant="outlined" />
                <Button  onClick={(e) => HandleClick()} variant="contained">Add member to trip</Button>
            </Stack>
            
            <Dialog open={errorDialogOpen} onClose={(e) => setErrorDialogOpen(false)}>
                <MemberErrorMsgPanel/>
            </Dialog>


        

        </>
    )
}

export default MemberForm;