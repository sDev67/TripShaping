import { checkStatus, url_prefix } from "../utils";

const UserRequests = {
  getAllUsers: () => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  addUser: ({ firstname, lastname, password, email }) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ firstname, lastname, password, email }),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  removeUser: (idUser) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/user/${idUser}`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then(checkStatus);
  },

  getMembers: (idUser) => {
    const token = window.localStorage.getItem('token');
    return fetch(`${url_prefix}/user/${idUser}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    })
      .then(checkStatus)
      .then((res) => res.json());
  }
};

export default UserRequests;
