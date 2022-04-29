import {
    Divider,
    List,
    IconButton,
    ListItem,
    Typography,
    Avatar,
    Chip,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
  } from "@mui/material";
  import ClearIcon from "@mui/icons-material/Clear";
  import EditRoundedIcon from '@mui/icons-material/EditRounded';
  import { stringAvatar } from "../utils/AvatarColorPicker";
  
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
  