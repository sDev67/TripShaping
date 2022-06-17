import { checkStatus, url_prefix } from "../utils";

const StepRequests = {
  getStepById: (id) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${id}`, {
      headers: {
        // Authorization: 'Bearer ' + token
      },
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateStepLocationById: ({ latitude, longitude, idPoint }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idPoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateStepInfoById: ({ title, duration, category, description, descriptionHTML, idStep }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idStep}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, duration, category, description, descriptionHTML }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getPointsOfStep: (idStep) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idStep}/points`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
};

export default StepRequests;
