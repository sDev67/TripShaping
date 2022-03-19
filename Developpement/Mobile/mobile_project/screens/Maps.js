import React, { useState, useEffect } from 'react';
import { DefaultTheme, RadioButton } from 'react-native-paper';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import * as Location from 'expo-location';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import TravelRequests from "../requests/TravelRequests";

import { useQuery, useQueryClient } from 'react-query';
import { GOOGLE_MAPS_APIKEY } from "../utils";

const Maps = ({ navigation }) => {

    const idTravel = 1;
    const [messages, setMessages] = useState([{ body: "Cet endroit est magnifique, j'en prends plein les yeux !", author: "Vivien Riehl", date: "20/12/2021", time: "18h55", catStep: 1, step: { name: "Cathédrale de Strasbourg", cat: "Monument historique", description: "Le musée Lalique est un musée français situé à Wingen-sur-Moder, en Alsace, et consacré au maître verrier et bijoutier René Lalique et à ses successeurs.La cathédrale Notre-Dame de Strasbourg est une cathédrale gothique située à Strasbourg, dans la circonscription administrative du Bas-Rhin, sur le territoire de la collectivité européenne d’Alsace.", long: 7.751035121539488, lat: 48.581878956275794 } }, { body: "Cet hôtel est très sympathique", author: "Marc Keller", date: "19/12/2021", time: "21h00", catStep: 2, step: { name: "Chez GrandPa", cat: "Chambres d'Hôtes", description: "Cadre charmant", long: 7.730613259942172, lat: 48.56599996601616, day: 3 } }, { body: "La plus belle cathédrale de France !", author: "Philippe Grandpre", date: "20/12/2021", time: "19h00", catStep: 0, step: null }])

    const { isLoading: isLoadingS, isError: isErrorS, error: errorS, data: steps } = useQuery(
        ['getSteps', idTravel], () => TravelRequests.getStepsOfTravel(idTravel)
    );

    const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: points } = useQuery(
        ['getPoints', idTravel], () => TravelRequests.getPointsOfTravel(idTravel)
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPointVisible, setModalPointVisible] = useState(false);
    const [modalStepVisible, setModalStepVisible] = useState(false);

    const [selected, setSelected] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [duration, setDuration] = useState(null);
    const [distance, setDistance] = useState(null);
    const [checked, setChecked] = useState("0");

    // const [date, setDate] = useState(new Date());

    // useEffect(() => {
    //     const id = setInterval(() => { setDate(new Date()) }, 300000);
    //     return () => {
    //         clearInterval(id);
    //     }
    // }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    showModal = () => {
        setModalVisible(true)
    }

    return (
        <>
            {location &&
                <NativeBaseProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <MapView style={styles.map} scrollEnabled={true} provider={PROVIDER_GOOGLE} showsUserLocation={true} initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, longitudeDelta: 0.125, latitudeDelta: 0.125 }}>
                            {(checked === "0" || checked === "1") && (isLoadingS ? <Text>Chargement...</Text> : isErrorS ? <Text style={{ color: 'red' }}>{errorS.message}</Text> :
                                <>
                                    {steps.map((step, index) => (
                                        <Marker key={index} coordinate={{ latitude: step.latitude, longitude: step.longitude }} onPress={() => {
                                            navigation.navigate('StepDetails', {
                                                step: step
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
                                                        key={index - 1}
                                                        geodesic={true}
                                                        tappable={true}
                                                        strokeWidth={3}
                                                        strokeColor='#00AB55'
                                                        coordinates={[
                                                            { latitude: steps[index - 1].latitude, longitude: steps[index - 1].longitude },
                                                            { latitude: step.latitude, longitude: step.longitude }
                                                        ]}
                                                        onPress={() => navigation.navigate('Itinéraire')}
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </>}
                                    {/* <MapViewDirections
                                        origin={{ latitude: 48.87825669202483, longitude: 7.415160892563047 }}
                                        destination={{ latitude: 48.56599996601616, longitude: 7.730613259942172 }}
                                        strokeWidth={3}
                                        strokeColor='#00AB55'
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        tappable={true}
                                        onPress={() => showModal()}
                                        onReady={result => {
                                            setDistance(result.distance);
                                            setDuration(result.duration);
                                        }}
                                    /> */}
                                </>)
                            }
                            {(checked === "0" || checked === "2") && (isLoadingP ? <Text>Chargement...</Text> : isErrorP ? <Text style={{ color: 'red' }}>{errorP.message}</Text> :
                                points.map((point, index) => (
                                    <Marker key={index} pinColor='blue' coordinate={{ latitude: point.latitude, longitude: point.longitude }} onPress={() => {
                                        navigation.navigate('PointDetails', {
                                            point: point
                                        })
                                    }}>
                                    </Marker>)
                                ))
                            }
                        </MapView>
                        <View style={styles.window}>
                            <RadioButton.Group onValueChange={(newValue) => { setChecked(newValue) }} value={checked}>
                                <RadioButton.Item
                                    label="Tout"
                                    value="0"
                                    style={{ marginVertical: -10 }}
                                    color='#3498DB'
                                />
                                <RadioButton.Item
                                    label="Etapes"
                                    value="1"
                                    style={{ marginVertical: -10 }}
                                    color='#3498DB'
                                />
                                <RadioButton.Item
                                    label="Points d'intérêts"
                                    value="2"
                                    color='#3498DB'
                                />
                            </RadioButton.Group>
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
        backgroundColor: '#fff',
        height: '22%',
        width: '40%',
        position: 'absolute',
        bottom: 5,
        left: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default Maps;