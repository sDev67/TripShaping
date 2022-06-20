import {
    Divider,
    List,
    IconButton,
    ListItem,
    Avatar,
    Dialog,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { stringAvatar } from "../utils/AvatarColorPicker";
import crown from "../assets/crown.png";
import ConfirmedSuppressionModal from "./ConfirmedSuppressionModal";
const Member = ({ member, index, deleteMember }) => {
    const [confirmedDeleteDialogOpen, setConfirmedDeleteDialogOpen] = useState(false);
    const HandleCloseConfirmedSuppr = () => {
        setConfirmedDeleteDialogOpen(false);

    };
    if (index != 0) {
        console.log("HERE");
        return (
            <>
                <ListItem
                    key={member.toString()}
                    disablePadding
                    secondaryAction={
                        <IconButton
                            color="error"
                            onClick={(e) => setConfirmedDeleteDialogOpen(true)}
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
                <Dialog
                    open={confirmedDeleteDialogOpen}
                    onClose={HandleCloseConfirmedSuppr}
                >
                    <ConfirmedSuppressionModal
                        id={member.id}
                        onClose={HandleCloseConfirmedSuppr}
                        message="Confirmez la suppression de ce membre ?
                    Cette action est irréversible."
                        onDelete={deleteMember}
                    />
                </Dialog>
            </>
        );
    } else {
        console.log("HERE")
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

}

export default Member;