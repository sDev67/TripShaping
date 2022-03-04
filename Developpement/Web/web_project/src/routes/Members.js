import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MembersItemGrid from './MembersItemGrid';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";


const Members = () => {
 
    const [members, setMembers] = useState([
        {firstname:'Enzo', lastname:'Mazzarella'},
        {firstname:'Vivien', lastname:'Rhiel'},
        {firstname:'Baptiste', lastname:'Fléjou'},
        {firstname:'Sese', lastname:'dev'},
        {firstname:'Oklm', lastname:'Lol'}]);

    const OnSelectMember = ({member}) =>
    {

    }

    const OnAddMember = ({member}) => 
    {

    }

    const OnDeleteMember = ({member}) => 
    {

    }

    return(
        <>
            <Stack height="100%" width="100%" direction="row">
                <Stack direction="column" width="100%">
                    <Typography
                        color="primary"
                        variant="h2"
                        textAlign="center"
                        marginTop={4}>
                            Members
                    </Typography>
                    <Stack
                        marginLeft="5%"
                        width="90%"
                        direction="column"
                        alignItems="left"
                        justifyContent="space-between">

                        <Typography variant="h3">Currents members</Typography>
                        <Divider></Divider>
                      
                            <MembersItemGrid
                                members={members}
                                OnSelectMember={OnSelectMember}
                                OnAddMember={OnAddMember}
                                OnDeleteMember={OnDeleteMember}
                            />
           
                       
                    </Stack>
                 
                </Stack>
            </Stack>
        </>
    )
    
};

export default Members;
