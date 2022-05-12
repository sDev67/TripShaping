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

const Message = ({ journalEntry }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar {...stringAvatar("test test")} />}
        title={journalEntry.MemberId}
        subheader={journalEntry.date}
      />
      <CardContent>
        <Typography variant="body"> {journalEntry.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
