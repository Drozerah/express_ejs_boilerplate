'use strict'
/**
 * Dependencies
 */
const express = require('express')
const app = express()
const path = require('path')

/**
 * App settings
 */
app.set('port', process.env.PORT || 3000)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
require('./helpers/ejs_helpers')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dev')))

/**
 * Routes
 */
// index
app.get('/', (req, res) => {
  res.render('index', {
    page_title: 'Home Page',
    page_content_txt: 'This is the home page'
  })
})

// about
app.get('/about', (req, res) => {
  res.render('index', {
    page_title: 'About Page',
    page_content_txt: 'This is the about page'
  })
})

// development only
if (app.get('env') === 'development') {
  const { middleware, visualizer } = require('express-routes-visualizer')
  app.use('/routes', middleware({ httpMethods: true }), visualizer({ theme: 'plain' }))
}

// 404
app.use((req, res, next) => {
  return res.status(404).send({ message: `Route ${req.url} Not found.` })
})

// 500 - Any server error
app.use((err, req, res, next) => {
  return res.status(500).send({ error: err })
})

/**
 * Start Server
 */
app.listen(app.get('port'), err => {
  console.log(`[APP][Mode][${process.env.NODE_ENV}]`)
  if (err) {
    console.log('[APP][Error][Listening Server]')
    console.log(err)
  } else {
    console.log(`[APP][Start][http://localhost:${app.get('port')}]`)
  }
})
