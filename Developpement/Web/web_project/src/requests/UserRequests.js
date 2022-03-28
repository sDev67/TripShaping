import { checkStatus, url_prefix } from "../utils";

const UserRequests = {

    getAllUsers: ()=>{
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/users`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    
};

export default UserRequests;