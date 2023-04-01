const axios = require("axios");
require("dotenv").config();

const { Invoice, Batch, Service } = require("../db");

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

      let medicionAcutal = new Date() + "//" + lightMeter[batch].medidor;

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
        detalle: `Servicio de ${invoiceService.nombre}, Consumo ${consumoDelMes}Kw x $${invoiceService.precio_fraccion} el kw; "$${consumoFraccion}" + $${invoiceService.precio_fijo} de gastos de luz fijos.`,
        consumo: consumoFraccion,
        intereses: [0],
        a_cuenta: [0],
        importe_facturado: totalAFacturar,
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

module.exports = { newLightInvoice };
