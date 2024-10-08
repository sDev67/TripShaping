import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Stack, FormControlLabel, Switch } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import MemberRequests from "../requests/MemberRequests";

const MemberForm = ({ setOpen, setMessage, setColor }) => {
  let { idTravel } = useParams();
  idTravel = parseInt(idTravel);

  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [registeredMember, setRegiteredMember] = useState(true);
  const [error, setError] = useState(null);

  const addMember = useMutation(MemberRequests.addMember, {
    onSuccess: (member) => {
      queryClient.setQueryData(["getMembers", idTravel], (members) => [
        ...members,
        member,
      ]);
      setError(null);
      setMessage("Membre ajouté.");
      setColor("primary");
      setOpen(true);
    },
    onError: (error) => {
      setMessage("Utilisateur inexistant/introuvable.");
      setColor("error");
      setOpen(true);
    },
  });

  const OnAddMember = (name, login, fictive) => {
    if (fictive) {
      const newMember = {
        name: name,
        userLogin: login,
        TravelId: idTravel,
        UserId: null,
      };
      addMember.mutate(newMember);
    } else {
      const newMember = {
        name: name,
        userLogin: "",
        TravelId: idTravel,
        UserId: null,
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
          label="Membre inscrit"
          labelPlacement="start"
          onChange={handleSwitch}
          checked={registeredMember}
        />
        {registeredMember ? (
          <div style={{ width: "50%" }}>
            <Stack direction="row" justifyContent="center">
              <Typography variant="h6" marginY={1} marginX={2}>
                Ajouter un membre du site
              </Typography>
              {error && (
                <Typography
                  variant="h6"
                  marginY={1}
                  marginX={2}
                  style={{ color: "red" }}
                >
                  {error}
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1} style={{ width: "75%" }}>
                <TextField
                  required
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
            <Stack direction="row" justifyContent="space-around">
              <Typography variant="h6" marginY={1}>
                Ajouter un membre non inscrit
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1} style={{ width: "75%" }}>
                <TextField
                  required
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
