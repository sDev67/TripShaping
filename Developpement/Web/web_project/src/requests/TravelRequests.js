import { checkStatus, url_prefix } from "../utils";

const TravelRequests = {
  getAllTravel: () => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // Pas besoin du token pour cette requete
  getPublishedTravel: () => {
    return fetch(`${url_prefix}/travelpublished`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // Pas besoin du token pour cette requete
  getLastTenPublishedTravel: () => {
    return fetch(`${url_prefix}/getLastTravels`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  getTravelByid: (idTravel) => {
    return fetch(`${url_prefix}/travel/${idTravel}`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // Pas besoin du token pour cette requete
  getPointsOfTravel: (idTravel) => {
    return fetch(`${url_prefix}/travel/${idTravel}/points`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // Pas besoin du token pour cette requete
  getStepsOfTravel: (idTravel) => {
    return fetch(`${url_prefix}/travel/${idTravel}/steps`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // Pas besoin du token pour cette requete
  getRoutesOfTravel: (idTravel) => {
    return fetch(`${url_prefix}/travel/${idTravel}/routes`, {

    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  createTravel: ({ name, UserId }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name, UserId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  copyTravel: ({ TravelId, UserId }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ TravelId, UserId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getMembersOfTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/members`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getJournalEntriesOfTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/journalEntries`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getPhotosOfTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/photos`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getAllDocumentsByTravelId: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/documents`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addPoint: ({ title, latitude, longitude, description, descriptionHTML, category, TravelId }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/point`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        latitude,
        longitude,
        description,
        descriptionHTML,
        category,
        TravelId,
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addStep: ({ title, latitude, longitude, description, descriptionHTML, duration, TravelId }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        latitude,
        longitude,
        description,
        descriptionHTML,
        duration,
        TravelId,
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addRoute: ({ travelType, start, finish, TravelId }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ travelType, start, finish, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravel: ({ TravelId, name, picture, activated, budget, infos, finished, albumURL }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        TravelId,
        name,
        picture,
        activated,
        budget,
        infos,
        finished,
        albumURL
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelStatus: ({ TravelId, status, startDate }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ status, startDate }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelDate: ({ TravelId, startDate }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ startDate }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelCryptedName: ({ TravelId, albumURL }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ TravelId, albumURL }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelPublishItinerary: ({ TravelId, toPublish }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ toPublish }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelTrackPosition: ({ TravelId, positionAgree }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ positionAgree }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removePoint: (idPoint) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/point/${idPoint}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },
  deleteTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },

  removeStep: (idStep) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idStep}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },

  removeRoute: (idRoute) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/route/${idRoute}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },
  getTasksOfTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/tasks`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getLabelsOfTravel: (idTravel) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/labels`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addTask: ({ title, date, TravelId }) => {
    const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, date, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addLabel: ({ title, TravelId }) => {
    const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/label`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removeTask: (TaskId) => {
    const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/task/${TaskId}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },
  removeLabel: (LabelId) => {
    const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/label/${LabelId}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },
};

export default TravelRequests;
