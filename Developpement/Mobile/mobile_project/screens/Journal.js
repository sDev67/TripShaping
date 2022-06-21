import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { format } from "date-fns";

import JournalBox from '../components/elements/JournalBox';

import { useAuth } from '../requests/Auth'
import JournalRequests from '../requests/JournalRequests';
import MemberRequests from '../requests/MemberRequests';
import { useQuery, useQueryClient, useMutation } from 'react-query';

const Journal = ({ idTravel, isReadOnly }) => {

    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [idMember, setIdMember] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const { isLoading: isLoading, isError: isError, error: error, data: messages } = useQuery(
        ['getMessages', idTravel], () => JournalRequests.getJournalByTravel(idTravel)
    );

    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ['getMembers', idTravel], () => MemberRequests.getMembers()
    );

    // Envoi du message en BDD
    const addMessage = useMutation(JournalRequests.sendMessage, {
        onSuccess: newMes => {
            queryClient.setQueryData(
                ['getMessages', idTravel],
                message => [...message, newMes]
            )
            queryClient.invalidateQueries(['getMessages', idTravel])
        }
    });

    const post = () => {
        var date = Date.now();
        var formattedDate = format(date, "dd/MM/yyyy HH:mm");
        let id = null

        if (members.length !== 0 || members !== null) {
            members.map((member, idx) => {
                if (member.TravelId == idTravel && member.userLogin == user.username) {
                    id = member.id
                }
            })
        }

        const newMes = { date: formattedDate, text: newMessage, TravelId: idTravel, MemberId: id }
        addMessage.mutate(newMes)
        setNewMessage("")
    };


    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                            messages.map((message, idx) => (
                                <JournalBox key={idx} message={message} />
                            ))
                        }
                    </ScrollView>
                    {!isReadOnly &&
                        <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
                            <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                            <Button style={{ backgroundColor: "#00AB55", width: 100, justifyContent: "center", alignSelf: "flex-end", marginRight: 10 }} onPress={() => newMessage != "" && post()} >Publier</Button>
                        </View>
                    }
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}

const styles = StyleSheet.create({
    inputFocused: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        height: 100,
        margin: 10,
    },
});


export default Journal;