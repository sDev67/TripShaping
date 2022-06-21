import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepRequests = {
    getStepById: async stepId => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/step/${stepId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default StepRequests;