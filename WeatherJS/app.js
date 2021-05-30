const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const uiObj = new UI();

document.addEventListener('DOMContentLoaded', getWeather());

const changeBtn = document.getElementById('w-change-btn');
changeBtn.addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);
  storage.setLocationData(city, state);
  getWeather();
  $('#locationModal').modal('hide');
});

//weather.changeLocation('Budapest', 'Hungary');
function getWeather() {
  weather
    .getWeather()
    .then((data) => uiObj.paint(data))
    .catch((err) => console.log(err));
}
