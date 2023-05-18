import axios from 'axios';
import React, { Component } from 'react';


import Cloudly from '../Icons/WeatherIconCloudly'
import Sun from '../Icons/WeatherIconSun'
import Rain from '../Icons/WeatherIconRain'
import Thunder from '../Icons/WeatherIconThunder'

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            temp: null,
            country: null,
            description: null,
            requestcity: null,
            city: 'Lausanne',
            error: ''
        };
    }

    componentDidMount() {
        this.fetchWeatherData(); // Appeler la méthode fetchWeatherData lors du montage du composant
    }
    fetchWeatherData = () => {
        const apiKey = 'e47181ddd099153e1ba56bd6f5521709';
        const { city } = this.state;

        if (city) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .then(response => {
                    const weather = response.data.weather[0].main;
                    const description = response.data.weather[0].description;
                    const tempKelvin = response.data.main.temp;
                    const country = response.data.sys.country;
                    const requestcity = response.data.name;
                    const tempCelsius = Math.floor(tempKelvin - 273.15);

                    this.setState({
                        weather,
                        description,
                        temp: tempCelsius,
                        country,
                        requestcity,
                        error: ''
                    });
                })
                .catch(error => {
                    console.log('Une erreur s\'est produite lors de la récupération des données météorologiques:', error);
                    if (error.response) {
                        if (error.response.status === 404) {
                            this.setState({ error: error.response.data.message });
                        }
                        else if (error.response.status === 401) {
                            this.setState({ error: error.response.data.message });
                        }
                        else {
                            this.setState({ error: 'Request issue' })
                        }
                    }
                });
        } else {
            this.setState({ error: 'Please enter a city' });
        }

    }

    handleCityChange = (event) => {
        this.setState({ city: event.target.value });
    }

    handleButtonClick = () => {
        this.fetchWeatherData();
    }

    render() {
        const { weather, temp, requestcity, country, description, city, error } = this.state;

        return (
            <div className=''>
                <div className="p-10"  >
                    <h1 className="font-SourceSansPro font-bold text-3xl">Weather for: </h1>
                </div>
                <div className=''>
                    <div className="">
                        <label htmlFor="city" className="mb-2 text-sm font-SourceSansPro text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input
                                type="text"
                                id="city"
                                onChange={this.handleCityChange}
                                placeholder='Choose a city'
                                className="block w-screen md:w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button
                                onClick={this.handleButtonClick}
                                className="text-white absolute  font-SourceSansPro right-2.5 bottom-2.5 bg-[#0096A4]  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>




                {requestcity && (
                    <div className="  ">
                        <div className=' rounded-2xl'>
                            {error ? (
                                <p style={{ color: 'red' }}>{error}</p>
                            ) : (
                                <div className='flex flex-col justify-center  '>
                                    <p className="font-SourceSansPro text-3xl">{requestcity}, {country}</p>
                                    <div className="  ">
                                        <div className="">
                                            {temp && <p className=''> {temp}°C</p>}

                                            {weather === 'Clouds' && <Cloudly />}
                                            {weather === 'Clear' && <Sun />}
                                            {weather === 'Rain' && <Rain />}
                                            {weather === 'Thunder' && <Thunder />}
                                        </div>
                                        <div>
                                            {weather && <p>Weather: {weather}</p>}

                                            {description && <p>Description: {description}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }

}




export default Weather;