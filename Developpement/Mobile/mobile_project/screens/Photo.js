import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button, Center, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import noImage from "../assets/images/image.png"

import { useQuery, useQueryClient, useMutation } from 'react-query';
import PhotoRequests from '../requests/PhotoRequests';

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

    // Envoi de la photo en BDD
    const addPhoto = useMutation(PhotoRequests.sendPhoto, {
        onSuccess: newPhoto => queryClient.setQueryData(
            ['photos', idTravel],
            photos => [...photos, newPhoto]
        )
    });


    async function savePicture() {
        if (image != null) {
            const formData = new FormData();
            let data = image.base64;
            let b = Buffer.from(data, 'utf8');
            formData.append("dataFile", JSON.stringify(b));
            formData.append("date", Date.now());
            formData.append("TravelId", idTravel);
            PhotoRequests.sendPhoto(formData);
        }
        else if (photo != null) {
            const formData = new FormData();
            let data = photo.base64;
            let b = Buffer.from(data, 'utf8');
            formData.append("dataFile", JSON.stringify(b));
            formData.append("date", Date.now());
            formData.append("TravelId", idTravel);
            formData.append("longitude", location.coords.longitude);
            formData.append("latitude", location.coords.latitude);
            PhotoRequests.sendPhoto(formData);
            console.log(Date.now())
        }
    }

    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={() => { navigation.navigate("Cameras", { parent: "global" }), setImage(null) }}>Prendre une photo</Button>
                        <Button style={{ width: "50%", backgroundColor: "#00AB55", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
                    <View style={{ marginBottom: 10, position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                        <Button style={{ backgroundColor: "#00AB55", alignSelf: "flex-end", marginRight: 10 }} onPress={() => savePicture()} >Sauvegarder</Button>
                    </View>
                    {image ?
                        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                        : photo ?
                            <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                            <View style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", borderColor: "#CECECE", borderWidth: 1, borderRadius: 5, backgroundColor: "#E3E3E3", marginHorizontal: "10%", height: "60%", marginTop: "10%" }}>
                                <Image source={noImage} style={{ width: 100, height: 100, tintColor: "#CECECE" }} alt="No Image" />
                            </View>}
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}

export default Photo;