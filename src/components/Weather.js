import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
      <div className="weather__info">
        {
          this.props.country && this.props.city && <p className="weather__key">Location:
          <span className="weather__value"> {this.props.city}, {this.props.country}</span>
          </p>
        }

        {
          this.props.temperature && <p className="weather__key">Temperature:
          <span className="weather__value"> {this.props.temperature}</span>
          </p>
        }

        {
          this.props.humidity && <p className="weather__key">Humidity:
          <span className="weather__value"> {this.props.humidity}</span>
          </p>
        }

        {
          this.props.description && this.props.icon && <p className="weather__key">Conditions:  
          <span className="weather__value"> {this.props.description}</span>
          <img src={`https://openweathermap.org/img/w/${this.props.icon}.png`} alt="weather-icon" />
          </p>
        }

        {
          this.props.error && <p className="weather__error"> {this.props.error}</p>
          }

      </div>
    )
  }
}
