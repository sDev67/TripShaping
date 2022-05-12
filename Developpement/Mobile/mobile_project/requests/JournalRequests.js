import { checkStatus, url_prefix } from "../utils";

const JournalRequests = {
    getJournalByTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/journalEntries`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
};

export default JournalRequests;