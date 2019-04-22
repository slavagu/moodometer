const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = process.env.MOOD_TABLE_NAME

const defaultState = date => ({ date, red: 0, yellow: 0, green: 0 })

const today = () => new Date().toISOString().substring(0, 10)

module.exports.getMood = async () => {
  const date = today()

  const params = {
    TableName: tableName,
    Key: {
      date,
    },
  }

  const result = await dynamoDb.get(params).promise()
  const mood = result.Item || defaultState(date)

  console.log('Mood retrieved', mood)
  return mood
}

module.exports.updateMood = async mood => {
  const { red, yellow, green } = mood
  const date = today()

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
  const updatedMood = result.Attributes

  console.log('Mood updated', updatedMood)
  return updatedMood
}

