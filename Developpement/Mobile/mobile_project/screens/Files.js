import { useEffect } from 'react';

import { url_prefix } from "../utils";
import { WebView } from 'react-native-webview';

const Files = ({ route, navigation }) => {

    const { document } = route.params;

    return (
        < WebView source={{ uri: `${url_prefix}/document/file/${document.id}` }} />
    )
}

export default Files;