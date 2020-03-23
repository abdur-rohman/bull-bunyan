const logger = require("../helper/log");
const model = require("../models/logs");
const Bull = require("bull");
const queue = new Bull("Request logs");

let x = 0;

queue.process(2, async job => {
  x++;

  const data = await model.getLogs();
  const logs = data.split("\n").filter(x => x);

  const result = await model.getRules();
  const rules = result.split("\n\n");

  return Promise.allSettled([
    Promise.resolve(logs),
    Promise.resolve(rules),
    Promise.resolve(job.data.message)
  ]);
});

exports.getLogs = async (req, res) => {
  x = 0

  const log = logger.child({ req });
  log.info("Info log");

  queue.add({ message: "Read file from file system" });
  queue.add({ message: "Read file from file system" });

  let i = 0;

  const jobs = []

  queue.on("completed", async (job, result) => {
    const results = await result;

    i++;

    jobs.push(job.data)

    if (i == x) {
      res.json({
        status: true,
        message: "Successfull",
        data: {
          jobs,
          logs: results[0].value.map(x => JSON.parse(x)),
          rules: results[1].value
        }
      });
    }
  });
};
