# moodometer

This is a demo project showing how to create a serverless app in a few simple steps.

Most samples are taken from this excellent tutorial: https://serverless-stack.com

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
npm init react-app my-app
cd my-app
npm start
```

---

## Add Bootstrap CSS framework and Font Awesome icons

Reference Bootstrap and Font Awesome stylesheets in `public/index.html` head

```html
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.0/css/bootstrap.min.css"
/>
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
/>
```

## Add mood-o-meter buttons

Replace `App` class with the following

```js
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>How do you feel today?</p>
          <div>
            <button className="btn btn-danger btn-lg">
              bad <i className="fa fa-thumbs-down" />
            </button>
            <button className="btn btn-warning btn-lg m-3">
              meh <i className="fa fa-meh-o" />
            </button>
            <button className="btn btn-success btn-lg">
              fine <i className="fa fa-thumbs-up" />
            </button>
          </div>
        </header>
      </div>
    )
  }
}
```

## Check the new UI at http://localhost:3000/

![UI](./pitchme-images/ui-1.png)
