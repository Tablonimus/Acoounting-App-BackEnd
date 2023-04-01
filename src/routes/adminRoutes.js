const { Router } = require("express");
const sequelize = require("sequelize");
const axios = require("axios");
const router = Router();
const { loginAdmin, postAdmin } = require("../controllers/adminControllers");
const verifyToken = require("../middlewares/validateToken");
const { Admin } = require("../db");

router.post("/login", async (req, res, next) => {
  console.log(req.body.user, req.body.password);
  try {
    const token = await loginAdmin(req.body.user, req.body.password);
    const user = await Admin.findOne({ where: { user: req.body.user } });
    const id = user.id;
    res
      .header("token", token)
      .json({ error: null, data: { token }, id: { id }/* , user: { user } */ });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res) => {
  const { user, password } = req.body;
  try {
    const newAdmin = await postAdmin(user, password);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOne({ where: { id: id } });
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json(error.message);
  }
});



module.exports = router;
