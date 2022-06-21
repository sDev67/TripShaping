import { Modal, NativeBaseProvider, Center } from 'native-base';
import { Text, Image, Pressable, ScrollView, View } from 'react-native';

import file from '../../assets/navigation_icons/icon_file.png';

const DocumentsModal = ({ navigation, showModal, setShowModal, documents }) => {

    return (
        <NativeBaseProvider >
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>Documents</Modal.Header>
                        <Modal.Body>
                            <ScrollView>
                                {documents.map((doc, idx) => (
                                    <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }); setShowModal(false) }}><View style={{ flexDirection: "row" }}><Image source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>
                                ))}
                            </ScrollView>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>
        </NativeBaseProvider >
    )
}


export default DocumentsModal;