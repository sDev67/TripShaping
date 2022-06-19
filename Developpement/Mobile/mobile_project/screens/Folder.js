import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';

import { ScrollView, Pressable, Text, View, Image } from 'react-native';

import file from '../assets/navigation_icons/icon_file.png';
import info from '../assets/navigation_icons/icon_info2.png';

import TravelRequests from '../requests/TravelRequests';
import { useQuery, useQueryClient } from 'react-query';

const Folder = ({ route, navigation }) => {

    const currentStep = 1;
    const { isReadOnly, idTravel } = route.params;

    // Documents 
    const { isLoading, isError, error, data } = useQuery(["getDocuments", idTravel], () => TravelRequests.getDocumentsByTravelId(idTravel));
    let count = 0;

    useEffect(() => {
        navigation.setOptions({
            headerRight: (() =>
                <Pressable onPress={() => navigation.navigate('Information', { isReadOnly: isReadOnly, idTravel: idTravel })}><Image source={info} style={{ width: 25, height: 25, marginRight: 5, alignContent: "center", tintColor: "white" }} /></Pressable>
            )
        });
    }, [])

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={{ paddingTop: 5, flex: 1 }}>
                <Text style={{ margin: 10, borderBottomColor: "black", borderBottomWidth: 1 }}>Prochains documents</Text>
                {/* <ScrollView style={{ height: "30%" }}>
                    {documents.map((doc, idx) => {
                        if (doc.stepId === currentStep) {
                            return (
                                <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                        }
                        else {
                            return null;
                        }

                    })}
                </ScrollView> */}
                <Text style={{ margin: 10, borderBottomColor: "black", borderBottomWidth: 1 }}>Ensemble des documents</Text>
                <ScrollView>
                    {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                        data.map((doc, idx) => {
                            count++;
                            return (
                                <Pressable style={{ marginBottom: 10 }} key={idx} onPress={() => { navigation.navigate("Documents", { document: doc }) }}><View style={{ flexDirection: "row", marginLeft: 10 }}><Image alt="icon_file" source={file} style={{ width: 30, height: 30 }} /><Text style={{ marginTop: 5, marginLeft: 5 }}>{doc.title}</Text></View></Pressable>)
                        })}
                    {count === 0 && <Text style={{ marginLeft: 10 }}>Aucun document</Text>}
                </ScrollView>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Folder;