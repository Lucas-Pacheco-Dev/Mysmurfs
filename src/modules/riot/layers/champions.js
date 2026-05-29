const axios = require("axios");


async function getChampions() {
    const res = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/16.11.1/data/pt_BR/champion.json`
    );

    return res.data;
}

module.exports = {
    getChampions
}