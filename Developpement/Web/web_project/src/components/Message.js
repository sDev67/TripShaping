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
import MemberRequests from "./../requests/MemberRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import Loading from "./../utils/Loading";
import StepRequests from "./../requests/StepRequests";

const Message = ({ journalEntry }) => {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingS,
    isError: isErrorS,
    error: errorS,
    data: step,
  } = useQuery(["getStepById", journalEntry.StepId], () =>
    StepRequests.getStepById(journalEntry.StepId)
  );

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: member,
  } = useQuery(["getMemberById", journalEntry.MemberId], () =>
    MemberRequests.getMemberById(journalEntry.MemberId)
  );

  console.log(member);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p style={{ color: "red" }}>{error.message}</p>
      ) : (
        <div>
          {isLoadingS ? (
            <Loading />
          ) : isErrorS ? (
            <p style={{ color: "red" }}>{errorS.message}</p>
          ) : (
            <div>
              <Card>
                <CardHeader
                  avatar={<Avatar {...stringAvatar(member.name)} />}
                  title={
                    <Stack direction="row" justifyContent="space-between">
                      <div>{member.name}</div>
                      <i>{step.title}</i>
                    </Stack>
                  }
                  subheader={journalEntry.date}
                />
                <CardContent>
                  <Typography variant="body"> {journalEntry.text}</Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
