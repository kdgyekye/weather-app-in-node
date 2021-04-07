const locationField = document.querySelector("#location");
const weatherForm = document.querySelector(".searchForm");

const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const message3 = document.querySelector("#message-3");
const localtime = document.querySelector("#localtime");
const weather_description = document.querySelector("#weather_description");
const temperature = document.querySelector("#temperature");
const headings = document.querySelector("#forecast-section");

const navLink = document.querySelector(".nav-link");

headings.style.display = "none";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locationField.value;
  const url = `/weather?address=${location}`;

  message2.textContent = null;
  //headings.textContent = null;
  /*temperature.textContent = null;
    weather_description.textContent = null;
    localtime.textContent = null;*/
  headings.style.display = "none";

  message1.textContent = "Loading Forecast Information...";
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message3.textContent = data.error;
      } else {
        message2.textContent = data.location;
        localtime.textContent = data.forecast.localtime;
        weather_description.textContent = data.forecast.weather_descriptions;
        temperature.textContent = `The temperature is currently ${data.forecast.temperature} degrees celsius but it feels like ${data.forecast.feelslike} degrees celsius`;
      }
    });
    message1.textContent = null;
    locationField.value = null;
    headings.style.display = "block";
    /*localtime.textContent = null;
    weather_description.textContent = null
    temperature.textContent = null*/
  });
});

function activeLink(elem) {
    var a = document.getElementsByTagName('a')
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('active')
    }
    elem.classList.add('active');
}
