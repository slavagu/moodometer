const { invokeHandler } = require('./lambdaProxy')
const moodService = require('./moodService')

module.exports.getMood = async () => invokeHandler(moodService.getMood)

module.exports.postMood = async event => {
  return invokeHandler(() => {
    const data = JSON.parse(event.body)
    return moodService.updateMood(data)
  })
}

module.exports.getHistory = async () => invokeHandler(moodService.getHistory)
