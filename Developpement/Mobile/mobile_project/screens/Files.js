import { useEffect, useState } from 'react';
import { url_prefix } from "../utils";
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useAuth } from '../requests/Auth'
import UserRequests from '../requests/UserRequests';
import { isNull } from 'lodash';

const Files = ({ route, navigation }) => {

    const { document } = route.params;
    let token = getToken();

    return (
        <>
            {typeof token == "string" &&
                < WebView source={{
                    uri: `${url_prefix}/document/file/${document.id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                }} />

            }
        </>
    )
}

const getToken = async () => {
    return await AsyncStorage.getItem('token');
}

export default Files;