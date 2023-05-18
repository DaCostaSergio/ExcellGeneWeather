import React from 'react';
import Cloudly from '../Icons/WeatherIconCloudly';
import Sun from '../Icons/WeatherIconSun';
import Rain from '../Icons/WeatherIconRain';
import Thunder from '../Icons/WeatherIconThunder';

const WeatherDisplay = ({ weather, temp, requestcity, country, description, error }) => {
  return (
    <div className=''>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className='flex flex-col justify-center'>
          <p className="font-SourceSansPro text-5xl text-white text-center">{requestcity}, {country}</p>
          <div className='flex justify-center pt-6 '>
            <div className=''>
              {weather === 'Clouds' && <Cloudly />}
              {weather === 'Clear' && <Sun />}
              {weather === 'Rain' && <Rain />}
              {weather === 'Thunder' && <Thunder />}
            </div>
            <div className='pl-2'>
              {temp && <p className='text-4xl text-white font-SourceSansPro font-bold'>{temp}°C</p>}
              {weather && <p className="text-2xl text-white font-extrathin font-SourceSansPro pt-4">{weather}</p>}
              {description && <p className="text-white font-SourceSansPro"> {description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;