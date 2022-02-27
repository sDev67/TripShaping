import '../Styles/ButtonStyles.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Stack, Box,Divider,Chip} from "@mui/material";
import React, {useState} from 'react';
import '../App.css';
import IconButton from '@mui/material/IconButton';


const LabelsItemGrid = ({labels, OnDeleteLabel, OnAddLabel, OnSelectLabel}) => {

    return(<>
    
   
        <Stack 
        direction='column'
        divider={<Divider orientation="horizontal" flexItem />}
        style={{ overflowY:'auto', textAlign:'left', width:'100%', height:'50%',border:'1px', solid:'#ccc',margin:'10px', marginBottom:'50px' }}>
                                     
            <Box sx={{width:'100%', maxWidth:'100%', bgColor:'grey', flexDirection:'row', height:'50%'}}>
                <Stack component='nav' direction='row' flexWrap='wrap' spacing={0} margin={0} width='100%'>
                    {labels.map((label) =>(
                        <>
                            <Chip key={label.toString()} style={{margin:3, padding:10}} size='medium' onDelete={OnDeleteLabel} onClick={OnSelectLabel} color='secondary' label={label.title} />                  
                        </>
                    ))}      
                    <IconButton aria-label="Add">
                        <AddCircleIcon sx={{fontSize:'35px'}} color='secondary' onClick={(e) => OnSelectLabel({title:undefined})}/>
                    </IconButton>                       
                </Stack>            
            </Box>
            
         </Stack>
         </>)
    
}

export default LabelsItemGrid;