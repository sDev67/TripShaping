import { Divider, Stack, Grid, Dialog } from "@mui/material";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import MemberAllItemsGrid from './MemberAllItemsGrid';
import Button from '@mui/material/Button';
import MemberForm from "./MemberForm";
import Autocomplete from '@mui/material/Autocomplete';

const MemberList = ({OnAddMember, allMembers, HandleClickAddFictifMember, statusAddFictifMember=false, setAddFictifMember}) => 
{
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
      }

      const [filterCriteria, setFilterCriteria] = useState('');

      const handleCriteriaChange = (critieria) =>{
          console.log(critieria);
          setFilterCriteria(critieria);
      }
    return(
        <>
            <Stack height='100%'>
                <Stack direction='row' justifyContent='flex-start'>
                    <TextField onChange={(e) => handleCriteriaChange(e.target.value)} sx={{width:'40%', paddingRight:'20px'}} id="outlined-basic" label="Member Name" variant="outlined" />
                    <Button onClick={(e) => HandleClickAddFictifMember()} sx={{width:'40%'}} variant="contained">Ajouter un membre non inscrit</Button>
                </Stack>  
                <Stack  marginTop={2}  direction='column' justifyContent='flex-start' height='85%'>
                    <Divider sx={{borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>
                        <MemberAllItemsGrid allMembers={allMembers} OnAddMember={OnAddMember} critereFilteria={filterCriteria}/>
                    <Divider sx={{borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>
                </Stack>
                <Dialog open={statusAddFictifMember} onClose={(e) => setAddFictifMember(false)}>
                    <MemberForm OnAddMember={OnAddMember} />
                </Dialog>
            </Stack>
            
          
        </>
    )
}

export default MemberList;