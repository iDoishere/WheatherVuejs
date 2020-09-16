export const calcTempAvrageFiveDaysCast = data => {
  let arr = [];
  for (let val of data) {
    const maxTemp = val.Temperature.Maximum.Value;
    const minTemp = val.Temperature.Minimum.Value;
    const sum = (maxTemp + minTemp) / 2;
    const newSumFahrenheit = ((sum - 32) * 5) / 9; //convert to celsius
    arr.push(Math.floor(newSumFahrenheit));
  }
  return arr;
};

export const calcFar = data => {
  let arr = [];
  for (let val of data) {
    const maxTemp = val.Temperature.Maximum.Value;
    const minTemp = val.Temperature.Minimum.Value;
    const sum = (maxTemp + minTemp) / 2;
    arr.push(Math.floor(sum));
  }
  return arr;
};
export const getFiveDaysDate = data => {
  let arrDate = [];
  for (let val of data) {
    let dateEpock = new Date(0);
    dateEpock.setUTCSeconds(val.EpochDate);
    arrDate.push(getDay(dateEpock));
  }
  return arrDate;
};
const getDay = dateEpock => {
  let day = "";
  switch (dateEpock.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
};
