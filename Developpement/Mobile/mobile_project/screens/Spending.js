import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { Button, NativeBaseProvider, Select, CheckIcon, Checkbox, useToast, Center, Box } from 'native-base';

import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';

import iconHistory from "../assets/navigation_icons/icon_history.png"

const Spending = ({ navigation }) => {
    const idTravel = 1;

    // Membres 
    const { isLoading: isLoading, isError: isError, error: error, data: members } = useQuery(["getMembers", idTravel], () => TravelRequests.getMembersOfTravel(idTravel));

    const [balances, setBalances] = useState([{ id: 1, balance: 0 }, { id: 2, balance: 0 }, { id: 50, balance: 0 }, { id: 51, balance: 0 }]);
    const [categories, setCategories] = useState(["Commerce", "Logement", "Loisir", "Restaurant"])

    // Donateur 
    const [donateur, setDonateur] = useState(null)

    // Destinataires
    const [destinataires, setDestinataires] = useState(null)

    // Montant
    const [montant, setMontant] = useState(null)

    // Catégorie
    const [category, setCategory] = useState(null)

    // Test
    const [selectedItems, setSelectedItems] = useState([])
    const [listVisible, setListVisible] = useState(false)

    // Historique
    let [history, setHistory] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: (() =>
                <Pressable onPress={() => navigation.navigate('SpendingHistory', { history: history })}><Image source={iconHistory} style={{ width: 30, height: 30, marginRight: 5, alignContent: "center" }} /></Pressable>
            )
        });
    }, [])

    useEffect(() => {

        let desti = [];
        selectedItems.map((item, i) => {
            members.map((member, idx) => {
                if (item == member.id) {
                    desti.push(member.firstname + " " + member.lastname)
                }
            })
        })

        setDestinataires(desti.join(', '))
    }, [selectedItems])

    const spend = () => {

        if (donateur !== "" && destinataires !== null && selectedItems.length !== 0 && montant !== null && category !== "") {
            let author = "";
            let dest = "";
            members.map((member, idx) => {
                if (donateur == member.id) {
                    author = member.firstname + " " + member.lastname
                }
            })

            const newHistory = { author: author, category: category, dest: destinataires, montant: montant };
            history.push(newHistory);

            const nbDest = selectedItems.length;
            const part = Math.round(montant / nbDest, 2);

            const tab = [];
            balances.map((balance, idx) => {
                if (donateur == balance.id) {
                    var nb = parseInt(balance.balance);
                    var m = parseInt(montant);
                    tab.push({ id: balance.id, balance: nb + m })
                }
                selectedItems.map((item, i) => {
                    if (item == balance.id) {
                        tab.push({ id: balance.id, balance: balance.balance -= part })
                    }
                })
            })

            tab.map((t, i) => {
                setBalances(old => old.map((elem) => elem.id != t.id ? elem :
                    {
                        ...elem,
                        balance: t.balance
                    }));
            })

            setDonateur("")
            setDestinataires(null)
            setSelectedItems([])
            setMontant(null)
            setCategory("")
        } else {

        }

    }

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                    <>
                        {members.map((member, i) => {
                            let balance;
                            balances.map((b, idx) => {
                                if (b.id == member.id) {
                                    balance = b.balance;
                                }
                            })

                            return (
                                <View style={styles.box} key={i}>
                                    <Text>{member.firstname} {member.lastname}</Text><Text style={{ color: balance > 0 ? "green" : (balance == 0 ? "black" : "red") }}>{" "}{balance > 0 && "+"}{balance}</Text>
                                </View>
                            )
                        })}
                    </>}
            </ScrollView>
            <View width={Dimensions.get('window').width} style={{ paddingBottom: 10, justifyContent: "flex-end", backgroundColor: "white" }}>
                {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :

                    <>
                        <View style={{ marginBottom: 10, alignSelf: "center" }} >
                            <Select selectedValue={donateur} width={Dimensions.get('window').width - 20} accessibilityLabel="Choisir un donateur" placeholder="Choisir un donateur" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setDonateur(itemValue) }}>
                                {members.map((member, i) => {
                                    return (<Select.Item key={i} label={member.firstname + " " + member.lastname} value={member.id} />)
                                })}
                            </Select>
                        </View>
                        <TouchableOpacity onPress={() => setListVisible(!listVisible)}>
                            <View style={{ marginBottom: 10, flexDirection: "row", paddingHorizontal: 10 }} >
                                <TextInput style={styles.inputFocused} placeholder="Choisir un destinataire" value={destinataires} editable={false} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                            {listVisible && (
                                <ScrollView style={{ height: "25%" }}>
                                    <Checkbox.Group onChange={setSelectedItems} value={selectedItems} accessibilityLabel="Choisir les destinataires">
                                        {members.map((member, i) => {
                                            return (<Checkbox colorScheme="rgb(154,209,245)" key={i} value={member.id} my={2} ml={2}>
                                                {member.firstname + " " + member.lastname}
                                            </Checkbox>)
                                        })}
                                    </Checkbox.Group>
                                </ScrollView>
                            )}
                        </View>
                        <View style={{ marginBottom: 10, flexDirection: "row", paddingHorizontal: 10 }} >
                            <Text style={{ flex: 1, marginTop: 13 }}>Montant : </Text>
                            <TextInput style={styles.inputFocused} keyboardType="number-pad" value={montant} onChangeText={(text) => setMontant(text)} />
                        </View>
                        <View style={{ marginBottom: 10, alignSelf: "center" }} >
                            <Select selectedValue={category} width={Dimensions.get('window').width - 20} accessibilityLabel="Choisir une catégorie" placeholder="Choisir une catégorie" _selectedItem={{ endIcon: <CheckIcon size="5" /> }} mt={1} onValueChange={itemValue => { setCategory(itemValue) }}>
                                {categories.map((category, i) => {
                                    return (<Select.Item key={i} label={category} value={category} />)
                                })}
                            </Select>
                        </View>
                    </>
                }
                <CustomButton donateur={donateur} destinataires={destinataires} selectedItems={selectedItems} montant={montant} category={category} spend={spend} />
            </View>
        </NativeBaseProvider>
    )
}


const CustomButton = ({ donateur, destinataires, selectedItems, montant, category, spend }) => {
    const toast = useToast();
    return <Center>
        <Button style={{ backgroundColor: "#9AD1F5", alignSelf: "center", marginRight: 10, width: "50%" }} onPress={() => {
            (donateur !== "" && destinataires !== null && selectedItems.length !== 0 && montant !== null && category !== "") ? spend() :
                toast.show({
                    placement: "top",
                    render: () => {
                        return <Box bg="red.500" px="2" py="1" rounded="sm" mb={20}>
                            Veuillez renseigner l'ensemble des champs !
                        </Box>;
                    }
                })
        }}>
            Ajouter
        </Button>
    </Center>;
};

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
    },
    inputFocused: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E6EFF4",
        padding: 10,
        flex: 4,
        color: "black"
    }


});

export default Spending;