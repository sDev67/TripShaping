import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MemberRequests = {
    getMemberById: async memberId => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/member/${memberId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    getMembers: async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/members`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    setBalance: async ({ MemberId, balance }) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/member/${MemberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ balance })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    setSavePosition: async ({ MemberId, saveLocation }) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/member/${MemberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ saveLocation })
        })
            .then(checkStatus)
            .then(res => res.json());
    }
};

export default MemberRequests;