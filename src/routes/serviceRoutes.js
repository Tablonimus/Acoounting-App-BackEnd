const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllServices,
  postService,
  updateService,
} = require("../controllers/serviceControllers");

router.get("/", async (req, res) => {
  try {
    const services = await getAllServices();
    res.status(201).json(services);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const { name, price, vendor } = req.body;
  try {
    const newService = await postService(name, price, vendor);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const { name, price, vendor } = req.body;
  try {
    const updatedService = await updateService(name, price, vendor);
    res.status(201).json("Servicio actualizado correctamente");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
