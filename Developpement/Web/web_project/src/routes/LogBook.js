import React from "react";

import {
  Stack,
} from "@mui/material";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import Message from "../components/Message";

const LogBook = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingJ,
    isError: isErrorJ,
    error: errorJ,
    data: journalEntries,
  } = useQuery(["getJournalEntries", idTravel], () =>
    TravelRequests.getJournalEntriesOfTravel(idTravel)
  );

  return (
    <div style={{ height: "93.15%" }} width="100%">
      <Stack
        width="90%"
        marginLeft="5%"
        paddingY="1%"
        direction="column"
        height="100%"
      >
        {isLoadingJ ? (
          <Loading />
        ) : isErrorJ ? (
          <p style={{ color: "red" }}>{errorJ.message}</p>
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
