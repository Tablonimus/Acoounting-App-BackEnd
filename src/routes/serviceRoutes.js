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
  const { nombre, precio_fraccion, precio_fijo, proveedor } = req.body;
  try {
    const newService = await postService(
      nombre,
      precio_fraccion,
      precio_fijo,
      proveedor
    );
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const payload = req.body;
  try {
    const updatedService = await updateService(
 payload
    );
    res.status(201).json("Servicio actualizado correctamente");

  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
