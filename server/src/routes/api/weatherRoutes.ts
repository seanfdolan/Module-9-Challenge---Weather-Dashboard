import { Router } from 'express';
const router = Router();
// import path from 'path';

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { Request, Response } from 'express'; // Add this line

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // Ensure the route handler is properly closed
  const city = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(city);
  res.json(weatherData);

  // TODO: GET weather data from city name
  // const weatherData = WeatherService.getWeather(city);
  // res.json(weatherData);
  
    console.log('req.body: ', req.body);
    console.log('req.body.cityName: ', req.body.cityName);


  // router.post('/weather', async (req: Request, res: Response) => {
  //   res.render('weather', { title: 'Weather' }); // Change to use the view name directly
  //   res.render(path.join(__dirname, '../../views/weather.ejs'), { title: 'Weather' });
  // });

  router.post('/weather', async (req: Request, res: Response) => {
    const city = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
  });

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
  HistoryService.addCity(city);
  res.json({ message: 'City saved' });

  router.get('/api/weather/history', async (_req, res) => {
    const cityHistory = await HistoryService.getCities();
    res.json(cityHistory);
  });
});

// TODO: GET search history
router.get('/api/weather/history', async (_req, res) => {
  try {
    const cityHistory = await HistoryService.getCities();

    return res.status(200).json(cityHistory);
  } catch (error) {
    console.error('Error getting city:', error);
    return res.status(500).json({ message: 'Error getting city', error });
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {
//   try {
//     const requestedID: string = req.params.id;

//     const cityToDelete = await HistoryService.removeCity(requestedID);
//     const parsedCity: City[] = JSON.parse(cityToDelete);

//     const filteredCity = parsedContacts.filter(
//       (city: { id: string }) => city.id !== requestedID
//     );

//     if (parsedCity.length === filteredCity.length) {
//       return res.status(404).json('No match found');
//     }
    
//     await fs.promises.writeFile(
//       '/history/:id', JSON.stringify(filteredCity, null, 2)
//     );
//     return res.status(200).json({ message: 'City deleted' });
//     } catch (error) {
//       console.error('Error deleting city:', error);
//       return res.status(500).json({ message: 'Error deleting city', error });
//     }
//   });

export default router;

// Compare this snippet from OneDrive/Desktop/Module%209%20Challenge%20-%20Weather%20Dashboard/client/src/index.html:   WHAT