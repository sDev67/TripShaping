import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { NativeBaseProvider, Button, Image, ScrollView } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

const StepDetails = ({ route, navigation }) => {

    const { step } = route.params;

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
        step != null &&
        <NativeBaseProvider >
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
                    <Text style={styles.font} >Journal</Text>
                    <View>
                        <TextInput multiline={true} numberOfLines={4} style={styles.inputFocused} value={newMessage} onChangeText={(text) => setNewMessage(text)} />
                        <Button style={{ backgroundColor: "#9AD1F5", width: 100, alignSelf: "flex-end", marginRight: 10 }} onPress={() => post()} >Publier</Button>
                    </View>
                    <Text style={styles.font}>Photo</Text>
                    {image && <Image source={{ uri: `data:image/gif;base64,${image.base64}` }} style={{ width: image.width / 8, height: image.height / 8 }} alt="photo" />}
                    <View>
                        <Button style={{ width: "70%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={() => navigation.navigate("Cameras")}>Prendre une photo</Button>
                        <Button style={{ width: "70%", backgroundColor: "#9AD1F5", alignSelf: "center", marginTop: 20 }} onPress={pickImage}>Importer une photo</Button>
                    </View>
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
        backgroundColor: "white"
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