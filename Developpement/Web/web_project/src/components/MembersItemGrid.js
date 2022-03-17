import {
  Grid,
  Card,
  Box,
  Avatar,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CustomChip from "./CustomChip";

const MembersItemGrid = ({ members, OnDeleteMember }) => {
  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);

    return color;
  }

  return (
    <>
      <Grid style={{ overflow: "auto", height: "100%" }}>
        <Grid
          item
          xs={"auto"}
          container
          textAlign="left"
          sx={{
            padding: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {members.map((member) => (
            <>
                <CustomChip key={member.toString()}
                  size={12}
                  avatar={<Avatar sx={{ bgcolor: randomColor }} />}
                  variant="outlined"
                  color="default"
                 
                  onDelete={(e) => OnDeleteMember({ member: member })}
                  label={
                    <Typography>
                      {member.firstname} {member.lastname[0]}
                    </Typography>
                  }
                />
                
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MembersItemGrid;
