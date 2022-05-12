import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import JournalBox from '../components/elements/JournalBox';

import { useAuth } from '../requests/Auth'
import JournalRequests from '../requests/JournalRequests';
import MemberRequests from '../requests/MemberRequests';
import { useQuery, useQueryClient } from 'react-query';

const Journal = ({ idTravel }) => {

    const { user } = useAuth();

    const [idMember, setIdMember] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const { isLoading: isLoading, isError: isError, error: error, data: messages } = useQuery(
        ['getMessages', idTravel], () => JournalRequests.getJournalByTravel(idTravel)
    );

    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ['getMembers'], () => MemberRequests.getMembers()
    );



    const post = () => {
        if (members != null) {
            members.map((member, idx) => {
                if (member.TravelId == idTravel && member.userLogin == user.username) {
                    setIdMember(member.id)
                }
            })
        }

        console.log(idMember);
        // const dateCourante = new Date();
        // const date = dateCourante.getDate() + "/" + (dateCourante.getMonth() + 1) + "/" + dateCourante.getFullYear();
        // const time = dateCourante.getHours() + "h" + dateCourante.getMinutes();

        // if (newMessage != "") {
        //     const newPost = { body: newMessage, author: user, date: date, time: time, step: null };
        //     setMessages([...messages, newPost]);
        //     setNewMessage("");
        // }
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
                    <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
                        <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                        <Button style={{ backgroundColor: "#00AB55", width: 100, justifyContent: "center", alignSelf: "flex-end", marginRight: 10 }} onPress={() => post()} >Publier</Button>
                    </View>

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