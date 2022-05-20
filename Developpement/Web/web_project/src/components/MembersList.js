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
import crown from "../assets/crown.png";

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
        {members.map((member, index) => {
          if (index != 0) {
            return (
              <>
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
                      secondary={
                        <i>{!member.userLogin ? "Non Inscrit" : ""}</i>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </>
            );
          } else {
            return (
              <>
                <ListItem
                  key={member.toString()}
                  disablePadding
                  secondaryAction={
                    <img
                      src={crown}
                      style={{ width: "25px", height: "25px", marginRight: 8 }}
                    />
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(member.name)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<>{member.name}</>}
                      secondary={
                        <i>{!member.userLogin ? "Non Inscrit" : ""}</i>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </>
            );
          }
        })}
      </List>
      <Divider></Divider>
    </>
  );
};

export default MembersList;
