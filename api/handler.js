const { invokeHandler } = require('./lambdaProxy')
const moodService = require('./moodService')

module.exports.getMood = async (event) =>
  invokeHandler(event, moodService.getMood)

module.exports.postMood = async (event) =>
  invokeHandler(event, moodService.updateMood)

module.exports.getHistory = async (event) =>
  invokeHandler(event, moodService.getHistory)
