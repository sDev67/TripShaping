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

import iconBackTravel from "../assets/navigation_icons/icon_backVoyage.png"

const Maps = ({ navigation, route }) => {

    const { user } = useAuth();

    const queryClient = useQueryClient();

    useEffect(() => {
        navigation.setOptions({
            headerRight: (() =>
                <Pressable onPress={() => navigation.navigate('Travels')}><Image source={iconBackTravel} style={{ width: 30, height: 30, marginRight: 5, alignContent: "center", tintColor: "white" }} /></Pressable>
            )
        });
    }, [])

    const { isReadOnly, idTravel } = route.params;

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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            let id = null
            if (members !== undefined) {
                if (members.length !== 0 || members !== null) {
                    members.map((member, idx) => {
                        if (member.TravelId == idTravel && member.userLogin == user.username) {
                            id = member.id
                        }
                    })
                }
            }
            const newPos = { date: Date.now(), TravelId: idTravel, longitude: location.coords.longitude, latitude: location.coords.latitude, MemberId: id }
            addPosition.mutate(newPos)
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

                let id = null
                if (members !== undefined) {
                    if (members.length !== 0 || members !== null) {
                        members.map((member, idx) => {
                            if (member.TravelId == idTravel && member.userLogin == user.username) {
                                id = member.id
                            }
                        })
                    }
                }
                const newPos = { date: Date.now(), TravelId: idTravel, longitude: location.coords.longitude, latitude: location.coords.latitude, MemberId: id }
                addPosition.mutate(newPos)
            })();
        }, 300000);
        return () => clearInterval(interval);
    }, [members]);

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
                                        <Marker key={index} coordinate={{ latitude: step.latitude, longitude: step.longitude }} onPress={() => {
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
                                    <Marker key={index} pinColor='blue' coordinate={{ latitude: point.latitude, longitude: point.longitude }} onPress={() => {
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