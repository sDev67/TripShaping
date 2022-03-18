import { checkStatus, url_prefix } from "../utils";

const TravelRequests = {
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
    updateTravel: ({TravelId, name, picture, activated, budget, infos, finished }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${TravelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({TravelId, name, picture, activated, budget, infos, finished })
        })
            .then(checkStatus)
            .then(res => res.json());
    },
    getTravel: TravelId => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${TravelId}`, {
           
            //headers: {
            //    'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            //},
           
        })
            .then(checkStatus)
            .then(res => res.json());
    },
};

export default TravelRequests;