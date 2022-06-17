import { Button, Stack, Typography } from "@mui/material"
import TravelRequest from '../requests/TravelRequests';
import { useQuery, useQueryClient, useMutation } from "react-query";


const ConfirmedSuppressionModal = ({ title, idTravel, onClose, onDelete }) => {


    const deleteVoyage = useMutation(TravelRequest.deleteTravel, {
        onSuccess: travel => {
            onClose();
        }
    })

    const HandleClick = () => {

        onDelete.mutate(idTravel);


    }

    return (
        <>
            <Stack flex="column" heigth="100%" width="100%">
                <Typography variant="h4" color="error">
                    Etes-vous sûr de vouloir supprimer le voyage {title} ?
                    Cette action est irréverssible.
                </Typography>
                <Button onClick={() => HandleClick()} color="error" size="large">
                    Je comprend que cette action est irreversible et je confirme la suppression.
                </Button>
            </Stack>
        </>
    )
}

export default ConfirmedSuppressionModal;