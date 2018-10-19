'use strict'

const authApp = require('./auth/event')
const bookmarksApp = require('./bookmarks/event')

$(() => {
  $('html').show()
  authApp.addHandlers()
  bookmarksApp.addHandlers()
})
