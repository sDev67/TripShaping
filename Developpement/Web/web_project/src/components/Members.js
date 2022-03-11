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
        {firstname:'Oklm', lastname:'Lol'},
        {firstname:'Oklm', lastname:'Lol'},
        {firstname:'Oklm', lastname:'Lol'},
        {firstname:'Oklm', lastname:'Lol'},
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
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
        {firstname:'yoyo', lastname:'yuyu'},
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
        else
        {
            setMembers(allMembers.filter(memberI => memberI !== member));
        }
    }

    const OnDeleteMember = ({member}) => 
    {
        setCurrentMembers(currentMembers.filter(memberI => memberI !== member));
    }

    return(
        <>
            <Stack height="100%" width="100%" direction="column">
                <Typography color="primary" variant="h2"textAlign="center" marginTop={4}> Members </Typography>
                <Stack width="90%" marginLeft="5%" direction="column"alignItems="left" justifyContent="space-between" height='30%'>
                    <Typography variant="h3">Currents members</Typography>
                    <Divider></Divider>    
                    <MembersItemGrid members={currentMembers}canBeDelete={true} OnDeleteMember={OnDeleteMember} />       
                </Stack>
                <Divider sx={{width:'90%', alignSelf:'center', borderStyle:'solid',background:'black', borderBottomWidth: 2}}/>
                <Stack marginLeft="5%" width="60%" height='50%' direction="column" alignItems="left" justifyContent="space-between" >
                    <Typography paddingBottom='10px' variant="h3">Add members</Typography>
                    <MemberList OnAddMember={OnAddMember} allMembers={allMembers} HandleClickAddFictifMember={HandleClickAddFictifMember} setAddFictifMember={setAddFictifMember} statusAddFictifMember={addFictifMember}/>      
                 </Stack>
            </Stack>
        </>
    )
};

export default Members;