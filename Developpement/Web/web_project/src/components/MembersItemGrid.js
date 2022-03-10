import { Stack, Box, Divider, Chip,Avatar, Typography,IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
const MembersItemGrid = ({members, canBeDelete=true, OnDeleteMember, flexStyle, justifyStyle, canBeSelected=false, OnAddMember,canBeFiltered=false, filterCriteria=''}) =>
{
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
      }

    return (
        <>
          
            <Box
                textAlign="left"
                sx={{
                  padding:1,
                  alignContent:'left',
                  display:'flex',
                  flexDirection:flexStyle,
                  justifyContent:justifyStyle,
                  marginTop:'10px'

                }}>  
                {
                  members.map((member) => 
                  (
                    <>
                      {
                        canBeFiltered && filterCriteria !== '' ? 
                          member.firstname === filterCriteria || member.lastname === filterCriteria ?

                            <Stack key={member.toString()} direction="row" spacing={2} alignItems='center' marginRight={5} marginBottom={1}>
                              <Avatar sx={{ bgcolor: randomColor, height:'50px', width:'50px', fontSize:'15px' }}/>
                              <Typography variant="h4" textAlign='left'>{member.firstname} {member.lastname[0]}</Typography>
                              {canBeDelete ? 
                                <IconButton
                                aria-label="Delete"
                                color="error"                  
                                onClick={OnDeleteMember}>

                                  <ClearIcon sx={{ fontSize: "30px" }} />

                                </IconButton> : "" 
                              }
                              {
                                canBeSelected ?
                                  <IconButton
                                  aria-label="Add"
                                  color="secondary"                  
                                  onClick={OnAddMember}
                                  >
                                    <AddIcon sx={{ fontSize: "30px" }} />
                                  </IconButton> : ""
                              }
                          </Stack>
                          : ""
                        :        
                          <Stack key={member.toString()} direction="row" spacing={2} alignItems='center' marginRight={5} marginBottom={1}>
                            <Avatar sx={{ bgcolor: randomColor, height:'50px', width:'50px', fontSize:'15px' }}/>
                            <Typography variant="h4" textAlign='left'>{member.firstname} {member.lastname[0]}</Typography>
                            {canBeDelete ? 
                              <IconButton
                              aria-label="Delete"
                              color="error"                  
                              onClick={OnDeleteMember}
                              >
                                <ClearIcon sx={{ fontSize: "30px" }} />
                              </IconButton> : "" 
                            }
                            {
                              canBeSelected ?
                                <IconButton
                                aria-label="Add"
                                color="secondary"                  
                                onClick={OnAddMember}
                                >
                                  <AddIcon sx={{ fontSize: "30px" }} />
                                </IconButton> : ""
                            }
                        </Stack>
                     }
                  </>
                ))
              }
           
              
            </Box>
          
        </>
      );
}

export default MembersItemGrid;