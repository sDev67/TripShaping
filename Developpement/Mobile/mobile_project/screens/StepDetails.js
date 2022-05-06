import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { NativeBaseProvider, Button, Image } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import file from '../assets/navigation_icons/icon_file.png';
import noImage from "../assets/images/image.png"

import TravelRequests from '../requests/TravelRequests';
import { useQuery, useQueryClient } from 'react-query';

const StepDetails = ({ route, navigation }) => {

    const { photo, step, isReadOnly, idTravel } = route.params;

    const [image, setImage] = useState(null);

    const user = "Vivien Riehl"
    const [newMessage, setNewMessage] = useState('');

    const post = () => {
        const dateCourante = new Date();
        const date = dateCourante.getDate() + "/" + (dateCourante.getMonth() + 1) + "/" + dateCourante.getFullYear();
        const time = dateCourante.getHours() + "h" + dateCourante.getMinutes();

        if (newMessage != "") {
            const newPost = { body: newMessage, author: user, date: date, time: time, catStep: 2, step: step };
            setMessages([...messages, newPost]);
            setNewMessage("");
        }
    };

    const pickImage = async () => {
        setImage(null)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsEditing: true,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    // Documents 
    const { isLoading, isError, error, data } = useQuery(["getDocuments", idTravel], () => TravelRequests.getDocumentsByTravelId(idTravel));
    let count = 0;

    return (
        step != null &&
        <NativeBaseProvider >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.font}>Nom</Text>
                        <Text style={{ marginLeft: 10 }}>{step.title}</Text>
                        <Text style={styles.font}>Catégorie</Text>
                        <Text style={{ marginLeft: 10 }}>{step.category}</Text>
                        <Text style={styles.font} >Durée</Text>
                        <Text style={{ marginLeft: 10 }}>{step.duration}{step.duration > 1 ? " jours" : " jour"}</Text>
                        <Text style={styles.font} >Description</Text>
                        <Text style={{ marginLeft: 10 }}>{step.description}</Text>
                        <Text style={styles.font}>Documents</Text>
                        <ScrollView style={{ height: "30%" }}>
                            {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                                data.map((doc, idx) => {
                                    if (doc.StepId === step.id) {
                                        count++;
                                        return (
                                            <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image alt="icon_file" source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                                    }
                                    else {
                                        return null;
                                    }

                                })}
                            {count === 0 && <Text style={{ marginLeft: 10 }}>Aucun document</Text>}
                        </ScrollView>
                        {!isReadOnly &&
                            <View>
                                <Text style={styles.font} >Journal</Text>
                                <View>
                                    <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                                    <Button style={{ backgroundColor: "#00AB55", width: 100, alignSelf: "flex-end", marginRight: 10 }} onPress={() => post()} >Publier</Button>
                                </View>
                                <Text style={styles.font}>Photo</Text>
                                <View>
                                    <Button style={{ width: "70%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={() => navigation.navigate("Cameras", { parent: "step", point: step, idReadOnly: isReadOnly, idTravel: idTravel })}>Prendre une photo</Button>
                                    <Button style={{ width: "70%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                                </View >
                                <View style={{ marginBottom: 10, paddingBottom: "50%" }}>
                                    {image ?
                                        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                                        : photo ?
                                            <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                                            <View style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", borderColor: "#CECECE", borderWidth: 1, borderRadius: 5, backgroundColor: "#E3E3E3", marginHorizontal: "10%", height: "60%", marginTop: "10%" }}>
                                                <Image source={noImage} style={{ width: 100, height: 100, tintColor: "#CECECE" }} alt="No Image" />
                                            </View>}
                                </View>
                            </View>}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    inputFocused: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        height: 100,
        margin: 10
    },
    font: {
        fontSize: 15,
        fontWeight: "bold",
        margin: 10
    }
});

export default StepDetails;