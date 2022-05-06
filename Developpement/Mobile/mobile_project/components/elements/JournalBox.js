import React from "react";
import { Text, View, Image } from "react-native";

import marker from '../../assets/images/marker.png'

const JournalBox = ({ message }) => {

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ backgroundColor: "#00AB55", width: "97%", marginTop: 5, marginHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ margin: 5 }}>{message.body}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
                {message.step !== null ?
                    (<View style={{ marginTop: 5, flexDirection: "row" }}>
                        {
                            message.catStep === 1 ? <>
                                <Image source={marker} style={{ width: 20, height: 20, tintColor: "blue" }} />
                                <Text>{message.step.name}</Text></> : <>
                                <Image source={marker} style={{ width: 20, height: 20, tintColor: "red" }} />
                                <Text>{message.step.name}</Text></>
                        }
                    </View>) : null
                }
                <Text style={{ marginTop: 5 }} >Écrit par {message.author} le {message.date} à {message.time}</Text>
            </View>
        </View >)
}

export default JournalBox;