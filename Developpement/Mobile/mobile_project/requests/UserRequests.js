import { checkStatus, url_prefix } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserRequests = {
    getMembers: async (idUser) => {
        const token = await AsyncStorage.getItem('token');
        return fetch(`${url_prefix}/user/${idUser}/members`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            },
        })
            .then(checkStatus)
            .then((res) => res.json());
    }
};

export default UserRequests;
