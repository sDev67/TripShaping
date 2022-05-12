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
    sendMessage: (credentials) => {

        return fetch(`${url_prefix}/journal_entry`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
    }
};

export default JournalRequests;