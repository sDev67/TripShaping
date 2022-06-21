import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';


const JournalRequests = {
    getJournalByTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/journalEntries`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    sendMessage: async (credentials) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/journal_entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
    }
};

export default JournalRequests;