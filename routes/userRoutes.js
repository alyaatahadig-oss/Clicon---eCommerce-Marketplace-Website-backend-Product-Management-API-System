const router = require("express").Router();
const { getAllUsers } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, admin, getAllUsers);

module.exports = router;