import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Collapsible from 'react-native-collapsible';

import DocumentsModal from '../components/modals/DocumentsModal';
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';

import marker from '../assets/images/marker.png'
import iconFiles from '../assets/navigation_icons/icon_files.png';

export default StepsList = ({ navigation, route }) => {

    const { isReadOnly, idTravel } = route.params;

    // Etapes 
    const { isLoading: isLoadingS, isError: isErrorS, error: errorS, data: steps } = useQuery(
        ['getSteps', idTravel], () => TravelRequests.getStepsOfTravel(idTravel)
    );

    // Points
    const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: points } = useQuery(
        ['getPoints', idTravel], () => TravelRequests.getPointsOfTravel(idTravel)
    );

    const [showModal, setShowModal] = useState(false);
    const documents = [{ title: "Billet cathédrale", url: "https://www.portailentreprises.sncf.com/design/b2b/css/page/colonneC/img/Confirmation_e_billet.jpg" }, { title: "Plan cathédrale", url: "https://s3.us-east-2.amazonaws.com/us-east-2.files.campus.edublogs.org/blogs.furman.edu/dist/2/109/files/2014/12/Strasbourg-3.jpg" }]

    const [collapsed, setCollapsed] = useState([true])
    let total = -1;

    useEffect(() => {
        const bool = true;
        let tabCollapse = collapsed;
        steps.map((step, idx) => {
            if (idx !== (steps.length - 1)) {
                tabCollapse = [...tabCollapse, bool]
            }
            setCollapsed(tabCollapse)
        })
    }, []);

    const toggleExpanded = (idx) => {
        const newTab = [...collapsed];
        newTab[idx] = !newTab[idx];
        setCollapsed(newTab);
    };

    const FillTab = function (duration, tab) {
        for (let i = 0; i < duration; i++) {
            tab.push(0)
        }
    }
    return (
        <View>
            <DocumentsModal showModal={showModal} setShowModal={setShowModal} navigation={navigation} documents={documents} />
            <ScrollView>
                {steps.map((step, idx) => {
                    var tabDays = [];
                    FillTab(step.duration, tabDays);
                    return (<ScrollView contentContainerStyle={{ paddingTop: 0 }} key={idx}>
                        <TouchableOpacity onPress={() => toggleExpanded(idx)}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{step.title}</Text>
                            </View>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsed[idx]} align="center">
                            <View style={styles.content}>
                                <Text>
                                    <Text style={styles.font}>Durée :</Text> {step.duration}{step.duration > 1 ? " jours" : " jour"}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 5 }}>
                                    Planning :
                                </Text >
                                {tabDays.map((day, i) => {
                                    total = total + 1;
                                    var date = new Date();
                                    date.setTime(date.getTime() + total * 24 * 3600 * 1000);
                                    const now = date.getTime() == Date.now() ? true : false;
                                    return (<View key={[idx, i]} style={{
                                        borderRadius: 5,
                                        marginVertical: 5,
                                        padding: 5,
                                        borderWidth: 1,
                                        borderColor: now ? "red" : "black"
                                    }}>
                                        <Text>Jour {i + 1} : {(date.getDate < 10 && "0") + date.getDate() + "/" + ((date.getMonth() + 1) < 10 && "0") + (date.getMonth() + 1) + "/" + date.getFullYear()} </Text>
                                        <View style={{ marginTop: 5, flexDirection: "row" }}>
                                            {points.map((point, id) => {
                                                if (point.StepId === step.id && point.day === i + 1) {
                                                    return <View key={id} style={{ flexDirection: "row" }}>
                                                        <Image source={marker} style={{ width: 20, height: 20, tintColor: "red" }} />
                                                        <Text>{point.title}</Text>
                                                        <Pressable onPress={() => setShowModal(true)}><Image source={iconFiles} style={{ width: 20, height: 20, marginLeft: 10 }} /></Pressable>
                                                    </View>
                                                }
                                            })}
                                        </View>
                                    </View>)

                                })}
                            </View>
                        </Collapsible>
                    </ScrollView>)
                })}
            </ScrollView>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    dayContent: {
        borderRadius: 5,
        marginVertical: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    font: {
        fontSize: 15,
        fontWeight: "bold",
        margin: 10
    }
});