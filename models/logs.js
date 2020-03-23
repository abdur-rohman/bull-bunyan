const { promises } = require('fs')

exports.getLogs = () => {
    return promises.readFile('./log/app.log', { encoding: 'utf8' })
}

exports.getRules = () => {
    return promises.readFile('./log/rule.txt', { encoding: 'utf8' })
}