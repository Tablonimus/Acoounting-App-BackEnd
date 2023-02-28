const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllBatches,
  postBatch,
  updateBatch,
  login
} = require("../controllers/batchControllers");
const verifyToken = require("../middlewares/validateToken");
const { Batch } = require("../db");

router.post("/login", async (req, res, next) => {
  console.log(req.body.mail, req.body.password);
  try {
    const token = await login(req.body.mail, req.body.password);
    const user = await Batch.findOne({ where: { mail: req.body.mail } });
    const id = user.numero_lote;
    res
      .header("token", token)
      .json({ error: null, data: { token }, id: { id } });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {

  try {
    const token = await login(req.body.mail, req.body.password);
    const user = await Batch.findOne({ where: { mail: req.body.mail } });
    const id = user.numero_lote;
    res
      .header("token", token)
      .json({ error: null, data: { token }, id: { id } });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const batches = await getAllBatches();
    res.status(201).json(batches);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const {
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
  } = req.body;
  try {
    const newBatch = await postBatch(
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
    );
    res.status(201).json(newBatch);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const {
    numero_lote,
    ubicacion,
    m2,
    titular,
    medidor_luz,
    mail,
    telefono,
    telefono2,
  } = req.body;
  try {
    const updatedBatch = await updateBatch(
      numero,
      ubicacion,
      m2,
      titular,
      medidor_luz,
      mail,
      telefono,
      telefono2
    );
    res.status(201).json("Información de lote actualizada correctamente");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
