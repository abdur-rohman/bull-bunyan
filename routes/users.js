const express = require("express");
const controllers = require('../controllers/users')
const router = express.Router();

router.get('/', controllers.getAllUsers)
router.get('/:id', controllers.getUserById)

module.exports = router