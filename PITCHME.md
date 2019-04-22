# moodometer

A simple app to capture team mood and see how it changes over time.

> This is a demo project showing how to create a serverless app in a few simple steps, inspired by https://serverless-stack.com

---

## Create React App

Ensure you have node 8.10+ and npm 6+ installed

```sh
$ node --version
v8.12.0

$ npm --version
6.4.1
```

Create your new app with [create-react-app](https://github.com/facebook/create-react-app)

```sh
npm init react-app moodometer
cd moodometer
npm start
```

---

## Housekeeping

Replace content of `.gitignore` file

```
# dependencies
node_modules
coverage
build
.serverless

# environment
.env

# misc
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

Delete `package-lock.json` and create `.npmrc` file with

```
package-lock=false
```

---

## Add Bootstrap and Chart.js

Load Bootstrap CSS framework in the `head` tag of `public/index.html`

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css"
/>
```

Install Chart.js charting package

```sh
npm i react-chartjs-2 chart.js
```

---

## Build the UI

Update [App.js](src/App.js) content with the following

```js
import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { getMood, postMood } from './moodClient'

const VOTE = {
  question: 'How do you feel today?',
  options: [
    { id: 'red', label: 'so-so', button: 'btn-danger', color: '#dc3545' },
    { id: 'yellow', label: 'good', button: 'btn-warning', color: '#ffc107' },
    { id: 'green', label: 'great', button: 'btn-success', color: '#28a745' },
  ],
}

const getUserMood = voteId =>
  Object.assign({}, ...VOTE.options.map(o => ({ [o.id]: 0, [voteId]: 1 })))

const VoteOptions = ({ onSelect }) => (
  <div>
    {VOTE.options.map(o => (
      <button
        key={o.id}
        className={`btn ${o.button} btn-lg m-2`}
        onClick={() => onSelect(o.id)}
      >
        {o.label}
      </button>
    ))}
  </div>
)

const VoteResults = ({ mood }) => (
  <Doughnut
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{
      labels: VOTE.options.map(o => o.label),
      datasets: [
        {
          data: mood && VOTE.options.map(o => mood[o.id]),
          backgroundColor: VOTE.options.map(o => o.color),
        },
      ],
    }}
  />
)

class App extends Component {
  state = {
    teamMood: null,
  }

  async componentDidMount() {
    const teamMood = await getMood()
    this.setState({ teamMood })
  }

  renderUserVote = id => {
    const { teamMood } = this.state
    teamMood[id]++
    this.setState({ teamMood })
  }

  handleSelect = async id => {
    this.renderUserVote(id) // optional optimisation for faster user feedback

    const userMood = getUserMood(id)
    const teamMood = await postMood(userMood)
    this.setState({ teamMood })
  }

  render() {
    return (
      <div className="app">
        <header>
          <a href="https://github.com/slavagu/moodometer">moodometer</a>
        </header>
        <div className="app-content">
          <p>{VOTE.question}</p>
          <VoteOptions onSelect={this.handleSelect} />
        </div>
        <footer>
          <VoteResults mood={this.state.teamMood} />
        </footer>
      </div>
    )
  }
}

export default App
```

---

## Check the new UI

Local build should be running at http://localhost:3000/

![UI](./pitchme-images/ui-1.png)

## Deploy the website to GitHub pages

Install `gh-pages` as a dev dependency

```sh
npm i -D gh-pages
```

Set homepage link in `package.json` and add deploy task

```js
{
  ...
  "homepage": "https://slavagu.github.io/moodometer",
  "scripts": {
    ...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
}
```

Add `.env` file to the root of the project

```ini
PUBLIC_URL="https://slavagu.github.io/moodometer"
```

Deploy the website

```sh
npm run deploy
```

Online build should be running at https://slavagu.github.io/moodometer/

## Add serverless API

Create `api` folder

```sh
mkdir api
cd api
```

Create `package.json`

```js
{
  "name": "moodometer-api",
  "version": "1.0.0",
  "description": "",
  "main": "handler.js",
  "author": "",
  "license": "ISC",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

Create `.npmrc` file

```
package-lock=false
```

Install serverless framework

```
npm i -D serverless serverless-offline
```

Add into `.gitignore`

```
.serverless
```

Add into `package.json` scripts section

```js
{
  "start": "serverless offline start --port 4000",
  "deploy": "serverless deploy --verbose",
  ...
}
```

Create `serverless.yml` file to define new serverless functions

```yaml
service: moodometer-api

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: ap-southeast-2
  timeout: 30

plugins:
  - serverless-offline

custom:
  stage: ${opt:stage, self:provider.stage}

functions:
  postMood:
    handler: handler.postMood
    events:
      - http:
          path: mood
          method: post
          cors: true
  getMood:
    handler: handler.getMood
    events:
      - http:
          path: mood
          method: get
          cors: true
```

Create `handler.js` file to define API endpoints

```js
module.exports.postMood = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  callback(null, response)
}

module.exports.getMood = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  callback(null, response)
}
```

Deploy the API

```sh
npm run deploy
```

Online build should be available at https://<randomid>.execute-api.ap-southeast-2.amazonaws.com/dev/mood

Add DynamoDB table into `serverless.yml`

```yaml
provider:
  ...
  environment:
    MOOD_TABLE_NAME: ${self:custom.moodTableName}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource:
        - 'Fn::GetAtt': [MoodDynamoDbTable, Arn]

custom:
  ...
  moodTableName: mood-${self:custom.stage}

resources:
  Resources:
    MoodDynamoDbTable:
      Type: 'AWS::DynamoDB::Table'
      Properties:
        TableName: ${self:custom.moodTableName}
        AttributeDefinitions:
          - AttributeName: date
            AttributeType: S
        KeySchema:
          - AttributeName: date
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 10
          WriteCapacityUnits: 10
```

Install aws sdk as a dev dependency because it's available in Lambda environment

```sh
npm i -D aws-sdk
```

Create folder `services` and add `mood.js` there

```js
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
```

Update `handler.js` with the following

```js
const moodService = require('./services/mood')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
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
```
