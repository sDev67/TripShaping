import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAJVvWk_VD4fFSTgIbKZn4mKbudKeQXEII';

  return (
    <SafeAreaProvider style={styles.container}>
      <MapView style={styles.map}>
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
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`)
            console.log(`Duration: ${result.duration} min.`)
          }} />
      </MapView>
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