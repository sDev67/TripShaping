import "../Styles/ButtonStyles.css";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import MemberList from "../components/MembersList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import "../App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import DocumentRequest from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import DocumentList from "../components/DocumentList";

const Documents = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: documentOfTravel,
  } = useQuery(["getMembers", idTravel], () =>
    DocumentRequest.getMembersOfTravel(idTravel)
  );


  const deleteDocument = useMutation(DocumentRequest.removeDocument, {
    onSuccess: (_, id) => queryClient.setQueryData(
      ['getDocuments', idTravel],
      document => document.filter(e => e.id !== id)
    )
  });


  return (
    <>
      <Stack height="100%" width="100%" direction="column">
        <Typography
          color="primary"
          variant="h2"
          textAlign="center"
          marginTop={4}
        >
          Document
        </Typography>
        <Stack
          width="90%"
          marginLeft="5%"
          direction="column"
          justifyContent="space-between"
          height="85%"
        >
          <Stack height="85%">
            <Typography variant="h4" marginY={1}>
              Liste des documents
            </Typography>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <p style={{ color: "red" }}>{error.message}</p>
            ) : (
              <DocumentList
                documents={documentOfTravel}
                deleteDocument={null}
                editDocument={null}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Documents;
