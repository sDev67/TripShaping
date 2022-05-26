import { checkStatus, url_prefix } from "../utils";

const UserRequests = {
    getMembers: (idUser) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/user/${idUser}/members`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //  Authorization: 'Bearer ' + token
            },
        })
            .then(checkStatus)
            .then((res) => res.json());
    }
};

export default UserRequests;
