import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput } from 'react-native';

import JournalBox from '../components/elements/JournalBox';

const Journal = ({ messages, setMessages }) => {

    const user = "Vivien Riehl"

    const [newMessage, setNewMessage] = useState('');

    const post = () => {
        const dateCourante = new Date();
        const date = dateCourante.getDate() + "/" + (dateCourante.getMonth() + 1) + "/" + dateCourante.getFullYear();
        const time = dateCourante.getHours() + "h" + dateCourante.getMinutes();

        if (newMessage != "") {
            const newPost = { body: newMessage, author: user, date: date, time: time, step: null };
            setMessages([...messages, newPost]);
            setNewMessage("");
        }
    };


    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        {messages.map((message, idx) => (
                            <JournalBox key={idx} message={message} />
                        ))}
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