class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelslike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
    this.maxTemp = document.getElementById('w-temp-max');
    this.minTemp = document.getElementById('w-temp-min');
  }

  paint(weather) {
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].main;
    this.string.textContent = `${weather.main.temp} °C`;
    this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Relative Humidity : ${weather.main.humidity}`;
    this.feelslike.textContent = `Feels_Like : ${weather.main.feels_like}`;
    // this.humidity.textContent = `Relative Humidity : ${weather.main.humidity}`;
    this.wind.textContent = `Wind Speed: ${weather.wind.speed}`;
    this.maxTemp.textContent = `Max.Temperature : ${weather.main.temp_max} °C`;
    this.minTemp.textContent = `Min.Temperature : ${weather.main.temp_min} °C`;
  }
}

// {
//     "coord": {
//         "lon": 19.0399,
//         "lat": 47.498
//     },
//     "weather": [
//         {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 291.91,
//         "feels_like": 291.09,
//         "temp_min": 291.4,
//         "temp_max": 292.08,
//         "pressure": 1018,
//         "humidity": 48
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 3.58,
//         "deg": 0,
//         "gust": 3.58
//     },
//     "clouds": {
//         "all": 68
//     },
//     "dt": 1622370720,
//     "sys": {
//         "type": 2,
//         "id": 2009313,
//         "country": "HU",
//         "sunrise": 1622343130,
//         "sunset": 1622399457
//     },
//     "timezone": 7200,
//     "id": 3054643,
//     "name": "Budapest",
//     "cod": 200
// }
