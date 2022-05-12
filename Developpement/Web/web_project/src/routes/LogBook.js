import React from "react";

import {
  Stack,
  CardHeader,
  Avatar,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  Typography,
  CardContent,
} from "@mui/material";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import { stringAvatar } from "../utils/AvatarColorPicker";
import Message from "../components/Message";

const LogBook = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: journalEntries,
  } = useQuery(["getJournalEntries", idTravel], () =>
    TravelRequests.getJournalEntriesOfTravel(idTravel)
  );

  console.log(journalEntries);

  const days = [
    {
      step: "Etape 1",
      messages: [
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Benjamin Gallier",
          time: "15:40",
          content: "Zebii",
        },
      ],
    },
    {
      step: "Etape 1",
      messages: [
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Benjamin Gallier",
          time: "15:40",
          content: "Zebii",
        },
      ],
    },
    {
      step: "Etape 2",
      messages: [
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Benjamin Gallier",
          time: "15:40",
          content: "Zebii",
        },
      ],
    },
    {
      step: "Etape 3",
      messages: [
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Benjamin Grandpré",
          time: "15:40",
          content: "Zebii",
        },
      ],
    },
    {
      step: "Etape 4",
      messages: [
        {
          user: "Philippe Grandpré",
          time: "15:26",
          content: "Salut votez le Z les kheys",
        },
        {
          user: "Benjamin Grandpré",
          time: "15:40",
          content: "Zebii",
        },
      ],
    },
  ];

  return (
    <div style={{ height: "93.15%" }} width="100%">
      <Stack
        width="90%"
        marginLeft="5%"
        paddingY="1%"
        direction="column"
        height="100%"
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p style={{ color: "red" }}>{error.message}</p>
        ) : (
          <Stack spacing={5}>
            {journalEntries.map((journalEntry, index) => (
              <Message key={index} journalEntry={journalEntry}></Message>
            ))}
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default LogBook;
