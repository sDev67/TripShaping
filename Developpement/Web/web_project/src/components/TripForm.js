import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import DoneRounded from "@mui/icons-material/DoneRounded";

import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import MemberRequests from "../requests/MemberRequests";
import { useAuth } from "../Authentication/auth";
import { generateName } from "../utils/CryptedNameFormatting";

const TripForm = ({ setTripFormOpen, setOpen, setMessage, setColor }) => {
  const queryClient = useQueryClient();

  let { user } = useAuth();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const getLink = async () => {
    const newTravel = {
      name: name.trim(),
      UserId: user.id,
    };
    creationTravel.mutate(newTravel);
    setTripFormOpen(false);
    setLink("");
    setLoading(false);
  };

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) => {
      queryClient.setQueriesData(["getMembers"], (members) => [
        ...members,
        member,
      ]);
      let cryptedName = generateName(member.TravelId);
      const Travel = {
        TravelId: member.TravelId,
        albumURL: cryptedName,
      };
      updateTravel.mutate(Travel);
    },
  });

  const updateTravel = useMutation(TravelRequests.updateTravelCryptedName, {
    onSuccess: (travel) => {
      queryClient.invalidateQueries(["getTravelById", travel.id]);
    },
  });

  const creationTravel = useMutation(TravelRequests.createTravel, {
    onSuccess: (travel) => {
      const newMember = {
        name: user.name,
        userLogin: user.username,
        TravelId: travel.id,
        UserId: user.id,
      };

      addMember.mutate(newMember);

      setMessage("Voyage créé.");
      setColor("primary");
      setOpen(true);
    },
  });

  const handleSubmit = () => {
    getLink();
  };

  return (
    <>
      <Stack
        direction="column"
        alignItems="flex-start"
        style={{ height: "100%", margin: "20px" }}
      >
        <Typography variant="h3" marginBottom={2}>
          Nouveau voyage
        </Typography>

        <Stack direction="column" width="100%" spacing={1}>
          <TextField
            id="standard-required"
            label="Nom"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoneRounded />}
            onClick={handleSubmit}
          >
            Créer
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default TripForm;
