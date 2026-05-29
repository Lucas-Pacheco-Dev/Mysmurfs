const { error } = require("node:console");
const service = require("./auth.service");

exports.register = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const result = await service.register(req.body);

    console.log("RESULT:", result);

    res.status(201).json(result);
  } catch (error) {
    console.error("REGISTER ERROR:");
    console.error(error);

    res.status(400).json({
      error: error.message
    });
  }
};

exports.login = async(req,res) => { 
    try{
        const result = await service.login(req.body);
        res.status(200).json(result);
    } catch{
        res.status(401).json({error: error.message})
    }
}

exports.me = async (req, res) => {
  try {
    const result = await service.me(req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};