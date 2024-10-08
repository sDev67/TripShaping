import React, { useState } from "react";
import "../Styles/ButtonStyles.css";
import { Stack, Typography } from "@mui/material";
import MemberList from "../components/MembersList";
import "../App.css";
import MemberForm from "../components/MemberForm";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import MemberRequests from "../requests/MemberRequests";
import CustomSnackbar from "../utils/CustomSnackbar";

const Members = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const {
    isLoading: isLoadingM,
    isError: isErrorM,
    error: errorM,
    data: membersOfTravel,
  } = useQuery(["getMembers", idTravel], () =>
    TravelRequests.getMembersOfTravel(idTravel)
  );

  const deleteMember = useMutation(MemberRequests.removeMember, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(["getMembers", idTravel], (members) =>
        members.filter((e) => e.id !== id)
      );
      setMessage("Membre supprimé");
      setColor("primary");
      setOpen(true);
    },
  });

  return (
    <>
      <Stack height="90%" width="100%" direction="column">
        <Stack
          width="90%"
          paddingY="1%"
          marginLeft="5%"
          direction="column"
          justifyContent="space-between"
          height="100%"
        >
          <Typography variant="h4" marginY={1}>
            Liste des membres
          </Typography>
          {isLoadingM ? (
            <Loading />
          ) : isErrorM ? (
            <p style={{ color: "red" }}>{errorM.message}</p>
          ) : (
            <MemberList
              members={membersOfTravel}
              canBeDelete={true}
              deleteMember={deleteMember}
            />
          )}

          <MemberForm
            setOpen={setOpen}
            setMessage={setMessage}
            setColor={setColor}
          />
        </Stack>
      </Stack>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        color={color}
      ></CustomSnackbar>
    </>
  );
};

export default Members;
