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
