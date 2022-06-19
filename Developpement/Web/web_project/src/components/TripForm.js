import {
  Button,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneRounded from "@mui/icons-material/DoneRounded";

import { useQuery, useQueryClient, useMutation } from "react-query";
import TravelRequests from "../requests/TravelRequests";
import MemberRequests from "../requests/MemberRequests";
import { useAuth } from "../Authentication/auth";
import shrtcode from "../requests/shrtcode";
import { url_prefix } from "../utils";
const HTTP_URL_VALIDATOR_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const TripForm = ({ setTripFormOpen }) => {
  const queryClient = useQueryClient();

  let { user } = useAuth();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const generateName = (travelId) => {
    let alphabet =
      "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9JjKkLl&MmNnOoPpQqRrSsTtUu_VvàWwXxYyZz";
    var min = 5;
    var max = 10;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;

    let cryptedName = "";

    for (var i = 0; i < rand; i++) {
      cryptedName +=
        alphabet[Math.floor(Math.random() * (alphabet.length - 0 + 1)) + 0];
    }

    cryptedName += "$" + travelId;

    return encodeURI(cryptedName);
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

      // queryClient.setQueryData(
      //   ['getTravels'],
      //   console.log(travels)
      //   (travels) => [...travels, travel]
      // )

      let cryptedName = generateName(travel.id);

      const Travel = {
        TravelId: travel.id,
        albumURL: cryptedName,
      };
      console.log("here " + cryptedName);
      updateTravel.mutate(Travel);
      //travel.cryptedName = generateName(travel.id)
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
