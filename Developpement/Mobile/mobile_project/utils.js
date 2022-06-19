export const GOOGLE_MAPS_APIKEY = 'AIzaSyBB-rIwC_N_-sX3JVt6HUzvAP4jHc_2jAs';

export const checkStatus = res => {
    if (res.ok) {
        return res;
    } else {
        return res.text()
            .then(msg => { throw new Error(msg); });
    }
};

export const url_prefix = 'http://cdad181.iutrs.unistra.fr:4200';
//export const url_prefix = 'http://192.168.1.56:4200';


