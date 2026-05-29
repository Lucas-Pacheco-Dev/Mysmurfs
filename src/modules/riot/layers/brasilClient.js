const axios = require("axios");


const riotSearch = axios.create({
  baseURL: "https://br1.api.riotgames.com",
  headers: {
    "X-Riot-Token": process.env.RIOT_API_KEY
  }
});


module.exports = riotSearch;
