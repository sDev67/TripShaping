import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Files = () => {
    return (
        < WebView source={{ uri: 'http://gahp.net/wp-content/uploads/2017/09/sample.pdf' }} />
    )
}

export default Files;