import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhotoRequests = {
    sendPhoto: async (formData) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/photo`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(checkStatus)
            .then((res) => res.text());
    }
};

export default PhotoRequests;