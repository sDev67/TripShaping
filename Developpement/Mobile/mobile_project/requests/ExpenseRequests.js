import { checkStatus, url_prefix } from "../utils";

const ExpenseRequests = {
    setExpense: (credentials) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then(res => res.json());
    }
};

export default ExpenseRequests;