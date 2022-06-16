import {
  Button,
  tabsListUnstyledClasses,
  TextField,
  Typography,
  Checkbox
} from "@mui/material";
import { Stack, Box, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DoneRounded from "@mui/icons-material/DoneRounded";

import { useQuery, useQueryClient, useMutation } from 'react-query';
import TravelRequests from "../requests/TravelRequests";
import MemberRequests from "../requests/MemberRequests";
import { useAuth } from "../Authentication/auth";

const TripForm = ({ setTripFormOpen }) => {
  const queryClient = useQueryClient();

  let { user } = useAuth();

  const [name, setName] = useState("");

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: member => {
      queryClient.setQueriesData(['getMembers', user.id], members => [...members, member])
    }
  })

  const creationTravel = useMutation(TravelRequests.createTravel, {

    onSuccess: travel => {
      const newMember = {
        name: user.name,
        userLogin: user.username,
        TravelId: travel.id,
        UserId: user.id,
      }

      addMember.mutate(newMember);
      queryClient.setQueryData(
        ['getTravels'],
        travels => [...travels, travel]
      )
    }
  }
  );

  const handleSubmit = () => {
    const newTravel = {
      name: name.trim(),
      UserId: user.id
    }
    creationTravel.mutate(newTravel);
    setTripFormOpen(false);
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
