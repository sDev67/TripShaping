import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseRequests = {
    setExpense: async (credentials) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then(res => res.json());
    }
};

export default ExpenseRequests;