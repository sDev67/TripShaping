import { Stack, Box, Divider, Chip,Avatar, Typography,IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const MembersItemGrid = ({members, OnSelectMember, OnAddMember, OnDeleteMember}) =>
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
                  flexDirection:'row',
                  justifyContent:'space-around',
                  marginTop:'20px'

                }}
                
            >
              
                {members.map((member) => (
                  <>
                    <Stack direction="row" spacing={2} alignItems='center'>
                        <Avatar sx={{ bgcolor: randomColor, height:'70px', width:'70px', fontSize:'35px' }}/>
                        <Typography variant="h4" textAlign='left'>{member.firstname} {member.lastname}</Typography>
                        <IconButton
                            aria-label="Add"
                            color="error"
                            onClick={OnDeleteMember}
                            >
                            <ClearIcon sx={{ fontSize: "30px" }} />
                        </IconButton>
                    </Stack>
                  </>
                ))}
              
            </Box>
          
        </>
      );
}

export default MembersItemGrid;