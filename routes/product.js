const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} = require("../controllers/product");

router.get("/list", getProducts);
router.post("/create", createProduct);
router.get("/:id", getSingleProduct);
router.put("/update/:id", updateProduct);

module.exports = router;
