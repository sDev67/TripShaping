import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button, Center, Image, useToast, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";
import { Camera } from 'expo-camera'

import noImage from "../assets/images/NoImage.jpg"

import PhotoRequests from '../requests/PhotoRequests';

import { useQuery, useQueryClient, useMutation } from 'react-query';

const Photo = ({ navigation, route }) => {

    const [ok, setOk] = useState(false);
    const [photoIsSaved, setPhotoIsSaved] = useState(false);

    const queryClient = useQueryClient();

    const { photo, idTravel, location } = route.params;

    const [image, setImage] = useState(null);
    let photoS = photo;

    const pickImage = async () => {
        setImage(null)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.25,
            allowsEditing: false,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

    async function savePicture() {
        setOk(false)
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
            PhotoRequests.sendPhoto(formData);
            setPhotoIsSaved(true)
            setImage(null);
            setOk(true);
        }
        else if (photo != null) {
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
            PhotoRequests.sendPhoto(formData);
            setPhotoIsSaved(true)
            setOk(true)
        }
    }

    const showCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            navigation.navigate("Cameras", { parent: "global" })
            setImage(null)
            setPhotoIsSaved(false);
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
                        <CustomButton title={"Sauvegarder"} message={"La photo a été enregistrée"} func={savePicture} condition={ok} />
                    </View>
                    {image ?
                        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} style={{ alignSelf: 'center', width: image.width / 10, height: image.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" />
                        : photo && !photoIsSaved ?
                            <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ alignSelf: 'center', width: photo.width / 10, height: photo.height / 10, display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: "10%" }} alt="photo" /> :
                            <Image source={noImage} style={{ alignSelf: "center", marginTop: "10%", width: 200, height: 200 }} alt="default" />}
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}


const CustomButton = ({ title, message, func, condition }) => {
    const toast = useToast();
    return <Button style={{ backgroundColor: "#00AB55", alignSelf: "center", marginRight: 10 }} onPress={() => {
        func();
        condition ?
            toast.show({
                placement: "top",
                render: () => {
                    return <Box bg="green.200" borderColor="green.500" borderWidth="1" px="4" py="2" rounded="sm">
                        {message}
                    </Box>;
                }
            }) :
            toast.show({
                placement: "top",
                render: () => {
                    return <Box bg="red.200" borderColor="red.500" borderWidth="1" px="4" py="2" rounded="sm">
                        Oops, une erreur s'est produite
                    </Box>;
                }
            })

    }}>
        {title}
    </Button>;
};


export default Photo;