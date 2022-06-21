import React, { useState, useEffect } from 'react';
import { DefaultTheme, RadioButton } from 'react-native-paper';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Pressable, Image } from 'react-native';
import * as Location from 'expo-location';
import { NativeBaseProvider, Select, CheckIcon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../requests/Auth'
import TravelRequests from "../requests/TravelRequests";
import PositionRequests from '../requests/PositionRequests';
import MemberRequests from '../requests/MemberRequests';

import { useQuery, useQueryClient, useMutation } from 'react-query';

import iconBackTravel from "../assets/navigation_icons/icon_backVoyage.png";
import iconSettings from "../assets/navigation_icons/settings.png";

import iconParc from "../assets/map_icons/parc.png";
import iconMusee from "../assets/map_icons/musee.png";
import iconCinema from "../assets/map_icons/cinema.png";
import iconStade from "../assets/map_icons/stade.png";
import iconMagasin from "../assets/map_icons/magasin.png";
import iconMonument from "../assets/map_icons/monument.png";
import iconRestaurant from "../assets/map_icons/restaurant.png";
import iconSpectacle from "../assets/map_icons/spectacle.png";
import iconPort from "../assets/map_icons/port.png";
import iconBase from "../assets/map_icons/autre.png";
import iconStep from "../assets/map_icons/step.png";

const Maps = ({ navigation, route }) => {

    const { user } = useAuth();

    const queryClient = useQueryClient();

    const { isReadOnly, idTravel } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerRight: (() =>
                <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={() => navigation.navigate('Travels')}><Image source={iconBackTravel} style={{ width: 30, height: 30, marginRight: 5, alignContent: "center", tintColor: "white" }} /></Pressable>
                    <Pressable onPress={() => navigation.navigate('Settings', { idTravel: idTravel })}><Image source={iconSettings} style={{ width: 30, height: 30, marginRight: 5, alignContent: "center", tintColor: "white" }}></Image></Pressable>
                </View>
            )
        });
    }, [])

    const selectIcon = (point) => {
        if (point.category == "Parc") {
            return iconParc;
        }
        else if (point.category == "Musée") {
            return iconMusee;
        }
        else if (point.category == "Cinéma") {
            return iconCinema;
        }
        else if (point.category == "Stade") {
            return iconStade;
        }
        else if (point.category == "Magasin") {
            return iconMagasin;
        }
        else if (point.category == "Monument historique") {
            return iconMonument;
        }
        else if (point.category == "Restaurant") {
            return iconRestaurant;
        }
        else if (point.category == "Spectacle") {
            return iconSpectacle;
        }
        else if (point.category == "Port") {
            return iconPort;
        }
        else if (point.category == "Autre") {
            return iconBase;
        }
        else {
            return iconBase;
        }
    }

    // Etapes
    const { isLoading: isLoadingS, isError: isErrorS, error: errorS, data: steps } = useQuery(
        ['getSteps', idTravel], () => TravelRequests.getStepsOfTravel(idTravel)
    );

    // Points
    const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: points } = useQuery(
        ['getPoints', idTravel], () => TravelRequests.getPointsOfTravel(idTravel)
    );

    // Trajets
    const { isLoading: isLoadingR, isError: isErrorR, error: errorR, data: routes } = useQuery(
        ["getRoutes", idTravel], () => TravelRequests.getRoutesOfTravel(idTravel)
    );

    // Membres
    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ['getMembers', idTravel], () => MemberRequests.getMembers()
    );

    // Position 
    const addPosition = useMutation(PositionRequests.setPosition, {
        onSuccess: newPos => {
            queryClient.setQueryData(
                ['setPosition'],
                position => [...position, newPos]
            )
        }
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPointVisible, setModalPointVisible] = useState(false);
    const [modalStepVisible, setModalStepVisible] = useState(false);

    const [selected, setSelected] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);
    const [checked, setChecked] = useState("0");

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);


            let id = null;
            let saveLocation = null;
            if (members !== undefined) {
                if (members.length !== 0 || members !== null) {
                    members.map((member, idx) => {
                        if (member.TravelId == idTravel && member.userLogin == user.username) {
                            id = member.id
                            saveLocation = member.saveLocation;
                        }
                    })
                }
            }

            if (saveLocation) {
                const newPos = { date: Date.now(), TravelId: idTravel, longitude: location.coords.longitude, latitude: location.coords.latitude, MemberId: id }
                addPosition.mutate(newPos)
            }
        })();

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                let id = null;
                let saveLocation = null;
                if (members !== undefined) {
                    if (members.length !== 0 || members !== null) {
                        members.map((member, idx) => {
                            if (member.TravelId == idTravel && member.userLogin == user.username) {
                                id = member.id
                                saveLocation = member.saveLocation;
                            }
                        })
                    }
                }
                if (saveLocation) {
                    const newPos = { date: Date.now(), TravelId: idTravel, longitude: location.coords.longitude, latitude: location.coords.latitude, MemberId: id }
                    addPosition.mutate(newPos)
                }
            })();
        }, 60000);
        return () => clearInterval(interval);
    }, [members, isEnabled]);

    const showModal = () => {
        setModalVisible(true)
    }

    return (
        <>
            {location &&
                <NativeBaseProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <MapView style={styles.map} scrollEnabled={true} provider={PROVIDER_GOOGLE} showsUserLocation={true} initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, longitudeDelta: 2, latitudeDelta: 2 }}>
                            {(checked === "0" || checked === "1") && (isLoadingS ? <Text>Chargement...</Text> : isErrorS ? <Text style={{ color: 'red' }}>{errorS.message}</Text> :
                                <>
                                    {steps.map((step, index) => (
                                        <Marker key={index} coordinate={{ latitude: step.latitude, longitude: step.longitude }}
                                            icon={iconStep}
                                            onPress={() => {
                                                navigation.navigate('StepDetails', {
                                                    step: step,
                                                    isReadOnly: isReadOnly,
                                                    idTravel: idTravel,
                                                    photo: null
                                                })
                                            }
                                            } />
                                    )
                                    )}

                                    {steps.length >= 2 && <>
                                        {steps.map((step, index) => (
                                            <>
                                                {index > 0 && (
                                                    <Polyline
                                                        key={index}
                                                        geodesic={true}
                                                        tappable={true}
                                                        strokeWidth={3}
                                                        strokeColor='#00AB55'
                                                        coordinates={[
                                                            { latitude: steps[index - 1].latitude, longitude: steps[index - 1].longitude },
                                                            { latitude: step.latitude, longitude: step.longitude }
                                                        ]}
                                                        onPress={() => navigation.navigate('Itinéraire', { isReadOnly: isReadOnly, itinairary: routes[index - 1], step: step, stepBefore: steps[index - 1], idTravel: idTravel })}
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </>}
                                </>)
                            }
                            {(checked === "0" || checked === "2") && (isLoadingP ? <Text>Chargement...</Text> : isErrorP ? <Text style={{ color: 'red' }}>{errorP.message}</Text> :
                                points.map((point, index) => (
                                    <Marker key={index} pinColor='blue' coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                                        icon={selectIcon(point)}
                                        onPress={() => {
                                            navigation.navigate('PointDetails', {
                                                point: point,
                                                isReadOnly: isReadOnly,
                                                idTravel: idTravel,
                                                photo: null
                                            })
                                        }}>
                                    </Marker>)
                                ))
                            }
                        </MapView>
                        <View style={styles.window}>
                            <Select variant="unstyled" selectedValue={checked} maxWidth="130" maxHeight="50" accessibilityLabel="Choisir un moyen de transport" placeholder="Choisir un moyen de transport" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setChecked(itemValue) }}>
                                <Select.Item label="Vue d'ensemble" value="0" />
                                <Select.Item label="Etapes" value="1" />
                                <Select.Item label="Points d'intérêts" value="2" />
                            </Select>
                        </View>
                    </SafeAreaView>
                </NativeBaseProvider>

            }
        </>
    )
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        paddingTop: -5,
        borderRadius: 5,
        backgroundColor: "white",
        height: 50,
        width: 130,
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default Maps;