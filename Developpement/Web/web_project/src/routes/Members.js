import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MemberList from "../components/MembersList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import MemberForm from "../components/MemberForm";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import MemberRequests from "../requests/MemberRequests";
import UserRequests from "../requests/UserRequests";

const Members = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: membersOfTravel,
  } = useQuery(["getMembers", idTravel], () =>
    TravelRequests.getMembersOfTravel(idTravel)
  );

  const {
    isLoading: isLoadingA,
    isError: isErrorA,
    error: errorA,
    data: users,
  } = useQuery(["getUsers"], () => UserRequests.getAllUsers());

 

  const deleteMember = useMutation(MemberRequests.removeMember, {
    onSuccess: (_, id) => queryClient.setQueryData(
      ['getMembers', idTravel],
      members => members.filter(e => e.id !== id)
    )
  });

 



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
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <p style={{ color: "red" }}>{error.message}</p>
            ) : (
              <MemberList
                members={membersOfTravel}
                canBeDelete={true}
                deleteMember={deleteMember}
              />
            )}
          </Stack>
          <MemberForm
            users={users}
           
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Members;
