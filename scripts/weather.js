//https://github.com/public-apis/public-apis#weather

$(document).ready(() => {
  callApi();
  setInterval(callApi, 3600000); //calls every 1 hr
});

callApi = () => {
  apikey = "a193101b69b5a70a289db391cd2981cc";
  cityId = "1279233"; //ID for ahmedabad india, retreived from open map weather api site
  reqUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${apikey}`;

  //fetch method from https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b
  // GET Request.
  fetch(reqUrl)
    // Handle success
    .then((response) => response.json()) // convert to json
    .then((json) => updateWeather(json)) //print data to console
    .catch((err) => console.log("Request Failed", err)); // Catch errors */
};

updateWeather = (json) => {
  celcius = json.main.temp;
  htmlStr = `&#9728;Current Weather: ${celcius}<span>&#176</span>C/${celToFaren(
    celcius
  )}<span>&#176</span>F`;

  //update the inner HTML of weather
  $(".weather").html(htmlStr);
};

//converts from celcius to farenheit
celToFaren = (cTemp) => {
  var fTemp = (cTemp * 9) / 5 + 32;
  return fTemp.toFixed(2);
};
