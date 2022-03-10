import { Divider, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import MembersItemGrid from "./MembersItemGrid";
import {useState} from "react";


const MemberList = ({onSelectMember, allMembers, onDeleteMember}) => 
{
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
      }

      const [filterCriteria, setFilterCriteria] = useState('');

      const handleCriteriaChange = (crtieria) =>{
          console.log(crtieria);
          setFilterCriteria(crtieria);
      }
    return(
        <>
            <Stack heigth='100%'>
                <TextField onChange={(e) => handleCriteriaChange(e.target.value)} sx={{width:'80%'}} id="outlined-basic" label="Member Name" variant="outlined" />

                <Stack  marginTop={2} height="30%" direction='column' justifyContent='flex-start'>

                    <Divider sx={{borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>

                        <Stack style={{overflow: "auto", height: "100%", }}>
                            <MembersItemGrid canBeDelete={false} onDeleteMember={onDeleteMember}
                             members={allMembers} canBeSelected={true}
                            flexStyle='column' justifyStyle='flex-start'
                            OnAddMember={onSelectMember}
                            filterCriteria={filterCriteria}
                            canBeFiltered={true}/>
                        </Stack>
                       

                    <Divider sx={{borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>

                </Stack>
                

            </Stack>
        </>
    )
}

export default MemberList;