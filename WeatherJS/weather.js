class Weather {
  constructor(city, state) {
    this.api_key = '646b7a1c6a9da5b2d93f4a868761bd92';
    this.city = city;
    this.state = state;
  }
  //api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.api_key}

  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.api_key}&units=metric`
    );
    const responseData = await response.json();
    return responseData;
  }

  async changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
