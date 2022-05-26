import { Button, NativeBaseProvider, ScrollView, Center } from 'native-base';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertDialog } from "native-base";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import DatePicker from 'react-native-datepicker';

import { useAuth } from '../requests/Auth'
import UserRequests from '../requests/UserRequests';

const AlertFinish = ({ isOpen, setIsOpen, name, id }) => {

    const { user } = useAuth();
    const queryClient = useQueryClient();
    const onClose = () => setIsOpen(false);

    const updateStatus = useMutation(TravelRequests.updateTravel, {
        onSuccess: newTravel => {
            queryClient.setQueryData(["getCurrentTravels"], newTravel);
            queryClient.invalidateQueries(["getCurrentTravels", user.id]);
            queryClient.invalidateQueries(["getInPreparationTravels", user.id]);
            queryClient.invalidateQueries(["getFinishTravels", user.id])
        },
    });

    const finishTrip = (id) => {
        const newTravel = { TravelId: id, status: 2 };
        updateStatus.mutate(newTravel);
        onClose()
    };

    const cancelRef = useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header><Center>Voulez-vous terminer ce voyage ?</Center></AlertDialog.Header>
                <AlertDialog.Body>
                    <Center><Text>{name}</Text></Center>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Annuler
                        </Button>
                        <Button style={{ backgroundColor: "red" }} onPress={() => finishTrip(id)}>
                            Terminer
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};


const AlertReactivate = ({ isOpen, setIsOpen, name, id, isReadOnly, navigation }) => {

    const { user } = useAuth();
    const queryClient = useQueryClient();
    const onClose = () => setIsOpen(false);

    const updateStatus = useMutation(TravelRequests.updateTravel, {
        onSuccess: newTravel => {
            queryClient.setQueryData(["getCurrentTravels"], newTravel);
            queryClient.invalidateQueries(["getCurrentTravels", user.id]);
            queryClient.invalidateQueries(["getInPreparationTravels", user.id]);
            queryClient.invalidateQueries(["getFinishTravels", user.id])
        },
    });

    const reactivateTrip = (id, isReadOnly, navigation) => {
        const newTravel = { TravelId: id, status: 1 };
        updateStatus.mutate(newTravel);
        onClose()
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    };

    const cancelRef = useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header><Center>Voulez-vous réactiver ce voyage ?</Center></AlertDialog.Header>
                <AlertDialog.Body>
                    <Center><Text>{name}</Text></Center>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Annuler
                        </Button>
                        <Button style={{ backgroundColor: "#00AB55" }} onPress={() => reactivateTrip(id, isReadOnly, navigation)}>
                            Reactiver
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};


const Alert = ({ isOpen, setIsOpen, name, id, isReadOnly, navigation }) => {

    const { user } = useAuth();
    const today = new Date();
    const todayString = ('0' + today.getDate()).slice(-2) + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + today.getFullYear()

    const [date, setDate] = useState(todayString);

    const queryClient = useQueryClient();
    const onClose = () => setIsOpen(false);

    const updateStatus = useMutation(TravelRequests.updateTravel, {
        onSuccess: newTravel => {
            queryClient.setQueryData(["getCurrentTravels"], newTravel);
            queryClient.invalidateQueries(["getCurrentTravels", user.id]);
            queryClient.invalidateQueries(["getInPreparationTravels", user.id]);
            queryClient.invalidateQueries(["getFinishTravels", user.id])
        },
    });

    const startTrip = (id, isReadOnly, navigation) => {
        const dateTab = todayString.split('-');
        const start = new Date(parseInt(dateTab[2]), parseInt(dateTab[1]), parseInt(dateTab[0]))
        const newTravel = { TravelId: id, status: 1, startDate: start };
        updateStatus.mutate(newTravel);
        onClose()
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    };

    const cancelRef = useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header><Center>Voulez-vous activer ce voyage ?</Center></AlertDialog.Header>
                <AlertDialog.Body>
                    <Center><Text>{name}</Text>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2016"
                            maxDate={todayString}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    //display: 'none',
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        /></Center>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Annuler
                        </Button>
                        <Button style={{ backgroundColor: "#00AB55" }} onPress={() => startTrip(id, isReadOnly, navigation)}>
                            Activer
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    </Center>;
};


const Travels = ({ navigation }) => {

    const { user } = useAuth();
    const id = parseInt(user.id);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReactivate, setIsOpenReactivate] = useState(false);
    const [isOpenFinish, setIsOpenFinish] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const [currentTravel, setCurrentTravel] = useState([]);
    const [prepTravel, setPrepTravel] = useState([]);
    const [finTravel, setFinTravel] = useState([]);

    const { isLoading: isLoading, isError: isError, error: error, data: preparationTravels } = useQuery(
        ['getInPreparationTravels', 4], () => TravelRequests.getInPreparationTravel()
    );

    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ["getMembers"], () => UserRequests.getMembers(id));

    const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: currentTravels } = useQuery(
        ['getCurrentTravels', user.id], () => TravelRequests.getCurrentTravel()
    );

    const { isLoading: isLoadingT, isError: isErrorT, error: errorT, data: finishTravels } = useQuery(
        ['getFinishTravels', user.id], () => TravelRequests.getFinishTravel()
    )

    useEffect(() => {
        let current = [];
        let prep = [];
        let fin = [];
        isLoadingM ? null : isErrorM ? null : members.map((member) => {
            isLoadingP ? null : isErrorP ? null : currentTravels.map((travel) => {
                if (member.TravelId === travel.id) {
                    current.push(travel);
                }
            })
            isLoading ? null : isError ? null : preparationTravels.map((travel) => {
                if (member.TravelId === travel.id) {
                    prep.push(travel);
                }
            })
            isLoadingT ? null : isErrorT ? null : finishTravels.map((travel) => {
                if (member.TravelId === travel.id) {
                    fin.push(travel);
                }
            })
        })
        setCurrentTravel(current);
        setPrepTravel(prep);
        setFinTravel(fin)
        current = [];
        prep = [];
        fin = [];
    }, [currentTravels, members, preparationTravels, finishTravels])

    let isReadOnly = false;

    const visualizedTravel = (id) => {
        isReadOnly = false;
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    }

    const visualizedFinishTravel = (id) => {
        isReadOnly = true;
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    }

    const askForValidate = (name, id) => {
        setSelectedId(id)
        setSelectedTravel(name);
        setIsOpen(true);
    }

    const askForReactivate = (name, id) => {
        setSelectedId(id)
        setSelectedTravel(name);
        setIsOpenReactivate(true);
    }

    const askForTerminate = (name, id) => {
        setSelectedId(id)
        setSelectedTravel(name);
        setIsOpenFinish(true);
    }

    const showTrip = (id) => {
        navigation.navigate("Map", { isReadOnly: isReadOnly, idTravel: id });
    }

    return (
        <NativeBaseProvider>
            <Alert isOpen={isOpen} setIsOpen={setIsOpen} name={selectedTravel} id={selectedId} isReadOnly={isReadOnly} navigation={navigation} />
            <AlertReactivate isOpen={isOpenReactivate} setIsOpen={setIsOpenReactivate} name={selectedTravel} id={selectedId} isReadOnly={isReadOnly} navigation={navigation} />
            <AlertFinish isOpen={isOpenFinish} setIsOpen={setIsOpenFinish} name={selectedTravel} id={selectedId} />
            <ScrollView style={{ backgroundColor: "white", marginBottom: 10 }}>
                {isLoadingP ? <Text>Chargement...</Text> : isErrorP ? <Text style={{ color: 'red' }}>{errorP.message}</Text> :
                    <View>
                        {currentTravel.length !== 0 ?
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", borderBottomColor: "black", borderBottomWidth: 1, marginHorizontal: 10, paddingBottom: 20 }}>{currentTravel.length === 1 ? "Voyage" : "Voyages"} en cours</Text>
                                {
                                    currentTravel.length != 0 && currentTravel.map((travel, id) => {
                                        {
                                            return (
                                                <View key={id} style={{ borderColor: "black", borderWidth: 1, height: 75, marginHorizontal: 10, marginTop: 10, borderRadius: 5, backgroundColor: "#E3E8EB" }}>
                                                    <Text style={{ textAlign: 'center' }}>{travel.name}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 7 }}>
                                                        <Button colorScheme='blue' style={{ width: 100 }} onPress={() => showTrip(travel.id)}>Consulter</Button>
                                                        <Button style={{ width: 100, backgroundColor: "red" }} onPress={() => askForTerminate(travel.name, travel.id)}>Terminer</Button>
                                                    </View>
                                                </View>
                                            )

                                        }
                                    })
                                }
                            </View> :
                            <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", color: "red", fontWeight: "bold" }}>Aucun voyage n'est activé</Text>
                        }</View>
                }
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                    prepTravel.length !== 0 &&
                    <View style={{ backgroundColor: "white" }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", borderBottomColor: "black", borderBottomWidth: 1, marginHorizontal: 10, paddingBottom: 20 }}>{prepTravel.length === 1 ? "Voyage" : "Voyages"} en préparation</Text>
                        {
                            prepTravel.map((travel, id) => {
                                return (
                                    <View key={id} style={{ borderColor: "black", borderWidth: 1, height: 75, marginHorizontal: 10, marginTop: 10, borderRadius: 5, backgroundColor: "#E3E8EB" }}>
                                        <Text style={{ textAlign: 'center' }}>{travel.name}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 7 }}>
                                            <Button colorScheme='blue' style={{ width: 100 }} onPress={() => visualizedTravel(travel.id)}>Visualiser</Button>
                                            <Button style={{ width: 100, backgroundColor: "#00AB55" }} onPress={() => askForValidate(travel.name, travel.id)}>Activer</Button>
                                        </View>
                                    </View>
                                )
                            })}

                    </View>
                }
                {isLoadingT ? <Text>Chargement...</Text> : isErrorT ? <Text style={{ color: 'red' }}>{errorT.message}</Text> :
                    finTravel.length !== 0 &&
                    <View style={{ backgroundColor: "white" }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: "10%", borderBottomColor: "black", borderBottomWidth: 1, marginHorizontal: 10, paddingBottom: 20 }}>{finTravel.length === 1 ? "Voyage" : "Voyages"} terminé{finTravel.length === 1 ? null : "s"}</Text>
                        {
                            finTravel.map((travel, id) => {
                                return (
                                    <View key={id} style={{ borderColor: "black", borderWidth: 1, height: 75, marginHorizontal: 10, marginTop: 10, borderRadius: 5, backgroundColor: "#E3E8EB" }}>
                                        <Text style={{ textAlign: 'center' }}>{travel.name}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 7 }}>
                                            <Button colorScheme='blue' style={{ width: 100 }} onPress={() => visualizedFinishTravel(travel.id)}>Consulter</Button>
                                            <Button style={{ width: 100, backgroundColor: "#00AB55" }} onPress={() => askForReactivate(travel.name, travel.id)}>Réactiver</Button>
                                        </View>
                                    </View>
                                )
                            })}

                    </View>


                }
            </ScrollView>
        </NativeBaseProvider >
    )
}

const styles = StyleSheet.create({
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});

export default Travels;