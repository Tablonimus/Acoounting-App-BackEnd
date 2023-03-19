const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Batch, Admin } = require("../db");

const seeder = require("../../seeder.json");
const TOKEN_KEY = "BVj543kpJ2POLN3PJPOl9nNNL84NL122A54";

////LOGIN JWT-------------------------//
async function loginAdmin(user, password) {
  console.log(user, password);

  const loggedAdmin = await Admin.findOne({ where: { user: user } });
  if (!loggedAdmin) throw new Error("Usuario no encontrado");

  const pass = await Admin.findOne({ where: { password: password } });
  if (!pass) throw new Error("Contraseña incorrecta");

  const token = jwt.sign({ id: user.id }, TOKEN_KEY);

  return token;
}

//post admin
async function postAdmin(user, password) {
  try {
    console.log("CREATING ADMIN");
    const newAdmin = await Admin.create({ user: user, password: password });
    return newAdmin;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { postAdmin, loginAdmin };
