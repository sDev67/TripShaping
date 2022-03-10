import React, { useState, useEffect } from 'react';
import { DefaultTheme, RadioButton } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import ItinaryModal from '../components/modals/ItinaryModal';
import PointModal from '../components/modals/pointModal';
import StepModal from '../components/modals/StepModal';

const Maps = ({ messages, setMessages, setStartCamera }) => {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAJVvWk_VD4fFSTgIbKZn4mKbudKeQXEII';

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPointVisible, setModalPointVisible] = useState(false);
    const [modalStepVisible, setModalStepVisible] = useState(false);

    const [points, setPoints] = useState([{ name: "Musée Lalique", cat: "Musée", description: "Le musée Lalique est un musée français situé à Wingen-sur-Moder, en Alsace, et consacré au maître verrier et bijoutier René Lalique et à ses successeurs.", long: 7.362720456020634, lat: 48.92638188763786 }, { name: "Cathédrale de Strasbourg", cat: "Monument historique", description: "Le musée Lalique est un musée français situé à Wingen-sur-Moder, en Alsace, et consacré au maître verrier et bijoutier René Lalique et à ses successeurs.La cathédrale Notre-Dame de Strasbourg est une cathédrale gothique située à Strasbourg, dans la circonscription administrative du Bas-Rhin, sur le territoire de la collectivité européenne d’Alsace.", long: 7.751035121539488, lat: 48.581878956275794 }])
    const [steps, setSteps] = useState([{ name: "Hôtel de la forêt", cat: "Hôtel", description: "Cadre Idyllique", long: 7.415160892563047, lat: 48.87825669202483, day: 2 }, { name: "Chez GrandPa", cat: "Chambres d'Hôtes", description: "Cadre charmant", long: 7.730613259942172, lat: 48.56599996601616, day: 3 }])

    const [selected, setSelected] = useState(points[0]);
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
                            {(checked === "0" || checked === "1") &&
                                <>
                                    {steps.map((step, index) => (
                                        <Marker key={index} coordinate={{ latitude: step.lat, longitude: step.long }} onPress={() => { setModalStepVisible(true); setSelected(step) }}>
                                        </Marker>)
                                    )}
                                    <MapViewDirections
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
                                    />
                                </>
                            }
                            {(checked === "0" || checked === "2") &&
                                points.map((point, index) => (
                                    <Marker key={index} pinColor='blue' coordinate={{ latitude: point.lat, longitude: point.long }} onPress={() => { setModalPointVisible(true); setSelected(point) }}>
                                    </Marker>)
                                )
                            }
                        </MapView>
                        <View style={styles.window}>
                            <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
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