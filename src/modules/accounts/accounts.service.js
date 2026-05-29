const prisma = require("../../lib/prisma");
const { getAccountByRiotId } = require("../riot/layers/account");
const { getRankStatus } = require("../riot/layers/summoner");
const { getChampionMastery } = require("../riot/layers/summoner");
const { getChampions } = require("../riot/layers/champions");

exports.registerAccount = async ({
  gameName,
  tagLine,
  region,
  login,
  passAccount,
  userId
}) => {
  const existAccount = await prisma.riotAccount.findUnique({
    where: {
      gameName_tagLine: {
        gameName,
        tagLine
      }
    }
  });

  if (existAccount) {
    throw new Error("Conta já cadastrada");
  }


  const riotData = await getAccountByRiotId(
    gameName,
    tagLine
  );

  const account = await prisma.riotAccount.create({
    data: {
      gameName,
      tagLine,
      region,
      login,
      passAccount,
      userId,
      puuid: riotData.puuid
    }
  });

   // 3. Buscar rank
  const accountRanks = await getRankStatus(
    riotData.puuid
  );

  // 4. Salvar ranks
  for (const rank of accountRanks) {
    await prisma.riotRank.create({
      data: {
        riotAccountId: account.id,
        queueType: rank.queueType,
        tier: rank.tier,
        rank: rank.rank,
        leaguePoints: rank.leaguePoints,
        wins: rank.wins,
        losses: rank.losses,
        veteran: rank.veteran,
        inactive: rank.inactive,
        freshBlood: rank.freshBlood,
        hotStreak: rank.hotStreak
      }
    });
  }


const championsMastery = await getChampionMastery(riotData.puuid);

await Promise.all(
  championsMastery.map((champ) =>
    prisma.championMastery.upsert({
      where: {
        riotAccountId_championId: {
          riotAccountId: account.id,
          championId: champ.championId
        }
      },
      update: {
        championLevel: champ.championLevel,
        championPoints: champ.championPoints,
        championPointsSinceLastLevel: champ.championPointsSinceLastLevel,
        championPointsUntilNextLevel: champ.championPointsUntilNextLevel,
        markRequiredForNextLevel: champ.markRequiredForNextLevel,
        tokensEarned: champ.tokensEarned,
        lastPlayTime: new Date(champ.lastPlayTime)
      },
      create: {
        championId: champ.championId,
        championLevel: champ.championLevel,
        championPoints: champ.championPoints,
        championPointsSinceLastLevel: champ.championPointsSinceLastLevel,
        championPointsUntilNextLevel: champ.championPointsUntilNextLevel,
        markRequiredForNextLevel: champ.markRequiredForNextLevel,
        tokensEarned: champ.tokensEarned,
        lastPlayTime: new Date(champ.lastPlayTime),
        riotAccountId: account.id
      }
    })
  )
);


  return account;
};

exports.AccountsList = async({userId}) =>{
    const accountsList = await prisma.riotAccount.findMany({
        where:{userId}
    })

    if(!accountsList){
        throw new Error("Nenhuma conta encontrada!")
    }

    return accountsList;
}

