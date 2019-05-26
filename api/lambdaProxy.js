const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

module.exports.invokeHandler = async handler => {
  try {
    const result = await handler()

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify(e.message),
    }
  }
}
