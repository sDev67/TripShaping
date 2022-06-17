import React from "react";
import { TextField, MenuItem } from "@mui/material";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";

const DropDownMember = ({ selectedMember, setSelectedMember }) => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  // Members
  const {
    isLoading: isLoadingM,
    isError: isErrorM,
    error: errorM,
    data: members,
  } = useQuery(["getMembersOfTravel", idTravel], () =>
    TravelRequests.getMembersOfTravel(idTravel)
  );

  return (
    <>
      {isLoadingM ? (
        <Loading />
      ) : isErrorM ? (
        <p style={{ color: "red" }}>{errorM.message}</p>
      ) : (
        <TextField
          fullWidth
          select
          label="Choisir position du membre"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#fff",
            },
          }}
        >
          {members.map((member, index) => (
            <MenuItem key={index} value={member}>
              {member.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};

export default DropDownMember;
