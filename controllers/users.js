const model = require("../models/users");
const logger = require("../helper/log");

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

    return res.json({
      status: false,
      message: "Oops user not found"
    });
  }
};
