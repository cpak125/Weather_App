import React, { Component } from 'react'
import './App.css'
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`

class App extends Component {
  state = {
    temperature: undefined,
    cityZip: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault()

    const city = e.target.elements.cityZip.value
    const country = e.target.elements.country.value

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    const api_call_zip = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city}&appid=${API_KEY}&units=imperial`)

    const response = await api_call.json()
    const responseZip = await api_call_zip.json()


    console.log(responseZip)

    if (city && country) {
      this.setState({
        temperature: Math.ceil(response.main.temp) + "°F",
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity + "%",
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        error: ""
      })
    } else if (city) {
      this.setState({
        temperature: Math.ceil(responseZip.main.temp) + "°F",
        city: responseZip.name,
        country: responseZip.sys.country,
        humidity: responseZip.main.humidity + "%",
        description: responseZip.weather[0].description,
        icon: responseZip.weather[0].icon,
        error: ""
      })
    } else {
      this.setState({
        error: "Please enter the values..."
      })
    }

  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 title-container">
                <Titles />
              </div>
              <div className="col-md-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  icon={this.state.icon}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
