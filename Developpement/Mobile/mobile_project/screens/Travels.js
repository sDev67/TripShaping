import { Button, NativeBaseProvider, ScrollView, Center } from 'native-base';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertDialog } from "native-base";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';

const Alert = ({ isOpen, setIsOpen, name, id, isReadOnly, navigation }) => {

    const onClose = () => setIsOpen(false);

    const activatedTravel = (id, isReadOnly, navigation) => {
        onClose()
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    }

    const cancelRef = useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header><Center>Voulez-vous activer ce voyage ?</Center></AlertDialog.Header>
                <AlertDialog.Body>
                    <Center><Text>{name}</Text></Center>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Annuler
                        </Button>
                        <Button colorScheme="danger" onPress={() => activatedTravel(id, isReadOnly, navigation)}>
                            Activer
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};


const Travels = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const { isLoading: isLoading, isError: isError, error: error, data: travels } = useQuery(
        ['getTravels'], () => TravelRequests.getAllTravel()
    );

    let isReadOnly = false;

    const visualizedTravel = (id) => {
        isReadOnly = true;
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    }

    const askForValidate = (name, id) => {
        setSelectedId(id)
        setSelectedTravel(name);
        setIsOpen(true);
    }

    return (
        <NativeBaseProvider>
            <Alert isOpen={isOpen} setIsOpen={setIsOpen} name={selectedTravel} id={selectedId} isReadOnly={isReadOnly} navigation={navigation} />
            {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                <View style={{ backgroundColor: "white", height: "100%" }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", color: "red", fontWeight: "bold" }}>Aucun voyage n'est activé</Text>
                    <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", borderBottomColor: "black", borderBottomWidth: 1, marginHorizontal: 10, paddingBottom: 20 }}>{travels.length === 1 ? "Voyage" : "Voyages"} en préparation</Text>
                    <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
                        {
                            travels.map((travel, id) => {
                                return (
                                    <View key={id} style={{ borderColor: "black", borderWidth: 1, height: 75, marginHorizontal: 10, marginTop: 10, borderRadius: 5, backgroundColor: "#E3E8EB" }}>
                                        <Text style={{ textAlign: 'center' }}>{travel.name}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 7 }}>
                                            <Button colorScheme='blue' style={{ width: 100 }} onPress={() => visualizedTravel(travel.id)}>Visualiser</Button>
                                            <Button colorScheme='red' style={{ width: 100 }} onPress={() => askForValidate(travel.name, travel.id)}>Activer</Button>
                                        </View>
                                    </View>
                                )
                            })}
                    </ScrollView>
                </View>
            }
        </NativeBaseProvider >
    )
}

export default Travels;