export function cryptedNameToTravelId(cryptedName) {
  cryptedName = cryptedName.toString();

  let idTravel = cryptedName.substring(cryptedName.indexOf("$") + 1);
  idTravel = parseInt(idTravel);

  return idTravel;
}
