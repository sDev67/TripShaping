import { Label } from "@mui/icons-material";
import { checkStatus, url_prefix } from "../utils";

const TravelRequests = {
  getAllTravel: () => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  getPublishedTravel: () => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travelpublished`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  getTravelByid: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getPointsOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/points`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  createTravel: ({ name, UserId }) => {
    //const token = window.localStorage.getItem('token');
    console.log(name);
    return fetch(`${url_prefix}/travel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name, UserId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getStepsOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/steps`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getRoutesOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/routes`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getMembersOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/members`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getJournalEntriesOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/journal_entries`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getPhotosOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/photos`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getAllDocumentsByTravelId: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/documents`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addPoint: ({
    title,
    latitude,
    longitude,
    description,
    descriptionHTML,
    category,
    TravelId,
  }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/point`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
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

  addStep: ({
    title,
    latitude,
    longitude,
    description,
    descriptionHTML,
    duration,
    category,
    TravelId,
  }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        latitude,
        longitude,
        description,
        descriptionHTML,
        category,
        duration,
        TravelId,
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addRoute: ({ travelType, start, finish, TravelId }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ travelType, start, finish, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravel: ({
    TravelId,
    name,
    picture,
    activated,
    budget,
    infos,
    finished,
  }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        TravelId,
        name,
        picture,
        activated,
        budget,
        infos,
        finished,
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelStatus: ({ TravelId, status }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ status }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelPublishItinerary: ({ TravelId, toPublish }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ toPublish }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelTrackPosition: ({ TravelId, positionAgree }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ positionAgree }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  updateTravel: ({
    TravelId,
    name,
    picture,
    activated,
    budget,
    infos,
    infosHTML,
    finished,
  }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        TravelId,
        name,
        picture,
        activated,
        budget,
        infos,
        infosHTML,
        finished,
      }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  updateTravelPublishItinerary: ({ TravelId, toPublish }) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ toPublish }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getTravel: (TravelId) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${TravelId}`, {
      //headers: {
      //    'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token
      //},
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removePoint: (idPoint) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/point/${idPoint}`, {
      method: "DELETE",
      // headers: {
      //     Authorization: 'Bearer ' + token
      // },
    }).then(checkStatus);
  },

  removeStep: (idStep) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/step/${idStep}`, {
      method: "DELETE",
      // headers: {
      //     Authorization: 'Bearer ' + token
      // },
    }).then(checkStatus);
  },

  removeRoute: (idRoute) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/route/${idRoute}`, {
      method: "DELETE",
      // headers: {
      //     Authorization: 'Bearer ' + token
      // },
    }).then(checkStatus);
  },
  getTasksOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/tasks`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getLabelsOfTravel: (idTravel) => {
    //const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/travel/${idTravel}/labels`, {
      // headers: {
      //     Authorization: 'Bearer ' + token
      // }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addTask: ({ title, date, TravelId }) => {
    //const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, date, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addTask: ({ title, date, TravelId }) => {
    //const token = window.localStorage.getItem('token');
    console.log(JSON.stringify({ title, date, TravelId }));
    return fetch(`${url_prefix}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, date, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  addLabel: ({ title, TravelId }) => {
    //const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/label`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ title, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removeTask: (TaskId) => {
    //const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/task/${TaskId}`, {
      method: "DELETE",
    }).then(checkStatus);
  },
  removeLabel: (LabelId) => {
    //const token = window.localStorage.getItem('token');

    return fetch(`${url_prefix}/label/${LabelId}`, {
      method: "DELETE",
    }).then(checkStatus);
  },
};

export default TravelRequests;
