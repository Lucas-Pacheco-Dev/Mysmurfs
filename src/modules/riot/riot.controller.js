// controllers/riot.controller.ts
const service = require("./riot.service")


exports.AccountsList = async({userId}) =>{
    const accountsList = await prisma.riotAccount.findMany({
        where:{userId}
    })

    if(!accountsList){
        throw new Error("Nenhuma conta encontrada!")
    }

    return accountsList;
}

exports.listChampions = async (req, res) => {
  try {
    const result = await service.listChampions();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

exports.championsList = async(req,res) => {
  try{
    const result = await service.championsList();
    res.status(200).json(result);
  }catch(error){
    res.status(400).json({
      error: error.message
    })
  }
}