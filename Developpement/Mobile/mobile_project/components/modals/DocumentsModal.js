import { Modal, NativeBaseProvider, Center } from 'native-base';
import { Text, Image, Pressable, ScrollView, View } from 'react-native';

import file from '../../assets/navigation_icons/icon_file.png';

import TravelRequests from '../../requests/TravelRequests';
import { useQuery, useQueryClient } from 'react-query';

const DocumentsModal = ({ navigation, showModal, setShowModal, idTravel, PointId }) => {

    // Documents 
    const { isLoading: isLoadingD, isError: isErrorD, error: errorD, data: documents } = useQuery(["getDocuments", idTravel], () => TravelRequests.getDocumentsByTravelId(idTravel));
    let count = 0;

    return (
        <NativeBaseProvider >
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>Documents</Modal.Header>
                        <Modal.Body>
                            <ScrollView>
                                {isLoadingD ? <Text>Chargement...</Text> : isErrorD ? <Text style={{ color: 'red' }}>{errorD.message}</Text> :
                                    documents.map((doc, idx) => {
                                        if (doc.PointId === PointId) {
                                            return (<Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }); setShowModal(false) }}><View style={{ flexDirection: "row" }}><Image source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                                        }
                                    })}
                            </ScrollView>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>
        </NativeBaseProvider >
    )
}


export default DocumentsModal;