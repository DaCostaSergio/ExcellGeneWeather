import React, { Component } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';

class WeatherDataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      temp: null,
      tempMax : null,
      tempMin: null,
      wind:null,
      country: null,
      description: null,
      requestcity: null,
      city: 'Lausanne',
      error: ''
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    const apiKey = 'e47181ddd099153e1ba56bd6f5521709';
    const { city } = this.state;

    if (city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => {
          const weather = response.data.weather[0].main;
          const description = response.data.weather[0].description;
          const wind = Math.floor(response.data.wind.speed * 3,6)
          const tempKelvin = response.data.main.temp;
          const tempMax = Math.floor(response.data.main.temp_max - 273.15 );
          const tempMin = Math.floor(response.data.main.temp_min - 273.15);
          const country = response.data.sys.country;
          const requestcity = response.data.name;
          const tempCelsius = Math.floor(tempKelvin - 273.15);


          this.setState({
            weather,
            description,
            temp: tempCelsius,
            tempMax,
            tempMin,
            country,
            requestcity,
            wind,
            error: ''
          });
        })
        .catch((error) => {
          console.log('Une erreur s\'est produite lors de la récupération des données météorologiques:', error);
          if (error.response) {
            if (error.response.status === 404) {
              this.setState({ error: error.response.data.message });
            } else if (error.response.status === 401) {
              this.setState({ error: error.response.data.message });
            } else {
              this.setState({ error: 'Request issue' });
            }
          }
        });
    } else {
      this.setState({ error: 'Please enter a city' });
    }
  };

  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleButtonClick = () => {
    this.fetchWeatherData();
  };

  render() {
    const { weather, temp, wind, requestcity, country, description, tempMax,tempMin, error } = this.state;

    return (
      <div className='mt-12'>
        {requestcity && (
          <div className=''>
            <div className='rounded-2xl'>
              <WeatherDisplay
                weather={weather}
                temp={temp}
                tempMax = {tempMax}
                tempMin = {tempMin}
                wind= {wind}
                requestcity={requestcity}
                country={country}
                description={description}
                error={error}
              />
            </div>
          </div>
        )}
        <div className=''>
          <div className=''>
            <label htmlFor='city' className='mb-2 text-sm font-SourceSansPro text-gray-900 sr-only dark:text-white'>
              Search
            </label>
            <div className='flex flex-col items-center justify-center pt-20' >
              <div className=' relative '>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg aria-hidden='true' className='w-5 h-5 text-gray-500 dark:text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </div>
                <input
                  type='text'
                  id='city'
                  onChange={this.handleCityChange}
                  placeholder='Choose a city'
                  className='block  w-64 md:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <button onClick={this.handleButtonClick}
                className='
                          text-white font-SourceSansPro text-sm
                          bg-[#57A0EE] hover:bg-blue-800
                          focus:ring-4 focus:outline-none focus:ring-blue-300 
                          font-medium rounded-lg  
                          px-4 py-2
                          mt-3 lg:mt-5
                          w-64 md:w-96'
              >
                Search
              </button>

            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default WeatherDataFetcher;