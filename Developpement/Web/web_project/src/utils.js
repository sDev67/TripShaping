export const GOOGLE_MAPS_APIKEY = "AIzaSyDEVNIIS4W08GaTEYt_OfJ0mfA4gB0mxgI";

export const checkStatus = (res) => {
  if (res.ok) {
    return res;
  } else {
    return res.text().then((msg) => {
      throw new Error(msg);
    });
  }
};

export const url_prefix = "http://localhost:4200";
// export const url_prefix = "http://cdad181.iutrs.unistra.fr:4200";
