const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllBatches,
  postBatch,
  updateBatch,
} = require("../controllers/batchControllers");

router.get("/", async (req, res) => {
  try {
    const batches = await getAllBatches();
    res.status(201).json(batches);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const { numero, ubicacion, m2, titular, mail, telefono, telefono2 } =
    req.body;
  try {
    const newBatch = await postBatch(
      numero,
      ubicacion,
      m2,
      titular,
      mail,
      telefono,
      telefono2
    );
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const { numero, ubicacion, m2, titular, mail, telefono, telefono2 } =
    req.body;
  try {
    const updatedBatch = await updateBatch(
      numero,
      ubicacion,
      m2,
      titular,
      mail,
      telefono,
      telefono2
    );
    res.status(201).json(updatedBatch);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
