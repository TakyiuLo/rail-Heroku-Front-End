'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignInSuccess = (response) => {
  store.user = response.user
  store.loadBookmarks()
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signIn(data)
    .then(onSignInSuccess)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFail)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFail)
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('.sign-out').on('click', onSignOut)
  $('.switch-already-member').on('click', ui.switchToSignIn)
  $('.switch-non-member').on('click', ui.switchToSignUp)
}

module.exports = {
  addHandlers
}
