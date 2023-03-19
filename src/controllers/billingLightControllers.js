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

const newLightInvoice = async (service, lightMeter, calc) => {
  try {
    const invoiceService = await Service.findOne({
      where: { nombre: service },
    });

    const lotesAFacturar = Object.keys(lightMeter);
    const calcLotes = Object.keys(calc);

    for (let i = 0; i < lotesAFacturar.length; i++) {
      const batch = lotesAFacturar[i];
      let invoiceBatch = await Batch.findByPk(batch);

      let medicionAcutal = lightMeter[batch].medidor;

      let consumoDelMes = calc[batch];

      let consumoFraccion = consumoDelMes * invoiceService.precio_fraccion;

      let totalAFacturar =
        consumoFraccion + parseFloat(invoiceService.precio_fijo);
      let numero_lote = invoiceBatch.numero_lote;
      let medidor_viejo = invoiceBatch.medidor_luz;
      medidor_viejo.push(medicionAcutal);

   
      const updatedBatch = await Batch.update(
        {
          medidor_luz: medidor_viejo,
        },
        { where: { numero_lote: numero_lote } }
      );

      //facturacion de luz
      const invoice = await Invoice.create({
        remitente: invoiceBatch.titular,
        numero_lote: invoiceBatch.numero_lote,
        direccion: invoiceBatch.ubicacion,
        detalle: `Servicio de ${invoiceService.nombre}, Consumo ${consumoDelMes} Kw a $${invoiceService.precio_fraccion} por Kw y + $${invoiceService.precio_fijo} de gastos de luz fijos.`,
        consumo: consumoFraccion,
        total: totalAFacturar,
      });
      await invoiceBatch.addInvoice(invoice);
      console.log(invoice);
    }

    return `Factura Creada Correctamente 👏👏👏`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllInvoices, newLightInvoice };
