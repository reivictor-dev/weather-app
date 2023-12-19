import React, { useState } from 'react'
import './WeatherApp.css'

import wind from '../../assets/wind.svg'
import humidity from '../../assets/humidity.svg'
import search from '../../assets/search.svg'

import clear_sky from '../../assets/clear_sky.svg'
import rain from '../../assets/rain.svg'
import snowing from '../../assets/snow.svg'
import few_clouds from '../../assets/few_clouds.svg'
import mist from '../../assets/mist.svg'
import shower_rain from '../../assets/shower_rain.svg'
import thunderstorm from '../../assets/thunderstorm.svg'
import broken_clouds from '../../assets/broken_clouds.svg'
import clouds from '../../assets/clouds.svg'

const WeatherApp = () => {
  
  const [weatherInfo, setWeatherInfo] = useState({
   clear_sky,
    temp: '40',
    humidity: 25,
    wind: 0.62,
    location: ''
  })
  const [weatherIcon, setWeatherIcon] = useState(clear_sky);

  const apiKey = '4062e9cb47e49883177b5bd06eda6865'
  
  let locationTarget = document.getElementsByClassName("searchingInput")

  const searchClick = async () => {
    
    let locationValue = locationTarget[0].value

    if(locationValue === '') {
      return 0
    } 
    
    let fetching = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apiKey}&units=metric`)
  
    let data = await fetching.json()
    
    switch (data.weather[0].icon){
      case '02d' || '02n':
        setWeatherIcon(few_clouds)
      break;
      case '03d' || '03n':
        setWeatherIcon(clouds)
      break;
      case '04d' || '04n':
        setWeatherIcon(broken_clouds)
      break;
      case '09d' || '09n':
        setWeatherIcon(shower_rain)      
      break;
      case '10d' || '10n':
        setWeatherIcon(rain)
      break;
      case '11d' || '11n':
        setWeatherIcon(thunderstorm)
        break;
      case '13d' || '13n':
        setWeatherIcon(snowing)
        break;
      case '50d' || '50n':
        setWeatherIcon(mist)
        break;
      default:
        setWeatherIcon(clear_sky)
      }
       
      setWeatherInfo({temp: Math.floor(data.main.temp) + ' Cº',
                    humidity: data.main.humidity + '%',
                    wind: data.wind.speed + ' km/h',
                    location: locationValue.toUpperCase()})
      
      
    }

  
  return (
      <div className='container'>
          <div className='top-content'>
              <input type="text" placeholder='Type your location' className='searchingInput'/>
              <img src={search} alt="" onClick={() => searchClick()}/>
          </div>

          <div className='weather-content'>

            <div className='weather-img'>
                <img src={weatherIcon} alt="" />
            </div>

            <div className='weather-info'>

              <span className='cityLocation'>{weatherInfo.location}</span>
              <span className='cityTemp'>{weatherInfo.temp}</span>

            </div>
          </div>
          <div className='weather-footer'>
            <div className='weather-footer_info'>
              
              
                <img src={humidity} alt="" />
                <span className='cityHumidity'>{weatherInfo.humidity}</span>
              
              
                <img src={wind} alt="" />
                <span className='cityWind'>{weatherInfo.wind}</span>
              

            </div>

          </div>
      </div>
  )
}

export default WeatherApp