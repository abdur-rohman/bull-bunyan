const express = require("express");
const controllers = require('../controllers/logs')
const router = express.Router();

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        if (token.includes('Bearer')) {
            const role = token.split(' ')[1]
    
            if (role && role == "Admin") {
                next()
            } else {
                res.status(403).json({
                    status: false,
                    message: "You don't have an access"
                })
            }
        } else {
            res.status(401).json({
                status: false,
                message: "Token not valid"
            })
        }
    } else {
        res.status(401).json({
            status: false,
            message: "Token not valid"
        })
    }
}

router.get('/', adminMiddleware, controllers.getLogs)

module.exports = router