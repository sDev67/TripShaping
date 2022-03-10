import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MembersItemGrid from './MembersItemGrid';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";
import MemberList from "./MemberList";
import Button from '@mui/material/Button';
import MemberForm from './MemberForm';

const Members = () => {
 
    const [currentMembers, setCurrentMembers] = useState([
        {firstname:'Enzo', lastname:'Mazzarella'},
        {firstname:'Vivien', lastname:'Rhiel'},
        {firstname:'Baptiste', lastname:'Fléjou'},
        {firstname:'Sese', lastname:'dev'},
        {firstname:'Oklm', lastname:'Lol'}]);

    const [allMembers, setMembers] = useState([
        {firstname:'Ben', lastname:'Momo'},
        {firstname:'Mimi', lastname:'popo'},
        {firstname:'zbeul', lastname:'balle'},
        {firstname:'rackai', lastname:'dev'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'}]);


    
    const [addFictifMember, setAddFictifMember] = useState(false);
    const HandleClickAddFictifMember = () => {
        setAddFictifMember(true);
    }
    const OnAddMember = ({member}) => 
    {
        setCurrentMembers(...currentMembers, member);
        if(addFictifMember)
        {
            setAddFictifMember(false);
        }
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
                        marginBottom="5%"
                        width="90%"
                        direction="column"
                        alignItems="left"
                        justifyContent="space-between"
                        height='10%'>

                        <Typography variant="h3">Currents members</Typography>
                        <Divider></Divider>
                      
                            <MembersItemGrid
                                members={currentMembers}
                                canBeDelete={true}
                                OnDeleteMember={OnDeleteMember}
                                flexStyle='row'
                                justifyStyle='flex-start'
                            />
           
                       
                    </Stack>
                    <Divider sx={{width:'90%', alignSelf:'center', borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>
                    <Stack  
                        marginLeft="5%"
                        height='35%'
                     
                        width="60%"
                        direction="column"
                        alignItems="left"
                        justifyContent="space-between"
                        
                        >

                        <Typography variant="h3">Add members</Typography>
                        <MemberList onAddMember={OnAddMember} allMembers={allMembers}  />
                       
                    </Stack>
                    <Stack  
                        marginLeft="5%"
                        height='100%'      
                        width="60%"
                        direction="column"
                        alignItems="left"
                        justifyContent="space-between">

                        <Button sx={{width:'25%'}} onClick={(e) => HandleClickAddFictifMember()} variant="contained">Create a fictif member</Button>

                        {
                        addFictifMember ? 
                        <>
                            <MemberForm OnAddMember={OnAddMember} />
                        </> :
                        ""
                        }
                    </Stack>
             
                </Stack>
            </Stack>
        </>
    )
    
};

export default Members;