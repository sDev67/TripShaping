import { checkStatus, url_prefix } from "../utils";

const PositionRequests = {
    setPosition: (credentials) => {

        return fetch(`${url_prefix}/position`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
    }
};

export default PositionRequests;