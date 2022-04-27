import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';

import { ScrollView, Pressable, Text, View, Image } from 'react-native';

import file from '../assets/navigation_icons/icon_file.png';
import info from '../assets/navigation_icons/icon_info.png';

const Folder = ({ route, navigation }) => {

    const currentStep = 1;
    const { isReadOnly, idTravel } = route.params;

    const documents = [{ stepId: 1, title: "Document 1", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 1, title: "Document 2", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 1, title: "Document 3", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 1, title: "Document 4", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" },
    { stepId: 2, title: "Document 5", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 2, title: "Document 6", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 3, title: "Document 7", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 4, title: "Document 8", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" },
    { stepId: 3, title: "Document 9", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 3, title: "Document 10", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 3, title: "Document 11", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 3, title: "Document 12", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" },
    { stepId: 4, title: "Document 13", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 4, title: "Document 14", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 4, title: "Document 15", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { stepId: 4, title: "Document 16", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }]

    useEffect(() => {
        navigation.setOptions({
            headerRight: (() =>
                <Pressable onPress={() => navigation.navigate('Information', { isReadOnly: isReadOnly, idTravel: idTravel })}><Image source={info} style={{ width: 25, height: 25, marginRight: 5, alignContent: "center" }} /></Pressable>
            )
        });
    }, [])

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={{ paddingTop: 5, flex: 1 }}>
                <Text style={{ margin: 10, borderBottomColor: "black", borderBottomWidth: 1 }}>Documents de l'étape en cours</Text>
                <ScrollView style={{ height: "30%" }}>
                    {documents.map((doc, idx) => {
                        if (doc.stepId === currentStep) {
                            return (
                                <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                        }
                        else {
                            return null;
                        }

                    })}
                </ScrollView>
                <Text style={{ margin: 10, borderBottomColor: "black", borderBottomWidth: 1 }}>Autres documents</Text>
                <ScrollView>
                    {documents.map((doc, idx) => {
                        if (doc.stepId !== currentStep) {
                            return (
                                <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                        }
                        else {
                            return null;
                        }

                    })}
                </ScrollView>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Folder;