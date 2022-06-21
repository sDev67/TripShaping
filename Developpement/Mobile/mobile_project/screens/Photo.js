import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button, Center, Image, useToast, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";
import { Camera } from 'expo-camera'

import noImage from "../assets/images/NoImage.jpg"

import PhotoRequests from '../requests/PhotoRequests';

import AlertError from '../components/elements/AlertError';

import { useQuery, useQueryClient, useMutation } from 'react-query';

const Photo = ({ navigation, route }) => {

    const [photoIsSaved, setPhotoIsSaved] = useState(false);
    const [firstPhoto, setFirstPhoto] = useState(false);

    const [message, setMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [status, setStatus] = useState("")

    const queryClient = useQueryClient();

    const { photo, idTravel, location } = route.params;

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        setImage(null)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.25,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

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
            formData.append("longitude", location.coords.longitude);
            formData.append("latitude", location.coords.latitude);
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
            setPhotoIsSaved(true);
            setFirstPhoto(false);
        }
        else {
            setMessage("La photo n'a pas été enregistrée");
            setStatus("error");
            setShowAlert(true);

        }
    }

    const showCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            navigation.navigate("Cameras", { parent: "global" })
            setImage(null)
            setFirstPhoto(true);
            setPhotoIsSaved(false);
        } else {
            Alert.alert('Access denied')
        }
    }

    return (
        <>
            <NativeBaseProvider>
                <AlertError showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={message} status={status} />
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={() => showCamera()}>Prendre une photo</Button>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
                    <View style={{ marginBottom: 10, position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                        <Button style={{ backgroundColor: "#00AB55", alignSelf: "center", marginRight: 10 }} onPress={savePicture}>Sauvegarder</Button>
                    </View>
                    {image ?
                        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                        : photo && (!photoIsSaved && firstPhoto) ?
                            <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                            <Image source={noImage} style={{ alignSelf: "center", marginTop: "10%", width: 200, height: 200 }} alt="default" />}
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}

export default Photo;