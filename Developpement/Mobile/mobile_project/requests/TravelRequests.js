import { checkStatus, url_prefix } from "../utils";

const TravelRequests = {

    getAllTravel: () => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getTravelByid: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    updateTravel: ({ TravelId, status, startDate }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${TravelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ status, startDate })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    getPointsOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/points`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getStepsOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/steps`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getRoutesOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/routes`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getMembersOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/members`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getInPreparationTravel: () => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel_preparation`, {

            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getCurrentTravel: () => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel_current`, {

            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getDocumentsByTravelId: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/documents`, {

            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

};

export default TravelRequests;
