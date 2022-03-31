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

    getRoutesOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/routes`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    }
};

export default TravelRequests;
