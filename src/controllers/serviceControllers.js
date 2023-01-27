const axios = require("axios");
require("dotenv").config();

const { Service } = require("../db");

async function getAllServices() {
  try {
    const dbServices = await Service.findAll();
    const jsonServices = await Promise.all(
      dbServices.map(async (serv) => serv.toJSON())
    );

    return jsonServices;
  } catch (error) {
    throw new Error("getAllBatches controller error");
  }
}

const postService = async (nombre, precio_fraccion, precio_fijo, proveedor) => {
  try {
    const newService = await Service.create({
      nombre,
      precio_fraccion,
      precio_fijo,
      proveedor,
    });
    return newService;
  } catch (error) {
    console.error(error);
  }
};
const updateService = async (
  nombre,
  precio_fraccion,
  precio_fijo,
  proveedor
) => {
  try {
    const updatedService = await Service.update(
      {
        nombre,
        precio_fraccion,
        precio_fijo,
        proveedor,
      },
      { where: { nombre: nombre } }
    );
    return updatedService;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllServices, postService, updateService };
