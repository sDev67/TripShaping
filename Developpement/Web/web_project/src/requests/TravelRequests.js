import { checkStatus, url_prefix } from "../utils";
import axios from 'axios';

const TravelRequests = {
    getPointsByTravel: idTravel => {
        console.log(idTravel)
        axios.get(`${url_prefix}/travel/${idTravel}/points`)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                // handle error
            })
    },
};

export default TravelRequests;