const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const {
  getAllInvoices,
  postBatch,
  updateBatch,
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

// router.get("/data", async (req, res) => {
//   try {
//     const invoices = await getAllInvoices();
//     res.status(201).json(invoices);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

router.post("/newbill", async (req, res) => {
  const { factura,servicio } = req.body;
  try {
    const newBill = await newInvoice( factura,servicio );
    res.status(201).json(newBill);
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
