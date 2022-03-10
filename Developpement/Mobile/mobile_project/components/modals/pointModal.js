import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Modal, Button, Image } from 'native-base';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const pointModal = ({ modalVisible, setModalVisible, point, messages, setMessages, setStartCamera }) => {

    const [image, setImage] = useState(null);

    const user = "Vivien Riehl"
    const [newMessage, setNewMessage] = useState('');

    const post = () => {
        const dateCourante = new Date();
        const date = dateCourante.getDate() + "/" + (dateCourante.getMonth() + 1) + "/" + dateCourante.getFullYear();
        const time = dateCourante.getHours() + "h" + dateCourante.getMinutes();

        if (newMessage != "") {
            const newPost = { body: newMessage, author: user, date: date, time: time, catStep: 1, step: point };
            setMessages([...messages, newPost]);
            setNewMessage("");
        }
    };

    const startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsEditing: true,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content maxWidth="90%">
                <Modal.CloseButton />
                <Modal.Header>{point.name}</Modal.Header>
                <Modal.Body>
                    <Text style={styles.font}>Catégorie</Text>
                    <Text>{point.cat}</Text>
                    <Text style={styles.font}>Description</Text>
                    <Text>{point.description}</Text>
                    <Text style={styles.font}> Documents</Text>
                    <Text style={styles.font} >Journal</Text>
                    <View>
                        <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                        <Button style={{ backgroundColor: "#9AD1F5", width: 100, alignSelf: "flex-end", marginRight: 10 }} onPress={() => post()} >Publier</Button>
                    </View>
                    <Text style={styles.font}>Photo</Text>
                    {image && <Image source={{ uri: `data:image/gif;base64,${image.base64}` }} style={{ width: image.width / 8, height: image.height / 8 }} alt="photo" />}
                    <View>
                        <Button style={{ width: "70%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={startCamera}>Prendre une photo</Button>
                        <Button style={{ width: "70%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputFocused: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        height: 100,
        margin: 10
    },
    font: {
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default pointModal;