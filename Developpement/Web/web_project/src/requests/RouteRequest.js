import { checkStatus, url_prefix } from "../utils";

const RouteRequest = {
    updateRouteById: ({ idRoute, travelType }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/route/${idRoute}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ idRoute, travelType })
        })
            .then(checkStatus)
            .then(res => res.json())
    },
}

export default RouteRequest;