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
    console.log("SERERERERERERERE", service);
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
        intereses: [0],
        a_cuenta: [0],
        importe_facturado: invoiceService.precio_fijo,
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

const updateInvoice = async (payload) => {
  try {
    const facturasEditadas = Object.keys(payload);

    for (let i = 0; i < facturasEditadas.length; i++) {
      let element = facturasEditadas[i]; //string : "5,1,5,3" .. . .. .
      let facturaAeditar = await Invoice.findByPk(element);

      let interesesNuevos = payload[element].intereses / 100; // 8/100 =
      let a_cuentaNuevos = payload[element].a_cuenta || 0; //5464

      let total = facturaAeditar.total; //125695   //

      let aCuentaAnteriores = facturaAeditar.a_cuenta;
      let interesesAnteriores = facturaAeditar.intereses;

      if (!interesesNuevos) {
        total = total - a_cuentaNuevos;
        aCuentaAnteriores.push(a_cuentaNuevos);

        let a_cuenta = aCuentaAnteriores;
        let pagado = total <= 0 ? true : false;

        const updatedInvocie = await Invoice.update(
          {
            a_cuenta,
            pagado,
            total,
          },
          { where: { id: element } }
        );
      } else if (interesesNuevos) {
        let totalParcial = total - a_cuentaNuevos;
        total = totalParcial + totalParcial * interesesNuevos;
        aCuentaAnteriores.push(a_cuentaNuevos);
        interesesAnteriores.push(interesesNuevos);

        let a_cuenta = aCuentaAnteriores;
        let intereses = interesesAnteriores;
        let pagado = total <= 0 ? true : false;

        const updatedInvocie = await Invoice.update(
          {
            pagado,
            intereses,
            a_cuenta,
            total,
          },
          { where: { id: element } }
        );
      }
    }
    return "Servicio actualizado correctamente";
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllInvoices, newInvoice, updateInvoice };
