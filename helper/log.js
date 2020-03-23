const bunyan = require('bunyan')
const logger = bunyan.createLogger({
    name: "App-log",
    level: "info",
    serializers: {
        req: require('bunyan-express-serializer'),
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    streams: [
        { level: "info", stream: process.stdout },
        { level: "error", path: './log/app.log' }
    ]
})

module.exports = logger