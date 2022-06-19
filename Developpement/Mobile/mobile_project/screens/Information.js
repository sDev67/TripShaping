import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';
import HTMLView from 'react-native-htmlview';

const Information = ({ route, navigation }) => {

    const { isReadOnly, idTravel } = route.params;

    const { isLoading: isLoading, isError: isError, error: error, data: travelDatas } = useQuery(
        ['getInfos', idTravel], () => TravelRequests.getTravelByid(idTravel)
    );

    return (
        <View style={{ margin: 10, borderColor: 'black', borderWidth: 1, backgroundColor: "white", height: "97%" }}>
            {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                <View style={{ marginLeft: 10, marginTop: 25 }}>
                    <HTMLView
                        value={travelDatas.infosHTML}
                        stylesheet={styles}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    p: {
        marginTop: -25
    },
});

export default Information;