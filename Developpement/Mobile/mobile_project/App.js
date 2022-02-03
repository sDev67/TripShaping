import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

export default function App() {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAJVvWk_VD4fFSTgIbKZn4mKbudKeQXEII';

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  return (
    <SafeAreaProvider style={styles.container}>
      {location &&
        <MapView style={StyleSheet.absoluteFillObject} provider={PROVIDER_GOOGLE} showsUserLocation={true} initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, longitudeDelta: 0.125, latitudeDelta: 0.125 }}>
          <Marker title="Cathédrale de Strasbourg" coordinate={{ latitude: 48.5818717456352, longitude: 7.75104124324297 }}>
          </Marker>
          <Marker title="Musée du Pays de Hanau" coordinate={{ latitude: 48.824838302922835, longitude: 7.482993317810144 }}>
          </Marker>
          <Marker title="Hotel 🛌🏻" description="C'est le meilleur hotel de Paris" coordinate={{ latitude: 48.86809588857603, longitude: 2.328886469618505 }} pinColor="blue">
          </Marker>
          <MapViewDirections
            origin={{ latitude: 48.5818717456352, longitude: 7.75104124324297 }}
            destination={{ latitude: 48.824838302922835, longitude: 7.482993317810144 }}
            strokeWidth={3}
            strokeColor='red'
            apikey={GOOGLE_MAPS_APIKEY} />
        </MapView>
      }
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});