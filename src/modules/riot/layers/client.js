const axios = require("axios");

const riotClient = axios.create({
  baseURL: "https://americas.api.riotgames.com",
  headers: {
    "X-Riot-Token": process.env.RIOT_API_KEY
  }
});


module.exports = riotClient;
