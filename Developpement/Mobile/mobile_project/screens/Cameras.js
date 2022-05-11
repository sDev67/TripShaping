import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from 'expo-camera'
import * as Location from 'expo-location';

let camera = Camera;

const Cameras = ({ navigation, route }) => {

    const { parent, point, idReadOnly, idTravel } = route.params;

    const [location, setLocation] = useState(null);
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [flashMode, setFlashMode] = useState('off')

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            if (status === 'granted') {
                setStartCamera(true)
            } else {
                Alert.alert('Access denied')
            }
        });
    }, [])

    const takePicture = async () => {
        const options = { quality: 0.25, base64: true };
        const photo = await camera.takePictureAsync(options)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        setStartCamera(true)
    }

    const handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }

    const switchCamera = () => {
        if (cameraType === 'back') {
            setCameraType('front')
        } else {
            setCameraType('back')
        }
    }

    async function save() {
        setStartCamera(false);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (parent === "global") {
            navigation.navigate("Photo", { photo: capturedImage, location: location })
        }
        if (parent === "step") {
            navigation.navigate("StepDetails", { photo: capturedImage, step: point, idReadOnly: idReadOnly, idTravel: idTravel, location: location })
        }
        if (parent === "poi") {
            navigation.navigate("PointDetails", { photo: capturedImage, point: point, idReadOnly: idReadOnly, idTravel: idTravel, location: location })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: '100%' }}>
                {previewVisible && capturedImage ? (<CameraPreview photo={capturedImage} retakePicture={retakePicture} save={save} />) : (
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={{ flex: 1, width: "100%" }}
                        ref={(r) => {
                            camera = r
                        }}
                    >
                        <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>
                            <View style={{ position: 'absolute', left: '5%', top: '10%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={handleFlashMode} style={{ backgroundColor: flashMode === 'off' ? '#000' : '#fff', borderRadius: 50, height: 25, width: 25 }}>
                                    <Text style={{ fontSize: 20 }}>⚡️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={switchCamera} style={{ marginTop: 20, borderRadius: 50, height: 25, width: 25 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        {cameraType === 'front' ? '🤳' : '📷'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, borderRadius: 50, height: 25, width: 25 }}>
                                    <Text style={{ fontSize: 20 }}>🔙</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', flex: 1, width: '100%', padding: 20, justifyContent: 'space-between' }}>
                                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }} >
                                    <TouchableOpacity onPress={takePicture} style={{ width: 70, height: 70, bottom: 0, borderRadius: 50, backgroundColor: '#fff' }} />
                                </View>
                            </View>
                        </View>
                    </Camera>
                )}
            </View>

        </View>
    )
}

const CameraPreview = ({ photo, retakePicture, save }) => {
    return (
        <View style={{ backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' }}>
            <ImageBackground source={{ uri: photo.uri }} style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={retakePicture} style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>
                                Reprendre
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={save} style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>
                                Sauvegarder
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Cameras;
