import {
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { useQuery, useQueryClient, useMutation } from "react-query";
import DocumentRequest from "../requests/DocumentRequest";
import { url_prefix } from "../utils";
import Document from "./Document";

const DocumentsList = ({
  documents,
  requestKeyTitle,
  requestKeyValue,
  isEdition,
  show
}) => {
  const queryClient = useQueryClient();

  const displayDocument = (idDocument) => {
    let url = encodeURI(
      url_prefix + "/document/file/" + idDocument
    );
    window.open(url);
  };

  const removeDocument = useMutation(DocumentRequest.removeDocument, {
    onSuccess: (_, id) =>
      queryClient.setQueryData([requestKeyTitle, requestKeyValue], (tasks) =>
        tasks.filter((e) => e.id !== id)
      ),
  });

  const OnRemoveDocument = (documentId) => {
    removeDocument.mutate(documentId);
  };

  return (
    <>
      <Divider></Divider>
      <List
        style={{
          overflowY: "scroll",
          height: "100%",
        }}
      >
        {documents.map((document) => (
          <Document document={document} onRemoveDocument={OnRemoveDocument} onDisplayDocument={displayDocument} isEdition={isEdition} show={show} />
          // <ListItem
          //   key={document.toString()}
          //   disablePadding
          //   secondaryAction={
          //     <IconButton
          //       color="error"
          //       onClick={() => OnRemoveDocument(document.id)}
          //       disabled={!isEdition}
          //     >
          //       <ClearIcon />
          //     </IconButton>
          //   }
          // >
          //   <ListItemButton onClick={() => displayDocument(document.id)}>
          //     <ListItemAvatar>
          //       <InsertDriveFileRoundedIcon color="primary" />
          //     </ListItemAvatar>
          //     <ListItemText primary={<>{document.title}</>} />
          //   </ListItemButton>
          // </ListItem>
        ))}
      </List>
      <Divider></Divider>
    </>
  );
};

export default DocumentsList;
