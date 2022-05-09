import { Divider, Grid, Dialog, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Stack, Avatar, FormControlLabel, Switch } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { stringAvatar } from "../utils/AvatarColorPicker";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../utils/Loading";
import MemberRequests from "../requests/MemberRequests";

const MemberForm = () => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [registeredMember, setRegiteredMember] = useState(false);

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) =>
      queryClient.setQueryData(["getMembers", idTravel], (members) => [
        ...members,
        member,
      ]),
  });

  const OnAddMember = (name, login, fictive) => {
    if (fictive) {
      const newMember = {
        name: name,
        userLogin: login,
        TravelId: idTravel,
        UserId: null
      };
      addMember.mutate(newMember);
    } else {
      const newMember = {
        name: name,
        userLogin: "",
        TravelId: idTravel,
        UserId: null
      };
      addMember.mutate(newMember);
    }
    setName("");
    setLogin("");
  };

  const handleSwitch = () => {
    setRegiteredMember(!registeredMember);
  };

  return (
    <>
      <Stack
        direction="row"
        style={{ width: "100%" }}
        spacing={15}
        justifyContent="center"
      >
        <FormControlLabel
          value="MembreInscrit"
          control={<Switch color="primary" />}
          label="Membre non inscrit"
          labelPlacement="start"
          onChange={handleSwitch}
          checked={registeredMember}
          position="absolute"
        />
        {!registeredMember ? (
          <div style={{ width: "50%" }}>
            <Typography variant="h6" marginY={1}>
              Ajouter un membre du site
            </Typography>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1} style={{ width: "75%" }}>
                <TextField
                  label="Nom d'utilisateur"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                />
                <TextField
                  label="Nom"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Stack>

              <Button
                style={{ width: "25%" }}
                onClick={(e) => {
                  OnAddMember(name, login, true);
                }}
                variant="contained"
              >
                Ajouter
              </Button>
            </Stack>
          </div>
        ) : (
          <div style={{ width: "50%" }}>
            <Typography variant="h6" marginY={1}>
              Ajouter un membre non inscrit
            </Typography>

            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1} style={{ width: "75%" }}>
                <TextField
                  label="Nom"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Stack>

              <Button
                style={{ width: "25%" }}
                onClick={(e) => {
                  OnAddMember(name, login, true);
                }}
                variant="contained"
              >
                Ajouter
              </Button>
            </Stack>
          </div>
        )}
      </Stack>
    </>
  );
};

export default MemberForm;
