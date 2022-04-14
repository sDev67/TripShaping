import { NativeBaseProvider, ScrollView, Select, CheckIcon, ArrowForwardIcon } from 'native-base';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../utils";
import { useEffect, useState } from 'react';

const SpendingHistory = ({ route, navigation }) => {

    const { step, stepBefore, itinairary } = route.params;

    return (
        <NativeBaseProvider >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                </ScrollView>
            </SafeAreaView>
        </NativeBaseProvider >

    )
}

const styles = StyleSheet.create({

});

export default SpendingHistory;