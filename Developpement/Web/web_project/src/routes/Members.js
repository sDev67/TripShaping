import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MembersItemGrid from '../components/MembersItemGrid';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";
import MemberList from "../components/MemberList";
import Button from '@mui/material/Button';
import MemberForm from '../components/MemberForm';

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

    const OnAddMember = ({firstname, lastname}) => 
    {
        console.log({firstname, lastname});
        setCurrentMembers([...currentMembers, {firstname, lastname}]);

        if(addFictifMember)
        {
            setAddFictifMember(false);
        }
        else
        {
            // changer ca car si plusieurs personne ont le meme nom et prenom ca les enleve
            let filteredArray = allMembers.filter(memberI => memberI.firstname !== firstname && memberI.lastname !== lastname);
            setMembers(filteredArray);
        }
    }

    const OnDeleteMember = ({member}) => 
    {
           // changer ca car si plusieurs personne ont le meme nom et prenom ca les enleve
           let filteredArray = currentMembers.filter(memberI => memberI.firstname !== member.firstname && memberI.lastname !== member.lastname);
           setCurrentMembers(filteredArray);
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