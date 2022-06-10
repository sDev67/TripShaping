export function changeDateFormat(date) {
  return (
    date.substring(8, 10) +
    "/" +
    date.substring(5, 7) +
    "/" +
    date.substring(0, 4)
  );
}

export function addDays(date, days) {
  var dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + days);
  console.log(date);
  console.log(dateObject);

  return (
    (dateObject.getDate() < 10
      ? "0" + dateObject.getDate()
      : dateObject.getDate()) +
    "/" +
    (dateObject.getMonth() + 1 < 10
      ? "0" + (dateObject.getMonth() + 1)
      : dateObject.getMonth() + 1) +
    "/" +
    dateObject.getFullYear()
  );
}
