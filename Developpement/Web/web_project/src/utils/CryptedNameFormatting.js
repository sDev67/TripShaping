import { checkStatus, url_prefix } from "../utils";
import TravelRequests from "../requests/TravelRequests";
import { useQuery, useQueryClient, useMutation } from "react-query";

export function cryptedNameToTravelId(cryptedName) {
  cryptedName = cryptedName.toString();

  let idTravel = cryptedName.substring(cryptedName.indexOf("$") + 1);
  idTravel = parseInt(idTravel);
  if (idTravel != null) {

    const token = window.localStorage.getItem('token');
    fetch(`${url_prefix}/travel/${idTravel}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(checkStatus)
      .then((res) => res.json())
      .then((res) => {


        if (res.albumURL != cryptedName) {

          throw new Error("");

        }

      })
    return idTravel;
  }
}

export const generateName = (travelId) => {
  let alphabet =
    "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9JjKkLl&MmNnOoPpQqRrSsTtUu_VvàWwXxYyZz";
  var min = 5;
  var max = 10;
  var rand = Math.floor(Math.random() * (max - min + 1)) + min;

  let cryptedName = "";

  for (var i = 0; i < rand; i++) {
    cryptedName +=
      alphabet[Math.floor(Math.random() * (alphabet.length - 0 + 1)) + 0];
  }

  cryptedName += "$" + travelId;

  return encodeURI(cryptedName);
};
