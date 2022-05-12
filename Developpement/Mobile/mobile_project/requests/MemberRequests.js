import { checkStatus, url_prefix } from "../utils";

const MemberRequests = {
    getMemberById: memberId => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/member/${memberId}`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    getMembers: () => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/members`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    }
};

export default MemberRequests;