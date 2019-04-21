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

## Housekeeping

Replace content of `.gitignore` file

```
# dependencies
node_modules
coverage
build
.serverless

# misc
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log\*
```

Delete `package-lock.json` and create `.npmrc` file

```
package-lock=false
```

---

## Add handy UI libraries

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

Replace `src/App.js` with the following

```js
import React, { Component } from 'react'
import './App.css'
import { Doughnut } from 'react-chartjs-2'

const labels = ['so-so', 'good', 'great']
const buttons = ['btn-danger', 'btn-warning', 'btn-success']
const colors = ['#EB3547', '#FFC03E', '#00A553']

const Options = ({ onSelect }) => (
  <div>
    {buttons.map((btn, i) => (
      <button
        key={labels[i]}
        className={`btn ${btn} btn-lg m-2`}
        onClick={() => onSelect(i)}
      >
        {labels[i]}
      </button>
    ))}
  </div>
)

const Report = ({ answers }) => (
  <Doughnut
    height={120}
    options={{ maintainAspectRatio: false, legend: false, rotation: 1.57 }}
    data={{ labels, datasets: [{ data: answers, backgroundColor: colors }] }}
  />
)

class App extends Component {
  state = {
    answers: [0, 0, 0],
  }
  handleSelect = choice => {
    const answers = [...this.state.answers]
    answers[choice]++
    this.setState({ answers })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>How do you feel today?</p>
          <Options onSelect={this.handleSelect} />
          <div className="fixed-bottom">
            <Report answers={this.state.answers} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
```

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
