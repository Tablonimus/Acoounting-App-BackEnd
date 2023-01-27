const axios = require("axios");
require("dotenv").config();

const { Invoice, Batch, Service } = require("../db");

async function getAllInvoices() {
  try {
    const dbInvoices = await Invoice.findAll();
    const jsonData = await Promise.all(
      dbInvoices.map(async (inv) => inv.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllInvoices controller error");
  }
}

const newInvoice = async (factura, servicio) => {
  try {
    const {
      numero_comprobante,
      remitente,
      numero_lote,
      direccion,
      detalle,
      consumo,

      total,
      fecha,
    } = factura;

    const servicioAFacturar = Service.findOne({ where: { nombre: servicio } });

    const totalAFacturar = consumo * servicioAFacturar.costo_fraccion;

    const invoice = await Invoice.create({
      numero_comprobante,
      remitente,
      numero_lote,
      direccion,
      detalle,
      consumo,

      total,
      fecha,
    });

    if (servicio !== undefined) {
      const dbBatch = await Batch.findAll({
        where: { numero_lote: numero_lote },
      });
      newInvoice.addBatch(dbBatch);
    }
    return `Factura Creada Correctamente 👏👏👏`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllInvoices, newInvoice };
