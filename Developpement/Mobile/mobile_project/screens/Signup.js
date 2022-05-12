import React, { useState } from "react"
import { Text, Box, Heading, VStack, Center, NativeBaseProvider, Image, ZStack, Pressable, HStack, Button } from "native-base"
import { ScrollView, TextInput, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import AlertError from "../components/elements/AlertError";
import { useAuth } from "../requests/Auth"

const Signup = (props) => {

    const { signup } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const handleSubmit = () => {
        if (username != "" && password != "" && password === confirmPassword) {
            signup({ username, password })
                .then(() => {
                    props.navigation.navigate('Signin');
                })
                .catch((err) => {
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    setAlertMessage("L'utilisateur n'a pas pu être créé !");
                    setShowAlert(true);
                });
        }
        else if (password !== confirmPassword) {
            setAlertMessage("Les mots de passes ne sont pas \nidentiques !");
            setShowAlert(true);
        }
        else {
            setAlertMessage("Veuillez renseigner l'ensemble des \nchamps !");
            setShowAlert(true);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <NativeBaseProvider>
                    <Center flex={1} px="3">
                        <AlertError showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} />
                        <Center alignItems={"center"}>
                            <Heading size="lg" mt={10} fontWeight="bold" color="coolGray.800" _dark={{ color: "warmGray.50" }}>Création d'un compte</Heading>
                        </Center>
                        <View>
                            <Box p="2" py="8" w="90%" maxW="290">
                                <VStack space={3}>
                                    <Text>Pseudo : </Text>
                                    <TextInput style={styles.input} textContentType="username" keyboardType="default" value={username} onChangeText={(text) => setUsername(text)} />
                                    <Text style={styles.text}>Mot de passe : </Text>
                                    <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                                    <Text style={styles.text}>Confirmation du mot de passe : </Text>
                                    <TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} />
                                    <HStack mt="2" justifyContent="center">
                                        <Text>Vous avez déjà un compte ?{" "}</Text>
                                        <Pressable onPress={props.navigation.goBack}>
                                            <Text color="#00AB55">Connectez-vous !</Text>
                                        </Pressable>
                                    </HStack>
                                    <Center><Button width={"100%"} mt="2" onPress={() => handleSubmit()} style={{ backgroundColor: "#00AB55" }}>Valider</Button></Center>
                                </VStack>
                            </Box>
                        </View>
                    </Center>
                </NativeBaseProvider>
            </ScrollView>
        </SafeAreaView >
    )
};

const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        padding: 10,
        height: 40,
        borderRadius: 5,
        borderColor: '#00AB55',
        borderWidth: 1
    },
    text: {
        marginTop: 5
    }
});

export default Signup;
