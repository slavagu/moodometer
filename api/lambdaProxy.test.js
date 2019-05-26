const { invokeHandler } = require('./lambdaProxy')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

it('invokeHandler should return 200 if handler succeeded', async () => {
  const response = await invokeHandler(() => 'ok')

  expect(response).toEqual({
    headers,
    statusCode: 200,
    body: '"ok"',
  })
})

it('invokeHandler should return 500 if handler failed', async () => {
  const response = await invokeHandler(() => {
    throw new Error('boo')
  })

  expect(response).toEqual({
    headers,
    statusCode: 500,
    body: '"boo"',
  })
})
