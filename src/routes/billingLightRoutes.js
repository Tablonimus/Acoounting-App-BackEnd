const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllInvoices,

  newLightInvoice,
} = require("../controllers/billingLightControllers.js");

router.post("/newbill", async (req, res) => {
  const { service, batches, lightMeter } = req.body;
  try {
    const newBill = await newLightInvoice(service, batches, lightMeter);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/", async (req, res) => {
  const {} = req.body;
  try {
    res.status(201).json();
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
