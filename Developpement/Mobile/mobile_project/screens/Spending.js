import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, NativeBaseProvider, Select, CheckIcon } from 'native-base';

import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';

const Spending = () => {
    const idTravel = 1;

    // Membres 
    const { isLoading: isLoading, isError: isError, error: error, data: members } = useQuery(["getMembers", idTravel], () => TravelRequests.getMembersOfTravel(idTravel));

    const [balances, setBalances] = useState([{ id: 0, balance: 50 }, { id: 1, balance: -20 }, { id: 2, balance: 30 }, { id: 3, balance: -10 }]);

    // Donateur 
    const [donateur, setDonateur] = useState(null)

    // Destinataires
    const [destinataires, setDestinataires] = useState(null)

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                    <>
                        {members.map((member, i) => {
                            let balance;
                            balances.map((b, idx) => {
                                if (b.id == i) {
                                    balance = b.balance;
                                }
                            })

                            return (
                                <View style={styles.box} key={i}>
                                    <Text>{member.firstname} {member.lastname}</Text><Text style={{ color: balance > 0 ? "green" : "red" }}>{" "}{balance > 0 && "+"}{balance}</Text>
                                </View>
                            )
                        })}
                    </>}
            </ScrollView>
            <View style={{ marginBottom: 10, position: "absolute", bottom: 0, alignSelf: "center" }}>
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :

                    <>
                        <View style={{ marginBottom: 10 }} >
                            <Select selectedValue={donateur} width={Dimensions.get('window').width - 20} accessibilityLabel="Choisir un donateur" placeholder="Choisir un donateur" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setDonateur(itemValue) }}>
                                {members.map((member, i) => {
                                    return (<Select.Item key={i} label={member.firstname + " " + member.lastname} value={member.id} />)
                                })}
                            </Select>
                            <Select selectedValue={destinataires} width={Dimensions.get('window').width - 20} accessibilityLabel="Choisir un destinataire" placeholder="Choisir un destinataire" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setDestinataires(itemValue) }}>
                                {members.map((member, i) => {

                                    return (<Select.Item key={i} label={member.firstname + " " + member.lastname} value={member.id} />)

                                })}
                            </Select>
                        </View>
                    </>




                }
                <Button style={{ backgroundColor: "#9AD1F5", alignSelf: "flex-end", marginRight: 10 }} >Ajouter</Button>
            </View>
        </NativeBaseProvider>
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
        flexDirection: "row",
        justifyContent: "space-between"
    }


});

export default Spending;