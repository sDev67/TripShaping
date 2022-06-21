import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PointRequests = {
    getPointById: async PointId => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/point/${PointId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default PointRequests;