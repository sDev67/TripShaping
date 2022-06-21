import { View, Text, Switch, Pressable, Touch, Clipboard, TouchableOpacity, StyleSheet } from "react-native"
import { NativeBaseProvider, Tooltip } from "native-base"
import { useEffect, useState } from "react"
import * as Location from 'expo-location';

import { useAuth } from '../requests/Auth'
import MemberRequests from "../requests/MemberRequests";
import TravelRequests from "../requests/TravelRequests";

import { useQuery, useQueryClient, useMutation } from 'react-query';


const Settings = ({ navigation, route }) => {

    const [isEnabled, setIsEnabled] = useState(false);

    // On récupère le voyage en cours 
    const { idTravel } = route.params;

    //On récupère l'utilisateur connecté
    const { user } = useAuth();

    // On récupère les membres
    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ['getMembers', idTravel], () => MemberRequests.getMembers()
    );
    let id = null;

    useEffect(() => {
        if (members.length !== 0 || members !== null) {
            members.map((member) => {
                if (member.TravelId == idTravel && member.userLogin == user.username) {
                    id = member.id
                    setIsEnabled(member.saveLocation)
                }
            })
        };
    }, [])



    // Enable save position
    const toggleSwitch = () => {
        if (members !== undefined) {
            if (members.length !== 0 || members !== null) {
                members.map((member) => {
                    if (member.TravelId == idTravel && member.userLogin == user.username) {
                        id = member.id
                        setIsEnabled(!isEnabled)
                    }
                })
            }
        };

        const newMember = { MemberId: id, saveLocation: !isEnabled }
        updateMember.mutate(newMember);

    }

    // Requête 
    const queryClient = useQueryClient();
    const updateMember = useMutation(MemberRequests.setSavePosition, {
        onSuccess: newMember => {
            queryClient.setQueryData(["setSavePosition", id], newMember);
            queryClient.invalidateQueries(['getMembers', idTravel]);
        },
    });


    // Signout
    const { signout } = useAuth();

    const disconnect = () => {
        signout();
        navigation.navigate('Signin');
    }

    const { isLoading: isLoadingT, isError: isErrorT, error: errorT, data: travel } = useQuery(
        ['getTravel', idTravel], () => TravelRequests.getTravelByid(idTravel)
    );

    const copyToClipboard = () => {
        if (travel != null) {
            Clipboard.setString('https://tripshapingapi.herokuapp.com/' + travel.albumURL + '/map')
        }

    }

    return (
        <NativeBaseProvider>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ paddingTop: 20, paddingLeft: 10 }}>Autoriser le suivi de la localisation : </Text>
                <Switch
                    style={{ paddingTop: 35, paddingLeft: 10 }}
                    trackColor={{ false: "#fefefe", true: "#00AB55" }}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            <Pressable style={{ paddingLeft: 10, paddingVertical: 20 }} onPress={() => disconnect()}><Text style={{ color: "red" }}>Se déconnecter</Text></Pressable>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <Text style={{ paddingVertical: 20, paddingLeft: 10, }}>Cliquer ici pour copier <Text style={{ color: "blue", textDecorationStyle: "solid", textDecorationLine: "underline" }} onPress={copyToClipboard()}>le lien de l'album du voyage</Text></Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        </NativeBaseProvider>
    )
}

export default Settings