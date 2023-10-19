const express= require('express');
const router= express.Router();

const controller = require("../controller/productscontroller")

router.get("/",controller.all)

router.get("/top",controller.top)

router.get("/total",controller.aggregate)

router.post("/",controller.postproducts)

module.exports= router;