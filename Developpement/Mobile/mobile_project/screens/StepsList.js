import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Collapsible from 'react-native-collapsible';

export default StepsList = ({ steps }) => {

    const [collapsed, setCollapsed] = useState([true])

    useEffect(() => {
        const bool = true;
        steps.map((step, idx) => {
            setCollapsed([...collapsed, bool])
            console.log("map");
        })
    }, []);

    const toggleExpanded = (idx) => {
        console.log(collapsed);
        const newTab = [...collapsed];
        newTab[idx] = !newTab[idx];
        setCollapsed(newTab);
    };

    return (
        <View>
            <ScrollView>
                {steps.map((step, idx) => (
                    <ScrollView contentContainerStyle={{ paddingTop: 0 }} key={idx}>
                        <TouchableOpacity onPress={() => toggleExpanded(idx)}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{step.title}</Text>
                            </View>
                        </TouchableOpacity>
                        <Collapsible collapsed={collapsed[idx]} align="center">
                            <View style={styles.content}>
                                <Text>
                                    Description
                                </Text>
                            </View>
                        </Collapsible>
                    </ScrollView>
                ))}
            </ScrollView>





        </View>
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
    }
});