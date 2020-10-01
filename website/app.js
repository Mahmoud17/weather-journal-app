/* Global Variables */
const key = "&appid=efb1a5a0d2ccb1e97fa9f94f966f4f5a&units=imperial";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const dataObject = {};
dataObject.date = newDate;

const getWeatherData = async (url, area, apiKey) => {
  const response = await fetch(url + area + apiKey);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const postData = async (res) => {
  dataObject.temperature = res.main.temp;
  fetch("http://localhost:3000/", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObject),
  });
};

const updateUI = async () => {
  const res = await fetch("http://localhost:3000/data");

  try {
    const data = await res.json();
    console.log(data);
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temperature;
    document.getElementById("content").innerHTML = data.userResponse;
  } catch (error) {
    console.log("Error: ", error);
  }
};

document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  dataObject.userResponse = feelings;

  getWeatherData(baseUrl, zip, key).then(postData).then(updateUI);
});
