import { NativeBaseProvider, ScrollView, Select, CheckIcon, ArrowForwardIcon } from 'native-base';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useQuery, useQueries } from 'react-query';
import TravelRequests from '../requests/TravelRequests';
import MemberRequests from '../requests/MemberRequests';

const SpendingHistory = ({ route, navigation }) => {

    const { idTravel } = route.params;
    const [authors, setAuthors] = useState(null);

    // Hisorique 
    const { isLoading: isLoading, isError: isError, error: error, data: historique } = useQuery(["getExpensesOfTravel", idTravel], () => TravelRequests.getExpensesOfTravel(idTravel));

    return (
        <NativeBaseProvider >
            <ScrollView contentContainerStyle={{ paddingTop: 5, justifyContent: historique?.length === 0 ? 'center' : null, alignItems: historique?.length === 0 ? 'center' : null }}>
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                    historique.length != 0 ?
                        historique.map((hist, i) => {
                            const destId = hist.to.split(',')
                            return (<HistoryBox hist={hist} destId={destId} key={i} />)
                        }) :
                        <View style={{ fontWeight: 100 }}><Text >Aucune dépense n'a été enregistré pour ce voyage</Text></View>
                }
            </ScrollView>
        </NativeBaseProvider >
    )
}

const HistoryBox = ({ hist, destId }) => {

    // Author
    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: author } = useQuery(["getMember", hist.MemberId], () => MemberRequests.getMemberById(hist.MemberId))

    return (
        <View style={styles.box}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {isLoadingM ? <Text>Chargement...</Text> : isErrorM ? <Text style={{ color: 'red' }}>{errorM.message}</Text> : <Text style={{ fontWeight: "bold" }}>De : {author.name}</Text>}
                <Text style={{ fontWeight: "bold", color: hist.cost > 0 ? "green" : (hist.cost == 0 ? "black" : "red") }}>{" "}{hist.cost > 0 && "+"}{hist.cost}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginTop: 7 }}>Pour : </Text>
                {destId.map((id, idx) =>
                (
                    <View key={idx} style={{ flexDirection: "row", marginTop: 7 }}>
                        <Destinataire id={id} />
                        {idx != destId.length - 1 && <Text>, </Text>}
                    </View>
                ))}
            </View>
            <Text style={{ marginTop: 7 }}>Catégorie : {hist.category}</Text>
        </View>
    )
}

const Destinataire = ({ id }) => {
    // Destinataire 
    const { isLoading: isLoadingD, isError: isErrorD, error: errorD, data: desti } = useQuery(["getMember", id], () => MemberRequests.getMemberById(id))

    return (
        <View>
            {isLoadingD ? <Text>Chargement...</Text> : isErrorD ? <Text style={{ color: 'red' }}>{errorD.message}</Text> :
                <Text>{desti.name}</Text>
            }
        </View>
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