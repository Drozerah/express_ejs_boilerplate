'use strict'
/**
 *  EJS helpers
 */
const pkg = require('../package.json')
module.exports = (app) => {
  app.locals = {
    app_title: 'Express App',
    app_sub_title: 'Express Web Application Boilerplate with EJS template engine',
    app_author: {
      name: 'Drozerah',
      github_url: 'https://github.com/drozerah'
    },
    app_version: pkg.version,
    isDevelopmentProcess: () => {
      if (app.get('env') === 'development') {
        return true
      } else {
        return false
      }
    },
    isDevCSSStyles: () => {
      if (app.get('env') === 'development') {
        return '<link rel="stylesheet" href="css/styles_dev.css">'
      }
    },
    app_env: app.get('env'),
    getFullYear: () => new Date().getFullYear(),
    toLocaleDateString: date => date.toLocaleDateString(),
    JSONstringify: (obj, indent = 2) => JSON.stringify(obj, null, indent)
  }
}
