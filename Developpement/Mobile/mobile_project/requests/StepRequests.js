import { checkStatus, url_prefix } from "../utils";

const StepRequests = {
    getStepById: stepId => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/step/${stepId}`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default StepRequests;