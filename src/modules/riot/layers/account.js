const riotClient = require("./client");

async function getAccountByRiotId(gameName, tagLine) {
  const res = await riotClient.get(
    `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
  );

  return res.data;
}

module.exports = {
  getAccountByRiotId
};