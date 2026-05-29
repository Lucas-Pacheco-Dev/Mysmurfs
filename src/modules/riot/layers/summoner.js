const riotSearch = require("./brasilClient")

 async function getSummonerByPUUID(puuid) {
    const res = await axios.get(
        `/riot/account/v1/accounts/by-puuid/{puuid}`,
        {
            headers: {
                "X-Riot-Token": process.env.RIOT_API_KEY,
            },
        }
    );

    return res.data;
}

async function getRankStatus(puuid) {

    console.log(riotSearch)
    const res = await riotSearch.get(
        `/lol/league/v4/entries/by-puuid/${puuid}`
    );

    return res.data;
}

async function getChampionMastery(puuid) {
    const res = await riotSearch.get(
        `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
    );

    return res.data;
}

module.exports = {
  getSummonerByPUUID,
  getRankStatus,
  getChampionMastery
};