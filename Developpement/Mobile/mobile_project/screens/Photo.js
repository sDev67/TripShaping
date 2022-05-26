import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button, Center, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";
import { Camera } from 'expo-camera'

import noImage from "../assets/images/NoImage.jpg"

import PhotoRequests from '../requests/PhotoRequests';

import { useQuery, useQueryClient, useMutation } from 'react-query';

const Photo = ({ navigation, route }) => {

    const Buffer = require("buffer").Buffer;
    const queryClient = useQueryClient();

    const [image, setImage] = useState(null);
    const { photo, idTravel, location } = route.params;

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

    async function savePicture() {

        var date = Date.now();
        var formattedDate = format(date, "dd/MM/yyyy HH:mm");

        if (image != null) {
            const formData = new FormData();
            let data = image.base64;
            let b = Buffer.from(data, 'utf8');
            formData.append("dataFile", JSON.stringify(b));
            formData.append("date", formattedDate.toString());
            formData.append("TravelId", idTravel);
            PhotoRequests.sendPhoto(formData);
        }
        else if (photo != null) {
            const formData = new FormData();
            let data = photo.base64;
            let b = Buffer.from(data, 'utf8');
            formData.append("dataFile", JSON.stringify(b));
            formData.append("date", formattedDate.toString());
            formData.append("TravelId", idTravel);
            formData.append("longitude", location.coords.longitude);
            formData.append("latitude", location.coords.latitude);
            PhotoRequests.sendPhoto(formData);
        }
    }

    const showCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            navigation.navigate("Cameras", { parent: "global" })
            setImage(null)
        } else {
            Alert.alert('Access denied')
        }
    }

    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={() => showCamera()}>Prendre une photo</Button>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
                    <View style={{ marginBottom: 10, position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                        <Button style={{ backgroundColor: "#00AB55", alignSelf: "flex-end", marginRight: 10 }} onPress={() => savePicture()} >Sauvegarder</Button>
                    </View>
                    {image ?
                        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                        : photo ?
                            <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                            <Image source={noImage} style={{ alignSelf: "center", marginTop: "10%", width: 200, height: 200 }} />}
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}

export default Photo;