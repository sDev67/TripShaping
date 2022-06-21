import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable } from 'react-native';
import { NativeBaseProvider, Button, Image, ScrollView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";
import { Camera } from 'expo-camera'
import HTMLView from 'react-native-htmlview';

import AlertError from '../components/elements/AlertError';

import file from '../assets/navigation_icons/icon_file.png';
import noImage from "../assets/images/NoImage.jpg"

import TravelRequests from '../requests/TravelRequests';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import { useAuth } from '../requests/Auth'
import MemberRequests from '../requests/MemberRequests';
import JournalRequests from '../requests/JournalRequests';
import PhotoRequests from '../requests/PhotoRequests';

const PointDetails = ({ route, navigation }) => {

    const [photoIsSaved, setPhotoIsSaved] = useState(false);
    const [firstPhoto, setFirstPhoto] = useState(false);

    const [message, setMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState("")

    const Buffer = require("buffer").Buffer;
    const { photo, point, isReadOnly, idTravel, location } = route.params;

    const [image, setImage] = useState(null);

    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [idMember, setIdMember] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: members } = useQuery(
        ['getMembers'], () => MemberRequests.getMembers()
    );

    // Envoi du message en BDD
    const addMessage = useMutation(JournalRequests.sendMessage, {
        onSuccess: newMes => {
            queryClient.setQueryData(
                ['getMessages', idTravel],
                message => [...message, newMes]
            )
            queryClient.invalidateQueries(['getMessages', idTravel])
            setMessage("Le message a bien été enregistré");
            setShowAlert(true);
            setStatus("success");
        },
        onError: () => {
            setMessage("Le message n'a pas été enregistré");
            setStatus("error");
            setShowAlert(true);
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

        const newMes = { date: formattedDate, text: newMessage, TravelId: idTravel, PointId: point.id, MemberId: id }
        addMessage.mutate(newMes)
        setNewMessage("")
    };

    const pickImage = async () => {
        setImage(null)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.25,
            allowsEditing: false,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const showCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            navigation.navigate("Cameras", { parent: "poi", point: point, idReadOnly: isReadOnly, idTravel: idTravel })
            setImage(null)
            setFirstPhoto(true);
            setPhotoIsSaved(false);
        } else {
            Alert.alert('Access denied')
        }
    }

    async function savePicture() {
        setPhotoIsSaved(false)
        var date = Date.now();
        var formattedDate = format(date, "dd/MM/yyyy HH:mm");

        if (image != null) {
            const formData = new FormData();
            let data = image.base64;
            let part1 = data.substring(0, Math.abs((data.length - 1) / 2));
            let part2 = data.substring(Math.abs((data.length - 1) / 2));
            formData.append("dataFile1", part1);
            formData.append("dataFile2", part2);
            formData.append("date", formattedDate.toString());
            formData.append("TravelId", idTravel);
            formData.append("PointId", point.id);
            PhotoRequests.sendPhoto(formData)
                .then((res) => {
                    setMessage("La photo a bien été enregistrée");
                    setStatus("success");
                    setShowAlert(true);
                })
                .catch((res) => {
                    setMessage("La photo n'a pas été enregistrée");
                    setStatus("error");
                    setShowAlert(true);
                });
            setPhotoIsSaved(true)
            setImage(null);
        }
        else if (photo != null && firstPhoto) {
            const formData = new FormData();
            let data = photo.base64;
            let part1 = data.substring(0, Math.abs((data.length - 1) / 2));
            let part2 = data.substring(Math.abs((data.length - 1) / 2));
            formData.append("dataFile1", part1);
            formData.append("dataFile2", part2);
            formData.append("date", formattedDate.toString());
            formData.append("TravelId", idTravel);
            formData.append("PointId", point.id);
            formData.append("longitude", location.coords.longitude);
            formData.append("latitude", location.coords.latitude);
            PhotoRequests.sendPhoto(formData)
                .then((res) => {
                    setMessage("La photo a bien été enregistrée");
                    setShowAlert(true);
                    setStatus("success");
                })
                .catch((res) => {
                    setMessage("La photo n'a pas été enregistrée");
                    setShowAlert(true);
                    setStatus("error");
                });
            setPhotoIsSaved(true)
            setFirstPhoto(false);
        }
        else {
            setMessage("La photo n'a pas été enregistrée");
            setShowAlert(true);
            setStatus("error");
        }
    }

    // Documents 
    const { isLoading, isError, error, data } = useQuery(["getDocuments", idTravel], () => TravelRequests.getDocumentsByTravelId(idTravel));
    let count = 0;

    return (
        point != null &&
        <NativeBaseProvider >
            <AlertError showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={message} status={status} />
            <View style={styles.container}>
                <ScrollView style={{ height: "100%" }}>
                    <Text style={styles.font}>Nom</Text>
                    <Text style={{ marginLeft: 10 }}>{point.title}</Text>
                    {point.category != null || point.category != "" &&
                        <View>
                            <Text style={styles.font}>Catégorie</Text>
                            <Text style={{ marginLeft: 10 }}>{point.category}</Text>
                        </View>
                    }

                    {
                        point.descriptionHTML != null &&
                        <View>
                            <Text style={styles.font}>Description</Text>
                            <View style={{ marginLeft: 10, marginTop: 25 }}>
                                <HTMLView
                                    value={point.descriptionHTML}
                                    stylesheet={styles}
                                />
                            </View>
                        </View>

                    }
                    <Text style={styles.font}>Documents</Text>
                    <ScrollView style={{ height: "30%" }}>
                        {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                            data.map((doc, idx) => {
                                if (doc.PointId === point.id) {
                                    count++;
                                    return (
                                        <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image alt="icon_file" source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                                }
                                else {
                                    return null
                                }

                            })
                        }
                        {count === 0 && <Text style={{ marginLeft: 10 }}>Aucun document</Text>}
                    </ScrollView>
                    {!isReadOnly &&
                        <View>
                            <Text style={styles.font} >Journal</Text>
                            <View>
                                <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                                <Button style={{ backgroundColor: "#00AB55", width: 100, alignSelf: "flex-end", marginRight: 10 }} onPress={() => newMessage != "" && post()} >Publier</Button>
                            </View>
                            <Text style={styles.font}>Photo</Text>
                            <View>
                                <Button style={{ width: "70%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={() => showCamera()}>Prendre une photo</Button>
                                <Button style={{ width: "70%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                            </View>
                            {image ?
                                <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                                : photo && (!photoIsSaved && firstPhoto) ?
                                    <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                                    <Image source={noImage} alt="No image" style={{ alignSelf: "center", marginTop: "10%", width: 200, height: 200 }} />
                            }
                            <View style={{ marginTop: 10, alignSelf: "flex-end" }}>
                                <Button style={{ backgroundColor: "#00AB55", alignSelf: "flex-end", marginRight: 10 }} onPress={() => savePicture()} >Sauvegarder</Button>
                            </View>
                        </View>

                    }
                </ScrollView>
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "white",
        paddingBottom: 10
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
    },
    p: {
        marginTop: -25
    },
});



export default PointDetails;