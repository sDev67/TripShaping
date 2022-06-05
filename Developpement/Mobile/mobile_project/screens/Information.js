import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient } from 'react-query';

import RichTextEditor from '../components/elements/RichTextEditor';

const Information = ({ route, navigation }) => {

    const { isReadOnly, idTravel } = route.params;

    const { isLoading: isLoading, isError: isError, error: error, data: travelDatas } = useQuery(
        ['getInfos', idTravel], () => TravelRequests.getTravelByid(idTravel)
    );

    return (
        <View style={{ margin: 10, borderColor: 'black', borderWidth: 1, backgroundColor: "white", height: "97%" }}>
            {isLoading ? <Text>Chargement...</Text> : isError ? <Text style={{ color: 'red' }}>{error.message}</Text> :
                <RichTextEditor
                    value={travelDatas.infos !== null ? travelDatas.infos : null}
                />
            }
        </View>
    )
}

export default Information;