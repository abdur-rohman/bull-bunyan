const express = require("express");
const controllers = require("../controllers/users");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${new Date().getTime()}.png`);
  }
});

const uploads = multer({ storage });

const fieldsMiddleware = (req, res, next) => {
  if (req.body.avatar || req.body.username || req.body.name) {
    res.status(400).json({
      status: false,
      message: "Fields avatar, username and name is required"
    });
  } else {
    next()
  }
} 

router.get("/", controllers.getAllUsers);
router.get("/:id", controllers.getUserById);
router.post("/", fieldsMiddleware, controllers.addUser)
router.post("/upload", uploads.single("image"), controllers.saveUserImage);
router.post("/uploads", uploads.array('images', 4), controllers.saveUserGallery)

module.exports = router;
