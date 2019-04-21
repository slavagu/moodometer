const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = process.env.MOOD_TABLE_NAME

module.exports.updateMood = async data => {
  const { red, yellow, green } = data

  const timestamp = new Date().toISOString()
  const date = timestamp.substring(0, 10)

  const params = {
    TableName: tableName,
    Key: {
      date,
    },
    UpdateExpression: 'ADD red :r, yellow :y, green :g',
    ExpressionAttributeValues: {
      ':r': red,
      ':y': yellow,
      ':g': green,
    },
    ReturnValues: 'ALL_NEW',
  }

  const result = await dynamoDb.update(params).promise()
  const item = result.Attributes

  console.log('Mood updated', item)
  return item
}

module.exports.getMood = async () => {
  const timestamp = new Date().toISOString()
  const date = timestamp.substring(0, 10)

  const params = {
    TableName: tableName,
    Key: {
      date,
    },
  }

  const result = await dynamoDb.get(params).promise()
  const item = result.Item

  console.log('Mood retrieved', item)
  return item
}
