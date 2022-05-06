import { checkStatus, url_prefix } from "../utils";

const DocumentRequest = {
  getDocumentsByTravelId: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/documents`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getDocumentsByPointId: (idPoint) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/point/${idPoint}/documents`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getDocumentsByStepId: (idStep) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idStep}/documents`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getDocumentsByRouteId: (idRoute) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/route/${idRoute}/documents`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  checkifDocumentExist: (documentName) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/document/check/${documentName}`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getDisplayedFile: (idDocument) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/document/file/${idDocument}`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    }).then(checkStatus);
    //.then(res => res.json())
  },

  // créer le fichier en base de donnée et dans le répertoire resources
  uploadFile: (formData) => {
    //const token = window.localStorage.getItem('token');
    // let formData = new FormData();
    // formData.append("title", title);
    return fetch(`${url_prefix}/document`, {
      method: "POST",
      body: formData,
      headers: {
        //  Authorization: 'Bearer ' + token
      },
    })
      .then(checkStatus)
      .then((res) => res.text());
  },

  removeDocument: (idDocument) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/document/${idDocument}`, {
      method: "DELETE",
      // headers: {
      //     Authorization: 'Bearer ' + token
      // },
    }).then(checkStatus);
  },
};

export default DocumentRequest;
