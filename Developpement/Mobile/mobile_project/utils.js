export const GOOGLE_MAPS_APIKEY = 'AIzaSyCoR4sbD7mDwU_8Eghdygxh3g4rRi0XxVs';

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


