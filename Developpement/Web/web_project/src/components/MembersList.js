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

const MembersList = ({ members, deleteMember }) => {
  return (
    <>
      <Divider></Divider>
      <List
        style={{
          overflowY: "scroll",
          height: "100%",
        }}
      >
        {members.map((member) => (
          <ListItem
            key={member.toString()}
            disablePadding
            secondaryAction={
              <IconButton
                color="error"
                onClick={(e) => deleteMember.mutate(member.id)}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar {...stringAvatar(member.name)} />
              </ListItemAvatar>
              <ListItemText
                primary={<>{member.name}</>}
                secondary={<i>{!member.userLogin ? "Non Inscrit" : ""}</i>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider></Divider>
    </>
  );
};

export default MembersList;
