import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";

const ConfirmedSuppressionModal = ({ message, id, onClose, onDelete }) => {
  const HandleClick = () => {
    onDelete.mutate(id);
    if (onClose != undefined) {
      onClose();
    }
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Button
                onClick={() => HandleClick()}
                color="primary"
                variant="contained"
              >
                Oui
              </Button>
              <Button
                onClick={() => {
                  if (onClose != undefined) {
                    onClose();
                  }
                }}
                color="error"
                variant="contained"
              >
                Non
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default ConfirmedSuppressionModal;
