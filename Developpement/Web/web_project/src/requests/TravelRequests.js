import { checkStatus, url_prefix } from "../utils";

const TravelRequests = {

    getAllTravel: ()=>{
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

    createTravel: ({name}) => {
        //const token = window.localStorage.getItem('token');
        console.log(name)
        return fetch(`${url_prefix}/travel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ name })
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

    addPoint: ({ title, latitude, longitude, description, category, TravelId }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/point`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title, latitude, longitude, description, category, TravelId })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    addStep: ({ title, latitude, longitude, description, duration, category, TravelId }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/step`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title, latitude, longitude, description, category, duration, TravelId })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    removePoint: idPoint => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/point/${idPoint}`, {
            method: 'DELETE',
            // headers: {
            //     Authorization: 'Bearer ' + token
            // },
        })
            .then(checkStatus);
    },

    removeStep: idStep => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/step/${idStep}`, {
            method: 'DELETE',
            // headers: {
            //     Authorization: 'Bearer ' + token
            // },
        })
            .then(checkStatus);
    },
};

export default TravelRequests;