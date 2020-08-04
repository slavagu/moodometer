const moment = require('moment-timezone')

const getHeader = (headers, key) => {
  const keyLowerCase = key.toLowerCase()
  const keyName = Object.keys(headers).find(
    (k) => k.toLowerCase() === keyLowerCase
  )
  return headers[keyName]
}

module.exports.invokeHandler = async (event, handler) => {
  try {
    // the user must be already authenticated by the API Gateway JWT Authorizer
    const userId = event.requestContext.authorizer.claims.sub

    const timeZone = getHeader(event.headers, 'Time-Zone')
    const date = moment.tz(Date.now(), timeZone).format('YYYY-MM-DD')

    const data = event.body && JSON.parse(event.body)

    const result = await handler({ userId, date, data })

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    }
  }
}
