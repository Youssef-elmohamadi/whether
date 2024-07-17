function getData() {
  let apiKey = "b17e4ea1c011bca362321ed0a87838a8";
  let city = document.querySelector(".city").value;
  if (!city) {
    console.error("please enter your city ");
    return;
  }
  let currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(currentURL)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("sorry not ok ");
      } else {
        return Response.json();
      }
    })
    .then((data) => {
      console.log(data);
      showWether(data);
    })
    .catch((error) => console.error("sorry not ok "));
  fetch(forecastURL)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("sorry not ok");
      } else {
        return Response.json();
      }
    })
    .then((data) => {
      showForecast(data.list);
    })
    .catch((error) => {
      console.error("sorry not ok" + error);
    });
}

function showWether(data) {
  let tempDiv = document.querySelector(".temp");
  let iconCode = data.weather[0].icon;
  let img = document.querySelector(".img");
  img.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  tempDiv.innerHTML = `<p class="degree">${Math.round(
    data.main.temp - 273.15
  )} °C</p>
   <p> ${data.name} ${data.sys.country}</p>`;
  let details = document.querySelector(".details");
  details.innerHTML = `<div class="details">
        <p>${data.weather[0].description}</p>
      </div>`;
  showImg();
}
function showForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  hourlyForecastDiv.innerHTML = "";

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
      <div class="hourly-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
      </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImg() {
  let img = document.querySelector(".img");
  img.style.display = "block";
}
