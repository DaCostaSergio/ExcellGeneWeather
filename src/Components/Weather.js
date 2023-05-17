import axios from 'axios';
import React, { Component } from 'react';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            temp: null,
            country: null,
            description: null,
            city: '',
            error: ''
        };
    }

    fetchWeatherData = () => {
        const apiKey = 'e47181ddd099153e1ba56bd6f5521709';
        const { city } = this.state;

        if (city) {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                .then(response => {
                    const weather = response.data.weather[0].main;
                    const description = response.data.weather[0].description;
                    const temp = response.data.main.temp;
                    const country = response.data.sys.country;
                    this.setState({ weather: weather, error: '' });
                    this.setState({ description: description });
                    this.setState({ temp: temp });
                    this.setState({ country: country });
                })
                .catch(error => {
                    console.log('Une erreur s\'est produite lors de la récupération des données météorologiques:', error);
                    this.setState({ error: 'Ville introuvable' });
                });
        }

    }

    handleCityChange = (event) => {
        this.setState({ city: event.target.value });
    }

    handleButtonClick = () => {
        this.fetchWeatherData();
    }

    render() {
        const { weather, temp, country, description, city, error } = this.state;
        return (
            <div>
                <h1 className='text-8xl'>Données météorologiques</h1>
                <label htmlFor="city">Choisissez une ville:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={this.handleCityChange}
                />
                <button onClick={this.handleButtonClick}>Rechercher</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weather && <p>Météo pour {city}: {weather}</p>}
                {temp && <p>Tempérautre pour {city}: {temp}</p>}
                {country && <p>Pays: {country}</p>}
                {description && <p>Description: {description}</p>}
            </div>
        )
    }

}




export default Weather;