import React, { useState, useEffect } from 'react';
import { DefaultTheme, RadioButton } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import * as Location from 'expo-location';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import ItinaryModal from '../components/modals/ItinaryModal';
import PointModal from '../components/modals/pointModal';
import StepModal from '../components/modals/StepModal';

import { GOOGLE_MAPS_APIKEY } from "../utils";

const Maps = ({ messages, setMessages, setStartCamera, points, isLoadingP, isErrorP, errorP, steps, isLoadingS, isErrorS, errorS }) => {

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
                        <ItinaryModal modalVisible={modalVisible} setModalVisible={setModalVisible} distance={distance} duration={duration} />
                        <PointModal modalVisible={modalPointVisible} setModalVisible={setModalPointVisible} point={selected} messages={messages} setMessages={setMessages} setStartCamera={setStartCamera} />
                        <StepModal modalVisible={modalStepVisible} setModalVisible={setModalStepVisible} point={selected} setStartCamera={setStartCamera} messages={messages} setMessages={setMessages} />
                        <MapView style={styles.map} scrollEnabled={true} provider={PROVIDER_GOOGLE} showsUserLocation={true} initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, longitudeDelta: 0.125, latitudeDelta: 0.125 }}>
                            {(checked === "0" || checked === "1") && isLoadingS ? <Text>Chargement...</Text> : isErrorS ? <Text style={{ color: 'red' }}>{errorS.message}</Text> :
                                <>
                                    {steps.map((step, index) => (
                                        <Marker key={index} coordinate={{ latitude: step.latitude, longitude: step.longitude }} onPress={() => { setModalStepVisible(true); setSelected(step) }}>
                                        </Marker>)
                                    )}
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
                                </>
                            }
                            {(checked === "0" || checked === "2") && isLoadingP ? <Text>Chargement...</Text> : isErrorP ? <Text style={{ color: 'red' }}>{errorP.message}</Text> :
                                points.map((point, index) => (
                                    <Marker key={index} pinColor='blue' coordinate={{ latitude: point.latitude, longitude: point.longitude }} onPress={() => { setModalPointVisible(true); setSelected(point) }}>
                                    </Marker>)
                                )
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