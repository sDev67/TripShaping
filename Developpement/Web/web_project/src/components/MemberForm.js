import { Divider, Grid, Dialog, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Stack, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { stringAvatar } from "../utils/AvatarColorPicker";

const MemberForm = ({
  OnAddMember,
  allMembers,
  statusAddFictifMember = false,
  setAddFictifMember,
}) => {
  const [selectedMember, setSelectedMember] = useState({});
  const [fictivFirstname, setFictivFirstname] = useState("");
  const [fictivLastname, setFictivLastname] = useState("");

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
              options={allMembers}
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
              onClick={(e) =>
                OnAddMember({
                  id: allMembers.length,
                  firstname: selectedMember.firstname,
                  lastname: selectedMember.lastname,
                })
              }
              variant="contained"
            >
              Ajouter
            </Button>
          </Stack>
        </div>

        <div style={{ width: "50%" }}>
          <Typography variant="h6" marginY={1}>
            Ajouter un membre non répertorié
          </Typography>

          <Stack direction="row" spacing={1}>
            <Stack direction="row" spacing={1} style={{ width: "75%" }}>
              <TextField
                label="Prénom"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={fictivFirstname}
                onChange={(e) => setFictivFirstname(e.target.value)}
              />
              <TextField
                label="Nom"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setFictivLastname(e.target.value)}
                value={fictivLastname}
              />
            </Stack>

            <Button
              style={{ width: "25%" }}
              onClick={(e) => {
                OnAddMember({
                  id: allMembers.length,
                  firstname: fictivFirstname,
                  lastname: fictivLastname,
                });
                setFictivFirstname("");
                setFictivLastname("");
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
