const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllInvoices,
  updateInvoice,
  newInvoice,
} = require("../controllers/billingControllers");

router.get("/", async (req, res) => {
  try {
    const invoices = await getAllInvoices();
    res.status(201).json(invoices);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/newbill", async (req, res) => {
  const { service, batches } = req.body;
  try {
    const newBill = await newInvoice(service, batches);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const payload = req.body;
  try {
    console.log(payload);
    const updatedInvoice = await updateInvoice(payload);
    res.status(201).json("Servicio actualizado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

module.exports = router;
