const axios = require("axios");
require("dotenv").config();

const { Batch } = require("../db");

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
  numero,
  ubicacion,
  m2,
  titular,
  mail,
  telefono,
  telefono2
) => {
  try {
    const newBatch = await Batch.create({
      numero,
      ubicacion,
      m2,
      titular,
      mail,
      telefono,
      telefono2,
    });
  } catch (error) {
    console.error(err);
  }
};

module.exports = { getAllBatches, postBatch };
