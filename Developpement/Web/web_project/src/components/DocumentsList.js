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
import { stringAvatar } from "../utils/AvatarColorPicker";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

const DocumentsList = ({ documents }) => {
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
              <IconButton color="error">
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <InsertDriveFileRoundedIcon color="primary" />
              </ListItemAvatar>
              <ListItemText primary={<>{document.name}</>} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider></Divider>
    </>
  );
};

export default DocumentsList;
