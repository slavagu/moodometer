# moodometer - team mood tracker

Step-by-step guide on how to create a simple serverless app.

> NOTE code snippets provided here are not complete; refer to the [source code](https://github.com/slavagu/moodometer) for a fully working solution.

---

## High Level Architecture

The application is made of UI and API. The UI is built on React and hosted on GitHub Pages for free. The UI can be hosted on any environment that supports serving of static web pages like AWS S3, Netlify, Zeit Now, etc. API is built on AWS Lambda and is accessible via API Gateway. DynamoDB is used as a database for its ability to scale automatically and cheap running costs when pay-as-you-go model is used. Overall, the hosting should be either free or very cheap in vicinity of a few dollars per month.

![Diagram](diagram.png)

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

Local build should be running at http://localhost:3000/

---

## Tidy up

Edit [.gitignore](.gitignore) to exclude dependencies and temporary files from git

```ini
node_modules
coverage
build
.serverless
.DS_Store
npm-debug.log*
.env
```

You can also delete [package-lock.json](package-lock.json), which isn't necessary for this hobby project

To do that create `.npmrc` file with the following

```ini
package-lock=false
```

---

## Add libraries

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

Add a few voting buttons to capture user choice and a chart to show total team mood

![VoteOptions](ui-options.png)
![VoteResults](ui-results.png)

---

## Add API

Create `api` folder with default `package.json`

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

You can also create `.npmrc` file to avoid generation of `package-lock.json`

```ini
package-lock=false
```

---

## Install serverless framework

```sh
cd api
npm i -D serverless serverless-offline
```

Add into `package.json` scripts section

```js
{
  "start": "serverless offline start --port 4000",
  "deploy": "serverless deploy --verbose",
}
```

---

## Configure API endpoints

Define serverless functions in `serverless.yml`

```yaml
functions:
  getMood:
    handler: handler.getMood
    events:
      - http:
          path: mood
          method: get
          cors: true
  postMood:
    handler: handler.postMood
    events:
      - http:
          path: mood
          method: post
          cors: true
```

---

## Define API implementation

`handler.js` is the entry point for all lambda invocations

```js
const moodService = require('./moodService')

module.exports.getMood = async event => {
  const result = await moodService.getMood()
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

module.exports.postMood = async event => {
  const data = JSON.parse(event.body)
  const result = await moodService.updateMood(data)
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
```

---

## Add DynamoDB table definition

```yaml
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
        BillingMode: PAY_PER_REQUEST
```

---

## Use AWS SDK to access DynamoDB

Add sdk as a dev dependency; it's available in cloud Lambda environment by default

```sh
npm i -D aws-sdk
```

`moodService.js` is managing all DB operations

```js
const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.getMood = async () => {
  const result = await dynamoDb.get(params).promise()
}

module.exports.updateMood = async data => {
  const result = await dynamoDb.update(params).promise()
}
```

---

## Run the API locally

Use serverless offline to run the API locally

```sh
cd api
npm start
```

Access it at http://localhost:4000/mood

> NOTE The API will use default aws profile to access DynamoDB in the cloud

---

## Consume mood API in the UI

Get/update is originated in [App.js](src/App.js)

```js
import { getMood, postMood } from './moodClient'

class App extends Component {
  async componentDidMount() {
    const teamMood = await getMood()
    this.setState({ teamMood })
  }

  handleSelect = async id => {
    const userMood = getUserMood(id)
    const teamMood = await postMood(userMood)
    this.setState({ teamMood })
  }
}

export default App
```

---

## Deploy the API to AWS

Deploy the API to AWS

> Ensure your default aws profile is setup to access AWS resources

```sh
cd api
npm run deploy
```

Online API should be available at https://YOUR-API-ID.execute-api.YOUR-AWS-REGION.amazonaws.com/dev/mood

---

## Create .env file for UI deployment

```ini
PUBLIC_URL="https://YOUR-GITHUB-USERNAME.github.io/moodometer"
REACT_APP_API_URL="https://YOUR-API-ID.execute-api.YOUR-AWS-REGION.amazonaws.com/dev"
```

---

## Deploy the UI to GitHub pages

Install `gh-pages` as a dev dependency

```sh
npm i -D gh-pages
```

Set homepage link in `package.json` and add deploy task

```js
{
  "homepage": "https://YOUR-GITHUB-USERNAME.github.io/moodometer",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
}
```

Deploy the website

```sh
npm run deploy
```

Online build should be running at https://YOUR-GITHUB-USERNAME.github.io/moodometer/

---

![UI](ui-full.png)

## The end
