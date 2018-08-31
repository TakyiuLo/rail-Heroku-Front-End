'use strict'

const authApp = require('./auth/event')
const bookmarksApp = require('./bookmarks/event')

$(() => {
  authApp.addHandlers()
  bookmarksApp.addHandlers()
})
