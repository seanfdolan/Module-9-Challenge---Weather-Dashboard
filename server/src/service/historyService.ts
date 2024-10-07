// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
  constructor(name: string, id: string, latitude: number, longitude: number) {
    this.name = name;
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

import fs from 'fs/promises'; // Import fs module

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read () {
    const data = await fs.readFile('searchHistory.json', 'utf8');
    return data;
  }
  // private async read() {}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const jsonData = JSON.stringify(cities);
    await fs.writeFile('searchHistory.json', jsonData, 'utf8');
  }
  // private async write(cities: City[]) {}

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read();
    return JSON.parse(data) as City[];
  }
  // async getCities() {}

  // TODO Define an addCity method that adds a city to the searchHistory.json file  
  private async fetchLocationData(city: string) {
    // Mock implementation, replace with actual API call
    return { name: city, id: 'some-id' };
  }

  async addCity(city: City) {
        const locationData = await this.fetchLocationData(city.name); // Fetch location data
        const newCity = new City(locationData.name, locationData.id, 0, 0); // Replace 0, 0 with actual latitude and longitude
        const cities = await this.getCities(); // Get existing cities
        cities.push(newCity); // Add new city to the array
        await this.write(cities); // Write updated cities to file
    }
  // async addCity(city: string) {}

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city) => city.id!== id);
    await this.write(updatedCities);   // return JSON.stringify(cities) as City{};
  }
  // async removeCity(id: string) {}
}

export default new HistoryService();