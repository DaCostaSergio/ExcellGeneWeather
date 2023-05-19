import React from 'react';
import Cloudly from '../Icons/WeatherIconCloudly';
import Sun from '../Icons/WeatherIconSun';
import Rain from '../Icons/WeatherIconRain';
import Thunder from '../Icons/WeatherIconThunder';
import MaxTempWeather from '../Assets/MaxTemp.svg';
import MinTempWeather from '../Assets/MinTemp.svg';
import Wind from '../Assets/Wind.svg';

const WeatherDisplay = ({ weather, temp, wind, tempMin, tempMax, requestcity, country, description, error }) => {
    return (
        <div className=''>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div className='flex flex-col justify-center lg:mt-36'>
                    <p className="font-SourceSansPro text-3xl lg:text-8xl text-white text-center">{requestcity}, {country}</p>
                    <div className='flex justify-center pt-6  '>
                        <div className=' lg:pt-20'>
                            {weather === 'Clouds' && <Cloudly />}
                            {weather === 'Clear' && <Sun />}
                            {weather === 'Rain' && <Rain />}
                            {weather === 'Thunder' && <Thunder />}
                        </div>
                        <div className='pl-2 pt-5 lg:pl-10 lg:pt-20'>
                            {temp && <p className='text-4xl lg:text-7xl text-white font-SourceSansPro font-bold'>{temp}°C</p>}
                            {weather && <p className="text-2xl lg:text-5xl text-white font-extrathin font-SourceSansPro pt-4 lg:pt-8">{weather}</p>}
                            {description && <p className="text-white lg:text-lg font-SourceSansPro"> {description}</p>}
                        </div>

                    </div>
                    <div className="flex space-x-10 lg:space-x-20 justify-center content-center md:mt-10">
                        <div className="flex items-center ">
                            <img src={MinTempWeather} alt="MinTempIcon"></img>
                            {tempMin && <p className="text-sm lg:text-2xl text-white font-extrathin font-SourceSansPro pt-4"> {tempMin}°C</p>}
                        </div>
                        <div className="flex items-center content-center">
                            <img src={MaxTempWeather} alt="MaxTempIcon"></img>
                            {tempMax && <p className="text-sm lg:text-2xl text-white font-extrathin font-SourceSansPro pt-4"> {tempMax}°C</p>}
                        </div>
                        <div className="flex items-center content-center">
                            <img src={Wind} alt="WindIcon"></img>
                            {wind && <p className="text-sm lg:text-2xl text-white font-extrathin font-SourceSansPro pt-4"> {wind}Km/h</p>}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;