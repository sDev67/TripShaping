import { checkStatus, url_prefix } from "../utils";

const PhotoRequests = {

    sendPhoto: (credentials) => {
        return fetch(`${url_prefix}/photo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
    }
};

export default PhotoRequests;
