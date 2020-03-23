require("dotenv").config({ path: ".env" });

const express = require("express");
const logger = require("./helper/log");
const users = require("./routes/users");
const logs = require("./routes/logs")
const port = process.env.SERVER_PORT || 6789;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ author: "Abdur Rohman" });
});

app.use("/users", users);
app.use("/logs", logs);

app.use((req, res) => {
  const message = {
    status: false,
    message: "Oops page not found"
  };

  res.status(404).json(message);

  const log = logger.child({ req });
  log.info(message);
  log.error(message);
});

app.listen(port, '0.0.0.0', () =>
  console.log(`Server is running on 'http://localhost:${port}'`)
);
