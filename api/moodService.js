const AWS = require('aws-sdk')
const moment = require('moment-timezone')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const tableName = process.env.MOOD_TABLE_NAME

const defaultMood = (date) => ({ date, red: 0, yellow: 0, green: 0 })

module.exports.getMood = async ({ userId, date }) => {
  const params = {
    TableName: tableName,
    Key: {
      userId: userId,
      date,
    },
  }

  const result = await dynamoDb.get(params).promise()
  const mood = result.Item || defaultMood(date)

  console.log(`Mood retrieved for user '${userId}':`, mood)
  return mood
}

module.exports.updateMood = async ({ userId, date, data }) => {
  const { red, yellow, green } = data
  console.log(`Updating mood for user '${userId}':`, data)

  const params = {
    TableName: tableName,
    Key: {
      userId,
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

  console.log(`Mood updated for user '${userId}':`, updatedMood)
  return updatedMood
}

module.exports.getHistory = async ({ userId, date }) => {
  const startDate = moment(date).subtract(3, 'months').format('YYYY-MM-DD')

  const params = {
    TableName: tableName,
    KeyConditionExpression: 'userId = :uid and #date >= :startDate',
    ExpressionAttributeNames: { '#date': 'date' },
    ExpressionAttributeValues: {
      ':uid': userId,
      ':startDate': startDate,
    },
    ScanIndexForward: true,
  }
  const items = []
  do {
    const result = await dynamoDb.query(params).promise()
    items.push(...result.Items)
    params.ExclusiveStartKey = result.LastEvaluatedKey
  } while (params.ExclusiveStartKey)

  console.log(
    `Mood history retrieved for user '${userId}': ${items.length} items(s)`
  )

  return items
}
