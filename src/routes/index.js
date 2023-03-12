const { Router } = require("express");

const billing = require("./billingRoutes");
const billingLight = require("./billingLightRoutes");
const batch = require("./batchRoutes");
const service = require("./serviceRoutes");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send("GET de prueba / sola <h1>HOLA MENDOZA</h1>");
});

router.use("/billing", billing);
router.use("/billingLight", billingLight);
router.use("/batch", batch);
router.use("/service", service);

module.exports = router;
