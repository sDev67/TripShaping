import { Button, Stack, Typography } from "@mui/material"
import { useQuery, useQueryClient, useMutation } from "react-query";

const ConfirmedSuppressionModal = ({ message, id, onClose, onDelete }) => {

    const HandleClick = () => {
        onDelete.mutate(id);
        if (onClose != undefined) {
            onClose();
        }
    }

    return (
        <>

            <Stack flex="column" heigth="100%" width="100%">
                <Typography variant="h5" color="error">
                    {message}
                </Typography>
                <Button onClick={() => HandleClick()} color="error" size="large">
                    Supprimer.
                </Button>
            </Stack>
        </>
    )
}

export default ConfirmedSuppressionModal;