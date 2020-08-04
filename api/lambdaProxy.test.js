const { invokeHandler } = require('./lambdaProxy')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

describe('invokeHandler', () => {
  Date.now = jest.fn(() => new Date('2020-08-01T23:00:00.000Z'))

  const event = {
    requestContext: {
      authorizer: { claims: { sub: 'user1' } },
    },
    headers: {
      'time-zone': 'Australia/Sydney',
    },
    body: '{"data":"here"}',
  }

  it('should parse request parameters and pass them to the handler', async () => {
    const response = await invokeHandler(event, ({ userId, date, data }) => {
      expect(userId).toEqual('user1')
      expect(date).toEqual('2020-08-02')
      expect(data).toEqual({ data: 'here' })
      return true
    })

    expect(response).toEqual({
      headers,
      statusCode: 200,
      body: 'true',
    })
  })

  it('should return 200 if handler succeeded', async () => {
    const response = await invokeHandler(event, () => 'ok')

    expect(response).toEqual({
      headers,
      statusCode: 200,
      body: '"ok"',
    })
  })

  it('should return 500 if handler failed', async () => {
    const response = await invokeHandler(event, () => {
      throw new Error('boo')
    })

    expect(response).toEqual({
      headers,
      statusCode: 500,
      body: '"boo"',
    })
  })
})
