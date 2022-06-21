import { checkStatus, url_prefix } from "../utils";

const PointRequests = {
    getPointById: PointId => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/point/${PointId}`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default PointRequests;