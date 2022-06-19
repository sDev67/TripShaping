import React from "react";
import { Text, View, Image } from "react-native";

import marker from '../../assets/images/marker.png'

import MemberRequests from "../../requests/MemberRequests";
import StepRequests from "../../requests/StepRequests";
import PointRequests from "../../requests/PointRequests";
import { useQuery, useQueryClient } from 'react-query';

const JournalBox = ({ message }) => {


    const { isLoading: isLoading, isError: isError, error: error, data: step } = useQuery(
        ['getStep', message.StepId], () => (message.StepId !== null && message.StepId !== undefined) && StepRequests.getStepById(message.StepId)
    );

    const { isLoading: isLoadingP, isError: isErrorP, error: errorP, data: point } = useQuery(
        ['getPoint', message.PointId], () => (message.PointId !== null && message.PointId !== undefined) && PointRequests.getPointById(message.PointId)
    );

    const { isLoading: isLoadingM, isError: isErrorM, error: errorM, data: member } = useQuery(
        ['getMember', message.MemberId], () => (message.MemberId !== null && message.MemberId !== undefined) && MemberRequests.getMemberById(message.MemberId)
    );

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{
                backgroundColor: "#dddddd", width: "97%", marginTop: 5, marginHorizontal: 5, borderRadius: 5
            }}>
                <Text style={{ margin: 5 }}>{message.text}</Text>
            </View>
            <View style={{ marginLeft: 5 }}>
                {message.StepId !== null ?
                    (<View style={{ marginTop: 5, flexDirection: "row" }}>
                        {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                            <View style={{ flexDirection: "row" }}>
                                <Image source={marker} style={{ width: 20, height: 20, tintColor: "red" }} />
                                <Text>{step.title}</Text>
                            </View>
                        }
                    </View>) : null
                }
                {message.PointId !== null ?
                    (<View style={{ marginTop: 5, flexDirection: "row" }}>
                        {isLoadingP ? <Text>Chargement...</Text> : isErrorP ? <Text style={{ color: 'red' }}>{errorP.message}</Text> :
                            <View style={{ flexDirection: "row" }}>
                                <Image source={marker} style={{ width: 20, height: 20, tintColor: "blue" }} />
                                <Text>{point.title}</Text>
                            </View>
                        }
                    </View>) : null
                }
                {isLoadingM ? <Text>Chargement...</Text> : isErrorM ? <Text style={{ color: 'red' }}>{errorM.message}</Text> :
                    <Text style={{ marginTop: 5 }} >Écrit par {member.name} le {message?.date?.substring(0, 10)} à {message?.date?.substring(11)}</Text>}
            </View>
        </View >)
}

export default JournalBox;