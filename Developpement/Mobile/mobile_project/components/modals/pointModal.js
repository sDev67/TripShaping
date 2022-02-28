import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import { Modal } from 'native-base';

const pointModal = ({ modalVisible, setModalVisible, point }) => {
    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content maxWidth="90%">
                <Modal.CloseButton />
                <Modal.Header>{point.name}</Modal.Header>
                <Modal.Body>
                    <Text>Catégorie : {point.cat}</Text>
                    <Text>Description</Text>
                    <Text>{point.description}</Text>
                    <Text>Documents</Text>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

export default pointModal;