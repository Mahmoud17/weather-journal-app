/* Global Variables */
const key = "efb1a5a0d2ccb1e97fa9f94f966f4f5a";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const request = async (url, area, key) => {
  const response = await fetch(url + area + "&appid=" + key);
  const data = await response.json();
  return data;
};

document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const dataObject = {};
  dataObject.date = newDate;
  dataObject.userResponse = feelings;

  request(baseUrl, zip, key)
    .then((res) => {
      dataObject.temperature = res.main.temp;
      fetch("http://localhost:3000/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });
    })
    .then(async () => {
      const res = await fetch("http://localhost:3000/data");
      const data = await res.json();
      document.getElementById("date").innerHTML = data.date;
      document.getElementById("temp").innerHTML = data.temperature;
      document.getElementById("content").innerHTML = data.userResponse;
    });
});
