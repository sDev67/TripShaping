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

import { stringAvatar } from "../utils/AvatarColorPicker";

const LogBook = () => {
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

  console.log(days);
  return (
    <div style={{ height: "93.15%" }} width="100%">
      <Stack
        width="90%"
        marginLeft="5%"
        paddingY="1%"
        direction="column"
        height="100%"
      >
        <Stack spacing={5}>
          {days.map((day, index) => (
            <div key={index}>
              <Typography variant="h4" color="primary">
                Jour {index + 1} : {day.step}
              </Typography>
              <Stack spacing={2}>
                {day.messages.map((message, index) => (
                  <Card>
                    <CardHeader
                      avatar={<Avatar {...stringAvatar(message.user)} />}
                      title={message.user}
                      subheader={message.time}
                    />
                    <CardContent>
                      <Typography variant="body"> {message.content}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </div>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default LogBook;
