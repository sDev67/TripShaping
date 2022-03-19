import { NativeBaseProvider, ScrollView } from 'native-base';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const ItinaryDetails = ({ navigation }) => {
    return (
        <NativeBaseProvider >
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.font}>Catégorie</Text>
                    <Text style={styles.font}>Durée</Text>
                    <Text style={styles.font}>Distance</Text>
                    <Text style={styles.font}>Description</Text>
                    <Text style={styles.font}>Documents</Text>
                </ScrollView>
            </View>
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
    }
});

export default ItinaryDetails;