import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MemberList from "../components/MembersList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import MemberForm from "../components/MemberForm";

const Members = () => {
  const [currentMembers, setCurrentMembers] = useState([
    { id : 1, firstname: "Enzo", lastname: "Mazzarella" },
    { id : 2, firstname: "Vivien", lastname: "Rhiel" },
    { id : 3, firstname: "Baptiste", lastname: "Fléjou" },
    { id : 4, firstname: "Sese", lastname: "dev" },
    { id : 5, firstname: "Oklm", lastname: "Lol" },
    { id : 6, firstname: "azdaz", lastname: "ezf" },
    { id : 7, firstname: "tgrt", lastname: "zef" },
    { id : 8, firstname: "vg", lastname: "za" },
    { id : 9, firstname: "fez", lastname: "jkl" },
  ]);

  const [allMembers, setMembers] = useState([
    { id : 1, firstname: "Enzo", lastname: "Mazzarella" },
    { id : 2, firstname: "Vivien", lastname: "Rhiel" },
    { id : 3, firstname: "Baptiste", lastname: "Fléjou" },
    { id : 4, firstname: "Sese", lastname: "dev" },
    { id : 5, firstname: "Oklm", lastname: "Lol" },
    { id : 6, firstname: "azdaz", lastname: "ezf" },
    { id : 7, firstname: "tgrt", lastname: "zef" },
    { id : 8, firstname: "vg", lastname: "za" },
    { id : 9, firstname: "fez", lastname: "jkl" },
    { id : 10, firstname: "Ben", lastname: "Momo" },
    { id : 11, firstname: "Mimi", lastname: "popo" },
    { id : 12, firstname: "zbeul", lastname: "balle" },
    { id : 13, firstname: "rackai", lastname: "dev" },
    { id : 14, firstname: "Benjamin", lastname: "Gallier" },
    { id : 15, firstname: "Serkan", lastname: "Deveci" },
    { id : 16, firstname: "Enzo", lastname: "Mazzarella" },
    { id : 17, firstname: "Philippe", lastname: "Grandpré" },
  ]);

  const [addFictifMember, setAddFictifMember] = useState(false);

  const OnAddMember = ({ firstname, lastname }) => {
    console.log({ firstname, lastname });
    const id = currentMembers.length;
    setCurrentMembers([...currentMembers, { id, firstname, lastname }]);

    // changer ca car si plusieurs personne ont le meme nom et prenom ca les enleve
    let filteredArray = allMembers.filter(
      (currentMember) =>
      currentMember.id !== id
    );
    setMembers(filteredArray);
  };

  const OnDeleteMember = ({ member }) => {
    // changer ca car si plusieurs personne ont le meme nom et prenom ca les enleve
    let filteredArray = currentMembers.filter(
      (currentMember) =>
      currentMember.id !== member.id
    );
    setCurrentMembers(filteredArray);
  };

  return (
    <>
      <Stack height="100%" width="100%" direction="column">
        <Typography
          color="primary"
          variant="h2"
          textAlign="center"
          marginTop={4}
        >
          Membres
        </Typography>
        <Stack
          width="90%"
          marginLeft="5%"
          direction="column"
          justifyContent="space-between"
          height="85%"
        >
          <Stack height="85%">
            <Typography variant="h4" marginY={1}>
              Liste des membres
            </Typography>
            <MemberList
              members={currentMembers}
              canBeDelete={true}
              OnDeleteMember={OnDeleteMember}
            />
          </Stack>
          <MemberForm OnAddMember={OnAddMember} allMembers={allMembers} />
        </Stack>
      </Stack>
    </>
  );
};

export default Members;
