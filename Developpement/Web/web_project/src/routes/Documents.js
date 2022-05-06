import React, { useState } from "react";
import { Stack, Divider, Typography, Dialog } from "@mui/material";
import DocumentsList from "../components/DocumentsList";
import { FileUploader } from "react-drag-drop-files";

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  return (
    <Stack height="93.15%" width="100%" direction="column">
      <Stack
        width="90%"
        marginLeft="5%"
        paddingY="1%"
        direction="column"
        height="100%"
      >
        <Stack height="85%">
          <Typography variant="h4" marginY={1}>
            Liste des documents
          </Typography>
          <DocumentsList documents={documents}></DocumentsList>
        </Stack>
        <FileUploader
          handleChange={(documents) =>
            setDocuments((oldArray) => [...oldArray, documents])
          }
        />
      </Stack>
    </Stack>
  );
};

export default Documents;
