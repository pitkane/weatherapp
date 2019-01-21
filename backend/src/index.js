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

router.get("/api/", async ctx => {
  const { query } = ctx.request;

  ctx.body = await makeApiRequest(query);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, "localhost");

console.log(`App listening on port ${port}`);

const close = () => {
  app.close();
};

module.exports = app;
