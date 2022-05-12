import { NativeBaseProvider, ScrollView, Select, CheckIcon, ArrowForwardIcon } from 'native-base';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { useEffect, useState } from 'react';

const SpendingHistory = ({ route, navigation }) => {

    const { history } = route.params;

    return (
        <NativeBaseProvider >
            <ScrollView contentContainerStyle={{ paddingTop: 5, flex: 1, justifyContent: history.length === 0 ? 'center' : null, alignItems: history.length === 0 ? 'center' : null }}>
                {history.length !== 0 ?
                    history.map((hist, i) => (
                        <View style={styles.box} key={i}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "bold" }}>De : {hist.author}</Text>
                                <Text style={{ fontWeight: "bold", color: hist.montant > 0 ? "green" : (hist.montant == 0 ? "black" : "red") }}>{" "}{hist.montant > 0 && "+"}{hist.montant}</Text>
                            </View>
                            <Text style={{ marginTop: 7 }}>Pour : {hist.dest}</Text>
                            <Text style={{ marginTop: 7 }}>Catégorie : {hist.category}</Text>
                        </View>
                    )) :
                    <View style={{ fontWeight: 100 }}><Text >Aucune dépense n'a été enregistré pour ce voyage</Text></View>



                }
            </ScrollView>
        </NativeBaseProvider >

    )
}

const styles = StyleSheet.create({
    box: {
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
        justifyContent: "space-between"
    }
});

export default SpendingHistory;