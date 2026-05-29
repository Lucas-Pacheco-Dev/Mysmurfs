const { getChampions } = require("../riot/layers/champions");
const prisma = require("../../lib/prisma");
const { AccountsList } = require("../accounts/accounts.service");


exports.listChampions = async () => {
  const data = await getChampions();

  const champions = Object.values(data.data);

  for (const champ of champions) {
    await prisma.champion.upsert({
      where: {
        riotKey: champ.key
      },
      update: {
        name: champ.name,
        imageUrl: `https://ddragon.leagueoflegends.com/cdn/16.11.1/img/champion/${champ.image.full}`
      },
      create: {
        id: Number(champ.key),
        riotKey: champ.id,
        name: champ.name,
        imageUrl: `https://ddragon.leagueoflegends.com/cdn/16.11.1/img/champion/${champ.image.full}`,
        version: "16.11.1"
      }
    });
  }

  return {
    message: `${champions.length} campeões importados com sucesso`
  };
};


exports.championsList = async () =>{
   const championslist = await prisma.champion.findMany()

   if(!AccountsList){
    throw new Error("Nenhum campeão encontrado!")
   }

   return championslist;
}


// export async function getFullProfile(gameName,tagline) {
//     const account = await getAccountByRiotId(gameName,tagline);

//     return{
//         account
//     };
// }