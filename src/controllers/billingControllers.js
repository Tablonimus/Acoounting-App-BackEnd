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
    const invoiceService = await Service.findOne({
      where: { nombre: service },
    });

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];

      let invoiceBatch = await Batch.findByPk(batch);

      //facturacion a precio fijo
      const invoice = await Invoice.create({
        remitente: invoiceBatch.titular,
        numero_lote: invoiceBatch.numero_lote,
        direccion: invoiceBatch.ubicacion,
        detalle: `Servicio de ${invoiceService.nombre}`,
        consumo: invoiceService.precio_fijo,
        total: invoiceService.precio_fijo,
      });

      await invoiceBatch.addInvoice(invoice);

      console.log(invoice);
    }

    return `Factura Creada Correctamente 👏👏👏`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllInvoices, newInvoice };
