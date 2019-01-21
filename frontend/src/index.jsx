import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import _ from "lodash";

const baseURL = process.env.ENDPOINT;

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.geoFindMe = this.geoFindMe.bind(this);

    this.state = {
      icon: "",
      location: "Helsinki,fi",
      coords: null,
      weather: {},
      forecast: {}
    };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  async getWeatherData() {
    const { location, coords } = this.state;

    // by default use location string
    let locationQuery = `location=${location}`;
    if (coords) {
      const lon = coords.longitude;
      const lat = coords.latitude;
      locationQuery = `lat=${lat}&lon=${lon}`;
    }

    try {
      const weatherResponse = await axios.get(`${baseURL}/?type=weather`);

      const forecastResponse = await axios.get(
        `${baseURL}/?type=forecast&${locationQuery}`
      );

      this.setState({
        weather: _.get(weatherResponse, "data", {}),
        forecast: _.get(forecastResponse, "data", {})
      });
    } catch (error) {
      // console.error(error);
    }

    return {};
  }

  async geoFindMe() {
    // eslint-disable-next-line
    await navigator.geolocation.getCurrentPosition(
      position => {
        // parse location nicely
        const { coords } = position;

        this.setState({ location: position, coords }, () =>
          this.getWeatherData()
        );
      },
      // eslint-disable-next-line
      error => console.log(error)
    );
  }

  render() {
    const { weather, forecast } = this.state;

    const icon = _.get(weather, "weather[0].icon", "").slice(0, -1);

    const forecastList = _.get(forecast, "list", []);

    const next3h = _.get(forecastList, "[0].main.temp", "");
    const next6h = _.get(forecastList, "[1].main.temp", "");

    return (
      <div>
        <div>
          <button onClick={this.geoFindMe}>Show my location</button>
        </div>
        <div>Forecast location: {_.get(forecast, "city.name", "")}</div>
        <div>Next 3h: {next3h}</div>
        <div>Next 6h: {next6h}</div>
        <div className="icon" style={{ width: 100, height: 100 }}>
          {icon && <img src={`/img/${icon}.svg`} alt="" />}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById("app"));
