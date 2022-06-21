import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravelRequests = {

    getAllTravel: async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getTravelByid: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    updateTravel: async ({ TravelId, status, startDate }) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${TravelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ status, startDate })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    getPointsOfTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/points`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getStepsOfTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/steps`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getRoutesOfTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/routes`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getMembersOfTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/members`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getExpensesOfTravel: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/expenses`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getInPreparationTravel: async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel_preparation`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getCurrentTravel: async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel_current`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getFinishTravel: async () => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel_finish`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getDocumentsByTravelId: async idTravel => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/documents`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

};

export default TravelRequests;
