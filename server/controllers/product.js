const Product = require("../models/Product");
const { createError } = require("../error");

const createProduct = async (req, res, next) => {
  const { name, brand, price, imgUrl, category, desc } = req.body;
  try {
    if (!name || !brand || !price || !imgUrl || !category || !desc)
      return next(createError(400, "All fieds are mandatory"));
    const duplicateProduct = await Product.findOne({ name });
    if (duplicateProduct) return next(createError(400, "Same product exists"));
    //create a new product
    const newProduct = new Product({
      name,
      brand,
      price,
      category,
      desc,
      imgUrl,
    });
    console.log(newProduct);
    //save product and send response
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const fetchAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    next(createError(err));
  }
};

const fetchProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    next(createError(error));
  }
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  console.log(req.body);
  try {
    await Product.deleteOne({ _id: productId });
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    next(createError(error));
  }
};

const updateProduct = async (req, res, next) => {
  const { name, price, brand, category, id, imgUrl, desc } = req.body;
  try {
    const findProduct = await Product.findOne({ _id: id });
    if (!findProduct) return next(createError(400, "Product not available"));
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        price,
        brand,
        category,
        id,
        imgUrl,
        desc,
      }
    );
    console.log(updatedProduct);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(createError(err));
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProduct,
  updateProduct,
  deleteProduct,
};
