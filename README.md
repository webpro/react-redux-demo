# React + Redux + React-Router demo

## Introduction

Since I got excited about the React + Redux combo, I've tried it out on a current project. It was working well for me,
so I've extracted relevant parts out into this demo.

This demo application represents a "fun fair" (amusement park) with two daily shifts (morning and afternoon), while each
shift has a group of semaphores to indicate the queue length (of people waiting for the attraction).
The semaphores are updated automatically server-side (just polling every 5 seconds in this demo), but employees can
 also change the state of a semaphore by clicking on it and submitting the form.

## JS stack

* ES6, Webpack, Babel
* React + Redux + React-router
* [xhr](https://github.com/Raynos/xhr)
* [classnames](https://github.com/JedWatson/classnames)
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* Several Lodash methods

## CSS stack

* SASS (node-sass)
* PureCSS
* PostCSS + Autoprefixer

## Features

* Redux (v1.0.0-rc)
    * Global state/dispatch + reducers
* Async actions (i.e. Ajax requests) with redux-thunk
* React-Router (v1.0.0-beta3) 
* Basic development/production toggle
    * `__DEV__`: react-hot-loader, logger middleware
    * Non-`__DEV__`: optimize with UglifyJS
* CSS is compiled separately

## Development

    npm install
    npm run dev

Go to [http://localhost:8080/public](http://localhost:8080/public).

## Production build

    npm run build

Find build at `./build/bundle.js`.

## TODO

* Improve on applying Redux architecture
* Better error handling
* Input validation
* Better config options
