import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";

const ConfirmedSuppressionModal = ({ message, id, onClose, onDelete }) => {
  const HandleClick = () => {
    onDelete.mutate(id);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction="column"
            justifyContent="center"
            spacing={6}
            alignItems="center"
          >
            <Typography variant="h5" color="error">
              {message}
            </Typography>
            <Button
              onClick={() => HandleClick()}
              color="error"
              variant="contained"
            >
              Supprimer
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ConfirmedSuppressionModal;
