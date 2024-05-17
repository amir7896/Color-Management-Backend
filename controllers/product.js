const Product = require("../models/product");
const { ERRORS, SUCCESS_MSG, STATUS_CODES } = require("../constants");

const createProduct = async (req, res) => {
  try {
    const { title, description, colors } = req.body;
    const newProduct = new Product({
      title,
      description,
      colors,
    });

    const savedProduct = await newProduct.save();
    if (savedProduct) {
      return res.status(STATUS_CODES.CREATED).json({
        success: true,
        message: SUCCESS_MSG.PRODUCT.CREATED,
        product: savedProduct,
      });
    } else {
      return res
        .status(ERRORS.ERRORS.BAD_REQUEST)
        .json({ success: false, message: ERRORS.PRODUCT.NOT_CREATED });
    }
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      { _id: 1, title: 1, description: 1 }
    );

    if (products.length > 0) {
      return res
        .status(STATUS_CODES.OK)
        .json({ success: true, data: products });
    } else {
      return res
        .status(STATUS_CODES.OK)
        .json({ success: true, message: ERRORS.PRODUCT.NOT_FOUNDS });
    }
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ success: false, message: ERRORS.PRODUCT.NOT_FOUNDS });
    }

    return res
      .status(STATUS_CODES.OK)
      .json({ success: true, data: singleProduct });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, colors } = req.body;
    const singleProduct = await Product.findById(id);
    if (!singleProduct) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ success: false, message: ERRORS.PRODUCT.NOT_FOUNDS });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          colors,
        },
        { new: true }
      );
      if (!updatedProduct) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ success: false, message: ERRORS.PRODUCT.NOT_UPDATED });
      }

      return res.status(STATUS_CODES.OK).json({
        success: true,
        message: SUCCESS_MSG.PRODUCT.UPDATED,
        department: updatedProduct,
      });
    }
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: ERRORS.ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
};
