const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Batch } = require("../db");
const TOKEN_KEY = "BVj543kpJ2POLN3PJPOl9nNNL84NL122A54";

////LOGIN JWT-------------------------//
async function login(mail, password) {
  console.log(mail, password);
  const user = await Batch.findOne({ where: { mail: mail } });
  if (!user) throw new Error("Usuario no encontrado");
  if (user.deleted === true) throw new Error("Usuario baneado");
  const pass = await Batch.findOne({ where: { password: password } });
  if (!pass) throw new Error("Contraseña incorrecta");
  if (user.deleted === true) throw new Error("Usuario baneado");
  const token = jwt.sign({ id: user.id }, TOKEN_KEY);
  return token;
}

const userId = async (id) => {
  try {
    const user = await Batch.findOne({ where: { id: id, deleted: false } });

    return user;
  } catch (error) {
    console.error(error);
  }
};

async function getAllBatches() {
  try {
    const dbBatches = await Batch.findAll();
    const jsonBatches = await Promise.all(
      dbBatches.map(async (batch) => batch.toJSON())
    );

    return jsonBatches;
  } catch (error) {
    throw new Error("getAllBatches controller error");
  }
}

const postBatch = async (
  dni_titular,
  domicilio_real,
  gastos_comunes,
  internet,
  luz,
  m2,
  mail,
  medidor_luz,
  nacionalidad,
  numero_lote,
  telefono,
  telefono2,
  titular,
  ubicacion
) => {
  try {
    const newBatch = await Batch.create({
      dni_titular,
      domicilio_real,
      gastos_comunes,
      internet,
      luz,
      m2,
      mail,
      medidor_luz: [medidor_luz],
      nacionalidad,
      numero_lote,
      telefono,
      telefono2,
      titular,
      ubicacion,
      password: dni_titular,
    });
    return newBatch;
  } catch (error) {
    console.error(error);
  }
};
const updateBatch = async (
  dni_titular,
  domicilio_real,
  gastos_comunes,
  internet,
  luz,
  m2,
  mail,
  medidor_luz,
  nacionalidad,
  numero_lote,
  telefono,
  telefono2,
  titular,
  ubicacion
) => {
  try {
    const updatedBatch = await Batch.update(
      {
        dni_titular,
        domicilio_real,
        gastos_comunes,
        internet,
        luz,
        m2,
        mail,
        medidor_luz,
        nacionalidad,
        numero_lote,
        telefono,
        telefono2,
        titular,
        ubicacion,
      },
      { where: { numero_lote: numero_lote } }
    );

    return updatedBatch;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllBatches, postBatch, updateBatch, login, userId };
