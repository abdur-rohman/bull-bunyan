const model = require("../models/users");
const logger = require("../helper/log");
const fs = require('fs')

exports.getAllUsers = (req, res) => {
  const log = logger.child({ req });

  log.info(model);

  return res.json({
    status: true,
    message: "Successful",
    data: model
  });
};

exports.getUserById = (req, res) => {
  const user = model.find(x => x.id == req.params.id);

  const log = logger.child({ req });

  log.info(user);

  if (user) {
    return res.json({
      status: true,
      message: "Successful",
      data: user
    });
  } else {
    log.error("Oops user not found");

    return res.status(400).json({
      status: false,
      message: "Oops user not found"
    });
  }
};

exports.saveUserImage = (req, res) => {
  const log = logger.child({ req });
  try {
    if (req.file) {
      res.json({
        status: false,
        message: "File is uploaded",
        data: req.file
      });
    } else {
      res.status(400).json({
        status: false,
        message: "No file is selected"
      });
    }
  } catch (error) {
    log.info(error);

    return res.status(500).json({
      status: false,
      message: error
    });
  }
};

exports.saveUserGallery = (req, res) => {
  const log = logger.child({ req });
  try {
    if (req.files && req.files.length != 0) {
      res.json({
        status: false,
        message: "File is uploaded",
        data: req.files
      });
    } else {
      res.status(400).json({
        status: false,
        message: "No file is selected"
      });
    }
  } catch (error) {
    log.info(error);

    return res.status(500).json({
      status: false,
      message: error
    });
  }
};

exports.addUser = (req, res) => {
  const log = logger.child({ req });

  const base64 = fs.readFileSync('images/code.png').toString('base64')

  req.body.avatar = base64

  try {
    const image = Buffer.from(req.body.avatar, "base64");
    
    res.set({
      "Content-Type": "image/png",
      "Content-Length": image.length
    });
    res.send(image)
  } catch (error) {
    log.info(error);

    return res.status(500).json({
      status: false,
      message: error
    });
  }
};
