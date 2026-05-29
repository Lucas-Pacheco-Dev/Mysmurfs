const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../lib/prisma");

exports.register = async({name, email, password}) => {
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){
        throw new Error("Usuário já cadastrado!");
    }


    const hashedPassword = await bycrypt.hash(password,10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    });

    return{
        id: user.id,
        name: user.name,
        email: user.email
    };
};

exports.login = async ({ email, password }) => {

  const user = await prisma.user.findUnique({
    where: { email }
  });


  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );


  if (!validPassword) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );


  return { token };
};

exports.me = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};