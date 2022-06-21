import { NativeBaseProvider, Select, CheckIcon, ArrowForwardIcon, Image } from 'native-base';
import { Dimensions, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { useEffect, useState, useCallback } from 'react';

import file from '../assets/navigation_icons/icon_file.png';

import TravelRequests from '../requests/TravelRequests';
import { useQuery, useQueryClient } from 'react-query';

const ItinaryDetails = ({ route, navigation }) => {

    const { step, stepBefore, itinairary, idTravel } = route.params;

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [deplacement, setDeplacement] = useState(itinairary.travelType);
    const [errorDir, setError] = useState(false);

    let heureDec = 0;
    let heure = 0;
    let dec = 0;
    let min = 0;

    if (duration) {
        heureDec = duration / 60;
        heure = Math.floor(heureDec);
        dec = heureDec - heure;
        min = Math.round(dec * 60);
    }

    // Documents 
    const { isLoading, isError, error, data } = useQuery(["getDocuments", idTravel], () => TravelRequests.getDocumentsByTravelId(idTravel));
    let count = 0;

    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.container}>
                <MapView style={styles.map} scrollEnabled={true} provider={PROVIDER_GOOGLE} showsUserLocation={true} initialRegion={{ latitude: (step.latitude + stepBefore.latitude) / 2, longitude: (step.longitude + stepBefore.longitude) / 2, longitudeDelta: (Math.sqrt(Math.pow(stepBefore.longitude - step.longitude, 2) + Math.pow(step.longitude - step.latitude, 2))) / 8, latitudeDelta: (Math.sqrt(Math.pow(stepBefore.longitude - step.longitude, 2) + Math.pow(step.longitude - step.latitude, 2))) / 8 }}>
                    <Marker coordinate={{ latitude: step.latitude, longitude: step.longitude }} />
                    <Marker coordinate={{ latitude: stepBefore.latitude, longitude: stepBefore.longitude }} />
                    <MapViewDirections
                        origin={{ latitude: stepBefore.latitude, longitude: stepBefore.longitude }}
                        destination={{ latitude: step.latitude, longitude: step.longitude }}
                        strokeWidth={3}
                        strokeColor='#00AB55'
                        mode={deplacement}
                        apikey={GOOGLE_MAPS_APIKEY}
                        onReady={result => {
                            setError(false);
                            setDistance(result.distance);
                            setDuration(result.duration);
                        }}
                        onError={() => {
                            setError(true);
                        }}
                    />
                    {
                        errorDir &&
                        <Polyline
                            geodesic={true}
                            strokeWidth={3}
                            strokeColor='#00AB55'
                            coordinates={[
                                { latitude: stepBefore.latitude, longitude: stepBefore.longitude },
                                { latitude: step.latitude, longitude: step.longitude }
                            ]}
                        />
                    }
                </MapView>
                <ScrollView>
                    <Text style={styles.font}>Départ/Arrivée</Text>
                    <View style={{ flexDirection: "row", marginLeft: 10 }}><Text>{stepBefore.title + " "}</Text><ArrowForwardIcon style={{ marginTop: 5 }} size="3" /><Text>{" " + step.title}</Text></View>
                    <Text style={styles.font}>Catégorie</Text>
                    <View style={{ marginLeft: 10 }}>
                        <Select selectedValue={deplacement} maxWidth="200" accessibilityLabel="Choisir un moyen de transport" placeholder="Choisir un moyen de transport" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setDeplacement(itemValue) }}>
                            <Select.Item label="En voiture" value="DRIVING" />
                            <Select.Item label="En vélo" value="BICYCLING" />
                            <Select.Item label="A pied" value="WALKING" />
                            <Select.Item label="En transport en commun" value="TRANSIT" />
                        </Select>
                    </View>
                    {
                        errorDir &&
                        <Text style={{ marginLeft: 10, marginTop: 10, color: "red" }}>Aucun itinéraire trouvé</Text>
                    }
                    {
                        !errorDir &&
                        <View>
                            <Text style={styles.font}>Durée</Text>
                            <Text style={{ marginLeft: 10 }}>{duration < 60 ? (Math.round(duration) + " min") : (heure + " h " + min + " min")}</Text>
                            <Text style={styles.font}>Distance</Text>
                            <Text style={{ marginLeft: 10 }}>{Math.round(distance * 100) / 100} km</Text>
                        </View>
                    }
                    <Text style={styles.font}>Documents</Text>
                    <ScrollView style={{ height: "30%" }}>
                        {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                            data.map((doc, idx) => {
                                if (doc.RouteId === itinairary.id) {
                                    count++;
                                    return (
                                        <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image alt="icon_file" source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                                }
                                else {
                                    return null;
                                }

                            })}
                        {count === 0 && <Text style={{ marginLeft: 10 }}>Aucun document</Text>}
                    </ScrollView>
                </ScrollView>
            </SafeAreaView>
        </NativeBaseProvider >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "white"
    },
    font: {
        fontSize: 15,
        fontWeight: "bold",
        margin: 10
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: "50%",
    }
});

export default ItinaryDetails;