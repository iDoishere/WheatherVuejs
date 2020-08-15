 export const calcTempAvrageFiveDaysCast = (data) => {

  let arr = [];

  for (let val of data) {
    const maxTemp = val.Temperature.Maximum.Value;
    const minTemp = val.Temperature.Minimum.Value;
    const sum = (maxTemp + minTemp) / 2;

    const newSumFahrenheit = ((sum - 32) * 5) / 9; //convert to celsius
    const celsius = newSumFahrenheit
    arr.push(celsius)
  }
  return arr;


}
