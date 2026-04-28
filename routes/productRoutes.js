const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require('../middleware/uploadMiddleware');
const Product = require('../models/productModel');

// CRUD Endpoints
router.route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// رفع صورة لمنتج محدد
router.post('/:id/upload-image', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.image = req.file.path; // حفظ مسار الصورة في الـ Product
    await product.save();

    res.json({ message: 'Image uploaded successfully', product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;