import { checkStatus, url_prefix } from "../utils";

const PointRequests = {
    updatePointLocationById: ({ latitude, longitude, idPoint }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/point/${idPoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ latitude, longitude })
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    updatePointInfoById: ({ title, category, description, idPoint, StepId, day }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/point/${idPoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title, category, description, StepId, day })
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default PointRequests;