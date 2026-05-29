const { error } = require("node:console");
const service = require("./accounts.service")

exports.registerAccount = async (req, res) => {
  try {
    const result = await service.registerAccount({
      ...req.body,
      userId: req.user.userId
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

exports.ListAccounts = async (req,res) => {
    try{
        const result = await service.AccountsList(req.user.UserId);
        res.status(200).json(result);
    } catch(error){
        res.status(400).json({
            error: error.message
        })
    }
}