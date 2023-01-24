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

const postService = async (name, price, vendor) => {
  try {
    const newService = await Service.create({
      name,
      price,
      vendor,
    });
    return newService;
  } catch (error) {
    console.error(error);
  }
};
const updateService = async (name, price, vendor) => {
  try {
    const updatedService = await Service.update(
      {
        name,
        price,
        vendor,
      },
      { where: { name: name } }
    );
    return updatedService;
  } catch (error) {
    console.error(err);
  }
};

module.exports = { getAllServices, postService, updateService };
