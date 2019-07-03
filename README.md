## Table Of Contents
- [About-this-project](#About-this-project)
- [Directory-Strucure](#Directory-Structure)
- [Getting-Started](#Getting-Started)
- [Dependancies](#Dependancies)

## About this Project

### What is cricbuzz-web-app?

    * cricbuzz-web-app is sports website exclusively for Cricket.

    * In cricbuzz-web-app user can signin with facebook and user can see live matches score, future series match score and time table of matches user can also see details of player by searching name of player.

## Directory Structure

```
+-- /src [components]
    +--/login [login activity]
    +--/home [display match tabs]
    +--/player [player details]
    +--/score [match score]
    +--/service [for request and response of api call]
    +--/index [routing purpose]
    +--/intercept [middleware for request and response api]
    +--/protected.route [for protected routing]
```
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Dependancies

* Open package.json to see all development and production dependencies or run npm ls in the project root directory for all installed dependencies.

* Used cricapi to get the live cricket score. Ref:- https://www.cricapi.com