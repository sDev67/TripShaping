import { Grid,Card, Box,Avatar, Typography,IconButton, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const MembersAddItemGrid = ({OnAddMember,critereFilteria, allMembers}) => 
{
    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
      }

    return(
    <>
        <Grid style={{ overflow: "auto",height: "100%", }}>
            <Grid item xs={'auto'} container textAlign="left" sx={{ padding:1,display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>  
                {
                    critereFilteria !== undefined && critereFilteria !== ''   ?
                    allMembers.map((member) => 
                    (
                      <>  
                        {
                            member.firstname === critereFilteria || member.lastname === critereFilteria ? 
                        
                            <Card key={member.toString()} direction="row" alignItems='flex-start' sx={{display:'flex'}} marginRight={5} marginBottom={1}>
                                <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                                    <CardContent sx={{ display:'flex', flexDirection:'row', alignContent:'center'}}>
                                        <Avatar sx={{ bgcolor: randomColor, height:'50px', width:'50px', fontSize:'15px' }}/>
                                        <Typography paddingLeft='6px' paddingTop='6px' variant="h4" textAlign='left'>{member.firstname} {member.lastname[0]}</Typography>
                                        <IconButton aria-label="Add"color="secondary" onClick={OnAddMember}>
                                            <AddIcon sx={{ fontSize: "30px" }} />
                                        </IconButton> 
                                    </CardContent>       
                                </Box>             
                            </Card> 
                            : ""           
                        }                               
                      </>
                    )
                  )
                  :
                  allMembers.map((member) => 
                    (
                      <>  
                        {         
                            <Card key={member.toString()} direction="row" alignItems='flex-start' sx={{display:'flex'}} marginRight={5} marginBottom={1}>
                                <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                                    <CardContent sx={{ display:'flex', flexDirection:'row', alignContent:'center'}}>
                                        <Avatar sx={{ bgcolor: randomColor, height:'50px', width:'50px', fontSize:'15px' }}/>
                                        <Typography paddingLeft='6px' paddingTop='6px' variant="h4" textAlign='left'>{member.firstname} {member.lastname[0]}</Typography>
                                        <IconButton aria-label="Add"color="secondary" onClick={OnAddMember}>
                                            <AddIcon sx={{ fontSize: "30px" }} />
                                        </IconButton> 
                                    </CardContent>       
                                </Box>             
                            </Card>            
                        }                               
                      </>
                    )
                  )
                }             
            </Grid>     
          </Grid>
    
    </>)
}

export default MembersAddItemGrid;