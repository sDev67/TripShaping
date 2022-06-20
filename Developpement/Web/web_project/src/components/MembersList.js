import {
  Divider,
  List,
  IconButton,
  ListItem,
  Avatar,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Member from './Member'
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
        {members.map((member, index) => (

          < Member member={member} index={index} deleteMember={deleteMember} />
        ))}
      </List>
      <Divider></Divider>
    </>
  );
};

export default MembersList;
