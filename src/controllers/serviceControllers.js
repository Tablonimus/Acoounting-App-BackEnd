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
const updateService = async (payload) => {
  try {
    const serviciosEditados = Object.keys(payload);

    for (let i = 0; i < serviciosEditados.length; i++) {
      let element = serviciosEditados[i]; //string : "Luz" .. . .. .

      let precio_fijo = payload[element].precio_fijo;
      let precio_fraccion = payload[element].precio_fraccion;
      let proveedor = payload[element].proveedor

      const updatedService = await Service.update(
        {
          precio_fraccion,
          precio_fijo,
          proveedor,
        },
        { where: { nombre: element } }
      );
    }
    return "Servicio actualizado correctamente";
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllServices, postService, updateService };
