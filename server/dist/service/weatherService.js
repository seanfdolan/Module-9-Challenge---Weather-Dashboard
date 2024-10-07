import dotenv from 'dotenv';
dotenv.config();
import dayjs from 'dayjs';
// TODO: Define a class for the Weather object
class weatherObject {
    // TODO: Define a constructor that takes city, country, latitude, and longitude as parameters
    constructor(city, country, latitude, longitude, temperature, description, icon, forecast, date) {
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperature = temperature;
        this.description = description;
        this.icon = icon;
        this.forecast = forecast;
        this.date = date;
    }
}
;
// TODO: Complete the WeatherService class
class WeatherService {
    getWeather(_city) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        this.cityName = "";
        this.baseURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
        this.APIKey = process.env.OPENWEATHERMAP_API_KEY || '11035ff7fdba26c94c071a83d308c99e';
    }
    // TODO: Create fetchLocationData method
    fetchLocationData(query) {
        return fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.APIKey}`)
            .then((response) => response.json())
            .then((data) => {
            if (data.length === 0) {
                throw new Error('City not found');
            }
            return {
                lat: data[0].lat,
                lon: data[0].lon,
                cityName: query,
            };
        });
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        return {
            lat: locationData.lat,
            lon: locationData.lon,
            cityName: locationData.cityName,
        };
    }
    //   // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery(cityName) {
        return `${cityName}, us`;
    }
    //   // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}&units=metric`;
    }
    //   // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const geocodeQuery = this.buildGeocodeQuery(this.cityName);
        const locationData = await this.fetchLocationData(geocodeQuery);
        return this.destructureLocationData(locationData);
    }
    //   // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const weatherQuery = this.buildWeatherQuery(coordinates);
        const response = await fetch(weatherQuery);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        if (!weatherData) {
            throw new Error('Weather data is undefined');
        }
        const currentWeather = weatherData[0];
        const forecastData = weatherData.daily.slice(1, 6);
        const forecastArray = this.buildForecastArray(forecastData);
        return new weatherObject(currentWeather.cityName, currentWeather.country, currentWeather.latitude, currentWeather.longitude, currentWeather.temperature, currentWeather.description, currentWeather.icon, forecastArray, currentWeather.date);
    }
    // // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        return {
            city: response.name,
            country: response.sys.country,
            latitude: response.coord.lat,
            longitude: response.coord.lon,
            temperature: response.main.temp,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
            forecast: [], // Add an empty array or appropriate forecast data
            date: dayjs(), // Add the current date or appropriate date
        };
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(weatherData) {
        const forecastArray = weatherData.map((dayData) => ({
            date: new Date(dayData.dt * 1000),
            temperature: dayData.temp.day,
            description: dayData.weather[0].description,
            icon: dayData.weather[0].icon,
        }));
        return forecastArray;
    }
    // // TODO: Complete getWeatherForCity method
    getWeatherForCity(city) {
        this.cityName = city;
        return this.fetchAndDestructureLocationData().then((coordinates) => this.fetchWeatherData(coordinates));
    }
}
;
export default new WeatherService();
// function buildForecastArray(currentWeather: any, weatherObject: typeof weatherObject, weatherData: any, arg3: any) {
//   throw new Error('Function not implemented.');
// }