import { checkStatus, url_prefix } from "../utils";

const PhotoRequests = {

    sendPhoto: (formData) => {
        return fetch(`${url_prefix}/photo`, {
            method: 'POST',
            body: formData,
            headers: {
                //  Authorization: 'Bearer ' + token
            },
        })
            .then(checkStatus)
            .then((res) => res.text());
    }
};

export default PhotoRequests;
'multipart/form-data'