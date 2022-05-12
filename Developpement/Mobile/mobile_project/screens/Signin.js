import React, { useState, useRef, useEffect } from "react"
import { Box, Text, Heading, VStack, HStack, Center, NativeBaseProvider, Button } from "native-base"

import AlertError from "../components/elements/AlertError";
import { Pressable, View, TextInput, StyleSheet } from "react-native";

import { useAuth } from '../requests/Auth'

const Signin = (props) => {

    const { signin } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const handleSubmit = () => {
        if (username != "" && password != "") {
            signin({ username, password })
                .then(() => props.navigation.navigate('Travels'))
                .catch(() => {
                    setAlertMessage("Les informations de connexion sont \nincorrects")
                    setShowAlert(true)
                    setUsername('');
                    setPassword('');
                });
        }
        else {
            setAlertMessage("Veuillez renseigner l'ensemble des \nchamps !")
            setShowAlert(true)
        }
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <AlertError showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} />
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Center><Heading size="xl" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>Connexion</Heading></Center>
                    <VStack space={3} mt="5">
                        <View style={{ margin: 10 }}>
                            <Text>Pseudo : </Text>
                            <TextInput style={styles.input} textContentType="username" keyboardType="default" value={username} onChangeText={(text) => setUsername(text)} />
                            <Text style={{ marginTop: 10 }}>Mot de passe : </Text>
                            <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                        </View>
                        <Center><Button mt="2" width={"92%"} style={{ backgroundColor: "#00AB55" }} onPress={() => handleSubmit()}>Se connecter</Button></Center>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600">
                                Vous n'avez pas de compte ?{" "}
                            </Text>
                            <Pressable onPress={() => props.navigation.navigate('Signup')}>
                                <Text color="#00AB55">Inscrivez-vous !</Text>
                            </Pressable>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider >

    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        padding: 10,
        height: 40,
        borderRadius: 5,
        borderColor: '#00AB55',
        borderWidth: 1
    },
});

export default Signin;
