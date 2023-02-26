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

const newInvoice = async (service, batches) => {
  try {
    console.log(service, batches);

    // const invoice = await Invoice.bulkCreate({
    //   numero_comprobante,
    //   remitente,
    //   numero_lote,
    //   direccion,
    //   detalle,
    //   consumo,

    //   total,
    //   fecha,
    // });

    // if (servicio !== undefined) {
    //   const dbBatch = await Batch.findAll({
    //     where: { numero_lote: numero_lote },
    //   });
    //   newInvoice.addBatch(dbBatch);
    // }
    return `Factura Creada Correctamente 👏👏👏`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllInvoices, newInvoice };
