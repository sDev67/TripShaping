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

    createTravel: ({ name }) => {
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

    addRoute: ({ travelType, start, finish, TravelId }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/route`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ travelType, start, finish, TravelId })
        })
            .then(checkStatus)
            .then(res => res.json());
    },

    updateTravel: ({ TravelId, name, picture, activated, budget, infos, finished }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${TravelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ TravelId, name, picture, activated, budget, infos, finished })
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

    removeRoute: idRoute => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/route/${idRoute}`, {
            method: 'DELETE',
            // headers: {
            //     Authorization: 'Bearer ' + token
            // },
        })
            .then(checkStatus);
    },
    getAllTask: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/task`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    getAllLabel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/labels`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    addTask: ({ title, date, TravelId}) => {
        //const token = window.localStorage.getItem('token');
     
        return fetch(`${url_prefix}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title,date,TravelId })
        })
            .then(checkStatus)
            .then(res => res.json());
    },
    addLabel: ({ title, TravelId}) => {
        //const token = window.localStorage.getItem('token');
     
        return fetch(`${url_prefix}/label`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title,TravelId })
        })
            .then(checkStatus)
            .then(res => res.json());
    },
};

export default TravelRequests;