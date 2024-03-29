const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Batch, Invoice } = require("../db");

const seeder = require("../../seeder.json");
const TOKEN_KEY = "BVj543kpJ2POLN3PJPOl9nNNL84NL122A54";

//BULKCREATE
async function createAll() {
  console.log("CREATING");
  await Batch.bulkCreate(seeder).then(() => console.log("created"));
}

////LOGIN JWT-------------------------//
async function login(lote, password) {
  console.log(lote, password);

  const user = await Batch.findOne({ where: { numero_lote: lote } });
  if (!user) throw new Error("Usuario no encontrado");
  if (user.deleted === true) throw new Error("Usuario No autorizado");
  const pass = await Batch.findOne({ where: { password: password } });
  if (!pass) throw new Error("Contraseña incorrecta");
  if (user.deleted === true) throw new Error("Usuario No autorizado");

  const token = jwt.sign({ id: user.id }, TOKEN_KEY);
  return token;
}

async function getAllBatches() {
  try {
    const dbBatches = await Batch.findAll({
      include: {
        model: Invoice,
        through: {
          attributes: [],
        },
      },
    });
   
    const jsonBatches = await Promise.all(
      dbBatches.map(async (batch) => batch.toJSON())
    );

    const sorted = await jsonBatches.sort(function (a, b) {
      if (a.numero_lote < b.numero_lote) {
        return -1;
      }
    });
    return sorted;
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

module.exports = {
  createAll,
  login,
  getAllBatches,
  postBatch,
  updateBatch,
};
