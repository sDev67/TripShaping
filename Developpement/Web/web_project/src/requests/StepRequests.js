import { checkStatus, url_prefix } from "../utils";

const StepRequests = {
    updateStepLocationById: ({latitude, longitude, idPoint }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/step/${idPoint}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body:JSON.stringify({latitude, longitude})
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    updateStepInfoById: ({title, category, description, idStep }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/step/${idStep}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body:JSON.stringify({title, category, description})
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default StepRequests;