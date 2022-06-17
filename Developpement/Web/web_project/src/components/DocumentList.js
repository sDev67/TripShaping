import {
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const DocumentList = ({ documents, deleteDocument, editDocument }) => {
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
          <ListItem
            key={document.toString()}
            disablePadding
            secondaryAction={
              <IconButton
                color="error"
                onClick={(e) => deleteDocument.mutate(document.id)}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemText
                primary={
                  <>
                    {document.firstname} {document.lastname}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider></Divider>
    </>
  );
};

export default DocumentList;
