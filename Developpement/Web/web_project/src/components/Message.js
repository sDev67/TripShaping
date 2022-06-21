import React from "react";
import {
  Stack,
  CardHeader,
  Avatar,
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
    refetch: refetchS,
  } = useQuery(
    ["getStepById", journalEntry.StepId],
    () => StepRequests.getStepById(journalEntry.StepId),
    { enabled: false }
  );

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: member,
  } = useQuery(["getMemberById", journalEntry.MemberId], () =>
    MemberRequests.getMemberById(journalEntry.MemberId)
  );

  if (journalEntry.StepId) {
    refetchS();
  }

  // console.log(step);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p style={{ color: "red" }}>{error.message}</p>
      ) : (
        <div>
          <div>
            <Card>
              <CardHeader
                avatar={<Avatar {...stringAvatar(member.name)} />}
                title={
                  <Stack direction="row" justifyContent="space-between">
                    <div>{member.name}</div>
                    {step && (
                      <>
                        {isLoadingS ? (
                          <Loading />
                        ) : isErrorS ? (
                          <p style={{ color: "red" }}>{errorS.message}</p>
                        ) : (
                          <i>{step.title}</i>
                        )}
                      </>
                    )}
                  </Stack>
                }
                subheader={journalEntry.date}
              />
              <CardContent>
                <Typography variant="body"> {journalEntry.text}</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
