const { Router } = require("express");

const billing = require("./billingRoutes");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send("GET de prueba / sola <h1>HOLA MENDOZA</h1>");
});

router.use("/billing", billing);

module.exports = router;
