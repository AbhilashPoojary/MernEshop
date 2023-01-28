const router = require("express").Router();
const {
  createProduct,
  fetchAllProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.post("/new", createProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchProduct);
router.post("/update", updateProduct);
router.post("/delete", deleteProduct);

module.exports = router;
