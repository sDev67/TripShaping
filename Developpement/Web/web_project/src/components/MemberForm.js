import { Divider, Grid, Dialog, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Stack, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { stringAvatar } from "../utils/AvatarColorPicker";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import MemberRequests from "../requests/MemberRequests";

const MemberForm = ({
  users,
}) => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();


  const [selectedMember, setSelectedMember] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) =>
      queryClient.setQueryData(["getMembers", idTravel], (members) => [
        ...members,
        member,
      ]),
  });

  const OnAddMember = (firstname, lastname, fictive) => {
    const newMember = {
      firstname: firstname,
      lastname: lastname,
      fictive: fictive,
      TravelId: idTravel,
    };
    addMember.mutate(newMember);
    if(fictive)
    {
      setFirstname("");
      setLastname("");
    }
    else
    {
      setSelectedMember({});
    }
    
  };

  return (
    <>
      <Stack direction="row" style={{ width: "100%" }} spacing={15}>
        <div style={{ width: "50%" }}>
          <Typography variant="h6" marginY={1}>
            Ajouter un membre du site
          </Typography>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              style={{ width: "75%" }}
              noOptionsText={"Aucun membre trouvé"}
              fullWidth
              options={users}
              onChange={(event, value) => setSelectedMember(value)}
              autoHighlight
              getOptionLabel={(option) =>
                option.firstname + " " + option.lastname
              }
              renderOption={(props, option) => (
                <Stack
                  direction="row"
                  component="li"
                  {...props}
                  alignItems="center"
                  spacing={1}
                >
                  <Avatar
                    {...stringAvatar(option.firstname + " " + option.lastname)}
                  />
                  <Typography>
                    {option.firstname} {option.lastname}
                  </Typography>
                </Stack>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
            <Button
              style={{ width: "25%" }}
              variant="contained"
              onClick={(e) => {
                OnAddMember(selectedMember.firstname, selectedMember.lastname, false);
              }}
            >
              Ajouter
            </Button>
          </Stack>
        </div>

        <div style={{ width: "50%" }}>
          <Typography variant="h6" marginY={1}>
            Ajouter un membre non inscrit
          </Typography>

          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1} style={{ width: "75%" }}>
              <TextField
                label="Prénom"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                label="Nom"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
              />
            </Stack>

            <Button
              style={{ width: "25%" }}
              onClick={(e) => {
                OnAddMember(firstname, lastname, true);
              }}
              variant="contained"
            >
              Ajouter
            </Button>
          </Stack>
        </div>
      </Stack>
    </>
  );
};

export default MemberForm;