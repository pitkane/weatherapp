require("dotenv").config();

const debug = require("debug")("weathermap");

const Koa = require("koa");
const router = require("koa-router")();
const fetch = require("node-fetch");
const cors = require("kcors");

const axios = require("axios");

const _ = require("lodash");

const appId = process.env.APPID || "";
const mapURI =
  process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const makeApiRequest = async query => {
  let locationQuery = `q=${targetCity}`;
  if (query.lat) locationQuery = `lat=${query.lat}&lon=${query.lon}`;

  const appIdentifier = `appid=${appId}`;

  const endpoint = `${mapURI}/${
    query.type
  }?${locationQuery}&${appIdentifier}&units=metric`;

  const response = await axios.get(endpoint);

  return _.get(response, "data", {});
};

// const fetchWeather = async () => {
//   // const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;

//   const response = makeApiRequest("weather");

//   // const response = await fetch(endpoint);

//   return response ? response.json() : {};
// };

// const fetchForecast = async query => {
//   const response = await makeApiRequest(query);

//   return _.get(response, "data", {});
// };

router.get("/api/", async ctx => {
  const { query } = ctx.request;

  ctx.body = await makeApiRequest(query);
});

// router.get("/api/forecast", async ctx => {
//   const { query } = ctx.request;

//   const weatherData = await fetchWeather();
//   const data = await fetchForecast(query);

//   console.log(query);

//   ctx.body = {
//     weather = _.get(weatherData, "weather[0]", {}),
//     forecast: data
//   }
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
