import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Modal, Button } from 'native-base';

const pointModal = ({ modalVisible, setModalVisible, point, messages, setMessages }) => {

    const user = "Vivien Riehl"
    const [newMessage, setNewMessage] = useState('');

    const post = () => {
        const dateCourante = new Date();
        const date = dateCourante.getDate() + "/" + (dateCourante.getMonth() + 1) + "/" + dateCourante.getFullYear();
        const time = dateCourante.getHours() + "h" + dateCourante.getMinutes();

        if (newMessage != "") {
            const newPost = { body: newMessage, author: user, date: date, time: time, step: point };
            setMessages([...messages, newPost]);
            setNewMessage("");
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