import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import { Modal } from 'native-base';

const ItinaryModal = ({ modalVisible, setModalVisible, distance, duration }) => {
    return (

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content maxWidth="90%">
                <Modal.CloseButton />
                <Modal.Header>Itinéraire</Modal.Header>
                <Modal.Body>
                    <Text>Catégorie</Text>
                    <Text>Durée : {duration} min </Text>
                    <Text>Distance : {distance} km</Text>
                    <Text>Description</Text>
                    <Text>Documents</Text>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

export default ItinaryModal;