import { useEffect, useState } from 'react';
import { url_prefix } from "../utils";
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Files = ({ route, navigation }) => {

    const { document } = route.params;

    return (

        < WebView source={{
            uri: `${url_prefix}/document/file/${document.id}`
        }} />


    )
}

const getToken = async () => {
    return await AsyncStorage.getItem('token');
}

export default Files;