import { checkStatus, url_prefix } from "../utils";

const MemberRequests = {
  getAllMembers: () => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/members`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getMemberById: (idMember) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/member/${idMember}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getPositionOfMember: (idMember) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/member/${idMember}/positions`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addMember: ({ name, userLogin, TravelId }) => {
    if (name === undefined) {
      name = userLogin;
    }
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ name, userLogin, TravelId }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removeMember: (idMember) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/member/${idMember}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },
};

export default MemberRequests;
