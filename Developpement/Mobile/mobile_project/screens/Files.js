import { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Files = ({ route, navigation }) => {

    const { document } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: document.title });
    }, [])

    return (
        < WebView source={{ uri: document.url }} />
    )
}

export default Files;