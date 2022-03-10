import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Button, Center, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const Photo = ({ setStartCamera, photo }) => {

    const [image, setImage] = useState(null);

    const startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const pickImage = async () => {
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

    return (
        <>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    {photo &&
                        < Image
                            alt="photo"
                            size={100}
                            resizeMode={"stretch"}
                            source={{ uri: `data:image/gif;base64,${photo.base64}` }} />
                    }
                    {image && <Image source={{ uri: `data:image/gif;base64,${image.base64}` }} style={{ width: image.width / 8, height: image.height / 8 }} alt="photo" />}
                    <View>
                        <Button style={{ width: "50%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={startCamera}>Prendre une photo</Button>
                        <Button style={{ width: "50%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
                    <View style={{ marginBottom: 10, position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                        <Button style={{ backgroundColor: "#9AD1F5", alignSelf: "flex-end", marginRight: 10 }} >Sauvegarder</Button>
                    </View>
                </SafeAreaView>
            </NativeBaseProvider>
        </>
    )
}

export default Photo;