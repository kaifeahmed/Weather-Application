let weather = {
  apiKey: "62f697eeae6fb831a7453790cd5f307c",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units=metric&appid="
      + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
    document.body.style.backgroundImage = "url(https://source.unsplash.com/random/?" + name + "&1)";
    document.querySelector(".weather").classList.remove("loading");
  },

  searchWeather: function() {
    this.fetchWeather(document.querySelector('.search-bar').value);
  }
};

document.querySelector('.search button').addEventListener("click", () => {
  weather.searchWeather();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.searchWeather();
  }
});

weather.fetchWeather('New York');