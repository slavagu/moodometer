const moodService = require('./moodService')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

module.exports.getMood = async event => {
  try {
    const result = await moodService.getMood()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e.message),
    }
  }
}

module.exports.postMood = async event => {
  try {
    const data = JSON.parse(event.body)

    const result = await moodService.updateMood(data)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e.message),
    }
  }
}

module.exports.getHistory = async event => {
  try {
    const result = await moodService.getHistory()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e.message),
    }
  }
}

