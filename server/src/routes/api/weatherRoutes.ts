import { Router } from 'express';
const router = Router();
// import path from 'path';

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { Request, Response } from 'express'; // Add this line

// TODO: POST Request with city name to retrieve weather data

  router.post('/', async (req: Request, res: Response) => {
    const city = req.body.cityName;
    if (req.body) {
      const weather = await WeatherService.getWeatherForCity(city);
      res.json(weather);
    } else {
      res.send('Error in adding feedback');
    }
  });

  // TODO: GET weather data from city name
  // router.post('/', async (req: Request, res: Response) => {
  //   console.info(`${req.method} request received for weather data`);
  //   const data = await WeatherService.getWeatherForCity(req.body);
  //   console.log('weatherData: ', data);
  //   res.json(data);
  // });

  // class WeatherService {
  //   static async getWeather(city: string) {
  //     // Implementation to fetch weather data for the given city
  //   }
  //   // Other methods and properties
  // }

  // Ensure the route handler is properly closed
 

//   const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
//   fetch(queryURL)
//    .then(response => response.json())
//    .then(data => {
//       console.log('weatherData: ', data);
//       res.json(data);
//     })
//     .catch(error => {
//       console.error('Error fetching weather data:', error);
//       res.status(500).json({ message: 'Error fetching weather data', error });
//     });

  // TODO: save city to search history
  router.post('/history', async (_req, res) => {
    const saveHistory = await HistoryService.addCity(_req.body.cityName);
    res.json(saveHistory);
  });

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const cityHistory = await HistoryService.getCities();

    return res.status(200).json(cityHistory);
  } catch (error) {
    console.error('Error getting city:', error);
    return res.status(500).json({ message: 'Error getting city', error });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { //(req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: 'City ID is required' });
      return;
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ message: 'City deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
